---
name: asc-signing-setup
description: Set up bundle IDs, capabilities, signing certificates, and provisioning profiles with the asc cli. Use when onboarding a new app or rotating signing assets.
---

# asc signing setup

Use this skill when you need to create or renew signing assets for iOS/macOS apps.

Follow the [authorization boundary](../guide.md#authorization). Inspect existing assets first and change only the identified bundle IDs, capabilities, certificates, or profiles covered by the task. A signing error is not permission to change account resources.

## Preconditions
- Auth is configured (`asc auth login` or `ASC_*` env vars).
- You know the bundle identifier and target platform.
- You have a CSR file for certificate creation.

## Workflow
1. Create or find the bundle ID:
   - `asc bundle-ids list --paginate`
   - `asc bundle-ids create --identifier "com.example.app" --name "Example" --platform IOS`
2. Configure only the capabilities required by the app and authorized for this bundle ID:
   - `asc bundle-ids capabilities list --bundle "BUNDLE_ID"`
   - For an authorized iCloud capability, for example:
   - `asc bundle-ids capabilities add --bundle "BUNDLE_ID" --capability ICLOUD`
   - Add capability settings when required:
     - `--settings '[{"key":"ICLOUD_VERSION","options":[{"key":"XCODE_13","enabled":true}]}]'`
3. Create a signing certificate:
   - `asc certificates list --certificate-type IOS_DISTRIBUTION`
   - `asc certificates create --certificate-type IOS_DISTRIBUTION --csr "./cert.csr"`
4. Create a provisioning profile:
   - `asc profiles create --name "AppStore Profile" --profile-type IOS_APP_STORE --bundle "BUNDLE_ID" --certificate "CERT_ID"`
   - Include devices for development/ad-hoc:
     - `asc profiles create --name "Dev Profile" --profile-type IOS_APP_DEVELOPMENT --bundle "BUNDLE_ID" --certificate "CERT_ID" --device "DEVICE_ID"`
5. Download the profile:
   - `asc profiles download --id "PROFILE_ID" --output "./profiles/AppStore.mobileprovision"`

## Rotation and cleanup

A successful renewal does not authorize revoking old assets. Check their use by other apps, machines, and CI, and revoke or delete only the specific assets included in the authorized cleanup.

- Revoke old certificates:
  - `asc certificates revoke --id "CERT_ID" --confirm`
- Delete old profiles:
  - `asc profiles delete --id "PROFILE_ID" --confirm`

## Notes
- Always check `--help` for the exact enum values (certificate types, profile types).
- Use `--paginate` for large accounts.
- `--certificate` accepts comma-separated IDs when multiple certificates are required.
- Device management uses `asc devices` commands (UDID required).
