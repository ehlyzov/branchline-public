---
status: Proposed
depends_on: []
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-29
    change: "Added mutation runtime diagnostic adapters for SET/+= failures with stable code/category/payload fields."
  - date: 2026-05-29
    change: "Added structured diagnostics taxonomy and payload model for repair-oriented authoring loops."
  - date: 2026-05-05
    change: "Started DX execution: added normalization corpus baseline and promoted inspect JSON to a stable machine envelope with compatibility contract fields."
  - date: 2026-05-05
    change: "Completed the product direction for Branchline DX: prioritized friendly mutation operations, stable inspect machine JSON, repair-oriented diagnostics, example metadata, playground workbench, and DX quality gates."
  - date: 2026-05-05
    change: "Replaced the earlier APPEND TO direction with a two-layer model: comprehensions for transformation-first collection building and += for explicit local accumulators."
  - date: 2026-04-30
    change: "Started Normalization MVP slice under M3: AST renderer, BranchlineFacade.inspect normalizedSource population, and bl inspect --normalized flag."
  - date: 2026-04-20
    change: "Added umbrella proposal for AI-friendly DSL priorities, machine-facing APIs, and contract-first authoring workflow."
---
# AI-Friendly DSL Initiative

## Status (as of 2026-04-20)
- Stage: Proposal.
- Goal: make Branchline easy for AI systems to generate, validate, normalize, repair, and run safely.
- Scope: a 90-day program focused on canonical language surface, stable machine-facing interfaces, and structured diagnostics rather than new runtime features.

## Why this exists
Branchline already has strong ingredients for AI-assisted authoring: deterministic execution, tracing, canonical JSON output, and increasingly precise input/output contracts. What it lacks is a narrow, explicit machine-facing surface that tells an AI system:

1. which subset of the language it should generate,
2. how to normalize equivalent programs into one canonical form,
3. how to inspect and validate a program without depending on interpreter or VM internals, and
4. how to repair failures from structured diagnostics rather than free-form text.

This proposal is the umbrella document for that work. It should guide future changes in the language, tooling, CLI, playground, and documentation without replacing the more focused workstreams that already exist.

## Related workstreams
This initiative depends on and should coordinate with these existing docs:

- [Module Responsibilities](../architecture/module-responsibilities.md) for separating core DSL concerns from orchestration/platform concerns.
- [VM/Interpreter Split](../architecture/vm-interpreter-split.md) for hiding engine details behind a stable public facade.
- [Docs Refresh](../docs/docs-refresh.md) for turning docs and playground content into canonical, retrieval-friendly examples.
- [LLM Pipelines](llm-pipelines.md) for future AI/runtime orchestration work once the transformation DSL surface is stable.

These documents remain active. This proposal sets direction across them; it does not supersede them.

## 90-day summary
The first 90 days should optimize Branchline for pure data transformation AI use cases. That means:

- narrowing the authoring surface to a strict canonical subset,
- providing one stable JSON-based inspection/runtime interface,
- making diagnostics machine-readable and repair-oriented, and
- evolving CLI and playground around an inspect-first AI workflow.

VM optimization, pipeline orchestration, and broader runtime features remain valuable, but they should be treated as secondary to canonicalization and machine-facing ergonomics during this phase.

## DX priority order (as of 2026-05-05)
The largest near-term DX gain is not a new runtime feature. It is making the existing transformation language feel intentional, canonical, and repairable.

Priority order:

1. **Two-layer mutation style.** Prefer comprehensions/collection expressions for transformation-first data shaping, and use `+=` only for explicit local accumulators. This removes both the artificial `SET x = APPEND(x, ...)` pattern and the DSL-specific `APPEND TO` statement while preserving pure `APPEND(list, value)` for expression contexts.
2. **Stable inspect-first machine JSON.** Make `bl inspect --contracts-json --normalized` return one documented envelope with `success`, diagnostics, feature usage, subset compatibility, contracts, and normalized source.
3. **Repair-oriented diagnostics.** Add stable codes, spans, target paths, expected/actual payloads, and hints for the most common authoring errors.
4. **Canonical docs and examples.** Turn docs/playground examples into the source of canonical style, including anti-pattern to corrected-pattern pairs.
5. **Retrieval-ready example metadata.** Add id/category/tags/expectation/subset metadata so agents retrieve verified patterns, not just similar text.
6. **Playground workbench.** Add normalized source, diagnostics, subset blockers, and contract diff panes after the machine API is stable.

## Mutation policy
Branchline should keep its persistent/functional runtime semantics, but its surface syntax should avoid DSL-specific mutation verbs.

Canonical authoring rules:

- Prefer array comprehensions or future `COLLECT`-style expressions when the output is a direct mapping/filtering of input.
- Use `target += value` for real local accumulators.
- Use `SET name = expression` for rebinding a local value.
- Use `SET object.path = expression` for replacing or inserting a local object/path leaf under existing parents.
- Use `MODIFY object.path { key: value }` for grouped local object updates once docs and diagnostics make its target constraints clear.
- Use `APPEND(list, value)` only when an expression value is required, for example inside object construction or a function argument.

