# Step 5 skill fixes: skill verification

Draft 1, by the 🦁 Lead, 2026-10-31 04:29 EDT. Part four: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification.

| Obligation | Route | Passing condition (a wrong change fails it) |
| --- | --- | --- |
| C1 descriptions | mechanical rules (length, opener) on the keyed run; judged `trigger-only` and `loading-moment`; review | every rewritten description is 225 characters or less with an allowed opener; none warns; a reader comparing old and new finds the same loading moment and boundary and no content inventory |
| C2 completions | anchored disposition plus review | every listed step has a disposition at its line: a completion naming an observable result and its legwork, or a merge; a completion that names only an action fails review; no D4-held step changed (diff walk against the D4 list) |
| C3 branches, teaching, calls | anchored disposition plus review | each listed branch names something visible in the work and keeps its target and return; each teaching section gains the missing element; each call says what comes back; text is never padded to clear a judged warning |
| C4 dispositions | review of the receipt | every finding in the run's list appears with its disposition; an absence from the after-run is supporting evidence only |
| C5 no contract change | review: diff walk | no change to a skill's purpose, called skills, return, route tokens, marked standard or `rules/` file |
| C6 general text | search of the diff | no repository command, machine path, run, session or PR number added |
| C7 the after-run | Lead-run keyed rules over the run's skills on the signed engine | no incomplete part, no skipped rule; 0 errors and no description warning in the run's skills; every remaining listed finding has its disposition; report, exit code, usage and text, kit and engine identities kept |

## What stays unverified

- **Description trigger trials:** `not applicable` for hidden skills (domain-skill-crafting, the principles); a named gap for model-invocable skills (P4).
- **Judged-rule accuracy:** beyond the labelled cases; the judged rules are warn-only.
- **The 81 D4-held steps:** until the owner decides.
