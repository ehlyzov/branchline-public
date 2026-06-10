---
status: Implemented
depends_on: ['runtime/cbor-determinism']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
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
- Add a focused CBOR test that locks nested deterministic set byte output, roundtrip behavior, and single element encoding during deterministic set emission.
- Run the narrow CBOR test first, then the broader JVM interpreter and conformance test targets when feasible.

Verified:
- `./gradlew :interpreter:jvmTest --tests io.github.ehlyzov.branchline.cbor.CborCodecTest`
