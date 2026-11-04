# Requirements: show-me-your-work

## The change

- **Class:** behavior-changing. Claim: alters `practices-show-me-your-work`'s main path (where the record lives, what an entry holds, who writes it, what the owner sees), its trigger, and the allocation of its references; adds a `scripts/` page builder; changes how three callers record their work. Surfaces altered: trigger, main path, depth (references and a script), proof.
- **Kind:** update.
- **Owner plugin:** `sunstack-dev`. Existing owner of the behavior: `plugins/sunstack-dev/skills/practices-show-me-your-work/` (`SKILL.md`, `references/markdown-view.md`, `references/no-board-trace.md`). No other skill owns it.
- **Baseline:** sunstack-dev 2.103.0 at `cbcaec0d`. Today the trace is a board thread's posts, or a session-logs file when there is no board. It holds the Lead's owner-asks list, decisions made without asking, stand-ins and checkpoints. Helpers post on their own execution threads. The readable view is an on-request Markdown view. There is no assumption entry, no link from an entry to the part of the design it concerns, no accepted-work record, and no page the owner reads while the work runs.
- **Reusable behavior:** this skill helps agents keep the owner's picture of a running design or implementation current: what has happened, how the design is being carried out or taking shape, the decisions and whose authority each rests on, the assumptions, the design changes and the proof, recorded as the work happens and shown on one live HTML page per piece of work.

## The need, in the owner's words

- 3 Nov: "Show me your work is about the assumptions. It's about making sure what work we've done is locked, with decisions logged. Proof of the work, what verifications are done. It should function and show me what's going on and also work through HTML."
- 3 Nov: "'Show me your work' should work while the design process is done and implementations happening, to show all the design breaks and all the decisions the agent made so I know what's going on." and "the idea is all the design changes, modifications, and assumptions are always logged during the implementation process as well."
- 3 Nov (to the Advisor): "i want all deiciosn to be recorded with sho wme kyour work. then i want to maek srue all assumed deicons are logge dand check in weith me"
- 4 Nov: "show me your work is duign the proscess ofimplemenation what has happed how is the disng bieng implemetned what ar eteh dicsion and assumpitosn. it coudl also be dukrinb the process of full design star tto ready ness -> same qeutison"

## Success definition

During design (from start to ready), planning and implementation, the owner can open one page for a piece of work and see, without reading transcripts:

1. what has happened;
2. how the design is being carried out, or how it is taking shape, part by part;
3. each decision, who made it, and whose authority it rests on;
4. each assumption, and which ones wait for him;
5. what changed from the design;
6. what is proven, what was checked, and what is still unverified;
7. what finished work the Lead accepted, which can't change silently.

Every agent on the work records these as they happen, keeps working, and stops only where the stop list says. Nothing reaches the owner as settled that he didn't decide.

## Who reaches the skill, and when

- **An agent unprompted:** a Lead at the start of a qualifying task and at every stop; a Sidekick commissioned on a piece of work, from its role skill.
- **Other skills:** the phases and orchestrators that already call it at checkpoints (`implement-plan`, `plan-implementation`, `orchestrator-design`, `orchestrator-implementation-goal`, the design phases); `role-implementer` and the other role skills at commission.
- **A person:** the owner, by name ("show me your work").

## Evidence

| Date | Source | What it shows |
| --- | --- | --- |
| 11 Oct | Router requirement U42 (`codex-router docs/specs/2026-10-04-board-orchestration-design/requirements.md:88`), authorized from the owner's words "show me your work already has work-trail, let's do it" | The owner designed the record's home: an append-only work trail per project, separate from the message board; decision rows form the project's decision register. No skill uses it. |
| 24 Oct–3 Nov | Owner words ledger: memory-logs `projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/design-documents/research-show-me-your-work/report.md` §3 and `owner-words/addendum.md` | Repeated asks: assumptions separated and ranked for what reaches him; HTML of what was done, shortcuts and anything off the plan; decision-facing show-me-your-work HTML. |
| 20 Sep–3 Nov | Ten real cases: memory-logs `skills/authoring/2026-11-03-show-me-your-work-evidence/report.md` | Failures were mislabelled authority and needless stops more than missing records: storage chosen and logged as "decision made without asking" (E01); needless owner stops (E02 to E04); answered choices re-shown; a review result taken as consent. |
| 3–4 Nov | Owner decisions recorded in the work trail, Router project `01a1635f-5d9d-70e4-bfc7-6d96c1a210e7`, rows tagged `design-documents` | The decisions this design honors (see the decisions table in `skill-design.md`). |
| 3–4 Nov | Trial: rows written to that work trail; a builder produced `owner-pages/live-design-documents.html` from them alone; adding a row and rebuilding updated the page | The record and the page work end to end on one project. Not tried: a Sidekick writing rows; proof receipts; redaction. |
| 4 Nov | Advisor probe: `research-show-me-your-work/reach-rule-feasibility.md` | Released sunstack 0.6.0 can judge work-trail entries exported as Markdown with a Jev decision model; accuracy unproven. |

## Authoring basis

User-directed intent: the success definition above is the owner's, approved through his recorded decisions. The ten cases are observed failures used as evidence and as candidate evals; none was reproduced in a fresh run, so no causal fix is claimed.

## Non-goals

- How design documents are written and shown (design documents, phase one, which comes next by the owner's order).
- The decisions-and-assumptions panel and the other components (phase two).
- The Jev rule that judges which entries are important: deferred to a later run, after real entries exist and one hosted run is labelled.
- How the owner is asked a decision: `owner-decision-brief` keeps that job; this skill links to it and records the answer.
- Changes to the Router engine or its storage.
- Migrating old traces: existing threads and session-logs files stay read-only history.
