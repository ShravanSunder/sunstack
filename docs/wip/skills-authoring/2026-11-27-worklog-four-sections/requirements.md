# Requirements: the work-log page shows the approved four-section view

## The change

- **Class:** behavior-changing. Run 1 changes `presentation-show-worklog`'s mental model, its main path (steps 2, 3 and 4) and its reference allocation (two new references; one branch removed). Run 2 adds one caller-generic rule sentence to `presentation-html`'s `references/work-account-forms.md`, and the same clause to `references/patterns.md`. Neither run changes a trigger (frontmatter description) or a platform contract.
- **Run kind:** `update`, two runs: run 1 targets `sunstack-dev / presentation-show-worklog`, run 2 targets `sunstack-dev / presentation-html` (a pointer only).
- **Reusable behavior:** This change helps agents reliably produce a dated work-log page in the owner's approved view when the owner asks for one. The page has four question sections, one item per topic, the view each kind of topic earns from its evidence, and one verification table. It links to a full account where nothing from the source is lost.

## The need, and the success definition

The owner's words (typos fixed):

- On 26 Nov, after seeing the Sol Lead's work-log view: "That skill should show me the page like Codex showed you."
- On 27 Nov: "I don't want the work log structure to prevent free-form text." The structure is a frame, not a form.

**Success:** when the owner asks for a work-log page, a fresh author who holds only this skill and the released Demistify guide produces a page that matches the approved view.

- **Structure:** the four sections in order, each with its tone and icon; an `h4` item per topic; open choices linked; badges, Flows and before/after cards only where the source supports them; and one verification table with the shared layout marker.
- **Companion:** a full account the page's detail links reach.
- **Free text:** every topic is still explained, in plain prose where no view fits, and every backing record's text survives in the full account.

The approved view is the Sol Lead's design (`design.md` in the worklog-view handoff folder) and its target page in `snapshot-verification-columns/` (`worklog-2026-11-26-shared-sections.html`). The worklog skill handoff (27 Nov) settles the rules.

## Who reaches the skill, and when

- A person: the owner explicitly asks for a work-log HTML page or its refresh, or names the skill. The skill stays hidden from model invocation (`disable-model-invocation: true`; `allow_implicit_invocation: false`).
- Another skill: `practices-show-me-your-work`'s explicit-page-request branch loads it by path, carrying any inspected capture, scope, cutoff and open state.
- Run 2's references are reached by `presentation-html` step 2, which loads both `work-account-forms.md` and `patterns.md` for every work-log page. `presentation-show-worklog` step 3 loads `presentation-html`.

## Evidence

Every signal is the owner's direction or a document derived from it. No failure was reproduced.

| Date | Source | What it establishes |
| --- | --- | --- |
| 26 Nov | Owner, relayed in the worklog skill handoff | "That skill should show me the page like Codex showed you." The full skill-authoring workflow is required: two independent design reviewers, at least one of a different lineage. |
| 26 Nov | The Sol Lead's view design (`design.md`) | The reader layout, the four sections with tones and icons, the item face, the consequence-badge evidence rule, before/after card tones, the verdict tones, widths and the full-account design. The design says it settles every view question. |
| 26 Nov | The current skill (`presentation-show-worklog` at origin/main `09f07b80`) | Step 3 teaches "four ordinary `h2` headings" and "Do not require Story/section cards …". Step 2 puts a decision brief beside an answer control. This is the baseline. |
| 27 Nov | Owner choice relayed by the Sol Lead (push `01a21ac5`) | Verification is one table with status chips. |
| 27 Nov | Owner choice relayed by the Sol Lead (push `01a21ad8`) | The table is full width with three columns: Status (a verdict chip only, first), Claim, and Result and limit. |
| 27 Nov | Sol Lead (push `01a21aeb`) | The wrapper takes the shared layout marker `data-layout="verification"` on the Canvas `ex-table-scroll`. The skill teaches only that marker, with no authored CSS or widths. The target becomes `snapshot-verification-columns/`. |
| 27 Nov | Owner, in the commission | "I don't want the work log structure to prevent free-form text." Proof authors are OpenAI Terra (high) and Claude Opus (high). |
| 27 Nov | The Demistify 🦁 Lead's rulings on this design set's questions | Q1: the pointer goes in both `work-account-forms.md` and `patterns.md`, superseding the handoff's "patterns.md only". Q2: this skill owns the work-log view recipe; `presentation-html` keeps the binding, composition within the recipe, and the check. Q3: a second frozen proof input, `rows-2026-11-26.jsonl`, already frozen. |
| 27 Nov | Released guide, Demistify 1.41.1 (`release.json` version `1.41.1`, source commit `ab1072af`) | `stories.md#sections` (empty Section declarations, `tone`/`icon`, `h4` items, badge row, Canvas table wrapper, a Flow in an item), `small-parts.md#short-status-labels` (`ex-badge-row`; badge tones `done`, `note`, `risk`, `question`, `decision`; no tone is neutral), `maps.md#a-responsive-flow`, `traces.md`, `tables.md#verification-tables` (the marker, the three columns, `th scope="row"` claims), and `cards-and-callouts.md` (card tones including `planned`; icons `user` and `test-tube`). |

## Authoring basis

`user-directed intent`: the owner approved the 26 Nov view and directed the 27 Nov table and free-text choices. There is no RED baseline; none is manufactured.

## Non-goals

- The trigger and invocation of either skill.
- `practices-show-me-your-work` and how the trail is recorded.
- How the source is read, reconciled and checked (`references/read-and-summarize.md`), and Story rows (`references/story-records.md`).
- Demistify components, theme or guide; the meaning attribute the Sol Lead declined; component regression checks.
- Data-driven work logs whose components read the trail, the snapshot CLI's convention check, and Router typing (later work, per the handoff).
- Typed decision pages and their answer controls.
- A new skill rule or rulebook entry.
- Other `presentation-html` behavior: Map, Walkthrough, binding and the checker route stay as they are.
