---
name: adopt-c-bounds-safety
description: Adopt or diagnose the C -fbounds-safety language extension.
---
# C bounds safety

Use for `-fbounds-safety` adoption, bounds annotations, compiler diagnostics, or runtime bounds violations.
The extension adds compile-time restrictions and runtime bounds checks. Adoption requires annotations that describe the actual pointer contract.

Read the section that resolves the current decision. Reuse fresh context rather than reread the full reference set before each edit.

| Decision | Reference |
| --- | --- |
| Full or header-only adoption, sequencing, and partial adoption | [Adoption strategies](references/adoption-strategies.md) |
| Pointer kinds, annotations, and assignment rules | [Language overview](references/language-overview.md) |
| Safe wrappers, interop, and diagnostic-specific pitfalls | [Common patterns and pitfalls](references/common-patterns-and-pitfalls.md) |
| Compiler flags, Xcode settings, and soft traps | [Build settings](references/build-settings.md) |
| LLDB inspection and runtime bounds violations | [Runtime debugging](references/runtime-debugging.md) |
