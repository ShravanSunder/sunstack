---
name: practices-show-me-your-work
description: "Use when tracking work in logs or handling a request to show a work log, including decisions, assumptions, checks, owner asks and checkpoints. Not for routine small edits."
---

# Practices: Show Me Your Work

Show me your work keeps the owner's picture of a running piece of work current. Every agent logs its own work in the log its packet names, at the moment it happens: what it decided, assumed, cut short and checked. The log is the work's Router work trail, its single source of truth. This skill records and reads work; it never creates or refreshes HTML. Ordinary logging does not create or refresh Story summaries. An existing page, a checkpoint or a stop does not authorize rendering.

A task qualifies when it spans sessions, commissions another agent, crosses components, or makes a decision someone will later inspect, or when the owner asks for a trail; the log works the same way during design from start to ready, during planning and during implementation. A routine small edit gets no log; if it changes the state of a work thread already in context, post the outcome there. The log never lives in a product repository. Thread posts carry conversation and checkpoint notices that point at the log; the log holds the substance.

## 1. Open or resume

At the start of a qualifying task, before other work, MUST load `practices-collaboration` and return the exact work thread reference and Router project, or `no-home: <gap>`. The work's log is that project's work trail, filtered by the work's tag; a helper's packet names it in `workLog`. Read it forward from the start with `agent-collaboration work-trail show --project-id <id> --tag <work tag> --after '{"epoch":1,"position":0}' --limit 100 --json`, then repeat with the response's `coveredThrough` as `--after` until `coveredThrough` equals `highWater`. When the log is new, its first row is an action carrying the goal, scope, orchestrator, repository and worktree, and listing each workstream with the part of the design or plan it carries out. Whenever another part of the design or plan begins, a new action row names it with its workstream.

IF that load returns `no-home`, or the work has no Router project, load `references/no-board-trace.md` and return the file you write entries to, or the exact gap.

Resume the existing log and read its history first. Carry each open row forward: open assumptions and stand-ins, owner asks and unaccepted work. Before an unchecked "done" claim in it guides your next step, continue from the part current sources support and carry the rest as open work ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). When you resume as the 🦁 Lead and an owner correction is newer than the plan or commission, mark each line it overrides and continue from the correction ([a later correction outranks the plan](../principle-build-the-shared-model-first/SKILL.md)). Ask the owner only when two owner decisions conflict or the correction's meaning is unclear.

