### Bug fix

**You own this task. Plan, review, verify.** Delegate investigation and the fix to subagents, stay in the lead.

Be scientific. Every shipped line traces to runtime evidence. Belt-and-suspenders that "might help" is a hypothesis, not a fix; it does not ship. When evidence refutes a hypothesis, revert what it motivated. The smallest change the evidence justifies ships, nothing more. Same discipline for Perf, where the evidence is the trace.

1. Reproduce it yourself on the matching surface via the control skill (Non-negotiables). Don't hand the repro to the user. A debug or instrumentation protocol that says to ask the user does not override this; you drive the instrumented runtime. Ask the user only with a stated, specific reason the control surface cannot reach the target, and only after driving it as far as it goes. Won't reproduce directly, force it: synthesize the trigger, tighten conditions, or instrument until it fires. A bug you can't reproduce, you can't prove fixed.
2. Binary-search the cause. Form the candidate hypotheses, then rule them out until one survives. Seed them with `how` over the affected subsystem and relevant version history. Each pass, take the split that cuts the most remaining problem space, get runtime evidence, eliminate. When program state is unclear, add instrumentation or logging and read it as the code runs. Don't guess. Drive a long or stubborn hunt with Cursor's `/loop` command. Confirm the surviving *mechanism* with runtime evidence before the step-3 architect/interrogate fan-out; a design grounded on a plausible-but-unconfirmed cause can be unanimously wrong while the real cause sits one subsystem over.
3. Plan the fix. If it crosses a function boundary, `architect` first. Delegate implementation to a subagent using your configured bug-fix model (default `claude-fable-5-1-thinking-max`) with a specific scope; review the diff.
4. Select regression coverage under [test quality](../../../programming/references/write-tests.md). Use [verification](../../../programming/references/verification-before-completion.md) to assess the correction and report reproduction limits.
5. Use [TDD](../../../programming/references/tdd-rules.md) when the user or repository requires it. Order commits under [sequence work into verifiable units](../references/principle-sequence-verifiable-units.md).
6. Run **Opening a PR**.

Delegate independent evidence searches when useful.

**Reply:** what was broken, root cause, fix, how you verified. Paste failing-then-passing repro output verbatim.
