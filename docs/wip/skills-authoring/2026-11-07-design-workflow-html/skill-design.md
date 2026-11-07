# Skill design: the four-document design workflow as an HTML system

Draft, 7 Nov 2026; revised after the design review (DR-H1 to DR-H4, report in memory-logs `skills/authoring/2026-11-07-design-workflow-html/design-review/report.md`) and Demistify 1.20.0's release the same evening. Which skill changes where, in which order, under which root standards. Every target was read at main `bd571d78` in this worktree; the line-level evidence for each is in the Researcher's impact inventory (memory-logs `skills/authoring/2026-11-07-design-workflow-html/impact-inventory.md`, 147 quoted lines, sha256 a753ba18…).

## Targets and runs

Owner plugin: `sunstack-dev`. Each run names exactly one skill; a shared reference or test the run must change is named as that run's collateral, and keeps its single home. Order matters because each later run consumes the contract the earlier ones state.

| Run | Skill | Collateral | What changes | Obligations |
| --- | --- | --- | --- | --- |
| 1 | `orchestrator-design` | `shared-references/design-documents.md` | The contract: a document is a page; sections with stable IDs replace chunks as the unit; one home per fact; the set is a collection with a home page that is also the agent entry and carries the reading paths; the standard links and how they grow by phase; deliverables (below). "Keep the Markdown Complete" and "Humans Read the Page" go; "Put the Human Part First" stays, applied to sections; the worked set is rewritten as pages. In `orchestrator-design` itself, the design terminal gains the deliverable stage for work that has deliverables. | O1–O4, O6, O6a, O7, O7a–O7c, O8, O12 |
| 2 | `presentation-html` | `shared-references/diagram-rendering-and-fallbacks.md` | The medium: a design document is always an HTML page; "the page is the source", with inline islands for snippets and sections and `src` kept only for genuine external includes; a diagram lives in its section; freshness narrows to pages that include external files. In `presentation-html` (`SKILL.md` step 1, `engineering-documents.md`, `views.md`, `patterns.md`): authoring design pages instead of presenting Markdown; a view per fact; the standard-link pattern with its not-yet-written form; owner confirmations as choices; a deliverable page as a composed view; the released Map (1.20.0) as each page's navigation. | O1, O3–O6a, O7b, O9–O11 |
| 3 | `spec-design` | none | Requirements and Specification written as pages: the capability map as a tree; needs grouped as cards whose downstream links show "not yet written" until those documents exist; the Specification adds its need-to-obligation links both ways; pictures where the user's experience matters; the capability list and goal boundary confirmed on the page. The Requirements-only return writes the page with its links pending. | O1, O5, O6, O6a, O10 |
| 4 | `discuss-pathfinding` | none | `references/user-requirements-extraction.md`: the confirmed capability list goes onto the Requirements page's tree instead of "a nested Markdown list"; the confirmation is asked on the page. | O1, O10 |
| 5 | `program-design` | none | Program Design written as a page: a section per part; each trace row links back to its obligation and each obligation gains its link to its row. | O1, O5, O6a |
| 6 | `verification-design` | none | Verification Design written as a page: "proven by" cards and coverage rows, each linking back to its need and obligation, and each need gains its link to its proof. | O1, O5, O6a |
| 7 | `spec-program-review` | none | `references/lanes/artifact-navigation.md` checks pages by phase state: stable IDs; one home per fact; no page carrying a whole document; links pending only for documents not yet written; at a four-document review, every need links forward and every row back; a deliverable page states no fact of its own. | O2–O4, O6a, O7b |
| 8 | `docs-maintain` | none | Upkeep edits the section that owns a fact; an inline-authored page needs no regeneration; a reader built from external includes is regenerated as today. | O3, O9 |
| 9 | `plan-implementation` | `shared-references/canonical-implementation-plan.md`; `plan-implementation/README.md`; `tests/skills/lib/contracts/minimal-planning-delivery-contract.test.ts` (L56, L203) | A plan is a page: `plan path` names the plan's page; the plan page and its design page link to each other; a plan may be scoped to one deliverable's needs, given by the delivery cut. The contract test moves with the plan record, keeping its single-plan and authority checks. | O7, O7c |

Deferred, each one skill, admitted only when its condition holds:

| Run | Skill | Condition | What changes |
| --- | --- | --- | --- |
| 10 | `presentation-html` | Demistify releases a section that doesn't count stories, tried first with the Demistify Lead | sections with sticky headers on design pages; stories on a design's home page as an experiment |
| 11 | `orchestrator-design` | run 10 lands and `design-documents.md` must name the section form | the contract's line for sections, through `design-documents.md` |

Maintainer documentation (`docs/architecture/skill-system.md`, `plugins/sunstack-dev/docs/diagram-vocabulary.md`, the plugin README) is reconciled at ship, through `docs-maintain`, in the same change.

## Deliverables (O7a–O7c), taught by run 1

Owner: `orchestrator-design`'s design terminal, with the contract in `design-documents.md`. It runs only for work the owner has split into deliverables.

