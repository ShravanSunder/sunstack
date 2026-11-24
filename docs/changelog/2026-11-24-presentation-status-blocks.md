# 2026-11-24: presentation-html shows a status block as an answer and a table

- `sunstack-dev` 3.7.0; all six plugin and marketplace version entries agree.
- `presentation-html` `SKILL.md`: step 1 treats a block a revision updates as composed content, so its view is chosen again once it holds several items, keeping its old form only while it still fits. Step 2 loads `references/work-account-forms.md` for a status block on any page (several pieces of work, decisions or findings, each at its own stage, as of a time), and one chooser row names that situation. Step 4's callout bullet adds: a callout holds one answer; one answer with its reason and cost stays a callout.
- `references/work-account-forms.md` adds a worked status block: a callout cut to the answer, and a table with a row per piece (its reference, stage and what it waits on). It defers to `identity-timing-row.md` for compact badges, `engineering-documents.md` for decisions on a design page, and `views.md` for named views; it names when a Trace or a dated view fits instead.
- New warn-only page nudge `presentation-html.long-callout` (M006): a callout over 150 prose words, title included; a callout holding a Markdown island is left `uncertain`. 150 is a starting value, not tuned on rated pages. `rules/README.md` and `references/demistify.md` step 4 list it.
- Basis: the owner's stated intent after a status callout grew to about 550 words. Behavior not yet evaluated; the planned evals wait for the owner.
- Word counts: `SKILL.md` 2,735 to 2,835; `work-account-forms.md` 577 to 805. Design set: `docs/wip/skills-authoring/2026-11-24-presentation-status-block/`.
- Validation: see [the evidence note](references/2026-11-24-presentation-status-blocks.md).
- Codex and Claude caches are not refreshed.
