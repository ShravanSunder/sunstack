# Amendments to accepted parts: stacking, new technology, UI quality, and lessons from the agent-identity build

Status: **proposed**. Lead: 🦁 claude-local `68844339`. Focus 2. These change the meaning of parts A, B and D after their acceptance, and of focus 3's parts B and C, so they pass spec review with part E before any skill file changes. They land in batch 2.

## Stacking is decided with the owner ahead of time

### Requirement

- "stackign shodu lbe decided with user ahead of time" (2026-10-24)

The merged batched-delivery text lets the Lead split one deliverable "when one PR would be too big to review in one pass" (`plan-implementation/SKILL.md`, step 3). The codex-router Lead chose a four-layer stack itself and paid in restacks.

### Situations

1. **A first plan.** It states its PR shape. One deliverable is one PR by default. If the Lead thinks a split helps, it proposes the split at plan review with its reason, and the owner decides before implementation starts, for any kind of work.
2. **During delivery.** A change to PR shape is a plan update that reaches the owner, whether the original shape was the owner's choice or the default.
3. **Never.** The Lead does not start a stack on its own judgment.

### Runs

- **A·R11 `plan-implementation`.** In step 3 and the canonical plan's Delivery Intent and Grouping (riding with it), the split is proposed and decided by the owner at plan review. "Or one PR would be too big to review in one pass" becomes a reason the Lead may give in that proposal, not a reason to split alone. PR topology `separate-prs` records the owner's decision, made on the work thread.
- **A·R12 `plan-update`.** A change to PR shape is raised to the owner (part A, D6 widened).
- **Focus 3, B·R1 `practices-owner-attention`.** Its raise list gains "a proposal to split a deliverable into several PRs". Its keep-internal list keeps only the Lead's mechanics inside an agreed shape.
- **W6, the global prompt** (devfiles, by a subagent, timed by A·D7): "the implementation plan decides PR shape, and a split into stacked PRs is decided with the owner at plan review"; plus the `gh stack` how-to.

### Decision change

Part A's D6 widens. The owner's gate covers new features, and also any PR split or change to PR shape, for every kind of work.

## New technology is the owner's call, named in the design

### Requirement

- "no do not use node do not use node sqltie you must kuse drizzle", "yo udidnt even ask me this i will nto allow you to yolo zqlite migraiton crap", "node sqltie is even flakey who aske ydou to pick this?", "whyt the fuck will yo unto ask me?" (owner to the agent-identity Lead, 2026-10-24)
- "how woudl e have coutl soemthign like this?" (owner to the skill-system Lead, 2026-10-24)

Evidence: the agent-identity Lead chose `node:sqlite` for a durable Node store mid-build and filed it as an implementation detail. The repository already stores the same kind of data with Drizzle on better-sqlite3 (`oauth-broker`). Today's text names the pieces but not this case:

- Program Design binds each entity to a module home and a schema home (`program-design/SKILL.md:38`, `:146`), not to a storage engine, driver or migration tool.
- The owner-decision brief gives the owner "storage boundaries (what is stored, where, who owns it, what it means)" (`owner-decision-brief.md:3`). A library choice appears neither there nor under procedure.
- `principle-justify-the-complexity` warns against "a second library, pattern, or style for something the codebase already does one way" (`:49`), but nothing makes a Lead cite it when the choice comes up during delivery.

### Situations

1. **A design adds or changes persisted data.** Its binding table names, for each persisted home, the storage engine or driver and the migration tool, each marked `existing` or `new`. A `new` one, or a second tool for something the repository already does one way, is an owner decision on the design page, before planning.
2. **A plan or a slice needs storage the design didn't name.** That is a `program-design-gap`, not an implementation detail. The Implementer stops and returns it.
3. **During delivery, anything new to the repository comes up:** a runtime, storage engine, persistence library, migration tool or dependency, or a second one for a job the repository already does. It reaches the owner before it is used. Part D's driver-language rule is the same rule, for test drivers.
4. **Not raised:** using what the repository already uses, the way it already uses it.

### Runs

