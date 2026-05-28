---
status: Proposed
depends_on: ['ai/ai-friendly-dsl']
blocks: ['planning/branchline-dx-implementation-plan', 'planning/branchline-dx-hardening-plan']
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Added product overview for Branchline DX, AI-friendly DSL completion, friendly mutation operations, canonical docs/examples, diagnostics, playground workbench, and DX gates."
---
# Branchline DX и AI-friendly DSL — продуктовый обзор

## Назначение документа

Документ фиксирует продуктовую программу развития Branchline как языка для людей и AI-agent authoring. Он описывает сценарии, которые завершают и расширяют `development/ai/ai-friendly-dsl.md`, отдельно выделяя дружелюбные мутирующие операции как ближайший DX-прирост.

Документ не заменяет архитектурный канон [SERVICE_MAP](../../service/SERVICE_MAP.md), verification contract [VERIFY](../../service/VERIFY.md) и профильные language proposals. Плановые изменения должны сначала проходить через `development/`, а public docs/generated assets обновляются только после принятия соответствующих задач.

## Vision

Branchline должен стать языком трансформаций, который одинаково удобно писать человеку, генерировать AI-agent-у и проверять CI.

Для этого язык должен иметь один canonical authoring style, inspect-first machine interface, repair-oriented diagnostics и corpus примеров, который не распространяет устаревшие паттерны. Самый быстрый прирост DX даст двухслойная политика мутаций: comprehensions для collection shaping, `+=` для локальных accumulators, `SET` для замены, pure `APPEND` как expression tool.

## Аудитория и персоны

| Персона | Кто это | Что хочет от продукта | Уровень покрытия |
| --- | --- | --- | --- |
| **developer** | Разработчик, пишущий `.bl` трансформации, docs и examples | Быстро понять правильный стиль, проверить программу, не ловить расхождения JVM/JS/docs | Частичное -> growth |
| **ai-agent** | LLM/agent, генерирующий и чинящий Branchline | Stable JSON inspect, canonical subset, diagnostics codes/spans, retrieval-friendly examples | Частичное -> growth |
| **qa** | Инженер качества и reviewer language changes | Predictable gates, examples expectations, parity checks, docs sync | Частичное -> growth |
| **Future: integrator** | Команда, встраивающая Branchline в pipelines/tools | Public machine API без зависимости от interpreter internals | Backlog после stabilization |

## Сводные проблемы

| # | Боль | Источник в коде/доке | Закрывается сценарием |
| --- | --- | --- | --- |
| P1 | Один intent выражается разными стилями, поэтому review и AI generation шумят | [AI proposal](../../ai/ai-friendly-dsl.md), [AstRenderer](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/normalize/AstRenderer.kt) | [01](scenarios/01-canonical-authoring-loop.md) |
| P2 | `SET x = APPEND(x, ...)` выглядит искусственно для накопления в цикле | [contract-empty-array example](../../../playground/examples/contract-empty-array-append.json), [junit example](../../../playground/examples/junit-badge-summary.json) | [02](scenarios/02-friendly-mutation-operations.md) |
| P3 | CLI JSON inspect пока contract-centric и не оформлен как полный machine envelope | [CLI inspect](../../../cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt), [BranchlineFacade](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt) | [03](scenarios/03-inspect-first-cli.md) |
| P4 | Diagnostics недостаточно repair-oriented для автоматического цикла правки | [BranchlineFacade diagnostics](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt), [Exec mutation errors](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt) | [04](scenarios/04-repair-oriented-diagnostics.md) |
| P5 | Public docs и examples не полностью закрепляют canonical style и expected behavior | [docs/language](../../../docs/language), [playground examples](../../../playground/examples) | [05](scenarios/05-canonical-docs-and-examples.md) |
| P6 | Example descriptors слабы для retrieval и regression expectations | [playground examples](../../../playground/examples) | [06](scenarios/06-example-metadata-and-retrieval.md) |
| P7 | Playground не показывает normalized source, blockers и diagnostics как workbench | [playground app](../../../playground/src/playground.tsx), [PlaygroundFacade](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundFacade.kt) | [07](scenarios/07-playground-ai-workbench.md) |
| P8 | DX work легко деградирует без surface-specific gates | [VERIFY](../../service/VERIFY.md), [CI workflow](../../../.github/workflows/tests.yml) | [08](scenarios/08-ci-quality-gates.md) |

