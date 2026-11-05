# Skill Pressure Tests

Rule usefulness is checked on real sources pinned by Git. The excerpt corpus and its scoring harness have been removed. Sibling `*.expect.json` files beside the authored `*.rules.json` files retain the original calls and their provenance; they contain no skill text. Engine mechanics belong to sunstack-tools.

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

## Git-pinned rule cases

Run `pnpm --dir tests/skills rules:expect --check` without a key to validate every sibling `*.cases.json` file. Run `pnpm --dir tests/skills rules:expect` through the established credential wrapper for real rule proof. Upstream entries resolve only through the local `ai-dev-skills` checkout named by `AI_DEV_SKILLS_ROOT`; the repository list never fetches. Missing repositories, commits or paths are setup gaps.

Entries naming `agentstudio` resolve through `AGENTSTUDIO_REPOSITORY`, the local AgentStudio checkout. Leaving it unset preserves those entries as setup gaps.

The runner archives each repository/commit once outside this checkout, lints only the source paths for each rules file, and removes the snapshot. It prints an external JSON report directory. Each entry reports outcome, locator and its own coverage gaps separately; run-wide gaps appear once per engine run. Exit 1 means a labelled case was contradicted, exit 5 means uncertainty or a gap, and exit 0 requires every active case to match without gaps. `--out` chooses an empty external report directory; `--engine` chooses the executable explicitly.

The existing `rules` command also prints the current-skills account list and saves `accounts.json` beside its engine report: uncovered nudges, per-rule pass/not-applicable samples, cuts and exclusions. Each item needs a person's written account; listing them does not change the engine's exit code. Coverage requires a matching pinned commit, rule and source piece, so an old case cannot hide a new nudge. These supporting accounts are separate from case proof and receiving-agent pressure tasks.

Each rulebook has one case file with its owner decision, reasons, bar sources and Git-pinned cases. Retired cases remain history and never run. `rules:expect` writes a sibling `*.case-run.json` tied to the canonical rule, config, evidence, cases, engine and model; an empty, partial, stale, failed or unsure run cannot admit a judged rule. Ordinary `rules` runs derive states afresh, list held reasons and omit held/dropped nudges from both the main report and current accounts. The raw engine JSON and exit status are retained. Legacy migrated labels and unclassified cases earn no floor; kind-gated behavior and mined admission sets arrive in later deliverables.

Runner integration tests also read unchanged skill bytes through `pinned-source.ts`. Scope tests may copy those bytes to different checked paths. Controlled local provider replies exercise warning, uncertainty, malformed reply, incomplete and cancellation boundaries; they establish no model accuracy. `cancel-engine.ts` only launches the real engine and exposes its PID for cancellation after request arrival.
