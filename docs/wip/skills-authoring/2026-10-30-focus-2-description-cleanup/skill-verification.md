# Focus 2 description cleanup: skill verification

Draft 1, by the 🦁 Lead, 2026-10-30. Part four: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification.

| Obligation | Route | Passing condition (a wrong change fails it) |
| --- | --- | --- |
| C1 descriptions | mechanical rules on Jev, plus review | all fourteen are 225 characters or less with an allowed opener; none errors or warns on length or trigger-only. A reader comparing old and new against the moments table finds every moment and named boundary kept, or a dropped moment the Lead accepted in writing |
| C2 description only | diff walk | the diff touches only the fourteen `description:` lines (plus this design set, the changelog and nothing else) |
| C3 general text | search of the diff | no repository command, machine path, run, session or PR number added |
| C4 the after-run | native `--check`, `--evidence skill`, then Jev, Lead-run | complete over the fourteen skills, no skipped rule; 0 errors, no description warning; body findings may remain and are not claimed fixed |

## What stays unverified

- G4 trigger trials for the fourteen descriptions (the Luna route waits on the owner).
- The 46 body and reference findings, left for the next slice.
