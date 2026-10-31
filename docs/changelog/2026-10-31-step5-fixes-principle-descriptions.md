# 2026-10-31 Step 5 fixes: principle descriptions

`sunstack-dev` → 2.101.5. The fourth step-5 fix PR: the description findings the full rules run raised in the 16 principle skills.

- Each principle's description keeps its `Use when` sentence word for word. It drops the summary of the judgment that followed, which the body already teaches. Lengths now run 111–218 characters, all under the 225 warning.
- `principle-prove-it-works` gains one situation its removed sentence named: "or when a passing test is offered as proof that it does".
- All 16 stay hidden from model invocation, so trigger trials don't apply. Callers cite principles by name and path, and no skill quotes a description. The maintainer index `plugins/sunstack-dev/docs/principles-index.md` keeps its own summaries.
- Validation:
  - a complete keyed rules run over the 16 principles on the 0.8.0 kit: no incomplete part, no skipped rule, no finding at all;
  - `tests/skills`: tsc clean, vitest 268/268, `rules --check` 13 rules;
  - the independent review had no source finding.
- Codex and Claude caches: not refreshed.
