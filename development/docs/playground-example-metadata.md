---
status: Implemented
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Surfaced category and AI subset metadata in the playground catalog and public playground docs."
  - date: 2026-06-10
    change: "Recorded current T10 output, contract, and diagnostic expectation coverage."
  - date: 2026-06-10
    change: "Documented enforced output, contract, and diagnostic expectation semantics."
  - date: 2026-06-10
    change: "Defined the playground example metadata MVP and migrated the existing first retrieval slice."
---
# Playground Example Metadata

## Purpose

Playground example metadata makes `playground/examples/*.json` useful as a retrieval and regression corpus without changing the existing public playground descriptor shape. The MVP is additive: all new fields are optional at the JSON format level, while the first migrated slice is validated by conformance tests.

## Schema Fields

The MVP fields are:

| Field | Type | Requirement |
| --- | --- | --- |
| `id` | string | Optional globally; required for migrated examples and must match the filename without `.json`. |
| `category` | string | Optional globally; required for migrated examples. Use lowercase kebab-case. |
| `tags` | array of strings | Optional globally; required and non-empty for migrated examples. Use unique lowercase kebab-case tags. |
| `aiSubset` | string | Optional. Allowed values: `compatible`, `incompatible`, `unknown`. |
| `expectedOutput` | JSON value | Optional placeholder for deterministic output assertions. |
| `contractExpectation` | object | Optional placeholder for inspect/contract assertions. |
| `diagnosticExpectation` | object | Optional placeholder for diagnostic-code assertions. |

## Expectation Semantics

`expectedOutput` is an exact JSON-like assertion against the executed transform output. JVM tests compare it against both interpreter and VM output; JS tests compare it against the JS runner output. Numeric primitives are compared by value with a small tolerance so equivalent runtime number representations do not make examples flaky.

`contractExpectation` is a partial JSON assertion against `BranchlineFacade.inspect(...).inspectJsonPayload()`. Use it to pin stable inspect and contract fields such as `success`, `subsetCompatibility`, transform name/source, or selected `mergedContract` node kinds. Avoid whole-contract snapshots unless the full payload is intentionally stable.

`diagnosticExpectation` is also a partial JSON assertion against the inspect payload. Use it to pin stable diagnostic fields such as `code`, `category`, and selected payload fields. Failure messages include the example id and expectation field path, for example `example-id.diagnosticExpectation.diagnostics[0].code`.

The migrated playground corpus must contain at least 10 examples with one or more expectation fields.

Current T10 coverage:

- Output expectations: `contract-empty-array-append`, `contract-literal-brackets-static`, `customer-profile`, `hello-transform`, `junit-badge-summary`, `order-shipment`, `shared-memory-read`, `stdlib-core-put-delete`, `stdlib-hof-overview`, `transform-options`, `xml-output-ordering`.
- Contract expectations: `contract-empty-array-append`, `contract-input-seeded-wildcard-output`, `contract-literal-brackets-static`, `contract-nullable-precision`, `pipeline-health-gating`.
- Diagnostic expectations: `shared-memory-read`, `stdlib-debug-explain`, `transform-options`.

## Validation

The shared conformance helper lives at `conformance-tests/src/commonTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExampleDescriptor.kt`.

Current validation rules:

- Migrated examples must have `id`, `category`, and at least one `tags` entry.
- `id` must match the filename stem.
- `category` and each tag must use lowercase kebab-case.
- Tags must be unique.
- `aiSubset`, when present, must be one of `compatible`, `incompatible`, or `unknown`.
- Examples marked `aiSubset: "compatible"` are inspected through `BranchlineFacade.inspect(...)` and must return `BranchlineSubsetCompatibility.COMPATIBLE`.
- Expectation fields, when present, are enforced in both JVM and JS playground example conformance paths where the corresponding output or inspect payload is available.

## First Migration Slice

The requested first list contained 20 IDs. The following 17 files exist and were migrated:

- `hello-transform`
- `contract-empty-array-append`
- `junit-badge-summary`
- `contract-nullable-precision`
- `contract-literal-brackets-static`
- `order-shipment`
- `customer-profile`
- `stdlib-core-put-delete`
- `stdlib-hof-overview`
- `stdlib-debug-explain`
- `xml-output-ordering`
- `json-canonical-output`
- `transform-options`
- `shared-memory-read`
- `pipeline-health-gating`
- `contract-input-seeded-wildcard-output`
- `stdlib-core-walk`

The following requested IDs did not have matching `playground/examples/*.json` files at migration time:

- `xml-mapping-basic`
- `json-duplicate-keys`
- `contract-coalesce-required-any-of`

No replacement filename was inferred automatically for this slice. Candidate related examples exist for XML mapping (`xml-input-output-roundtrip`, `xml-mapping-mixed-content`, `xml-namespaces-mapping`) and JSON duplicate-key behavior is covered by conformance tests, but there is no matching playground descriptor with the requested ID.

## Docs Catalog

Public `docs/playground.md` now points readers to the category and AI subset filters in the embedded playground. The React catalog uses the same descriptor metadata to expose compact badges for category, AI subset status, and the first visible tags on the selected example.

The catalog UI remains intentionally lightweight: it does not generate a second docs table, and it keeps the manually curated example list intact. Future slices can add search or richer tag filtering if example volume makes category plus AI subset filters insufficient.
