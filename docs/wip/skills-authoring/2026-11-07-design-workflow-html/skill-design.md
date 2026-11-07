# Skill design: the four-document design workflow as an HTML system

Draft, 7 Nov 2026. Which skill changes where, in which order, under which root standards. Every target was read at main `bd571d78` in this worktree; the line-level evidence for each is in the Researcher's impact inventory (memory-logs `skills/authoring/2026-11-07-design-workflow-html/impact-inventory.md`, 147 quoted lines, sha256 a753ba18…).

## Targets and runs

Owner plugin: `sunstack-dev`. One run per target, in this order, because each later run consumes the contract the earlier ones state.

| Run | Target | What changes | Obligations |
| --- | --- | --- | --- |
| 1 | `shared-references/design-documents.md` | The contract: a document is a page; sections with stable IDs replace chunks as the unit; one home per fact; the set is a collection (home page, a page per document, a plan page; an overall design and per-deliverable design and plan pages); the home page is the agent entry and carries the reading paths; the standard forward and back links. "Keep the Markdown Complete" and "Humans Read the Page" go; "Put the Human Part First" stays, applied to sections. The worked set is rewritten as pages. | O1–O4, O6, O7, O8, O12 |
| 2 | `shared-references/diagram-rendering-and-fallbacks.md` | The medium: a design document is always an HTML page; "Two Entries Over One Source" becomes "the page is the source", with inline islands for snippets and sections and `src` kept only for genuine external includes; a diagram lives in its section; freshness on edit narrows to pages that include external files. Markdown alone stays for artifacts only agents read. | O1, O4, O5, O9 |
| 3 | `presentation-html` (`references/engineering-documents.md`, `views.md`, `patterns.md`; the human-entry rule in `SKILL.md` step 1) | From presenting an existing Markdown set to authoring design pages: sections and IDs, a view per fact, the through-line link pattern, owner confirmations as choices, a home page that opens on what needs the owner. `demistify.md` already keeps unreleased parts out and stays. | O3, O5, O6, O10, O11 |
| 4 | `spec-design` | Requirements and Specification are written as pages: the capability map as a tree; needs grouped as cards carrying the standard forward links; pictures where the user's experience matters; the capability list and goal boundary confirmed on the page. The Requirements-only early return writes the page. | O1, O5, O6, O10 |
| 5 | `discuss-pathfinding` (`references/user-requirements-extraction.md`) | The confirmed capability list goes onto the Requirements page's tree instead of "a nested Markdown list"; the owner's confirmation is asked on the page. | O1, O10 |
| 6 | `program-design` | Program Design is written as a page: a section per part, each trace row linking back to its obligation. | O1, O5, O6 |
| 7 | `verification-design` | Verification Design is written as a page: "proven by" cards and coverage rows, each linking back to its need and obligation. | O1, O5, O6 |
| 8 | `spec-program-review` (`references/lanes/artifact-navigation.md`) | The navigation lane checks pages: every section has a stable ID, each fact has one home, no page carries a whole document as one island, every need's links resolve both ways, and the home page lists every section. | O2–O4, O6 |
| 9 | `docs-maintain` | Upkeep edits the section that owns a fact; a page authored inline needs no regeneration; a reader built from external includes is regenerated as today. | O3, O9 |
| 10 | `shared-references/canonical-implementation-plan.md` | A plan is a page: `plan path` names the plan's page; the plan page and its design page link to each other. `tests/skills/lib/contracts/minimal-planning-delivery-contract.test.ts` (L56, L203) moves with it, keeping its single-plan and authority checks. | O7 |
| 11 | phase two, after Demistify's release | Sections without a story count, the Map as navigation and through-line, and story-shaped home pages enter runs 1–3 only once the released guide documents them; each is first tried with the Demistify Lead. Proposed now, written later. | O11, and C if the owner chooses it |

Maintainer documentation (`docs/architecture/skill-system.md`, `plugins/sunstack-dev/docs/diagram-vocabulary.md`, the plugin README, `plan-implementation/README.md`) is reconciled at ship, through `docs-maintain`, in the same change.

## Surface allocation

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | unchanged | (shared reference: no `SKILL.md`) | the reference's sections | static; review; the next real design |
| 2 | unchanged | (shared reference) | the reference's sections | static; review |
| 3 | unchanged | step 1's human-entry rule | three references | static; review; the next real design |
| 4 | unchanged | step 9's artifact rule and the Requirements-only return | views table unchanged | static; the next real design |
| 5 | unchanged | none | the extraction reference | static; the next pathfinding run |
| 6 | unchanged | the artifact step | none | static; the next real design |
| 7 | unchanged | the write step | none | static; the next real design |
| 8 | unchanged | none | the navigation lane | static; the next design review |
| 9 | unchanged | the page-upkeep step | none | static |
| 10 | unchanged | (shared reference) | the plan record; the contract test | the test; static |
| 11 | unchanged | as runs 1–3 | as runs 1–3 | after release |

## Trigger

