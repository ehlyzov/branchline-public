---
status: Implemented
depends_on:
  - language/numeric-refactor.md
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-04-30
changelog:
  - date: 2026-04-30
    change: "Tracked playground Kotlin/JS dependency loading and JMH summary decimal-domain regression fixes."
---
# Playground And CI Regression Fixes

## Context

Two regressions appeared after recent runtime changes:

- The playground worker loaded a fixed list of Kotlin/JS runtime modules and missed the new `kotlinx-collections-immutable` production library dependency required by `branchline-interpreter.js`.
- The JMH summary script mixed float and decimal numeric kinds when calculating interpreter/VM ratios from benchmark JSON.

## Resolution

- Keep the playground worker dependency list in sync with Kotlin/JS production library output and fail a build-time check when a required interpreter dependency is not loaded before the interpreter bundle.
- Run JMH summary arithmetic in the decimal domain so benchmark precision does not depend on how JSON numbers are parsed.
- Clean `docs/assets` before each playground build so stale hashed assets from older dependency graphs are not retained.

## Verification

- `npm run test:worker-deps` from `playground/`.
- `./gradlew :cli:jvmTest --tests io.github.ehlyzov.branchline.cli.CliAdvancedFlagsTest.jmhSummaryUsesDecimalArithmeticForRatios`.
- `npm run build` from `playground/` after `:interpreter:jsBrowserProductionLibraryDistribution`, then confirm `docs/assets` contains the current worker/runtime assets only.
