---
title: Debug Standard Library
---

# Debug

Tools for diagnosing programs.

### CHECKPOINT(label)
- **Parameters:** optional `label` string
- **Returns:** `true`
- **Example:** `CHECKPOINT("start")`

### ASSERT(cond[, msg])
- **Parameters:** `cond` – value tested for truthiness, optional `msg` string
- **Returns:** `true` if condition passes, otherwise error
- **Example:** `ASSERT(1 == 1)` → `true`

### EXPLAIN(varName)
- **Parameters:** `varName` – name of variable
- **Returns:** provenance information or `{ "var": name, "info": "no provenance" }`
- **Example:** `EXPLAIN("x")`

