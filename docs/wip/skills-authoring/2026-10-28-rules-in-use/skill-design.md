# Rules in use: skill design

Draft 1, by the 🦁 Lead, 2026-10-28. Part three of the design set: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). Built on #171's branch at `9eabb3a8`, after the first checked rules.

## The shape

```text
skill-creation self-check ─┐
skill-review first pass ───┤                    ┌─ check_rules    every RuleSet (assembled, printed)
skill-orchestrator prove ──┼─► skill-rules'    ─┼─ evaluate_rules mechanical RuleSets (local, no model)
skill-audit over skills ───┘   running-rules.md └─ evaluate_rules judged RuleSets, only with --judge and a key
                                    │                 (Jev; eligibility gate first; results advisory until calibrated)
                         the repository's rule runner  (ai-tools: pnpm --dir tests/skills rules [--judge] [folders])
                                    │                    default: every plugin's skills
                         sunstack exec  (@sunstack/cli, pinned)
```

What changes from the first checked rules:

- every plugin is checked by default, not only skill-authoring;
- judged rules can run, with an explicit `--judge` and a key;
- each judged rule judges only the units its standard governs;
- the audit and the orchestrator run the rules;
- the description standards are the owner's.

## Security, decided before the runner is outlined

| Label | Decision for the runner (run 3) |
| --- | --- |
| sensitive surfaces | shell and subprocess (`sunstack exec`); network access (the engine calls Jev at OpenRouter); a credential (`OPENROUTER_API_KEY`) |
| entry points | `pnpm --dir tests/skills rules [--judge] [folders]`; the four skill sites through `running-rules.md` |
| untrusted inputs | skill text and the engine's responses; nothing from the network reaches a shell |
| privileged actions | sending selected skill files to Jev |
| decision | **allowed**, with these constraints |

The constraints:

- **Explicit opt-in to send.** The runner sends content only with `--judge`, which a repository's own instructions decide to use. `AGENTS.md` here says skill text is public and may be judged.
- **The key.** It comes only from the runner's environment and is never read from a keychain or 1Password by the runner. It's never written to a request, response, log or summary; any file about to be saved that contains it is refused.
- **Cost.** A request cap (default 400) and the reported cost are printed; a run that would exceed the cap stops with the gap named.
- **Destination.** No endpoint other than the engine's configured Jev backend.

Proof required: the runner's own tests (`--judge` absent, `--judge` without a key, and `--judge` with a synthetic key against a local endpoint), and one real `--judge` run whose saved files contain no key. Public-safe: no cache path, account or `op://` reference in any shipped file. Review route: the unit's implementation review, with this table as its security input. Every other surface: none in scope.

## The rules

| Rule | Root sentence | Kind | Severity |
| --- | --- | --- | --- |
| `skill.description-opener` (was `-use-when`) | standard 1 | mechanical: `frontmatter_field` `description`, `matches` the four openers | warn |
| `skill.description-length-warn` | standard 4 | mechanical: `matches` at most 225 characters | warn |
| `skill.description-length-limit` | standard 5 | mechanical: `matches` at most 300 characters | error |
| `description.names-the-moment` | `descriptions-and-invocation.md` "names the situation…" | judged: target the skill's title section, description as `frontmatter_field` evidence | warn, advisory |
| `description.no-workflow` | "carries no workflow steps…" | judged, the same target and evidence | warn, advisory |
| the six existing judged rules | as now | judged, each given G9 eligibility | warn, advisory |
| the inventory's other judged standards | `root-standards.md` judged rows | judged, with eligibility | warn, advisory |
| the inventory's 2 mechanical | `root-standards.md` mechanical rows | mechanical, calibrated on good and bad cases | warn |

The old 1,024-character rule goes; the 300 limit replaces it, and the platform's 1,024 maximum stays a stated fact, unmarked. Run 1 settles each new judged rule's exact selector and eligibility question with `skill-rules`' decision matrix. A standard the matrix finds unready is returned with its rewrite, not marked. A rule whose eligibility can't be made honest stays unmarked, with its evidence.

