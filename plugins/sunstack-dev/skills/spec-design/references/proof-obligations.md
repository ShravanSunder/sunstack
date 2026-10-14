# Proof Obligations

This reference owns which observable claims need proof, the class of evidence that can see each claim, and the independent reference each is judged against. It does not choose scenarios, oracles, test layers, files, commands or harness wiring; `test-design` chooses the regression strategy and `verification-design` chooses real-system observation.

Expected inputs: material requirement inventory, observable contracts, cross-cutting obligations, and known proof constraints.

Return: which observable claims need proof, the evidence class and independent reference for each, unprovable or ambiguous obligations, and proof gaps for Program Design.

## Which Claims Need Proof

Every material obligation needs proof: one whose failure a consumer would notice, or one an owner adopted as a promise. A claim that changes no consumer's experience and no adopted promise is a candidate for deletion.

## Evidence That Can See the Claim

Choose the evidence class that observes the obligation at its actual boundary:

```text
automated behavior
manual interaction or visual evidence
API or CLI transcript
state or data inspection
log, trace, or metric observation
security analysis or misuse case
performance measurement
release or runtime evidence
```

Good:

- a UI layout obligation requires visual evidence at the supported viewport;
- an idempotency obligation requires evidence of the side effect and the stored state, which a returned status cannot show;
- an authorization obligation requires allowed and denied actor cases at the enforcement boundary;
- a latency obligation names the measured boundary, workload class and threshold;
- an alerting obligation requires observing the alert itself, since a log line shows only that something was written.

Bad:

- an evidence class that cannot see the boundary, such as an isolated check standing in for cross-process wiring;
- "manual test" without the behavior and the observation;
- static schema validation offered for runtime ordering or recovery;
- mocked integration evidence presented as proof of production wiring;
- an exact command named before Program Design exposes the seam it would use.

## The Independent Reference

A proof is only as good as what it compares against. The reference must come from somewhere the implementation did not produce: the contract text, the owner's worked example, a reviewed table of cases, a published protocol, or the observable state of a real external system.

Good: "Pane B's input contains the sent text and no other pane's input changed", judged against the operator's sent text.

Bad: "the router returned success", where the router is the code under test and its status is what a cheap implementation fakes. Bad: an expected value computed by the same function that produces the actual one.

Name the reference beside each material obligation. When correctness depends on a specific reference, such as a published protocol version or a fixed data set, name that exact identity.

## Proof Gaps

When no existing seam could provide the required evidence, return a `program-design-gap` for the missing seam. Do not weaken the obligation to fit the current harness.

Complete when: every material obligation has an evidence class that can tell pass from fail at its claimed boundary and an independent reference, and every remaining proof gap is explicit.
