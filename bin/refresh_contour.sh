#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE="${1:-HEAD}"
GENERATED_DIR="$ROOT/development/service/generated"
mkdir -p "$GENERATED_DIR"

changed_paths_file="$(mktemp)"
trap 'rm -f "$changed_paths_file"' EXIT
(
  {
    git -C "$ROOT" diff --name-only "$BASE" -- 2>/dev/null || true
    git -C "$ROOT" diff --cached --name-only -- 2>/dev/null || true
    git -C "$ROOT" ls-files --others --exclude-standard 2>/dev/null || true
  } | sort -u
) > "$changed_paths_file"

json_array() {
  python3 - "$@" <<'PY'
import json
import sys
print(json.dumps(sys.argv[1:], indent=2))
PY
}

paths_json="$(python3 - "$changed_paths_file" <<'PY'
import json
import sys
from pathlib import Path

paths = [line for line in Path(sys.argv[1]).read_text(encoding="utf-8").splitlines() if line]
print(json.dumps(paths, indent=2))
PY
)"
generated_on="$(date +%F)"

cat > "$GENERATED_DIR/change-surface.json" <<JSON
{
  "generated": true,
  "generated_on": "$generated_on",
  "confidence": "medium",
  "comparison_base": "$BASE",
  "current_worktree_overlay": {
    "changed_paths": $paths_json
  },
  "trigger_hints": {
    "service_map": "Update development/service/SERVICE_MAP.md for topology, entrypoint, integration-boundary, workflow, or hotspot changes.",
    "verify": "Update development/service/VERIFY.md for build, test, lint, local-run, CI, or evidence changes."
  }
}
JSON

cat > "$GENERATED_DIR/hotspots.md" <<'MD'
# Generated Hotspots

Generated guidance, not canon.

## Persistent Hotspots

- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/contract/`
- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/sema/`
- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/json/`
- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/xml/`
- `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/cbor/`
- `vm/src/commonMain/kotlin/io/github/ehlyzov/branchline/vm/`
- `cli/build.gradle`
- `cli/js-package/`
- `playground/src/branchline-language.ts`
- `playground/examples/`
- `.github/workflows/tests.yml`
MD

"$ROOT/bin/audit_contour.sh" --write-report
