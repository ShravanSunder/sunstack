# Specification

Revision 4, 25 November 2026: round-2 corrections from design reviews A and B
(S9 and S10 scoped to builds, the plan-and-review step for a new deliverable,
the CLI address, one release marker). Revision 3 corrected round 1 (findings
named in brackets). Revision 2 added obligations from the Mac Lead's
input and the independent skills review. What the changed and new skills must
do, and the standards they state. Field names, markup and command syntax
belong to the Demistify guide at the page's binding (`typed-design.md`,
`typed-design-initiative.md`); the meaning of initiative, project, deliverable
and record belongs to `sunstack-dev/shared-references/design-documents.md`.
These sentences name kinds, homes and moments only. **[Qn]** marks a sentence
that waits for owner question Qn in `skill-design.md`, written at its
recommended option. **[Demistify 1.34.1+]** marks behavior from sunstack-tools
PR 229, to ship in Demistify 1.34.1 or later: "ready now" ordered by project
number, with `core` deliverables that have no implementation steps left out of
it and listed as "Needs a plan" by `initiative status`.

Terms used below: a `core` deliverable is one the design check gates; a
`core` rule is a rule that a `core` deliverable scopes (B5).

## What the skills must do

Success 1: one design per project, at its depth, shared decisions once.

1. `role-lead` creates the initiative with the owner's project numbers and the
   owner's words for what each project achieves, registers each project in
   it, keeps the shared decision, assumption and agent-identity files, and
   places the initiative overview on the initiative's index page. [A1]
2. `design-specification` reads, for a project in an initiative, the
   project's number, what it achieves, what the owner checks, and the
   initiative's shared decisions and assumptions before writing any record.
3. `design-specification` and `design-program` create a new project inside
   its initiative's `projects/` folder, wherever the repository keeps that
   initiative, and a standalone project in `docs/specs/<project>/`. **[Q6]**
   decides where initiatives live.
4. The three design phases rely on a shared initiative decision or assumption
   by its qualified id and never write a project copy of it.
5. `design-specification` gives a project whose number is not yet near only
   need records and the page's why part with its open questions, and returns
   `deferred` for the rest, citing the owner's project numbers as the
   authority for the deferral and naming the re-entry condition; a number is
   near when every lower-numbered project's `core` deliverables have plans.
   **[Q1]** [B11]
6. `design-review` refuses a project held at that depth as a review target in
   any mode and returns the blocked input with the reason.
7. Each design phase, the plan skill and `role-lead` load the guide (its
   `typed-design.md`, and `typed-design-initiative.md` in an initiative) at
   the page's binding, and take the CLI address from that binding's entry
   guide (`authoring/SKILL.md`), before they write a record or run a Demistify
   command. [B3, B-N2]

Success 2: deliverables select records and add none.

8. `design-specification` cuts the project into deliverables and writes them,
   listed in the project's delivery file in the sequence they are to be
   built: each `core` deliverable a scope that can be built, checked and
   accepted on its own, listing its needs and rules, with the deliverables it
   cannot start or prove without; each `later` one an id and a title. [A2]
9. `design-program` adds each realization, and `design-verification` each
   planned check, to the scope of the `core` deliverables that build it; a
   record that addresses another project's rule names that rule by qualified
   id. [A4]
10. `design-review` reports a rule that no `core` deliverable scopes as a
    finding routed to `design-specification`, because the design check gates
    only scoped rules.

Success 3: one plan per deliverable, steps named once.

11. `plan-implementation` admits one deliverable whose project has a current
    `ready` four-document review, and reads that deliverable's generated
    brief as its input.
12. `plan-implementation` starts from the steps the deliverable already lists
    and its dependencies; it adds, renames or removes a step only in the
    deliverable record, in the same edit as the plan page.
13. The plan page explains each of the deliverable's steps under its id (the
    write surfaces, the proof it must produce, the pull request boundary, the
    planned checks it earns), names the deliverables it waits on from the
    record, and lists neither steps nor dependencies by hand; it adds only
    the order between steps inside the deliverable. **[Q9]**
14. Every planned check the deliverable scopes is earned by exactly one step;
    checks of the deliverables it waits on are named as prerequisites earned
    there. [A5]
