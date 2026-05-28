---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for repair-oriented diagnostics and structured authoring errors."
---
# 04 — Repair-oriented diagnostics

- **Persona:** ai-agent, developer, qa.
- **Статус:** growth.
- **UI:** [CLI inspect formatting](../../../../cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt), future playground diagnostics panes.
- **Backend:** [BranchlineFacade diagnostics](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt), [SemanticAnalyzer](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/sema/SemanticAnalyzer.kt), [runtime exec](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
- **Связанные сценарии:** [02 Мутирующие операции](02-friendly-mutation-operations.md), [03 Inspect-first CLI](03-inspect-first-cli.md), [07 Playground AI workbench](07-playground-ai-workbench.md), [08 CI quality gates](08-ci-quality-gates.md).

## Problem

Ошибки Branchline уже имеют parse/semantic codes на facade-level, но многие runtime и contract mismatch cases остаются human-message centric. Для человека сообщение может быть достаточно, а AI-agent нуждается в typed reason, source span, expected/actual payload и repair hint. Особенно это критично для мутаций: target missing, wrong init type, missing mid-path и shared-state restrictions должны чиниться разными патчами.

## Goal

Сделать diagnostics пригодными для автоматического repair loop. Целевой результат после MVP: top 20 authoring errors имеют stable code, span или target path, expected/actual payload и короткий repair hint.

## Non-goals

- Не строить полноценный proof engine.
- Не гарантировать автоматическое исправление любой программы.
- Не менять exception hierarchy без migration path.
- Не смешивать trace/explain output с diagnostics envelope.

## User flow

### Основной сценарий

1. AI-agent отправляет source в inspect.
2. Facade возвращает `parse_error`, `semantic_error`, `unsupported_in_ai_subset` или typed future diagnostics.
3. Agent выбирает repair strategy по `code`, а не по prose.
4. Для mutation error agent видит `targetPath`, `expectedKind`, `actualKind`.
5. Agent генерирует patch и повторяет inspect.
6. Developer видит ту же ошибку в CLI/playground human rendering.

### Альтернативные сценарии

- A1: Runtime-only ошибка возникает при execution; CLI wraps it into structured runtime diagnostic.
- A2: Contract mismatch содержит expected/actual contract fragment.
- A3: Warning не блокирует normalized source, но попадает в warning list.

### Ошибочные сценарии

- E1: Ошибка без span получает `span: null`, но обязана иметь stable code.
- E2: Multiple diagnostics сортируются детерминированно.
- E3: Repair hint не должен предлагать unsafe shared-state mutation.

## Functional requirements

FR1. Diagnostics taxonomy must cover syntax, semantic, contract, runtime, unsupported-subset, normalization.
FR2. Mutation diagnostics must expose operation, target path, expected kind, actual kind when available.
FR3. Contract diagnostics must expose expected/actual payload without requiring human text parsing.
FR4. CLI/playground human rendering must derive from structured diagnostics.
FR5. Tests must pin diagnostic codes and representative payload shapes.

## Non-functional requirements

NFR1. (G5) Top 20 diagnostics snapshot must be stable across JVM/JS.
NFR2. Diagnostics payload must avoid leaking raw file contents beyond source span and snippet policy.
NFR3. Repair hints must be deterministic for same input.

## Architecture constraints

AC1. Internal exceptions can remain, but public facade emits stable diagnostics.
AC2. Contract validator and runtime errors require adapter layer before entering CLI.
AC3. Diagnostics JSON uses additive evolution only.
AC4. Playground consumes diagnostics as data, not string matching.

## Acceptance criteria

AC-1. Implementation plan includes diagnostics taxonomy document and Kotlin model changes.
AC-2. Mutation runtime errors have at least 4 pinned fixtures.
AC-3. Contract mismatch fixture includes expected/actual payload.
AC-4. CLI renderer tests prove human text is derived from structured data.

## Test plan

- **Unit:**
  - Facade diagnostic model tests.
  - Runtime mutation adapter tests.
- **Integration:**
  - `./gradlew :interpreter:jvmTest :interpreter:jsTest :cli:jvmTest`.
- **E2E:**
  - Playground diagnostics rendering smoke after workbench MVP.
- **Migration / rollback:**
  - Keep old human text while adding structured fields.

## Дополнительные сценарии и связь с продуктом

Этот сценарий является связующим слоем между языком и AI-assisted authoring. Он получает конкретные error cases из [02 Мутирующие операции](02-friendly-mutation-operations.md), отдаёт stable payload в [03 Inspect-first CLI](03-inspect-first-cli.md), а затем визуализируется в [07 Playground AI workbench](07-playground-ai-workbench.md). Без него DX улучшается только за счёт документации, но не превращается в автоматический repair loop.
