# HUMANITY Web

Production Next.js 15 + React 19 front‑end for the HUMANITY archetype assessment. Uses Tailwind CSS and dynamic client-only imports for heavier animation (GSAP) sections.

## Quick Start

```bash
npm install
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000 npm run dev
```

Backend (from repo root / packages/core):

```bash
python -m venv .venv
./.venv/Scripts/Activate.ps1  # Windows PowerShell
pip install -e . fastapi uvicorn[standard]
uvicorn humanity_core.api:app --host 127.0.0.1 --port 8000 --reload
```

Navigate to <http://localhost:3000>

## Important Environment Variable

| Variable | Purpose | Default (dev) |
|----------|---------|---------------|
| `NEXT_PUBLIC_API_URL` | Base URL for FastAPI backend | <http://127.0.0.1:8000> |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Start built app |
| `npm run lint` | Lint (warnings allowed) |
| `npm run analyze` | Build with bundle analyzer (set `ANALYZE=1`) |
| `npm run lighthouse` | Run headless Lighthouse against local site (install dev deps below) |

To enable Lighthouse & bundle analysis, install dev tools:

```bash
npm i -D lighthouse chrome-launcher @next/bundle-analyzer
```

Then wrap `next.config.js` with the analyzer (if not already) and run:

```bash
npm run analyze
```

## Accessibility & UX Enhancements

- Quiz progress persisted in `sessionStorage` (`quizProgress`).
- Aria-live region for quiz progress updates and submission status.
- Hero carousel: keyboard (Left/Right, Space toggle) + pause on hover/focus.
- Results page guard: redirects to quiz if no stored results.

## Testing

Backend pytest suite (in `packages/core`) covers health, questions load, and score roundtrip.

Run from repo root:

```bash
cd packages/core
pytest -q
```

## CI

GitHub Actions workflow `.github/workflows/ci.yml` runs backend tests, frontend lint/build, and an integration build matrix.

## Data

Data lives in `packages/data` and is loaded by the FastAPI layer; frontend fetches via `/data/questions` & `/data/archetypes` endpoints.

## Deployment Notes

1. Deploy backend (FastAPI) — e.g. Fly.io / Render / Azure — set CORS allow origins list.
2. Set `NEXT_PUBLIC_API_URL` in the frontend hosting platform (e.g. Vercel) to the public backend base URL.
3. Verify `/health`, then run Lighthouse (`npm run lighthouse`).

## Future Improvements

- Add Playwright E2E for quiz → results flow.
- Add service worker for offline resume.
- Add rate limiting / minimal analytics endpoint.
