---
status: In Progress
depends_on: []
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Completed benchmark hardening H1-H4: state-report JSON/CSV, summary state consumption, and credibility flags for non-comparable or implausible rows."
  - date: 2026-06-10
    change: "Recorded G7 readiness verdict: Ready with caveats; DX T9-T18 may resume but public speed claims remain blocked by row-credibility gaps."
  - date: 2026-06-10
    change: "Completed G6 benchmark credibility follow-up: rechecked legacy regression cases, VM fallback/overhead evidence, and representative-case row credibility without runtime changes."
  - date: 2026-06-10
    change: "Completed G4 Branchline-specific measurements: added interpreter and VM JMH harnesses for XML, contract/inspect, conversion-loss, and canonical mutation-style cases, with targeted smoke evidence."
  - date: 2026-06-10
    change: "Completed G3 migration-story cases: added five jsonata-migration-pack inline JSON cases with Branchline programs, Kotlin evaluators, and all-five JMH evidence."
  - date: 2026-06-10
    change: "Completed G2 core Tier 1 product cases: added five inline JSON cases with JSONata expressions, Branchline programs, Kotlin evaluators, and narrow JMH evidence."
  - date: 2026-06-10
    change: "Completed G1 semantic validation: cross-engine benchmark setup now normalizes JSON-like outputs before accepting throughput rows, with mismatches and expected failures reported per engine/case."
  - date: 2026-06-10
    change: "Completed G0 benchmark surface audit: corrected the YAML matrix count to 17 cases, classified current coverage, and strengthened public comparison rules."
  - date: 2026-06-10
    change: "Linked JSONata benchmarking to the benchmark-first roadmap and identified missing representative product cases before public comparison claims."
  - date: 2026-01-06
    change: "Latest benchmark run recorded in body."
  - date: 2026-02-01
    change: "Migrated from research/jsonataperf.md and added YAML front matter."
---
# Goal

## Status (as of 2026-01-31)
- Stage: In progress.
- Steps 1-11 are done for the core and migration-pack Tier 1 cases plus Branchline-specific measurements; full-suite mapping remains open.
- Next: complete remaining YAML mappings and keep Branchline-specific rows separate from JSONata-equivalent public comparison claims.

## Benchmark readiness methodology (2026-06-10)

This benchmark stream now feeds [Branchline Benchmark Readiness Plan](../planning/branchline-benchmark-readiness-plan.md). The goal is no longer only "run JSONata suite cases"; it is to produce a credible comparison story for Branchline's actual niche: contract-aware JSON/XML transformation, inspectability, deterministic output, and AI-authored mapping workflows.

Public comparison rules:

- Execution throughput, parse/compile cost, inspect/contract cost, and release-publication health are separate result classes. Do not combine them into one speed claim or ratio.
- Cross-engine JSON comparisons may include only these engines: Branchline interpreter, Branchline VM, Kotlin baseline, Dashjoin JSONata, and IBM JSONata. A missing external engine must appear as unavailable/skipped, not as a zero or omitted denominator.
- Branchline can be compared with JSONata engines only when the case is JSON-like, the transformation intent is semantically equivalent, and normalized output validation passes for every included engine or records an expected non-equivalence.
- Branchline-only XML, contract inference/diff, inspect/normalize, conversion-loss audit, and canonical mutation benchmarks must be labeled as Branchline-specific measurements unless a fair external-engine analog exists.
- Parse/compile measurements must identify whether they compile JSONata expressions, Branchline programs, or Kotlin setup; execution measurements must identify whether compiled/reused artifacts are used.
- Timeout, unsupported syntax/function coverage, expected failure, semantic mismatch, VM fallback, and VM interpreter fallback/overhead must be reported per case and engine before any aggregate comparison.
- Public summaries must include at least: case id, workload category, product-representative flag, engine, score, error margin, allocation if available, expected-failure/unavailable reason, validation state, and notes.
- Do not publish speed claims for a case until semantic output validation either passes or records an expected non-equivalence.
- Keep editor/LSP out of this benchmark readiness increment.

## G1 semantic output validation (2026-06-10)

`CrossEngineBenchmark` now performs a pre-measurement semantic validation pass for the filtered case set during JMH trial setup. The validation pass compiles/evaluates the comparable engines for each case, normalizes outputs, and disables any case/engine whose output cannot be compared cleanly.

Validation rules:

- Comparable engines are Kotlin, Branchline interpreter, Branchline VM, Dashjoin JSONata, and IBM JSONata.
- Kotlin is the preferred reference output when available; otherwise the first successful comparable engine output is used.
- Objects compare by key/value semantics with lexicographically sorted keys, so insertion order does not affect validation.
- Arrays remain order-sensitive.
- Numbers compare as finite decimal values with scale-insensitive equality, so `1`, `1.0`, and `1.00` are equivalent.
- Strings, booleans, and null compare exactly.
- Non-finite numbers, Jackson missing nodes, unsupported JSON node types, compile errors, engine unavailability, evaluation errors, and timeouts disable that case/engine and are recorded in `jsonata-benchmarks/build/reports/jsonata-benchmarks/error-report.log`.
- JSONata test-suite `result` values are not used as the comparison oracle for cross-engine benchmarks; validation compares actual cross-engine outputs only.
- `expectedFailures` remain explicit non-comparable rows: the case/engine is disabled before measurement and a report entry records the expected reason.