1. **Inputs.** The reviewed overall design (four pages, review `ready`) and the owner's delivery direction (his 2 and 4 Nov words: an overall design, then each deliverable as a design document plus a plan).
2. **The delivery cut.** The Lead writes, on the overall home page, each deliverable with the needs (U rows) it delivers and what it waits on, then asks the owner to confirm it on the page (O10). Nothing below starts before he confirms.
3. **The deliverable page.** For the first deliverable, `orchestrator-design` loads `presentation-html` to compose its page: the deliverable's needs and, through their standard links, its obligations, owners and paths, and proof rows, each linked or embedded from its home section. The page states no fact of its own. A fact only this deliverable needs, such as an order constraint between two of its needs, is written into the overall document that owns that kind of fact (a requirement in Requirements, an obligation in the Specification, a structure in Program Design) and reviewed there, then shown on the deliverable page by link.
4. **The plan.** `orchestrator-design` loads `plan-implementation` with the four reviewed identities and the deliverable's needs as its scope; the plan page and the deliverable page link to each other.
5. **Review basis.** The overall design keeps its four-document review; a fact added in step 3 goes through that document's phase and a refreshed review of the affected anchors; the deliverable page gets the navigation check (run 7) that it states nothing of its own; the plan goes through the planner's own owner gate.
6. **Completion.** The first deliverable has its confirmed place in the cut, its composed page and its plan page, linked both ways. The next deliverable's page and plan are written when its turn comes.

Worked case: a job-submission design whose owner confirmed two deliverables. Deliverable 1, "submit and run jobs", delivers U1–U4 (submission and scheduling); deliverable 2, "bill finished jobs", delivers U5–U6 and waits on deliverable 1. Both use the entity *Job* (the Specification's entities section) and the lease protocol (Program Design's lease section). Deliverable 1's page shows U1–U4's cards and, through their links, R1–R9, the submission API and lease sections, and their proof rows; *Job* and the lease are linked, never restated. R9 ("a job that ran twice is billed once") lives in the Specification's billing section and also serves scheduling; deliverable 1's page links it as "also serves" without restating it. An order constraint, "worker leases ship before resubmission", is written into Program Design's lease section and reviewed there, then linked from deliverable 1's page. Deliverable 2's page and plan wait until deliverable 1 lands.

## Surface allocation

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | unchanged | the design terminal's deliverable stage | `design-documents.md` (collateral) | static; review; the next real design with deliverables |
| 2 | unchanged | step 1's human-entry rule | three references; `diagram-rendering-and-fallbacks.md` (collateral) | static; review; the next real design |
| 3 | unchanged | step 9's artifact rule and the Requirements-only return | views table unchanged | static; the next real design |
| 4 | unchanged | none | the extraction reference | static; the next pathfinding run |
| 5 | unchanged | the artifact step | none | static; the next real design |
| 6 | unchanged | the write step | none | static; the next real design |
| 7 | unchanged | none | the navigation lane | static; the next design review |
| 8 | unchanged | the page-upkeep step | none | static |
| 9 | unchanged | the plan input (deliverable scope) | `canonical-implementation-plan.md` (collateral); the contract test | the test; static |

## Trigger

