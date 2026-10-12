---
name: principle-prove-it-works
description: "Use when about to say a feature, fix, or UI change works. A passing test proves only what it observes: proof is the feature working through the real entry point, observed where the user would see it, with anything unverified named."
disable-model-invocation: true
---

# Prove It Works

A passing test proves only what it observes. Proof is the feature working through the real entry point, observed where the user would see it. The two get conflated all the time, and most "done but broken" lives in the gap between them: the configuration, the wiring, the provider actually selected, the layout at a real size, the installed package, the full window transition. A unit test crosses none of those. Done means the agreed feature works through its real path, the required checks pass, and whatever is still unverified is named.

## How to think it through

**State the claim the way the user would see it.** Not "the handler is fixed" but "pressing Enter once submits the search, in the app, with real results". That tells you what to run and where to look.

**Find the real path.** The app, command, endpoint, or page a user actually uses, with the real configuration and the provider production selects, run on representative data: current data, a large diff, the slow case.

**Drive it and look where the user would.** The rendered screen at the target viewport, the response body, the file on disk, the message that arrived. For a backend effect behind a click, follow the click through the logs and traces. For an API or a library, the user is the calling program: look at the response it gets and the state it can read back. Record what you did and what you saw.

**Drive the failures the claim covers, too.** When the change touches how errors are handled or shown, the happy path leaves that unproven. Make the failures the claim covers happen through the same entry point (a rejected input, an unreachable dependency), enough to see each distinct error the user can meet arrive and be shown correctly; the detailed cases behind each rule stay in cheaper tests. A change that doesn't touch failure handling doesn't need an unrelated failure staged.

**A durability claim crosses the restart.** "It's saved" is proven by restarting the process, or doing the round trip, and comparing the exact identities and contents that come back (the same message ids, order, and bodies, not the same row count), not by seeing a success response.

**Script it when you can.** A rerunnable check whose output is kept is stronger than a one-time look, because a reviewer can run it again instead of trusting your word.

**Match the proof to the claim, without repeating yourself.** An automated test that drives the real path (an integration test, one of a few end-to-end journeys) can be the proof. Use a manual check for what the suite doesn't establish. A docs or config change needs only the smallest real check. Don't repeat an equivalent validation unless something changed.

**Keep the scoped result apart from the whole.** Seven focused tests passing while the full suite still fails is two results, so report both. A focused green is not "the build is green".

**Name what is still unverified:** stubs and stand-ins, layers not exercised, environments not tried: "The reconnect fix goes red to green in focused tests; the deployed beta path hasn't been exercised, so that claim stays open." And never weaken, skip, or disable a required check to get a pass; if it can't pass, say why.

**When the real path isn't reachable from where you are** (it needs a device, a login, production access), use the closest thing through the same entry point, such as a test mode or a staging account. Name exactly what that leaves unverified, and give the owner the exact steps to check the rest themselves.

**The hard call is what counts as the real path.** A dev server with a mocked backend isn't the real path for a backend change. A component test isn't the full window transition. The dev server isn't the shipped bridge. When in doubt, ask what the user's click actually goes through, and make the proof go through that.

## Example: five green fixes

Fast scrolling through a review left some files showing as placeholders. Five fixes went in, each with passing unit tests, and the symptom was still there; clicking a single file loaded it, which made it look fixed. The tests measured what happens when one item is selected, not what happens to every visible item during a fast scroll. Better: drive the real review surface with real fast scrolling and observe each visible item's loading state. That journey shows whether the contract holds, and it is the check that should have gone first.

IF the case in front of you doesn't match the scrolling example, or you are judging someone else's claim that something works, load `references/example_scenarios.md` (scenarios, simplest first: enter, twice; the share panel at a real size; seven focused passes, one failing suite; the flag the installed binary didn't know; tests on the wrong provider; the transition that left something behind; saved, across a restart) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

Pure domain logic with no entry point, viewport, or journey is proven by a focused test. Don't repeat a manual check that an automated real-path test already covers.

## Signs you skipped it

- A fix called done from unit tests while the symptom the user saw is still there, like placeholders left on screen during fast scrolling.
- A planned journey reported as if it ran.
- Screenshots from a different viewport, build, or environment than the claim.
- Stubs and stand-ins not named as unverified.
- A focused result reported as the whole suite.
- A required check weakened, skipped, or disabled to get green.

Designing a test that fails when the behavior is wrong is `principle-write-tests-that-can-fail`; one automated real-path test can serve both. Judging whether an observation supports the claim made from it is `principle-verify-before-accepting`.
