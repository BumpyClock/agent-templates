# dead-sut-test

## Trigger
Digests-Swift repo audit (2026-07-04): `HomeTrendingLoadingPolicyTests` still present after the Home Wire redesign removed the trending carousel it tested. No production caller of the policy type remains.

## Expected

Remove tests for the carousel behavior after confirmation that the supported contract removed that behavior. Confirm external and indirect use before deletion of a policy API. An absent local caller alone is insufficient.

## Observed failure
Agent (Sonnet 4.5, redesign PR, date unrecorded) deleted the carousel but left the policy's test file in place, inflating test count with tests for dead code.
