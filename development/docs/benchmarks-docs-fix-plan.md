---
status: Implemented
depends_on: []
blocks: []
supersedes: []
superseded_by: []
last_updated: 2026-06-10
changelog:
  - date: 2026-06-10
    change: "Closed docs repair for benchmark readiness G7 with local docsBuild evidence and a release-asset validation caveat."
  - date: 2026-06-10
    change: "Completed G5 docs publication repair: release directory links, CSV co-location, shared-key collision fix, rounded reports, dispatch deploy path, and public benchmark framing."
  - date: 2026-06-10
    change: "Added G0 methodology handoff requirements for public benchmark pages."
  - date: 2026-06-10
    change: "Linked benchmark docs repair to benchmark-first readiness: public pages must show representative case categories, caveats, and downloadable CSV summaries."
  - date: 2026-02-01
    change: "Migrated from research/docs-perf.md and added YAML front matter."
---
# Performance Docs + Pages Fix Plan


## Status (as of 2026-06-10)
- Stage: Implemented for local benchmark-readiness purposes; waiting for release-time confirmation against real GitHub release assets.
- Agents A-E are addressed in the allowed files for G5.
- `./gradlew docsBuild` is the required local verification for this docs plumbing pass.
- G7 verdict allows Branchline DX T9-T18 to resume with benchmark caveats visible; public speedup/ratio claims remain blocked by benchmark credibility instrumentation, not by this docs plumbing record.

## Role in benchmark-first roadmap

This plan is now part of [Branchline Benchmark Readiness Plan](../planning/branchline-benchmark-readiness-plan.md). It should be executed before broader DX/adoption packaging because the current public benchmark pages still read as placeholders when release assets are absent.

Additional requirements from the benchmark-first decision:

- Keep benchmark pages honest about what is cross-engine JSON comparison and what is Branchline-specific measurement.
- Show representative case categories, not only raw JMH benchmark names.
- Keep downloadable CSV assets next to release pages.
- Include caveats for missing external JSONata engines, expected failures, semantic non-equivalence, and VM fallback/overhead.
- Preserve the G0 comparison contract: separate execution throughput, parse/compile, inspect/contract, and release-publication health; do not combine them into one speed claim.
- Include minimum public row fields when benchmark data is shown: case id, workload category, product-representative flag, engine, score, error margin, allocation if available, expected-failure/unavailable reason, validation state, and notes.
- Do not add editor/LSP claims or roadmap items to benchmark pages.

## Context snapshot (what is broken in the generated site)

- `file:///Users/eugene/Downloads/artifact/benchmarks/jsonata/releases/snapshot-c502022/index.html`
  - Has `Source data: CSV` linking to `jsonata-summary.csv`, but the file is missing in that directory.
  - `ls /Users/eugene/Downloads/artifact/benchmarks/jsonata/releases/snapshot-c502022` only contains `index.html`.
- `file:///Users/eugene/Downloads/artifact/benchmarks/index.html`
  - Release links point to `releases/<tag>.md` instead of `releases/<tag>/` (MkDocs writes `<tag>/index.html`).
- `file:///Users/eugene/Downloads/artifact/benchmarks/releases/snapshot-c502022/index.html`
  - Contains only the "Runtime and allocation" section, no "Interpreter vs VM ratio (mean)" section.
  - Numeric output has too many digits (example: `2.050769212644806` where `2.051` is enough).

## Page build flow (where to patch)

- Deploy job downloads release assets into `docs/benchmarks/...` and runs MkDocs:
  - `.github/workflows/deploy.yml#L57-L125` (Fetch benchmark summaries).
  - It only downloads `.md` assets and writes links ending in `.md`.
- Local helper script does the same:
  - `.github/scripts/fetch-benchmark-summaries.sh#L37-L105`.
- JMH summary generation (release workflow):
  - `.github/workflows/release-artifacts.yml#L184-L196` uses
    `--shared-key basename` with two `results.json` files.
- JMH report formatting:
  - `.github/scripts/jmh-report.bl#L106-L111` `formatNumber` is `STRING(value)`.
  - Ratio uses `STRING(row.ratio)` at `.github/scripts/jmh-report.bl#L236`.
- JSONata report formatting:
  - `.github/scripts/jsonata-report.bl#L12-L17` `formatNumber` is `STRING(value)`.
