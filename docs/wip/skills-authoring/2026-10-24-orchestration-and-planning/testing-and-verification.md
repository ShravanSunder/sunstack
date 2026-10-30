# Testing and verification rules

Status: **proposed**. Lead: 🦁 claude-local `68844339`. Focus 2, part D. Research: Researcher Sidekick `01a16ed1`, report `verification-tdd-2026-10-24/verification-tdd-comparison.md` in the work scratch root. It compares latest pstack (`cursor/plugins` main `9580c236`, dated 23 October; our pin `ecc249f1`), Matt Pocock's `tdd` and `implement`, Addy Osmani's, Superpowers' and HumanLayer's skills with ours at `f61b35bc`.

The rules tell agents which test proves which kind of claim, how to choose a driver's language, when to run linters, formatters, type checks and tests without any hook doing it for them, and how a verification system stays one designed thing.

**What the research changed.** The test pyramid and TDD are already taught concretely, in `principle-write-tests-that-can-fail`:

- the layer is chosen by the wrong behavior a test must catch;
- focused tests stay under 25 ms p95 and integration tests under 250 ms;
- red comes before green, and a later deliberate break is reported as sensitivity, never as the pre-change red;
- there are many focused tests, fewer integration tests and few end-to-end journeys.

`practices-verification` already says that no checks run is not green and that a missing observation is unknown. `implement-plan` already runs focused proof first, then format, lint, type check and broader tests.

So most of the retrospective's failures were not missing teaching. Two other conditions were involved:

- The sessions ran an installed skill revision (2.80.0) older than the source.
- The normal entry was never named as the thing to prove.

This part adds only what the evidence says is missing. It does not restate rules that already exist.

## Requirements

The owner's words, grouped by need.

- **Be specific about the test pyramid and TDD**
  - "i thik we need to be sicifc on pyramid tdd" (2026-10-24, answering Q3)
- **Choose the driver language on purpose**
  - "not jusign pythons cirpts eveyrwehre wehere it doesnt make sense, askign suer" (2026-10-24, answering Q3)
  - The retrospective records the owner's later repository rule as TS, Rust, or ask (`retro-2026-10-24/account.md` line 20, C:126378; confirm against the record before quoting it as the owner's).
- **Understand verification systems the way the latest pstack does**
  - "also better udntandign of verifvcaiotn sycmrs form latest pstack" (2026-10-24, answering Q3)
- **Rules for tests, verification and linters, run by the agents themselves for now**
  - "I also need rules for Sun stack dab for test, which includes all the verification changes and how to use the linters and stuff… since we don't have any triggers we have to express that the agents have triggers to do this for now" (2026-10-24)
  - "i think we cant ahve auto checks we nee3d to ahve mechnism with router and baord and statemachiens as a afte rpoject" and "and classfiiers for statemachin and coordiantion with jev or susntack tools" (2026-10-24). That mechanism is program project T1, later. This part covers what agents do until it lands.

## Evidence the design must answer

From the retrospective (`retro-2026-10-24/account.md`), each with its outcome number:

1. **The normal entry was outside the proof.** Observations drove a correctly composed debug system, while the ordinary startup got no board session. Proof must start the ordinary entry from its real producer's output.
2. **The harness grew without a composition design.** It went from 13,034 to 41,193 lines of Python across 114 driver files, with failures where separately built pieces met. A new test file was not on the CI job's explicit module list.
3. **Language by inheritance.** A small extension's convention became a 114-file subsystem with no owner-visible choice.
4. **Partial promoted to done.** A driver that labels cases partial was reported as complete coverage.
5. **Missing evidence read as success.** An ad hoc parser counted absent result fields as no failure.
6. **A debug convenience moved toward production** before the security meaning was settled.

## Situations to design for

1. A slice's obligation is a rule over many cases: a property or table test at the unit layer, not an end-to-end run.
2. A requirement is an end-to-end behavior through the normal entry: the journey starts the ordinary process from its real inputs, and the fixture-injected path doesn't count.
3. A new driver is needed. The repository's own language and existing harness come first, and a project rule wins. A new runtime goes to the owner as a tradeoff, even when it is TypeScript. For example:
   - **A Rust-only repository:** the driver is Rust. Proposing TypeScript there is a new runtime, so it goes to the owner.
   - **A Rust repository with an established TypeScript harness:** either language, inside that harness.
   - **A Python repository with an established Python harness:** Python.
   - **The Router repository:** its own rule, "TS, Rust, or ask".
4. A driver extension grows past a small addition into a subsystem: the Lead brings it to the owner as a design tradeoff.
5. An Implementer finishes a slice: it runs the repository's lint, format, type check and tests itself, in the order the repository defines, and reports the exit codes.
6. A result has missing fields: it is unknown, never a pass.
7. A coverage report has a partial row: coverage stays open.

