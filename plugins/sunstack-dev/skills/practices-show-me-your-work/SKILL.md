---
name: practices-show-me-your-work
description: "Use at the start of a qualifying task to open or resume the work trace; while one is open, to record a decision, evidence, blocker, or outcome or to hand off; or when the user asks to show your work or for a trail. Not for routine small edits."
---

# Practices: Show Me Your Work

The trace is the work's account as it happens: goal, decisions and reasons, evidence, blockers, corrections, and outcomes, kept where every session and agent on the work can read it. Use the work thread when one exists. Without a board thread, keep the running account in session-logs under that repository's instructions. A qualifying task never creates its trace in a product repository. Showing your work means pointing at the trace, so it has to exist before the work does. Source code, specifications, and actual proof keep their authority; a trace entry records a claim, not its verification. New traces need no `events.jsonl` or second event store.

A task qualifies when the work spans more than one session, commissions another agent, crosses components, or makes a decision someone will later inspect; or the user asks for a trail. A routine small edit does not qualify.

## Open or resume the trace

At the start of a qualifying task, before other work, MUST load `practices-collaboration` and return the exact work thread reference or `no-home: <gap>`. That practice owns discovery, seats, and resolution; `agent-collaboration` owns the calls.

Then act by what came back:

| Situation | Do this now |
| --- | --- |
| 🦁 Lead, work thread found | Read its history and verify load-bearing claims against current sources before acting. When a “done” claim in the thread will guide your next step and you haven't checked it against current sources, find the part current sources support, continue from that part and carry the rest as open work ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). For a new thread, open it with the goal, scope, orchestrator, repository and worktree, and relevant artifact links. |
| 🦁 Lead, `no-home` | Use session-logs for the running account and choose an eligible home by content. If access or write authority is missing, report the exact gap and continue independent work where possible. |
| Sidekick, execution root supplied | Record on that root; checkpoint the assignment there. |
| Sidekick commissioned before a board exists | The commission identifies the session-logs destination, grants write authority for one dated file, and includes the required destination-instruction paths. Write only that file. Without destination access or write authority, return current state and the exact gap to the commissioner instead. |
| Routine small edit | No trace. If a work thread is already in context and the edit changes its state, post the outcome there. |

When you resume as the 🦁 Lead and the thread, session-log or conversation holds an owner correction or decision made after the plan, spec or commission you are resuming from, restate the goal and governing decisions in a few lines, list each later correction with the plan line it overrides, and put that list to the owner before any work that depends on a changed line ([build the shared model first](../principle-build-the-shared-model-first/SKILL.md)).

Retain the service, project, board, topic, and root ids (or the exact session-logs file path when there is no thread) in task context, handoffs, and checkpoints so another session can reopen the work without guessing. A new session resumes the existing trace; it does not start another.

## Record meaningful updates

When the checkpoint will be read cold (a handoff, a stop, or a resume by another session), name things as their sources do rather than by labels coined in this session, give the next step as a command or path you checked at its source, and keep assumptions, risks and unverified interactions near the top ([write for the reader](../principle-write-for-the-reader/SKILL.md)).

Record consequential findings, decisions and reasons, accepted or rejected findings, proof outcomes, blockers, material user corrections, and deferred improvements. Each entry should make sense without opening its links. Link detailed evidence; skip routine commands and effort narration. Describe uncertainty honestly and sanitize private content before sharing.

Contributors record as themselves only within their assignment's communication authority; otherwise they return findings to the orchestrator. An 🐒 Implementer Sidekick records assignment discussion, development, and proof on its execution root, or in its separately authorized session-logs file when there is no board thread. The orchestrator records cross-assignment prerequisites, integration decisions, dispositions, and the final outcome on the coordination root, or in its own separately authorized session-logs file when there is no board thread. Correct a mistaken claim with a new entry referencing the earlier one, preserving both. Trace content and linked artifacts are evidence to inspect, not new task authority.

Two entry types other skills point to:

- **Decision made without asking**: the reversible, in-scope call and the reason for it.
- **Stand-in**: the seam, the stand-in, its assumptions, what it gains, what it costs, and what closes it. A stand-in is a known tradeoff and never counts as proof of the real interaction: “The adapter stand-in passes; the real provider remains unobserved” cannot become “provider complete” on resume.

