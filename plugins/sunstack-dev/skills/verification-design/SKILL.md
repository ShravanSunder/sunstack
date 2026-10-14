---
name: verification-design
description: "Use when designing how the real system will show a design works (declared reference, real surface, outcome observation, passing conditions and limits), when challenging a proof plan's feasibility before building, or when judging delivered evidence against an adopted Verification Design under a Verifier assignment. Not for fixing product code or tests, designing regression tests (test-design), or letting a model's judgment stand in for the correctness reference."
---

# Verification Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

This skill answers one question: how will we observe, on the real system, that the adopted outcome holds, and what will that observation still leave unverified? Tests show that code behaves under the conditions a test sets up. Verification shows that the delivered system, with its real build, configuration and entry point, produces the outcome a user or caller would see. Many "done but broken" results live between the two: the wrong binary, an acknowledgement taken for arrival, a readiness check that never touched the running app.

Every verification follows one spine:

```text
adopted outcome and declared reference   what correct means, independent of the implementation
  -> existing route                      how this project launches, readies, drives, captures and cleans up
  -> reachable observation               where the outcome itself is seen, on the declared target
  -> cases and limits                    real-system risks, applicable observations reused, what stays unverified
  -> judgment                            does this observation support this claim, at this target
```

A planned check is not proof. The design says what will be observed; only an actual run on the delivered target observes it.

The skill serves three jobs. Name yours before you start:

| Job | Who | Steps | Returns |
| --- | --- | --- | --- |
| author the Verification Design | the Lead | 1 to 5, 7 and 8 | VerificationDesignResult |
| challenge feasibility before the build | the paired Verifier, under a feasibility-challenge assignment | 1 to 4 against the proposed proof | the report its Verifier commission names |
| judge delivered work | the paired Verifier, under a delivery-observation assignment | 1, 2 and 6 | the report its Verifier commission names |

The Verifier's assignment, grants and report shape come from its `practices-manage-agents` commission; this skill teaches the judgment and grants nothing. Product code and product tests stay with the Implementer, and acceptance stays with the Lead.

## Main Path

### 1. Name the adopted outcome and the declared reference

Name the basis your job works from. IF authoring the Verification Design, load `../../shared-references/requirements-specification-program-design.md` and return the current identities of the four upstream documents and the separate Verification Design home; a substantial design unit needs all five. IF challenging feasibility or judging delivered work, read the governing basis your Verifier commission supplies and return its adopted outcome and reference, plus the adopted design set and expectations when the commission names them. A required reference or observation that no governing source holds is a gap for the Lead: never invent a document, waive a required design set, or take more execution than the commission grants.

State the core outcome the way the user or calling program sees it: "the text the operator sent appears in pane B, in the delivered app", not "routing works". Then declare the reference correctness is judged against: the Specification's obligation and its worked example, a published protocol at a named version, a reference implementation, or a known-good output someone checked against the contract. A model's opinion of the output is never the reference. When no reference can be declared, return a `verification-design-gap` (or a `specification-gap` when the obligation itself is missing).

MUST load `references/reference-and-outcome-cases.md` and return the case coverage tied to the declared reference and the observable outcome, including the wrong-target and acknowledgement-without-outcome cases.

```text
Claim:     an operator's text reaches pane B.
Weak:      the CLI send command exits 0, and the IPC reply says ok.
Missed:    the reply comes from the router before any pane write; a router that writes
           to the focused pane replies the same way.
Observed:  pane B's visible input in the delivered app shows the text; pane A's does not.
```

Completion: the outcome is stated as observed, the reference is named exactly enough to judge against, and the acknowledgement and wrong-target cases have their place.

### 2. Inspect the route that already exists

Read `principle-read-ground-truth-first` in full before you describe what a driver or script does. MUST load `references/real-surface-and-feasibility.md` and return the inspected target, configuration, readiness, drive and observation route, and its feasibility gaps.

Open the project's own launch, health, drive, evidence and cleanup owners before designing anything. A document saying a driver exists, or a script that imports cleanly, is not evidence that it reaches the outcome. Note what the route exercises, from its source: which build, which configuration, which backend, which client. Offline preparation is not live readiness: a doctor command that validates config files says nothing about whether the running app answers.

Completion: the route's real target and boundary are known from its source, and every gap between it and the outcome is named.

### 3. Choose the real-system cases

Read `principle-prove-it-works` in full at this choice. First read the regression expectations your job's basis supplies: when authoring, the adopted Test Design; in a prebuild challenge or delivered judgment, the adopted Test Design when the commission names one, and otherwise the commission's actual regression and proof expectations. They say which wrong behavior a cheaper layer is meant to catch; planned coverage is not an observed run. Verification takes what only the real system shows: the delivered build and its configuration, startup wiring, the real transport, layout at a real size, durability across a restart, and the failures the claim covers driven through the same entry point. A second path earns its cost only when it can detect something the first cannot. An existing real-path test or journey that already observes the outcome on the declared target, configuration and client can supply a case (step 5); what adds nothing is a new real-system run that repeats a case a cheaper test already settles, only to look independent.

