---
name: principle-design-for-failure
description: "Use when a call, job, or state change has an effect someone else can see and it can time out, be retried, partly succeed, or end without you knowing. Decide every ending, which system is the truth for 'did it happen?', and who cleans up, before choosing retries or locks."
disable-model-invocation: true
---

# Design for Failure

When your code reaches outside itself (a payment provider, another service, a queue, a database someone else reads), a call does not end two ways. It worked; it was rejected; it failed in a way worth retrying; it got partway; or **you don't know**. A timeout, a dropped connection, or a crash puts you in that last ending: the effect may have happened on the other side, may still be happening, or may never happen. "Unknown" is its own outcome. It is not a failure, and it is never a guessed success.

Most expensive production bugs live in the unknown ending. Code written for "worked or failed" quietly treats "don't know" as "failed" and does the thing again: a second charge, a duplicate email, a server created after the caller already gave up. Designing for failure means deciding what each ending looks like, and how the system gets back to a correct state, before you write the happy path. Retries, locks, and idempotency keys are answers; the endings are the question.

## How to think it through

**Start from the effect someone else can see:** a charge, a sent message, a reserved seat, a created server, a row another system reads. Walk its timeline and stop at three points: before the effect, while it is happening, and after it landed but before you heard back. At each, ask what the caller sees, what is left behind, and who notices and cleans it up.

**Keep the endings apart.** Each one gets its own handling; collapsing them into one error branch is where the bugs come from:

- **Rejected** (bad input, not allowed): nothing happened; tell the caller why.
- **Transient** (overloaded, refused before sending): safe to retry, with a bound and backoff.
- **Partial** (some effects landed): finish it or undo it, decided from the invariant that must hold afterwards. Undoing is itself an effect that can fail.
- **Unknown** (timed out after sending, or the reply made no sense): don't guess. Resolve it with the truth below, or keep it visibly pending.

**Make the endings a type, so the compiler holds you to them.** A boolean, a thrown exception, or a nullable result lets a caller forget "unknown" exists. A sum type with one variant per ending, each carrying what that ending needs, makes every caller decide what it does with each one:

```ts
type ChargeOutcome =
  | { kind: "charged"; chargeId: ChargeId }
  | { kind: "rejected"; reason: DeclineReason }
  | { kind: "retryable"; retryAfterMs: number }
  | { kind: "unknown"; idempotencyKey: IdempotencyKey }; // sent, but no usable reply
```

Build the outcome where the reply arrives: map transport and provider errors into these variants there, and a reply that doesn't parse after you sent the charge becomes `unknown`, never `charged`. In Rust the same shape is an enum with an `OutcomeUnknown` variant and a `match`.

**Weigh a duplicate against a miss.** This picks how hard to work. For a charge, a duplicate is expensive and a delay is tolerable, so prevent the duplicate even if that means "pending". For a welcome email, a duplicate is mildly annoying and a miss is mildly sad, so one bounded retry is enough. Ask which hurts more before choosing machinery.

**The hard call is who is the truth for "did it happen?"** It is rarely your own record; it is the system that performed the effect. Choose the mechanism by what that truth can promise:

- **It honors a stable key for this intent:** retry with the same key, tied to the intent (the order id, not a fresh random id), and the truth deduplicates.
- **You can ask it for the outcome, including "still in flight":** reconcile before doing anything again. A "not found" right after a timeout does not prove the original won't still land.
- **Neither:** keep the outcome pending, show it, and escalate. Don't promise an automatic retry you cannot make safe.

**When one change must cause an external effect, record the intent with the change.** Write "send the welcome email" in the same transaction as the new user row, then send from that record and mark it done. A crash between the two can no longer lose the email, and the record says what still needs doing.

**Bound every wait.** Every call gets a deadline and can be cancelled; every retry loop has a limit and backoff. A retry the caller is waiting on stops when the caller is gone; work that has already been durably accepted (an intent record, a queued job) keeps going under its own owner, limit, and deadline, because nobody else will finish it. An unbounded wait turns one slow dependency into a stalled system.

**Contain a failure where it enters, and surface it.** The failed part is isolated so it can't take the whole app down, and it shows an error state the caller or user can see. Containing never means logging quietly and carrying on as if it worked.

**Assume the last run crashed at any point.** A rerun or restart should converge to the correct end state from whatever was left: look for what already exists, adopt it or clean it up, and only then create: "The open request timed out and a lease arrived later, so reconcile by that request's identity before creating another environment."

**Make sure someone notices.** A health check that only pings the process can stay green while every real operation fails. And when the failure behavior is something a user will see, say your assumption out loud ("I'm assuming a timed-out payment shows as pending and retries with the same key; same assumption?") instead of deciding it silently in code.

## Example: the double charge

Checkout calls the payment provider, the call times out, the code retries with backoff, and the customer is charged twice: the first charge had landed. "Retry on failure" treated an unknown ending as a failure. Better: the charge carries an idempotency key tied to the order, the provider is the truth for "did it charge?", the customer sees "payment pending" on a timeout, and any retry reuses the same key, so the provider can't charge twice.

IF the case in front of you doesn't match the double charge, or you are reviewing someone else's design against this principle, load `references/example_scenarios.md` (scenarios, simplest first: the request that stalled; the health check that stayed green; the welcome email; the job that runs twice; the deploy that can't rerun; the server that arrived late) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

A pure calculation, or a read that is safe to repeat, cannot half-happen; its failure is an error the caller already sees. One bounded retry with backoff covers a flaky read. Don't add keys, compensations, or a reconcile job to code that leaves nothing behind.

## Signs you skipped it

- "Add retries", with no answer to "can a retry repeat the effect?"
- A timeout, a rejection, and a partial result all handled by one catch, or a result type with no way to say "unknown".
- A failure of a promised effect that is logged while the caller still gets success, with no unresolved outcome shown.
- Success reported before the durable write, or a reply that made no sense treated as success.
- A call or retry loop with no deadline.
- Half-done work nobody owns, a rerun that assumes a clean start, or a health check that stays green while real operations fail.

For modeling the endings as types the compiler checks, see `principle-types-are-communication`. When two actors can touch the same thing at once, also use `principle-design-for-concurrency`.
