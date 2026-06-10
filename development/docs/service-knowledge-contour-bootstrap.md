---
status: Implemented
depends_on: []
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-04-30
---
# Service Knowledge Contour Bootstrap

## Goal

Bootstrap a minimal service knowledge contour for the Branchline repository.

## Scope

Create only the mandatory contour core and generated layer:

- root startup contracts: `AGENTS.md`, `CLAUDE.md`;
- canonical service docs: `development/service/SERVICE_MAP.md`, `development/service/VERIFY.md`, `development/service/knowledge-gaps.yaml`;
- generated overlays: `development/service/generated/change-surface.json`, `development/service/generated/hotspots.md`, `development/service/generated/health-report.json`;
- contour lifecycle scripts under `bin/`.

## Non-goals

- Do not create ADR, runbook, migration, glossary, incident, or agent subtrees during bootstrap.
- Do not change language behavior, runtime behavior, tests, build logic, or CI workflow behavior.
- Do not edit untracked `.claude/` content.

## Verification

- Run the contour audit script after files are installed.
- Run shell syntax checks for the new lifecycle scripts.
- Do not run the full Gradle build because the change is documentation and shell tooling only.

## Result

Implemented the mandatory startup layer, canonical service contour, generated overlay layer, and contour lifecycle scripts. The local canonical root is `development/service/` because `docs/` is reserved for product documentation and generated site assets. No event-driven docs were created during bootstrap.
