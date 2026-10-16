# Working with the Advisor

This is your side of working with an Advisor. You commission one only when the owner asks, through `practices-manage-agents`. The owner can also open an Advisor directly; then the owner is its commissioner, and the Advisor tells you what the owner asked and what it concluded. Return the context and unblock grant it was commissioned with, and your disposition of each judgment it returned and each move it proposed.

## Starting or answering it

When you commission it, send the work's context: the governing artifacts as paths it can open, the current state with anchors (branch and commit, the trace, open handbacks and review results), and the owner's goal in the owner's words. Add your own questions if you have any. Leave out a list of points to check, because finding the high-risk points is the Advisor's job. A list hands it your blind spots: it checks what you already suspected and never reaches the part you didn't think to name. A summary in place of the files does the same, because it can only check your summary. Leave out any request to sign off, because its agreement can't be a sign-off.

Give it the unblocking job in the same commission, with the packet's `unblockGrant`. Fill it from the work as it stands:

- `resumableSessions`: the exact address of every helper session the work can stall on. When you start a helper later, send the Advisor an updated grant that adds it.
- `helperStarts`: `bounded-collection` when an Operator or a Researcher Worker could fetch a missing input or evidence without you; otherwise `none`.
- `whenLeadUnreachable`: what it does when you don't answer, in words it can act on, such as "post the stall on the work thread, keep resuming the listed sessions, and message the owner once if the review is still stopped by morning." The owner hears from you by default, so say whether the Advisor may reach the owner.

When the owner opened it, give it the files and anchors it asks for, and leave the owner's questions as the owner framed them.

## Reading what comes back

A second-look judgment from the Advisor says what it checked, what it concluded, what it recommends and what stays out of scope; a gap question or a stall report carries only the facts you decide on. The Advisor judges and you decide. For each judgment, adopt it, reject it with the evidence that answers it, or bring it to the owner when it is a tradeoff only the owner can make. Record the disposition and its reason in the trace. Before you adopt a judgment your decision rests on, open the anchor it names as checked.

"The Advisor agreed" never stands in for a review result, an acceptance, a Verifier observation or your own read of the anchors.

When it reports a stall, read the cause it observed and what it did. An action outside its grant gets a correction; a move it proposed is yours to decide and record like a judgment.

**Case:** the Lead sends the Advisor two paragraphs describing a plan and a list of three points to check. The Advisor checks the three and agrees. The Lead writes "Advisor approved" in the trace and skips the spec review. The plan also changed a stored format that neither the paragraphs nor the list mentioned, so nobody independent ever looked at it. **Clean case:** the Lead sends the plan and spec paths, the branch head, the trace and the owner's goal, with one question about the retry budget. The Advisor answers the question, then picks the format change itself, because stored data is expensive if wrong. Its message says what it opened, that records written before the change can't be read after it, a smaller alternative, and that retry edge cases the owner's goal doesn't need stay out. The Lead adopts the alternative, records why, and the spec review still runs.

## What it doesn't carry

Send your messages to other agents yourself and read theirs yourself. Don't route another agent's message through the Advisor, and don't ask it for status, whether for the owner's sitrep or your own. A relayed message reaches you a turn later with no judgment added, and leaves unclear whose reading of it you are acting on. Status comes from your trace and the helpers' handbacks. When a message from the Advisor holds only status, custody notes or another agent's words, with nothing about what they change for your decision, there is nothing to dispose of. Tell it once that you need its judgment of what the message means for your decision, and record the correction.

**Case:** on 2026-10-16 an Advisor message opened by carrying an owner direction relayed through another Advisor, and only then gave its own work: it had read the eval harness, found that a prompt announcing a pressure test can't show whether an agent picks the skill unprompted, and recommended bounded cases with controls. **Clean case:** the Lead records a disposition for that finding and its recommendation. It takes the owner's direction only from the owner's own words, because a relayed direction tells it where to look and decides nothing.

## When to stop

Stop when every judgment and proposed move has a disposition with its reason, or sits in front of the owner as a decision. Don't run another round only to reach agreement.
