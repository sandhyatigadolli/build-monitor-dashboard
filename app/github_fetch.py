# app/github_fetch.py
import os
import requests
from datetime import datetime

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_OWNER = "sandhyatigadolli"
REPO_NAME = "demo-build-pipeline"  # <-- Make sure this matches the actual repo name exactly
      # ← CHANGE THIS

def fetch_runs():
    url = "https://api.github.com/repos/sandhyatigadolli/demo-build-pipeline/actions/runs"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    return resp.json()["workflow_runs"]

def transform_runs(runs):
    data = []
    for r in runs[:5]:  # latest 5 builds
        created_at = datetime.fromisoformat(r["created_at"].replace("Z", "+00:00"))
        started_at = datetime.fromisoformat(r["run_started_at"].replace("Z", "+00:00"))
        duration = (started_at - created_at).total_seconds() / 60
        data.append({
            "build_id": r["id"],
            "status": r["conclusion"],
            "duration": round(duration, 1),
            "triggered_by": r["actor"]["login"],
            "timestamp": r["run_started_at"]
        })
    return data
