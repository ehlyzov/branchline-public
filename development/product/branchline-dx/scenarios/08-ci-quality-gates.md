---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for DX CI and local quality gates."
---
# 08 — CI quality gates для DX

- **Persona:** qa, developer.
- **Статус:** growth.
- **UI:** GitHub Actions in [.github/workflows/tests.yml](../../../../.github/workflows/tests.yml), local Gradle tasks.
- **Backend:** [conformance tests](../../../../conformance-tests/src/commonTest/kotlin/io/github/ehlyzov/branchline/conformance), [CLI tests](../../../../cli/src/jvmTest/kotlin/io/github/ehlyzov/branchline/cli), [interpreter tests](../../../../interpreter/src/commonTest/kotlin/io/github/ehlyzov/branchline).
- **Связанные сценарии:** [03 Inspect-first CLI](03-inspect-first-cli.md), [04 Контрактные диагностики](04-repair-oriented-diagnostics.md), [05 Канонические примеры](05-canonical-docs-and-examples.md).

## Problem

DX инициативы легко деградируют: новый синтаксис не попал в docs, пример использует старый паттерн, JSON envelope изменился без migration note, JVM/JS inspect разъехались. Сейчас verification contract перечисляет команды, но для AI-friendly DSL нет отдельного набора quality gates, который защищает canonical subset, diagnostics и examples.

## Goal

Ввести минимальные CI/local gates для language DX. Целевой результат: изменение syntax/diagnostics/examples не считается завершённым без targeted tests, docs sync и development record update.

## Non-goals

- Не требовать full clean build для каждой мелкой docs правки.
- Не блокировать исследовательские development notes.
- Не добавлять slow benchmark gates в обычный path.
- Не менять release workflow в MVP.

## User flow

### Основной сценарий

1. Developer меняет parser/normalizer/examples.
2. Плановая задача указывает narrow verify commands.
3. Developer запускает соответствующие `./gradlew` tasks.
4. CI повторяет critical subset.
5. Если docs/examples не обновлены, test или checklist fails.
6. Reviewer видит changed surface summary и verification evidence.

### Альтернативные сценарии

- A1: Docs-only change запускает docsBuild and example metadata validation.
- A2: Diagnostics-only change запускает facade/CLI snapshot tests.
- A3: Playground UI change запускает playgroundBuildAssets and manual screenshot.

### Ошибочные сценарии

- E1: System Gradle used; verification rejected by repo contract.
- E2: Generated docs assets changed manually; review blocks.
- E3: Contour trigger fired but `SERVICE_MAP`/`VERIFY` not updated.

## Functional requirements

FR1. Define DX quality gate matrix by touched surface.
FR2. Add tests for normalization corpus, diagnostics snapshots, example metadata.
FR3. Require docs/examples update for syntax or style changes.
FR4. Record contour triggers and verification evidence in task DoD.
FR5. Keep CI commands aligned with `development/service/VERIFY.md`.

## Non-functional requirements

NFR1. (G8) Narrow DX gate should finish under 10 minutes locally excluding dependency download.
NFR2. CI gates must be deterministic and not depend on network after dependencies are resolved.
NFR3. Quality gates must avoid generated asset churn unless playground/docs assets changed.

## Architecture constraints

AC1. `./gradlew` is the only Gradle entrypoint.
AC2. Source of verification truth remains `development/service/VERIFY.md`.
AC3. Syntax changes update grammar, conformance tests, language docs, playground examples.
AC4. Service contour docs update only when contour trigger fires.

## Acceptance criteria

AC-1. Implementation plan has final T-task for DX gate matrix and verification script/checklist.
AC-2. Hardening plan includes no-orphan TODO and knowledge-gap update checks.
AC-3. Each T-task lists exact verify command.
AC-4. Plan final task runs broad language/runtime checks and contour audit.

## Test plan

- **Unit:**
  - Normalization/diagnostics/example metadata tests.
- **Integration:**
  - Surface-specific Gradle tasks from `development/service/VERIFY.md`.
- **E2E:**
  - CI workflow review after local narrow pass.
- **Migration / rollback:**
  - New gates introduced as warnings first if existing corpus needs migration.

## Дополнительные сценарии и связь с продуктом

Этот сценарий является защитным слоем для всей программы. Он получает requirements из [03 Inspect-first CLI](03-inspect-first-cli.md), [04 Repair-oriented diagnostics](04-repair-oriented-diagnostics.md) и [05 Канонические docs и playground examples](05-canonical-docs-and-examples.md), а затем превращает их в проверяемые gates. Без него DX улучшения быстро начнут расходиться между parser, docs, examples, CLI и JS playground.

## Дополнительно: gap analysis vs текущее состояние

| Что есть сегодня | Что нужно для DX gates | Объём работы |
| --- | --- | --- |
| `development/service/VERIFY.md` | DX-specific matrix by touched surface | low |
| Existing facade/CLI/example tests | Snapshot and metadata gates | medium |
| CI workflow | Optional gate additions after local plan | medium |
