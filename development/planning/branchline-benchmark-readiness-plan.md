---
status: Implemented
depends_on: ['perf/jsonata-benchmarking', 'docs/benchmarks-docs-fix-plan', 'service/VERIFY']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Completed G7/B7 readiness verdict: Ready with caveats; Branchline DX T9-T18 may resume while benchmark caveats remain visible."
  - date: 2026-06-10
    change: "Completed G4/B4 Branchline-specific benchmark harness: added XML, contract/inspect, conversion-loss, and canonical mutation-style JMH measurements with focused smoke evidence."
  - date: 2026-06-10
    change: "Completed G3 migration-story expansion: five jsonata-migration-pack cases now have inline JSONata, Branchline analogs, Kotlin evaluators, and all-five JMH smoke evidence."
  - date: 2026-06-10
    change: "Completed G2 core Tier 1 JSON case expansion: five product-shaped cross-engine cases now have JSONata expressions, Branchline programs, Kotlin evaluators, and JMH smoke evidence."
  - date: 2026-06-10
    change: "Completed G1/B3 semantic output validation for cross-engine JSON benchmark setup and recorded validation rules in the perf development note."
  - date: 2026-06-10
    change: "Completed G0 audit/methodology pass: corrected current matrix count to 17 cases and marked B0/B1 done with comparison caveats."
  - date: 2026-06-10
    change: "Added execution split reference for goal-mode agents."
  - date: 2026-06-10
    change: "Created benchmark-first roadmap from deep research: prepare credible comparison cases before broader DX/adoption packaging; editor/LSP explicitly out of scope."
---
# Branchline Benchmark Readiness Plan

## Purpose

This plan turns the deep research recommendation into an execution-ready benchmark-first increment. The goal is to make Branchline credible as a niche contract-aware transformation engine before investing more effort into adoption packaging.

The benchmark story must prove the narrow product thesis:

- Branchline is not a general-purpose language bet.
- Branchline should be evaluated as a JSON/XML transformation, contract governance, inspectability, and AI-authored mapping engine.
- Public claims must be backed by reproducible cases, semantic validation, release summaries, and clear caveats.

## Explicit Scope Decision

**In scope now:**

- Representative benchmark cases for JSON-like transforms where JSONata comparison is meaningful.
- Branchline-only benchmark cases for XML, contracts, numeric precision, inspect/normalize, and governance workflows.
- Semantic output validation before throughput comparisons.
- Public benchmark summary publication and docs repair.
- Known regression follow-up for `performance/case001`, `string-concat/case000`, and VM fallback/overhead signals.

**Out of scope now:**

- Editor, IDE, LSP, and VS Code work.
- Managed governance SaaS.
- Kubernetes/live contract break detection.
- General-purpose language positioning.
- New language syntax only for benchmark wins.

## Current Evidence Snapshot

- `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml` currently contains 27 cases after G3.
- The prior 17-case set remains useful but skewed toward four custom inline examples, seven JSONata suite function/HOF cases, five selector/operator primitives, and one synthetic performance case.
- G2 added the five core product-shaped Tier 1 JSON cases: `etl-order-normalization`, `large-filter-map-aggregate`, `contract-drift-projection`, `numeric-precision-invoice`, and `api-envelope-shaping`.
- G3 added the five migration-story Tier 1 JSON cases: `jsonata-migration-pack-01`, `jsonata-migration-pack-02`, `jsonata-migration-pack-03`, `jsonata-migration-pack-04`, and `jsonata-migration-pack-05`.
- G4 added Branchline-specific JMH harnesses for XML, contract/inspect, conversion-loss, and canonical mutation-style measurements in `interpreter-benchmarks` and `vm-benchmarks`.
- `development/perf/jsonata-benchmarking.md` records that semantic output validation and Branchline-specific measurements are in place and that full-suite mapping remains open.
- `development/docs/benchmarks-docs-fix-plan.md` records broken benchmark page links/assets, missing CSV downloads, missing interpreter-vs-VM comparison, and over-precise numeric formatting.
- G5 repaired local benchmark docs/publication plumbing and `./gradlew docsBuild` passed, but release-time validation still requires real GitHub release assets.
- G6 found that several rows are implausibly optimized or near-zero allocation, and that VM fallback/disabled/error state is not yet visible enough for public speed ratios.

