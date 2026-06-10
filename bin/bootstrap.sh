#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STARTUP_ONLY=0

for arg in "$@"; do
  case "$arg" in
    --startup-only) STARTUP_ONLY=1 ;;
    *) echo "unknown argument: $arg" >&2; exit 2 ;;
  esac
done

write_if_missing() {
  local path="$1"
  local body="$2"
  if [[ -e "$ROOT/$path" ]]; then
    echo "exists: $path"
    return 0
  fi
  mkdir -p "$(dirname "$ROOT/$path")"
  printf "%s\n" "$body" > "$ROOT/$path"
  echo "created: $path"
}

write_startup() {
  write_if_missing "AGENTS.md" "# Agent Startup Contract

See development/service/SERVICE_MAP.md and development/service/VERIFY.md. Run git status -sb before editing. Do not guess commands, paths, APIs, or verification results."
  write_if_missing "CLAUDE.md" "# Claude Startup Contract

Follow AGENTS.md. Do not fork service structure or verification truth here."
}

write_startup

if [[ "$STARTUP_ONLY" == "1" ]]; then
  exit 0
fi

write_if_missing "development/service/SERVICE_MAP.md" "# Service Map

Bootstrap placeholder. Refresh with bin/refresh_contour.sh, then replace with repository-specific structure."
write_if_missing "development/service/VERIFY.md" "# Verification Contract

Bootstrap placeholder. Replace with executable repository-specific verification commands."
write_if_missing "development/service/knowledge-gaps.yaml" "gaps: []"
write_if_missing "development/service/generated/change-surface.json" "{\"generated\":true,\"confidence\":\"low\",\"current_worktree_overlay\":{\"changed_paths\":[]}}"
write_if_missing "development/service/generated/hotspots.md" "# Generated Hotspots

Generated guidance, not canon."
write_if_missing "development/service/generated/health-report.json" "{\"generated\":true,\"failures\":[],\"warnings\":[]}"
