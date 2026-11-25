# Requirements

Revision 2, 25 November 2026: adds the Mac Lead's input (a to f) and the
independent skills review's fifteen findings as signals, and the requirements
they bring. Written by a helper to the Demistify 🦁 Lead (commission
`commission-design-skills-initiative-plan.md` in sunstack-tools
`docs/wip/2026-11-22-demistify-lean-design-records/`). Not yet design-reviewed.
Multi-run set: five skill updates and one new skill, all in
`sunstack-workflow-v2`.

## The change

Class: behavior-changing. Claim: alters the main path and depth of
`design-specification`, `design-program`, `design-verification`,
`design-review` and `role-lead` (where a project's records live, what a
numbered project in an initiative gets designed, which phase adds which ids to
a deliverable's scope, what review reads and routes, how the Lead orders,
commissions, records results and accepts by deliverable), and creates one
model-invocable skill, `plan-implementation`, with a new trigger, main path,
reference and Codex metadata. It also touches the plugin's version, README,
manifests and changelog (platform surfaces). No existing description changes.

Runs: one `create` (`plan-implementation`) and five `update`s.

Reusable behavior: these skills help agents reliably carry one owner-ordered
initiative from numbered projects, through each project's single four-part
design, into deliverables that each get one plan, one build and recorded proof,
when a Lead designs and delivers work that spans several projects.

Owning paths found by search (`grep -rn -i "initiative|deliverable|plans/"`
over `plugins/sunstack-workflow-v2/skills`):

- no v2 skill writes a deliverable's scope or steps, or a plan; nothing in v2
  owns planning (`design-program/SKILL.md:329` hands "task slices" to an
  unnamed "planning");
- the base reference `sunstack-dev/shared-references/design-documents.md:163-167`
  already defines initiative, numbered project and deliverable, and hands the
  plan's shape and home to `canonical-implementation-plan.md` (same folder);
- the v1 planner `sunstack-workflow-v1/skills/plan-implementation/` (frozen
  archive) is the only plan skill; the owner's global instructions point at it
  as "`plan-implementation` once it is ported to v2".

Baseline: the five v2 skills at `skills/initiative-vocabulary` 53f2de4a (PR
239, open), which already renamed milestone to project and project to
initiative, and v1 `plan-implementation` at the installed 1.1.0 (identical to
the source in that branch).

## The need, in the owner's words

As relayed by the commission (quotes not checked against an owner-message
export; see "What stays open"):

- "let's update design-* skills and how it should use initiatives and right
  components in Demistify and what should be in a plan skill for workflows v2.
  We only care about updating workflows v2."
- "deliverable is mapping a project design to plan right?"
- "so each item in deliverable is part of plan, is details of a deliverable DAG
  no?"

The model the owner settled with the Mac Lead on 25 November, as the
commission draws it:

```
INITIATIVE     order numbers · shared decisions          no design documents
└── PROJECT    ONE design: four documents
    │            Requirements         ->  needs        (U)
    │            Specification        ->  rules        (R), entities
    │            Program Design       ->  how          (M)
    │            Verification Design  ->  checks       (V)
    │            "what you check" is the top line of its Verification Design
    └── DELIVERABLE   a scope over those records: which rules, which checks
                      -> brief (generated)  -> plan  -> build  -> results
```

- A project is one design; a deliverable is never a design.
- A deliverable selects which rules and checks of its project's design it
  covers, adds no rule, is what one plan is written for, and carries the proof
  back (build, check results, acceptance).
- Two levels of graph: deliverables and what each waits on form the graph,
  across projects; a plan is the detail inside one node. The deliverable lists
  its steps by name; the plan explains each of those same steps (files, tests,
  pull request, proof); nothing is a step in one and not the other;
  re-planning changes both in the same edit.
- Within a project, deliverables follow their sequence; between projects, the
  initiative's order numbers (same number side by side, 2 after 1);
  deliverables may depend on deliverables in any project.

From the Mac Lead, the main user of these skills (relayed by the Demistify
Lead, 25 November):

- One rule for where a fact lives: the record holds the one sentence and its
  links; the page holds explanation and picture.
- A project is one four-document design; a deliverable is a scope over it; its
  items are the plan's steps (agreed with the owner).
- Before any commission, the Lead names the deliverable id the work belongs
  to; if there is none, it adds the row first.
- Depth by order number: all four documents for number 1; Requirements and
  open questions only for later numbers "until near" (the owner asked for
  this).
