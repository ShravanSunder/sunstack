# First checked rules: skill design

Draft 3, by the 🦁 Lead, 2026-10-27, after review R1 and its correction check. Part three of the design set: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Built on the Project 1 branch after milestone 1's units U0, U2a and U2b were reviewed.

## The shape

```text
skill-creation self-check ─┐                          ┌─ check_rules     both RuleSets (all 8 assemble, printed)
                           ├─► skill-rules'          ─┤
skill-review first pass ───┘   running-rules.md        └─ evaluate_rules  metadata RuleSet only (2 mechanical, on SKILL.md)
                                    │
                         the repository's rule runner  (ai-tools: pnpm --dir tests/skills rules)
                                    │
                         sunstack exec  (@sunstack/cli 0.1.0, or sunstack on PATH, or a given path)
                                    │
     domain-skill-crafting/rules/
       skill-metadata.ruleset.json   the 2 metadata rules; binds each SKILL.md
       skill-text.ruleset.json       the 6 judged rules; binds SKILL.md and every references/ file
       <topic>.rules.json            one per marked topic, paired with ../references/<topic>.md
```

**Why two RuleSets.** An evaluation request names whole RuleSets, not rules, and the engine refuses one that names a RuleSet holding any judged rule unless a working model backend is configured: the Lead's probe on the published engine got `invalid_configuration`, exit 2, nothing evaluated (`tmp/project-1-runs/fcr-engine-probe/README.md`). So the metadata rules get their own RuleSet, which runs locally with no backend, and the judged rules get theirs, which is checked and printed until their evals and a hosted run exist (review R1, F1). The split falls on topic files: the two metadata markers sit in `descriptions-and-invocation.md`, and the six judged markers in four other topics, so no topic is shared.

## The rules

| Rule | Root sentence (its marker goes here) | Kind | RuleSet | Target |
| --- | --- | --- | --- | --- |
| `skill.description-use-when` | `descriptions-and-invocation.md:6` (DESC-2) | mechanical: `frontmatter_field` `description`, `starts_with: "Use when"` | metadata | each `SKILL.md` |
| `skill.description-length` | `descriptions-and-invocation.md:27` | mechanical: `frontmatter_field` `description`, `matches` at most 1,024 characters | metadata | each `SKILL.md` |
| `rule.generalization` | `generalization.md:5` (GEN-1) | judged, threshold 0.8 | judged | list items and paragraphs |
| `call.completeness` | `calls-and-placement.md:26` (PLACE-19) | judged | judged | `call_site` on load and dispatch calls |
| `branch.condition` | `main-path.md:14` (MAIN-9) | judged | judged | `call_site` on `IF` and `When` branches |
| `completion.criterion` | `steering.md:7` (STEER-4) | judged | judged | `call_site` on `Completion:` and `Complete when:` |
| `guidance.positive` | `steering.md:10` (STEER-9) | judged | judged | list items and paragraphs |
| `reference.teaching-depth` | `calls-and-placement.md:18` (PLACE-14) | judged | judged | sections of reference files only |

All eight are `warn`. The exact selectors and patterns are settled in run 1 with `skill-rules`' decision matrix and its calibration, which may narrow a target; a rule whose selector can't be made honest is reported, not marked. That includes `reference.teaching-depth`: RuleSet applicability tests payload fields or asks a model, never a file path, so if run 1 can't confine it to reference files with the engine's own selection, it stays unmarked rather than become a proxy, F1 stays open, and run 1 returns that to the Lead, who brings the scope question to the owner. A result with fewer than eight rules is not accepted or shipped, since the six judged standards are the owner's choice (review R1, N1). The name rule (`descriptions-and-invocation.md:26`) is not marked: its folder-name half can't be seen by one field's check, so marking it would make a proxy.

## Where the files go

