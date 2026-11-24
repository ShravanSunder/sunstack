# Skill design

Revision 2, 24 November 2026: corrections from design review 1 (A1 to A16).
O1 (weight) and O2 (who records a decision) were taken at the review's
recommendation under the owner's delegation; text marked **[O1]** or **[O2]**
is that default, which the owner may strike.

## Targets and runs

Base: `origin/main` 77bc75f8. Two plugins change: `sunstack-dev` (runs 1, 2)
and `sunstack-workflow-v2` (runs 3 to 6).

| Run | Target | Surfaces | Edits |
| --- | --- | --- | --- |
| 1 | `sunstack-dev/shared-references/design-documents.md` | depth (the shared reference every design skill loads) | E1 to E13 |
| 2 | `presentation-html` | main path (two chooser rows), depth (`demistify.md`, `engineering-documents.md`, `engineering-document-examples.md`) | E14 to E20 |
| 3 | `design-specification` | main path (two lines), depth (`artifact-and-self-review.md`) | E21 to E23 |
| 4 | `design-program` | main path (two lines), depth (`artifact-and-self-review.md`, `proof-architecture-and-traceability.md`) | E24 to E27 |
| 5 | `design-verification` | main path (two lines) | E28, E29 |
| 6 | `design-review` | main path (one line), depth (`reviewing-four-document-design.md`) | E30, E31 |

No trigger changes in any run. Proof per run: `skill-verification.md`.

