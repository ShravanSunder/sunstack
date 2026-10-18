# Owner-decision brief

Use this when a skill needs the owner to decide something about design: domain boundaries, storage boundaries (what is stored, where, who owns it, what it means), architecture, contracts between parts, product behavior, the shape of the design itself (how it decomposes and which abstractions carry weight), or a correction that would change any of them. Procedure (sequencing, PR grouping, agent or model choice, review rounds, work home) is decided and recorded, never briefed.

Return one brief per decision, in this order:

1. **The decision in one sentence**, in the owner's words where possible.
2. **Why it is genuinely open**: the evidence and standing owner instructions you checked, and why none of them settles it.
3. **The current model, drawn.** Load `presentation-tui` or `presentation-webui` for the host and draw what exists today: the parts, who owns what, and the path that matters.
4. **Two or three concrete options, each drawn as a change to that picture**, with what it gains, what it costs, and who bears the cost.
5. **Where the agents stand**: for each agent that weighed in (Lead, Advisor, reviewers), its position, where it agrees and disagrees with the others, and why.
6. **Your recommendation and why.**
7. **What happens if the owner defers**: what stays blocked and what continues.

Good briefs look like the ones owners accept quickly: one picture of today, one picture per option, a clear pick. Bad briefs are option menus with a preselected answer, a bare request to confirm a choice already made, several unrelated decisions bundled into one prompt, and internal jargon the owner has not used.

The recipient depends on who raised the decision. When the owner asked you the question directly in this conversation, the brief answers the owner here, whoever opened the session and even when the Lead commissioned you as a helper. Answering grants no wider scope, implementation or merge authority. A decision you raise yourself from your own work, a phase stop such as `decision-needed` included, goes to the Chief of Staff role, never directly to the owner. Take the Chief of Staff from the commission, the work thread, or the session's standing instructions. When none of them names one, return the brief to your commissioner with the exact recipient gap. When that commissioner is the owner, keep the brief unsent: hold it in the work's artifact or trace for the Chief of Staff, and reply with only the recipient gap and where the brief is held, never its options or recommendation. The gap is not leave to brief the owner.

A question tool may ask only the brief's recipient for the final pick, and only after the brief is on that recipient's screen. Ask once. Later updates point back to the open brief in one line instead of asking again.

Complete when the owner can decide from the brief alone, without opening a file.
