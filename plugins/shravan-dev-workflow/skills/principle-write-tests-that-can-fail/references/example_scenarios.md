# Write Tests That Can Fail: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## The tax helper on both sides

**What happened.** An invoice test computed its expected total by calling the production tax helper, then compared it with the invoice's total. A bug in the helper's rate changed both numbers the same way, and the test stayed green. Moving the same comparison into an end-to-end test changed nothing.

**The move.** Take the expected value from somewhere independent.

**Better.** Assert a literal from the published tax table for a few representative amounts, or a property the rule implies. Then apply a deliberately wrong rate once and watch the test fail. The layer was never the problem; the oracle was.

## The field the schema didn't know

**What happened.** The Swift side added an optional field to an event. The web side's strict schema didn't declare it, so the worker rejected the frame and broke the recovered stream. Unit tests on each side passed, because each side tested its own types.

**The move.** The wrong behavior sets what must stay real.

**Better.** "The consumer rejects what the producer sends" can only fail a test that serializes a real event and sends it across the transport. Update both schemas together, and keep one test that crosses the boundary.

## The wrong first responder

**What happened.** A native Escape test expected the text field itself to become the window's first responder, and failed. AppKit correctly makes the text field's field editor the responder.

**The move.** A wrong oracle is its own bug.

**Better.** Assert what the platform actually does: the text field's current editor holds focus. Check an expected value against the real boundary's documented behavior before "fixing" code to match it.

## The formatter text

**What happened.** Telemetry tests matched the formatted log line. On a different CI host the formatting changed and two tests failed, while the structured fields the contract required were correct all along.

**The move.** Assert the contract, not a representation of it.

**Better.** Capture the emitted fields with a typed test recorder and assert the fields. The test now fails when a required field is missing, and only then.

## The rejection nobody tested

**What happened.** A feature was reported green for rejecting malformed markers and wrong descriptors. Reading the tests showed only positive scenarios: nothing ever sent a malformed marker.

**The move.** Rejections are scenarios too.

**Better.** One test per rejection the claim names, each sending the bad input and asserting the refusal the caller sees. "The test file passes" was never coverage of the cases it didn't contain.

## The red that wasn't

**What happened.** Several "red before green" runs were red because the test file wasn't discovered, a test was skipped, or setup threw an unrelated error. None of them failed on the target assertion.

**The move.** Read the failure before counting it.

**Better.** A valid red is the intended assertion failing under the intended wrong behavior: the old code, the fix removed, or a deliberate break at the owner. Anything else is a broken test run, and says nothing about the test.

## The test that slept

**What happened.** A test started a background job, slept two seconds, then checked the result. It passed locally and flaked in CI whenever the machine was busy. The owner: "I don't want more clock-based tests; I want proper tests."

**The move.** Wait on a signal, not the clock.

**Better.** Control time with an injected clock where the logic depends on time, and wait for the job's completion event with a bound where it depends on another process. The test now fails only when the job is wrong, and fails fast when it hangs.
