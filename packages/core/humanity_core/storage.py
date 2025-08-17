from __future__ import annotations

from typing import Any, Dict, List, Optional
import json
import sqlite3


class StorageBackend:
    def create_session(self, session_id: str, order: List[int], created: int, expires: int, ip: str | None) -> None: ...
    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]: ...
    def mark_session_submitted(self, session_id: str) -> None: ...
    def start_session_cooldown_violation(self, ip: str, now: int, cooldown: int) -> bool: ...
    def record_submit_ip(self, ip: str, created: int) -> None: ...
    def recent_submit_count(self, ip: str, window_start: int) -> int: ...
    def increment_submit_rate(self, ip: str, now_bucket: int, window_seconds: int) -> int: ...
    def record_result(self, data: Dict[str, Any], retention_seconds: int) -> None: ...
    def get_result(self, result_id: str) -> Optional[Dict[str, Any]]: ...


class SQLiteStorage(StorageBackend):
    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn

    def create_session(self, session_id: str, order: List[int], created: int, expires: int, ip: str | None) -> None:
        cur = self.conn.cursor()
        cur.execute(
            "INSERT INTO sessions(session_id, created, expires, order_json, ip, submitted) VALUES(?,?,?,?,?,0)",
            (session_id, created, expires, json.dumps(order), ip),
        )
        self.conn.commit()

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        cur = self.conn.cursor()
        cur.execute("SELECT created, expires, order_json, ip, submitted FROM sessions WHERE session_id=?", (session_id,))
        row = cur.fetchone()
        if not row:
            return None
        return {
            "created": int(row[0]),
            "expires": int(row[1]),
            "order_json": row[2],
            "ip": row[3],
            "submitted": int(row[4]),
        }

    def mark_session_submitted(self, session_id: str) -> None:
        cur = self.conn.cursor()
        cur.execute("UPDATE sessions SET submitted=1 WHERE session_id=?", (session_id,))
        self.conn.commit()

    def start_session_cooldown_violation(self, ip: str, now: int, cooldown: int) -> bool:
        cur = self.conn.cursor()
        cur.execute("SELECT created FROM sessions WHERE ip=? ORDER BY created DESC LIMIT 1", (ip,))
        row = cur.fetchone()
        return bool(row and now - int(row[0]) < cooldown)

    def record_submit_ip(self, ip: str, created: int) -> None:
        cur = self.conn.cursor()
        cur.execute("INSERT INTO submits(ip, created) VALUES(?,?)", (ip, created))
        self.conn.commit()

    def recent_submit_count(self, ip: str, window_start: int) -> int:
        cur = self.conn.cursor()
        cur.execute("SELECT COUNT(*) FROM submits WHERE ip=? AND created>=?", (ip, window_start))
        (cnt,) = cur.fetchone()
        return int(cnt)

    def increment_submit_rate(self, ip: str, now_bucket: int, window_seconds: int) -> int:
        # Not used for SQLite path (returns -1 sentinel)
        return -1

    def record_result(self, data: Dict[str, Any], retention_seconds: int) -> None:
        cur = self.conn.cursor()
        try:
            cur.execute("ALTER TABLE results ADD COLUMN anomalies_json TEXT")
        except Exception:
            pass
        cur.execute(
            "INSERT INTO results(result_id, session_id, created, ranking_json, report_markdown, signature, payload_json, top2_json, top3_json, anomalies_json) VALUES(?,?,?,?,?,?,?,?,?,?)",
            (
                data["result_id"],
                data["session_id"],
                data["created"],
                json.dumps(data["ranking_list"]),
                data["report_markdown"],
                data["signature"],
                data["payload_json"],
                data.get("top2_json"),
                data.get("top3_json"),
                data.get("anomalies_json"),
            ),
        )
        self.conn.commit()

    def get_result(self, result_id: str) -> Optional[Dict[str, Any]]:
        cur = self.conn.cursor()
        try:
            cur.execute(
                "SELECT ranking_json, report_markdown, created, signature, payload_json, top2_json, top3_json, anomalies_json FROM results WHERE result_id=?",
                (result_id,),
            )
            row = cur.fetchone()
            if not row:
                return None
            return {
                "ranking_json": row[0],
                "report_markdown": row[1],
                "created": row[2],
                "signature": row[3],
                "payload_json": row[4],
                "top2_json": row[5],
                "top3_json": row[6],
                "anomalies_json": row[7],
            }
        except Exception:
            return None


class RedisStorage(StorageBackend):
    def __init__(self, client):  # type: ignore
        self.client = client

    def create_session(self, session_id: str, order: List[int], created: int, expires: int, ip: str | None) -> None:
        k = f"hs:session:{session_id}"
        self.client.hset(k, mapping={
            "created": created,
            "expires": expires,
            "order": json.dumps(order),
            "ip": ip or "",
            "submitted": 0,
        })
        self.client.expire(k, expires - created)

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        k = f"hs:session:{session_id}"
        if not self.client.exists(k):
            return None
        data = self.client.hgetall(k)
        return {
            "created": int(data.get("created", "0")),
            "expires": int(data.get("expires", "0")),
            "order_json": data.get("order", "[]"),
            "ip": data.get("ip") or None,
            "submitted": int(data.get("submitted", "0")),
        }

    def mark_session_submitted(self, session_id: str) -> None:
        self.client.hset(f"hs:session:{session_id}", mapping={"submitted": 1})

    def start_session_cooldown_violation(self, ip: str, now: int, cooldown: int) -> bool:
        key = f"hs:ip:start_cd:{ip}"
        if self.client.exists(key):
            return True
        self.client.set(key, now, ex=cooldown)
        return False

    def record_submit_ip(self, ip: str, created: int) -> None:
        # Redis path counts via increment_submit_rate; nothing additional needed
        pass

    def recent_submit_count(self, ip: str, window_start: int) -> int:
        # Not used (handled by increment_submit_rate)
        return -1

    def increment_submit_rate(self, ip: str, now_bucket: int, window_seconds: int) -> int:
        key = f"hs:rl:submit:{ip}:{now_bucket}"
        count = self.client.incr(key)
        if count == 1:
            self.client.expire(key, window_seconds)
        return int(count)

    def record_result(self, data: Dict[str, Any], retention_seconds: int) -> None:
        k = f"hs:result:{data['result_id']}"
        self.client.hset(k, mapping={
            "created": data["created"],
            "ranking": json.dumps(data["ranking_list"]),
            "report_markdown": data["report_markdown"],
            "signature": data["signature"],
            "payload": data["payload_json"],
            "top2": data.get("top2_json") or "",
            "top3": data.get("top3_json") or "",
            "anomalies": data.get("anomalies_json") or "",
        })
        self.client.expire(k, retention_seconds)

    def get_result(self, result_id: str) -> Optional[Dict[str, Any]]:
        k = f"hs:result:{result_id}"
        if not self.client.exists(k):
            return None
        data = self.client.hgetall(k)
        return {
            "ranking_json": data.get("ranking", "[]"),
            "report_markdown": data.get("report_markdown", ""),
            "created": int(data.get("created", "0")),
            "signature": data.get("signature", ""),
            "payload_json": data.get("payload", "{}"),
            "top2_json": data.get("top2") or None,
            "top3_json": data.get("top3") or None,
            "anomalies_json": data.get("anomalies") or None,
        }


def select_storage(sqlite_conn: sqlite3.Connection, redis_client) -> StorageBackend:  # type: ignore
    if redis_client:
        return RedisStorage(redis_client)
    return SQLiteStorage(sqlite_conn)
