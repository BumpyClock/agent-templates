# Full design workflow

Read for a new product or page, or a requested full redesign. Design visuals and interactions together. The steps are iterative. Do only the steps the task needs, and skip a step when the brief or the existing design already settles it.

For a new product or a requested full redesign, you own the design system and its code, and their structure is up to you. Consolidate duplicated tokens, styles, and components as you build. This ownership does not apply to a feature or edit inside someone else's established surface, or to the Preserve mode in `redesign.md`.

1. **Gather inputs.** Establish the task, users, content, and constraints. Identify existing tokens and components in theme configs, CSS variables, or Storybook. When a significant decision remains unclear, choose the option that the brief and product evidence best support, record it as an assumption, and continue. Use the `grilling` skill only when the user asks for it.
2. **Resolve direction.** Inherit the existing visual system unless a new direction is needed or requested. Use `design-direction.md` for that choice, and check a new direction against `generic-patterns.md`. When options are requested or needed to resolve uncertainty, compare a few distinct directions, usually two or three, or a few quieter-to-bolder variations within one direction. When the brief does not settle a consequential direction choice, build the compared options and present them with a recommendation, so the user chooses from concrete results.
3. **Define structure.** Establish the user task, content order, and key flows.
4. **Compose layout.** Use `layout.md` to define regions, grid, responsive behavior, navigation, and hierarchy. Use `page-composition.md` when comparing alternative structures would help resolve the task.
5. **Develop interactions and visual details.** Define states, transitions, and feedback, including loading, empty, error, and validation states. Specify color roles, typography, spacing, and tokens consistently across the affected screens. Use an interactive prototype when testing a flow or resolving a significant design choice would benefit from one; a separate mockup is not required for routine implementation.
6. **Refine.** Check radii, optical alignment, text wrapping, numeric alignment, hit areas, image outlines, and motion behavior.
7. **Verify the output.** Inspect the affected interface using `critique.md`, including accessibility and reduced-motion behavior. Review motion at reduced speed or frame by frame when needed. When the design breaks a familiar pattern, recommend user testing in the report. Report checks that could not be performed.

Finish when the affected screens render with their states covered and the `critique.md` checks pass or are reported. Report as described in the `Finish` section of `SKILL.md`, and include the chosen direction and its reason.
