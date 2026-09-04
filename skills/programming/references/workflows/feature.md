# Feature

Use for a new or changed behavior that needs coordinated implementation.
For a small, clear change, use the same contract and evidence without a separate plan artifact.

## Workflow

1. Define the requested behavior, authorized scope, affected consumers, and compatibility requirements. Identify what observation will establish completion.
2. Inspect the current owners and integration points. Resolve material design uncertainty before dependent edits.
3. Implement a coherent unit through its consumers. Preserve existing behavior outside the contract.
4. Assess the implemented behavior under [test quality](../write-tests.md) and [verification](../verification-before-completion.md). Correct material gaps before completion.
5. Report the behavior delivered, consequential decisions, and unresolved limits. Separate completed work from proposed work.

## Design decisions

Use [Model the Domain](../principles/principle-model-the-domain.md) when state or repeated shape assumptions need a representation.
Use [Foundational Thinking](../principles/principle-foundational-thinking.md) when several consumers depend on one prerequisite.
Use [Experience First](../principles/principle-experience-first.md) for consumer tradeoffs.
Use [architecture guidance](../architecture/architecture-planning.md) when boundaries or contracts need a decision.

Delegate only when independent work warrants a separate context and has a clear acceptance condition.
Coordinate writes to shared artifacts under [shared-state guidance](../principles/principle-separate-before-serializing-shared-state.md).

## Limits

Ordinary function calls do not require parallel design exploration.
A feature request does not itself authorize commits, pull requests, deployment, or unrelated cleanup.
For a prototype-only request, use the [prototype skill](../../../engineering/prototype/SKILL.md) and stop at the requested decision.
