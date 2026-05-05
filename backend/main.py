import os
from typing import Optional

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(title="Collaborate API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_API_BASE = "https://api.github.com"


@app.get("/api/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.post("/api/login")
def login(username: str, password: str) -> dict:
    # Fixed credentials requested for demo login.
    if username != "admin" or password != "admin1234":
        raise HTTPException(status_code=401, detail="Invalid username or password.")
    return {"message": f"Welcome {username}", "authenticated": True}


@app.get("/api/github/repos")
def get_github_repositories(
    username: str = Query(..., min_length=1),
    github_token: Optional[str] = Header(default=None, convert_underscores=False),
) -> dict:
    token = github_token or os.getenv("GITHUB_TOKEN")
    if not token:
        raise HTTPException(
            status_code=401,
            detail="GitHub token missing. Send `github_token` header or set GITHUB_TOKEN.",
        )

    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    response = requests.get(
        f"{GITHUB_API_BASE}/users/{username}/repos",
        headers=headers,
        params={"sort": "updated", "per_page": 100},
        timeout=20,
    )
    if response.status_code == 401:
        raise HTTPException(status_code=401, detail="Invalid GitHub token.")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="GitHub user not found.")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="GitHub API request failed.")

    repos = response.json()
    projects = [
        {
            "id": repo["id"],
            "name": repo["name"],
            "full_name": repo["full_name"],
            "private": repo["private"],
            "html_url": repo["html_url"],
        }
        for repo in repos
    ]
    return {"projects": projects}
