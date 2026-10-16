---
name: principle-write-tests-that-can-fail
description: "Use when writing, changing, or keeping a test for a fix, a feature, or a refactor, or when a claim rests on tests passing. Name the wrong behavior the test must catch, take the expected value from somewhere independent, run it at the cheapest layer where that wrong behavior can make it fail, and see it fail for the right reason."
disable-model-invocation: true
---

# Write Tests That Can Fail

Read this principle in full before applying it; your own full read earlier this session counts.

Tests are executable claims about behavior. A passing test claims the behavior is right, and that claim is worth something only if the test would have failed had the behavior been wrong. Many green tests can't fail: a mock answers before the real code runs, the expected value comes from the code under test, the assertion checks that a function was called rather than what came out, or the fixture never reaches the case. They cost CI time and review attention, and they look like proof. A test that can fail takes two decisions: what wrong behavior it must catch, and where it has to run so that wrong behavior can make it fail.

## How to think it through

**Start from the scenario.** The input or event, and the outcome a user or caller observes: the returned value, the stored row, the message sent, the rendered text. Call the subject the way its consumer does and assert that outcome, not the internal calls that produced it. A payload at an external boundary is an outcome; the order of internal calls is not.

### The first hard call: what wrong behavior must this test catch?

**Name a concrete wrong implementation,** not "it works": the rate is applied twice, the loader never reads the variable, Escape leaves the preview open, malformed input is accepted. If you can't name one, the test is decoration. Then ask whether your assertion would fail for it. A quick probe catches the weakest tests: would this still pass if every function it calls returned `undefined`? Passing that probe doesn't mean the test catches the wrong behavior you named, so ask about that one directly.

**Take the expected value from somewhere independent:** the contract, a worked example, a literal, a reviewed table of cases, or a property the rule implies. The oracle is circular when the production code under test also computes the expected value, or when the subject never touches the value being asserted: a tax test whose expected value comes from the production tax helper stays green when the rate is wrong, while a literal from the tax table catches it. A reviewed fixture that encodes the contract is a fine oracle. A snapshot is the code's own output, so it is an oracle only once someone has checked it against the contract; regenerating it just to turn a red green, without checking the new output, is circular again. And a wrong oracle is its own bug: it fails correct behavior, and someone "fixes" the code to match.

**Check the assertion in both directions.** Compare one named forbidden implementation with one materially different allowed implementation. The assertion must reject the first and let the second pass. For example, a contract that orders messages within each pane says nothing about order across panes, and incidental wording or timing is no requirement either. Keep exact equality when the contract promises exact contents or order. Loosening a contracted assertion to make a test pass is as wrong as imposing an order the contract never gave.

**Make the fixture reach the case, and test the rejections.** A branch-label test whose fixture has no commit can't show a label. When the claim includes rejecting bad input, each rejection is a scenario of its own.

### The second hard call: where does it have to run?

**The wrong behavior sets the floor: what must stay real.** Keep real the smallest thing responsible for it. "The pricing rule rounds wrong" needs only the rule. "The serialized event drops a field" needs the real serializer and the real consumer's validation, not a live socket; the transport stays real only when delivery, ordering, or recovery is the claim. "The transaction doesn't commit" needs the real database, and "the worker doesn't stop" the real worker. When the wrong behavior is a race, the interleaving must be real too; a test that runs the steps one after another has none, so hold one step open to force the bad order ([design for concurrency](../principle-design-for-concurrency/SKILL.md)). A double that replaces the interaction you are claiming leaves it unproven, however green the test.

**Above the floor, choose the cheapest honest layer.** Several layers can keep the same thing real; choose among them by speed, determinism, and how clearly a failure points at the cause. Many focused tests take the detailed cases at the fastest boundary that still keeps them honest, each under 25 ms at p95 and ideally under 10. Fewer integration tests cross real boundaries (serialization, storage, processes, protocols, components working together), each under 250 ms at p95 and ideally under 100. A small number of end-to-end journeys cover what only the whole stack shows: startup wiring, cross-language composition, the WebView. Don't repeat every edge case at the top; when a journey finds a defect, add the cheaper regression below it. Cheapest never outranks honest, and the pyramid is a distribution, not a checklist every change must fill.

