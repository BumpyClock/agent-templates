# Motion plan guidance

Use this reference only when the user requests a plan or roadmap.
Match the requested format. A small change can be planned in the response; create files only when requested.
For saved plans, preserve existing names and index conventions rather than introduce a new numbered directory or mandatory README.

A handoff must include the facts needed to execute it without this conversation. Group related findings by the change that resolves them.
Use the sections below when they add necessary information; omit empty sections.

````markdown
# <Short imperative title>

## Problem

Describe the affected behavior and evidence. Cite relevant locations and include
the code needed to understand the change, for example:

```css
.dropdown { transition: all 400ms ease-in; }
```

## Target

Specify observable behavior and the chosen values or existing tokens. For a
dropdown whose inspected entrance is delayed and whose origin is incorrect:

```css
.dropdown {
  transition: transform 200ms var(--ease-out), opacity 200ms var(--ease-out);
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
}
```

## Relevant conventions

Identify the existing token definitions, runtime, or comparable component
needed to implement the target. Preserve suitable project values.

## Steps

List the bounded edits in dependency order, including files and intended changes.

## Boundaries

Name excluded components and behavior that must remain unchanged.
Reconcile harmless code-location drift. Stop for a decision if the intended
behavior or required scope differs materially from the authorized plan.

## Verification

- Select existing mechanical checks that cover the affected risk; give exact
  commands and expected results when those checks are needed.
- Run the affected interaction and inspect its relevant states, interruption,
  and reduced-motion behavior. State concrete observations that establish success.
- Use slow motion, sequential captures, or a real device when that evidence is
  needed for the interaction. Do not require every capture method.
- Reduced-motion feedback must remain understandable; instant updates are valid.
- Fix material in-scope defects and inspect the changed behavior again.
- State what remains unverified if runtime access or tools are unavailable.
````

## Notes for the plan author

- Use [Audit guidance](AUDIT.md) for relevant tradeoffs and examples, not a mandatory source of every target value.
- For a durable code-specific handoff, a commit stamp from `git rev-parse --short HEAD` can identify the inspected revision. Include it when useful.
- Keep actual-output inspection in implementation completion criteria. A passing build cannot establish motion quality.
- Update an existing plan index when the requested saved-plan workflow uses it. Do not create extra tracking artifacts for a response-only plan.
