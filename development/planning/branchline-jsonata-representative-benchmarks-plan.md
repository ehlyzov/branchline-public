---
status: In Progress
depends_on:
  - perf/jsonata-benchmarking
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-11
changelog:
  - date: 2026-06-11
    change: "Started B1-B5 representative JSONata benchmark expansion, controlled long JMH profile, and public benchmark page link repair."
---
# Branchline JSONata Representative Benchmarks Plan

## Goal

Make the public JSONata comparison credible enough to discuss case by case:

- expand the curated cross-engine case matrix beyond micro examples;
- keep scalar JSONata-suite baselines separate from Branchline object-output baselines;
- add a controlled long JMH profile for GitHub Actions;
- repair public benchmark pages so CSV and release links resolve;
- publish comparison wording only from semantically comparable rows.

Editor/LSP work remains out of scope.

## B1 Decision Rules

Comparable JSONata rows must satisfy all of these:

- JSON-like input and output shape.
- Same transformation intent in JSONata, Branchline, and Kotlin baseline.
- Semantic validation state is `valid`.
- `comparable=true`.
- No credibility flag in generated summary.

Rows are excluded from speedup claims when they are scalar/object mismatches, Branchline-only XML/contract/inspect work, missing external engine rows, unsupported JSONata syntax, expected failures, validation mismatches, or implausible throughput/allocation outliers.

The upstream `string-concat/case000` case is kept as a JSONata scalar baseline. Branchline object-output comparison uses the curated `string-object-construction` case instead.

## B2 Representative Case Targets

The curated representative set should cover:

| Category | Case IDs |
| --- | --- |
| API shaping | `api-envelope-shaping` |
| Nested mapping/filtering | `nested-mapping-filtering` |
| Joins/lookups | `lookup-join-enrichment`, `jsonata-migration-pack-01` |
| String/object construction | `string-object-construction`, `jsonata-migration-pack-02`, `jsonata-migration-pack-04`, `jsonata-migration-pack-05` |
| XML-ish JSON shape | `xml-ish-shape` |
| Error/contract-like branches | `contract-error-branches`, `contract-drift-projection` |
| Numeric and collection throughput | `numeric-precision-invoice`, `large-filter-map-aggregate`, `performance/case001` |

## B3 String Concat Policy

`string-concat/case000` comes from the JSONata suite and returns scalar `"foobar"`. Branchline's idiomatic public transform output is object-shaped, so the old Branchline analog returned `{"result":"foobar"}` and correctly failed semantic validation.

Policy:

- Mark Branchline interpreter and VM rows for `string-concat/case000` as expected non-comparable rows.
- Keep Kotlin and JSONata scalar rows for engine sanity.
- Use `string-object-construction` for a simple comparable object-output string baseline.

## B4 Controlled Long JMH

Add a named representative profile for JSONata JMH:

- `-PjmhProfile=representative-long`
- selected representative case IDs, not the whole matrix;
- longer warmup/measurement than smoke runs;
- explicit override knobs for case IDs, warmup iterations, measurement iterations, iteration time, and forks.

GitHub Actions should pass this profile for `+jsonata` pushes and `workflow_dispatch` JSONata runs by default, while still allowing explicit overrides.

## B5 Public Comparison

Public docs should frame results as:

- faster only where the generated summary has eligible comparable rows and a ratio above parity;
- parity where ratios cluster near 1x;
- excluded where the state report or credibility flags explain why;
- raw artifacts and CSV links must resolve on GitHub Pages and GitHub Releases.

The final comparison wording must be updated after the GitHub representative run publishes fresh artifacts.
