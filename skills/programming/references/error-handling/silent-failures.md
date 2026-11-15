# Silent Failures

Use when reviewing error handling, fallback behavior, retries, optional/null handling, logging, or user-facing failure states.

## Core principles

1. Make failures observable. Recover only when the resulting behavior remains valid.
2. Users need actionable feedback.
3. Fallbacks must be explicit and justified.
4. Catch blocks must be specific enough that unexpected failures still surface.
5. A production path does not ship a mock or fake implementation. Tests, prototypes, previews, and explicit offline modes can.

## Review process

### 1. Identify error-handling code

Look for:

- `try`/`catch` blocks or language equivalents
- error callbacks and handlers
- conditional branches for error states
- fallback logic and failure defaults
- errors that are logged while execution continues
- optional chaining, null coalescing, or default values that may hide problems

### 2. Scrutinize each handler

Evaluate:

- logging quality and diagnostic context
- user-facing feedback quality
- catch-block specificity
- whether fallback behavior masks a real problem
- whether the error should propagate instead of being swallowed

### 3. Flag hidden failures

Red flags:

- empty catch blocks
- catch-and-continue behavior
- returning defaults without surfacing failure
- retry loops that fail without telling the user
- optional/null handling that silently skips required work

## Output

For each issue: location, severity, the hidden error it can mask, user impact, and recommended fix. Scale detail (example fixes, repro steps) to severity.