Limitations:

- Disabled rows still appear as JMH rows because the current harness consumes the disabled message in `evaluate`; public summary generation now consumes `state-report.json` and must keep using it before presenting a row as comparable throughput.
- A case with fewer than two successful comparable outputs cannot prove cross-engine equivalence; it is not marked mismatched, but it should not be used for a multi-engine speed claim.
- Validation is repeated per JMH trial setup, so the error report may contain duplicate entries for the same case/engine in larger parameter runs.

## Benchmark hardening H1-H4 (2026-06-10)

The short hardening increment from [Branchline Benchmark Hardening Plan](../planning/branchline-benchmark-hardening-plan.md) is complete.

Implemented behavior:

- `CrossEngineBenchmark` writes row state after semantic validation to:
  - `jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.json`
  - `jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.csv`
- State rows include `engine`, `case`, `validation_state`, `comparable`, `phase`, `reason`, and `notes`.
- `.github/scripts/jsonata-report.bl` consumes `state-report.json` as a second JSON shared input and joins it with JMH result rows by `(engine, case)`.
- `jsonata-summary.md` and `jsonata-summary.csv` include validation state, comparable state, allocation, reason/notes, and `credibility_flag`.
- Speedup summaries count only rows with `comparable=true` and no credibility flag.
- Near-zero-allocation rows with implausibly high throughput are marked `implausible_high_score_near_zero_alloc` and excluded from speedup totals.
- Negative allocation values from JMH's near-zero measurement noise are displayed as `0` in summary artifacts.

Focused verification:

```
./gradlew :jsonata-benchmarks:jmh --rerun-tasks -PjmhCaseIds=performance/case001,string-concat/case000,api-envelope-shaping -PjmhWarmupIterations=1 -PjmhIterations=1
./gradlew --no-daemon :cli:runBl --args "$PWD/.github/scripts/jsonata-report.bl --shared-file jmh=$PWD/jsonata-benchmarks/build/results/jmh/results.json --shared-file state=$PWD/jsonata-benchmarks/build/reports/jsonata-benchmarks/state-report.json --shared-format json --shared-key basename --write-output --write-output-dir $PWD/build/jsonata-benchmarks --output-format json-compact"
```

Result:

- JMH completed with `BUILD SUCCESSFUL`.
- Report generation completed with `BUILD SUCCESSFUL`.
- The generated state report had 15 rows for three cases across five engines.
- The generated summary had 15 rows and included state/credibility fields.
- `branchline-interpreter/string-concat` and `branchline-vm/string-concat` were marked `semantic_mismatch`, `comparable=false`, and `implausible_high_score_near_zero_alloc`.
- `ibm/performance` was marked `compile_error`, `comparable=false`, and `implausible_high_score_near_zero_alloc`.
- `string-concat/case000` Branchline ratios rendered as `n/a` in the case breakdown instead of entering speedup totals.

Remaining caveats:

- VM fallback/execution-state observability is still not exposed by `VMExec`; this remains a future VM hardening task, not a blocker for resuming DX T9-T18.
- One-iteration benchmark numbers remain smoke evidence. Public adoption claims still need longer controlled runs after the row-state guard.

## G2 core product case expansion (2026-06-10)

`jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml` now contains 22 cases: the prior 17 cases plus five core Tier 1 product-shaped JSON cases.

Added core cases:

- `etl-order-normalization`: order/API ETL with field renaming, default status, nested customer/shipping output, line mapping, and gross/net totals.
- `large-filter-map-aggregate`: compact collection-throughput case with filter, map, count, sum, and average over scored items.
- `contract-drift-projection`: stable output projection over drifted account shapes using fallback fields and defaults.
- `numeric-precision-invoice`: invoice arithmetic with rounded totals and a large external reference preserved as a string.
- `api-envelope-shaping`: service-boundary envelope with status metadata, nested user data, nullable middle name, primary-email selection, and default errors list.

Implementation notes:

- Payloads remain inline because they are compact enough for the YAML matrix.
- Each case has an inline JSONata expression, inline input JSON, a Branchline program, and a `kotlinEvalId`.
- Kotlin evaluator functions were added in `JsonataBenchmarkSupport.kt` near the existing evaluator registry/functions, with small helper additions for booleans and money rounding.
- Do not make public speed claims from the short verification runs; they only establish that the cases are selectable and execute through the benchmark path.

Verification:

