---
description: "Analyze the codebase for high-value improvements using the improve skill"
argument-hint: "[scope] [focus-areas]"
---

# Codebase Improvement Analysis

Use the `improve` skill's audit route. Keep the analysis read-only.

**Scope / Focus (optional):** "$ARGUMENTS"

- Use supplied paths and focus areas to bound the audit.
- If no scope is supplied, assess the repository for high-value improvements.
- Treat legacy `nuclear`, `strict`, or `thermo` arguments as a request for deeper maintainability analysis within that scope.
- Report concrete evidence, impact, and tradeoffs without a fixed finding count.

## Usage Examples

```text
/analyze-codebase-improvements
/analyze-codebase-improvements src architecture duplication
/analyze-codebase-improvements src time-complexity
/analyze-codebase-improvements prompts docs comments
/analyze-codebase-improvements tests deps
/analyze-codebase-improvements src maintainability
```