- `plugins/skill-authoring/skills/domain-skill-crafting/rules/`: `skill-metadata.ruleset.json` (input `skill`, a document; `marker_prefix` `K`; `rule_sources` pairing `../references/descriptions-and-invocation.md` with `descriptions-and-invocation.rules.json`), `skill-text.ruleset.json` (the same input and prefix; `rule_sources` pairing `generalization`, `calls-and-placement`, `main-path` and `steering` with their rules files), and one rules file per marked topic.
- `plugins/skill-authoring/skills/skill-rules/references/running-rules.md` (new): how a skill step runs the plugin's rules on a skill's files and reads the reports. The repository's rule runner is named by the repository's instructions; with none, report the rules as not run. Run check on both RuleSets, then evaluate the metadata RuleSet; read the engine's report (coverage, skipped rules, each occurrence's result); zero matches, partial coverage and refusals are gaps; the judged rules are reported as `not evaluated`. It loads `check-and-reports.md` for what each report field means rather than restating it.
- `tests/skills/scripts/run-skill-rules.mjs` and its test, with a `rules` script in `tests/skills/package.json` and `@sunstack/cli` 0.1.0 as a dev dependency (installed with its build script allowed for that one package; the owner approved sunstack installs and runs on 27 October). Parameters: skill folders (default every skill in `plugins/skill-authoring/skills/`), `--check` (assemble only), `--engine <path>`, `--out <dir>` for the requests and responses. It builds one `check_rules` request naming both RuleSets and one `evaluate_rules` request naming only the metadata RuleSet; binding groups follow each RuleSet's files: one per `SKILL.md` for the metadata RuleSet, one per `SKILL.md` and per `references/` file for the judged RuleSet. It runs `sunstack exec`, writes both responses, prints a short summary, and exits with the engine's status. It sets no credential and configures no reachable model endpoint.
- `AGENTS.md`: one line naming the command (`pnpm --dir tests/skills rules [skill folders]`).

## The two run sites

Each site loads `running-rules.md` with a path that resolves from the file holding the call, and every place its skill returns or completes reports the rules' actual state, never `pending` (review R1, F3 and F4).

- **`skill-review`**, implementation stage, first rule pass (`references/implementation-review.md:9`): the pending line becomes a complete call, `MUST load ../../skill-rules/references/running-rules.md` on the reviewed skill's files, returning the report; mechanical failures go to the review lead as candidate findings; the status block records each rule's state, with judged rules `not evaluated`. The stage's completion (`implementation-review.md:73`) names the rules' reported state in place of `rules: pending`.
- **`skill-creation`**, self-check (`SKILL.md:48`): the pending line becomes the same call, `MUST load ../skill-rules/references/running-rules.md` on the changed files; a mechanical failure is fixed before the diff comparison or named as a deviation. The self-check's completion (`:50`), both class returns (`:54` behavior-changing or scoped, `:55` mechanical) and the blocker (`:66`, now: a rule reported as run without the engine's report showing it ran) carry the actual state.

Both sites keep "a rule has run only when its report says so"; neither restates it, since `running-rules.md` owns it. A site whose repository names no runner reports the rules as not run, with the reason, at the same returns.

## Trigger and invocation

No description or invocation capability changes (review R1, G1). The four targets keep their descriptions and capabilities exactly as at `e326e387`: `domain-skill-crafting` stays hidden from model invocation (`disable-model-invocation` in its frontmatter, `agents/openai.yaml` for Codex); `skill-rules`, `skill-review` and `skill-creation` keep their `Use when` descriptions word for word. Run 1 places markers only in reference files, never in a description.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 | `domain-skill-crafting`: markers on the eight sentences, the rules files and both RuleSets, by `skill-rules`' procedure; `generalization.md`'s example describes its pull request without the number (F12) | update | Opus 5.5 xhigh | proposed |
| 2 | `skill-rules`: `references/running-rules.md` and its caller line | update | Opus 5.5 xhigh | proposed |
| 3 | the runner: script, test, `package.json` script and dev dependency | repository code | Sol, as an Implementer Sidekick | proposed |
| 4 | `skill-review`: first rule pass on, and its completion | update | Opus 5.5 xhigh | proposed |
| 5 | `skill-creation`: self-check on, its completion, both class returns and the blocker | update | Opus 5.5 xhigh | proposed |
| 6 | `AGENTS.md` line and the 0.6.0 changelog entry updated | documents | Sol | proposed |

