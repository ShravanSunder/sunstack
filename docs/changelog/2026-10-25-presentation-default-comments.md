# 2026-10-25 Presentation HTML default Comments

`sunstack-dev` 2.99.0 updates `presentation-html` and its `options-and-decisions.md` and `patterns.md` references.

Every ordinary page keeps automatic Comments available when the guide at its binding documents that default, without manual feedback tags, document metadata or paragraph labels. Older bindings keep their own contract; independent identity and revision overrides follow the matching guide. Answer controls remain task-driven, with one native feedback handoff.

All six Codex, Claude and Cursor plugin/marketplace version fields remain at unreleased 2.99.0 for this continuation. The changelog index links this entry; no commands, hooks or plugin README sections change.

Revision-2 validation: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts` passed 169 tests in 18 files; `pnpm --dir tests/skills exec tsc --noEmit`, local link/JSON/version/source checks and `git diff --check` passed. All six manifest files are unchanged.

Refresh/reinstall was not performed for Codex or Claude; this is source-only and unreleased at validation. Fresh author transfer remains unverified because the loaded-copy/action-record gap persists; independent implementation review follows source/proof assessment.
