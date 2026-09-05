# New components

Reuse an existing component when its public API satisfies the requested behavior.
For a new component, preserve the repository's component API and state ownership conventions.

Use a transient element for presentation without independent persistent state.
Use an entity when the component needs persistent state, observation, or a distinct lifetime.
Do not add every interactivity trait or a state entity merely to match a template.

Update public documentation when the new API requires it.
Add a story when requested or required by the repository.
Do not create a story framework as an incidental implementation step.

For API decisions, use [style guide](style-guide.md).
For relevant checks, use [component contracts](component-test-rules.md).
