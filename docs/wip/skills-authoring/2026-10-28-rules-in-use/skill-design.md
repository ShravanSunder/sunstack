# Rules in use: skill design

Draft 3, by the 🦁 Lead, 2026-10-29. Part three of the design set: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Built on #171's branch (merged with main at `99ad828f`) and on the engine change in sunstack-tools branch `feat/skill-rules-evidence-decisions` (head `a9c522d0` when this was written), which replaces lint's RuleSets with one rules config, ast-grep evidence and decision graphs.

## The shape

```text
skill-creation self-check ─┐
skill-review first pass ───┤
skill-orchestrator prove ──┼─► skill-rules' running-rules.md
skill-audit over skills ───┘          │
                       the repository's rule runner (ai-tools: pnpm --dir tests/skills rules [paths] [--since REV])
                                      │  default: every plugin's skills; --check: config only, no key
                       sunstack lint --config domain-skill-crafting/rules/skill-rules.config.json --format json
                                      │  key: environment, else the OS key store (the engine resolves it)
          ┌───────────────────────────┼──────────────────────────────┐
   rulebook + rule entries     evidence (ast-grep project       decisions: mechanical checks,
   (references/*.md markers,    rules/evidence/: six kinds        questions to Jev, combine, thresholds
    rules/*.rules.json)         with named fields)                → pass | finding | not_applicable | uncertain
                                      │
                       report: findings, uncertain (back to the calling agent), incomplete, usage
rule tests: tests/skills/evals (vitest-evals), labelled real cases through the same CLI on Jev
```

What changes from the first checked rules:

- Jev runs by default; the runner no longer deletes the key, names a dead endpoint, evaluates only metadata or binds a stand-in file.
- The three RuleSets go. One config pairs each rulebook file with its rules file and defines the evidence kinds; each rule entry names its evidence kind, its questions and its decision.
- Every judged standard is a decision model over pieces of one evidence kind, with gates that end `not_applicable`.
- Every plugin is checked by default; `--since` checks only the changed evidence.
- The audit and the orchestrator run the rules.
- The description standards are the owner's, and Jev judges the description field itself.

## Security, decided before the runner is outlined

| Label | Decision for the runner (run 3) |
| --- | --- |
| sensitive surfaces | subprocess (`sunstack lint`); network access (the engine calls Jev at OpenRouter); a credential the engine resolves |
| entry points | `pnpm --dir tests/skills rules [paths]`; `pnpm --dir tests/skills test:evals` for rule tests; the four skill sites through `running-rules.md` |
| untrusted inputs | skill text and the engine's report; nothing from the report reaches a shell |
| privileged actions | the engine sending selected skill pieces to Jev |
| decision | **allowed**: the skill text is the owner's, in a public repository, and judging it is the purpose of the kit |

Constraints, all at their real owner: the engine resolves the key and never prints it; the runner passes no key, writes none and saves no output that contains one; the destination is the config's decision model, the engine's Jev backend; the config's limits bound each run, and the runner prints the engine's usage. Proof: the runner's tests (a run against the scripted local judge reaches it and reports each outcome; a run without a key reports the engine's refusal; no saved file contains a credential), and one real run over #171's skills. Public-safe: no cache path, account or `op://` reference in any shipped file.

## The rules as decision models

Each row is one marker and one rule entry. "Gate" is the step that can end `not_applicable`; "verdict" is the question or check the standard itself asks. Run 1 settles each judged entry's exact question wording, criteria, thresholds and routes with `skill-rules`' decision matrix and the development cases; the evidence kinds and fields below are fixed by this design.

