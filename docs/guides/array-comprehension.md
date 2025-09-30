---
title: Array Comprehensions
---

# Array Comprehensions

Array comprehensions build arrays from other collections using a `FOR` clause inside a literal【F:language/src/test/kotlin/v2/ebnf.txt†L122-L124】.

```branchline
LET nums = [1, 2, 3];
LET squares = [FOR (n IN nums) => n * n];
```

An optional `IF` clause filters elements before they are added:

```branchline
LET nums = [1, 2, 3, 4];
LET evens = [FOR (n IN nums) IF n % 2 == 0 => n];
```

Comprehensions can also trail the element expression with a `FOR EACH` clause.
This form is useful when the produced value is an object:

```branchline
TBD
```

The object literal runs once for every `t` in `trs`, yielding an array of
transformer descriptors.

