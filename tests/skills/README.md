# Skill Pressure Tests

Rule usefulness is checked on real sources pinned by Git. The excerpt corpus and its scoring harness have been removed. Definitions under `evals/rule-scenarios/` retain the original calls and their provenance; runtime skill folders contain only config, rules and evidence. Engine mechanics belong to sunstack-tools.

Unit tests are colocated beside their modules; integration and end-to-end tests live in `tests/integration/` and `tests/e2e/`, with shared support in `tests/support/`. Run all local checks with `pnpm --dir tests/skills test` and `pnpm --dir tests/skills typecheck`. The pressure entry `test:evals`, its library and sample scenarios remain; receiving-agent pressure proof is separate from rule checks.

> **Status 2026-10-09:** the scenarios were removed while pressure testing is redesigned; this harness, its evaluator library, and its unit tests stay. `pressure-scenarios/` does not exist until a new scenario is added, so `test:evals` exits 1 with nothing to run. The unit tests read sample copies under `fixtures/sample-scenarios/`.

This harness pressure-tests Codex skills through Codex. Most scenarios cover
`sunstack-dev`; plugin-specific skill scenarios may live here when they
need the same shortcut-resistance harness.

Default model transport: ACPX with the `codex` adapter

Default model: `gpt-6-luna`

Default subject reasoning effort: `medium`

Default semantic judge: `gpt-6-luna` at `xhigh`

Default safety: read-only sandbox

The harness pins `@agentclientprotocol/codex-acp@1.6.2`, starts its real read-only mode, and keeps approval review with the client. Adapter 1.10.0 maps its `read-only` preset to workspace-write, so approval flags alone are insufficient. A live probe against the pinned route read source successfully and denied an attempted edit. Recheck that boundary before changing the pin; no global configuration change is required.

If the pinned adapter's bundled Codex does not advertise the configured model, set `SKILL_PRESSURE_CODEX_PATH` to an absolute path for the installed Codex binary when running an eval. This changes the launched binary while retaining the read-only mode and client approval boundary. The harness ignores an inherited `CODEX_PATH` unless this explicit setting is supplied.

Subject and judge children disable lifecycle hooks so personal Stop prompts cannot alter scenario inputs or judge output. This invocation-local setting does not change home configuration or sandbox permissions. Failed runs retain bounded diagnostics in their existing artifact directory.

The goal is not to ask whether an agent can summarize a skill. The goal is to
test whether it still follows the skill when the prompt pressures it to take a
shortcut.

Active scenarios live at
`pressure-scenarios/<plugin-name>/<skill-name>/<scenario-name>.md`. The
`skill_under_test` metadata must match those plugin and skill folders. Select a
scenario by its stable `scenario_id`, not by its file path.

Run the fast Vitest eval suite:

```bash
pnpm --dir tests/skills run test:evals
```

Run one scenario:

```bash
pnpm --dir tests/skills exec vitest run evals \
  --config vitest.config.ts \
  -t discuss-pathfinding-explain-meaningful-choice
```

The Vitest runner lives in this directory as a standalone test package. Run its
unit checks with:

```bash
pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts
pnpm --dir tests/skills exec tsc --noEmit
```

Use the fake backend for cheap harness/report plumbing proof without invoking a
live agent:

```bash
SKILL_PRESSURE_BACKEND=fake \
  pnpm --dir tests/skills exec vitest run evals \
  --config vitest.config.ts \
  -t discuss-pathfinding-explain-meaningful-choice
```

Vitest owns selection and execution for the four-skill evaluator path; use
native `-t` test-name filtering for one scenario. The legacy path still accepts
`SKILL_PRESSURE_MODE=integration` and `SKILL_PRESSURE_SCENARIO=<scenario-id>`
during the focused cutover. Set `SKILL_PRESSURE_TIMEOUT_SECONDS=<seconds>` for
the ACPX subject timeout.

Vitest eval artifacts are written under `tmp/skill-pressure-evals/`.

