---
name: asc-xcode-build
description: Build, archive, and export iOS/macOS apps with xcodebuild before uploading to App Store Connect. Use when you need to create an IPA or PKG for upload.
---

# Xcode Build and Export

Use this skill when you need to build an app from source and prepare it for upload to App Store Connect.

An archive/export request ends with the local artifact. Upload only when separately included in the authorized task, following [Authorization](../guide.md#authorization).

## Preconditions
- Xcode installed and command line tools configured
- Valid signing identity and provisioning profiles (or automatic signing enabled)

## iOS Build Flow

### 1. Archive
```bash
xcodebuild archive \
  -scheme "YourScheme" \
  -configuration Release \
  -archivePath /tmp/YourApp.xcarchive \
  -destination "generic/platform=iOS"
```

### 2. Export IPA
```bash
xcodebuild -exportArchive \
  -archivePath /tmp/YourApp.xcarchive \
  -exportPath /tmp/YourAppExport \
  -exportOptionsPlist ExportOptions.plist
```

A minimal `ExportOptions.plist` for App Store distribution:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store-connect</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
</dict>
</plist>
```

### Optional authorized upload with asc

Skip this step for a local build or export request.

```bash
asc builds upload --app "APP_ID" --ipa "/tmp/YourAppExport/YourApp.ipa"
```

## macOS Build Flow

### 1. Archive
```bash
xcodebuild archive \
  -scheme "YourMacScheme" \
  -configuration Release \
  -archivePath /tmp/YourMacApp.xcarchive \
  -destination "generic/platform=macOS"
```

### 2. Export PKG
```bash
xcodebuild -exportArchive \
  -archivePath /tmp/YourMacApp.xcarchive \
  -exportPath /tmp/YourMacAppExport \
  -exportOptionsPlist ExportOptions.plist
```

### Optional authorized PKG upload with asc

Skip this step for a local build or export request.

macOS apps export as `.pkg` files. Upload with `asc`:
```bash
asc builds upload \
  --app "APP_ID" \
  --pkg "/tmp/YourMacAppExport/YourApp.pkg" \
  --version "1.0.0" \
  --build-number "123"
```

Notes:
- `--pkg` automatically sets platform to `MAC_OS`.
- For `.pkg` uploads, `--version` and `--build-number` are required (they are not auto-extracted like IPA uploads).
- Add `--wait` if you want to wait for build processing to complete.

## Build Number Management

Each upload requires a unique build number higher than previously uploaded builds.

In Xcode project settings:
- `CURRENT_PROJECT_VERSION` - build number (e.g., "316")
- `MARKETING_VERSION` - version string (e.g., "2.2.0")

Check existing builds:
```bash
asc builds list --app "APP_ID" --platform IOS --limit 5
```

## Troubleshooting

### "No profiles for bundle ID" during export
- Inspect the selected team, signing settings, and available profiles.
- `-allowProvisioningUpdates` permits Xcode to update provisioning resources. Add it only when that account change is authorized, not as a default local-build workaround.
- Do not change the bundle ID, signing identity, or account just to make export succeed.

### Build rejected for missing icon (macOS)
macOS requires ICNS format icons with all sizes:
- 16x16, 32x32, 128x128, 256x256, 512x512 (1x and 2x)

### CFBundleVersion too low
The build number must be higher than any previously uploaded build. Increment `CURRENT_PROJECT_VERSION` and rebuild.

## Notes
- Follow the project's release build procedure; clean only when that procedure or a diagnosed stale-build problem requires it.
- Use `xcodebuild -showBuildSettings` to verify configuration
- For submission issues (encryption, content rights), see `../asc-submission-health/guide.md`
