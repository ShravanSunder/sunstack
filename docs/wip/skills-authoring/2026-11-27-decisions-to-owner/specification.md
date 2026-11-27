# Specification

## What the change must do

1. `owner-decision-brief.md:17`: a decision you raise yourself is checked for authority first: a choice on a line the owner owns, or outside your delegated authority, goes up the chain however reversible it is. Inside your authority it is sorted by whether it can be undone. A two-way door is yours: decide, record it and its reason in the trace, keep going. A one-way door goes up the chain as the full brief: the Lead briefs the owner; an agent-commissioned helper briefs its commissioner; an owner-assigned helper (such as an Advisor the owner opened) checks the commission and the work's thread and briefs the work's Lead, and briefs the owner, giving the reason, only when neither names a Lead or the Lead's delivery receipt says `rejected` or `notSubmitted` with no next action that can deliver it. A denied or unfinished lookup follows the access or discovery path; a held, queued, delivered-without-a-reply or uncertain message is still pending (owner's ruling, 27 Nov; Router's delivery outcomes, `agent-collaboration` SKILL.md). That commissioner (the Lead, or a review lead that commissioned a stage check) carries it toward the owner unchanged, or settles it only when the choice is within its own authority; an owner decision is decided by the owner, never by an intermediary. The Chief of Staff route, the recipient-gap fallback and "keep the brief unsent" go.
2. `owner-decision-brief.md:19`: drop "When the owner is away, it goes to the Chief of Staff"; while the owner is away, the split stays pending in the work's record and work that doesn't depend on it continues.
3. `owner-decision-brief.md:21`: the question tool asks the owner for the final pick of an owner decision, after the full brief is on the owner's screen.
4. `practices-show-me-your-work/references/stop-treatments.md` treatments 1 and 2 and "Bring an owner choice" (lines 24, 34, 78): the choice goes to the recipient the brief procedure names, instead of "to the owner in the current conversation"; the treatments don't restate the route.
5. `design-program/SKILL.md:70`: `IF returning decision-needed, load …owner-decision-brief.md and return the brief for the recipient that reference names`, the same literal form `design-specification/SKILL.md:99` uses.
6. `domain-code-standards`: one conditional load covers every standards case that needs the owner (missing section or line, a choice neither the repository's standards nor its practice settles, a conflicting clause, a linked skill that can't load) and delivers the brief to the recipient the reference names, holding dependent choices; the table and bullets no longer repeat "ask the owner"; the return reports the governing set or the brief's recipient and delivery state, and the completion line requires the brief to have reached its recipient.

## Standards stated

- S1. A one-way door an agent raises itself goes, as the full brief, to its commissioner: the Lead briefs the owner; a helper returns it to the agent that commissioned it; a helper the owner assigned directly returns it to the work's Lead, and briefs the owner, giving the reason, only when neither the commission nor the work's thread names a Lead, or the Lead's delivery receipt says `rejected` or `notSubmitted` with no next action that can deliver it; a denied or unfinished lookup follows the access or discovery path, and a held, queued, delivered-without-a-reply or uncertain message stays pending.
- S2. A commissioner that is not the owner passes an owner decision on with its options and recommendation intact, or settles it only within its own authority; the owner decides owner decisions.
- S3. When the owner asked the question directly, the brief answers the owner in that conversation (unchanged).
- S4. While the owner is away, an owner decision stays pending and work that doesn't depend on it continues.
- S5. Authority is checked first: a self-raised choice on a line the owner owns, or outside the agent's delegated authority, goes up the chain however reversible. Inside that authority, a two-way door is the agent's own call: it decides, records the decision and its reason in the trace, and keeps going; a one-way door goes up the chain.

## Transfer tests

**S1.**
- Case one: a solo developer's toolkit with one Lead session and helper subagents; a helper hits an open schema choice and returns the full brief to the Lead, which briefs the developer. Holds. An Advisor the developer opened to inspect one issue finds a separate storage question it raised itself: it returns the brief to the Lead; only if the developer asks it about that question does it answer the developer directly (S3). Holds.
- Case one, no Lead: an Advisor the developer opened finds a one-way storage question; neither its commission nor the work's thread names a Lead. It briefs the developer with the full options and recommendation. Holds. Its thread names a Lead, and the delivery receipt says `rejected` with no next action that can deliver it: it briefs the developer and says delivery to the Lead failed. Holds. Its Lead lookup was denied: that is not an absent Lead, so it follows the access path. Holds. Its message to the Lead is held or queued, or delivered with no reply yet, or its outcome is uncertain: the brief stays pending in the work's record, the helper reconciles the delivery through the existing waiting path and continues independent work. Holds.
- Case two: a helper that posts its brief straight to a team channel, skipping its commissioner; or an owner-assigned helper that briefs the owner directly while the work's Lead is reachable, or treats a Lead's silence as unreachability. Rejected. Holds.
- Verdict: passes.

