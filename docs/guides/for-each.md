---
title: FOR EACH Loops
---

# FOR EACH Loops

`FOR EACH` iterates over array-like values and executes a block for every item.

## Basic loop

```branchline
FOR EACH item IN row.items {
    OUTPUT { name: item.name };
}
```

The loop reads `row.items` and outputs each element's `name` field.

## Filtering items

An optional `WHERE` clause keeps only matching elements.

```branchline
FOR EACH item IN row.items WHERE item.qty > 1 {
    OUTPUT { name: item.name, qty: item.qty };
}
```

Only items with quantity greater than 1 reach the body.

