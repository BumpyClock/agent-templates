# Decision Document

Use when the requested work includes a persistent security decision record.
Follow the repository's documentation location and format; use `xcode-security-settings.md` only when establishing a new record is in scope.
An audit-only request does not require creating this file or adding it to the Xcode project.

## Step 1: Locate or Create the File

Use the existing decision record or the path agreed for this task.
Choose a write mechanism that preserves the intended project membership. `XcodeWrite` registers a new file in the project as well as writing it, so use it only when that registration is wanted.

1. If a record exists, preserve its organization.
2. Otherwise, create it at the authorized path using the structure below when no repository template applies.

## Step 2: Merge Decisions

If an existing document was found, its content is already known. Preserve all user-added content, custom notes, and section organization.

For each setting considered in this run:

- **New entry** (setting not in document) — add to the appropriate section.
- **Status unchanged** — leave the entry untouched.
- **Status changed** (e.g., moved from Deferred to Enabled) — move the entry to the correct section. Preserve the old rationale as context (e.g., "Previously deferred because too noisy. Now enabled after codebase cleanup.").

Never remove entries. The document is append/update only.

Sections:
- **Enabled settings** — settings that are active.
- **Disabled settings** — settings the team decided not to adopt. Always include rationale explaining why.
- **Deferred** — settings considered but not yet enabled. Always include rationale explaining what would need to change.

## Step 3: Write the File

Write through the mechanism selected above and report the actual path and changes.

## Document Structure

Use this layout for new files. If the file already exists, follow its existing style.

```markdown
# Xcode Security Settings

Security build settings decisions for [ProjectName].

## Enabled settings

- `GCC_WARN_ABOUT_RETURN_TYPE` to `YES_ERROR`
- `GCC_WARN_UNINITIALIZED_AUTOS` to `YES_AGGRESSIVE`
- `ENABLE_ENHANCED_SECURITY`

## Disabled settings

- `GCC_WARN_SIGN_COMPARE`: A lot of `for` loops trigger this.
  The team decided to not adopt this warning because it would involve too many changes.

## Deferred

Settings considered but not yet enabled. Revisit them later.

- `CLANG_WARN_ASSIGN_ENUM`: The findings seem relevant.
- `CLANG_WARN_SUSPICIOUS_IMPLICIT_CONVERSION`:
  Too noisy with current generated code.
  Revisit after generated code is excluded from analysis.
- `ENABLE_C_BOUNDS_SAFETY`:
  Requires annotation-based programming model.
  It needs careful adoption planning.
```

Entry format: "- `SETTING_NAME` [to `VALUE`]: Rationale"

Omit the `to VALUE` part for settings that are enabled, unless we have some relevant rationale to state.
For example, if the setting was disabled in the past, we can mention that and why it was enabled now.
Usually, disabled settings or deferred settings need explanation.