- Entities have no typed record: flag only; the owner wants the tool small.

Still open, carried as owner questions in `skill-design.md`: what "near"
means for depth (Q1), where initiatives live (Q6), the plan contract and its
dependency line (Q7), the two checkers (Q5), and what row work gets when no
deliverable covers it (Q8).

## Success definition

Success, in the owner's terms: a Lead using the v2 skills on an initiative

1. designs each project once, as four documents, at the depth its number
   gives it, with shared decisions written once in the initiative;
2. cuts each project into deliverables that select its records and add none;
3. writes one plan per deliverable whose steps are exactly the steps the
   deliverable lists, and changes both together when it re-plans;
4. orders work by deliverable dependencies and the owner's project numbers,
   never by its own reordering;
5. records each build's results and acceptance on the deliverable, so
   progress is read from the records (`initiative status`), not from a plan or
   a chat summary;
6. uses the Demistify components the guide documents for each of these, and
   invents none, loading the guide before it writes a record;
7. names, before any commission, the deliverable the work belongs to (Mac
   Lead, 25 Nov).

## Who reaches the skills, and when

| Skill | Reached by | When |
| --- | --- | --- |
| `design-specification`, `design-program`, `design-verification` | the 🦁 Lead, by phase routing and description | designing one project, in order |
| `design-review` | the Lead, through a fresh 🔎 Reviewer | after each phase's classification, and for the four-document set |
| `plan-implementation` (new) | the Lead, unprompted or by the `ready-for-planning` token in the owner's skill index | a deliverable's project review returned `ready`, or a plan must change |
| `role-lead` | the Lead | always, as its charter |

## Evidence

