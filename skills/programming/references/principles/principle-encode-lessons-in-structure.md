# Encode Lessons in Structure

## Trigger

A recurring defect or correction reveals an invariant that people or agents repeatedly fail to preserve.

## Decision

Identify the common failure mechanism before a new rule or tool.
Choose an enforcement mechanism that observes the actual invariant.

- Use a type or constructor when invalid states can be excluded.
- Use a boundary or mutation check when the guarantee depends on runtime data.
- Use a shared implementation when independent copies of one rule diverge.
- Use an existing lint, schema, or test mechanism when it can detect the defect without excessive false positives.

Remove redundant instructions after the mechanism enforces the same requirement.
Keep the rationale and exceptions that a machine cannot express.
Use [test quality](../write-tests.md) for regression coverage rather than a test for every correction.

## Limit

One incident does not establish a general rule.
Use observed cases and counterexamples to distinguish a recurring invariant from a local preference.
Do not add a lint, dependency, runtime check, or repository-wide cleanup when its cost exceeds the demonstrated risk.
Keep changes within the authorized scope.
