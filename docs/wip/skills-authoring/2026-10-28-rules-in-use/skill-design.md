# Rules in use: skill design

Draft 2, by the 🦁 Lead, 2026-10-28. Part three of the design set: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Built on #171's branch at `9eabb3a8` (the first checked rules) and on the engine release that carries Project 2's slices P5, P8b and P10 (amendment A22).

## The shape

```text
skill-creation self-check ─┐
skill-review first pass ───┤                    ┌─ check_rules          every RuleSet's definitions, no target, no key
skill-orchestrator prove ──┼─► skill-rules'    ─┤
skill-audit over skills ───┘   running-rules.md └─ evaluate_candidates  every RuleSet over the skill files, Jev on
                                    │                each judged standard a decision model:
                                    │                  target selects its units → optional text filter → gates → verdict
                         the repository's rule runner   (ai-tools: pnpm --dir tests/skills rules [folders])
                                    │                    default: every plugin's skills
                         sunstack exec (@sunstack/cli, pinned to the release with A22)
                                    │  key: environment, else the OS key store (the engine resolves it)
                         score_eval (calibration, run by a rule author, not by the four sites)
```

What changes from the first checked rules:

- Jev runs by default; the runner no longer deletes the key, names a dead endpoint, evaluates only metadata or binds a stand-in file.
- Every judged standard is a decision model the engine runs per unit.
- Every plugin is checked by default.
- The audit and the orchestrator run the rules.
- The description standards are the owner's, and Jev judges the description itself.

## Security, decided before the runner is outlined

| Label | Decision for the runner (run 3) |
| --- | --- |
| sensitive surfaces | shell and subprocess (`sunstack exec`); network access (the engine calls Jev at OpenRouter); a credential the engine resolves |
| entry points | `pnpm --dir tests/skills rules [folders]`; the four skill sites through `running-rules.md` |
| untrusted inputs | skill text and the engine's responses; nothing from the network reaches a shell |
| privileged actions | the engine sending selected skill units to Jev |
| decision | **allowed**: the skill text is the owner's, in a public repository, and judging it is the purpose of the kit |

