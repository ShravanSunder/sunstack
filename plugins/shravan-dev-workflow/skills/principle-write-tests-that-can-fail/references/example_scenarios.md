# Write Tests That Can Fail: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## The test that slept

**What happened.** A test started a background job, slept two seconds, then checked the result. It passed locally and flaked in CI whenever the machine was busy. The owner wanted no more tests that depend on the clock.

**The move.** Wait on a signal, not the clock.

**Better.** Control time with an injected clock where the logic depends on time, and wait for the job's completion event with a bound where it depends on another process. The test now fails only when the job is wrong, and fails fast when it hangs.

## The rejection nobody tested

**What happened.** A feature was reported green for rejecting malformed markers and wrong descriptors. Reading the tests showed only positive scenarios: nothing ever sent a malformed marker.

**The move.** Rejections are scenarios too.

**Better.** One test per rejection the claim names, each sending the bad input and asserting the refusal the caller sees. "The test file passes" was never coverage of the cases it didn't contain.

## The formatter text

**What happened.** Telemetry tests matched the formatted log line. On a different CI host the formatting changed and two tests failed, while the structured fields the contract required were correct all along.

**The move.** Assert the contract, not a representation of it.

**Better.** Capture the emitted fields with a typed test recorder and assert the fields. The test now fails when a required field is missing, and only then.

## The red that wasn't

**What happened.** Several "red before green" runs were red because the test file wasn't discovered, a test was skipped, or setup threw an unrelated error. None of them failed because of the behavior under test.

**The move.** Read the failure before counting it.

**Better.** A valid red fails because of the intended wrong behavior (the old code, the fix removed, or a deliberate break at the owner), whether that shows as a failed assertion or the subject throwing. A red caused by anything else is a broken test run, and says nothing about the test.

## The tax helper on both sides

**What happened.** An invoice test computed its expected total by calling the production tax helper, then compared it with the invoice's total. A bug in the helper's rate changed both numbers the same way, and the test stayed green. Moving the same comparison into an end-to-end test changed nothing.

**The move.** Take the expected value from somewhere independent.

**Better.** Assert a literal from the published tax table for a few representative amounts, or a property the rule implies. Then apply a deliberately wrong rate once and watch the test fail. The layer was never the problem; the oracle was.

## The wrong first responder

**What happened.** A native Escape test expected the text field itself to become the window's first responder, and failed. AppKit correctly makes the text field's field editor the responder.

**The move.** A wrong oracle is its own bug.

**Better.** Assert what the platform actually does: the text field's current editor holds focus. Check an expected value against the real boundary's documented behavior before "fixing" code to match it.

## The field the schema didn't know

**What happened.** The Swift side added an optional field to an event. The web side's strict schema didn't declare it, so the worker rejected the frame and broke the recovered stream. Unit tests on each side passed, because each side tested its own types.

**The move.** The wrong behavior sets what must stay real.

**Better.** "The consumer rejects what the producer sends" can only fail a test that feeds the real producer's serialized event to the real consumer's schema. Update both schemas together and keep that test. Because recovering the stream was also part of this feature, its transport and recovery tests stayed as well; a field change alone wouldn't need them.

## The suite that ran everything through the browser

**What happened.** Team invitations had forty end-to-end tests: every rule (an invite expires after seven days, a member can't invite an admin, a second invite to the same address replaces the first) was driven through a browser against the full stack. The suite took twenty minutes, flaked weekly, and when a rule broke, the failure said only that a page didn't show the expected text.

**The move.** Above the floor, choose the cheapest honest layer: the pyramid is a distribution.

**Better.** Lay the same claims out by what each one needs to stay real:

- **Unit, many** (p95 under 25 ms, ideally under 10): the rules as functions over invitation values with a controlled clock and literal dates. Expiry at the boundary, role limits, replacement, malformed addresses. Each failure names the rule.
- **Integration, fewer** (p95 under 250 ms, ideally under 100): an invite is stored and its email job enqueued through the real database and queue; accepting a link adds the member in one transaction. The email provider is a double that honors its real contract, including a rejected address.
- **End-to-end, one or two journeys**: an admin invites someone, the invitee follows the link, and lands in the workspace with the right role. These prove the wiring only the whole stack shows, not the rules again.

Forty browser tests became about thirty unit tests, five integration tests, and two journeys. The suite runs in under a minute, and a broken rule fails at the unit test that names it.

## The reset link that worked twice

**What happened.** A password-reset link was meant to work once. Its test used the link, then used it again, and asserted the second use was refused; it passed. In production, two near-simultaneous requests both succeeded, because the code checked "unused" and then marked it used in two steps.

**The move.** When the wrong behavior is a race, the interleaving has to stay real.

**Better.** Force the bad order through a seam you control: hold the first request between its check and its write, run the second request to completion, then release the first. That test fails against the two-step code and passes once the check and the write are one atomic update. A sequential test can't see the race, and a stress loop that fires many requests at once finds it only by luck.
