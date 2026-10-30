# Phase skills cleanup: skill verification

Draft 1, by the 🦁 Lead, 2026-10-30. Part four: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification.

| Obligation | Route | Passing condition (a wrong change fails it) |
| --- | --- | --- |
| C1 descriptions | mechanical rules K001-K003 on Jev's run | the three rewritten descriptions are 225 characters or less with an allowed opener; none of the seven warns; a reader comparing old and new finds the same loading moment and boundary |
| C2 completions | anchored disposition plus review | every step the baseline flagged has a disposition at its line in the receipt: a real missing or thin completion with its minimal repair (a completion added, or the step merged into the one it serves), or a shown already-conforming boundary (the step's done state is stated where it is checked); an unchanged step needs that shown boundary, never a waiver; a completion that names only an action fails review |
| C3 other findings | anchored disposition plus review | each baseline finding and each new warning has a disposition at its line in the receipt: a real violation of the standard with its minimal repair, or a conforming or false-positive explanation quoting the standard; a finding's absence from the after-run is supporting evidence only, never the disposition; text is never padded to clear a judged warning; every uncertain piece has a recorded call |
| C4 no contract change | review: diff walk | no change to a skill's purpose, called skills, return, route tokens or frontmatter other than the three descriptions |
| C5 general text | search of the diff | no repository command, machine path, run, session or PR number added |
| C6 the after-run | native `--check`, `--evidence`, then Jev, Lead-run | the throwaway config is checked first (`--check` assembles all twelve rules; `--evidence` picks pieces from all seven skill homes in this worktree's root); the Jev run covers all seven skills with no incomplete part and no skipped rule; 0 errors and no description warning; every remaining warning and uncertain piece has its recorded disposition (a complete report may keep explained warnings and uncertain pieces); report, exit code, usage and the text, kit and engine identities are kept |

## What stays unverified

- G4 trigger trials for the three changed descriptions (the Luna route waits on the owner).
- Judged-rule accuracy beyond tonight's labelled cases; the rules are warn-only.
- The other seven phase skills (their cleanup is #172's).
