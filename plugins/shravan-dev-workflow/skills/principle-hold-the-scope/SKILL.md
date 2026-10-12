---
name: principle-hold-the-scope
description: "Use when a new request arrives, a design or plan comes back from someone else, or work is about to be called done. State who it is for, what success looks like, and what stays out; then check that every owner line is carried, nothing is invented, and nothing is weakened."
disable-model-invocation: true
---

# Hold the Scope

Sit in the problem before you reach for answers. Scope is the promise of what you will build: who it is for, what a successful user or implementer will be able to do or see, and what stays out. It rarely breaks in one big decision. It erodes through small moves that each look helpful: a gate added "for safety", a refactor "while we're here", a "must" that quietly becomes "best effort", an exclusion that drops out between drafts. Each is reasonable on its own; together they deliver something nobody asked for and skip something they did. Holding the scope means every line traces to the owner's ask, or to a constraint that forces it, and checking that again every time work comes back.

## How to think it through

**Start from the problem and the people it serves.** What problem are we solving, for whom, and what will they notice when it's solved? If the app already works, what exactly are we trying to fix? If you can't say what a user, or the next engineer who owns this code, would notice, the work or the explanation is off.

**Write the frame in three sentences:** who it is for, what they will be able to do or see when it is done, and what is out. Name the nearest plausible expansions you will *not* do; that is where scope usually leaks.

**Carry what must stay true.** Scope includes the things the owner already cares about that the change must not break: smooth scrolling while you fix a rendering bug, streaming behavior while you change a transport. List them with the outcome.

**Trace every line to its source.** For each requirement or design element, ask where it came from. There are three answers: the owner asked for it; a constraint forces it (a contract, a law, behavior that must not break, a demonstrated technical limit); or it seemed like a good idea. The third kind is a question for the owner, not a requirement. A spec or plan an agent wrote is not, on its own, evidence of what the owner wants, so a line being in a document doesn't make it authorized. This applies to outcomes, behavior, exclusions, and obligations: the things the owner will judge. A build choice that changes none of those (a function name, an internal structure, how pull requests are grouped) is yours to make; decide it, record why, and keep moving.

**The hard call is the addition that really does seem necessary**, like a security check, a compatibility guard, or a recovery path. Don't build it silently and don't drop it silently. If a real constraint forces it, cite the constraint. If not, raise it with its cost and let the owner choose. "This doesn't earn its place" is an acceptable answer.

**While doing the work, keep the boundary.** Diagnosis, and the smallest repair needed to deliver the agreed outcome, are in scope even outside the feature's own code. Unrelated cleanup, speculative hardening, and new mechanisms are not: write them down for later and keep going. If a necessary repair needs one of them, bring the evidence and ask. A smallest repair also never crosses these lines without asking: changing agreed behavior, a public contract, who owns something, a stored data format, a security boundary, shared infrastructure, or a required proof. Fixing a shared serializer for one export can silently change another export's output; fix the path you were asked about, and raise the shared change with its other consumers named.

**On every handback, and before calling work done, compare against the owner's lines.** Is each one carried? Was anything invented? Was anything weakened? Weakening is the subtle one: "must" turned into "should", an outcome narrowed to the part that was easy, an exclusion lost.

## Example: the gate nobody asked for

While drafting a spec for a protocol feature, an agent added a requirement that clients refuse servers older than a certain provider version, "for safety". The next agent treated the gate as authority and built machinery around it. When the owner asked where it came from, the answer was nowhere. Tracing each requirement to an owner line or a forcing constraint catches this before anything is built: a gate with no source becomes a question for the owner ("should old servers be refused?"), not a requirement.

IF the case in front of you doesn't match the gate example, or you are reviewing someone else's spec, plan, or delivery for scope, load `references/example_scenarios.md` (scenarios, simplest first: the split for the builder's convenience; the quiet softening; the fix that broke scrolling; the machine-wide lock; the design that got smaller; the plan that grew a rewrite) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

A small, bounded fix with a clear consumer, outcome, and exclusion needs no restated frame. Trace the lines that would cost real work if they were wrong, not every sentence of a two-line change.

## Signs you skipped it

- A requirement nobody can point to an owner line or constraint for.
- "While we're here", "for safety", "for later".
- Softer verbs between drafts: should, try, attempt, best effort.
- An exclusion that was in the first draft and isn't in the last.
- A structure chosen for the builder's convenience rather than the owner's outcome.
- A fix that regresses something the owner already cared about.

Whether two people mean the same thing is `principle-build-the-shared-model-first`. Whether a mechanism earns its place is `principle-justify-the-complexity`.
