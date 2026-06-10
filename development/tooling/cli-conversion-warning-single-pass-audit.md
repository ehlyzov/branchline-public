---
status: Implemented
depends_on: ['docs/conversion-loss-audit']
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Refactored CLI output conversion warning collection to audit each output tree in one recursive pass."
---
# CLI Conversion Warning Single-Pass Audit

## Context

`collectOutputConversionWarnings` previously checked JSON output warning risks with
separate recursive scans for byte arrays, extended-precision numbers, and
canonical key reordering. XML output mixed-content loss used a separate recursive
scan as well. Large nested outputs could therefore walk the same tree multiple
times for one conversion warning audit.

## Implementation

- Keep public warning strings and output order unchanged.
- Collect active output warning risks during one recursive pass over maps,
  collections, and arrays.
- Emit JSON warnings in the historical fixed order:
  byte arrays, extended precision, canonical key reordering.
- Preserve XML mixed-content output detection semantics.

## Verification

- Red check:
  `./gradlew :cli:jvmTest --tests io.github.ehlyzov.branchline.cli.ConversionLossAuditTest.jsonOutputWarningsAuditNestedValuesOnceInWarningOrder`
  failed before implementation on the nested traversal-count assertion.
- Green check:
  `./gradlew :cli:jvmTest --tests io.github.ehlyzov.branchline.cli.ConversionLossAuditTest.jsonOutputWarningsAuditNestedValuesOnceInWarningOrder`
  passed after implementation.