- Red check before changes: `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,numeric-precision-invoice -PjmhWarmupIterations=1 -PjmhIterations=1` produced JMH setup failures for both missing case IDs while Gradle still exited successfully with an empty result table.
- YAML parse: `ruby -e 'require "yaml"; YAML.load_file("jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml"); puts "case matrix yaml ok"'` printed `case matrix yaml ok`.
- Required narrow run after changes: `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,numeric-precision-invoice -PjmhWarmupIterations=1 -PjmhIterations=1` completed with `BUILD SUCCESSFUL`; no `jsonata-benchmarks/build/reports/jsonata-benchmarks/error-report.log` was produced.
- Broader G2 smoke run: `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,large-filter-map-aggregate,contract-drift-projection,numeric-precision-invoice,api-envelope-shaping -PjmhWarmupIterations=1 -PjmhIterations=1` completed with `BUILD SUCCESSFUL`; no error report was produced.

## G3 migration-pack case expansion (2026-06-10)

`jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml` now contains 27 cases: the prior 22 cases plus five migration-story JSON cases.

Added migration cases:

- `jsonata-migration-pack-01`: lookup enrichment from compact segment/country codes to display values.
- `jsonata-migration-pack-02`: string cleanup with trim, lowercase, and initial extraction.
- `jsonata-migration-pack-03`: legacy feature-state normalization into booleans with default owner values.
- `jsonata-migration-pack-04`: timestamp slicing and event label construction.
- `jsonata-migration-pack-05`: tag-list denormalization with `$join`/`JOIN`.

Implementation notes:

- Payloads remain inline because they are compact enough for the YAML matrix.
- Each case has an inline JSONata expression, inline input JSON, a Branchline program, and a `kotlinEvalId`.
- Kotlin evaluator registry entries and functions were added for all five migration IDs.
- No expected failures were added; the final G3 smoke run produced rows for Kotlin, Branchline interpreter, Branchline VM, Dashjoin JSONata, and IBM JSONata.
- Do not make public speed claims from the short verification run; it only establishes that the cases are selectable and execute through the benchmark path.

Verification:

- Red check before changes: `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=jsonata-migration-pack-01,jsonata-migration-pack-02,jsonata-migration-pack-03,jsonata-migration-pack-04,jsonata-migration-pack-05 -PjmhWarmupIterations=1 -PjmhIterations=1` produced JMH setup failures for the missing case IDs while Gradle still exited successfully with an empty result table.
- YAML parse: `ruby -e 'require "yaml"; data=YAML.load_file("jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml"); ids=data.fetch("cases").map { |c| c.fetch("id") }; abort "count #{ids.size}" unless ids.size == 27; abort "missing" unless ("01".."05").all? { |n| ids.include?("jsonata-migration-pack-#{n}") }; puts "case matrix yaml ok: #{ids.size} cases"'` printed `case matrix yaml ok: 27 cases`.
- Required all-five run after changes: `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=jsonata-migration-pack-01,jsonata-migration-pack-02,jsonata-migration-pack-03,jsonata-migration-pack-04,jsonata-migration-pack-05 -PjmhWarmupIterations=1 -PjmhIterations=1` completed with `BUILD SUCCESSFUL`; no `jsonata-benchmarks/build/reports/jsonata-benchmarks/error-report.log` was produced.

## G0 benchmark surface audit (2026-06-10)

`jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml` contained 17 cases at the time of the G0 audit. After G2, it contained 22 cases. After G3, it contains 27 cases.

| Workload category | Count | Case IDs | Coverage note |
| --- | ---: | --- | --- |
| Custom inline collection arithmetic | 4 | `sum_prices`, `filter_names`, `map_discount`, `summary_stats` | Small hand-written examples for aggregation, filtering, mapping, and summary stats. Useful smoke coverage, but not representative product payloads. |
| JSONata suite function/HOF primitives | 7 | `function-sift/case004`, `hof-map/case000`, `function-zip/case002`, `hof-zip-map/case000`, `partial-application/case002`, `function-sum/case000`, `function-count/case000` | Exercises function and higher-order-function analogs. Mostly suite mechanics and primitive parity. |
| Selector/operator primitives | 5 | `simple-array-selectors/case000`, `fields/case000`, `numeric-operators/case000`, `string-concat/case000`, `range-operator/case000` | Covers field access, array selector shape, numeric/string operators, and range generation. Microbenchmark coverage. |
| Synthetic suite performance case | 1 | `performance/case001` | Larger filter/label-shaping loop, but still inherited from suite performance coverage rather than a Branchline product scenario. |

Product-representative classification:

- No current YAML case fully satisfies the planned Tier 1 product-representative portfolio.
- Product-adjacent seeds: `sum_prices`, `filter_names`, `map_discount`, `summary_stats`, `function-sum/case000`, `function-count/case000`, and `performance/case001`. They cover ETL fragments, order-like totals, or collection throughput, but they are too small or suite-shaped to support adoption claims.
- Micro/suite coverage: all 17 cases should be treated as micro, conformance-adjacent, or inherited JSONata-suite coverage until B2/G2 and B3/G1 add representative cases and semantic validation.

