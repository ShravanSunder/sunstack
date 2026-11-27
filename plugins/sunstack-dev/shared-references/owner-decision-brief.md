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

The recipient depends on who raised the decision. When the owner asked you the question directly in this conversation, the brief answers the owner here, whoever opened the session and even when the Lead commissioned you as a helper. Answering grants no wider scope, implementation or merge authority. For a decision you raise yourself from your own work, check authority first: a choice on a line the owner owns, or outside the authority your assignment gives you, goes up the chain however reversible it is. Inside that authority, sort it by whether it can be undone. A two-way door is yours: make it, record the decision and its reason in the trace, and keep going. A one-way door goes up the chain. Up the chain, a phase stop such as `decision-needed` included, means the full brief to whoever commissioned your assignment. The Lead briefs the owner. A helper returns the brief to the agent that commissioned it; a helper the owner assigned directly returns it to the work's Lead, or briefs the owner when the commission and the work's thread, once read, name no Lead, or delivery to the named Lead has definitively failed (its receipt says `rejected` or `notSubmitted` and the next action it names can't deliver it), and says which. A Lead lookup that was denied or didn't finish is not an absent Lead: follow the access or discovery path. A message to the Lead that is held, queued, delivered without a reply yet, or uncertain is still pending: keep the brief in the work's record, reconcile the delivery, hold the work that depends on it and continue the rest. An agent commissioner carries the brief toward the owner with its options and recommendation intact, or settles it only when the choice is within its own authority. The owner decides an owner decision; an agent that passes it on never decides it.

A PR-shape decision goes to the owner: at plan review for a first plan, and through the plan update's owner stop during delivery. While the owner is away, the decision stays pending in the work's record, and work that doesn't depend on it continues.

A question tool may ask only the owner for the final pick of an owner decision, and only after the full brief is on the owner's screen. Ask once. Later updates point back to the open brief in one line instead of asking again.

Complete when the owner can decide from the brief alone, without opening a file.
