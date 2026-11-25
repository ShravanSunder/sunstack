# Skill design

Revision 2, 25 November 2026: takes in the Mac Lead's input (M-a to M-f) and
the independent skills review (R1 to R15) listed in `requirements.md`. Edits
are renumbered E1 to E37. Not yet design-reviewed. Five owner questions are
open (Q1, Q5, Q6, Q7, Q8); each edit that depends on one is marked **[Qn]**
and written at that question's recommended option.

## Owner questions

Ranked by `design-documents.md`'s three questions (whose meaning, how hard to
undo, how much rests on it). Each open one has credible options with what it
gains and costs, and a recommendation. Nothing below is decided by the owner.

### Q8. What row does work get when no deliverable covers it? (new)

The Mac Lead asks that the Lead name the deliverable before any commission and
add the row first when there is none (M-d: a week of his work has no row). A
`core` deliverable with no rules is held by the check ("its scope has no
rules"); a `later` one is listed and not checked.

- **(a) A `core` deliverable in the project the work serves,** scoping the
  existing rules the work touches; when no rule fits, the missing rule goes to
  `design-specification` first. Gains: every commission is counted and gated.
  Costs: small fixes wait for a rule when none exists.
- **(b) A `later` deliverable as a placeholder row,** promoted to `core` when
  scoped. Gains: cheap, immediate. Costs: active work shows as "later" and is
  not checked.
- **(c) Rows only inside an initiative or typed project;** other work is
  exempt. Combinable with (a) or (b).

Recommendation: (a) with (c): inside an initiative or typed project, a
`core` row scoping existing rules, or the rule first; outside, no row.

### Q1. What does "near" mean for depth by number?

Revision 2: the Mac Lead relays that the owner asked for depth by number
(M-e): all four documents for number 1; Requirements and open questions only
for later numbers "until near". The direction is taken as the owner's
(assumption A1); what "near" means is open.

- **(a) Near means every lower-numbered project is accepted.** Gains: rules
  are written on settled ground. Costs: designers idle while builds finish;
  the next design starts late.
- **(b) Near means every lower-numbered project's `core` deliverables have
  plans.** Gains: the earlier designs have stopped moving, and the next design
  runs while they build. Costs: a late finding in an earlier build can still
  move the next design.
- **(c) The Lead proposes "near" per project and the owner confirms.** Gains:
  judgment per case. Costs: one owner decision per project.

Recommendation: (b), because "near" reads as before close, not after.

### Q6. Where do initiatives live?

Revision 2, narrowed after review finding 7: whatever the answer, a project in
an initiative is created inside that initiative's `projects/` folder, and a
standalone project in `docs/specs/<project>/` (E1). Open: where the initiative
itself lives. The base reference names `docs/initiatives/<initiative>/`
(`design-documents.md:165`); the owner's global instructions allow
design-mode writes only in `docs/specs/`, `docs/wip/` and `tmp/`.

- **(a) `docs/initiatives/<initiative>/`,** and the owner adds
  `docs/initiatives/` to the design-mode write list. Gains: matches the base
  reference and the guide. Costs: a change to the global instructions.
- **(b) `docs/specs/<initiative>/`.** Gains: no global change. Costs:
  `design-documents.md:165` then names the path as an example (the review's
  suggestion); whether the CLI assumes `docs/initiatives/` is not established
  (it takes a directory argument, `bin/demistify.ts:75`).

Recommendation: (a).

### Q7. Which contract governs the v2 plan, and its dependency line?

`canonical-implementation-plan.md` makes a completed plan immutable and a
meaning change a new plan path (lines 3, 39), and line 67 tells a
design-bearing plan to list the edges between deliverables, which the
deliverables' dependencies already hold (review finding 4).

- **(a) Reuse the canonical contract, with line 67 fixed in sunstack-dev** to
  the review's wording ("the deliverables' `dependsOn` are the edges between
  deliverables; the plan cites them and adds only edges between slices inside
  one deliverable"). A re-plan writes a superseding plan page and changes the
  deliverable's step list in the same commit. Gains: one contract home; the
  fix is one sentence. Costs: widens this change by one sunstack-dev line;
  the canonical reference keeps v1 vocabulary the v2 skill ignores.
- **(b) A lean v2 contract in the v2 skill,** the plan page edited in place.
  Gains: deliverable shaped, no sunstack-dev line in this change. Costs: two
  plan contracts; `design-documents.md:167` points at the canonical one and
  goes stale.
- **(c) Reuse the canonical contract unchanged** and have the v2 skill
  override line 67. Costs: the skill contradicts the reference it loads.
  Listed so it is seen and rejected.

Recommendation: (a). Its reading of "the same edit" as "the same commit" is
assumption A5.

### Q5. Two checkers

The skill design rules (`design-review/rules/design-documents.config.json`)
read pages; the Demistify check reads records.

- **(a) Keep both, split by what each reads:** the Demistify check owns
  records, links between records and deliverable states; the design rules own
  page-only properties (binding rows under `id="bindings"`, fragment links),
  and the link rule learns record placements in a `skill-rules-authoring`
  follow-up. Costs: two commands per design run.
- **(b) Move the page properties into the Demistify check** and retire the
  config. Costs: library work against the owner's wish for a small tool
  (M-f); the binding-row rule is skill meaning, not library meaning.

Recommendation: (a). No v2 edit in this set depends on it.

### Closed in revision 2

| Was | Now | Why |
| --- | --- | --- |
| Q2 who writes a deliverable's scope | default K9: each phase scopes its own records | The independent review found the gate passing on an empty report (R1, blocker) and proposed the same fix as option (a). The rest is workflow sequencing, the Lead's call; the owner may strike K9. |
| Q3 where a fact lives | requirement, no v2 edit | The Mac Lead asks for one rule: the record holds the sentence and links, the page holds explanation and picture (M-b). sunstack-dev's `design-documents.md:29` already states it; the second rule he saw is v1's own copy (`v1/1.1.0/shared-references/design-documents.md:132`), which loads when v1 is installed beside v2: a host and v1 matter, named under dependencies. |
| Q4 entities with no typed record | flag only, no edit | The Mac Lead relays the owner's preference for a small tool (M-f; assumption A7). |

## Decisions taken (the owner may strike any row)

| Id | Default | Rationale |
| --- | --- | --- |
| K1 | Six runs, one skill each, in the order of the runs table | Each phase's edit reads the one before it; the plan skill consumes a reviewed design; `role-lead` routes to all of them, so it lands last. |
| K2 | The new skill is named `plan-implementation` | The owner's global instructions and token table already name it ("`plan-implementation` once it is ported to v2"); v1 is the frozen archive. |
| K3 | One v2 skill writes the first plan and every re-plan | v2 has no `plan-update`; the owner tied a re-plan to the deliverable edit, which one skill can keep together. |
| K4 | Component tags stay in the guide and `presentation-html`; v2 skills name a view by the question it answers | `presentation-html` owns component choice (`SKILL.md:10`); naming tags in v2 would make a second home. The allocation table below is the review's reference. |
| K5 | The Lead records progress, outcomes and acceptance on the deliverable; helpers return them | `design-documents.md:79`: "A helper does not write design records." |
| K6 | `initiative migrate` is not taught; a re-cut goes to the owner | Moving deliverables changes the owner's order (S4); the command writes across projects. Security: deferred. |
| K7 | The plan skill's slice-and-proof depth is ported from v1's `references/slice-and-proof-design.md` into the v2 skill's own reference | v2 never loads v1 (`sunstack-workflow-v2/AGENTS.md`); the v1 text is the best existing source. |
| K8 | One `sunstack-workflow-v2` minor version (0.7.1 to 0.8.0) for the set | A new skill is user-visible. |
| K9 (2026-11-25, rev. 2; replaces open Q2) | Each phase writes its own records' ids into the `core` deliverables' scope: needs and rules (`design-specification`, which also writes the deliverables), realizations (`design-program`), checks (`design-verification`); steps come with planning | R1 (blocker): the design check gates only scoped rules (`delivery-model.ts:186-224`) and `design init` seeds no deliverable (`init-design.ts:34`). |
| K10 (rev. 2) | The deliverable record is the only home of its step names and its dependencies; the plan page explains each step by id and cites the dependencies | R4 and the Demistify Lead's direction: "The plan skill must take its steps from the deliverable's implementation tasks and its order from dependsOn, not copy them." |
| K11 (rev. 2) | Each design phase and the plan skill load the guide's `typed-design.md` (and `typed-design-initiative.md` in an initiative) before writing a record | R2. The single home for that call is `design-documents.md:20` (sunstack-dev, out of scope); the v2 call sites carry it until that reference does, and then point at it. |
| K12 (rev. 2) | `design-specification` writes a deliverable's first dependencies at the cut; the plan corrects them in the record | K10 needs the dependencies to exist before planning; the cut is where the sequence inside a project is first known. |

## Assumptions

| Id | Statement | What settles it |
| --- | --- | --- |
| A1 | The owner quotes in `requirements.md`, and the owner preferences the Mac Lead relays (M-e, M-f), are as the owner said them. | The owner-message export rows for 25 November. |
| A2 (rev. 2) | "Until near" means until every lower-numbered project's `core` deliverables have plans. | The owner's answer to Q1. |
| A3 | A project's `achieves` in `initiative.ts` is the owner-worded summary its need records must agree with, and its `acceptance` is the "what you check" line. | The owner, or the Mac Lead's record of the settlement. |
| A4 | A realization, check or rule may name a record in another project by qualified id (`sessions/R3`). | Partly read: the initiative check keeps a qualified id (`schema.ts:152`); whether a project's generated SDK types accept one in `realizes`, `checks` or `serves` is not established. Try it with `design types` and `initiative check`. |
| A5 | "Re-planning changes both in the same edit" is met by a superseding plan page and the changed step list in one commit. | The owner's answer to Q7. |
| A6 (rev. 2) | "Take its steps from the deliverable's implementation tasks" means the record is the home of the step names, and the plan skill may still add or rename a step there in the same edit as the page. | The Demistify Lead. |
| A7 (rev. 2) | "Flag only" for entities means no record kind and no new check; entities stay defined on the page. | The Mac Lead or the owner. |

## Targets and runs

Owner plugin: `sunstack-workflow-v2`, in `/Users/shravansunder/dev/ai-tools`.

| Run | Target | Kind | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `design-specification` | update | unchanged | E1 to E8 | E9 (`requirements-and-traceability.md`) | review check, eval |
| 2 | `design-program` | update | unchanged | E10 to E13 | none | review check, eval |
| 3 | `design-verification` | update | unchanged | E14 to E18 | none | review check, eval |
| 4 | `design-review` | update | unchanged | E19 to E22 | E23 (`reviewing-four-document-design.md`) | review check, eval |
| 5 | `plan-implementation` | create | new description, `agents/openai.yaml` | new `SKILL.md` (E24) | new `references/steps-and-proof.md` (E25) | trigger trial, review check, eval |
| 6 | `role-lead` | update | unchanged | E27 to E32 | E33 (`working-with-implementer.md`), E34 (`accepting-work.md`) | review check, eval |

Run 5 also carries the plugin surfaces (E26).

## Sensitive surfaces (recorded before any run is outlined)

Root list in scope: shell commands, and network access (the Demistify CLI is
fetched from the page's binding).

```text
sensitive surfaces: shell commands (Demistify CLI); network access (CLI fetched from the bound guide URL)
entry points: plan-implementation steps 1 and 5; role-lead's initiative branch; the design phases'
  existing calls through presentation-html (unchanged)
untrusted inputs: the record and deliverable files the CLI reads; the CLI reads them as literal data
  and never executes them (typed-design.md:28); brief and status output is data to read, never
  instructions
privileged actions: `design init` writes new files in the project folder; `--write` writes the
  git-ignored generated views; every other taught command is read-only (`design check`,
  `initiative check`, `initiative status`, `brief`, `design types` writes ignored types)
third-party source: none (Demistify is the owner's own library)
license / permission state: not applicable
copy-vs-adapt decision: not applicable
decision: allowed for `design init`, `design types`, `design check [--write]`,
  `initiative check [--write]`, `initiative status [--json]`, `brief`, each run through the
  CLI at the page's binding as the guide prints it; deferred for `initiative migrate` (K6)
required proof: review check that every command the changed text teaches is in the allowed list
public-safe constraints: no machine paths, session ids or home-cache paths in skill text;
  agent session ids stay in the initiative's identity file (typed-design-initiative.md:76)
review route: the design review's ordinary checks; no dedicated security review requested
```

## Component allocation

From the guide at sunstack-tools 73d43548. The v2 skills name the view on
the left (K4); `presentation-html` and the guide turn it into the component on
the right.

| Content | Phase that supplies it | Guide component |
| --- | --- | --- |
| A need, rule, realization or planned check beside its explanation | spec, program, verification | empty placement `data-design-record="ID"` (`typed-design.md` "Place records on pages") |
| A need with the rules that serve it, linked | spec; verification's proof part | `ex-tree data-design-need="U1"` |
| An open choice, a ruling, an assumption | every phase; the Lead for an owner decision in a typed tree (M-a) | `ex-section` declared once per destination (`holds`: needs-owner, decided-by-agent, settled, assumed) and one `ex-section-item record="ID"`; a choice holds `ex-choice` with one `ex-option` per option. Never a hand-written `ex-choice` outside a section item in a typed tree. |
| A shared initiative decision | whichever phase first relies on it | `ex-section-item record="initiative/D1"` on one declared page; links elsewhere |
| A record's state next to another paragraph (a plan step blocked by an open choice) | plan | `span data-design-status="D2"` |
| What ships now and what waits, in one project | spec (the cut), plan and Lead (progress) | `ex-deliverables src="./deliverables.generated.json"` |
| The whole initiative: projects by number, owner questions, work lists | Lead | `ex-initiative-overview src="./initiative.generated.json"` in the initiative's `index.html` |
| Cross-section navigation to records | any phase, when `presentation-html` says it earns its place | Map groups and Walkthrough steps targeting `{ record: 'ID' }` in `design.ts` |
| A deliverable's anchor | spec (cut) | `destination: { page, fragment }` naming a real `id`, such as `h2 id="DEL-01"` |
| The plan page | plan | an ordinary page through `presentation-html`; each step by its id, with the deliverable's progress and dependencies shown from the records (`ex-deliverables`), never as a hand-written table |
| A deliverable's brief; the initiative's status | plan (input), Lead (Implementer handoff, ordering), review (pretend planner) | CLI output of `brief` and `initiative status`, not components |

## Root topics applied

| Topic | Governs | Return kept |
| --- | --- | --- |
| change-classes | the class and claim | behavior-changing; claim in `requirements.md` |
| proof-claims | the posture | drafted from user intent; behavior not yet evaluated; no fix claimed for the Mac Lead's observed failures without a reproduction |
| generalization | S1 to S9 | two transfer cases each, `specification.md` |
| descriptions-and-invocation | run 5's description | below; trial in `skill-verification.md` |
| main-path | every changed body | lens stated first (run 5); each new branch names an observable condition and its return |
| steering | wording | leading words "deliverable", "brief", "step", "the owner's order"; bright lines only where named failures sit (E24 steps 4 and 5, E29) |
| calls-and-placement | every load | one home per meaning; K11's guide loads are calls, not restatements; review finding R2's "see X" pointers become load calls |
| worked-examples | run 5's shape | ordered steps, one reference; no schema, glossary or review module |
| security | the surfaces above | allowed / deferred |
| platform | run 5's metadata and the version | E26 |

## Run 1: `design-specification`

E1. Artifact home. Line 255: replace the `docs/specs/` default with "Otherwise,
a project in an initiative is created inside that initiative's `projects/`
folder, wherever the repository keeps the initiative, and a standalone project
in `docs/specs/<project>/`; create a new project with the guide's
`design init`." **[Q6]** names where initiatives live only through
`design-documents.md`. Line 116: "`<project-root>/docs/specs/`" becomes
"`<repository-root>/docs/specs/`" (R12).

E2. Step 1, after the `design-documents.md` load (line 118), the guide load
(K11, R2):

> MUST load the guide's `references/typed-design.md` at the binding
> `presentation-html`'s `references/demistify.md` selects, and return the
> helpers, fields and files this run writes. IF the project belongs to an
> initiative, also load `references/typed-design-initiative.md` and return the
> initiative root, the project numbers, the qualified-reference form and the
> alias source.

E3. Step 1, new branch after E2:

> IF the project belongs to an initiative, read the initiative's file and
> return the project's number, what it achieves, what the owner checks, and
> the shared decisions and assumptions it relies on. Rely on a shared record
> by its qualified id and never write a project copy of it.

E4. Step 1, new branch after E3. **[Q1]**

> IF a lower-numbered project's `core` deliverables do not all have plans
> yet, write this project's need records and the page's why part with its
> open questions, and return `deferred` for the Specification with the
> re-entry condition "every lower-numbered project's `core` deliverables have
> plans". This is the Requirements-only return above; its deliverables stay
> `later`.

E5. Step 2, after the Re-anchor paragraph (line 189): compare the need records
with the project's `achieves` from E3; a mismatch is owner meaning and returns
`decision-needed` (A3).

E6. Step 3 (line 197), replace the last two sentences (K9, K12, R1):

> Cut the project into deliverables and write them, one module each, as the
> guide shows. A `core` deliverable is a scope over this project's records
> that can be built, checked and accepted on its own: list its needs and
> rules as you write them, give it its anchor on the page, and name the
> deliverables it waits on as far as the cut shows. A `later` deliverable is
> an id and a title. A deliverable selects records and adds none; it is never
> a design. Realizations, checks and steps are added by the phases that own
> them.

Step 3's completion gains: "every `core` rule sits in at least one `core`
deliverable's scope, so the design check can report its missing links."

E7. Completion Blockers (after line 322), two items:

- a shared initiative decision or assumption is copied into the project
  instead of named by its qualified id;
- a `core` rule sits in no `core` deliverable's scope.

E8. Terminal Contract (line 92): the `locally-ready` return gains "the
deliverables with their scope and dependencies", and the handoff (line 110)
carries the deliverable ids.

E9. `references/requirements-and-traceability.md:70` (R11): "and a rule with
no planned check once checks exist" becomes "and, for a rule a `core`
deliverable scopes, no planned check; that gap stays until Verification Design
adds the check".

## Run 2: `design-program`

E10. Step 1 (line 89), artifact home: the same sentence as E1 for a new
file-backed Program Design, with "`<repository-root>`" (R12). **[Q6]**

E11. Step 1, after the `design-documents.md` load (line 91): the same guide
load as E2 (K11).

E12. Step 14 (line 215), after the realization records: "Add each realization
id to the scope of the `core` deliverables whose rules it realizes (K9). A
structural decision that several projects share is an initiative decision,
written once there."

E13. Planning Boundary (line 329), second sentence becomes: "Planning writes
each deliverable's steps in its record, the plan that explains them, exact
files, write scopes, the order of steps inside the deliverable, exact tests
and commands, red/green sequence, evidence capture, checkpoints, deployment
and rollback; dependencies between deliverables live in the deliverable
records."

## Run 3: `design-verification`

E14. Line 14, "The plan gives each slice the checks in its deliverable"
becomes "The plan assigns each of its deliverable's checks to the step that
earns it."

E15. Step 1, after the `design-documents.md` load (line 38): the same guide
load as E2 (K11).

E16. Step 5 (line 83), after the first sentence: "Add each check's id to the
scope of the `core` deliverables whose rules it decides (K9); the design check
rejects a scoped check that covers no scoped rule."

E17. Step 5, new paragraph:

> IF the project belongs to an initiative, write its "what the owner checks"
> line, the top line of this Verification Design, as the project's
> acceptance in the initiative's file: one sentence, in the owner's words
> where they exist, naming what the owner will see, drawn from the planned
> checks and adding none. Until the owner gives or accepts it, list it in the
> return as an owner ask.

E18. Return (line 117), `locally-ready` gains "each `core` deliverable's
checks" and, in an initiative, "the project's acceptance line and whether the
owner has accepted it".

## Run 4: `design-review`

E19. Operations (line 33), targets: "one project's typed records, its page,
its deliverables, and the Demistify check's report (`initiative check` on the
initiative root for a project in an initiative)".

E20. Step 2 inputs (after line 62): "the project's number and the shared
initiative records it relies on, for a project in an initiative". New
sentence after line 82: "**[Q1]** A project held to its needs by its number is
no review target in any mode; return blocked input naming its depth."

E21. Step 5, after line 118 (K9, R1, R6):

> From the same report, take an order warning (a deliverable depending on one
> in a higher-numbered project) as a candidate finding routed to the caller,
> for the number, or to `design-specification`, for the cut; read "Waiting on
> owner" as open owner questions the review must not treat as settled; and
> take each long-statement note as a nudge on that record's wording. A `core`
> rule that no `core` deliverable scopes escapes the report's coverage gaps;
> take it as a candidate finding routed to `design-specification`.

E22. Step 9 completion (line 200): "what a downstream program designer or
planner would still have to invent" gains "for each `core` deliverable".

E23. `references/reviewing-four-document-design.md`, Readiness (line 92):
before the pretend-planner block, "Run the guide's `brief` for each `core`
deliverable and read it as the planner's whole input." The block's "may
decide" gains "each deliverable's steps and the order of steps inside it";
"must consume" gains "each deliverable's scope and dependencies".

## Run 5: `plan-implementation` (create)

Who reaches it: the 🦁 Lead, unprompted on a reviewed deliverable, or through
the owner's token table (`ready-for-planning`, `plan-defect`). Model- and
user-invocable.

Trigger. Description (185 characters):

```text
Use when writing or revising the implementation plan for one deliverable of a reviewed project design: its named steps and how each is built and proven. Not for designing it (design-*).
```

Opener `Use when`; loading condition "implementation plan for one
deliverable"; one boundary, the design phases, which share the words
"project design". No `Always`: skipping the skill makes a worse plan, not a
broken one every time.

E24. `SKILL.md`, shape: ordered steps (order changes what the next step finds),
one reference, the base-dependency and trace lines every v2 phase opens with.

```text
Lens (first paragraph):
  A deliverable is one node of the delivery graph: a scope over its project's
  reviewed records, with its steps and the deliverables it waits on held in its
  record. A plan is the detail inside that node: it explains, step by step, how
  the deliverable goes from its brief to a build its checks can pass. The record
  names each step once; the plan explains it and keeps no list of its own. The
  plan adds no rule, realization or check; what it needs and the records lack
  goes back to the phase that owns it. The Lead writes the plan; helpers return
  evidence.

1. Admit the deliverable
   MUST load sunstack-dev/shared-references/design-documents.md and return the
   deliverable's scope fields, the dependency rule and the plan home it points to.
   MUST load the guide's typed-design.md (and typed-design-initiative.md in an
   initiative) at the page's binding and return the deliverable module's fields
   and the brief and status commands (K11).
   Input: one deliverable id (qualified in an initiative), its project's current
   `ready` four-document review with parent-verified corrections, and the
   requested terminal (plan-only | pr-ready-unmerged; ask once when ambiguous).
   Run the guide's `brief` for the deliverable and, in an initiative,
   `initiative status`; return both. The brief is the plan's input; the status
   says what the deliverable waits on and whether it is ready.
   IF the deliverable is `later`, return revision-requested to design-specification.
   IF the brief shows a governing open owner question or a scoped rule with no
   need or check, return revision-requested with that phase's gap token.
   Completion: the brief and status are in hand, or one exact non-ready result.

2. Re-anchor on the code
   Read the project page sections the scoped records sit in, then current
   branch/HEAD, owners, interfaces, tests and commands the scope touches,
   before claiming how any of it works (cite principle-read-ground-truth-first).
   IF one bounded repository or proof question is worth a helper, load
   practices-manage-agents and return an evidence-only commission; open its anchors.
   Completion: each scoped realization has its current owner and path, or a gap.

3. Cut the steps and attach proof
   Start from the steps the record already lists. MUST load
   references/steps-and-proof.md and return the step graph: each step's id,
   reads, write surfaces, the planned checks it earns with the command or journey
   and when it runs, focused proof (wrong behavior, layer, oracle), dispositions
   of overlapping tests, the order of steps inside the deliverable, integration
   gates, stop conditions.
   Inline rules: every scoped check is earned by exactly one step; every step
   serves a scoped record; a check no step can earn as written returns
   verification-design-gap (S7).
   Completion: every scoped check sits in one step, every step names what it serves.

4. Check the deliverable's place in the graph
   Read the deliverable's dependencies from its record and the status. Correct
   one only in the record: add it when this deliverable cannot start or prove
   without another (any project), remove it when it blocks nothing.
   Bright line: never write a dependency on a deliverable in a higher-numbered
   project; bring it to the Lead as a cut-or-number question (S3, S4).
   Rationalization blocked: "it's only a temporary edge until the owner reorders."
   Completion: each dependency in the record names what it blocks (start or
   proof), or the record holds none.

5. Write the record and the plan in one edit
   MUST load sunstack-dev/shared-references/canonical-implementation-plan.md and
   return its canonical record and plan home [Q7: with line 67 fixed].
   In the same edit: the deliverable record's step list, changed only where step
   3 changed it, and the plan page in the project's plans/ folder through
   presentation-html, passing the reader's question ("what gets built, in which
   steps, and how is each proven?") and the deliverable and record ids. The page
   explains each step by its id (files, tests, pull request boundary, checks it
   earns), shows the deliverable's dependencies and progress from the records,
   links to the project page and the deliverable's anchor, and restates no record.
   Bright line: the page lists no step and no dependency the record does not hold,
   and explains every step it does.
   Rationalization blocked: "the checklist item is too small to be a step."
   Re-plan [Q7]: a superseding plan page beside the old, with "Changed from",
   and the changed step list in the same edit; reconcile completed steps the new
   list drops (the check rejects an unknown completed task).
   A split into several pull requests is the owner's decision, as the canonical
   reference says.
   Run the initiative check on the initiative root (or the design check on a
   standalone project) read-only, then with --write.
   Completion: the check reports the deliverable `planned` (or its progress
   state on a re-plan) with no unknown task, and the page's static check passes.

Return: ready | revision-requested | blocked, with the canonical record.
Route: ready -> the caller commissions the build; revision-requested -> the
gap token's owner, then plan-defect back here; blocked -> the unblock owner.

Completion blockers:
  - a step on the plan page that the record does not list, or a listed step the
    page does not explain;
  - a hand-written list of dependencies or steps on the plan page;
  - a scoped check no step earns, or a step that serves no scoped record;
  - a step that adds observable meaning, structure or a check, or re-chooses
    a check's observation;
  - a dependency on a deliverable in a higher-numbered project, or on a project;
  - the plan page restates a record or carries progress text by hand;
  - no current `ready` review, or no brief read.
```

E25. `references/steps-and-proof.md`, ported from v1
`plan-implementation/references/slice-and-proof-design.md` (K7). Kept: the
change kinds (vertical, contract, prefactoring, integration,
migration/cutover, proof-only), real-dependency edges between steps inside
the deliverable, integration gates, "match proof to each change",
focused-proof oracle, keep/repair/remove dispositions, false-green split
conditions. Changed: "slice" becomes "step", and a step's name is the id the
deliverable record lists; the obligation ledger is built from the brief's
scoped records; "Verification Design row" becomes "planned check (`V` id)";
a step's reads are the record ids and page sections it realizes; edges
between deliverables are read from the record, never drawn here (K10).
Dropped: the pointer to v1's `implementer-verifier-pairing.md` (v2's role
skills own the pairing target). Caller contract: step 3 loads it with the
brief, the record's current steps and the re-anchor result; it returns the
step graph listed in step 3 and stops when every scoped check sits in one
step and every split condition hit is a returned gap.

