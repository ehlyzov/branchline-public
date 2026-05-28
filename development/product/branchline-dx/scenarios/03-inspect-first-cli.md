---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for inspect-first CLI and stable machine JSON."
---
# 03 — Inspect-first CLI и машинный JSON

- **Persona:** developer, ai-agent, qa.
- **Статус:** current.
- **UI:** CLI surface in [BranchlineCli](../../../../cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt).
- **Backend:** [BranchlineFacade](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt), [Contract JSON renderer](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/contract/ContractJsonRenderer.kt).
- **Связанные сценарии:** [01 Канонический цикл](01-canonical-authoring-loop.md), [04 Контрактные диагностики](04-repair-oriented-diagnostics.md), [06 Example metadata](06-example-metadata-and-retrieval.md), [07 Playground AI workbench](07-playground-ai-workbench.md), [08 CI quality gates](08-ci-quality-gates.md).

## Problem

CLI умеет inspect contracts и уже получил `--normalized`, но пользовательский workflow всё ещё воспринимается как «запусти программу», а не «сначала проверь форму, контракт и repair hints». AI-agent нуждается в одном JSON envelope с success, diagnostics, normalizedSource, contracts, featureUsage и compatibility, чтобы не парсить human text. Без стабильного machine contract любые будущие integrations начнут зависеть от случайного CLI formatting.

## Goal

Закрепить inspect-first CLI как основной machine API для авторства и CI. Целевой результат: один JSON payload покрывает parse/analyze/normalize/contracts status без обращения к internal Kotlin types.

## Non-goals

- Не заменять полноценный library API одним CLI.
- Не добавлять network service.
- Не выводить runtime trace в inspect MVP.
- Не менять default `bl run` behavior.

## User flow

### Основной сценарий

1. AI-agent создаёт временный `.bl` файл.
2. Запускает `bl inspect --contracts --contracts-json --normalized file.bl`.
3. CLI вызывает facade и печатает JSON.
4. Agent читает `subsetCompatibility`; при `COMPATIBLE` использует `normalizedSource`.
5. Agent читает `input`/`output` contracts и сверяет их с expected schema.
6. При ошибке agent читает diagnostics codes/spans и генерирует patch.
7. CI использует тот же inspect path для gate.

### Альтернативные сценарии

- A1: Developer запускает text mode `--contracts --normalized` для ручной проверки.
- A2: QA запускает inspect для corpus программ без execution input.
- A3: CLI получает transformName и проверяет один transform в multi-transform файле.

### Ошибочные сценарии

- E1: Нет `--contracts`; CLI возвращает usage error, не скрывая requirement.
- E2: Нет transform blocks; facade возвращает `no_transform_blocks`.
- E3: `--normalized` запрошен, но source incompatible; JSON остаётся валидным и содержит diagnostics.

## Functional requirements

FR1. CLI inspect JSON должен иметь документированный stable envelope.
FR2. JSON envelope должен включать diagnostics со severity/code/span.
FR3. `normalizedSource` должен быть top-level или clearly documented field.
FR4. CLI docs должны показывать inspect-first loop до execution loop.
FR5. CI examples должны использовать `./gradlew` и repo-local CLI, а не system Gradle.

## Non-functional requirements

NFR1. (G2) Machine JSON must be backward-compatible within a minor release unless migration is documented.
NFR2. CLI inspect should fail deterministically for same invalid source.
NFR3. CLI output must not include environment-specific paths in stable JSON unless explicitly requested.

## Architecture constraints

AC1. CLI output must be generated from common facade result.
AC2. JVM and JS CLI should expose equivalent inspect behavior.
AC3. Errors must be typed before formatting into human text.
AC4. No direct parser internals in downstream integrations.

## Acceptance criteria

AC-1. План содержит задачу на `docs/guides/cli.md` inspect-first section.
AC-2. План содержит задачу на CLI JSON snapshot/golden tests.
AC-3. Gap analysis tracks current `normalizedSource` field placement and migration decision.
AC-4. Hardening plan includes no-secret/no-local-path invariant for machine JSON.

## Test plan

- **Unit:**
  - CLI renderer tests for text/json normalized output.
- **Integration:**
  - `./gradlew :cli:jvmTest :cli:jsNodeTest`.
- **E2E:**
  - Shell fixture invoking built CLI on compatible and incompatible programs.
- **Migration / rollback:**
  - Maintain old fields; add new fields additively.

## Дополнительные сценарии и связь с продуктом

Этот сценарий превращает canonical language work в usable toolchain. Без него [01 Канонический цикл](01-canonical-authoring-loop.md) остаётся идеей внутри Kotlin facade, а [08 CI quality gates](08-ci-quality-gates.md) не получает стабильный контракт. Он также является естественной точкой интеграции для будущих LLM workflows из `development/ai/llm-pipelines.md`, но не зависит от pipeline runtime.
