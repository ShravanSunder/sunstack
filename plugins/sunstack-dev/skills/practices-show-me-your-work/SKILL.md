---
name: practices-show-me-your-work
description: "Use when a design, plan or implementation starts, runs or stops: recording what happened, a decision, assumption, design change or proof, or asked to show your work. Not for routine small edits."
---

# Practices: Show Me Your Work

Show me your work keeps the owner's picture of a running piece of work current. The record is the work trail: every agent writes what it did, decided, assumed, changed and proved, at the moment it happens, tied to the part of the design or plan it concerns. The owner reads one live page built from that record, its single source of truth, and answers each decision on its own page.

A task qualifies when it spans sessions, commissions another agent, crosses components, or makes a decision someone will later inspect, or when the owner asks for a trail; the record works the same way during design from start to ready, during planning and during implementation. A routine small edit gets no record; if it changes the state of a work thread already in context, post the outcome there. The record never lives in a product repository. Thread posts carry conversation and checkpoint notices that point at the record; the record holds the substance.

## 1. Open or resume

At the start of a qualifying task, before other work, MUST load `practices-collaboration` and return the exact work thread reference and Router project, or `no-home: <gap>`. The work's record is that project's work trail, filtered by the work's tag: read it forward from the start with `agent-collaboration work-trail show --project-id <id> --tag <work tag> --after '{"epoch":1,"position":0}' --limit 100 --json`, then repeat with the page's `coveredThrough` as `--after` until `coveredThrough` equals `highWater`. When the record is new, its first entry is an action carrying the goal, scope, orchestrator, repository and worktree, with links to the relevant artifacts.

IF that load returns `no-home`, or the work has no Router project, load `references/no-board-trace.md` and return the file you write entries to, or the exact gap.

Resume the existing record and read its history first. Carry each open entry forward: open assumptions and stand-ins, owner asks and unaccepted work. Before an unchecked "done" claim in it guides your next step, continue from the part current sources support and carry the rest as open work ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). When you resume as the 🦁 Lead and an owner correction is newer than the plan or commission, mark each line it overrides and continue from the correction ([a later correction outranks the plan](../principle-build-the-shared-model-first/SKILL.md)). Ask the owner only when two owner decisions conflict or the correction's meaning is unclear.

