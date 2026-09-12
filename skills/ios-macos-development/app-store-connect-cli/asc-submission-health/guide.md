---
name: asc-submission-health
description: Preflight App Store submissions, submit builds, and monitor review status with asc. Use when shipping or troubleshooting review submissions.
---

# asc submission health

Use this skill to reduce review submission failures and monitor status.

Preflight is read-only. Report missing metadata, unresolved declarations, and processing state without changing them.
Apply the [authorization boundary](../guide.md#authorization) before correcting declarations, rebuilding, submitting, canceling, or publishing.

## Preconditions
- Authenticated access and the intended app/version/build IDs are available.
- For a mutation, the requested operation and accurate, owner-confirmed values are established. If consequential facts or authority are missing, stop at the finding.

## Read-only preflight

### 1. Verify Build Status
```bash
asc builds info --build "BUILD_ID"
```
Check:
- `processingState` is `VALID`
- `usesNonExemptEncryption` agrees with the app's actual encryption use and the owner-confirmed classification.
- If the build is still processing, report that state or wait within the requested monitoring scope. Do not submit it.

### 2. Encryption Compliance
Inspect encryption use in the app and bundled dependencies, the build's declaration, and available owner-confirmed compliance information.
For nonexempt encryption, inspect the required declaration and documentation:

```bash
asc encryption declarations list --app "APP_ID"
```

`ITSAppUsesNonExemptEncryption = NO` is appropriate only when the app actually qualifies for that declaration. It is not a workaround for missing approval.
If classification is uncertain, obtain the owner's compliance decision using current Apple guidance rather than infer exemption from a submission error or a generic HTTPS example.

### 3. Content Rights Declaration
Required for all App Store submissions:
```bash
# Check current status
asc apps get --id "APP_ID" --output json | jq '.data.attributes.contentRightsDeclaration'
```
Valid values:
- `DOES_NOT_USE_THIRD_PARTY_CONTENT`
- `USES_THIRD_PARTY_CONTENT`

Determine which value is accurate from the app's content and owner-confirmed rights. A missing value is a finding, not permission to choose the first enum.

### 4. Version Metadata
```bash
# Check version details
asc versions get --version-id "VERSION_ID" --include-build
```

Check copyright and release behavior against the owner's actual declarations and intended release policy. Do not fill missing metadata with sample text.

### 5. Localizations Complete
```bash
# List version localizations
asc localizations list --version "VERSION_ID"

# Check required fields: description, keywords, whatsNew, supportUrl
```

### 6. Screenshots Present
Each locale needs screenshots for the target platform.

### 7. App Info Localizations (Privacy Policy)
```bash
# List app info IDs (if multiple exist)
asc app-infos list --app "APP_ID"

# Check privacy policy URL
asc localizations list --app "APP_ID" --type app-info --app-info "APP_INFO_ID"
```

## Authorized corrections

Use these commands only when the correction is authorized and all declaration values have been resolved from actual app facts and owner-confirmed decisions. The required variables have no defaults.

### Encryption declaration

```bash
asc encryption declarations create \
  --app "APP_ID" \
  --app-description "${ENCRYPTION_DESCRIPTION:?Set the owner-confirmed encryption description}" \
  --contains-proprietary-cryptography="${CONTAINS_PROPRIETARY_CRYPTOGRAPHY:?Set the confirmed true or false value}" \
  --contains-third-party-cryptography="${CONTAINS_THIRD_PARTY_CRYPTOGRAPHY:?Set the confirmed true or false value}" \
  --available-on-french-store="${AVAILABLE_ON_FRENCH_STORE:?Set the confirmed true or false value}"
```

Assign the verified declaration to the intended build when authorized:

```bash
asc encryption declarations assign-builds \
  --id "DECLARATION_ID" \
  --build "BUILD_ID"
```

If the binary's declaration is wrong, correct it and rebuild only within the authorized scope. A genuinely nonexempt app still needs the applicable compliance process.

### Content rights and copyright

```bash
asc apps update --id "APP_ID" \
  --content-rights "${CONTENT_RIGHTS_DECLARATION:?Set the owner-confirmed content-rights value}"
```

```bash
asc versions update --version-id "VERSION_ID" \
  --copyright "${COPYRIGHT_DECLARATION:?Set the owner-confirmed copyright}"
```

Read back changed fields to verify the intended result. Correcting metadata does not itself authorize submission.

## Submit

Submit only after preflight is satisfied and authorization covers the selected app, version, build, and release behavior. `--confirm` is a CLI safeguard, not a substitute for that authority.

### Using Review Submissions API (Recommended)
```bash
# Create submission
asc review submissions-create --app "APP_ID" --platform IOS

# Add version to submission
asc review items-add \
  --submission "SUBMISSION_ID" \
  --item-type appStoreVersions \
  --item-id "VERSION_ID"

# Submit for review
asc review submissions-submit --id "SUBMISSION_ID" --confirm
```

### Using Submit Command
```bash
asc submit create --app "APP_ID" --version "1.2.3" --build "BUILD_ID" --confirm
```
Use `--platform` when multiple platforms exist.

## Monitor
```bash
# Check submission status
asc submit status --id "SUBMISSION_ID"
asc submit status --version-id "VERSION_ID"

# List all submissions
asc review submissions-list --app "APP_ID" --paginate
```

## Cancel / Retry

Use status commands first. Cancel or retry only within the authorized release scope; an uncertain response is not evidence that a submission failed.

```bash
# Cancel submission
asc submit cancel --id "SUBMISSION_ID" --confirm

# Or via review API
asc review submissions-cancel --id "SUBMISSION_ID" --confirm
```
After an authorized correction, check existing submission state before retrying to avoid duplicate actions.

## Common Submission Errors

### "Version is not in valid state"
Check:
1. Build is attached and VALID
2. Encryption declaration approved (or exempt)
3. Content rights declaration set
4. All localizations complete
5. Screenshots present for all locales

### "Export compliance must be approved"
Inspect the build's encryption classification and required documentation.
- If the app uses nonexempt encryption, resolve the applicable declaration and approval process within the authorized scope.
- If the declaration is factually wrong, obtain the owner's confirmed correction before changing it or rebuilding.
- If facts or approval remain missing, report the blocker. Do not set an exemption just to clear the error.

### "Multiple app infos found"
Use `--app-info` flag with the correct app info ID:
```bash
asc app-infos list --app "APP_ID"
```

## Notes
- `asc submit create` uses the new reviewSubmissions API automatically.
- Use `--output table` when you want human-readable status.
- macOS submissions follow the same process but use `--platform MAC_OS`.
