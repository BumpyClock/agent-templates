---
name: programming
description: "Risk-proportional coding guidance. Use when implementing, debugging, refactoring, or testing code; favors regression-value tests, targeted checks, and on-demand references."
---

# Programming

This skill adds only the boundaries that prevent common coding failures. Repo-local instructions and the user's contract override these defaults.

## Gates

1. FIND THE CAUSE. For a defect, understand the mechanism before editing. A report names a symptom; grep every caller of the function you are about to touch and fix once where all callers route through. New behavior needs an observable contract; mechanical work does not need a fabricated diagnosis.
2. TEST FOR REGRESSION VALUE. Before you write a test, name the plausible regression it catches at an observable contract. If you cannot name one, do not write the test. Zero new tests is a valid outcome for most changes.
3. PROVE A NEW REGRESSION TEST. When adding a test to catch a bug or behavior change, observe it fail for the expected reason before relying on it. This does not apply when no new test is warranted.
4. VERIFY BEFORE CLAIMING. Run the narrowest relevant check after editing and read its result. Use broader suites when required by repo instructions or justified by the affected surface and risk.

User explicitly waives a gate → comply, and state what evidence is being skipped.

## Before coding

- Read every file the change touches and trace the real flow end to end. The ladder below shortens the solution, never the reading.
- State assumptions. If multiple interpretations exist, present them; do not pick silently. If a simpler approach exists, say so.

## The ladder

Stop at the first rung that holds:

1. **Does this need to exist at all?** Speculative need = skip it, say so in one line. (YAGNI)
2. **Already in this codebase?** A helper, util, type, or pattern that already lives here → reuse it. Re-implementing what is a few files over is the most common slop.
3. **Stdlib does it?** Use it.
4. **Native platform feature covers it?** `<input type="date">` over a picker lib, CSS over JS, DB constraint over app code.
5. **Already-installed dependency solves it?** Use it. Never add a new one for what a few lines can do.
6. **Can it be one line?** One line.
7. **Only then:** the minimum code that works.

Two rungs work → take the higher one. Two stdlib options, same size → take the one that is correct on edge cases.

## Defaults

- Follow existing code and test conventions before inventing structure. Match existing style even if you would do it differently.
- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes, no scaffolding "for later".
- Deletion over addition. Boring over clever. Shortest working diff wins — but the smallest change in the wrong place is a second bug.
- Keep changes scoped. Every changed line traces to the request. Remove imports and symbols that your change made unused; mention pre-existing dead code and unrelated problems, do not fix them.
- Complex request? Ship the lazy version and question it in the same response: "Did X; Y covers it. Need full X? Say so." Never stall on an answer you can default.
- Mark a deliberate simplification with a known ceiling (global lock, O(n²) scan, naive heuristic) with a `ponytail:` comment naming the ceiling and upgrade path (`# ponytail: global lock, per-account locks if throughput matters`).
- Hardware is never the ideal on paper: leave the calibration knob.
- Delegate only bounded independent work when coordination and duplicated context cost less than local execution.

## Tests

- Prefer the smallest check that observes the contract at risk.
- Test count follows risk, not diff size. A bug fix earns one regression test. New observable behavior earns one contract test at the outermost practical seam. Each additional test needs a distinct named failure mode.
- Assert observable behavior against the stated contract. Do not assert internal calls, and do not recompute the expected value with logic that mirrors production.
- Existing coverage is sufficient for a refactor unless the work exposes an important untested contract.
- Documentation, formatting, generated output, static declarations, and compiler-enforced type changes usually need validation, not new tests.
- Avoid duplicate coverage, static-value assertions, tests for removed behavior, and coverage theater.

## Never simplify away

Input validation at trust boundaries, error handling that prevents data loss, security measures, accessibility basics, anything explicitly requested. User insists on the full version → build it, no re-arguing.

## Output

Code first. Then at most three short lines: what was skipped, when to add it. Pattern: `[code] → skipped: [X], add when [Y].` Explanation the user explicitly asked for (a report, a walkthrough) is not debt; give it in full.

## References — load on demand

Open a reference when its trigger matches the work. Do not preload the rest.

- Cause unclear after direct inspection → `systematic-debugging/guide.md`
- Writing or changing a test, reviewing a test diff, or existing tests look suspicious (mock-heavy, cannot fail) → `references/write-tests.md`
- User or repo explicitly requires TDD → `references/tdd-rules.md`
- Completion evidence is ambiguous or high-risk → `references/verification-before-completion.md`
- Structural refactor → `references/refactoring/clean-refactoring.md`
- Language or UI-specific uncertainty → the matching file under `references/languages/` or `references/web-development.md`