Non-goals:

- Do not remove or deprecate `APPEND(list, value)` as a pure stdlib function.
- Do not keep `APPEND TO` as a legacy statement; the language is still in design phase, so this is a hard cut.
- Do not introduce hidden in-place mutation; runtime should continue returning updated persistent values.
- Do not auto-create missing intermediate containers for `SET` or `+=` without a separate language design.
- Do not include shared writes, `SHARED`, `AWAIT`, `SUSPEND`, or graph orchestration in the AI canonical subset MVP.

Normalization direction:

- Existing renderer output should emit `+=` for explicit accumulator statements and never emit `APPEND TO`.
- A future rewrite may transform `SET x = APPEND(x, value)` into `x += value` only when `x` is the same simple local identifier on both sides and no path/dynamic alias is involved.
- Unsafe rewrites such as `SET obj.items = APPEND(obj.items, value)`, dynamic paths, shadowed names, or any ambiguous target should remain unchanged until a separate semantic proof exists.
- Guard conditions are pinned by the normalization corpus: path targets, dynamic targets, and alias-ambiguous self-append patterns must remain `SET ... = APPEND(...)` until T16 explicitly accepts and implements a safe rewrite.

## Milestone M1: Canonical Core
Define an explicit `AI canonical subset` of Branchline for code generation and retrieval.

### Goals
- Keep pure transformation constructs: `LET`, `IF`, `CASE`, object/array construction, path access, pure stdlib, functions, and `OUTPUT`.
- Exclude or capability-gate orchestration-heavy constructs such as shared state, suspension, and runtime-coupled host workflows.
- Accept legacy-compatible syntax as input where needed, but never emit it from canonical tool paths.

### Canonical authoring rules
- Prefer one canonical input binding in output examples and normalized source.
- Prefer one loop/comprehension style in AI-facing docs and normalized output.
- Prefer one conditional style in AI-facing docs and normalized output.
- Require normalization to remove syntactic ambiguity without changing semantics.

### Deliverables
- A documented canonical subset and style guide for AI-authored Branchline.
- A normalization target that every AI-facing tool path can emit.
- A compatibility check that marks constructs as supported, legacy-accepted, or unsupported in the AI subset.

## Milestone M2: Machine Interface
Introduce a stable public facade above interpreter and VM internals.

The concrete starting slice for this milestone is **Inspect Facade MVP**: move the existing inspect/contract assembly into a shared interpreter-layer API first, then let CLI and later playground consume that facade instead of duplicating inspection logic.

### Goals
- Present one JSON-based machine API for `parse`, `analyze`, `normalize`, `infer contracts`, `validate contracts`, `run`, and `explain`.
- Hide interpreter/VM engine choice from downstream consumers.
- Return stable structured envelopes rather than requiring callers to parse internal types or human-oriented text.

### Planned facade
- `BranchlineFacade.parse(...)`
- `BranchlineFacade.analyze(...)`
- `BranchlineFacade.normalize(...)`
- `BranchlineFacade.inspect(...)`
- `BranchlineFacade.run(...)`

`inspect` should be the primary AI entrypoint and should return:
- normalized source,
- symbol and feature usage summary,
- inferred input/output contracts,
- AI-subset compatibility result,
- warnings and errors with stable codes and spans.

### Response envelope requirements
- explicit success/failure status,
- structured diagnostics,
- exact source spans,
- normalized source when available,
- optional input/output contract payloads,
- interpreter/VM parity as an internal constraint rather than a public contract detail.

## Milestone M3: AI Authoring Loop
Define the contract-first workflow that an AI agent should follow when generating or repairing Branchline.

### Active slice: Normalization MVP (started 2026-04-30)
- Renderer-only canonicalization: `BranchlineFacade.inspect` now populates `normalizedSource` when `includeNormalizedSource = true` and the program is `COMPATIBLE`.
- CLI surface: `bl inspect --normalized` adds the canonical text to both `--contracts` and `--contracts-json` output paths. The flag is opt-in; existing inspect output is byte-stable.
- Canonical rules implemented today:
  - `row` input alias rewrites to `input` on output.
  - Statements emitted without trailing semicolons.
  - `FOR` and `FOR EACH` both render as `FOR EACH`.
  - Deterministic 4-space indentation, one statement per line, stable single-line vs multi-line bracket layout (80-char budget).
- **Non-goals in this slice**: no `IF`/`CASE` rewrites, no loop/comprehension rewrites, no comment preservation (the lexer drops comments before they reach the AST), no standalone `bl normalize` command, no parser/runtime semantics changes.
- Renderer gaps surface as a `normalization_unsupported_node` warning; subset incompatibilities continue to use `unsupported_in_ai_subset` and produce no normalized source.

### Workflow
1. accept input schema or representative sample input,
2. accept expected output schema or golden output,
3. generate Branchline in the canonical subset,
4. normalize and inspect the program,
5. infer contracts and validate behavior,
6. surface structured repair hints when validation fails,
7. re-run until the program passes the gate.

