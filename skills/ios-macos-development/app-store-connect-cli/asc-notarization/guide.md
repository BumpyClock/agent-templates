---
name: asc-notarization
description: Archive, export, and notarize macOS apps using xcodebuild and asc. Use when you need to prepare a macOS app for distribution outside the App Store with Developer ID signing and Apple notarization.
---

# macOS Notarization

Use this skill when you need to notarize a macOS app for distribution outside the App Store.

Follow the [authorization boundary](../guide.md#authorization). Preflight and signature inspection are read-only. Certificate creation, trust-setting changes, re-signing, and notarization uploads require authority for those specific effects.

## Preconditions
- Xcode installed and command line tools configured.
- Auth is configured (`asc auth login` or `ASC_*` env vars).
- A Developer ID Application certificate in the local keychain.
- The app's Xcode project builds for macOS.

## Preflight: Verify Signing Identity

Before archiving, confirm a valid Developer ID Application identity exists:

```bash
security find-identity -v -p codesigning | grep "Developer ID Application"
```

If no identity is found, report the missing signing prerequisite. When certificate creation is authorized, use https://developer.apple.com/account/resources/certificates/add. The App Store Connect API does not support creating Developer ID certificates.

### Inspect trust settings

If `codesign` or `xcodebuild` fails with "Invalid trust settings" or "errSecInternalComponent", the certificate may have custom trust overrides that break the chain:

```bash
# Check for custom trust settings
security dump-trust-settings 2>&1 | grep -A1 "Developer ID"
```

An override's presence is not permission to remove it. Confirm that it causes the failure and identify the exact certificate before proposing a repair.

### Verify Certificate Chain

Inspect and verify the intended existing app without re-signing it:

```bash
codesign -dvvv "${APP_PATH:?Set the intended app bundle path}" 2>&1
codesign --verify --strict --verbose=2 "$APP_PATH"
```

Check the displayed authorities and verification result. Do not use `codesign --force --sign` as a diagnostic check; it replaces the app's signature.

## Authorized trust repair

If removing a specific trust override is explicitly authorized, export the selected certificate using its exact identity and verify the exported certificate:

```bash
security find-certificate -c "${CERTIFICATE_NAME:?Set the verified certificate identity}" \
  -p ~/Library/Keychains/login.keychain-db > ./devid-cert.pem
```

Then remove only the authorized override:

```bash
security remove-trusted-cert ./devid-cert.pem
```

## Step 1: Archive

```bash
xcodebuild archive \
  -scheme "YourMacScheme" \
  -configuration Release \
  -archivePath /tmp/YourApp.xcarchive \
  -destination "generic/platform=macOS"
```

## Step 2: Export with Developer ID

Create an ExportOptions plist for Developer ID distribution:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>developer-id</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
</dict>
</plist>
```

Export the archive:

```bash
xcodebuild -exportArchive \
  -archivePath /tmp/YourApp.xcarchive \
  -exportPath /tmp/YourAppExport \
  -exportOptionsPlist ExportOptions.plist
```

This produces a `.app` bundle signed with Developer ID Application and a secure timestamp.

### Verify the Export

```bash
codesign -dvvv "/tmp/YourAppExport/YourApp.app" 2>&1 | grep -E "Authority|Timestamp"
```

Confirm:
- Authority chain starts with "Developer ID Application"
- A Timestamp is present

## Step 3: Create a ZIP for Notarization

```bash
ditto -c -k --keepParent "/tmp/YourAppExport/YourApp.app" "/tmp/YourAppExport/YourApp.zip"
```

## Step 4: Submit for Notarization

This uploads the artifact to Apple. Stop before this step for a local archive, export, or preflight-only request.

### Fire-and-forget
```bash
asc notarization submit --file "/tmp/YourAppExport/YourApp.zip"
```

### Wait for result
```bash
asc notarization submit --file "/tmp/YourAppExport/YourApp.zip" --wait
```

### Custom polling
```bash
asc notarization submit --file "/tmp/YourAppExport/YourApp.zip" --wait --poll-interval 30s --timeout 1h
```

## Step 5: Check Results

### Status
```bash
asc notarization status --id "SUBMISSION_ID" --output table
```

### Developer Log (for failures)
```bash
asc notarization log --id "SUBMISSION_ID"
```

Fetch the log URL to see detailed issues:
```bash
curl -sL "LOG_URL" | python3 -m json.tool
```

### List Previous Submissions
```bash
asc notarization list --output table
asc notarization list --limit 5 --output table
```

## Step 6: Staple (Optional)

After notarization succeeds, staple the ticket so the app works offline:

```bash
xcrun stapler staple "/tmp/YourAppExport/YourApp.app"
```

For DMG or PKG distribution, staple after creating the container:
```bash
# Create DMG
hdiutil create -volname "YourApp" -srcfolder "/tmp/YourAppExport/YourApp.app" -ov -format UDZO "/tmp/YourApp.dmg"
xcrun stapler staple "/tmp/YourApp.dmg"
```

## Supported File Formats

| Format | Use Case |
|--------|----------|
| `.zip`  | Simplest; zip a signed `.app` bundle |
| `.dmg`  | Disk image for drag-and-drop install |
| `.pkg`  | Installer package (requires Developer ID Installer certificate) |

## PKG Notarization

To notarize `.pkg` files, you need a **Developer ID Installer** certificate, separate from Developer ID Application. If it is missing, report the prerequisite. Creating it at https://developer.apple.com/account/resources/certificates/add requires the corresponding account authority.

Sign the package:
```bash
productsign --sign "Developer ID Installer: YOUR NAME (TEAM_ID)" unsigned.pkg signed.pkg
```

Then submit:
```bash
asc notarization submit --file signed.pkg --wait
```

## Troubleshooting

### "Invalid trust settings" during export
Inspect the certificate and trust settings using the preflight section. If an override is the cause, follow [Authorized trust repair](#authorized-trust-repair) rather than removing trust settings automatically.

### "The binary is not signed with a valid Developer ID certificate"
The app was signed with a Development or App Store certificate. Re-export with `method: developer-id` in ExportOptions.plist.

### "The signature does not include a secure timestamp"
Add `--timestamp` to manual `codesign` calls, or use `xcodebuild -exportArchive` which adds timestamps automatically.

### Upload timeout for large files
Set a longer upload timeout:
```bash
ASC_UPLOAD_TIMEOUT=5m asc notarization submit --file ./LargeApp.zip --wait
```

### Notarization returns "Invalid" but signing looks correct
Fetch the developer log for specific issues:
```bash
asc notarization log --id "SUBMISSION_ID"
```

Common causes: unsigned nested binaries, missing hardened runtime, embedded libraries without timestamps.

## Notes
- The `asc notarization` commands use the Apple Notary API v2, not `xcrun notarytool`.
- Authentication uses the same API key as other `asc` commands.
- Files are uploaded directly to Apple's S3 bucket with streaming (no full-file buffering).
- Files over 5 GB use multipart upload automatically.
- Always use `--help` to verify flags: `asc notarization submit --help`.
