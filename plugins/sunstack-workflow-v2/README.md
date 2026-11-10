# Sunstack Workflow v2

This source contains the selected v2 design skills, preserving the original engineering guidance while teaching useful HTML composition. Management remains a separate workstream.

## Skill sources

| V1 source | V2 source |
| --- | --- |
| spec-design | [design-specification](skills/design-specification/SKILL.md) |
| program-design | [design-program](skills/design-program/SKILL.md) |
| verification-design | [design-verification](skills/design-verification/SKILL.md) |
| spec-program-review | [design-review](skills/design-review/SKILL.md) |

The engineering baseline is the four design phases from before PR #205, at `b37419ca08dcde11bb8c72b810a4e91afec345f9`, with the v2 route names and installed-plugin dependency repairs retained. V2 changes their artifact presentation to complete free-form HTML through `sunstack-dev:presentation-html`; v1 separately keeps the historical Markdown contract.

## Dependency ownership

`sunstack-dev` remains the engineering base. Its shared references, principles, domains and practices are referenced in place; no base-owned files are copied here.
Locate the host-advertised `sunstack-dev:presentation-html` skill, then go up `../..` to its plugin root; resolve `sunstack-dev/shared-references/<file>` under that root and `sunstack-dev:<skill>` as `skills/<skill>/SKILL.md`. Independently versioned plugin caches need not be adjacent.
Skill-specific references stay under their owning v2 skill. The review-only proof-command procedure belongs under `design-review/references/`; it has no base copy.

## Scope

The management/role changes belong to a separate PR. The four document meanings remain distinct. Their HTML can use prose, diagrams, tables, Trees, choices, comparisons, open discussion and call stacks where they explain the subject; the specialized requirements/stage/related-document viewers are excluded from new v2 authoring. New collections share Pages, semantic Map and complete question-led Walkthroughs through one navigation descriptor, while HTML owns the design facts. Worked examples live with the maintained presentation recipe; the matching bound guide owns syntax and component preparation. The shared-navigation source-preview contract remains separate from published support. This source change does not register, install or activate v2, change role/management behavior or modify the v1 archive.
