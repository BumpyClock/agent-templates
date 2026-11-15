# Full design workflow

Design visuals and interactions together; the steps below are iterative. Apply accessibility requirements throughout, including keyboard operation, focus, contrast, semantics, and reduced motion.

1. **Gather inputs.** Establish the task, users, content, and constraints. Identify existing tokens and components in theme configs, CSS variables, or Storybook. Use `grilling` when significant decisions remain unclear, not when the brief already answers them.
2. **Resolve direction.** Inherit the existing visual system unless a new direction is needed or requested. Use `design-direction.md` for that choice. When options are requested or needed to resolve uncertainty, compare 2–3 distinct directions, or 3–5 quieter-to-bolder variations within one direction. Ask the user to resolve consequential uncertainty before committing.
3. **Define structure.** Establish the user task, content order, and key flows.
4. **Compose layout.** Use `layout.md` to define regions, grid, responsive behavior, navigation, and hierarchy. Use `page-composition.md` when comparing alternative structures would help resolve the task.
5. **Develop interactions and visual details.** Define states, transitions, and feedback, including loading, empty, error, and validation states. Specify color roles, typography, spacing, and tokens consistently across the affected screens. Use an interactive prototype when testing a flow or resolving a significant design choice would benefit from one; a separate mockup is not required for routine implementation.
6. **Refine.** Check radii, optical alignment, text wrapping, numeric alignment, hit areas, image outlines, and motion behavior.
7. **Verify the output.** Inspect the affected interface using `critique.md`, including accessibility and reduced-motion behavior. Review motion at reduced speed or frame by frame when needed. Test with real people in context when feasible. Report checks that could not be performed.
