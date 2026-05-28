---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Reworked friendly mutation operations around the two-layer model and canonical += accumulators."
---
# 02 — Дружелюбные мутирующие операции

- **Persona:** developer, ai-agent.
- **Статус:** growth.
- **UI:** [playground examples](../../../../playground/examples), [Monaco language](../../../../playground/src/branchline-language.ts).
- **Backend:** [Parser](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/Parser.kt), [AST](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/Ast.kt), [IR lowering](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/ToIR.kt), [runtime exec](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
- **Связанные сценарии:** [01 Канонический цикл](01-canonical-authoring-loop.md), [04 Контрактные диагностики](04-repair-oriented-diagnostics.md), [05 Канонические примеры](05-canonical-docs-and-examples.md).

## Problem

Сегодня пользователь видит искусственный self-append стиль `LET x = APPEND(x, value)` или `SET x = APPEND(x, value)` для накопления в цикле. Он корректен как expression pattern, но плохо передает intent «добавь элемент». Нужна двухслойная модель: сначала expression-first построение коллекций через comprehensions/чистые функции, затем явный mutating слой `+=` только для локальных accumulators.

## Goal

Сделать mutation authoring естественным и каноническим: comprehensions становятся первым выбором для collection shaping, `target += value` используется для явных локальных accumulators, а `APPEND(list, value)` остаётся pure expression для expression contexts. Целевой результат после MVP: loop append examples становятся как минимум на 15% короче по token count против `SET x = APPEND(x, ...)` без изменения semantics.

## Non-goals

- Не вводить скрытую in-place mutable object model.
- Не ломать `APPEND(list, value)` как pure stdlib function.
- Не расширять mutation на external shared state без отдельного security design.
- Не вводить auto-init или создание отсутствующих intermediate containers для `+=`.
- Не менять contract inference без тестового покрытия path writes.

## User flow

### Основной сценарий

1. Developer пишет `LET normalized = []`.
2. В `FOR EACH` developer добавляет `normalized += { ... }`.
3. Parser создаёт `PlusAssignVarStmt`, IR lowering переводит в `IRPlusAssignVar`.
4. Runtime обновляет local binding через copy-on-write list semantics.
5. Contract inference видит element shape append и выводит stable array output.
6. Docs показывают этот стиль как canonical для accumulators, а `SET x = APPEND(x, ...)` как tolerated expression-style pattern.
7. Normalizer может переписать безопасные self-append patterns в statement canonical form после отдельного rule gate.

### Альтернативные сценарии

- A1: Для expression-only кода пользователь оставляет `APPEND(input.items, value)`.
- A2: Для nested path пользователь заранее инициализирует `LET result = { items: [] }` и пишет `result.items += value`.
- A3: Для замены значения пользователь использует `SET target.path = expr`, а не `PUT`.

### Ошибочные сценарии

- E1: Target отсутствует; runtime возвращает ошибку `+=` target not found.
- E2: Target не list/number/text-compatible; runtime возвращает typed error, который diagnostics затем стабилизируют.
- E3: Mid-path отсутствует при `SET obj.a.b`; ошибка не должна создавать неожиданные объекты.

## Functional requirements

FR1. Docs должны объявить preferred mutation style: comprehensions для collection shaping, `+=` для локального накопления, `SET` для замены, pure `APPEND` только для expressions.
FR2. Playground examples должны заменить self-append anti-pattern на comprehensions или `+=`.
FR3. AI canonical subset должен явно разрешать local `SET`/`+=` и запрещать shared mutations.
FR4. Normalization plan должен включить safe rewrite rule для `SET x = APPEND(x, v)` -> `x += v` только когда `x` совпадает и нет semantic ambiguity.
FR5. Contract inference tests должны покрывать `+=` для empty array seed и nested path.

## Non-functional requirements

NFR1. (G3) Mutation syntax should reduce generated-token count for loop append examples by at least 15% versus `SET x = APPEND(x, ...)`.
NFR2. (G4) Runtime parity JVM/JS must stay byte-equivalent for existing append tests.
NFR3. Diagnostics for mutation failures must include target kind and path.
NFR4. Docs must avoid presenting two styles as equally preferred.

## Architecture constraints

AC1. Any new syntax must update parser, AST, IR, runtime, VM parity, conformance tests, EBNF, docs, playground keywords, and examples.
AC2. Statement-level append syntax is removed during the design phase; implementation should behave as if it never existed.
AC3. Rewrites are canonicalization-only unless a separate syntax proposal is accepted.
AC4. Copy-on-write local semantics remain observable through existing trace/explain metadata.

## Acceptance criteria

AC-1. `development/ai/ai-friendly-dsl.md` contains a mutation policy and rewrite ladder.
AC-2. `playground/examples/contract-empty-array-append.json` and `junit-badge-summary.json` are listed for canonical rewrite.
AC-3. Implementation plan contains tasks for docs/examples, normalization rewrite, diagnostics, and conformance.
AC-4. No task requires breaking `APPEND(list, value)` compatibility.

## Test plan

- **Unit:**
  - Parser tests for `+=` forms and rejection of statement-level append syntax.
  - Contract inference tests for `+=` output element shape.
- **Integration:**
  - `./gradlew :interpreter:jvmTest :interpreter:jsTest`.
- **E2E:**
  - `./gradlew :conformance-tests:jvmTest :conformance-tests:jsTest`.
- **Migration / rollback:**
  - Roll back docs/playground rewrites independently; runtime syntax remains unchanged in MVP.

## Дополнительные сценарии и связь с продуктом

Этот сценарий должен дать самый быстрый DX-прирост, потому что он убирает наиболее заметный «машинный» паттерн из повседневного кода. Он приходит после [01 Канонический цикл](01-canonical-authoring-loop.md): сначала пользователь узнаёт, что есть canonical style, затем видит конкретное правило для mutation. Он передаёт требования в [04 Контрактные диагностики](04-repair-oriented-diagnostics.md), потому что mutation errors должны быть repair-oriented, и в [05 Канонические примеры](05-canonical-docs-and-examples.md), где стиль закрепляется на реальных задачах.

## Дополнительно: gap analysis vs текущее состояние

| Что есть сегодня | Что нужно для дружелюбных мутаций | Объём работы |
| --- | --- | --- |
| `+=` добавлен в parser/AST/IR/runtime | Довести docs/examples/diagnostics до canonical authoring style | medium |
| Playground содержит `SET x = APPEND(x, ...)` | Переписать примеры и добавить anti-pattern docs | low |
| Diagnostics в runtime в основном human text | Добавить stable mutation diagnostic codes/path payload | high |
| Normalizer рендерит `+=`, но не переписывает self-append | Добавить gated rewrite или явно отложить | medium |
