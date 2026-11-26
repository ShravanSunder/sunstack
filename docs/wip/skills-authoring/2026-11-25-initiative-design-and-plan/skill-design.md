# Skill design

Revision 4, 25 November 2026: closes the open items of design reviews A
and B round 2 on revision 3 (ids A-N1 to A-N5, B-N1 to B-N4, and A6, B5 in
brackets; the mapping is in the review record at the end). Revision 3
corrected round 1 (A1 to A13, B1 to B18); revision 2 took in the Mac Lead's
input (M-a to M-f) and the independent skills review (R1 to R15). Edit numbers
E1 to E40 keep their meaning; no edit is added. Four owner questions are open
(Q9, Q8, Q1, Q6); each edit that depends on one is marked **[Qn]** and written
at that question's recommended option. **[Demistify 1.34.1+]** marks text
written against the one library change after 1.34.0: "ready now" ordered by
project number, with `core` deliverables that have no implementation steps
left out of it and listed instead as "Needs a plan" (`work.needsPlan`, printed
by `initiative status`), sunstack-tools PR 229, to ship in Demistify 1.34.1 or
later.

## Owner questions

Ranked by `design-documents.md`'s three questions (whose meaning, how hard to
undo, how much rests on it). Each open one has credible options with what it
gains and costs, and a recommendation. Nothing below is decided by the owner.

### Q9. How much of a step does the plan fix, and how much does the Implementer choose? (new) [B4]

