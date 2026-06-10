#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 - "$ROOT" <<'PY'
import json
import re
import sys
from pathlib import Path

root = Path(sys.argv[1])
candidates = []

for path in sorted((root / "docs").rglob("*.md")):
    rel = path.relative_to(root).as_posix()
    text = path.read_text(encoding="utf-8", errors="ignore")
    placeholder_hits = len(re.findall(r"\b(TODO|TBD|placeholder|coming soon)\b", text, flags=re.I))
    if placeholder_hits >= 2:
        candidates.append({
            "path": rel,
            "recommendation": "delete_or_merge",
            "reason": "multiple placeholder markers",
        })
    if rel.startswith("development/service/") and rel not in {
        "development/service/SERVICE_MAP.md",
        "development/service/VERIFY.md",
        "development/service/generated/hotspots.md",
    } and not rel.startswith("development/service/generated/"):
        candidates.append({
            "path": rel,
            "recommendation": "review",
            "reason": "event-driven service doc must have a clear read path and trigger",
        })

print(json.dumps({"mutated": False, "candidates": candidates}, indent=2))
PY