**Eligibility (G9), by rule:**

- `rule.generalization`: judges rule statements, not local instructions. A gate asks whether the paragraph states a reusable rule.
- `guidance.positive`: judges guidance paragraphs.
- `reference.teaching-depth`: judges a section that owns a stage, not a lookup or subsection. Narrowed by a selector where the engine allows, otherwise by a gate.
- `call.completeness`, `branch.condition`, `completion.criterion`: keep their call-site selectors. A gate gives each the call's surrounding step as context, so a complete local example isn't judged in isolation.

The hosted run's 2,005 warnings and their sampled causes (`tmp/project-1-fix/hosted-sample-review.md`) are the development cases.

## Where the files go

- **`domain-skill-crafting/references/descriptions-and-invocation.md`:** standards 1 to 6, and the depth that teaches the `Always` choice and the two-prompt trial, including the hidden-skill case.
- **`domain-skill-crafting/references/calls-and-placement.md`:** standard 7 (L1).
- **`domain-skill-crafting/rules/`:** the changed and new rules entries, the eligibility gates, and a RuleSet split if severities or evaluation need it.
- **`skill-rules/references/running-rules.md`:** G13's reading. Run the check; evaluate the mechanical RuleSets; with the repository's judge flag and a key, evaluate the judged ones; read each result by its kind and calibration state; carry every gap to the caller's return.
- **`skill-rules/references/check-and-reports.md`:** a section "Calibrate each judged rule", beside the mechanical one (G15), so calibration has one home.
- **`skill-rules/references/decision-matrix.md`:**
  - the frontmatter near miss now names the evidence route (G4);
  - a worked case of an eligibility gate (G9).
- **`skill-rules/references/markers-and-rules.md`:** how an eligibility gate is written: a gate question before the verdict, or a narrower selector.
- **`tests/skills/scripts/run-skill-rules.mts`** (renamed from `.mjs`), its test, `tsconfig.json` including `scripts/**/*.mts`, and `package.json`'s `rules` script. G12 behavior: default every plugin; `--judge`; the key passed through only then; request cap and cost; gaps named; no key in any output.
- **`AGENTS.md`:** the runner line, with `--judge` and the statement that this repository's skill text is public and may be judged.

## The four sites

Each loads `running-rules.md` with a path that resolves from the file holding the call; each return and completion reports the rules' actual state.

- **`skill-creation`, self-check:** runs on the changed files. An `error` is fixed before the diff comparison; a `warn` is fixed or named; a judged warning is confirmed or named as a candidate.
- **`skill-review`, first rule pass:** as now. Judged warnings become candidate findings the review lead confirms at their anchor, marked with their rule's calibration state.
- **`skill-orchestrator`, step 4:** the `rules: pending` line becomes a call on the change's files. An `error` returns to step 3; judged warnings go into step 5's assessment; the run summary's `rules:` line reports the actual state.
- **`skill-audit`, its rule step:** the `rules: pending` line becomes a call over the skills in scope. A failed check or a confirmed judged warning flags its skill beside the step 2 signals. The return's `rules:` line reports what ran, what was judged, and every gap.

## Trigger and invocation

Seven descriptions change, to meet G1 and G3 at 225 characters or less; each keeps its invocation capability. `domain-skill-crafting` stays hidden (frontmatter and `agents/openai.yaml`). Each writer drafts its skill's description against the root's standards, and its run carries G5's trial (one true prompt and one near miss, two fresh sessions each, capped at three turns). Today all six model-visible ones load 2/2 and stay quiet 2/2, and the new ones must too.

## Runs

