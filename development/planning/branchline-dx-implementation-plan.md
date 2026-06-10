---
status: Proposed
depends_on: ['product/branchline-dx/overview', 'ai/ai-friendly-dsl', 'planning/branchline-benchmark-readiness-plan']
blocks: ['planning/branchline-dx-hardening-plan']
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Closed T15: final interpreter/CLI/conformance, playground/docs, contour, front matter, and diff checks passed."
  - date: 2026-06-10
    change: "Closed T18: playground Inspect workbench visual verification evidence recorded for desktop and mobile."
  - date: 2026-06-10
    change: "Closed T12: playground catalog metadata filters and optional visual inspect-first docs are in place."
  - date: 2026-06-10
    change: "Closed T14 and T17: local canonical-example warnings are visible without CI policy changes, and playground inspect panes build successfully."
  - date: 2026-06-10
    change: "Started T14 local warning-mode validation and T17 playground inspect UI panes as parallel tasks."
  - date: 2026-06-10
    change: "Closed T11 and T13: playground state now receives structured inspect results with stale guards, and DX quality gates are documented."
  - date: 2026-06-10
    change: "Started T11 playground inspect state and T13 DX quality gate matrix as parallel non-overlapping tasks."
  - date: 2026-06-10
    change: "Closed T10: migrated examples now carry output, contract, and diagnostic expectations with JVM/JS checks."
  - date: 2026-06-10
    change: "Started T10 expected-output/contract/diagnostic expectations for migrated playground examples."
  - date: 2026-06-10
    change: "Closed T9 and T16: playground examples now have metadata validation for the existing first slice, and safe self-append normalization rewrites are implemented with guards."
  - date: 2026-06-10
    change: "Resumed T9-T18 after benchmark hardening; T9 and T16 are in progress as parallel non-overlapping agent tasks."
  - date: 2026-06-10
    change: "Added benchmark-first execution gate: representative benchmark readiness precedes broader DX/adoption packaging; editor/LSP stays out of scope."
  - date: 2026-05-29
    change: "Closed T8 by converting common SET/+= runtime failures into structured diagnostics and propagating them through CLI JSON errors."
  - date: 2026-05-29
    change: "Closed T7 by adding diagnostics taxonomy, optional payload model, envelope serialization, and structured tests."
  - date: 2026-05-05
    change: "Closed T5/T6 by adding the golden normalization corpus baseline and promoting inspect JSON to a stable machine envelope."
  - date: 2026-05-05
    change: "Closed T4 by aligning array comprehension docs with parser/EBNF and verifying interpreter JVM tests plus docsBuild."
  - date: 2026-05-05
    change: "Closed T3 by rewriting named playground accumulator examples to +=, documenting mutation style, and running targeted example/docs verification."
  - date: 2026-05-05
    change: "Closed T2 by adding public AI canonical subset docs, CLI inspect-first guidance, docs refresh tracking, and docsBuild verification."
  - date: 2026-05-05
    change: "Closed T0/T1 against the refreshed gap registry and completed AI-friendly DSL roadmap; aligned the plan with the user-approved APPEND TO hard-cut."
  - date: 2026-05-05
    change: "Added command-level implementation plan for Branchline DX and AI-friendly DSL completion."
---
# Branchline DX и AI-friendly DSL — план реализации продуктовых сценариев

## Метаданные

- **Source of truth (продуктовая правда):** [overview](../product/branchline-dx/overview.md), [scenarios](../product/branchline-dx/scenarios).
- **Канон по архитектуре:** [SERVICE_MAP](../service/SERVICE_MAP.md), [VERIFY](../service/VERIFY.md), [AGENTS startup contract](../../AGENTS.md).
- **Целевая модель worker-а:** Sonnet 4.6 или Codex worker, single instance, без памяти между задачами.
- **Оркестратор:** очередь задач читается сверху вниз; worker берёт первую задачу со `Status: - [ ]`, у которой все `Depends on` уже закрыты, выполняет её, прогоняет Verify, обновляет статус и changelog в affected `development/` docs.
- **Параллелизм:** последовательное выполнение. Задачи намеренно режут общий surface, чтобы не конфликтовать в parser/docs/examples одновременно.
- **Benchmark-first gate:** completed on 2026-06-10 via [Branchline Benchmark Readiness Plan](branchline-benchmark-readiness-plan.md) and [Branchline Benchmark Hardening Plan](branchline-benchmark-hardening-plan.md). Broader adoption-facing T9-T18 work may resume, with public speed claims still requiring controlled benchmark runs.

## Как читать задачу

Каждая задача содержит `Status`, `Goal`, `Sources`, `Depends on`, `Read first`, `Modify`, `Steps`, `Verify`, `DoD`. Если код уже реализует требование, worker ставит `- [x]`, добавляет `### Note: already implemented at <file>:<line>` и не переписывает работающую реализацию. Если обнаруживается неучтённая развилка, worker ставит `ASK:` в статусе и останавливает задачу.

## Конвенции выполнения

1. Не реализуй больше, чем сказано в конкретной задаче.
2. Перед изменениями запускай `git status -sb`; не редактируй файлы с чужими изменениями.
3. Используй `./gradlew`, не system Gradle.
4. Syntax/language behavior changes обновляют grammar, parser tests, conformance, docs, playground examples.
5. Public docs/generated assets меняются только после `development/` record.
6. Verify обязан проходить; если команда не может быть запущена локально, зафиксируй причину.
7. Никогда не правь acceptance criteria сценариев без отдельного approval.

