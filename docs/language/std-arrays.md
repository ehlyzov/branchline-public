---
title: Arrays Standard Library
---

# Arrays

Helpers for working with lists.

### DISTINCT(list)
- **Parameters:** `list` – list of values
- **Returns:** list with duplicates removed
- **Example:** `DISTINCT([1,1,2])` → `[1,2]`

### FLATTEN(listOfLists)
- **Parameters:** `listOfLists` – list whose elements may be lists
- **Returns:** single list with one level of nesting removed
- **Example:** `FLATTEN([[1,2],[3]])` → `[1,2,3]`

### SORT(list)
- **Parameters:** `list` – list of comparable values
- **Returns:** sorted list
- **Example:** `SORT([3,1])` → `[1,3]`

### RANGE(n) / RANGE(start, end[, step])
- **Parameters:** `n` or `start`, `end`, optional `step`
- **Returns:** list of integers
- **Example:** `RANGE(3)` → `[0,1,2]`

### ZIP(a, b)
- **Parameters:** `a`, `b` – lists
- **Returns:** list of `[a[i], b[i]]` pairs
- **Example:** `ZIP([1,2],["a","b"])` → `[[1,"a"],[2,"b"]]`

