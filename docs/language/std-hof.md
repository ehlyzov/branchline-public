---
title: Higher-Order Functions Standard Library
---

# Higher-Order Functions

Functional helpers that take other functions as arguments.

### MAP(list, fn)
- **Parameters:** `list` – list of values, `fn` – function `(value, index, list)`
- **Returns:** new list with `fn` applied to each element
- **Example:** `MAP([1,2], FN(v,_,_ -> v * 2))` → `[2,4]`

### FILTER(list, fn)
- **Parameters:** `list`, `fn` – function returning truthy to keep
- **Returns:** list of values where `fn` returns truthy
- **Example:** `FILTER([1,2], FN(v,_,_ -> v > 1))` → `[2]`

### REDUCE(list, init, fn)
- **Parameters:** `list`, `init` – initial value, `fn` – `(acc, value, index, list)`
- **Returns:** accumulated result
- **Example:** `REDUCE([1,2,3], 0, FN(acc,v,_,_ -> acc + v))` → `6`

### SOME(list, fn)
- **Parameters:** `list`, `fn`
- **Returns:** `true` if any element makes `fn` truthy
- **Example:** `SOME([1,2], FN(v,_,_ -> v == 2))` → `true`

### EVERY(list, fn)
- **Parameters:** `list`, `fn`
- **Returns:** `true` if all elements make `fn` truthy
- **Example:** `EVERY([1,2], FN(v,_,_ -> v > 0))` → `true`

### FIND(list, fn)
- **Parameters:** `list`, `fn`
- **Returns:** first value where `fn` is truthy or `null`
- **Example:** `FIND([1,2], FN(v,_,_ -> v == 2))` → `2`

### APPLY(fn, ...args)
- **Parameters:** `fn` – function, additional arguments
- **Returns:** result of calling `fn` with arguments
- **Example:** `APPLY(FN(x -> x + 1), 2)` → `3`

### IS_FUNCTION(x)
- **Parameters:** `x` – value to test
- **Returns:** `true` if `x` is a function
- **Example:** `IS_FUNCTION(FN(x->x))` → `true`

