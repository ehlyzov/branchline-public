#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WRITE_REPORT=0
if [[ "${1:-}" == "--write-report" ]]; then
  WRITE_REPORT=1
fi

python3 - "$ROOT" "$WRITE_REPORT" <<'PY'
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

root = Path(sys.argv[1])
write_report = sys.argv[2] == "1"
failures = []
warnings = []

mandatory = [
    "AGENTS.md",
    "CLAUDE.md",
    "development/service/SERVICE_MAP.md",
    "development/service/VERIFY.md",
    "development/service/knowledge-gaps.yaml",
    "development/service/generated/change-surface.json",
    "development/service/generated/hotspots.md",
    "development/service/generated/health-report.json",
]

for rel in mandatory:
    path = root / rel
    if not path.exists():
        failures.append({"code": "missing_file", "path": rel})
    elif path.is_file() and path.stat().st_size == 0:
        failures.append({"code": "empty_file", "path": rel})

for rel in ["AGENTS.md", "CLAUDE.md", "development/service/SERVICE_MAP.md", "development/service/VERIFY.md"]:
    path = root / rel
    if not path.exists():
        continue
    text = path.read_text(encoding="utf-8")
    for match in re.finditer(r"`([^`\n]+)`", text):
        token = match.group(1)
        if "/" not in token or token.startswith("./") or token.startswith("/") or " " in token:
            continue
        target = root / token
        if not target.exists() and not any(ch in token for ch in "*[]"):
            warnings.append({"code": "referenced_path_missing", "source": rel, "path": token})

verify = root / "development/service/VERIFY.md"
if verify.exists():
    text = verify.read_text(encoding="utf-8")
    if "./gradlew" in text and not (root / "gradlew").exists():
        failures.append({"code": "missing_gradlew", "path": "gradlew"})
    if "bin/audit_contour.sh" in text and not (root / "bin/audit_contour.sh").exists():
        failures.append({"code": "missing_audit_script", "path": "bin/audit_contour.sh"})

gaps = root / "development/service/knowledge-gaps.yaml"
if gaps.exists():
    text = gaps.read_text(encoding="utf-8")
    if "TODO" in text:
        failures.append({"code": "gap_todo_placeholder", "path": "development/service/knowledge-gaps.yaml"})
    for expires in re.findall(r"expires_on:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})", text):
        if date.fromisoformat(expires) < date.today():
            failures.append({"code": "expired_gap", "expires_on": expires})

status = subprocess.run(
    ["git", "-C", str(root), "status", "--porcelain"],
    check=False,
    capture_output=True,
    text=True,
)
if ".claude/" in status.stdout:
    warnings.append({"code": "untracked_claude_directory", "message": "Untracked .claude/ exists; contour bootstrap leaves it untouched."})

report = {
    "generated": True,
    "generated_on": date.today().isoformat(),
    "status": "fail" if failures else "pass",
    "failures": failures,
    "warnings": warnings,
}

if write_report:
    out = root / "development/service/generated/health-report.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

print(json.dumps(report, indent=2))
sys.exit(1 if failures else 0)
PY
