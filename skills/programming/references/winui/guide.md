# WinUI 3

Use for WinUI 3 / Windows App SDK apps in C# and XAML: toolchain setup, `winapp new` / `winapp run`, Fluent UI design, code review, UI testing, packaging, WPF migration, and WinUI-related agent session review.

## Routing

Open the guide that matches the task before acting:

| Task | Guide |
| --- | --- |
| Install or verify prerequisites: .NET SDK 8.0.100+, WinApp CLI 0.6+, Developer Mode | `references/winui-setup/guide.md` |
| Create, build, run, debug, or fix WinUI app errors | `references/winui-dev-workflow/guide.md` |
| Design or review WinUI UI/XAML, Fluent styling, theme resources, accessibility, layout | `references/winui-design/guide.md` |
| Review requested WinUI changes or investigate a concrete WinUI quality concern | `references/winui-code-review/guide.md` |
| Automate UI tests with `winapp ui`, inspect controls, assert state, capture screenshots | `references/winui-ui-testing/guide.md` |
| Package, sign, install, release, MSIX, certs, GitHub Actions, Microsoft Store | `references/winui-packaging/guide.md` |
| Migrate WPF to WinUI 3: namespaces, controls, DispatcherQueue, resources | `references/winui-wpf-migration/guide.md` |
| Analyze Copilot CLI / Claude Code sessions and produce diagnostic report | `references/winui-session-report/guide.md` |

## Shared Rules

- Start with `references/winui-setup/guide.md` if `dotnet`, `winapp`, Developer Mode, or Windows App SDK state is unknown.
- Use `references/winui-dev-workflow/BuildAndRun.ps1` for build/run unless the repo provides a stronger local script. WinApp CLI 0.6+ owns templates through `winapp new`; do not install the template pack separately.
- For UI work, search samples first with `winapp find-ui`, then write XAML. Read `references/winui-design/guide.md` whenever doing XAML work.
- For verification, prefer scripted `winapp ui` tests over manual click-throughs when behavior matters.
- Keep fixes scoped: root cause first, minimal change at right boundary, then rerun build/test gate.

## Reference Layout

Former standalone WinUI skills live under `references/` as nested guides. They intentionally use `guide.md`, not `SKILL.md`, so they remain conditional references behind the programming skill. Nested content tracks [microsoft/win-dev-skills](https://github.com/microsoft/win-dev-skills) plugin `winui` 0.6.0 (`68ae65d`, 2026-08-26) with local path rewrites. Verbatim official originals are archived in `skills_archive/merged-into-parent/winui-*` for the next upstream sync.