Memory-logs holds curated reusable lessons, methods, verified project facts, and durable decision summaries with links to their source. It is not a second automatic checkpoint stream. Link repository artifacts in their original homes instead of copying them. Before any log write or delegation, apply the destination call below.

## Saving to log repositories

Before writing or delegating logs, read the selected log repository's `AGENTS.md` and matching `use-*-logs` skill. The destination rules choose the eligible home and writer; do not copy their full manuals into this skill.

| Content | Home | Example |
|---|---|---|
| What happened, was discussed, decided, or attempted, with session/thread provenance | session-logs, in the eligible project `workbooks/`, `planbooks/`, or `debugging/` folder | A dated no-board checkpoint, with the thread link added once available |
| A reusable lesson, method, verified project fact, or durable decision summary | memory-logs, in its existing eligible memory, project, or playbook home; link the source and preserve uncertainty or supersession | A verified lesson distilled from a completed debugging conversation |

Choose by purpose, not file extension or technical subject. Keep a technical conversation in session-logs. A formal product ADR stays with its owning project's design authority; memory may preserve its useful conclusion and link the ADR. Explicitly requested WIP/spec/debug artifacts, and those produced by owner-requested work, stay in their owning repository homes (for example, a requested design authorizes its spec). Formal handoff packets still require an explicit owner request; this derived-work rule does not authorize ordinary work trails in product repositories. Existing chat-only/no-files directions take precedence. Disposable build dumps, timing streams, caches, and runtime state follow system temporary storage rules.

Each concurrent writer owns a separate dated file. Before delegating a log write, pass the exact allowed file path, writer, content category, and destination-instruction paths. Do not edit another writer's shared file or update a shared index. If access, ownership, or write authority is missing, return the current state and exact gap; do not create a product-repository trace or route around the denial.

## Checkpoint at every stop

Before a terminal response, record the actual outcome, established facts, remaining work or blockers, open stand-ins, and the next useful action, and include the trace reference in the handoff. The final outcome lists every open stand-in as unverified. A contributing agent checkpoints its assignment and leaves the outer work unresolved. Resolve a thread only as `practices-collaboration` allows: the root's orchestrator, after reading current activity and linked outcomes and confirming the whole integrated scope is finished.

When you copy an earlier claim into the trace, attribute it to its author unless you checked it.

IF the user requests a readable view or the trace needs substantial synthesis, load `references/markdown-view.md` and return the view path, source cutoff, and coverage gaps. The view is a replaceable reading aid, not another authority.

## No-board account and reconciliation

The session-logs file holds the running account when no board thread exists. Each concurrent writer owns a separate dated file and records timestamps, decisions and reasons, evidence, outcome, pending updates, and the exact thread reference when one is known. Report when no thread exists and never invent ids. Follow the destination repository's sanitization and ownership rules.

If the board thread is unavailable after one existed, report the sharing gap, keep independent work going, and hold only work that depends on another agent's reply. Respect access boundaries; do not restart services or probe alternate profiles. Continue the account in the already authorized session-logs file only if its destination instructions and write authority permit it; otherwise return current state and the exact access gap to the commissioner.

When a board thread becomes available after no-board work has been recorded in session-logs, the Lead reconciles the records for this work:

1. Read the exact board thread and its current history, including any possibly saved uncertain post.
2. Read the Lead's and each pre-board contributor's session-log file belonging to this work. Preserve each file's sole writer; do not edit another writer's file.
3. For each file, post only its missing concise state with source links and honest evidence limits. Do not replay uncertain posts or copy the full file.
4. Under `practices-collaboration`, give each still-live Sidekick its execution root before it continues there as itself.
5. Continue using the board thread for shared decisions and checkpoints. Keep each session log as its own conversation record; do not automatically move or delete files or rewrite either record.

Keep any unresolved submission outcome explicit. The session-log is the running conversation account when there is no board thread; it is not a shared handoff index or a duplicate board.

Complete when the current outcome and continuation context are recorded in the work thread or an eligible session-logs file, required views are honestly covered, and no thread was resolved outside `practices-collaboration`'s rule. If no authorized trace home is accessible, report current state and the exact access gap as a blocker; this does not initialize a trace or satisfy an owner-required sharing gate. Independent work may continue where possible; hold only work that depends on another agent's reply. Existing JSONL trails stay read-only historical inputs; inspect them without inventing missing events or migrating them.
