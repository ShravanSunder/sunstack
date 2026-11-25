# Skill verification

Revision 2, 24 November 2026. Decided with `skill-rules-authoring`'s decision
matrix, question by question.

## Routes

| Item | Outcome | Property it was decided on |
| --- | --- | --- |
| Obligations 1 to 13 (the edits teach the new kinds, states, weight, placement, owner review and links) | review check | Whether a line teaches the right format is reading against the Demistify schema at a named commit; no evidence kind holds the schema. The reviewer runs one search as part of the check, in `sunstack-dev` and `sunstack-workflow-v2` outside v1, and every hit must be an intended mention: `lead-decided`, `defineDecision`, `Lead decision`, `open owner question`, `open decision record`, `beside the prose`, `where its explanation is`, `history disclosure`, `This is open`, and `data-design-record` on a choice, ruling or assumption. |
| S1 choice or ruling | eval | What an agent records while designing; observed only in a fresh run. |
| S2 credible options before a choice | eval | Same: the pressure is to make a record anyway. |
| S3 who decided | eval | The design check refuses a record without `by`; the eval watches the alias and role chosen. |
| S4 weight | eval | Judgment under the pull to call small changes minor. Variance across repetitions is itself a finding. |
| S5 no derived labels by hand | eval | A property of the page the agent writes; no evidence kind reads design pages. |
| S6 prose links to the record | eval | Same. |
| S7 options kept after a decision | no proof needed here | The Demistify check refuses a settled choice whose page options do not match the record (the builder showed exit 1 on a changed id; the Lead has not re-run it). Taught by the guide (K4). |
| S8 option Details only when they add | no proof needed here | Taught by the guide (K4). |
| S9 short rationale | eval | Property of the agent's record text. |
| Example syntax (E20) | review check | The reviewer compares the example with the guide at Demistify 13e3bcae. |
| E20's example under the presentation-html rulebook | observed at implementation review 1 | M001 sees a choice inside `ex-section-item` but always ends `uncertain` at `direct_heading_boundary` (exit 5), with or without a picture; the old form gave warn, exit 0. Every design page with a choice record will report this rule uncertain. Follow-up for `skill-rules-authoring`: teach M001 the section-item placement. |

No worth-checking rule is proposed: every standard here governs design pages
or records an agent writes, not the skill text the rules engine reads.

## Proof plan

All runs: drafted from approved intent ("migration is fine", "sure, I agree",
"I want you to write"). Static validation (skill tests, plugin validation) is
structural only.

Eval, prepared and not run until the owner says (as for pull request 237): a
fresh agent with the new skills designs a small milestone with one open owner
question that has real options, one that does not yet, a direction chosen
among weighed alternatives, two agent decisions of different weight (one a
behavior-preserving structural call), one assumption, and then an owner
message approving one agent decision. Checks written before the run:

- record kinds, including the weighed direction recorded as a choice;
- the question without credible options left in prose;
- `by` with alias and role;
- weight against S4, including the structural call;
- every decision and assumption placed in a section item;
- the approval recorded as the owner's decision from `owner-accepted`, with no
  hand-written approval text;
- no hand-written state, chip or date text on the page;
- prose references linked and not paraphrased;
- rationale length.

Control: the same prompt with the skills at 77bc75f8, which teach the old
format; it counts as a failing baseline only if its failure is observed.

## Trigger trial

Not applicable: no description changes in any run.

## What stays unverified

- Behavior: no eval has run.
- O1 and O2 until the owner answers; the marked text carries the review's
  recommendation.
- Whether agents pick weights consistently.
- M001 reports `uncertain` on every choice record until the rule learns section items (follow-up).
- That the released library renders the records as the approved preview: the
  release has not been cut.