Completion: the record (project and work tag, or the entries file) is named; you read it to its high water (or the file's last line) and give that position; and each open entry (open assumptions, stand-ins, owner asks and unaccepted work) is listed by id, or the read shows none.

## 2. Record as it happens

Record what the owner, or someone picking up the work cold, would act on: what happened, each decision, each assumption, each change from the design, each proof. Leave out routine commands, step-by-step narration and status that changes no decision.

- Every entry is one of seven kinds: action, decision, assumption, design change, proof, Lead acceptance, or owner ask.
- Every entry names who did, decided or assumed it (the owner, the Lead or a Sidekick) and the part of the design or plan it belongs to by that part's identifier, or says it belongs to none.
- Every decision names its authority: the owner's words quoted with where they were said, an existing contract, or the agent's own call. Name it from its source, never inferred from a plan, a review or a page you wrote.
- The agent that has the fact writes it, at the moment it has it. A Sidekick writes its own entries as it works and doesn't wait for the Lead to relay them.
- An assumption is recorded when it is made, and the work goes on unless step 3 says otherwise.
- An entry is never edited. A correction, resolution or replacement is a new entry whose first link is the entry it closes; no other link closes, accepts or confirms anything.
- Silence, "not marked wrong", a review verdict or a selection made while the owner asks what it means never becomes the owner's decision.

**Before a choice about stored data, ownership, a public contract, new technology or scope goes ahead, find the authority that covers it:** the owner's words, the governing design or an existing contract. A covered choice (an index inside a store the design binds, the repository's established technology, the record's own fallback file) is a decision citing that authority, and the work continues. A commitment no authority covers is an assumption waiting for the owner, and the work that depends on it stops. The excuse to catch: "it's unreleased, so the storage layout is reversible." Other work builds on it before anyone could back out, and reversibility is not authority.

MUST load `references/record-entries.md` and return the entry you are about to write, filled in its shape, and the command that writes it.

IF you write or delegate a log, load the destination repository's `AGENTS.md` and its `use-*-logs` skill and return the home and writer they allow.

Completion: each action, decision, assumption, design change and proof since the last entry is in the record, each decision with its authority.

## 3. When an entry may stop the work

A stop is decided by what the choice changes and who already has authority over it, not by how alarming its subject sounds. Only the six treatments in `stop-treatments.md` stop work; everything else is recorded and continued past.

IF the entry is an assumption, a decision made without asking, or a design change, load `references/stop-treatments.md` and return the treatment that applies, the real case it matches, and the action it causes now.

Completion: the entry carries the treatment's `next:` actor when it is an assumption, the dependent work is held or continuing as the treatment says, and independent work keeps moving.

## 4. Keep the owner's asks

The 🦁 Lead keeps the owner's asks as owner-ask entries. Each is an actionable ask, question, constraint or correction in the owner's words, with where it was said and its state: open; done with its evidence; or deferred with its reason and follow-up owner. A change of state is a new entry that closes the previous one.

- When an ask or correction arrives, record it before acting on it. A correction about how agents work in general, such as when to review or whether to relay, also goes in the skill-failure log your standing instructions name, where skill audits look for it.
- An explored option is not an instruction, and a question is done once answered.
- Helpers report their scoped status and don't write owner-ask entries.

At resume, at each handback and before calling work done, compare each open ask with what the sources show now and name each one still open ([check that every owner line is carried](../principle-hold-the-scope/SKILL.md)). One list said three fixes had landed in a commit and, a line later, still gave "commit them" as the next step; `git log` already held the commit.

Completion: each open owner ask is named by id with its state, beside what the current sources show for it; an ask those sources show done or deferred has its closing entry.

## 5. Accept work (the Lead)

The 🦁 Lead accepts finished work with a Lead acceptance entry that names the commit, each check the Lead read with its result, and what stays unverified. A helper's success report, a green check or a review verdict alone is not acceptance. Later work that touches accepted work is recorded as reopening it: a new entry whose first link is the acceptance.

Completion: the acceptance entry's id, and in its text the commit, each check you read with its result, and what stays unverified.

## 6. Show the owner

At every checkpoint, MUST load `references/live-page.md` and return the page path, the record position it shows, and the checker result.

The page shows only what the record holds. IF an entry waits for the owner's choice (`next:owner`), load `../../shared-references/owner-decision-brief.md` and return the brief and its recipient under that reference's rules; then load `presentation-html` and return the decision page built from that brief and its path. The assumption entry links that path: write the page before the entry, or close the entry with a new one that carries the link. The owner's answer is recorded as a decision entry that quotes the owner's words and closes what it answers.

Completion: the page path, the record position this checkpoint's build covers, and a checker result with no errors.

## 7. Checkpoint at every stop

Before a terminal response, record the outcome, remaining work or blockers, open stand-ins, the owner-asks comparison and the next action, rebuild the page, and put the record reference and page path in the handoff; if nothing changed, point to the last checkpoint. When someone will read it cold, name things as their sources do, give the next step as a command or path you checked, and put assumptions, risks and unverified interactions first ([write for the reader](../principle-write-for-the-reader/SKILL.md)). When a work thread is reachable, post a checkpoint notice on it that links the record and the page. A contributor checkpoints only its own assignment; the root's orchestrator resolves the work under `practices-collaboration`.

Completion: the checkpoint entry's id, the page rebuilt from the record after it, and the thread notice that links both; with no work thread, the entries file that holds the checkpoint, the page built from it, and the no-thread gap named in the handoff.

## Completion

Not done while an action, decision, assumption, design change or proof from this stop is missing from the record; a decision lacks its authority; an open assumption is shown as decided; an owner ask is uncompared; an open stand-in isn't named as unverified; or the page wasn't rebuilt from the record at this checkpoint. With no reachable record home, report current state and the exact gap as a blocker and keep doing independent work.
