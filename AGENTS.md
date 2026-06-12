# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
- This is a **frontend-only** Vue 3 + Vite single-page app (the "SoftBank" banking UI). Package manager is **npm** (`package-lock.json`).
- Standard scripts live in `package.json`: `npm run dev` (Vite dev server, port 5173), `npm run build`, `npm run preview`.
- There is **no lint script and no test suite** configured in this repo.

### Backend dependency (important)
- The app talks to an **external** "Awesome Bank API" backend that is **NOT part of this repo**. `vite.config.js` proxies `/api/*` to `http://127.0.0.1:8000` (stripping the `/api` prefix). `openapi.json` at the repo root documents that backend's contract.
- Without a backend on `127.0.0.1:8000`, the UI loads but login/register and all dashboard data calls fail (network errors). The login page itself and client-side form validation still work offline.
- For end-to-end testing without the real backend, run a mock server on port 8000 that implements the endpoints in `openapi.json` (key ones: `POST /register`, `POST /token` form-urlencoded, `GET /users/me`, `GET /users/me/bank-cards`, `GET /users/me/transactions`, `GET /users/me/consumption-stats`, `GET /users/me/account`). A seeded demo user (`demo` / `password123`) plus register→login→dashboard is the natural smoke test. The token endpoint expects `application/x-www-form-urlencoded` with `username`/`password`; auth uses a `Bearer` token from the `/token` response.

### Notes
- UI text is intentionally in Chinese; the browser's "translate this page" prompt is not an app feature.
- Vite 8 requires Node 20.19+ or 22.12+ (the VM's Node 22.x is fine).
