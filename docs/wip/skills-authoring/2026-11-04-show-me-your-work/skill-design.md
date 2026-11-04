# Skill design: show-me-your-work

## Targets and runs

All in `plugins/sunstack-dev/skills/`. One PR for the four runs (one deliverable, the owner's default).

| Run | Target | What changes |
| --- | --- | --- |
| 1 | `practices-show-me-your-work` | New trigger, main path and depth: the record in the work trail, entry kinds, the stop list, Lead acceptance, the live page and its builder script. |
| 2 | `role-implementer` | A Sidekick writes its own entries as it works (`SKILL.md` methods line; `references/working-with-lead.md` "While you work" and "Hand back"). |
| 3 | `implement-plan` | Each classified surprise and each stand-in is an entry when it is found, not only at phase end (`SKILL.md` steps 4, 6 and 8; `references/execution-and-proof.md` "Stop or Correct" and "Report"). |
| 4 | `orchestrator-implementation-goal` | The Lead's assessment ends in a Lead acceptance entry; owner decisions go through decision pages the live page links to (`SKILL.md` delivery loop steps 1, 4 and the recording paragraph). |

Each run's surface allocation:

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | new description | rewritten | 3 new references, 1 revised, 1 retired; 1 script with tests | script tests; trigger trial; rule run; trial on this project's record |
| 2 | unchanged | one methods line | `working-with-lead.md` two sections | rule run; review |
| 3 | unchanged | steps 4, 6, 8 wording | `execution-and-proof.md` two sections | rule run; review |
| 4 | unchanged | delivery loop steps 1, 4 and the recording paragraph | none | rule run; review |

## Run 1: `practices-show-me-your-work`

### Trigger

Invocation: model-invocable and user-invocable. Agents must reach it unprompted at task start and at every stop, and other skills call it by name.

Description (194 characters):

> Use when a design, plan or implementation starts, runs or stops: recording what happened, a decision, assumption, design change or proof, or asked to show your work. Not for routine small edits.

### Main path

**Lens (opens `SKILL.md`):** Show me your work keeps the owner's picture of a running piece of work current. The record is the work trail: every agent writes what it did, decided, assumed, changed and proved, at the moment it happens, tied to the part of the design or plan it concerns. The owner reads one live page built from that record, and answers his decisions on their own pages.

Leading words: `work trail` (the owner's own term, Router U42), `single source of truth` (the page shows only the record).

**Route:**

1. **Open or resume.** Kept from today: load `practices-collaboration` for the project and thread, or the no-home gap. New: find the work's record (the project's work trail, filtered by the work's tag), read its history, and carry each open entry forward. The citations to `principle-verify-before-accepting` and `principle-build-the-shared-model-first` stay where they are.
2. **Record as it happens.** Inline, every run: the seven kinds; who; authority for every decision; the part of the design or plan; written by the agent that has the fact, when it has it; corrections as new entries that close by their first link; storage, ownership, contract and new technology never the agent's own call. Then: `MUST load references/record-entries.md and return the entry you are about to write, filled in its shape, and the command that writes it.`
3. **When an entry may stop the work.** `IF the entry is an assumption, a decision made without asking, or a design change, load references/stop-treatments.md and return the treatment that applies, the real case it matches, and the action it causes now.`
4. **Keep the owner's asks.** Kept from today, moved into the record: owner-ask entries with their state; compared at resume, each handback and before done. The citation to `principle-hold-the-scope` stays.
5. **Accept work (the Lead).** Inline: a Lead acceptance entry names the commit, each check read with its result, and what stays unverified; later work that touches it is recorded as reopening it.
6. **Show the owner.** At every checkpoint: `MUST load references/live-page.md and return the page path, the record position it shows, and the checker result.`
7. **Checkpoint at every stop.** Kept from today, plus: the page is rebuilt. The citation to `principle-write-for-the-reader` stays.

**Branches:** step 3 (an entry that may stop the work), and the no-home case in step 1: `IF that load returns no-home, or the work has no Router project, load references/no-board-trace.md and return the file you write entries to, or the exact gap.`

**Completion boundary:** not done while an action, decision, assumption, design change or proof from this stop is missing from the record; a decision lacks its authority; an open assumption is shown as decided; an owner ask is uncompared; or the page wasn't rebuilt from the record at this checkpoint.

### Call sites, in their forms

| Where | Form | Call |
| --- | --- | --- |
| Step 1 | load | `MUST load practices-collaboration and return the exact work thread reference and Router project, or no-home: <gap>.` (kept) |
| Step 1 | load | `IF that load returns no-home, or the work has no Router project, load references/no-board-trace.md and return the file you write entries to, or the exact gap.` |
| Step 2 | load | `MUST load references/record-entries.md and return the entry you are about to write, filled in its shape, and the command that writes it.` |
| Step 3 | load | `IF the entry is an assumption, a decision made without asking, or a design change, load references/stop-treatments.md and return the treatment that applies, the real case it matches, and the action it causes now.` |
| Step 6 | load | `MUST load references/live-page.md and return the page path, the record position it shows, and the checker result.` |
| Step 1, 4, 7 | citations | the three existing principle citations, unchanged |
| Write a log | load | `IF you write or delegate a log, load the destination repository's AGENTS.md and its use-*-logs skill and return the home and writer they allow.` (kept) |

### References

| Reference | Job | Called by, and returns | Taught from |
| --- | --- | --- | --- |
| `references/record-entries.md` (new) | The entry's shape: kinds, the tags (`who:`, `part:`, `core`, `state:`, `door:`), the text (first line is the entry; then authority and source), links, the first-link closure rule; the write command; good and bad entries; when to stop. It is the tool shape the builder reads: the builder names it and its tests check the shape. | Step 2; returns the filled entry and its command. | This project's 70 trial rows (Router project `01a1635f…`, tag `design-documents`); Router `crates/message-board/src/work_records.rs` (`WorkTrailRow`, `is_decision`); the owner's decisions. |
| `references/stop-treatments.md` (new) | The six treatments, how to tell them apart (what the choice changes, who has authority), each with its real case quoted: E01 eval store, E02 relay route, E03 F13 repair, E04 the paste hold, E05 resume-in-background, E09 the Markdown assumption; when to stop. | Step 3; returns the treatment, the matching case and the action. | The evidence report, memory-logs `skills/authoring/2026-11-03-show-me-your-work-evidence/report.md` §2–3; owner decision on the six treatments. |
| `references/live-page.md` (new) | What the page shows (the design or plan part by part, with entries beside each; what waits for the owner, linked to its decision page; decided; changed; proven; accepted; closed history; the Lead's view folded), the reach rule, where the page lives, how to build it (`scripts/build-live-page.ts`) and check it (the host's presentation-html checker), what good and bad look like; when to stop. | Step 6; returns the path, the position and the checker result. | The trial page and builder; the owner's decisions on views, reach and pages. |
| `references/no-board-trace.md` (revised) | No project yet: entries in the record-entries shape go to a memory-logs file for the work; once a project exists, the Lead writes them to the work trail and keeps the file as history. Writers and thread drop kept. | Step 1 branch; returns the file or the gap. | Today's reference; owner rule "memory log sare deisoisn and hsown work". |
| `references/markdown-view.md` (retired) | Removed: the live page replaces the on-request Markdown view. Old views and trails stay where they are as history. | — | — |
| `scripts/build-live-page.ts` (new), with `scripts/build-live-page.test.ts` | Reads the work's rows with `agent-collaboration work-trail show` (forward, paged to high water), writes one HTML page: one anchor per row, closure by first link only, reach by `core`, open assumptions never shown as decided. | Run by step 6 through `live-page.md`. | The trial builder (job tmp `smyw-trial/build-page.ts`), rewritten to the skill's shape. |

Shared shape: the entry shape. Owner: `references/record-entries.md`. Consumers: every agent that writes entries (runs 2 to 4 send them here) and the builder, whose tests validate it.

### The root's topics that apply

- `descriptions-and-invocation.md`: the description and the invocation decision.
- `main-path.md`: the lens, the route, the two branches and the completion boundary.
- `steering.md`: the bright line in obligation 8, with its rationalization ("it's unreleased, so the storage layout is reversible"), and each completion criterion.
- `calls-and-placement.md`: the call forms, the three new references, the retired one, and the entry shape's single home.
- `generalization.md`: the four rules and their transfer cases (in `specification.md`).
- `security.md`: the script and the taught write command (below).
- `proof-claims.md`: the proof posture (in `skill-verification.md`).
- `platform.md`: the version and changelog at ship.

### Sensitive surfaces

Recorded here, before any surface is outlined or written:

```text
sensitive surfaces:  scripts/build-live-page.ts (executes; spawns a subprocess);
                     the taught command agent-collaboration work-trail add (writes shared Router state);
                     the page written to memory-logs, outside the repository (home-level write)
entry points:        node scripts/build-live-page.ts <projectId> <workTag> <output.html> <title>;
                     agent-collaboration work-trail add, run by an agent recording an entry
untrusted inputs:    row text and tags written by other agents; the CLI's JSON output
privileged actions:  none beyond writing one HTML file to the path given and appending rows
third-party source:  none; the page links the Demistify v1 runtime from its CDN, as presentation-html pages already do
license / permission state: not applicable
copy-vs-adapt decision: not applicable
decision:            allowed
required proof:      deterministic tests for the script: HTML escaping of row text, first-link-only closure,
                     one anchor per row, paging to high water, reach by core, open assumptions never decided
public-safe constraints: entries and pages carry no secrets, credential paths or account data; shipped
                     skill text carries no home-cache path
review route:        skill-review design and implementation stages; no separate security scan requested
```

## Runs 2 to 4

- **Run 2, `role-implementer`.** `SKILL.md` methods: "MUST load `practices-show-me-your-work` and return the work's record and the part identifiers of your assignment." `working-with-lead.md` "While you work": write each action, decision with its authority, assumption, design change and proof as an entry as it happens; message the Lead only when it must act (kept). "Hand back": list the entries this assignment wrote.
- **Run 3, `implement-plan`.** Step 4: the stand-in is an entry (kept, now in the record). Step 6: each classified surprise is written as an entry when it is classified: a design break or plan defect as a design change, unnamed storage or new technology as an assumption waiting for the owner, corrected drift as an action. Step 8 and `execution-and-proof.md` "Report": the slice report names its entries.
- **Run 4, `orchestrator-implementation-goal`.** Delivery loop step 1: reversible calls are decision entries with their authority (kept, reworded). Step 4: the assessment ends in a Lead acceptance entry; a design break goes to the owner through `owner-decision-brief`, linked from the live page. The recording paragraph points at the record instead of listing what to log.

## Decisions table

Each row is a default with its reason; the owner may strike any row.

| # | Default | Reason |
| --- | --- | --- |
| D1 | The record is the Router work trail of the work's project. | Owner's 11 Oct design (U42) and his 3 Nov choice (row `01a1a1b7-2bce`). |
| D2 | Seven kinds: action, decision, assumption, design change, proof, Lead acceptance, owner ask. | The owner's questions (what happened, decided, assumed, changed, proven, locked) plus today's owner-asks list. |
| D3 | Tags: `who:owner|lead|sidekick`, `part:<id>`, `core`, `state:open|not-marked-wrong`, `door:two-way`; closure tags `resolves` and `supersedes`. | Trial convention, proven on this project's record; `decision` is Router's own register tag. |
| D4 | A closing entry's first link is the entry it closes; other links are authority or context. | Makes closure explicit; the component agent's review found generic links misread as closure. |
| D5 | Reach: changes or fills in the design or plan → owner's view; the rest → the Lead's view. | Owner decision (row `01a1a1b9-1df0`). The Jev importance rule is a later run. |
| D6 | Deciding is separate: the live page links to decision pages made with `owner-decision-brief`. | Lead assumption, logged (row `01a1a6ed-90a1`); the owner can strike it here. |
| D7 | The owner's main view is the design or plan, part by part, with entries beside each part. | Lead assumption, logged (row `01a1a6ed-9152`), from the owner's 4 Nov framing. |
| D8 | One live page per piece of work, built by a script at every checkpoint, written to the work's memory-logs project folder. | Owner decision on pages per deliverable; trails never go in product repositories. |
| D9 | `markdown-view.md` is retired, with no forwarding stub. | The live page replaces it; hard cutover. |
| D10 | No project yet: entries go to a memory-logs file in the same shape, then to the work trail. | Keeps one entry shape everywhere; the owner's memory-logs rule. |
| D11 | The script is TypeScript run by Node with type stripping, no dependencies, tests beside it with `node:test`. | Owner rules: TypeScript only; unit tests beside their module. |
| D12 | The stop list lives in this skill's `stop-treatments.md`, taught with its real cases. | Owner decision (row `01a1a1b9-20ae`); it governs what an entry does to the work. |
| D13 | Design-phase skills don't change in this set. | They already checkpoint through this skill; how design pages show entries is design documents phase one. |

## Coordination

- Base: worktree `/Users/shravansunder/dev/ai-tools.skills-design-documents-html`, branch `skills/design-documents-html` at `cbcaec0d` (= `origin/main`, 4 Nov). No pending edits.
- Version: `sunstack-dev` 2.103.0 → 2.104.0 at ship, in each manifest the platform topic names.
- Changelog: one dated entry under `docs/changelog/`, listed in its README.
- Inventory: `plugins/sunstack-dev/README.md` if it lists the skill's references.

## Run status

| Run | Status |
| --- | --- |
| 1 | proposed |
| 2 | proposed |
| 3 | proposed |
| 4 | proposed |

## Review record

None yet. The design review is `skill-review` at its design stage.
