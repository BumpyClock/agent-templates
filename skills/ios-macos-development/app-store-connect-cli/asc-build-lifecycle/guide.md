---
name: asc-build-lifecycle
description: Track build processing, find latest builds, and clean up old builds with asc. Use when managing build retention or waiting on processing.
---

# asc build lifecycle

Use this skill to manage build state, processing, and retention.

Follow the [authorization boundary](../guide.md#authorization). A lookup or processing-status request is read-only; distribution and expiration are separate operations.

## Find the right build
- Latest build:
  - `asc builds latest --app "APP_ID" --version "1.2.3" --platform IOS`
- Recent builds:
  - `asc builds list --app "APP_ID" --sort -uploadedDate --limit 10`

## Inspect processing state
- `asc builds info --build "BUILD_ID"`

## Distribution flows

Use these only when the requested scope includes their full distribution or submission effects.

- Prefer end-to-end:
  - `asc publish testflight --app "APP_ID" --ipa "./app.ipa" --group "GROUP_ID" --wait`
  - `asc publish appstore --app "APP_ID" --ipa "./app.ipa" --version "1.2.3" --wait --submit --confirm`

## Cleanup

Select a retention window from the approved policy, preview affected builds, and apply expiration only when that set is authorized. Do not invent an age cutoff during a status check.

- Preview expiration:
  - `asc builds expire-all --app "APP_ID" --older-than "<APPROVED_RETENTION_WINDOW>" --dry-run`
- Apply expiration:
  - `asc builds expire-all --app "APP_ID" --older-than "<APPROVED_RETENTION_WINDOW>" --confirm`
- Single build:
  - `asc builds expire --build "BUILD_ID"`

## Notes
- `asc builds upload` transfers a build without requesting the full distribution/submission flow. It is still a remote mutation. Use `asc publish` only for an authorized end-to-end flow.
- For long processing times, use `--wait`, `--poll-interval`, and `--timeout` where supported.
