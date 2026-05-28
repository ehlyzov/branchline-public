---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for canonical docs and playground examples."
---
# 05 — Канонические docs и playground examples

- **Persona:** developer, ai-agent, qa.
- **Статус:** growth.
- **UI:** [docs language](../../../../docs/language), [docs guides](../../../../docs/guides), [playground examples](../../../../playground/examples).
- **Backend:** [Playground examples tests](../../../../conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExamplesJvmTest.kt), [JS playground examples tests](../../../../conformance-tests/src/jsTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExamplesJsTest.kt).
- **Связанные сценарии:** [01 Канонический цикл](01-canonical-authoring-loop.md), [02 Мутирующие операции](02-friendly-mutation-operations.md), [06 Example metadata](06-example-metadata-and-retrieval.md), [08 CI quality gates](08-ci-quality-gates.md).

## Problem

Branchline уже имеет много полезных примеров, но часть public docs короткая и не всегда показывает expected output, pitfalls, null behavior и canonical style. Для AI-assisted authoring особенно плохо, когда пример демонстрирует старый или неоднозначный паттерн: модель начинает воспроизводить его в новых программах. Docs также содержат рассинхроны по синтаксису comprehension, что снижает доверие к справочнику.

## Goal

Сделать docs/playground corpus каноническим учебным набором. Целевой результат после MVP: все high-traffic examples имеют tags, expected output или contract expectation, canonical mutation style и ссылку на diagnostic/contract behavior.

## Non-goals

- Не переписывать всю документацию за один релиз.
- Не удалять advanced examples вроде SHARED/GRAPH.
- Не делать playground полноценной IDE в этом сценарии.
- Не менять semantics ради docs simplification.

## User flow

### Основной сценарий

1. Developer открывает docs guide по arrays или statements.
2. Видит canonical pattern и anti-pattern correction.
3. Переходит в playground example.
4. Запускает пример и видит output/contracts.
5. Копирует canonical pattern в свой transform.
6. QA запускает playground example tests для JVM/JS.
7. AI-agent использует corpus как retrieval source с consistent style.

### Альтернативные сценарии

- A1: Advanced example помечен как non-AI-subset, но остаётся в catalog.
- A2: Docs page указывает migration note для старого style.
- A3: Example без deterministic output получает только contract expectation.

### Ошибочные сценарии

- E1: Example синтаксически валиден, но не canonical; normalized check fails docs gate.
- E2: Docs grammar показывает construct, который parser не принимает; docs gate требует issue/gap entry.
- E3: Example output нестабилен из-за ordering; test должен canonicalize или пометить nondeterminism.

## Functional requirements

FR1. Docs must include canonical mutation section for comprehensions, `+=`, `SET`, `MODIFY`, pure `APPEND`.
FR2. Playground examples must replace self-append patterns where statement append is clearer.
FR3. Docs must reconcile array comprehension syntax with parser-supported syntax.
FR4. Examples must expose metadata useful for retrieval: category/tags/expectations.
FR5. Docs must include AI canonical subset and inspect-first workflow pages.

## Non-functional requirements

NFR1. (G4) Docs/playground example tests must pass on JVM and JS.
NFR2. Example metadata must be deterministic and easy to diff.
NFR3. No generated `docs/assets/` changes are hand-authored.

## Architecture constraints

AC1. Public docs are source under `docs/`, generated assets only via Gradle task.
AC2. Any syntax docs update also updates EBNF and parser/conformance references.
AC3. Playground examples remain JSON descriptors under `playground/examples`.
AC4. Development records stay in `development/` before public docs changes.

## Acceptance criteria

AC-1. Implementation plan lists exact docs pages and examples to rewrite first.
AC-2. At least 10 playground examples have retrieval metadata in the plan.
AC-3. Docs include anti-pattern → canonical-pattern for mutation and input alias.
AC-4. Verification includes `./gradlew docsBuild` and playground examples tests.

## Test plan

- **Unit:**
  - Example metadata parser/schema tests.
- **Integration:**
  - `./gradlew :conformance-tests:jvmTest --tests io.github.ehlyzov.branchline.playground.PlaygroundExamplesJvmTest`.
  - `./gradlew :conformance-tests:jsTest`.
- **E2E:**
  - `./gradlew docsBuild`.
- **Migration / rollback:**
  - Keep old examples only if tagged legacy/non-canonical.

## Дополнительные сценарии и связь с продуктом

Этот сценарий закрепляет решения из [01 Канонический цикл](01-canonical-authoring-loop.md) и [02 Мутирующие операции](02-friendly-mutation-operations.md) в местах, где пользователь реально учится языку. Он подготавливает [06 Example metadata](06-example-metadata-and-retrieval.md), потому что retrieval без качественного corpus только ускорит распространение старых паттернов.

## Дополнительно: gap analysis vs текущее состояние

| Что есть сегодня | Что нужно для canonical docs/examples | Объём работы |
| --- | --- | --- |
| 39 curated examples | Tags/expected outputs/contract expectations | medium |
| Docs pages exist but uneven depth | Inspect-first and repair-oriented sections | medium |
| Some examples use `SET x = APPEND(x, ...)` | Prefer comprehensions or `x += value` | low |
| Comprehension docs/parser mismatch | Reconcile docs, tests, EBNF | medium |
