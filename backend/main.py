import json
import time
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from data import HOBBIES, PROFILE, PROJECTS, SKILLS, TIMELINE

app = FastAPI(title="Aditya Rane Portfolio API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], allow_origin_regex=r"https://.*\.vercel\.app",
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

MESSAGES = Path(__file__).parent / "messages.jsonl"
_last_post: dict[str, float] = {}  # naive per-IP rate limit


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    message: str = Field(min_length=5, max_length=2000)
    intent: Literal["hiring", "collab", "hello"] = "hello"
    website: str = ""  # honeypot, must stay empty


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/profile")
def profile():
    return PROFILE


@app.get("/api/skills")
def skills():
    return SKILLS


@app.get("/api/projects")
def projects():
    return PROJECTS


@app.get("/api/projects/{slug}")
def project(slug: str):
    for p in PROJECTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(404, "Project not found")


@app.get("/api/timeline")
def timeline():
    return TIMELINE


@app.get("/api/hobbies")
def hobbies():
    return HOBBIES


@app.post("/api/contact", status_code=201)
def contact(body: ContactIn, request: Request):
    if body.website:  # bot
        return {"ok": True}
    ip = request.client.host if request.client else "?"
    now = time.time()
    if now - _last_post.get(ip, 0) < 20:
        raise HTTPException(429, "Easy there — try again in a few seconds.")
    _last_post[ip] = now
    record = body.model_dump(exclude={"website"}) | {"ts": int(now)}
    with MESSAGES.open("a") as f:
        f.write(json.dumps(record) + "\n")
    return {"ok": True}
