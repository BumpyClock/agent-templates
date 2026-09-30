---
name: principle-delegate-after-the-contract
description: "Assess delegation when work could use separate contexts, parallel execution, or a less capable model."
---

# Delegate After the Contract

## Trigger

A task has parts that could run in separate contexts, in parallel, or on a less capable model.

## Decision

Separate two choices.
The unit of acceptance decides what counts as done.
The unit of execution decides who does the work and with what context.
Vertical slices define the unit of acceptance; see [Sequence Work into Verifiable Units](../principle-sequence-verifiable-units/SKILL.md).
Size each delegated slice to fit one fresh context, as in [to-tickets](../../engineering/to-tickets/SKILL.md).
Slices alone do not make work delegatable.

Define the public contract and any needed architecture before delegation, under [Foundational Thinking](../principle-foundational-thinking/SKILL.md).
Keep the first slice through unfamiliar code for yourself.
That slice proves or corrects the contract: data shapes, owners, integration points, and the check that proves the behavior.
A delegate cannot rediscover that contract cheaply or reliably.

Fan out only after the contract is pinned.
A pinned contract has fixed signatures or types and an executable acceptance check.
The check can be a test, a type-check, a lint rule, or a golden output that the delegate runs without asking.

Test each candidate unit with one question.
Can the delegate succeed with only the brief, its owned paths, and the acceptance check?
When yes, a less capable model can own the unit.
When passing needs design judgment, integration reasoning, or reads beyond the owned paths, keep the unit with a capable model.

Choose the split shape by where the risk lives:

- Split by vertical slice when slices touch disjoint paths after the first slice lands. Each delegate owns one behavior through its layers.
- Split by leaf function when a pinned interface hides independent implementations. Each delegate owns one leaf and its tests.
- Keep integration with one owner. Integration is where split work usually fails.

Give each delegate the owned paths, the contract, the acceptance check, and what to report.
Isolate parallel writers under [shared-state guidance](../principle-separate-before-serializing-shared-state/SKILL.md).
Review the integrated result yourself, and inspect the evidence behind consequential claims.

## Limit

Do not split by layer when the contract is still open.
Parallel layer work against a guessed interface drifts, and no delegate owns the seam where the layers meet.
Do not delegate a unit when writing the brief costs about as much as doing the work.
A small change that one context can hold needs no delegation.
Parallel runs add merge, review, and retry costs. Fan out only when the saved time or context exceeds those costs.
Do not delegate a unit whose contract changes during the work. Pull it back, settle the contract, then fan out again.