Blocked comparison conditions:

- External JSONata engines are optional and local: Dashjoin and IBM engine jars require configured/built repos via Gradle properties or environment variables. Missing engines must be reported as unavailable.
- Expected failures and unsupported JSONata features remain part of the comparison surface; they must be visible in the error/expected-failure report instead of silently removed.
- Branchline VM fallback/overhead is known from the latest run and can distort interpreter-vs-VM comparisons until case-level fallback evidence is captured.
- At the G0 audit point, semantic output validation was still missing; the G1 section above now defines the validation gate that future public summaries must consume.
- Dashjoin stdout errors such as `Proc not found 2` may not currently throw exceptions, so failure capture may be incomplete.

Representative Tier 1 cases still missing from the YAML matrix after G3:

- None; the remaining cross-engine expansion work is full-suite mapping rather than the planned Tier 1 portfolio.

Branchline-specific Tier 2 measurements added by G4:

- `xml-to-json-order`: interpreter and VM benchmark paths parse deterministic XML through the public CLI XML parser before running a Branchline mapping that preserves order fields in JSON-like output.
- `contract-infer-and-diff`: interpreter benchmark calls public inspect output with witnesses/contracts and performs a deterministic local path diff over the inferred contract JSON.
- `inspect-normalize-loop`: interpreter benchmark measures inspect/analyze/normalized-source output separately from runtime execution.
- `conversion-loss-audit`: interpreter benchmark uses CLI conversion warning helpers for XML input and XML output warning surfaces.
- `canonical-mutation-style`: interpreter and VM benchmarks compare the canonical `+=` mutation style with the still-valid legacy self-append style.

These cases are Branchline-specific because they exercise XML parsing/output warning surfaces, contract/inspect metadata, conversion-loss reporting, and Branchline mutation syntax. They must not be presented as JSONata-equivalent throughput comparisons unless a fair external-engine analog is added later.

## G6 regression and VM risk follow-up (2026-06-10)

Scope:

- Rechecked the known `performance/case001` and `string-concat/case000` credibility risks on current `main`.
- Inspected the VM fallback path and public comparison rows after G1-G3.
- Did not make runtime code changes. The current evidence points first to benchmark/reporting hardening and VM observability gaps, not to a narrow low-risk runtime fix.

Required verification:

```
./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=performance/case001,string-concat/case000 -PjmhWarmupIterations=1 -PjmhIterations=1
```

Result: `BUILD SUCCESSFUL` on 2026-06-10. No `jsonata-benchmarks/build/reports/jsonata-benchmarks/error-report.log` was produced.

Selected rows from the required run:

| Case | Engine | Score (ops/s) | Allocation note |
| --- | --- | ---: | --- |
| `performance/case001` | Kotlin | 34,016.160 | 90.828 B/op |
| `performance/case001` | Branchline interpreter | 12,557.890 | 106.712 B/op |
| `performance/case001` | Branchline VM | 5,095.741 | 120.125 B/op |
| `performance/case001` | Dashjoin JSONata | 49.740 | 143.220 B/op |
| `performance/case001` | IBM JSONata | 730,772,467.894 | near-zero allocation; not credible as a transformation row |
| `string-concat/case000` | Kotlin | 148,400.809 | 90.013 B/op |
| `string-concat/case000` | Branchline interpreter | 689,231,165.124 | near-zero allocation; not credible as a transformation row |
| `string-concat/case000` | Branchline VM | 711,164,322.172 | near-zero allocation; not credible as a transformation row |
| `string-concat/case000` | Dashjoin JSONata | 149,223.094 | 87.987 B/op |
| `string-concat/case000` | IBM JSONata | 132,781.708 | 88.408 B/op |

Regression status:

- The old `string-concat/case000` regression note does not directly apply to the current cross-engine JMH row. The Branchline analog is a constant expression (`"foo" + "bar"`) and the current Branchline interpreter/VM rows report hundreds of millions of ops/s with near-zero allocation. Treat this as a benchmark-shape problem until the case is rewritten to depend on input and cannot be optimized into a constant.
- The old `performance/case001` regression note is still relevant as a risk area, but it cannot be confirmed or cleared from this single short run because the old baseline was captured against earlier code and a different benchmark state. On current `main`, the row is at least doing non-trivial allocation, and the VM is slower than the interpreter by about 59% in the short run.
- The required run also shows IBM `performance/case001` at an impossible near-zero-allocation rate. Public summaries must filter or annotate rows with impossible throughput/allocation even when no validation error report exists.

Representative-case smoke evidence:

```
./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,large-filter-map-aggregate,contract-drift-projection,numeric-precision-invoice,api-envelope-shaping,jsonata-migration-pack-01,jsonata-migration-pack-02,jsonata-migration-pack-03,jsonata-migration-pack-04,jsonata-migration-pack-05 -PjmhWarmupIterations=1 -PjmhIterations=1
```

Result: `BUILD SUCCESSFUL` on 2026-06-10. No error report was produced.

