---
title: Error Handling with TRY/CATCH
---

# Error Handling with TRY/CATCH

Use `TRY` / `CATCH` to handle failures and optionally retry operations.

## Catching failures

```branchline
TRY riskyCall()
CATCH(e) -> { err: e.message };
```

If `riskyCall()` throws, the fallback block produces an error object.

## Retrying

Add `RETRY n TIMES` to re-run the expression before giving up.

```branchline
TRY fetch(row.id)
CATCH(e) RETRY 3 TIMES -> { err: "failed" };
```

The call is attempted three additional times. If all attempts fail, the fallback runs.

