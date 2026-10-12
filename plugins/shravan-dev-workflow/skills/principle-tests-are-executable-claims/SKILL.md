---
name: principle-tests-are-executable-claims
description: "Use when behavior changes (a fix, a feature, a refactor) or a claim rests on tests passing. Design the scenario that fails if the behavior is wrong, at the cheapest layer that still exercises the real interaction, and see it go red before green."
disable-model-invocation: true
---

# Tests Are Executable Claims

**Apply when** behavior changes (a fix, a feature, a refactor), or a claim rests on tests passing.

**Rule.** Start from the scenario: the input or event, and the outcome a user or caller would observe. Drive it through the part that owns the behavior, at the cheapest layer that still exercises the real interaction, and assert the outcome, not which functions were called. Before you trust it, watch it fail for the expected reason: against the old code, or with the fix removed. When there is no old bug (a refactor, or behavior that already works), break the behavior on purpose at the part that owns it, watch the test catch the break, then restore it; that shows the test is sensitive, not that a bug existed. Mock only what lies outside the behavior you are proving, and give the mock that dependency's real contract and failure modes.

**Why.** A test is an executable claim. One that cannot fail proves nothing and still looks like proof. The usual ways it can't fail: a mock or harness answers before the real code runs, the assertion checks a call instead of a result, or the expected value comes from the code under test.

**The test.**

1. Would this test fail if the behavior were wrong, for example if every function it calls returned nothing?
2. Have you seen it fail for the expected reason, against the old code or a deliberate break?
3. Does the input enter where it enters in the real program, or does a mock or harness handle it first?

**Distinct from.**

- `principle-prove-it-through-the-real-path` drives the real entry point and journey; this card asks whether a scenario can expose the defect. Choose by the claim, not by "unit vs end-to-end". One automated real-path test can serve both.
- `principle-verify-before-accepting` judges whether passing evidence supports the conclusion drawn from it.

**Applied means** you name the scenario, the layer you chose and why it is the cheapest honest one, and the red you saw before the green, or the deliberate break it caught.

## Worked case

A terminal app must ignore Ctrl-C while a dialog is open. The new component test passes on its first run, before any fix. The harness's mock terminal consumed Ctrl-C itself, so the component never saw the key. Injecting the raw key event at the component boundary, where the real app delivers it, made the test fail against the old code and pass after the fix. The first green was the mock answering, not the component.

## Overkill

If a test at the right seam already turns red for this exact regression, a second one repeats the decision. A renamed constant or a formatting change needs no new scenario. Don't climb to an end-to-end test for a rule a unit test can expose: pick the cheapest honest layer, not the most impressive one.
