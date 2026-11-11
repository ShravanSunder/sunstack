---
name: practices-show-me-your-work
description: "Use when tracking work in logs or handling a request to show a work log, including decisions, assumptions, checks, owner asks and checkpoints. Not for routine small edits."
---

# Practices: Show Me Your Work

Show me your work keeps the owner's picture of a running piece of work current. Every agent records material changes in the log its packet names: decisions, assumptions, departures, evidence, blockers and outcomes that change the work or what someone should do next. The log is the work's Router work trail, its single source of truth. This skill records and reads work; it never creates or refreshes HTML. Ordinary logging does not create or refresh Story summaries. An existing page, a checkpoint or a stop does not authorize rendering.

A task qualifies when it spans sessions, commissions another agent, crosses components, or makes a decision someone will later inspect, or when the owner asks for a trail; the log works the same way during design from start to ready, during planning and during implementation. A routine small edit gets no log; if it changes the state of a work thread already in context, post the outcome there. The log never lives in a product repository. Thread posts carry conversation and checkpoint notices that point at the log; the log holds the substance.

## 1. Open or resume

IF this qualifying task has no established work home in context, MUST load `practices-collaboration` and return the exact work thread and Router project, or `no-home: <gap>`. Otherwise reuse that established home. The log is that project's work trail filtered by the work's tag; a helper's packet names it in `workLog`.

Choose the reading path from the context actually retained:

- **Cold reconstruction:** when the inspected source capture, its project/tag/epoch/scope, cutoff or open state is missing or no longer matches, read forward from the start with `agent-collaboration work-trail show --project-id <id> --tag <work tag> --after '{"epoch":1,"position":0}' --limit 100 --json`, continuing from each `coveredThrough` through the declared cutoff. Rebuild the open assumptions, stand-ins, asks and unaccepted work from the source.
- **Continuation:** reuse the inspected capture, cutoff and open state. Before treating its conclusions as current, read the full new interval in this scope after that cutoff through the newly declared cutoff, then decide what changes. A shared trail can change without a new owner message. Do not replay the inspected prefix or repeat successful reference reads still available in context. A fixed historical snapshot keeps its requested cutoff.

For local entries, retain the file and inspected last-line position and read new lines when refreshing; a changed source or missing prefix requires reconstruction. Retain the inspected records themselves, not only an unsupported summary. Report unread or truncated intervals and recover the missing content before claiming coverage.

When the log is new, its first action names the goal, scope, orchestrator, repository/worktree and workstreams. A genuinely new part of the design or plan gets an action naming its workstream; resuming the same part is not a new start.

IF there is no Router project or work thread, load `references/no-board-trace.md` and return the permitted entries file or exact gap.

Carry open work forward. Before relying on an unchecked “done”, inspect the decisive current evidence and retain the rest as unverified ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). A later owner correction outranks an older plan; carry the correction into the affected rows and work ([build the shared model first](../principle-build-the-shared-model-first/SKILL.md)).

Completion: name the reused or reconstructed source, the cutoff actually inspected and the remaining open work. Reuse those results on an unchanged reply rather than producing another record of reading them.

## 2. Log as it happens

Log what the owner, or someone picking up the work cold, would act on. Materiality governs every recording, audit and completion requirement below: an entry adds or changes a decision, authority, assumption, blocker, outcome, evidence needed for a claim, or next action. A timestamp, command invocation or repeated unchanged status alone is not a new event.

Run every required check. A failed or not-run required gate, a result at a changed target, or evidence needed for acceptance is material even when its result repeats. Related checks supporting one claim may share one proof record with their actual targets, results, receipts and limits; keep failures distinct. Omit routine commands and repeated observations that add no evidence. For example, a new priority or a failed required check changes the record; rereading an unchanged file does not.

Lead with the changed fact. Add only the context, reason, consequence and evidence needed to understand or act on it. Use ordinary sentences and link detailed receipts instead of copying their output. Preserve the required fields, authority, failures and proof limits.

- When a decision, assumption, shortcut or check meets that materiality test, write its row before work or a handback depends on it. A helper doesn't wait for the Lead to relay it, and the Lead doesn't write a helper's rows for it.
- Every row is one kind: action, decision, assumption, shortcut, proof, Lead acceptance, owner ask, story, missed or audit. A change from the design or plan is a shortcut.
- A decision carries Choice and Authority; an assumption, Assumed and What depends on it; a shortcut, Planned, Did instead, Why and Authority (`none` when nothing covered it); a proof, Claim, Check, Result and Not covered. Every decision's authority is named from its source: the owner's words quoted with where they were said, an existing contract, or the agent's own call, never inferred from a plan, a review or a page you wrote.
- A check you did not run names its runner in `Ran by:` and cites its receipt. Record a shared inability to write once for the affected stretch; a genuinely omitted material obligation still needs a Missed row.
- Every row carries the workstream its packet names (`stream:`).
- Write each row in two steps: step one mints a request id and a row id for it; step two writes with them. When the outcome is unknown (no readable Router answer), rerun step two with the same ids, never new ones; when Router answers without accepting, check the trail before writing anything new, then fix what it names; an access denial goes in your handback. A new row mints new ids.
- A row is never edited. A correction, resolution or replacement is a new row whose first link is the row it closes, tagged `resolves` or `supersedes`; no other link closes, accepts or confirms anything.
- Silence, "not marked wrong", a review verdict or a selection made while the owner asks what it means never becomes the owner's decision.

