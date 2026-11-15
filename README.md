# Aditya Rane — Portfolio

Next.js 14 (App Router, Tailwind) frontend with a small FastAPI content API.

Live: https://aditya-rane-portfolio.vercel.app

## Run locally
```bash
cd frontend && npm install && npm run dev      # http://localhost:3000
```
The site renders from `frontend/lib/fallback.json`, so it needs nothing else. To serve content from the API instead:
```bash
cd backend && python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn main:app --port 8000
API_URL=http://127.0.0.1:8000 npm run dev      # from frontend/
```

## Editing content
All copy lives in `backend/data.py`. After editing, refresh the bundled copy:
```bash
cd backend && .venv/bin/uvicorn main:app --port 8000 &
curl -s localhost:8000/api/content | python3 -m json.tool > ../frontend/lib/fallback.json
```

## Design system
Defined in `frontend/tailwind.config.ts` and `frontend/app/globals.css`.
- **Type:** IBM Plex Sans and IBM Plex Mono, one fixed scale (12, 14, 16, 18, 24, 32, 48, 64).
- **Spacing:** 8-point steps; every section uses the same `.section` and `.section-grid`.
- **Colour:** neutrals plus one accent (`accent`), used only for interactive states.
- **Shape:** one radius (8px), borders instead of shadows.
- **Motion:** colour transitions on hover only.

## Deploy
Vercel: import the repo with Root Directory `frontend`. `render.yaml` deploys the API on Render if you want it; set `API_URL` in Vercel to use it.