**S2.**
- Case one: a stage checker returns a storage-boundary question to its review lead; the review lead forwards the full brief to the Lead, which briefs the owner. Holds.
- Case two: the review lead picks the storage option itself, or forwards only "a decision is needed". Rejected. Holds.
- Verdict: passes.

**S3.**
- Case one: the owner asks a helper "which store should we use?" in the helper's own session; the helper answers there with the full brief. Holds.
- Case two: the helper answers only "I've sent this to the Lead". Rejected. Holds.
- Verdict: passes.

**S4.**
- Case one: a PR-split question comes up while the owner is away; the split stays pending in the plan record while an unrelated authorized check keeps running. Holds.
- Case two: the agent splits the PR itself, or halts all work. Rejected. Holds.
- Verdict: passes.

**S5.**
- Case one: a helper in a data pipeline picks a name for a test fixture, or the order of two independent checks, inside its assigned component; it decides, writes the choice and reason in the trace, and continues. Holds. The same helper wants a reversible, rollbackable change to a public contract the owner reserved: authority comes first, so it takes the owner-decision route. Holds. A helper in a mobile app chooses a local cache layout it can rebuild; same. Holds.
- Case two: a helper changes a stored data format or a public API without asking (one-way, decided alone); or brings the owner a brief about a test fixture name (two-way, escalated). Rejected. Holds.
- Verdict: passes.

## New text

`owner-decision-brief.md:17` (tightened at the owner's request after implementation review 4; same conditions, three paragraphs):

> When the owner asked you directly, answer the owner here, even as a helper; answering grants no wider scope, implementation or merge authority.
>
> For a decision you raise yourself, check authority first. A choice on a line the owner owns, or outside your assignment's authority, goes up the chain even if it can be undone. Inside your authority, a two-way door is yours: make it, record it and its reason in the trace, and keep going. A one-way door goes up the chain.
>
> Send the full brief up the chain, including for `decision-needed`. The Lead briefs the owner. An agent-commissioned helper briefs its commissioner. An owner-assigned helper checks the commission and the work's thread, then briefs the work's Lead. That helper briefs the owner and gives the reason only when neither source names a Lead, or when the Lead's delivery receipt says `rejected` or `notSubmitted` and no next action it names can deliver the brief. A denied or unfinished lookup isn't an absent Lead: follow the access or discovery path. A held, queued, delivered-without-a-reply or uncertain message is pending: keep the brief in the work's record, reconcile the delivery, hold the work that depends on it and continue the rest. A commissioner passes the brief on with its options and recommendation intact, or settles it only within its own authority; only the owner decides an owner decision.

`owner-decision-brief.md:19`:

> A PR-shape decision goes to the owner: at plan review for a first plan, and through the plan update's owner stop during delivery. While the owner is away, the decision stays pending in the work's record, and work that doesn't depend on it continues.

`owner-decision-brief.md:21` (first sentence):

> A question tool may ask only the owner for the final pick of an owner decision, and only after the full brief is on the owner's screen.

`stop-treatments.md` treatments 1 and 2 ("Now:"), replacing "bring the owner the choice in the current conversation using the brief procedure below":

> bring the choice to the recipient the brief procedure below names

Implementation review I2 and I3 (treatments 1 and 2): `next:` names who acts next on the brief (the agent until it's delivered, then its recipient) instead of always `next:owner`; owner-requested tightening, same meaning; treatment 1's "When" says "settles it", and its exemption covers only a choice authority already settles by naming the action, not authority over the area of work.

`stop-treatments.md:78`:

> IF treatment 1 or 2 needs an owner choice, load `../../../shared-references/owner-decision-brief.md` and deliver the full brief to the recipient it names. Render HTML only on an explicit owner request for a page.

`design-program/SKILL.md:70` (the sentence):

> Return the decision owner and falsifiers. IF returning `decision-needed`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief for the recipient that reference names. (Its route line becomes `decision-needed -> stop with its brief`.)

`domain-code-standards` (after implementation review 4: one escalation step): the table keeps the two rows that select a set, without "ask the owner"; the conflicting-clause and unavailable-skill bullets fold into one call, which replaces the earlier IF paragraph and return:

> IF the Standards section or its governing line is missing, neither the repository's standards nor its practice settles a choice, a clause conflicts with the selected set, or a linked standards skill cannot load, load `../../shared-references/owner-decision-brief.md` and deliver the brief to its named recipient. Name any linked skill that could not load in the brief, rather than rebuilding it from memory. Hold every dependent choice until the owner decides.
>
> Return the governing set and quote the line that selects it, or report the brief's recipient and delivery state.

`domain-code-standards/SKILL.md:73` (completion):

> The governing set is named from the line, or the brief for the owner's standards decision has reached its recipient and the choices that depend on it are held. Under the owner's set, …