The owner's model says the plan explains each step "(files, tests, pull
request, proof)". v2's role contract leaves "detailed implementation steps,
tests and native subagent decomposition" to the Implementer
(`role-implementer/SKILL.md:18`; `role-lead/SKILL.md:16`: "the Implementer
chooses execution steps"). The deliverable's steps are now the Lead's, and
checked: a completed step the record does not list fails the check
(`delivery-model.ts:306-308`).

- **(a) Steps are the Lead's governing units; the Implementer works inside
  each.** The plan names, per step, its write surfaces (files and modules),
  the proof it must produce (the checks it earns, and the wrong behavior its
  focused tests must fail on) and its pull request boundary. The Implementer
  chooses the detailed changes, sub-steps, test code and helpers inside each
  step. Run 6 amends `role-lead:16`; `role-implementer:18` reads unchanged,
  its "detailed steps, tests" now inside a step. Gains: the owner's "files,
  tests" held at the level of surfaces and required proof; v2's Designed
  Outcome model and the non-goal hold. Costs: "tests" in the owner's words
  becomes "the proof each step must produce", a reading the owner may reject.
- **(b) The plan names steps, the checks each earns and the pull request
  boundary only;** files and tests are the Implementer's. Gains: the role
  contract is untouched. Costs: drops "files, tests" from the owner's model.
- **(c) The plan fixes files and tests per step; `role-implementer:18`
  changes to carry them out.** Gains: the owner's words, literally. Costs:
  widens a stated non-goal; turns a Designed Outcome into near Exact Steps,
  against v2's README ("Implementer receives a Designed Outcome").

Recommendation: (a).

### Q8. What row does work get when no deliverable covers it?

The Mac Lead asks that the Lead name the deliverable before any commission and
add the row first when there is none (M-d). A `core` deliverable with no
rules is held by the check; a `later` one is listed and not checked.

- **(a) A `core` deliverable in the project the work serves,** scoping the
  existing rules the work touches; when no rule fits, the missing rule goes to
  `design-specification` first. Gains: every build commission is counted and
  gated. Costs: small fixes wait for a rule when none exists; and the new
  deliverable needs its plan (`plan-implementation`) before any build
  commission, plus a design review of the cut when it adds rules. A new
  deliverable that scopes only records the current review already covers is
  planned under that review [A-N1].
- **(b) A `later` deliverable as a placeholder row,** promoted to `core` when
  scoped. Gains: cheap, immediate. Costs: active work shows as "later" and is
  not checked.
- **(c) Rows only inside an initiative or typed project;** other work is
  exempt. Combinable with (a) or (b).

Recommendation: (a) with (c).

### Q1. What does "near" mean for depth by number?

The Mac Lead relays that the owner asked for depth by number (M-e): all four
documents for number 1; Requirements and open questions only for later numbers
"until near". Taken as the owner's direction (assumption A1); "near" is open.
Whatever the answer, work still starts in number order (S10), so no option
loses the order [A3]. Every option needs one sunstack-dev line:
`design-documents.md:32` says "only `core` work gets need, rule, realization
and check records", and a held project's needs are need records with no
`core` deliverable [A6].

- **(a) Near means every lower-numbered project is accepted.** Gains: rules
  are written on settled ground; observable through `initiative status`
  (a project is accepted when every `core` deliverable is). Costs: designers
  idle while builds finish.
- **(b) Near means every lower-numbered project's `core` deliverables have
  plans.** Gains: the earlier designs have stopped moving, and the next design
  runs while they build. Costs: a late finding in an earlier build can still
  move the next design; the gate is observable only from Demistify 1.34.1+
  (a lower-numbered project with nothing under "Needs a plan"); on 1.34.0 the
  Lead reads it by hand, from a plan page linked from each deliverable
  [A-N4].
- **(c) The Lead proposes "near" per project and the owner confirms.** Gains:
  judgment per case. Costs: one owner decision per project, and no field for
  it in `initiative.ts` (the project entry is strict: `design`, `number`,
  `achieves`, `acceptance`, `read-initiative.ts:14-22`).

Recommendation: (b), because "near" reads as before close, not after.

### Q6. Where do initiatives live?

Whatever the answer, a project in an initiative is created inside that
initiative's `projects/` folder, and a standalone project in
`docs/specs/<project>/` (E1). The CLI accepts any root
(`design-location.ts:6-24`); only `.gitignore` placement keys on a parent
folder named `projects` [B14]. At 2168d5b9 the base reference names no path;
the guide's level table shows `docs/initiatives/<initiative>/`. The owner's
global instructions allow design-mode writes only in `docs/specs/`,
`docs/wip/` and `tmp/`.

- **(a) `docs/initiatives/<initiative>/`,** and the owner adds
  `docs/initiatives/` to the design-mode write list. Gains: matches the
  guide's layout and examples. Costs: a change to the global instructions.
- **(b) `docs/specs/<initiative>/`.** Gains: no global change; the CLI works
  there. Costs: departs from the guide's examples, so pages and agents see two
  layouts.

Recommendation: (a), because every guide example and the migration tool's
examples use it; (b) is fully workable if the owner prefers not to widen the
write list.

### Closed

| Was | Now | Why |
| --- | --- | --- |
| Q2 who writes a deliverable's scope (rev. 2) | default K9 | The independent review found the gate passing on an empty report (R1, blocker) and proposed the same fix. Sequencing between skills is the Lead's call. |
| Q3 where a fact lives (rev. 2) | requirement, no v2 edit | `design-documents.md:29` states the Mac Lead's one rule; the competing rule is v1's own copy (M-b). |
| Q4 entities with no typed record (rev. 2) | flag only, no edit | The owner's preference for a small tool, relayed (M-f; A7). |
| Q5 two checkers (rev. 3) | default K15 | No v2 edit depends on it [A13]; option (b) would grow the tool against M-f. |
| Q7 plan contract (rev. 3) | default K13 | PR 239 fixed `canonical-implementation-plan.md:67`: at 2168d5b9, deliverable `dependsOn` records are the edges' only home and the plan names what it waits on; at 11f4826a, a plan scoped to one deliverable "admits that deliverable's checks only, names the checks of the deliverables it waits on as prerequisites earned there". The canonical contract now agrees with S2 and obligation 14. Its `:9` admits "one current reviewed project", which a plan for one deliverable of that project satisfies [A5, B6, B-N1]. |

## Decisions taken (the owner may strike any row)

| Id | Default | Rationale |
| --- | --- | --- |
| K1 | Six runs, one skill each, in the order of the runs table | Each phase's edit reads the one before it; the plan skill consumes a reviewed design; `role-lead` routes to all of them, so it lands last. |
| K2 | The new skill is named `plan-implementation` | The owner's global instructions and token table already name it ("`plan-implementation` once it is ported to v2"); v1 is the frozen archive. |
| K3 | One v2 skill writes the first plan and every re-plan | v2 has no `plan-update`; the owner tied a re-plan to the deliverable edit, which one skill can keep together. |
| K4 | Component tags stay in the guide and `presentation-html`; v2 skills name a view by the question it answers | `presentation-html` owns component choice (`SKILL.md:10`); naming tags in v2 would make a second home. The allocation table below is the review's reference. |
| K5 | The Lead records progress, outcomes and acceptance; helpers return them | `design-documents.md:79`: "A helper does not write design records." |
| K6 (rev. 4) | No re-cut is taught; a re-cut goes to the owner | Moving deliverables changes the owner's order (S4). The released CLI has no `initiative migrate`: sunstack-tools PR 228 moved the migration to `packages/demistify/scripts/initiative-migration/`, run from a source checkout, and the guide's re-cut section no longer ships [B-N3]. |
| K7 | The plan skill's slice-and-proof depth is ported from v1's `references/slice-and-proof-design.md` into the v2 skill's own reference | v2 never loads v1 (`sunstack-workflow-v2/AGENTS.md`); the v1 text is the best existing source. |
| K8 | One `sunstack-workflow-v2` minor version (0.7.1 to 0.8.0) for the set | A new skill is user-visible. |
| K9 (rev. 2; replaces open Q2) | Each phase writes its own records' ids into the `core` deliverables' scope: needs and rules (`design-specification`, which also writes the deliverables), realizations (`design-program`), checks (`design-verification`); steps come with planning | R1 (blocker): the design check gates only scoped rules (`delivery-model.ts:186-224`) and `design init` seeds no deliverable (`init-design.ts:34`). |
| K10 (rev. 2) | The deliverable record is the only home of its step names and its dependencies; the plan page explains each step under its id and names what it waits on | R4 and the Demistify Lead's direction: "The plan skill must take its steps from the deliverable's implementation tasks and its order from dependsOn, not copy them." |
| K11 (rev. 2; widened rev. 3, 4) | Each design phase, the plan skill and `role-lead` load the guide's `typed-design.md` (and `typed-design-initiative.md` in an initiative) at the page's binding, returning the fields they write, and take the CLI address from that binding's entry guide `authoring/SKILL.md`, before writing a record or running a Demistify command | R2, B3 and B-N2 (`typed-design.md:15` points to the entry guide for the exact `pnpm dlx` URL). The binding is selected by `presentation-html`'s `references/demistify.md`. The single home for the call is `design-documents.md:20` (sunstack-dev); the v2 call sites carry it until that reference does. |
| K12 (rev. 2) | `design-specification` writes a deliverable's first dependencies at the cut; the plan corrects them in the record | K10 needs the dependencies to exist before planning; the cut is where the sequence inside a project is first known. |
| K13 (rev. 3; replaces open Q7) | `plan-implementation` loads `canonical-implementation-plan.md` as fixed in PR 239; a re-plan writes a superseding plan page and changes the deliverable's step list in the same commit | One contract home; the line that copied dependencies is gone (2168d5b9), and a one-deliverable plan admits only its own checks (11f4826a). A5 is the reading of "the same edit". |
| K14 (rev. 3) | A project's deliverable sequence is the order of its delivery file's list; a hard prerequisite is also a `dependsOn` | A2. The owner said "within a project, deliverables follow their sequence"; the list order is the one place the guide keeps an order without a dependency. Reading recorded as A8. |
| K15 (rev. 3; replaces open Q5) | Keep both checkers, split by what each reads: the Demistify check owns records, links between records and deliverable states; the design rules own page-only properties (binding rows under `id="bindings"`, fragment links); the link rule learns record placements in a `skill-rules-authoring` follow-up | A13: no v2 edit depends on it. |

## Assumptions

| Id | Statement | What settles it |
| --- | --- | --- |
| A1 | The owner quotes in `requirements.md`, and the owner preferences the Mac Lead relays (M-e, M-f), are as the owner said them. | The owner-message export rows for 25 November. |
| A2 | "Until near" means until every lower-numbered project's `core` deliverables have plans. | The owner's answer to Q1. |
| A3 | A project's `achieves` in `initiative.ts` is the owner-worded summary its need records must agree with, and its `acceptance` is the "what you check" line. | Half read: the schema documents `acceptance` as "What the owner checks to accept the project" (design review B). `achieves` needs the owner or the Mac Lead's record. |
| A4 | A realization, check or rule may name a record in another project by qualified id (`sessions/R3`). | Partly read: the initiative check keeps a qualified id (`schema.ts:152`); whether a project's generated SDK types accept one in `realizes`, `checks` or `serves` is not established. Try it with `design types` and `initiative check`. |
| A5 | "Re-planning changes both in the same edit" is met by a superseding plan page and the changed step list in one commit. | The owner. |
| A6 | "Take its steps from the deliverable's implementation tasks" means the record is the home of the step names, and the plan skill may still add or rename a step there in the same edit as the page. | The Demistify Lead. |
| A7 | "Flag only" for entities means no record kind and no new check; entities stay defined on the page. | The Mac Lead or the owner. |
| A8 (rev. 3) | "Within a project, deliverables follow their sequence" means the order of the delivery file's list, with hard prerequisites also in `dependsOn`. | The owner, or the Mac Lead's record of the settlement. |
| A9 (rev. 4) | Demistify 1.34.1+ (sunstack-tools PR 229) orders "ready now" by project number and leaves out `core` deliverables with no implementation steps, listing them instead as "Needs a plan" (`work.needsPlan`, printed by `initiative status`); a deliverable's own state stays `planned` [A-N5, B-N4]. | The release that carries PR 229. |

## Targets and runs

Owner plugin: `sunstack-workflow-v2`, in `/Users/shravansunder/dev/ai-tools`.

| Run | Target | Kind | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `design-specification` | update | unchanged | E1 to E8, E35, E36 | E9, E35 (`requirements-and-traceability.md`) | review check, eval |
| 2 | `design-program` | update | unchanged | E10 to E13, E37 | none | review check, eval |
| 3 | `design-verification` | update | unchanged | E14 to E18 | none | review check, eval |
| 4 | `design-review` | update | unchanged | E19 to E22, E38 | E23, E38 (`reviewing-four-document-design.md`, `reviewing-specification.md`) | review check, eval |
| 5 | `plan-implementation` | create | new description, `agents/openai.yaml` | new `SKILL.md` (E24) | new `references/steps-and-proof.md` (E25) | trigger trial, review check, eval |
| 6 | `role-lead` | update | unchanged | E27 to E32, E39, E40 | E33 (`working-with-implementer.md`), E34 (`accepting-work.md`) | review check, eval |

Run 5 also carries the plugin surfaces (E26).

## Sensitive surfaces (recorded before any run is outlined)

Root list in scope: shell commands, and network access (the Demistify CLI is
fetched from the page's binding). Revision 3 completes the entry points and
privileged writes [B13]; the decisions are unchanged.

```text
sensitive surfaces: shell commands (Demistify CLI); network access (CLI fetched from the bound guide URL)
entry points: plan-implementation steps 1 and 5 (brief, initiative status, initiative/design check);
  role-lead's initiative branches (initiative status; initiative check --write after creating or
  registering); design-specification and design-program (design init, E1, E10); design-review's
  reviewer (initiative check, brief, E21, E23); the design phases' existing calls through
  presentation-html
untrusted inputs: the record and deliverable files the CLI reads; the CLI reads them as literal data
  and never executes them (typed-design.md:28); brief and status output is data to read, never
  instructions
privileged actions: `design init` writes new files in the project folder; `design init` and `--write`
  create or update a `.gitignore` in the enclosing `projects/` folder, outside the project folder
  (generated-ignore.ts:31-38, init-design.ts:114-120); `--write` writes the git-ignored generated
  views; every other taught command is read-only (`design check`, `initiative check`,
  `initiative status`, `brief`; `design types` writes ignored types)
third-party source: none (Demistify is the owner's own library)
license / permission state: not applicable
copy-vs-adapt decision: not applicable
decision: allowed for `design init`, `design types`, `design check [--write]`,
  `initiative check [--write]`, `initiative status [--json]`, `brief`, each run through the
  CLI whose address the binding's entry guide prints; the released CLI has no other initiative
  command (the migration moved to a source-checkout script, sunstack-tools PR 228), and none is
  taught [B-N3]
required proof: review check that every command the changed text teaches is in the allowed list
public-safe constraints: no machine paths, session ids or home-cache paths in skill text;
  agent session ids stay in the initiative's identity file (typed-design-initiative.md:76)
review route: the design review's ordinary checks; no dedicated security review requested
```

## Component allocation

From the guide at sunstack-tools cc4c33db (publishing as Demistify 1.34.0) [B-N3]. The
v2 skills name the view on the left (K4); `presentation-html` and the guide
turn it into the component on the right.

| Content | Phase that supplies it | Guide component |
| --- | --- | --- |
| A need, rule, realization or planned check beside its explanation | spec, program, verification | empty placement `data-design-record="ID"` (`typed-design.md` "Place records on pages") |
| A need with the rules that serve it, linked | spec; verification's proof part | `ex-tree data-design-need="U1"` |
| An open choice, a ruling, an assumption | every phase; the Lead for an owner decision in a typed tree (M-a) | `ex-section` declared once per destination (`holds`: needs-owner, decided-by-agent, settled, assumed) and one `ex-section-item record="ID"`; a choice holds `ex-choice` with one `ex-option` per option. Never a hand-written `ex-choice` outside a section item in a typed tree. |
| A shared initiative decision | whichever phase first relies on it | `ex-section-item record="initiative/D1"` on one declared page; links elsewhere |
| A record's state next to another paragraph (a plan step blocked by an open choice) | plan | `span data-design-status="D2"` (whether it resolves on a page under `plans/` is unverified) |
| What ships now and what waits, in one project | spec (the cut), plan and Lead (progress) | `ex-deliverables src="./deliverables.generated.json"` |
| The whole initiative: projects by number, owner questions, work lists | Lead | `ex-initiative-overview src="./initiative.generated.json"` in the initiative's `index.html` |
| Cross-section navigation to records | any phase, when `presentation-html` says it earns its place | Map groups and Walkthrough steps targeting `{ record: 'ID' }` in `design.ts` |
| A deliverable's anchor | spec (cut) | `destination: { page, fragment }` naming a real `id`, such as `h2 id="DEL-01"` |
| The plan page | plan | an ordinary page through `presentation-html`; each step under its id, with the deliverable's progress and dependencies shown from the records (`ex-deliverables`), never as a hand-written table |
| A deliverable's brief; the initiative's status | plan (input), Lead (Implementer handoff, ordering), review (pretend planner) | CLI output of `brief` and `initiative status`, not components |

## Root topics applied

| Topic | Governs | Return kept |
| --- | --- | --- |
| change-classes | the class and claim | behavior-changing; claim in `requirements.md` |
| proof-claims | the posture | drafted from user intent; behavior not yet evaluated; no fix claimed for the Mac Lead's observed failures without a reproduction |
| generalization | S1 to S10 | two transfer cases each, `specification.md` |
| descriptions-and-invocation | run 5's description | below; trial in `skill-verification.md` |
| main-path | every changed body | lens stated first (run 5); each new branch names an observable condition and its return |
| steering | wording | leading words "deliverable", "brief", "step", "the owner's order"; the bright lines in E24 steps 4 and 5 and E29 carry the owner's rules S2 to S4 and the Mac Lead's request (M-d); no run has shown the failure they block [B17] |
| calls-and-placement | every load | one home per meaning; K11's guide loads are calls with a where and a return, not restatements |
| worked-examples | run 5's shape | ordered steps, one reference; no schema, glossary or review module |
| security | the surfaces above | allowed / deferred |
| platform | run 5's metadata and the version | E26 |

## Run 1: `design-specification`

E1. Artifact home. Line 255: replace the `docs/specs/` default with "Otherwise,
a project in an initiative is created inside that initiative's `projects/`
folder, wherever the repository keeps the initiative, and a standalone project
in `docs/specs/<project>/`; create a new project with the guide's
`design init`." **[Q6]** is where initiatives live; this sentence holds
either way. Line 116: "`<project-root>/docs/specs/`" becomes
"`<repository-root>/docs/specs/`" (R12).

E2. Step 1, after the `design-documents.md` load (line 118), the guide load
(K11, R2, B3):

> MUST load the guide's `references/typed-design.md` at the binding
> `presentation-html`'s `references/demistify.md` selects, and return the
> helpers, fields and files this run writes, and the CLI address from that
> binding's entry guide `authoring/SKILL.md`. IF the project belongs to an
> initiative, also load
> `references/typed-design-initiative.md` and return the initiative root, the
> project numbers, the qualified-reference form and the alias source.

E3. Step 1, new branch after E2:

> IF the project belongs to an initiative, read the initiative's file and
> return the project's number, what it achieves, what the owner checks, and
> the shared decisions and assumptions it relies on. Rely on a shared record
> by its qualified id and never write a project copy of it.

E4. Step 1, new branch after E3. **[Q1]**

> IF a lower-numbered project's `core` deliverables do not all have plans
> yet, write this project's need records and the page's why part with its
> open questions, and return `deferred` for the Specification, citing the
> owner's project numbers in the initiative file as the authority and "every
> lower-numbered project's `core` deliverables have plans" as the re-entry
> condition. This is the Requirements-only return above; its deliverables stay
> `later`.

E5. Step 2, after the Re-anchor paragraph (line 189): compare the need records
with the project's `achieves` from E3; a mismatch is owner meaning and returns
`decision-needed` (A3).

E6. Step 3 (line 197), replace the last two sentences (K9, K12, K14, R1, A2):

> Cut the project into deliverables and write them, one module each, as the
> guide shows, listed in the project's delivery file in the sequence they are
> to be built. A `core` deliverable is a scope over existing design records
> that can be built, checked and accepted on its own: list its needs and rules
> as you write them, give it its anchor on the page, and name the deliverables
> it cannot start or prove without. A `later` deliverable is an id and a
> title. A deliverable selects records and adds none; it is never a design. A
> `core` rule is a rule that a `core` deliverable scopes. Realizations, checks
> and steps are added by the phases that own them.

Step 3's completion gains: "every rule the project needs now sits in at least
one `core` deliverable's scope, so the design check can report its missing
links."

E7. Completion Blockers (after line 322), two items:

- a shared initiative decision or assumption is copied into the project
  instead of named by its qualified id;
- a rule the project needs now sits in no `core` deliverable's scope.

E8. Terminal Contract (line 92): "the `core` and `later` slices" becomes "the
deliverables with their scope and dependencies", and the handoff (line 110)
carries the deliverable ids.

E9. `references/requirements-and-traceability.md:70` (R11): "and a rule with
no planned check once checks exist" becomes "and, for a rule a `core`
deliverable scopes, no planned check; that gap stays until Verification Design
adds the check".

E35. Cutover of "slice" in run 1's files [B5]: line 67 "`core` and `later`
slices" becomes "`core` and `later` deliverables"; the step 3 heading (line
193) becomes "Define outcomes, non-goals, and deliverables" and its completion
(line 199) says "every deliverable" for "every slice"; line 197's first
sentence, "split those semantic slices before polishing requirements",
becomes "split them into deliverables before polishing requirements"; line
285 "`core` and `later` slices" becomes "deliverables"; line 314 "a `core`
slice has no records" becomes "a `core` deliverable scopes no records";
`references/requirements-and-traceability.md:5` "`core` slices" becomes
"`core` deliverables"; `references/artifact-and-self-review.md:5` "`core` and
`later` slices" becomes "`core` and `later` deliverables". After E35 no
"slice" remains in this skill.

E36. Terminal labels, `deferred` (line 101) [B11]: "an authorized caller
explicitly postpones scoped work" becomes "an authorized caller explicitly
postpones scoped work, or the owner's project numbers hold this project to its
needs (step 1)".

## Run 2: `design-program`

E10. Step 1 (line 89), artifact home: the same sentence as E1 for a new
file-backed Program Design, with "`<repository-root>`" (R12). **[Q6]**

E11. Step 1, after the `design-documents.md` load (line 91): the same guide
load as E2 (K11).

E12. Step 14 (line 215), after the realization records [A4]: "Add each
realization id to the scope of the `core` deliverables that build it (K9).
A realization that addresses another project's rule names that rule by
qualified id (A4). A structural decision that several projects share is an
initiative decision, written once there."

E13. Planning Boundary (line 329), second sentence becomes: "Planning writes
each deliverable's steps in its record, the plan that explains them, the write
surfaces and proof each step must produce, the order of steps inside the
deliverable, exact commands, checkpoints, deployment and rollback;
dependencies between deliverables live in the deliverable records." **[Q9]**

E37. Cutover of "slice" in run 2 [B5]: lines 91 and 335 "a `core` slice"
becomes "a `core` deliverable"; lines 93 and 113 "the `core` and `later`
slices" and "for `core` slices" become "the deliverables" and "for `core`
rules".

## Run 3: `design-verification`

E14. Line 14, "The plan gives each slice the checks in its deliverable"
becomes "The plan assigns each of its deliverable's checks to the step that
earns it."

E15. Step 1, after the `design-documents.md` load (line 38): the same guide
load as E2 (K11).

E16. Step 5 (line 83), after the first sentence [A4]: "Add each check's id to
the scope of the `core` deliverables that build it (K9); the design check
rejects a scoped check that covers no scoped rule. A check that decides
another project's rule names it by qualified id (A4)."

E17. Step 5, new paragraph [A12]:

> Write the project's "what the owner checks" line, the top line of this
> Verification Design: one sentence, in the owner's words where they exist,
> naming what the owner will see, drawn from the planned checks and adding
> none. IF the project belongs to an initiative, it is the project's
> acceptance in the initiative's file; otherwise it is the first sentence of
> the page's proof part. Until the owner gives or accepts it, list it in the
> return as an owner ask.

E18. Return (line 117), `locally-ready` gains "each `core` deliverable's
checks" and "the project's acceptance line and whether the owner has accepted
it".

## Run 4: `design-review`

E19. Operations (line 33), targets: "one project's typed records, its page,
its deliverables, and the Demistify check's report (`initiative check` on the
initiative root for a project in an initiative)".

