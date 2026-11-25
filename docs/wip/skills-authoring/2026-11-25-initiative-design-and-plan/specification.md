# Specification

Revision 2, 25 November 2026: adds obligations 20 to 26 and S9 from the Mac
Lead's input and the independent skills review, closes the Q2 marks (default
K9), and moves step names and deliverable dependencies to the deliverable
record alone (K10). What the changed and new skills must do, and the
standards they state. Field names, markup and command syntax belong to the
Demistify guide at the page's binding (`typed-design.md`,
`typed-design-initiative.md`); the meaning of initiative, project, deliverable
and record belongs to `sunstack-dev/shared-references/design-documents.md`.
These sentences name kinds, homes and moments only. **[Qn]** marks a sentence
that waits for owner question Qn in `skill-design.md`, written at its
recommended option.

## What the skills must do

Success 1: one design per project, at its depth, shared decisions once.

1. `design-specification` reads, for a project in an initiative, the
   project's number, what it achieves, what the owner checks, and the
   initiative's shared decisions and assumptions before writing any record.
2. `design-specification` and `design-program` create a new project inside
   its initiative's `projects/` folder, wherever the repository keeps that
   initiative, and a standalone project in `docs/specs/<project>/`. **[Q6]**
   decides where initiatives live.
3. The three design phases rely on a shared initiative decision or assumption
   by its qualified id and never write a project copy of it.
4. `design-specification` gives a project whose number is not yet near only
   need records and the page's why part with its open questions, and returns
   `deferred` for the rest with the re-entry condition; a number is near when
   every lower-numbered project's `core` deliverables have plans. **[Q1]**
5. `design-review` treats a project held at that depth as no review target in
   any mode and returns the blocked input with the reason. **[Q1]**
6. Each design phase loads the guide's `typed-design.md`, and
   `typed-design-initiative.md` when the project is in an initiative, before
   it writes or edits a record.

Success 2: deliverables select records and add none.

7. `design-specification` cuts the project into deliverables and writes them:
   each `core` deliverable a scope that can be built, checked and accepted on
   its own, listing its needs and rules, with its dependencies on other
   deliverables as far as the cut shows them; each `later` one an id and a
   title.
8. `design-program` adds each realization to the scope of the `core`
   deliverables whose rules it realizes, and `design-verification` adds each
   planned check to the scope of those whose rules it decides.
9. `design-review` reports a `core` rule that no `core` deliverable scopes as
   a finding routed to `design-specification`, because the design check gates
   only scoped rules.

Success 3: one plan per deliverable, steps named once.

10. `plan-implementation` admits one deliverable whose project has a current
    `ready` four-document review, and reads that deliverable's generated
    brief as its input.
11. `plan-implementation` starts from the steps the deliverable already lists
    and its dependencies; it adds, renames or removes a step only in the
    deliverable record, in the same edit as the plan page.
12. The plan page explains each of the deliverable's steps by its id (files,
    tests, pull request boundary, the planned checks it earns), cites the
    deliverable's dependencies from the record, and lists neither by hand; it
    adds only the order between steps inside the deliverable.
13. `plan-implementation` re-plans by writing a superseding plan page and the
    changed step list in the same edit, and reconciles any completed step the
    new list drops. **[Q7]**
14. `plan-implementation` returns any meaning, structure or proof route the
    brief lacks to the phase that owns it, as that phase's gap token, and
    writes no step around it.
15. `design-review`'s pretend planner reads each `core` deliverable's brief
    and must be able to name its steps without inventing meaning.

Success 4: order by dependencies and the owner's numbers.

16. A dependency is written only between deliverables, in the deliverable
    record; `plan-implementation` brings a dependency on a deliverable in a
    higher-numbered project to the Lead as a cut-or-number question instead
    of writing it.
17. `role-lead` and `plan-implementation` read the initiative's status (what
    is ready now, what blocks the most open work, what is built and not
    accepted) as the ordering basis, and never renumber projects or move
    deliverables between them without the owner's decision.
18. `design-review` takes the check report's order warnings as candidate
    findings routed to the caller (for the number) or to
    `design-specification` (for the cut), its "Waiting on owner" list as the
    open owner questions the review must not treat as settled, and its
    long-statement notes as nudges.

Success 5: results and acceptance live on the deliverable.

19. `role-lead` commissions the Implementer with the deliverable's brief and
    its plan page as the governing files.
20. `role-lead` records, from handbacks it has inspected, the deliverable's
    completed steps and build candidate, each planned check's outcome on that
    build, and its own acceptance with the acceptance artifact as evidence.
21. `design-verification` writes the project's "what the owner checks" line
    as the top line of its Verification Design: one sentence drawn from its
    planned checks that adds none.
22. `role-lead` names, before any commission inside an initiative or typed
    project, the deliverable id the work belongs to, and adds the deliverable
    first when none covers the work. **[Q8]**

Success 6: the guide's components, none invented.

23. Each skill hands the page work to `presentation-html` with the reader's
    question and the record or deliverable ids, and names a view by the
    question it answers; the component allocation in `skill-design.md` is the
    review's reference for which guide component that view becomes.
