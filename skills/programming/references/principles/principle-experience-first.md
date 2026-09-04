# Experience First

## Trigger

Implementation convenience conflicts with a product, API, or maintenance outcome that matters to a consumer.

## Decision

Identify the consumer and the task that the change must improve.
Include end users, API callers, operators, and future maintainers when the decision affects them.
Compare alternatives by the work those consumers must perform and the failures they must recover from.

Prefer a smaller complete workflow to extra controls that obscure the core task.
Treat feedback, error recovery, and accessible interaction as part of the behavior contract.
For an API, assess caller knowledge and misuse risk rather than only internal implementation effort.
Use a [prototype](../../../engineering/prototype/SKILL.md) when observation can resolve a concrete design uncertainty.

## Limit

User delight does not override security, accessibility, reliability, data integrity, or the user's stated priorities.
Do not infer permission for extra scope from a possible experience improvement.
Ask the user when alternatives depend on a genuine product preference.
Use [Foundational Thinking](principle-foundational-thinking.md) to sequence work toward the chosen target, not to substitute another target.
