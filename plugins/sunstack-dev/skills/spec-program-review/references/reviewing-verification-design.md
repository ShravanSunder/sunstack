# Reviewing a Verification Design

This reference owns judgment of the Verification Design inside `four-document-design` mode: whether its plan, once carried out, would tell a correct build from a wrong one for every requirement. It runs after the Specification and Program Design judgments, because each row is judged against them.

What to open: the Verification Design whole, with its "proven by" and coverage views; each requirement's obligations (`R`) and proof obligations (`V`) in the Specification; each obligation's trace row in the Program Design; and the source of every journey and reused test a row names.

A row is a plan. Judge whether it would decide its requirement, not whether it already has. Its planned observations and reused tests are judged from their sources and are not executable proof claims for `proof-challenge`: the build they will observe does not exist yet.

## Rows

Walk every requirement in the Requirements document and find its row; do not sample.

- **Every requirement has a row, and the row names every obligation it covers.** A requirement with no row, or a row that says "covered" without naming its obligations, is a finding: a rule no observation decides can hide under a covered requirement.
- **The reference comes from the Specification.** The row's reference is the `V`'s worked example, threshold, protocol version, or known-good output, quoted or pointed to. A reference that is the app's current behavior, a model's judgment of the output, or anything the Specification does not contain is a finding against the row. When the `V` itself has no reference or threshold, the finding is against the Specification.
- **A shared observation is described once**, and each row that uses it says which of its obligations it decides.

## Observations

For each obligation, reconstruct the chain and try to break it:

```text
obligation -> wrong build it must catch -> boundary where that wrong behavior stays real
           -> evidence class -> target and journey or reused test -> passing condition
```

- **The evidence can see the failure.** Name the wrong behavior, then ask whether the chosen evidence would show it. A returned status for a durability claim, a log line for an alert that must page, a screenshot for hidden state, static validation for runtime ordering, or a mocked unit test for cross-process wiring cannot.
- **The observation sits where the wrong behavior is real:** where the user or calling program meets the outcome, on the planned target, at a seam the Program Design exposes.
- **The proof is proportional.** A pure rule gets a focused test and no app launch. A structural claim gets structural evidence that names the behavior it leaves unevaluated. An outcome the user meets in the app needs more than a unit test, and visual, operational, or security behavior needs the live or manual observation that can see it.
- **The passing condition fails for a wrong build.** Name one wrong build yourself and check that the condition fails for it, then one allowed build that differs materially and check that it passes ([a check counts only if the wrong behavior could make it fail](../../principle-write-tests-that-can-fail/SKILL.md)). If a build that only acknowledges, with a 201, a toast, or a row count, would pass, the condition watches a proxy. So does one that stale, cached, or generated evidence could satisfy with the behavior absent.
- **A reused test keeps the interaction real.** Open the test. It must drive the row's entry and keep real the boundary the row is about, on the target and configuration the row names ([evidence supports only the claim, version, and target it observed](../../principle-verify-before-accepting/SKILL.md)). A test that mocks that boundary, or runs somewhere else, does not decide the row.
- **A named journey does what the row says.** Open the `verify-<app>` journey and check that it drives this entry and reads this outcome. A journey still to build is written `needed:` with its entry and what it must read, and appears in the design's list of needed journeys.

## Honesty

- **Nothing planned is described as observed.** A row says what will be seen on the build that will exist. "Passes", "verified", a recorded result, or a target property written as already seen is a finding.
- **What stays unverified is listed.** A limit that leaves a required observation undone or weaker carries the owner's decision; without one it returns `decision-needed`.
- **Gaps were returned, not worked around.** Where no seam lets an observation see the outcome, the design returned a `program-design-gap`; where the Specification gives no observable outcome, reference, or threshold, a `specification-gap`. A row that weakens its obligation to fit today's harness, observes a proxy because the seam is missing, or invents its own reference is a finding routed to the owner of the gap.

## Route and Stop

Route a defective row to `verification-design` with the smallest correction; a missing or unobservable `V` to `spec-design`; a seam that cannot carry any observation to `program-design`. An upstream correction continues to `verification-design` for the rows it changes.

Good: each "proven by" line says in the owner's words what will be done and seen; each passing condition names a wrong build that fails it; every reused test and journey was read from its source; the unverified list is honest.

Bad: "covered by e2e tests"; a reference that is today's behavior; an exit code as the passing condition; a reused test that mocks the boundary its row is about; a row that reads as if it already ran; a missing seam papered over inside a row.

Complete when: every requirement has been matched to its row, and every obligation's observation has been judged or carries a routed finding.
