# Agent Startup Contract

## Safe Edit Rules

- Assume multiple Codex tabs and local edits may be active.
- Run `git status -sb` before editing.
- If a file has changes you did not make, do not edit it; ask first.
- If unexpected changes appear while working, stop and ask how to proceed.
- Never run destructive git commands unless explicitly instructed.
- Never edit `.env` or environment variable files.
- Route every planned repository change through `development/` first and update `development/INDEX.md`.

## Canonical Knowledge

- Service structure and risk map: `development/service/SERVICE_MAP.md`.
- Verification contract and commands: `development/service/VERIFY.md`.
- Durable unresolved facts: `development/service/knowledge-gaps.yaml`.
- Generated navigation overlays: `development/service/generated/`.

This repository keeps the service contour under `development/service/` because `docs/` is reserved for product documentation and generated site assets.

Do not guess commands, paths, APIs, ownership, or verification results. If the repo does not support a claim, record the uncertainty in the gap registry or ask.

## Change Expectations

- Use `./gradlew`, not a system Gradle binary.
- For syntax or language behavior changes, update grammar, conformance tests, language docs, and playground examples as applicable.
- Keep implementation, `/development` records, and service contour docs in sync when a contour trigger fires.
