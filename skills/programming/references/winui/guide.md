# WinUI 3

Use this guide for WinUI 3 and Windows App SDK tasks in C# and XAML.
Preserve the project toolchain, package identity, and architecture unless the task requires a change.

## Task references

Read only the guide needed for the current decision.

| Task | Guide |
| --- | --- |
| Inspect or repair development prerequisites | [Setup](references/winui-setup/guide.md) |
| Create, build, run, or diagnose an app | [Development](references/winui-dev-workflow/guide.md) |
| Select controls or change layout, themes, or XAML | [Design](references/winui-design/guide.md) |
| Review requested changes or a concrete quality concern | [Code review](references/winui-code-review/guide.md) |
| Inspect UI state or automate a behavior check | [UI tests](references/winui-ui-testing/guide.md) |
| Prepare MSIX, certificates, CI, or Store submission | [Distribution](references/winui-packaging/guide.md) |
| Port WPF behavior | [WPF migration](references/winui-wpf-migration/guide.md) |
| Analyze an explicitly requested agent session | [Session report](references/winui-session-report/guide.md) |

## Tool choices

Use the repository build command when available.
The bundled [BuildAndRun.ps1](references/winui-dev-workflow/BuildAndRun.ps1) adds analyzer and diagnostic defaults to project-mode `winapp run`.
It can register a development package, so it is not a build-only substitute.

For unfamiliar controls, use `winapp find-ui` if the installed CLI supports it, or consult Microsoft samples.
A small XAML edit does not require a sample search, setup audit, or separate code review.

## Sources and maintenance

These guides are local adaptations of [microsoft/win-dev-skills](https://github.com/microsoft/win-dev-skills), originally imported from plugin 0.6.0 (`68ae65d`).
The archives preserve the imported originals.
Check [WinApp CLI documentation](https://github.com/microsoft/WinAppCli/blob/main/docs/usage.md) against installed command help before API-sensitive work.
Do not replace local decisions with upstream instructions during a documentation refresh.
