# Worktree and simulator cleanup

**You own the disk and the safety gate.** When the user asks to reclaim space, audit merged or abandoned git worktrees and stale iOS simulators. Deletion is irreversible. Pause for authorization before deleting user state and never remove something in use or holding uncommitted work.

1. Snapshot and audit. Record `df -h /` (or the platform equivalent). Run `scripts/worktree-audit.sh` when available; otherwise inventory from `git worktree list --porcelain`, never a hand-typed folder glob. Classify each path by size, age, merge state, uncommitted work, PR state, and recent chat usage. An audit script's `safe` label is advice, not permission.
2. If you cannot establish whether a tree is active, hold it back. Review recent transcripts in subagents if available; do not treat missing transcript names as proof of disuse.
3. Check irreversible loss. Show the diff for tracked uncommitted edits (`wip:N`) and ask what to keep. List untracked files (`scratch:N`) and confirm they are disposable. Branch refs may survive removal, but uncommitted and untracked changes do not.
4. Prune only authorized, confirmed paths from the inventory. Use `git worktree remove <path>` for clean trees. Use `--force` only with explicit permission to lose the remaining files. If ignored build artifacts leave a directory, verify its canonical path is the intended worktree before any `rm -rf`; then run `git worktree prune`. Confirm with `df -h /` and a fresh worktree list.
5. With explicit deletion authority, inspect stale simulators separately before `xcrun simctl --set testing delete all` (XCTestDevices clones), `xcrun simctl delete unavailable`, or `xcrun simctl runtime delete <id>` for a runtime identified with `xcrun simctl runtime list`. Other candidates include Xcode `DerivedData` and `iOS DeviceSupport`, Cursor backups and snapshots, and package caches. Clear only items that are safe to discard and that the user has not asked to keep.

The audit and in-use check are the review for a task with no code diff to catch a mistake. **Reply** with space before and after, space reclaimed, each pruned worktree, and one-line reasons for everything held back.