## Goals

| Цель | Метрика | Целевое значение |
| --- | --- | --- |
| **G1.** Канонический стиль авторства | Доля новых docs/playground examples в canonical subset | >= 80% после M3 |
| **G2.** Stable machine inspect | Backward-compatible JSON envelope changes | 0 breaking changes without migration note per minor release |
| **G3.** Дружелюбные мутации | Снижение token count в loop append examples | >= 15% против `SET x = APPEND(x, ...)` |
| **G4.** Runtime/docs parity | JVM/JS playground/docs example gates | 100% pass before release |
| **G5.** Repair-oriented diagnostics | Top authoring diagnostics with stable code/payload | 20 diagnostics in MVP |
| **G6.** Retrieval-ready corpus | Examples with id/tags/expectations/subset metadata | Top 20 examples migrated |
| **G7.** Интерактивный workbench | Inspect feedback after worker warmup | < 500 ms for 200-line program where local JS allows |
| **G8.** DX quality gate | Narrow local DX verification duration | < 10 minutes excluding dependency download |

## Non-goals

- Не ломать принятые pure-expression конструкции; statement-level append удалён как design-phase синтаксис.
- Не вводить скрытую in-place mutation model.
- Не реализовывать LLM pipeline orchestration до стабилизации transformation DSL.
- Не добавлять cloud/backend service для playground.
- Не делать formal verification или full proof system.
- Не коммитить generated PDF или hand-edited generated docs assets.
- Не заменять `development/service/VERIFY.md` отдельным параллельным источником команд.

## Карта возможностей (Product map)

| Возможность | UI | Ключевые API | Источник |
| --- | --- | --- | --- |
| Inspect + normalized source | CLI, future playground pane | `BranchlineFacade.inspect`, `bl inspect --normalized` | [BranchlineFacade](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt), [BranchlineCli](../../../cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/BranchlineCli.kt) |
| Friendly mutation authoring | Docs, playground examples | `+=`, `SET`, `MODIFY`, pure `APPEND` | [Parser](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/Parser.kt), [Exec](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt), [grammar docs](../../../docs/language/grammar.md) |
| Repair diagnostics | CLI/playground diagnostics panes | `BranchlineDiagnostic`, future structured runtime/contract diagnostics | [BranchlineFacade](../../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/BranchlineFacade.kt), [contract diagnostics v2](../../language/contract-diagnostics-v2.md) |
| Canonical example corpus | Docs/playground | Example JSON descriptors, example tests | [playground/examples](../../../playground/examples), [PlaygroundExamplesJvmTest](../../../conformance-tests/src/jvmTest/kotlin/io/github/ehlyzov/branchline/playground/PlaygroundExamplesJvmTest.kt) |
| DX gates | Gradle/CI | `./gradlew` tasks from verification contract | [VERIFY](../../service/VERIFY.md), [.github workflows](../../../.github/workflows/tests.yml) |

## Roadmap / growth bets

1. **M3 completion: Canonical authoring + mutation policy.** Finish `development/ai/ai-friendly-dsl.md`, document AI canonical subset, rewrite docs/examples around comprehensions/`+=` and inspect-first CLI.
2. **M4 machine interface hardening.** Promote inspect JSON to stable envelope, add diagnostics taxonomy and snapshot tests.
3. **M5 corpus and gates.** Add example metadata, normalization corpus, diagnostics fixtures, and DX quality matrix.
4. **M6 playground workbench.** Add normalized source, diagnostics, subset blockers, metadata filters and contract diff panes.
5. **Backlog: broader facade.** Add `parse/analyze/normalize/run/explain` public facade methods only after inspect envelope is stable.