E20. Step 2 inputs (after line 62): "the project's number and the shared
initiative records it relies on, for a project in an initiative". New
sentence after line 82: "A project held to its needs by its number is no
review target in any mode; return blocked input naming its depth."

E21. Step 5, before line 116's command: "IF the guide at the page's binding is
not loaded this session, load its `references/typed-design.md` at the binding
`presentation-html`'s `references/demistify.md` selects (K11), and return the
CLI address from that binding's entry guide `authoring/SKILL.md` and, in an
initiative, the initiative root." After
line 118 (K9, R1, R6):

> From the same report, take an order warning (a deliverable depending on one
> in a higher-numbered project) as a candidate finding routed to the caller,
> for the number, or to `design-specification`, for the cut; read "Waiting on
> owner" as open owner questions the review must not treat as settled; and
> take each long-statement note as a nudge on that record's wording. A rule
> that no `core` deliverable scopes escapes the report's coverage gaps; take
> it as a candidate finding routed to `design-specification`.

E22. Step 9 completion (line 200): "what a downstream program designer or
planner would still have to invent" gains "for each `core` deliverable".

E23. `references/reviewing-four-document-design.md`, Readiness (line 92):
before the pretend-planner block, "Run the guide's `brief` for each `core`
deliverable and read it as the planner's whole input." The block's "may
decide" gains "each deliverable's steps and the order of steps inside it";
"must consume" gains "each deliverable's scope and dependencies".

