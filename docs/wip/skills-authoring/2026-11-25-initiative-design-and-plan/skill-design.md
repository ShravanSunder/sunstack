# Skill design

Revision 1, 25 November 2026. Not yet reviewed. Seven owner questions are
open (Q1 to Q7, below); each edit that depends on one is marked **[Qn]** and
written at that question's recommended option.

## Owner questions

Ranked by `design-documents.md`'s three questions (whose meaning, how hard to
undo, how much rests on it). Each has credible options with what it gains and
costs, and a recommendation. Nothing below is decided.

### Q2. Who writes a deliverable's scope, and when?

The design check reports a rule with no need or no planned check only for
rules a `core` deliverable scopes (`delivery-model.ts`, per-deliverable
coverage gaps). The design phases and design review rely on that report
(`design-verification/SKILL.md:87`, `design-review/SKILL.md:118`).

- **(a) Each phase scopes its own records as it writes them.**
  `design-specification` cuts the deliverables and lists needs and rules;
  `design-program` adds realizations; `design-verification` adds planned
  checks; `plan-implementation` adds steps and dependencies. Gains: the check
  gates coverage during design and review, as the skills already assume; each
  scope field has one writer. Costs: four skills touch one deliverable file.
- **(b) The planner writes the whole deliverable after review.** Gains: one
  writer per deliverable file; the design stays free of delivery cuts. Costs:
  until planning, no rule is scoped, so the check reports no missing need or
  check, and design review loses its blocking gaps; the skills' current
  completion lines stop meaning anything.

Recommendation: (a). It is the only option under which today's check-based
completion lines hold.

### Q1. Does a project's depth follow its number?

The Mac Lead's proposal, not settled: number 1 gets all four documents and a
review; later numbers get Requirements and their questions until close.

- **(a) Depth follows the number.** A project gets Specification, Program
  Design and Verification Design when every lower-numbered project is
  accepted; until then it holds need records and open questions, and its
  deliverables are `later`. Gains: no rules written over ground the earlier
  projects will move; the owner answers questions while earlier work builds.
  Costs: a deliverable cannot depend on work in a later project that has no
  scope yet; later projects carry no planned checks to estimate from.
- **(b) Every project is designed in full up front.** Gains: the whole
  initiative is reviewable and plannable at once. Costs: later designs go
  stale as earlier projects land and need re-review.
- **(c) The owner sets each project's depth in the initiative.** Gains:
  explicit per project. Costs: one more owner decision per project, and no
  field for it in `initiative.ts` today (the guide's project entry has
  `design`, `number`, `achieves`, `acceptance`); it would live in prose.

Recommendation: (a), reading "until close" as "until every lower-numbered
project is accepted" (assumption A2).

### Q6. Where does a new project live?

`design-specification/SKILL.md:255` defaults to `docs/specs/`; the base
reference names `docs/initiatives/<initiative>/projects/<project>/`
(`design-documents.md:165`); the owner's global instructions allow design-mode
writes only in `docs/specs/`, `docs/wip/` and `tmp/`.

- **(a) Initiative folder for initiative work, `docs/specs/<project>/` for a
  standalone project,** and the owner adds `docs/initiatives/` to the
  design-mode write list. Gains: matches the base reference and the guide's
  table. Costs: a change to the owner's global instructions.
- **(b) Initiatives under `docs/specs/<initiative>/projects/<project>/`.**
  Gains: no global change. Costs: departs from the base reference and the
  guide's examples; whether the CLI accepts any root is not established (it
  takes a directory argument, `bin/demistify.ts:75`).
- **(c) Everything is an initiative,** a standalone project being an
  initiative of one, under `docs/initiatives/`. Gains: one layout. Costs: the
  global change in (a), plus an `initiative.ts` for every small design.

Recommendation: (a).

### Q7. Which contract governs the v2 plan, and how does a re-plan land?

`canonical-implementation-plan.md` (sunstack-dev) makes a completed plan
immutable and a meaning change a new plan path (lines 3, 39). The owner said
re-planning changes the deliverable's steps and the plan "in the same edit".

- **(a) Reuse the canonical contract unchanged.** A re-plan writes a
  superseding plan page beside the old one and changes the deliverable's step
  list in the same commit. Gains: in scope; one contract home; the current
  plan and the deliverable always agree. Costs: the canonical reference
  carries v1 vocabulary the v2 skill ignores (`plan-improve-repo`,
  `plan-update` as originating planners).
