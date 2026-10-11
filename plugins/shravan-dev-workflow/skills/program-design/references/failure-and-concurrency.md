# Failure and Concurrency

This reference owns how failure, partial success, recovery, and overlapping actors are handled.

Expected inputs: the interfaces, state, and flows; the failure behavior the Specification requires; the fallible boundaries; and where actors can overlap. Return: for each case, detection, containment, and the recovery owner; retry and idempotency decisions; the concurrency and consistency model; what the operator sees; and gaps.

For each fallible boundary, model:

```text
detection and classification
propagation vs containment
retry owner, eligibility, limits, backoff class
idempotency and duplicates
timeout and cancellation
cleanup or compensation
partial-success visibility
recovery source of truth
degraded behavior and operator signal
crash/restart behavior when applicable
```

For overlapping actors:

```text
ordering assumptions
atomicity/transaction boundary
consistency model
race/conflict resolution
duplicate/out-of-order behavior
locking/versioning/serialization mechanism class
backpressure/capacity boundary
```

Construct a concrete failure or interleaving. "Use retries", "add a lock", or "eventual consistency" is not a design until the owner, eligibility, invariant, failure consequence, and seam and observation point are known.

Which view shows a failure or an interleaving is `views.md`'s call.

Do not invent product failure policy. Missing failure behavior that someone outside the system would see is a `specification-gap`.

Good: the exact timeout-after-side-effect path, with duplicate prevention, the recovery source of truth, the outcome the user sees, and where it is observed.

Bad: happy path plus a generic error handler.

## Complete When

Every material failure or interleaving preserves its invariants, or has explicit containment, recovery or conflict behavior, an owner, and a seam and observation point.
