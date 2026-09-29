# Configuration and recovery

Read this file only when an alias, connection, authentication, or configuration needs attention.

```bash
mcporter config list
mcporter config get SERVER --json
mcporter config doctor
```

Treat configuration output as sensitive. Inspect it locally; do not paste credentials or private endpoint URLs into reports.
Use `source.path` to identify the effective entry. Preserve valid project overrides and unrelated settings.
Configuration can come from home files, project `config/mcporter.json`, editor imports, or an explicit configuration.
Check local command help before changing precedence or scope. Do not create temporary configurations to bypass the effective entry.
Ask before changing configuration outside the repository.

## Authentication

Use `--no-oauth` during discovery when only cached credentials should be used.
If authentication is required, report the affected alias and obtain approval for interactive login.

```bash
mcporter auth SERVER
```

Do not reset credentials or replace an endpoint merely because authentication failed.

## Connection failures

Retry a failed read or schema discovery once if the connection closed unexpectedly.
After a failed write, inspect the target state before deciding whether a retry is safe.
Report persistent failures instead of treating an empty result as success.

For a stale daemon connection, inspect its status first.
Restart only when needed; a daemon restart can disrupt other active server sessions.

```bash
mcporter daemon status
mcporter daemon restart
```

For Chrome attachment problems, use [Chrome configuration](chrome-config.md), not generic browser replacement.
