# 2026-10-31 Step 5 fixes: skill-crafting standards

`skill-authoring` 0.8.0 → 0.8.1. The first of the step-5 fix PRs: the findings the full rules run raised in `domain-skill-crafting`.

- `domain-skill-crafting`'s description says only when to load it, and drops the inventory of standard areas (the skill stays hidden from model invocation).
- Three reference calls now load on a condition the agent can see, keeping each call's target and return:
  - `calls-and-placement.md`: a citation whose moment is a condition takes the main-path branch test;
  - `descriptions-and-invocation.md`: a decision that sets or changes how a client exposes the skill, whether hiding, restricting or restoring it, takes the platform encodings;
  - `main-path.md`: a lens that rests on a leading word or phrase, familiar or coined, takes steering's leading-word standards.
- The step-5 fix design set lives in `docs/wip/skills-authoring/2026-10-31-step5-skill-fixes/`: requirements, specification, skill design (with the security inventory), verification and `runs.json`. The later fix PRs cite it.
- Validation:
  - a complete keyed rules run over the skill on the 0.8.0 kit: no incomplete part, no skipped rule, 0 errors, no description warning, and all four assigned findings cleared;
  - `tests/skills`: tsc clean, vitest 268/268, `rules --check` 13 rules;
  - the independent review had no source finding.
- Codex and Claude caches: not refreshed.
