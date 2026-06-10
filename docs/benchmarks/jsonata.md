---
title: JSONata Benchmarks
---

# JSONata Benchmarks

Branchline vs JSONata performance on a curated case matrix.

## Latest release results

--8<-- "benchmarks/jsonata/latest.md"

## Release history

--8<-- "benchmarks/jsonata/releases/list.md"

Full archive: [Release benchmark history](releases/).

## Scope

- Default suite: case matrix in `jsonata-benchmarks/src/jmh/resources/jsonata-case-matrix.yaml`.
- Full JSONata test-suite runs are opt-in via `-PjsonataFullSuite=true` or a custom `-PjmhIncludes=...`.
- Cross-engine rows are meaningful only when Branchline interpreter, Branchline VM, Kotlin baseline, and any configured JSONata engines perform semantically equivalent JSON transformations.

## Methodology

JSONata benchmark pages cover execution throughput for JSON-like transformations. They do not include Branchline-only XML, inspect, contract, or conversion-loss measurements unless the page labels them separately.

| Result type | Included engines | Requirement before comparison |
| --- | --- | --- |
| Cross-engine JSON execution | Branchline interpreter, Branchline VM, Kotlin baseline, Dashjoin JSONata, IBM JSONata. | Transformation intent is equivalent and semantic validation records a pass or expected non-equivalence. |
| Parse or compile cost | JSONata expression compilation, Branchline program compilation, or Kotlin setup measured separately. | Do not combine with execution throughput. |
| Unavailable or expected-failure rows | Missing external jars, unsupported functions, timeouts, and expected JSONata failures. | Show the reason instead of treating the row as zero throughput. |

## Representative case categories

| Category | Planned case IDs | Product framing |
| --- | --- | --- |
| ETL and API mediation | `etl-order-normalization`, `api-envelope-shaping` | Common service-boundary JSON reshaping with defaults and nested output. |
| Collection throughput | `large-filter-map-aggregate` | Filter, map, and aggregate over larger arrays. |
| Contract-aware projection | `contract-drift-projection` | Stable output under optional or missing input fields. |
| Numeric safety | `numeric-precision-invoice` | Currency totals, discounts, and large identifiers with documented numeric equivalence. |
| Migration examples | `jsonata-migration-pack-01..05` | Clear JSONata expressions with Branchline analogs and Kotlin evaluators. |

The current matrix is still partly micro and JSONata-suite shaped. A missing external Dashjoin or IBM jar must be reported as unavailable, expected failures must remain visible, and semantic validation must be recorded before publishing speed claims for a case.

## Run locally

```bash
DASHJOIN_REPO=path/to/dashjoin-jars \
IBM_JSONATA_REPO=path/to/ibm-jars \
./gradlew :jsonata-benchmarks:jmh
```

## Raw artifacts

Latest assets live on the [latest GitHub release](https://github.com/ehlyzov/branchline/releases/latest).

Asset names:

- `branchline-jsonata-summary-<tag>.md`
- `branchline-jsonata-summary-<tag>.csv`
- `branchline-jsonata-jmh-<tag>.json`