E26. Plugin surfaces (run 5):

- `plan-implementation/agents/openai.yaml`: display name "Plan:
  Implementation", short description "Plan one deliverable's steps and proof",
  default prompt naming a reviewed deliverable; implicit invocation allowed.
- `sunstack-workflow-v2/README.md` skill table: a row for
  `plan-implementation` (v1 source `plan-implementation`).
- Version 0.7.1 to 0.8.0 in the three plugin manifests and three marketplace
  files; one dated changelog entry.

## Run 6: `role-lead`

E27. The work (line 16), new paragraph after the first:

> In an initiative, the owner orders projects by number and you deliver by
> deliverable: each project is one design, each deliverable selects records of
> it and gets one plan, one build and its recorded proof. Propose a renumbering
> or a re-cut to the owner; never make one.

E28. Methods (after line 27), three branches:

- IF the work belongs to an initiative, run the guide's `initiative status`
  and return what is ready now, what blocks the most open work and what is
  built but not accepted; choose the next work from it, and cite it when you
  report status to the owner.
- IF a project needs its design, use `design-specification` and the phases
  after it, at the depth its number gives it **[Q1]**, and return each phase's
  result.
- IF a deliverable's project review is `ready`, or a plan must change, use
  `plan-implementation` and return its plan path or its non-ready result.

