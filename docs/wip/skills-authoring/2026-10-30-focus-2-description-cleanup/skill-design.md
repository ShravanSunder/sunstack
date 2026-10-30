# Focus 2 description cleanup: skill design

Draft 1, by the 🦁 Lead, 2026-10-30. Part three: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md).

## Security

Decided by the 🦁 Lead before the outline: the change edits fourteen description lines only. It adds no command, script, network call, credential, file write or trust boundary, and changes no skill body, so no guard or limit in any skill can loosen. The check harness is #172's own kit config, run read-only. Decision: allowed.

## How to shorten

Cut in this order, and stop when the description fits 100–200 characters (never over 225): quoted example phrases; enumerations that the moment's own noun covers; restated parentheticals; workflow summary (the trigger-only warning). Keep every loading moment below and the named neighbour in each boundary. The writer follows `skill-authoring:skill-creation`, one commit per skill, in this order: the five over 300, then the two trigger-only, then the rest.

## Descriptions: what each must keep

| Skill (chars) | Moments to keep | Boundary |
| --- | --- | --- |
| `verification-design` (450) | planning how a design's requirements will be proven (reference, target, passing condition, what stays unverified); after Program Design, or when that plan is missing or stale | not observing or challenging a delivered claim (`practices-verification`), building journeys (`practices-verification-maintenance`), or regression tests. Lead-accepted exception: the shipped text names the second neighbour by its activity only ("building journeys"); keeping both names with every moment needs 246 characters |
| `plan-implementation` (342) | writing the first implementation plan from a reviewed four-document design, an admitted improvement finding, or a direct planning request | not changing a plan during delivery (`plan-update`) or audit-only discovery (`plan-improve-repo`) |
| `orchestrator-design` (311; trigger-only) | asked to run, resume or finish one design cycle. What the cycle contains (the four documents, their review, the first plan) is workflow, not a moment; the after-run's trigger-only warning showed it, and the Lead dropped it | not one direct design phase, changing a plan during delivery, implementation delivery, or PR work |
| `plan-update` (310) | a ready plan's meaning must change during delivery (a design correction, a plan defect, a slice split or merge, a changed dependency or proof target, a PR re-split) | not the first plan (`plan-implementation`) or choices inside one slice (`implement-plan`) |
| `spec-program-review` (307) | independently reviewing a Specification, Program Design or the four-document set, including readability; deciding whether a spec-only or program-only change needs review | not implementation review |
| `principle-write-for-the-reader` (278) | writing a design, code, instruction or explanation someone else must follow | the second sentence teaches the principle and is not a trigger; it goes |
| `practices-verification` (283) | checking whether a declared behavior works on its target; challenging whether proposed proof can establish it; building or maintaining an assigned verification driver | not delivery acceptance, general code review, root-cause investigation or product repairs |
| `program-design` (277) | defining or revising structural How: binding Specification entities to owners, homes and schemas; components, interfaces, state, flows, failure, trust boundaries, proof seams | not what entities mean or other Why/What (`spec-design`) |
| `implement-plan` (256) | executing or continuing one ready plan whose delivery context authorizes implementation; correcting the implementation-owned findings of one review | not plan or design defects, independent review, or PR work |
| `discuss-pathfinding` (249) | requirements, needs, domain terms, tacit process or owner tolerances are unwritten and must be drawn out of someone's head ("grill me", "interview me") | not authoring from settled sources |
| `implementation-review` (242) | independently reviewing implemented code, proof, a diff, commit, PR head or one bounded remediation before PR readiness, including when governing inputs are missing or conflicting | not design review (`spec-program-review`) |
| `practices-verification-maintenance` (236) | creating or maintaining a project's verification skill, its journeys and drivers | not one ordinary verification run, a driver-only task without a project-skill target, product repairs or delivery acceptance |
| `spec-design` (230) | authoring or revising Requirements from settled meaning, or a Specification's obligations, entities and coverage views | not eliciting unwritten owner meaning (`discuss-pathfinding`) |
| `orchestrator-implementation-goal` (192; trigger-only) | starting, resuming, auditing or completing an implementation delivery goal | not a design-only cycle or one direct phase; drop the workflow summary ("across planning, implementation, review and PR readiness") only if that clears the warning without losing a moment |

## Running the rules here

#172 carries #171's kit, so checks use its own config (`plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json`) with the native engine C2: `--check`, then `--evidence skill` for the fourteen, then the Lead's Jev run. Nothing of the harness is committed.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| P1 | Descriptions only this slice | The hard failures (five over 300) and every description warning fit before 05:00 with the full review; the 46 body findings need their own branch walks and inventory |
| P2 | Land on #172 itself | One owner per file; #172 changes these skills |
| P3 | No separate Advisor validation for this slice | The same description pattern (moments table, examples first, return a lost moment) was validated twice tonight (phases, practices); the independent review still runs. Recorded as a process choice, reversible |
| P4 | Trigger trials (G4) stay a named gap | The Luna route waits on the owner |
