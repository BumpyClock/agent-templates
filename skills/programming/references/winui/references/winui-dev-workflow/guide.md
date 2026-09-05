---
name: winui-dev-workflow
description: Create, build, launch, or diagnose WinUI 3 apps with WinApp CLI.
---

### Create or Open a Project

**New app** — let WinApp CLI install/update the official templates and scaffold:
```powershell
winapp new --name <AppName> --template winui-mvvm --template-version latest --use-defaults
cd <AppName>
```
Run `winapp new --list` to discover the currently installed template short names. Do not install the template pack separately and do not create the output directory first.

**Existing app** — read the `.csproj` to understand:
- `<TargetFramework>` (e.g., `net10.0-windows10.0.26100.0`)
- `<PackageReference>` versions (WindowsAppSDK, CommunityToolkit)
- Project structure and established patterns

### Install Packages

```powershell
dotnet add package <Name>
```
Preserve repository version pins and compatibility requirements.
Select an explicit compatible version when needed. A newer package is not inherently compatible with the project.

### Build & Run

WinApp CLI 0.6+ builds a `.csproj` and launches it directly:

```powershell
winapp run . --debug-output
winapp run .\MyApp.csproj -c Release --arch arm64
```

Use the repository command when available.
The included `BuildAndRun.ps1` invokes project-mode `winapp run`, injects the bundled analyzer, and enables `--debug-output` by default:

```powershell
.\BuildAndRun.ps1
```

Use the current harness process-session mechanism for attached runs.
The command stays attached while the app is open. Capture the app PID for later inspection.
Project-mode launch can register a development package. Use a build-only command when launch or registration is outside the task.

The wrapper only adds repository-specific analyzer and debug defaults. WinApp CLI handles:
1. Project restore and build
2. Configuration, architecture, runtime, and framework selection
3. Packaged versus unpackaged detection
4. Build-output and executable discovery
5. Windows App Runtime setup
6. Package registration and launch

**Options and forwarded WinApp arguments:**
```
.\BuildAndRun.ps1                              # one top-level csproj; attached diagnostics
.\BuildAndRun.ps1 .\MyApp.csproj               # explicit project
.\BuildAndRun.ps1 .\MyApp.csproj -c Release    # forwarded to winapp run
.\BuildAndRun.ps1 .\MyApp.csproj --arch arm64  # forwarded to winapp run
.\BuildAndRun.ps1 . --detach --json             # return after launch; emit PID as JSON
.\BuildAndRun.ps1 . --symbols                   # add Symbol Server-backed native symbols
.\BuildAndRun.ps1 --args "--flag value"         # pass application arguments
```

The wrapper accepts the same `.csproj`, `.sln`/`.slnx`, directory, and `--project` inputs as `winapp run`.

For build failures, identify the cause before changes or retries.
For an implementation task, correct failures caused by the change and rerun affected checks.

For launch crashes, inspect captured process output and the stowed-exception diagnostics below.

### Diagnosing Crashes with `winapp run`

For WinUI apps, `--debug-output` (the wrapper default) runs a **stowed-exception triage** on crash, surfacing the real WinUI/XAML error behind an opaque `0x8000FFFF` / `E_FAIL`. The first crash downloads debugger components and can take a few minutes; point `WINAPP_DBGTOOLS_DIR` at an existing *Debugging Tools for Windows* install for offline/locked-down environments. Add `--symbols` for richer native frames.

### Common Errors

| Error | Fix |
|-------|-----|
| Developer Mode not enabled | Check whether the requested activation path requires it. Obtain approval before the machine-wide change |
| CS0234/CS0246 missing type | Add `using` or `dotnet add package` |
| NETSDK1136 platform required | Target a Windows TFM (for example `net10.0-windows10.0.26100.0`); use `-f <windows-tfm>` when the project already multi-targets |
| XLS0414 XAML type not found | Add `xmlns` declaration |
| XDG0062 binding path missing | Check `x:Bind` property exists on ViewModel |
| Blank window after launch | Inspect activation errors and binding sources. Use `OneWay` only when the source must update the target |
| App silently exits | Capture launch diagnostics and check the intended packaged or unpackaged activation path |
| App crashes with opaque `0x8000FFFF` / `E_FAIL` | Run under `--debug-output` (BuildAndRun.ps1 default) — WinUI stowed-exception triage surfaces the real XAML error + symbolicated native stack. `--symbols` is optional |
| XAML compiler crashes silently | Remove any `PresentationCore.dll` / `System.Windows` references |
| MSB3073 / `XamlCompiler.exe ... exited with code 1`, no `.xaml` named | Inspect the build log and resolved SDK version. Confirm a matching SDK defect before an upgrade |
| 0x80073CF6 package install failed | Check the manifest publisher and Developer Mode; apps from `winapp new` need no separate `winapp init` |
| 0x80073CF9 / "Failed to reach state Staged" on a deeply nested project | Check path length and package layout. For a confirmed path issue, use a shorter dedicated `--output-appx-directory`. Keep layouts separate by configuration and architecture. Remove stale payloads only from confirmed disposable build output. If ownership or live registration is uncertain, use a fresh layout directory |
| 0x8007000B bad image format | Wrong platform target — use x64 or ARM64, not AnyCPU |

### Prerequisites

For missing tools or incompatible versions, consult [setup](../winui-setup/guide.md).
Read-only checks do not require a separate setup request.
Install tools only within authorized setup scope. Ask before elevation or a machine-wide Developer Mode change.

### Critical Rules

- Preserve the intended activation model. Use package activation for packaged apps and the supported executable path for unpackaged apps.
- Do not remove the manifest or change `WindowsPackageType` merely to bypass a launch failure.
- Match platform and runtime architecture to project dependencies. Do not assume an `AnyCPU` configuration supplies compatible native binaries.

### References

- `BuildAndRun.ps1` — included with this skill; adds the bundled analyzer and diagnostic defaults to `winapp run`