## Команды verify (общие)

| Команда | Назначение |
| --- | --- |
| `./gradlew :interpreter:jvmTest :interpreter:jsTest` | Facade, parser, renderer, diagnostics common behavior |
| `./gradlew :cli:jvmTest :cli:jsNodeTest` | CLI inspect JSON/text behavior |
| `./gradlew :conformance-tests:jvmTest :conformance-tests:jsTest` | Cross-runtime language/examples parity |
| `./gradlew playgroundBuildAssets` | Playground bundle and generated docs assets |
| `./gradlew docsBuild` | Public docs build |
| `bin/audit_contour.sh` | Service contour integrity after contour triggers |

## Известные пробелы покрытия

- План не реализует LLM pipeline runtime из `development/ai/llm-pipelines.md`.
- План не реализует editor/LSP/VS Code support; это явно исключено из ближайшего benchmark-first + DX scope.
- План не вводит cloud/backend service for playground.
- План не делает formal semantic verification или proof engine.
- План не меняет release/publishing workflows кроме опциональных CI gate additions.
- План уже учитывает user-approved design-phase hard-cut for `APPEND TO`; остальные legacy-compatible формы не удаляются без отдельной задачи.

## Список задач

## T0. Gap-analysis refresh

- **Status:** - [x]
- **Goal:** Обновить [branchline-dx-gap.yaml](branchline-dx-gap.yaml) по фактическому состоянию кода перед началом реализации.
- **Sources:** [overview](../product/branchline-dx/overview.md), [all scenarios](../product/branchline-dx/scenarios), [SERVICE_MAP](../service/SERVICE_MAP.md).
- **Depends on:** —
- **Read first:**
  - `development/product/branchline-dx/overview.md`
  - `development/product/branchline-dx/scenarios/*.md`
  - `development/ai/ai-friendly-dsl.md`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt`
  - `cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt`
- **Modify:**
  - `development/planning/branchline-dx-gap.yaml`
- **Steps:**
  1. For each scenario FR/AC, mark `done`, `partial`, or `missing`.
  2. Add file evidence for every `done` or `partial`.
  3. Add one-line implementation target for every `missing`.
  4. Do not change product scenarios.
- **Verify:**
  ```bash
  ruby -e 'require "yaml"; YAML.load_file("development/planning/branchline-dx-gap.yaml"); puts "gap yaml ok"'
  ```
- **DoD:**
  - Gap file parses as YAML.
  - Every scenario S01-S08 has status, evidence and gaps.

### Note: implemented at `development/planning/branchline-dx-gap.yaml:1`

Gap registry refreshed after the two-layer mutation syntax hard-cut. Every partial/done scenario now cites code or docs evidence, and every missing item is expressed as a one-line implementation target.

---

## T1. Завершить AI-friendly DSL roadmap

- **Status:** - [x]
- **Goal:** Довести `development/ai/ai-friendly-dsl.md` до исполнимой программы M1-M5 с явной mutation policy и DX priorities.
- **Sources:** [S01](../product/branchline-dx/scenarios/01-canonical-authoring-loop.md), [S02](../product/branchline-dx/scenarios/02-friendly-mutation-operations.md), [current AI proposal](../ai/ai-friendly-dsl.md).
- **Depends on:** T0
- **Read first:**
  - `development/ai/ai-friendly-dsl.md`
  - `development/docs/playground-examples-modernization.md`
  - `docs/language/statements.md`
  - `docs/language/grammar.md`
- **Modify:**
  - `development/ai/ai-friendly-dsl.md`
  - `development/INDEX.md`
- **Steps:**
  1. Add "DX priority order" with mutation style first after current Normalization MVP.
  2. Add "Mutation policy" defining comprehensions, `+=`, `SET`, `MODIFY`, pure `APPEND`, and non-goals.
  3. Add M4/M5 milestones for diagnostics, example metadata, docs/playground gates.
  4. Update front matter date/changelog and `development/INDEX.md`.
- **Verify:**
  ```bash
  ruby -e 'require "yaml"; text=File.read("development/ai/ai-friendly-dsl.md"); YAML.load(text.split(/^---$/)[1]); abort "missing mutation policy" unless text.include?("Mutation policy"); puts "ai doc ok"'
  ```
- **DoD:**
  - AI doc explains what gives the largest DX gain and why.
  - Mutation policy is explicit and does not break existing `APPEND(list, value)`.

### Note: already implemented at `development/ai/ai-friendly-dsl.md:55`

The AI-friendly DSL roadmap now has DX priority order, explicit mutation policy, and M4/M5 milestones for stable diagnostics, example metadata, docs/playground gates, and quality gates.

---

## T2. Public canonical subset and style guide

- **Status:** - [x]
- **Goal:** Add public docs that teach AI canonical subset and inspect-first authoring before runtime execution.
- **Sources:** [S01 FR1/FR5](../product/branchline-dx/scenarios/01-canonical-authoring-loop.md), [S05 FR5](../product/branchline-dx/scenarios/05-canonical-docs-and-examples.md).
- **Depends on:** T1
- **Read first:**
  - `development/ai/ai-friendly-dsl.md`
  - `docs/guides/cli.md`
  - `docs/language/index.md`
  - `docs/toc.yaml`
- **Modify:**
  - `docs/language/ai-canonical-subset.md` (new)
  - `docs/guides/cli.md`
  - `docs/toc.yaml`
  - `development/docs/docs-refresh.md`
- **Steps:**
  1. Create a concise canonical subset page with allowed, legacy-accepted, unsupported constructs.
  2. Add inspect-first workflow using `bl inspect --contracts --contracts-json --normalized`.
  3. Include anti-pattern -> canonical-pattern pairs for `row`, semicolons, `FOR`, `APPEND`.
  4. Link page from TOC and docs refresh record.
- **Verify:**
  ```bash
  ./gradlew docsBuild
  ```
- **DoD:**
  - Docs page exists and is linked.
  - Examples in page use `input`, semicolon-free, `FOR EACH`, comprehensions or `+=`.

### Note: implemented at `docs/language/ai-canonical-subset.md:1`

Added the public canonical subset/style guide, linked it from `docs/toc.yaml`, added inspect-first CLI guidance, and verified with `./gradlew docsBuild`.

---

## T3. Canonical mutation examples rewrite

- **Status:** - [x]
- **Goal:** Replace self-append accumulation examples with comprehensions or `+=` where semantics match.
- **Sources:** [S02 FR1-FR3](../product/branchline-dx/scenarios/02-friendly-mutation-operations.md), [S05 FR2](../product/branchline-dx/scenarios/05-canonical-docs-and-examples.md).
- **Depends on:** T1
- **Read first:**
  - `playground/examples/contract-empty-array-append.json`
  - `playground/examples/junit-badge-summary.json`
  - `docs/language/statements.md`
  - `docs/language/std-core.md`
- **Modify:**
  - `playground/examples/contract-empty-array-append.json`
  - `playground/examples/junit-badge-summary.json`
  - `docs/language/statements.md`
  - `docs/language/std-core.md`
- **Steps:**
  1. Change `SET normalized = APPEND(normalized, item)` examples to `normalized += item` when an explicit accumulator is needed.
  2. Document pure `APPEND(list, value)` as expression-style, not accumulation default.
  3. Add a short mutation style table: replace, accumulator append, nested accumulator append, pure expression.
  4. Keep expected outputs unchanged.
- **Verify:**
  ```bash
  ./gradlew :conformance-tests:jvmTest --tests io.github.ehlyzov.branchline.playground.PlaygroundExamplesJvmTest
  ```
- **DoD:**
  - At least the two named examples use comprehensions or `+=`.
  - Docs explain why `SET x = APPEND(x, ...)` is tolerated but not preferred.

### Note: implemented at `playground/examples/contract-empty-array-append.json:1`

The two named playground examples now use `+=` for explicit accumulators, `docs/language/statements.md` documents the mutation style table and tolerated-but-not-preferred `SET x = APPEND(x, ...)` form, and `docs/language/std-core.md` frames `APPEND` as expression-style.

---

## T4. Grammar and docs drift audit for comprehensions

- **Status:** - [x]
- **Goal:** Resolve documented array comprehension syntax drift before expanding canonical docs.
- **Sources:** [S05 FR3](../product/branchline-dx/scenarios/05-canonical-docs-and-examples.md), [S08 FR3](../product/branchline-dx/scenarios/08-ci-quality-gates.md).
- **Depends on:** T2
- **Read first:**
  - `docs/language/expressions.md`
  - `docs/language/grammar.md`
  - `interpreter/src/jvmTest/resources/io/github/ehlyzov/branchline/ebnf.txt`
  - `interpreter/src/jvmTest/kotlin/io/github/ehlyzov/branchline/ParserTests.kt`
- **Modify:**
  - `docs/language/expressions.md`
  - `docs/language/grammar.md`
  - `interpreter/src/jvmTest/resources/io/github/ehlyzov/branchline/ebnf.txt` if grammar source is wrong
  - parser/conformance tests only if behavior changes
- **Steps:**
  1. Determine parser-supported comprehension syntax from parser/tests.
  2. Update docs to match implemented behavior, or create explicit language proposal if behavior should change.
  3. Do not silently document unsupported syntax.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest
  ```
