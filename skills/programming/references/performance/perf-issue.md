# Resolve a performance issue

Use this workflow for an authorized correction to a measured performance problem.
For diagnosis without a fix, use [runtime forensics](runtime-forensics.md) or [trace forensics](trace-forensics.md).

## Workflow

1. Define the user-relevant metric and a representative workload.
   Choose a decision criterion before the edit, such as a latency target or a material reduction above measurement noise.
   Set a bounded investigation scope and resource budget.
   This step ends with a metric, workload, decision criterion, and budget.
2. Measure the baseline with relevant existing tools.
   Record the revision, build configuration, dependencies, hardware, input data, concurrency, warmup, and cache state.
   Record the measurement command, tool version, capture settings, and artifact location.
   When noise matters, repeat measurements under comparable conditions.
   Report the run count, central estimate, and dispersion.
   This step ends with a reproducible baseline or an explicit measurement blocker.
3. Explain the dominant cost with source evidence and a relevant profile, trace, or query plan.
   Use [systematic diagnosis](../../systematic-debugging/guide.md) to distinguish plausible mechanisms.
   Select a strategy below only when the evidence supports its signal.
   This step ends with a supported mechanism and a prediction that a focused change can test.
4. Apply the smallest authorized change that addresses the supported mechanism.
   Check semantic correctness independently of the speed measurement.
   Use [test quality](../write-tests.md) to select coverage for the affected contract.
   Preserve output, error behavior, and required side effects unless the task explicitly changes those contracts.
   This step ends with correctness evidence for the changed behavior.
5. Measure the changed revision under the baseline conditions.
   Keep unrelated revisions, workload changes, and environment changes outside the comparison.
   When drift or noise affects the comparison, repeat matched trials or alternate baseline and changed runs.
   Report both measurements, the absolute delta, dispersion, run counts, and artifact locations.
   Apply [verification before completion](../verification-before-completion.md) to the completion claim.
   This step ends with an improvement, no demonstrated improvement, or an inconclusive result against the decision criterion.

## Select a strategy from the signal

Choose the family that explains the measured cost.
These families are alternatives, not a checklist.

- Eliminate unnecessary work when source and contract evidence show that no required behavior depends on it.
  A profile locates cost but cannot establish that work is unnecessary.
- Divide the problem when cost grows with input size.
  Reduce each operation's input or separate independent work.
  Account for coordination overhead and shared resource limits before parallel execution.
- Cache when identical inputs cause repeated computation or requests.
  Define invalidation, freshness, and memory bounds before reuse.
- Add an index or indirection when repeated scans or expensive access dominate.
  Include construction, maintenance, and extra access costs in the comparison.
- Batch when many small operations each incur fixed overhead.
  Preserve ordering and failure semantics where the contract requires them.
  Bound batch delay so throughput gains do not conceal worse interactive latency.
- Hedge requests when a slow attempt dominates tail latency and spare capacity can absorb duplicate work.
  Require safe side effects and a bounded cancellation policy before duplicate execution.
  Measure added load as well as tail latency.
- Defer work when results are unused or unnecessary until later.
  Measure first-use latency so deferred cost remains visible.
- Schedule required work outside the interactive interval when that interval contains the measured delay.
  Measure user latency and total resource cost separately.

## Bound the conclusion

Use comparable units and the same metric definition for both revisions.
Compute ratios only when the denominator is positive and above measurement resolution.
State the ratio direction and denominator.
Reject ratios between unrelated metrics or unmatched workloads.
Do not present ratios of sample shares as runtime speedups.

Account for profiler overhead before a user-latency claim.
Treat a microbenchmark gain as evidence for that operation, not automatically for the end-to-end task.
Distinguish the observed delta from the evidence that supports a causal mechanism.
When conditions differ or the signal remains within noise, report the comparison as inconclusive.

Stop at the decision criterion, the agreed budget, or an evidence blocker.
For an unsupported attempt, reassess the mechanism before another edit.
Keep commits, pull requests, and broader optimization work outside this workflow unless separately authorized.
