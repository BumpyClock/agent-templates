# Agent Templates

AI agent configurations, prompts, skills, and personalities for:
- Claude Code / Claude Agents
- Codex
- GitHub Copilot
- OpenCode
- Pi

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
- **Copilot**: `~/.copilot/prompts`, `~/.copilot/skills`, etc.
- **OpenCode**: `~/.config/opencode/...`
- **Pi**: `~/.pi/agent/...`

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