| Run | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- |
| 1 | `domain-skill-crafting`: standards 1 to 7, markers and rules entries with eligibility, severities, its description | update | Opus 5.5 xhigh | proposed |
| 2 | `skill-rules`: `running-rules.md`, judged calibration in `check-and-reports.md`, decision-matrix and markers-and-rules cases, its description | update | Opus 5.5 xhigh | proposed |
| 3 | the runner: `.mts`, G12, tests, `tsconfig`, `package.json`, `AGENTS.md` line | repository code | Sol, Implementer Sidekick | proposed |
| 4 | `skill-creation`: self-check reading, its description | update | Opus 5.5 high | proposed |
| 5 | `skill-review`: first pass reading, its description | update | Opus 5.5 high | proposed |
| 6 | `skill-orchestrator`: prove-step site, run summary, its description | update | Opus 5.5 high | proposed |
| 7 | `skill-audit`: rule site, its return, its description | update | Opus 5.5 high | proposed |
| 8 | `skill-design`: its description; its verification step plans G5's trial for a changed description | update | Opus 5.5 high | proposed |
| 9 | calibration (G16): labeled sets from the owner's samples, eligibility then threshold, held-out results per rule | eval | Sol Researcher, with the owner labeling on a presentation-html page | proposed |
| 10 | consumer run (G17): #172's `presentation-html` design-page phone-width change, made by fresh agents with this kit on a scratch branch from this change's head, with a description over 300 characters planted | proof | fresh Opus writer, Sol reviewer | proposed |
| 11 | changelog entry, plugin versions, `AGENTS.md` check | documents | the Lead | proposed |

Order:
- **Side by side:** runs 1 and 3 (separate files); then run 2, which reads run 1's rules.
- **After run 2:** runs 4 to 8, side by side.
- **Then:** run 9, which needs runs 1 to 3; run 10, which needs all of 1 to 8; run 11 last.

Every run checks its diff against G18 and reports its search.

One unit, one review: the runs call each other. After run 11, a fresh `skill-review` implementation review loads this branch's `skill-review`, so its first pass runs the new rules, with `--judge`, on this change itself.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| E1 | The 300 limit is `error`; everything else `warn` | The owner: "300 means it fails its a failure" |
| E2 | Judged rules are `advisory` until calibrated, and never block | The owner's spec: no judged rule blocks before its eval; the 73% warning rate shows they aren't ready |
| E3 | Sending text to Jev needs `--judge`, which a repository's instructions choose | Content leaving the machine is the repository owner's choice; the Codex reviewer refused it twice without the owner's direct word |
| E4 | The runner takes the key from its environment only | The OS keychain lookup lives in the CLI (#94, unreleased); the runner adds no second credential path |
| E5 | Version stays 0.6.0, in #171 | One PR; #171 is unreleased |
| E6 | The consumer run is #172's design-page phone-width change, made on a scratch branch | It's real work already decided (I5); a scratch branch keeps #172 untouched until #171 merges |
| E7 | "Passes" means A (requirements) | The Lead's and the Advisor's recommendation, offered to the owner on 28 October |
| E8 | Trigger trials: two fresh sessions per prompt, three turns, no extra reruns without the Lead | The 28 October trigger runs cost $24.77 with reruns; the owner's attention to cost |
| E9 | Description judgments go through the title section with the description as evidence | The engine refuses a frontmatter judged target; the probe showed the evidence route works |
| E10 | Calibration labels come from the owner's samples, with the owner labeling the HTML ones | The owner, 28 October: existing samples, current skills, and "we will go though html presetnation samlpes" |

## Coordination

- **Base:** #171's branch, `worktree-project-1-skill-crafting`, at `9eabb3a8`. Skill-authoring 0.6.0 and its changelog entry are already there; run 11 extends that entry.
- **After merge:** #172 and #173 take this in by merge. #172 then fixes its 17 descriptions and I5's presentation-html change for real.
- **Work thread:** board "Workflow improvements", project `01a1635f`.

## Review record

None yet. The design review (`skill-review`, design stage, Sol xhigh) comes next, then the owner's look at the page.
