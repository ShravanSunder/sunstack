---
name: principle-write-tests-that-can-fail
description: "Use when writing, changing, or keeping a test for a fix, a feature, or a refactor, or when a claim rests on tests passing. Name the wrong behavior the test must catch, take the expected value from somewhere independent, run it at the cheapest layer where that wrong behavior can make it fail, and see it fail for the right reason."
disable-model-invocation: true
---

# Write Tests That Can Fail

Tests are executable claims about behavior. A passing test claims the behavior is right, and that claim is worth something only if the test would have failed had the behavior been wrong. Many green tests can't fail: a mock answers before the real code runs, the expected value comes from the code under test, the assertion checks that a function was called rather than what came out, or the fixture never reaches the case. They cost CI time and review attention, and they look like proof. A test that can fail takes two decisions: what wrong behavior it must catch, and where it has to run so that wrong behavior can actually make it fail.

## How to think it through

**Start from the scenario.** The input or event, and the outcome a user or caller observes: the returned value, the stored row, the message sent, the rendered text. Call the subject the way its consumer does and assert that outcome, not the internal calls that produced it. A payload at an external boundary is an outcome; the order of internal calls is not.

### The first hard call: what wrong behavior must this test catch?

**Name a concrete wrong implementation,** not "it works": the rate is applied twice, the loader never reads the variable, Escape leaves the preview open, malformed input is accepted. If you can't name one, the test is decoration. Then ask whether your assertion would fail for it. A quick probe catches the weakest tests: would this still pass if every function it calls returned `undefined`? Passing that probe doesn't mean the test catches the wrong behavior you named, so ask about that one directly.

**Take the expected value from somewhere independent:** the contract, a worked example, a literal, a reviewed table of cases, or a property the rule implies. The oracle is circular when the expected value is computed by the same production code the test exercises, or when the subject never touches the value being asserted. A rate test that computes its expected tax with the production tax helper moves with the bug: a wrong rate changes both sides, and the test stays green. A literal from the tax table catches it. A reviewed fixture that encodes the contract is a fine oracle. A wrong oracle is its own bug: it fails correct behavior, and someone "fixes" the code to match. A snapshot is the code's own output: it becomes an oracle only once someone has checked it against the contract, and regenerating it just to turn a red green, without checking the new output, is the circular oracle again.

**Make the fixture reach the case, and test the rejections.** A branch-label test whose fixture has no commit can't show a label. When the claim includes rejecting bad input, each rejection is a scenario of its own.

### The second hard call: where does it have to run?

**The wrong behavior sets the floor: what must stay real.** "The pricing rule rounds wrong" needs only the rule. "The serialized event drops a field" can't fail a test that never runs the real serializer; "the transaction doesn't commit" can't fail one that replaces the database; "the worker doesn't stop" can't fail one that replaces the worker. Keep real the smallest thing responsible for the wrong behavior: a field claim needs the real serializer and the real consumer's validation, not a live socket; the transport stays real when delivery, ordering, or recovery is the claim. A double that replaces the interaction you are claiming leaves it unproven, however green the test. When the wrong behavior is a race, the interleaving must be real too: force the bad order through a seam you control (for example, hold one request between its check and its write) instead of running the steps one after another, which passes even with the race, or hoping a stress loop hits it; see `principle-design-for-concurrency`.

**Above the floor, choose the cheapest honest layer.** Several layers can keep the same thing real; choose among them by speed, determinism, and how clearly a failure points at the cause. Many focused tests take the detailed cases at the fastest boundary that still keeps them honest. Fewer integration tests cross real boundaries (serialization, storage, processes, protocols, components working together). A small number of end-to-end journeys cover what only the whole stack shows: startup wiring, cross-language composition, the WebView. Don't repeat every edge case at the top; when a journey finds a defect, add the cheaper regression below it. Cheapest never outranks honest, and the pyramid is a distribution, not a checklist every change must fill.

Take a scheduler that should enqueue a reminder when an event comes due. The due-date edge cases are pure policy: test them as a function with a controlled clock and literal times. "The consumer picks up the message and runs it" needs the real queue and consumer in an integration test. "The reminder job registers at startup" may need one journey from boot to execution. A fake queue proves neither of the last two, and routing every date case through the journey proves nothing more about dates.

**Mocks are assumptions.** Replace only what lies outside the behavior: a remote API, the clock, randomness. Give the double the real contract, including failure, timeout, and malformed replies, and know what it assumes; close that assumption with a real boundary test when it matters. An integration seam is also how you make failures happen that you otherwise couldn't, like an error from a provider's server. Wait on an event or a protocol signal, with a bound; never wait on the wall clock.

### Then prove the test can fail

**See it fail for the intended reason before you trust it.** Run it against the old code, or with the fix removed, and read the failure. It must fail because of the wrong behavior you named (a wrong value, or the subject throwing or hanging), not a typo, an empty test discovery, a broken fixture, or an unrelated error. Judge the red by its cause, not by which line reported it. When there's no old bug (a refactor, or behavior that already works), break the behavior on purpose at the part that owns it, watch the test catch the break, and restore it. That shows the test is sensitive, not that a bug existed. This is the red step of red-green.

**Test the API you own,** not a workaround around it; reaching into internals while the real API stays untested proves only the workaround. **When no honest seam exists,** use the closest executable check, or improve the seam; a mocked test that can't fail is worse than none, because it looks like coverage.

**Count and coverage are not value.** Remove a test that adds no confidence, but only with a replacement, proof it's redundant, or proof its contract is dead.

## Example: the Ctrl-C the mock ate

A terminal app must ignore Ctrl-C while a dialog is open. The new component test passes on its first run, before any fix. The harness's mock terminal consumed Ctrl-C itself, so the component never saw the key, and the wrong behavior ("the dialog closes on Ctrl-C") could never fail this test. Injecting the raw key event at the component boundary, where the real app delivers it, made the test fail against the old code and pass after the fix. The first green was the mock answering, not the component.

IF the case in front of you doesn't match the Ctrl-C example, or you are reviewing someone else's tests against this principle, load `references/example_scenarios.md` (scenarios: the tax helper on both sides; the field the schema didn't know; the wrong first responder; the formatter text; the rejection nobody tested; the red that wasn't; the test that slept) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

A renamed constant or a formatting change needs no new scenario. A behavior already pinned by an honest test at the right seam doesn't need a second one. Throwaway exploration before an option is chosen doesn't need tests yet. And when a type or a lint rule can make the wrong behavior impossible, that beats a test that catches it; see `principle-types-are-communication`.

## Signs you skipped it

- A new test that passed on its first run, before the fix.
- Assertions only on `toHaveBeenCalled`, `toBeDefined`, or call order, with no observed result.
- An expected value computed by the code under test.
- A mock standing in for the very interaction the test is named after.
- A cross-boundary claim proven only by unit tests, or every edge case repeated end to end.
- A red caused by a missing file or an unrelated error, reported as red.
- Only positive cases for a feature that is supposed to reject things.
- A `sleep` waiting for something to happen.

Whether the feature works through its real entry point is `principle-prove-it-works`; one automated real-path test can serve both. Whether a passing run supports the conclusion drawn from it is `principle-verify-before-accepting`.
