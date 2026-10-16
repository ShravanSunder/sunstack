---
name: practices-show-me-your-work
description: "Use at the start of a qualifying task to open or resume the work trace; while one is open, to record an owner ask or correction, a decision, evidence, blocker, or outcome, or to hand off; or when the user asks to show your work or for a trail. Not for routine small edits."
---

# Practices: Show Me Your Work

The trace is the work's running account, shared by every session and agent on the work. It lives on the work thread, or in a session-logs file when there is no board, and never in a product repository. An entry records a claim; code, specifications and proof keep their authority.

A task qualifies when it spans sessions, commissions another agent, crosses components, or makes a decision someone will later inspect, or when the owner asks for a trail. A routine small edit gets no trace; if it changes the state of a work thread already in context, post the outcome there.

## Open or resume

At the start of a qualifying task, before other work, MUST load `practices-collaboration` and return the exact work thread reference or `no-home: <gap>`.

IF that load returns `no-home`, the thread you used drops, or a board appears after no-board work was recorded, load `references/no-board-trace.md` and return the session-logs file you write to, the reconciled thread, or the exact gap.

Resume the existing trace and read its history first. Before an unchecked "done" claim in it guides your next step, continue from the part current sources support and carry the rest as open work ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). When you resume as the 🦁 Lead and an owner correction is newer than the plan or commission, mark each line it overrides and continue from the correction ([a later correction outranks the plan](../principle-build-the-shared-model-first/SKILL.md)). Ask the owner only when two owner decisions conflict or the correction's meaning is unclear.

## Keep the owner's asks

The 🦁 Lead keeps one current list in the trace. Each item is an actionable ask, question, constraint or correction in the owner's words, with where it was said, its state, and the evidence or next step behind that state.

- When an ask or correction arrives, update the list before acting on it.
- Done needs evidence; deferred needs a reason and a follow-up owner.
- A later correction supersedes an item with a link; the old item stays.
- An explored option is not an instruction, and a question is done once answered.
- Helpers report their scoped status and don't edit the Lead's list.

At resume, at each handback and before calling work done, compare each open item with what the sources show now and name each one still open ([check that every owner line is carried](../principle-hold-the-scope/SKILL.md)). One list said three fixes had landed in a commit and, a line later, still gave "commit them" as the next step; `git log` already held the commit.

## Record what changed

Record consequential decisions and reasons, accepted or rejected findings, proof outcomes, blockers and deferred improvements, each readable without its links, with uncertainty stated and private content removed. Correct a mistaken entry with a new one that references it, and attribute a copied claim to its author unless you checked it.

Two entry types other skills point to:

- **Decision made without asking**: the reversible, in-scope call and the reason for it.
- **Stand-in**: the seam, the stand-in, its assumptions, what it gains, what it costs, and what closes it. It never proves the real interaction: "the adapter stand-in passes; the real provider remains unobserved" cannot become "provider complete" on resume.

IF you write or delegate a log, load the destination repository's `AGENTS.md` and its `use-*-logs` skill and return the home and writer they allow.

## Checkpoint at every stop

Before a terminal response, record the outcome, remaining work or blockers, open stand-ins, the owner-asks comparison and the next action, and put the trace reference in the handoff; if nothing changed, point to the last checkpoint. When someone will read it cold, name things as their sources do, give the next step as a command or path you checked, and put assumptions, risks and unverified interactions first ([write for the reader](../principle-write-for-the-reader/SKILL.md)). A contributor checkpoints only its own assignment; the root's orchestrator resolves the work under `practices-collaboration`.

IF the owner asks for a readable view or the trace needs substantial synthesis, load `references/markdown-view.md` and return the view path, source cutoff and coverage gaps.

Complete when that checkpoint is recorded with each open owner ask compared and each open stand-in named as unverified. With no reachable trace home, report current state and the exact gap as a blocker and keep doing independent work.