Subject and judge execution both use ACPX. Override their model, effort, and timeout through `CODEX_PRESSURE_MODEL`, `CODEX_PRESSURE_REASONING_EFFORT`, `SKILL_PRESSURE_TIMEOUT_SECONDS`, `SKILL_PRESSURE_JUDGE_MODEL`, `SKILL_PRESSURE_JUDGE_REASONING_EFFORT`, and `SKILL_PRESSURE_JUDGE_TIMEOUT_SECONDS`.

Codex profiles do not currently apply when `codex-acp` starts app-server. As a temporary profile-equivalent bridge, `SKILL_PRESSURE_CODEX_CONFIG` accepts an explicit JSON object and `SKILL_PRESSURE_CODEX_MODEL_PROVIDER` selects a provider defined by that configuration. The harness does not read a local Codex profile automatically.

The model under test sees only the scenario's `## Prompt` section plus the
minimal metadata needed for its JSON report. `Expected Compliant Behavior`,
`Failure Signals`, and the `expect_*` assertions are grader-only; showing them
to the model lets it parrot compliance it never demonstrated.

Scenarios for retired skills used the same shape under
`retired-pressure-scenarios/` and were excluded from the active runner; they
were removed on 2026-10-09 and remain in git history.

Limitations:

- Legacy scenarios still evaluate the agent's final self-reported JSON. The four
  in-scope skills use deterministic evaluators over stable evidence and one
  semantic judge for obligations that require understanding.
- For skill behavior changes, pair pressure runs with a baseline source or prior
  plugin check when possible so RED/GREEN proof does not rely only on a
  cooperative model answer.

Use `--integration` only for slower tests that create temporary projects or
exercise real files. Claude and `agy` are optional future backends, not the
default harness.

The Vitest eval path stores ACP events raw in the first implementation.

## Git-pinned rule scenarios and owner adoption

Scenario definitions live at `tests/skills/evals/rule-scenarios/<rulebook>/<rule-name>.scenario.json`, one rule record and its development scenarios per main file. A `<rule-name>.held-back.scenario.json` companion has `rules: {}` and only frozen held-back scenarios; the main file owns the rule record. Orphan companions, duplicate identities and mixed sets are refused. Dropped-rule history stays under `retired/` and never runs. Scenario IDs, source/context and selectors stay pinned; label changes record their independent or owner basis. Legacy/unclassified scenarios earn no floor. The skill's `rules/` directory holds runtime config, rules and evidence only.

Run `pnpm --dir tests/skills evals:scenarios --check` without a key to validate all definitions. `pnpm --dir tests/skills evals:scenarios [rule…]` evaluates all active scenarios or the named rules through the Lead's credential wrapper. Upstream sources use the existing local collection checkout via `AI_DEV_SKILLS_ROOT`; AgentStudio uses `AGENTSTUDIO_REPOSITORY`. No fetching occurs; unresolved source paths/commits become gaps.

A named-rule run keeps the complete standards/rules pair so the engine can validate every marker. Sibling entries and undeclared pieces of the requested rule may also be evaluated and remain visible in raw results. Semantic uncertainty, cuts and unresolved selections block only declared scenario pieces, matched by rule, file and piece. Native incomplete responses and assembly/config/coverage gaps remain globally blocking. Ordinary lint keeps its existing strict behavior. Engine 0.7.0 asks `filters.kind` from each skill folder's description once; only `general-skill.overfits-to-product-workflow` is gated on general, role or domain.

Runs write only to Git-ignored `tests/skills/tmp/scenario-runs/<UTC>/report.json` and `raw/`. Each raw run keeps the engine JSON report (evidence seen and answers), stderr, selected rules and the config used. The runner retains engine JSON and stderr; it does not capture provider HTTP envelopes. Outcomes, locators and coverage gaps stay separate; exit 1 is a labelled contradiction, exit 5 an unsure/incomplete run, and exit 0 requires every selected scenario to match. An empty/partial rule population, declared-piece cut, cancellation or missing result cannot earn adoption. A correct breach with a wrong locator is a labelled failure and exits 1; disputed labels cannot earn a clean success.

