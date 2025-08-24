# Core Package (`humanity_core`)

Shared Python logic for:

- Scoring raw archetype weights from question answers
- Normalizing scores to 0–100
- Ranking archetypes
- Generating a Markdown report

## Installation (editable, optional)

From repo root:

```bash
pip install -e packages/core
```

## API

- `score_quiz(questions: List[dict], answers: Dict[int, str]) -> Dict[str, float]`
  - Accumulates vectors from chosen option per question
- `normalize_scores(raw: Dict[str, float]) -> Dict[str, float]`
  - Min-max normalization to 0..100; equal values map to 50
- `rank_archetypes(norm: Dict[str, float]) -> List[Tuple[str, float]]`
  - Sorted desc by score, then by key asc for ties
- `build_markdown_report(ranked, archetypes, answers, questions, title="HUMANITY Archetype Report", triples_lookup=None, doubles_lookup=None) -> str`
  - Produces Markdown with:
    - Top 3 Archetypes
    - Optional "Top 3 Profile" if triples_lookup contains a match for the top three letters (order-insensitive)
    - Optional "Top 2 Profile" if doubles_lookup contains a match for the top two letters (order-insensitive)
    - Full ranking
    - Your Answers summary

## Example

```python
from humanity_core import score_quiz, normalize_scores, rank_archetypes
from humanity_core.report import build_markdown_report

questions = [{
    "id": 1,
    "text": "You prefer to work...",
    "options": [
        {"key": "a", "text": "Alone", "vector": {"A": 2.0}},
        {"key": "b", "text": "In teams", "vector": {"B": 1.5}},
    ],
}]
answers = {1: "a"}

raw = score_quiz(questions, answers)
norm = normalize_scores(raw)
ranked = rank_archetypes(norm)
md = build_markdown_report(
    ranked,
    archetypes=[{"letter":"A","name":"Analyst"}],
    answers=answers,
    questions=questions,
    triples_lookup={("A","B","C"): {"Profile Name":"Example","Class":"Strongly Harmonious","Triple (Archetypes)":"Analyst + Builder + Creator"}},
    doubles_lookup={("A","B"): {"Profile Name":"Example 2","Class":"Harmonious","(Archetypes)":"Analyst + Builder"}},
)
print(md)
```

## Tests

From repo root:

```bash
python -m unittest discover -s tests -v
```

## Security & Integrity (Quiz Flow)

Current protections:

- Server-authoritative scoring (`/quiz/submit`) — client never sends pre-computed ranking.
- Session handshake (`/quiz/start`) with shuffled question order & TTL (30m).
- HMAC signature on result payload (`result_id` + ranking) returned as token.
- Results fetched only via `/results/{result_id}?token=...` (no trusting client state).
- Minimal anti-speed check (reject ultra-fast submissions <2s from session start).
- Per-IP session start cooldown (15s) to limit rapid farming.
- Submission rate limiting (10 submissions / IP / 60s) — SQLite counters or Redis atomic counters if `REDIS_URL` set.
- Persistence via SQLite (default) OR optional Redis (if `REDIS_URL` present) for sessions + results (Redis chosen at runtime; SQLite fallback).
- Per-question timing capture with anomaly flags: average time, ultra_fast, uniform_timings stored alongside results.
- Background cleanup task purges expired sessions and results older than retention window (default 30 days).

Environment variables:

- `HUMANITY_SIGNING_SECRET` – HMAC key (must be set to a non-default value; enforced at startup).
- `HUMANITY_DB_PATH` – Custom path for SQLite file.
- `REDIS_URL` – Enable Redis-backed ephemeral storage + rate limiting (falls back to SQLite if unavailable).
- `HUMANITY_CLEANUP_INTERVAL` – Seconds between cleanup iterations (default 600).
- `HUMANITY_RESULT_RETENTION_DAYS` – How long to retain results (default 30).

Readiness endpoint:

- `/readiness` returns `{ ready: bool, reasons: [str] }` for health checks. Fails if signing secret is default, DB/Redis unavailable, or misconfigured.

Planned / future hardening:

- Secret rotation (primary + secondary signing secrets).
- Richer anomaly heuristics (timing variance, pattern irregularities, answer distribution outliers).
- Admin/metrics endpoint for flagged/anomalous sessions.
- Identity-aware throttling (user/JWT) beyond IP-based limits.
- Persistent store abstraction extraction (interface) for easier swapping/extending.
- Observability: Prometheus metrics or structured logs for rate limits & anomalies.

Data cleanup: implemented via an async background loop; tune interval & retention via env vars.