E38. Cutover of "slice" in run 4 [B5]: `SKILL.md:80`,
`references/reviewing-four-document-design.md:9` and
`references/reviewing-specification.md:29`: "A `core` slice with no need or
rule records" becomes "A `core` deliverable whose scope holds no need or rule
records".

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
"project design". The trial adds `design-verification` as a near miss
("planning how … will be proven") [B8]; if it misroutes, the boundary names
`design-verification` instead of the glob. No `Always`: skipping the skill
makes a worse plan, not a broken one every time.

E24. `SKILL.md`, shape: ordered steps (order changes what the next step finds),
one reference, the base-dependency and trace lines every v2 phase opens with.

```text
Lens (first paragraph):
  A deliverable is one node of the delivery graph: a scope over its project's
  reviewed records, with its steps and the deliverables it waits on held in its
  record. A plan is the detail inside that node: it explains, step by step, how
  the deliverable goes from its brief to a build its checks can pass. The record
  names each step once; the plan explains it under the same id and keeps no list
  of its own. The plan adds no rule, realization or check; what it needs and the
  records lack goes back to the phase that owns it. The Lead writes the plan;
  helpers return evidence.

1. Admit the deliverable
   MUST load sunstack-dev/shared-references/design-documents.md and return the
   deliverable's scope fields and the plan home it points to.
   MUST load the guide's typed-design.md (and typed-design-initiative.md in an
   initiative) at the binding presentation-html's references/demistify.md
   selects, and return the deliverable module's fields, and the CLI address
   from that binding's entry guide authoring/SKILL.md (K11).
   Input: one deliverable id (qualified in an initiative), its project's current
   `ready` four-document review with parent-verified corrections, and the
   requested terminal (plan-only | pr-ready-unmerged; ask once when ambiguous).
   Run `brief` for the deliverable and, in an initiative, `initiative status`;
   return both. The brief is the plan's input; the status says what the
   deliverable waits on and where it stands in the order.
   IF the deliverable is `later`, return revision-requested to design-specification.
   IF the brief shows a governing open owner question, return blocked with the
   owner as the one to unblock it.
   IF the brief shows a scoped rule with no need, return specification-gap; with
   no planned check, verification-design-gap.
   Completion: the brief and status are in hand, or one exact non-ready result.

2. Re-anchor on the code
   Read the project page sections the scoped records sit in, then current
   branch/HEAD, owners, interfaces, tests and commands the scope touches,
   before claiming how any of it works (cite principle-read-ground-truth-first).
   IF one bounded repository or proof question is worth a helper, load
   practices-manage-agents and return an evidence-only commission; open its anchors.
   Completion: each scoped realization has its current owner and path, or a gap
   (a missing seam returns program-design-gap).

3. Cut the steps and attach proof
   Start from the steps the record already lists. MUST load
   references/steps-and-proof.md and return the step graph: each step's id, reads,
   write surfaces, the planned checks it earns with the command or journey and
   when it runs, the proof it must produce (wrong behavior, layer, oracle)
   [Q9], dispositions of overlapping tests, the order of steps inside the
   deliverable, integration gates, stop conditions.
   Inline rules: every check the deliverable scopes is earned by exactly one
   step; checks of the deliverables it waits on are named as prerequisites,
   earned there; every step serves a scoped record; a check no step can earn as
   written returns verification-design-gap (S7).
   Completion: every scoped check sits in one step, every step names what it serves.

4. Check the deliverable's place in the graph
   Read the deliverable's dependencies from its record and the status. Correct
   one only in the record: add it when this deliverable cannot start or prove
   without another (any project), remove it when it blocks nothing.
   Bright line: never write a dependency on a deliverable in a higher-numbered
   project. A real one returns blocked, naming it, for the owner to settle the
   cut or the number; never ready (S3, S4).
   Rationalization blocked: "it's only a temporary edge until the owner reorders."
   Completion: each dependency in the record names what it blocks (start or
   proof), or the record holds none, or the result is blocked on an upward one.

5. Write the record and the plan in one edit
   MUST load sunstack-dev/shared-references/canonical-implementation-plan.md and
   return its canonical record and plan home (K13); its "slices" are this
   skill's steps.
   In the same edit: the deliverable record's step list, changed only where step
   3 changed it, and the plan page in the project's plans/ folder through
   presentation-html, passing the reader's question ("what gets built, in which
   steps, and how is each proven?") and the deliverable and record ids. The page
   explains each step under its id (write surfaces, the proof it must produce,
   pull request boundary, checks it earns) [Q9], names the deliverables it waits
   on from the record, shows progress from the records, links to the project
   page and the deliverable's anchor, and restates no record.
   Bright line: the page lists no step and no dependency the record does not
   hold, and explains every step it does, under the same id.
   Rationalization blocked: "the checklist item is too small to be a step."
   Re-plan: a superseding plan page beside the old, with "Changed from", and the
   changed step list in the same edit. Remove each completed step the new list
   drops from the deliverable's completed steps, and name it, with its evidence,
   in "Changed from".
   A split into several pull requests is the owner's decision, as the canonical
   reference says.
   Run the initiative check on the initiative root (or the design check on a
   standalone project) read-only, then with --write.
   Completion: the deliverable's steps in the check equal the ids the plan
   page explains; the check's reason no longer asks to define the scoped
   implementation tasks, and [Demistify 1.34.1+] `initiative status` no longer
   lists the deliverable under "Needs a plan"; the brief lists no coverage gap;
   the page's static check passes.

Return: ready | revision-requested | blocked | the gap tokens in step 1 and 2,
with the canonical record for ready.
Route: ready -> the caller commissions the build; a gap token -> its phase,
then plan-defect back here; blocked -> the owner or named unblock owner.

Completion blockers:
  - a step on the plan page that the record does not list, or a listed step the
    page does not explain under its id;
  - a hand-written list of dependencies or steps on the plan page;
  - a scoped check no step earns, or a step that serves no scoped record;
  - a step that adds observable meaning, structure or a check, or re-chooses
    a check's observation;
  - a dependency on a deliverable in a higher-numbered project, or on a project,
    or a ready result while an upward prerequisite was withheld;
  - a completed step dropped without its "Changed from" entry and evidence;
  - the plan page restates a record or carries progress text by hand;
  - no current `ready` review, or no brief read.
```

