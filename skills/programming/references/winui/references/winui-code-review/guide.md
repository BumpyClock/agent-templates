---
name: winui-code-review
description: Assess WinUI-specific defects in a requested review or concrete quality concern.
---

# WinUI Code Review

Inspect affected XAML, C#, and dependencies needed to establish a defect.
A successful build or an intended commit does not require a separate review.
Honor repository conventions where several valid designs exist.
Require a concrete consequence before treating a pattern preference as a defect.

## WinUI-specific concerns

- Check binding source, update mode, notifications, and nullable paths against the intended behavior.
- Use `{x:Bind}` for compiled paths and `{Binding}` where runtime sources or `DataContext` semantics fit.
- Check UI-thread access, task lifetime, event subscriptions, and disposal of owned resources.
- Check virtualization and layout constraints when collection size can affect responsiveness.
- Check accessible names, keyboard access, focus order, and contrast for affected controls.
- Use stable `AutomationId` values where tests require selectors. IDs alone do not establish accessibility.
- Check resource lookup across supported themes and cultures when those resources change.

MVVM libraries, partial properties, command generators, and fixed spacing grids are project choices, not universal correctness requirements.
Collection replacement is valid when notifications and selection semantics remain correct.
An `async` method does not itself move CPU work off the UI thread.

## Analyzer integration

The sibling [development wrapper](../winui-dev-workflow/BuildAndRun.ps1) injects the bundled analyzer through `CustomAfterDirectoryBuildProps`.
Plain `dotnet build`, Visual Studio, and `winapp run` do not automatically load that payload.
Treat diagnostics as evidence to investigate, not proof that every suggested pattern is required.
Use explicit project analyzer configuration when the repository requires coverage outside the wrapper.

## References

- For a concrete performance, security, or localization concern, consult the relevant section of [quality rules](references/quality-rules.md).
- For binding semantics, consult [Microsoft data binding documentation](https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth).

Report actionable defects with location, consequence, and supporting evidence.
