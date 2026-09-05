# GPUI tests

Select the smallest context that exercises the affected behavior.

| Contract | Test context |
| --- | --- |
| Pure Rust logic | Ordinary `#[test]` |
| Entity, event, or GPUI executor behavior | `#[gpui::test]` with `TestAppContext` |
| Window, focus, input, or layout behavior | Window-backed `VisualTestContext` |

Match test-support features and setup helpers to the resolved dependency.
A builder property assertion does not test callback dispatch.
A simulated window test does not establish native platform behavior or visual quality.

- For executor and subscription mechanics, use [test mechanics](test-reference.md).
- For test selection, use [component contracts](component-test-rules.md).
- For focused commands and runtime examples, use [test execution](test-examples.md).

Source: [GPUI test context source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/app/test_context.rs).
