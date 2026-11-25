# Skill verification

Revision 2, 25 November 2026: routes for obligations 1 to 26 and S1 to S9 as
renumbered, eval checks for the Mac Lead's and the review's points, and the
unverified items they add. Decided with `skill-rules-authoring`'s decision
matrix, question by question (requirement or stance; agent behavior or text
property; does an evidence kind hold the chunk; one field; comprehension;
gate).

## Routes

| Item | Outcome | Property it was decided on |
| --- | --- | --- |
| Obligations 1, 3, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 19, 20, 21, 22, 24 (what a Lead or phase does with an initiative, the guide, deliverables, plans, commissions and owner decisions) | eval | Each is what an agent does while working (loads the guide before writing, scopes as it writes, keeps step names and dependencies in the record only, refuses an upward dependency, names a deliverable before commissioning, records results). No text chunk shows it; only a fresh run under that work observes it. |
| Obligations 2, 4, 5, 9, 15, 18, 23, 25, 26 (the edited text says where a project lives, the depth branch, review's no-target rule and report handling, the brief as planner input, views named by question, the traceability wording, "repository root") | review check | Whether a line teaches the right home, branch, route or wording is reading against this set's edits E1 to E34 and the guide at 73d43548; no evidence kind holds the guide or the edit list. |
| S1 to S7 and S9 as stated in the skills | review check | Each standard's wording is judged against its transfer cases in `specification.md`. Rules that judge design pages or records an agent writes are outside the skill-text rules engine. |
| S8 | review check, pending Q1 | Its wording depends on what "near" means. |
| Every taught command is in the security decision's allowed list; `initiative migrate` is taught nowhere | review check | One search over the changed files for `demistify` and the six allowed subcommands, and for `migrate`. A literal search finds the words, but whether a mention teaches the command takes reading, so it is not deterministic. |
| One home per meaning: no v2 edit restates initiative, project or deliverable meaning from `design-documents.md` or the guide's syntax; the guide loads (K11) are calls, not copies | review check | Comparing two documents' meanings; no chunk holds the other document. |
| Each guide load (E2, E11, E15, E24 step 1) says when, where, what to bring back | model-judged (existing call-completeness rule) | The existing `load` evidence reads the line with its step. |
| Product-workflow placement: the plan skill and `role-lead` name Demistify commands | worth checking (existing `general-skill.md` rule, unchanged) | Its nudge: "read the loaded or named command and decide whether it routes into one product's own workflow". Case where the text is kept: Demistify is the owner-adopted design medium for v2 (README, Scope) and this toolkit's own shared infrastructure, named through its documented CLI, so the nudge's answer is keep. |
| Run 5 description opener and length | mechanical (existing rules K001, K002, K003 in `domain-skill-crafting`) | A literal prefix and a character count of one field. |
| Run 5 description names a real loading condition and its confusable neighbour | model-judged (existing description rules) | Needs comprehension of the description field. |
| Run 5 description loads on its true prompt and not on the near miss | trigger trial, below | Only a fresh session with the installed description shows it. |
| Run 5 body: lens first, each step's completion criterion, each branch's observable condition and return | review check | Read against `main-path.md`; the existing judged rules on steps and loads run as well. |
| Plugin surfaces (E26) | static validation | Claude plugin validation, Codex quick validator where PyYAML exists, the repository's skill tests. Structural only. |

No new worth-checking rule is proposed: the new standards govern what agents
write into designs and plans, not skill text.

## Proof plan

All runs: drafted from user intent ("let's update design-* skills … and what
should be in a plan skill for workflows v2", relayed, A1); behavior not yet
evaluated. Static validation is structural only. The Mac Lead's observed
failures (M-a, M-c, M-d) are not reproduced, so no run may claim to fix them;
a reproduction from his session records, with the old skills, is the step
that would let the eval below count as a targeted improvement.

Eval, prepared and not run until the owner says. A fresh Lead session with
the changed skills installed, given a small initiative: two projects numbered
1 and 2, one shared ruling, one open owner question with real options, a
project-1 design ready for review, a request to take one deliverable to a
plan, a request to commission a small fix no deliverable covers, and then a
request to re-plan after a step is found unnecessary. Checks written before
the run, kept outside its workspace:

- the guide's `typed-design.md` (and `typed-design-initiative.md`) is read,
  from the host's record, before the first record is written;
- the shared ruling is linked by qualified id, never copied;
- project 2 holds needs and open questions only **[Q1]**;
- every `core` rule sits in a `core` deliverable's scope, each phase adding
  its own ids, and the design check reports a deliberately unlinked rule;
- the open owner question is a choice record in a section item, never a
  hand-written choice;
- the plan admits only after a `ready` review and reads the brief and status;
- every step on the plan page is a step the record lists, and the page holds
  no hand-written step or dependency list; the re-plan changes both in one
  commit and reconciles completed steps;
- no dependency on a deliverable in a higher-numbered project is written;
  the Lead raises it instead;
- the small fix gets its deliverable before its commission **[Q8]**;
- the Lead records a stand-in Verifier outcome and its acceptance on the
  deliverable, and the plan page holds no progress text;
- no component appears that the guide does not document.

Control: the same prompt with the skills at 53f2de4a, which name no
deliverable scope, guide load or plan skill. It counts as a failing baseline
only if the failure is observed in that run.

## Trigger trial

Run 5 (`plan-implementation`), each prompt in a fresh session that sees the
installed description beside its neighbours and nothing of this set; the
loaded skill is read from the host's record.

- True prompt: "The sessions project passed design review. Write the
  implementation plan for DEL-03."
- Near miss: "Review the sessions project's Program Design before anyone plans
  it." Expected: `design-review` loads, `plan-implementation` does not.

Runs 1 to 4 and 6: not applicable, no description changes.

## What stays unverified

- Behavior: no eval has run; the Mac Lead's failures are not reproduced.
- Q1, Q5, Q6, Q7, Q8 until the owner answers; marked edits carry the
  recommendations. K9 to K12 are defaults the owner may strike.
- A4: whether qualified record ids type-check in a project's generated SDK.
- Whether the CLI accepts an initiative root outside `docs/initiatives/`
  (Q6 b).
- Whether the hosted Demistify binding ships `initiative check` and
  `initiative status` yet (the review found the changeset unreleased).
- Whether `initiative check` exits non-zero on a failure (the review read
  `demistify.ts` returning 0 on its normal path).
- Whether `ex-tree data-design-need` shows planned checks under the rules; the
  guide says it "draws the need and the rules that serve it"
  (`typed-design.md:184`), while `presentation-html` describes a Tree of rules
  and checks.
- The owner quotes and relayed preferences, until checked against the export
  (A1).