**Before a choice about stored data, ownership, a public contract, new technology or scope goes ahead, find the authority that covers it:** the owner's words, the governing design or an existing contract. A covered choice (an index inside a store the design binds, the repository's established technology, the log's own fallback file) is a decision citing that authority, and the work continues. A commitment no authority covers is an assumption waiting for the owner, and the work that depends on it stops. The excuse to catch: "it's unreleased, so the storage layout is reversible." Other work builds on it before anyone could back out, and reversibility is not authority.

MUST load `references/record-entries.md` and return the row you are about to write, filled in its shape, and the step-two command with this row's minted ids.

IF the write fails to connect to Router, keep each material row's text and kind, list them in your handback with the exact error, and keep working. The commissioner preserves runner attribution and records the shared access gap once, without a second Missed row for every relayed fact.

IF you write or delegate a log file, load the destination repository's `AGENTS.md` and its `use-*-logs` skill and return the home and writer they allow.

Completion: material changes and proof are recorded with authority and receipts, or returned with the exact write gap. Routine procedure creates no extra rows.

## 3. When a row may stop the work

A stop is decided by what the choice changes and who already has authority over it, not by how alarming its subject sounds. Only the six treatments in `stop-treatments.md` stop work; everything else is logged and continued past.

IF the row is an assumption, a decision made without asking, or a shortcut, load `references/stop-treatments.md` and return the treatment and the action it causes now. The historical cases teach the treatments; matching an incident is not an entry requirement.

Completion: the row carries the treatment's `next:` actor when it is an assumption, the dependent work is held or continuing as the treatment says, and independent work keeps moving.

## 4. Keep the owner's asks

The 🦁 Lead keeps the owner's asks as owner-ask rows. Each is an actionable ask, question, constraint or correction in the owner's words, with where it was said and its state: open; done with its evidence; or deferred with its reason and follow-up owner. A change of state is a new row that closes the previous one.

- When a new ask or correction changes the work, log it before acting on it. Repeated reminders that change nothing reuse the existing ask. A correction about how agents work in general, such as when to review or whether to relay, also goes in the skill-failure log your standing instructions name, where skill audits look for it.
- An explored option is not an instruction, and a question is done once answered.
- Helpers report their scoped status and don't write owner-ask rows.

At resume, at each handback and before calling work done, compare each open ask with what the sources show now and name each one still open ([check that every owner line is carried](../principle-hold-the-scope/SKILL.md)). One list said three fixes had landed in a commit and, a line later, still gave "commit them" as the next step; `git log` already held the commit.

Completion: each open owner ask is named by id with its state, beside what the current sources show for it; an ask those sources show done or deferred has its closing row.

## 5. Audit your stretch

Before a meaningful handback or checkpoint, compare the work and its required checks with the material record. Check for an omitted owner correction, changed assumption or blocker, unsupported claim, failed/not-run required check, or unrecorded material result. Inspect receipts rather than trusting a success summary.

Record a genuine material omission as Missed, with its effect and source. If the record is complete and its visibility limits are already known, this comparison creates no separate zero-Missed audit row. Record a newly discovered material visibility gap once; do not claim “nothing missed” for history you could not inspect. An explicitly requested formal audit still uses the existing audit kind and fields. Independent review findings are checked against this same materiality test.

Completion: material omissions or new visibility limits are recorded, or the existing record is confirmed sufficient. This checks the record; it does not turn every unlogged routine command into an omission.

## 6. Accept work (the Lead)

The 🦁 Lead accepts finished work with a Lead acceptance row that names the commit, each check the Lead read with its result, and what stays unverified. A helper's success report, a green check or a review verdict alone is not acceptance. Later work that touches accepted work is logged as reopening it: a new row whose first link is the acceptance.

Completion: the acceptance row's id, and in its text the commit, each check you read with its result, and what stays unverified.

## 7. Checkpoint at every stop

Before a terminal response, compare open asks and the material record with the current outcome, remaining work, blockers, stand-ins and next action; apply step 5. If existing rows already carry that state, checkpoint by pointing to them. Write a concise checkpoint only for material state not already recorded; an unchanged reply creates neither a new checkpoint nor a new audit.

When someone will read it cold, put assumptions, risks and unverified interactions first and name the next checked command or path ([write for the reader](../principle-write-for-the-reader/SKILL.md)). A reachable work thread carries a checkpoint notice linking a new material checkpoint, not another copy of its contents. Contributors checkpoint only their assignments; the orchestrator resolves the work under `practices-collaboration`.

Completion: return the existing or new checkpoint/log reference and material open work. A page is never a checkpoint or completion requirement.

## Explicit page requests

IF the owner explicitly requests a work-log HTML page or its refresh, load `presentation-show-worklog` with any already inspected source capture, scope, cutoff and open state, and return the requested snapshot and its cutoff. Rendering does not write summaries, preparation checks, audits or checkpoints back into its source trail. A generic request to show progress or inspect the log stays in the current conversation. An indirect skill load, an unanswered decision or the existence of a page never takes the rendering branch.

## Completion

Done when material changes are recorded or an exact write gap is returned; decisions name authority; open assumptions, owner asks, stand-ins and unverified work are carried accurately; and the record has been checked for material omissions. Do not create, refresh or require HTML to satisfy this skill.
