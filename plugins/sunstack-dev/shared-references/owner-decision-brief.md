# Owner-decision brief

Use this when a skill needs the owner to decide something about design: domain boundaries, storage boundaries (what is stored, where, who owns it, what it means), architecture, contracts between parts, product behavior, the shape of the design itself (how it decomposes and which abstractions carry weight), or a correction that would change any of them. Use it too for a proposal to split one deliverable into several PRs, or to change an agreed PR shape. Procedure (sequencing, grouping and order inside an agreed PR shape, agent or model choice, review rounds, work home) is decided and recorded, never briefed.

Return one brief per decision, in this order:

1. **The decision in one sentence**, in the owner's words where possible.
2. **Why it is genuinely open**: the evidence and standing owner instructions you checked, and why none of them settles it.
3. **The current model, drawn.** Load `presentation-tui` or `presentation-webui` for the host and draw what exists today: the parts, who owns what, and the path that matters.<!-- M001 -->
4. **Two or three concrete options, each drawn as a change to that picture**, with what it gains, what it costs, and who bears the cost.
5. **Where the agents stand**: for each agent that weighed in (Lead, Advisor, reviewers), its position, where it agrees and disagrees with the others, and why.
6. **Your recommendation and why.**
7. **What happens if the owner defers**: what stays blocked and what continues.

Good briefs look like the ones owners accept quickly: one picture of today, one picture per option, a clear pick. Bad briefs are option menus with a preselected answer, a bare request to confirm a choice already made, several unrelated decisions bundled into one prompt, and internal jargon the owner has not used.

Who gets the brief depends on who raised the decision. When the owner asked you directly, answer the owner here, even as a helper; answering grants no wider scope, implementation or merge authority.

For a decision you raise yourself, check authority first. A choice on a line the owner owns, or outside your assignment's authority, goes up the chain even if it can be undone. Inside your authority, a two-way door is yours: make it, record it and its reason in the trace, and keep going. A one-way door goes up the chain.

Up the chain means the full brief, a `decision-needed` stop included, to whoever commissioned you. The Lead briefs the owner. A helper briefs its commissioner; a helper the owner assigned briefs the work's Lead, or briefs the owner, saying why, when the commission and the work's thread name no Lead or delivery to the Lead definitively failed (`rejected` or `notSubmitted`, and no next action delivers it). A denied or unfinished lookup isn't an absent Lead: follow the access or discovery path. A held, queued, unanswered or uncertain message is pending: keep the brief in the work's record, reconcile the delivery, hold the work that depends on it and continue the rest. A commissioner passes the brief on with its options and recommendation intact, or settles it only within its own authority; only the owner decides an owner decision.

A PR-shape decision goes to the owner: at plan review for a first plan, and through the plan update's owner stop during delivery. While the owner is away, the decision stays pending in the work's record, and work that doesn't depend on it continues.

A question tool may ask only the owner for the final pick of an owner decision, and only after the full brief is on the owner's screen. Ask once. Later updates point back to the open brief in one line instead of asking again.

Complete when the owner can decide from the brief alone, without opening a file.
