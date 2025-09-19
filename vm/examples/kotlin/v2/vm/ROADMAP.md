Demo Roadmap: VMExample Enhancements

Goals
- Show non-zero VM metrics in the example output.
- Demonstrate VMExec + VMEval usage with metrics and outputs.
- Keep the demo concise and reproducible via Gradle tasks.

Plan
1) Record compile metrics in VMExec
   - Time the `compiler.compile(ir)` call and call `VMFactory.Metrics.onCompileNanos`.
   - On compilation failure, call `VMFactory.Metrics.onCompileFailed`.

2) Make Integration example produce an OUTPUT
   - In `runIntegrationExample`, append an OUTPUT so result is non-null.

3) Add runMetricsDemo to VMExample
   - Reset metrics, run a small VMEval expression, print stats.
   - Run a VMExec-backed stream transform, print updated stats.

4) Run example and verify metrics > 0
   - Use `:language:runVmExample` to run `main` and check VM Statistics.

Notes
- Optional future improvements: tracing flag, snapshot demo hook, fallback trace when AWAIT is unavailable.
