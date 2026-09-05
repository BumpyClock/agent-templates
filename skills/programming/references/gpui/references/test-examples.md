# Test execution

Use the repository's test command and supported platform.
When no wrapper applies, select the affected package and test:

```bash
cargo test -p <package> <test-filter>
```

When the package exposes a `test-support` feature, enable it if the selected test requires it:

```bash
cargo test -p <package> --features test-support <test-filter>
```

Replace placeholders with names from the workspace.
Do not add a feature or CI workflow merely because this example mentions one.
`--test-threads=1` controls Rust test concurrency, not GPUI randomized test iterations.

For a performance claim, use the project's benchmark or a representative runtime measurement.
An arbitrary elapsed-time assertion in a unit test is not a portable performance threshold.

For runnable test examples, inspect the matching revision's
[test context source](https://github.com/zed-industries/zed/blob/main/crates/gpui/src/app/test_context.rs).
