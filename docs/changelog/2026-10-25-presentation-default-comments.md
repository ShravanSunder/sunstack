# 2026-10-25 Presentation HTML default Comments

`sunstack-dev` 2.99.0 updates `presentation-html` and its `options-and-decisions.md` and `patterns.md` references.

Ordinary pages use automatic Comments when the guide at their binding documents that default, without manual feedback tags, document metadata or paragraph labels. Older bindings keep their own contract; opt-out and overrides follow the matching guide. Answer controls remain task-driven, with one native feedback handoff.

All six Codex, Claude and Cursor plugin/marketplace version fields move to 2.99.0. The changelog index links this entry; no commands, hooks or plugin README sections change.

Validation: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts` (169 passed); `pnpm --dir tests/skills exec tsc --noEmit`, `claude plugin validate .`, source link/manifest checks and `git diff --check` passed. Codex marketplace discovery passed and still reports installed 2.98.0.

Refresh/reinstall was not performed for Codex or Claude; this is source-only and unreleased at validation. Agent application and independent implementation review remain separate proof.