15. `plan-implementation` re-plans by writing a superseding plan page and the
    changed step list in the same edit; a completed step the new list drops
    is removed from the deliverable's completed steps and named, with its
    evidence, in the superseding page's "Changed from". [A7, B9]
16. `plan-implementation` returns what the brief lacks to its owner, without
    a step written around it: a governing open owner question as `blocked`
    with the owner to unblock it; a scoped rule with no need as
    `specification-gap`; one with no planned check as
    `verification-design-gap`; a missing seam as `program-design-gap`. [B10]
17. `design-review`'s pretend planner reads each `core` deliverable's brief
    and must be able to name its steps without inventing meaning.

Success 4: order by dependencies and the owner's numbers.

18. A dependency is written only between deliverables, in the deliverable
    record; a real prerequisite in a higher-numbered project is not written,
    and the plan returns `blocked`, naming it, for the owner to settle the cut
    or the number. [A8]
19. `role-lead` and `plan-implementation` take what is ready from the
    initiative's status, in its order, and start no deliverable's build in a
    higher-numbered project while a lower-numbered project has open `core`
    work, unless the owner says otherwise; designing a later
    project at the depth its number gives it is not held by this.
    **[Demistify 1.34.1+]** the status orders "ready now" by project number
    and lists `core` deliverables with no steps under "Needs a plan".
    [A3, B2, A-N2]
20. `role-lead` never renumbers projects or moves deliverables between them
    without the owner's decision.
21. `design-review` takes the check report's order warnings as candidate
    findings routed to the caller (for the number) or to
    `design-specification` (for the cut), its "Waiting on owner" list as open
    owner questions the review must not treat as settled, and its
    long-statement notes as nudges.

Success 5: results and acceptance live on the deliverable.

22. `role-lead` commissions the Implementer with the deliverable id, the
    deliverable's brief generated at commission time and saved outside the
    project, and its plan page. [B15]
23. `role-lead` records, from handbacks it has inspected, the deliverable's
    completed steps and build candidate, each planned check's outcome on that
    build, and its own acceptance keyed to the deliverable where the guide
    places acceptances, naming the build and the acceptance artifact. [B12]
24. `design-verification` writes the project's "what the owner checks" line,
    the top line of its Verification Design: in an initiative, as the
    project's acceptance in the initiative file; for a standalone project, as
    the first sentence of the page's proof part. It is drawn from the planned
    checks and adds none. [A12]
25. `role-lead` names, before any build commission (an Implementer or
    Verifier, or a build fix) inside an initiative or typed project, the
    deliverable id the work belongs to; when none covers the work it adds the
    deliverable first, then its plan, and a design review of the cut when the
    deliverable adds rules, before the commission. Design, review and evidence
    commissions name the project. **[Q8]** [A-N1, A-N3]

Success 6: the guide's components, none invented.

26. Each skill hands the page work to `presentation-html` with the reader's
    question and the record or deliverable ids, and names a view by the
    question it answers; the component allocation in `skill-design.md` is the
    review's reference for which guide component that view becomes.
27. `role-lead` raises an owner decision in a tree with typed records as an
    open choice record placed in its section item, and points the brief at
    it; it never writes a hand-written choice there.

Wording inside v2:

28. `design-specification`'s traceability reference says the design check
    reports a scoped rule with no planned check from the moment it is scoped,
    and that the gap stays until Verification Design adds the check.
29. Where a sentence names both, a typed design project is a "project" and a
    filesystem root is a "repository root".
30. The design skills say `core` deliverable where they now say `core` slice,
    and define a `core` rule once, as a rule a `core` deliverable scopes. [B5]

## Standards the skills state

S1. A deliverable selects existing design records, its own project's or
another project's by qualified id, and adds none; what a deliverable needs
that no record holds goes back to the phase that owns that kind of meaning.
[A4]

S2. A deliverable's steps and its dependencies live in the deliverable
record; the plan explains each step under the same id and keeps no list of its
own; nothing is a step in one and not the other; a re-plan changes the record
and the plan in the same edit. [A10]

S3. Dependencies run only between deliverables; a real prerequisite in a
higher-numbered project means the cut or the number is wrong, and that is the
owner's to settle. (Basis: the owner's settled model, "deliverables may
depend on deliverables in any project" with "2 after 1", and the guide's
order rule, `typed-design-initiative.md:11`.) [A11]