E29. Methods, before the commissioning branches (M-d), a bright line:

> Before any commission inside an initiative or typed project, name the
> deliverable the work belongs to. IF no deliverable covers it, add the row
> first **[Q8]**: a `core` deliverable scoping the existing rules the work
> touches, or the missing rule through `design-specification` first.
> Rationalization blocked: "it's a small fix, the row can come later."

E30. Methods, the Implementer branch (line 29): the commission's files are the
deliverable's saved brief and its plan page; name the deliverable's builder by
the alias from the initiative's identity file.

E31. The work, after the owner-question sentence (line 16), M-a's in-scope
part:

> In a tree with typed records, an owner decision is an open choice record
> placed in its section item, as `design-documents.md` says; the brief points
> at it. Never write a hand-written choice there.

E32. Boundary (line 44), add: "You record each deliverable's progress, check
outcomes and acceptance from handbacks you have inspected; helpers return
them (K5)."

E33. `references/working-with-implementer.md`, Handback: after reading the
diff, record the completed steps and the build candidate on the deliverable,
and record each helper decision you adopt as a design record naming the
helper, as `design-documents.md` says (R15, the open PR 238 follow-up).

E34. `references/accepting-work.md`, line 15: "A concise paragraph/table in the
existing Lead acceptance record" becomes "Write the acceptance artifact as a
file and record it on the deliverable's acceptance, naming the build it
accepts; record the Verifier's outcomes on that build first." The closing
"Complete when" is unchanged.

