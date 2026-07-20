# AGENTS.md

This repo (`agent-templates`) holds AI agent configurations — prompts, skills, agent definitions, and personalities — that get symlinked into multiple AI tools (Claude Code, Codex, Copilot, OpenCode, Pi) on each machine.

## What lives where

- `defaults/` — the global agent instruction files (`AGENTS.md`, `AGENTS.local.md`) that get linked to each tool's top-level config. This is the actual agent behavior ruleset, not repo documentation.
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
- **Re-link after changes**: `bun scripts/link-agent-templates/link-agent-templates.ts --setup all` (or `--setup claude|codex|copilot|opencode|pi`).
- **Edit global rules**: change `defaults/AGENTS.md` — that file is the source of truth linked into every tool. Do not put tool-specific rules there.

## Conventions

- Keep `defaults/AGENTS.md` tool-agnostic. Harness-specific overrides belong in that harness's own config, not the shared rules.
- Never hardcode absolute machine paths in any linked file — these sync across Windows/macOS/Linux.
- The linker is idempotent and only replaces a symlink when its target changed; it never deletes real files. Prefer the linker over manual symlinks.
