# pinned-constant

## Trigger
Digests-Swift repo audit (2026-07-04): `AccentColorContractTests` hardcodes the expected accent color as literal RGB (`Color(red: 0.21, green: 0.48, blue: 0.94)`) instead of reading it from the asset catalog. The asset catalog is never consulted by the test.

## Expected

For an asset-consistency test, compare the consumed value with the authoritative asset. Preserve independent literal expectations when an external design contract specifies an exact color. Establish which contract this test protects before a change.

## Observed failure
Agent (Sonnet 4.5, 2026-07-04) wrote the literal by reading the current asset value once; the test now only fails if someone forgets to update both places in lockstep, not if the asset itself is wrong.