Runs 1, 2 and 3 touch separate files and run side by side; runs 4 and 5 follow run 2 (they load its reference) and run side by side; run 6 follows. Every run checks its diff against F12 and reports the search it ran.

One unit: the runs call each other (the sites load run 2's reference, which runs run 3's command on run 1's RuleSets), so they are reviewed together once all have landed, with every path resolving. That unit review is a fresh `skill-review` implementation review that loads the branch's `skill-review` **after run 4**, so its first pass runs the new rules on this change itself; its host record must show that copy loaded and a native report consumed. Review R1 used milestone 1's copy, whose first pass is still pending, so it proves only the design route (review R1, F5).

## Security

The runner (run 3) runs a subprocess (`sunstack exec`) and the dev dependency's install step downloads the engine's binary from the published release. Decision, recorded here before outlining: **allowed**, with constraints: the runner runs only the engine binary it resolves, with requests it builds from local files; no network call of its own; no credential and no reachable model endpoint; the install is the owner's published package at a pinned version, with only that package's build script allowed (owner approval, 27 October). The dogfood proof also runs `prepare_rules` on the judged RuleSet (part four): it plans requests without sending them, and the engine builds a model backend first, so the proof gives it a non-secret placeholder key and an endpoint that accepts no connection; nothing can leave the machine, and no real credential is read. Every other surface: none in scope.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| E1 | All eight rules `warn` | the governing spec: no rule blocks before its eval; metadata is reported, never quality |
| E2 | Rules files and both RuleSets live in the root's `rules/` folder | the markers sit on the root's sentences, so their definitions travel with them |
| E3 | Skills name "the repository's rule runner", never a command | the owner: skills "that work anywhere" |
| E4 | One unit, one review | the runs call each other; reviewed whole, every path resolves |
| E5 | Version stays 0.6.0, in the same PR as milestone 1 | one PR by default; the owner may split it at plan review |
| E6 | Two RuleSets, split by evaluation need | the engine selects whole RuleSets and refuses a judged one without a backend (F1) |
| E7 | `prepare_rules` is a proof observation, not a runner mode | it shows the judged rules' selection without a model, but needs a placeholder backend; product code sets no credential (F2) |
| E8 | The root's overfitting example drops its pull request numbers | the owner, 27 October: skills that are general; the example teaches the same without the identifier (F12) |

## Coordination

Base: the Project 1 branch at `e326e387`, before U2c's correction lands (that correction touches only `skill-audit`, which no run here edits). Version 0.6.0 and its changelog entry are already in the branch; run 6 adds this change to that entry.

## Review record

- **Review R1**, at `5155d995`: **targeted-revision**, **revise-first**; five accepted findings (F1 to F5) and one coverage gap (G1). Review lead `codex-local/01a17d0d`; teaching reviewer `codex-local/01a17d13-eaae`, structure reviewer `codex-local/01a17d13-eb89`. Record: `tmp/project-1-reviews/review-r1-design.md`. Draft 2 answers each: F1 two RuleSets (E6); F2 per-file bindings, metadata on `SKILL.md` only, and `prepare_rules` as the reference-selection observation (E7); F3 both caller paths; F4 every return and completion named; F5 the unit review loads the post-run-4 copy; G1 the *Trigger and invocation* section. Also added, at the owner's direction: F12 and E8.
- **R1 correction check**, at `eeba2653`: **targeted-revision**, **revise-first**; F1 to F5 and G1 closed; two new accepted findings. N1: the seven-rule fallback let a reduced set pass the eight-rule gate; now fewer than eight leaves F1 open and goes back to the Lead and the owner. N2: F12's path ban would have rejected the plugin-relative call paths the sites need; now it bans paths tied to one machine, worktree or cache and keeps portable relative references. Record: `tmp/project-1-reviews/review-r1-design-corrections.md`.
