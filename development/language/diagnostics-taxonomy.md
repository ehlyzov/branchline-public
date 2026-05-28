---
status: Implemented
depends_on: ['planning/branchline-dx-implementation-plan']
blocks: ['planning/branchline-dx-hardening-plan']
supersedes: []
superseded_by: []
last_updated: 2026-05-29
changelog:
  - date: 2026-05-29
    change: "Added T8 mutation runtime diagnostic adapters for SET/+= failure paths and CLI JSON error propagation."
  - date: 2026-05-29
    change: "Added first structured diagnostics taxonomy and payload model for Branchline DX T7."
---
# Diagnostics Taxonomy

## Goal
Branchline diagnostics should be stable enough for repair loops without forcing consumers to parse human text.

Every machine diagnostic keeps the base contract:

- `code`
- `message`
- `severity`
- `span`
- `category`
- `payload`

New payload fields are additive. Consumers should ignore fields they do not understand.

## Categories

| Category | Use |
| --- | --- |
| `syntax` | Parser and token-level failures. |
| `semantic` | Name resolution, type/scope, transform selection, and semantic warnings. |
| `contract` | Input/output contract validation and mismatch payloads. |
| `runtime` | Runtime execution failures, including mutation errors. |
| `unsupported-subset` | Valid Branchline constructs outside the AI canonical subset. |
| `normalization` | Canonical rendering warnings or normalization blockers. |
| `unknown` | Temporary fallback for diagnostics not yet classified. |

## Payload Fields

| Field | Meaning |
| --- | --- |
| `operation` | Operation being performed, for example `parse`, `analyze`, `+=`, `validate-output-contract`. |
| `targetPath` | Branchline path or logical target, when applicable. |
| `expectedKind` | Expected type, construct, category, or shape. |
| `actualKind` | Actual type, construct, category, or shape. |
| `expected` | Structured expected payload, usually contract-shaped JSON. |
| `actual` | Structured actual payload, usually contract-shaped JSON. |
| `hint` | Deterministic repair hint. |

## Current Coverage

- Syntax: `parse_error`.
- Semantic: `semantic_error`, `semantic_warning`, transform selection errors.
- Unsupported subset: `unsupported_in_ai_subset`.
- Normalization: `normalization_unsupported_node` and serialization fixtures.
- Runtime: mutation failures for missing targets, missing path segments, wrong target parents, and `+=` wrong target kind emit structured diagnostics.
- Contract: payload model fixture for expected/actual mismatch; validator integration is follow-up work.

## Evolution Policy
The base fields are stable. Payload fields are optional and additive. Renaming or removing a field requires a migration note before release.

## Runtime Mutation Codes

| Code | Operation | Meaning |
| --- | --- | --- |
| `mutation_target_missing` | `SET`, `+=` | The target local was not declared. |
| `mutation_path_missing` | `SET`, `+=` | A parent path segment was missing. |
| `mutation_path_non_container` | `SET`, `+=` | Traversal entered a scalar/null before the leaf. |
| `mutation_target_wrong_kind` | `SET`, `+=` | The leaf parent was not an object or list. |
| `mutation_plus_assign_wrong_kind` | `+=` | The current value cannot be appended, added, or concatenated. |