## Representative Case Portfolio

The benchmark suite should include two tiers.

### Tier 1: Cross-engine JSON comparison

These cases should run across Branchline interpreter, Branchline VM, Kotlin baseline, Dashjoin JSONata, and IBM JSONata when external engines are configured.

| Case | Why it matters | Required shape |
| --- | --- | --- |
| `etl-order-normalization` | Shows normal ETL/API mediation, not only microbenchmarks. | Rename fields, defaults, nested output, line-item mapping. |
| `large-filter-map-aggregate` | Shows realistic collection throughput. | Filter + map + aggregate over a larger array. |
| `contract-drift-projection` | Shows Branchline's contract/governance angle while still comparing execution. | Optional/missing fields, fallbacks, stable output contract expectation. |
| `numeric-precision-invoice` | Shows decimal/large-number safety. | Currency totals, discounts, large IDs kept safe. |
| `api-envelope-shaping` | Shows service boundary payload shaping. | Status/data/errors envelope and nullable fields. |
| `jsonata-migration-pack-01..05` | Shows migration story rather than isolated syntax. | Five clear JSONata expressions with Branchline analogs and Kotlin evaluators. |

### Tier 2: Branchline-specific credibility cases

These should not pretend to be fair JSONata comparisons when JSONata lacks the same feature surface. They should still be benchmarked and documented because they support Branchline's product thesis.

| Case | Why it matters | Required shape |
| --- | --- | --- |
| `xml-to-json-order` | Shows JSON/XML interoperability. | XML input path through CLI/playground-supported mapping, deterministic JSON output. |
| `contract-infer-and-diff` | Shows governance workflow, not just execution. | Inspect/contract inference plus diff/report cost. |
| `inspect-normalize-loop` | Shows AI authoring feedback latency. | Parse/analyze/contracts/normalized source without runtime execution. |
| `conversion-loss-audit` | Shows safety and explainability. | JSON/XML conversion warning audit over representative payloads. |
| `canonical-mutation-style` | Shows current DX strategy. | Compare canonical comprehension/`+=` path against old self-append style where both remain valid. |

## Task Plan

For goal-mode execution, use the companion split: [Branchline Benchmark Readiness - Goal-Mode Agent Chunks](branchline-benchmark-agent-goals.md). It defines G0-G7 prompts, dependencies, allowed files, and verification commands for separate agents.

## B0. Benchmark Surface Audit

- **Status:** Done by G0 on 2026-06-10.
- **Goal:** Produce a short inventory of existing benchmark cases, engines, outputs, and known gaps before changing code.
- **Sources:** `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`, `development/perf/jsonata-benchmarking.md`, `development/docs/benchmarks-docs-fix-plan.md`, `docs/benchmarks.md`, `docs/benchmarks/jsonata.md`.
- **Depends on:** —
- **Read first:**
  - `development/perf/jsonata-benchmarking.md`
  - `development/docs/benchmarks-docs-fix-plan.md`
  - `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`
- **Modify:**
  - This file
  - `development/perf/jsonata-benchmarking.md`
- **Steps:**
  1. Count current matrix cases and classify them by workload type.
  2. Mark which cases are product-representative and which are micro/suite coverage.
  3. Record known blocked comparisons: missing external engine repos, expected failures, VM fallback, missing semantic validation.
