---
name: app-store-connect-cli
description: Umbrella index for App Store Connect automation skills. Use this entrypoint to route requests to the most specific `asc-*` skill under this directory.
---

# App Store Connect CLI Skill Index

Use this guide as the router when a task involves App Store Connect, TestFlight, App Store submission, signing, metadata, screenshots, pricing, or `asc` commands.

## Authorization

Preflight, status checks, and review requests are read-only. A local build, archive, export, or screenshot request does not authorize uploads, distribution, submission, account changes, or publishing metadata.

Run mutations only for the verified app, version, build, groups, territories, and operation covered by the user's request or established release policy. Credentials and CLI flags such as `--confirm` establish neither that scope nor approval. Honor already-authorized work without repeated approval; stop for missing consequential facts or authority.

Command examples are not product or account defaults. Resolve placeholders and use accurate, owner-confirmed encryption, content-rights, copyright, pricing, and release declarations. Never change a declaration merely to pass a check.

## Skill routing (`read_when` hints)
- `asc-cli-usage/guide.md` - `read_when`: You need `asc` command discovery, flags, auth, output formats, or pagination behavior.
- `asc-id-resolver/guide.md` - `read_when`: You have names but need concrete App Store Connect IDs (apps, builds, versions, groups, testers).
- `asc-signing-setup/guide.md` - `read_when`: You are creating or updating bundle IDs, capabilities, certificates, or provisioning profiles.
- `asc-xcode-build/guide.md` - `read_when`: You need to archive/export iOS or macOS artifacts (`.ipa`/`.pkg`) before upload.
- `asc-build-lifecycle/guide.md` - `read_when`: You need latest-build lookup, processing-state tracking, or old-build cleanup.
- `asc-release-flow/guide.md` - `read_when`: You need end-to-end release steps for TestFlight or App Store.
- `asc-testflight-orchestration/guide.md` - `read_when`: You need to manage TestFlight groups, testers, rollout, or What-to-Test notes.
- `asc-submission-health/guide.md` - `read_when`: You need submission preflight, submission actions, or review-status troubleshooting.
- `asc-metadata-sync/guide.md` - `read_when`: You need metadata/localization sync, validation, or format migration.
- `asc-subscription-localization/guide.md` - `read_when`: You need bulk localization for subscription/IAP display names across locales.
- `asc-ppp-pricing/guide.md` - `read_when`: You need country-specific subscription/IAP pricing with PPP logic.
- `asc-shots-pipeline/guide.md` - `read_when`: You need automated screenshot capture, framing, and upload pipeline.
- `asc-notarization/guide.md` - `read_when`: You need macOS Developer ID signing + notarization for distribution outside the Mac App Store.
- `asc-workflow/guide.md` - `read_when`: You need multi-step lane-style automation with `.asc/workflow.json`.
- `asc-app-create-ui/guide.md` - `read_when`: You need to create a new App Store Connect app record via UI automation.

## Related prompts
- `/testflight-release` - `read_when`: You need to generate release notes from git history and push builds to external TestFlight testers. This is a slash-command prompt, not a nested guide.

## Composition guidance
- Start with one domain guide; add `asc-cli-usage` if command syntax/flags are unclear.
- Add `asc-id-resolver` whenever downstream commands require IDs.
- For local artifacts, use `asc-xcode-build`. For an authorized release, use `asc-release-flow` and the relevant preflight checks from `asc-submission-health`; stop at the requested stage.
