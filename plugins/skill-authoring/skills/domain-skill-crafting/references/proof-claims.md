# Proof Claims

## Standards

Claims:

- A claim about behavior takes only the strongest rung its evidence supports: drafted from approved intent; observed in named examples; characterized with no claim of a difference; a difference shown for an approved representative case; a targeted improvement shown for that run (reproduced failure, then the fix passing); repeated fresh runs passing at the reported strength.
- Only a reproduced failure establishes the failing baseline; a result that is not reproduced, short of evidence or inconclusive shows neither that guidance is unneeded nor that the incident is fixed.
- Evidence from a representative case applies to that approved case, not automatically to the incident it stands for.
- Work drafted from user intent and not yet evaluated is reported as "drafted from user intent; behavior not yet evaluated".
- A failing baseline is never manufactured.
- A passing control shows the comparison found no added value; it doesn't by itself forbid authoring.
- A claim of improvement rests on a control: fresh runs of the prior revision on the same prompts and checks.
- The number of repetitions follows the run's randomness, the variance seen, the risk and the claim's strength; there is no universal count.
- Variance across repetitions is a proof gap.
- A rationalization seen in a run is evidence, recorded with its behavior risk, the smallest wording change and its retest.
- Static validation is structural proof only, never behavior proof.
- Review uses the proof that was shown and may challenge it; it never supplies missing proof.

Proof by skill type:

- A discipline skill's proof shows its rule holding under combined pressure, with the rationalizations rejected.
- A technique skill's proof shows the technique transferring to a fresh, similar task without handholding.
- A pattern skill's proof shows the pattern recognized, used, and withheld on counterexamples.
- A reference skill's proof shows the pointer reaching the right detail and the detail applied correctly.
- A mechanical or metadata change gets structural validation, and no invented pressure proof.

When a run counts:

- A run counts as evidence only when its agent is fresh, with no authoring history: a new subagent or session, never a fork or a resume.
- A run's request is realistic: it never shows the checks, never says it is a test, and never asks which skills or files the agent used.
- A trigger run's request never names the skill.
- A run's checks are written before it starts and kept outside every directory its agent works in.
- Each check is judged only against what the request asked.
- A run that broke before the agent did the work, such as a permission stop or a runtime failure, is not a skill failure; it is rerun.
- A check that needs the skill's body counts only when the run's record shows which copy the agent loaded.
- A trigger run records whether the skill was invoked and which installed revision offered its description.
- A run's actions are read from the host's record of the session, never from the agent's reply.
- Every run is read by hand.
- A run that can't meet these conditions, or a behavior no prompt can exercise, is reported as a named proof gap, never as a result.

## The ladder, as a lookup

Match the evidence in hand to its rung, and claim no higher:

```text
intent only                 -> drafted from approved intent
manual exercise             -> observed in named examples
baseline characterization   -> behavior characterized without delta claim
representative comparison   -> delta demonstrated for that approved case
reproduced RED -> GREEN      -> targeted improvement demonstrated for that run
repeated regression evidence-> repeated fresh runs of the same prompts and checks pass at reported strength
```

Pressure testing checks the craft; it is no substitute for a clear trigger, mental model, main path and references, and it is not what admits a draft written from approved intent. Carrying out a run, from reproducing a failure to reading its record, is a procedure kept by the skill that runs proof. This topic says only what a run's evidence may claim.

## Reading a claim

- Which rung does the claim name, and which evidence does it cite for it?
- Did that evidence come from runs that meet every condition above, and where is each run's record?
- Does an improvement claim have its control, run fresh on the same prompts and checks?
- Did the repetitions agree? If they varied, the wording isn't binding at the claimed strength.
- Is a static check, a validator pass or a review verdict standing in for behavior anywhere in the claim?
- What gap remains between the rung the evidence reaches and the claim being made?

## Depth by skill type

The pressures a discipline skill's proof combines include urgency, sunk cost, authority, fatigue, ambiguity and "this is obvious".

What a passing control may be exposing: native model behavior, a weak prompt, or a user preference.

## Recording a rationalization

```text
rationalization:
behavior risk:
smallest wording change:
retest:
```

The smallest wording change is often a main-body gate, a sharper pointer, a stronger completion criterion or branch-only detail.

## When to stop

Complete when the strongest claim the evidence supports is named, and every gap between it and the claim being made is stated. Return that claim, its evidence, and each gap.