Invocation decision: unchanged for every target. No description changes: the change sits in bodies and references, and each skill still loads on the same situations (`domain-skill-crafting`'s descriptions topic).

## Main path, per run

- **Lens, runs 1–3:** *the page is the design.* A reader of that phrase can predict the route: write each fact once, in its section, in the view that suits it, and link to it from everywhere else. It replaces today's lens, *one Markdown source, two entries*.
- **Route:** each phase keeps its steps; only the artifact step changes, from "write the Markdown and let the page compose it" to "write the section on its page". Order matters only where it does today (Requirements before Specification before Program Design before Verification Design).
- **Branches added:** a page that includes an external file (an imported diagram or a legacy Markdown document) keeps the embed route and its freshness check (run 2); a set with deliverables gets per-deliverable design and plan pages (runs 1, 10). Each names its observable condition.
- **Completion boundary, each phase:** the page passes the checker at its binding; every section the phase owns has a stable ID; every link the phase writes resolves; no fact is restated outside its home; the views the phase's table requires are present or returned as an exact gap.

## Call sites

Unchanged in form: each phase keeps `MUST load ../../shared-references/design-documents.md` and its call into `diagram-rendering-and-fallbacks.md`; `orchestrator-design` keeps its calls. Changed: each call's returned result names the page and its section IDs instead of Markdown paths and `index.md`. `presentation-html` step 1's design-set branch loads `engineering-documents.md` for authoring, not presenting. No new reference, script or schema is added.

## References

| Reference | Its job | Caller and contract | Taught from |
| --- | --- | --- | --- |
| `design-documents.md` | what a design set is, where each fact lives, how pages link | every phase and `orchestrator-design`; returns identities as page paths with section IDs | the owner's words (owner-words Q003, Q049, Q050, Q004, Q040); today's identity and token rules, kept |
| `diagram-rendering-and-fallbacks.md` | the medium, island use, where a diagram lives, freshness | every phase and `presentation-html`; returns the medium and page proof | today's reference, with "the page is the source" in place of two entries |
| `engineering-documents.md` | how a design page is composed | `presentation-html` step 1 on a design set; returns the pages, their sections and views | the prototypes of 7 Nov (memory-logs evidence row `01a1b7ff-e6a6`) and the owner's requirement words |
| `canonical-implementation-plan.md` | the plan record | `plan-implementation`, `plan-update` and implementation callers; returns the plan page path | the owner's Q004 and Q046 |

## Root topics that apply

- **Change classes:** behavior-changing for every run (each alters a reference's rules or an artifact step).
- **Main path:** runs 3–7 and 9 change an artifact step's wording and completion.
- **Calls and placement:** results of unchanged calls change (page paths, section IDs); one meaning per home holds when "Keep the Markdown Complete" goes from `design-documents.md` and its echo goes from `diagram-rendering-and-fallbacks.md` in the same change, with no forwarding stub.
- **Steering:** the deletion test on every changed sentence before review; the lens is a leading phrase.
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
| D2 | Agents read the pages directly, finding sections by ID from the home page. | Default for the owner's question 1; a read-out command would need a new tool before shipping. |
| D3 | The standard forward and back links on every need; nothing added until the owner answers question 2. | The links are his decision (Q040, 31 Oct); B and C wait for his answer, B only as an experiment. |
| D4 | Plans become pages too (run 10). | His words name plans with designs (Q046 "hmtl for plan and deisgn files"; Q050; Q004). |
| D5 | skill-authoring's own design-set format stays out of this change. | It is a separate four-part workflow in another plugin (impact inventory, adjacent contracts); his 26 Oct words (Q051) point at changing it, as its own change. |
| D6 | Existing Markdown design sets stay readable; nothing is migrated; new sets are pages. | A hard cutover for authoring without rewriting accepted history. |
| D7 | The new Demistify parts enter only after their release (run 11). | His two stages (Q008); PR #141 is merged but not released (hosted 1.19.0). |
| D8 | Sections are the unit; a document spans more than one page only when today's split test passes for a capability. | Keeps the reader-and-reason split test, moved from files to pages. |
| D9 | One island per section's prose, never per document; Markdown in islands where it carries the text best. | His "markdown islaodns for snppets or secions" (Q050). |
| D10 | The home page is the agent entry; `index.md` goes. | Follows from D1 and D2. |
| D11 | Maintainer docs are reconciled in the same change. | One owner per fact, with no stale description of the model. |

## Coordination

- Base: branch `skills/design-workflow-html` at main `bd571d78`.
- Pending edits: none in skill files; this design set only.
- Version and changelog at ship: sunstack-dev 2.107.0 → 2.108.0 in its manifests and the Claude marketplace entry; one dated changelog entry; cache refresh only if the owner scopes it.

## Run status

| Run | Status |
| --- | --- |
| 1–10 | proposed |
| 11 | proposed; written after Demistify's release |

## Review record

Not yet reviewed. Next: `skill-review`'s design stage, after the owner's answers are folded in.