One home for record meaning: run 1. Runs 3 to 6 stop naming authority states
and point at that home (calls-and-placement: "Each meaning has exactly one
home"). Field and markup syntax stays in the Demistify guide; the skills name
helpers and elements only where an example needs them, and those match the
Demistify commit recorded under Coordination.

## The placement rule every run applies

The review's first finding was one chooser row serving two placements. The
rule, stated once in run 1 and applied by runs 2 and 6:

- A need, rule, realization or planned check is placed by id beside the prose
  that explains it, or not placed.
- Every decision and assumption is placed in a section item; the library
  moves it to the section its state implies. Prose that relies on it links to
  it and says why it matters here.

## Run 1: `design-documents.md`

E1. Line 9, Program Design row, Record cell: "realization, and the Lead's
decisions" becomes "realization, and the decisions agents make".

E2. Line 20, helper list: `defineDecision` becomes `defineChoice`,
`defineRuling` (`defineAssumption` stays).

E3. Line 29, first bullet. New text:

> A record is the only home of its text; the page never restates it. A need,
> rule, realization or planned check is placed by id beside the prose that
> explains it, or not at all. Every decision and assumption is placed in a
> section item, and the library moves it to the section its state implies; the
> page declares those sections once, as the guide shows. Prose that relies on
> a decision or assumption links to it. A placement is the record's anchor, so
> it carries no hand-written `id` or `title`; a page that names an unknown
> record id fails the check. The guide owns the markup.

E4. Line 66, first paragraph, from "Once credible options exist" to its end:

> Once at least two credible options exist, each saying what it gains and what
> it costs, and an owner answer is needed, it becomes an open choice record.
> Options nobody would pick, or options without consequences, are not credible;
> until real ones exist the question stays in prose, naming what is missing and
> who can settle it. A comparison explains matching tradeoffs, and Comments
> carry qualifications. Keep the recommendation, the author's selected answer
> and the owner's decision distinct. Nothing becomes authorized because an
> agent preselected it or the reader was silent.

E5. Line 68, second paragraph:

> When the owner answers a choice, record it on the same choice: the chosen
> option, one sentence stating what was decided, and the owner's words or the
> accepted wording. When the owner approves an agent's decision, its authority
> becomes the owner's, from `owner-accepted`, quoting the approval and where it
> was given; nothing else marks it approved. When the owner overturns a
> decision, write a new decision that supersedes it, as the guide shows.
> Reconcile what the decision governs and leave remaining unknowns explicit.
> A choice keeps every option it offered, so the owner can see what was not
> chosen; the guide teaches how options and their Details are written.

E6. Terms. Replace **Design item**, **Decision** and **Authority**; add
**Weight** after **Authority**:

> - **Design item:** one choice, ruling or assumption record the design relies
>   on.
> - **Decision:** a call where a capable reader of the same sources could have
>   decided differently and still claimed to follow them. It is recorded as a
>   **choice** when the decider weighed credible alternatives, which it keeps as
>   the choice's options, and as a **ruling** when there were none to weigh: an
>   owner directive, a contract, or one credible option.
> - **Authority:** what a decision record carries. A choice may be open: the
>   owner has not answered it. A decided choice or a ruling is the owner's
>   decision or an agent's. The owner's decision names its source: `owner-words`
>   (the owner's own words, quoted, with where they were said) or
>   `owner-accepted` (wording an agent wrote that the owner selected, said yes
>   to or approved, quoted, with where it was written and accepted). An agent's
>   decision names the agent by the alias the project's identity file gives it,
>   with its role, its rationale, its date, its weight and its source:
>   `contract` (an existing contract or demonstrated constraint, with its
>   location) or `author` (the agent's own call). **[O2]** An agent records
>   only decisions inside its own authority; a decision that changes another
>   kind's meaning returns that kind's gap instead. A helper does not write
>   design records: the Lead records a helper's decision that it adopts, with
>   the helper named in `by` and the handback as its source. A claim whose
>   authority cannot be shown is an open choice when credible options exist,
>   and otherwise an assumption, with the question in prose.
> - **Weight:** **[O1]** how much an agent's decision matters to the owner.
>   `design` when it changes what the system does, stores or exposes, or its
>   structure: who owns what, the boundaries and contracts between parts, or a
>   new dependency; `process` when it changes only how the work is carried out;
>   `minor` when it changes neither. Size is not weight: a one-line change that
>   drops a retry is `design`. An assumption takes the weight of what rests on
>   it. The owner is shown an agent's `design` decision from its own call as
>   not reviewed by them.

E7. "The standards" list. Replace "The author ranks its `lead-decided`
decisions…" with "The author ranks the agents' decisions and the open
assumptions, brings the high-ranked ones that need the owner as decisions,
and leaves the rest recorded." After "The list of design items is generated…"
add:

> - The author writes each record's fields, the item's own text and the page's
>   explanation; the library derives the section an item sits in and every
>   chip, state and date shown on the page. Nothing the library shows is also
>   written by hand.
> - A sentence that names a design item links to it and says why it matters
>   here, never what it says.
> - A rationale answers "why" in one or two plain sentences. An open
>   assumption's "what settles it" names the observation that would settle it.

E8. Line 87: "when it cannot be shown, the claim is an open owner question or
an assumption" becomes "when it cannot be shown, the claim is an open choice
when credible options exist, and otherwise an assumption, with the question in
prose".

E9. Line 105: "or, when you cannot show it, an open owner question or an
assumption" becomes "or, when you cannot show it, an open choice when credible
options exist, and otherwise an assumption with the question in prose". The
rest of the paragraph stays.

E10. "What an item carries": intro becomes "The matching guide owns each
record kind's fields. Whatever the syntax, an item carries:". Rows:

| Carries | Required when |
| --- | --- |
| `A<n>` for an assumption, `D<n>` for a choice or ruling; unique across the design, never renumbered | always |
| its kind: choice, ruling or assumption | always |
| its question, at least two options, and the recommended option with who recommends it, or none | a choice |
| its authority: open (a choice only), the owner's decision with source kind `owner-words` or `owner-accepted`, or an agent's decision with source kind `contract` or `author` | a choice or ruling |
| the date it was decided | a decided choice or ruling |
| the chosen option and one sentence stating what was decided | a decided choice |
| who decided, by alias and role; the rationale; the weight | an agent's decision |
| who assumed it and its weight; while open, what settles it; once confirmed or refuted, who settled it and a resolution linking where, with the excerpt | an assumption |
| where the words were said, or the wording written and accepted, or the contract lives (unchanged) | a decision with `owner-words`, `owner-accepted` or `contract` |
| the quoted span, exact and contiguous (unchanged) | a decision with `owner-words` or `owner-accepted` |
| the id of the item whose words this reading interprets (unchanged) | an assumption that reads quoted or accepted words |

E11. Line 121, worked example: D4 becomes "a decided choice whose record keeps
the options the owner chose between: `owner-decided` from `owner-accepted`
wording, …" (rest unchanged); A7 becomes "an open assumption by the author,
weight `design`, whose sources name D4".

E12. Nudge table, `author's call on owned meaning`: "a `lead-decided` decision
from `author`" becomes "an agent's decision from `author`".

E13. "Rank, then promote": "Rank each `lead-decided` decision and each open
assumption" becomes "Rank each agent's decision and each open assumption". Add
after the three questions: "Weight is what the owner is shown; rank decides
what is brought to the owner now. A `design` decision from the agent's own
call starts high on question 2."

## Run 2: `presentation-html`

E14. `SKILL.md` line 44, chooser row: "A need, rule, realization, planned
check, decision or assumption, where its explanation is" becomes "A need,
rule, realization or planned check, where its explanation is". Rest of the row
unchanged.

E15. `SKILL.md` line 47, chooser row, replaced:

| A decision or assumption | the owner must answer it, review it, or see what was decided and what was not chosen | The record in its section item; prose that relies on it links to it and says why it matters here |

E16. `references/engineering-documents.md` line 15: "Show the record by id
beside the prose that interprets it." becomes "Show a need, rule, realization
or planned check by id beside the prose that interprets it; a decision or
assumption sits in its section item, and the prose links to it."

E17. `references/engineering-documents.md` line 36: "then a choice from the
open decision record" becomes "then the choice record in its section item".
Line 43: "Keep choices near the affected explanation." becomes "The choice
sits in its section item; the affected explanation links to it."

E18. `references/engineering-documents.md` line 57, completion: "each record
is shown by id beside the explanation that needs it and is never restated"
becomes "each need, rule, realization and planned check shown is placed by id
beside the explanation that needs it, every decision and assumption sits in
its section item, and no record is restated".

E19. `references/demistify.md` line 21: "a choice from an open decision
record" becomes "the section items a decision or assumption sits in, a choice
record open or decided".

E20. `references/engineering-document-examples.md`, the cancellation example
(lines 86 to 131):
- Line 91 "This is open. It determines…" becomes "It determines the completion
  contract and the proof we need." (the state comes from the record).
- The `ex-choice data-design-record="D5"` block becomes the guide's form at
  13e3bcae: `<ex-section-item record="D5"><ex-choice>` with each
  `<ex-option data-option="suppress-result">` / `"interrupt-work"` holding
  `<template slot="summary">…</template>`; option titles and the
  recommendation move to the record. The page's decision sections are
  declared once above the item, as the guide's "Sections and Map" shows.
- The paragraph after it: the record supplies the question, option titles and
  recommendation; the author writes the explanation and each option's summary;
  after the owner answers, the record carries the chosen option and the
  owner's words, and every option stays.
- Line 131: "Prior alternatives can sit in a labelled history disclosure."
  becomes "The decided choice shows its outcome and keeps its options, which
  the reader opens under Details."

## Runs 3 to 6: the design skills

E21. `design-specification/SKILL.md` line 207: "or, when you cannot show it,
an open owner question or an assumption" becomes "or, when you cannot show
it, what `design-documents.md` says to write instead".

E22. `design-specification/SKILL.md` line 263: "Keep unanswered owner
questions as open decision records" becomes "Keep unanswered owner questions
as `design-documents.md` says: prose until credible options exist, then an
open choice record".

E23, E25, E28. `design-specification/references/artifact-and-self-review.md`
line 116, `design-program/references/artifact-and-self-review.md` line 109,
`design-verification/SKILL.md` line 99: "the `lead-decided` decisions and open
assumptions" becomes "the agents' decisions and open assumptions".

E24. `design-program/SKILL.md` line 133:

> Write the selected direction as a choice record whose options are the
> alternatives you weighed, and each accepted debt and each scope rejection as
> a decision record, in the same edit as its passage: an agent's decision from
> `author`, with its weight, when the call is inside this phase's structural
> authority, or the owner's decision where it came from the owner.

E26. `design-program/SKILL.md` line 217 and
`design-program/references/proof-architecture-and-traceability.md` line 44:
"Lead decision record" becomes "decision record".

E29. `design-verification/SKILL.md` line 93: "a warning on a link to a record
placed on that page" becomes "a warning on a link to a record placed on that
page, by id or in a section item,".

E30. `design-review/SKILL.md` line 120: "The link rule cannot yet see a
`data-design-record` placement as an anchor" becomes "The link rule cannot yet
see a record placement (`data-design-record`, or `ex-section-item record`) as
an anchor"; "when it holds `data-design-record="<the fragment>"`" becomes
"when it holds `data-design-record="<the fragment>"` or
`ex-section-item record="<the fragment>"`".

E31. `design-review/references/reviewing-four-document-design.md` line 27:
"Each record the page places is explained by the prose beside it and never
restated there." becomes "Each need, rule, realization or planned check the
page places is explained by the prose beside it; each decision and assumption
sits in its section item, and prose that relies on it links to it; no record
is restated."

## The root's topics that apply

| Topic | Governs |
| --- | --- |
| change-classes | the claim in `requirements.md` |
| generalization | S1 to S6 and S9 transfer cases; S7, S8 scoped to Demistify record pages and taught by the guide |
| calls-and-placement | one home for record meaning (run 1); runs 3 to 6 point at it; field syntax in the guide |
| steering | each new sentence answers a gap a capable model would fill wrongly: invented options (E4), hidden alternatives (E6), guessed weight (E6), hand-written approval (E5, E7), paraphrase (E7); the placement rule is an observable condition with its action (E3, E14 to E18, E31) |
| main-path | E14, E15, E21, E22, E24, E26, E28 to E30 edit existing main-path lines; no new step, branch or completion boundary |
| proof-claims | `skill-verification.md` |
| platform | version bumps and changelog (coordination) |

Security: no surface in scope.

## Decisions (the owner may strike any row)

| # | Default taken | Rationale |
| --- | --- | --- |
| K1 | **O1, Lead default under the owner's delegation; the owner may strike** Weight as in E6, with structure counted as `design`, and an assumption weighted by what rests on it. | Revision 1 left structural calls `minor`, so the owner would never see them flagged; the owner's attention is on boundaries, storage, architecture and contracts. |
| K2 | **O2, Lead default under the owner's delegation; the owner may strike** An agent records only decisions inside its own authority; the Lead records a helper's adopted decision with the helper in `by`. | Keeps role authority (`design-documents.md` line 12) and gives a helper's decision a route, since helper roles do not load this reference. |
| K3 | An open question with fewer than two credible options stays prose. | The format needs two options for a choice and has no open ruling. |
| K4 | How options and Details are written, and that options stay, is taught by the guide; run 1 states only why options stay. | Format rules of the record item; the check enforces options staying. One home: the guide. |
| K5 | Examples use the syntax of Demistify commit 13e3bcae. | That commit carries the builder fixes B1 to B5 (Coordination). |
| K6 | A choice when the decider weighed credible alternatives; a ruling when there were none. | The owner: "to show what the choices were I press Details"; a ruling would drop them. |

## Coordination

- Base `origin/main` 77bc75f8; worktree `ai-tools.skills-design-record-items`,
  branch `skills/design-record-items`.
- Demistify: branch `prototype/demistify-required-record-blocks` at
  `13e3bcae`, which carries the builder fixes this set relied on:
  B1 `defineChoice` replaces `defineDecision`; B2 an assumption's `by` is
  `{ alias, role }`; B3 an option's summary and Details both use `template`;
  B4 the example's wrong reference removed; B5 the free-standing record card
  path removed (the check refuses it and names the section-item form). The
  Lead verified 13e3bcae: 345 tests pass, `pnpm check` passes, clean tree.
- Still to check at write time: whether the guide's role list maps the
  workflow's Checker and Operator (O2).
- Versions: `sunstack-dev` and `sunstack-workflow-v2` minor bumps everywhere
  each is kept, one changelog entry per plugin, per the repository's
  `AGENTS.md`.
- Merge order: after the Demistify release that ships the new format.

## Run status

| Run | Status |
| --- | --- |
| 1 to 6 | implemented at 84661df5, corrected after implementation review 1 (see Review record). O1 and O2 taken at the review's recommendation under the owner's delegation ("you write the skills"); both listed in the Lead's ship plan (the Demistify working notes) for the owner to strike. Versions `sunstack-dev` 3.8.0, `sunstack-workflow-v2` 0.7.0 in every manifest, marketplace and README; collides with pull request 237's 3.7.0 for `sunstack-dev`, so whichever merges second takes the next minor. Deviations from E1 to E31: E20's example also shows the record as TypeScript and its section comment names `assumed`; E24 adds "or as a ruling when only one direction was credible"; E6's O2 text cites the handback in the rationale (the author authority has no source field) and names role values; the implementation review added lines outside the edit list (presentation-html `SKILL.md` 10, 16, 22, 37; `engineering-documents.md` 3; `options-and-decisions.md` 27; `design-program` 229; `design-verification` 75). Checks: skill tests 343 passed, 1 skipped; lint 0 errors, 0 warnings, 9 unsure on unchanged load lines (kept); `claude plugin validate .` passed; Codex and Cursor manifests checked only for version agreement: the installed Codex CLI has no plugin validate command (`codex plugin` offers add, list, marketplace, remove) and no Cursor CLI is installed here. Follow-up, not in this change: teaching the O2 rule at the Lead's handback step in `role-lead` (review A9). |

## Review record

| Review | Revision | Verdict | Decision |
| --- | --- | --- | --- |
| Design review 1 (Opus review lead, two Opus reviewers, native subagents) | 3d70379e | targeted-revision; 16 accepted findings, 2 owner decisions | revise-first |
| Design review 1, correction verification | ea1b533b | all 16 closed, none new | accepted-to-implement, conditional on O1/O2 and the recorded reviewer-form and lineage gap, which the Lead accepts |
| Implementation review 1 (Opus review lead and Opus reviewers, native subagents; the owner asked for Opus) | 84661df5 | targeted-revision; 11 important, 10 minor, 5 observations; ship blocked | corrections committed after 84661df5; returned for verification |
