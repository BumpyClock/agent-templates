---
name: programming
description: "Risk-proportional coding guidance. Use when implementing, debugging, refactoring, or testing code; favors regression-value tests, targeted checks, and on-demand references."
---

# Programming

This skill adds only the boundaries that prevent common coding failures. Repo-local instructions and the user's contract override these defaults.

## Gates

1. FIND THE CAUSE. For a defect, understand the mechanism before editing. New behavior needs an observable contract; mechanical work does not need a fabricated diagnosis.
2. TEST FOR REGRESSION VALUE. Before you write a test, name the plausible regression it catches at an observable contract. If you cannot name one, do not write the test. Zero new tests is a valid outcome for most changes.
3. PROVE A NEW REGRESSION TEST. When adding a test to catch a bug or behavior change, observe it fail for the expected reason before relying on it. This does not apply when no new test is warranted.
4. VERIFY BEFORE CLAIMING. Run the narrowest relevant check after editing and read its result. Use broader suites when required by repo instructions or justified by the affected surface and risk.

User explicitly waives a gate → comply, and state what evidence is being skipped.

## Defaults

- Follow existing sound code and test conventions before inventing structure.
- Prefer the smallest check that observes the contract at risk.
- Test count follows risk, not diff size. A bug fix earns one regression test. New observable behavior earns one contract test at the outermost practical seam. Each additional test needs a distinct named failure mode.
- Assert observable behavior against the stated contract. Do not assert internal calls, and do not recompute the expected value with logic that mirrors production.
- Existing coverage is sufficient for a refactor unless the work exposes an important untested contract.
- Documentation, formatting, generated output, static declarations, and compiler-enforced type changes usually need validation, not new tests.
- Avoid duplicate coverage, static-value assertions, tests for removed behavior, and coverage theater.
- Keep changes scoped. Mention unrelated problems; do not fix them.
- Delegate only bounded independent work when coordination and duplicated context cost less than local execution.

## References — load on demand

Open a reference when its trigger matches the work. Do not preload the rest.

- Cause unclear after direct inspection → `systematic-debugging/guide.md`
- Writing or changing a test, reviewing a test diff, or existing tests look suspicious (mock-heavy, cannot fail) → `references/write-tests.md`
- User or repo explicitly requires TDD → `references/tdd-rules.md`
- Completion evidence is ambiguous or high-risk → `references/verification-before-completion.md`
- Structural refactor → `references/refactoring/clean-refactoring.md`
- Language or UI-specific uncertainty → the matching file under `references/languages/` or `references/web-development.md`