- **(b) A lean v2 contract in the v2 skill.** The plan page is edited in
  place with the deliverable; git holds history. Gains: shorter, deliverable
  shaped. Costs: two plan contracts; `design-documents.md:167` points at the
  canonical one and would need a sunstack-dev change (out of scope).

Recommendation: (a). Its reading of "the same edit" as "the same commit" is
assumption A5.

### Q3. One rule for where a fact lives

- **(a) The record is the only home of its text;** the page places it by id
  and shows the whole design when rendered (today's rule,
  `design-documents.md:29`, the guide's `typed-design.md:3`). Gains: check,
  brief and deliverable states read one source. Costs: a page opened without
  `--write` shows missing text.
- **(b) The page holds the complete design;** records index it. Gains: a page
  reads complete from source. Costs: a second copy of every statement, which
  the check exists to forbid.

Recommendation: (a), stated as "the page shows the complete design; the record
is the only home of its text". No v2 edit depends on it; the rule lives in
`design-documents.md` (out of scope).

### Q4. Entities have no typed record

- **(a) Keep entities as page prose with `E` ids** (today,
  `design-documents.md:16`). Costs: no tool checks that a rule's entity is
  defined.
- **(b) Ask Demistify for an entity record kind,** so rules link entities and
  the check reports undefined ones. Costs: a library change and a migration.

Recommendation: (a) for this change; (b) as a separate Demistify request if
the owner wants entity links checked. No v2 edit depends on it.

### Q5. Two checkers

The skill design rules (`design-review/rules/design-documents.config.json`)
read pages; the Demistify check reads records.

- **(a) Keep both, split by what each reads:** the Demistify check owns
  records, links between records and deliverable states; the design rules own
  page-only properties (the binding rows under `id="bindings"`, fragment
  links), and the link rule learns record placements in a
  `skill-rules-authoring` follow-up. Costs: two commands per design run.
- **(b) Move the page properties into the Demistify check** and retire the
  config. Costs: library work; the binding-row rule is skill meaning, not
  library meaning.

Recommendation: (a). No v2 edit in this set depends on it.

## Decisions taken (the owner may strike any row)

| Id | Default | Rationale |
| --- | --- | --- |
| K1 | Six runs, one skill each, in the order of the runs table | Each phase's edit reads the one before it; the plan skill consumes a reviewed design; `role-lead` routes to all of them, so it lands last. |
| K2 | The new skill is named `plan-implementation` | The owner's global instructions and token table already name it ("`plan-implementation` once it is ported to v2"); v1 is the frozen archive. |
| K3 | One v2 skill writes the first plan and every re-plan | v2 has no `plan-update`; the owner tied a re-plan to the deliverable edit, which one skill can keep together. |
| K4 | Component tags stay in the guide and `presentation-html`; v2 skills name a view by the question it answers | `presentation-html` owns component choice (`SKILL.md:10`) and already has rows for record placement, the need Tree, section items and the deliverables view; naming tags in v2 would make a second home. The allocation table below is the review's reference. |
| K5 | The Lead records progress, outcomes and acceptance on the deliverable; helpers return them | `design-documents.md:79`: "A helper does not write design records." |
| K6 | `initiative migrate` is not taught; a re-cut goes to the owner | Moving deliverables changes the owner's order (S4); the command writes across projects. Security: deferred. |
| K7 | The plan skill's slice-and-proof depth is ported from v1's `references/slice-and-proof-design.md` into the v2 skill's own reference | v2 never loads v1 (`sunstack-workflow-v2/AGENTS.md`); the v1 text is the best existing source. |
| K8 | One `sunstack-workflow-v2` minor version (0.7.1 to 0.8.0) for the set | A new skill is user-visible. |

## Assumptions

| Id | Statement | What settles it |
| --- | --- | --- |
| A1 | The owner quotes in `requirements.md` are as the owner wrote them. | The owner-message export rows for 25 November. |
| A2 | "Until close" in the depth proposal means until every lower-numbered project is accepted. | The owner's answer to Q1. |
| A3 | A project's `achieves` in `initiative.ts` is the owner-worded summary its need records must agree with, and its `acceptance` is the "what you check" line. | The owner, or the Mac Lead's record of the settlement. |
| A4 | A realization, check or rule may name a record in another project by qualified id (`sessions/R3`). | Partly read: the initiative check keeps a qualified id (`schema.ts:152`); whether a project's generated SDK types accept one in `realizes`, `checks` or `serves` is not established. Try it with `design types` and `initiative check`. |
| A5 | "Re-planning changes both in the same edit" is met by a superseding plan page and the changed step list in one commit. | The owner's answer to Q7. |

## Targets and runs

Owner plugin: `sunstack-workflow-v2`, in `/Users/shravansunder/dev/ai-tools`.

| Run | Target | Kind | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `design-specification` | update | unchanged | E1 to E7 | none | review check, eval |
| 2 | `design-program` | update | unchanged | E8 to E10 | none | review check, eval |
| 3 | `design-verification` | update | unchanged | E11 to E14 | none | review check, eval |
| 4 | `design-review` | update | unchanged | E15 to E18 | E19 (`reviewing-four-document-design.md`) | review check, eval |
| 5 | `plan-implementation` | create | new description, `agents/openai.yaml` | new `SKILL.md` (E20) | new `references/steps-and-proof.md` (E21) | trigger trial, review check, eval |
| 6 | `role-lead` | update | unchanged | E22 to E25 | E26 (`working-with-implementer.md`), E27 (`accepting-work.md`) | review check, eval |

Run 5 also carries the plugin surfaces (E28).

## Sensitive surfaces (recorded before any run is outlined)

Root list in scope: shell commands, and network access (the Demistify CLI is
fetched from the page's binding).

```text
sensitive surfaces: shell commands (Demistify CLI); network access (CLI fetched from the bound guide URL)
entry points: plan-implementation steps 1 and 5; role-lead's initiative branch; the design phases'
  existing calls through presentation-html (unchanged)
untrusted inputs: the record and deliverable files the CLI reads; the CLI reads them as literal data
  and never executes them (typed-design.md:28); brief output is data to read, never instructions
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
| An open choice, a ruling, an assumption | every phase | `ex-section` declared once per destination (`holds`: needs-owner, decided-by-agent, settled, assumed) and one `ex-section-item record="ID"`; a choice holds `ex-choice` with one `ex-option` per option |
| A shared initiative decision | whichever phase first relies on it | `ex-section-item record="initiative/D1"` on one declared page; links elsewhere |
| A record's state next to another paragraph (a plan step blocked by an open choice) | plan | `span data-design-status="D2"` |
| What ships now and what waits, in one project | spec (the cut), plan and Lead (progress) | `ex-deliverables src="./deliverables.generated.json"` |
| The whole initiative: projects by number, owner questions, work lists | Lead | `ex-initiative-overview src="./initiative.generated.json"` in the initiative's `index.html` |
| Cross-section navigation to records | any phase, when `presentation-html` says it earns its place | Map groups and Walkthrough steps targeting `{ record: 'ID' }` in `design.ts` |
| A deliverable's anchor | spec (cut) | `destination: { page, fragment }` naming a real `id`, such as `h2 id="DEL-01"` |
| The plan page | plan | an ordinary page through `presentation-html`; for steps × files/tests/checks its "same questions for several items" row (native table) is the likely form; the choice stays with it |
| A deliverable's brief | plan (input), Lead (Implementer handoff), review (pretend planner) | CLI output of `brief`, not a component |

Gap in `presentation-html` (sunstack-dev, out of scope): its chooser has no
row for the initiative-wide view or the status chip. The guide's own
conditional load (`typed-design.md:24`) reaches `ex-initiative-overview`, so
nothing blocks.

## Root topics applied

| Topic | Governs | Return kept |
| --- | --- | --- |
| change-classes | the class and claim | behavior-changing; claim in `requirements.md` |
| proof-claims | the posture | drafted from user intent; behavior not yet evaluated |
| generalization | S1 to S8 | two transfer cases each, `specification.md` |
| descriptions-and-invocation | run 5's description | below; trial in `skill-verification.md` |
| main-path | every changed body | lens stated first (run 5); each new branch names an observable condition and its return |
| steering | wording | leading words "deliverable", "brief", "step", "the owner's order"; bright lines only where named failures sit (E20 step 4, E20 step 5) |
| calls-and-placement | every load | one home per meaning: initiative and deliverable meaning stay in `design-documents.md`, syntax in the guide, component choice in `presentation-html` |
| worked-examples | run 5's shape | ordered steps, one reference; no schema, glossary or review module |
| security | the surfaces above | allowed / deferred |
| platform | run 5's metadata and the version | E28 |

## Run 1: `design-specification`

E1. Step 1 (line 116) and step 9 (line 255), artifact home. **[Q6]** Replace
the `docs/specs/` default in line 255 with: "Otherwise, a project in an
initiative lives in its folder in that initiative (`design-documents.md`), and
a standalone project in `docs/specs/<project>/`; create a new project with the
guide's `design init`." Line 116's call-scoped policy stays.

E2. Step 1, new branch after the `design-documents.md` load (line 118):

> IF the project belongs to an initiative, read the initiative's file and
> return the project's number, what it achieves, what the owner checks, and
> the shared decisions and assumptions it relies on. Rely on a shared record
> by its qualified id and never write a project copy of it.

E3. Step 1, new branch after E2. **[Q1]**

> IF a lower-numbered project in the initiative is not yet accepted, write
> this project's need records and the page's why part with its open
> questions, and return `deferred` for the Specification with the re-entry
> condition "every lower-numbered project is accepted". This is the
> Requirements-only return above; its deliverables stay `later`.

E4. Step 2, after the Re-anchor paragraph (line 189): compare the need records
with the project's `achieves` from E2; a mismatch is owner meaning and returns
`decision-needed` (A3).

E5. Step 3 (line 197), replace the last two sentences:

> Cut the project into deliverables. A `core` deliverable is a scope over this
> project's records that can be built, checked and accepted on its own; a
> `later` deliverable is an id and a title. A deliverable selects records and
> adds none; it is never a design. **[Q2]** Add each need and rule you write
> to the scope of the `core` deliverables it belongs to; realizations, checks,
> steps and dependencies are added by the phases that own them.

Completion line of step 3 gains: "every `core` rule sits in at least one
`core` deliverable's scope."

E6. Completion Blockers (after line 322), two items:

- a shared initiative decision or assumption is copied into the project
  instead of named by its qualified id;
- **[Q2]** a `core` rule sits in no `core` deliverable's scope.

E7. Terminal Contract (line 92), the `locally-ready` return gains "the
deliverables with their scope", and the handoff (line 110) carries the
deliverable ids.

## Run 2: `design-program`

E8. Step 1 (line 89), artifact home: the same sentence as E1 for a new
file-backed Program Design. **[Q6]**

E9. Step 14 (line 215), after the realization records: "**[Q2]** Add each
realization id to the scope of the `core` deliverables whose rules it
realizes. A structural decision that several projects share is an initiative
decision, written once there."

E10. Planning Boundary (line 329), first sentence unchanged; second becomes:
"Planning writes each deliverable's steps, exact files, write scopes, order
inside the deliverable, dependencies between deliverables, exact tests and
commands, red/green sequence, evidence capture, checkpoints, deployment and
rollback."

## Run 3: `design-verification`

E11. Line 14, "The plan gives each slice the checks in its deliverable"
becomes "The plan assigns each of its deliverable's checks to the step that
earns it."

E12. Step 5 (line 83), after the first sentence: "**[Q2]** Add each check's id
to the scope of the `core` deliverables whose rules it decides; the design
check rejects a scoped check that covers no scoped rule."

E13. Step 5, new paragraph:

> IF the project belongs to an initiative, write its "what the owner checks"
> line, the top line of this Verification Design, as the project's
> acceptance in the initiative's file: one sentence, in the owner's words
> where they exist, naming what the owner will see, drawn from the planned
> checks and adding none. Until the owner gives or accepts it, list it in the
> return as an owner ask.

E14. Return (line 117), `locally-ready` gains "each `core` deliverable's
checks" and, in an initiative, "the project's acceptance line and whether the
owner has accepted it".

## Run 4: `design-review`

E15. Operations (line 33), targets: "one project's typed records, its page,
its deliverables, and the Demistify check's report (`initiative check` for a
project in an initiative, with its order warnings and Waiting on owner)".

E16. Step 2 inputs (after line 62): "the project's number and the shared
initiative records it relies on, for a project in an initiative". New
sentence after line 82: "**[Q1]** A project held to its needs by its number is
no review target in any mode; return blocked input naming its depth."

E17. Step 5 (after line 118): "**[Q2]** A `core` rule that no `core`
deliverable scopes escapes the check's coverage gaps; take it as a candidate
finding routed to `design-specification`. An order warning (a deliverable
depending on one in a higher-numbered project) is a candidate finding routed
to the caller."

E18. Step 9 completion (line 200): "what a downstream program designer or
planner would still have to invent" gains "for each `core` deliverable".

E19. `references/reviewing-four-document-design.md`, Readiness (line 92):
before the pretend-planner block, "Run the guide's `brief` for each `core`
deliverable and read it as the planner's whole input." The block's "may
decide" gains "each deliverable's steps and its dependencies on other
deliverables".

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

E20. `SKILL.md`, shape: ordered steps (order changes what the next step finds),
one reference, the base-dependency and trace lines every v2 phase opens with.

```text
Lens (first paragraph):
  A deliverable is one node of the delivery graph: a scope over its project's
  reviewed records. A plan is the detail inside that node: the steps that take
  the deliverable from its brief to a build its checks can pass. Each step is
  named once in the deliverable and explained once in the plan. The plan adds
  no rule, realization or check; what it needs and the records lack goes back
  to the phase that owns it. The Lead writes the plan; helpers return evidence.

1. Admit the deliverable
   MUST load sunstack-dev/shared-references/design-documents.md and return the
   deliverable's scope fields, the dependency rule and the plan home it points to.
   Input: one deliverable id (qualified in an initiative), its project's current
   `ready` four-document review with parent-verified corrections, and the
   requested terminal (plan-only | pr-ready-unmerged; ask once when ambiguous).
   Run the guide's `brief` for the deliverable and return it; the brief is the
   plan's input.
   IF the deliverable is `later`, return revision-requested to design-specification.
   IF the brief shows a governing open owner question or a scoped rule with no
   need or check, return revision-requested with that phase's gap token.
   Completion: the brief is in hand, or one exact non-ready result.

2. Re-anchor on the code
   Read the project page sections the scoped records sit in, then current
   branch/HEAD, owners, interfaces, tests and commands the scope touches,
   before claiming how any of it works (cite principle-read-ground-truth-first).
   IF one bounded repository or proof question is worth a helper, load
   practices-manage-agents and return an evidence-only commission; open its anchors.
   Completion: each scoped realization has its current owner and path, or a gap.

3. Cut the steps and attach proof
   MUST load references/steps-and-proof.md and return the step graph: each
   step's name, reads, write surfaces, the planned checks it earns with the
   command or journey and when it runs, focused proof (wrong behavior, layer,
   oracle), dispositions of overlapping tests, integration gates, stop conditions.
   Inline rules: every scoped check is earned by exactly one step; every step
   serves a scoped record; a check no step can earn as written returns
   verification-design-gap (S7).
   Completion: every scoped check sits in one step, every step names what it serves.

4. Place the deliverable in the graph
   Write a dependency only on another deliverable (any project) that this one
   cannot start or prove without. Bright line: never write a dependency on a
   deliverable in a higher-numbered project; bring it to the Lead as a
   cut-or-number question (S3, S4). Rationalization blocked: "it's only a
   temporary edge until the owner reorders."
   Completion: each dependency names what it blocks (start or proof), or none.

5. Write the steps and the plan in one edit
   MUST load sunstack-dev/shared-references/canonical-implementation-plan.md and
   return its canonical record and plan home [Q7].
   In the same edit: the deliverable's step list and dependencies, and the plan
   page at the project's plans/ folder through presentation-html, passing the
   reader's question ("what gets built, in which steps, and how is each
   proven?") and the deliverable and record ids. The page explains each step
   by the same name (files, tests, pull request boundary, checks it earns),
   links to the project page and the deliverable's anchor, and restates no record.
   Bright line: nothing is a step in one and missing from the other.
   Rationalization blocked: "the checklist item is too small to be a step."
   Re-plan [Q7]: a superseding plan page beside the old, with "Changed from",
   and the changed step list in the same edit; reconcile completed steps the
   new list drops (the check rejects an unknown completed task).
   A split into several pull requests is the owner's decision, as the canonical
   reference says.
   Run the initiative check (or design check) read-only, then with --write.
   Completion: the check reports the deliverable `planned` (or its progress
   state on a re-plan) with no unknown task, and the page's static check passes.

Return: ready | revision-requested | blocked, with the canonical record.
Route: ready -> the caller commissions the build; revision-requested -> the
gap token's owner, then plan-defect back here; blocked -> the unblock owner.

Completion blockers:
  - a step named in the deliverable and not the plan, or the reverse;
  - a scoped check no step earns, or a step that serves no scoped record;
  - a step that adds observable meaning, structure or a check, or re-chooses
    a check's observation;
  - a dependency on a deliverable in a higher-numbered project, or on a project;
  - the plan page restates a record or carries progress;
  - no current `ready` review, or no brief read.
```

E21. `references/steps-and-proof.md`, ported from v1
`plan-implementation/references/slice-and-proof-design.md` (K7). Kept: the
change kinds (vertical, contract, prefactoring, integration,
migration/cutover, proof-only), real-dependency edges inside the deliverable,
integration gates, "match proof to each change", focused-proof oracle,
keep/repair/remove dispositions, false-green split conditions. Changed:
"slice" becomes "step", and a step's name is the id the deliverable lists;
the obligation ledger is built from the brief's scoped records;
"Verification Design row" becomes "planned check (`V` id)"; a step's reads are
the record ids and page sections it realizes. Dropped: the pointer to v1's
`implementer-verifier-pairing.md` (v2's role skills own the pairing target).
Caller contract: step 3 loads it with the brief and the re-anchor result; it
returns the step graph listed in step 3 and stops when every scoped check sits
in one step and every split condition hit is a returned gap.

## Run 6: `role-lead`

E22. The work (line 16), new paragraph after the first:

> In an initiative, the owner orders projects by number and you deliver by
> deliverable: each project is one design, each deliverable selects records of
> it and gets one plan, one build and its recorded proof. Propose a renumbering
> or a re-cut to the owner; never make one.

E23. Methods (after line 27), three branches:

- IF the work belongs to an initiative, run the guide's `initiative status`
  and return what is ready now, what blocks the most open work and what is
  built but not accepted; choose the next work from it.
- IF a project needs its design, use `design-specification` and the phases
  after it, at the depth its number gives it **[Q1]**, and return each phase's
  result.
- IF a deliverable's project review is `ready`, or a plan must change, use
  `plan-implementation` and return its plan path or its non-ready result.

E24. Methods, the Implementer branch (line 29): the commission's files are the
deliverable's saved brief and its plan page; name the deliverable's builder by
the alias from the initiative's identity file.

E25. Boundary (line 44), add: "You record each deliverable's progress, check
outcomes and acceptance from handbacks you have inspected; helpers return
them (K5)."

E26. `references/working-with-implementer.md`, Handback: after reading the
diff, record the completed steps and the build candidate on the deliverable.

E27. `references/accepting-work.md`, line 15: "A concise paragraph/table in the
existing Lead acceptance record" becomes "Write the acceptance artifact as a
file and record it on the deliverable's acceptance, naming the build it
accepts; record the Verifier's outcomes on that build first." The closing
"Complete when" is unchanged.

## E28. Plugin surfaces (run 5)

- `plan-implementation/agents/openai.yaml`: display name "Plan:
  Implementation", short description "Plan one deliverable's steps and proof",
  default prompt naming a reviewed deliverable; implicit invocation allowed.
- `sunstack-workflow-v2/README.md` skill table: a row for
  `plan-implementation` (v1 source `plan-implementation`).
- Version 0.7.1 to 0.8.0 in the three plugin manifests and three marketplace
  files; one dated changelog entry.

## Dependencies outside scope

| Owner | What this set depends on | Effect if unchanged |
| --- | --- | --- |
| `sunstack-dev/shared-references/design-documents.md` | meaning of initiative, project, deliverable (lines 163-167); plan contract pointer (167); fact home (29, Q3) | none for (a) answers; Q7 (b) needs line 167 changed |
| `sunstack-dev/shared-references/canonical-implementation-plan.md` | the plan record and home (Q7 a) | v1 vocabulary stays visible to the v2 skill |
| `presentation-html` | component choice (K4) | no row for the initiative view or the status chip; the guide still reaches them |
| owner's global instructions | design-mode write list (Q6 a); "the Lead writes it under `docs/specs/<spec>/plans/`" | Q6 (a) needs `docs/initiatives/`; the plan-home sentence goes stale (plans live in the project's `plans/`) |
| Demistify | qualified ids in record links (A4); entity records (Q4); placement-aware link rule (Q5) | A4 unknown until tried |

## Coordination

- Base: `skills/initiative-vocabulary` at 53f2de4a (PR 239, open). This set
  sits on branch `skills/initiative-design-and-plan-design`, worktree
  `/Users/shravansunder/dev/ai-tools.skills-initiative-design-and-plan-design`.
- Implementation starts after the owner answers Q1, Q2, Q6 and Q7, on PR 239
  merged or on a branch from it.
- Pending edits on the same files: PR 239 (vocabulary) touches all five
  updated skills; no other open edits found.
- Version and changelog land once, with run 5 (E28).

## Run status

| Run | State |
| --- | --- |
| 1 to 6 | proposed |

## Review record

None. The design review has not been commissioned; the 🦁 Lead commissions it.
