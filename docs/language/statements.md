---
title: Statements
---

# Statements

Statements control execution and side effects within blocks.

## Quick patterns
- Use `LET` for new bindings and `SET` for mutation.
- Guard code with `IF` and `TRY/CATCH`.
- `FOR EACH` iterates collections; comprehensions provide shorthand for arrays.
- `OUTPUT { ... }` shapes final payloads.

## Output {#output}
`OUTPUT` specifies how results are emitted from the pipeline.

```branchline
OUTPUT { id: input.id, total: input.total };
```

## Using {#using}
`USING` references adapters and external modules.

## Transform {#transform}
`TRANSFORM` defines transformation steps. Use `OPTIONS { ... }` after the signature to declare per-transform settings.

## For loops {#for}
`FOR` and `FOR EACH` iterate over collections.

```branchline
FOR EACH item IN input.items WHERE item.qty > 0 {
    OUTPUT { name: item.name, qty: item.qty };
}
```

## If statements {#if}
`IF` provides conditional branching.

```branchline
IF input.enabled {
    OUTPUT { status: "enabled" };
} ELSE {
    OUTPUT { status: "disabled" };
}
```

## Enumerations {#enum}
`ENUM` defines enumerated types inside `TYPE` declarations.

## For each shorthand {#foreach}
`FOREACH` is a shorthand loop form.

## Input {#input}
`INPUT` references the pipeline input data.

## Abort {#abort}
`ABORT` terminates execution immediately.

## Throw {#throw}
`THROW` raises an error.

## Try/Catch {#try}
`TRY` handles errors and exceptions.

```branchline
TRY {
    OUTPUT { value: input.value };
} CATCH {
    OUTPUT { value: null };
}
```

## Call {#call}
`CALL` invokes host-provided functions.

```branchline
CALL inventoryService(input) -> payload;
```

## Shared {#shared}
`SHARED` declares shared memory resources.

```branchline
SHARED session MANY;
```

## Functions {#func}
`FUNC` declares reusable functions.

## Types {#type}
`TYPE` declares custom types.

## Return {#return}
`RETURN` exits from functions.

## Modify {#modify}
`MODIFY` changes existing values.

## Where {#where}
`WHERE` filters loop iterations and comprehensions.

## Set And Plus Assign {#set}
`SET` replaces an existing variable or path value. `+=` updates an explicit local accumulator: it appends one item when the current value is a list, adds numeric values when both sides are numeric, and follows `+` string concatenation when either side is text.

`+=` does not create missing variables or intermediate containers. Initialize accumulators with `LET` before updating them.

| Intent | Preferred statement style |
| --- | --- |
| Replace a local variable | `SET name = value` |
| Replace an existing path | `SET object.path = value` |
| Append to an accumulator list | `items += item` |
| Append to a nested accumulator list | `state.items += item` |
| Build a new list expression | `LET next = APPEND(items, item)` |

`SET x = APPEND(x, value)` is tolerated when written manually, but it is not the preferred accumulator style. Use `x += value` for explicit accumulation and keep `APPEND(list, value)` for expression contexts.

## Related
- [Expressions](expressions.md)
- [Declarations](declarations.md)
- [FOR EACH Loops](../guides/for-each.md)
