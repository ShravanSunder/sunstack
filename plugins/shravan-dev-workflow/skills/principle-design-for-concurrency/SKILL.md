---
name: principle-design-for-concurrency
description: "Use when actors already overlap: two workers, retries, callbacks, or late results can touch the same resource. Name the invariant, find the interleaving that breaks it, isolate the shared state before serializing it, and order by causal signals, not sleeps."
disable-model-invocation: true
---

# Design for Concurrency

**Apply when** actors already overlap: two workers, retries, callbacks, or late results can touch the same resource. This card copes with concurrency that exists; it is not a reason to add any.

**Rule.** Name the invariant that must hold, then find the order of events that breaks it: two writers, a late result landing after a newer one, a retry overlapping the original, a release before the response. First isolate the shared state: give each actor its own key, file, or record, and merge when reading. Serialize only when one shared writer is a real invariant, and enforce it structurally (one owner, a transaction, compare-and-swap), not by convention. Order by causal signals (a handle, an event, a version), never by sleeps.

**Why.** Interleaving bugs are intermittent: they pass every test that runs in one order and appear under load. A sleep encodes a guess about timing that the next slow machine breaks.

**The test.**

1. What invariant must hold, and which order of events breaks it?
2. Can the actors stop sharing the thing instead of taking turns on it?
3. Does anything wait by sleeping or polling where an event or handle exists?

**Distinct from.**

- `principle-design-for-failure` is one operation's endings; this card is two actors at once. If a retry can overlap a late original, use both.
- `principle-one-owner-per-truth` decides who owns and writes a truth; this card asks what happens when two actors reach it at once.

**Applied means** you name the invariant, the interleaving you found, and the separation or ordering you chose.

## Worked case

A worker handles a request, releases its hold on the session, and then posts the response. Between the release and the post, a second request takes the session and its response arrives first; the client matches responses by arrival order and shows the wrong one. Better: correlate responses by request id, and post before releasing. The test holds the worker between the two steps to force the bad order, instead of sleeping and hoping.

## Overkill

When one actor owns the state and every completion order gives the same result, interleaving analysis adds nothing. Don't lock state that only one actor touches. Unfinished old work alone doesn't prove unsafe sharing: inspect the actual resource before adding coordination.
