---
status: Implemented
depends_on: ['planning/branchline-benchmark-readiness-plan', 'perf/jsonata-benchmarking']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Completed H1-H4: JSONata benchmarks now emit state reports, summaries consume row state, and credibility flags exclude implausible rows from speedup totals."
  - date: 2026-06-10
    change: "Started the short benchmark hardening increment before resuming Branchline DX T9-T18."
---
# Branchline Benchmark Hardening Plan

## Purpose

This is a short follow-up to the benchmark readiness pass. G0-G7 made the benchmark suite broad enough to compare Branchline with JSONata, but G6 found that the current publication path can still turn disabled, fallback, or implausibly optimized rows into credible-looking speed claims.

The goal of this increment is to harden the benchmark evidence just enough that the next Branchline DX T9-T18 work can resume with honest benchmark caveats and machine-readable row state.

## Scope

In scope:

- Emit machine-readable per-case/per-engine state for JSONata cross-engine benchmarks.
- Surface validation, disabled, error, expected-failure, and not-comparable state in generated summary artifacts.
- Prevent public speedup summaries from counting rows that are disabled, invalid, or marked not comparable.
- Add a first credibility flag for implausibly high-throughput near-zero-allocation rows.
- Keep the increment small and verification-focused.

Out of scope:

- Editor, IDE, LSP, and VS Code work.
- Broad runtime optimization.
- Full VM fallback API redesign.
- Full JSONata suite mapping.
- Adoption copy that claims Branchline is faster than JSONata.

## H0. State Report Contract

- **Goal:** Define the machine-readable state attached to each cross-engine result row.
- **Modify:** this file, `development/perf/jsonata-benchmarking.md`.
- **Required fields:** case id, engine id, validation state, comparable boolean, phase, reason/message, and notes.
- **DoD:** Report semantics are documented before harness changes land.

## H1. Harness State Report

- **Goal:** Write a per-case/per-engine state artifact during `:jsonata-benchmarks:jmh`.
- **Modify:** JSONata benchmark harness files under `jsonata-benchmarks/src/jmh/kotlin/io/github/ehlyzov/branchline/benchmarks/jsonata/`.
- **Expected artifacts:**
  - `jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.json` for release-summary consumption.
  - `jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.csv` for quick human inspection.
- **DoD:** A focused JMH run produces the state report and includes disabled/error rows explicitly.

## H2. Summary State Consumption

- **Goal:** Make `.github/scripts/jsonata-report.bl` consume the JSON state report and exclude invalid rows from speedup summaries.
- **Modify:** `.github/scripts/jsonata-report.bl`, `.github/workflows/release-artifacts.yml` if an extra shared input is needed.
- **DoD:** Generated Markdown/CSV includes row state and speedups count only comparable rows.

## H3. Credibility Guard

- **Goal:** Add a conservative first-pass flag for rows that look optimized away or not transformation-shaped.
- **Modify:** `.github/scripts/jsonata-report.bl` and docs/development notes as needed.
- **Rule:** Near-zero-allocation rows with implausibly high throughput are marked `credibility_flag`, not used for adoption-facing speed ratios unless explicitly classified as constant/no-op.
- **DoD:** `string-concat/case000` and similar rows cannot silently enter aggregate ratios.

## H4. Verification And Resume Gate

- **Goal:** Prove the hardening increment works on a small representative set, then resume DX T9-T18.
- **Verify:**
  ```bash
  ./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=performance/case001,string-concat/case000,api-envelope-shaping -PjmhWarmupIterations=1 -PjmhIterations=1
  ./gradlew --no-daemon :cli:runBl --args "$PWD/.github/scripts/jsonata-report.bl --shared-file jmh=$PWD/jsonata-benchmarks/build/results/jmh/results.json --shared-file state=$PWD/jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.json --shared-format json --shared-key basename --write-output --write-output-dir $PWD/build/jsonata-benchmarks --output-format json-compact"
  ```
- **DoD:** Summary artifacts show state/credibility information, and the next active plan is Branchline DX T9-T18.

## Result

Completed on 2026-06-10.

Implemented:

- `CrossEngineBenchmark` writes state artifacts after semantic validation:
  - `jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.json`
  - `jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.csv`
- State rows include `engine`, `case`, `validation_state`, `comparable`, `phase`, `reason`, and `notes`.
- `.github/scripts/jsonata-report.bl` consumes the JSON state report as a second shared input.
- JSONata Markdown and CSV summaries now include validation state, comparable state, allocation, reason/notes, and `credibility_flag`.
- Speedup summaries use only rows with `comparable=true` and no credibility flag.
- Rows with near-zero allocation and implausibly high throughput are marked `implausible_high_score_near_zero_alloc`.
- The release workflow now requires `state-report.json` before building JSONata summary artifacts.

Focused verification:

```bash
./gradlew :jsonata-benchmarks:jmh --rerun-tasks -PjmhCaseIds=performance/case001,string-concat/case000,api-envelope-shaping -PjmhWarmupIterations=1 -PjmhIterations=1
./gradlew --no-daemon :cli:runBl --args "$PWD/.github/scripts/jsonata-report.bl --shared-file jmh=$PWD/jsonata-benchmarks/build/results/jmh/results.json --shared-file state=$PWD/jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.json --shared-format json --shared-key basename --write-output --write-output-dir $PWD/build/jsonata-benchmarks --output-format json-compact"
```

Verification result:

- JMH completed with `BUILD SUCCESSFUL` and wrote `jsonata-benchmarks/build/results/jmh/results.json`.
- `state-report.json` contained 15 rows for the focused three-case, five-engine run.
- `build/jsonata-benchmarks/jsonata-summary.csv` contained 15 rows with state and credibility columns.
- `branchline-interpreter/string-concat`, `branchline-vm/string-concat`, and `ibm/performance` were non-comparable and had credibility flags where appropriate.
- The case breakdown rendered `string-concat/case000` Branchline ratios as `n/a` instead of treating the near-zero-allocation rows as valid speedups.

Next active work: resume Branchline DX T9-T18.
