---
name: test-cleanup
description: "Audit an existing test suite against the programming skill's test standards; report delete/rewrite/keep verdicts with evidence, then apply approved changes. Use when the user asks to clean up, prune, audit, or align existing tests."
disable-model-invocation: true
---

# Test Cleanup

Bring an existing suite into line with the test standards in `../../programming/references/write-tests.md`. That file is the yardstick — read it first, plus the Gates in `../../programming/SKILL.md` (if the relative path does not resolve, invoke the `programming` skill and read its `references/write-tests.md`). This skill adds only the audit workflow; it does not restate the rules.

## Scope

Default: all test files in the repo, or the path the user names. Never sample silently — if the suite is too large for one pass, say so and propose a slice (by directory, by age, by last-touched), and record the remaining slices as follow-up tasks.

## Audit

Walk each test through the write-tests.md review checklist and coverage-theater gate. One verdict each:

- **delete** — cannot fail (coverage theater), duplicates a stronger test's regression, pins removed behavior or an implementation accident, or its SUT has no non-test callers (flag the SUT for deletion too — that needs its own consent).
- **rewrite** — guards a real contract but badly: mock-heavy internals, config-coupled, count-without-value asserts, single-sample stochastic pins, name/body mismatch, tautological expected values.
- **keep** — fails on a nameable regression at an observable contract. This is the default verdict when in doubt; the audit exists to remove noise, not to churn a healthy suite.

Every delete/rewrite verdict carries evidence: the specific rule violated and the answer to "what production change makes this fail?" A verdict without evidence does not ship. Parallelize the audit with subagents when file count warrants it; verdicts still get spot-checked before the report.

## Report, then act

Present the report before changing anything: counts by verdict, then delete/rewrite findings ranked by harm (misleading green tests first), 1–2 lines each with `file:line`. Ask which categories or findings to apply — deleting tests lowers coverage, so the cut list needs the user's eyes even though they invoked the skill.

## Apply

1. Baseline: run the full suite first and record the result. Pre-existing failures are named as pre-existing, never claimed as caused or fixed.
2. Batch by category; re-run the affected suite after each batch.
3. Rewrites follow write-tests.md end to end — assert the contract at the outermost practical seam, and prove each rewritten test can fail (falsify once, red for the expected reason).
4. Deleting a test never changes production code. Caller-less SUTs are their own consented batch.
5. Defects in production code found during the audit are side findings for the report — do not fix them in this pass.

## Done when

- Suite matches baseline (green, or the same named pre-existing failures).
- Every applied change maps to a reported verdict; nothing applied that was not approved.
- Summary: deleted N, rewrote M, kept K, plus side findings and any remaining slices.
