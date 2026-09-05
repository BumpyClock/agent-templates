# Component test contracts

Select checks from the changed behavior.
Relevant contracts can include disabled actions, focus transitions, event delivery, or state updates.

Test a builder option when option interactions enforce a public contract.
Do not add tests that only repeat independent property assignments.
Use an event-level check when callback dispatch is the behavior at risk.

For context selection, use [GPUI tests](test.md).
For general test design, use [Write tests](../../write-tests.md).
When the user or repository requires TDD, use [TDD rules](../../tdd-rules.md).
