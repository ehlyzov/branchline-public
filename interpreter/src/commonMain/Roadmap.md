Branchline KMP Migration — Core Execution Layer

Scope: Minimal, warning-free KMP fixes in commonMain for Exec, Eval, VM, and supporting bignum/number utilities. Prefer moving platform specifics into Numbers/bignum to keep core code unchanged.

Plan

- BigNum expect/actuals
  - Add expect functions for BLBigInt:
    - signum(): Int
    - toInt(): Int
    - toLong(): Long
    - bitLength(): Int
  - Add expect conversions:
    - BLBigInt.toBLBigDec(): BLBigDec
    - BLBigDec.toBLBigInt(): BLBigInt
  - Use operator actuals on both targets to implement +, -, *, /, % and comparison consistently.

- Exec.kt (v2/ir)
  - Replace accidental java.math usage with KMP facade:
    - use blBigIntOfLong(Int.MAX_VALUE.toLong()) instead of java.math.*
  - Rely on new BLBigInt extensions for signum()/toInt().
  - Drop nested/file-private typealias; use explicit MutableMap<String, Any?> to avoid -Xnested-type-aliases.
  - Convert dynamic key/index checks to use platform-aware isBigInt()/isBigDec() from v2.runtime.

- Eval.kt (v2/ir)
  - Remove MathContext and java.math-specific APIs.
  - Use BLBigDec operators (+, -, *, /, %) instead of divide/remainder with context.
  - Replace BLBigInt/BLBigDec valueOf/constructors with blBigIntOfLong, blBigDecOfLong/Double/parse.
  - Use BLBigInt extensions: signum(), bitLength(), toInt(), toLong().
  - Switch numeric type checks to isBigInt()/isBigDec() to be KMP-safe.
  - Add expect/actual bridge for blocking await of SharedStore:
    - common: expect fun blockingAwait(...)
    - jvm: runBlocking { await(..) }, js: UnsupportedOperationException (compiles, not supported at runtime).

- VM.kt (v2/vm)
  - Replace Integer.highestOneBit/System.arraycopy with Kotlin equivalents (copyOf, simple growth policy).
  - Replace BLBigInt/BLBigDec JVM constructors with KMP facade functions and extensions.
  - Remove unused import v2.runtime.bignum.div to avoid warnings.
  - Use BLBigInt.signum()/toInt()/toLong() and blBigIntOfLong where needed.
  - Replace String.format with padStart to keep commonMain portable.
  - Use ::class.simpleName instead of javaClass.simpleName.

- Compiler.kt (v2/vm)
  - No changes needed; already KMP-safe.

- Numbers/bignum
  - Implement actuals for the new expect functions on JVM (BigInteger/BigDecimal) and JS (Long/Double-backed). Keep conversions conservative (BigInt <-> BigDec via Long/Double where needed) to minimize risk.
  - Add toPlainString() for BLBigDec and reuse in serialization.

- Registries/Bridges
  - Provide JS actual for TransformRegistry (stub) to satisfy expect and allow JS compilation of common code paths.
  - Consider adding JS implementation later when transform runtime is available.

- Tracing
  - Align parameter naming in CollectingTracer.on to match Tracer.on(event: TraceEvent) to avoid named-argument warnings.

Validation

- Build language module for JVM/JS: :language:compileKotlinJvm and :language:compileKotlinJs
- Iterate on remaining warnings; avoid wildcard imports and local functions.
 - Optionally add '-Xexpect-actual-classes' to JS target too to suppress expect/actual Beta warnings.
