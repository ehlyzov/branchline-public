---
title: Parallel Blocks
---

# Parallel Blocks

`PARALLEL` groups statements that may run concurrently. Use it when
independent operations can execute at the same time.

```branchline
PARALLEL {
    LET a = fetchA(row);
    LET b = fetchB(row);
}
OUTPUT { a: a, b: b };
```

Each branch inside the block executes in parallel and its results are
available after the block completes. Parallel execution is currently
an experimental feature and may not be supported by all runtimes.

