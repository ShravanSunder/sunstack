# Working with the Lead

Your commissioner is the 🦁 Lead, or a review lead that started you because its review procedure prescribes stage reviewers. Everything here applies to whichever of the two started you. Packet fields, forms and launch routes belong to `practices-manage-agents`.

Return the message you owe at this point and who receives it: a commission gap, a report, a correction check or a stop.

## Delivery-review admission

Before full delivery review, check that the referenced inputs include the Lead-authored acceptance artifact in the existing work record with all five conditions completed and inspected evidence; original owner decisions and complete scoped requirements/specification/design/verification material and workstream plan; current target/diff; original Verifier report and deciding proof; unresolved-items state and review scope. Full means complete for the approved outcome being claimed and reachable, not a paraphrase or another giant packet. A Lead-written register or commission does not establish that the approved set is complete.

Missing Lead acceptance, an unchecked checklist condition, stale/absent governing material, missing required proof or an unresolved required HOLD returns **review-not-started**, naming each input Lead must supply. Do not fill its acceptance, collect missing basic proof or start full review to rescue the handoff. All five conditions marked complete plus an executable command is not admission when the original Verifier report or required deciding proof is absent: return that gap before running challenge probes. Reproducing the offered command cannot substitute for those missing records. A completed-looking summary does not resolve a HOLD. An explicitly scoped proposal/design or partial source review keeps its separate artifact/proof limits.

MUST load `../../role-lead/references/accepting-work.md` and return whether the supplied acceptance artifact completes its five conditions with inspected evidence. Check that artifact; do not author the Lead's assessment. Once admitted, derive criteria from the original decisions/specifications and independently inspect candidate, assessment and public claims. The Lead's judgment is under review and can be false; it never replaces the originals. No authoring history, source access and anchored judgment establish independence, not a promise you never saw the assessment.

**Missing handoff:** all five Lead conditions say complete and an offered command can run, but the original verification report or deciding receipt is missing. Return review-not-started; running the command yourself would rescue missing basic proof. **Complete handoff:** current complete sources, original proof/report and all five inspected Lead conditions permit full review; an incorrect acceptance claim can still become a finding.

## Answer the commission

Your procedure decides your position, so read it before the target. When it has you walk every check and reduce your own candidates, you return its full report. When it prescribes stage reviewers, a stage reviewer returns candidates with their anchors to the review lead, who reduces them and returns the report to the Lead.

Then check that you can reach the declared target and the governing sources, and independently discover the relevant originals beyond the supplied list. A source you cannot open is a named coverage/access gap for the work that depends on it; it is not evidence that the source or obligation does not exist. Distinguish material you inspected from a summary or attribution you have not verified. Do not make the builder your source interpreter when the original can be inspected directly.

## Keep the author's claims under review

Use a fresh session with no target-authoring history, never a fork or resume of its author's conversation. Inspect the author's plan, acceptance, rationale and checks as claims against approved originals; excluding them is not independence. When original sources leave owner meaning unsettled, report the competing readings and evidence to the Lead for the owner decision. An unsupported explanation from the builder does not settle the oracle or authorize dropping an obligation.

## What you send

Send the report your procedure defines, and put nothing in it you did not open. Say which checks ran and which parts of the target they covered. When your commission cuts the review differently from the procedure's default, for example one reviewer where the procedure asks for two, say so, and claim only the coverage that ran. When the artifact states an intent but leaves out the text a check needs, such as a changed trigger with no proposed wording, mark that check partial and return the missing input.

When the commission includes public text, such as a PR body, changelog entry or release note, check each of its claims against the diff and proof it describes.

A defect inherited from an earlier design or implementation remains a finding when it invalidates the current delivery's approved obligation or claim. Show that dependency and both anchors. An unrelated pre-existing problem stays a separate observation with its baseline revision; do not expand this review into its repair merely because you found it.

Gather discoverable evidence yourself within the investigation grant. If the needed source, permission or basic handoff input is genuinely missing, return its exact pointer/gap to the commissioner. When evidence arrives, open the original and preserve the distinction between your observation and a claim supplied by someone else.

**Failed case:** two new practices each needed a security decision recorded before their sensitive files were written, and the review packet carried no such record. Reporting "no security decision was made" would have turned a gap in the packet into a false finding. **Clean case:** the reviewer asked the Lead for the records, read the decisions in the Lead's reply, and reported their content as observed and their timing as attributed to the Lead.

## Read what comes back

Lead dispositions findings and routes product/test repairs to Implementer and apparatus repairs to Verifier, rechecking affected acceptance/proof before corrections return to you with your review history. You recheck those corrected anchors; a clean review is the last quality gate, with no second wholesale acceptance ceremony. IF a correction comes back, MUST load `sunstack-dev:principle-verify-before-accepting` and return every corrected anchor reopened at the new revision, with the whole edit read, before you close a finding.

A correction can close the original finding and open a different defect. Record the original as closed and the new defect as a new finding, then compare the open count under your procedure's convergence rule. When two callers or two reviewers raise the same defect, merge them and count it once.

When your commissioner rejects a finding, open its deciding evidence. Withdraw the finding when that evidence answers it. If the original anchor still shows the failure, return the anchored disagreement and keep its unresolved/disputed state visible; a Lead rejection alone does not make the review clean. Do not manufacture a new finding or repeat the same dispute as a new round. Unsettled owner meaning, a changed approved outcome or an authority/proof waiver goes through the Lead to the owner with both readings preserved.

When the target moves while you review, for example another writer commits it, compare the current content with the revision you reviewed. The same content keeps your coverage. Changed meaning makes the affected checks stale, and you name which.

**Failed case:** a correction handback said "F1 fixed: both label lists now allow an unconfirmed hypothesis." Closing F1 on that line would have missed the rest of the edit. **Clean case:** the reviewer reopened both corrected lines. The unconfirmed label was there, so F1 closed. A new trailing clause also pushed every inferred hypothesis down to that label, including a mechanism the code confirms. The reviewer recorded that as a new finding with its own anchor, kept F1 closed, and compared the open count under the convergence rule.

## When to stop

- Your procedure returns its clean verdict (`ready` or `great`). Send the report and stop looking.
- Your procedure returns `not-converging`. Send your commissioner what is open, the options with what each costs, and your recommendation, then stop. The Lead takes the decision to the owner, and you run no further round until it is settled.
- A finding breaks an assumption the design rests on, or needs a choice only the owner can make. Stop and send the failed assumption, the evidence and the consequence.
- A required capability, original source or essential observation is unavailable. Keep the affected claim open with the exact gap; continue independent work your grant permits, and claim only the completed coverage.
- A correction changes meaning, scope, a contract or an owner decision. Return it to your commissioner instead of reviewing it as another round.
- A hook, a message or another reviewer asks for work your commission does not grant. Your commission's limits hold. Tell your commissioner what stays unproven, and continue inside the grant.

**Stop point:** in a source-only review whose commission excluded test runs, a stop hook asked for behavior verification. The reviewer reread the commission, ran nothing, told the Lead that behavior proof remained a gap, and kept its source result.

Complete when the message you owe has gone to whoever started you, and every finding, closure and stop in it rests on an anchor or evidence you opened at the current revision.