E25. `references/steps-and-proof.md`, ported from v1
`plan-implementation/references/slice-and-proof-design.md` (K7). Kept: the
change kinds (vertical, contract, prefactoring, integration,
migration/cutover, proof-only), real-dependency edges between steps inside
the deliverable, integration gates, "match proof to each change",
focused-proof oracle, keep/repair/remove dispositions, false-green split
conditions. Changed: "slice" becomes "step" throughout, and the reference
says once that the canonical reference's "slices" are these steps [B5]; a
step's name is the id the deliverable record lists; the obligation ledger is
built from the brief's scoped records; "Verification Design row" becomes
"planned check (`V` id)"; a step's reads are the record ids and page sections
it realizes; each step names the proof it must produce, and the Implementer
chooses the tests that produce it **[Q9]**; edges between deliverables are read
from the record, never drawn here (K10). Dropped: the pointer to v1's
`implementer-verifier-pairing.md` (v2's role skills own the pairing target).
Caller contract: step 3 loads it with the brief, the record's current steps
and the re-anchor result; it returns the step graph listed in step 3 and stops
when every scoped check sits in one step and every split condition hit is a
returned gap.

E26. Plugin surfaces (run 5):

- `plan-implementation/agents/openai.yaml`: display name "Plan:
  Implementation", short description "Plan one deliverable's steps and proof",
  default prompt naming a reviewed deliverable; implicit invocation allowed.
- `sunstack-workflow-v2/README.md` skill table: a row for
  `plan-implementation` (v1 source `plan-implementation`). The Demistify floor
  is already 1.34.0 (PR 239, d093a481).
- Version 0.7.1 to 0.8.0 in the three plugin manifests and three marketplace
  files; one dated changelog entry.

## Run 6: `role-lead`

E27. The work (line 16), new paragraph after the first:

> In an initiative, the owner orders projects by number and you deliver by
> deliverable: each project is one design, each deliverable selects records of
> it and gets one plan, one build and its recorded proof. Propose a renumbering
> or moving a deliverable between projects to the owner; never make either.

E28. Methods (after line 27), three branches, after the guide load (B3):

- IF the work belongs to an initiative or a typed project and the guide at the
  page's binding is not loaded this session, load its
  `references/typed-design.md` at the binding `presentation-html`'s
  `references/demistify.md` selects (K11), and in an initiative also its
  `references/typed-design-initiative.md`; return the CLI address from that
  binding's entry guide `authoring/SKILL.md` and, in an initiative, the
  initiative root [B-N2].
- IF the work belongs to an initiative, run `initiative status` and return what
  is ready now, what blocks the most open work and what is built but not
  accepted. Take ready work in the status's order, and start no deliverable's
  build in a higher-numbered project while a lower-numbered project has open
  `core` work, unless a dependency or the owner says otherwise (S10);
  designing a later project at the depth its number gives it is not held by
  this [A-N2]. A `core` deliverable with no steps needs `plan-implementation`
  before any build; [Demistify 1.34.1+] the status lists it under "Needs a
  plan". Cite the status when you report to the owner.
- IF a project needs its design, use `design-specification` and the phases
  after it, at the depth its number gives it **[Q1]**, and return each phase's
  result.
- IF a deliverable's project review is `ready`, or a plan must change, use
  `plan-implementation` and return its plan path or its non-ready result.

E29. Methods, before the commissioning branches (M-d), a bright line:

> Before any build commission (an Implementer or Verifier, or a build fix)
> inside an initiative or typed project, name the deliverable the work belongs
> to. IF no deliverable covers it, add the row first **[Q8]**: a `core`
> deliverable scoping the existing rules the work touches, or the missing rule
> through `design-specification` first; then its plan, and a design review of
> the cut when it adds rules, before the commission [A-N1]. Design, review and
> evidence commissions name the project instead [A-N3].
> Rationalization blocked: "it's a small fix, the row can come later."

E30. Methods, the Implementer branch (line 29) [B15]: the commission's files
are the deliverable's plan page and its brief, generated with `brief` at
commission time and saved under the repository's `tmp/` or the trace, never in
the project folder; the commission names the deliverable id so the
Implementer can regenerate the brief after a re-plan. Name the deliverable's
builder by the alias from the initiative's identity file.

E31. The work, after the owner-question sentence (line 16), M-a's in-scope
part:

> In a tree with typed records, an owner decision is an open choice record
> placed in its section item, as `design-documents.md` says; the brief points
> at it. Never write a hand-written choice there.

E32. Boundary (line 44), add [B12]: "You record each deliverable's completed
steps, check outcomes and acceptance from handbacks you have inspected, each
where the guide places it; helpers return them (K5)."

E33. `references/working-with-implementer.md`, Handback: after reading the
diff, record the completed steps and the build candidate in the deliverable
record, and record each helper decision you adopt as a design record naming
the helper, as `design-documents.md` says (R15, the open PR 238 follow-up).

E34. `references/accepting-work.md`, line 15 [B12]: "A concise paragraph/table
in the existing Lead acceptance record" becomes "Write the acceptance artifact
as a file and record the acceptance where the guide places it, keyed to the
deliverable and naming the build it accepts, after recording the Verifier's
outcomes on that build." The closing "Complete when" is unchanged.

E39. Methods, new branch [A1]:

> IF the owner starts an initiative or adds a project to one, create or edit
> the initiative's file: each project with the owner's number and the owner's
> words for what it achieves, registered after `design init` creates its
> folder; keep the shared decision, assumption and agent-identity files as
> the guide shows; place the initiative overview on the initiative's index
> page through `presentation-html`; then run `initiative check --write`.
> Return the projects with their numbers and their source in the owner's
> words, or the number or words still missing as an owner ask.

E40. The work, line 16 **[Q9]**: "the Implementer chooses execution steps and
native helper decomposition" becomes "the Implementer chooses the detailed
changes, tests and native helper decomposition inside each step the plan
names".

## Dependencies outside scope

| Owner | What this set depends on, or what was found there | Effect if unchanged |
| --- | --- | --- |
| `sunstack-dev/shared-references/design-documents.md` | meaning of initiative, project, deliverable (163-167, one levels sentence at 2168d5b9); fact home (29); `:20` is the single home for the guide load (R2); `:171` hand-lists ids instead of the brief (R5) | K11's v2 loads carry R2 meanwhile; R5 stays for non-Lead handoffs |
| `sunstack-dev/shared-references/design-documents.md:32`, a named dependency lifted from the non-goals [A6] | "only `core` work gets need, rule, realization and check records" conflicts with depth by number; the one-line change: "only `core` work gets rule, realization and check records; a project held by its number may hold need records" | gates run 1 (Coordination); E4 cannot land without it |
| `sunstack-dev/shared-references/canonical-implementation-plan.md` | the plan record and home (K13); `:67` fixed in PR 239; `:61` "project" for repository root (R12) | none after PR 239 for `:67`; R12 stays |
| `presentation-html` | component choice (K4); `references/options-and-decisions.md:15` adds a native choice for any owner answer, not scoped to untyped pages (M-a); no route or chooser row for an initiative overview page (R8) | a page author can still hand-write a choice in a typed tree; E31 covers only the Lead's own decisions |
| `presentation-show-worklog` | routes owner decisions to a hand-written choice (M-a, `SKILL.md:21,42`) | as above |
| `diagram-rendering-and-fallbacks.md:62,76` | "run the design check on the project" in an initiative (R10) | a member-project check skips order warnings and alias validation |
| `practices-delegation/SKILL.md:22-23` | the job-size ladder calls the deliverable level "Milestone" (R13) | a vocabulary mismatch beside the typed levels |
| v1 `shared-references/design-documents.md:132` and the hosts | "The Markdown carries the complete design" loads beside sunstack-dev's rule when v1 is installed (M-b) | two rules load until v1 is disabled where v2 runs, an owner and host call |
| Cross-plugin principle citations | v2 cites `sunstack-dev` principles through the base dependency, against "a cited principle ships in the same plugin" [B18] | a convention for the plugin owner; this set follows existing practice |
| owner's global instructions | design-mode write list (Q6 a); "the Lead writes it under `docs/specs/<spec>/plans/`" | Q6 (a) needs `docs/initiatives/`; the plan-home sentence goes stale (plans live in the project's `plans/`) |
| Demistify | 1.34.0, publishing and not yet hosted (initiative commands, `typed-design-initiative.md`, `ex-initiative-overview`) [B1, B-N3]; Demistify 1.34.1+ (PR 229: "ready now" by number, "Needs a plan") (A9) [A3, B2]; qualified ids in record links (A4); placement-aware link rule (K15) | the taught initiative commands fail until 1.34.0 is hosted; the [Demistify 1.34.1+] text in E24 step 5 and E28 reads a list that 1.34.0 does not print |

