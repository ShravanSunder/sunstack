# Practice skills cleanup: skill verification

Draft 1, by the 🦁 Lead, 2026-10-30. Part four: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification.

| Obligation | Route | Passing condition (a wrong change fails it) |
| --- | --- | --- |
| C1 descriptions | mechanical rules on Jev's run, plus review | all nine are 225 characters or less with an allowed opener; none warns or errors. A reader comparing old and new against the skill design's moments table finds every moment and boundary kept, or a dropped moment the Lead accepted in writing |
| C2 completions | source inventory, anchored disposition plus review | the receipt inventories every numbered workflow in the nine skills from source, including those the extractor selects nothing from (`practices-research`'s Ordered Workflow, `practices-manage-agents`' Hand off). Every step has a disposition at its line: a real missing or thin completion with its minimal repair, or a shown already-conforming boundary (the line where its done state stands), never a waiver. A numbered list that isn't a workflow is classified not applicable. Zero extracted pieces never closes a source workflow. Every added or changed completion carries its branch walk, and a reviewer can find no supported branch (read-only, missing input, chat-only, new path, narrow edit, denial, an exact-action owner grant) that it makes impossible to finish. A completion that names only an action fails |
| C3 other findings | anchored disposition plus review | each baseline finding and each new warning has a disposition at its line in the receipt: a real violation with its minimal repair, or a conforming or false-positive explanation quoting the standard. Absence from a later run is supporting evidence only. Text is never padded to clear a judged warning, and every uncertain piece has a recorded call |
| C4 no contract change | review: diff walk | no change to a skill's purpose, called skills, return, route tokens, or frontmatter other than the descriptions. The guarded sensitive skills lose none of their limits (skill design § Security): in `practices-cleanup`, an unauthorized outside-list removal still can't finish, the exact-action owner-grant branch still can, and an unknown or in-use target is still held. Checked by source reading, never by running a deletion |
| C5 general text | search of the diff | no repository command, machine path, run, session or PR number added |
| C6 the after-run | native `--check`, `--evidence`, then Jev, Lead-run | the harness is checked first (done before any edit: 12 rules, 177 pieces from nine homes). The Jev run covers all nine skills with no incomplete part and no skipped rule; 0 errors and no description warning; every remaining warning and uncertain piece has its recorded disposition. Report, exit code, usage and the text, kit and engine identities are kept. A later run over a subset is reported with its own scope |

## What stays unverified

- G4 trigger trials for the nine changed descriptions (the Luna route waits on the owner). This matters more here than in the phase cleanup, because these skills load on nearly every task; the review's old-against-new moment comparison is the stand-in.
- Judged-rule accuracy beyond tonight's labelled cases; the rules are warn-only.
- The owner's global instructions, outside this repository, name several of these skills; they load by name and are unaffected by the description text.
