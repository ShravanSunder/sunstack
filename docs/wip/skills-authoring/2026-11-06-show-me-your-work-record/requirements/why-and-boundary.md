# Why this changes, and its boundary

## The change

- **Target:** `sunstack-dev` / `practices-show-me-your-work`, as merged at `02965db8` (guides only, sunstack-dev 2.104.0), with the skills that commission or record work (`practices-manage-agents`, the `role-*` skills, the phase and orchestrator skills that call it).
- **Kind:** update, behavior-changing. The claim: it alters the main path of `practices-show-me-your-work` (an audit step, the two-step write, and a show-me reference in place of the live-page reference), the allocation of its references (`show-me.md` replaces `live-page.md`), a schema (`JobBase.workLog` in `practices-manage-agents`), and the steering of six role skills (when they log).
- **Reusable behavior:** this skill helps agents reliably log their own decisions, assumptions, shortcuts and checks as they work, and helps the Lead show the owner a page he can trust, whenever a piece of work spans agents or sessions.
- **Who reaches it, and when:** the Lead, at the start of qualifying work and at each checkpoint, through its role skill and the phase and orchestrator skills that call it; each helper, whenever its packet names a work log, through its role skill; the owner never loads it, he reads the page.
- **Baseline:** the 4 Nov design set (`docs/wip/skills-authoring/2026-11-04-show-me-your-work/`), accepted great at `0111a3ef`, shipped in #194. Its success definition is the accepted requirements set this change keeps: during design, planning and implementation the owner opens one page and sees, without reading transcripts, (1) what has happened; (2) how the design is carried out, part by part; (3) each decision, who made it and on whose authority; (4) each assumption and which wait for him; (5) what changed from the design; (6) what is proven and what is still unverified; (7) what finished work the Lead accepted. Every agent records these as they happen.
- **Why change it:** the skill says all of that, but the first real record kept under it carries much less, and what it carries was often written late. A page built from it shows mostly what the Lead did. The owner wants to see the decisions, assumptions, shortcuts and verification of every agent, so he can trust their decisions and see what was missed.

## Who is affected

| Class | Role here | What they need |
| --- | --- | --- |
| The owner | reads the page; decides what waits for him | to trust the agents' decisions and know what was missed or decided, without reading transcripts or raw rows |
| Agents doing the work (Lead, Sidekicks, reviewers, evaluators) | log their own work as it goes | logging that's easy and low-token, so they do it in the moment |
| The Lead | interprets the log for the owner and owns what it says | everyone's rows, on time, to put together |
| A peer Lead working on part of this work from its own project | logs in its own project's record | nothing copied between records |

## Goal boundary (confirmed by the owner on 6 Nov)

- **Goal:** the owner can trust the agents' decisions and know what was missed or decided: the page shows the decisions, assumptions, shortcuts and verification of every agent, and what was missed, opening on what needs his attention and what to do. Confirmed: "eys and i knwo what was deiceded and hwat is goign on" (`01a1b28e-6ff6`) and "yes" to the Lead's full reflection (`01a1b2ae-3e80`).
- **Reuse:** the Router work trail as the log, with simple rows (`01a1b291-488f`, `01a1b2b5-df88`); the stop treatments; the rule for what reaches the owner; decision pages; Demistify for the page; the four-section layout.
- **Missing:** every agent logging its own work as it goes; shortcuts and acceptances logged; what was missed found and shown; a page that shows the four things and what was missed, visually.
- **May change:** `practices-show-me-your-work` and the skills that commission or record work in `sunstack-dev`; how agents log is the Lead's call (`01a1b291-488f`).
- **Protected:** the Router engine and its storage; Demistify's components (the component Lead's).
- **Non-goals:** CSV files or diffs for the owner; a CSV or JSONL log for agents to write in place of the work trail (the shipped holding file for work with no Router project yet stays; see the skill design's D13); the Jev check of which entries are important (a later run); fresh-agent behavior runs and pressure tests (later, with evals); the component Lead's work-record helper itself; design documents phase one; rewriting past entries.
- **Acceptable evidence:** on the next real piece of work, every agent that worked on it logged its own rows as it went, and the owner can say from the page, without transcripts, what was decided, assumed, cut short and verified, and what was missed.

## Shape (owner decision)

The skill has two parts, connected through the log: the main skill teaches logging (U8–U11); a reference teaches showing the owner with Demistify (U1–U7). What isn't logged can't be shown, so the log's shape is what the reference reads. Owner decisions `01a1b28e-70e8` and `01a1b28e-c5e5`.

The log is Router's work trail, not a CSV or JSONL file: Router stamps who wrote each row and when, keeps one order across agents, sessions and worktrees, and keeps rows append-only. With the log settled, most of the remaining design is the display. Owner decision `01a1b2b5-df88`. The Lead's own call, for Program Design to settle: a page build saves the rows it read, so the page can be rebuilt and checked; agents don't write that copy.

## Words used here

- **The log:** the project's Router work trail, filtered by the work's tag: simple rows that agents write as they work. The owner needn't read it raw; the page shows it.
- **Shortcut:** anything done the quick way or off the plan: a check skipped, a step cut, a departure from the design or plan. The record's kind for a departure today is `design-change`.
- **Verification:** a check that ran, its result, and what it didn't cover; finished work the Lead accepted is verification he signed for (the record's kind for it is `lead-acceptance`).
- **What was missed:** something that happened but wasn't logged, a claim with weak or no evidence, or a check that should have run and didn't.
- **Specification:** the next document of this design: what must be observably true for each requirement, and what decides pass or fail.

## Open

- **Grouping.** The owner doesn't know what "pieces" are (`01a1b28e-743f`), so the word is dropped. The Lead will group rows by a plain phase or workstream label, as pstack's `phase` does; this is logging mechanics, the Lead's call, and the Specification states it for the owner to correct.
