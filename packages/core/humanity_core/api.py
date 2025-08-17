from __future__ import annotations

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Tuple
from pathlib import Path
import json
import uuid
import asyncio
import logging
import time
import os
import hmac
import hashlib
import base64
import sqlite3
try:  # Optional Redis support
    import redis  # type: ignore
except ImportError:  # pragma: no cover
    redis = None

from .scoring import score_quiz, normalize_scores, rank_archetypes
from .report import build_markdown_report
from .storage import select_storage, StorageBackend


app = FastAPI(title="HUMANITY Core API", version="0.1.0")

DEFAULT_SECRET = "dev-signing-secret"
def _check_signing_secret():
    # Allow test context (pytest) to use default secret without raising
    if SIGNING_SECRET == DEFAULT_SECRET and not (os.getenv("PYTEST_CURRENT_TEST") or os.getenv("HUMANITY_TEST_MODE")):
        raise RuntimeError("HUMANITY_SIGNING_SECRET must be set to a non-default value for production.")

# Allow all origins in dev; tighten for prod as needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _data_dir() -> Path:
    # packages/core/humanity_core/api.py -> packages/data
    return Path(__file__).resolve().parents[2] / "data"


def _load_json(name: str) -> Any:
    p = _data_dir() / name
    with p.open("r", encoding="utf-8") as f:
        return json.load(f)


class ScoreRequest(BaseModel):
    answers: Dict[int, str]


SESSION_TTL_SECONDS = 60 * 30  # 30 minutes
MIN_COMPLETION_SECONDS = 2  # reject ultrafast submissions (trivial heuristic)
SESSION_START_COOLDOWN = 15  # seconds between starting new sessions per IP
SUBMIT_RATE_LIMIT_WINDOW = 60  # seconds
SUBMIT_RATE_LIMIT_MAX = 10     # max submissions per IP in window

SIGNING_SECRET = os.getenv("HUMANITY_SIGNING_SECRET", "dev-signing-secret")

# Cleanup configuration
CLEANUP_INTERVAL_SECONDS = int(os.getenv("HUMANITY_CLEANUP_INTERVAL", "600"))  # 10 min default
RESULT_RETENTION_DAYS = int(os.getenv("HUMANITY_RESULT_RETENTION_DAYS", "30"))
RESULT_RETENTION_SECONDS = RESULT_RETENTION_DAYS * 86400

# SQLite persistence (lightweight). In production consider PostgreSQL/Redis.
DB_PATH = os.getenv("HUMANITY_DB_PATH", str(_data_dir() / "humanity.db"))
_db_conn: sqlite3.Connection | None = None
REDIS_URL = os.getenv("REDIS_URL")
redis_client = None
if REDIS_URL and redis:
    try:
        redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
        redis_client.ping()
    except Exception:
        redis_client = None  # Fallback silently to SQLite

_storage: StorageBackend | None = None

def get_storage() -> StorageBackend:
    global _storage
    if _storage is None:
        _storage = select_storage(get_db(), redis_client)
    return _storage


def get_db() -> sqlite3.Connection:
    global _db_conn
    if _db_conn is None:
        _db_conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        _db_conn.row_factory = sqlite3.Row
    return _db_conn


def _init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """CREATE TABLE IF NOT EXISTS sessions (
            session_id TEXT PRIMARY KEY,
            created INTEGER NOT NULL,
            expires INTEGER NOT NULL,
            order_json TEXT NOT NULL,
            ip TEXT,
            submitted INTEGER NOT NULL DEFAULT 0
        )"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS results (
            result_id TEXT PRIMARY KEY,
            session_id TEXT NOT NULL,
            created INTEGER NOT NULL,
            ranking_json TEXT NOT NULL,
            report_markdown TEXT NOT NULL,
            signature TEXT NOT NULL,
            payload_json TEXT NOT NULL,
            top2_json TEXT,
            top3_json TEXT,
            FOREIGN KEY(session_id) REFERENCES sessions(session_id)
        )"""
    )
    cur.execute(
        """CREATE TABLE IF NOT EXISTS submits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            created INTEGER NOT NULL
        )"""
    )
    cur.execute("CREATE INDEX IF NOT EXISTS idx_submits_ip_created ON submits(ip, created)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_results_session ON results(session_id)")
    conn.commit()


