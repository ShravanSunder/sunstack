# Capability through-lines: one named bucket from need to proof

Skill spec for one behavior change across four runs in `sunstack-dev`. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `1d0e8886`; it lands after #151 (design sets), which also changes `design-documents.md`. Branch `skills/capability-through-lines`.

## Targets and runs

| Run | Skill target | Files |
| --- | --- | --- |
| 1 | `discuss-pathfinding` | `references/user-requirements-extraction.md` (capability inventory and row field) |
| 2 | `spec-design` | `SKILL.md` (the Requirements source contract, and the Required Why/What Views table: a `capability map` row and capability grouping in the coverage-table row); `references/artifact-and-self-review.md` (organizing `R` by capability and applying those two views) |
| 3 | `orchestrator-design` (first loader of the design-set contract) | `shared-references/design-documents.md` (the capability as the shared key across the four documents and the index) |
| 4 | `spec-program-review` | `references/reviewing-four-document-design.md` (the per-capability through-line check) |

Run 3 lands on top of #151's design-set layout. Runs 2–4 depend on run 1's definition. All four land in one PR.

## Problem and evidence

- **Owner's words**, 2026-10-18, to the Lead directly: "ok i just realized user reuqiremnets specificaiton do they ahve a tree like buckets/ 1-3 heirhayc to help conception?" After the Lead's options (A: a shared capability level, at most three levels; B: stay flat; C: an epic tree), the owner wrote: "right i hink that helps fidn the throkugh lieks between requiremtns to spec to diffrent design docs no /". The Lead read this as a yes to A.
- **Current state** (read at `1d0e8886`):
  - Requirements rows are flat `U` rows, grouped only by user or stakeholder class (`spec-design/SKILL.md:141`; `user-requirements-extraction.md` "Construct Rows").
  - The Specification carries a lineage chain, U → E → P → O → R → C → V (`artifact-and-self-review.md:56`). Its organization "by journey, capability, protocol, domain, or decision" is optional and never named (`:32`).
  - Program Design has one trace row per `R`.
  - Verification Design has one row per `U`, linked to its `R` (`verification-design/SKILL.md:20`).
  - Four-document review walks each `U` through `R`, the trace row and the VD row (`reviewing-four-document-design.md:30`).
  - #151 splits large documents into chunk files by reader question and reason to change, which is in practice by capability, but the level has no name.
- **Gap:** no named level lets a reader confirm the system's parts before the rows, or lets review see that one part runs all the way from need to proof.

## Success definition

When an agent extracts Requirements or writes a design set larger than one concern, it first names the set's capabilities in the owner's words. Each capability is one part of the system a reader confirms as a unit, with a one-line purpose. Each `U` and `R` row then belongs to exactly one capability, and that capability is the shared key the Specification sections, the Program Design trace rows, the Verification Design rows and the index's reading paths use.