Stdout and the saved report also summarize every configured rule: its current adoption-derived state and held reasons, scenarios by kind/set/label state, this run's development and held-back results, and bar status with cited scenarios. Unrun rules have no run result; a passing run still does not create adoption.

Ordinary `rules` reads `adopted.json`, never a generated run. On an explicit owner instruction, `pnpm --dir tests/skills evals:adopt <rule> --report <path>` records date, owner, passing counts, report pointer and current fingerprint. It refuses incomplete, failed, unsure, omitted/duplicate or stale results. Running scenarios alone never adopts anything. The adoption file is the authority for which rules the owner has adopted.

A judged rule nudges only when its current conservative fingerprint matches the owner's adoption and its reason, decision, floors, independent held-back set and tuned bars also hold. Fingerprints cover the rule/record/scenarios, whole paired standards Markdown, canonical config/evidence files, engine version and model; gated rules also include the kind-scenario file bytes. No entry or a changed input yields `not_adopted`; both formatter and current accounts suppress held/dropped nudges. Raw engine JSON and exit status remain intact. The three kept mechanical standards do not require adoption.

A full gated run also assesses the 78 Git-pinned kind scenarios in `evals/kind-filter/skill-kind.scenario.json`: 73 carried blind agreements, three owner rulings and two disputed labels. Exact-kind accuracy and run/exclude/skip counts stay separate. Every identity must have complete filter acquisition; valid unsure is listed as a skip and does not itself block adoption, while a wrong run or wrong exclusion on a labelled scenario does. Disputed labels remain unscored. The rule's own scenarios must all be caught with none unsure.

The separate `purpose: kind_corpus` engine run uses the same canonical policy and full standards/rules pair. It records sibling graph calls, usage/spend, rule-piece cuts, rule uncertainty and unresolved selections. In this run, every downstream rule observation is supplemental to filter acquisition. Filter-input cuts, incomplete acquisition, missing identities, engine exits other than 0/5 and assembly/config/coverage failures still block. Canonical config and corpus digests bind the sections to current inputs; ordinary lint writes its config identity in `canonical-inputs.json`.

For development-only tuning, run `pnpm --dir tests/skills evals:scenarios <rule> --set development`; the custodian can later run `--set held_back`. Set-scoped runs acquire only that set's rule sources, keep its native folder filter, skip the kind corpus, and remain incomplete and non-adopting (exit 1 for a labelled failure, otherwise 5). The other set appears only as `N not run`, without its IDs, records or results in stdout, report or raw artifacts. Trust state is `not_assessed` in this view. Setup errors omit private validation details; the custodian validates the complete inputs. Use a full run after tuning for adoption evidence.

The `rules` command's current-skills accounts still list uncovered nudges, per-rule pass/exclusion samples, cuts and gaps for a person's written disposition. The list does not change the engine exit. Scenario coverage needs a matching commit, rule and source piece, so historical scenarios cannot hide new nudges.

The evidence profile allows 50,000 section characters, 131,072 request characters, 131,072 encoded input bytes and up to 1,000 locator lines. Engine 0.7.0 accounts `max_input_tokens_per_request` in encoded bytes. Native local-provider controls verify the 908-line catalogue remains uncut with its 907-option locator, and that a smaller byte budget omits the oversized optional locator. These checks establish capacity, not locator accuracy. Provider envelopes are not captured in real keyed runs; retained engine usage supplies their reported tokens and spend.

Runner integration tests read unchanged skill bytes through `pinned-source.ts`. Scope tests may relocate those bytes. Controlled local providers exercise warning, uncertainty, malformed reply, incomplete and cancellation boundaries; they establish no model accuracy. `cancel-engine.ts` launches the real engine and exposes its PID for causal cancellation after provider arrival. `pnpm test` remains keyless.
