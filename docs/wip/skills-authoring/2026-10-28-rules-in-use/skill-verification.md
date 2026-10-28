# Rules in use: skill verification

Draft 2, by the 🦁 Lead, 2026-10-28. Part four of the design set: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. Routes were decided with `skill-rules/references/decision-matrix.md`. Every judgment below runs on Jev and every agent run on Luna; no test runs on Opus.

| Obligation | Route, and the property it was decided on | Passing condition (a wrong build fails it) |
| --- | --- | --- |
| G1 openers | mechanical: a literal prefix of one field | each of the four openers passes and `Use for` warns in the engine's report; a rule that passes `Use for`, or warns on `Trigger when`, fails |
| G2 length | mechanical, at the edges | 225 characters pass and 226 warn; 300 pass the limit and 301 fail it as `error`; the old 1,024 rule is gone from every RuleSet |
| G3 description judgments | judged decision models on the `description` field | the recorded requests carry the exact description as the target; a finding's anchor is the field's span; `always-earned` sends no verdict request for a description that doesn't open with `Always` |
| G4 trigger trial | eval: only a fresh run observes routing | per changed model-visible description: the true prompt loads it and the near miss doesn't, each in a fresh Luna session, isolated from this repository's design files; the hidden root records `not applicable` |
| G5 #171's descriptions | mechanical (G1, G2) plus G4 | all seven at 225 characters or less with an allowed opener; G4 holds for the six visible ones |
| G6 L1 | review check: placement | the sentence is in `calls-and-placement.md`'s standards, and the shared-shape caller returns the test of the consumed representation |
| G7 markers | review check plus the engine's check | the marked set equals the matrix's rule outcomes, each unready one returned with its reason; `check_rules` assembles every rule with no target or key; no review, eval or prose standard is marked |
| G8 decision models | judged run on known cases | three units in one skill file with different gate answers: the eligible one gets a verdict request, the others end `dropped` with their gate answers. Of two eligible units, the one meeting the standard ends `dropped` at the verdict and the one failing it ends `finding`. The hosted run's development cases: a local instruction is dropped by `rule.generalization`'s gate; a lookup subsection is dropped by `reference.teaching-depth`'s; a complete call read with its step passes. A build that judges a dropped unit, or reports `dropped` as `pass`, fails |
| G9 severities | mechanical: literal fields | only the 300 limit is `error` |
| G10 the runner | the runner's own tests, plus a real run | tests: the default scope covers every plugin's skills; a run with a key reaches the scripted local judge and every RuleSet is evaluated; a run without a key reports the engine's refusal as the run's state; no saved file contains a credential; the check runs with no target file. Real run: Jev over #171's skills completes, and the printed usage matches the engine's report. Typecheck covers the `.mts`. A runner that deletes the key, names an endpoint, evaluates only some RuleSets or binds a stand-in file fails |
| G11 the reading | review check: source walks from each site | walks from each of the four sites resolve `running-rules.md` and reach their returns with: an `error` fixed first; a judged finding as a candidate; `dropped` as not applying; every uncertain, unresolved, not processed, refused or incomplete result as a gap. No site says `pending` |
| G12 the four sites | review check plus the consumer run (G15) | the walks above, and the consumer run's records show each site ran the runner |
| G13 the eval teaching | review check: the procedure | `check-and-reports.md` names real-source examples, labels, grouping by source document, a development and held-out split, a frozen threshold, and the three error counts, all through `score_eval`; no state, store or procedure beside it |
| G14 the eval done | eval through `score_eval` | per judged rule: a frozen labeled case set, its held-out report (misses, wrong calls, unknowns), kept beside the rules |
| G15 consumer run | eval: an agent's work in a fresh session | the run's records show each step ran the runner on the right files with Jev on; the planted 301-character description is caught as `error` and fixed before the step completes; judged findings appear as candidates; nothing reports a pass for a rule that didn't run; every test in it ran on Luna or Jev |
| G16 general text | review check plus each run's search | a search of every changed skill file finds no repository command, machine path, cache path, project unit, run, session or pull request number |

## Proof plan

- **Basis:** user-directed intent for every run, with observed failures as evidence. Claim before G15: drafted from user intent, checked structurally and on named cases.
- **Run 0:** the engine's own proof for P5, P8b and P10 (A22's V34 to V39), and its tagged release.
- **Runs 1 and 2:** the engine's check, mechanical calibration at the edges, and G8's development cases through the scripted judge, then once on Jev.
- **Run 3:** the runner's tests and one real Jev run.
- **Run 4:** source walks, plus G4 trials for its descriptions on Luna.
- **Run 5:** the eval, with held-out results.
- **Run 6:** the consumer run, the behavior proof for the kit: guided use whose commission names the change to make, not the skills to load.
- **The unit's implementation review:** loads this branch's `skill-review` and runs the new rules, with Jev, on this change.

## What stays unverified

- Codex and Cursor agents using the kit beyond the consumer run.
- Linux.
- Whether the evals hold on skills outside this repository.
- A judged rule's accuracy beyond its held-out set.
- The OS key store lookup on a machine other than the owner's.
