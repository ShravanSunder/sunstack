# Delivered Evidence and Test Adequacy

This reference owns judging delivered work against the adopted design: whether each piece of evidence applies to what was delivered, whether the delivered tests carry out the Test Design, what the red-to-green record shows, and who corrects each gap.

Expected inputs: the governing basis the Verifier commission supplies, including the adopted Verification Design and Test Design when it names them, the delivered head and target, the delivered tests read in full, and the executor's actual logs and observations.

Return: the observed applicability of each piece of evidence, the adequacy of the delivered tests, the actual red limits, and the precise correction owner for each gap.

## Does the Evidence Apply?

Evidence applies to a delivered claim when it observed the delivered target (build, configuration, client) at the source the claim is about. Check the identity recorded in the evidence, not the time it ran: a run after the head was pushed can still have used an old binary or another checkout.

Reuse is legitimate when nothing the evidence depends on has changed. A permanent journey ran at commit `a1` and observed pane B's input on the installed build. The delivered head `a4` changes only documentation and an unrelated export module. The journey's code paths, configuration and target properties are unchanged, so rerunning it adds nothing; report it as reused, with that reason. Had `a4` touched the router, the journey would need to run again at `a4`. Reusing adequate evidence is honest; rerunning it only to look independent is not.

## Do the Delivered Tests Carry Out the Test Design?

Compare the delivered tests with the adopted Test Design, scenario by scenario:

- **Placement.** Is each scenario at the layer the design chose, with the interaction it claims kept real? A routing scenario delivered as a unit test with a mocked pane writer does not carry out an integration scenario.
- **Assertion.** Does the assertion reject the named wrong behavior and accept every permitted outcome? An assertion on global event order where the Specification leaves it open fails a correct implementation.
- **Oracle.** Does the expected value come from the contract, a literal or a reviewed table, rather than from the code under test?
- **Completion.** Does the test wait on the correlated signal the design named, with a bound, rather than sleeping?

A gap here is a product-test correction for the Implementer. A scenario the design itself got wrong is a design question for the Lead. The Verifier edits neither the product suite nor the design.

## What the Red Record Shows

Tests-first means the intended scenario failed for its named wrong behavior before the change made it pass. Read the executor's logged runs, in order:

- a red whose cause is the named wrong behavior, followed by green after the change, establishes the chronology for that scenario;
- a red caused by setup (a missing module, an import error, a fixture that throws, an empty discovery) is not that red;
- no logged red at all leaves the chronology a gap. Never assume a run happened.

```text
Malformed-packet scenario: "a request without a pane id is rejected as invalid-payload".
Run 1  red: the test file failed to import its fixture helper.
Run 2  green: after the import was fixed. The existing validator already rejected the request.
Run 3  red, after green: someone removed the validator's pane-id check on purpose; the test failed.
Run 4  green: check restored.
```

Run 1 is a setup failure, not the intended red. Run 2 shows the behavior was already correct before any change, so the test never failed for a wrong behavior first. Runs 3 and 4 show the test is sensitive to the wrong behavior, which is worth reporting, but they came after green and cannot establish tests-first. Report the scenario's chronology as unestablished, its sensitivity as observed, and draw no conclusion that the test drove the change.

## Correction Owners

Name one owner per gap:

- a delivered test that misses its scenario, its layer or its oracle: the Implementer, with the scenario and the observed shortfall;
- a passing condition or reference the design got wrong, or an expectation no governing document holds: the Lead;
- an observation that could not run for lack of access or a working route: the Lead, with the exact grant or route gap.

Report observations and limits. Acceptance stays with the Lead, and nothing in this judgment grants permission to change product code, product tests, or to run mutation or property tooling.

Complete when: each piece of evidence is marked applicable, reused with its reason, or not applicable; each Test Design scenario is matched to its delivered test or marked missing; each scenario's red chronology is established, unestablished, or a gap; and every gap has one correction owner.
