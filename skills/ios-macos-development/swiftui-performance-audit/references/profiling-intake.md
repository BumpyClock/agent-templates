# Profiling intake and collection checklist

## Intent

Use this reference when a performance hypothesis needs runtime evidence or an existing trace needs more context.
Capture evidence directly when available tools and task permissions permit it.
Ask the user for a capture only when the required access is absent.

## Ask for first

- Exact symptom: CPU spike, dropped frames, memory growth, hangs, or excessive view updates.
- Exact interaction: scrolling, typing, initial load, navigation push/pop, animation, sheet presentation, or background refresh.
- Target device and OS version.
- Whether the issue was reproduced on a real device or only in Simulator.
- Build configuration: Debug or Release.
- Whether the user already has a baseline or before/after comparison.

## Focused capture

Use these steps for an available capture tool or a user-assisted capture.

1. Select a representative build and record its configuration.
2. Select the installed SwiftUI Instruments template for view-update symptoms, or Time Profiler for CPU and responsiveness symptoms.
3. Capture the specific problematic interaction.
4. Select the affected timeline interval and inspect the corresponding call tree or update causes.
5. Preserve the trace and reproduction context for comparison.

Use a Release build for representative performance unless the defect requires another configuration.
Use Allocations or a memory graph when object retention or memory growth is the reported problem.
Installed Instruments versions differ, so use available tracks rather than require a specific template layout.

## Ask for these artifacts

- Trace export or screenshots of the relevant SwiftUI lanes
- Time Profiler call tree screenshot or export
- Device/OS/build configuration
- A short note describing what action was happening at the time of the capture
- If memory is involved, the memory graph or Allocations data if available

## When to ask for more

- Ask for a second capture if the first run mixes multiple interactions.
- Ask for a before/after pair if the user has already tried a fix.
- Ask for a device capture if the issue only appears in Simulator or if scrolling smoothness matters.

## Common traps

- Debug builds can distort SwiftUI timing and allocation behavior.
- Simulator traces can miss device-only rendering or memory issues.
- Mixed interactions in one capture make attribution harder.
- Screenshots without the reproduction note are much harder to interpret.
