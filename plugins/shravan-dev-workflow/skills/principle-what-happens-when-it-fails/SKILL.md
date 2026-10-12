---
name: principle-what-happens-when-it-fails
description: "Use when a call, job, or state change has an effect someone else can see and it can time out, be retried, partly succeed, or end without you knowing. Decide every ending, which system is the truth for 'did it happen?', and who cleans up, before choosing retries or locks."
disable-model-invocation: true
---

# What Happens When It Fails

**Apply when** a call, job, or state change has an effect someone else can see, and it can time out, be retried, partly succeed, or end without you knowing.

**Rule.** Before choosing retries, locks, or idempotency, decide how each ending looks. Write these down explicitly:

- which system is the truth for "did it happen?" (often the other system, not your own record);
- what the caller sees while the outcome is unknown;
- who cleans up what is left behind, and what triggers them.

Then pick the smallest mechanism that keeps those endings: an idempotency key, a lookup before retrying, a compensating step, or an honest "pending".

**Why.** A timeout is not a failure. The effect may have landed and the answer got lost, or it may still be running. An ending nobody chose gets chosen by accident: a double charge, a stuck reservation, a cached "success" that never happened.

**The test.**

1. If it times out after the effect, what does the caller see, and does a retry repeat the effect?
2. If it crashes halfway, what is left behind, and who notices and cleans it up?
3. Which system answers "did it happen?"

**Distinct from.**

- `principle-concurrency-and-ordering` is two actors at once; this card is one operation's endings. If a retry can overlap a late original, use both.
- `principle-one-owner-per-truth` decides who owns a truth in general; this card asks which record settles one operation's outcome.

**Applied means** you name the ending you chose for the timeout-after-effect case, and the mechanism it led to or ruled out. "Added retries" is not an ending.

## Worked case

Checkout calls a payment provider. The call times out, the code retries with backoff, and the customer is charged twice. "Retry on failure" treated a timeout as a failure, but the first charge had landed. Better: the charge carries an idempotency key tied to the order, and the provider is the truth for "did it charge?". On a timeout the customer sees "payment pending", and checkout, which owns the reconcile, looks the charge up before any retry and again in a follow-up check. The customer sees pending, never a second charge.

## Overkill

A pure calculation has no ending to design; its failure is an exception the caller already handles. A read-only lookup that is safe to repeat needs no idempotency key. When the only bad ending is a failure before any effect, and the caller sees that error, one sentence covers it.