| Signal | Date | Source |
| --- | --- | --- |
| Owner direction and settled model (quoted above) | 2026-11-25 | the commission, relayed from the owner's session with the Mac Lead |
| Demistify initiatives, numbered projects, deliverables, `brief`, `initiative status`, `ex-initiative-overview` shipped | 2026-11-25 | sunstack-tools `origin/main` 73d43548 (PR 226): `packages/demistify/skill/references/typed-design.md`, `typed-design-initiative.md`, `bin/demistify.ts:72-176` |
| The design check reports a missing need or check only for rules a `core` deliverable scopes | read 2026-11-25 | `packages/demistify/src/node/design-authoring/delivery-model.ts` coverage gaps per deliverable; test `delivery-model.test.ts:257` "reports a scoped rule without a need" |
| A completed task that the deliverable no longer lists fails the check | read 2026-11-25 | `delivery-model.ts:306-308` ("unknown implementation task … in completedTasks") |
| No v2 skill writes deliverable scope, steps, progress, acceptance on the deliverable, or a plan | read 2026-11-25 | the five v2 skills at 53f2de4a; `role-lead/references/accepting-work.md:15` keeps acceptance in "the existing Lead acceptance record" |
| `design-specification` defaults to `docs/specs/`; the base reference says `docs/initiatives/<initiative>/projects/<project>/` | read 2026-11-25 | `design-specification/SKILL.md:255`; `design-documents.md:165` |
| The owner's design-mode write list names `docs/specs/`, `docs/wip/`, `tmp/` only | read 2026-11-25 | `~/.claude/CLAUDE.md`, Design Mode |
| v1 plan contract: immutable plan; a meaning change makes a new plan path | read 2026-11-25 | `sunstack-dev/shared-references/canonical-implementation-plan.md:3,39` |
| M-a. `presentation-show-worklog` and `presentation-html` route an owner decision to a hand-written `ex-choice`; in a tree with typed records it must be a choice record in an `ex-section-item`. Three of his pages were wrong for that reason. | 2026-11-25 | Mac Lead, 25 Nov. Anchors read: `presentation-html/references/options-and-decisions.md:15` ("Add a native choice when the task asks the reader to answer a question", not scoped to untyped pages); `presentation-show-worklog/SKILL.md:21,42`. Both sunstack-dev: dependency. |
| M-b. Two rules load: "the page holds the complete design" and "the record is the only home of its text". | 2026-11-25 | Mac Lead, 25 Nov. Located: the first is v1's own copy, `sunstack-workflow-v1/1.1.0/shared-references/design-documents.md:132` ("The Markdown carries the complete design"), installed beside sunstack-dev on Claude and Codex; sunstack-dev's copy (`design-documents.md:29`) is record-only. |
| M-c. The design skills write one set under `docs/specs/` and know no initiative or project; he wrote a separate design (own rules and checks) per deliverable. | 2026-11-25 | Mac Lead, 25 Nov; matches `design-specification/SKILL.md:255` |
| M-d. A week of his work has no deliverable row. | 2026-11-25 | Mac Lead, 25 Nov |
| M-e. Depth by number was asked for by the owner. | 2026-11-25 | Mac Lead, 25 Nov (second-hand) |
| M-f. Entities: flag only; keep the tool small. | 2026-11-25 | Mac Lead, 25 Nov (owner preference, second-hand) |
| R1 (blocker). `core` slices never become `core` deliverables, so every "no `core` rule without a need or check" gate passes on an empty report; `design init` seeds `defineDelivery(design, [])`. | 2026-11-25 | independent skills review, finding 1 (`delivery-model.ts:186-224`, `init-design.ts:34`) |
| R2. Records are written before the guide (`typed-design.md`, and `typed-design-initiative.md` in an initiative) is loaded; the phases only point at it. | 2026-11-25 | independent skills review, finding 2 |
| R3. No skill names `initiative status`. | 2026-11-25 | independent skills review, finding 3 |
| R4. `canonical-implementation-plan.md:67` makes the plan restate deliverable dependency edges that `dependsOn` already holds. | 2026-11-25 | independent skills review, finding 4 |
| R5. Handoffs hand-list ids instead of giving `brief` output. | 2026-11-25 | independent skills review, finding 5 (`design-documents.md:171`) |
| R6. Review ignores the order warnings, "Waiting on owner" and long-statement notes in the check report. | 2026-11-25 | independent skills review, finding 6 |
| R7. Two defaults for a new project's home. | 2026-11-25 | independent skills review, finding 7 |
| R8. No route for an initiative's overview page in `presentation-html`. | 2026-11-25 | independent skills review, finding 8 (sunstack-dev) |
| R9. PR 239 skipped its own design, review and rules steps; ship blocked until findings 4, 7 and 9 are answered. | 2026-11-25 | independent skills review, finding 9 (affects this set's base) |
| R10. "Run the design check on the project" in an initiative should run on the initiative root. | 2026-11-25 | independent skills review, finding 10 (`diagram-rendering-and-fallbacks.md:62,76`, sunstack-dev) |
| R11. "a rule with no planned check once checks exist" misstates when the gap appears. | 2026-11-25 | independent skills review, finding 11 (`design-specification/references/requirements-and-traceability.md:70`) |
| R12. "project" means both a design project and a repository root in one sentence. | 2026-11-25 | independent skills review, finding 12 (`design-specification/SKILL.md:116`; `canonical-implementation-plan.md:61`) |
| R13. The job-size ladder calls the deliverable level "Milestone". | 2026-11-25 | independent skills review, finding 13 (`practices-delegation/SKILL.md:22-23`, sunstack-dev) |
| R14. PR 238's review record disagrees with its PR body. | 2026-11-25 | independent skills review, finding 14 (no edit here) |
| R15. No skill teaches who records deliverable progress, outcomes and acceptance; the helper-decision rule at `role-lead`'s handback is still open. | 2026-11-25 | independent skills review, finding 15 |

Authoring basis: user-directed intent. The Mac Lead's reports (M-a, M-c, M-d)
are failures observed in his work, not reproduced here; the review's findings
were found by reading. This set claims no fix for an observed failure: a
claim that run 1 or run 6 stops what the Mac Lead saw needs a reproduction
from his session records first, which the 🦁 Lead may commission.

## Non-goals

- No change to `sunstack-dev` (`design-documents.md`,
  `canonical-implementation-plan.md`, `presentation-html`), to the Demistify
  library or guide, to v1, or to the owner's global instructions. Each
  dependency on them is named in `skill-design.md`.
- No change to `practices-manage-agents`, `role-implementer`, `role-checker`
  or `role-operator`; the brief and the plan reach the Implementer as files
  under the existing role/files commission.
- No re-cut or migration teaching (`initiative migrate`): deferred.
- No description change to the five existing skills.
- No tracker (Linear) behavior; "milestone" and "project" in `ops-*` keep
  their own meaning.

## What stays open

- The owner's quotes, and the owner preferences the Mac Lead relays (M-e,
  M-f), are second-hand; a reviewer with the owner-message export can check
  them.
- Five owner questions (Q1, Q5, Q6, Q7, Q8 in `skill-design.md`); edits that
  depend on one are marked with its number. Q2, Q3 and Q4 are closed in
  revision 2, with the reason recorded there.
