# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
- This is a **frontend-only** Vue 3 + Vite single-page app (the "SoftBank" banking UI). Package manager is **npm** (`package-lock.json`).
- Standard scripts live in `package.json`: `npm run dev` (Vite dev server, port 5173), `npm run build`, `npm run preview`.
- There is **no lint script and no test suite** configured in this repo.

### Backend dependency (important)
- The app talks to the **"Awesome Bank API"** FastAPI backend. In Cursor Cloud this lives in a sibling repo in the same workspace at `/agent/repos/finalBackend` (remote `github.com/MonkeyKingLts/finalBackend`). `vite.config.js` proxies `/api/*` to `http://127.0.0.1:8000` (stripping the `/api` prefix). `openapi.json` at the repo root documents the backend contract.
- Without a backend on `127.0.0.1:8000`, the UI loads but login/register and all dashboard data calls fail (network errors). The login page itself and client-side form validation still work offline.
- **Running the backend** (from `/agent/repos/finalBackend`, with its venv active): `python -m uvicorn src.main:app --host 127.0.0.1 --port 8000`. The token endpoint expects `application/x-www-form-urlencoded` with `username`/`password`; auth uses a `Bearer` token from the `/token` response. The DB is SQLite (`database.db`, auto-created, committed already seeded).
- **Smoke test:** log in as the seeded user `demo` / `12345678` (NOTE: the seed script and live DB use `12345678`, not `password123`), then register→login→dashboard.

### Notes
- UI text is intentionally in Chinese; the browser's "translate this page" prompt is not an app feature.
- Vite 8 requires Node 20.19+ or 22.12+ (the VM's Node 22.x is fine).
