# Failure, Concurrency, and Recovery

This reference owns failure realization, partial success, recovery, and material interleavings.

Expected inputs: interface, state and flow models, externally required failure behavior, fallible boundaries, and overlap risks.

Return: the recovery owner for each fallible boundary, which repeats are safe, the failure or interleaving result for each material case, the concurrency and consistency model, operator visibility, and gaps.

## Walk a Concrete Case

A failure design starts from a case you can replay step by step, never from a pattern name. "Use retries", "add a lock" or "eventual consistency" becomes a design only once its owner, eligibility, invariant, observable consequence and proof seam are named.

### A timeout after the side effect, with two retry owners

```text
Obligation: a customer is charged at most once per order and sees the charge result.
t0  the checkout job asks the payment client to capture the order
t1  the provider captures the money; its response times out on the way back
t2  the payment client retries the HTTP call; the job runner also retries the job
t3  the provider sees two more capture requests for the same order
```

Two components each believed they owned retry, and neither knew that a timeout can arrive after the side effect. The repair names one retry owner (the job runner), sends the order's idempotency key with every capture, and makes the client attempt once. A timed-out capture becomes `outcome-unknown`, and the job runner resolves it by asking the provider for that key's result before it retries.

Sort the claims this walk produced:

- invariant the structure enforces: only the job runner retries, and every capture for an order carries that order's key;
- owner meaning: what the customer sees while the capture is `outcome-unknown`. When the Specification does not say, return a `specification-gap`; a message chosen here would be invented product behavior;
- needs observation: whether the provider honors the idempotency key across the retry window. Its documentation claims it does; until it is observed against the provider's sandbox or production, list it as owed evidence and design for the worse answer.

### A callback after its owner closed

```text
t0  operator opens a send to pane B; the router registers a completion callback
t1  operator closes pane B; the pane's owner disposes its input buffer
t2  the write completes and the callback fires against the disposed buffer
```

The lifecycle owner must decide what an in-flight completion does after close. A good design makes the late callback a no-op that the owner can see: the pane owner cancels the registration at close, the router checks the cancellation before touching the buffer, and the operator's result for that send is `failed(pane-closed)`. A bad design lets the callback write into whatever buffer now has that id, or swallows the completion with no result.

### Clean case

A pure function that formats a receipt from an immutable invoice has no fallible boundary and no overlap. Say so in one line and model nothing.

## What to Model

For each fallible boundary:

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

Use a failure/recovery flow when detection, containment, retry, cleanup, compensation, or degraded behavior branches; use a sequence view when actor ordering or interleaving is the risk; use a state machine when retry/recovery lifecycle and illegal transitions are the risk.

Do not invent product failure policy. Route missing externally visible behavior to `spec-design`.

Complete when: every material failure and interleaving has been walked as a concrete case, preserves the invariants or has explicit containment, recovery or conflict behavior with one owner, and each claim it rests on is marked as an invariant, owner meaning, or owed observation.
