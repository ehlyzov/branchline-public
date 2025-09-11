Branchline is a home‑grown transformation DSL that currently uses an interpreter and a relatively dynamic runtime (variables are stored both in a map and in local slots, lambdas are stored in the constants section and executed on a fresh “lambdaVM”, etc.).  Your goal is to take one abstract data type (ADT) – typically a nested JSON/RDF structure – and produce another as fast as possible, while retaining the ability to trace the execution when needed.  The most valuable changes and design features are summarised below.

### 1. Most‑wanted structural changes

1. **Move lambdas into a function table and call them directly.**
   Today, a `callLambda` instruction creates a new `lambdaVm` and copies arguments and locals into a new environment overlay.  This adds significant overhead and complicates snapshotting/tracing.  Introduce a **function table** where each function has a `codeOffset`, `codeLength`, arity and up‑value descriptors.  Emit `CLOSURE fnIndex, k` and `CALL fnIndex`/`CALL_CLOSURE` instructions instead of storing lambdas in the constants pool.  Calls then reuse the same VM frame structure and no new VM is created.  This change alone drops the per‑call overhead and enables inlining and tail‑call optimisation.

2. **Use locals by default and mirror to the global environment only when necessary.**
   The current compiler emits `DUP; STORE_VAR; STORE_LOCAL` on every `let` binding to keep an environment mirror “for compatibility”.  Most bindings do not escape and are only needed locally.  Perform a simple escape analysis: only mirror variables to the environment map if they are captured by a closure or read by the interpreter/host.  Otherwise, store them exclusively in the local frame.  If both locations are needed, add a single `STORE_BOTH` instruction that consumes the top of the stack once.

3. **Eliminate reflection and string‑based tracing in the VM loop.**
   The current tracer uses `instruction::class.simpleName` for each instruction, which implies reflection and string creation even when tracing is off.  Assign a numeric opcode ID to each instruction and use it for counting; build human‑readable names only when tracing is enabled.  Guard all tracing logic behind one flag check at the start of execution.

4. **Introduce specialised builders and concatenation ops.**
   Many of the emitted bytecode sequences repeatedly push keys/values and call a generic `MAKE_OBJECT` or build strings with `PUSH const; LOAD_VAR; ADD`.  Add `MAKE_OBJECT_1/2/4` and `MAKE_ARRAY_0/1/2` for small literals, and pre‑compute fully static object fragments as constants.  Introduce `CONCAT_C1 constIdx` to append a constant prefix (like `"astu:"`) to the top of the stack without using generic `ADD`.  Such super‑instructions dramatically reduce dispatch overhead.

5. **Add inline caches and quickening for property access and host calls.**
   `ACCESS_STATIC` currently does a dynamic lookup every time.  Add an inline cache to remember the slot offset on the first access and quicken to `ACCESS_SLOT offset`.  Likewise for `SET_STATIC` and frequent host calls (`LOOKUP_OR_ERROR`, `DATE_ONLY`, etc.).  These caches eliminate repeated map lookups when objects have stable shapes.

6. **Restructure bytecode into well‑defined sections.**
   Separate the bytecode into a header, string/symbol pools, a constant pool, the new function table and a contiguous code segment.  Use varint encoding for small immediates and relative jumps.  A per‑function debug/exception table keeps the code compact and makes snapshotting easier.

### 2. Essential features currently missing or incomplete

* **Direct function call opcodes and closures** (see above) – essential for performance and traceability, absent now because lambdas are executed in a separate VM.
* **Inlined object/array builders and string concatenation** – the compiler only emits generic `MAKE_OBJECT` and `ADD` sequences.
* **Inline caches/quickening** for property access and host call dispatch.
* **Simple escape analysis** to avoid mirroring all variables in the global environment.
* **Numeric opcode IDs and low‑overhead tracing** – reflection in the hot loop is expensive.
* **Small‑map implementations** (open addressing up to \~8 entries) and pre‑sized arrays for frequently constructed objects and lists.  The current runtime uses `LinkedHashMap` for every object.
* **Tagged value representation** for numbers: unify `Int`, `Long` and `BigDecimal/BigInteger` into a tagged `ValueNumber` type to avoid repeated type checking.

### 3. Data structures and off‑heap memory

* **Faster data structures:**  yes – adopt small open‑addressed maps for tiny objects and pre‑sized array buffers for lists.  Keep locals in a primitive array and embed shape IDs on objects to enable slot‑based access.  These changes produce the bulk of the gains without resorting to off‑heap allocations.
* **Off‑heap memory:**  not immediately necessary.  Off‑heap (e.g. `ByteBuffer` or `Unsafe` allocations) can reduce GC pressure for huge, long‑lived data structures but introduces complexity (manual lifecycle management, slower host‑interaction) and offers little benefit for the small, short‑lived objects Branchline typically constructs.  Focus first on reducing allocation counts and map lookups.

### 4. Comparable DSLs and their performance

* **jq:** A C‑based JSON transformation tool that streams input and runs natively; it generally outperforms JVM interpreters.  It is a functional language with filter pipelining and is widely used in data science and DevOps.
* **JSLT:** A Java‑based JSON transformation DSL inspired by jq, XPath and XQuery.  It offers a static type system and compiles expressions to Java bytecode; anecdotal reports suggest it performs several times faster than the pure Java port of jq.
* **JSONata / JMESPath / Jolt:** These are transformation languages with different syntaxes.  JSONata runs on Node.js/JavaScript and is well‑suited for web integration, but lacks streaming.  JMESPath is a query language used in AWS tools.  Jolt is a Java library focused on simple, declarative JSON‑to‑JSON transformations.
* **XSLT 3.0:** For XML, XSLT remains widely used; some implementations (e.g. Saxon) are highly optimised but the language is often considered verbose and its performance is sensitive to template complexity.

No direct competitor matches Branchline’s semantics (especially its RDF‑friendly constructs), but tools like jq or JSLT show that a compiled or C‑level implementation can be extremely fast.  With the structural improvements above – particularly moving functions into a function table, adding inline caches, and specialised builders – Branchline should achieve comparable performance while maintaining on‑demand traceability.

### 5. Summary

To make Branchline a fast, traceable transformation engine:

* Flatten lambdas into a function table and call them directly, removing nested VMs.
* Mirror only the variables that escape; use locals for everything else.
* Replace reflection‑based tracing with numeric opcode IDs and guard tracing logic.
* Add small‑literal builders, constant‑prefix concatenation and quickened property access.
* Use small maps and pre‑sized arrays; avoid off‑heap memory unless GC pressure becomes a major bottleneck.
* Consider numeric tagging to unify number representations.

These changes address the major sources of overhead in the current implementation, keep the interpreter’s semantics intact, and bring Branchline closer to the performance of specialised DSLs.
