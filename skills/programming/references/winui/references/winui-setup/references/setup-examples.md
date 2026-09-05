# Windows Setup Examples

Use these examples for a missing SDK, command-discovery failure, or development activation prerequisite.
They do not define a minimum SDK for every project.

## Read-only probes

Run SDK selection checks from the project directory so `global.json` applies.

```powershell
Get-Command dotnet, winapp -ErrorAction SilentlyContinue |
    Select-Object Name, Source
dotnet --version
dotnet --list-sdks
winapp --version
winapp run --help
```

`dotnet --list-sdks` reports installed SDKs. `dotnet --version` tests SDK resolution from the current directory.
An installed newer SDK can still fail a project pin or roll-forward policy.

For a development registration error, inspect Developer Mode without a registry write:

```powershell
Get-ItemProperty `
    -Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock' `
    -Name AllowDevelopmentWithoutDevLicense -ErrorAction SilentlyContinue
```

A missing value does not establish why installation failed.
Use the activation error to determine whether Developer Mode applies.

## Authorized installation

When WinGet is the approved channel, distinguish installation from upgrade:

```powershell
winget show --id Microsoft.WinAppCli --exact
winget install --id Microsoft.WinAppCli --exact
```

For an existing incompatible installation, use `winget upgrade --id Microsoft.WinAppCli --exact` within the requested repair scope.
Select a .NET SDK package and version from the project requirements, not from this example.
Keep package agreement acceptance and elevation explicit.

After installation, use a fresh terminal if the current process cannot resolve the command.
Avoid replacement of the complete process `PATH`, which can discard session-specific tool paths.
Check `Get-Command` again to detect an older executable earlier in `PATH`.

For an authorized Developer Mode change, use Windows developer settings or the managed device procedure.
Report a policy restriction instead of an attempted bypass.

Sources: [WinApp CLI installation](https://learn.microsoft.com/en-us/windows/apps/dev-tools/winapp-cli/), [.NET SDK selection](https://learn.microsoft.com/en-us/dotnet/core/versions/selection).
