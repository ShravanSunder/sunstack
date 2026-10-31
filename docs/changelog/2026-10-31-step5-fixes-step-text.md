# 2026-10-31 Step 5 fixes: step text

`sunstack-dev` 2.101.6 → 2.101.7 and `dev-workflow-tools` 0.1.2 → 0.1.3. The last step-5 fix batch: findings the full rules run raised in step text, branch conditions and call returns.

- Three branch conditions now name what selects them:
  - `presentation-tui` and `presentation-webui` load diagram semantics when the request asks for a diagram or drawing, or how several components, states or steps work together;
  - `role-advisor` loads research when an assumption rests on an external fact no decisive source in the work establishes.
- `ops-observability-stack`'s two reference calls now say what they return: each lifecycle command's result, or the fresh run's marker with the canary check.
- `peekaboo`'s input-path probes say when to stop.
- No `Completion:` labels were added: under the owner's D4 = A decision the model judges a step's own words, so the batch's 24 appended label lines were dropped before this PR.
- Validation:
  - `tests/skills`: vitest 268/268, tsc clean, `rules --check` exit 0;
  - keyed rules run over the batch's nine skills: no finding on a changed line, and every finding and uncertain piece dispositioned.
- Codex and Claude caches: not refreshed.
