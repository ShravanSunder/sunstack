# Cut the Steps and Attach Proof

This reference turns one deliverable's scope into steps, each with the proof it must produce. Inputs from step 3: the deliverable's brief, the steps its record lists now, and the re-anchor result. Return the step graph: each step's id, reads and write surfaces; the planned checks it earns, with the command or journey and when it runs; the proof it must produce (wrong behavior, layer and oracle source), the project proof-layer source or `project silent`, and the property-versus-example choice where one rule covers the cases; a keep/repair/remove disposition for each overlapping existing test; the necessary edges between steps; integration gates; false-green risks; and any split or replan stop.

The canonical plan reference calls these steps "slices"; they are the same thing. A step's name is the id the deliverable record lists.

## Start From the Scoped Records

Build a compact ledger from the brief before ordering work:

```text
record id | kind (rule, realization, planned check) | current owner/path |
change needed | planned check (V id) or observable proof | risk or unknown
```

Every rule, realization and planned check in the deliverable's scope appears exactly once, with each migration or cutover its realizations name. The brief's prerequisites are not rows: step 3 names their checks as earned in the deliverables that hold them. A row that cannot name its owner, change, or observation is a design gap. Return it to its design owner with the missing field. A rule takes its observation from the planned check that decides it. A structural or cutover row gets the observable proof the plan chooses.

## Choose Small Changes That Can Be Proven

A step is the smallest coherent change that can earn evidence without leaving the repository in an invalid intermediate state.

- `vertical`: crosses the real entrypoint-to-effect path and proves behavior at the narrowest useful layer. Prefer this default.
- `contract`: establishes a type, interface, schema, protocol, or fixture before behavior. It must name the first downstream step that consumes it.
- `prefactoring`: creates a seam required for a later behavior step without changing behavior. It must name its consumer and characterization proof.
- `integration`: joins independently changed owners or boundaries and proves their wiring.
- `migration/cutover`: changes stored state, external contracts, or ownership. It names compatibility, rollback or recovery, and observation.
- `proof-only`: adds a missing observation for already-required behavior. It cannot substitute for the behavior change.

Use a compact plan for one low-risk owner and one or two proof gates. Use a full plan when the change crosses owners, trust boundaries, state, concurrency, compatibility, migrations, or multiple proof layers. A compact plan drops fields, and every row keeps its proof.

## Order Only Real Dependencies

Record an edge between steps only when it changes safe execution:

```text
requires A -> B   B cannot start or prove correctly before A completes
serial A <-> B    overlapping writes, state, fixtures, or generated artifacts collide
parallel A || B   advisory only; both are independent after named prerequisites
```

Do not add `parallel` merely to advertise concurrency. The executor may serialize any advisory edge. Edges between deliverables are read from the deliverable record, never drawn here.

Place an integration gate at the earliest step where separately changed components first interact. Do not postpone all wiring proof to final validation.

## Match Proof to Each Step

The Verification Design already chose how each rule is shown to hold. Each planned check (`V` id) gives its "proven by" statement, its journey or reused test, and its passing condition in its cases. Put each check in the step where its passing condition can first be met. Then schedule when it runs and with which command. Do not re-choose its observation, boundary, target, or passing condition. A check whose journey is `needed:` gets a build step before the step that observes through it. A step that can't earn its check as written goes back with `verification-design-gap`, the check and the evidence. That happens when no command reaches the target, or when the step's change would let a wrong build pass the condition.

Place a batch boundary only where the plan schedules a required independent observation before dependent work starts: put it after the step that observation covers, and start the dependent step after the observation reports. There the Implementer declares the paired Verifier's target, as its role skill says. Local proof and integration gates the executor runs keep their timing and declare no Verifier target. With no required independent observation inside an assignment, the whole assignment is one batch. One PR can hold several batches.

For each step, name:

```text
records it serves
reads
write surfaces
planned checks it earns, with the command or journey and when it runs
pre-change signal or approved exception
the proof it must produce: wrong behavior, layer, oracle source
integration or runtime proof when the boundary requires it
manual observation when the user-visible or operational surface requires it
quality commands
pull request: the deliverable's one PR unless the owner chose a split
stop/replan condition
```

A step's reads are the record ids and page sections it realizes or earns, each with its path. That one list is the Implementer's required reads for the step and the step's explanation on the plan page, so neither keeps a list of its own.

Each step names the proof it must produce, and the Implementer chooses the tests that produce it. A step's focused proof never stands in for its planned checks. When you name a step's proof, name in its pre-change signal the wrong behavior that proof must fail on, put it at the cheapest layer where that behavior stays real, and take its expected value from the scoped record, recording that record as the step's oracle (write tests that can fail (`sunstack-dev:principle-write-tests-that-can-fail`)). Add broader proof only for wiring or regression reach the focused proof cannot cover. A full-suite run cannot prove a behavior no planned check observes.

When the repository defines proof-layer names, those names win; record the source. When it is silent, write `project silent` and use the ordinary unit, integration, smoke, and end-to-end names. When one rule covers the cases, plan a property or a table of that rule. A single example is enough only when the claim is that one case.

When existing tests overlap the step, return `keep`, `repair`, or `remove` for each. A `remove` row carries one of three proofs: a replacement that fails on the same wrong behavior, redundancy shown by a kept test that already fails on it, or a dead contract shown by the governing change that retires it. A new test that looks similar proves none of the three. A snapshot or fixture with no live contract is a dead-contract candidate and still needs that proof before removal.

The property-or-example choice and each disposition are the step's proof obligations; the Implementer writes the tests that meet them.

## Catch Proof That Can Pass for the Wrong Reason

Split or replan when:

- the proposed proof observes a helper instead of the required effect;
- a generated file passes while its generator or shipped artifact is stale;
- a mocked boundary stands in for the integration being changed;
- the proof command skips the affected package, platform, or scenario;
- a migration is tested only on an empty state;
- a manual check is described but no runnable surface exists;
- a step changes several owners and cannot isolate its failure;
- completing the step would require an unmade product or structural decision.

Return the exact gap and its owner. Add no speculative step to cover it.

Complete when every ledger row sits in exactly one step, every step lists its reads and the records it serves, every scoped planned check is earned by one step, every step's proof names its wrong behavior, layer, and oracle source, every existing test that covers a step's write surfaces has a disposition and every `remove` its proof, and each split or replan condition you hit is returned as a gap with its owner.