24. `role-lead` raises an owner decision in a tree with typed records as an
    open choice record placed in its section item, and points the brief at
    it; it never writes a hand-written choice there.

Wording the review found wrong, inside v2:

25. `design-specification`'s traceability reference says the design check
    reports a scoped rule with no planned check from the moment it is scoped,
    and that the gap stays until Verification Design adds the check.
26. Where a sentence names both, a typed design project is a "project" and a
    filesystem root is a "repository root".

## Standards the skills state

S1. A deliverable selects records of its project's design and adds none;
what a deliverable needs that no record holds goes back to the phase that owns
that kind of meaning.

S2. A deliverable's steps and its dependencies live in the deliverable record;
the plan explains each step by its id and keeps no list of its own, and a
re-plan changes the record and the plan in the same edit.

S3. Dependencies run only between deliverables; a dependency on a deliverable
in a higher-numbered project means the cut or the number is wrong, and that is
the owner's to settle. (Scope the owner adopted: typed-design initiatives,
`design-documents.md:165`.)

S4. A project's number is the owner's order; an agent proposes a change to it
and never makes one.

S5. A decision or assumption that several projects share is written once, in
the initiative, and each project relies on it by its qualified id.

S6. Progress, check outcomes and acceptance are recorded on the deliverable by
the Lead from handbacks it has inspected; the plan holds none of them.

S7. A plan never re-chooses a planned check's observation, target or passing
condition; a check its steps cannot earn as written is a Verification Design
gap.

S8. **[Q1]** A project gets its full design when its number is near; until
then it holds its needs and their open questions.

S9. Work inside an initiative or typed project is commissioned under a named
deliverable; work no deliverable covers gets its deliverable before its
commission. **[Q8]**

## Transfer tests

Each rule, read on a materially different setting where it should hold (case
one) and against a bad choice it never names (case two).

| Rule | Case one | Case two | Verdict |
| --- | --- | --- | --- |
| S1 | A mobile initiative whose deliverables split one design by platform: each deliverable lists the same rules with different checks; nothing new is written. Holds. | A plan page adds "must also work offline" as an acceptance bullet. The rule never names acceptance bullets and still rejects it: it is observable meaning no rule holds, so it returns to `design-specification`. | passes |
| S2 | A data-pipeline deliverable whose steps are a schema migration and a backfill: both ids in the record, each explained on the plan page. Holds. | A Lead adds "update the runbook" to the plan's pull-request checklist but not to the record; or the plan page carries its own table of what the deliverable waits on. The rule names neither checklists nor tables; it rejects both as a second list. | passes |
| S3 | A two-repository initiative (service in project 1, client in project 2): the client deliverable depends on the service deliverable. Holds. | An agent writes "project 2 blocked by project 3" in page prose. Not a deliverable edge, and it inverts the owner's order: rejected. | passes, owner-adopted scope |
| S4 | An initiative with three projects numbered 1, 1, 2. The Lead wants project 2's work sooner and brings the reorder to the owner. Holds. | An agent "temporarily" moves a deliverable into a number-1 project to start it early. The rule names no moves; it rejects the change of order without the owner. | passes |
| S5 | A shared "all writes go through the gateway" ruling used by three projects: one initiative record, three qualified links. Holds. | A project writes its own ruling restating the shared one, with a new id. Rejected: a second home for one decision. | passes |
| S6 | A Rust CLI deliverable: the Lead records the Verifier's outcomes for build 42 on the deliverable. Holds. | A Verifier edits the plan page to say "V3 passed". Rejected on both counts: a helper writing records, and progress in the plan. | passes |
| S7 | A web deliverable whose check observes the checkout page in a browser journey: the plan schedules it and leaves its passing condition alone. Holds. | A plan swaps the journey for a unit test "because it is faster". Rejected: it re-chooses the observation; the plan returns `verification-design-gap`. | passes |
| S8 **[Q1]** | Projects 1 and 2: project 2 holds needs and open questions until project 1's deliverables have plans. Holds. | An agent writes project 2's rules early "to save time later". Rejected: depth comes from the number, not convenience. | passes |
| S9 **[Q8]** | A Python service initiative: a bug fix found during build is commissioned under `api/DEL-04`, whose scope holds the rule it breaks. Holds. | A Lead sends a helper a "quick cleanup" by chat, inside an initiative, with no deliverable. The rule names no cleanups; it rejects the commission until a row exists. Work outside any initiative or typed project is outside its scope. | passes, scope stated |

Every rule names Demistify only through `design-documents.md` and the guide,
which the owner adopted as v2's design medium (`sunstack-workflow-v2/README.md`,
Scope: "Typed records need Demistify 1.32.0 or later").

The single rule for where a fact lives (the record holds the one sentence and
its links; the page holds explanation and picture), which the Mac Lead asked
for, is stated by `design-documents.md:29` and is not restated here; the
competing rule he saw loads from v1's own copy (requirements, M-b).
