# Capability through-lines: one named bucket from need to proof

Skill spec for one behavior change across four runs in `sunstack-dev`. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `1d0e8886`; it lands after #151 (design sets), which also changes `design-documents.md`. Branch `skills/capability-through-lines`.

## Targets and runs

| Run | Skill target | Files |
| --- | --- | --- |
| 1 | `discuss-pathfinding` | `references/user-requirements-extraction.md` (capability inventory and row field) |
| 2 | `spec-design` | `SKILL.md` (the Requirements source contract and the coverage return); `references/artifact-and-self-review.md` (organization and the through-line view) |
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
| D6 | **The through-line check.** Four-document review, and `spec-design`'s own coverage return, walk each capability from its `U` rows through `R`, trace rows and Verification Design rows. A capability that stops short is a gap, attributed to the document where it stops. The existing per-row coverage stays. | Makes the through-line checkable, not only navigable. |
| D7 | **Small sets stay flat.** When the whole set is one concern, there is no capability level and no forced buckets. One capability equals none. | Avoids taxonomy for its own sake. |
| D8 | **Non-goals:** no epic or story tree, no new identifier kind, no schema or registry, no renumbering of existing design sets, no change to what each document owns. | Hard cutover; existing contracts are kept. |

## Per-run surface allocation

| Run | Main path | Proof |
| --- | --- | --- |
| 1 | User-requirements extraction gains a capability inventory step (D1, D2, D7), and the row shape gains a `capability` field (D3, D4). The goal boundary carries the confirmed list. | P1, P4 |
| 2 | The Requirements source contract (`SKILL.md:141`) names the capability field. `artifact-and-self-review.md` organizes `R` by capability (D5) and adds the through-line view and the coverage return per capability (D6). | P2 |
| 3 | `design-documents.md` names the capability as the shared key across the four documents and the index (D5), and the one-home and position-free rules (D3, D4). | P2, P3 |
| 4 | `reviewing-four-document-design.md` adds the per-capability through-line check (D6). | P3 |

Triggers are unchanged.

## Authoring basis and proof plan

Basis: **user-directed intent**. Posture:
- P3 is a planned comparison against the prior revision;
- the others are example evidence;
- fresh Sol agents, realistic requests, checks written first, every record read by hand.

| Case | Setup | Must |
| --- | --- | --- |
| P1, extraction with three parts | An owner-interview transcript (fixture) describing a media library's import, sharing and retention needs | Name three capabilities in the owner's words, each with a purpose, as the first hypothesis; assign each `U` row exactly one; keep identifiers flat |
| P2, spec over capabilities | P1's confirmed Requirements | `R` grouped by capability; the through-line view per capability; the coverage return per capability |
| P3, broken through-line | A four-document set where one capability has `U` and `R` rows but no Verification Design rows | Review reports the capability-level gap at the Verification Design. Control: does the prior revision find it, or only per-row gaps? |
| P4, one concern | A small single-concern feature | No capability level |
| P5, a row serving two capabilities | A `U` row that matters to sharing and retention | One home plus "also serves"; no duplicate row |

Two runs per case, plus one prior-revision control for P3. Static: lib vitest, tsc and plugin validate.

## Coordination

- Worktree `/Users/shravansunder/dev/ai-tools.skills-capability-through-lines`.
- Implementation starts after #151 merges (shared file); the spec review can run now.
- Version: the next sunstack-dev minor at merge time.
- Opus Worker; Sol reviewers; Sol proof.

## Non-goals

D8.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1–4 | proposed | — |

## Review record

Pending: `skill-review` spec stage.
