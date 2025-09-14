# Multiplatform Migration — Status & Plan

This document tracks the Kotlin Multiplatform (KMP) migration for the Branchline language module, decisions we’ve made, and the next actions to keep functional parity with the JVM baseline.

## Current Decisions

- Big numbers: use an `expect`/`actual` facade for big integers/decimals, but do not make the `expect` classes extend `Number`. On JVM, `actual typealias` maps to `java.math.BigInteger/BigDecimal`; on JS, provide simple value classes backed by `Long`/`Double` for now.
- VM core remains intact. Only minimal adjustments were made to numeric helpers so that `BLBigInt`/`BLBigDec` are treated as numeric values in common code without depending on `Number`.
- Keep file I/O (bytecode dump) JVM-only for now; common formatting stays pure.
- No reflection in hot paths; opcode-based dispatch stays as-is and is KMP-friendly.

# What will break (and how to fix)

1. Big numbers

* **Problem:** `java.math.BigInteger/BigDecimal` are JVM-only and cannot be referenced from `commonMain`. Also, `expect … : Number` cannot be satisfied by `actual typealias` on JVM.
* **Fix (adopted Option A):**

    * Define `expect class BLBigInt` / `BLBigDec` in `commonMain` without extending `Number`.
    * JVM `actual` remain `typealias` to `java.math` types for zero-overhead interop and unchanged test surface.
    * JS `actual` are thin value holders (currently `Long`/`Double`-backed) with consistent operators.
    * In VM numeric helpers, treat `BLBigInt`/`BLBigDec` as numeric via `isBigInt/isBigDec` checks, avoiding assumptions that they are `Number` on all targets. Keep fast paths for primitives.

2. File I/O in the dumper

* **Problem:** `BytecodeDumper.dumpToFile(..)` uses `java.nio.file.*`.
* **Fix:** split I/O into a tiny platform layer:

    * `expect fun writeText(path:String, text:String)` with `actual` per target (JVM NIO, JS `Blob`/download or `fs` in Node, Native `fopen`/`fprintf` or okio).
    * Keep `format()` pure in common.

3. Reflection in the hot loop / tracing

* **Problem:** `instruction::class.simpleName` and enum lookup in the VM loop; Kotlin/JS has limited reflection and this costs even when tracing is off.
* **Fix:** give every `Instruction` a numeric opcode id (or sealed-class `val id:Int`) known at compile time. Use that for counters/tracing. Make the string names only in debug builds.

4. Host/platform types sprinkled in code

* **Problem:** imports like `java.util.*` (some types are common, but guard usage), `ArrayDeque` is fine (stdlib), but prefer `kotlin.collections` versions.
* **Fix:** audit imports; replace JVM-specific utilities with stdlib/common ones. Avoid `System.*` calls; use `TimeSource` or expect/actual if needed.

5. Lambda execution model

* **Current:** calling a lambda spins a nested VM (`lambdaVm.execute(...)`). It works on all targets, but it’s allocation-heavy and complicates snapshots.
* **Upgrade (also helps KMP):** move lambdas into a **function table** with `CLOSURE`/`CALL_CLOSURE` so you reuse the same VM frame machinery across targets. This also avoids any reflection and keeps the core loop simple for JS/Native.

6. JSON/Map implementations

* **Good news:** `MutableMap<String, Any?>`, `ArrayList`, `ArrayDeque`, `LinkedHashMap` exist in common; but JS/Native performance characteristics differ.
* **Tuning:** for hot OUTPUT/OBJECT paths, add a small-map implementation (open addressing up to N=8) in common code; keep insertion-order maps behind an interface if you rely on order.

7. Exceptions & snapshots

* All targets support exceptions, but stack traces and size differ. Keep snapshot format pure JSON/data and avoid serializing platform objects (you already do that). No changes needed, just avoid platform APIs.

# Build layout (Gradle KMP)

* Convert `language` to a **multiplatform module**:

    * `commonMain` → VM, bytecode, compiler, IR, instruction set, tracing API, big-num facade.
    * `jvmMain` → actuals for BigNum, file I/O, maybe faster maps.
    * `jsMain` (IR or Wasm JS) → actuals for BigNum (kotlinx-bignum), file I/O stubs (download string, Node fs).
    * `nativeMain` → actuals for BigNum, file I/O (okio or stdio).
* Keep host-function integrations that call JVM libraries in a **separate JVM-only module** so JS/Native builds don’t see them.

# Performance knobs that especially help JS/Native

* **Inline caches / quickening** for `ACCESS_STATIC/SET_STATIC` → slot access. No platform APIs required; works everywhere and reduces polymorphic map lookups.
* **Small object/array builders** (`MAKE_OBJECT_1/2/4`, `MAKE_ARRAY_0/1/2`) to cut allocations and dispatch.
* **Const-prefix concat** ops (`CONCAT_C1`) to avoid generic string `+` on JS (which is slower).
* **Locals-only by default** (mirror to env only when a binding escapes) to reduce map churn.

# “Will we have problems?” — the punch list

* ✅ After you:

    1. replace BigInt/BigDec with an expect/actual facade,
    2. remove `java.nio.file.*` from common,
    3. remove reflection from the VM loop,
    4. separate JVM-only host integrations,

you can compile for **JS** and **Native**. The rest is performance tuning, not “it won’t compile”.

## Next fixes (test parity)

The following regressions are tracked and will be fixed without structural VM changes. Each change will be proposed before touching core classes:

- Bytecode dump AIOOBE: instrument `BytecodeDumper` to identify any operand offset mismatches (CALL_HOST/OUTPUT variants) and align with `Instruction.buildFromInstructions` encoding.
- Inline call suspend/resume underflow: verify operand stack snapshot/restore around `CALL_FN` suspension points. Ensure argument/key preservation and no double frame push/pop on resume.
- Shared await wiring: confirm `SharedStoreProvider.store` is set and that the stdlib await function is registered for VM execution in tests (JVM-only service/loader or explicit registration).

Once these are resolved, re-run JVM tests and then validate JS compilation of `commonMain` code.
