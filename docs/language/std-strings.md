---
title: Strings Standard Library
---

# Strings

Text processing helpers.

### STRING(x)
- **Parameters:** `x` – any value
- **Returns:** string representation or `null`
- **Example:** `STRING(123)` → `"123"`

### NUMBER(x)
- **Parameters:** `x` – string, number, or boolean
- **Returns:** numeric value or `null`
- **Example:** `NUMBER("42")` → `42`

### BOOLEAN(x)
- **Parameters:** `x` – any value
- **Returns:** truthiness as boolean
- **Example:** `BOOLEAN("hi")` → `true`

### SUBSTRING(str, start[, len])
- **Parameters:** `str`, `start` index, optional `len`
- **Returns:** substring
- **Example:** `SUBSTRING("hello", 1, 3)` → `"ell"`

### CONTAINS(str, substr)
- **Parameters:** `str`, `substr`
- **Returns:** `true` if `str` contains `substr`
- **Example:** `CONTAINS("hello", "ell")` → `true`

### MATCH(str, pattern)
- **Parameters:** `str`, `pattern` regex
- **Returns:** list of matches
- **Example:** `MATCH("a1b2", "\\d")` → `["1","2"]`

### REPLACE(str, pattern, repl)
- **Parameters:** `str`, `pattern` regex, `repl` string
- **Returns:** string with matches replaced
- **Example:** `REPLACE("1-2", "-", ":")` → `"1:2"`

### SPLIT(str, sep)
- **Parameters:** `str`, `sep`
- **Returns:** list of substrings
- **Example:** `SPLIT("a,b", ",")` → `["a","b"]`

### JOIN(list, sep)
- **Parameters:** `list` – list of values, `sep` – separator string
- **Returns:** joined string
- **Example:** `JOIN(["a","b"], ",")` → `"a,b"`

### UPPER(str)
- **Parameters:** `str`
- **Returns:** uppercase string
- **Example:** `UPPER("a")` → `"A"`

### LOWER(str)
- **Parameters:** `str`
- **Returns:** lowercase string
- **Example:** `LOWER("A")` → `"a"`

### TRIM(str)
- **Parameters:** `str`
- **Returns:** string without leading/trailing whitespace
- **Example:** `TRIM(" a ")` → `"a"`

