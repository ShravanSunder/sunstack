# First checked rules: skill design

Draft 1, by the 🦁 Lead, 2026-10-27. Part three of the design set: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Built on the Project 1 branch after milestone 1's units U0, U2a and U2b were reviewed.

## The shape

```text
skill-creation self-check ─┐                          ┌─ check_rules  (all 8 assemble)
                           ├─► skill-rules'          ─┤
skill-review first pass ───┘   running-rules.md        └─ evaluate_rules (2 mechanical)
                                    │
                         the repository's rule runner  (ai-tools: pnpm --dir tests/skills rules)
                                    │
                         sunstack exec  (@sunstack/cli 0.1.0, or sunstack on PATH, or a given path)
                                    │
           RuleSet: domain-skill-crafting/rules/skill-text.ruleset.json
             rule sources: the root's topic files with their markers, each paired with its rules file
```

## The rules

| Rule | Root sentence (its marker goes here) | Kind | Target |
| --- | --- | --- | --- |
| `skill.description-use-when` | `descriptions-and-invocation.md:6` (DESC-2) | mechanical: `frontmatter_field` `description`, `starts_with: "Use when"` | each `SKILL.md` |
| `skill.description-length` | `descriptions-and-invocation.md:27` | mechanical: `frontmatter_field` `description`, `matches` at most 1,024 characters | each `SKILL.md` |
| `rule.generalization` | `generalization.md:5` (GEN-1) | judged, threshold 0.8 | list items and paragraphs |
| `call.completeness` | `calls-and-placement.md:26` (PLACE-19) | judged | `call_site` on load and dispatch calls |
| `branch.condition` | `main-path.md:14` (MAIN-9) | judged | `call_site` on `IF` and `When` branches |
| `completion.criterion` | `steering.md:7` (STEER-4) | judged | `call_site` on `Completion:` and `Complete when:` |
| `guidance.positive` | `steering.md:10` (STEER-9) | judged | list items and paragraphs |
| `reference.teaching-depth` | `calls-and-placement.md:18` (PLACE-14) | judged | sections of reference files |

All eight are `warn`. The exact selectors and patterns are settled in run 1 with `skill-rules`' decision matrix and its calibration, which may narrow a target; a rule whose selector can't be made honest is reported, not marked. The name rule (`descriptions-and-invocation.md:26`) is not marked: its folder-name half can't be seen by one field's check, so marking it would make a proxy.

## Where the files go

- `plugins/skill-authoring/skills/domain-skill-crafting/rules/`: `skill-text.ruleset.json` (inputs: `skill`, a document; `marker_prefix` `K`; `rule_sources` pairing `../references/<topic>.md` with `<topic>.rules.json` in this folder) and one rules file per marked topic.
- `plugins/skill-authoring/skills/skill-rules/references/running-rules.md` (new): how a skill step runs the plugin's rules on a skill's files and reads the report. The repository's rule runner is named by the repository's instructions; with none, report the rules as not run. Run check, then evaluate; read the engine's report (coverage, skipped rules, each occurrence's result); zero matches, partial coverage and refusals are gaps; a judged rule that wasn't evaluated is reported as not evaluated. It loads `check-and-reports.md` for what each report field means rather than restating it.
- `tests/skills/scripts/run-skill-rules.mjs` and its test, with a `rules` script in `tests/skills/package.json` and `@sunstack/cli` 0.1.0 as a dev dependency. Parameters: skill folders (default every skill in `plugins/skill-authoring/skills/`), `--check` (assemble only), `--ruleset <path>`, `--engine <path>`, `--out <dir>` for the requests and responses. It builds the `check_rules` and `evaluate_rules` requests (one binding group per target file), runs `sunstack exec`, writes both responses, prints a short summary, and exits with the engine's status.
- `AGENTS.md`: one line naming the command (`pnpm --dir tests/skills rules [skill folders]`).

## The two run sites

- **`skill-review`**, implementation stage, first rule pass: the pending line becomes a complete call that loads `../skill-rules/references/running-rules.md` and returns the report for the reviewed skill's files; mechanical failures go to the review lead as candidate findings; the status block records each rule's state, with judged rules `not evaluated`.
- **`skill-creation`**, self-check: the pending line becomes the same call on the changed files; a mechanical failure is fixed before the diff comparison or named as a deviation.

Both sites keep "a rule has run only when its report says so"; neither restates it, since `running-rules.md` owns it.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 | `domain-skill-crafting`: markers on the eight sentences, the rules files and the RuleSet, by `skill-rules`' procedure | update | Opus 5.5 xhigh | proposed |
| 2 | `skill-rules`: `references/running-rules.md` and its caller line | update | Opus 5.5 xhigh | proposed |
| 3 | the runner: script, test, `package.json` script and dev dependency | repository code | Sol, as an Implementer Sidekick | proposed |
| 4 | `skill-review`: first rule pass on | update | Opus 5.5 xhigh | proposed |
| 5 | `skill-creation`: self-check on | update | Opus 5.5 xhigh | proposed |
| 6 | `AGENTS.md` line and the 0.6.0 changelog entry updated | documents | Sol | proposed |

One unit: the runs call each other (the sites load run 2's reference, which runs run 3's command on run 1's RuleSet), so they are reviewed together once all have landed, with every path resolving. The reviewer reads `skill-review` at the branch's milestone 1 state, so the new first pass runs on this change itself: the rules check the skills that run them.

## Security

The runner (run 3) runs a subprocess (`sunstack exec`) and the dev dependency's install step downloads the engine's binary from the published release. Decision, recorded here before outlining: **allowed**, with constraints: the runner runs only the engine binary it resolves, with requests it builds from local files; no network call of its own; the install is the owner's published package at a pinned version, and the install needs the owner's approval in this environment. Every other surface: none in scope.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| E1 | All eight rules `warn` | the governing spec: no rule blocks before its eval; metadata is reported, never quality |
| E2 | Rules files and the RuleSet live in the root's `rules/` folder | the markers sit on the root's sentences, so their definitions travel with them |
| E3 | Skills name "the repository's rule runner", never a command | the owner: skills "that work anywhere" |
| E4 | One unit, one review | the runs call each other; reviewed whole, every path resolves |
| E5 | Version stays 0.6.0, in the same PR as milestone 1 | one PR by default; the owner may split it at plan review |

## Coordination

Base: the Project 1 branch after unit U2c's review. Version 0.6.0 and its changelog entry are already in the branch; run 6 adds this change to that entry.

## Review record

Not yet reviewed.
