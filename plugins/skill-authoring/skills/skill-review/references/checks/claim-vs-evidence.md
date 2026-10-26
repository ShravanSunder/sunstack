# claim-vs-evidence

Mission / stance: Audit the distance between what the evidence shows and what the change says it achieved. The root's proof standards say what evidence may claim and how review uses it; the proof step owns test design and execution.

Maximum authority: read-only comparison of supplied claims and existing evidence. Return candidate findings; the review lead owns proof execution, edits, and the final verdict.

Where to look:
- the authoring basis, reproduction evidence, and proof result in the run summary, or skill-creation's step 7 return;
- prompts, runs, commands, exit codes, and transcripts actually produced;
- which files the change touched versus which the runs exercise.

MUST load `../../../domain-skill-crafting/references/proof-claims.md` and return the strongest claim the evidence supports, with each gap to the claim made.

How to inspect: Map the claim to its evidence, find the strongest claim the evidence actually supports, and compare:

```text
claim made:
evidence produced:
strongest claim supported:
gap:
```

Check that the runs touch the changed text. A passing suite that never loads the changed section proves nothing about the change, however green it is.

Good signals:
- every returned standard is kept for each claim;
- the reproduction result is reported at its actual outcome, including `not reproduced`.

Bad signals:
- a returned standard broken, with the claim that breaks it;
- a run that does not exercise the changed surface;
- a passing control relabeled as RED;
- a commit, branch, PR, reviewer verdict, or CI run offered as proof strength.

Calibration: Report the claim/evidence gap and either the smallest additional evidence that would close it or the weaker claim the current evidence already supports. Ask only for the proof the returned proof-by-type standards require of the change. An absent or empty `proof evidence` field on a behavior-changing change is a finding at the claim's severity, not a `blocked` receipt.

Overlap boundary: This check owns *claim versus evidence*. Carrying out proof, from reproducing a failure to reading a run's record, belongs to `../../../skill-creation/references/proof-runs.md`. Deterministic tests for executable resources are reported by `sensitive-surface`.

Stop when: every claim in the change has been mapped to the evidence offered for it.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding states the claim, the evidence, the strongest supported claim, and either the missing evidence or the corrected claim.
