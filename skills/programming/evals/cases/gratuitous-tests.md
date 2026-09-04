# gratuitous-tests

## Trigger
agent-templates skill review (2026-08-16): user reports that agents running the programming skill add batches of tests on routine changes. Small edits ship with many new tests that assert trivial paths, restate the implementation, or duplicate existing coverage.

## Expected

Select tests by material regression risk, existing coverage, diagnostic value, and maintenance cost. Add no tests when existing checks provide sufficient evidence. Retain several tests when each adds useful coverage or diagnosis.

## Observed failure
Agents (multiple models, through 2026-08) read the old Gate 2 wording ("add a test when behavior would otherwise be unprotected") as "any changed behavior → write tests," and the old Anti-Pattern 5 ("changed behavior without coverage is an incomplete change") as a mandate. They treated test volume as a completion signal and produced low-value suites that bury the one assert that matters.