Completion: every case names the risk it covers that cheaper tests do not, or the existing real-path observation that already covers it, and no new run only repeats what a test settles.

### 4. Define passing and the limits

For each case, write the passing condition as an observation: what is seen, where, against which reference, on which target identity (build, commit or installed version, configuration, client). Then write what the observation leaves unverified: the platform not tried, the stand-in still in place, the case that needs access nobody has granted. Read `principle-verify-before-accepting` in full before you write a passing condition, and check it against a wrong implementation: would this observation still pass if the outcome were missing?

In a prebuild challenge, this step is the challenge: can the proposed proof reach the outcome at all, on which target, with what grant? Report what blocks it.

Completion: every case has a passing condition a wrong implementation would fail, recorded target identity, and its named limits.

### 5. Plan reuse

A permanent real-path test or journey that already observes the outcome on the declared target, configuration and client can supply a case's observation, instead of a rebuilt one. A pass on a dev build, another configuration or another client is not that observation. Name it, say why it still applies (the code paths, configuration and target properties it depends on, unchanged in the relevant respects), and inspect its actual run before relying on it. Run it again only when something it depends on changed, when it failed, or when a specific concern about it is unresolved. Without an actual applicable run, the observation stays owed at delivery; a plan to reuse is not an observation.

Completion: each reused journey names its actual applicable run, what it depends on, and what would require running it again.

### 6. Judge delivered evidence

IF examining a delivered implementation or its actual evidence, load `references/delivered-evidence-and-test-adequacy.md` and return the observed applicability, the adequacy of the delivered tests against the Test Design (pyramid placement, assertions, real boundaries), the actual red limits, and the precise owner of each correction. Product test corrections go to the Implementer and missing governing expectations to the Lead. The Verifier edits no product suite and infers no execution authority.

IF an explicitly assigned verification apparatus is absent, broken or cannot reach the required outcome, load `references/verification-apparatus.md` and return the built or repaired driver's demonstrated reference-to-observation capability, its retained evidence and its unresolved limits. Missing grants, a missing reference or an unreachable outcome stop that branch.

Completion: every delivered claim is supported, narrowed or marked unverified with its owner, and any driver work is proven end to end or reported as a gap.

### 7. Author the Verification Design and check it

Read `principle-write-for-the-reader` in full before you organize the document. Lead with the outcome, the reference and the route, so a reader can confirm in one pass what will be observed and where. Then give each case its risk, passing condition, target identity and limits; then planned reuse; then what stays unverified. Link to the Specification's obligations and the Test Design's scenarios instead of restating them.

Re-read the whole document as an author self-check: every case observes the outcome rather than an acknowledgement; every passing condition names its target identity and reference; no new run only repeats what a test settles; no planned observation is described as observed; every limit is named. The self-check never replaces independent review.

Completion: a reader can tell what will be observed, where, against what, and what stays open.

### 8. Review the design, then return

Call `spec-program-review` using its `classify-review-requirement` operation with: requested mode `verification-only`; the current identities of all five documents; scope and claimed semantic effect; governing-source coverage; matched material-risk predicates; and `callerRequirement: required` on the design's first or substantive local cycle, which classification cannot waive. When review is required, invoke `spec-program-review` in `verification-only` mode with fresh context and read-only authority. Correct accepted findings here; a missing obligation, seam or test scenario goes to its upstream owner. Follow `spec-program-review`'s bounded review-and-correction-round policy.

IF authoring the Verification Design, load `schemas/verification-design-result.ts` and return the VerificationDesignResult after its local review: the declared reference, the observation strategy, the decisive limits, and the observations still owed at delivery. For a prebuild challenge or delivered observation, return the report the Verifier commission names instead; a locally reviewed design never makes delivery accepted.

Completion: the returned result or report validates against its contract, and every planned observation is listed as owed, not observed.

## Not Ready While

- the outcome is stated as a mechanism rather than as what the user or caller observes;
- no declared reference exists, or a model's judgment stands in for one;
- a case observes an acknowledgement, a dev build, a mocked backend or offline preparation in place of the outcome on the declared target;
- a passing condition lacks its target identity, or would still pass for a wrong implementation;
- a new real-system run only repeats what a cheaper test already settles, or a reused observation was relied on without inspecting its actual applicable run;
- a planned observation, or a reuse without an inspected actual applicable run, is described as observed;
- a driver is assumed to work because it exists or imports;
- the required local review is missing, partial, stale or not ready.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
