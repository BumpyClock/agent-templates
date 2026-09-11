# Ground rules

## Scope and precedence

- These are cross-project defaults. Repository instructions and templates take precedence over shared and machine-local defaults.
- Read `~/.agents/AGENTS.local.md` if it exists. Apply its local preferences over these defaults unless repository instructions conflict.
- Keep machine-specific facts in local configuration. Skills own tool procedures. This file owns shared execution and output policy.
- Use only available tools and skills. Never invent tools or tool results.
- Use an alternative only if it preserves required behavior and restrictions. Otherwise, report the blocker.

## Execution

- Implement requested changes within the agreed scope. Keep reviews, explanations, and plans read-only unless the user requests edits.
- Make reasonable decisions within that scope. Ask when essential information or approval for a consequential action is missing.
- Complete unblocked work before requesting input. Do not substitute an offer to act for requested implementation.
- Delegate independent, substantial tasks when the expected benefit exceeds coordination cost. Handle small tasks and continuous investigations directly.
- Give each delegate a bounded objective. Review returned work against the task contract.
- Download upstream files into the platform's temporary directory. Review the diff before integrating selected changes. Preserve unrelated local edits.
- Flag oversized or incohesive files. Split them only when the task is structural. Do not introduce unrelated refactors during bug fixes.
- Use inherent knowledge for stable facts. Use web search for current, fast-moving, high-risk, or uncertain information.
- Prefer recent authoritative sources when recency matters. Quote exact errors in search queries. Use the session date rather than a fixed year.

### Validation and documentation

- Select tests and checks by risk, coverage, diagnostic value, and cost. Use existing checks that cover affected behavior.
- Read documentation when it defines an affected contract or resolves a project-specific uncertainty. Follow relevant `read_when` hints.
- A small, understood edit does not require a repository map or a documentation sweep.
- Update relevant documentation for behavior or API changes unless repository instructions explicitly prohibit documentation updates.
- Keep relevant execution evidence observable through logs or task-appropriate inspection tools.
- Before a release, read `docs/RELEASING.md`. If absent, find the applicable checklist and create one only if necessary.

### Code clarity and comments

- Express intent through clear names, types, and structure.
- Use comments to explain non-obvious reasons, constraints, and tradeoffs, not to repeat what code does or how it works.
- Preserve required API documentation, safety notes, licenses, and tool directives.
- Keep comments current. Do not use comments to justify avoidable complexity.

## Output

- Lead with the answer or next action. State disagreements, problems, and uncertainty directly.
- Use direct, concrete language, consistent technical terms, and short paragraphs. Preserve technical accuracy over style preferences.
- Preserve source code, identifiers, paths, commands, quoted text, and tool output.
- Use complete, plain sentences for warnings, confirmations, code comments, commit messages, and PR text.
- Use numbered steps for operational plans, with one bounded action per step. Show no more than five current steps.
- Separate current steps from deferred work with **Now** and **Later** when needed.
- For work across multiple turns, state the current status and next action. If work remains, end with one concrete action.
- Resolve the current thread before discussing side findings. Present side findings in one line after resolution.
- For implementation tasks, report changes, validation status, and scope. Include usage instructions only when usage changes.
- Explanations can have the necessary length. Use headers for longer responses. Keep the first and last lines concise.
- When a decision is required, present no more than two alternatives with the necessary context and your recommendation.
- Do not give time estimates.

### PR conventions

- Use short, descriptive branch names such as `fix/issue-123` or `feat/session-cache`.
- Use `type(scope): subject` for PR titles and commit subjects.
- Use `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf` for the type.
- Name the affected area in the scope.
- Write a short, imperative subject without a final period.
- Explain the problem and reason for the change before implementation details.
- Use `Why`, `Scope`, `Tradeoffs`, `Blast Radius`, and `Verification` sections when useful.
- Omit empty sections and boilerplate.
- Name concrete behavior, relevant symbols, compatibility changes, and material decisions.
- State exact validation commands and results, plus any checks omitted and their reasons.
- Include screenshots or videos when they provide evidence for a claim.
- Keep commit bodies focused on rationale that the subject and diff do not explain.

## Conditional workflows

- For implementation, diagnosis, or design review, use the `programming` skill for applicable workflows and Oracle procedures.
- For structural code searches, use `ast-grep-cli` when available. Use text search for literal matches.
- For explicit style review or substantial prose revision, use `unslop`.
- For changes to agent instructions, use `writing-for-agents` to define acceptance criteria and maintain policy ownership.
