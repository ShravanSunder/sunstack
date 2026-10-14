# Observable Contracts

This reference owns externally observable contract and negative-space inspection.

Expected inputs: requirement inventory, consumers, external surfaces, compatibility constraints, and known failure policies.

Return: the permitted and forbidden behavior per load-bearing surface, the literal-counterexample correction for each material obligation, unresolved policy decisions, and requirement links.

For each load-bearing UI, API, CLI, protocol, schema/event, configuration, operator, or human/agent artifact surface, inspect:

```text
authority or public owner
consumer
inputs and preconditions
outputs and postconditions
state visible to the consumer
invariants
error and failure behavior
partial success
cancellation and timeout expectations
compatibility boundary
valid and boundary/invalid examples
explicitly undefined behavior
```

Only include fields that affect consumer interpretation. Do not fill an internal architecture template inside the specification.

## Good and Bad Signals

Good:

- names who can rely on the contract and which authority can change it;
- distinguishes rejection, retryable failure, partial success, timeout, and unknown outcome;
- says what duplicate, out-of-order, stale, empty, or malformed input does when material;
- identifies compatibility that must hold and nearby behavior intentionally left undefined;
- uses examples to disambiguate rules, not replace them.

Bad:

- “handle errors gracefully” without an externally visible outcome;
- “support existing behavior” without identifying which behavior is promised;
- only a happy-path example;
- exposing internal component names as public contract without an authoritative reason;
- claiming atomic success when partial external effects are possible.

## Break the Words

For each material obligation, write the cheapest implementation that satisfies its words, then check it against the outcome the owner adopted. When the cheap implementation passes the words and misses the outcome, the obligation names a proxy instead of the outcome. Rewrite it over the observable result, and say which near-miss counts as failure.

```text
Words:    The dashboard shows current figures.
Cheap:    Rebuild the figures once a day; "current" is whatever the last rebuild produced.
Missed:   The owner's operators act on figures within minutes of a transaction.
Rewrite:  Figures include every transaction committed at least five minutes before the
          page loads, and the page shows the as-of time it reflects.
```

```text
Words:    Duplicate submissions are handled.
Cheap:    Reject every second request with the same key, including a retry after a timeout.
Missed:   The owner wanted a retry to return the original result.
Rewrite:  For a repeated request with the same idempotency key and equivalent payload,
          the service returns the original outcome and performs no second side effect.
          A different payload under the same key is rejected.
```

A clean case needs no rewrite: "The export file contains one row per invoice in the selected period" already fails a cheap implementation that drops or duplicates rows, because a row count against the source invoices tells pass from fail.

Stop when no cheap implementation you can name satisfies the words while missing the outcome. An obligation you could not break because you never tried is unfinished.

## Negative Space

Name the nearest behavior a capable implementer may assume but must not build. Examples:

- no cross-account aggregation;
- no offline guarantee;
- no order preservation across independent streams;
- no compatibility promise for undocumented payload fields;
- no automatic recovery after an operator cancels the workflow.

Undefined behavior is not permission to violate an invariant. Say which freedom remains and which guarantees still constrain it.

Complete when: each load-bearing consumer can predict normal, boundary, failure, partial, cancellation, and compatibility behavior without guessing internal structure, and each material obligation has survived its literal counterexample.
