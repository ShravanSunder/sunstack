---
name: test-design
description: "Use when designing how tests will catch a design's specified wrong behavior before tests are written: scenarios, independent oracles, honest layers, what must stay real, fixtures and completion, and keep/repair/remove judgments on existing tests. Not for writing tests (implementation), proving delivery on the real system (verification-design), or auditing tests already written (implementation-review)."
---

# Test Design

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

This skill answers one question: which wrong behavior must the tests catch, and where must each test run so that the wrong behavior can make it fail? It turns the Specification's forbidden behavior and Program Design's seams into a regression strategy before anyone writes a test. Every scenario follows one chain:

```text
forbidden behavior       what a wrong implementation would do, from the Specification
  -> what must stay real   the smallest interaction responsible for it, inside Program Design's seams
  -> cheapest honest layer the fastest, most deterministic place that keeps that interaction real
  -> independent oracle    the expected outcome, taken from the contract instead of the code
  -> completion            the signal that this case finished, correlated to it, with no sleeps
```

The result is a distribution, not a quota: many focused tests for pure rules, fewer integration tests where an interaction is the claim, and a few journeys for what only the whole system shows. A layer earns its place by catching something the cheaper layers cannot.

Test Design plans; it never observes. A planned red says what the executor should see fail and why, and only the executor's actual run shows it. The Implementer writes the tests, the paired Verifier judges the delivered tests and evidence against this design, and the Reviewer audits the tests as written. The Lead loads this skill and authors the Test Design; helpers return evidence.

## Main Path

### 1. Take the upstream documents as fixed input

MUST load `../../shared-references/requirements-specification-program-design.md` and return the current Requirements, Specification and Program Design identities and the separate Test Design home.

Read each material obligation in the Specification with its failure behavior, its literal counterexample, and the behavior it deliberately leaves undefined. Read Program Design's seams, observation points and the interactions it says must stay real. A missing or ambiguous obligation returns a `specification-gap`. A behavior no seam can observe returns a `program-design-gap`. Test Design never invents either.

Apply a caller's artifact-home policy: when it names `<project-root>/docs/specs/`, create the Test Design there as its own file.

Completion: every material obligation and the seam that can observe it are identified, or the exact upstream gap is returned.

### 2. Name the wrong behavior each test must catch

Read `principle-write-tests-that-can-fail` in full before you choose any scenario. For each material obligation, name the concrete wrong implementations it forbids. The cheap implementation spec-design used to break the obligation's wording is the first; the failure cases the obligation names (timeout, duplicate, rejection, partial success) are the next. "It works" is not a wrong behavior. An obligation whose wrong behavior a type or lint rule already makes impossible needs no test; say which rule does it.

Completion: each material obligation has at least one named wrong behavior, or a stated reason it needs no test.

### 3. Choose what stays real, the layer, and the oracle

MUST load `references/scenarios-oracles-and-layers.md` and return the case coverage: for each scenario, its independent oracle, its honest layer, and the interactions that must remain real.

The wrong behavior sets the floor. Keep real the smallest thing responsible for it, then choose the cheapest layer that keeps it real. A mock that replaces the interaction a scenario claims leaves the claim unproven, however green the test. Take each expected outcome from the contract, a worked example, a literal or a reviewed table, never from the code under test.

```text
Obligation:  saving a draft twice with the same draft id leaves one stored draft.
Wrong:       the repository inserts a second row instead of updating the first.
Mocked:      a fake repository keyed by draft id; the test is green because the fake overwrites.
             The real insert creates a second row, and the fake never shows it.
Real:        the real repository against the real schema.
Oracle:      exactly one row for that draft id, holding the second save's text.
Layer:       integration against a disposable database.
```

Completion: every scenario keeps its claimed interaction real, sits at the cheapest honest layer, and names where its expected outcome comes from.

### 4. Accept every permitted outcome

An assertion must reject the forbidden behavior and accept everything the contract permits. When the Specification leaves order, wording, timing or an incidental field undefined, a test that requires one value turns that freedom into a hidden rule, and a correct implementation fails it.

```text
Contract:   events from different panes have no ordering guarantee.
Too tight:  assert the global event list equals [A1, B1, A2].
Right:      assert per-pane order: A1 before A2; B1 present; nothing else.

Contract:   a malformed request is rejected with invalid-payload; the message text is not contracted.
Too tight:  assert the error message equals "pane id missing".
Right:      assert the result variant is invalid-payload and no write happened.
```

