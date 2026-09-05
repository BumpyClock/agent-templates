---
name: technical-writing
description: Write or review technical documents, PR descriptions, and commit messages.
disable-model-invocation: true
---

# Technical writing

Make the requested document accurate and useful to its intended reader.
Preserve the requested format, scope, and repository conventions.

## Document structure

Use the reader's task to choose the structure.
For document sets or an unclear document purpose, read [Document types](references/document-types.md).
A small edit does not require document reorganization.

## Technical accuracy

- Preserve exact identifiers, commands, paths, quotations, and code semantics.
- Match code examples to the project's language and format conventions.
- Distinguish current behavior, proposed behavior, and unresolved facts.
- Support consequential claims with relevant source evidence.
- Preserve warnings, prerequisites, limitations, and necessary uncertainty.
- Report source defects without changes to product code unless authorized.

## Prose

Follow repository prose rules.
Where those rules leave a choice, prefer concrete verbs, explicit actors, and consistent technical terms.
Keep conditions and negation close to the action they qualify.
Use the same name for the same concept.
Do not replace valid technical vocabulary with a less precise synonym.

For substantial style revision, use [Unslop](../unslop/SKILL.md).
Do not modify that skill or other shared instructions as a side effect.
For STE-controlled documents, use the required edition and dictionary before a claim of formal compliance.

## Completion

For review requests, return material findings with source locations and proposed corrections.
For edit requests, deliver the revised text and report unresolved factual questions.
Check affected links, identifiers, and examples against their sources.
Run executable examples only when their accuracy needs a check and execution is within scope.