## Design: runs

### R1 verification-design: the normal entry

In `references/choosing-the-observation.md`, a row that proves an end-to-end behavior names the ordinary entry: the process started the way a user or the release starts it, from its real producer's output, such as the enrollment a real install writes. A composition that a fixture or test helper builds counts only for the component it isolates. The worked example is the codex-router case: the debug loader composed the board session, but the ordinary startup passed none. This is retrospective outcome 1. Existing rules already require "the real entry"; the missing distinction is normal launch versus fixture-injected composition.

### R2 driver language and harness ownership

Two runs, one per owning skill, carrying the same rules:

- **R2a `practices-verification`**, in its `references/verification-drivers.md` (the driver rules an observation uses);
- **R2b `practices-verification-maintenance`**, in its `references/project-capability-generation.md` (the rules for building a project's lasting harness). It lands in the same commit as R3.

The rules:

- A driver uses the repository's language and existing harness first, and a project rule wins (the Router repo's is "TS, Rust, or ask").
- Adding a new runtime, or growing a lasting harness from an extension into its own subsystem, is a design tradeoff. The Verifier returns it to the Lead, who brings it to the owner with its toolchain and upkeep cost.
- A harness built from several pieces has one integrating owner, and its composed route is rehearsed on the real target before anyone depends on it.
- A new journey or test file is shown on the CI path that runs it, because adding a file does not add it to an explicit module list.

These address retrospective outcomes 3 and 4, and the owner's "not jusign pythons cirpts eveyrwehre wehere it doesnt make sense, askign suer".

### R3 practices-verification-maintenance: stand-in setup

From latest pstack's `create-verification-skill`:

- A new recipe lists every setup step a stand-in supplied that the real target will not, such as seeds, migrations or credentials. That list becomes the stand-in's stated limit.
- Readiness is shown from an empty data directory.
- A missing precondition stays a failure, never a weakened case.

Ours already has the readiness rule and an empty-data-directory example; the inventory is the sharper part.

### R4 domain-python: format check

The fallback Gates block gains `uv run ruff format --check <path>`; the TypeScript and Rust fallbacks already have their format checks.

### R5 delivery map: proof layers on the owner's page

Part B's delivery map shows, for each slice, the layer its proof uses (focused, integration or journey) and whether a journey drives the normal entry. That makes the pyramid visible to the owner where the plan already records it (`slice-and-proof-design.md` names each focused proof's wrong behavior, layer and oracle). This rides with part B's R2.

## Coordination

Run allocation (R1 lands in one commit with part A's R6 and part B's R4, the same skill; R2b with R3), security decisions and release are in [coordination.md](coordination.md).

## Not in this focus

- **Formal verification and statecharts** (new in latest pstack): a model checker or code verifier tied to atomic code steps, with a sync commit, counterexample replay against real code, and reader-worded state diagrams. This is a new capability with real tool costs (TLC and Java, about 305 MB on first run). It pairs naturally with T1's board state machines, so the Lead proposes it as a later project beside T1, if the owner wants it (D-D4).
- **Benchmark checks** (new in latest pstack): limiter, tuning, error counts and proof that the timed work actually happened. These are a later addition to `practices-verification` for quantitative claims.
- **Running stale skills.** Sessions using an older installed revision is a release and refresh problem (program project T3), not a teaching gap.
- **The linter.** P6 finishes the lint pilot. Its six frontmatter checks show nothing about whether an agent ran tests.

## How it will be proven

- **Static:** the contract tests, plugin validation, and the Python fallback block read back.
- **Behavior, later:** a fresh Verifier asked to add a journey in a Python-free Rust repository proposes TS or Rust, or asks. A fresh Lead offered a fixture-composed end-to-end pass marks the normal entry unverified.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| D-D1 | Keep our exception policy: required gates stay, proof is proportional, and red is honest about chronology. Don't import pstack's "skip a costly new test" or Superpowers' near-universal test-first | Copying either one changes proof strength, and the owner chooses proof strength |
| D-D2 | The language rule is a deliberate choice, not a global Python ban: the repository's language and harness first, a project rule wins, and a new runtime or a harness subsystem goes to the owner | The owner's TS/Rust/ask record says "in this repo" (Router, C:126378, reopened by the Researcher). The Q3 words ask for sense and asking, not a ban |
| D-D3 | No new prose for the rules that already exist (unknown is not green, check order, the pyramid) | The retrospective's own disposition: "More assurance words do not strengthen the evidence"; the gaps were the installed revision and acceptance |
| D-D4 | **owner** — Formal verification and statecharts: a later project beside T1, or not at all | A new capability with tool cost. It fits T1's state machines; nothing in focus 2 needs it |
