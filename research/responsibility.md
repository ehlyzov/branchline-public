Here’s a precise, developer-facing implementation brief for the requested changes. It assumes the repository is split into `language/` (DSL + VM) and `platform/` (orchestration). Keep it as a checklist during the refactor.

---

# Branchline Changes — Implementation Guide (AUTO only, optional semicolons, `SOURCE` = default AUTO, input in `in`)

## Objectives

1. **Module split:** keep only the language compiler + VM in `language/`; move graph/orchestration to `platform/`.
2. **Semicolons optional:** allow statement separation by `;` **or** newline.
3. **`SOURCE` = default input type hint:** only one type exists now — `AUTO` — and specifying it is optional.
4. **Input binding:** runtime input is always available as variable `in` (temporary alias `row` allowed for backward compatibility).

---

## 1) Repository structure & module boundaries

### Tasks

* Create/ensure `platform/` module exists; set Gradle dependency: `platform -> language` (never the opposite).
* In `language/src/main/kotlin/v2/Ast.kt`, **remove** graph/orchestration nodes:

    * Move `Program`, `GraphBody`, `NodeDecl`, `Connection`, `GraphOutput`, and any graph/top-level wiring to `platform/` (or a new `platform/lang-bridge` file).
* Keep **only** DSL for `Transform` in `language`: expressions, statements, `TransformDecl`, `SharedDecl`, number/string/object/array machinery, and VM.

### Acceptance

* `language` compiles without referencing graph/source/adapters.
* `platform` compiles and depends on `language` for AST/VM/Compiler types it needs.

---

## 2) Semicolons become optional

### Lexer

* Keep token `SEMICOLON`.
* Emit `EOL` (or `NEWLINE`) tokens for `\n` outside of strings/comments.

### Parser

* After parsing each statement, do:

    * `consumeOptional(SEMICOLON)`
    * `skipNewlines()` (consume all contiguous `EOL`s)
* In block/sequence parsers, treat end conditions as `}`/EOF; between statements accept either `;` or `EOL`.

### Tests

* Add pairs: with `;`, without `;`, mixed.
* Edge cases: last statement in file without `;`, empty lines, comments between statements.

### Acceptance

* All previous programs with `;` still parse.
* New programs split by newlines parse identically.

---

## 3) `SOURCE` redefined: default type hint = `AUTO` (only one type, spec optional)

### Language (grammar)

* Update grammar to accept:

    * `SOURCE`
    * `SOURCE AUTO`
    * `SOURCE;` / `SOURCE AUTO;` (semicolon optional)
* AST in **platform** (not language): define:

  ```kotlin
  enum class SourceType { AUTO }
  data class SourceDecl(val type: SourceType?) // null => AUTO
  ```
* Remove any adapter/endpoint fields from `SourceDecl`. It is **only** a type hint now.

### Platform (runtime meaning)

* Store the latest `SourceDecl` encountered in a compilation unit (or config). If `type == null`, treat as `AUTO`.
* There is no other type, so selection logic is trivial (always AUTO).

### Acceptance

* Scripts with `SOURCE`, `SOURCE AUTO`, or no SOURCE at all behave equivalently (AUTO).
* No references to adapters/protocols remain in `language`.

---

## 4) Runtime input variable `in` (with temporary `row` alias)

### Platform runner

* When invoking the VM, construct environment:

  ```kotlin
  val env = mutableMapOf<String, Any?>(
      "in" to input
  )
  // Temporary migration alias:
  env["row"] = env["in"]
  ```
* Do **not** change the VM for this; VM already loads variables by name.

### Tests

* Transform examples use `in.orders` instead of `row.orders`.
* Legacy tests with `row.*` pass because of the alias.

### Acceptance

* Accessing `in` works everywhere.
* `row` remains functional but is deprecated (log a warning if you have a tracing facility).

---

## 5) Execution mode selection moves to platform

### Language

* VM keeps support for SHARED and both execution modes — but does **not** decide which mode to use.
* If `Mode` exists in `TransformDecl`, treat it as a hint only (platform may override).

### Platform

