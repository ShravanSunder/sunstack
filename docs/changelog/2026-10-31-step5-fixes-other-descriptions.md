# 2026-10-31 Step 5 fixes: other descriptions

`sunstack-dev` → 2.101.6, `scaffold-project` 0.2.2 → 0.2.3, `dev-workflow-tools` 0.1.1 → 0.1.2. The fifth step-5 fix PR: the description findings the full rules run raised in nine more skills.

- **Trimmed to 225 characters or fewer.** Every trigger situation and `Not for` boundary is kept:
  - `scaffold-project`, `peekaboo`;
  - `discuss-clarify-mental-models`;
  - `domain-rust`, `domain-typescript`;
  - `presentation-tui`, `presentation-webui`;
  - `role-advisor`, `role-verifier`.
- **What was dropped:** tool lists, inventories and summaries the bodies already teach.
  - `role-verifier`'s boundary now reads "writing product tests", so the Verifier still checks the tests it's offered.
  - The two domain skills stay hidden; the other seven are model-invocable.
- **A test pin updated:** one contract test pinned two phrases of the old `discuss-clarify-mental-models` description (`spec-program-design-user-requirements-contract.test.ts`). Its pins move to the new phrases, and it still checks the same re-anchor trigger and four-part boundary.
- **Validation:**
  - a complete keyed rules run over the nine skills on the 0.8.0 kit: no incomplete part, no skipped rule, 0 errors, no description finding;
  - `tests/skills`: tsc clean, vitest 268/268, `rules --check` 13 rules;
  - the independent review closed one finding (1 → 0).
  - Live trigger trials for the seven model-invocable descriptions were not run.
- Codex and Claude caches: not refreshed.
