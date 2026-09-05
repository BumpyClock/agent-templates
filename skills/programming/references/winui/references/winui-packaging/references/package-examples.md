# MSIX Artifact Examples

Use these examples for an artifact task, not as a mandatory release sequence.
Replace sample paths with the identified project output and artifact paths.

## Build and package

For an SDK-style C# project with an x64 configuration, a build-only example is:

```powershell
dotnet build .\MyApp.csproj -c Release -p:Platform=x64
```

Use the repository publish target when the package requires a complete deployment layout rather than ordinary build output.
Keep architecture and configuration outputs separate.

The current upstream CLI documents `pack`. Older installations can expose `package` instead.
Select the command and options from installed `winapp --help` before use.

```powershell
winapp pack .\publish\x64 --manifest .\Package.appxmanifest --output .\artifacts\MyApp.msix
```

This example creates an unsigned artifact. It does not trust a certificate or install the app.
For Windows App SDK runtime inclusion, inspect `--self-contained` support and the project runtime configuration.
Windows App SDK runtime inclusion does not alone establish .NET runtime inclusion.

## Development certificate and signature

For an authorized local development certificate, use a new output path and the app manifest:

```powershell
winapp cert generate --manifest .\Package.appxmanifest --output .\devcert.pfx
winapp cert info .\devcert.pfx
```

The CLI default development password is not protection suitable for a production private key.
Keep certificate material outside source control and artifact uploads.
Do not print private keys or passwords in logs.

For the identified development artifact and certificate:

```powershell
winapp sign .\artifacts\MyApp.msix .\devcert.pfx
winapp tool signtool verify /pa .\artifacts\MyApp.msix
```

For production, use the approved identity and secret mechanism instead of the development certificate example.
Use `winapp sign --timestamp <approved-url>` when the release policy requires an RFC 3161 timestamp.
Signature trust validation can fail on a machine without the certificate trust chain.
Do not install a certificate merely to make that check pass.

## Authorized local installation

After separate authorization for certificate trust, `winapp cert install .\devcert.pfx` changes the machine certificate store.
After authorization for the identified package, use `Add-AppxPackage -Path .\artifacts\MyApp.msix` to install it.
Neither command is part of artifact creation by default.

## Failure evidence

| Symptom | Inspect before repair |
| --- | --- |
| Publisher mismatch | Compare certificate subject with manifest `Identity.Publisher` |
| Untrusted certificate | Inspect the chain and intended distribution channel before a trust change |
| Certificate already exists | Inspect its identity and ownership before reuse or a new output path |
| Manifest not found | Locate the intended manifest and pass its path without app initialization |
| Installation conflict | Inspect installed identity, development registration, version, and affected app data |
| Expired or invalid signature | Inspect certificate validity, timestamp, and artifact integrity |

A development registration can conflict with a signed package of the same identity.
Identify that registration before any unregister operation. Do not remove installed packages as a generic repair.

## CI adaptation

Preserve the repository runner, dependency pins, and release controls.
Use a build-only target rather than the development wrapper when CI must avoid package registration.
Configure required analyzers in the project or CI so development-only injection does not define release coverage.
Upload only intended package outputs, not the complete workspace or certificate directory.
Keep Store submission separate from artifact upload.

Source: [WinApp CLI command reference](https://github.com/microsoft/WinAppCli/blob/main/docs/usage.md), checked 2026-09-05.
