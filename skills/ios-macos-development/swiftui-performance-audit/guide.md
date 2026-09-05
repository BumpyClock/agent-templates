---
name: swiftui-performance-audit
description: Diagnose SwiftUI responsiveness, memory growth, and excessive view updates.
---

# SwiftUI Performance Audit

Use the reported symptom and available evidence to choose the next diagnostic.
Do not require a code review before an existing trace or reproducible runtime failure.

## Evidence

Record the interaction, device or simulator, OS, and build configuration when they affect the result.
Separate code-level hypotheses from measured causes.
Use available trace tools directly when the requested diagnostic permits them.
Ask the user for a capture only when required access is absent.

For a requested fix, compare the same interaction and configuration before and after the change.
Report unresolved uncertainty when comparable measurements are unavailable.

## References

- For suspected code-level causes, read [Code smells](references/code-smells.md).
- For trace collection, read [Trace intake](references/profiling-intake.md).
- For available CLI capture, read [Native performance](../native-app-performance/guide.md).
- For SwiftUI Instruments tracks, read [Instruments guide](references/optimizing-swiftui-performance-instruments.md).
- For update causes, read [Performance concepts](references/understanding-improving-swiftui-performance.md).
- For responsiveness failures, read [Hangs](references/understanding-hangs-in-your-app.md).
- For identity and dependencies, read [WWDC23](references/demystify-swiftui-performance-wwdc23.md).
- For a substantial audit report, adapt [Report template](references/report-template.md).

Use the installed Instruments version and current Apple documentation when bundled capture instructions differ.
