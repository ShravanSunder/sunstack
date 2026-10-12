# 2026-10-12 principles layer

`shravan-dev-workflow` 2.72.1 → 2.74.0 (2.73.0 is held by the design-family branch, draft PR #122).

- New bottom skill layer: 17 `principle-*` skills, one engineering judgment each, written as a short card (apply when, rule, why, the test, distinct from, applied means, a worked case, and when it is overkill). Names chosen by the owner, for example `principle-design-for-failure`, `principle-justify-the-complexity`, `principle-prove-it-works`, `principle-refine-mental-models`.
- Callable by name only: `disable-model-invocation: true` (Claude) and `policy.allow_implicit_invocation: false` in each `agents/openai.yaml` (Codex). No existing skill loads one yet.
- A principle names only sibling principles. `plugins/shravan-dev-workflow/docs/principles-index.md` maps the family (a maintainer doc until a skill loads it).
- README: `principle-*` namespace row and a Principles section. Repo `AGENTS.md`: principles added to "Skill layers" and the skill table. No existing skill changed.
- Behavior: drafted from owner intent and not evaluated. By owner decision this change adds no automated, pressure, or trigger tests; the card shape follows an earlier one-fixture ablation of a pilot card.
- Codex `quick_validate.py` allows only name, description, license, allowed-tools, and metadata, so it would flag `disable-model-invocation`; the Codex runtime parser ignores unmodeled keys and reads invocation policy from `agents/openai.yaml` (checked in `openai/codex` source). Loading and invocation on installed clients are unverified until release readback.
- Validation: `claude plugin validate .` passed. `codex plugin list --marketplace ai-tools --available --json` exit 0 (it lists the configured local marketplace, not this branch). Codex `quick_validate.py` not run: PyYAML unavailable. `tests/skills` not run (no test changes).
- Codex and Claude cache refresh: not done (release readback step).
- Design record: `docs/wip/skills-authoring/2026-10-12-principles-layer/spec.md`.
