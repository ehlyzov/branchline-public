---
title: Array Comprehensions
---

# Array Comprehensions

Array comprehensions build a new array from an existing collection in a single expression.

## When to use it
Use a comprehension when you only need a simple mapping or filtering expression and want a concise result.

## Syntax
```branchline
LET squares = [n * n FOR EACH n IN input.numbers]
LET evens = [n FOR EACH n IN input.numbers WHERE n % 2 == 0]
```

## Example
```branchline
TRANSFORM Tags {
    LET tags = [item.tag FOR EACH item IN input.items]
    OUTPUT { tags: tags }
}
```

## Pitfalls
- Comprehensions allow only a single result expression before `FOR EACH`.
- Use `FOR EACH` if you need multiple statements or side effects.

## Try it
Open [collection-transforms](../playground.md?example=collection-transforms){ target="_blank" } to see comprehensions alongside MAP/FILTER/REDUCE.

## Related
- [FOR EACH Loops](for-each.md)
- [Expressions](../language/expressions.md#arrays-and-objects)
