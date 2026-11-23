# 2026-11-23: presentation-html loads less for a design page; call-stack component retired

- `sunstack-dev` 3.6.0 and `sunstack-workflow-v2` 0.6.1 (README only); all six plugin and marketplace version entries agree for each.
- `presentation-html` `patterns.md` keeps section composition, navigation, widths, disclosure, diagrams and framing. Four branch-only patterns move to their own references, each loaded from `SKILL.md` step 4 by its own condition: `work-account-forms.md` (work account or work-log page), `related-captures.md` (related captures or screenshots), `identity-timing-row.md` (compact status, progress or phase comparison) and `response-feedback-handoff.md` (the reader must answer or hand feedback back).
- `engineering-document-examples.md` loads only when a run has not yet composed an engineering design page, or a section's composition is unclear.
- The v1 Markdown-source route, with its named views, moves to `references/v1-markdown-source.md`; carried-content rules move to `references/carried-content.md`. Step 1 and step 4 keep one line each with the load.
- The prepared call-stack component is no longer taught: "What calls what?" offers the source-derived call path (nested trace) or a sequence diagram. An existing page using `ex-call-stack` keeps it. `shared-references/design-documents.md` points call paths at `views.md`.
- `engineering-documents.md` adds one page-length standard: a section holds what its records and picture cannot say.
- A typed design page's required `presentation-html` load falls from 9,303 to 7,650 words with every condition holding, and to 6,225 once the examples are not needed.
- Validation: `pnpm --dir tests/skills test`; skill-rules lint on the changed skill files; `claude plugin validate .`.
- Codex and Claude caches are not refreshed.
