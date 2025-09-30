---
title: Getting Started
---

# Getting Started

This short guide walks through writing and running a minimal Branchline transform.

## Write your first transform

Create a file `hello.bl` with the following contents:

```branchline
SOURCE row;
TRANSFORM Hello { stream } {
    LET greet = "Hello, " + row.name;
    OUTPUT { greeting: greet };
}
```

The transform reads a `row` record, builds a new field, and emits it with `OUTPUT`.

## Run the transform

You can execute Branchline from Kotlin using the test utility `compileAndRun`:

```kotlin
val result = compileAndRun(
    body = """
        LET greet = \"Hello, \" + row.name;
        OUTPUT { greeting: greet };
    """.trimIndent(),
    row = mapOf("name" to "Branchline")
)
println(result) // {greeting=Hello, Branchline}
```

The helper compiles the snippet and runs it against the provided input map.

