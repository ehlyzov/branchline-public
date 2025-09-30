---
title: Core Standard Library
---

# Core

Utilities for working with objects and arrays.

### KEYS(coll)
- **Parameters:** `coll` – list or object
- **Returns:** list of keys or indices
- **Example:** `KEYS({"a":1})` → `["a"]`

### VALUES(obj)
- **Parameters:** `obj` – object
- **Returns:** list of values
- **Example:** `VALUES({"a":1})` → `[1]`

### ENTRIES(obj)
- **Parameters:** `obj` – object
- **Returns:** list of `{ "key": k, "value": v }`
- **Example:** `ENTRIES({"a":1})` → `[{"key":"a","value":1}]`

### PUT(coll, key, value)
- **Parameters:** `coll` – object or list, `key` – index or key, `value` – value to set
- **Returns:** new collection with the value added or replaced
- **Example:** `PUT([1,2], 2, 9)` → `[1,2,9]`

### DELETE(coll, key)
- **Parameters:** `coll` – object or list, `key` – index or key to remove
- **Returns:** collection without the given entry
- **Example:** `DELETE({"a":1}, "a")` → `{}`

### WALK(tree)
- **Parameters:** `tree` – nested object or list
- **Returns:** sequence of entries describing each node
- **Example:** `COLLECT(WALK({"a":1}))` → `[{"path":["a"],"key":"a","value":1,"depth":1,"isLeaf":true}]`

### APPEND(list, value)
- **Parameters:** `list` – list, `value` – value to append
- **Returns:** new list with value added to end
- **Example:** `APPEND([1],2)` → `[1,2]`

### PREPEND(list, value)
- **Parameters:** `list` – list, `value` – value to prepend
- **Returns:** new list with value added to start
- **Example:** `PREPEND([1],2)` → `[2,1]`

### COLLECT(iterable)
- **Parameters:** `iterable` – iterable or sequence
- **Returns:** list containing all elements
- **Example:** `COLLECT(WALK([1]))` → `[{"path":[0],"key":0,"value":1,"depth":1,"isLeaf":true}]`

### PRINT(...args)
- **Parameters:** any number of values
- **Returns:** `null`
- **Example:** `PRINT("hi")` outputs `hi`

### IS_OBJECT(x)
- **Parameters:** `x` – value to test
- **Returns:** `true` if `x` is an object, else `false`
- **Example:** `IS_OBJECT({})` → `true`