Constraints, all at their real owner: the engine resolves the key and never prints it; the runner passes no key, writes none and saves no output that contains one; the destination is the engine's configured Jev backend; the engine's native request budget and attempts bound each run, and the runner prints the engine's reported usage. Proof: the runner's tests (a run with a key reaches the scripted local judge; a run without one reports the engine's refusal; no saved file contains a credential), and one real run over #171's skills. Public-safe: no cache path, account or `op://` reference in any shipped file.

## The rules as decision models

| Rule | Root sentence | Shape | Severity |
| --- | --- | --- | --- |
| `skill.description-opener` | standard 1 | mechanical: `frontmatter_field description`, matches the four openers | warn |
| `skill.description-length-warn` | standard 4 | mechanical: at most 225 characters | warn |
| `skill.description-length-limit` | standard 5 | mechanical: at most 300 characters | error |
| `description.names-the-moment` | "names the situation…" | judged, target the `description` field | warn |
| `description.no-workflow` | "carries no workflow steps…" | judged, target the `description` field | warn |
| `description.always-earned` | standard 2 | judged, target the `description` field; gate: does it open with `Always`? | warn |
| the six existing judged rules | as now | decision models: the target selects the unit kinds the standard governs (unchanged selectors), an optional text filter, gates for "is this unit one the standard covers?", the marked sentence as verdict; a unit that meets it ends `dropped` at the verdict, one that fails it `finding` | warn |
| the inventory's other judged standards | `root-standards.md` judged rows | the same pattern, each settled with the decision matrix | warn |
| the inventory's 2 mechanical | `root-standards.md` mechanical rows | mechanical, proved on good and bad cases | warn |

The old 1,024-character rule goes; the 300 limit replaces it, and the platform's 1,024 maximum stays a stated fact, unmarked. Run 1 settles each judged rule's unit kinds, gates and wording with `skill-rules`' decision matrix; a standard the matrix finds unready is returned with its rewrite, not marked. The hosted run's sampled warnings (`tmp/project-1-fix/hosted-sample-review.md`) are the development cases for the gates: a local instruction is not a reusable rule; a lookup subsection doesn't own a stage; a complete call read with its step is not incomplete.

## Where the files go

- **`domain-skill-crafting/references/descriptions-and-invocation.md`:** standards 1 to 6, and the depth that teaches the `Always` choice and the two-prompt trial, including the hidden-skill case.
- **`domain-skill-crafting/references/calls-and-placement.md`:** standard 7 (L1).
- **`domain-skill-crafting/rules/`:** the changed and new entries, each judged entry carrying its optional text filter, narrowing, gates and verdict in the marker entry (A22.6); its target selector stays the one source of its units (A22.2).
- **`skill-rules/references/running-rules.md`:** rewritten for G11. Run the runner; read the check and the evaluation by the engine's outcomes; carry every gap to the caller's return. The sentence that the step "never evaluates a judged RuleSet" goes.
- **`skill-rules/references/markers-and-rules.md`:** how a marked standard carries its decision model, with one worked case.
- **`skill-rules/references/decision-matrix.md`:** a standard's unit kinds and gates are part of routing it to a rule; the frontmatter near miss routes to a judged field target.
- **`skill-rules/references/check-and-reports.md`:** the evaluation's candidate outcomes, and building and reading a rule's eval with `score_eval` (G13).
- **`tests/skills/scripts/run-skill-rules.mts`** (renamed from `.mjs`), its test, `tsconfig.json` including `scripts/**/*.mts`, and `package.json`'s `rules` script: G10.
- **`AGENTS.md`:** the runner line, and the opener policy at line 167 (`Use when` only) cut over to the four openers.

## The four sites

Each loads `running-rules.md` with a path that resolves from the file holding the call; each return reports the rules' actual state.

- **`skill-creation`, self-check:** runs on the changed files. An `error` is fixed before the diff comparison; a `warn` is fixed or named; a judged finding is confirmed or named as a candidate.
- **`skill-review`, first rule pass:** judged findings become candidate findings the review lead confirms at their anchor.
- **`skill-orchestrator`, step 4:** the `rules: pending` line becomes a call on the change's files. An `error` returns to step 3; judged findings go into step 5's assessment; the run summary's `rules:` line reports the actual state.
- **`skill-audit`, its rule step:** the `rules: pending` line becomes a call over the skills in scope. A failure or a confirmed finding flags its skill beside the step 2 signals; the return's `rules:` line reports what ran and every gap.

## Trigger and invocation

Seven descriptions change, to meet G1 and G2 at 225 characters or less; each keeps its invocation capability. `domain-skill-crafting` stays hidden (frontmatter and `agents/openai.yaml`). Each writer drafts its skill's description against the root's standards, and Jev judges it in the writer's self-check. Each model-visible one gets G4's trial: one true prompt and one near miss, each in a fresh Luna session with no turn cap that cuts the routing decision short, isolated from this repository's design files.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 0 | the engine release with P5, P8b and P10 | dependency (Project 2) | Project 2 Implementer, Sol | in progress |
| 1 | `domain-skill-crafting`: standards 1 to 7, markers and decision-model entries, severities, its description | update | Opus 5.5 xhigh | proposed |
| 2 | `skill-rules`: `running-rules.md`, `markers-and-rules.md`, `decision-matrix.md`, `check-and-reports.md`, its description | update | Opus 5.5 xhigh | proposed |
| 3 | the runner: `.mts`, G10, tests, `tsconfig`, `package.json`, `AGENTS.md` | repository code | Sol, Implementer Sidekick | proposed |
| 4 | the four sites and the descriptions of `skill-creation`, `skill-review`, `skill-orchestrator`, `skill-audit`, `skill-design` | update | Opus 5.5 high | proposed |
| 5 | the eval (G14): labeled sets from the owner's samples, development and held-out, `score_eval` per judged rule | eval | Sol Researcher, the owner labeling the HTML samples, Jev judging | proposed |
| 6 | consumer run (G15): #172's `presentation-html` design-page change on a scratch branch from this change's head, a 301-character description planted | proof | fresh Opus writer, Sol reviewer, Jev and Luna for every test | proposed |
| 7 | changelog entry, plugin versions | documents | the Lead | proposed |

Order: run 0 first; runs 1 and 3 side by side once the release exists; then run 2, which reads run 1's rules; then run 4; then runs 5 and 6; run 7 last. Every run checks its diff against G16 and reports its search, and names the model of every model run it launches. No run uses Opus for a test.

One unit, one review: after run 7, a fresh `skill-review` implementation review loads this branch's `skill-review`, so its first pass runs the new rules, with Jev, on this change itself.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| E1 | The 300 limit is `error`; everything else `warn` | The owner: "300 means it fails its a failure" |
| E2 | Judged rules warn until their eval shows them accurate | The owner's spec: no judged rule blocks before its eval; the hosted run's warning rate shows the flat rules weren't ready |
| E3 | Jev runs by default, with the key the engine resolves; no switch | The owner: "jev is teh whole fuckign poitn"; draft 1's `--judge` removed |
| E4 | Every judged standard is a decision model in its marker entry, run per unit by the engine; a marked standard's pass means the unit conforms | The owner: "decion models eveyrwehre"; A22 (revision 4, accepted) makes the engine carry it, A22.11 its meaning |
| E5 | Descriptions are judged as their own frontmatter field | The owner's 26 October choice, built in A22 |
| E6 | Calibration is the engine's `score_eval`, nothing beside it | One owner per job; draft 1's advisory states and calibration procedure removed |
| E7 | Version stays 0.6.0, in #171 | One PR; #171 is unreleased |
| E8 | The consumer run is #172's design-page phone-width change, made on a scratch branch | Real work already decided (I5); keeps #172 untouched until #171 merges |
| E9 | "Passes" means A | Offered on 28 October, not objected to |
| E10 | Trigger trials run on Luna; judgments on Jev; Opus writes skills only; Sol does everything else | The owner, 28 October |
| E11 | Eval labels come from the owner's samples, the owner labeling the HTML ones | The owner, 28 October |

## Coordination

- **Base:** #171's branch, `worktree-project-1-skill-crafting`. Skill-authoring 0.6.0 and its changelog entry are already there; run 7 extends that entry.
- **Engine:** Project 2's branch `feat/session-ingestion-and-trees`; A22 at `tmp/project-2/amendment-a22-skill-decision-models.md`, revision 4, accepted-to-implement (`tmp/project-2/review-a22-recheck-3.md`), built as slice P10.
- **After merge:** #172 and #173 take this in by merge. #172 then fixes its 17 descriptions and I5's `presentation-html` change for real.
- **Work thread:** board "Workflow improvements", project `01a1635f`.

## Review record

Draft 1 was reviewed (`tmp/project-1-reviews/rules-in-use-design-review.md`, targeted-revision: RUI-1 eligibility not buildable on the published engine; RUI-2 calibration predicate; RUI-3 state home; RUI-4 the `AGENTS.md` opener). Draft 2 answers RUI-1 with A22, removes RUI-2 and RUI-3's subject (no calibration state; the engine's eval), and cuts over `AGENTS.md:167`. Draft 2's design review follows A22's acceptance.