Observed limitations:

- Many G2/G3 Branchline interpreter and VM rows reported roughly 638M-731M ops/s with near-zero allocation. Examples include `etl-order-normalization`, `large-filter-map-aggregate`, `contract-drift-projection`, `numeric-precision-invoice`, and all five migration-pack cases. These rows should not support public speed claims until the harness proves the transformation executes each invocation.
- `api-envelope-shaping` behaved more like a real measured row: Branchline interpreter 120,414.313 ops/s and Branchline VM 97,962.043 ops/s with about 88 B/op. This suggests at least some representative cases expose VM overhead instead of only constant/no-op behavior.
- Some external JSONata rows also show impossible near-zero-allocation rates, so this is a cross-engine publication problem, not only a Branchline VM problem.

VM fallback and overhead status:

- `VMExec` still catches VM compilation and execution failures and silently falls back to the interpreter unless logs/tracer are inspected. JMH rows do not currently expose whether a `branchline-vm` row executed VM bytecode or interpreter fallback.
- Current public comparison rows therefore cannot distinguish true VM execution, fallback execution, disabled-message rows, and rows that look optimized away.
- The first required fix is not a runtime optimization; it is benchmark credibility instrumentation: capture per-case/per-engine validation state, execution state, fallback count, and impossible-row flags in the generated summary before publishing ratios.

Recommended follow-up tasks:

1. Rewrite constant or near-constant analogs such as `string-concat/case000` to depend on input while preserving semantic equivalence, or mark them micro/constant-only and exclude them from speed ratios.
2. Add a benchmark-side guard that flags rows with near-zero allocation and implausibly high throughput unless the case is explicitly classified as constant/no-op.
3. Expose VM fallback state from `VMExec` into benchmark metadata so a `branchline-vm` result says whether bytecode executed or interpreter fallback ran.
4. Feed validation/error/disabled/fallback state into public summary generation so consume-message and impossible rows cannot be presented as comparable throughput.
5. Re-run controlled longer baselines after the harness hardening, then revisit the old Task 3 and Task 4 regression notes with comparable before/after data.

## G7 readiness verdict (2026-06-10)

Verdict: Ready with caveats. Branchline DX T9-T18 may resume because the benchmark suite now has representative Tier 1 cases, semantic validation rules, Branchline-specific measurements, docs publication plumbing, and recorded regression/VM risk evidence.

The caveat is that current smoke rows are not sufficient for public speed claims. Public summaries must consume validation/error/disabled state, expose VM fallback or execution state, and flag implausibly optimized near-zero-allocation rows before publishing ratios or adoption-facing "faster than" claims.

Allowed claims:

- The benchmark portfolio now covers five core product-shaped JSON cases and five JSONata migration-pack cases.
- Branchline-specific XML, contract/inspect, conversion-loss, and canonical mutation-style measurements exist and are separate from JSONata-equivalent comparisons.
- Semantic validation is required before a cross-engine row can support a public comparison.

Forbidden claims:

- No aggregate speedup, "Branchline faster than JSONata", or interpreter-vs-VM superiority claim from the current one-iteration smoke rows.
- No public ratio using disabled-message rows, VM fallback rows, semantic mismatch rows, or impossible near-zero-allocation rows.
- No regression conclusion from `string-concat/case000` until it is rewritten to depend on input or reclassified as constant-only.

Make a benchmark to compare the performance of JSONata engines with Branchline
(interpreter + VM) and a pure Kotlin baseline.

# Current module snapshot (jsonata-benchmarks/)
- `jsonata-benchmarks/build.gradle` configures JMH and loads dashjoin/IBM jars
  from repo paths supplied via `-PdashjoinRepo`/`DASHJOIN_REPO` and
  `-PibmJsonataRepo`/`IBM_JSONATA_REPO` (plus optional `.env`). Hardcoded
  defaults are removed; missing paths are logged and engines are skipped so the
  module still compiles. JMH run length is configurable via Gradle properties,
  with fast defaults (1 warmup, 1 iteration, 200ms warmup/measurement).
- `JsonataEngineBenchmark` runs parse + evaluate for dashjoin and IBM engines
  across all JSONata test suite cases (scanned from `groups/`), with a
  `jsonata.caseFilter` override to run a subset.
- `JsonataTestSuite.loadCase` reads `groups/<group>/<case>.json`, captures
  expected-failure metadata (`code`, `undefinedResult`, `timelimit`, `depth`,
  `bindings`), and resolves datasets from `datasets/`.
- `CrossEngineBenchmark` reads a YAML case matrix and iterates all entries per
  engine across Kotlin, Branchline interpreter/VM, and JSONata engines.
- `JsonataCaseMatrix` loads
  `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml` to map JSONata
  case IDs to Branchline/Kotlin analogs and expected-failure flags.
- `BenchmarkTimeoutRunner` wraps per-case evaluation to avoid hangs and disables
  cases on timeout/error (default 500ms, configurable via
  `-Djsonata.benchTimeoutMs`; set to `0` to disable).