- Shared input keys:
  - `--shared-key basename` maps both `.../results.json` to the same key.
  - `cli/src/commonMain/kotlin/io/github/ehlyzov/branchline/cli/SharedIo.kt#L120-L140`
    shows `BASENAME` uses file name only.
  - For `SharedKind.MANY`, keys overwrite in the store (last wins):
    `interpreter/src/jvmMain/kotlin/io/github/ehlyzov/branchline/std/SharedStoreJvm.kt#L15-L41`.

## Plan (split across agents)

### Agent A: Fix release links + CSV downloads (deploy + helper script)

Goal: Ensure MkDocs pages link to the correct HTML paths and CSV assets are present.

Context:
- Link generation is in `.github/workflows/deploy.yml#L94-L119` and
  `.github/scripts/fetch-benchmark-summaries.sh#L72-L99`.
- MkDocs maps `docs/benchmarks/releases/<tag>.md` to `/benchmarks/releases/<tag>/index.html`.
  So links should target `<tag>/` not `<tag>.md`.
- JSONata summary pages expect a file named `jsonata-summary.csv`
  in the same directory as `index.html`.

Tasks:
1) Update release list link targets:
   - In deploy workflow and fetch script, change
     `(${safe_tag}.md)` -> `(${safe_tag}/)`
     and `(releases/${safe_tag}.md)` -> `(releases/${safe_tag}/)`.
2) Download CSV assets in both places and place them in per-release directories:
   - JMH: asset `branchline-jmh-summary-${tag}.csv`.
   - JSONata: asset `branchline-jsonata-summary-${tag}.csv`.
   - Write to:
     - `docs/benchmarks/releases/${safe_tag}/jmh-summary.csv`
     - `docs/benchmarks/jsonata/releases/${safe_tag}/jsonata-summary.csv`
   - Create those directories before writing.
3) Keep the deploy workflow and helper script in sync (same link targets + CSV logic).

Validation:
- After MkDocs build, confirm:
  - `site/benchmarks/releases/<tag>/index.html` and
    `site/benchmarks/releases/<tag>/jmh-summary.csv` exist.
  - `site/benchmarks/jsonata/releases/<tag>/index.html` and
    `site/benchmarks/jsonata/releases/<tag>/jsonata-summary.csv` exist.
  - `benchmarks/index.html` links point to `/benchmarks/releases/<tag>/`.

### Agent B: Restore Interpreter vs VM comparison section

Goal: Ensure JMH summary has both Interpreter + VM rows so the comparison section renders.

Context:
- `release-artifacts.yml#L184-L188` calls
  `jmh-report.bl` with `--shared-key basename` for two files named `results.json`.
- `SharedStore` keeps only the last value for duplicate keys, so one suite drops.
- Comparison section only renders if both suites exist
  (`jmh-report.bl#L167-L203`, `#L229-L239`).

Tasks:
1) Change the JMH report invocation in `.github/workflows/release-artifacts.yml` to
   avoid key collision:
   - Remove `--shared-key basename` or switch to `--shared-key relative`.
2) Update docs/examples that reference the old command:
   - `docs/benchmarks.md#L65-L68`
   - `README.md#L71-L75`
3) Optional hardening:
   - If only one suite is present, add a warning line to the markdown
     so missing data is obvious.

Validation:
- Regenerate a summary locally with two `results.json` files and confirm
  the comparison section appears and includes Interpreter + VM ratios.

### Agent C: Reduce numeric precision in reports

Goal: Round numeric output so tables show a few decimals (e.g., `2.051`).

Context:
- `formatNumber` in `jmh-report.bl` and `jsonata-report.bl` uses `STRING(value)`
  (full precision).
- Ratio uses `STRING(row.ratio)` in `jmh-report.bl#L236`.
- `ROUND(number[, precision])` exists in the std library API but is currently TODO:
  `interpreter/src/commonMain/kotlin/io/github/ehlyzov/branchline/std/StdNumericModule.kt#L80-L90`.

Tasks:
1) Decide rounding implementation:
   - Option A: Implement `ROUND` (and any helpers) in `StdNumericModule` so it is safe
     to use in `.bl` scripts.
   - Option B: Implement manual rounding inside the `.bl` scripts (scale + floor/ceil),
     if you prefer not to touch the stdlib.