- **DoD:**
  - Docs and EBNF no longer contradict parser-supported syntax.
  - Any intentionally unresolved fact is recorded in `development/service/knowledge-gaps.yaml`.

### Note: implemented at `docs/language/expressions.md:83`

The parser and EBNF already agreed on `[expression FOR EACH name IN expression WHERE ...]`; the drift was in public docs. Updated the expressions reference and array comprehension guide without runtime or grammar changes, then verified with `./gradlew :interpreter:jvmTest` and `./gradlew docsBuild`.

---

## T5. Normalization corpus baseline

- **Status:** - [x]
- **Goal:** Add a golden normalization corpus without changing semantics or adding rewrite rules.
- **Sources:** [S01 AC-2](../product/branchline-dx/scenarios/01-canonical-authoring-loop.md), [S02 FR4](../product/branchline-dx/scenarios/02-friendly-mutation-operations.md).
- **Depends on:** T1, T3
- **Read first:**
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/normalize/AstRenderer.kt`
  - `interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline/normalize/AstRendererTest.kt`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/Ast.kt`
- **Modify:**
  - `interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline/normalize/AstRendererTest.kt`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/normalize/*` only if rewrite is accepted
  - `development/ai/ai-friendly-dsl.md`
- **Steps:**
  1. Add at least 20 golden inputs covering row/input, semicolons, FOR/FOR EACH, mutation statements, CASE layout and long objects.
  2. Include current behavior fixtures for `SET x = APPEND(x, value)` showing it remains unchanged in this task.
  3. Add idempotence checks: normalized output normalizes to the same text.
  4. Keep renderer-only semantics; do not alter runtime.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :interpreter:jsTest
  ```
- **DoD:**
  - Normalization corpus has 20+ fixtures.
  - Self-append rewrite is not implemented in this task and is covered by follow-up T16.

### Note: implemented at `interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline/normalize/AstRendererTest.kt:166`

Added a 20+ fixture golden normalization corpus covering row/input, semicolons, FOR/FOR EACH, mutation statements, self-append current behavior, CASE layout, array comprehensions, lambdas, dynamic paths, computed properties, and long objects. Each fixture checks exact normalized output and idempotence.

---

## T6. Inspect JSON stable envelope

- **Status:** - [x]
- **Goal:** Promote inspect JSON from contract-centric payload to documented stable machine envelope.
- **Sources:** [S03 FR1-FR4](../product/branchline-dx/scenarios/03-inspect-first-cli.md), [S01 FR3](../product/branchline-dx/scenarios/01-canonical-authoring-loop.md).
- **Depends on:** T1
- **Read first:**
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt`
  - `cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt`
  - `cli/src/jvmTest/kotlin/io/github/ehlyzov/branchline/cli/CliIntegrationTest.kt`
- **Modify:**
  - `BranchlineFacade.kt`
  - `BranchlineCli.kt`
  - `CliIntegrationTest.kt`
  - docs page from T2
- **Steps:**
  1. Design JSON shape with `success`, `diagnostics`, `warnings`, `featureUsage`, `subsetCompatibility`, `normalizedSource`, `transforms`.
  2. Keep old contract JSON fields behind compatibility mode or add migration note.
  3. Add golden CLI JSON tests for compatible, incompatible, parse error and no-normalized cases.
  4. Document envelope evolution policy.
- **Verify:**
  ```bash
  ./gradlew :cli:jvmTest :cli:jsNodeTest
  ```
- **DoD:**
  - AI-agent can consume one JSON output without parsing human text.
  - Compatibility behavior is explicit and tested.

### Note: implemented at `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt:95`

`--contracts-json` now emits a stable inspect envelope with `success`, `diagnostics`, `warnings`, `featureUsage`, `subsetCompatibility`, `normalizedSource`, and `transforms`. Single-transform JSON keeps historical `input`/`output` contract fields at the root for compatibility. CLI tests cover compatible, incompatible, parse error, and no-normalized cases.

---

## T7. Diagnostics taxonomy and payload model

- **Status:** - [x]
- **Goal:** Define and implement the first structured diagnostics taxonomy for authoring repair.
- **Sources:** [S04 FR1-FR5](../product/branchline-dx/scenarios/04-repair-oriented-diagnostics.md), [contract diagnostics v2](../language/contract-diagnostics-v2.md).
- **Depends on:** T6
- **Read first:**
  - `BranchlineFacade.kt`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/contract/ContractValidator.kt`
  - `development/language/contract-diagnostics-v2.md`
- **Modify:**
  - `development/language/diagnostics-taxonomy.md` (new)
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/diagnostics/BranchlineDiagnostics.kt` (new or equivalent extracted model)
  - `BranchlineFacade.kt`
  - facade/CLI tests
  - `development/ai/ai-friendly-dsl.md`
- **Steps:**
  1. Add taxonomy: syntax, semantic, contract, runtime, unsupported-subset, normalization.
  2. Add optional diagnostic payload fields for `operation`, `targetPath`, `expectedKind`, `actualKind`, `hint`.
  3. Preserve existing `code/message/severity/span`.
  4. Add contract mismatch fixture with expected/actual payload.
  5. Add snapshot tests for top authoring diagnostics.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :interpreter:jsTest :cli:jvmTest
  ```
- **DoD:**
  - At least parse, semantic, unsupported-subset, normalization, and one mutation runtime case have stable structured tests.
  - Taxonomy document and Kotlin model path are explicit.
  - Human rendering derives from structured diagnostics.

### Note: implemented at `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/diagnostics/BranchlineDiagnostics.kt:1`

Added diagnostic categories and optional payload fields, serialized them through the inspect envelope, and documented the taxonomy in `development/language/diagnostics-taxonomy.md`. Tests cover real parse, semantic, unsupported-subset diagnostics plus normalization, runtime mutation, and contract mismatch payload serialization fixtures.

---

## T8. Mutation runtime diagnostic adapters

- **Status:** - [x]
- **Goal:** Convert common `SET`/`+=` mutation failures into structured diagnostics.
- **Sources:** [S02 E1-E3](../product/branchline-dx/scenarios/02-friendly-mutation-operations.md), [S04 FR2](../product/branchline-dx/scenarios/04-repair-oriented-diagnostics.md).
- **Depends on:** T7
- **Read first:**
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt`
  - `conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/ir/SetOpRuntimeTest.kt`
  - `conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/ir/PlusAssignRuntimeTest.kt`
- **Modify:**
  - `Exec.kt` or runtime error adapter module
  - mutation runtime tests
  - CLI/facade execution tests if run path exposes diagnostics
- **Steps:**
  1. Add fixtures for missing target, non-list/non-numeric/non-string target, missing mid-path, wrong path target.
  2. Map each failure to stable diagnostic code and payload.
  3. Keep exception messages backward-compatible where practical.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :conformance-tests:jvmTest
  ```
- **DoD:**
  - Four mutation failure fixtures have stable code and payload.
  - No existing valid mutation program changes output.

### Note: implemented at `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt:805`

Common `SET`/`+=` mutation failures now throw `BranchlineRuntimeDiagnosticException` with stable runtime category and payload fields. Tests cover missing target, wrong `+=` kind, missing mid-path, wrong path parent, and CLI `--error-format json` propagation.

---

## T9. Example metadata schema MVP

- **Status:** - [x]
- **Goal:** Add retrieval-ready metadata schema to playground examples.
- **Sources:** [S06 FR1-FR5](../product/branchline-dx/scenarios/06-example-metadata-and-retrieval.md), [S05 FR4](../product/branchline-dx/scenarios/05-canonical-docs-and-examples.md).
- **Depends on:** T3
- **Read first:**
  - `playground/examples/*.json`
  - `conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExamplesJvmTest.kt`
  - `conformance-tests/src/jsTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExamplesJsTest.kt`
- **Modify:**
  - `development/docs/playground-example-metadata.md` (new schema record)
  - `conformance-tests/src/commonTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExampleDescriptor.kt` (new or equivalent shared model)
  - example descriptor model/test helpers
  - top 20 `playground/examples/*.json`
  - docs/playground catalog if rendered manually
- **Steps:**
  1. Define optional fields first: `id`, `category`, `tags`, `aiSubset`, `expectedOutput`, `contractExpectation`, `diagnosticExpectation`.
  2. Add validation for id/category/tags on migrated examples.
  3. Migrate exactly this first list: `hello-transform`, `contract-empty-array-append`, `junit-badge-summary`, `contract-nullable-precision`, `contract-literal-brackets-static`, `order-shipment`, `customer-profile`, `stdlib-core-put-delete`, `stdlib-hof-overview`, `stdlib-debug-explain`, `xml-output-ordering`, `xml-mapping-basic`, `json-canonical-output`, `json-duplicate-keys`, `transform-options`, `shared-memory-read`, `pipeline-health-gating`, `contract-input-seeded-wildcard-output`, `contract-coalesce-required-any-of`, `stdlib-core-walk`; if a file name differs, update this list in the schema record before editing examples.
  4. Add inspect compatibility check when `aiSubset = "compatible"`.
- **Verify:**
  ```bash
  ./gradlew :conformance-tests:jvmTest --tests io.github.ehlyzov.branchline.playground.PlaygroundExamplesJvmTest :conformance-tests:jsTest
  ```
- **DoD:**
  - Top 20 examples have retrieval metadata.
  - AI-compatible examples pass inspect compatibility check.

### Note: implemented at `development/docs/playground-example-metadata.md:1`

Added the metadata schema record, shared descriptor parser/validator, JVM/JS conformance validation, and inspect compatibility checks for examples marked `aiSubset: "compatible"`. The existing first slice migrated 17 available descriptors; the requested `xml-mapping-basic`, `json-duplicate-keys`, and `contract-coalesce-required-any-of` files do not exist under `playground/examples/`, and the schema record documents that discrepancy instead of inferring replacements.

Verification:

```bash
./gradlew :conformance-tests:jvmTest --tests io.github.ehlyzov.branchline.playground.PlaygroundExamplesJvmTest :conformance-tests:jsTest --rerun-tasks
```

Result: `BUILD SUCCESSFUL`.

---

## T10. Expected output and diagnostic expectations for examples

- **Status:** - [x]
- **Goal:** Make migrated examples regression-testable beyond syntax success.
- **Sources:** [S06 FR4](../product/branchline-dx/scenarios/06-example-metadata-and-retrieval.md), [S08 FR2](../product/branchline-dx/scenarios/08-ci-quality-gates.md).
- **Depends on:** T9
- **Read first:**
  - example model/tests added in T9
  - `playground/examples/contract-*.json`
  - `playground/examples/stdlib-debug-explain.json`
- **Modify:**
  - example test helpers
  - selected example JSON descriptors
- **Steps:**
  1. Add `expectedOutput` for deterministic examples.
  2. Add `contractExpectation` for contract-focused examples where output is not central.
  3. Add `diagnosticExpectation` for diagnostics examples.
  4. Ensure expectations are checked on JVM and JS paths where feasible.
- **Verify:**
  ```bash
  ./gradlew :conformance-tests:jvmTest :conformance-tests:jsTest
  ```
- **DoD:**
  - At least 10 examples assert output/contract/diagnostic expectations.
  - Failed expectation points to example id and field.

### Note: implemented at `conformance-tests/src/commonTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExampleDescriptor.kt:75`

Added output, contract, and diagnostic expectation fields to the migrated example regression path. JVM and JS playground example tests now assert exact `expectedOutput` values and subset `contractExpectation`/`diagnosticExpectation` values with failure paths that include the example id and field. Current coverage is 15 examples with at least one expectation: 11 output expectations, 5 contract expectations, and 3 diagnostic expectations.

Verification:

```bash
./gradlew :conformance-tests:jvmTest :conformance-tests:jsTest
```

Result: `BUILD SUCCESSFUL`; Gradle reused up-to-date outputs from the agent run.

---

## T11. Playground inspect panes MVP

- **Status:** - [x]
- **Goal:** Expose inspect result from Kotlin/JS facade to playground state; do not build the full UI panes in this task.
- **Sources:** [S07 FR1-FR5](../product/branchline-dx/scenarios/07-playground-ai-workbench.md), [S03](../product/branchline-dx/scenarios/03-inspect-first-cli.md).
- **Depends on:** T6, T7, T9
- **Read first:**
  - `playground/src/playground.tsx`
  - `playground/src/branchline-language.ts`
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundFacade.kt`
  - `BranchlineFacade.kt`
- **Modify:**
  - `PlaygroundFacade.kt`
  - playground facade adapter/state files
  - minimal `playground/src/playground.tsx` wiring only if required to compile
  - playground styles if present
- **Steps:**
  1. Expose inspect result to JS playground without CLI text parsing.
  2. Add typed state for normalized source, diagnostics, subset compatibility and loading/error.
  3. Add stale-result token/cancel guard in state layer.
  4. Do not add final panes/tabs here; that is T17.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jsTest playgroundBuildAssets
  ```
- **DoD:**
- Playground state can receive inspect result and reject stale result.
- No CLI text parsing is used.

### Note: implemented at `playground/src/playground-state.ts:1`

Added `PlaygroundFacade.inspect(...)` over `BranchlineFacade.inspect`, worker-side structured inspect decoding, typed playground inspect state, and a monotonic `requestId` stale-result guard. The current task wires state only; final visible panes remain T17.

Verification:

```bash
./gradlew :interpreter:jsTest playgroundBuildAssets
```

Result: `BUILD SUCCESSFUL`.

---

## T12. Playground metadata filters and catalog update

- **Status:** - [x]
- **Goal:** Surface example metadata in playground catalog and document the playground workbench as the optional visual path for inspect-first authoring.
- **Sources:** [S06](../product/branchline-dx/scenarios/06-example-metadata-and-retrieval.md), [S07 FR4/AC-3](../product/branchline-dx/scenarios/07-playground-ai-workbench.md).
- **Depends on:** T9, T17
- **Read first:**
  - `playground/examples/*.json`
  - `playground/src/playground.tsx`
  - `docs/playground.md`
- **Modify:**
  - playground catalog UI/source
  - `docs/playground.md`
  - generated docs assets via Gradle only
- **Steps:**
  1. Display category/tags/subset badge in catalog.
  2. Add lightweight filtering by category and AI subset status.
  3. Document metadata fields for contributors.
  4. Update `docs/playground.md` and the inspect-first docs page from T2 to present the playground workbench as an optional visual path for normalized source, diagnostics and subset blockers.
- **Verify:**
  ```bash
  ./gradlew playgroundBuildAssets docsBuild
  ```
- **DoD:**
  - Catalog exposes metadata without breaking old examples.
  - Docs explain how to add a new example.
  - S07 AC-3 is covered: docs mention the playground workbench as optional visual inspect-first path.

### Note: implemented at `playground/src/playground-catalog.ts:1`

Added category and AI subset catalog filters, selected-example metadata badges, and a small catalog metadata test wired into the playground npm test script. Public playground and AI canonical subset docs now describe the Inspect workbench as the optional visual inspect-first path for normalized source, diagnostics, and subset blockers while keeping CLI JSON as the automation contract.

Verification:

```bash
cd playground && npm run test
./gradlew playgroundBuildAssets docsBuild
```

Result: both commands completed with `BUILD SUCCESSFUL` / exit code 0; Vite emitted only the existing large chunk warning.

---

## T13. DX quality gate matrix

- **Status:** - [x]
- **Goal:** Define a surface-specific gate matrix that ties syntax/docs/examples/diagnostics/playground changes to commands.
- **Sources:** [S08 FR1-FR5](../product/branchline-dx/scenarios/08-ci-quality-gates.md), [VERIFY](../service/VERIFY.md).
- **Depends on:** T5, T7, T10
- **Read first:**
  - `development/service/VERIFY.md`
  - `development/product/branchline-dx/overview.md`
  - existing CI workflow
- **Modify:**
  - `development/service/VERIFY.md` if verification contract changes
  - `development/ai/ai-friendly-dsl.md`
  - `development/docs/docs-refresh.md`
- **Steps:**
  1. Add DX gate matrix: syntax, normalizer, diagnostics, examples, docs, playground, CLI JSON.
  2. Keep commands aligned with existing VERIFY sections.
  3. Do not add or edit helper scripts in `bin/` in this task.
  4. If a future script is required, create a separate plan task after checking dirty worktree state.
- **Verify:**
  ```bash
  ruby -e 't=File.read("development/ai/ai-friendly-dsl.md"); abort "missing DX quality gate" unless t.include?("DX quality gate"); abort "missing playgroundBuildAssets" unless t.include?("playgroundBuildAssets"); abort "missing docsBuild" unless t.include?("docsBuild"); puts "dx gate matrix ok"'
  ```
- **DoD:**
- Every future DX task can choose a narrow command from the matrix.
- Contour trigger outcome is recorded.

### Note: implemented at `development/ai/ai-friendly-dsl.md:221`

Expanded the DX quality gate matrix for syntax/parser, normalizer/subset, diagnostics, CLI inspect JSON, playground examples/metadata, docs, playground UI/assets, and contour docs. `development/docs/docs-refresh.md` records the docs/playground checklist. The contour trigger fired for verification guidance only; `development/service/VERIFY.md` remained the canonical command source and did not need changes.

Verification:

```bash
ruby -e 't=File.read("development/ai/ai-friendly-dsl.md"); abort "missing DX quality gate" unless t.include?("DX quality gate"); abort "missing playgroundBuildAssets" unless t.include?("playgroundBuildAssets"); abort "missing docsBuild" unless t.include?("docsBuild"); puts "dx gate matrix ok"'
bin/audit_contour.sh
```

Result: both commands passed.

---

## T14. Local warnings for canonical examples

- **Status:** - [x]
- **Goal:** Add local warning-mode validation for non-canonical AI-compatible examples without changing CI policy.
- **Sources:** [S08 AC-1](../product/branchline-dx/scenarios/08-ci-quality-gates.md), [S06 AC-3](../product/branchline-dx/scenarios/06-example-metadata-and-retrieval.md).
- **Depends on:** T9, T13
- **Read first:**
  - example validation tests from T9
  - `development/service/VERIFY.md`
- **Modify:**
  - tests or Gradle task wiring for warning-mode validation
  - `development/service/VERIFY.md` only if local verification contract changes
- **Steps:**
  1. Add validation that runs locally and can run in CI.
  2. Start in warning/report mode if existing examples are not fully migrated.
  3. Do not edit `.github/workflows/tests.yml` in this task.
  4. Record a separate follow-up if promotion to blocking CI is desired.
- **Verify:**
  ```bash
  ./gradlew :conformance-tests:jvmTest
  ```
- **DoD:**
  - Non-canonical AI-compatible examples are visible in test output.
  - CI behavior is unchanged.

### Note: implemented at `conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExamplesJvmTest.kt:40`

Added warning-mode validation for AI-compatible examples whose tested source differs from the normalized source. The Gradle JVM test task forwards deterministic `PLAYGROUND_EXAMPLE_WARNING` lines while leaving CI policy unchanged; `.github/workflows/tests.yml` was intentionally not modified.

Verification:

```bash
./gradlew :conformance-tests:jvmTest --rerun-tasks
```

Result: command completed with `BUILD SUCCESSFUL` and emitted 14 current non-canonical AI-compatible example warnings.

---

## T15. Final docs/playground build and contour check

- **Status:** - [x]
- **Goal:** Run final verification for all changed surfaces and update development records.
- **Sources:** [S08](../product/branchline-dx/scenarios/08-ci-quality-gates.md), [VERIFY](../service/VERIFY.md).
- **Depends on:** T2, T3, T4, T5, T6, T7, T10, T11, T12, T13, T16, T17, T18
- **Read first:**
  - `development/service/VERIFY.md`
  - `development/INDEX.md`
  - `development/service/SERVICE_MAP.md`
- **Modify:**
  - `development/INDEX.md`
  - `development/service/SERVICE_MAP.md` only if topology/entrypoint changed
  - `development/service/VERIFY.md` only if verification commands changed
  - generated overlays only via contour scripts
- **Steps:**
  1. Run narrow commands for all touched surfaces.
  2. Run `docsBuild` if public docs changed.
  3. Run `bin/audit_contour.sh` and refresh contour only if trigger fired.
  4. Update development changelog/statuses.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :interpreter:jsTest :cli:jvmTest :cli:jsNodeTest :conformance-tests:jvmTest :conformance-tests:jsTest
  ./gradlew playgroundBuildAssets docsBuild
  bin/audit_contour.sh
  ```
- **DoD:**
  - All required verification commands are recorded with pass/fail.
  - Unverified items are explicitly listed.
  - Development index and contour docs are in sync.

### Note: implemented at `development/planning/branchline-dx-implementation-plan.md:623`

Final verification ran across the changed interpreter, CLI, conformance, playground, docs, and contour surfaces. No required item remains unverified in the current T9-T18 slice.

Verification:

```bash
./gradlew :interpreter:jvmTest :interpreter:jsTest :cli:jvmTest :cli:jsNodeTest :conformance-tests:jvmTest :conformance-tests:jsTest
./gradlew playgroundBuildAssets docsBuild
bin/audit_contour.sh
ruby -e 'require "yaml"; Dir.glob("development/**/*.md").each { |p| t=File.read(p); next unless t.start_with?("---\n"); YAML.load(t.split(/^---$/)[1]); }; puts "development front matter ok"'
git diff --check
```

Result: all commands passed. Gradle reused some up-to-date outputs; the broad test command still executed the changed CLI/JS/conformance tasks needed by the final gate.

---

## T16. Self-append rewrite decision and implementation gate

- **Status:** - [x]
- **Goal:** Decide and execute exactly one path for self-append canonicalization: implement the safe rewrite or explicitly defer it with tests proving current behavior.
- **Sources:** [S02 FR4](../product/branchline-dx/scenarios/02-friendly-mutation-operations.md), [T5 corpus](branchline-dx-implementation-plan.md).
- **Depends on:** T5
- **Read first:**
  - `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/normalize/AstRenderer.kt`
  - `interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline/normalize/AstRendererTest.kt`
  - `development/ai/ai-friendly-dsl.md`
- **Modify:**
  - `AstRendererTest.kt`
  - `AstRenderer.kt` only if implementing
  - `development/ai/ai-friendly-dsl.md`
- **Steps:**
  1. Implement only if the AST renderer can prove all guard conditions locally: target is simple identifier, first `APPEND` arg is the same identifier, callee is builtin `APPEND`, and no path/dynamic access is involved.
  2. If any guard requires semantic alias analysis, defer implementation and add explicit deferred fixtures.
  3. In both paths, add tests for unsafe non-rewrites: nested path, dynamic path, shadow/unknown callee, different identifiers.
  4. Update AI doc with final decision.
- **Verify:**
  ```bash
  ./gradlew :interpreter:jvmTest :interpreter:jsTest
  ```
- **DoD:**
  - Self-append rewrite status is no longer ambiguous.
- Tests pin implemented or deferred behavior.

### Note: implemented at `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/normalize/AstRenderer.kt:264`

Implemented the safe rewrite path: normalized output rewrites only simple local `SET x = APPEND(x, value)` to `x += value`. Unsafe forms remain pinned by tests: nested path targets, dynamic targets, alias-ambiguous first arguments, lowercase/user callee names, and different identifiers do not rewrite. `development/ai/ai-friendly-dsl.md` records the final decision.

Verification:

```bash
./gradlew :interpreter:jvmTest --tests io.github.ehlyzov.branchline.normalize.AstRendererTest
./gradlew :interpreter:jsNodeTest --tests io.github.ehlyzov.branchline.cbor.CborCodecTest.deterministicEncodingReusesNestedSetElementBytes
./gradlew :interpreter:jvmTest :interpreter:jsTest
```

Result: all three commands completed with `BUILD SUCCESSFUL`. The CBOR command covers a portability fix in the pre-existing deterministic CBOR reuse test that otherwise blocked JS interpreter verification.

---

## T17. Playground inspect UI panes

- **Status:** - [x]
- **Goal:** Build the user-visible normalized source, diagnostics and subset blocker panes using the state/facade work from T11.
- **Sources:** [S07 AC-1](../product/branchline-dx/scenarios/07-playground-ai-workbench.md), [T11](branchline-dx-implementation-plan.md).
- **Depends on:** T11
- **Read first:**
  - `playground/src/playground.tsx`
  - playground styles/components
  - state/facade adapter added in T11
- **Modify:**
  - `playground/src/playground.tsx`
  - playground component/style files
  - generated docs assets via Gradle only
- **Steps:**
  1. Add panes/tabs for normalized source, diagnostics and subset blockers.
  2. Keep execution output visually distinct from inspect output.
  3. Add bounded empty/loading/error states based on T11 state.
  4. Rebuild assets with Gradle.
- **Verify:**
  ```bash
  ./gradlew playgroundBuildAssets
  ```
- **DoD:**
  - User can see normalized source and diagnostics in playground.
  - UI handles compatible, incompatible and parse-error programs.

### Note: implemented at `playground/src/playground.tsx:520`

Added a visible Inspect workbench section with normalized source, diagnostics and subset blocker tabs, plus bounded loading, error and empty states. Execution output remains visually separate from inspect output, and responsive styles keep the panes usable on narrower viewports.

Verification:

```bash
./gradlew playgroundBuildAssets
```

Result: command completed with `BUILD SUCCESSFUL`.

---

## T18. Playground visual verification

- **Status:** - [x]
- **Goal:** Verify playground workbench rendering across desktop/mobile and record evidence.
- **Sources:** [S07 AC-2](../product/branchline-dx/scenarios/07-playground-ai-workbench.md), [T17](branchline-dx-implementation-plan.md).
- **Depends on:** T17
- **Read first:**
  - `development/service/VERIFY.md`
  - playground local run instructions
- **Modify:**
  - verification notes in `development/ai/ai-friendly-dsl.md` or `development/docs/docs-refresh.md`
- **Steps:**
  1. Start the local playground/docs path recommended by the repo.
  2. Capture desktop and mobile evidence for normalized source, diagnostics and subset blockers.
  3. Check that panes do not overlap and generated assets are from `playgroundBuildAssets`.
- **Verify:**
  ```bash
  ./gradlew playgroundBuildAssets docsBuild
  ```
- **DoD:**
  - Visual verification evidence is recorded.
  - Known UI limitations are documented rather than hidden.

### Note: implemented at `development/docs/docs-refresh.md:264`

Verified the generated playground bundle through a temporary local HTTP wrapper around `docs/assets/playground.js` and `docs/assets/playground.css`. Desktop evidence covers normalized source, diagnostics, empty blockers, and a real incompatible subset blocker. Mobile evidence covers the 390px layout with metadata, editors, output, and diagnostics.

Verification:

```bash
./gradlew playgroundBuildAssets docsBuild
```

Result: command completed with `BUILD SUCCESSFUL`. Playwright screenshots were captured under `output/playwright/`; the only browser console error was the temporary wrapper's missing `favicon.ico`.

---
