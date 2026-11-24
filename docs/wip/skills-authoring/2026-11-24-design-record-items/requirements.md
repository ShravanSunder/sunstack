# Teach the design skills the record format the owner approved

Revision 2, 24 November 2026 (corrections from design review 1). Written by the
🦁 Lead. Multi-run set: one shared reference and five skills. Run type: `update`.

## The change

Class: behavior-changing. Claim: rewrites the decision and assumption parts of
`sunstack-dev/shared-references/design-documents.md` (record kinds, authority
states, who may decide, weight, placement in section items, what an author
writes for each item, ranking and one nudge label), and the lines in
`presentation-html`, `design-specification`, `design-program`,
`design-verification` and `design-review` that name the old states or
placement. It alters the
mental model these skills teach for decisions and assumptions, two chooser rows and a completion line in
`presentation-html`, the rank-and-promote step of three design skills, and the
link triage in `design-review`. No
trigger or description changes.

Reusable behavior: these skills help agents reliably record each decision and
assumption a design relies on as the right kind of record, with who made it and
how much it matters, and place it where the library shows it to the owner, when
they write or revise a design page.

## The need, in the owner's words

The Demistify builder changed the record format while the owner settled how
record items look (23 and 24 November 2026). The library, its guide and these
skills now disagree: the skills teach a format the new code refuses.

- On the format, after the Lead showed old and new side by side: "migration is
  fine" (24 November). On the four authoring fixes the Lead proposed (one
  container kind for an option's parts, `defineChoice`, one shape for `by`, the
  example's wrong reference; B1 to B4 in `skill-design.md`): "sure, I agree".
- On the look these records produce, 24 November: "right now it looks like what
  I want it to look like."
- The look rules the author's text must fit, 23 November: "let's do no lead-in,
  but always show details before the choice, after the title"; "I mean details
  only for options in a choice"; "the choice is markdown like it is"; "a
  decision shows what's the outcome, and to show what the choices were I press
  Details to see, if I want to"; "for decided, yes, dates are good".
- On who writes this: "I want you to write" (24 November, to the Lead).

Observable success: an agent writing a design page records an open question
with real options as a choice, a decision without options as a ruling, and an
unchecked belief as an assumption; names who decided and the weight for an
agent's decision; places each in a section item; and writes no chip, state,
date or bucket by hand. The design check accepts the records on the first run,
and the owner sees each item in the bucket its state implies.

## Who reaches the skills, and when

An agent, unprompted, when it designs (`design-specification`,
`design-program`, `design-verification`), composes a design page
(`presentation-html`) or reviews a design (`design-review`). Each loads `design-documents.md` already; nobody reaches
the changed parts by name.

## Evidence

| Date | Source | What it establishes |
| --- | --- | --- |
| 24 Nov 2026 | This run and design review 1: the skills repository at `origin/main` 77bc75f8 | Lines teaching the old format or placement: `design-documents.md` 9, 20, 29, 66, 68, 79, 87, 90, 105, 109, 115, 121, 136, 143; `presentation-html` `SKILL.md` 44, 47, `engineering-documents.md` 15, 36, 43, 57, `engineering-document-examples.md` 91, 102 to 114, 131, `demistify.md` 21; `design-specification` `SKILL.md` 207, 263, `artifact-and-self-review.md` 116; `design-program` `SKILL.md` 133, 217, `artifact-and-self-review.md` 109, `proof-architecture-and-traceability.md` 44; `design-verification` `SKILL.md` 93, 99; `design-review` `SKILL.md` 120, `reviewing-four-document-design.md` 27. A skill test's `data-design-record` is on a rule (`design-rules-mechanical-edges.test.ts:248`) and needs no edit. |
| 24 Nov 2026 | This run: `packages/demistify/src/core/decision-record.ts` on the Demistify branch `prototype/demistify-required-record-blocks` at 79390b85 | The new format: `choice` (question, two or more options, `recommended`, authority `owner-open`, `owner-decided` or `agent-decided` with `chosen` and `decision`); `ruling` (statement, authority `owner-decided` or `agent-decided`, never open); `agent-decided` carries `by` (alias and role: lead, implementer, verifier, reviewer, advisor), `rationale`, `decidedOn`, `weight` (design, process, minor) and source kind `author` or `contract`; `assumption` carries `by`, `weight`, and `settles` when open or `resolution` and `settledBy` when confirmed or refuted. |
| 24 Nov 2026 | This run: the same branch's `section-layout.ts`, `section-routing.ts` and `design-records.ts` | Decisions and assumptions are placed as `ex-section-item record="…"`; the page declares sections with `holds` (`needs-owner`, `settled`, `decided-by-agent`, `assumed`), and the check refuses a record whose section is missing. Needs, rules and checks still place with `data-design-record`; inline status uses `data-design-status`. |
| 24 Nov 2026 | This run: the branch's guide `skill/references/typed-design.md` at 79390b85, then at 13e3bcae | At 79390b85 unchanged by the builder (still `lead-decided`, `defineDecision`, `data-design-record` for choices). At 13e3bcae the builder rewrote its placement section to the section-item form with `defineChoice`; the Lead's full guide rewrite is separate (non-goals). |
| 24 Nov 2026 | The Lead's first-hand check of the approved preview, 1600 and 390 px, both themes, both states | The look the author's text must fit: title, then chips row, then the author's explanation, then options or the reason; chips, dates and buckets generated. |

## Authoring basis

`user-directed intent`: the owner approved the format and the look and asked
the Lead to write. The drift between skills and code is observed in the files
above, not reproduced in an agent run. No failing baseline is claimed.

## Dependencies and order

- The builder fixes B1 to B5 (listed under Coordination in
  `skill-design.md`) landed in Demistify commit 13e3bcae, which the Lead
  verified; the examples in this set use that commit's syntax.
- The skill pull request merges only after the Demistify release that ships
  the new format. Live agents load these skills; before that release they
  would be told to write records the released library refuses.

## Non-goals

- The Demistify guide `typed-design.md` and `typed-design-projects.md`. They
  ship with the library in `sunstack-tools`; the Lead writes them on a
  separate branch for the same release. This set points to them and never
  restates their fields.
- The look of record items; the floating section headings; the frozen
  `sunstack-workflow-v1` skills.
- The three small skill fixes found while building pull request 237 (the
  rules README's retired component, the picture nudge's suggestion, the
  mechanical-rule step disagreement between two skill-authoring skills).
- Converting the owner's live pages; that follows the release.
