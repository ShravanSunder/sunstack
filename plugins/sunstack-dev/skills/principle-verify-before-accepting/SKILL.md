---
name: principle-verify-before-accepting
description: "Use when accepting any result: a helper's handback, a review finding, a passing run, 'done', an agreement, or your own conclusion. Check that this evidence establishes this exact claim, at this version, observed rather than reported, and name what it doesn't cover."
disable-model-invocation: true
---

# Verify Before Accepting

Accepting a result is a claim that the evidence supports a conclusion. Most false "done"s rest on real evidence for a different claim: a green run on an older commit, a unit test offered as proof of runtime behavior, a summary of a run nobody read, a true quote that doesn't say what it's cited for, a structural check offered as proof that the content is right. A false "done" costs more than any other failure, because everyone downstream has to verify everything again. Verifying means checking that this evidence establishes this conclusion, at this version, and was observed rather than reported. That holds whether the result came from a helper, a reviewer, a CI run, or your own reasoning.

## How to think it through

**State the claim precisely, and decide what you'd need to see before you read the report.** Not "it works", but "importing a file with a duplicate email leaves one contact, in the real app, at commit `abc123`". A vague claim can't be checked, so it gets accepted by default; and deciding the evidence first keeps the report from setting the bar.

**Check that the evidence observes the claimed thing.** A unit pass doesn't prove runtime behavior; a clean lint doesn't prove it compiles; valid frontmatter doesn't prove a skill teaches; a green suite that never touches the changed module proves nothing about the change. Ask what the evidence could have caught, and whether that includes the failure you care about.

**Check the version and the place.** Is the evidence from the head the claim is about, in the checkout or worktree it should be, against what is actually deployed? A result from the wrong commit or the wrong directory is evidence about something else.

**Read it; don't count it.** Open the log, the output, the diff. A summary, a receipt, a link, a reviewer's agreement, someone's confidence, or a finding's severity is not evidence of the thing itself. When you assign proof work, ask for persistent logs and check that they exist: "The helper reports the commands succeeded, but the raw logs it was asked for don't exist, so those receipts can't close the runtime proof." Prefer "run this" to "trust me".

**An intermittent failure needs stronger evidence than a few green reruns.** A test that fails one time in twenty passes three reruns in a row 86% of the time. Force the failing condition to reproduce it on demand, or compare failure rates before and after over enough runs to tell them apart.

**Name what the evidence doesn't cover.** Narrow the claim to what was shown, and list the rest as unverified, with where you looked. Don't round up.

**Treat review findings as claims too.** Open the cited anchor; accept the finding, reject it with evidence, or mark it unverified. Apply only what survives. A comment that sounds diligent can still be wrong or out of scope: "The reviewer warns of database corruption, but this working-directory fix doesn't touch that contract, so the blocker is rejected after reading the change."

**When a check fails, suspect your observation before the system.** A failed request from a sandbox, a test run in the wrong checkout, or a stale browser tab can make a healthy system look broken.

**Before calling something ready, say the risk.** What could go wrong if this merged today, and what is the worst thing that could break?

**The hard call is your own conclusion.** It gets the same check; confidence is not evidence. And keep it proportionate: require the evidence that actually proves the claim, not ceremonial gates that prove nothing extra.

## Example: the green run on the wrong commit

A helper reported "all tests pass, ready for review" with a CI link. The run was green, but it ran on the commit before the helper's last change, and the suite never touched the changed module. Accepting it would have sent unproven behavior to review. Better: match the run to the head, check that the suite exercises the change, and read the diff. The claim narrows to "the earlier commit is green; the current change is unproven".

IF the case in front of you doesn't match the green-run example, or you are reducing someone else's findings or proof, load `references/example_scenarios.md` (scenarios, simplest first: the review finding that was wrong; summaries without logs; fixed in CI?; a second harness; proof from the wrong checkout; "Ready" on structural checks) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When there is no result or claim to accept, there is nothing to check. Don't re-verify evidence you produced and observed a minute ago with nothing changed since.

## Signs you skipped it

- "Verified" claimed from a helper's success summary, with no run output anyone can inspect.
- Receipts and links counted instead of read, or a CI result from another commit or checkout offered as proof for this one.
- A helper's "done" passed on to review without opening the diff and the proof it was asked for.
- Review findings applied without opening their anchors.
- A pull request called merge-ready with no word on the worst thing it could break.
- A structural or static check reported as proof of behavior.

Gathering the evidence in the first place is `principle-read-ground-truth-first`. Producing evidence that the feature works end to end is `principle-prove-it-works`.
