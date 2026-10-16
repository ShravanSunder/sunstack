# Failure and Concurrency

Mission: construct concrete failure paths and interleavings to test containment, recovery, consistency, and proof of the selected structural design.

Predicate: a fallible boundary, retry, partial success, cancellation, shared mutable state, or concurrent actors exist.

Expected inputs: review context plus state owners, flows, failure policies, and applicable specification obligations.

Prerequisites: complete target/source set exists.

Check boundary: read-only.

## Inspection

Select the highest-risk operation and simulate:

- failure before mutation, during mutation, and after externally visible success;
- timeout with an unknown remote outcome;
- retry or duplicate delivery;
- cancellation during cleanup;
- two actors racing on shared state;
- partial success across two boundaries;
- stale read, reordering, or backpressure where applicable.

For each, identify authority, state transition, invariant, containment, recovery, idempotency/ordering rule, caller-visible outcome, and proof seam. A finding must name a concrete interleaving or failure path.

When the operation's effect is visible outside it and a call can time out, be retried, or partly succeed, trace each ending the design gives it. Record a timeout after the request was sent as an unknown outcome, distinct from a definite failure, and compare it with the handling the design adopts for that ending. Require a pending state, or reconciliation against the system that knows whether the effect happened, only when the governing contract asks for it or a repeated or missed effect would break an accepted obligation ([decide every ending, and who knows the truth, before retries](../../../principle-design-for-failure/SKILL.md)).

When two or more actors can touch the same state, name the invariant the design states and find the order of events that breaks it. Report a different completion order only when it breaks that invariant ([name the invariant, then find the interleaving that breaks it](../../../principle-design-for-concurrency/SKILL.md)).

Good: the design says who detects failure, what state can remain, how retry/recovery behaves, and what proves the invariant.

Bad: generic “retry,” “transaction,” “lock,” or “eventual consistency” language; cleanup without an owner; success emitted before its durable condition; cancellation treated as ordinary error; an unknown outcome traced as a definite failure.

Calibration: do not invent product failure policy. When desired observable behavior is unspecified, route the missing obligation to `spec-design` and stop before choosing it.

Overlap boundary: `architecture-boundary` owns component placement; `contract` owns externally visible semantics; this check owns interleavings and recovery realization.

Return: check result with scenario trace, broken/preserved invariant, consequence, smallest correction, semantic owner, and proof implication.

Stop when: each selected high-risk path has explicit state, containment, recovery, and proof, or missing Why/What prevents structural judgment.
