# HUMANITY API (FastAPI)

Minimal web backend exposing quiz data and scoring using the core package.

## Endpoints
- GET /health — health check
- GET /data/questions — questions.json
- GET /data/archetypes — archetypes.json
- GET /data/doubles — doubles.md parsed rows
- GET /data/triples — triples.md parsed rows
- POST /score — compute ranking from answers
  - Request: { "answers": { "1": "A", "2": "B", ... } }
  - Response: { "ranked": [["P",100.0], ...], "scores": {"P":100.0,...}, "top2_profile": {...}, "top3_profile": {...} }
- POST /report — generate Markdown report
  - Request: { "answers": { ... }, "title": "Optional" }
  - Response: { "markdown": "..." }

## Run locally
Prereqs: Python 3.9+

- Install deps:
  - pip install fastapi uvicorn
- Run server from repo root:
  - uvicorn apps.api.main:app --reload
- Open docs:
  - http://127.0.0.1:8000/docs

## Notes
- Data is read from packages/data at runtime.
- Uses humanity_core for scoring and report generation.
- Doubles/triples lookups are order-insensitive on archetype letters.