| Marker | Standard | Evidence | Gate | Verdict | Severity |
| --- | --- | --- | --- | --- | --- |
| descriptions K001 | standard 1, the opener | `skill` | none | mechanical `regex` on `description`: one of the four openers | warn |
| descriptions K002 | standard 4, over 225 warns | `skill` | none | mechanical `max_chars` 225 on `description` | warn |
| descriptions K003 | standard 5, over 300 fails | `skill` | none | mechanical `max_chars` 300 on `description` | error |
| descriptions K004 | "names the situation…" | `skill` | none | Jev, of `description` | warn |
| descriptions K005 | "carries no workflow steps…" | `skill` | none | Jev, of `description` | warn |
| descriptions K006 | standard 2, `Always` earned | `skill` | mechanical `regex` `^Always` on `description`; no match ends `not_applicable` | Jev, of `description` against `steps` | warn |
| generalization K001 | a rule states a reusable judgment | `sentence` | Jev choice: a rule the skill teaches, a local instruction for this run, or neither; only a rule goes on | Jev, of `body` with `headings` | warn |
| calls-and-placement K001 | a call says when, where, what, what back | `load` | none | Jev, of `line` against `step` | warn |
| calls-and-placement K002 (was R001) | a reference section teaches at its depth | `reference_section` | Jev choice: does the section own teaching, or is it a lookup (table, list of facts); a lookup ends `not_applicable` | Jev, of `body` with `heading` | warn |
| main-path K001 | a branch names a condition and its different work | `branch` | `IF` lines go on; a `When` line goes on only when Jev classes it a branch, not plain guidance | Jev, of `line` against `step` | warn |
| steering K001 | a completion lets the agent tell done, with the legwork | `step` | none | mechanical `ast_grep` `completion` first: a step without one is a `finding` at its heading, no question asked; then Jev, of `completion` against `body` | warn |
| steering K002 | guidance says what to do, not only what to avoid | `sentence` | Jev choice: guidance (an instruction or standard) or something else (an example, a fact, a quote); only guidance goes on | Jev, of `body` | warn |

A mechanical gate that rejects a piece sends nothing to Jev. A Jev gate costs no saving: the engine sends all of an entry's questions in one request once the walk reaches its first question, and the walk then takes only the routes its answers lead to, so a piece the gate rejects ends `not_applicable` without ever reaching the verdict step. The old 1,024-character rule goes; the platform's 1,024 maximum stays a stated fact, unmarked. The hosted run's sampled warnings (`tmp/project-1-fix/hosted-sample-review.md`) are development cases for the gates: a local instruction is not a reusable rule; a lookup subsection doesn't own teaching; a complete call read with its step passes.

## The config

`plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json`, beside the rules files it pairs:

- `rulebook`: five pairs, `../references/<topic>.md` with `<topic>.rules.json`, for descriptions-and-invocation, generalization, calls-and-placement, main-path and steering;
- `marker_prefix`: `K`;
- `check.files`: `plugins/*/skills/*/SKILL.md` and `plugins/*/skills/*/references/**/*.md`, anchored at the repository root; retired skill trees, `tests/` fixtures and nested worktrees select nothing (a broad `**/skills/**` would reach fixtures and worktrees shaped like skills);
- `evidence`: `ast_grep` points at `evidence/sgconfig.yml`; `kinds` defines the six kinds and their fields (specification G8), with step shapes shared once as a util;
- `decision_model`: `jev-latest`, the engine's default endpoint;
- `limits`: `evidence_max_chars` 6,000 and `request_max_chars` 20,000, the page's figures.

The evidence project is ported from the confirmed experiment the engine's fixture copied (`crates/sunstack/tests/fixtures/rulebook-lint/evidence/`, from this repository at `565d763f`), with three repairs a literal port would miss:

- `sentence` picks a whole list item, or a paragraph that is not inside a list item; the fixture's rule picks every paragraph, which splits a multi-paragraph item into fragments.
- `load` and `branch` pick from references as well as SKILL.md.
- `load.step` and `branch.step` come from a contextual step rule that also matches numbered steps in references; the `step` kind itself stays SKILL.md-only. The fixture's step rule is limited to SKILL.md, and the engine only indexes the rules that apply to a file, so reusing it would leave every reference piece's `step` empty.

Each repair is proved by exact spans, not by counts: a multi-paragraph and a nested list item each give one `sentence` piece with the item's span, and a numbered step in a reference file that holds a load and a branch gives both pieces that step as their `step`.

## Where the files go

