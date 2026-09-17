# Git and releases

Use for commit or PR preparation, an authorized merge, or release preparation.
Follow repository templates and policies before these defaults.
This guide defines conventions, not permission to commit, publish, merge, or release.

## Branches and change descriptions

- Use short, descriptive branch names such as `fix/issue-123` or `feat/session-cache`.
- Use `type(scope): subject` for PR titles and commit subjects. Choose `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, or `perf`; name the affected area in the scope.
- Write a short, imperative subject without a final period.
- Explain the problem and reason for the change before implementation details. Name concrete behavior, relevant symbols, compatibility changes, and material decisions.
- Use `Why`, `Scope`, `Tradeoffs`, `Blast Radius`, and `Verification` sections when useful, not as a required template. Omit empty sections and boilerplate.
- State relevant validation commands and results, plus material checks omitted and why. Reuse evidence under the [shared validation guidance](../../SKILL.md#validation); preparing a commit or PR does not add a test gate.
- Include screenshots or videos for user-visible changes when they substantiate a claim or improve reviewability.
- Keep commit bodies focused on rationale that the subject and diff do not explain.

## Merges and releases

For authorized merges, squash pull requests targeting `main`; do not squash stacked pull requests.
Repository merge policy takes precedence.

For release preparation, follow the repository's release checklist.
Read `docs/RELEASING.md` when present; otherwise, locate the applicable instructions.
Create a missing checklist only when it is necessary for the requested release work.
Stop at the requested deliverable without inferring permission to publish or deploy.
