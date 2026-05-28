---
status: Implemented
depends_on: ['ai/ai-friendly-dsl', 'product/branchline-dx/overview']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-05-05
changelog:
  - date: 2026-05-05
    change: "Started hard-cut replacement of APPEND TO with two-layer mutation syntax: comprehensions for transformation-first collection building and += for explicit accumulators."
  - date: 2026-05-05
    change: "Implemented += through lexer/parser/AST/IR/interpreter/VM, updated static analysis, docs, playground keywords, benchmarks, and conformance tests."
---
# Two-Layer Mutation Syntax

## Decision

Branchline drops statement-level `APPEND TO` as if it never existed. The language is still in design phase, so there is no compatibility/deprecation period.

The replacement is a two-layer authoring model:

1. Prefer expression-level collection building for pure transformations:

   ```branchline
   LET normalized = [
       {
           name: suite.name ?? "unknown",
           tests: NUMBER(suite.tests ?? 0)
       }
       FOR EACH suite IN input.suites
       WHERE suite != NULL
   ]
   ```

2. Use `+=` only for real local accumulators:

   ```branchline
   LET items = []
   LET total = 0

   FOR EACH item IN input.items {
       items += item
       total += NUMBER(item.amount ?? 0)
   }
   ```

## Semantics

- `target += value` is a statement, not an expression.
- `target` may be a local variable or local path.
- If current target value is a list, `+=` appends `value` as one element.
- If current target value is numeric, `+=` adds numeric `value`.
- If either side is string, `+=` follows existing `+` string-concatenation behavior.
- Missing variables fail; declare with `LET` first.
- Missing intermediate path parents fail; Branchline does not auto-create object paths.
- `APPEND(list, value)` remains a pure stdlib function for expression contexts.
- `++` remains list concatenation for expressions.

## Non-goals

- No `INIT` replacement in `+=`.
- No hidden in-place object mutation; runtime still writes persistent updated values back to the local root.
- No auto-creation of missing intermediate containers.
- No compatibility support for `APPEND TO`.

## Required implementation surface

- Lexer: add `+=` token.
- Parser/AST: add `PlusAssign` statement and remove `APPEND TO` statement parsing.
- IR/runtime: replace `IRAppend*` nodes with `IRPlusAssign*` nodes.
- Static analysis/contracts: infer array element shapes for list `+=` and numeric/string shapes for scalar `+=`.
- Normalizer: render `+=`; never emit `APPEND TO`.
- Docs/grammar/playground examples/conformance tests: remove `APPEND TO`, teach two-layer model.