Take a scheduler that should enqueue a reminder when an event comes due. The due-date edge cases are pure policy: test them as a function with a controlled clock and literal times. "The consumer picks up the message and runs it" needs the real queue and consumer in an integration test. "The reminder job registers at startup" may need one journey from boot to execution. A fake queue proves neither of the last two, and routing every date case through the journey proves nothing more about dates.

**Mocks are assumptions.** Replace only what lies outside the behavior: a remote API, the clock, randomness. Give the double the real contract, including failure, timeout, and malformed replies, and know what it assumes. If nothing has checked those assumptions against the real dependency, or so much is mocked that the scenario no longer runs, move the test up to an integration or end-to-end test with the real components; until then, its green shows only that the code agrees with the double. An integration seam is also how you make failures happen that you otherwise couldn't, like an error from a provider's server. Wait on an event or a protocol signal, with a bound; never wait on the wall clock.

### Then prove the test can fail

**See it fail for the intended reason before you trust it.** For a fix, a feature, or another change in behavior, write the test first and run it against the code as it is: it should fail for the reason you expect, and for a fix that red also shows the defect is real. Then implement until it passes. Don't write the fix first and remove it afterwards to manufacture the red; the test should come from the scenario, not from the code you just wrote. Read the failure before you count it. It must fail because of the wrong behavior you named (a wrong value, or the subject throwing or hanging), not a typo, an empty test discovery, a broken fixture, or an unrelated error. Judge the red by its cause, not by which line reported it: "The old reconnect code still resumes after repeated refusals, and that is what turns this test red; a missing test file would have proven nothing about reconnects." When the behavior is already in the code before you write its test (a refactor, behavior that already works, a fix that shipped without one), prove the test can fail another way: run it with that fix removed, or break the behavior on purpose at the part that owns it, watch the test catch the break, and restore it. A deliberate break shows sensitivity only. Report runs in the order they happened. Without a red observed against the pre-fix code, a pre-existing defect and tests-first order stay unobserved; say so.

**Test the API you own,** not a workaround around it; reaching into internals (reflection around the official transaction API) while the real API stays untested proves only the workaround. **When no honest seam exists,** use the closest executable check, or improve the seam; a mocked test that can't fail is worse than none, because it looks like coverage.

**Count and coverage are not value.** Remove a test that adds no confidence, but only with a replacement, proof it's redundant, or proof its contract is dead.

## Example: the Ctrl-C the mock ate

A terminal app must ignore Ctrl-C while a dialog is open. The new component test passes on its first run, before any fix. The harness's mock terminal consumed Ctrl-C itself, so the component never saw the key, and the wrong behavior ("the dialog closes on Ctrl-C") could never fail this test. Injecting the raw key event at the component boundary, where the real app delivers it, made the test fail against the old code and pass after the fix.

IF the case in front of you doesn't match the Ctrl-C example, or you are reviewing someone else's tests against this principle, load `references/example_scenarios.md` (scenarios, simplest first: the test that slept; the rejection nobody tested; the formatter text; the red that wasn't; setup-red, green, break, restore; the tax helper on both sides; per-pane order versus global order; the wrong first responder; the field the schema didn't know; the suite that ran everything through the browser; the reset link that worked twice) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

A renamed constant or a formatting change needs no new scenario. A behavior already pinned by an honest test at the right seam doesn't need a second one. Throwaway exploration before an option is chosen doesn't need tests yet. And when a type or a lint rule can make the wrong behavior impossible, use it instead of a test that catches it ([types are communication](../principle-types-are-communication/SKILL.md)).

## Signs you skipped it

- A regression test that is green while the known defect is still present, because the harness handles the input before the subject sees it.
- Assertions only on `toHaveBeenCalled`, `toBeDefined`, or call order, with no observed result.
- An expected value computed by the code under test.
- A mock standing in for the very interaction the test is named after.
- A cross-boundary claim proven only by unit tests, or every edge case repeated end to end.
- A red reported when discovery found no target test, or setup failed before the scenario reached the subject.
- A test that fails on the bug but can't pass on a correct fix, because it deadlocks or waits on a step the fix removes.
- Only positive cases for a feature that is supposed to reject things.
- A test that sleeps before checking a background result instead of waiting for its completion signal.

When you judge whether the feature works through its real entry point, drive it there and look where the user would ([prove it works](../principle-prove-it-works/SKILL.md)); one automated real-path test can serve both. When you judge whether a passing run supports the conclusion drawn from it, match the run to that claim and its version ([verify before accepting](../principle-verify-before-accepting/SKILL.md)).
