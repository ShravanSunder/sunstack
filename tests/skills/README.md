# Skill Pressure Tests

Rule usefulness is checked on real sources pinned by Git. The excerpt corpus and its scoring harness have been removed. Definitions under `evals/rule-scenarios/` retain the original calls and their provenance; runtime skill folders contain only config, rules and evidence. Engine mechanics belong to sunstack-tools.

The presentation-html nudge tests (`picture-before-control.test.ts`, `section-content-nudges.test.ts`, sharing `tests/support/presentation-html-lint.ts`) use their own explicit CLI 0.21.1 invocation; the shared CLI pin stays at 0.9.0. The config check and the generated picture, section and table pages always run. Its private frozen-page regression is visibly skipped when neither `SUNSTACK_PICTURE_DEVELOPMENT_CORPUS` (a clean external Git archive) nor `SUNSTACK_PICTURE_DEVELOPMENT_OBSERVATIONS` (the independently reviewed observation JSON) is supplied; it fails loudly when only one is supplied or a supplied path is missing. With both supplied, it verifies their fixed commit/hash, all 52 native outcomes and all 37 reviewed observations (one named owner-ruling override) without a provider key. Private page contents are not bundled here; an ordinary CI run without them does not prove that regression.

The requirement coverage integration test pins CLI 0.20.1 explicitly. It validates the design-review config and runs generated HTML and Markdown design sets (covered, one id missing from one page, look-alike ids, `verification-design` pages, an absent page) without a provider key.

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

## Native rulebook checks and cases

Run the installed native CLI from the repository root:

```sh
pnpm --dir tests/skills install --frozen-lockfile
tests/skills/node_modules/.bin/sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json --check
tests/skills/node_modules/.bin/sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json --rules
```

Agents use the same `sunstack lint --config <config> [paths]` command directly.
Add `--all` for every configured skill file, or `--since REV` for changed files.
A run with model questions requires the authorized credential route. Local tests
use a scripted loopback provider and synthetic credentials; they make no paid
provider calls.

`--report <file>` saves complete requests, answers, model receipts and rulebook
contents. Human output gives short file:line summaries and result IDs. Open one
result with `sunstack lint show <file> <id>`; no second model run is needed.

The active rulebook has three mechanical description checks and the asking R02
`load-call.names-when-where-and-result`, using full caller evidence and the evaluated
`typesafe/jev-1.14-20261014` model. R02 moved byte-for-byte from its frozen held entry
after the Lead accepted its held-out counts: 3 warnings right, 4 quiet right,
4 quiet unsure, zero false warnings or misses. Ordinary lint needs an authorized
credential; `--all --prepare <file>` builds its requests without dispatch.

The kind filter and K002 remain unchanged under `rules/held/`, outside active
pairs. Its README retains their development history and limitations. Original
unconfigured entries keep their marked standards and JSON, even where a new
active entry now checks the same standard. Teaching elsewhere can evolve independently.

R02's development-only file is `evals/cases/call-completeness.cases.json`; its
provenance records the original blind labels and both calibration run receipts.
Its 21 cases are reused by two development runs, not 42 independent examples.
The separate held-out source and labels remain outside the author's inputs.
The legacy `evals/cases/skill-rules.cases.json` and `case-provenance.json` retain
other held subjects and their splits; they are not R02 development inputs.
The native `sunstack lint cases <file> --set development` command scores declared
subjects through the configured rulebook; `--prepare <file>` sends nothing.
No case result automatically changes ordinary lint selection.
Unlabelled or disputed cases stay listed outside the scored inputs; they never
receive guessed expected outcomes.

The former scenario JSON files remain historical input to the mechanical
conversion. The protected product-workflow companion is not a development input.
Do not inspect held-out labels or source while authoring questions or reference.
Bars start unassessed and are set only from the authorized development run.
Six former gate-only rows with explicit owner kind labels are filter cases,
outside the rule floors. Three without a same-revision labelled development
kind stay unscored. The two original supplementary kind rows keep their
`supplement` set and are outside the development and held-out commands.

The local test inventory records keep, repair or remove for each affected test.
Native CLI tests retain real description boundaries and authored rulebook
behavior. The generic engine owns extraction, requests, tree walking, saved
reports and case matching. These checks establish mechanics on their named
sources, not model accuracy or a receiving agent's judgment.