- `BranchlineCompiler` compiles buffer-mode transforms only and uses `StdLib`
  host functions for interpreter/VM runs.

# Setup
- Kotlin 2.3.0 with JVM toolchain 21 (override per module in
  `jsonata-benchmarks/build.gradle`).
- JSONata test suite is sourced from dashjoin's repo (see inputs below).
- Dashjoin and IBM JSONata engines are loaded via reflection at runtime.

# JSONata test suite inputs
Set one of the following; there is no committed default path:
- `-Djsonata.testSuiteRoot=/path/to/test-suite`
- `JSONATA_TEST_SUITE_ROOT=/path/to/test-suite`
- `DASHJOIN_REPO=/path/to/jsonata-java` (uses `jsonata/test/test-suite` subdir)
You can also place these in `.env` (uncommitted).

# JSONata engines
Set repository paths for jar discovery; do not commit local paths:
- Dashjoin: `-PdashjoinRepo=/path/to/jsonata-java` or `DASHJOIN_REPO=...`
- IBM: `-PibmJsonataRepo=/path/to/JSONata4Java` or `IBM_JSONATA_REPO=...`
`.env` is supported for these keys as well.

Both engines must be built so their jars are on the runtime classpath. Example:
```
cd /path/to/jsonata-java && mvn -q -DskipTests package
cd /path/to/JSONata4Java && mvn -q -DskipTests package
```

# JMH configuration
Defaults are tuned for quick runs. Override with Gradle properties:
- `-PjmhWarmupIterations=1`
- `-PjmhWarmupTime=200ms`
- `-PjmhIterations=1`
- `-PjmhTimeOnIteration=200ms`
- `-PjmhForks=1`
- `-PjmhProfilers=gc` (comma-separated)
- `-PjmhCaseIds=caseA,caseB` to run a subset of YAML cases (default: all YAML ids)
- `-Djsonata.caseFilter=caseA,caseB` to override case IDs at runtime
- `-Djsonata.benchTimeoutMs=500` to bound per-case evaluation (0 disables)

# Methodology (dashjoin-style)
- Parse benchmark compiles JSONata expressions only.
- Evaluate benchmark reuses compiled expressions and pre-parsed inputs.
- JMH reports ops/sec; divide by 1,000 to match dashjoin's kiloOps/sec figures.
- Engine/case failures are recorded to the error report and skipped so the
  remaining engines still emit results.

# JSONata case coverage
`JsonataEngineBenchmark` scans all JSONata test suite cases under `groups/`.
To narrow runs, set `-Djsonata.caseFilter=caseA,caseB` (or use the JMH
`caseFilter` parameter).

# Cross-engine cases (JSONata vs Branchline vs Kotlin)
Equivalence cases are defined in:
`jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`.

Each case provides:
- JSONata test suite ID (default) or inline JSONata + input JSON.
- Branchline program (interpreter + VM).
- Kotlin evaluator ID (resolved in code).
- Optional `expectedFailures` map keyed by engine ID.
The current YAML seeds the original custom cases plus the initial JSONata suite
IDs, includes the five core product-shaped Tier 1 cases, and now includes
the five migration-pack Tier 1 cases, with Branchline/Kotlin mappings for every
listed entry. Full suite coverage is still pending.
Errors are reported to:
`jsonata-benchmarks/build/reports/jsonata-benchmarks/error-report.log`.

# Run
```
./gradlew :jsonata-benchmarks:jmh
```

Results are emitted to:
`jsonata-benchmarks/build/results/jmh/results.json`

# Flaws in the task description
- It implied default local paths for repos and test suite; this is not
  acceptable for committed docs or build scripts.
- It does not state that current coverage is a curated subset; the cross-engine
  benchmark is based on custom cases rather than the JSONata suite.
- It omits that many JSONata cases are excluded (errors, undefinedResult,
  timelimit, depth, bindings), which affects coverage expectations.
- It does not define how "four engines" should be interpreted (JSONata engines
  vs Branchline interpreter/VM vs Kotlin baseline).

# Updated requirements (feedback)
- Each JSONata test case should be exercised across all required engines:
  dashjoin, IBM, Branchline interpreter, Branchline VM, and Kotlin (Kotlin is
  part of the suite; Branchline interpreter is the baseline).
- Include error/undefined cases with expected failures instead of skipping.
- Semantically equivalent JSON outputs are acceptable for validation.
- Keep the case matrix in YAML and maintain it manually.
- Surface expected failures via a separate report file.
- Validation compares cross-engine outputs only (ignore JSONata `result` values).
- Never hardcode local repository paths in source control. Use env vars/Gradle
  properties or dotenv, but do not commit them.

# Plan (approved)
- Step 1 (done): Remove hardcoded defaults for repo/test suite paths and update
  docs to require explicit config.