Completion: the log (project and work tag, or the entries file) is named; you read it to its high water (or the file's last line) and give that position, which is where your stretch starts; and each open row (open assumptions, stand-ins, owner asks and unaccepted work) is listed by id, or the read shows none.

## 2. Log as it happens

Log what the owner, or someone picking up the work cold, would act on. Leave out routine commands, step-by-step narration and status that changes no decision.

- When you decide, assume, take a shortcut or run a check, you write that row yourself, before your next row, commit, message or handback that depends on it. A helper doesn't wait for the Lead to relay it, and the Lead doesn't write a helper's rows for it.
- Every row is one kind: action, decision, assumption, shortcut, proof, Lead acceptance, owner ask, story, missed or audit. A change from the design or plan is a shortcut.
- A decision carries Choice and Authority; an assumption, Assumed and What depends on it; a shortcut, Planned, Did instead, Why and Authority (`none` when nothing covered it); a proof, Claim, Check, Result and Not covered. Every decision's authority is named from its source: the owner's words quoted with where they were said, an existing contract, or the agent's own call, never inferred from a plan, a review or a page you wrote.
- A check you didn't run names its runner in `Ran by:` and comes with a missed row that says why the runner didn't write it.
- Every row carries the workstream its packet names (`stream:`).
- Write each row in two steps: step one mints a request id and a row id for it; step two writes with them. When the outcome is unknown (no readable Router answer), rerun step two with the same ids, never new ones; when Router answers without accepting, check the trail before writing anything new, then fix what it names; an access denial goes in your handback. A new row mints new ids.
- A row is never edited. A correction, resolution or replacement is a new row whose first link is the row it closes, tagged `resolves` or `supersedes`; no other link closes, accepts or confirms anything.
- Silence, "not marked wrong", a review verdict or a selection made while the owner asks what it means never becomes the owner's decision.

**Before a choice about stored data, ownership, a public contract, new technology or scope goes ahead, find the authority that covers it:** the owner's words, the governing design or an existing contract. A covered choice (an index inside a store the design binds, the repository's established technology, the log's own fallback file) is a decision citing that authority, and the work continues. A commitment no authority covers is an assumption waiting for the owner, and the work that depends on it stops. The excuse to catch: "it's unreleased, so the storage layout is reversible." Other work builds on it before anyone could back out, and reversibility is not authority.

MUST load `references/record-entries.md` and return the row you are about to write, filled in its shape, and the step-two command with this row's minted ids.

IF the write fails to connect to Router, keep each row's text and kind, list them in your handback with the exact error, and keep working; your commissioner writes them with `Ran by:` naming you, plus a missed row for each.

IF you write or delegate a log file, load the destination repository's `AGENTS.md` and its `use-*-logs` skill and return the home and writer they allow.

Completion: each decision, assumption, shortcut and check since your last row is in the log, written by you, each decision with its authority, or listed for your handback with the write's error.

## 3. When a row may stop the work

A stop is decided by what the choice changes and who already has authority over it, not by how alarming its subject sounds. Only the six treatments in `stop-treatments.md` stop work; everything else is logged and continued past.

IF the row is an assumption, a decision made without asking, or a shortcut, load `references/stop-treatments.md` and return the treatment that applies, the real case it matches, and the action it causes now.

Completion: the row carries the treatment's `next:` actor when it is an assumption, the dependent work is held or continuing as the treatment says, and independent work keeps moving.

## 4. Keep the owner's asks

The 🦁 Lead keeps the owner's asks as owner-ask rows. Each is an actionable ask, question, constraint or correction in the owner's words, with where it was said and its state: open; done with its evidence; or deferred with its reason and follow-up owner. A change of state is a new row that closes the previous one.

- When an ask or correction arrives, log it before acting on it. A correction about how agents work in general, such as when to review or whether to relay, also goes in the skill-failure log your standing instructions name, where skill audits look for it.
- An explored option is not an instruction, and a question is done once answered.
- Helpers report their scoped status and don't write owner-ask rows.

At resume, at each handback and before calling work done, compare each open ask with what the sources show now and name each one still open ([check that every owner line is carried](../principle-hold-the-scope/SKILL.md)). One list said three fixes had landed in a commit and, a line later, still gave "commit them" as the next step; `git log` already held the commit.

Completion: each open owner ask is named by id with its state, beside what the current sources show for it; an ask those sources show done or deferred has its closing row.

## 5. Audit your stretch

Before you hand work back, and at each checkpoint, audit your own stretch: from your last Audit (or your commission, or step 1's position) to now. Compare what your own session history shows you did with what you logged, and check the packet's or plan's required checks against your proof rows. For each thing you find unlogged (a decision, an assumption, a shortcut, a check, a required check that never ran), write a missed row. Then write one audit row naming the stretch, what you compared against, what you couldn't see, and how many you found with each missed row's id. When you can't read your history, say so in `Couldn't see:`; keep that visibility gap explicit rather than claiming "nothing missed". The independent reviews the work already runs are the second reader: a finding of theirs the log missed becomes a missed row.

Completion: the audit row's id and each missed row's id, for this stretch.

## 6. Accept work (the Lead)

The 🦁 Lead accepts finished work with a Lead acceptance row that names the commit, each check the Lead read with its result, and what stays unverified. A helper's success report, a green check or a review verdict alone is not acceptance. Later work that touches accepted work is logged as reopening it: a new row whose first link is the acceptance.

Completion: the acceptance row's id, and in its text the commit, each check you read with its result, and what stays unverified.

## 7. Checkpoint at every stop

Before a terminal response, log the outcome, remaining work or blockers, open stand-ins, the owner-asks comparison and the next action; run step 5's audit; and put the log reference in the handoff. If nothing changed, point to the last checkpoint. When someone will read it cold, name things as their sources do, give the next step as a checked command or path, and put assumptions, risks and unverified interactions first ([write for the reader](../principle-write-for-the-reader/SKILL.md)). When a work thread is reachable, post a checkpoint notice linking the log. A contributor checkpoints only its own assignment; the root's orchestrator resolves the work under `practices-collaboration`.

Completion: the checkpoint row's id and this stretch's audit row id, and the thread notice linking the log when reachable. With no work thread, return the entries file and the no-thread gap. A page is never a checkpoint or completion requirement.

## Explicit page requests

IF the owner explicitly requests a work-log HTML page or its refresh, load `presentation-show-worklog` and return that requested snapshot and its cutoff. A generic request to show progress or inspect the log stays in the current conversation. An indirect skill load, an unanswered decision or the existence of a page never takes the rendering branch.

## Completion

Done when this stop's decisions, assumptions, shortcuts and checks are recorded or an unreachable-write gap is returned; each decision names its authority; open assumptions remain open; stand-ins and unverified work are named; owner asks have been compared; and the stretch has its audit. Do not create, refresh or require HTML to satisfy this skill.