Invocation decision: unchanged for every target. No description changes: the change sits in bodies and references, and each skill still loads on the same situations (`domain-skill-crafting`'s descriptions topic).

## Main path, per run

- **Lens, runs 1–2:** *the page is the design.* A reader of that phrase can predict the route: write each fact once, in its section, in the view that suits it, and link to it from everywhere else. It replaces today's lens, *one Markdown source, two entries*.
- **Route:** each phase keeps its steps; only the artifact step changes, from "write the Markdown and let the page compose it" to "write the section on its page and add the links your rows earn". Order matters only where it does today (Requirements before Specification before Program Design before Verification Design).
- **Branches added:** a page that includes an external file keeps the embed route and its freshness check (run 2, condition: the page has an `src` include); work split into deliverables runs the deliverable stage (run 1, condition: the owner has split the work into deliverables).
- **Completion boundary, each phase:** the page passes the checker at its binding; every section the phase owns has a stable ID; every link to a document that exists resolves, and every link to one not yet written says so with no target; no fact is restated outside its home; the views the phase's table requires are present or returned as an exact gap. At the design terminal, every need links forward and every row back.

## Call sites

Unchanged in form: each phase keeps `MUST load ../../shared-references/design-documents.md` and its call into `diagram-rendering-and-fallbacks.md`. Changed: each call's returned result names the page and its section IDs instead of Markdown paths and `index.md`. New in `orchestrator-design`: at the design terminal, IF the owner has split the work into deliverables, load `presentation-html` to compose the first deliverable's page and return its path; then load `plan-implementation` with that deliverable's scope and return its plan page. `presentation-html` step 1's design-set branch loads `engineering-documents.md` for authoring, not presenting. No new reference, script or schema is added.

## References

| Reference | Its job | Caller and contract | Taught from |
| --- | --- | --- | --- |
| `design-documents.md` | what a design set is, where each fact lives, how pages link and how links grow, deliverables | every phase and `orchestrator-design`; returns identities as page paths with section IDs | the owner's words (owner-words Q003, Q049, Q050, Q004, Q040); today's identity, token and through-line rules, kept |
| `diagram-rendering-and-fallbacks.md` | the medium, island use, where a diagram lives, freshness | every phase and `presentation-html`; returns the medium and page proof | today's reference, with "the page is the source" in place of two entries |
| `engineering-documents.md` | how a design page and a deliverable page are composed | `presentation-html` step 1 on a design set; returns the pages, their sections and views | the prototypes of 7 Nov (evidence row `01a1b7ff-e6a6`) and the owner's requirement words |
| `canonical-implementation-plan.md` | the plan record | `plan-implementation`, `plan-update` and implementation callers; returns the plan page path and its scope | the owner's Q004 and Q046 |

## Root topics that apply

- **Change classes:** behavior-changing for every run (each alters a reference's rules or an artifact step).
- **Main path:** runs 1, 3, 5, 6, 8 and 9 change a step's wording and completion; run 1 adds the deliverable branch.
- **Calls and placement:** results of unchanged calls change (page paths, section IDs); one meaning per home holds when "Keep the Markdown Complete" goes from `design-documents.md` and its echo goes from `diagram-rendering-and-fallbacks.md` in the same change, with no forwarding stub; every collateral reference keeps its single home.
- **Steering:** the deletion test on every changed sentence before review; the lens is a leading phrase; each run's table row carries its owning skill.
- **Generalization:** the five standards in the specification, each with two transfer cases.
- **Proof claims:** drafted from user intent; behavior not yet evaluated.
- **Platform:** a sunstack-dev minor version and a changelog entry at ship.

## Sensitive surfaces

None in scope. No script, credential, write outside the repository or new third-party dependency is added. Pages keep the Demistify binding `presentation-html` already teaches.

## Decisions

Defaults taken, each with its reason; strike any row.

| # | Decision | Reason |
| --- | --- | --- |
| D1 | A design's text lives on its pages; no Markdown file holds the design. | The owner's decision (Q049, Q050, Q046 28–29 Oct; Q003 6 Nov), not a default. |
| D2 | Agents read the pages directly, finding sections by ID from the home page and the Map. | Default for the owner's question 1; the other answer, a read-out command rebuilt from each page and never edited, would need a new tool before shipping. |
| D3 | The standard forward and back links on every need; nothing added until the owner answers question 2. | The links are his decision (Q040, 31 Oct); B and C wait for his answer, B only as an experiment. |
| D4 | Plans become pages too (run 9). | His words name plans with designs (Q046 "hmtl for plan and deisgn files"; Q050; Q004). |
| D5 | skill-authoring's own design-set format stays out of this change. | It is a separate four-part workflow in another plugin (impact inventory, adjacent contracts); his 26 Oct words (Q051) point at changing it, as its own change. |
| D6 | Existing Markdown design sets stay readable; nothing is migrated; new sets are pages. | A hard cutover for authoring without rewriting accepted history. |
| D7 | Of the parts released in Demistify 1.20.0 (7 Nov), the Map comes in now as each design page's navigation (run 2); sections wait for a mode without a story count (deferred run 10); stories on a design's home page are an experiment there. | His two stages (Q008); a section on a design page reads "· 0" today because sections count stories (prototype, receipts.md). |
| D8 | Sections are the unit; a document spans more than one page only when today's split test passes for a capability. | Keeps the reader-and-reason split test, moved from files to pages. |
| D9 | One island per section's prose, never per document; Markdown in islands where it carries the text best. | His "markdown islaodns for snppets or secions" (Q050). |
| D10 | The home page is the agent entry; `index.md` goes. | Follows from D1 and D2. |
| D11 | Maintainer docs are reconciled in the same change. | One owner per fact, with no stale description of the model. |
| D12 | A deliverable's page is a composed view that states no fact; a fact only that deliverable needs is written into the overall document that owns its kind. | His 2 Nov direction accepted that day (Q022): the deliverable document zooms into and links the overall design, without a second full copy. |
| D13 | The delivery cut lives on the overall home page and the owner confirms it there before any deliverable page or plan is written. | It decides what each plan builds, which is his to confirm (O10). |

## Coordination

- Base: branch `skills/design-workflow-html` at main `bd571d78`.
- Pending edits: none in skill files; this design set only.
- Version and changelog at ship: sunstack-dev 2.107.0 → 2.108.0 in its manifests and the Claude marketplace entry; one dated changelog entry; cache refresh only if the owner scopes it.

## Run status

| Run | Status |
| --- | --- |
| 1–9 | proposed |
| 10–11 | deferred until their conditions hold |

## Review record

- Design review at `65634525`: targeted-revision, DR-H1 (blocker: runs named shared references, not skills), DR-H2 (no producer or teacher for deliverable pages), DR-H3 (links required before their targets exist), DR-H4 (O8 offered a removed alternative). All four verified by the Lead at their anchors and corrected in this revision: DR-H1 in the runs table; DR-H2 in O7a–O7c and the Deliverables section; DR-H3 in O6a, runs 3, 5–7 and the completion boundary; DR-H4 in O8. Next: the same review lead verifies the corrected anchors.