- Step 2 (done): Make JMH tuning configurable with fast defaults.
- Step 3 (in progress): Define a YAML case matrix that maps every JSONata test
  suite case to a Branchline analog and Kotlin version, plus expected-failure
  flags (seeded cases now have analogs; full-suite mapping pending).
- Step 4 (done): Expand `CrossEngineBenchmark` to read the YAML matrix and run
  dashjoin, IBM, Branchline interpreter, Branchline VM, and Kotlin for each
  case.
- Step 5 (done): Add expected-failure handling (errors/undefined/bindings/
  depth/timelimit/unsupported) and surface it in results instead of skipping
  (errors are logged per engine/case).
- Step 6 (done): Add semantic-output validation (normalized JSON) before
  benchmarking; document equivalence rules.
- Step 7 (done): Document local path configuration (env/Gradle properties,
  optional dotenv) and ensure `.env` is ignored.
- Step 8 (done): Guard per-case execution with a timeout and disable failing
  cases to keep JMH runs finite.
- Step 9 (done): Run CrossEngineBenchmark per YAML case by default so each task
  gets its own JMH result entry.
- Step 10 (done for Tier 1 cases): Add representative product cases from the
  benchmark readiness plan before using the benchmark suite for adoption claims
  (why: replace purely micro/suite-shaped coverage with product-like JSON
  transforms).
- Step 11 (done): Add Branchline-specific measurements for XML, contracts,
  inspect/normalize, conversion-loss audit, and canonical mutation style without
  presenting them as JSONata-equivalent comparisons.

# Progress log
- Step 1: Reviewed module files and documented current behavior (why: establish
  baseline for plan).
- Step 1: Removed hardcoded repo/test-suite defaults and clarified configuration
  requirements (why: avoid committing local paths).
- Step 2: Made JMH tuning configurable with fast defaults (why: keep full-suite
  runs quick while still allowing longer runs).
- Step 3: Added a YAML case matrix and loader seeded with current cases (why:
  establish a single mapping source and make coverage gaps explicit).
- Step 4: Refactored `CrossEngineBenchmark` to read the YAML matrix, apply the
  case filter, and execute all engines per entry (why: align with required
  engine set).
- Step 5: Captured expected-failure metadata from the JSONata test suite and
  allowed expected failures in benchmarks (why: include error/undefined cases
  without hard skips).
- Step 5: Added per-engine error capture and a report file, so failures are
  logged and the run continues (why: ensure all engines emit results).
- Step 7: Added dotenv support in build/runtime path resolution and ignored
  `.env` in git (why: keep builds working without committed paths).
- Step 3: Filled Branchline/Kotlin analogs for every YAML entry (why: enforce
  all-engine coverage for the defined case set).
- Step 2: Added a configurable warmup time via `jmh.warmup` (why: eliminate the
  default 10s warmup and keep runs fast).
- Step 8: Added a per-case timeout (default 500ms) and disable-on-error behavior
  (why: keep long or stuck cases from stalling the suite).
- Step 9: Parameterized CrossEngineBenchmark with `caseId` and defaulted the JMH
  parameters to all YAML cases (why: produce per-task comparisons instead of a
  single aggregate).
- Step 6: Added normalized cross-engine output validation during
  `CrossEngineBenchmark` setup; expected failures, unavailable engines, compile
  failures, evaluation failures, timeouts, undefined/missing JSON nodes, and
  semantic mismatches now disable the case/engine before measurement and record
  report entries.
- Step 6 verification (2026-06-10): `./gradlew :jsonata-benchmarks:jmh
  -PjmhCaseIds=sum_prices,filter_names -PjmhWarmupIterations=1
  -PjmhIterations=1` completed successfully. No validation error report was
  produced for this run.
- Step 10: Added `etl-order-normalization`,
  `large-filter-map-aggregate`, `contract-drift-projection`,
  `numeric-precision-invoice`, and `api-envelope-shaping` to the YAML matrix
  with JSONata expressions, inline payloads, Branchline programs, and Kotlin
  evaluator IDs/functions.
- Step 10 verification (2026-06-10): `./gradlew :jsonata-benchmarks:jmh
  -PjmhCaseIds=etl-order-normalization,numeric-precision-invoice
  -PjmhWarmupIterations=1 -PjmhIterations=1` completed successfully after the
  cases were added. No error report was produced.
- Step 10: Added `jsonata-migration-pack-01`,
  `jsonata-migration-pack-02`, `jsonata-migration-pack-03`,
  `jsonata-migration-pack-04`, and `jsonata-migration-pack-05` to the YAML
  matrix with JSONata expressions, inline payloads, Branchline programs, and
  Kotlin evaluator IDs/functions.
- Step 10 verification (2026-06-10): `./gradlew :jsonata-benchmarks:jmh
  -PjmhCaseIds=jsonata-migration-pack-01,jsonata-migration-pack-02,jsonata-migration-pack-03,jsonata-migration-pack-04,jsonata-migration-pack-05
  -PjmhWarmupIterations=1 -PjmhIterations=1` completed successfully after the
  cases were added. No error report was produced.
