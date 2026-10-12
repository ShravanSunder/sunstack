---
name: principle-one-owner-per-truth
description: "Use when truth, effects, or guarantees cross a boundary: two parts can write the same state, a copy holds data another part owns, a schema is defined twice, or stored data starts to mean something new. Give each truth one authoritative owner and state what callers may rely on."
disable-model-invocation: true
---

# One Owner per Truth

Every truth in a system (a status, a balance, a setting, an identity, a lifecycle, a side effect) needs exactly one place that decides it. Others read it, cache it with a stated refresh rule, or ask the owner to change it; they don't write it themselves. When two parts write the same truth, they eventually disagree, and the bug looks like flicker, lost updates, or "it reverted itself". The same goes for contracts: what callers may rely on is written down in one place, or it becomes whatever the current code happens to do, and each caller depends on a different accident. And stored data needs an owner for its meaning, because data outlives the code that wrote it.

## How to think it through

**For each truth the change touches, ask "who decides this?"** If the answer is two components, pick one owner. The other becomes a reader, or a requester that asks the owner through an operation the owner exposes.

**Put behavior in its owner, not in the convenient module.** Ask where a responsibility belongs before placing its control. A plugin that only needs to start a service shouldn't absorb the service's behavior; the library that owns the service does. An identity belongs to the thing it identifies, not to whichever connection happened to carry it.

**Derive instead of syncing.** A value computed from the owner's truth can't drift; a copy kept in step can. When a copy is worth having (a cache, a denormalized field, local state for responsiveness), name its refresh rule and what a stale read means for the reader.

**Give each shape one schema.** A common shape lives in one place, and the others derive from it (a derived schema, generated types). The same shape written twice drifts apart.

**Write the contract down, and treat it as the boundary.** State what callers may rely on: inputs, outputs, errors, and guarantees like ordering or cardinality (one active connection or many?). An established contract is the edge implementation works within; changing it is a deliberate act with its consumers in view. When two contracts conflict, decide which takes precedence instead of letting the code pick.

**Own what stored data means.** Keep the storage row private and expose the domain type. If the meaning of stored data changes, plan how existing data gets there with a migration that is safe to run, and version the format so older readers fail clearly instead of misreading it.

**The hard call is the convenient second writer:** the optimistic UI update that writes the real record, the background job that "fixes" a field, the sync loop that copies both ways. Usually the owner exposes an operation and the others call it. Moving ownership from one part to another is a decision that others will build on, so make it deliberately, not as a side effect of a fix.

## Example: the comments that flickered

An editor saved comment drafts locally and also synced posted replies from the server, and both wrote the same comment list. Typing a reply made saved comments flicker as each writer overwrote the other. Better: the server owns posted comments; the draft store owns only unposted drafts, kept apart; the view merges the two when it reads. One writer per truth, and the flicker is gone by construction.

IF the case in front of you doesn't match the comment example, or you are reviewing who owns what in someone else's design, load `references/example_scenarios.md` and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When one owner and one caller contract are already explicit and no second writer exists, re-auditing ownership adds nothing.

## Signs you skipped it

- Two code paths writing the same field.
- Sync logic that copies data back and forth between two places.
- A cache or copy with no refresh rule.
- The same schema defined in two files.
- Stored values whose meaning changed with no migration or version.
- "It reverted itself", or behavior placed where it was convenient rather than where it belongs.

For how the parts are cut, see `principle-separate-the-concerns`. For the contract's shape as types, see `principle-types-are-communication`. When two actors must share one truth at the same time, also use `principle-design-for-concurrency`.
