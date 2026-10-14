# Reviewing a Test Design

This reference owns `test-only` mode judgment: whether the planned tests would catch the wrong behavior the Specification forbids, at layers that keep the responsible interactions real, with expected outcomes that come from the contract.

MUST load `../../../shared-references/requirements-specification-program-design.md` and return whether the Requirements, Specification, Program Design and Test Design identities are present, resolvable and distinct.

## Walk a Scenario Against a Wrong Implementation

For each material scenario, name a wrong implementation the obligation forbids, then trace the planned test against it: would the fixture reach the case, would the claimed interaction run for real, would the assertion fail? A scenario that passes for the wrong implementation is a false green, however thorough it looks.

The most common false green is a mocked-away proof path:

```text
Obligation:  text sent to pane B appears in B's input and in no other pane.
Scenario:    "router routes to the addressed pane", unit layer, pane writer replaced by a fake
             that records write(paneId).
Wrong impl:  the router resolves the target from focus and passes B's id to the fake.
Result:      the fake records write(B); the test is green; real text lands in pane A.
```

The finding is that the double replaced the interaction the scenario claims. The smallest correction keeps the router-to-pane write and two real panes at the integration layer; a router-branch unit test may stay for diagnosis. Route it to `test-design`.

## What to Inspect

- every material obligation has a scenario with a named wrong behavior, or a stated reason it needs none (a type or lint rule that makes it impossible, for example);
- each scenario keeps real what Program Design says must stay real, and uses a seam Program Design names; a needed seam that does not exist is a `program-design-gap`, not a test-design invention;
- each oracle comes from the contract, a worked example, a literal or a reviewed table, never from the code under test or an unchecked snapshot;
- each assertion rejects the forbidden behavior and accepts every outcome the Specification permits: no hidden order, wording or timing rule;
- each fixture reaches the case, and each asynchronous case waits on a bounded signal correlated to that case, never a sleep;
- a correct implementation would finish and pass each scenario;
- the distribution has a reason per layer: detailed cases at the cheapest honest layer, integration where the interaction is the claim, journeys only for what the whole system alone shows;
- each new scenario has a planned red with its intended cause, recorded as planned; setup failures are named apart from it; no red is claimed as observed;
- existing tests the change touches have keep, repair or remove decisions with reasons, and repairs are routed to the Implementer.

Use the pretend Implementer: could someone write these tests from the Test Design without choosing the wrong behavior, the oracle, the layer or the completion signal themselves? A required choice is a readiness failure.

Good: each scenario fails for a named wrong implementation and passes for every permitted outcome; each layer has its reason.

Bad: a mock standing in for the claimed interaction; an expected value computed by the production helper; an assertion on global order the contract leaves open; a sleep; a red described as already seen; every edge case repeated through the browser.

Route Test Design corrections to `test-design`; a missing obligation to `spec-design`; a missing seam or observation point to `program-design`.

Complete when: every material scenario was walked against a named wrong implementation, every oracle's source and every layer's reason were checked, the strongest mocked-away proof risk was examined, and planned red runs are confirmed as planned.