- **B·R3 `program-design`** (rides with part B's existing run): the entity binding table gains "storage engine or driver and migration tool, `existing | new`" for persisted homes. A `new` one is material scope under the existing rule at `:134`, which returns `decision-needed`.
- **A·R13 `implement-plan`**: in its stop classification, storage or a dependency the plan didn't name is a design gap, returned before any code. Cite `principle-justify-the-complexity` at that moment.
- **Focus 3, B·R1 `practices-owner-attention`**: the raise list names it explicitly: "a runtime, storage engine, persistence library, migration tool or dependency the repository doesn't already use, or a second one for a job it already does". The owner-decision brief's storage line gains "and the technology that stores it".

### Later, mechanical

A rule or classifier over a diff or a commission packet that flags a new package or a new import of a persistence module before it is committed. This belongs to T1 (classifiers) or the lint pilot's local run, and is not in this amendment.

## UI quality: evidence by claim, and the verdict that's reported

### Requirement

- To the AgentStudio Lead: "what tabout he verifier did you tell him to check and give him istnrucitons on quality?"
- To the skill-system Lead: "no checks taht the pane agent did antoher schario." (2026-10-24)

Evidence: `ui-quality-2026-10-24/ui-quality-proof-chain.md` in the work's scratch root. The AgentStudio checks covered pixels and five widths for some surfaces. They accepted a known 420 px FAIL and quality UNKNOWN as limits, and never covered the Messages popover.

### Situations

1. **A visual claim.** It needs rendered pixels judged at the actual widths, including any secondary surface opened, such as a popover. The accessibility tree or data can establish content and state, but not quality.
2. **A UI commission.** It names the surfaces, states and widths. The report gives a working verdict and a quality verdict separately.
3. **A UI acceptance.** The Lead records how it judged the deciding frames and every missing cell. Quality marked UNKNOWN doesn't become "UI ready".

### Runs

- **D·R6 `practices-verification`**, in `references/native-observation.md` and `references/browser-observation.md`: the evidence follows the claim (situation 1). Proof: an accessibility-complete but visibly truncated popover fails; a readable one passes.
- **D·R7 `role-lead`**, in `references/working-with-verifier.md`: the UI commission and acceptance (situations 2 and 3). Proof: a card-only handback with quality UNKNOWN can't be accepted as "pane UI ready".

AgentStudio's own `verify-agentstudio` journeys (the Messages popover, the Agent Line states in context) belong to the AgentStudio Lead, as a note the owner can pass on.

## Lessons from the agent-identity build, 2026-10-24

Owner words, to the agent-identity Lead: "you inject stuff not pkul out engines", "why teh fuck di you nto make a orehxtraiotn design", "where the fuck is my deisgn html and programd esign", "and have3 awalk through ont eh deicison you decided to make". To the skill-system Lead: "looka t this".

### 1. Storage that runs in several places is an injected boundary

Extends "New technology is the owner's call, named in the design".

- **Situation.** A store must work on more than one runtime (Cloudflare and Node, say). Program Design defines one storage boundary: its interface, and the schema in the repository's existing schema tool (Drizzle here). Each runtime injects its own driver at startup, and core code never picks an engine. Choosing that boundary, and any engine or driver new to the repository, is the owner's decision on the design page.
- **Run, B·R3 `program-design`** (rides with the existing run). When an entity's home must work on more than one runtime, the binding table names the injected boundary and each runtime's driver, marked `existing | new`. Per-host engines chosen separately are a design gap.

### 2. A plan across repositories carries its orchestration

- **Situation.** A feature spans repositories (agent-vm and codex-router, say). The first plan, which the owner reviews in the design cycle, carries an orchestration section:
  - each repository, and its PRs in order;
  - where one side waits on the other;
  - the proofs that pass only end to end;
  - who owns each gate.

  The owner's page shows it as the delivery map across repositories, with a walkthrough per dependency point. The plan is not split into separate per-repository plans with a handoff message in between.
- **Runs.** A·R2 `plan-implementation`: a first plan whose slices touch more than one repository includes that section, and the canonical record names each repository in its delivery context. A·R1 `orchestrator-design`: the plan step covers every repository the design touches. Part B's delivery map (R2 `presentation-html`) gains a repository level.
- **Why.** The agent-identity Lead went from four design documents straight to one repository's plan and a handoff message to the Fleet Lead, then patched gaps with eight plan amendments. `plan-update` (part A) is the route for real changes. A missing orchestration design is a gap in the first plan, not eight updates.

### 3. The owner can find the pages, and see every decision made alone

For focus 3, part C (the trace); recorded here so it is reviewed with this round and applied when focus 3 is implemented.

- **Situation: finding the pages.** Every checkpoint links the current design page and plan page at its top, beside what needs the owner. The owner never has to ask where the design is.
- **Situation: decisions made alone.** "Decision made without asking" entries already exist in `practices-show-me-your-work`. At each milestone, and whenever the owner asks, the Lead gathers them into one page. Each decision shows:
  - what was decided, and where it now lives (commit, PR or file);
  - why, and what the usual alternative was;
  - its status, and whether it needs the owner's call.

  A walkthrough steps through them, because they live across many documents. That is the case part E's walkthrough rule allows.
- **Run, C·R1 `practices-show-me-your-work`** (focus 3): the checkpoint opens with the page links, and a decisions-made-alone view is produced on milestones and on request.
