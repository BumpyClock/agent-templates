# Chrome attachment configuration

Use this reference when `chrome-devtools` cannot see real tabs or reports `DevToolsActivePort`.
Preserve the consent and browser restrictions in [Existing Chrome automation](browser-use.md).

```bash
mcporter config get chrome-devtools --json
```

Inspect `source.path` to find the effective configuration. Preserve a valid project override.
`chrome-devtools` must attach to existing Chrome, not launch an isolated profile.
Check the configured server's help before changing its launch arguments; supported attachment flags can differ between versions.
For `chrome-devtools-mcp`, the existing workflow uses `--auto-connect`.

If an explicit user-data directory is needed, resolve it from the intended running Chrome instance or verified machine-local configuration.
A displayed Profile Path can name a profile subdirectory, not its containing user-data directory.
Do not guess the directory or create a new profile. Stop if the intended directory cannot be identified.
Keep resolved paths in local configuration, not shared references. JSON does not expand `$HOME`.

Use `mcporter config add --help` for the installed syntax.
Obtain approval before changing home configuration. Repair only the broken entry and preserve unrelated arguments and settings.
Do not rewrite home and project scopes together or bypass discovery with a temporary configuration.
An explicitly requested isolated session must use a separate alias, not replace `chrome-devtools`.

## Recovery and verification

For `DevToolsActivePort`, ask the user to restart Chrome or its DevTools bridge.
After that, restart the mcporter daemon if needed and retry once.

```bash
mcporter daemon restart
mcporter call chrome-devtools.list_pages --args '{}' --output text
```

Pass only when the page list matches the user's visible Chrome tabs.
If it still fails, report Chrome DevTools MCP as unavailable. Repeated restarts can trigger reconnect and login prompts.
