---
status: Implemented
depends_on: ['docs/docs-playground-plan']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Started root-cause fix for docsGenerate resolving npx yfm to the wrong npm package."
  - date: 2026-05-05
    change: "Pinned docsGenerate to @diplodoc/cli and declared linked docs pages in toc.yaml so docsBuild succeeds."
---
# Docs Generate Diplodoc CLI Fix

## Problem

`./gradlew docsBuild` fails in `docsGenerate` because the Gradle task runs:

```bash
npx yfm build -i docs -o docs-compiled
```

Without a local root package dependency, `npx` resolves `yfm` from npm as package `yfm@0.2.0`. That package has no executable `bin`, so npm fails with `could not determine executable to run`.

## Decision

Use the actual Diplodoc CLI package explicitly: `@diplodoc/cli`. It publishes the `yfm` binary used by the existing command shape.

Pin the package version in the Gradle task invocation to make local and CI behavior deterministic without depending on global npm state.

The first successful CLI run exposed a second root cause: Diplodoc requires linked Markdown pages to be declared in `docs/toc.yaml`. The fix also adds the Learn pages, numeric/I/O reference pages, and benchmark archive pages to the TOC.

## Verification

- `./gradlew docsBuild` -- passed on 2026-05-05.
- Existing syntax/runtime checks from the two-layer mutation work remain relevant when public docs changed.
