---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for playground example metadata and retrieval."
---
# 06 — Metadata для примеров и retrieval

- **Persona:** ai-agent, developer.
- **Статус:** growth.
- **UI:** [playground examples](../../../../playground/examples), future docs search/retrieval.
- **Backend:** [playground source](../../../../playground/src), [docs playground page](../../../../docs/playground.md).
- **Связанные сценарии:** [05 Канонические примеры](05-canonical-docs-and-examples.md), [03 Inspect-first CLI](03-inspect-first-cli.md), [07 Playground AI workbench](07-playground-ai-workbench.md).

## Problem

Файл примера сегодня хорошо подходит для человека, но слабо описывает intent для машины. AI-agent видит title/description/program/input, но не знает category, canonical subset status, expected output, contract expectation, diagnostics expectation и related docs. В результате retrieval выбирает похожий текст, а не проверенный паттерн.

## Goal

Ввести минимальную metadata schema для playground examples, пригодную для docs catalog, AI retrieval и regression tests. Целевой результат после MVP: top 20 examples имеют `id`, `category`, `tags`, `aiSubset`, `expectedOutput` или `contractExpectation`.

## Non-goals

- Не строить vector database в репозитории.
- Не требовать expected output для nondeterministic examples.
- Не менять format публичного playground без migration adapter.
- Не добавлять cloud dependency.

## User flow

### Основной сценарий

1. Maintainer добавляет example JSON.
2. Schema validation проверяет обязательные metadata fields.
3. Example test запускает program на input и сверяет expected output или contract expectation.
4. Docs catalog отображает tags/category.
5. AI-agent выбирает example по tags и subset status.
6. Agent применяет canonical pattern и проверяет inspect output.

### Альтернативные сценарии

- A1: Example предназначен для diagnostics; вместо output содержит expected diagnostic code.
- A2: Example advanced/non-AI-subset; metadata объясняет почему.
- A3: Example is legacy migration pair; tags связывают old/new pattern.

### Ошибочные сценарии

- E1: Нет id или id не совпадает с filename; schema test fails.
- E2: Expected output устарел; example runtime test fails.
- E3: Example помечен `aiSubset: compatible`, но inspect возвращает blocker.

## Functional requirements

FR1. Define example metadata schema in development first.
FR2. Add validation tests for mandatory fields.
FR3. Add inspect compatibility checks for examples tagged AI-compatible.
FR4. Add expected output or contract/diagnostic expectation support.
FR5. Expose tags/category in docs/playground index.

## Non-functional requirements

NFR1. (G6) Metadata validation for 50 examples should run under 5 seconds in JVM test path excluding Gradle startup.
NFR2. Schema evolution must be additive or have migration script.
NFR3. Metadata must avoid long free-form prose where enumerated tags work.

## Architecture constraints

AC1. Example descriptors remain plain JSON.
AC2. Validation logic should be shared by JVM/JS tests where practical.
AC3. No generated docs assets are committed without `playgroundBuildAssets`.
AC4. AI retrieval metadata must not depend on external services.

## Acceptance criteria

AC-1. Implementation plan includes schema file or Kotlin model for example descriptors.
AC-2. Top 20 example migration list is present.
AC-3. CI gate covers missing metadata and invalid AI subset tag.
AC-4. Docs plan references tags/category rendering.

## Test plan

- **Unit:**
  - Metadata schema parsing/validation tests.
- **Integration:**
  - Playground examples JVM/JS tests with expectations.
- **E2E:**
  - `./gradlew playgroundBuildAssets` after UI catalog changes.
- **Migration / rollback:**
  - Rollout behind optional fields first; make required after migration.

## Дополнительные сценарии и связь с продуктом

Этот сценарий превращает examples из набора демонстраций в управляемый training/retrieval corpus. Он зависит от [05 Канонические docs и playground examples](05-canonical-docs-and-examples.md), потому что metadata не спасёт неканонический пример. Он поддерживает [07 Playground AI workbench](07-playground-ai-workbench.md), где пользователь сможет фильтровать примеры по задачам, ошибкам и subset compatibility.

## Дополнительно: gap analysis vs текущее состояние

| Что есть сегодня | Что нужно для retrieval metadata | Объём работы |
| --- | --- | --- |
| title/description/program/input | id/category/tags/expectations/subset status | medium |
| JVM/JS example tests | Schema and inspect compatibility checks | medium |
| Docs playground page | Tagged catalog or generated summary | medium |
