---
name: winui-setup
description: Inspect or repair the WinUI development toolchain.
---

# WinUI Toolchain

Read-only prerequisite checks can proceed as part of an app task.
A missing prerequisite does not require a new session or explicit skill invocation.
Install or upgrade tools only within the requested setup scope.
Ask before administrator elevation or a Developer Mode change.

## Inspect the required capability

For SDK selection, inspect `global.json`, target frameworks, and repository build instructions.
An installed SDK above a generic minimum does not prove project compatibility.

```powershell
dotnet --list-sdks
winapp --version
winapp run --help
```

The bundled development wrapper targets WinApp CLI 0.6+ project-mode commands.
If a tool is absent, report the missing capability and use a supported repository alternative where possible.

## Setup or repair

For Windows prerequisite probes and approved installation commands, use [setup examples](references/setup-examples.md).

Select the SDK that satisfies the project, rather than always selecting the newest SDK.
Use the installation channel approved for the machine.
For current options, consult [WinApp CLI installation](https://learn.microsoft.com/en-us/windows/apps/dev-tools/winapp-cli/).

`winapp new` manages its official template dependency.
A separate template installation is unnecessary for that workflow.
After installation, refresh command discovery and verify the requested capability.
If installation fails, diagnose the error before another attempt.

Limit elevation to the operation that requires it.
Do not change the AI harness, install an IDE, or enable machine-wide features merely to satisfy this guide.

Report the detected versions, changes made, and any remaining project-specific blocker.