- Step 11: Added `BranchlineSpecificBenchmark` in `interpreter-benchmarks` for
  `xml-to-json-order`, `contract-infer-and-diff`, `inspect-normalize-loop`,
  `conversion-loss-audit`, and `canonical-mutation-style`.
- Step 11: Added `BranchlineSpecificVMBenchmark` in `vm-benchmarks` for the
  VM-applicable `xml-to-json-order` and `canonical-mutation-style` execution
  paths.
- Step 11 verification (2026-06-10): `./gradlew
  :interpreter-benchmarks:jmhClasses :vm-benchmarks:jmhClasses` completed
  successfully.
- Step 11 verification (2026-06-10): targeted JMH smoke runs for
  `BranchlineSpecificBenchmark` and `BranchlineSpecificVMBenchmark` completed
  successfully with one warmup, one measurement iteration, one fork, and
  50ms warmup/measurement windows.
- Step 11 verification limitation (2026-06-10): the full
  `./gradlew :interpreter-benchmarks:jmh :vm-benchmarks:jmh` task was started
  and completed the new G4 interpreter rows, then was stopped while running the
  pre-existing benchmark matrix because it was too long for this chunk. Treat
  the G4 evidence as compile plus focused JMH smoke evidence, not a full module
  benchmark publication run.

# Branchline issues and notes
- Array comprehension syntax differs from the JSONata-style examples; Branchline
  supports `[expr FOR EACH name IN list]`, not `[FOR (name IN list) => expr]`.
  We now use `MAP`/`RANGE` to avoid unsupported syntax.
- Some JSONata functions (`$zip`, `$sift`, partial application) have no direct
  Branchline equivalents; the analogs are hand-written and may diverge in edge
  cases.
- Array-root datasets (ex: `dataset4`) require Branchline programs that operate
  on `input` as a list; object-only assumptions break those cases.
- Branchline analogs rely on `StdLib` functions (`MAP`, `FILTER`, `FLATTEN`,
  `RANGE`, `ZIP`, `SUM`, `COUNT`); any missing semantics or ordering differences
  will show up as cross-engine mismatches.
- Branchline VM warns and falls back to interpreter when hitting non-terminating
  decimal expansions (seen during the VM benchmark). This likely depresses VM
  throughput and should be traced to the specific case(s) that trigger it.
- Branchline VM throughput is substantially below the interpreter in the latest
  run (713 ops/s vs 6587 ops/s), suggesting fallback/overhead dominates current
  VM performance for these cases.

# Latest run (2026-01-06)
Command:
```
./gradlew :jsonata-benchmarks:jmh
```

Config:
- Warmup/measurement: 1 iteration, 200ms each.
- Per-case timeout: 500ms (default).

Results (ops/sec, from `jsonata-benchmarks/build/results/jmh/results.json`):
- CrossEngineBenchmark.evaluate (kotlin): 1349.548
- CrossEngineBenchmark.evaluate (branchline-interpreter): 6587.212
- CrossEngineBenchmark.evaluate (branchline-vm): 713.000
- CrossEngineBenchmark.evaluate (dashjoin): 2.368
- CrossEngineBenchmark.evaluate (ibm): 478.412
- JsonataEngineBenchmark.evaluate (dashjoin): 1.377
- JsonataEngineBenchmark.evaluate (ibm): 1.233
- JsonataEngineBenchmark.parse (dashjoin): 5.479
- JsonataEngineBenchmark.parse (ibm): 4.778

Notes:
- Dashjoin logs `Proc not found 2` during evaluation; it does not throw, so the
  error reporter does not capture it. We should decide how to treat stdout
  errors from dashjoin and whether to convert them into recorded failures.
- No error report file was produced for this run (no exceptions were thrown
  during case evaluation).

# Next steps (detailed)
- Identify which case(s) trigger VM fallback: rerun with
  `-Djsonata.caseFilter=caseId` for each YAML entry until the
  "Non-terminating decimal expansion" warning appears, then capture the case ID
  and data set. Decide whether to fix VM numeric handling or mark expected
  failure for VM in the YAML.
- Capture dashjoin stdout errors: find where dashjoin prints
  "Proc not found 2" and decide if this is an error path; if yes, wrap the
  dashjoin engine evaluation to detect this output and record it via
  `BenchmarkErrorReporter` so it shows up in the error log.
- Produce a per-case error report: update `BenchmarkErrorReporter` to always
  create `jsonata-benchmarks/build/reports/jsonata-benchmarks/error-report.log`
  and include any timeouts, compile errors, or evaluation errors.
- Expand the YAML to cover the full JSONata test suite: for each JSONata case,
  add a Branchline analog and Kotlin evaluator (or mark expected failure),
  so the cross-engine benchmark truly exercises all tests.
- Feed validation state into public summary generation so disabled rows are not
  presented as comparable throughput.
- Run longer baselines: increase warmup and measurement (for example 5x 1s) and
  keep the per-case timeout in place to produce stable numbers without hangs.
