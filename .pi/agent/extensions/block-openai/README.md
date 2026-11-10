# Block OpenAI catalog

Replaces the `openai` provider's model catalog with an empty list. OpenAI models accessed through other providers remain available. `OPENAI_API_KEY` stays unchanged, including for child tools.

Pi discovers this extension through `~/.pi/agent/extensions`. Run `/reload` or restart Pi to activate it. Remove this extension and reload to restore the built-in catalog.

This hides models, not credentials or network access. It does not remove OpenAI from `/login`.
