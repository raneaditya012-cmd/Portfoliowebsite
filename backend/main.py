from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from data import EXPERIENCE, GAME, PROFILE, PROJECTS, SKILLS

app = FastAPI(title="Aditya Rane Portfolio API", version="2.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/content")
def content():
    """Everything the site renders, in one request."""
    return {"profile": PROFILE, "experience": EXPERIENCE, "skills": SKILLS, "projects": PROJECTS, "game": GAME}


@app.get("/api/projects/{slug}")
def project(slug: str):
    for p in PROJECTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(404, "Project not found")