A reader can follow one capability from need to proof. Review checks each capability's through-line and reports a capability that stops short (for example, one with no Verification Design row) as a gap. Identifiers never encode the capability, so regrouping renumbers nothing. A small set that is one concern carries no capability level.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | **A capability** is a named part of the system that a reader confirms as a unit: the owner's word for it plus a one-line purpose, such as "retention: deleted media leaves when legal review allows". At most three levels: an optional *area* (only when there are more than about seven capabilities), then the capability, then the rows. Most sets use one level. | Owner: "tree like buckets / 1-3 hierarchy to help conception". Option C (an epic and story tree) was rejected. |
| D2 | **The capability list comes first.** Pathfinding states the list as its hypothesis and the owner confirms or corrects it inside the goal boundary, before the rows. `spec-design` shows it as the first Requirements and Specification view. | "to help conception": the buckets are confirmed before the detail. |
| D3 | **Identifiers stay position-free.** `U`, `E`, `R`, `C` and `V` identifiers never encode a capability; moving a row between capabilities changes no identifier. A capability is referenced by its name, a short lowercase key such as `retention`. | Avoids renumbering, the cost of C. |
| D4 | **One home per row.** Each `U` and `R` row belongs to exactly one capability. A row that serves another capability names it as "also serves". Entities (`E`) are set-level, shared by all capabilities. | One owner per truth; the Advisor's and #151's "each identity lives once". |
| D5 | **The shared key.** The Specification groups its `R` obligations by capability, as sections, or as #151 chunks when a split passes #151's test. Program Design trace rows and Verification Design rows carry, or group by, the capability of their `R` and `U`. The index's reading paths include one through-line per capability: need, then obligations, then owner and call path, then proof. | Owner: "helps find the through lines between requirements to spec to different design docs". |
| D6 | *Superseded by D6-r1 after spec review F1.* **The through-line check.** Four-document review, and `spec-design`'s own coverage return, walk each capability from its `U` rows through `R`, trace rows and Verification Design rows. A capability that stops short is a gap, attributed to the document where it stops. The existing per-row coverage stays. | Makes the through-line checkable, not only navigable. |
| D6-r1 | **Two horizons.** *Local, in `spec-design`:* the requirement coverage table groups its U/E/P/O/R/C/V links by capability. A capability whose home `U` rows reach no `R`, or an `R` with no home capability, is a local gap. `spec-design` never opens Program Design or Verification Design documents; in a fresh set they do not exist yet, and their absence is the next phases' work, not a gap. *Integrated, in four-document review only:* walk each capability from its `U` rows through `R`, trace rows and Verification Design rows; a capability that stops short is a gap attributed to the document where it stops, through the existing gap routing. The existing per-row checks stay in both. | Spec review F1: Specification authoring runs before the downstream documents exist (`orchestrator-design/SKILL.md:8`), and the integrated walk is already review's job (`reviewing-four-document-design.md:28`). |
| D7 | **Small sets stay flat.** When the whole set is one concern, there is no capability level and no forced buckets. One capability equals none. | Avoids taxonomy for its own sake. |
| D9 | **The view contract stays in its one owner.** `spec-design`'s Required Why/What Views table gains a `capability map` row. *Use when:* two or more capabilities exist (D7). *Must expose:* one map in the Requirements document and one in the Specification, each covering the whole capability set (never one map per capability) and shown before that document's other views; each capability's key, owner-worded name and one-line purpose, named by what users get and never by a component, owner or store; the optional area level only under D1's condition; in the Requirements map each capability's home `U` rows, in the Specification map its home `R` obligations; "also serves" links (D4). The `requirement coverage table` row gains: grouped by capability when the capability map fires. `artifact-and-self-review.md` teaches how to apply both views and restates neither predicate. | Spec review F2: that table is "the sole owner of view predicates, cardinality, and required semantic fields" (`spec-design/SKILL.md:275`). The component clause applies the table's existing rule that the first internal component crosses into `program-design`. |
| D8 | **Non-goals:** no epic or story tree, no new identifier kind, no schema or registry, no renumbering of existing design sets, no change to what each document owns. | Hard cutover; existing contracts are kept. |

## Per-run surface allocation

| Run | Main path | Proof |
| --- | --- | --- |
| 1 | User-requirements extraction gains a capability inventory step (D1, D2, D7), and the row shape gains a `capability` field (D3, D4). The goal boundary carries the confirmed list. | P1, P4 |
| 2 | The Requirements source contract (`SKILL.md:141`) names the capability field. The Required Why/What Views table gains the capability map row and the coverage-table grouping (D9). `artifact-and-self-review.md` organizes `R` by capability (D5) and teaches applying both views and the local coverage horizon (D6-r1). | P2, P4 |
| 3 | `design-documents.md` names the capability as the shared key across the four documents and the index (D5), and the one-home and position-free rules (D3, D4). | P6a, P6b, P3 |
| 4 | `reviewing-four-document-design.md` adds the integrated per-capability through-line check (D6-r1). | P3 |

Triggers are unchanged.

## Authoring basis and proof plan

Basis: **user-directed intent**. Posture:
- P3 is a planned comparison against the prior revision;
- the others are example evidence;
- fresh Sol agents, realistic requests, checks written first, every record read by hand.

