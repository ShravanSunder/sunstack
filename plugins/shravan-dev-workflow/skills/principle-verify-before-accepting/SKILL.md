---
name: principle-verify-before-accepting
description: "Use when accepting any result: a helper's handback, a review finding, a passing run, 'done', an agreement, or your own conclusion. Ask whether this evidence establishes this exact conclusion at this version, not just whether a receipt exists."
disable-model-invocation: true
---

# Verify Before Accepting

**Apply when** you are accepting any result: a helper's handback, a review finding, a passing run, "done", an agreement, or your own conclusion.

**Rule.** Ask whether this evidence establishes this conclusion. Check that the evidence:

- is the right kind for the claim (a unit pass doesn't prove runtime behavior);
- comes from the right version (the head the claim is about);
- was observed, not just reported.

A true quote, a real receipt, or a green run can still support the wrong claim. Label each claim by what backs it, and name the exact gap where the evidence falls short instead of rounding up.

**Why.** Most false "done" claims rest on real evidence for a different claim: a test of the wrong layer, a receipt from an older commit, a summary of a run nobody read. Accepting them costs a rework cycle and the owner's trust.

**The test.**

1. Does this evidence prove this exact claim, at this version?
2. Did someone observe it, or is it a report of an observation?
3. What does the evidence not cover, and is that named?

**Distinct from.**

- `principle-read-ground-truth-first` gathers the evidence; this card judges it.
- `principle-prove-it-works` produces runtime evidence; this card checks the claim made from it.

**Applied means** you name the claim you accepted, narrowed, or rejected, and the evidence that decided it.

## Worked case

A helper reports "all tests pass, ready for review" with a CI link. The run is green, but on the commit before the helper's last change, and the suite never touches the changed module. Accepting it would send unproven behavior to review. Better: match the run to the head, check that the suite exercises the change, and read the diff. The claim narrows to "the earlier commit is green; the current change is unproven".

## Overkill

When there is no result or claim to accept, there is nothing to check. Don't re-verify evidence you produced and observed a minute ago with nothing changed since.
