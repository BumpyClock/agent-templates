# Agent Templates

AI agent configurations, prompts, skills, and personalities for:
- Claude Code / Claude Agents
- Codex
- GitHub Copilot
- OpenCode
- Pi
- Cursor

## Quick Start

```bash
git clone https://github.com/BumpyClock/agent-templates.git ~/Projects/agent-templates
cd agent-templates

# macOS/Linux
./bootstrap.sh

# Windows (PowerShell)
.\bootstrap.ps1
```

## Repository Layout

```
agent-templates/
├── prompts/              # Claude commands and prompts
├── skills/               # Agent skills and capabilities
├── agents-archive/       # Historical agent definitions
├── agent-hooks/          # Agent lifecycle hooks
├── agent-templates/      # Agent compilation templates
├── codex_configs/        # Codex-specific configurations
├── personalities/        # Agent personality definitions
├── scripts/              # Installation and linking scripts
│   └── link-agent-templates.ts
├── bootstrap.sh          # Unix/macOS bootstrap
├── bootstrap.ps1         # Windows PowerShell bootstrap
├── AGENTS.md             # Agent documentation
└── AGENTS.local.md       # Local agent overrides
```

## Linking

The `link-agent-templates.ts` script creates symlinks from this repo to the appropriate locations:

- **Claude**: `~/.claude/commands`, `~/.claude/skills`, `~/.claude/docs`, etc. Skills link one per skill, so grouped skills (`skills/pstack/unslop`) appear flat as `~/.claude/skills/unslop`. Group dirs are any `skills/<group>/` without a `SKILL.md`.
- **Codex**: `~/.codex/prompts`, `~/.codex/skills`, `~/.codex/agents`, etc.
- **Copilot**: `~/.copilot/prompts`, `~/.copilot/skills`, etc. Copilot discovers nested skills, so skill groups retain their source layout, such as `~/.copilot/skills/pstack/technical-writing`. This preserves relative references between skills. Re-linking removes obsolete flat links into this repo and preserves unrelated local skills. A conflicting real file or directory stops skill linking instead of being replaced.
- **OpenCode**: `~/.config/opencode/...`
- **Pi**: `~/.pi/agent/...`
- **Cursor**: `~/.cursor/skills` (one symlink per skill, same flat layout as Claude). This is the user-level directory Cursor loads and syncs to Cloud Agents.

### Backups for every tool

Before replacing a file, directory, or changed symlink, the linker saves it under
`~/.agent-templates/backups/`. This applies to every tool, shared `.agents` links,
whole-tree skill migrations, and stale managed skill links.

Each destination has its own history. The linker keeps the newest five successful
backups per destination and removes older backups after a successful replacement.
Missing destinations and already-correct links do not create backups. Real skill
file or directory conflicts still stop linking without replacing local content.

Each numbered backup contains `entry` and `target.json`. The metadata records the
original destination and backup time. Files and directories are moved intact.
Symlinks are saved as links, without following them or snapshotting their targets.
Relative symlink backups may appear broken until restored to the original path.
Backup directories use owner-only permissions on POSIX and stay outside this repo
and tool discovery directories. Backups can contain private configuration.

If saving a backup fails, the linker leaves that destination untouched. If link
creation fails, it restores the original and does not prune successful backups.
If the process stops after saving a backup, that backup remains available on retry.
The linker prints each saved path. To restore, stop the affected tool, remove the
current managed link itself, then move the chosen `entry` to the destination in
its `target.json`. Do not copy backup contents into this public repo.

Run the linker tests without changing your real home directory:

```bash
cd scripts/link-agent-templates
bun test
```

### Pi configuration

`.pi/agent/` contains the shareable settings, model catalog, extensions, themes,
cloak configuration, and prompt files copied from dotfiles. The Pi linker only
links settings, models, cloak, extensions, themes, instructions, and compiled
agents. It does not activate `SYSTEM.md`, `APPEND_SYSTEM.md`, or archived extensions.
Copying this directory does not change existing links or the live models file.

The shared `models.json` contains `modelOverrides`, keyed by the exact model ID.
It preserves the curated names, prices, context limits, and thinking maps without
connection fields or credentials. Pi applies these overrides after the CLIProxyAPI
extension registers its discovered models. Overrides do not add unavailable models.

The CLIProxyAPI package declared in `settings.json` supplies the API, connection,
and discovered catalog. Configure the machine-local `~/.pi/agent/cliproxyapi.json`
with the base URL and use `/login cliproxyapi` for credentials stored in local
`auth.json`. The extension also accepts an `apiKey` in its local config.
Environment variables are optional and take precedence when present.

The extension writes `cliproxyapi-models.json` as a generated cache. Do not edit or
sync that cache. Run `/cliproxyapi-refresh` in Pi after proxy changes to replace it.
The proxy supplies the `GH ` Copilot names; local `modelOverrides.name` can also
customize a display name. Routing IDs such as `copilot/gpt-6.1-sol` stay unchanged.

Keep `auth.json`, `cliproxyapi.json`, model caches, and backups machine-local.
These paths are gitignored. Never copy a raw live models file into this repo.

Before committing Pi config, run:

```bash
python3 scripts/check-pi-public.py
python3 scripts/check-pi-public.test.py
```

The check rejects literal connection fields in JSON, credential-reading commands,
known secret formats, machine-local state, symlinks, and URLs outside the reviewed
public allowlist. It prints locations, not suspect values. Review new source
constants too; pattern checks cannot prove the absence of every possible secret.

### Standalone principles

The 23 `principle-*` skills under `skills/pstack/` are independently discoverable.
They no longer live inside `programming` as reference files or embedded sections.
The linker exposes each principle by its directory name, such as `principle-model-the-domain`.
Copilot keeps these directories under `pstack`; Claude and Cursor expose them at the skill root.
Programming workflows link to the relevant principle without loading the complete set.

These skills preserve local guidance and incorporate applicable upstream changes.
[The attribution record](skills/pstack/attribution.txt) identifies the reviewed revision and local differences.
Run the linker after adding these skills to expose them to installed tools.

## Platform Support

- **macOS**: Full support (Homebrew + zsh)
- **Linux**: Full support (distro-specific packages + zsh/bash)
- **Windows**: Full support (PowerShell)

## Integration with Dotfiles

This repo is designed to work alongside your system dotfiles:
- Install system configs first (shell, tools, etc.) via `dotfiles` repo
- Then install AI agent configs via this `agent-templates` repo
- Both repos can be synced independently across machines

## Updates

To pull latest changes and re-link:

```bash
cd ~/Projects/agent-templates
git pull
bun scripts/link-agent-templates/link-agent-templates.ts --setup all
```

## License

MIT