| Case | Setup | Must |
| --- | --- | --- |
| P1, extraction with three parts, owner in the loop | A two-turn session. Turn 1: the owner, with an interview transcript fixture (a media library's import, sharing and retention needs) as their earlier conversation, asks for the Requirements. Turn 2: a scripted owner reply, written before the run, that corrects the hypothesis by renaming one capability and moving one need into another. The Lead delivers turn 2 as the owner; any other question the agent asks is answered from the fixture, and the answer is recorded verbatim. | Turn 1 states three capabilities in the owner's words, each with a purpose, and stops for confirmation before any `U` row. After turn 2, every row uses the corrected list, each `U` has exactly one home, and identifiers stay flat. Judged from the action record in order (hypothesis, stop, owner reply, rows), not from the finished artifact. |
| P2, Specification over capabilities | P1's confirmed Requirements only | The capability map first; `R` grouped by capability; the coverage table grouped by capability with local gaps only. No Program Design or Verification Design content invented, and their absence not reported as a gap. |
| P3, broken through-line | A four-document set where one capability has `U` and `R` rows but no Verification Design rows | Review reports the capability-level gap at the Verification Design. Control: does the prior revision find it, or only per-row gaps? |
| P4, one concern | A small single-concern feature, through extraction and Specification | No capability level and no capability map |
| P5, a revision that regroups | An existing Requirements set with capabilities; the owner says one `U` row also matters to retention and another belongs in retention | One home plus "also serves" for the first; the moved row keeps its identifier; no duplicate row |
| P6a, Program Design producer | A fixture Requirements and Specification with three capabilities in a #151 indexed set, including one `R` that also serves a second capability | Trace rows carry or group by their `R`'s home capability; the shared `R` has one trace row; the index extends each capability's reading path to owner and call path; #151's split and one-home rules hold |
| P6b, Verification Design producer | The same set plus a fixture Program Design | Verification Design rows carry or group by their `U`'s home capability; shared observations stay shared; the index extends each reading path to proof |

Two runs per case, plus one prior-revision control for P3. Each run is a fresh agent that loads the intended skill copy, with checks withheld; the action records are read by hand. Static: lib vitest, tsc and plugin validate.

Named gaps: the optional area level (more than about seven capabilities) has no case; regrouping is exercised only at the Requirements level (P5), not inside the Specification or the downstream documents.

## Coordination

- Worktree `/Users/shravansunder/dev/ai-tools.skills-capability-through-lines`.
- Implementation starts after #151 merges (shared file); the spec review can run now.
- Version: the next sunstack-dev minor at merge time, with a dated changelog entry indexed in `docs/changelog/README.md`. Codex, Claude and Cursor cache refresh is reported as not run unless the owner asks for it.
- Opus Worker; Sol reviewers; Sol proof.

## Non-goals

D8.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 | implemented | `05c069ed`, author self-check fixes `03d726cb` |
| 2 | implemented | `064bffc5`, author self-check fixes `03d726cb`, implementation review F1 `98dcf6b0` (artifact chain) and F2 `8ddb89fb` (Requirements-only map) |
| 3 | implemented | `197f59e8`, author self-check fixes `03d726cb` |
| 4 | implemented | `b9668624`, author self-check fixes `03d726cb`, implementation review F1 `98dcf6b0` (through-line walk) |

## Review record

- Spec review 1 at `1a9419a9`: `targeted-revision`, revise first; F1–F4 accepted, all important (`/private/tmp/2026-10-capability-through-lines/spec-review/spec-review.md`). This revision answers F1 with D6-r1, F2 with D9 and the Run 2 allocation, F3 with P1's two-turn owner setup, and F4 with P6a and P6b. It goes back to the same review lead.
- Correction round 2 at `91d640bf`: F1–F4 closed; F5 accepted (D9's "one view per set" contradicted D2's map in both documents). D9 now gives one map per document, each covering the whole set (`/private/tmp/2026-10-capability-through-lines/spec-review/spec-review-r2.md`).
- Correction round 3 at `71ce7973`: F5 closed; open findings 4 → 1 → 0. Verdict `great`, `accepted-to-implement` (`/private/tmp/2026-10-capability-through-lines/spec-review/spec-review-r3.md`).
