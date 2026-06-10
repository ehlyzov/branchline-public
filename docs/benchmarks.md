---
title: Benchmarks
---

# Benchmarks

Performance results for the Branchline interpreter and VM.

## Latest release

--8<-- "benchmarks/latest.md"

## Release history

--8<-- "benchmarks/releases/list.md"

Full archive: [Release benchmark history](releases/).

## Methodology

Benchmark results are split by measurement type so the public pages do not collapse different costs into one speed claim.

| Measurement | What it means | Comparison rule |
| --- | --- | --- |
| Cross-engine JSON execution | JSON-like transformations that can run through Branchline, a Kotlin baseline, and configured JSONata engines. | Compare only rows with equivalent transformation intent and a recorded validation state. |
| Interpreter vs VM execution | Branchline interpreter and VM throughput over the same JMH datasets. | Use the same machine, JDK, inputs, and release artifacts; watch for VM fallback or overhead notes. |
| Branchline-specific measurements | XML conversion, contract inference or diff, inspect/normalize, conversion-loss audit, and canonical mutation style. | Treat as Branchline product-surface measurements unless a fair external-engine analog exists. |
| Publication health | Release summary Markdown, generated HTML pages, and CSV assets. | Verify links point to generated HTML directories and CSV assets sit next to each release page. |

Public benchmark rows should identify the case id, workload category, whether the case is product-representative, engine, score, error margin, allocation when available, expected-failure or unavailable reason, validation state, and notes.

## What we measure

| Area | Interpreter benchmark | VM benchmark |
| --- | --- | --- |
| Path expressions | `InterpreterTransformBenchmark.pathExpressions` | `VMTransformBenchmark.pathExpressions` |
| Array comprehensions | `InterpreterTransformBenchmark.arrayComprehensions` | `VMTransformBenchmark.arrayComprehensions` |
| Typical transform | `InterpreterTransformBenchmark.typicalTransform` | `VMTransformBenchmark.typicalTransform` |

Datasets: Small (10x5), Medium (100x10), Large (500x25).

## Representative case categories

| Category | Status | Public framing |
| --- | --- | --- |
| ETL and API normalization | Planned Tier 1 cross-engine cases such as `etl-order-normalization` and `api-envelope-shaping`. | Representative JSON execution comparison after semantic validation is available. |
| Large filter/map/aggregate | Planned Tier 1 cross-engine case `large-filter-map-aggregate`. | Collection throughput comparison, separate from parse or compile cost. |
| Contract drift and governance | Planned Tier 1 JSON case `contract-drift-projection`; Tier 2 contract inference/diff work remains Branchline-specific. | Execution can be compared only for equivalent JSON projection; contract analysis is a Branchline-specific measurement. |
| Numeric precision invoice handling | Planned Tier 1 cross-engine case `numeric-precision-invoice`. | Requires notes for numeric equivalence and large-id handling before speed claims. |
| XML, inspect, and conversion audit | Planned Tier 2 Branchline-specific cases. | Product-surface measurements, not JSONata speed comparisons by default. |

Current release summaries may still contain micro or suite-shaped cases. Treat them as coverage and plumbing evidence until representative cases and semantic validation are present.

## Run locally
```bash
./gradlew :interpreter-benchmarks:jmh :vm-benchmarks:jmh
```

## Notes
- Compare runs on the same machine and JDK.
- Report deltas against the previous release.
- Missing suites, unavailable engines, expected failures, semantic mismatches, and VM fallback must be visible in the release notes or generated tables.
