---
name: principle-refine-mental-models
description: "Use when reality surprises the plan, a fix fails twice on the same premise, or the same correction comes twice. Stop and ask what was wrong with the understanding before touching the code: drift or a break, and which shared premise to attack."
disable-model-invocation: true
---

# Refine Mental Models

Read this principle in full before applying it; your own full read earlier this session counts.

Every piece of work runs on a mental model: a picture of how the system works and why. When implementation surprises you, the first question isn't "how do I fix the code" but "what was wrong with our understanding?" A model fails in two ways. **Drift** is the work wandering off while the model still holds: the wrong module owns the change, an abstraction nobody named appears, complexity spikes. A **break** is the model itself being wrong: the abstraction forces contortions, the boundary you drew doesn't hold. Explicit breaks are easy: we said X, reality said Y. Implicit breaks are dangerous: nobody discussed Z, and the code is quietly being shaped by an assumption nobody examined. Fix the understanding first; the code follows.

## How to think it through

**Stop writing code and say three things plainly:** what we assumed, what we found, and what it means for the design. Read the code and the logs to fill them in; guessing here is the failure.

**The hard call is drift versus break.** Ask whether the original assumption still holds given the evidence. If it does and only the work wandered, it is drift: the work changes. If the assumption itself failed, it is a break: the model changes first.

**For drift, correct the work and say that you did.** Drift fixed silently looks exactly like drift nobody noticed. If the correction can't be cleanly backed out once others build on it (it moves ownership, changes a contract or a stored format, or weakens a proof), stop before it lands and get it agreed.

**For a break, stop building on it.** Don't invent a new seam or shim to push through. Find out whose assumption failed. It is the owner's only if it traces to an explicit owner decision, an existing contract, or a demonstrated technical constraint; a spec or plan an agent wrote is not, on its own, evidence of what the owner wants. Then:
- an inference you added: drop it and keep what was agreed;
- the owner's assumption, with a repair that keeps every agreed outcome and contract inside the scope: make it, and record what failed and why;
- the owner's assumption, with a repair that changes an agreed outcome or needs a tradeoff only the owner can make: stop the dependent work and rebuild the model with them, bringing the evidence.

**When fixes keep failing, suspect the premise, not the fixes.** Two or more fixes for one symptom that each failed probably share an assumption. Write that premise down as one sentence every failed fix assumed. Inventory all the observed failures before narrowing to one cause, then challenge the premise against what was observed instead of writing another fix that assumes it: "The idle-connection close and the early empty read are two failure paths; fixing the socket close doesn't explain the stream ending early, so list both before changing another timeout."

**Before you reset, find out what changed.** "I restarted it and it's fine now" is a clue, not a resolution. A restart that clears the problem usually means stale state (a cache, a lock file, a long-lived session); a reset without an explanation hides the cause until it returns. "A stale browser made a healthy backend look broken; a fresh, isolated launch showed that, so the startup code didn't need changing."

**When the same correction keeps coming back, turn it into structure.** Pick the strongest mechanism the situation allows: a state the types can't represent, then a lint or banned API that fails the build, then a shared helper, then a runtime check. Another paragraph of instructions is the weakest guard, because the next reader copies whatever the code already does.

## Example: the search assumption that broke

The approved design put fuzzy search on SQLite's trigram index. Review found trigram candidates can't include typo-only matches, so the core feature couldn't work. A full-scan prototype off the main thread met the latency target. That made it a break, not drift: the storage assumption failed at the real query boundary, and it was an approved design decision. The right move was to stop and bring the owner the decision (keep SQLite with a different matcher, or change the storage contract), not to swap storage on its own because a prototype was fast.

IF the case in front of you doesn't match the search example, or you are reviewing how someone else handled a surprise, load `references/example_scenarios.md` (scenarios, simplest first: the same review comment, again; the backend that wasn't broken; the two sleeps; the fourth refresh; the principles that taught nothing) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When the evidence confirms the premise and only a local symptom needs fixing, a drift-or-break review adds nothing: trace the bug to its root cause and fix it.

## Signs you skipped it

- Another fix built on the same premise after earlier fixes failed, without accounting for every observed failure.
- "This should have worked" still said after the evidence came in, without naming the assumption it contradicts.
- "It's fine after a restart", with no explanation of what changed.
- A shim or new seam that keeps the old plan alive against contradicting evidence, with the failed assumption never revisited.
- The same review comment on every pull request.
- Code bending around something nobody ever discussed.

During ordinary root-cause work while the model still holds, reproduce the behavior and trace it to its source ([read ground truth first](../principle-read-ground-truth-first/SKILL.md)). When the gap is between two people's pictures rather than between the model and reality, restate your picture and get an explicit answer ([build the shared model first](../principle-build-the-shared-model-first/SKILL.md)). When the failing premise is about ordering or timing, also find the order of events that breaks the invariant ([design for concurrency](../principle-design-for-concurrency/SKILL.md)).
