# Skill verification

Revision 3, 25 November 2026: routes for obligations 1 to 30 and S1 to S10,
with every agent behavior routed to eval and a design-review leg added [B7],
the confusable near miss in the trigger trial [B8], the tool clause for the
product-workflow keep [B16], eval checks for reviewer A's cases (A1, A3, A7,
A8), and the eval's binding [B1]. Decided with `skill-rules-authoring`'s
decision matrix, question by question (requirement or stance; agent behavior
or text property; does an evidence kind hold the chunk; one field;
comprehension; gate).

## Routes

| Item | Outcome | Property it was decided on |
| --- | --- | --- |
| Obligations 1 to 25 and 27 (what a Lead, phase, reviewer or planner does: creates the initiative from the owner's words, reads it, creates the project in place, links shared records, holds a project to its needs, refuses it for review, loads the guide, cuts and scopes deliverables, raises unscoped rules, admits and plans one deliverable, keeps steps and dependencies in the record, earns each check once, re-plans with evidence kept, returns gaps to their owners, refuses upward dependencies, orders by status and number, reads the check report, commissions with the brief, records results and acceptance, writes the owner-check line, names the deliverable before commissioning, raises owner decisions as choice records) | eval | Decision-matrix question 2: each is what an agent does while working. No text chunk shows it; only a fresh run under that work observes it. |
| Obligations 26, 28, 29, 30 (a view named by its question; the traceability wording; "repository root"; no `core` slice left) | review check | Properties of the changed skill text, read against edits E1 to E40; 30 is one search for "slice" in the four design skills, read by hand because a remaining mention may be a quotation. |
| S1 to S7, S9, S10 as stated in the skills | review check | Each standard's wording is judged against its transfer cases in `specification.md`. Rules that judge design pages or records an agent writes are outside the skill-text rules engine. |
| S8 | review check, pending Q1 | Its wording depends on what "near" means. |
| Every taught command is in the security decision's allowed list; `initiative migrate` is taught nowhere | review check | One search over the changed files for `demistify` and the six allowed subcommands, and for `migrate`. A literal search finds the words, but whether a mention teaches the command takes reading. |
| One home per meaning: no v2 edit restates initiative, project or deliverable meaning from `design-documents.md` or the guide's syntax; the guide loads (K11) are calls, not copies | review check | Comparing two documents' meanings; no chunk holds the other document. |
| Each guide load (E2, E11, E15, E21, E24 step 1, E28) says when, where, what to bring back | model-judged (existing call-completeness rule) | The existing `load` evidence reads the line with its step. |
| Product-workflow placement: the plan skill, `role-lead` and `design-review` name Demistify commands | worth checking (existing `general-skill.md` rule, unchanged) | Its nudge: "read the named command and decide whether it routes into one product's own workflow". Case where the text is kept: the commands are a tool used through its supported, documented interface, the CLI its guide prints; the standard's tool clause keeps them [B16]. |
| Run 5 description opener and length | mechanical (existing rules K001, K002, K003 in `domain-skill-crafting`) | A literal prefix and a character count of one field. |
| Run 5 description names a real loading condition and its confusable neighbour | model-judged (existing description rules) | Needs comprehension of the description field. |
| Run 5 description loads on its true prompt and not on the near misses | trigger trial, below | Only a fresh session with the installed description shows it. |
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

Binding: the eval runs against Demistify 1.34.0 hosted at the binding the
skills use, or a named source-preview build if it runs earlier; the
"ready now" and no-steps checks need the release after it (A9) or are
reported as not run.

Eval, prepared and not run until the owner says. A fresh Lead session with
the changed skills installed is asked, in order:

1. to start an initiative of two projects, with the owner's numbers and words
   given in the prompt for one project and missing for the other;
2. to design project 1 (one shared ruling, one open owner question with real
   options);
3. to have project 1 reviewed, and project 2 reviewed (design-review leg);
4. to take one project-1 deliverable to a plan, where one step's check is in
   a deliverable it waits on and one real prerequisite sits in project 2;
5. to commission a small fix no deliverable covers;
6. to re-plan after a completed step is found unnecessary;
7. to say what to build next, with a project-2 deliverable planned while a
   project-1 deliverable is still open.

Checks written before the run, kept outside its workspace:

- numbers and `achieves` come from the owner's words; the missing ones come
  back as an owner ask [A1];
- the guide's `typed-design.md` (and `typed-design-initiative.md`) is read,
  from the host's record, before the first record is written and before the
  first Demistify command;
- the shared ruling is linked by qualified id, never copied;
- project 2 holds needs and open questions only **[Q1]**;
- every rule project 1 needs sits in a `core` deliverable's scope, each phase
  adding its own ids, and the design check reports a deliberately unlinked
  rule;
- the open owner question is a choice record in a section item, never a
  hand-written choice;
- the review refuses project 2 as a target, raises the unscoped rule, routes
  an order warning, and its pretend planner reads the brief [B7];
- the plan admits only after a `ready` review and reads the brief and status;
- the prerequisite's check is named, not earned by a step; every step on the
  plan page is a step the record lists, under the same id, and the page holds
  no hand-written step or dependency list;
- the project-2 prerequisite is not written, and the plan returns `blocked`,
  not `ready` [A8];
- the small fix gets its deliverable before its commission **[Q8]**, and the
  commission carries the deliverable id and a brief saved outside the project;
- the re-plan changes the record and the plan in one commit, and the dropped
  completed step appears in "Changed from" with its evidence [A7];
- the Lead takes the project-1 deliverable next, not the project-2 one [A3];
- the Lead records a stand-in Verifier outcome and its acceptance where the
  guide places them, and the plan page holds no progress text;
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
- Near miss, the most confusable neighbour [B8]: "Plan how the sessions
  project's rules will be proven before anyone builds it." Expected:
  `design-verification` loads, `plan-implementation` does not. If it
  misroutes, the boundary names `design-verification` instead of the glob.
- Second near miss: "Review the sessions project's Program Design before
  anyone plans it." Expected: `design-review` loads.

Runs 1 to 4 and 6: not applicable, no description changes.

## What stays unverified

- Behavior: no eval has run; the Mac Lead's failures are not reproduced.
- Q1, Q6, Q8, Q9 until the owner answers; marked edits carry the
  recommendations. K9 to K15 are defaults the owner may strike.
- Demistify 1.34.0 on the hosted binding, and the later release's "ready now"
  order and no-steps state (A9).
- A4: whether qualified record ids type-check in a project's generated SDK.
- Whether a plan page under `plans/` passes the initiative or design check as
  a page of the project, and whether a `data-design-status` chip resolves on
  it (design review B could not check either).
- Whether `initiative check` exits non-zero on a failure.
- Whether `ex-tree data-design-need` shows planned checks under the rules; the
  guide says it "draws the need and the rules that serve it"
  (`typed-design.md:184`), while `presentation-html` describes a Tree of rules
  and checks.
- The owner quotes and relayed preferences, until checked against the export
  (A1).