- **G0 notes:**
  - Current matrix count is 17 cases.
  - Workload split: 4 custom inline collection arithmetic cases, 7 JSONata suite function/HOF primitive cases, 5 selector/operator primitive cases, and 1 synthetic suite performance case.
  - Product-adjacent seeds exist (`sum_prices`, `filter_names`, `map_discount`, `summary_stats`, `function-sum/case000`, `function-count/case000`, `performance/case001`), but none is sufficient for Tier 1 adoption claims without B2 representative cases and B3 semantic validation.
  - Blocked comparisons: missing optional external JSONata engine jars/repos, expected/unsupported JSONata cases, incomplete failure capture for stdout-only engine errors, VM fallback/overhead, and missing semantic output validation.
- **Verify:**
  ```bash
  ruby -e 'require "yaml"; YAML.load_file("jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml"); puts "case matrix yaml ok"'
  ```
- **DoD:**
  - Existing benchmark coverage is classified.
  - No new public performance claim is made without evidence.

## B1. Comparison Methodology Contract

- **Status:** Done by G0 on 2026-06-10.
- **Goal:** Define how benchmark results may be compared and what cannot be claimed.
- **Sources:** `docs/benchmarks.md`, `docs/benchmarks/jsonata.md`, `development/service/VERIFY.md`.
- **Depends on:** B0
- **Read first:**
  - `docs/benchmarks.md`
  - `docs/benchmarks/jsonata.md`
  - `development/service/VERIFY.md`
- **Modify:**
  - `development/perf/jsonata-benchmarking.md`
  - `docs/benchmarks.md` only after this development record is accepted
- **Steps:**
  1. Separate execution throughput, parse+compile cost, inspect/contract cost, and docs/release publication.
  2. Define engine set: Branchline interpreter, Branchline VM, Kotlin baseline, Dashjoin JSONata, IBM JSONata.
  3. Define comparison caveats for Branchline-only features, external engine availability, unsupported JSONata cases, timeout handling, and semantic non-equivalence.
  4. Define minimum public summary fields: case id, category, engine, score, error margin, allocation if available, expected failure reason, and notes.
- **G0 notes:**
  - `development/perf/jsonata-benchmarking.md` now defines execution throughput, parse/compile cost, inspect/contract cost, and release-publication health as separate result classes.
  - Cross-engine JSON comparisons are limited to Branchline interpreter, Branchline VM, Kotlin baseline, Dashjoin JSONata, and IBM JSONata, with unavailable external engines reported explicitly.
  - Public comparison rows require normalized semantic validation or an explicit expected non-equivalence before speed claims.
  - Public summaries must include case id, workload category, product-representative flag, engine, score, error margin, allocation if available, expected-failure/unavailable reason, validation state, and notes.
- **Verify:**
  ```bash
  ruby -e 't=File.read("development/perf/jsonata-benchmarking.md"); abort "missing methodology" unless t.include?("Benchmark readiness methodology"); puts "methodology ok"'
  ```
- **DoD:**
  - A future report cannot blur execution, inspect, and governance measurements into one speed claim.

## B2. Product Case Matrix Expansion

- **Status:** Tier 1 core and migration-pack cases done by G2/G3 on 2026-06-10.
- **Goal:** Add representative Tier 1 cross-engine cases to the YAML matrix with Branchline and Kotlin analogs.
- **Sources:** Representative case portfolio above, `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`.
- **Depends on:** B1
- **Read first:**
  - `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`
  - `jsonata-benchmarks/src/jmh/kotlin/io/github/ehlyzov/branchline/benchmarks/jsonata/JsonataBenchmarkSupport.kt`
- **Modify:**
  - `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`
  - Kotlin evaluator registry and evaluator functions
  - `development/perf/jsonata-benchmarking.md`
- **Steps:**
  1. Add `etl-order-normalization`, `large-filter-map-aggregate`, `contract-drift-projection`, `numeric-precision-invoice`, and `api-envelope-shaping`.
  2. Add five `jsonata-migration-pack-*` cases only if each has a clear Branchline analog and Kotlin evaluator.
  3. Keep input JSON inline unless the payload is too large; if large, add a committed fixture path and document it.
  4. Do not add XML cases to JSONata matrix unless the comparison is semantically honest.
