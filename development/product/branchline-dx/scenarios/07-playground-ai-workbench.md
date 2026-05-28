---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for playground AI workbench with inspect panes."
---
# 07 — Playground как AI workbench

- **Persona:** developer, ai-agent, qa.
- **Статус:** growth.
- **UI:** [playground React app](../../../../playground/src/playground.tsx), [Monaco language support](../../../../playground/src/branchline-language.ts).
- **Backend:** [PlaygroundFacade](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundFacade.kt), [BranchlineFacade](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt).
- **Связанные сценарии:** [03 Inspect-first CLI](03-inspect-first-cli.md), [04 Контрактные диагностики](04-repair-oriented-diagnostics.md), [06 Example metadata](06-example-metadata-and-retrieval.md).

## Problem

Playground полезен для запуска примеров, но AI-friendly workflow требует больше, чем input/output panes. Пользователь должен видеть normalized source, contract diff, diagnostics with codes, subset blockers и suggested repair direction. Если это остаётся только в CLI, docs onboarding теряет интерактивность.

## Goal

Сделать playground inspect-first workbench для Branchline authoring. Целевой результат после MVP: пользователь видит source, normalized source, output/contracts и diagnostics без переключения инструментов.

## Non-goals

- Не добавлять чат-агента в playground MVP.
- Не отправлять код на внешний backend.
- Не строить multi-file project IDE.
- Не менять public runtime semantics.

## User flow

### Основной сценарий

1. Developer открывает playground.
2. Выбирает tagged example или вставляет программу.
3. Workbench автоматически запускает inspect после debounce.
4. Показывает subset status и diagnostics.
5. Если compatible, показывает normalized source.
6. Developer запускает execution и сравнивает output/contracts.
7. QA использует тот же UI для regression screenshot/manual review.

### Альтернативные сценарии

- A1: Example non-AI-subset; UI показывает reason и не предлагает normalized replacement.
- A2: Contract diff pane показывает expected vs inferred after future metadata.
- A3: Diagnostics pane группирует syntax/semantic/runtime/contract.

### Ошибочные сценарии

- E1: Worker bundle не загрузился; UI показывает deterministic error state.
- E2: Inspect зависает; debounce/cancel предотвращает stale diagnostics.
- E3: Long source превышает лимит; UI предлагает CLI path.

## Functional requirements

FR1. Playground must surface normalized source from facade.
FR2. Playground must display diagnostic codes/spans.
FR3. Playground must show AI subset compatibility and blockers.
FR4. Playground must consume example metadata tags/category.
FR5. UI must keep execution and inspect results visually distinct.

## Non-functional requirements

NFR1. (G7) Inspect feedback for 200-line program should appear under 500 ms after worker warmup where local JS runtime allows.
NFR2. UI must not overlap panes or hide diagnostics on mobile/desktop.
NFR3. Browser bundle must not include external network dependency for inspect.

## Architecture constraints

AC1. Playground uses common Kotlin/JS facade where available.
AC2. UI changes require `playgroundBuildAssets` and screenshot/manual verification.
AC3. Generated `docs/assets/` are rebuilt, not manually patched.
AC4. Workbench panes consume structured data, not parsed CLI text.

## Acceptance criteria

AC-1. Implementation plan has separate tasks for facade exposure, UI panes, metadata filters, and verification.
AC-2. Hardening plan includes UI stale-result and payload-size guards.
AC-3. Docs mention playground workbench as optional visual path for inspect-first loop.
AC-4. Verification includes `./gradlew playgroundBuildAssets`.

## Test plan

- **Unit:**
  - UI state reducer/component tests if test infra exists; otherwise facade adapter tests.
- **Integration:**
  - `./gradlew :interpreter:jsTest`.
  - `./gradlew playgroundBuildAssets`.
- **E2E:**
  - Browser smoke/manual screenshot for normalized/diagnostics panes.
- **Migration / rollback:**
  - Feature can be hidden behind UI flag while CLI/facade remains canonical.

## Дополнительные сценарии и связь с продуктом

Этот сценарий является growth layer поверх [03 Inspect-first CLI](03-inspect-first-cli.md) и [04 Repair-oriented diagnostics](04-repair-oriented-diagnostics.md). Он не должен идти первым: пока JSON envelope, diagnostics и examples metadata не стабилизированы, UI будет вынужден угадывать. После стабилизации он даст сильный onboarding эффект для новых developer и QA.

## Дополнительно: gap analysis vs текущее состояние

| Что есть сегодня | Что нужно для workbench | Объём работы |
| --- | --- | --- |
| Playground runs programs/examples | Inspect panes and normalized source pane | high |
| Examples have title/description | Metadata filters and subset badges | medium |
| Docs describe contracts toggle | Repair-oriented diagnostics UI | high |
