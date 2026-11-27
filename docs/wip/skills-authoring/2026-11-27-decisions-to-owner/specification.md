# Specification

## What the change must do

1. `owner-decision-brief.md:17`: a decision you raise yourself is checked for authority first: a choice on a line the owner owns, or outside your delegated authority, goes up the chain however reversible it is. Inside your authority it is sorted by whether it can be undone. A two-way door is yours: decide, record it and its reason in the trace, keep going. A one-way door goes as the full brief to whoever commissioned you: the Lead briefs the owner; a helper returns it to the agent that commissioned it; a helper the owner assigned directly (such as an Advisor the owner opened) returns it to the work's Lead, or briefs the owner when its Lead can't be reached: no Lead is named in the commission or on the work's thread, or delivery to the named Lead failed (rejected or not submitted). A queued, delivered-but-unanswered or uncertain message is still pending, not unreachable (owner's ruling, 27 Nov; Router's delivery outcomes, `agent-collaboration` SKILL.md). That commissioner (the Lead, or a review lead that commissioned a stage check) carries it toward the owner unchanged, or settles it only when the choice is within its own authority; an owner decision is decided by the owner, never by an intermediary. The Chief of Staff route, the recipient-gap fallback and "keep the brief unsent" go.
2. `owner-decision-brief.md:19`: drop "When the owner is away, it goes to the Chief of Staff"; while the owner is away, the split stays pending in the work's record and work that doesn't depend on it continues.
3. `owner-decision-brief.md:21`: the question tool asks the owner for the final pick of an owner decision, after the full brief is on the owner's screen.
4. `practices-show-me-your-work/references/stop-treatments.md` treatments 1 and 2 and "Bring an owner choice" (lines 24, 34, 78): the choice goes to the recipient the brief procedure names, instead of "to the owner in the current conversation"; the treatments don't restate the route.
5. `design-program/SKILL.md:70`: `IF returning decision-needed, load …owner-decision-brief.md and return the brief for the recipient that reference names`, the same literal form `design-specification/SKILL.md:99` uses.
6. `domain-code-standards`: line 21 says "ask the owner before the first such choice"; one conditional load after the table covers every standards case that needs the owner (no standards line, a choice neither set settles, a conflicting clause, an unlinked or unavailable standards skill): `IF a standards choice needs the owner, load ../../shared-references/owner-decision-brief.md and return the brief for the recipient it names, holding every standards-dependent choice until the owner answers`; the completion line says the governing set is named, or the brief for the owner's decision has reached its recipient.

## Standards stated

- S1. A one-way door an agent raises itself goes, as the full brief, to its commissioner: the Lead briefs the owner; a helper returns it to the agent that commissioned it; a helper the owner assigned directly returns it to the work's Lead, or briefs the owner when the work has no Lead or delivery to its Lead failed, and says which; a queued, delivered-but-unanswered or uncertain message stays pending.
- S2. A commissioner that is not the owner passes an owner decision on with its options and recommendation intact, or settles it only within its own authority; the owner decides owner decisions.
- S3. When the owner asked the question directly, the brief answers the owner in that conversation (unchanged).
- S4. While the owner is away, an owner decision stays pending and work that doesn't depend on it continues.
- S5. Authority is checked first: a self-raised choice on a line the owner owns, or outside the agent's delegated authority, goes up the chain however reversible. Inside that authority, a two-way door is the agent's own call: it decides, records the decision and its reason in the trace, and keeps going; a one-way door goes up the chain.

## Transfer tests