- **G2 notes:**
  - Added all five core Tier 1 JSON cases to `jsonata-case-matrix.yaml` with inline JSONata, compact inline input JSON, Branchline programs, and `kotlinEvalId` values.
  - Added Kotlin evaluator registry entries and evaluator functions for all five new IDs in `JsonataBenchmarkSupport.kt`.
  - Kept payloads inline; no fixture files were needed.
  - Verification covered the required pair (`etl-order-normalization`, `numeric-precision-invoice`) and an additional all-five smoke run; no benchmark error report was produced.
- **G3 notes:**
  - Added five migration-story cases to `jsonata-case-matrix.yaml` with inline JSONata, compact inline input JSON, Branchline programs, and `kotlinEvalId` values.
  - `jsonata-migration-pack-01` covers lookup enrichment from code tables to display values.
  - `jsonata-migration-pack-02` covers string cleanup with trim/lowercase/initial extraction.
  - `jsonata-migration-pack-03` covers legacy feature-state normalization with default owner values.
  - `jsonata-migration-pack-04` covers timestamp slicing and event label construction.
  - `jsonata-migration-pack-05` covers tag-list denormalization with `$join`/`JOIN`.
  - Kept payloads inline and did not add expected failures; all configured engines ran the five cases in the G3 smoke run.
  - The required G3 JMH run completed with `BUILD SUCCESSFUL`; no benchmark error report was produced.
- **Verify:**
  ```bash
  ./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,numeric-precision-invoice -PjmhWarmupIterations=1 -PjmhIterations=1
  ```
- **DoD:**
  - Representative cases compile for Branchline interpreter and VM.
  - Kotlin baseline exists for every Tier 1 case.
  - Missing external JSONata engines are reported, not hidden.

## B3. Semantic Output Validation

- **Status:** Done by G1 on 2026-06-10.
- **Goal:** Validate normalized JSON output before throughput numbers are treated as comparable.
- **Sources:** `development/perf/jsonata-benchmarking.md` Step 6.
- **Depends on:** B2
- **Read first:**
  - `jsonata-benchmarks/src/jmh/kotlin/io/github/ehlyzov/branchline/benchmarks/jsonata/CrossEngineBenchmark.kt`
  - JSON canonicalization docs
- **Modify:**
  - jsonata benchmark validation helpers
  - `development/perf/jsonata-benchmarking.md`
- **Steps:**
  1. Define normalized JSON equivalence rules.
  2. Compare Branchline interpreter, Branchline VM, Kotlin, and configured JSONata engine outputs before measurement.
  3. Record expected non-equivalence explicitly per case/engine.
  4. Ensure validation failure disables the case for that engine with a clear report entry.
- **G1 notes:**
  - `CrossEngineBenchmark` now runs a setup-time cross-engine validation pass over the filtered cases before preparing the measured runner for the current engine.
  - Normalization compares JSON-like object keys by sorted key/value semantics, arrays by order, finite numbers by scale-insensitive decimal value, and strings/booleans/null exactly.
  - Kotlin is the preferred reference output when it is available; otherwise the first successful comparable engine output becomes the reference.
  - Expected failures disable the case/engine before measurement and write an `expected-failure` report entry instead of being treated as semantic mismatches.
  - Engine unavailability, compile/evaluation failures, timeouts, unsupported JSON node shapes, and semantic mismatches disable the case/engine and write report entries.
  - Current JMH rows still execute for disabled cases by consuming the disabled message; public report generation must read validation/error state before using a row as comparable throughput.
- **Verify:**
  ```bash
  ./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=sum_prices,filter_names -PjmhWarmupIterations=1 -PjmhIterations=1
  ```
- **DoD:**
  - Public comparison results only include semantically validated rows or explicit expected-failure rows.

## B4. Branchline-Specific Benchmark Harness

