---
status: Proposed
depends_on: ['product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added scenario for canonical Branchline authoring loop and inspect-first normalization."
---
# 01 — Канонический цикл авторства Branchline

- **Persona:** developer, ai-agent.
- **Статус:** current.
- **UI:** [playground app](../../../../playground/src/playground.tsx), [playground examples](../../../../playground/examples).
- **Backend:** [BranchlineFacade](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt), [CLI inspect](../../../../cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt).
- **Связанные сценарии:** [02 Мутирующие операции](02-friendly-mutation-operations.md), [03 Inspect-first CLI](03-inspect-first-cli.md), [05 Канонические примеры](05-canonical-docs-and-examples.md).

## Problem

Пользователь может написать корректный Branchline несколькими стилями: `row` или `input`, `FOR` или `FOR EACH`, expression-style `APPEND(list, value)` или accumulator-style `+=`. Для человека это терпимо, но AI-agent и code-review получают лишний шум: одно и то же намерение выглядит по-разному. Текущий `development/ai/ai-friendly-dsl.md` уже начал Normalization MVP, но документ не доведён до дорожной карты, где понятно, какие правила канонизации закрывают DX, а какие остаются legacy-compatible. Главная боль: автор не знает, какой стиль считается правильным, пока не прочитает несколько разрозненных страниц и примеров.

## Goal

Дать один inspect-first цикл: автор пишет программу, запускает нормализацию, получает канонический Branchline и список совместимости с AI subset. Целевой результат: 80% новых docs/playground examples используют canonical subset без ручной стилистической правки.

## Non-goals

- Не запрещать legacy-синтаксис на входе.
- Не менять семантику существующих программ.
- Не требовать полной comment-preserving pretty-print нормализации в MVP.
- Не переносить orchestration/SHARED/GRAPH в AI subset.
- Не превращать Branchline в general-purpose язык.

## User flow

### Основной сценарий

1. Developer открывает существующий пример из [playground/examples](../../../../playground/examples).
2. Developer запускает `./gradlew :cli:jvmTest` или локальный `bl inspect --contracts --normalized program.bl`.
3. CLI вызывает [BranchlineFacade.inspect](../../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt).
4. Facade возвращает `subsetCompatibility`, `featureUsage`, contracts и `normalizedSource`.
5. Developer заменяет пример на normalized source, если он совместим.
6. AI-agent использует normalized source как последующий prompt/context, а не исходный шумный текст.
7. Reviewer проверяет только семантические изменения, потому что стиль стабилен.

### Альтернативные сценарии

- A1: AI-agent получает только JSON output `--contracts-json --normalized` и читает `normalizedSource` из payload.
- A2: Программа несовместима с AI subset; пользователь оставляет исходный код, но получает явные blockers.
- A3: Renderer не поддерживает отдельный AST node; `normalization_unsupported_node` становится warning без падения inspect.

### Ошибочные сценарии

- E1: Parse error возвращает `parse_error` со span; AI-agent правит конкретное место.
- E2: Semantic error возвращает `semantic_error`; пользователь не получает ложный normalized source.
- E3: Unsupported orchestration feature возвращает `unsupported_in_ai_subset`, чтобы агент не пытался чинить валидную, но неканоническую программу.

## Functional requirements

FR1. Система должна документировать canonical subset как authoring target, отдельно от legacy accepted syntax.
FR2. `BranchlineFacade.inspect` должен возвращать `normalizedSource` только при совместимости с AI subset и успешной нормализации.
FR3. CLI должен иметь stable machine-readable путь для `--contracts-json --normalized`.
FR4. Feature usage должен показывать constructs, влияющие на canonical review.
FR5. Docs должны включать anti-pattern → canonical-pattern пары для частых случаев.

## Non-functional requirements

NFR1. (G1) После M3 не менее 80% новых docs/playground examples должны проходить AI canonical subset check или иметь явную метку legacy/non-AI-subset.
NFR2. (G2) JSON envelope inspect не должен менять существующие поля без migration note.
NFR3. JVM/JS поведение inspect должно оставаться совместимым для common facade.
NFR4. Diagnostics должны иметь стабильные `code` и source spans.
NFR5. Нормализация программ до 200 строк должна укладываться в тот же narrow verification budget, что contract inspect.

## Architecture constraints

AC1. Канонизация живёт над AST и не меняет parser/runtime semantics.
AC2. CLI не дублирует inspect logic, а вызывает common `BranchlineFacade`.
AC3. Новые canonical rules требуют conformance/golden tests и обновления grammar/docs/playground examples.
AC4. AI subset blockers не должны ломать обычный execution path.

## Acceptance criteria

AC-1. Документ `development/ai/ai-friendly-dsl.md` содержит явный roadmap M1-M5 с приоритетами DX и gate на >= 80% новых canonical examples после M3.
AC-2. Есть плановая задача на golden normalization corpus: минимум 20 эквивалентных входов → канонический output.
AC-3. Есть плановая задача на JSON inspect envelope contract с compatibility/deprecation policy.
AC-4. В docs/playground плане есть anti-pattern → canonical-pattern минимум для `row`, semicolons, `FOR`, `APPEND`.

## Test plan

- **Unit:**
  - `AstRenderer` golden tests для canonical formatting.
  - `BranchlineFacade.inspect` tests для `normalizedSource` и diagnostics.
- **Integration:**
  - `./gradlew :cli:jvmTest :cli:jsNodeTest`.
- **E2E:**
  - Playground examples JVM/JS tests после обновления catalog.
- **Migration / rollback:**
  - N/A — сценарий добавляет canonical tooling policy без изменения runtime semantics.

## Дополнительные сценарии и связь с продуктом

Этот сценарий является входной точкой для всей DX-программы. Он связывает пользовательскую цель «написать Branchline без угадывания стиля» с техническими возможностями facade, CLI и playground. После него пользователь естественно попадает в [03 Inspect-first CLI](03-inspect-first-cli.md), если работает из терминала, или в [05 Канонические примеры](05-canonical-docs-and-examples.md), если учится через документацию. Сценарий [02 Мутирующие операции](02-friendly-mutation-operations.md) дополняет его, потому что именно append/update patterns сильнее всего ломают ощущение естественного языка.
