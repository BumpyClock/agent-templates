# Exhaust the Design Space

## Trigger

A consequential design choice has several viable alternatives and no established answer in the codebase.

## Decision

Compare materially different designs against explicit criteria before commitment.
Use criteria such as contract fit, user behavior, state ownership, reversibility, and operational cost.

Use the cheapest evidence that separates the alternatives.
A source example or interface sketch can resolve a structural choice.
A bounded prototype can resolve uncertain runtime behavior.
Stop when the evidence supports a choice or exposes a product preference that requires the user.

## Limit

The name does not require an exhaustive search or a fixed number of prototypes.
Do not invent alternatives for a mechanical change or a choice already determined by the contract.
Do not mandate parallel agents.

An experiment can establish behavior, but it cannot decide the user's priorities or grant permission for external effects.
Keep prototypes within the authorized scope.