2) Update `formatNumber` in:
   - `.github/scripts/jmh-report.bl#L106-L111` (also use it for ratio at #L236).
   - `.github/scripts/jsonata-report.bl#L12-L17`.
3) Decide whether CSV should also be rounded (usually yes for human-readability).

Validation:
- Rebuild a summary and confirm values like `2.050769212644806` render as `2.051`.

### Agent D: Make deploy workflow runnable via workflow_dispatch

Goal: Manual "Build and Deploy to GitHub Pages" runs should not skip.

Context:
- Workflow definition: `.github/workflows/deploy.yml#L1-L27`.
- Both jobs have `if` conditions tied to `workflow_run` success.
- User reports manual dispatch runs are skipped.

Tasks:
1) Check a skipped run in GitHub Actions UI to see the exact skip reason.
2) If the `if` condition is the cause, simplify to avoid `workflow_run`-only gating:
   - Example: `if: ${{ github.event_name != 'workflow_run' || github.event.workflow_run.conclusion == 'success' }}`.
3) If dispatch needs explicit ref, add `workflow_dispatch` input `ref`
   and update `actions/checkout` to use it.
4) Add a small debug step (echo event name + ref) to confirm dispatch context.

Validation:
- Trigger `workflow_dispatch` and confirm both `build` and `deploy` run.

### Agent E: Add representative benchmark summary framing

Goal: Make public pages explain the benchmark portfolio rather than only listing low-level JMH names.

Context:
- `development/planning/branchline-benchmark-readiness-plan.md` defines Tier 1 cross-engine cases and Tier 2 Branchline-specific measurements.
- Current `docs/benchmarks.md` and `docs/benchmarks/jsonata.md` pages are short and rely on generated release includes.

Tasks:
1) Add a short methodology section that separates:
   - cross-engine JSON execution comparisons,
   - Branchline interpreter-vs-VM comparisons,
   - Branchline-specific inspect/contract/XML/conversion measurements.
2) Add a case category table aligned with the readiness plan.
3) Add caveats for missing external engine jars, expected failures, and semantic validation.
4) Keep benchmark docs free of editor/LSP scope.

Validation:
- Run `./gradlew docsBuild`.

## G5 implementation evidence (2026-06-10)

Scope:

- Release links now target generated HTML directory paths in the deploy workflow, local fetch helper, and public archive links.
- JMH and JSONata CSV assets are downloaded into per-release directories so MkDocs copies them next to release pages.
- JMH summary generation uses `--shared-key relative` for interpreter and VM `results.json` inputs, avoiding duplicate `basename` keys.
- JMH and JSONata reports round numeric table and CSV values to three decimal places; JSONata ratios now use the same formatter.
- Manual `workflow_dispatch` for deploy accepts an optional `ref`, checks out that ref or the current SHA, and prints dispatch context.
- Public benchmark docs now separate cross-engine JSON execution, interpreter-vs-VM execution, Branchline-specific measurements, and publication health; representative case categories and caveats are documented without editor/LSP scope.

Evidence commands:

```bash
ruby -e 'docs=["docs/benchmarks.md","docs/benchmarks/jsonata.md"].map{|p| [p, File.read(p)]}.to_h; required={"docs/benchmarks.md"=>["## Methodology", "Branchline-specific", "validation state"], "docs/benchmarks/jsonata.md"=>["Representative case categories", "missing external", "semantic validation"]}; failed=[]; required.each{|p, needles| needles.each{|n| failed << "#{p}: missing #{n}" unless docs[p].include?(n)}}; abort failed.join("\n") unless failed.empty?; puts "benchmark docs framing ok"'
ruby -e 't=File.read(".github/scripts/jsonata-report.bl"); body=t[/FUNC formatRatio\(value\) \{(.*?)\n\}/m,1] or abort "formatRatio missing"; abort "formatRatio should use formatNumber" unless body.include?("formatNumber(value) + \"x\""); puts "jsonata ratio formatting ok"'
./gradlew docsBuild
```

Results:

- Docs framing assertion: `benchmark docs framing ok`.
- JSONata ratio formatter assertion: `jsonata ratio formatting ok`.
- `./gradlew docsBuild`: `BUILD SUCCESSFUL in 670ms` on the final rerun.

Constraints:

- `development/INDEX.md` was not updated because the G5 allowlist did not include it, even though AGENTS.md normally requires development index updates.
- Release-time validation still requires a GitHub release with benchmark Markdown and CSV assets; the local docs build verifies the MkDocs side only.