## Dependencies outside scope

| Owner | What this set depends on, or what was found there | Effect if unchanged |
| --- | --- | --- |
| `sunstack-dev/shared-references/design-documents.md` | meaning of initiative, project, deliverable (163-167); fact home (29); `:20` is the single home for the guide load (R2); `:171` hand-lists ids instead of the brief (R5); `:165` path (R7, Q6) | K11's v2 loads carry R2 meanwhile; R5 stays for non-Lead handoffs |
| `sunstack-dev/shared-references/canonical-implementation-plan.md` | the plan record and home; `:67` dependency copy (R4, Q7 a); `:61` "project" for repository root (R12) | under Q7 (a) its one-line fix must land first |
| `presentation-html` | component choice (K4); `references/options-and-decisions.md:15` adds a native choice for any owner answer, not scoped to untyped pages (M-a); no route or chooser row for an initiative overview page (R8) | a page author can still hand-write a choice in a typed tree; E31 covers only the Lead's own decisions |
| `presentation-show-worklog` | routes owner decisions to a hand-written choice (M-a, `SKILL.md:21,42`) | as above |
| `diagram-rendering-and-fallbacks.md:62,76` | "run the design check on the project" in an initiative (R10) | a member-project check skips order warnings and alias validation |
| `practices-delegation/SKILL.md:22-23` | the job-size ladder calls the deliverable level "Milestone" (R13) | a vocabulary mismatch beside the typed levels |
| v1 `shared-references/design-documents.md:132` and the hosts | "The Markdown carries the complete design" loads beside sunstack-dev's rule when v1 is installed (M-b) | two rules load until v1 is disabled where v2 runs, an owner and host call |
| owner's global instructions | design-mode write list (Q6 a); "the Lead writes it under `docs/specs/<spec>/plans/`" | Q6 (a) needs `docs/initiatives/`; the plan-home sentence goes stale (plans live in the project's `plans/`) |
| Demistify | qualified ids in record links (A4); placement-aware link rule (Q5); release of `initiative check`/`status` to the hosted binding (review, "Hosted binding") | A4 unknown until tried; the taught commands fail on a binding without them |

## Coordination

- Base: `skills/initiative-vocabulary` at 53f2de4a (PR 239, open). The
  independent review blocks PR 239's ship until its findings 4, 7 and 9 are
  answered (R9); findings 4 and 7 sit in sunstack-dev lines PR 239 added, so
  the cheapest home for their fixes is PR 239 itself.
- This set sits on branch `skills/initiative-design-and-plan-design`,
  worktree `/Users/shravansunder/dev/ai-tools.skills-initiative-design-and-plan-design`.
- Implementation starts after the owner answers Q1, Q6, Q7 and Q8, on PR 239
  merged or on a branch from it, and after the hosted Demistify binding ships
  `initiative check` and `initiative status`.
- Pending edits on the same files: PR 239 (vocabulary) touches all five
  updated skills; no other open edits found.
- Version and changelog land once, with run 5 (E26).

## Run status

| Run | State |
| --- | --- |
| 1 to 6 | proposed |

## Review record

None. The design review has not been commissioned; the 🦁 Lead commissions it.
