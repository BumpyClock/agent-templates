# GPUI

Use this guide for GPUI tasks. Read only the references needed for the affected behavior.
Repository conventions take precedence over the component examples below.

## Summary

- Build GPUI components following existing `crates/ui` patterns + style guide. Keep APIs consistent, builder-style.
- Stateless vs stateful: deliberate choice. Use `Entity<T>` for stateful patterns, notify on updates.
- Styling: `StyleRefinement`, `Styled`, fluent builders, theme tokens.
- Actions/focus: wire explicitly with `key_context`, `actions!`, `FocusHandle`.
- Stories/docs: mirror `crates/story` and `docs` patterns.
- Tests: `TestAppContext` for non-visual logic, `VisualTestContext` for window/rendering.

## Component Build Steps

1. **Decide type**: stateless element for pure presentation; stateful element + `Entity<State>` when UI state persists.
2. **Struct layout**: `id: ElementId`, `base: Div`, `style: StyleRefinement`. Field order: identity → config → content/children → callbacks. Callbacks as `Option<Rc<dyn Fn(...)>>`.
3. **Builder API**: return `Self` from setters (`label`, `on_click`, `disabled`). Keep naming consistent with existing components.
4. **Traits**: `InteractiveElement`, `StatefulInteractiveElement` (when stateful), `Styled`, `RenderOnce`. Add `Sizable`/`Selectable`/`Disableable` when appropriate.
5. **Render**: `cx.theme()` for colors/tokens. Compose with fluent builders (`flex`, `gap`, `items_center`, `rounded`). `RenderOnce` focused, no side effects.
6. **State/async**: `WeakEntity` in closures to avoid retain cycles. `cx.spawn` foreground, `cx.background_spawn` heavy work. Sequence entity updates, don't nest.
7. **Actions/focus/events**: `actions!` or `#[derive(Action)]`. `cx.bind_keys()`, `key_context()` on root. `FocusHandle` + `track_focus()`. `cx.emit`/`cx.subscribe`/`cx.observe`.
8. **Stories/docs/tests**: stories follow `crates/story/src/stories` with `section!`. Docs follow `docs/*.md`. Tests: `TestAppContext` logic, `VisualTestContext` window/rendering.

## Task Routing

- New components/refactors → `references/style-guide.md` + `references/new-component.md` (+ `references/layout-and-style.md` as needed)
- Component stories → `references/generate-component-story.md`
- Component docs → `references/generate-component-documentation.md`
- Actions/key bindings → `references/actions.md`
- Async/background work → `references/async.md`
- Context/window/entity → `references/context.md`
- Entity state → `references/entity.md`
- Events/subscriptions/observers → `references/event.md`
- Focus/keyboard nav → `references/focus-handle.md`
- Global state → `references/global.md`
- Tests → `references/test.md`, `references/test-reference.md`, `references/test-examples.md`, `references/component-test-rules.md`
- PR descriptions → `references/github-pull-request-description.md`