**S1.**
- Case one: a solo developer's toolkit with one Lead session and helper subagents; a helper hits an open schema choice and returns the full brief to the Lead, which briefs the developer. Holds. An Advisor the developer opened to inspect one issue finds a separate storage question it raised itself: it returns the brief to the Lead; only if the developer asks it about that question does it answer the developer directly (S3). Holds.
- Case one, no Lead: an Advisor the developer opened finds a one-way storage question; the work's thread has no Lead. It briefs the developer with the full options and recommendation. Holds. Its thread names a Lead, and delivery to it is rejected: it briefs the developer and says delivery to the Lead failed. Holds. Its message to the Lead is queued, or delivered with no reply yet, or its outcome is uncertain: the brief stays pending in the work's record, the helper reconciles the delivery through the existing waiting path and continues independent work. Holds.
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

`owner-decision-brief.md:17`:

> The recipient depends on who raised the decision. When the owner asked you the question directly in this conversation, the brief answers the owner here, whoever opened the session and even when the Lead commissioned you as a helper. Answering grants no wider scope, implementation or merge authority. For a decision you raise yourself from your own work, check authority first: a choice on a line the owner owns, or outside the authority your assignment gives you, goes up the chain however reversible it is. Inside that authority, sort it by whether it can be undone. A two-way door is yours: make it, record the decision and its reason in the trace, and keep going. A one-way door goes up the chain. Up the chain, a phase stop such as `decision-needed` included, means the full brief to whoever commissioned your assignment. The Lead briefs the owner. A helper returns the brief to the agent that commissioned it; a helper the owner assigned directly returns it to the work's Lead, or briefs the owner when the commission and the work's thread, once read, name no Lead, or delivery to the named Lead has definitively failed (its receipt says `rejected` or `notSubmitted` and the next action it names can't deliver it), and says which. A Lead lookup that was denied or didn't finish is not an absent Lead: follow the access or discovery path. A message to the Lead that is held, queued, delivered without a reply yet, or uncertain is still pending: keep the brief in the work's record, reconcile the delivery, hold the work that depends on it and continue the rest. An agent commissioner carries the brief toward the owner with its options and recommendation intact, or settles it only when the choice is within its own authority. The owner decides an owner decision; an agent that passes it on never decides it.

`owner-decision-brief.md:19`:

> A PR-shape decision goes to the owner: at plan review for a first plan, and through the plan update's owner stop during delivery. While the owner is away, the decision stays pending in the work's record, and work that doesn't depend on it continues.

`owner-decision-brief.md:21` (first sentence):

> A question tool may ask only the owner for the final pick of an owner decision, and only after the full brief is on the owner's screen.

`stop-treatments.md` treatments 1 and 2 ("Now:"), replacing "bring the owner the choice in the current conversation using the brief procedure below":

> bring the choice to the recipient the brief procedure below names

Implementation review I2 and I3 (treatments 1 and 2): `next:` names whoever owes the next action on the brief (the agent itself while delivery is still its to make or reconcile, `next:lead` once delivered to the Lead, `next:owner` once the owner has it) instead of always `next:owner`; treatment 1's "When" says "settles it", and its exemption covers only a choice authority already settles by naming the action, not authority over the area of work.

`stop-treatments.md:78`:

> IF treatment 1 or 2 needs an owner choice, load `../../../shared-references/owner-decision-brief.md` and return the options, consequences, recommendation and dependent work, delivered to the recipient that reference names. The brief does not require an HTML page; only an explicit owner page request permits rendering.

`design-program/SKILL.md:70` (the sentence):

> Return the decision owner and falsifiers, and IF returning `decision-needed`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief for the recipient that reference names.

`domain-code-standards/SKILL.md:21` (the cell):

> ask the owner before the first such choice

After the table's bullets (after line 30), a new paragraph:

> IF a standards choice needs the owner (no Standards line, a choice neither the repository's standards nor its practice settles, a clause that conflicts with the set, or a linked standards skill that can't be loaded), load `../../shared-references/owner-decision-brief.md` and return the brief for the recipient that reference names; hold every choice that depends on the answer until the owner decides.

`domain-code-standards/SKILL.md:73` (completion):

> The governing set is named from the line, or the brief for the owner's standards decision has reached its recipient and the choices that depend on it are held. Under the owner's set, …
