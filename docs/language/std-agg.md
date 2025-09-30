---
title: Aggregation Standard Library
---

# Aggregation

Functions for computing statistics over collections.

### LENGTH(x) / COUNT(x)
- **Parameters:** `x` – string, list, object, or `null`
- **Returns:** number of elements (`0` for `null`)
- **Example:** `LENGTH([1,2,3])` → `3`

### SUM(list)
- **Parameters:** `list` – list of numbers
- **Returns:** sum as decimal
- **Example:** `SUM([1,2,3])` → `6`

### AVG(list)
- **Parameters:** `list` – list of numbers
- **Returns:** average or `null` when empty
- **Example:** `AVG([1,2,3])` → `2`

### MIN(list)
- **Parameters:** `list` – list of comparable values
- **Returns:** smallest value or `null` when empty
- **Example:** `MIN([3,1,4])` → `1`

### MAX(list)
- **Parameters:** `list` – list of comparable values
- **Returns:** largest value or `null` when empty
- **Example:** `MAX([3,1,4])` → `4`

