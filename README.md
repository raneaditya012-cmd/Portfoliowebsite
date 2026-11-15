# Aditya Rane — Portfolio

Next.js 14 (App Router, Tailwind, Framer Motion, Lenis) + FastAPI. Minimal, neutral, developer-centric.

## Run
```bash
# terminal 1 — API
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn main:app --port 8000

# terminal 2 — site
cd frontend && npm install && npm run dev     # http://localhost:3000
```
The site proxies `/api/*` to FastAPI (`API_URL`, default http://127.0.0.1:8000) and falls back to
`frontend/lib/fallback.json` if the API is down, so it can also be deployed alone (e.g. Vercel).

## Make it yours
- Content: `backend/data.py` (profile, skills, projects, timeline, hobbies). After editing, refresh the fallback:
  `cd frontend && python3 -c "import sys,json;sys.path.insert(0,'../backend');import data;json.dump({'profile':data.PROFILE,'skills':data.SKILLS,'projects':data.PROJECTS,'timeline':data.TIMELINE,'hobbies':data.HOBBIES},open('lib/fallback.json','w'),indent=1)"`
- TODO: real GitHub / LinkedIn / email in `PROFILE["links"]`, project `links` (`#` = hidden), drop `resume.pdf` in `frontend/public/`.
- Contact messages are appended to `backend/messages.jsonl`.
- Deploy: set `API_URL` (frontend) and add your domain to CORS in `backend/main.py`.

## Highlights
Terminal hero that types an intro · ⌘K command palette · IST clock + scroll progress in the nav · stack as a grouped grid ·
animated SVG illustration per project (`components/ProjectArt.tsx`) · sticky stacking featured projects ·
experience as a `git log` that draws on scroll · contact form with a live request/response preview ·
keepy-uppy mini-game in the hobbies section · smooth scrolling · respects `prefers-reduced-motion`.

Theme colours live in `frontend/tailwind.config.ts` (`bg`, `surface`, `fg`, `muted`, `accent`).
