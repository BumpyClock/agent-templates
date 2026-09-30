# Instruction design

This reference explains editorial tradeoffs. For routine edits, use the [root checklist](../SKILL.md).

This reference applies to skills, `AGENTS.md`, `CLAUDE.md`, and linked guidance. Aim for results that meet the full contract within the user's scope. Do not run the same process on every task. Keep an ordered procedure when causal correctness, safety, or reproducibility depends on the order.

For skill frontmatter, invocation choices, and router skills, read [`SKILL-MECHANICS.md`](../SKILL-MECHANICS.md).

For wording and token cost, use [Concise wording](concise-wording.md). Read `unslop` or `technical-writing` only for substantial prose revision or explicit style review.

## Context pointers

A **context pointer** names linked material and the condition for reading it. Skill descriptions and `AGENTS.md` references both guide discovery. Actual skill invocation also depends on the host. When an agent misses needed material, inspect the pointer, the target, and the loading mechanism. Do this before adding more instructions.

A pointer names the material and the specific decision or workflow that needs it:

- Put the task first. Do not lead with a broad subject area or a list of loosely related requests.
- Separate genuinely different routes. Do not repeat synonyms for one route.
- Keep essential scope visible even if a host shortens the description. Put route-specific detail in the body.

## The two loads

Weigh both context cost and discovery effort:

- **Context load** is the material a host exposes to the model, including metadata and loaded documents. The host decides exposure and retention. Document location alone does not.
- **Discovery effort** is the work of finding the right guidance. Explicit invocation can preserve deliberate user choice. Making users remember many unrelated commands also has a cost.

Progressive disclosure can avoid loading irrelevant detail. Referenced material still consumes context when read. A link does not guarantee zero cost or reliable discovery.

## Information hierarchy

Separate shared decisions from task-specific detail:

- Keep purpose, activation, authorization boundaries, and completion conditions in the root.
- Keep a short procedure or reference inline when the selected task needs it.
- Move substantial conditional detail behind a link. State when the link is needed.

Keep useful examples, scripts, compatibility details, and pitfalls. A short, single-purpose document needs no extra files.

**Co-location** keeps a concept's definition, conditions, and caveats together. Do not scatter one rule across sections. Do not move an exception to a place readers are unlikely to look.

If a root covers several workflows, use a minimal router. Split by task and reference need, not by line count.

## Steps and completion criteria

Define the completion state, the evidence, and the scope that bounds the work. Criteria cover the requested contract. They do not require exhaustive investigation of unrelated concerns.

- Prefer an observable result over an artifact proxy. A change list does not prove that the requested behavior works.
- Allow safe, in-scope corrections until the result meets its acceptance criteria. The first plausible answer is not necessarily complete.
- Stop when evidence supports the requested result and no material in-scope issue remains. Broaden or repeat investigation only for new evidence, a failure, or an unresolved concern.
- If you cannot establish a required result within scope, report the specific blocker and verification limit. Do not claim success or explore indefinitely.

Specify a sequence only where order matters. For example, reproducing a failure before a change can preserve diagnostic evidence. A fixed number of search, planning, or review rounds usually does not establish correctness.

## When to split

Split when the boundary helps the task:

- **By workflow or reference need.** Separate material that only one route needs.
- **By causal dependency.** Keep required prerequisites and handoff conditions when correctness, safety, or reproducibility depends on them.
- **By invocation.** Create independently discoverable skills only when independent selection is useful. See [`SKILL-MECHANICS.md`](../SKILL-MECHANICS.md).

Do not require a subagent or hidden later steps only to induce more thinking. A claim that context isolation improves task outcomes needs evidence. A prescribed agent count is not evidence.

## Terminology and cognitive hypotheses

Use consistent, established terms that preserve the intended distinctions. A compact term can reduce repetition. Define it when readers do not share its meaning. Do not replace precise conditions such as "fast, deterministic, low-overhead" with an ambiguous label such as "tight."

A term such as "red" is useful when it names an observable state, such as a relevant test failing for the expected reason. The term does not replace a definition of that state.

Treat these claims as hypotheses unless relevant evidence supports them:

- The claim that leading words recruit particular model priors.
- The claim that repetition guarantees behavior.
- The claim that negation makes a prohibited action more likely.

Do not turn these hypotheses into universal authoring rules.

State required actions and prohibitions directly. Add a positive alternative when it clarifies what is permitted. Keep necessary negative constraints. Do not weaken them to avoid a supposed cognitive effect.

## Pruning

- Keep each policy in its owning document. Point to it instead of copying the rule.
- Prefer current environment evidence for discoverable settings, commands, and interfaces. Keep conventions, reasons, and pitfalls that the environment does not explain. See [Encode Lessons in Structure](../../../pstack/principle-encode-lessons-in-structure/SKILL.md).
- Remove generic reminders and redundant material that change no useful decision. Also remove material that has equivalent coverage in a reachable maintained reference.
- Model familiarity does not make technical knowledge redundant. Keep useful examples, scripts, and boundary conditions.
- When technical value or correctness is uncertain, keep the material conditionally. State the uncertainty until evidence supports correction or removal.
- Replace vague demands for more effort with the missing outcome, evidence, or stop condition. Stronger adjectives do not produce a better workflow.

## Evidence

Separate source review, static checks, and measured task behavior. Assess task correctness, scope, unnecessary work, and retained knowledge. Do not assess prompt recitation or adjective strength.

An editorial improvement or a passing link check does not show better model performance. Keep guidance that stays useful across supported models. Do not generalize a model-specific result without evidence.
