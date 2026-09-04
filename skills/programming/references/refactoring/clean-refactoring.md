# Clean Refactoring

Use when a change reveals duplicate concepts, local adapters, obsolete owners, compatibility wrappers, parallel abstractions, or pressure to tack code beside an existing path.

Core rule: refactoring replaces the old shape with the simpler shape the codebase would want today. It should leave one concept with one clear owner and clear consumers.

## Workflow

1. Establish the behavior contract and relevant evidence before structural edits. Include outputs, errors, side effects, and required compatibility.
2. Identify the concept, current owners, and consumers. Include configuration, documentation, and string-based references where they can affect behavior.
3. Choose the target owner and representation. Use [Redesign from First Principles](../principles/principle-redesign-from-first-principles.md) when new constraints expose repeated exceptions.
4. Move consumers in coherent behavior-preserving units. Apply the API migration rule below when one interface replaces another.
5. Assess the result through affected consumers under [verification](../verification-before-completion.md). Account for stale references and any retained bridge.

Use [Subtract Before You Add](../principles/principle-subtract-before-you-add.md) when a bounded removal simplifies the requested change.
For a discovered defect or new behavior, separate that work from the refactor contract.

## Migrate Callers Then Delete Legacy APIs

Use coordinated migration when an internal API replaces an old API and its consumers can change together.
Inventory consumers before retirement, including callers outside the immediate package when the contract permits them.
Migrate those consumers and remove the obsolete path in the same coherent change when feasible.
Remove duplicate implementations after the replacement serves the required contract.

For required public API, CLI, configuration, or stored-data compatibility, preserve an explicit bridge or use an authorized migration plan.
Name the consumer contract, owner, and removal condition for a temporary bridge.
An absent local caller does not prove that an externally supported API is unused.

## Rules

- Do not let sunk cost decide architecture. Size the refactor by end-state quality, behavior risk, and reviewability, not by how much old code exists.
- Search before building a new mechanism. Reuse, consolidate near-duplicates, extract shared core, or build new deliberately after seeing what exists.
- Prefer one shared primitive over duplicate adapters when their semantics match.
- Do not preserve dev-only compatibility by default. Unshipped scaffolding should move to the clean contract immediately.
- Preserve required public API, CLI, configuration, and stored-data compatibility unless the authorized migration replaces that contract.
- Reuse owned values in consumers and consistency checks. Preserve independent expectations for computational and external contracts in tests.
- When divergence was the bug class, make ownership visible in tests, debug output, logs, or stats.
- Use real or asymmetric fixtures/assets for orientation, geometry, layout, ordering, and framing bugs. Symmetric placeholders can hide flipped coordinate frames or swapped axes.
- Assess existing coverage before a refactor under [test quality](../write-tests.md). Add tests only for material gaps.
- Update docs/specs with the new invariant and owner, not a mechanical file list.
- If scope widens into unrelated behavior, slice it: land the shared contract first, then port consumers in reviewable passes.

## Smells

- Same business rule in two modules.
- Config read in many places with local defaults.
- Adapter that only renames fields between internal shapes.
- Test oracle computes the expected value by duplicating production logic.
- Compatibility wrapper with no removal trigger.
- "Temporary" branch older than the feature it supported.
- An abstraction hides no useful decision or invariant, regardless of caller count.

## Verification

- Relevant existing or revised checks cover paths that used to diverge.
- Old and new surfaces report or exercise the same source of truth.
- Stale owner/adapter path is deleted, or remaining bridge has explicit removal condition.
- Diff does not include unrelated cleanup.
