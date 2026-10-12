---
name: principle-one-owner-per-truth
description: "Use when truth, effects, or guarantees cross a boundary: two parts can write the same state, a copy holds data another part owns, or stored data starts to mean something new. Give each truth and effect one authoritative owner and state what callers may rely on."
disable-model-invocation: true
---

# One Owner per Truth

**Apply when** truth, effects, or guarantees cross a boundary: two parts can write the same state, a cache or copy holds data another part owns, or stored data starts to mean something new.

**Rule.** For every truth, invariant, lifecycle, and side effect, name exactly one authoritative owner. Others read it, cache it with a named refresh rule, or ask the owner to change it; they don't write it. State what callers may rely on, the contract, in one place. State what stored data means, so its meaning can't drift without a migration.

**Why.** Two writers of one truth eventually disagree, and the bug looks like flicker, lost updates, or "it reverted itself". A contract nobody wrote down becomes whatever the current code happens to do, and each caller depends on a different accident.

**The test.**

1. For each piece of state, who is the one writer?
2. What can a caller rely on, and where is that written?
3. If stored data changes meaning, how does existing data get there?

**Distinct from.**

- `principle-separation-of-concerns` decides how the parts are cut; this card decides who decides and writes. Either can be right while the other is wrong.
- `principle-types-and-trust-boundaries` decides whether an untrusted caller may cause an effect at all.

**Applied means** you name the owner you assigned or the second writer you removed, and the contract callers can now rely on; or the existing owner you confirmed is the only writer, and how you checked.

## Worked case

An editor saves comment drafts locally and also syncs posted replies from the server, and both write the same comment list. Typing a reply makes saved comments flicker as each writer overwrites the other. Better: the server owns posted comments; the draft store owns only unposted drafts, kept apart; the view merges the two when it reads. One writer per truth, and the flicker is gone by construction.

## Overkill

When one owner and one caller contract are already explicit and no second writer exists, re-auditing ownership adds nothing.
