---
status: Implemented
depends_on: ['runtime/cbor-determinism']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Adjusted the nested deterministic set reuse test to avoid a JVM-only custom Number probe so the common test passes on Kotlin/JS."
  - date: 2026-06-10
    change: "Started deterministic CBOR set encode reuse to avoid re-encoding sorted set elements during deterministic output."
  - date: 2026-06-10
    change: "Implemented deterministic set emission from precomputed canonical element bytes."
---
# CBOR Deterministic Encode Reuse

## Status (as of 2026-06-10)
- Stage: implemented.
- Scope: deterministic CBOR set emission in `CborCodec`.

## Goal
Deterministic set encoding already computes each element's canonical CBOR bytes to sort elements. Reuse those computed bytes when emitting deterministic sets so nested sets and expensive element encoders are not encoded twice.

## Safety Constraints
- Preserve byte-stable deterministic output.
- Preserve roundtrip behavior for nested sets.
- Leave non-deterministic set emission unchanged.
- Leave deterministic map key emission unchanged unless key-byte reuse is clearly safe. Map keys are normalized before writing, so the residual double-encode risk is smaller and remains documented here.

## Verification
- Add a focused CBOR test that locks nested deterministic set byte output and roundtrip behavior.
- The original JVM-only custom `Number` conversion-count probe is not portable to Kotlin/JS because Kotlin/JS does not treat that subclass as a runtime `Number` in the encoder's type checks.
- Run the narrow CBOR test first, then the broader JVM interpreter and conformance test targets when feasible.

Verified:
- `./gradlew :interpreter:jvmTest --tests io.github.ehlyzov.branchline.cbor.CborCodecTest`