* Implement a single entrypoint:

  ```kotlin
  object PlatformRunner {
      fun run(bytecode: Bytecode, input: Any?, mode: Mode? = null): Any? {
          val env = mutableMapOf("in" to input).also { it["row"] = it["in"] }
          val vm = VM(hostFns = /*...*/, funcs = /*...*/)
          // If mode==null, default to your preferred one (e.g., STREAM)
          return runInMode(vm, bytecode, env, mode ?: Mode.STREAM)
      }
  }
  ```
* Existing VM stepping/loop APIs remain unchanged.

### Acceptance

* Platform chooses mode; language/VM does not reference selection logic.

---

## 6) Migration strategy & deprecations

* Mark `row` as deprecated in platform logs (non-fatal), with a short message to use `in`.
* Remove any “adapter” meaning of `SOURCE` from docs; re-document as type hint (AUTO).
* Add a “Semicolons optional” note to the DSL spec.

---

## 7) Test plan (must pass)

1. **Parser**

    * Minimal transform with/without `;`.
    * Mixed statements and nested blocks with and without `;`.
2. **SOURCE**

    * `SOURCE` alone → treated as AUTO.
    * `SOURCE AUTO` → same behavior.
    * Absence of `SOURCE` → same as AUTO.
3. **Input binding**

    * `in.foo` path access works with provided input.
    * Legacy `row.foo` still works (via alias).
4. **Platform execution**

    * Platform runner sets env and selects a mode.
    * VM executes unchanged bytecode with SHARED available.

---

## 8) Commit plan (suggested)

1. `feat(language): make semicolons optional (lexer/parser + tests)`
2. `refactor(language): trim AST to Transform-only; move graph/source AST to platform`
3. `feat(platform): define SourceType { AUTO } + SourceDecl(type?)`
4. `feat(platform): PlatformRunner with input in 'in' (+row alias)`
5. `docs: update DSL reference (semicolon optional, SOURCE=AUTO, input='in')`
6. `chore: deprecate 'row' in logs`

---

## 9) Common pitfalls

* Don’t let `language` import anything from `platform` after the split.
* Ensure the parser consumes **all** stray newlines between statements, including leading/trailing ones in blocks.
* Treat `SOURCE` with no argument exactly the same as `SOURCE AUTO`.
* Keep VM behavior intact; only the platform decides execution mode and sets up the environment.

---

## 10) Rollback strategy

* If newline separation causes regressions, temporarily gate it behind a parser flag and run both parses in CI until green.
* Keep the `row` alias until downstream scripts are migrated; removal can be a separate major change.

That’s it. If you want, I can draft diff stubs for your lexer/parser and the new `SourceDecl` in `platform` to drop straight into the codebase.


Below is a clear, step‑by‑step implementation brief—written in English—for making **AUTO** the only supported `SOURCE` type and making its specification optional:

---

### 1. Grammar and Parsing

* Modify the grammar so that `SOURCE` can appear with **no argument** or with the literal `"AUTO"`.  Do **not** accept any other type names.
* Implement a parser rule such as:

  ```
  sourceDecl := 'SOURCE' ('AUTO')? ';'? 
  ```

  This permits `SOURCE`, `SOURCE AUTO`, and optional semicolons.

### 2. AST Changes

* Replace any existing `SourceDecl` structure that includes multiple types with a simplified version.  For example:

  ```kotlin
  // In the platform module:
  data class SourceDecl(val isAuto: Boolean = true)
  ```

  When the parser encounters `SOURCE` or `SOURCE AUTO`, instantiate `SourceDecl()` with `isAuto = true`.

### 3. Remove Other Types

* Remove or deprecate any enumeration or constants representing other input types (`JSON`, `CSV`, etc.).  The system should no longer recognize or expect these.

### 4. Default Behaviour

* In the runtime logic (platform runner), treat the absence of `SOURCE` entirely as equivalent to `SOURCE AUTO`.  No additional selection logic is needed since there is only one type.

### 5. Tests and Examples

* Update any test cases or example scripts that reference other `SOURCE` types.  They should now either omit a type completely or explicitly specify `AUTO`.
* Ensure that both forms (`SOURCE` and `SOURCE AUTO`) behave identically and compile successfully.

### 6. Documentation

* Update the user documentation to clarify that:

    * `SOURCE` now denotes only a default input type.
    * No other types are available.
    * Writing `SOURCE AUTO` is optional since it’s the only possible value.

This will keep the system simple by focusing solely on one default type while preserving forward compatibility for specifying it explicitly if desired.
