---
status: Draft
depends_on: []
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-04-29
changelog:
  - date: 2026-04-29
    change: "Initial audit of unoptimized code in the tree-walking interpreter."
  - date: 2026-04-29
    change: "T1.3 confirmed hot via targeted JMH probes (nestedPathSetInLoop, deepNestedSet, nestedAppendTo, stdlibCascadeAppend); baseline saved as perf/jmh/results-20260429-215437-t13-baseline.json."
---
# Interpreter Optimization Audit (April 2026)

## Context

Цель — зафиксировать горячие места и неэффективности в tree-walking интерпретаторе
(`interpreter/`) без правки кода. Аудит дополняет
[interpreter-performance-tasks.md](interpreter-performance-tasks.md) (задачи
Feb 2026) свежим срезом по состоянию ветки `codex/contract-type` на
2026-04-29.

Важный фон (используется при приоритизации):

- VM (`vm/`) — заявленная цель производительности; интерпретатор позиционируется
  как reference impl и fallback. См.
  [development/runtime/runtime-optimizations.md](../runtime/runtime-optimizations.md)
  и `AGENTS.md`.
- Существующие бенчмарки: `interpreter-benchmarks/InterpreterTransformBenchmark`
  (pathExpressions, arrayComprehensions, typicalTransform) и сравнительные
  `jsonata-benchmarks/`. Профилирование в [perf/](../../perf/) указывает на
  `evalExpr`, `handleFuncCall`, HOF stdlib и доступ к свойствам как hotspots.
- Поэтому правки оцениваются по двум осям: (a) выгода для интерпретатора-fallback /
  для конформанс-сценариев, (b) риск регрессии корректности.

Исход — отчёт без изменений кода. Приоритеты предложены, но реализация вне
охвата этой итерации.

---

## Сводная карта интерпретатора

- Точка входа: `Exec.run(env, stringifyKeys)` → `execObject(ir, env, out)`
  ([Exec.kt:145](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt)).
- Ядро eval: `evalExpr(e, env)`
  ([Exec.kt:655](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt))
  — `when` по sealed-иерархии Expr с делегированием в `handleXxx`.
- Среда: `Env` — связный список scope'ов с `LinkedHashMap` для locals
  ([Env.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Env.kt)).
- Stdlib: модули в
  [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/)
  (StdHofModule, StdStringsModule, StdCoreModule, StdArraysModule и др.).
- IR-компиляция:
  [ToIR.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/ToIR.kt)
  (≈70 LOC, однопроходная, без оптимизаций).

---

## Находки (приоритизированно)

Каждая позиция: `[severity] файл:строки — суть`.

### Tier 1 — likely-hot, высокий impact

1. **[H] Лишний `containsKey` в `Env.get` и рекурсивный обход цепочки на каждое чтение**
   — [Env.kt:7-18](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Env.kt).

   ```kotlin
   fun get(name: String): Any? {
       val value = locals[name]
       return if (value != null || locals.containsKey(name)) value else parent?.get(name)
   }
   ```

   Каждое обращение к `IdentifierExpr` делает 1–2 хеш-лукапа на уровне + рекурсию.
   Аналогично `contains` / `resolveScope` / `setExisting` дублируют обход.
   Зеркальный негативный эффект: `setLocal` в горячих циклах (ArrayComp/FOR-EACH)
   пишет в Map по строковому ключу.

2. **[H] Тройное дублирование тела ArrayComp + FOR-EACH с раздельной веткой `where`**
   — [Exec.kt:273-342](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt)
   и FOR-EACH ветви (`Exec.kt:1150-1240`). 8 почти идентичных циклов
   (List/Iterable/Sequence × with/without WHERE). Каждая итерация:
   - пишет переменную итерации через `target.setLocal(e.varName, ...)` (хеш-лукап);
   - повторно `evalExpr(e.where, env)` и `evalExpr(e.mapExpr, env)` (re-walk AST);
   - `ArrayComp` без `WHERE` для не-`Collection<*>` Iterable не имеет capacity hint.

