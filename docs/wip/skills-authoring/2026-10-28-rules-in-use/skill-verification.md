# Rules in use: skill verification

Draft 1, by the 🦁 Lead, 2026-10-28. Part four of the design set: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. Routes were decided with `skill-rules/references/decision-matrix.md`.

| Obligation | Route, and the property it was decided on | Passing condition (a wrong build fails it) |
| --- | --- | --- |
| G1 openers | mechanical, calibrated: a literal prefix of one field | Each of the four openers passes and `Use for` warns, in the engine's report. A rule that passes `Use for`, or warns on `Trigger when`, fails |
| G2 `Always` use | review check: needs the skill's intent | the review reads each `Always` description against the skill's job; none in #171 uses `Always` unless its run argues it |
| G3 length | mechanical, calibrated at the edges | 225 characters pass and 226 warn; 300 pass the limit and 301 fail it as `error`; the old 1,024 rule is gone from every RuleSet |
| G4 description judgments | judged through evidence, advisory | `prepare_rules` shows each request carrying the exact description; a finding anchors at the title section; the result is reported `advisory` |
| G5 trigger trial | eval: only a fresh run observes routing | per changed model-visible description: the true prompt loads it 2/2 and the near miss 0/2, fresh Claude Code sessions, at most three turns; the hidden root records `not applicable` |
| G6 #171's descriptions | mechanical (G1, G3) plus G5 | all seven at 225 characters or less with an allowed opener; G5 holds for the six visible ones |
| G7 L1 | review check: placement | the sentence is in `calls-and-placement.md`'s standards, and the shared-shape caller returns the test of the consumed representation |
| G8 markers | review check plus the native check | the marked set equals the matrix's rule outcomes, each unready one returned with its reason; `check_rules` assembles every rule; no review, eval or prose standard is marked; no description holds `<!--` |
| G9 eligibility | judged run on known cases | development cases from the hosted run's sample: a local instruction is `not applicable` to generalization; a lookup subsection is `not applicable` to teaching depth; a complete call with its step as context passes. A gate that lets any of those through to a warning fails |
| G10, G11 states | mechanical: literal fields | every judged rule reports `advisory` until calibrated; only the 300 limit is `error` |
| G12 the runner | the runner's own tests, plus a real run | tests: the default scope covers every plugin's skills; without `--judge`, no judged request and each judged rule `not evaluated: not requested`; `--judge` without a key, `not evaluated: no credential`; `--judge` with a synthetic key against a local endpoint sends at most the cap and prints the cost; a saved file containing the key is refused; an over-budget request is a named gap. Real run: `--judge` over #171's skills completes, and no saved file contains the key. Typecheck covers the `.mts` |
| G13 the reading | review check: source walks from each site | walks from each of the four sites resolve `running-rules.md` and reach their returns with: an `error` fixed first; a judged warning as a candidate with its calibration state; a missing key as a gap. No site says `pending` |
| G14 the four sites | review check plus the consumer run (G17) | the walks above, and the consumer run's records show each site ran the runner |
| G15 calibration teaching | review check: the procedure | `check-and-reports.md`'s judged section names real-source examples, labels, a development and held-out split, eligibility before the question, a frozen threshold, and the three error counts |
| G16 calibration done | eval | per judged rule: labeled development and held-out sets, held-out false-warning and miss counts, and the rule's recorded state (calibrated or advisory, with the reason) |
| G17 consumer run | eval: an agent's work in a fresh session | the run's records show each step ran the runner on the right files; the planted 301-character description is caught as `error` and fixed before the step completes; judged warnings appear as advisory candidates; nothing reports a pass for a rule that didn't run |
| G18 general text | review check plus each run's search | a search of every changed skill file finds no repository command, machine path, cache path, project unit, run, session or pull request number |

## Proof plan

- **Basis:** user-directed intent for every run, with observed failures as evidence (requirements). Claim before G17: drafted from user intent, checked structurally and on named cases.
- **Runs 1 and 2:** native checks, mechanical calibration, `prepare_rules` for the judged targets, and G9's development cases.
- **Run 3:** the runner's tests and one real `--judge` run.
- **Runs 4 to 8:** source walks, plus G5 trials for their descriptions.
- **Run 9:** calibration, with held-out results.
- **Run 10:** the consumer run, the behavior proof for the kit. It is guided use: its commission names the change to make, not the skills to load, and the records show whether the agents reached the kit unprompted from the change.
- **The unit's implementation review:** loads this branch's `skill-review` and runs the new rules, with `--judge`, on this change.

## What stays unverified

- Codex and Cursor agents using the kit; the consumer run uses Claude Code.
- Linux.
- Whether calibration holds on skills outside this plugin's own.
- A judged rule's accuracy beyond its held-out set.
- How the keychain lookup behaves once a CLI with #94 is released and pinned.