## Coordination

- Base: `skills/initiative-vocabulary`, PR 239, open, now at 11f4826a (plan
  contract: dependencies from their records at 2168d5b9, a one-deliverable
  plan admits only its own checks at 11f4826a; levels sentence; README floor
  1.34.0 at d093a481). This set
  was branched from 53f2de4a and sits on
  `skills/initiative-design-and-plan-design`; it holds only this folder, so it
  needs no rebase before review. The independent review blocked PR 239's ship
  on its findings 4, 7 and 9; 2168d5b9 answers 4 and the base-reference half
  of 7.
- Run gate. Every run starts when all of these hold: the owner has answered
  Q1, Q6, Q8 and Q9; PR 239 is merged (or the runs branch from it); Demistify
  1.34.0, publishing now, is hosted at the binding the skills use [B1]. Run 1
  also waits for the `design-documents.md:32` change in sunstack-dev [A6].
  Runs 5 and 6 carry the [Demistify 1.34.1+] text: they ship once 1.34.1+ is
  hosted, or ship earlier with that text marked and the gap listed in their
  changelog entry [A-N5].
- The eval runs against the hosted binding at 1.34.1 or later, or a named
  source-preview build if run earlier.
- Pending edits on the same files: PR 239 (vocabulary) touches all five
  updated skills; no other open edits found.