- **Status:** Done by G4 on 2026-06-10, with full-module verification narrowed for time.
- **Goal:** Add or extend benchmark paths for XML, contract inference/diff, inspect/normalize, conversion-loss audit, and canonical mutation style.
- **Sources:** Tier 2 case portfolio above, `development/service/VERIFY.md`.
- **Depends on:** B1
- **Read first:**
  - `interpreter-benchmarks/`
  - `vm-benchmarks/`
  - `cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt`
- **Modify:**
  - benchmark modules as appropriate
  - docs benchmark methodology after development record
  - `development/perf/jsonata-benchmarking.md` or a new perf record if the module is not JSONata-specific
- **Steps:**
  1. Keep Branchline-only cases out of cross-engine JSONata claims.
  2. Measure inspect/normalize separately from execution.
  3. Measure XML/conversion-loss paths through the same public surface users call.
  4. Keep payload fixtures deterministic and committed.
- **G4 notes:**
  - Added a focused `BranchlineSpecificBenchmark` class under `interpreter-benchmarks` for `xml-to-json-order`, `contract-infer-and-diff`, `inspect-normalize-loop`, `conversion-loss-audit`, and `canonical-mutation-style`.
  - Added a focused `BranchlineSpecificVMBenchmark` class under `vm-benchmarks` for the VM-applicable `xml-to-json-order` and `canonical-mutation-style` execution paths.
  - XML and conversion-loss cases use public CLI XML parsing/conversion warning helpers where available, rather than private-only parser shortcuts.
  - `inspect-normalize-loop` measures inspect/analyze/normalized-source output without executing the transform.
  - These rows are Branchline-specific measurements and must stay out of JSONata-equivalent throughput claims unless a fair external-engine analog is introduced.
  - Verification used compile plus focused JMH smoke runs for the new classes. The full `./gradlew :interpreter-benchmarks:jmh :vm-benchmarks:jmh` task was started and completed the new G4 interpreter rows, then was stopped while running pre-existing benchmark rows because it was too long for this chunk.
- **Verify:**
  ```bash
  ./gradlew :interpreter-benchmarks:jmh :vm-benchmarks:jmh
  ```
- **DoD:**
  - Branchline-only strengths have measurements without false JSONata equivalence claims.

## B5. Benchmark Docs and Release Publication Repair

- **Status:** Done by G5 on 2026-06-10, with release-time validation caveat.
- **Goal:** Make benchmark results visible and reproducible in the public docs.
- **Sources:** `development/docs/benchmarks-docs-fix-plan.md`.
- **Depends on:** B1
- **Read first:**
  - `development/docs/benchmarks-docs-fix-plan.md`
  - `.github/workflows/deploy.yml`
  - `.github/workflows/release-artifacts.yml`
  - `.github/scripts/fetch-benchmark-summaries.sh`
  - `.github/scripts/jmh-report.bl`
  - `.github/scripts/jsonata-report.bl`
- **Modify:**
  - Files listed in `development/docs/benchmarks-docs-fix-plan.md`
  - benchmark docs pages
- **Steps:**
  1. Execute Agents A-D from the existing docs fix plan.
  2. Add summary sections for the representative case categories from this plan.
  3. Keep CSV assets downloadable next to each release summary page.
  4. Keep manual dispatch usable for benchmark docs rebuilds.
- **Verify:**
  ```bash
  ./gradlew docsBuild
  ```
- **DoD:**
  - Latest benchmark pages no longer read as empty placeholder promises after a release with assets.
  - Release pages link to HTML directories and CSV assets.
- **G5 notes:**
  - Release page links now target generated HTML directories, CSV assets are co-located with release pages, and manual deploy dispatch can take an explicit ref.
  - Report scripts round JMH and JSONata values to three decimal places, and the JMH shared key uses relative paths so interpreter-vs-VM summaries can render both inputs.
  - Public docs now separate cross-engine JSON execution, interpreter-vs-VM execution, Branchline-specific measurements, and publication health.
  - `./gradlew docsBuild` passed locally. Release-time validation remains external because it requires an actual GitHub release with benchmark Markdown and CSV assets.