## Метрики успеха

**Top-level:** G1..G8.

**Per-scenario:**

| Сценарий | Ключевая метрика | Целевое |
| --- | --- | --- |
| 01 Канонический цикл | New canonical examples | >= 80% (G1) |
| 02 Дружелюбные мутации | Loop append token reduction | >= 15% (G3) |
| 03 Inspect-first CLI | Breaking JSON envelope changes | 0 without migration note (G2) |
| 04 Repair diagnostics | Structured top diagnostics | 20 in MVP (G5) |
| 05 Docs/examples | JVM/JS example pass rate | 100% (G4) |
| 06 Metadata/retrieval | Migrated examples | Top 20 (G6) |
| 07 Playground workbench | Inspect feedback latency | < 500 ms after warmup (G7) |
| 08 DX gates | Narrow gate duration | < 10 minutes (G8) |

## Глоссарий

- **AI canonical subset** — ограниченная поверхность Branchline, которую AI-agent должен генерировать по умолчанию.
- **Canonical normalization** — преобразование эквивалентных программ к одному стилю без изменения семантики.
- **Inspect-first loop** — workflow, где программа сначала проходит parse/analyze/contracts/compatibility, и только потом исполняется.
- **Friendly mutation** — локальное обновление через `+=`/`SET`, которое выражает intent без self-assignment шума.
- **Pure append** — `APPEND(list, value)` как expression function, оставляемая для expression contexts.
- **Repair-oriented diagnostic** — ошибка с stable code, span/path, expected/actual payload и actionable hint.
- **Example metadata** — поля descriptor-а, которые делают playground examples проверяемыми и пригодными для retrieval.
- **DX gate** — surface-specific verification checklist/command set for syntax, docs, diagnostics, examples and playground changes.

## Индекс сценариев

| # | Название | Persona | Статус | Файл |
| --- | --- | --- | --- | --- |
| 01 | Канонический цикл авторства Branchline | developer, ai-agent | current | [01-canonical-authoring-loop.md](scenarios/01-canonical-authoring-loop.md) |
| 02 | Дружелюбные мутирующие операции | developer, ai-agent | growth | [02-friendly-mutation-operations.md](scenarios/02-friendly-mutation-operations.md) |
| 03 | Inspect-first CLI и машинный JSON | developer, ai-agent, qa | current | [03-inspect-first-cli.md](scenarios/03-inspect-first-cli.md) |
| 04 | Repair-oriented diagnostics | ai-agent, developer, qa | growth | [04-repair-oriented-diagnostics.md](scenarios/04-repair-oriented-diagnostics.md) |
| 05 | Канонические docs и playground examples | developer, ai-agent, qa | growth | [05-canonical-docs-and-examples.md](scenarios/05-canonical-docs-and-examples.md) |
| 06 | Metadata для примеров и retrieval | ai-agent, developer | growth | [06-example-metadata-and-retrieval.md](scenarios/06-example-metadata-and-retrieval.md) |
| 07 | Playground как AI workbench | developer, ai-agent, qa | growth | [07-playground-ai-workbench.md](scenarios/07-playground-ai-workbench.md) |
| 08 | CI quality gates для DX | qa, developer | growth | [08-ci-quality-gates.md](scenarios/08-ci-quality-gates.md) |

## Связанные документы

- [AI-Friendly DSL Initiative](../../ai/ai-friendly-dsl.md)
- [LLM Pipelines](../../ai/llm-pipelines.md)
- [Module Responsibilities](../../architecture/module-responsibilities.md)
- [VM/Interpreter Split](../../architecture/vm-interpreter-split.md)
- [Docs Refresh](../../docs/docs-refresh.md)
- [Service Map](../../service/SERVICE_MAP.md)
- [Verification Contract](../../service/VERIFY.md)
