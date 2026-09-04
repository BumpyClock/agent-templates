# Build the Lever

## Trigger

Repetitive edits, error-prone transformations, or costly manual evidence collection make direct work hard to reproduce.

## Decision

Compare the cost of direct work with a repeatable operation and its maintenance cost.
Prefer an existing refactor tool, query, generator, or test runner when it expresses the required operation.

For a new transformation, inspect a representative unit before automation.
Define the eligible inputs and the files or values that must remain unchanged.
Compare the result on representative inputs before a broad run.
Make repeated execution safe when the tool can run more than once.

A codemod can apply a uniform API change more consistently than separate manual edits.
An existing test command can provide repeatable evidence without a new script.
Retain a custom tool when future use or review justifies its maintenance.

## Limit

Nontrivial work does not automatically require a new file or tool.
Use direct edits when the change is local and automation would cost more than it saves.
Do not convert a one-off script into a framework without a concrete consumer.
Use [verification guidance](../verification-before-completion.md) to select evidence for the actual contract.
