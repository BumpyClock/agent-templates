# Changelog

## Unreleased

### Added

- Back up replaced files, directories, and symlinks for every supported tool, shared links, and skill migrations.
- Keep the newest five backups per destination in `~/.agent-templates/backups/`, outside tool discovery and this repository.
- Restore originals when link creation fails and reconcile interrupted backup retention on reruns.
- Import shareable Pi configuration and the latest 46 model definitions. Reference private connection values through environment variables.
- Add public-config checks that reject literal credentials, private endpoint URLs, and machine-local Pi state.

### Verification

- Linker suite passed all 24 tests on macOS and Boat Linux. TypeScript checking passed on Boat Linux.
- Public Pi configuration passed the privacy check and all nine checker tests.
- Native Windows behavior was not tested. No live home-directory links were changed during verification.
