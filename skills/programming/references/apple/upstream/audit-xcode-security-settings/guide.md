---
name: audit-xcode-security-settings
description: Assess Xcode security build settings or apply authorized hardening.
---
# Xcode security settings

Use for a requested build-setting or entitlement assessment, or authorized hardening.
Network security, code signing, and privacy API reviews are separate tasks.

## Scope and completion

An audit-only request ends with findings and recommendations. Do not edit build settings, entitlements, or project membership.
Present a proposed change set in the conversation unless the user requests a persistent plan.
Creating a plan file or registering it in Xcode is itself a change; do not describe that as "nothing modified."

For hardening, establish the target settings and configurations covered by authorization.
Do not ask for repeated approval of already authorized operations.
Ask when a proposed change expands scope, conflicts with a deliberate override, or requires a consequential compatibility decision.
Report final effective settings, relevant build or runtime evidence, and unresolved limits.

## Tools and project paths

Prefer available Xcode project-scoped tools for project members and build settings.
Discover registered tool names and schemas instead of assuming an MCP prefix or a fixed tool set.
Use supported alternatives when they preserve project scope and semantics.

- `XcodeGlob`, `XcodeGrep`, `XcodeRead`, `XcodeLS`, and `XcodeUpdate` use workspace-relative paths, not repository-relative paths.
- `.xcodeproj` and `.xcworkspace` bundles may not be indexed as project members. An empty project-tool glob does not prove the project is absent.
- For bundle-internal files such as `project.pbxproj`, use the resolved filesystem path when project tools do not expose them.
- Use `XcodeListTargets` for target identities and product types when available.
- Resolve each target's entitlements from its evaluated `CODE_SIGN_ENTITLEMENTS`, not a guessed path or an arbitrary glob result. Targets can share an entitlements file.
- Prefer `AddEntitlement` for supported additions and updates. It cannot remove keys; do not treat an unsupported removal as successful.
- Use the project's existing xcconfig or build-setting mechanism. For generated projects, edit the maintained input.

## Assess the current configuration

1. Read relevant existing security decisions and identify the requested targets and configurations.
2. Determine compiled languages. Include Objective-C++ when `.mm` files or project language overrides select it; filenames alone are not authoritative.
3. Collect evaluated settings, explicit overrides, and source locations using [Reading build settings](references/reading-build-settings.md). Reuse this evidence until the project or relevant configuration changes.
4. Classify targets using the product-type and platform lists in [Enhanced Security](references/enhanced-security.md) and [library distribution](references/universal-binaries-for-libraries.md). Skip aggregate targets. Distinguish supported executables, build-settings-only targets, libraries, and unsupported targets.
5. Compare applicable settings with the [settings reference](references/security-settings-reference.md). Distinguish inherited defaults, explicit disabled values, and already configured protections.

For supported executable targets, inspect the resolved entitlements and distinguish complete, partial, disabled, and missing-file states.
Libraries do not receive executable entitlements. DriverKit support is build-settings-only.
Check binary dependencies for architecture compatibility before recommending pointer authentication changes.

Report deliberate overrides with their known rationale. Group unresolved questions by decision rather than requiring a separate prompt per setting.
A simulator-only pointer-authentication opt-out is not evidence that device protection is disabled.
If everything requested is already configured, report that result without manufacturing a plan or diff.

## Apply authorized changes

Use the settings reference for exact values and language applicability rather than maintaining a second setting list here.

| Change | Reference and limits |
| --- | --- |
| Enhanced Security capability | [Build settings and entitlements](references/enhanced-security.md); preserve existing explicit overrides unless their change is authorized. |
| Pointer authentication | [Platform and binary compatibility](references/pointer-authentication.md); an incompatible binary dependency can require a target-level exception rather than disabling the whole capability. |
| Distributed libraries and frameworks | [Universal-binary recipe](references/universal-binaries-for-libraries.md); preserve supported architectures and verify the produced artifact. |
| Compiler, analyzer, and clang-tidy diagnostics | [Settings reference](references/security-settings-reference.md); analyzer diagnostics require an analysis run, not merely a normal build. |
| Additional diagnostics | [Additional settings](references/additional-settings.md); enable only the selected scope, accounting for noise and false positives. |
| Hardware memory tagging | [Hardware support and rollout](references/hardware-memory-tagging.md); do not silently enable default-off options. |

For project-level settings, use an available supported mechanism.
If the necessary operation can only be performed in Xcode, explain that specific manual step.
Verify the effective project-level value and target inheritance afterward; a grep match anywhere in `project.pbxproj` does not establish the setting's scope.
If the value still differs, diagnose the discrepancy or report the blocker rather than loop on the same confirmation.

Read the relevant protection detail when its behavior affects the change:

- [Compiler warnings](references/security-compiler-warnings.md)
- [C++ hardening](references/cpp-hardening.md)
- [Typed allocators](references/typed-allocators.md)
- [Stack initialization](references/stack-zero-init.md)
- [Read-only platform memory](references/readonly-platform-memory.md)
- [Runtime restrictions](references/runtime-restrictions.md)

Annotation-based C or C++ bounds-safety adoption is separate source work.
For an authorized C adoption, read [C bounds safety](../adopt-c-bounds-safety/guide.md).
For C++ adoption, consult the [Clang safe-buffer guide](https://clang.llvm.org/docs/SafeBuffers.html).

## Validate and report

Re-read changed effective settings and entitlements for the affected configurations.
Use the relevant portions of the [adoption strategy](references/adoption-strategy.md) to check build diagnostics and runtime protections.
Do not equate successful setting edits with a working hardened build.
Correct failures caused by the authorized change when within scope; report unavailable build, hardware, or runtime evidence.

Separate applied, already active, deferred, and unsupported outcomes.
For authorized persistent documentation, use [Decision records](references/decision-document.md).
Otherwise return the findings without creating or registering project files.
