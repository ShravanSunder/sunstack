---
name: principle-refine-mental-models
description: "Use when reality surprises the plan, a fix fails twice on the same premise, or the same correction comes twice. Stop and ask what was wrong with the understanding before touching the code: drift or a break, and which shared premise to attack."
disable-model-invocation: true
---

# Refine Mental Models

Every piece of work runs on a mental model: a picture of how the system works and why. When implementation surprises you, the first question isn't "how do I fix the code" but "what was wrong with our understanding?" A model fails in two ways. **Drift** is the work wandering off while the model still holds: the wrong module owns the change, an abstraction nobody named appears, complexity spikes. A **break** is the model itself being wrong: the abstraction forces contortions, the boundary you drew doesn't hold. Explicit breaks are easy: we said X, reality said Y. Implicit breaks are dangerous: nobody discussed Z, and the code is quietly being shaped by an assumption nobody examined. Fix the understanding first; the code follows.

## How to think it through

**Stop writing code and say three things plainly:** what we assumed, what we found, and what it means for the design. Read the code and the logs to fill them in; guessing here is the failure. The three lines also sort the problem: if the assumption still holds and only the work wandered, it is drift; if the assumption itself failed, it is a break.

**For drift, correct the work and say that you did.** Drift fixed silently looks exactly like drift nobody noticed. If the correction can't be cleanly backed out once others build on it (it moves ownership, changes a contract or a stored format, or weakens a proof), stop before it lands and get it agreed.

**For a break, stop building on it.** Don't invent a new seam or shim to push through. Find out whose assumption failed: it belongs to the owner only if it traces to an explicit owner decision, an existing contract, or a demonstrated technical constraint. A spec or plan an agent wrote is not, on its own, evidence of what the owner wants. If the owner's assumption failed, bring them the evidence and rebuild the model with them; if it was an inference you added, drop it and keep what was actually agreed.

**When fixes keep failing, suspect the premise, not the fixes.** Two or more fixes for one symptom that each failed probably share an assumption. Write that premise down as one sentence every failed fix assumed. Inventory all the observed failures before narrowing to one cause, then challenge the premise against what was actually observed instead of writing another fix that assumes it.

**Before you reset, find out what changed.** "I restarted it and it's fine now" is a clue, not a resolution. A restart that clears the problem usually means stale state (a cache, a lock file, a long-lived session); a reset without an explanation hides the cause until it returns.

**When the same correction keeps coming back, turn it into structure.** Pick the strongest mechanism the situation allows: a state the types can't represent, then a lint or banned API that fails the build, then a shared helper, then a runtime check. Another paragraph of instructions is the weakest guard, because the next reader copies whatever the code already does.

**The hard call is drift versus break.** Ask whether the original assumption still holds given the evidence. If it does, the work changes; if it doesn't, the model changes first.

## Example: the search assumption that broke

The approved design put fuzzy search on SQLite's trigram index. Review found trigram candidates can't include typo-only matches, so the core feature couldn't work. A full-scan prototype off the main thread met the latency target. That made it a break, not drift: the storage assumption failed at the real query boundary, and it was an approved design decision. The right move was to stop and bring the owner the decision (keep SQLite with a different matcher, or change the storage contract), not to swap storage quietly because a prototype was fast.

IF the case in front of you doesn't match the search example, or you are reviewing how someone else handled a surprise, load `references/example_scenarios.md` and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When the evidence confirms the premise and only a local symptom needs fixing, a drift-or-break review adds nothing: trace the bug to its root cause and fix it.

## Signs you skipped it

- A third fix for the same symptom.
- "This should have worked."
- "It's fine after a restart", with no explanation of what changed.
- A new shim, flag, or seam added so a surprising behavior fits the plan.
- The same review comment on every pull request.
- Code bending around something nobody ever discussed.

For ordinary root-cause work while the model still holds, use `principle-read-ground-truth-first`. When the gap is between two people's pictures rather than between the model and reality, use `principle-build-the-shared-model-first`. When the failing premise is about ordering or timing, also use `principle-design-for-concurrency`.