@app.on_event("startup")
def _startup():
    _check_signing_secret()
    _init_db()
    try:
        if not hasattr(app.state, "cleanup_task"):
            app.state.cleanup_task = asyncio.create_task(_cleanup_loop())
    except RuntimeError:
        pass
    # Initialize storage backend eagerly
    get_storage()
@app.get("/readiness")
def readiness() -> Dict[str, Any]:
    # Check signing secret
    healthy = True
    reasons = []
    if SIGNING_SECRET == DEFAULT_SECRET:
        healthy = False
        reasons.append("Default signing secret in use")
    # Check DB
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT 1")
    except Exception as e:
        healthy = False
        reasons.append(f"DB error: {e}")
    # Check Redis if enabled
    if REDIS_URL:
        if not redis_client:
            healthy = False
            reasons.append("Redis configured but not available")
        else:
            try:
                redis_client.ping()
            except Exception as e:
                healthy = False
                reasons.append(f"Redis ping failed: {e}")
    return {"ready": healthy, "reasons": reasons}


async def _cleanup_loop():
    logger = logging.getLogger("humanity.cleanup")
    while True:
        try:
            await asyncio.sleep(CLEANUP_INTERVAL_SECONDS)
            _run_cleanup(logger)
        except asyncio.CancelledError:
            break
        except Exception as e:
            logger.warning("Cleanup iteration failed: %s", e)


def _run_cleanup(logger: logging.Logger | None = None) -> None:
    now = int(time.time())
    conn = get_db()
    cur = conn.cursor()
    # Remove unsubmitted expired sessions
    cur.execute(
        "DELETE FROM sessions WHERE expires < ? AND submitted = 0",
        (now,),
    )
    # Remove old results + their sessions if they are far beyond retention
    cutoff = now - RESULT_RETENTION_SECONDS
    cur.execute(
        "SELECT result_id, session_id FROM results WHERE created < ?",
        (cutoff,),
    )
    rows = cur.fetchall()
    if rows:
        result_ids = [r[0] for r in rows]
        session_ids = [r[1] for r in rows]
        cur.executemany("DELETE FROM results WHERE result_id=?", [(rid,) for rid in result_ids])
        # Best-effort delete sessions if no other results exist
        cur.executemany("DELETE FROM sessions WHERE session_id=?", [(sid,) for sid in session_ids])
    conn.commit()
    if logger:
        logger.info(
            "Cleanup: removed %d old results; expired sessions purged.",
            len(rows),
        )


def _sign(payload: Dict[str, Any]) -> str:
    # Stable JSON representation
    data = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode()
    digest = hmac.new(SIGNING_SECRET.encode(), data, hashlib.sha256).digest()
    return base64.urlsafe_b64encode(digest).decode().rstrip("=")


def _verify(payload: Dict[str, Any], signature: str) -> bool:
    expected = _sign(payload)
    # constant time compare
    return hmac.compare_digest(expected, signature)


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"status": "ok"}


@app.get("/meta")
def meta() -> Dict[str, Any]:
    try:
        qs = _load_json("questions.json")
        arcs = _load_json("archetypes.json")
        return {"questions": len(qs or []), "archetypes": len(arcs or [])}
    except Exception as e:
        return {"error": str(e)}


@app.get("/data/questions")
def get_questions() -> Dict[str, Any]:
    """Return the full set of questions for the quiz."""
    try:
        raw = _load_json("questions.json")
        # Support either a top-level list or an object with a 'questions' list
        if isinstance(raw, dict) and "questions" in raw:
            qs = raw["questions"]
        else:
            qs = raw
        return {"questions": qs}
    except Exception as e:
        return {"error": str(e)}


@app.get("/data/archetypes")
def get_archetypes() -> Dict[str, Any]:
    """Return the archetype metadata used in reports/results."""
    try:
        raw = _load_json("archetypes.json")
        if isinstance(raw, dict) and "archetypes" in raw:
            arcs = raw["archetypes"]
        else:
            arcs = raw
        return {"archetypes": arcs}
    except Exception as e:
        return {"error": str(e)}


