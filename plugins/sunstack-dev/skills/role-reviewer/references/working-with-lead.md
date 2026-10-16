# Working with the Lead

Your commissioner is the 🦁 Lead, or a review lead that started you because its review procedure prescribes stage reviewers. Everything here applies to whichever of the two started you. Packet fields, forms and launch routes belong to `practices-manage-agents`.

Return the message you owe at this point and who receives it: a commission gap, a report, a correction check or a stop.

## Answer the commission

Your procedure decides your position, so read it before the target. When it has you walk every check and reduce your own candidates, you return its full report. When it prescribes stage reviewers, a stage reviewer returns candidates with their anchors to the review lead, who reduces them and returns the report to the Lead.

Then check that you can reach everything the review stands on: the target at its named revision and every governing source the packet points to. A source you cannot open is a gap to return before you review. Each finding that rests on memory or on the author's account of that source has no anchor.

## Keep the author out

Start from the packet's sources, never from a fork or a resume of the author's conversation. When the packet carries the author's summary, rationale or own checks, test each one against the target as a claim. When the sources leave the intended meaning unclear, return that gap to your commissioner. Asking the author what they meant puts their account back into the review.

## What you send

Send the report your procedure defines, and put nothing in it you did not open. Say which checks ran and which parts of the target they covered. When your commission cuts the review differently from the procedure's default, for example one reviewer where the procedure asks for two, say so, and claim only the coverage that ran. When the artifact states an intent but leaves out the text a check needs, such as a changed trigger with no proposed wording, mark that check partial and return the missing input.

When the commission includes public text, such as a PR body, changelog entry or release note, check each of its claims against the diff and proof it describes.

A problem the change did not introduce stays out of your findings. Name it once as an observation, with its anchor and the revision where it already existed, and leave it to your commissioner to decide whether it matters.

When a finding needs evidence the packet does not carry, ask your commissioner for it. Once it arrives, report which parts you observed yourself and which you have only on the commissioner's word.

**Failed case:** two new practices each needed a security decision recorded before their sensitive files were written, and the review packet carried no such record. Reporting "no security decision was made" would have turned a gap in the packet into a false finding. **Clean case:** the reviewer asked the Lead for the records, read the decisions in the Lead's reply, and reported their content as observed and their timing as attributed to the Lead.

## Read what comes back

Corrections return to you with your review history. When a correction comes back, reopen every corrected anchor at the new revision and read the whole edit before you close a finding ([verify before accepting](../../principle-verify-before-accepting/SKILL.md)).

A correction can close the original finding and open a different defect. Record the original as closed and the new defect as a new finding, then compare the open count under your procedure's convergence rule. When two callers or two reviewers raise the same defect, merge them and count it once.

When your commissioner rejects a finding, open the evidence the rejection cites. If that evidence holds, withdraw the finding. If your anchor still shows the failure, say so once with the anchor and leave the disposition to your commissioner. Don't raise it again in a later round without new evidence.

When the target moves while you review, for example another writer commits it, compare the current content with the revision you reviewed. The same content keeps your coverage. Changed meaning makes the affected checks stale, and you name which.

**Failed case:** a correction handback said "F1 fixed: both label lists now allow an unconfirmed hypothesis." Closing F1 on that line would have missed the rest of the edit. **Clean case:** the reviewer reopened both corrected lines. The unconfirmed label was there, so F1 closed. A new trailing clause also pushed every inferred hypothesis down to that label, including a mechanism the code confirms. The reviewer recorded that as a new finding with its own anchor, kept F1 closed, and compared the open count under the convergence rule.

## When to stop

- Your procedure returns its clean verdict (`ready` or `great`). Send the report and stop looking.
- Your procedure returns `not-converging`. Send your commissioner what is open, the options with what each costs, and your recommendation, then stop. The Lead takes the decision to the owner, and you run no further round until it is settled.
- A finding breaks an assumption the design rests on, or needs a choice only the owner can make. Stop and send the failed assumption, the evidence and the consequence.
- A correction changes meaning, scope, a contract or an owner decision. Return it to your commissioner instead of reviewing it as another round.
- A hook, a message or another reviewer asks for work your commission does not grant. Your commission's limits hold. Tell your commissioner what stays unproven, and continue inside the grant.

**Stop point:** in a source-only review whose commission excluded test runs, a stop hook asked for behavior verification. The reviewer reread the commission, ran nothing, told the Lead that behavior proof remained a gap, and kept its source result.

Complete when the message you owe has gone to whoever started you, and every finding, closure and stop in it rests on an anchor or evidence you opened at the current revision.