- **`domain-skill-crafting/references/descriptions-and-invocation.md`:** standards 1 to 6, and the depth that teaches the `Always` choice and the two-prompt trial, including the hidden-skill case; markers K001 to K006.
- **`domain-skill-crafting/references/calls-and-placement.md`:** standard 7 (L1); the reference teaching-depth marker becomes K002.
- **`domain-skill-crafting/rules/`:** the five rules files, one entry per marker with its evidence kind, questions and decision; `skill-rules.config.json`; `evidence/` (`sgconfig.yml`, `utils/`, `rules/`). The three `*.ruleset.json` files and `calls-and-placement.references.rules.json` go.
- **`skill-rules/references/running-rules.md`:** rewritten for G11. Run the runner; read each outcome; take back every `uncertain` piece and decide it; carry every gap to the caller's return. The sentence that the step "never evaluates a judged RuleSet" goes.
- **`skill-rules/references/markers-and-rules.md`:** how a marked standard's entry names its evidence kind, asks its questions and routes its decision, with one worked case (steering K001).
- **`skill-rules/references/decision-matrix.md`:** routing a standard to a rule includes choosing its evidence kind and its gate; the frontmatter near miss routes to the `skill` evidence's `description` field.
- **`skill-rules/references/check-and-reports.md`:** `--check`'s refusals; the report's outcomes and statuses; building and reading rule tests (G13).
- **`skill-rules/SKILL.md` and `agents/openai.yaml`:** RuleSets, `rule_sources` and `check_rules` go from its description and text.
- **`tests/skills/scripts/run-skill-rules.ts`** (replacing the `.mjs`), its test in `tests/skills/lib/`, `tsconfig.json` including `scripts/**/*.ts`, and `package.json`'s `rules` script: G10.
- **`tests/skills/evals/skill-rules.eval.ts`** and its labelled cases under `tests/skills/fixtures/skill-rules/`: G13.
- **`AGENTS.md`:** the rule-runner paragraph rewritten for the new runner; the opener policy (`Use when` only) cut over to the four openers.
- **`plugins/README.md`, `plugins/skill-authoring/README.md`, `docs/architecture/skill-standards-linter.md`:** RuleSets cut over to the config (G17).

## The four sites

Each loads `running-rules.md` with a path that resolves from the file holding the call; each return reports the rules' actual state.

- **`skill-creation`, self-check:** runs on the changed files. An `error` is fixed before the diff comparison; a `warn` is fixed or named; a judged finding is confirmed or named as a candidate; an `uncertain` piece is decided by the writer.
- **`skill-review`, first rule pass:** judged findings become candidate findings the review lead confirms at their line; `uncertain` pieces go to the review lead to decide.
- **`skill-orchestrator`, step 4:** the `rules: pending` line becomes a call on the change's files. An `error` returns to step 3; judged findings and decided `uncertain` pieces go into step 5's assessment; the run summary's `rules:` line reports the actual state.
- **`skill-audit`, its rule step:** the `rules: pending` line becomes a call over the skills in scope. A failure or a confirmed finding flags its skill beside the step 2 signals; the return's `rules:` line reports what ran and every gap.

## Trigger and invocation

Seven descriptions change, to meet G1 and G2; each keeps its invocation capability. `domain-skill-crafting` stays hidden (its frontmatter and `agents/openai.yaml` `allow_implicit_invocation: false` are unchanged). Each writer uses the string below, and the rules judge it in the writer's self-check. Each model-visible one gets G4's trial: one true prompt and one near miss, each in a fresh Luna session with no turn cap that cuts the routing decision short, isolated from this repository's design files.

| Skill | Now | Proposed description | Characters |
| --- | --- | --- | --- |
| `skill-creation` | 366 | Use when writing one named skill's files from its accepted design, or making a mechanical edit to a skill (typo, formatting, version, metadata). Not for designing or judging a skill. | 182 |
| `skill-review` | 347 | Use when a skill's design set, draft or changed files need an independent review before they change or ship, or a skill's quality is in question. Not for product code. | 167 |
| `skill-orchestrator` | 397 | Use when one skill change has to go all the way from need to shipped, or one run of an accepted multi-run skill design set has to be carried through. Not for a single step alone. | 178 |
| `skill-audit` | 264 | Use when deciding which skills to create, update, merge or skip from real session evidence, or finding stale or duplicated skill behavior. Not for judging one skill. | 165 |
| `skill-design` | 411 | Use when a skill change needs its design before any file is edited: a new skill, a behavior change, or an observed skill failure to fix. Not for writing, judging or shipping it. | 177 |
| `skill-rules` | 384 | Use when deciding which of a skill's standards become checked rules, writing or fixing their markers and rule entries, or reading a rule run's results. Not for a skill's teaching. | 178 |
| `domain-skill-crafting` (hidden) | 264 | Use when writing, designing, reviewing or auditing a skill's text against its standards: description, main path, calls, steering, proof claims, security and platform surfaces. | 175 |