@app.post("/score")
def score(req: ScoreRequest) -> Dict[str, Any]:
    raw_qs = _load_json("questions.json")
    if isinstance(raw_qs, dict) and "questions" in raw_qs:
        questions: List[Dict[str, Any]] = raw_qs["questions"]
    else:
        questions = raw_qs
    raw_arcs = _load_json("archetypes.json")
    if isinstance(raw_arcs, dict) and "archetypes" in raw_arcs:
        archetypes: List[Dict[str, str]] = raw_arcs["archetypes"]
    else:
        archetypes = raw_arcs

    raw = score_quiz(questions, req.answers)
    norm = normalize_scores(raw)
    ranked: List[Tuple[str, float]] = rank_archetypes(norm)

    md = build_markdown_report(
        ranked=ranked,
        archetypes=archetypes,
        answers=req.answers,
        questions=questions,
    )

    return {
        "raw": raw,
        "normalized": norm,
        "ranking": [{"letter": k, "score": v} for k, v in ranked],
        "report_markdown": md,
    }


# --- New authoritative session based flow ---

@app.post("/quiz/start")
def quiz_start(request: Request) -> Dict[str, Any]:
    raw_qs = _load_json("questions.json")
    if isinstance(raw_qs, dict) and "questions" in raw_qs:
        questions: List[Dict[str, Any]] = raw_qs["questions"]
    else:
        questions = raw_qs
    order = [int(q.get("id")) for q in questions]
    for i in range(len(order) - 1, 0, -1):
        j = uuid.uuid4().int % (i + 1)
        order[i], order[j] = order[j], order[i]
    session_id = uuid.uuid4().hex
    now = int(time.time())
    ip = request.client.host if request.client else None
    storage = get_storage()
    if ip and storage.start_session_cooldown_violation(ip, now, SESSION_START_COOLDOWN):
        raise HTTPException(status_code=429, detail="Starting sessions too quickly; please wait a few seconds")
    storage.create_session(session_id, order, now, now + SESSION_TTL_SECONDS, ip)
    return {"session_id": session_id, "question_order": order, "expires_at": now + SESSION_TTL_SECONDS}


class SubmitRequest(BaseModel):
    session_id: str
    answers: Dict[int, str]
    timings: Dict[int, int] | None = None  # ms per question


