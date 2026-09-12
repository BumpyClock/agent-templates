# Instruction design

This reference explains editorial tradeoffs. Use the [root checklist](../SKILL.md) for routine edits.

Use this reference for skills, `AGENTS.md` / `CLAUDE.md`, and linked guidance. Aim for contract-complete results within the user's scope, not the same process on every task. Preserve an ordered procedure where causal correctness, safety, or reproducibility depends on that order.

When the document you're writing is a skill, read [`SKILL-MECHANICS.md`](../SKILL-MECHANICS.md) for frontmatter, invocation choice, and router skills.

Use the repository's concise voice rules for routine edits. Read `unslop` or `technical-writing` only for substantial prose revision or explicit style review.

## Context pointers

A **context pointer** names linked material and the condition for reading it. A skill description and an `AGENTS.md` reference both guide discovery, but actual skill invocation also depends on the host. If needed material is missed, inspect the pointer, target, and available loading mechanism before adding more instructions.

A pointer should identify the material and the specific decision or workflow that needs it:

- Front-load the task, not a broad subject area or a list of loosely related requests.
- Distinguish genuinely different routes without repeating synonyms for the same route.
- Keep essential scope visible even if a host shortens the description. Put route-specific detail in the body.

## The two loads

Consider both context cost and discovery effort:

- **Context load** is the material a host exposes to the model, including metadata and any documents it loads. Exposure and retention depend on the host, not just the document's location.
- **Discovery effort** is the work of finding the right guidance. Explicit invocation can preserve deliberate user choice, but requiring the user to remember many unrelated commands also has a cost.

Progressive disclosure can avoid loading irrelevant detail. Referenced material still consumes context when read; a link is not a guarantee of zero cost or reliable discovery.

## Information hierarchy

Separate shared decisions from task-specific detail:

- Keep purpose, activation, authorization boundaries, and completion conditions in the root.
- Keep a short procedure or reference inline when the selected task needs it.
- Move substantial conditional detail behind a link that states when it is needed.

Preserve useful examples, scripts, compatibility details, and pitfalls. A short, single-purpose document does not need more files.

**Co-location** keeps a concept's definition, conditions, and caveats together. Avoid scattering one rule across sections or moving its exception somewhere readers are unlikely to find.

If a root covers several workflows, use a minimal router. Split along the different tasks and their reference needs, rather than an arbitrary line count.

## Steps and completion criteria

Define what must be true at completion, the relevant evidence, and the scope that bounds the work. Criteria should cover the requested contract without requiring exhaustive investigation of unrelated concerns.

- Prefer an observable result over an artifact proxy. A change list does not establish that the requested behavior works.
- Permit safe, in-scope corrections until the result meets its acceptance criteria. The first plausible answer is not necessarily completion.
- Stop when the requested result is supported and no material in-scope issue remains. Broaden or repeat investigation only for new evidence, a failure, or an unresolved concern.
- If a required result cannot be established within scope, report the specific blocker and verification limit instead of claiming success or exploring indefinitely.

Specify a sequence only where its order matters. For example, reproducing a failure before a change may preserve diagnostic evidence; a fixed number of search, planning, or review rounds usually does not establish correctness.

## When to split

Split when the boundary helps the task:

- **By workflow or reference need:** separate material that only a selected route needs.
- **By causal dependency:** retain required prerequisites and handoff conditions when correctness, safety, or reproducibility depends on them.
- **By invocation:** create independently discoverable skills only when independent selection is useful. See [`SKILL-MECHANICS.md`](../SKILL-MECHANICS.md).

Do not require a subagent or hidden later steps merely to induce more thinking. Claims that context isolation improves task outcomes need evidence, not a prescribed agent count.

## Terminology and cognitive hypotheses

Use consistent, established terms when they preserve the intended distinctions. A compact term can reduce repetition, but define it when its meaning is not shared. Do not replace precise conditions such as "fast, deterministic, low-overhead" with an ambiguous label such as "tight."

A term such as "red" is useful when it names an observable state, such as a relevant test failing for the expected reason. It is not a substitute for defining that state.

Claims that leading words recruit particular model priors, that repetition guarantees behavior, or that negation makes a prohibited action more likely are hypotheses unless supported by relevant evidence. Do not turn those explanations into universal authoring rules.

State required actions and prohibitions directly. Add a positive alternative when it clarifies what is permitted; keep necessary negative constraints rather than weakening them to avoid a supposed cognitive effect.

## Pruning

- Keep each policy in its owning document. Use a pointer rather than copying a rule into several places.
- Prefer current environment evidence for discoverable settings, commands, and interfaces. Preserve conventions, reasons, and pitfalls that the environment does not explain. See [Encode Lessons in Structure](../../../programming/references/principles/principle-encode-lessons-in-structure.md).
- Remove generic reminders or redundant material when they change no useful decision or have equivalent coverage in a reachable maintained reference.
- Do not treat model familiarity as evidence that technical knowledge is redundant. Preserve useful examples, scripts, and boundary conditions.
- When technical value or correctness remains uncertain, retain the material conditionally and state the uncertainty until evidence supports correction or removal.
- Replace vague demands for more effort with the missing outcome, evidence, or stop condition. Stronger adjectives do not establish a better workflow.

## Evidence

Distinguish source review, static checks, and measured task behavior. For performance claims or a consequential uncertain prompt change, use the [outcome evaluation guidance](../../../programming/evals/README.md). Compare task correctness, scope, unnecessary work, and retained knowledge rather than prompt recitation or adjective strength.

An editorial improvement or a successful link check does not demonstrate better model performance. Preserve guidance that remains useful across supported models; do not generalize a model-specific result without evidence.