3. **[H] (measured 2026-04-29) `withUpdated` / `withReplaced` — полный copy на каждый SET/APPEND**
   — [Exec.kt:778-795](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
   На каждое обновление по path аллоцируется новый `LinkedHashMap` / `ArrayList`
   и копируются все элементы. Накладные расходы O(n) на операцию; в типичных
   transform'ах это доминирующая аллокация.

   **Измерения** (large dataset, 500 orders × 25 items, baseline:
   [perf/jmh/results-20260429-215437-t13-baseline.json](../../perf/jmh/results-20260429-215437-t13-baseline.json),
   targeted JMH suite в
   [InterpreterTransformBenchmark.kt](../../interpreter-benchmarks/src/jmh/kotlin/io/github/ehlyzov/branchline/benchmarks/InterpreterTransformBenchmark.kt)):

   | benchmark | small | medium | large | scaling |
   |---|---|---|---|---|
   | `pathExpressions` (control, no SET) | 784 B/op | 784 B/op | 784 B/op | flat |
   | `typicalTransform` (scalar SET only) | 800 B/op | 2.3 KB/op | 8.7 KB/op | linear |
   | `nestedPathSetInLoop` (1-level SET in loop) | 4.2 KB/op | 41 KB/op | **205 KB/op** | linear×N orders |
   | `deepNestedSet` (2-level SET in nested loop) | 14 KB/op | 273 KB/op | **3.33 MB/op** | super-linear |
   | `nestedAppendTo` (APPEND TO basket.items in loop) | 3.6 KB/op | 69 KB/op | **1.14 MB/op** | quadratic-shaped |
   | `stdlibCascadeAppend` (REDUCE+APPEND control) | 4.8 KB/op | 76 KB/op | **1.18 MB/op** | quadratic-shaped |

   Все три критерия из
   [plan T1.3](https://example/internal-plan) сработали:
   `gc.alloc.rate.norm` для nested-path SET кейсов на 1-2 порядка выше,
   чем у control'ов; `nestedAppendTo` показывает super-linear allocation
   (per-order alloc растёт 1.9× и 3.3× при 10× и 5× росте датасета).
   Решение об оптимизации — отдельной веткой; опции в
   [zazzy-kindling-raven.md](https://example/internal-plan) Step 4.

4. **[H] `listOf(src[i], i, src)` в FIND/SOME/EVERY/REDUCE — 1 список на итерацию**
   — [StdHofModule.kt:53-83](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdHofModule.kt).
   В MAP/FILTER уже есть переиспользование `callList` — а в FIND/SOME/EVERY/REDUCE
   нет. Лёгкий рефактор, измеримый выигрыш на больших списках.

5. **[H] Regex компилируется на каждом вызове `MATCH` / `REPLACE`**
   — [StdStringsModule.kt:130-144](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdStringsModule.kt).
   `pat.toRegex()` вызывается per-call. Кэш по pattern (LRU/слабый WeakHashMap)
   убирает основную стоимость для повторных паттернов.

### Tier 2 — possibly-hot, средний impact

6. **[M] Конкатенация `++` копирует оба списка целиком**
   — [Exec.kt:592-598](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
   Альтернативы: либо persistent vector (структурное разделение), либо явная
   мутирующая семантика, если язык её допускает.

7. **[M] Линейный скан `variants` на каждом числовом бинопе**
   — [Exec.kt:1390-1410](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
   До 4 элементов это ОК, но при megamorphic операторах сразу падаем в общий путь.
   Можно уплотнить ключ (`leftKind*N+rightKind`) и dispatch'ить через массив
   фиксированного размера.

8. **[M] WHERE-фильтр в FOR-EACH/ArrayComp пере-evalится для каждого элемента**
   — `Exec.kt:292/312/328` и аналогично в FOR-EACH. Если `where` константен
   относительно итерации (нет ссылки на binding-переменную) — можно вычислить
   один раз (оптимизация на уровне ToIR).

9. **[M] Дубликат traced-пути в `handleAccess`** —
   [Exec.kt:427-480](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
   `handleAccess` и `handleAccessTraced` сосуществуют; ветка с трассировкой
   присутствует, даже когда `Debug.tracer == null`. Лёгкий ранний bailout уже
   есть, но дублирующийся код — источник bit-rot.

10. **[M] `stringify` рекурсивно строит новые `LinkedHashMap` / `List` для нормализации ключей**
    — [Exec.kt:717-725](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
    Применяется при `stringifyKeys=true`. Можно сделать lazy view или
    проводить нормализацию однократно при входе.

11. **[M] Сравнение non-numeric операндов через `toString()`**
    — [Exec.kt:584](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
    `l.toString().compareTo(r.toString())` для каждого `<`/`>` на не-числах.
    Если оба `String` — лишняя аллокация/копия; если нет — семантика спорная,
    стоит сузить контракт.

12. **[M] Конкатенация строк бинарным `+` без StringBuilder**
    — [Exec.kt:550-551](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
    Для одиночного `+` это норма; в цепочках `a+b+c+d` создаются промежуточные
    строки. Оптимизация на уровне ToIR (свёртка цепочек).

13. **[M] `ENTRIES`/`KEYS` материализуют через `mapOf` per-entry**
    — [StdCoreModule.kt:32,52](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdCoreModule.kt).
    `mapOf("key" to ..., "value" to ...)` создаёт `LinkedHashMap` на каждую
    запись. Можно использовать единичный shape-mapping или специальный класс.

### Tier 3 — мелочи / cold

14. **[L] Линейный поиск ключа карты в `StdStringsModule:279`** —
    `map.keys.firstOrNull { it?.toString() == key }`. Для редких вызовов норм.

15. **[L] try/catch как ретрай-цикл в TRY/CATCH** —
    [Exec.kt:366-381](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
    Семантически корректно; вред только если ретраи массовые (редкий сценарий).

16. **[L] `Env()` на каждый вызов user-function** —
    [Exec.kt:528](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
    Аллокация + рост parent chain. Pool/перезапись затруднены из-за замыканий.

17. **[L] `bindParams` — линейный set per param** —
    [Exec.kt:642-646](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt).
    Микро; убирается вместе с T1.1 (массив-слотовая Env).

---

## Что НЕ нашлось (положительные знаки)

- Нет `try/catch` для общего потока управления (только `TryCatchExpr`).
- Numeric site уже имеет PIC (4 варианта) — частично оптимизирован.
- `MAP` / `FILTER` уже переиспользуют `callList`.
- `handleArray` уже использует capacity hint.
- ToIR делает однопроходную компиляцию без лишних аллокаций.

---

## Рекомендуемая последовательность (если будете чинить отдельно)

В порядке «ratio выгода/риск»:

1. **Regex-кэш** в `StdStringsModule.MATCH` / `REPLACE` — ~10 строк, нулевой риск.
2. **Переиспользование `callList`** в FIND/SOME/EVERY/REDUCE — копипаст из MAP.
3. **Дедуп ArrayComp/FOR-EACH** через единый helper, параметризованный
   (Iterable, hasWhere, capacity) — снижает bit-rot, не меняет семантику.
4. **Свёртка `where`-инвариантов** (выявить на ToIR, считать один раз).
5. **Слотовая Env с разрешением имён на этапе ToIR** (имя → slotIndex) — крупная
   правка, но даёт устойчивый выигрыш на всех variable-heavy сценариях.
   Конфликтует с динамическими feature'ами (если они есть) — нужна проверка.
6. **Inline cache для access path** (Shape-based) — сложно, ставить только если
   `pathExpressions` бенчмарк показывает потолок.

Пункты 5–6 идеологически совпадают с уже намеченными VM-улучшениями
([development/runtime/runtime-optimizations.md](../runtime/runtime-optimizations.md)),
и тогда логичнее делать их в VM.

---

## Verification (если планка дойдёт до правок)

Этот документ — аудит. Verification относится к следующей итерации, фиксируется
заранее, чтобы не потерять:

- **Корректность**: `./gradlew :interpreter:test` (и `:conformance-tests:test`).
- **Перф regression**: `./gradlew :interpreter-benchmarks:jmh` против baseline в
  [perf/](../../perf/) (особенно `pathExpressions`, `arrayComprehensions`,
  `typicalTransform`).
- **JSONata паритет**: `:jsonata-benchmarks:jmh` для cases, где интерпретатор
  сейчас отстаёт (string-concat, simple-array-selectors, function-count).
- **Allocation profile**: JFR / `-prof gc` — сверять `gc.alloc.rate.norm`
  до/после.

---

## Критичные файлы

- [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Env.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Env.kt)
- [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/Exec.kt)
- [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/ToIR.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/ir/ToIR.kt)
- [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdHofModule.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdHofModule.kt)
- [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdStringsModule.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdStringsModule.kt)
- [interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdCoreModule.kt](../../interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdCoreModule.kt)
