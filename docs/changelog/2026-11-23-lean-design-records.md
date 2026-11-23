# 2026-11-23: Design records hold the text; pages explain

- `sunstack-dev` 3.5.0 and `sunstack-workflow-v2` 0.6.0; all six plugin and marketplace version entries agree for each. Requires Demistify 1.32.0 or later for typed design records.
- Records are the home of design text. A need, rule, realization, planned check, decision or assumption is one typed record; a milestone has one page that explains them and places each by id without copying it. A rule is one sentence, and its detail goes in its cases. A slice is `core` or `later`, and only `core` work gets records.
- Generated record files. The page fills its placements from ignored files that `demistify project check --write` (or `demistify design check --write` for a standalone milestone) writes. The hand-over gives the page's link and opening method, and tells the reader to rerun the command after a checkout or after pulling record changes.
- Records split by subject. When a milestone covers several subjects, each subject's records live in `records/<subject>.ts`; a record that spans subjects lives with its first rule.
- `design-specification`, `design-program` and `design-verification` write records and page sections, not hand-written coverage, trace or per-requirement tables; Demistify's check reports a `core` rule with no need or no planned check.
- `design-review` reviews one milestone's records and page. Design rules D003 (entity binding row) and D004 (links resolve) are kept; the requirement-coverage nudge and the mode-specific rulebooks are removed in favour of the Demistify check.
- `presentation-html` teaches which component fits, when and why (a record by id, a rule's cases, a Tree, Map, Walkthrough, Choice, deliverables), and moves binding and check mechanics into `references/demistify.md`.
- Shared references `design-documents.md` and `diagram-rendering-and-fallbacks.md` follow the same model. Frozen v1 is unchanged.
- Validation: `pnpm --dir tests/skills test` (343 passed, 1 skipped); skill-rules lint on the changed skill files (0 errors); `claude plugin validate .`; Codex marketplace listing.
- Codex and Claude caches are not refreshed.
