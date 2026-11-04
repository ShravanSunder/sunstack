# Specification: show-me-your-work

Each line is one obligation or standard. "The record" is a piece of work's rows in its Router project's work trail. "An entry" is one row.

## What the skill must do

1. A qualifying task's record lives in its Router project's work trail, one row per entry, appended as the work happens; thread posts carry conversation and checkpoint notices only.
2. Every entry is one of seven kinds: action (what happened), decision, assumption, design change, proof, Lead acceptance, or owner ask.
3. Every entry names who did, decided or assumed it: the owner, the Lead or a Sidekick.
4. Every decision entry names the authority it rests on: the owner's words quoted with where he said them, an existing contract, or the agent's own call.
5. Every entry names the part of the design or plan it belongs to (a requirement, a design element, a plan slice) by that part's identifier, or says it belongs to none.
6. Each agent writes its own entries as it works; a Sidekick doesn't wait for the Lead to relay them.
7. An assumption is recorded when it is made, and the work goes on unless the stop list says otherwise.
8. A storage, ownership, public-contract or new-technology choice is never recorded as the agent's own call: it is recorded as an assumption waiting for the owner, and the work that depends on it stops.
9. A correction, resolution or replacement is a new entry whose first link is the entry it closes; an entry is never edited, and no other link closes, accepts or confirms anything.
10. The Lead accepts finished work with a Lead acceptance entry that names the commit, each check it read with its result, and what stays unverified.
11. A decision reaches the owner's view when it changes or fills in the design or the plan; every other entry stays in the Lead's view.
12. The owner sees one live HTML page per piece of work, built only from the record: the design or plan, part by part, with what happened, what was decided, assumed and changed, and what is proven beside each part; what waits for him; and closed entries kept as history.
13. The page is rebuilt from the record at every checkpoint, and says which record position it shows.
14. A choice the owner must make reaches him on its own decision page through `owner-decision-brief`, which the live page links to; his answer is recorded as a decision entry that quotes his words and closes what it answers.
15. Silence, "not marked wrong", a review verdict or a selection made while the owner asks what it means never becomes the owner's decision.
16. The Lead keeps the owner's asks as owner-ask entries, each with its state (open, done with its evidence, deferred with its reason and follow-up owner), and compares them at resume, at each handback and before calling work done.
17. Every stop ends with a checkpoint: the outcome, remaining work or blockers, open stand-ins, the owner-asks comparison, the next action, and the page rebuilt.
18. When the work has no Router project yet, entries go in the same shape to a memory-logs file for the work, and are written to the work trail once a project exists.
19. These obligations hold the same way during design from start to ready, during planning, and during implementation.

## The stop list

20. An entry stops the work that depends on it in one of six ways, and only these:
    - **One-way door:** new stored data or a new owner of data, a public capability or contract, new technology, or scope the owner hasn't settled. Stop the dependent work and bring the owner the choice.
    - **An unsettled behavior choice** (a user-visible behavior or a removal): keep today's behavior, hold just that piece, keep the other work moving, and ask.
    - **Agreed proof or meaning:** never weaken containment, replace a test's expected result or drop agreed proof to keep going; keep it until it is settled.
    - **A second look:** a technical doubt or broken premise that can be checked against the design without choosing a new outcome goes to the Advisor or another agent; if it fits, continue and record it; if it turns up a real tradeoff, it becomes one of the first two.
    - **A two-way door:** reversible choices inside existing authority are decided, recorded and continued past.
    - **Authority unclear:** find the actual instruction or contract first; missing evidence is neither permission nor guilt; keep doing independent work.

## Standards the skill states

- S1. An entry is written by the agent that has the fact, at the moment it has it.
- S2. A decision's authority is named from its source, never inferred from a plan, a review or a page the agent wrote.
- S3. The page shows only what the record holds; it never holds a fact the record doesn't.
- S4. A stop is decided by what the choice changes and who already has authority over it, not by how alarming its subject sounds.

## Rules with their transfer cases

| Rule | Case one: should hold elsewhere | Case two: a bad choice it never names | Verdict |
| --- | --- | --- | --- |
| Obligation 8 (storage, ownership, contract and new technology are never the agent's own call) | A Python service on Postgres: an agent adds a table for a feature. The rule makes it an assumption waiting for the owner; correct, the table is new stored data. | An agent adds a hosted queue to a repository that has none. The rule names no queues, yet "new technology" and "new owner of data" reject it. | Passes both. |
| S4 (a stop is decided by what the choice changes and who has authority) | A frontend repository: an agent wants to rename a CSS class used only in one component. Two-way door inside existing authority: decide, record, continue. | An agent removes a visible "Resume in background" button because it seemed unused. The rule never names buttons, yet it changes user-visible behavior the owner hasn't settled, so it holds that piece and asks. | Passes both. |
| Obligation 9 (only a closing entry's first link closes anything) | A design review in another project: a reviewer's entry links to an assumption as context. The assumption stays open; correct. | An agent marks an assumption confirmed because the owner left it unticked on a page. The rule rejects it: nothing closed it, and obligation 15 forbids silence as a decision. | Passes both. |
| Obligation 11 (reaches the owner when it changes or fills in the design or plan) | A data-pipeline design: an agent picks a batch size the design leaves open. It fills in the design, so it reaches the owner. | An agent picks a variable name. It changes nothing in the design or plan, so it stays with the Lead. | Passes both. |
