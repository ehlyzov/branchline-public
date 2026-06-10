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
| Nested mapping/filtering | `nested-mapping-filtering`, `large-filter-map-aggregate` | Repeated filtering and nested output construction over product-like arrays. |
| Joins/lookups | `lookup-join-enrichment`, `jsonata-migration-pack-01` | Enrich records from object-key lookup tables. |
| String/object construction | `string-object-construction`, `jsonata-migration-pack-02`, `jsonata-migration-pack-04`, `jsonata-migration-pack-05` | String cleanup, labels, slugs, CSV-like joins, and object-shaped public output. |
| XML-ish JSON shape | `xml-ish-shape` | Attribute/text-key JSON that mirrors XML mapping without using Branchline-only XML runtime features. |
| Contract/error branches | `contract-error-branches`, `contract-drift-projection` | Stable output under optional fields, status branches, and error payloads. |
| Numeric safety | `numeric-precision-invoice` | Currency totals, discounts, and large identifiers with documented numeric equivalence. |
| Migration examples | `jsonata-migration-pack-01..05` | Clear JSONata expressions with Branchline analogs and Kotlin evaluators. |

The matrix still includes micro and JSONata-suite shaped rows. A missing external Dashjoin or IBM jar must be reported as unavailable, expected failures must remain visible, and semantic validation must be recorded before publishing speed claims for a case.

`string-concat/case000` is retained as a JSONata-suite scalar baseline and is not used for Branchline speedup claims. Use `string-object-construction` for the comparable object-output string construction baseline.

## Run locally

```bash
DASHJOIN_REPO=path/to/dashjoin-jars \
IBM_JSONATA_REPO=path/to/ibm-jars \
./gradlew :jsonata-benchmarks:jmh
```

Representative long profile:

```bash
DASHJOIN_REPO=path/to/dashjoin-jars \
IBM_JSONATA_REPO=path/to/ibm-jars \
./gradlew :jsonata-benchmarks:jmh -PjmhProfile=representative-long
```

Override the selected cases or run length with `-PjmhCaseIds=...`, `-PjmhWarmupIterations=...`, `-PjmhIterations=...`, `-PjmhTimeOnIteration=...`, and `-PjmhForks=...`.

## Raw artifacts

Latest assets live on the [latest GitHub release](https://github.com/ehlyzov/branchline/releases/latest).

Asset names:

- `branchline-jsonata-summary-<tag>.md`
- `branchline-jsonata-summary-<tag>.csv`
- `branchline-jsonata-jmh-<tag>.json`
