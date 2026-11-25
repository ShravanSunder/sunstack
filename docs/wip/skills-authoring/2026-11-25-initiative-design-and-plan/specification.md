# Specification

Revision 1, 25 November 2026. What the changed and new skills must do, and
the standards they state. Field names, markup and command syntax belong to the
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
2. `design-specification`, `design-program` and `design-verification` create a
   new project's records and page in the project's folder inside its
   initiative, and a standalone project's in `docs/specs/<project>/`. **[Q6]**
3. The three design phases rely on a shared initiative decision or assumption
   by its qualified id and never write a project copy of it.
4. `design-specification` gives a project whose number is above the lowest
   number that still has an unaccepted project only need records and the
   page's why part with its open questions, and returns `deferred` for the
   rest with the re-entry condition. **[Q1]**
5. `design-review` treats a project held at that depth as no review target in
   any mode and returns the blocked input with the reason. **[Q1]**

Success 2: deliverables select records and add none.

6. `design-specification` cuts the project into deliverables: each `core`
   deliverable a scope that can be built, checked and accepted on its own,
   each `later` one an id and a title.
7. Each design phase adds the ids of the records it writes to the scope of the
   `core` deliverables they belong to: needs and rules
   (`design-specification`), realizations (`design-program`), planned checks
   (`design-verification`). **[Q2]**
8. `design-review` reports a `core` rule that no `core` deliverable scopes as
   a finding routed to `design-specification`, because the design check gates
   only scoped rules. **[Q2]**

Success 3: one plan per deliverable, steps named in both.

9. `plan-implementation` admits one deliverable whose project has a current
   `ready` four-document review, and reads that deliverable's generated brief
   as its input.
10. `plan-implementation` writes, in one edit, the deliverable's step list
    and dependencies and a plan page that explains each of those same steps
    (files, tests, pull request boundary, the planned checks it earns), so no
    step is named in one and missing from the other.
11. `plan-implementation` re-plans by writing a superseding plan page and the
    changed step list in the same edit, and reconciles any completed step the
    new list drops. **[Q7]**
12. `plan-implementation` returns any meaning, structure or proof route the
    brief lacks to the phase that owns it, as that phase's gap token, and
    writes no step around it.
13. `design-review`'s pretend planner reads each `core` deliverable's brief
    and must be able to name its steps without inventing meaning.

Success 4: order by dependencies and the owner's numbers.

14. `plan-implementation` writes a dependency only between deliverables, and
    brings a dependency on a deliverable in a higher-numbered project to the
    Lead as a cut-or-number question instead of writing it.
15. `role-lead` reads the initiative's status to choose the next work (what is
    ready now, what blocks the most open work, what is built and not
    accepted) and never renumbers projects or moves deliverables between
    them without the owner's decision.

Success 5: results and acceptance live on the deliverable.

16. `role-lead` commissions the Implementer with the deliverable's brief and
    its plan page as the governing files.
17. `role-lead` records, from handbacks it has inspected, the deliverable's
    completed steps and build candidate, each planned check's outcome on that
    build, and its own acceptance with the acceptance artifact as evidence.
18. `design-verification` writes the project's "what the owner checks" line
    as the top line of its Verification Design: one sentence drawn from its
    planned checks that adds none.

Success 6: the guide's components, none invented.

19. Each skill hands the page work to `presentation-html` with the reader's
    question and the record or deliverable ids, and names a view by the
    question it answers; the component allocation in `skill-design.md` is the
    review's reference for which guide component that view becomes.

## Standards the skills state

S1. A deliverable selects records of its project's design and adds none;
what a deliverable needs that no record holds goes back to the phase that owns
that kind of meaning.

S2. A deliverable's steps are named in the deliverable and explained in its
plan, and a re-plan changes both in the same edit.

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

S8. **[Q1]** A project gets its full design when every lower-numbered project
is accepted; until then it holds its needs and their open questions.

## Transfer tests

Each rule, read on a materially different setting where it should hold (case
one) and against a bad choice it never names (case two).

| Rule | Case one | Case two | Verdict |
| --- | --- | --- | --- |
| S1 | A mobile initiative whose deliverables split one design by platform: each deliverable lists the same rules with different checks; nothing new is written. Holds. | A plan page adds "must also work offline" as an acceptance bullet. The rule never names acceptance bullets and still rejects it: it is observable meaning no rule holds, so it returns to `design-specification`. | passes |
| S2 | A data-pipeline deliverable whose steps are a schema migration and a backfill: both names in the deliverable, both explained in the plan. Holds. | A Lead adds "update the runbook" to the plan's pull-request checklist but not to the deliverable. The rule never names checklists; it rejects the unnamed step. | passes |
| S3 | A two-repository initiative (service in project 1, client in project 2): the client deliverable depends on the service deliverable. Holds. | An agent writes "project 2 blocked by project 3" in page prose. Not a deliverable edge, and it inverts the owner's order: rejected. | passes, owner-adopted scope |
| S4 | An initiative with three projects numbered 1, 1, 2. The Lead wants project 2's work sooner and brings the reorder to the owner. Holds. | An agent "temporarily" moves a deliverable into a number-1 project to start it early. The rule names no moves; it rejects the change of order without the owner. | passes |
| S5 | A shared "all writes go through the gateway" ruling used by three projects: one initiative record, three qualified links. Holds. | A project writes its own ruling restating the shared one, with a new id. Rejected: a second home for one decision. | passes |
| S6 | A Rust CLI deliverable: the Lead records the Verifier's outcomes for build 42 on the deliverable. Holds. | A Verifier edits the plan page to say "V3 passed". Rejected on both counts: a helper writing records, and progress in the plan. | passes |
| S7 | A web deliverable whose check observes the checkout page in a browser journey: the plan schedules it and leaves its passing condition alone. Holds. | A plan swaps the journey for a unit test "because it is faster". Rejected: it re-chooses the observation; the plan returns `verification-design-gap`. | passes |
| S8 **[Q1]** | Projects 1 and 2: project 2 holds needs and open questions while project 1 builds. Holds. | An agent writes project 2's rules early "to save time later". Rejected: depth comes from the number, not convenience. | passes if Q1 is (a) |

Every rule names Demistify only through `design-documents.md` and the guide,
which the owner adopted as v2's design medium (`sunstack-workflow-v2/README.md`,
Scope: "Typed records need Demistify 1.32.0 or later").