- Version and changelog land once, with run 5 (E26).

## Run status

| Run | State |
| --- | --- |
| 1 to 6 | accepted-to-implement (25 Nov); in progress |

## Review record

| Revision | Review | Result |
| --- | --- | --- |
| 1 (ee1f62d2) | design review A (requirements, specification, generalization) | targeted-revision, revise-first; 13 candidates |
| 1 (ee1f62d2) | design review B (trigger, calls, rule agreement, security, proof) | targeted-revision, revise-first; 18 candidates |
| 3 (08823999) | design review A, round 2 | targeted-revision, converging; 6 open (A6, A-N1 to A-N5) |
| 3 (08823999) | design review B, round 2 | targeted-revision, converging; 4 open (B5, B-N1 to B-N3), B-N4 an observation |
| 4 | round-2 corrections below; reviewer B: the remaining items can be checked at their anchors | proposed |
| 4 (a246c80a) | review lead (Demistify Lead) closure, 25 Nov | accepted-to-implement |

Review lead closure at revision 4 (25 Nov 2026, after the owner answered Q9,
Q8, Q1 and Q6 with the recommended options). Both round-2 reviews returned
targeted-revision, converging, and named their remaining items as corrections
inside the accepted boundary, to verify at their anchors (A: first required
revision S9/S10 scoping; B: "the minor findings can be verified at their
anchors without another full round"). Each was opened at its anchor in this
revision and holds:

- **A-N1:** Q8(a)'s costs, obligation 25 and E29 require the new deliverable's plan, and a design review of the cut when it adds rules, before a build commission.
- **A-N2:** S10, obligation 19 and E28 are scoped to builds ("no deliverable in a higher-numbered project starts its build…"; designing a later project at its depth is not held).
- **A-N3:** S9, obligation 25 and E29 are scoped to build commissions; design, review and evidence commissions name the project.
- **A6:** named in Coordination and the dependencies table. The `design-documents.md:32` line landed on the implementation branch at fdb88a4a.
- **A-N4:** Q1(b)'s costs state it is observable only from Demistify 1.34.1+.
- **A-N5:** one run gate in Coordination, and one marker wording in each part's header.
- **B5:** E35 covers `artifact-and-self-review.md:5` and ends "no slice remains".
- **B-N1:** `canonical-implementation-plan.md:67` on main (9059988b) reads "admits that deliverable's checks only, names the checks of the deliverables it waits on as prerequisites earned there", which agrees with E24 step 3.
- **B-N2:** K11 and E28 take the CLI address from the binding's entry guide.
- **B-N3:** K6 teaches no re-cut and names no migrate command.
- **B-N4:** obligation 19 and E28 carry the [Demistify 1.34.1+] marker; 1.38.1 is hosted.

Observation, no change: K6's reason cites `packages/demistify/scripts/initiative-migration/`, which was deleted from main on 25 Nov (sunstack-tools PR 243) and is now reached at release commit da3363b6. The decision, no re-cut taught, is unchanged.

Run gate met: the owner answered (a246c80a), PR 239 is merged (9059988b), Demistify 1.38.1 is hosted, and the `design-documents.md:32` change is at fdb88a4a. Implementation decision: accepted-to-implement.

Mapping of each finding at revision 3 (closed: taken in as proposed or already
closed by revision 2 or PR 239; changed: corrected differently from the
smallest fix, with the reason; owner question: needs the owner):

| Finding | State | Where |
| --- | --- | --- |
| A1 nobody owns the initiative file | closed | obligation 1, E39 |
| A2 within-project sequence | changed: list order as the sequence, recorded as default K14 and assumption A8, not a dependency chain | obligation 8, E6 |
| A3 number does not reach next work | closed | S10, obligation 19, E28; library order from the Demistify Lead (A9) |
| A4 S1 vs cross-project records | closed | S1, obligation 9, E12, E16 |
| A5 canonical contract contradicts obligations | closed by PR 239 (2168d5b9) and step 3's prerequisite checks | K13, obligation 14, E24 step 3 |
| A6 depth writes needs `design-documents.md:32` reserves | closed: named as an outside dependency that must land before E4, and in Q1's text | dependencies table, Q1 |
| A7 "reconcile" names no outcome | closed | obligation 15, E24 step 5 |
| A8 upward dependency still returns ready | closed | obligation 18, E24 step 4 |
| A9 S4 names only the number | closed | S4, E27 |
| A10 S2 "same name" | closed | S2, E24 |
| A11 S3 basis | closed | S3 |
| A12 obligation 18 vs E13 condition | closed | obligation 24, E17 |
| A13 Q2 to Q5 not owner choices; Q6(b) discoverable | closed: Q2 to Q4 in rev. 2, Q5 as K15, Q6(b) settled from code | Closed table, Q6 |
| B1 initiative support unreleased | closed | requirements evidence, Coordination, dependencies, eval binding |
| B2 `planned` and "ready now" | changed: written against the library change the Demistify Lead is making (A9), marked [Demistify 1.34.1+] since revision 4 | E24 step 5, E28 |
| B3 CLI reached by no load | closed | K11, E2, E21, E24 step 1, E28 |
| B4 plan files and tests vs Implementer | owner question | Q9, E13, E24, E25, E40 |
| B5 "slice" cutover | closed | E35, E37, E38, E25, terms in the specification |
| B6 dependency edges two homes | closed by PR 239 (2168d5b9) and K10 | K13 |
| B7 routes treat behavior as text | closed | `skill-verification.md` routes and eval |
| B8 near miss | closed | `skill-verification.md` trigger trial |
| B9 reconcile action | closed | E24 step 5 |
| B10 open owner question route | closed | obligation 16, E24 step 1 |
| B11 deferral authority | closed | E4, E36 |
| B12 acceptance home | closed | E32, E34, obligation 23, S6 |
| B13 security inventory | closed | sensitive surfaces block |
| B14 Q6(b) unknown settled | closed | Q6, requirements evidence |
| B15 saved brief | closed | E30, obligation 22 |
| B16 product-workflow keep cites adoption | closed | `skill-verification.md` |
| B17 steering claims named failures | closed | root topics, steering row |
| B18 cross-plugin citation | closed as an observation for the plugin owner | dependencies table |

Round 2 on revision 3, at revision 4:

| Item | State | Where |
| --- | --- | --- |
| A-N2 S10 forbids design work Q1(b) allows | closed: scoped to builds | S10, obligation 19, E28 |
| A-N3 S9 requires a deliverable before design-stage commissions | closed: scoped to build commissions; design, review and evidence commissions name the project | S9, obligation 25, E29 |
| A-N1 a new `core` deliverable's plan and review | closed | Q8(a) costs, obligation 25, E29 |
| A6 `design-documents.md:32` | closed: a named sunstack-dev dependency in the run gate, lifted from the non-goals | Coordination, dependencies table, requirements non-goals |
| A-N4 Q1(b)'s gate not observable on 1.34.0 | closed | Q1(b) costs |
| A-N5 two run gates | closed: one gate, one marker wording | Coordination, requirements "What stays open", marker in the header of each part |
| B5 two "slice" homes left | closed | E35 (line 197's first sentence, `artifact-and-self-review.md:5`) |
| B-N1 prerequisite checks vs canonical `:67` | closed by PR 239 at 11f4826a | Q7 row, K13, Coordination |
| B-N2 CLI address lives in the entry guide | closed | K11, E2, E21, E24 step 1, E28 (initiative root scoped to an initiative) |
| B-N3 guide baseline; migrate gone from the release | closed | K6, sensitive surfaces, component allocation baseline, A4 citation dropped, "publishing" |
| B-N4 no-steps comes as a list, not a state | closed | A9, the [Demistify 1.34.1+] marker, E24 step 5, E28, requirements evidence |
