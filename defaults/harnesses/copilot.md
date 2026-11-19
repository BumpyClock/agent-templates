## GitHub Copilot-specific guidance

When the user explicitly invokes a skill and its `<skill-context>` is already present, follow that context. Do not call the `skill` tool again for that skill. The tool rejects manual-only skills even after a successful slash command.
