# Rules in use: skill verification

Draft 3, by the 🦁 Lead, 2026-10-29. Part four of the design set: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. Routes were decided with `skill-rules/references/decision-matrix.md`. Every judgment below runs on Jev and every agent run on Luna; no test runs on Opus. The engine is a local build of sunstack-tools `feat/skill-rules-evidence-decisions`, named by SHA256 and source commit in each receipt.

| Obligation | Route, and the property it was decided on | Passing condition (a wrong build fails it) |
| --- | --- | --- |
| G1 openers | mechanical: a regex over one field | each of the four openers passes and `Use for` gives a `warn` finding at the description's line; a rule that passes `Use for`, or warns on `Trigger when`, fails |
| G2 length | mechanical, at the edges | 225 characters pass K002 and 226 warn; 300 pass K003 and 301 fail it as `error`; no 1,024 rule remains in any rules file |
| G3 description judgments | judged decision models on the `skill` evidence's `description` | `--evidence skill` shows the exact decoded description as the field; a finding's line is the description's; K006 ends `not_applicable` with no request for a description that doesn't open with `Always` |
| G4 trigger trial | eval: only a fresh run observes routing | per changed model-visible description: the true prompt loads it and the near miss doesn't, each in a fresh Luna session, isolated from this repository's design files; the hidden root records `not applicable` |
| G5 #171's descriptions | mechanical (G1, G2) plus G4 | all seven at 225 characters or less with an allowed opener; G4 holds for the six visible ones |
| G6 L1 | review check: placement | the sentence is in `calls-and-placement.md`'s standards, and the shared-shape caller returns the test of the consumed representation |
| G7 markers | review check plus `--check` | the marked set is exactly G7's twelve, each marker unique in its file with one entry; `rules --check` assembles all twelve with no checked file read and no key; no review, eval or prose standard is marked; no RuleSet file remains |
| G8 decision models | `--evidence` plus the rule tests (G13) | `--evidence` over #171's skills shows each kind's fields filled as G8 names them (a step's `completion`, a load's `step` and `targets`, a sentence's `headings`), with no piece from a retired tree, fixture or nested worktree. For each gated rule, a near-miss case ends `not_applicable` at its gate with no verdict request, a conforming case `pass` and a failing case `finding`. A build that sends a verdict request for a gated-out piece, reports a gated-out piece as `pass`, or reverses `pass` and `finding`, fails |
| G9 severities | mechanical: literal fields | only descriptions K003 is `error`; every other entry is `warn` |
| G10 the runner | the runner's own tests, plus a real run | tests, against a copy of the kit config whose decision model points at a scripted local judge: the default scope covers every plugin's skills and nothing else; a named path narrows it; `--since` with no change is clean; a full run that selects nothing is refused; each outcome (pass, finding at each severity, `not_applicable`, `uncertain`, incomplete) is printed as G10 says and the engine's exit code comes through; a run without a key reports the engine's refusal and reads no checked file; `--check` needs no key; no saved file contains a credential. Typecheck covers the runner. Real run: Jev over #171's skills completes, and the printed usage equals the report's. A runner that deletes the key, sets an endpoint, evaluates only some rules files or reads a full run that selected nothing as clean fails |
| G11 the reading | review check: source walks from each site, outcome by outcome | walks from each of the four sites resolve `running-rules.md` and reach their returns on six cases: `not_applicable` reads as the rule not covering the piece; `pass` as meeting the standard; a mechanical `error` finding is fixed before the step completes; a judged finding is a candidate confirmed at its line; an `uncertain` piece is decided by the calling agent and reported with its call, never read as a pass; a refused, incomplete or nothing-selected run is a gap in the return. No site says `pending` |
| G12 the four sites | review check plus the consumer run (G15) | the walks above, and the consumer run's records show each site ran the runner |
| G13 rule tests | eval through vitest-evals, run on Jev | every judged rule has development and held-out sets, each with a good, a bad and a near-miss case from real skills, with the expected outcome; the test checks the decision's outcome and, for findings, its line; mechanical rules have edge tests that need no model; `check-and-reports.md` teaches building and reading them with no state, store or procedure beside them |
| G14 held-out results | eval, run once after the entries freeze | per judged rule: matched, missed, wrong and uncertain counts on the held-out set, recorded with the proof; a miss stays reported, not tuned away |
| G15 consumer run | eval: an agent's work in a fresh session | before launch, the commission names each role's exact model and the subject reads back as Luna; the run's records show each step ran the runner on the right files with Jev on; the planted 301-character description is caught as `error` and fixed before the step completes; judged findings appear as candidates; `uncertain` pieces are decided and reported; nothing reports a pass for a rule that didn't run. A subject on any other model fails, even with a Sol collector and nested Luna tests |
| G16 general text | review check plus each run's search | a search of every changed skill file finds no repository command, machine path, cache path, project unit, run, session or pull request number |
| G17 removed files | review check plus a search | the three RuleSets, `calls-and-placement.references.rules.json`, the `.mjs` runner and its test are gone; a search of the repository outside history and retired trees finds no current description of RuleSets, `rule_sources`, `check_rules` or the `.mjs` runner |

## Proof plan

- **Basis:** user-directed intent for every run, with observed failures as evidence. Claim before G15: drafted from user intent, checked structurally and on named cases.
- **Run 0:** the engine PR's own proof (its Verification Design rows, its review), and the frozen local build with its SHA256 and source commit.
- **Runs 1 and 3:** `rules --check`, `--evidence` over #171's skills, the mechanical edges, and the development cases through the scripted judge, then on Jev.
- **Run 5:** labelled cases accepted by the Lead before any held-out run.
- **Run 6:** every rule over every creation skill on Jev with the local build (the receipt keeps the report, usage and exit code), and the held-out rule-test run (G14).
- **Runs 4a to 4e and 7:** source walks, plus G4 trials for each changed description on Luna.
- **The unit's implementation review:** loads this branch's `skill-review` and runs the new rules, with Jev, on this change.
- **Run 9:** the consumer run, the behavior proof for the kit: guided use whose commission names the change to make, not the skills to load.

## What stays unverified

- Codex and Cursor agents using the kit beyond the consumer run.
- Linux, and the engine's static Linux build (the engine's release proof).
- Whether the rules hold on skills outside this repository.
- A judged rule's accuracy beyond its held-out set.
- The OS key store lookup on a machine other than the owner's.
- The released `@sunstack/cli` until the owner releases the engine; until then every run names the local build.
