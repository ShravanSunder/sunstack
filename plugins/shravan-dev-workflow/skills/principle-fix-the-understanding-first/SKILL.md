---
name: principle-fix-the-understanding-first
description: "Use when reality surprises the plan, a fix fails twice on the same premise, or the same correction comes twice. Stop and ask what was wrong with the understanding before touching the code: drift or a break, and which shared premise to attack."
disable-model-invocation: true
---

# Fix the Understanding First

**Apply when** reality surprises the plan, a fix fails twice on the same premise, or the same correction comes twice.

**Rule.** Stop changing code and ask what was wrong with the understanding. Say three things plainly: what we assumed, what we found, what it means for the design. Then sort it:

- **drift:** the design holds and the work wandered; correct the work;
- **break:** the design's assumption is wrong; rebuild the model, with the owner when the assumption was theirs.

When several fixes have failed, list them and the premise they share, write that premise down, and attack it instead of writing another fix that assumes it. When the same correction keeps coming back, turn it into structure (a type, a lint, a test) so it can't recur.

**Why.** A wrong premise makes every fix built on it fail in a new way, and each failure looks like a separate bug. The cost compounds until someone names the premise.

**The test.**

1. Can you state what you assumed, what you found, and what it means?
2. Is this drift or a break?
3. Do the failed fixes share a premise nobody has questioned?

**Distinct from.**

- `principle-read-ground-truth-first` covers ordinary root-cause diagnosis while the design holds; this card fires when the premise itself is contradicted.

**Applied means** you name the premise that failed and the design or plan change it forced.

## Worked case

Three fixes for a stale-catalog bug each add a refresh call in a different place, and each fails in a new way. Listing them shows they share one premise: that something in production refreshes the catalog. Reading the call graph shows nothing does; the catalog was designed to live for one request. The fix is to change the catalog's lifetime, not to add a fourth refresh.

## Overkill

When the evidence confirms the premise and only a local symptom needs diagnosis, a drift-versus-break review adds nothing: trace the bug.