Each keeps the near miss its old description guarded against, in fewer words. G4's trial prompts, per skill: the true prompt is the moment in its first clause, and the near miss is its `Not for` neighbour (for `skill-creation`, "write the files for the accepted `presentation-html` design" against "design a new skill for release notes").

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 0 | the engine change, built locally from `feat/skill-rules-evidence-decisions`; its PR opened unmerged; the owner merges and releases it | dependency | sunstack-tools Implementer, Sol | built, in review |
| 1 | `domain-skill-crafting`: standards 1 to 7, markers, the five rules files' entries, its description | update | Opus 5.5 xhigh | proposed |
| 2 | `skill-rules`: its four references, `SKILL.md`, `agents/openai.yaml`, its description | update | Opus 5.5 xhigh | proposed |
| 3 | config, evidence project, runner `.ts` and its test, `tsconfig`, `package.json`, `AGENTS.md`, READMEs, the architecture doc, removals | repository code and kit data | Sol, Implementer Sidekick | proposed |
| 4a to 4e | `skill-creation`, `skill-review`, `skill-orchestrator`, `skill-audit` sites and descriptions; `skill-design`'s description and its verification step planning G4's trial | update | Opus 5.5 high | proposed |
| 5 | labelled cases from real skills, development and held-out, per judged rule, and the rule tests that run them | eval | candidate pieces: Sol Researcher; labels: the owner for generalization's 30 cases, two independent Sol labelers and a Sol settler for the other judged rules, the owner spot-checking 10 per rule; tests: run 3's Implementer | proposed |
| 6 | proof: every rule over every creation skill on the local engine build with Jev, after runs 2 and 4 finish (or refreshed after any later skill edit); held-out rule-test run once run 5's labels and tests exist and run 1's entries are frozen | proof | the Lead, with run 3's Implementer | proposed |
| 7 | G4 trials for the six visible changed descriptions | proof | Luna sessions, run by a Sol Operator | proposed |
| 8 | changelog entry, plugin versions | documents | the Lead | proposed |
| 9 | consumer run (G15): a later skill change on a scratch branch, a 301-character description planted | proof (the experiment) | measured subject: a fresh Luna agent following the kit; judge: Jev; review step: Sol; collector: Sol | proposed |