Read `principle-types-are-communication` in full when an assertion branches on a typed result variant.

Completion: no assertion excludes an outcome the Specification permits, and each still fails for its named wrong behavior.

### 5. Make the fixture reach the case and the test finish

IF completion is asynchronous, or a fixture could fail before the behavior is exercised, load `references/fixtures-and-completion.md` and return a fixture that reaches the intended assertion plus its correlated completion signal. A correct implementation must finish and pass: a test that waits on a step the fix removes fails correct code.

Completion: each scenario's fixture contains what the case needs, and each asynchronous case waits on a bounded signal tied to that case.

### 6. Judge the existing tests

IF existing tests cover behavior this design changes, load `references/existing-test-quality.md` and return a keep, repair or remove decision for each, grounded in protection, determinism and diagnosis, with proposed repairs routed to the Implementer. Test Design proposes; it never edits the product suite.

Completion: every existing test the change touches has a decision with its reason, and every removal names its replacement, its redundancy, or the dead contract.

### 7. Plan the red

For each new scenario, write how the executor will see it fail for the intended reason. When the defect exists today, the test fails against the current code with the wrong value or wrong effect the scenario names. When the behavior is new or already correct, the executor breaks the owning part on purpose, sees the test catch it, and restores it; that shows the test is sensitive, not that a bug existed. A missing module, an import error, an empty test discovery or a fixture that throws is a setup failure, never the intended red.

Record each red as planned and list it in the result's owed evidence. Test Design never claims an observed red, and it never invents a chronology the executor has not shown.

Completion: every new scenario has a planned red with its intended cause, and nothing in the design claims a red that has not run.

### 8. Author the Test Design and check it

Read `principle-write-for-the-reader` in full before you organize the document. Lead with the strategy a reader can confirm in one pass: which wrong behaviors matter, where each is caught, and why that layer. Then give each scenario its wrong behavior, scenario, oracle source, what stays real, layer and reason, fixture and completion, and planned red; then the existing-test decisions; then the limits left for later evidence. Link scenarios to the Specification's obligations and Program Design's seams instead of restating them.

IF a relationship is clearer as a view, such as a layer distribution or a proof path that differs from production, load `../../shared-references/diagram-rendering-and-fallbacks.md` and return the selected medium and visual-check result.

Then re-read the whole document as an author self-check: every material obligation has a scenario or a reason it needs none; every oracle is independent; no mock replaces a claimed interaction; no assertion excludes a permitted outcome; no case sleeps; every new scenario has a planned red; every layer choice has its reason. The self-check never replaces independent review.

Completion: a reader can tell which wrong behavior each test catches and why it runs where it does, and the self-check names every known gap.

### 9. Review the design, then return

Call `spec-program-review` using its `classify-review-requirement` operation with: requested mode `test-only`; the current Requirements, Specification, Program Design and Test Design identities; scope and claimed semantic effect; governing-source coverage; matched material-risk predicates; and `callerRequirement: required` on the design's first or substantive local cycle, which classification cannot waive. When review is required, invoke `spec-program-review` in `test-only` mode with fresh context and read-only authority. Correct accepted findings here; a finding about a missing obligation or seam goes to its upstream owner. Follow `spec-program-review`'s bounded review-and-correction-round policy.

MUST load `schemas/test-design-result.ts` and return the TestDesignResult after its local review: the document, the decisive strategy choice and its tradeoff, and the planned evidence still owed. The scenarios stay in the document; the result does not repeat them. Verification Design consumes the ready result; planning and the Implementer read the Test Design through the adopted design set.

Completion: the returned result validates, its review closure names the produced document, and every gap is in the result.

## Not Ready While

- a material obligation has no named wrong behavior and no stated reason;
- a scenario's double replaces the interaction it claims, or its oracle comes from the code under test;
- an assertion requires order, wording or timing the Specification leaves open;
- a case waits on wall-clock time, or a correct implementation could not finish it;
- a new scenario lacks a planned red, or the design claims a red nobody observed;
- an existing test the change touches has no decision, or a removal has no replacement or proof;
- a missing obligation or seam was invented here instead of returned upstream;
- the required local review is missing, partial, stale or not ready.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
