# AGENTS.md

This repo (`agent-templates`) holds AI agent configurations — prompts, skills, agent definitions, and personalities — that get symlinked into multiple AI tools (Claude Code, Codex, Copilot, OpenCode, Pi) on each machine.

## What lives where

- `defaults/` — the global agent instruction files that get linked to each tool's top-level config. This is the actual agent behavior ruleset, not repo documentation.
  - `defaults/AGENTS.md` holds synced, cross-machine baseline rules.
  - `defaults/harnesses/{claude,codex,copilot,pi}.md` holds harness-specific guidance appended to the shared baseline.
  - `defaults/generated/` holds gitignored composed instructions. The linker generates these files and symlinks the four harnesses to them. Do not edit outputs.
  - `defaults/AGENTS.local.md` — machine-local overrides. Gitignored; **not** committed here. The top of the file is a marker-delimited shared block that the linker rewrites on every run from the secrets repo baseline (`<secrets>/AGENTS.local.md`). Everything below the END marker is this machine's own content and is never touched.
- `prompts/` — slash commands and reusable prompts.
- `skills/` — skills/capabilities loaded by the harnesses.
- `agents-archive/` — historical/superseded agent definitions.
- `agent-hooks/` — harness lifecycle hooks.
- `agent-templates/` — source definitions compiled into per-tool formats (`dist/{claude,codex,copilot,opencode,pi}`).
- `personalities/` — agent personality presets.
- `codex_configs/` — Codex-specific config (per-OS variants).
- `scripts/link-agent-templates/` — the TypeScript linker (`bun run link`).

## Managing templates

- **Add a skill/prompt**: drop it in the right directory and re-run the linker. No build step for plain markdown.
- **Add an agent**: author under `agent-templates/`, then compile with `bun run agent-templates/scripts/compile-agents.ts` to regenerate `dist/`.
- **Re-link after changes**: `bun scripts/link-agent-templates/link-agent-templates.ts --setup all` (or `--setup claude|codex|copilot|opencode|pi|cursor`).
- **Edit global rules**: change `defaults/AGENTS.md`, then re-run the linker to regenerate harness instructions. Keep tool-specific rules out of the baseline. `~/.agents/AGENTS.md` still links directly to it.
- **Edit harness-specific rules**: change `defaults/harnesses/<harness>.md`, then re-run the linker with `--setup <harness>` or `--setup all`. See [instruction composition](README.md#shared-and-harness-specific-instructions).
- **Edit cross-machine local rules**: change the baseline in the secrets repo (`<secrets>/AGENTS.local.md`), commit it there, and bump the submodule in dotfiles. Every machine picks it up on its next `link-agent-templates` run (after `git submodule update` in dotfiles).
- **Edit this-machine-only rules**: edit `defaults/AGENTS.local.md` below the END marker. Edits inside the shared block are overwritten on the next run. A pre-existing file with no markers gets the block prepended once, after a backup under `~/.agent-templates/backups/`.
- **Point at a non-default secrets dir**: pass `--secrets-dir <path>` or set `$DOTFILES_SECRETS_DIR` (default `~/Projects/dotfiles/secrets`).

## Conventions

- Keep `defaults/AGENTS.md` tool-agnostic. Put harness-specific instruction guidance in `defaults/harnesses/`, not the shared rules. Keep credentials and machine-specific settings in local configuration.
- Never hardcode absolute machine paths in any linked file — these sync across Windows/macOS/Linux.
- Prefer the linker over manual symlinks. It preserves replaced paths in `~/.agent-templates/backups/` and keeps five backups per destination. Correct links stay unchanged. See [backup behavior and recovery](README.md#backups-for-every-tool).