## B6. Known Regression Follow-Up

- **Status:** Done by G6 on 2026-06-10; follow-up work is benchmark credibility instrumentation, not runtime tuning.
- **Goal:** Address or explicitly document known performance credibility risks before public benchmark claims.
- **Sources:** `development/perf/interpreter-performance-tasks.md`, `development/perf/jsonata-benchmarking.md`.
- **Depends on:** B3
- **Read first:**
  - `development/perf/interpreter-performance-tasks.md`
  - `development/runtime/runtime-optimizations.md`
  - `development/architecture/vm-interpreter-split.md`
- **Modify:**
  - relevant perf/runtime development docs
  - code only through a separate implementation task
- **Steps:**
  1. Re-check `performance/case001` and `string-concat/case000` against current main.
  2. Identify any VM fallback/overhead cases that dominate the public comparison.
  3. Either fix with targeted tasks or document limitations in the release summary.
- **Verify:**
  ```bash
  ./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=performance/case001,string-concat/case000
  ```
- **DoD:**
  - Public benchmark notes distinguish actual regressions from expected VM limitations.
- **G6 notes:**
  - The required short run for `performance/case001` and `string-concat/case000` completed with `BUILD SUCCESSFUL` and produced no error report.
  - `performance/case001` still shows VM overhead in the short run; the Branchline VM row was slower than the interpreter.
  - The old `string-concat/case000` regression is not directly actionable because the current Branchline analog is constant-shaped and reports near-zero allocation.
  - Several representative G2/G3 rows and at least one IBM JSONata row look implausibly optimized or near-zero allocation. These rows must not support public speed ratios until the harness proves per-invocation execution.
  - Public summaries need validation, disabled/error, VM fallback, execution-state, and impossible-row flags before adoption-facing speed claims.

## B7. Benchmark Readiness Verdict

- **Status:** Done by G7 on 2026-06-10.
- **Goal:** Produce a final readiness verdict that decides whether broader DX/adoption work may proceed.
- **Sources:** B0-B6 outputs.
- **Depends on:** B2, B3, B4, B5, B6
- **Read first:**
  - all changed benchmark docs
  - `development/INDEX.md`
  - `development/service/VERIFY.md`
- **Modify:**
  - `development/planning/branchline-benchmark-readiness-plan.md`
  - `development/INDEX.md`
- **Steps:**
  1. Record commands run and result paths.
  2. Record unverified external-engine gaps.
  3. Decide whether benchmark evidence is enough to resume Branchline DX T9-T18 and adoption packaging.
  4. Update index status if this increment is complete.
- **Verify:**
  ```bash
  ruby -e 'require "yaml"; Dir["development/**/*.{md,yaml}"].each { |f| s=File.read(f); next unless s.start_with?("---\n"); YAML.load(s.split(/^---$/,3)[1]) }; puts "front matter ok"'
  ```
- **DoD:**
  - Maintainer can see what was benchmarked, what was not, and which claims are allowed.

### G7 verdict: Ready with caveats

Branchline DX T9-T18 may resume. The benchmark-first gate has enough structure to continue adoption-facing DX work because G0-G6 established the representative case portfolio, semantic validation gate, Branchline-specific measurements, public docs plumbing, and benchmark-credibility risk record. The caveat is material: benchmark publication must keep credibility warnings visible, and public speedup/ratio claims remain blocked until G6 follow-up instrumentation is implemented.

Verification ledger:

| Goal | Command or check | Recorded result |
| --- | --- | --- |
| G0 | `ruby -e 'require "yaml"; YAML.load_file("jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml"); puts "case matrix yaml ok"'` | `case matrix yaml ok` |
| G0 | `ruby -e 't=File.read("development/perf/jsonata-benchmarking.md"); abort "missing methodology" unless t.include?("Benchmark readiness methodology"); puts "methodology ok"'` | `methodology ok` |
| G1 | `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=sum_prices,filter_names -PjmhWarmupIterations=1 -PjmhIterations=1` | `BUILD SUCCESSFUL`; semantic validation behavior recorded in `development/perf/jsonata-benchmarking.md` |
| G2 | `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,numeric-precision-invoice -PjmhWarmupIterations=1 -PjmhIterations=1` | `BUILD SUCCESSFUL`; no error report produced |
| G2 | `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=etl-order-normalization,large-filter-map-aggregate,contract-drift-projection,numeric-precision-invoice,api-envelope-shaping -PjmhWarmupIterations=1 -PjmhIterations=1` | `BUILD SUCCESSFUL`; no error report produced |
| G3 | `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=jsonata-migration-pack-01,jsonata-migration-pack-02,jsonata-migration-pack-03,jsonata-migration-pack-04,jsonata-migration-pack-05 -PjmhWarmupIterations=1 -PjmhIterations=1` | `BUILD SUCCESSFUL`; no error report produced |
| G4 | `./gradlew :interpreter-benchmarks:jmhClasses :vm-benchmarks:jmhClasses` and focused JMH smoke runs | Successful compile and targeted smoke evidence; full module JMH was stopped after new interpreter rows because the pre-existing matrix was too long |
| G5 | Docs framing and formatter Ruby assertions plus `./gradlew docsBuild` | Assertions passed; `docsBuild` was `BUILD SUCCESSFUL in 670ms` |
| G6 | `./gradlew :jsonata-benchmarks:jmh -PjmhCaseIds=performance/case001,string-concat/case000 -PjmhWarmupIterations=1 -PjmhIterations=1` | `BUILD SUCCESSFUL`; no error report produced; credibility caveats recorded |
| G6 | Representative G2/G3 smoke run for all ten new Tier 1 cases | `BUILD SUCCESSFUL`; no error report produced; many rows flagged as implausibly optimized |

Skipped or external checks:

- Release-time benchmark docs validation was not run because it requires real GitHub release assets with benchmark Markdown and CSV files.
- Full `./gradlew :interpreter-benchmarks:jmh :vm-benchmarks:jmh` was not completed; G4 records compile plus focused smoke evidence only.
- External Dashjoin and IBM JSONata availability still depends on local repo/jar configuration. Missing engines must be reported as unavailable, not hidden.
- Longer stable JMH baselines were not run. Existing one-iteration smoke runs establish wiring, not stable performance numbers.

Allowed public claims:

- Branchline now has a representative Tier 1 JSON benchmark portfolio with five core product cases and five JSONata migration-pack cases.
- Cross-engine rows are eligible for comparison only when normalized semantic validation passes or an expected non-equivalence is recorded.
- Branchline-specific XML, contract/inspect, conversion-loss, and canonical mutation-style measurements exist and must be labeled as Branchline-specific.
- Local benchmark docs plumbing was repaired and `docsBuild` passed; release publication still needs release-asset validation.
- Some current rows expose VM overhead and some rows look implausibly optimized, so benchmark summaries must carry per-case caveats.

Forbidden public claims until follow-up hardening:

- Do not claim Branchline is faster than JSONata, Kotlin, or the VM/interpreter peer from the current smoke rows.
- Do not publish aggregate speed ratios from rows that lack validation/error/disabled/fallback/impossible-row state.
- Do not treat disabled-message rows, VM fallback rows, or near-zero-allocation rows as comparable transformation throughput.
- Do not describe Branchline-specific XML/contract/inspect/conversion measurements as fair JSONata-equivalent comparisons.
- Do not use `string-concat/case000` as regression evidence until the case is rewritten to depend on input or is explicitly classified as constant-only.

## Handoff To Branchline DX

G7 permits resuming `development/planning/branchline-dx-implementation-plan.md` at T9 with benchmark caveats visible. The next DX work should not introduce editor/LSP scope; that remains explicitly outside this roadmap slice.
