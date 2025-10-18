# TODO

- Bundle Node dependencies (e.g., `fast-xml-parser`) alongside the packaged CLI so consumers do not have to run `npm install` manually.
- ✅ Resolved: top-level `FUNC` declarations in `cli/scripts/*.bl` now work after seeding function parameters into the semantic analyzer scope, allowing helpers such as `FUNC toNumber(value) { ... }` to compile without undefined identifier or parsing errors.
- Track the JS runtime numeric quirks observed while porting the JUnit summary flow (documented in `research/cli.md#js-runtime-numeric-quirks-junit-summary-flow`).