S4. The owner's order (each project's number, and which project holds each
deliverable) changes only by the owner's decision; an agent proposes the
change and never makes it. [A9]

S5. A decision or assumption that several projects share is written once, in
the initiative, and each project relies on it by its qualified id.

S6. Progress, check outcomes and acceptance are recorded by the Lead from
handbacks it has inspected, keyed to the deliverable; the plan holds none of
them.

S7. A plan never re-chooses a planned check's observation, target or passing
condition; a check its steps cannot earn as written is a Verification Design
gap.

S8. **[Q1]** A project gets its full design when its number is near; until
then it holds its needs and their open questions.

S9. Build work inside an initiative or typed project is commissioned under a
named deliverable; build work no deliverable covers gets its deliverable, and
that deliverable its plan, before the commission. Design, review and evidence
commissions name the project. **[Q8]** [A-N3]

S10. Builds start in number order: no deliverable in a higher-numbered project
starts its build while a lower-numbered project has open `core` work, unless a
dependency or the owner says otherwise. Design depth follows S8. [A3, A-N2]

## Transfer tests

Each rule, read on a materially different setting where it should hold (case
one) and against a bad choice it never names (case two). Revision 3 takes
reviewer A's cases where they differed.

| Rule | Case one | Case two | Verdict |
| --- | --- | --- | --- |
| S1 | A client project whose deliverable scopes a service project's rule by qualified id: the record exists, nothing new is written. Holds. | A plan page adds "must also work offline" as an acceptance bullet. The rule never names acceptance bullets and still rejects it: observable meaning no rule holds, so it returns to `design-specification`. | passes |
| S2 | A data-pipeline deliverable whose steps are `migrate-schema` and `backfill`: both ids in the record, each explained under its id on the plan page. Holds. | The record lists `t2-schema` and the plan explains "Migrate users table". The rule names no renames; "under the same id" rejects it. | passes |
| S3 | A two-repository initiative (service in project 1, client in project 2): the client deliverable depends on the service deliverable. Holds. | The planner omits a real prerequisite in project 3, raises it and returns `ready`. Rejected by obligation 18: the plan returns `blocked` until the owner settles it. | passes |
| S4 | A Rust workspace: the owner renumbers projects on the Lead's proposal. Holds. | An agent moves a deliverable into a number-1 project to start it early. The rule names moves as part of the order: rejected. | passes |
| S5 | Three projects share an auth ruling: one initiative record, three qualified links. Holds. | The decision stays in project 1 and project 2 links `sessions/D4`. Rejected: shared means the initiative's. | passes |
| S6 | A Rust CLI deliverable: the Lead records the Verifier's outcomes for build 42. Holds. | The Lead records outcomes from a chat summary without opening the evidence. Rejected: not inspected. | passes |
| S7 | A browser journey kept as planned. Holds. | The plan runs the check only against a stand-in target. Rejected: it re-chooses the target. | passes |
| S8 **[Q1]** | Projects 1 and 2: project 2 holds needs and open questions until project 1's deliverables have plans. Holds. | An agent writes project 2's realizations early. Rejected: depth comes from the number. | passes; needs the `design-documents.md:32` line in "Dependencies outside scope" |
| S9 **[Q8]** | A Python service initiative: a bug fix found during build is commissioned under `api/DEL-04`, whose scope holds the rule it breaks. Holds. Re-run on a design-stage commission: the Lead commissions a 🔎 Reviewer for a typed project's Requirements before any deliverable exists; the commission names the project, and S9 does not apply. Holds. | A Lead sends a builder a "quick cleanup" by chat, inside an initiative, with no deliverable. Rejected until a row and its plan exist. Work outside any initiative or typed project is outside its scope. | passes, scope stated |
| S10 | A Go initiative: project 2's deliverable is planned while project 1 still has an open deliverable; the Lead builds project 1's first, while project 2's design proceeds under Q1(b). Holds. | A Lead starts project 2's build "because the builder is free". The rule names no idle builders; it rejects the start without a dependency or the owner. | passes |

The single rule for where a fact lives (the record holds the one sentence and
its links; the page holds explanation and picture), which the Mac Lead asked
for, is stated by `design-documents.md:29` and is not restated here; the
competing rule he saw loads from v1's own copy (requirements, M-b).
