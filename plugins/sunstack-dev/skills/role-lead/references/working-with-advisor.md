# Working with the Advisor

This is your side of working with an Advisor. You commission one only when the owner asks, through `practices-manage-agents`. The owner can also open an Advisor directly; then the owner is its commissioner, and you answer the challenges that reach you. Return the files and anchors the Advisor had, the unblock grant you gave it when you commissioned it, and your decision on each challenge it raised and each move it proposed.

## Starting or answering it

When you commission it, send the owner's question, the current files and the anchors you want challenged. A summary lets it challenge your summary. The files let it challenge the design, including the parts your summary left out. Ask for the competing picture and its tradeoffs. Leave out any request to sign off, because its agreement can't be a sign-off.

Give it the unblocking job in the same commission. Read or write access tells the Advisor what it may touch, not which sessions it may wake, so an Advisor commissioned with access alone can watch your work stall and do nothing about it. The packet's `unblockGrant` carries the rest. Fill it from the work as it stands:

- `resumableSessions`: the exact address of every helper session the work can stall on. When you start a helper later, send the Advisor an updated grant that adds it.
- `helperStarts`: `bounded-collection` when an Operator or a Researcher Worker could fetch a missing input or evidence without you; otherwise `none`.
- `whenLeadUnreachable`: what it does when you don't answer, in words it can act on, such as "post the stall on the work thread, keep resuming the listed sessions, and message the owner once if the review is still stopped by morning." The owner hears from you by default, so say whether the Advisor may reach the owner.

**Case:** overnight on 2026-10-15, the Advisor's commission granted access and said nothing about stalls. The master reviewer's session wasn't loaded, two of the Lead's messages never started a turn, and the Advisor's wakes reported "No implementation/investigation/proof resumed by Advisor" for hours. **Clean case:** the commission lists the reviewer's session in `resumableSessions`, so the first wake that finds it unloaded resumes it with the Lead's messages and reports the cause.

When the owner opened it, answer its challenges with the files and anchors it asks for. Its question is the owner's, so leave it as the owner framed it.

## Reading what comes back

The Advisor challenges and you decide. For each challenge, adopt it, reject it with the evidence that answers it, or bring it to the owner when it is a tradeoff only the owner can make. Record the decision and its reason in the trace.

"The Advisor agreed" never stands in for a review result, an acceptance, a Verifier observation or your own read of the anchors.

When it reports a stall, read the cause it observed and what it did. An action outside its grant gets a correction; a move it proposed is yours to decide and record like a challenge.

**Case:** the Lead sends the Advisor two paragraphs describing a plan and asks whether it looks right. The Advisor agrees. The Lead writes "Advisor approved" in the trace and skips the spec review. The plan also changed a stored format that the two paragraphs never mentioned, so nobody independent ever looked at it. **Clean case:** the Lead sends the plan file and points at the storage section as the part it is least sure of. The Advisor challenges the format change with a smaller alternative. The Lead decides, records why, and the spec review still runs.

## When to stop

Stop when every challenge and proposed move has a decision with its reason, or sits in front of the owner as a decision. Don't run another round only to reach agreement.
