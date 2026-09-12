---
name: ast-grep-cli
description: Find code by AST shape or relationships with ast-grep. Use for structural searches that text matching cannot express.
---

# ast-grep code search

Use read-only searches for the requested structure. A search request does not authorize code rewrites.
Derive the language and search scope from the request and relevant files. Ask only when ambiguity would materially change the results.

## Known shapes

For a known single-node pattern, run `ast-grep run` directly on the relevant files or directory. No fixture or YAML file is required. Replace `src` below with the actual search scope.

```bash
ast-grep run --pattern 'console.log($$$ARGS)' --lang javascript src
```

## Uncertain or composite queries

Use `scan` when the query needs relational rules or combined conditions. Start with the simplest rule that expresses the request.

When syntax, exclusions, or traversal are uncertain, check a minimal positive example and a nearby negative example. Prefer `--stdin` with inline rules. Save fixtures or rule files only when reuse or the requested deliverable warrants them.

Choose relational traversal deliberately:

- `neighbor` checks the immediate relationship.
- `end` searches the full direction, including nested scopes.
- A rule-valued `stopBy` bounds traversal at a chosen syntax boundary. The boundary is inclusive, so check whether it can itself match.

Do not widen traversal just to make an example pass. For function-local queries, exclude nested function bodies when the requested relationship requires it.

Read the [rule reference](references/rule_reference.md) for syntax, scope-boundary examples, and metavariable rules.

## Shell and parser details

Single-quote patterns and inline YAML containing metavariables. If double quotes are needed, escape `$` so the shell does not expand it.
Use `--debug-query` with `cst`, `ast`, or `pattern` to inspect parsing when the node kind or pattern interpretation is unclear.
Read [CLI commands](references/rule_reference.md#cli-commands) for runnable examples, stdin validation, and diagnostics.

## Completion

Refine the query locally from parse errors or mismatched examples, then search the relevant scope. Reuse valid results instead of repeating unchanged checks.
Report matches, searched scope, and material limitations. A supported no-match result is valid.
Stop when the requested structure is accounted for or a concrete tool, language, or access blocker prevents further coverage.
