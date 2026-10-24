# Divide the Work and Attach Proof

Use this reference to turn the obligations admitted at the planning start check into a proportional sequence of slices, each with proof that can observe its obligation. Return the slice graph, each slice's reads, the obligation/proof map with the slice and command that earn each Verification Design row and each focused proof's oracle source, the project proof-layer source or `project silent`, the property-versus-example choice where one rule covers the cases, a keep/repair/remove disposition for each overlapping existing test, necessary dependency edges, integration gates, false-green risks, and any split or replan stop.

## Start From Obligations

Build a compact ledger before ordering work:

```text
obligation identity | governing artifact | current owner/path | change needed |
Verification Design row or observable proof | risk or unknown
```

Every normative requirement, specified behavior, program-design boundary, migration/cutover obligation, and required proof seam appears exactly once. A row that cannot name its owner, change, or observation is a design gap. Return it to its design owner with the missing field. An `R` obligation takes its observation from its requirement's Verification Design row, and an `R` that no row decides or names as unverified is a `verification-design-gap`. A structural or cutover obligation, and every obligation of a mechanics-only improvement, gets the observable proof the plan chooses.

## Choose Small Changes That Can Be Proven

A slice is the smallest coherent change that can earn evidence without leaving the repository in an invalid intermediate state.

- `vertical`: crosses the real entrypoint-to-effect path and proves behavior at the narrowest useful layer. Prefer this default.
- `contract`: establishes a type, interface, schema, protocol, or fixture before behavior. It must name the first downstream slice that consumes it.
- `prefactoring`: creates a seam required for a later behavior slice without changing behavior. It must name its consumer and characterization proof.
- `integration`: joins independently changed owners or boundaries and proves their wiring.
- `migration/cutover`: changes stored state, external contracts, or ownership. It names compatibility, rollback or recovery, and observation.
- `proof-only`: adds a missing observation for already-required behavior. It cannot substitute for the behavior change.

Use a compact plan for one low-risk owner and one or two proof gates. Use a full plan when the change crosses owners, trust boundaries, state, concurrency, compatibility, migrations, or multiple proof layers. A compact plan drops fields, and every obligation keeps its proof.

## Order Only Real Dependencies

Record an edge only when it changes safe execution:

```text
requires A -> B   B cannot start or prove correctly before A completes
serial A <-> B    overlapping writes, state, fixtures, or generated artifacts collide
parallel A || B   advisory only; both are independent after named prerequisites
```

Do not add `parallel` merely to advertise concurrency. The executor may serialize any advisory edge.

Place an integration gate at the earliest slice where separately changed components first interact. Do not postpone all wiring proof to final validation.

## Match Proof to Each Change

The Verification Design already chose how each requirement is shown to hold. Each row gives its "proven by" line, target, journey or reused test, and passing condition. Put each row in the slice where its passing condition can first be met. Then schedule when it runs and with which command. Do not re-choose its observation, boundary, target, or passing condition. A row's `needed:` journey gets a build step before the slice that observes through it. A slice that can't earn its row as written goes back with `verification-design-gap`, the row and the evidence. That happens when no command reaches the target, or when the slice's change would let a wrong build pass the condition.

Place a batch boundary only where the plan schedules a required independent observation before dependent work starts: put it after the slice that observation covers, and start the dependent slice after the observation reports. There the Implementer declares the paired Verifier's target under the target rule in `implementer-verifier-pairing.md`, which its role loads. Local proof and integration gates the executor runs keep their timing and declare no Verifier target. With no required independent observation inside an assignment, the whole assignment is one batch. One PR can hold several batches.

For each slice, name:

```text
obligation covered
reads
write surfaces
Verification Design rows it earns, with the command or journey and when it runs
pre-change signal or approved exception
focused automated proof
integration or runtime proof when the boundary requires it
manual observation when the user-visible or operational surface requires it
quality commands
stop/replan condition
```

A slice's reads are the anchors it realizes or earns: the headings, rows and diagram nodes of the governing documents, each with its path. That one list is the Implementer's required reads for the slice and the slice's walkthrough on the owner's page, so neither keeps a list of its own.

A slice's focused tests are the plan's own and never stand in for its rows. With no Verification Design, as in a mechanics-only improvement, the focused proof below is the slice's proof. When you choose a slice's proof, name in its pre-change signal the wrong behavior that proof must fail on, put the proof at the cheapest layer where that behavior stays real, and take its expected value from the obligation, recording that source as the slice's oracle ([write tests that can fail](../../principle-write-tests-that-can-fail/SKILL.md)). Add broader proof only for wiring or regression reach the focused proof cannot cover. A full-suite run cannot prove a behavior no planned check observes.

When the repository defines proof-layer names, those names win; record the source. When it is silent, write `project silent` and use the ordinary unit, integration, smoke, and end-to-end names. When one rule covers the cases, plan a property or a table of that rule. A single example is enough only when the claim is that one case.

When existing tests overlap the slice, return `keep`, `repair`, or `remove` for each. A `remove` row carries one of three proofs: a replacement that fails on the same wrong behavior, redundancy shown by a kept test that already fails on it, or a dead contract shown by the governing change that retires it. A new test that looks similar proves none of the three. A snapshot or fixture with no live contract is a dead-contract candidate and still needs that proof before removal.

## Catch Proof That Can Pass for the Wrong Reason

Split or replan when:

- the proposed test observes a helper instead of the required effect;
- a generated file passes while its generator or shipped artifact is stale;
- a mocked boundary stands in for the integration being changed;
- the proof command skips the affected package, platform, or scenario;
- a migration is tested only on an empty state;
- a manual check is described but no runnable surface exists;
- a slice changes several owners and cannot isolate its failure;
- completing the slice would require an unmade product or structural decision.

Return the exact gap and its owner. Add no speculative task to cover it.

Complete when every ledger obligation sits in exactly one slice, every slice lists its reads, every Verification Design row is scheduled in the slice that earns it, every slice's focused proof names its wrong behavior, layer, and oracle source, every existing test that covers a slice's write surfaces has a disposition and every `remove` its proof, and each split or replan condition you hit is returned as a gap with its owner.
