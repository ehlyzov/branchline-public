#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "usage: bin/promote_learning.sh '<transient learning text>'" >&2
  exit 2
fi

learning="$*"
lower="$(printf "%s" "$learning" | tr '[:upper:]' '[:lower:]')"
target="discard"
classification="discard"

case "$lower" in
  *verify*|*test*|*gradle*|*ci*|*build*) classification="verification"; target="development/service/VERIFY.md" ;;
  *entrypoint*|*module*|*boundary*|*topology*|*integration*) classification="structural"; target="development/service/SERVICE_MAP.md" ;;
  *term*|*terminology*|*glossary*) classification="terminology"; target="development/service/GLOSSARY.md (create only if ambiguity is recurring and expensive)" ;;
  *decision*|*tradeoff*|*adr*) classification="decision"; target="development/service/ADR/ (create only for durable architectural tradeoffs)" ;;
  *incident*|*recovery*|*runbook*) classification="operational"; target="development/service/runbooks/ or development/service/incidents/ (create only for repeatable operational need)" ;;
esac

python3 - "$classification" "$target" "$learning" <<'PY'
import json
import sys
print(json.dumps({
    "classification": sys.argv[1],
    "promotion_target": sys.argv[2],
    "mutated": False,
    "learning": sys.argv[3],
}, indent=2))
PY
