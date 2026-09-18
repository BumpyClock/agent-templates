# Payloads and delivery

Use the sections relevant to a change in encoded fields, serialization, routing, exporters, schemas, or collectors. Ordinary call-site changes through an established helper do not require a pipeline-wide investigation.

## Final-wire privacy

Inspect the final serialized payload, not only the object supplied to a tracking helper. Projection, enrichment, and envelope code can change what leaves the process.

For reversible encoding or compression, decode and decompress the final wire value in a round-trip test. Use distinctive sensitive sentinels to verify that disallowed data is absent from the decoded payload and that any approved restricted data stays out of unrestricted projections. Searching opaque encoded bytes for plaintext is not a privacy check.

Assert wire types, units, optional-field behavior, and routing. If restricted and unrestricted projections exist, test each independently; a restricted projection need not cover the same population.

## Compatibility before emission

Identify the consumers of the changed structure: shared SDK contracts, serializers, collectors, allowlists, storage schemas, and downstream transforms. Inspect affected boundaries rather than assume an additive producer field is safe. Strict consumers can reject an entire event, and collectors can silently discard unknown names or tags.

Preserve existing meanings and units. Use the repository's migration or versioning mechanism when a contract must change. A flexible property bag may avoid a fixed-schema migration, but does not remove privacy or consumer obligations.

Where consumers must learn the new shape, prepare and verify their compatibility before releasing or enabling producer emission. Include secondary outputs and downstream transforms, not only the primary schema. Keep emission gated when release ordering cannot otherwise be guaranteed. Preparing code does not authorize deployments or production flag changes.

## Export behavior

For transport changes, exercise unavailable collectors, rejected payloads, queue saturation, and shutdown as applicable. Keep retry and memory use bounded, and preserve the application's result. Expose dropped data or exporter failures through supported diagnostics without generating a reporting loop.

Separate local emission from delivery semantics. Retried delivery can duplicate an event even when the application emits it once. Use stable event identifiers and existing deduplication support when the measurement requires it; do not claim exactly-once delivery without evidence.

## Destination evidence

A successful tracking call or HTTP response proves neither conversion nor storage. When destination access is authorized and available, verify that a controlled signal reaches its intended sink with the expected shape and context.

For a rollout, scope evidence to the producer build, environment, population, and time window. Check field presence and types alongside event volume and ingestion delay. Compare an appropriate previous build or pre-rollout window where useful; no rows do not establish a zero failure rate.

Account for consent, sampling, and filtering before comparing counts or rates. Use matching numerator and denominator populations, and distinguish event counts from operations or affected users. Confirm required secondary outputs as well as the main destination.

Without destination access, establish local serialization and collector compatibility as far as available tools permit. State what remains unverified; do not enable collection, obtain broader access, or deploy merely to complete a check.
