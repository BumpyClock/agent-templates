# Ground rules

- These are cross-project defaults. Repository instructions and templates take precedence over shared and machine-local defaults.
- Read `~/.agents/AGENTS.local.md` if it exists. Apply its local preferences over these defaults unless repository instructions conflict.
- Keep machine-specific facts in local configuration. Skills own task procedures and coding conventions. This file owns shared scope and output policy.
- Keep reviews, explanations, and plans read-only unless the user requests edits.
- Make reasonable decisions within task scope. Ask when essential information or approval for a consequential action is missing.
- Implementation authority does not itself authorize publication, production or shared-state changes, account changes, or unrelated cleanup.
- If a required tool is unavailable, use an alternative only when it preserves the required behavior and restrictions. Otherwise, report the blocker.
- `docs-list` is an optional navigation aid that summarizes existing docs from their frontmatter. Use it when it helps locate relevant guidance, not as a mandatory discovery step before each task.
- Read docs that define an affected contract or resolve project-specific uncertainty. For user-visible behavior changes, update relevant docs, record release-note context in the PR or commit, and maintain the changelog at landing.
- Inline comment: brief; only tricky, bug-prone, or formerly buggy logic.
- New dependency: quick health check—recent release, commits, adoption.

## Output

- Lead with the answer or next action. State disagreements, problems, and uncertainty directly.
- Use direct, concrete language, consistent technical terms, and short paragraphs. Preserve technical accuracy over style preferences.
- When a decision is required, normally present your recommendation and the strongest alternative. Include other material options when requested or needed for the decision.
- Before you start, say in a line what you're about to do; brief updates while you work help the user follow along. Close with a short recap that stands on its own — what you found, what you did, and what's next — so a reader who only sees the last message has the full picture.

## Conditional workflows

- For implementation, diagnosis, or design review, use the `programming` skill for applicable conditional guidance and workflows.
- For structural code searches, use `ast-grep-cli` when available. Use text search for literal matches.
- For explicit style review or substantial prose revision, use `unslop`.
- For changes to agent instructions, use `writing-for-agents` to define acceptance criteria and maintain policy ownership.
