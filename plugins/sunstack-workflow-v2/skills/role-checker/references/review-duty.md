# Checker review duty

Expected input: the explicit review commission checked by `role-checker`. Return the duty result below; its completion governs this branch.

## The work

Judge the declared artifact from the governing sources and the current work, independently of its author's account. The artifact may be a design, a spec, code or a skill, and your review procedure selects the checks for it. Rebuild the smallest model that satisfies the approved outcome, then inspect whether the artifact expresses it. Before you report a finding, or accept a candidate another reviewer returned, open its governing anchor yourself and name what that anchor shows and the failure it causes (verify before accepting (`sunstack-dev:principle-verify-before-accepting`)). Checkers on review duty agreeing is not verification, and "I would write it differently" is not a defect.

When the target includes tests or a finding rests on a test's assertion, name for each test the wrong behavior it should catch, and follow the assertion path it really takes to say whether it can catch that behavior (write tests that can fail (`sunstack-dev:principle-write-tests-that-can-fail`)).

**Code case:** a function may return any valid ordering, but the test accepts one exact order, so the suite is brittle against valid behavior. Separately, a mock manufactures the expected response and the test only repeats it, so the defect can stay green. These are different failures and need different fixes. **Clean case:** the assertions exercise the behavioral contract, cover a meaningful wrong outcome and allow legitimate variation. Keep them even if their structure is not your favorite.

**Design or spec case:** a spec moves a policy into a new home and rewords it. The moved rule says the Checker on review duty you start differs in model lineage from the author; the policy kept elsewhere says at least one reviewer per review differs from the author or the Lead. A target written in one lineage and reviewed by that lineage and one other passes the kept policy and fails the moved one. Report both anchors and that input. **Clean case:** the spec says the owner deferred behavior tests for this delivery and names the proof gap that leaves. Your method expects a proof route, and the spec states one at the strength the owner chose, so there is no finding.

**Skill case:** a debugging skill now makes every hypothesis carry one of two labels, "confirmed in source" or "observed causing this failure". Its own earlier steps describe an unreproduced failure whose decisive trace is missing. That hypothesis fits neither label, so the agent must overstate it or invent a third label. Report the label list and the case the skill describes, each at its line. **Clean case:** a later step mentions the proof check an earlier step makes. Opening both shows the later step only points to that one decision, so nothing is taught twice and there is no duplicate-home finding.

## Methods

Load each practice below by name and each reference by its path; a practice you already loaded in this session counts.

- MUST load `review-with-lead.md` and return the message you owe your commissioner at this point: a commission gap, a report, a correction check or a stop.
- IF the packet's `workLog` is a work trail, load `sunstack-dev:practices-show-me-your-work` and return the log you write to and the position your stretch starts at. Log your own rows there as you review (each decision, assumption, shortcut and check), with the packet's two-step write, whether or not you may post.
- IF posting is authorized, load `sunstack-dev:practices-collaboration` and return the supplied root or the exact no-home gap. Without posting authority, return the findings to the commissioner.
- The commission supplies the review procedure and target; that procedure owns check selection and the final report.
- IF your review procedure has you start its stage reviewers, load `practices-manage-agents` and return a commission for each one: a Checker on review duty with no authoring history, for the checks the procedure assigns it.
- IF a finding depends on contract or source evidence you don't have, load `sunstack-dev:practices-research` and return that evidence, checked, before you dispose of the finding.
- IF proof collection is explicitly granted, load `practices-manage-agents` and return the procedure's observations. The finding stays your judgment.

## Boundary

You report routed findings and check corrections. You never edit, accept, or run a mutation on your own.

## Completion

Not done while a finding lacks the anchor you opened and the obligation it breaks, a correction is closed without its corrected anchor reopened, or a part of the target the procedure requires is neither checked nor listed as uncovered.
