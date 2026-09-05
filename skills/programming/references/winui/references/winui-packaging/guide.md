---
name: winui-packaging
description: Prepare WinUI MSIX packages, certificates, CI artifacts, or Store submissions.
---

# WinUI Distribution

Separate artifact creation, certificate trust, installation, and publication.
A package request does not itself authorize machine trust changes or Store submission.
Preserve package identity, target architecture, and the intended distribution channel.

## Build and package

Use the repository release build.
For required analyzer coverage, configure the analyzer in the project or CI rather than assume the development wrapper is present.

The sibling [BuildAndRun.ps1](../winui-dev-workflow/BuildAndRun.ps1) supports `--no-launch`, but project-mode execution can still register a development package.
Use a build-only command when registration is outside scope.

Use the actual output layout and installed CLI help to select package options:

```powershell
winapp --help
winapp sign --help
```

For NativeAOT or source generator changes, consult [source generator patterns](references/sourcegen-patterns.md).
For command examples, CI artifact boundaries, or package failures, consult [package examples](references/package-examples.md).
A self-contained package includes runtime components, but still requires the target OS and architecture.

## Certificates and installation

Match the certificate subject to manifest `Identity.Publisher`.
Use a development certificate only for local test distribution.
Protect private keys and passwords through the repository secret mechanism.

Certificate installation changes machine trust and can require elevation.
Ask before that operation unless the user has explicitly authorized it.
Do not combine certificate generation and trust installation for convenience.
Do not overwrite certificates or remove installed packages as a generic repair.
Identify the certificate, package, data impact, and requested operation first.

For production signatures, use the approved certificate and timestamp service.
Validate the signature and identity of the resulting artifact before distribution.

## CI and Store

Preserve existing release controls and the approved CI dependency policy.
Keep build, artifact upload, and Store publication as separate decisions.

Store submission is available through Partner Center and the first-party Microsoft Store Developer CLI.
Use current [MSIX command documentation](https://learn.microsoft.com/en-us/windows/apps/publish/msstore-dev-cli/commands) for account and submission operations.
Check current channel requirements for metadata and images instead of reusing a fixed screenshot-size rule.

Submit only when the user requests publication for the identified app and artifact.
Report whether an artifact was built, signed, installed, uploaded, or submitted. These outcomes are not equivalent.

## Sources

- [WinApp CLI commands](https://github.com/microsoft/WinAppCli/blob/main/docs/usage.md)
- [MSIX package signing](https://learn.microsoft.com/en-us/windows/msix/package/signing-package-overview)