### Diagnostics requirements
- classify failures as syntax, semantic, contract, runtime, or unsupported-subset,
- assign stable error/warning codes,
- include exact source spans,
- include structured expected/actual payloads where relevant,
- include actionable repair-oriented hints instead of relying only on prose.

### Tooling direction
- CLI should gain an inspect/check style interface centered on machine-readable output, not only execution.
- Playground should evolve into an AI workbench with panes for normalized source, contract diff, explain output, and structured failures.
- Docs should prefer canonical examples, anti-pattern to corrected-pattern pairs, null/contract behavior examples, and deterministic stdlib behavior tables.

## Milestone M4: Stable Machine Envelope and Diagnostics
Promote inspect output from a contract helper into the public machine-facing authoring contract.

### Goals
- Return one stable JSON envelope for inspect that includes success/failure, diagnostics, warnings, feature usage, subset compatibility, normalized source, contracts, and optional witness/debug metadata.
- Keep envelope evolution additive by default and document any migration before removing or renaming fields.
- Classify diagnostics as syntax, semantic, contract, runtime, unsupported-subset, or normalization.
- Add repair-oriented fields where available: operation, target path, expected kind, actual kind, expected/actual contract fragment, and deterministic hint.

### Deliverables
- CLI JSON snapshot tests for compatible, incompatible, parse error, semantic error, and normalization warning cases. The first envelope slice now covers compatible, incompatible, parse error, and no-normalized cases.
- Mutation diagnostics fixtures for missing append target, non-list init, missing mid-path, and wrong target kind.
- Contract mismatch fixture with expected/actual payload.
- Documentation for the inspect envelope and diagnostic evolution policy.

## Milestone M5: Canonical Corpus and DX Gates
Make canonical style durable by moving it into docs, examples, metadata, and verification gates.

### Goals
- Rewrite high-impact docs and playground examples to prefer canonical mutation style.
- Add example metadata fields: `id`, `category`, `tags`, `aiSubset`, and at least one of expected output, contract expectation, or diagnostic expectation for migrated examples.
- Add a normalization corpus with at least 20 equivalent inputs and pinned canonical output.
- Define a DX quality gate matrix keyed by touched surface: syntax, normalizer, diagnostics, CLI JSON, examples, docs, playground.

### Deliverables
- Public AI canonical subset/style guide in docs.
- Golden normalization corpus baseline with 20+ fixtures and idempotence checks.
- Top 20 playground examples migrated to retrieval-ready metadata.
- Example tests that fail on invalid metadata or incorrect AI subset tags.
- Development verification matrix aligned with `development/service/VERIFY.md`.

### DX quality gate seed
The DX quality gate matrix should start with these rows and stay aligned with `development/service/VERIFY.md`:

| Touched surface | Required narrow verification |
| --- | --- |
| Parser, AST, or grammar | `./gradlew :interpreter:jvmTest :interpreter:jsTest :conformance-tests:jvmTest :conformance-tests:jsTest` |
| Normalizer or AI subset | `./gradlew :interpreter:jvmTest :interpreter:jsTest` |
| CLI inspect JSON | `./gradlew :cli:jvmTest :cli:jsNodeTest` |
| Playground examples metadata | `./gradlew :conformance-tests:jvmTest :conformance-tests:jsTest` |
| Public docs | `./gradlew docsBuild` |
| Playground UI/assets | `./gradlew playgroundBuildAssets` |
| Contour trigger | `bin/audit_contour.sh` and refresh overlays only when required |

## Product package
The product-level planning package for this direction lives under [development/product/branchline-dx](../product/branchline-dx/overview.md):

- [Overview](../product/branchline-dx/overview.md)
- [Implementation plan](../planning/branchline-dx-implementation-plan.md)
- [Hardening plan](../planning/branchline-dx-hardening-plan.md)
- [Gap registry](../planning/branchline-dx-gap.yaml)

## Acceptance criteria for this initiative
The initiative should be considered delivered only when all of the following are true:

- Branchline exposes a documented AI canonical subset and canonical normalization target.
- A stable facade exists for machine-facing parse/analyze/inspect/run flows.
- Diagnostics are structured enough to drive automated repair loops.
- CLI and playground can surface inspect-first AI workflows without exposing engine internals.
- Docs and examples teach one canonical style rather than multiple equally valid syntactic variants.

## Testing expectations
The execution work for this proposal should include:

- conformance coverage for canonical subset acceptance and rejection,
- golden tests proving multiple equivalent inputs normalize to one canonical output,
- structured diagnostics tests for stable codes, spans, and machine-readable payloads,
- JVM/JS parity tests for inspect/analyze/run results, and
- end-to-end AI workflow tests for generate, reject unsupported constructs, and repair using contract mismatch output.

## Defaults and non-goals
- Horizon for this proposal is 90 days.
- This is one umbrella proposal, not a new tree of milestone docs.
- Existing architecture/docs proposals remain in place and are treated as dependent workstreams.
- Phase one optimizes for data transformation AI use cases, not full LLM pipeline orchestration.
- VM/runtime optimization is still important, but explicitly secondary to canonicalization, public API stability, and structured diagnostics within this initiative.