Order: runs 1 and 3 side by side (run 1 owns `rules/*.rules.json` and the references; run 3 owns the config, `evidence/` and everything outside the plugin's skills); run 5's development cases alongside them; run 2 after run 1; runs 4a to 4e after run 2, one Opus writer carrying runs 1, 2 and 4 in order, each its own `skill-creation` invocation with its own target, self-check, status and diff comparison; run 6 after runs 1, 3 and 5; run 7 after run 4; the implementation review; run 8; run 9 last, before the merge. Every run checks its diff against G16 and reports its search, and names the model of every model run it launches. No run uses Opus for a test.

**Run 9's roles, fixed before launch.** Run 9 is a test of the kit, so it runs on the test models. Its commission names each role with its exact model and is checked before launch: the measured subject, the agent that makes the scratch change by following the kit, is a fresh Luna session; every judgment is Jev; the kit's review step uses its Sol reviewer; the collector that reads the records is Sol. A subject on any other model fails the check, whatever its collector or nested tests run on.

One unit, one review: after run 8, a fresh `skill-review` implementation review loads this branch's `skill-review`, so its first pass runs the new rules, with Jev, on this change itself.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| E1 | The 300 limit is `error`; everything else `warn` | The owner: "300 means it fails its a failure" |
| E2 | Judged rules warn until their rule tests show them accurate | The owner's spec: no judged rule blocks before its eval; the hosted run's warning rate shows the flat rules weren't ready |
| E3 | Jev runs by default, with the key the engine resolves; no switch | The owner: "jev is teh whole fuckign poitn"; the engine has no model-off switch |
| E4 | Every rule is a decision model in its rule entry, over one evidence kind, run per piece by the engine | The owner: "decion models eveyrwehre"; the confirmed page; the engine change built it |
| E5 | Descriptions are judged as the `skill` evidence's `description` field, decoded as YAML | The owner's 26 October choice; the confirmed page |
| E6 | Rule tests are vitest-evals in `tests/skills`, labelled real cases through the CLI on Jev; nothing in the engine | The confirmed page ("Tests: sunstack tests/skills (vitest-evals)"); the engine's non-goal: no eval harness in Rust |
| E7 | Version stays 0.6.0, in #171 | One PR; #171 is unreleased |
| E8 | The consumer run is a later skill change on a scratch branch | Real work; keeps other PRs untouched until #171 merges |
| E9 | "Passes" means A | Offered on 28 October, not objected to |
| E10 | Trigger trials and the consumer run's subject run on Luna; judgments on Jev; Opus writes skills only; Sol does everything else | The owner, 28 October |
| E11 | Labelled cases come from current skills; labels follow the owner's adopted split (the owner labels generalization's first 30, 15 overfitted and 15 general; two independent Sol labelers and a Sol settler label the other judged rules; the owner spot-checks 10 per rule); the owner's HTML samples belong to the presentation rules, later | The owner, 28 October: "we have for skills current skills to audit and calibrate"; the owner's 26 October choice "who-labels-evals A (owner-labels-generalization)" (Project 1 spec, settled decision) |
| E12 | One config, beside the rules files in `domain-skill-crafting/rules/`, with the evidence project in `rules/evidence/` | The confirmed page's files table |
| E13 | The marked set is the twelve in G7; the inventory's other judged standards are later work | The confirmed page: "one entry per tagged sentence"; each new rule needs labelled cases first ("coverage is labelled before it's claimed") |
| E14 | `calls-and-placement`'s `R001` becomes `K002` | One config has one marker prefix |
| E15 | The runner refuses a full-scope run whose engine status is `nothing_selected` | The engine exits 0 for nothing selected, so a wrong path would read as clean; `evidence_seen` lists only pieces sent to Jev, so it can be empty on a run that selected mechanical work |
| E17 | Steering K001's missing completion is a `finding` at the step heading, with no question asked | The confirmed page's worked example: "If not, it's a finding at the heading and no question is asked" |
| E16 | The runner is `.ts` run by Node directly | The owner: TypeScript or Rust only, "node can run ts"; the rest of `tests/skills` is `.ts` |

## Coordination

- **Base:** #171's branch, `worktree-project-1-skill-crafting`. Skill-authoring 0.6.0 and its changelog entry are already there; run 8 extends that entry.
- **Engine:** sunstack-tools `feat/skill-rules-evidence-decisions`. #171's runs use a local build of it through `--engine`. #171 merges only after the owner merges and releases the engine and `@sunstack/cli`'s pin in `tests/skills/package.json` moves to that release; until then the pin is an open item.
- **After merge:** #172 and #173 take this in by merge. The phase-skill and practice-skill cleanups follow as their own PRs, run with this kit.
- **Work thread:** board "Workflow improvements", project `01a1635f`.

## Review record

Draft 1 was reviewed (`tmp/project-1-reviews/rules-in-use-design-review.md`) and draft 2 at `4a82b9b0` (`tmp/project-1-reviews/rules-in-use-draft2-review.md`, D2-1 to D2-4, answered in draft 2's revision). Draft 3 replaces A22 with the built engine: RuleSets, unit targets, marker-entry gates and `score_eval` give way to one config, evidence kinds, decision graphs and vitest-evals rule tests; G7 narrows to the twelve tagged standards (E13); G13 and G14 move to rule tests; G17 is new.
