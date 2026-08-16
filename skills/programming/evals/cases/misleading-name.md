# misleading-name

## Trigger
Digests-Swift repo audit (2026-07-04): `testNetworkErrorHandling` and `testTimeoutErrorHandling` call the SUT with normal inputs; no mock ever throws, no clock ever advances. The named error/timeout branch is never exercised.

## Expected
`tdd-rules.md` checklist: "no test named for a path its body doesn't exercise." `write-tests.md` coverage theater violation: test name contains error/timeout/cancel/retry with no throw/clock/cancellation in the body.

## Observed failure
Agent (Sonnet 4.5, 2026-07-04) counted these as error-path coverage in a status report; the real error branch remained untested.
