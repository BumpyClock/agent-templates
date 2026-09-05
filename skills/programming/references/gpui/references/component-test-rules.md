# GPUI component tests

Use [Write tests](../../write-tests.md) for test selection, assertions, and regression value.
When the user or repository requires TDD, use [TDD rules](../../tdd-rules.md).

## Component contracts

Select component checks from behavior at risk, such as disabled actions, focus transitions, event delivery, and state updates.
A builder test is useful when option interactions enforce a contract, such as disabled state overriding click availability.
Property assignments alone do not establish a need for a builder test.

### Example: click availability

```rust
#[gpui::test]
fn test_button_clickable_logic(_cx: &mut gpui::TestAppContext) {
    // Test behavior under multiple conditions
    let clickable = Button::new("test").on_click(|_, _, _| {});
    assert!(clickable.clickable());

    let disabled = Button::new("test").disabled(true).on_click(|_, _, _| {});
    assert!(!disabled.clickable());

    let loading = Button::new("test").loading(true).on_click(|_, _, _| {});
    assert!(!loading.clickable());
}
```

## GPUI context selection

- Use ordinary `#[test]` for pure logic that needs no GPUI runtime.
- Use `#[gpui::test]` with `TestAppContext` for entity, event, or executor behavior.
- Use `VisualTestContext` for window, focus, input, or rendered behavior.

The example checks the component's click policy. Use an event-level check when callback dispatch is the contract at risk.

See [test.md](test.md) for context setup and [test-reference.md](test-reference.md) for framework mechanics.