@app.post("/quiz/submit")
def quiz_submit(req: SubmitRequest, request: Request) -> Dict[str, Any]:
    now = int(time.time())
    storage = get_storage()
    sess = storage.get_session(req.session_id)
    if not sess:
        raise HTTPException(status_code=400, detail="Invalid session")
    sess_created = int(sess["created"])
    sess_expires = int(sess["expires"])
    submitted = int(sess["submitted"])
    order_json = sess.get("order_json") or sess.get("order") or "[]"
    sess_ip = sess.get("ip")
    if now > sess_expires:
        raise HTTPException(status_code=400, detail="Session expired")
    if submitted:
        raise HTTPException(status_code=400, detail="Session already submitted")
    if now - sess_created < MIN_COMPLETION_SECONDS:
        raise HTTPException(status_code=400, detail="Submission too fast; please take more time")
    ip = request.client.host if request.client else sess_ip
    if ip:
        bucket = now // SUBMIT_RATE_LIMIT_WINDOW
        rate = storage.increment_submit_rate(ip, bucket, SUBMIT_RATE_LIMIT_WINDOW)
        if rate != -1 and rate > SUBMIT_RATE_LIMIT_MAX:
            raise HTTPException(status_code=429, detail="Too many submissions; please slow down")
        if rate == -1:  # SQLite path fallback manual window count
            window_start = now - SUBMIT_RATE_LIMIT_WINDOW
            if storage.recent_submit_count(ip, window_start) >= SUBMIT_RATE_LIMIT_MAX:
                raise HTTPException(status_code=429, detail="Too many submissions; please slow down")
    order = json.loads(order_json)
    order_set = set(order)
    for qid in req.answers.keys():
        if int(qid) not in order_set:
            raise HTTPException(status_code=400, detail=f"Invalid question id {qid}")
    if not req.answers:
        raise HTTPException(status_code=400, detail="No answers provided")

    # Load authoritative question + archetype data
    raw_qs = _load_json("questions.json")
    if isinstance(raw_qs, dict) and "questions" in raw_qs:
        questions: List[Dict[str, Any]] = raw_qs["questions"]
    else:
        questions = raw_qs
    raw_arcs = _load_json("archetypes.json")
    if isinstance(raw_arcs, dict) and "archetypes" in raw_arcs:
        archetypes: List[Dict[str, str]] = raw_arcs["archetypes"]
    else:
        archetypes = raw_arcs

    raw_scores = score_quiz(questions, req.answers)
    norm = normalize_scores(raw_scores)
    ranked: List[Tuple[str, float]] = rank_archetypes(norm)
    md = build_markdown_report(ranked=ranked, archetypes=archetypes, answers=req.answers, questions=questions)

    result_id = uuid.uuid4().hex
    payload = {"result_id": result_id, "created": now, "ranking": ranked}
    signature = _sign(payload)
    # Simple derived profiles (placeholder heuristics)
    def _name(letter: str) -> str:
        arc_map = {a.get("letter"): a for a in archetypes if isinstance(a, dict)}
        a = arc_map.get(letter, {})
        return a.get("name") or a.get("archetype") or letter
    letters = [l for l, _ in ranked]
    top2_profile = None
    if len(letters) >= 2:
        a, b = letters[0], letters[1]
        top2_profile = {
            "profile": f"{_name(a)} / {_name(b)} Duo",
            "class": "Synergistic" if abs(ranked[0][1] - ranked[1][1]) < 10 else "Dominant/Support",
            "pair": f"{_name(a)} + {_name(b)}",
        }
    top3_profile = None
    if len(letters) >= 3:
        a, b, c = letters[0], letters[1], letters[2]
        dispersion = max(r[1] for r in ranked[:3]) - min(r[1] for r in ranked[:3])
        top3_profile = {
            "profile": f"{_name(a)} / {_name(b)} / {_name(c)} Trio",
            "class": "Balanced Trio" if dispersion < 12 else "Composite Stack",
            "triple": f"{_name(a)} + {_name(b)} + {_name(c)}",
        }
    ranking_list = [{"letter": k, "score": v} for k, v in ranked]
    storage.mark_session_submitted(req.session_id)
    # Basic anomaly heuristics: average ms per answered question; flag ultra-fast (<500ms) or uniform timing
    timings = req.timings or {}
    answered_qids = list(req.answers.keys())
    timing_values = [timings.get(int(qid), 0) for qid in answered_qids]
    avg_time = sum(timing_values) / len(timing_values) if timing_values else 0
    ultra_fast = avg_time < 500
    unique_timings = len(set(timing_values)) if timing_values else 0
    uniform_timings = unique_timings == 1 and len(timing_values) > 3
    anomaly_flags = {
        "avg_time_ms": avg_time,
        "ultra_fast": ultra_fast,
        "uniform_timings": uniform_timings,
        "answered": len(answered_qids),
    }
    # Add column if missing (lazy migration)
    storage.record_result({
        "result_id": result_id,
        "session_id": req.session_id,
        "created": now,
        "ranking_list": ranking_list,
        "report_markdown": md,
        "signature": signature,
        "payload_json": json.dumps(payload, separators=(",", ":"), sort_keys=True),
        "top2_json": json.dumps(top2_profile) if top2_profile else None,
        "top3_json": json.dumps(top3_profile) if top3_profile else None,
        "anomalies_json": json.dumps(anomaly_flags),
    }, RESULT_RETENTION_SECONDS)
    if ip:
        storage.record_submit_ip(ip, now)
    return {"result_id": result_id, "token": signature, "top2_profile": top2_profile, "top3_profile": top3_profile}


@app.get("/results/{result_id}")
def get_result(result_id: str, token: str) -> Dict[str, Any]:
    storage = get_storage()
    data = storage.get_result(result_id)
    if not data:
        raise HTTPException(status_code=404, detail="Result not found")
    signature = data.get("signature", "")
    payload_json = data.get("payload_json", "{}")
    payload = json.loads(payload_json)
    if signature != token and not _verify(payload, token):
        raise HTTPException(status_code=403, detail="Invalid token")
    ranking_json = data.get("ranking_json") or data.get("ranking") or "[]"
    return {
        "ranking": json.loads(ranking_json),
        "report_markdown": data.get("report_markdown", ""),
        "created": data.get("created"),
        "top2_profile": json.loads(data.get("top2_json") or data.get("top2") or "null") if (data.get("top2_json") or data.get("top2")) else None,
        "top3_profile": json.loads(data.get("top3_json") or data.get("top3") or "null") if (data.get("top3_json") or data.get("top3")) else None,
        "anomalies": json.loads(data.get("anomalies_json") or data.get("anomalies") or "null") if (data.get("anomalies_json") or data.get("anomalies")) else None,
    }
