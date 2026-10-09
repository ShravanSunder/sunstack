# Individual local skill analysis

**31 active packages at `10ebacfb4ce72893196c87d51bc2271f72fe8922`.**

Related source entries share a responsibility or mechanism. They are not complete equivalents, runtime certifications, or claims of copied provenance. The exact differences are shown. Scenario counts establish files present, not passing behavior. See [the report](report.md) for recommendation shapes and priorities.

The independent quality Workers inspected complete main files and metadata. They selected references by material claim. Their detailed evidence is in [design/practice quality](local-design-quality.md) and [delivery/tool quality](local-delivery-quality.md).

| Primary stage | Local skill | Core words / scenarios | Disposition |
| --- | --- | --- | --- |
| Define | `discuss-clarify-mental-models` | 2,782 / 5 | Keep: no current source defect established |
| Define | `discuss-pathfinding` | 2,920 / 12 | Keep: no current source defect established |
| Define | `orchestrator-design` | 1,766 / 16 | R01: resolve the current source-contract boundary |
| Define | `program-design` | 5,651 / 14 | Keep: no current source defect established |
| Define | `spec-design` | 4,902 / 15 | Keep: no current source defect established |
| Define | `spec-handoff` | 722 / 3 | R04: define the no-repository/unwritable-output fallback |
| Plan | `ops-linear-tracking` | 931 / 1 | R05: complete the operation result contract |
| Plan | `plan-handoff` | 856 / 5 | Keep: no current source defect established |
| Plan | `plan-implementation` | 785 / 13 | Keep: no current source defect established |
| Plan | `plan-improve-repo` | 1,934 / 6 | Keep: no current source defect established |
| Build | `implement-plan` | 706 / 14 | Keep source; first prove implementer completion of its own required proof |
| Build | `orchestrator-implementation-goal` | 1,578 / 17 | Keep source; first prove actual Lead diff/proof assessment before review |
| Build | `scaffold-project` | 1,545 / 0 | R02: connect the retrofit choice to the existing command |
| Verify | `debug-investigation` | 873 / 4 | R07: conditional measured-performance depth when admitted |
| Verify | `ops-observability-stack` | 366 / 2 | Keep: no current source defect established |
| Verify | `peekaboo` | 726 / 1 | Keep: no current source defect established |
| Review | `implementation-review` | 1,401 / 22 | Keep: no current source defect established |
| Review | `ops-security-review` | 512 / 1 | Keep: no current source defect established |
| Review | `spec-program-review` | 3,642 / 22 | Keep: no current source defect established |
| Ship | `implementation-handoff` | 773 / 3 | Keep: no current source defect established |
| Ship | `implementation-pr-wrapup` | 1,478 / 23 | R08: optional proof/risk visibility within the existing PR template |
| Retro & Maintenance | `docs-maintain` | 728 / 2 | Keep: no current source defect established |
| Retro & Maintenance | `skill-audit` | 778 / 2 | R06: tighten retrospective evidence and change placement |
| Retro & Maintenance | `skills-creation` | 5,110 / 14 | R09: preserve the core and calibrate evaluation-driven repairs |
| Cross-cutting | `agent-collaboration` | 1,493 / 4 | Keep: no current source defect established |
| Cross-cutting | `manage-agents` | 1,808 / 30 | Keep source; first prove role/executor acceptance through the hierarchy pressure cases |
| Cross-cutting | `practices-collaboration` | 930 / 9 | Keep: no current source defect established |
| Cross-cutting | `practices-research` | 570 / 3 | R03/R06: align completion and historical-evidence contracts |
| Cross-cutting | `practices-show-me-your-work` | 1,107 / 10 | Keep: no current source defect established |
| Cross-cutting | `presentation-tui` | 848 / 7 | Keep: no current source defect established |
| Cross-cutting | `presentation-webui` | 788 / 4 | Keep: no current source defect established |

## discuss-clarify-mental-models

**Stage:** Define. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-clarify-mental-models/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when shared understanding may have drifted (repeated corrections, hollow agreement, a term meaning two things) or the user asks to reconverge, share understanding, reflect back, or re-anchor. Not for artifact edits, review, evidence gathering, or first-pass extraction.

- Separates existing shared-model drift from first-pass knowledge extraction and artifact work.
- Makes provenance, confirmation, falsifiers, map closure, and route ownership observable.

### Related trio mechanisms

**pstack:**

- [architect](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/architect/SKILL.md#L2) (skill; partial): Grounds a subsystem, sketches candidate types/modules, synthesizes a design, implements against it, and scraps a broken sketch. Program Design owns structural How but not this parallel sketch-to-implementation lifecycle.
- [how](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/how/SKILL.md#L2) (skill; partial): Explains subsystem behavior from source using bounded explorers and a compact onboarding account. Local system reconstruction is design input or reconvergence, not this read-only explainer.

**matt:**

- [grilling](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grilling/SKILL.md#L6) (skill; partial): Builds a decision tree and asks the current prerequisite-ready question frontier in rounds, keeping facts with the agent and decisions with the user. Local questioning is limited to unwritten owner meaning or repairing shared-model drift and has stricter destination, evidence, and stop contracts.
- [wait-what](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/wait-what/SKILL.md#L7) (skill; no-clear-owner): Re-pitches a message that did not land in Simplified Technical English using the project's glossary vocabulary. Local reconvergence repairs a shared mental model; it is not a user-triggered plain-language re-pitch.

**osmani:**

- [Interview Me](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/interview-me/SKILL.md#L40) (skill; partial): Forms a one-sentence intent hypothesis with confidence, asks one question with a proposed guess at a time, then requires an explicit confirmed intent before handing off and stopping the turn. Local pathfinding can ask up to three related questions together and routes unsettled owner meaning among Requirements, Specification, and Program Design; it does not use Addy's fixed 95% confidence stop or require a dedicated intent interview for every ambiguous request.
- [Idea Refine](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/idea-refine/SKILL.md#L52) (skill; partial): Runs divergent idea generation, clusters and evaluates directions, surfaces assumptions, then prepares a one-page direction artifact after user confirmation. Local pathfinding resolves owner meaning and routes records to their authoritative homes; it does not generate 5–8 product variations or select a recommended product direction. The local design skills author settled meaning, not ideation.
- [Doubt-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/doubt-driven-development/SKILL.md#L49) (skill; partial): For in-scope non-trivial decisions, isolates artifact and contract, invokes an adversarial fresh-context reviewer, reconciles findings against the artifact, and stops on bounded conditions. Local design and implementation reviews use fresh independent Review Sidekicks with source/plan/rail admission and sequential proof checks; they are separate review workflows, not an automatic per-decision Claim–Extract–Doubt–Reconcile–Stop loop. Addy's skill is not required for every task and excludes trivial/mechanical work.


### Concern and next disposition

- Efficiency hypothesis: each fired map requires shared rendering guidance, plus model-shapes for first/changed layouts; source inspection does not establish excess effort.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source and relevant-reference inspection at the assigned HEAD. Inventory lists 5 active pressure scenarios; no evals were run and no behavior or pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 2,782 core words; 1,336 local reference words; 5 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [model-shapes.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-clarify-mental-models/references/model-shapes.md#L1)
- [provenance-decomposition.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-clarify-mental-models/references/provenance-decomposition.md#L1)

## discuss-pathfinding

**Stage:** Define. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-pathfinding/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when requirements, user needs, domain terms, tacit process, or owner tolerances are unwritten and must be drawn out of someone's head: \"grill me\", \"interview me\", \"help me figure out what I actually want\". Not for authoring from settled sources.

- Separates unwritten owner meaning from settled structural synthesis and shared-model drift.
- Requires bounded evidence classification, concrete owner resolution, durable records, and an exact caller-owned return route.

### Related trio mechanisms

**pstack:**

- [principle-exhaust-the-design-space](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-exhaust-the-design-space/SKILL.md#L2) (skill; partial): Requires two or three materially distinct prototypes for novel interaction or architecture decisions before commitment. Local design compares alternatives but does not impose this empirical prototype count.
- [principle-experience-first](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-experience-first/SKILL.md#L2) (skill; partial): Resolves product and UX tradeoffs toward polished user experience and prototypes before commitment. Local requirements keep product meaning owner-confirmed but do not prescribe this heuristic.
- [Prototype](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/prototype.md#L1) (playbook; partial): Builds isolated throwaway variants for an empirical question and chooses from observed UI, output, or timing. Local design scratch can hold prototype views but does not define this empirical alternative loop.

**matt:**

- [domain-modeling](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/domain-modeling/SKILL.md#L8) (skill; partial): Actively sharpens domain terms, tests relationships with scenarios, checks statements against code, writes resolved terms to the project glossary, and records selected ADRs. At this pinned source head, the filename is CONTEXT.md; local pathfinding preserves each repo's existing glossary location, while Specification owns entity meaning.
- [grill-with-docs](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/grill-with-docs/SKILL.md#L7) (skill; partial): A user-invoked wrapper calls the grilling and domain-modeling skills so repo discussions produce a shared language and ADR/glossary updates. Local extraction records owner meaning and routes it to its semantic artifact owner; it does not bundle term persistence into a single grilling wrapper.
- [grill-me](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grill-me/SKILL.md#L7) (skill; partial): A user-invoked entry point that calls the reusable grilling primitive. Local pathfinding extracts unwritten owner meaning and returns it to a semantic owner; it is not a generic plan/design interview wrapper.
- [grilling](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/grilling/SKILL.md#L6) (skill; partial): Builds a decision tree and asks the current prerequisite-ready question frontier in rounds, keeping facts with the agent and decisions with the user. Local questioning is limited to unwritten owner meaning or repairing shared-model drift and has stricter destination, evidence, and stop contracts.
- [to-questionnaire](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/to-questionnaire/SKILL.md#L7) (skill; non-sdlc): Interviews the user about who will receive a questionnaire and what facts or decisions they need back from that person. Local pathfinding interviews the owner; it does not draft an external questionnaire for another recipient.

**osmani:**

- [Interview Me](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/interview-me/SKILL.md#L40) (skill; partial): Forms a one-sentence intent hypothesis with confidence, asks one question with a proposed guess at a time, then requires an explicit confirmed intent before handing off and stopping the turn. Local pathfinding can ask up to three related questions together and routes unsettled owner meaning among Requirements, Specification, and Program Design; it does not use Addy's fixed 95% confidence stop or require a dedicated intent interview for every ambiguous request.
- [Idea Refine](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/idea-refine/SKILL.md#L52) (skill; partial): Runs divergent idea generation, clusters and evaluates directions, surfaces assumptions, then prepares a one-page direction artifact after user confirmation. Local pathfinding resolves owner meaning and routes records to their authoritative homes; it does not generate 5–8 product variations or select a recommended product direction. The local design skills author settled meaning, not ideation.
- [Constraint-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/constraint-driven-development/SKILL.md#L93) (skill; partial): Elicits a bounded quality-bar choice, persists it as root CONSTRAINTS.md, ties dimensions to concrete tools and lifecycle costs, and guards against weakening the recorded bar. Local design records authorized constraints in Requirements, Specification, and Program Design; implementation preserves plan constraints. No named current local skill creates this separate numeric quality-bar file or diff guard. Source spells the file CONSTRAINTS.md, uppercase.
- [Documentation and ADRs](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/documentation-and-adrs/SKILL.md#L23) (skill; partial): Records significant decisions with context, alternatives, consequences, and matching repository conventions; maintains API docs, README, changelog, and agent context. Local pathfinding records owner-confirmed decisions and docs-maintain reconciles established docs after decisions. Local design artifacts own normative meaning; Addy's generic ADR and README templates are not local authoring authority.


### Concern and next disposition

- Efficiency hypothesis: 2,920 core words plus 3,122 reference words, with two references required in a normal run; harmful runtime cost is not demonstrated.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source and relevant-reference inspection at the assigned HEAD. Inventory lists 12 active pressure scenarios; no evals were run and no behavior or pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 2,920 core words; 3,122 local reference words; 12 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [question-craft.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-pathfinding/references/question-craft.md#L1)
- [decisions-and-docs.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-pathfinding/references/decisions-and-docs.md#L1)
- [user-requirements-extraction.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/discuss-pathfinding/references/user-requirements-extraction.md#L1)

## orchestrator-design

**Stage:** Define. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-design/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when a user asks to run, resume, or finish one bounded Requirements, Specification, Program Design, and independent three-artifact design cycle before planning. Not for a direct design phase, long-horizon delivery, implementation, or PR work.

- Keeps governing design authorship with the current Lead and assigns only independent review out.
- Verifies phase handoffs and review convergence, and distinguishes design readiness from implementation completion.

### Related trio mechanisms

**pstack:** no mapped counterpart in this census.
**matt:**

- [ask-matt](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/ask-matt/SKILL.md#L13) (skill; partial): Routes the user through the main idea-to-ship flow, on-ramps, standalone skills, and vocabulary references. It distinguishes a spec/ticket build from a one-session implementation. Local orchestrators route bounded design and delivery goals; neither is a global router over the full active skill set.

**osmani:**

- [Using Agent Skills](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/using-agent-skills/SKILL.md#L12) (skill; non-sdlc): Classifies incoming work by phase, routes to named skills, and states operating behaviors that apply across the pack. Its lifecycle order is opinionated and can invoke many skills for a full feature. This is a meta skill-discovery layer. The local repo uses a layered skill index and separate orchestrators/practices; no single active local skill owns this same broad intent router.
- [Spec-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/spec-driven-development/SKILL.md#L22) (skill; partial): Gates a capability map when a request contains independently testable modules, then runs human-reviewed specification, plan, task, and implementation phases. The local workflow separates Requirements, observable Specification, structural Program Design, planning, and execution into distinct owners. Addy's single skill spans these artifacts and prescribes per-phase human approval, so its process cannot be copied as one local owner.


### Concern and next disposition

- Source conflict: description and README say this bounded workflow stops before planning, while lines 74-80 direct it to author a plan and commission implementation when continued delivery is requested; the separate implementation-goal orchestrator owns that delivery loop. An active scenario expects continuation, leaving the boundary unresolved.

R01: resolve the current source-contract boundary. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD, plus the adjacent README, orchestrator-implementation-goal source, and the current continuation pressure scenario. No evals were run; the scenario's presence supports expected coverage only, not a pass. Trio mechanisms were not assessed from source reports.

Corpus size: 1,766 core words; 0 local reference words; 16 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [README.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/README.md#L1)
- [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-implementation-goal/SKILL.md#L1)
- [ready-plan-keeps-main-default-contact.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/tests/skills/pressure-scenarios/shravan-dev-workflow/orchestrator-design/ready-plan-keeps-main-default-contact.md#L1)

## program-design

**Stage:** Define. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/program-design/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when defining or revising structural How and its views: binding Specification entities to owners, homes, and schemas, then components, interfaces, state, flows, failure, trust boundaries, and proof seams. Not for defining what entities mean or other Why/What (spec-design).

- Owns structural realization of fixed observable obligations and routes product meaning and task sequencing to their proper owners.
- Uses current-system evidence, alternatives, entity binding, behavior paths, proof seams, owner confirmation, and deletion against accepted requirements.

### Related trio mechanisms

**pstack:**

- [architect](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/architect/SKILL.md#L2) (skill; partial): Grounds a subsystem, sketches candidate types/modules, synthesizes a design, implements against it, and scraps a broken sketch. Program Design owns structural How but not this parallel sketch-to-implementation lifecycle.
- [arena](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/arena/SKILL.md#L2) (skill; partial): Creates parallel candidate artifacts, cross-judges them against a rubric, selects/grafts a base, and verifies the result. Local design and review separate candidate creation, judgment, integration, and acceptance.
- [blast-radius](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/blast-radius/SKILL.md#L2) (skill; partial): Finds breakage beyond a diff and proves the safety-critical fact by executing real code or the running app. Review checks changed-system reachability and proof but not this one-fact blast-radius contract.
- [how](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/how/SKILL.md#L2) (skill; partial): Explains subsystem behavior from source using bounded explorers and a compact onboarding account. Local system reconstruction is design input or reconvergence, not this read-only explainer.
- [principle-attack-the-premise](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-attack-the-premise/SKILL.md#L2) (skill; partial): After repeated failures under one premise, records it, scripts an actor census, and removes the assignment asymmetry. Local debugging ranks root-cause hypotheses but has no required repeated-failure census.
- [principle-boundary-discipline](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-boundary-discipline/SKILL.md#L2) (skill; partial): Validates untrusted data at system boundaries and keeps internal business logic typed and pure. Program Design models trust boundaries but does not provide this general coding-principle leaf.
- [principle-exhaust-the-design-space](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-exhaust-the-design-space/SKILL.md#L2) (skill; partial): Requires two or three materially distinct prototypes for novel interaction or architecture decisions before commitment. Local design compares alternatives but does not impose this empirical prototype count.
- [principle-experience-first](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-experience-first/SKILL.md#L2) (skill; partial): Resolves product and UX tradeoffs toward polished user experience and prototypes before commitment. Local requirements keep product meaning owner-confirmed but do not prescribe this heuristic.
- [principle-foundational-thinking](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-foundational-thinking/SKILL.md#L2) (skill; partial): Chooses data structures before logic, isolates shared state, and sequences shared foundations before features. Local design and planning cover these through separate obligation-specific procedures.
- [principle-laziness-protocol](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-laziness-protocol/SKILL.md#L2) (skill; partial): Prefers deletion, flat calls, minimal diffs, and avoiding speculative abstractions or signal threading. Local design justifies mechanisms against obligations but lacks this universal deletion-first rule.
- [principle-make-operations-idempotent](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-make-operations-idempotent/SKILL.md#L2) (skill; partial): Requires commands and lifecycle loops to converge after repeated runs or partial crashes. Program Design covers failure and recovery when required, but has no standalone idempotency checklist.
- [principle-migrate-callers-then-delete-legacy-apis](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md#L2) (skill; partial): Inventories callers, migrates them, and removes the old internal API in the same refactor wave. Local plans model cutovers and the repo requires hard cutover, but no dedicated caller-migration skill exists.
- [principle-minimize-reader-load](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-minimize-reader-load/SKILL.md#L2) (skill; partial): Reduces layers and hidden state and judges maintainability by how quickly a reader can trace ownership. Local design justifies components by obligations rather than a reader-load score.
- [principle-model-the-domain](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-model-the-domain/SKILL.md#L2) (skill; partial): Encodes domain states in structures such as state machines, typed models, registries, reducers, or normalized collections. Program Design binds entities and owners but does not carry this implementation principle as a leaf.
- [principle-outcome-oriented-execution](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-outcome-oriented-execution/SKILL.md#L2) (skill; partial): Sequences rewrites toward a verified target and permits only planned, scoped, reversible intermediate breakage. Local planning preserves accepted obligations and does not use the same broad migration principle.
- [principle-prove-it-works](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-prove-it-works/SKILL.md#L2) (skill; partial): Checks the real artifact directly and prefers deterministic scripts whose outputs a reviewer can rerun. Local phases require fitting proof through obligation and runtime layers rather than this standalone maxim.
- [principle-redesign-from-first-principles](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-redesign-from-first-principles/SKILL.md#L2) (skill; partial): Rebuilds a changed design as though the new requirement had been foundational, then propagates it through callers and artifacts. Local architecture and specification procedures capture current-to-target changes without this named rewrite rule.
- [principle-separate-before-serializing-shared-state](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md#L2) (skill; partial): Gives concurrent actors distinct write targets first and serializes only when one shared target is a real invariant. Local parallel slices use disjoint writes and explicit owners but do not share this standalone rule.
- [principle-subtract-before-you-add](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-subtract-before-you-add/SKILL.md#L2) (skill; partial): Removes dead or redundant complexity before adding structure and rejects speculative validators or references. Local simplification is bounded by accepted obligations rather than a general subtract-first rule.
- [principle-type-system-discipline](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-type-system-discipline/SKILL.md#L2) (skill; partial): Uses typed variants, semantic newtypes, boundary parsing, and exhaustive matching to make invalid states unrepresentable. The repo's agent instructions carry language-specific type rules; active skills lack this general leaf.
- [typescript-best-practices](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/typescript-best-practices/SKILL.md#L2) (skill; partial): Applies type discipline, boundary schemas, real tests, and telemetry rules to TypeScript files. Local TypeScript conventions live in repo instructions and scaffolding, not a dedicated active TS skill.
- [why](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/why/SKILL.md#L2) (skill; partial): Searches source control and available external evidence categories in parallel to explain code history and motivation. Local research gathers ordered evidence but does not perform this required rationale sweep.
- [Feature](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/feature.md#L1) (playbook; partial): Grounds a feature, explores architecture, decomposes work, delegates implementation, and verifies on the matching surface. Local flow requires distinct reviewed design and immutable plan inputs.
- [Hillclimb](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/hillclimb.md#L1) (playbook; partial): Freezes a sensitive workload and metric harness, then keeps or reverts one measured hypothesis per iteration. Local design models performance budgets, but no active local skill owns this optimization loop.
- [Investigation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/investigation.md#L1) (playbook; partial): Routes read-only architecture questions through how/why and returns a cited explanation or tradeoff recommendation. Local research and debugging have separate ledger and diagnosis contracts.
- [Multi-phase or multi-PR plan](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md#L1) (playbook; partial): Authors a PR-by-PR plan with unit, live, performance, regression, and operator review gates. Local canonical plans map specification obligations to proof-bearing slices with different authority.
- [Perf issue](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/perf-issue.md#L1) (playbook; partial): Captures baseline and post-fix traces, ties hypotheses to trace signals, and requires measured PR evidence. Local design has performance proof seams but no dedicated measured perf-fix procedure.
- [Prototype](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/prototype.md#L1) (playbook; partial): Builds isolated throwaway variants for an empirical question and chooses from observed UI, output, or timing. Local design scratch can hold prototype views but does not define this empirical alternative loop.
- [Refactoring](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/refactoring.md#L1) (playbook; partial): Pins behavior, subtracts complexity, migrates/deletes legacy callers, proves equivalence, and measures reader-load reduction. Local phases prove obligations but lack a dedicated characterization-first equivalence/reader-load route.
- [Visual parity](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/visual-parity.md#L1) (playbook; partial): Locks an untouched visual baseline and requires zero image difference after each component migration. Peekaboo has screenshot comparison primitives but no immutable baseline migration gate.

**matt:**

- [codebase-design](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/codebase-design/SKILL.md#L8) (skill; partial): Defines a deep-module vocabulary around small interfaces, seams, depth, leverage, locality, and testability through the interface. Local Program Design defines structural realization from a fixed Specification, with different entities, artifact requirements, and ownership boundaries.
- [domain-modeling](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/domain-modeling/SKILL.md#L8) (skill; partial): Actively sharpens domain terms, tests relationships with scenarios, checks statements against code, writes resolved terms to the project glossary, and records selected ADRs. At this pinned source head, the filename is CONTEXT.md; local pathfinding preserves each repo's existing glossary location, while Specification owns entity meaning.
- [setup-ts-deep-modules](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/SKILL.md#L9) (skill; partial): Installs dependency-cruiser rules that make package subfolders private and proves the boundary rule with pass/fail/pass checks. Local scaffolding is generic; no active skill owns this dependency-cruiser and deep-module setup recipe.

**osmani:**

- [Spec-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/spec-driven-development/SKILL.md#L22) (skill; partial): Gates a capability map when a request contains independently testable modules, then runs human-reviewed specification, plan, task, and implementation phases. The local workflow separates Requirements, observable Specification, structural Program Design, planning, and execution into distinct owners. Addy's single skill spans these artifacts and prescribes per-phase human approval, so its process cannot be copied as one local owner.
- [API and Interface Design](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/api-and-interface-design/SKILL.md#L37) (skill; partial): Defines an interface contract before implementation, with consistent errors, boundary validation, naming, idempotency, REST patterns, and typed interface shapes. Local Specification owns observable contracts and Program Design binds entities to interfaces, callers, state, and proof seams. Addy's recommendation to prefer additive/backward-compatible changes conflicts with the owner-supplied hard-cutover instruction for this task; preserve contract clarity and boundary validation only where authorized.
- [Constraint-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/constraint-driven-development/SKILL.md#L93) (skill; partial): Elicits a bounded quality-bar choice, persists it as root CONSTRAINTS.md, ties dimensions to concrete tools and lifecycle costs, and guards against weakening the recorded bar. Local design records authorized constraints in Requirements, Specification, and Program Design; implementation preserves plan constraints. No named current local skill creates this separate numeric quality-bar file or diff guard. Source spells the file CONSTRAINTS.md, uppercase.
- [Source-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/source-driven-development/SKILL.md#L27) (skill; partial): Detects exact framework versions, fetches specific official documentation, implements documented patterns, and cites sources while surfacing conflicts or unverified behavior. Local research and design phases gather current external evidence, but no active local skill requires every framework-specific implementation decision to carry official-doc citations. Apply only when that evidence is in scope.
- [Doubt-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/doubt-driven-development/SKILL.md#L49) (skill; partial): For in-scope non-trivial decisions, isolates artifact and contract, invokes an adversarial fresh-context reviewer, reconciles findings against the artifact, and stops on bounded conditions. Local design and implementation reviews use fresh independent Review Sidekicks with source/plan/rail admission and sequential proof checks; they are separate review workflows, not an automatic per-decision Claim–Extract–Doubt–Reconcile–Stop loop. Addy's skill is not required for every task and excludes trivial/mechanical work.
- [Frontend UI Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/frontend-ui-engineering/SKILL.md#L20) (skill; no-clear-owner): Provides component structure, UI state, design-system adherence, responsive layout, accessibility, and rendered verification guidance. The inspected local workflow homes specify observable UI behavior and structural contracts or test macOS UI, but no current skill owns frontend implementation craft, CSS/component conventions, or accessibility checks end to end.
- [Code Simplification](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/code-simplification/SKILL.md#L105) (skill; partial): Requires understanding callers, tests, edge cases, and possible historical reasons before a behavior-preserving incremental simplification; specifically asks the reader to check git blame for original context. The source does not prescribe proving why a specific guard exists by tracing blame, all history, and tests. Local Program Design checks accepted-requirement coverage after deleting/simplifying mechanisms, but there is no dedicated local simplification workflow or blame-history requirement.
- [Security and Hardening](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/security-and-hardening/SKILL.md#L21) (skill; partial): Maps trust boundaries and assets, writes abuse cases, then applies boundary validation, access-control, secrets, dependency, privacy, SSRF, and LLM hardening checks. Local Program Design models trust boundaries and observability/security obligations; ops-security-review routes explicit scans to official Codex Security workflows. The local security skill is an audit handoff, not this general implementation-hardening handbook.
- [Performance Optimization](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/performance-optimization/SKILL.md#L30) (skill; partial): Establishes a baseline, identifies a measured bottleneck, changes one variable, remeasures against variance, reverts neutral/worse changes, and adds a regression guard. Local design can express performance obligations and proof seams, and ops-observability-stack queries shared telemetry; there is no generic local profiling/optimization workflow or equivalent performance budget procedure in the assigned homes.
- [Deprecation and Migration](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/deprecation-and-migration/SKILL.md#L67) (skill; partial): Plans consumer migration, replacement proof, phased removal, and expand/migrate/contract schema changes with adapters, dual writes, feature flags, and down paths. Local design can state migration contracts, ownership and failure behavior, but the owner-supplied instructions require hard cutover with no compatibility layer or gradual dual path. Addy's adapters, dual writes, and flags conflict with that rule and are not adoptable without an owner decision.
- [Documentation and ADRs](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/documentation-and-adrs/SKILL.md#L23) (skill; partial): Records significant decisions with context, alternatives, consequences, and matching repository conventions; maintains API docs, README, changelog, and agent context. Local pathfinding records owner-confirmed decisions and docs-maintain reconciles established docs after decisions. Local design artifacts own normative meaning; Addy's generic ADR and README templates are not local authoring authority.
- [Observability and Instrumentation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/observability-and-instrumentation/SKILL.md#L25) (skill; partial): Designs telemetry from on-call questions, structured logs and entry-point attribution, RED/USE metrics, OpenTelemetry traces, symptom alerts, runbooks, and live telemetry verification. Local ops-observability-stack owns a shared local OTel/Victoria runtime, producer contract, and query loop. It does not prescribe this general app-level instrumentation and alert-authoring method; local requirements favor deterministic event ownership over inferred timing/idle.


### Concern and next disposition

- Efficiency hypothesis: the 5,651-word core plus 6,048 reference words across eleven refs is a high full-run context and authoring ceiling; runtime cost/benefit is unobserved.
- The source repeats coverage/return requirements across stage completion, self-check, and terminal blockers; whether this repetition causes errors or only reinforces gates is unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD; no references needed to settle the stated concerns were opened. Inventory lists 14 active pressure scenarios; no evals were run and no behavior or pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 5,651 core words; 6,048 local reference words; 14 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## spec-design

**Stage:** Define. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/spec-design/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when authoring or revising durable Requirements from settled meaning, or a Specification's observable obligations, domain entities, and coverage views. Not for eliciting genuinely unwritten owner meaning (discuss-pathfinding).

- Keeps authorized Requirements, observable Specification, and structural Program Design distinct.
- Grounds normative claims in authority, defined entities, observable consequences, proof obligations, and an exact terminal/route.

### Related trio mechanisms

**pstack:**

- [principle-exhaust-the-design-space](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-exhaust-the-design-space/SKILL.md#L2) (skill; partial): Requires two or three materially distinct prototypes for novel interaction or architecture decisions before commitment. Local design compares alternatives but does not impose this empirical prototype count.
- [principle-experience-first](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-experience-first/SKILL.md#L2) (skill; partial): Resolves product and UX tradeoffs toward polished user experience and prototypes before commitment. Local requirements keep product meaning owner-confirmed but do not prescribe this heuristic.
- [principle-redesign-from-first-principles](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-redesign-from-first-principles/SKILL.md#L2) (skill; partial): Rebuilds a changed design as though the new requirement had been foundational, then propagates it through callers and artifacts. Local architecture and specification procedures capture current-to-target changes without this named rewrite rule.
- [why](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/why/SKILL.md#L2) (skill; partial): Searches source control and available external evidence categories in parallel to explain code history and motivation. Local research gathers ordered evidence but does not perform this required rationale sweep.
- [Prototype](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/prototype.md#L1) (playbook; partial): Builds isolated throwaway variants for an empirical question and chooses from observed UI, output, or timing. Local design scratch can hold prototype views but does not define this empirical alternative loop.

**matt:**

- [domain-modeling](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/domain-modeling/SKILL.md#L8) (skill; partial): Actively sharpens domain terms, tests relationships with scenarios, checks statements against code, writes resolved terms to the project glossary, and records selected ADRs. At this pinned source head, the filename is CONTEXT.md; local pathfinding preserves each repo's existing glossary location, while Specification owns entity meaning.
- [grill-with-docs](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/grill-with-docs/SKILL.md#L7) (skill; partial): A user-invoked wrapper calls the grilling and domain-modeling skills so repo discussions produce a shared language and ADR/glossary updates. Local extraction records owner meaning and routes it to its semantic artifact owner; it does not bundle term persistence into a single grilling wrapper.
- [to-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-spec/SKILL.md#L7) (skill; partial): Synthesizes the current conversation and codebase into a user-facing spec, confirms test seams, and publishes it to the configured tracker. Local spec-design separates Requirements from Specification, keeps design downstream, and does not publish specs to a tracker.

**osmani:**

- [Idea Refine](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/idea-refine/SKILL.md#L52) (skill; partial): Runs divergent idea generation, clusters and evaluates directions, surfaces assumptions, then prepares a one-page direction artifact after user confirmation. Local pathfinding resolves owner meaning and routes records to their authoritative homes; it does not generate 5–8 product variations or select a recommended product direction. The local design skills author settled meaning, not ideation.
- [Spec-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/spec-driven-development/SKILL.md#L22) (skill; partial): Gates a capability map when a request contains independently testable modules, then runs human-reviewed specification, plan, task, and implementation phases. The local workflow separates Requirements, observable Specification, structural Program Design, planning, and execution into distinct owners. Addy's single skill spans these artifacts and prescribes per-phase human approval, so its process cannot be copied as one local owner.
- [API and Interface Design](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/api-and-interface-design/SKILL.md#L37) (skill; partial): Defines an interface contract before implementation, with consistent errors, boundary validation, naming, idempotency, REST patterns, and typed interface shapes. Local Specification owns observable contracts and Program Design binds entities to interfaces, callers, state, and proof seams. Addy's recommendation to prefer additive/backward-compatible changes conflicts with the owner-supplied hard-cutover instruction for this task; preserve contract clarity and boundary validation only where authorized.
- [Constraint-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/constraint-driven-development/SKILL.md#L93) (skill; partial): Elicits a bounded quality-bar choice, persists it as root CONSTRAINTS.md, ties dimensions to concrete tools and lifecycle costs, and guards against weakening the recorded bar. Local design records authorized constraints in Requirements, Specification, and Program Design; implementation preserves plan constraints. No named current local skill creates this separate numeric quality-bar file or diff guard. Source spells the file CONSTRAINTS.md, uppercase.
- [Source-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/source-driven-development/SKILL.md#L27) (skill; partial): Detects exact framework versions, fetches specific official documentation, implements documented patterns, and cites sources while surfacing conflicts or unverified behavior. Local research and design phases gather current external evidence, but no active local skill requires every framework-specific implementation decision to carry official-doc citations. Apply only when that evidence is in scope.
- [Frontend UI Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/frontend-ui-engineering/SKILL.md#L20) (skill; no-clear-owner): Provides component structure, UI state, design-system adherence, responsive layout, accessibility, and rendered verification guidance. The inspected local workflow homes specify observable UI behavior and structural contracts or test macOS UI, but no current skill owns frontend implementation craft, CSS/component conventions, or accessibility checks end to end.
- [Security and Hardening](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/security-and-hardening/SKILL.md#L21) (skill; partial): Maps trust boundaries and assets, writes abuse cases, then applies boundary validation, access-control, secrets, dependency, privacy, SSRF, and LLM hardening checks. Local Program Design models trust boundaries and observability/security obligations; ops-security-review routes explicit scans to official Codex Security workflows. The local security skill is an audit handoff, not this general implementation-hardening handbook.
- [Performance Optimization](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/performance-optimization/SKILL.md#L30) (skill; partial): Establishes a baseline, identifies a measured bottleneck, changes one variable, remeasures against variance, reverts neutral/worse changes, and adds a regression guard. Local design can express performance obligations and proof seams, and ops-observability-stack queries shared telemetry; there is no generic local profiling/optimization workflow or equivalent performance budget procedure in the assigned homes.
- [Deprecation and Migration](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/deprecation-and-migration/SKILL.md#L67) (skill; partial): Plans consumer migration, replacement proof, phased removal, and expand/migrate/contract schema changes with adapters, dual writes, feature flags, and down paths. Local design can state migration contracts, ownership and failure behavior, but the owner-supplied instructions require hard cutover with no compatibility layer or gradual dual path. Addy's adapters, dual writes, and flags conflict with that rule and are not adoptable without an owner decision.
- [Documentation and ADRs](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/documentation-and-adrs/SKILL.md#L23) (skill; partial): Records significant decisions with context, alternatives, consequences, and matching repository conventions; maintains API docs, README, changelog, and agent context. Local pathfinding records owner-confirmed decisions and docs-maintain reconciles established docs after decisions. Local design artifacts own normative meaning; Addy's generic ADR and README templates are not local authoring authority.


### Concern and next disposition

- Efficiency hypothesis: the 4,902-word core plus 4,717 words across six references and multiple required per-run references create a high authoring/context burden; source-only evidence cannot establish harm.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD; no references needed to settle the stated concerns were opened. Inventory lists 15 active pressure scenarios; no evals were run and no behavior or pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 4,902 core words; 4,717 local reference words; 15 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## spec-handoff

**Stage:** Define. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/spec-handoff/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when packaging spec, design, architecture, or product-decision context for another agent, CLI, machine, or future session before an implementation plan exists.

- Defines handoff as portability rather than approval or completion and preserves open questions and proof expectations.
- Protects authorship transfer and routes to planning only from current reviewed three-artifact readiness.

### Related trio mechanisms

**pstack:** no mapped counterpart in this census.
**matt:**

- [handoff](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/handoff/SKILL.md#L8) (skill; partial): Writes a temporary handoff summary with suggested skills and pointers to existing artifacts. Local handoffs are phase-specific and retain canonical plan/design authority; this source writes a generic temporary summary.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

- Contract gap: the trigger permits conversational/non-repository context, but the default procedure requires two files under a repo-root path without defining a no-repository or unwritable-workspace fallback. Current scenario names do not cover this case.

R04: define the no-repository/unwritable-output fallback. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD and read all three current pressure scenarios. No evals were run; scenario presence is not pass evidence. Trio mechanisms were not assessed from source reports.

Corpus size: 722 core words; 0 local reference words; 3 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [portable-design-context.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/tests/skills/pressure-scenarios/shravan-dev-workflow/spec-handoff/portable-design-context.md#L1)
- [routes-ready-design-to-planner.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/tests/skills/pressure-scenarios/shravan-dev-workflow/spec-handoff/routes-ready-design-to-planner.md#L1)
- [successor-main-authority.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/tests/skills/pressure-scenarios/shravan-dev-workflow/spec-handoff/successor-main-authority.md#L1)
- [cases.ts](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/tests/skills/pressure-scenarios/shravan-dev-workflow/spec-handoff/cases.ts#L1)

## ops-linear-tracking

**Stage:** Plan. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-linear-tracking/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when the user asks to create, organize, update, delete, or inspect Linear projects, milestones, issues, dependencies, ticket breakdowns, blocked/unblocked work, or tickets generated from architecture docs.

- The docs-are-truth/tickets-are-tracking model limits duplicate sources of design authority.
- The MCP/CLI split identifies relation-replacement risk and gives concrete project, issue, and unblocked-work flows.

### Related trio mechanisms

**pstack:**

- [setup-benny](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/setup-benny/SKILL.md#L2) (automation-skill; no-clear-owner): Installs the dormant Benny pack, validates a project feature map/control adapter, and provisions two reviewed Cursor automations. Local skills do not manage Slack automation installation or its project-level configuration.
- [triage-issue-reports](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/triage-issue-reports/SKILL.md#L2) (automation-skill; no-clear-owner): Classifies one Slack report, traces likely ownership, deduplicates a tracker issue, and posts one thread-only verdict. Local Router/Linear/debug skills do not own Slack-thread triage or source-coordinate safety.
- [Orchestrate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L1) (playbook; partial): Coordinates a long-lived program with coordinator, tracks, workers, verifiers, queue/frontier state, and a verification ledger. Local orchestration separates these roles across phases and retains user merge authority.

**matt:**

- [setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/SKILL.md#L9) (skill; partial): Configures an issue tracker, triage labels, and CONTEXT/ADR layout after repository inspection and a user confirmation step. Local scaffold-project is general setup; Linear tracking is only one tracker operation. Neither owns Matt's per-repo setup output.
- [to-tickets](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-tickets/SKILL.md#L9) (skill; partial): Creates user-approved tracer-bullet tickets with blocking edges, publishes them to the selected tracker, and works the unblocked frontier. Local implementation plans own the dependency/proof graph; Linear tracking is separate and does not require one tracker ticket per plan slice.
- [triage](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/triage/SKILL.md#L9) (skill; no-clear-owner): Moves issues and external PRs through category and state roles, verifies claims, grills if needed, and writes agent-ready briefs. The local tracker skill manages Linear projects and dependencies; no active skill owns this triage state machine.
- [wayfinder](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wayfinder/SKILL.md#L7) (skill; no-clear-owner): Builds a shared map of decision tickets for work too large to see, then resolves one decision ticket at a time while advancing the frontier. These local skills cover improvement admission, delivery planning, or Linear tracking separately; none owns the shared long-horizon decision map.

**osmani:**

- [Planning and Task Breakdown](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/planning-and-task-breakdown/SKILL.md#L22) (skill; partial): Builds a dependency graph and decomposes it into vertical, verifiable tasks with acceptance criteria, checks, dependencies, and checkpoints. The local planner consumes reviewed Requirements, Specification, and Program Design and writes one canonical plan with proof gates. Addy's default `tasks/plan.md` and `tasks/todo.md` conventions are not local authority; local plans may point to an external tracker.


### Concern and next disposition

- The broad inspect/update/delete trigger has no common completion or output contract, target-state preflight, or required post-state verification; the CLI reference exposes destructive delete commands and documents milestone consequences without a caller verification step.

R05: complete the operation result contract. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; read cli-reference and searched relevant MCP-reference sections. Inventory lists 1 active pressure scenario; none were run and no external mutation/runtime/pass claim is made.

Corpus size: 931 core words; 2,298 local reference words; 1 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [cli-reference.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-linear-tracking/references/cli-reference.md#L1)
- [mcp-tool-reference.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-linear-tracking/references/mcp-tool-reference.md#L1)

## plan-handoff

**Stage:** Plan. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/plan-handoff/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when packaging an existing implementation plan for another agent, CLI, machine, or future session, especially when the user asks for a copy-paste prompt, next-agent context, or portable plan packet.

- Treats handoff as portability while preserving governing basis, terminal, and authorship.
- Requires whole-plan reading, proof mapping, and a usable copy-paste prompt.

### Related trio mechanisms

**pstack:** no mapped counterpart in this census.
**matt:**

- [handoff](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/handoff/SKILL.md#L8) (skill; partial): Writes a temporary handoff summary with suggested skills and pointers to existing artifacts. Local handoffs are phase-specific and retain canonical plan/design authority; this source writes a generic temporary summary.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 5 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 856 core words; 435 local reference words; 5 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## plan-implementation

**Stage:** Plan. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/plan-implementation/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when writing or revising a repository-grounded implementation plan from reviewed Requirements, Specification, and Program Design, an admitted improvement finding, or a direct planning request. Not for audit-only discovery (plan-improve-repo).

- Separates reviewed-design planning from repository-improvement auditing and requires current governing authority.
- Turns obligations into a proof-bearing immutable plan and returns explicit ready or non-ready routing.

### Related trio mechanisms

**pstack:**

- [architect](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/architect/SKILL.md#L2) (skill; partial): Grounds a subsystem, sketches candidate types/modules, synthesizes a design, implements against it, and scraps a broken sketch. Program Design owns structural How but not this parallel sketch-to-implementation lifecycle.
- [figure-it-out](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/figure-it-out/SKILL.md#L2) (skill; partial): Designs an auditable bespoke run with a falsifiable predicate, verification harness, risk-ordered units, experiment loop, and decision trail. Local planning and implementation use distinct artifact owners and phase boundaries.
- [principle-build-the-lever](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-build-the-lever/SKILL.md#L2) (skill; partial): Builds a rerunnable codemod, script, generator, or delegate skill for nontrivial work and proof. Plans can require scripts and proof artifacts, but there is no universal local lever principle.
- [principle-foundational-thinking](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-foundational-thinking/SKILL.md#L2) (skill; partial): Chooses data structures before logic, isolates shared state, and sequences shared foundations before features. Local design and planning cover these through separate obligation-specific procedures.
- [principle-migrate-callers-then-delete-legacy-apis](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md#L2) (skill; partial): Inventories callers, migrates them, and removes the old internal API in the same refactor wave. Local plans model cutovers and the repo requires hard cutover, but no dedicated caller-migration skill exists.
- [principle-outcome-oriented-execution](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-outcome-oriented-execution/SKILL.md#L2) (skill; partial): Sequences rewrites toward a verified target and permits only planned, scoped, reversible intermediate breakage. Local planning preserves accepted obligations and does not use the same broad migration principle.
- [principle-separate-before-serializing-shared-state](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md#L2) (skill; partial): Gives concurrent actors distinct write targets first and serializes only when one shared target is a real invariant. Local parallel slices use disjoint writes and explicit owners but do not share this standalone rule.
- [principle-sequence-verifiable-units](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-sequence-verifiable-units/SKILL.md#L2) (skill; partial): Brackets units with a known-good baseline and check, then orders commits or PRs so the sequence proves the change. Local plans name slice gates and proof maps but not this history-storytelling contract.
- [principle-test-behavior-not-implementation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-test-behavior-not-implementation/SKILL.md#L2) (skill; partial): Rejects tests that assert only calls, constants, mocks, or fixtures and requires user-observable outcomes. Local proof design tests real behavior but has no active skill owning this exact tautology test.
- [Feature](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/feature.md#L1) (playbook; partial): Grounds a feature, explores architecture, decomposes work, delegates implementation, and verifies on the matching surface. Local flow requires distinct reviewed design and immutable plan inputs.
- [Hillclimb](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/hillclimb.md#L1) (playbook; partial): Freezes a sensitive workload and metric harness, then keeps or reverts one measured hypothesis per iteration. Local design models performance budgets, but no active local skill owns this optimization loop.
- [Multi-phase or multi-PR plan](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md#L1) (playbook; partial): Authors a PR-by-PR plan with unit, live, performance, regression, and operator review gates. Local canonical plans map specification obligations to proof-bearing slices with different authority.
- [Refactoring](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/refactoring.md#L1) (playbook; partial): Pins behavior, subtracts complexity, migrates/deletes legacy callers, proves equivalence, and measures reader-load reduction. Local phases prove obligations but lack a dedicated characterization-first equivalence/reader-load route.

**matt:**

- [to-tickets](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/to-tickets/SKILL.md#L9) (skill; partial): Creates user-approved tracer-bullet tickets with blocking edges, publishes them to the selected tracker, and works the unblocked frontier. Local implementation plans own the dependency/proof graph; Linear tracking is separate and does not require one tracker ticket per plan slice.
- [wayfinder](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wayfinder/SKILL.md#L7) (skill; no-clear-owner): Builds a shared map of decision tickets for work too large to see, then resolves one decision ticket at a time while advancing the frontier. These local skills cover improvement admission, delivery planning, or Linear tracking separately; none owns the shared long-horizon decision map.
- [implement-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) (skill; partial): Runs a nine-step single-branch task graph with per-ticket worktrees, implementer and merger subagents, frontier expansion, review, and cleanup; the pinned file does not explicitly call TDD. Local plan and design stay Lead-authored; local assigns one persistent implementer per planned PR assignment, has no per-ticket merger subagent, and merge requires user authority.

**osmani:**

- [Spec-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/spec-driven-development/SKILL.md#L22) (skill; partial): Gates a capability map when a request contains independently testable modules, then runs human-reviewed specification, plan, task, and implementation phases. The local workflow separates Requirements, observable Specification, structural Program Design, planning, and execution into distinct owners. Addy's single skill spans these artifacts and prescribes per-phase human approval, so its process cannot be copied as one local owner.
- [Planning and Task Breakdown](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/planning-and-task-breakdown/SKILL.md#L22) (skill; partial): Builds a dependency graph and decomposes it into vertical, verifiable tasks with acceptance criteria, checks, dependencies, and checkpoints. The local planner consumes reviewed Requirements, Specification, and Program Design and writes one canonical plan with proof gates. Addy's default `tasks/plan.md` and `tasks/todo.md` conventions are not local authority; local plans may point to an external tracker.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 13 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 785 core words; 712 local reference words; 13 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [slice-and-proof-design.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/plan-implementation/references/slice-and-proof-design.md#L1)
- [canonical-implementation-plan.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/shared-references/canonical-implementation-plan.md#L1)

## plan-improve-repo

**Stage:** Plan. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/plan-improve-repo/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when auditing a repository for improvement opportunities, backlog-worthy refactors, quality gaps, or leverage points and turning admitted findings into implementation plans. Not for planning directly from a reviewed design (plan-implementation).

- Separates candidate discovery, Lead verification/admission, and plan authorship.
- Routes design-required findings and keeps plan validation from upgrading delivery intent.

### Related trio mechanisms

**pstack:** no mapped counterpart in this census.
**matt:**

- [improve-codebase-architecture](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/improve-codebase-architecture/SKILL.md#L9) (skill; partial): Surfaces deepening opportunities as a before/after HTML report, then grills through the user-selected candidate. Local repo improvement work requires evidence admission and Lead-authored plans; it has no same HTML-report-and-grill flow.
- [wayfinder](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/wayfinder/SKILL.md#L7) (skill; no-clear-owner): Builds a shared map of decision tickets for work too large to see, then resolves one decision ticket at a time while advancing the frontier. These local skills cover improvement admission, delivery planning, or Linear tracking separately; none owns the shared long-horizon decision map.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 6 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 1,934 core words; 1,313 local reference words; 6 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## implement-plan

**Stage:** Build. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implement-plan/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when executing or continuing one ready canonical implementation plan whose delivery context authorizes implementation, or correcting one implementation-owned review finding. Not for plan or design defects, independent review, or PR work.

- Requires plan admission before edits and keeps plan meaning, write scope, and delivery authority fixed.
- Uses slice-local proof, integration gates, surprise routing, and fresh evidence for accepted review corrections.

### Related trio mechanisms

**pstack:**

- [figure-it-out](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/figure-it-out/SKILL.md#L2) (skill; partial): Designs an auditable bespoke run with a falsifiable predicate, verification harness, risk-ordered units, experiment loop, and decision trail. Local planning and implementation use distinct artifact owners and phase boundaries.
- [principle-build-the-lever](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-build-the-lever/SKILL.md#L2) (skill; partial): Builds a rerunnable codemod, script, generator, or delegate skill for nontrivial work and proof. Plans can require scripts and proof artifacts, but there is no universal local lever principle.
- [principle-fix-root-causes](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-fix-root-causes/SKILL.md#L2) (skill; partial): Reproduces bugs, traces symptoms to causes, and rejects unsupported symptom guards. Debug Investigation overlaps but has its own evidence packet and proof boundaries.
- [principle-migrate-callers-then-delete-legacy-apis](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md#L2) (skill; partial): Inventories callers, migrates them, and removes the old internal API in the same refactor wave. Local plans model cutovers and the repo requires hard cutover, but no dedicated caller-migration skill exists.
- [principle-never-block-on-the-human](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-never-block-on-the-human/SKILL.md#L2) (skill; partial): Proceeds with reversible work and reserves pauses for irreversible actions or genuine product-direction calls. Local owner-decision and merge gates retain user authority; broad autonomy conflicts if applied to publication or merge.
- [principle-outcome-oriented-execution](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-outcome-oriented-execution/SKILL.md#L2) (skill; partial): Sequences rewrites toward a verified target and permits only planned, scoped, reversible intermediate breakage. Local planning preserves accepted obligations and does not use the same broad migration principle.
- [principle-prove-it-works](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-prove-it-works/SKILL.md#L2) (skill; partial): Checks the real artifact directly and prefers deterministic scripts whose outputs a reviewer can rerun. Local phases require fitting proof through obligation and runtime layers rather than this standalone maxim.
- [principle-sequence-verifiable-units](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-sequence-verifiable-units/SKILL.md#L2) (skill; partial): Brackets units with a known-good baseline and check, then orders commits or PRs so the sequence proves the change. Local plans name slice gates and proof maps but not this history-storytelling contract.
- [tdd](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/tdd/SKILL.md#L2) (skill; partial): For cheap bug tests, writes a failing regression before the fix and uses the closest real check when a new test is impractical. Local behavior changes require scenario-first proof, but no standalone TDD skill owns this route.
- [reproduce-and-fix-issues](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md#L2) (automation-skill; partial): Waits for a trusted Slack marker, reproduces a symptom twice in real UI, verifies existing fixes, and may open a bounded draft PR. Local debugging/UI tools cover pieces but not Slack-triggered credential-isolated reproduction automation.
- [Autonomous run](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autonomous-run.md#L1) (playbook; partial): Defines an exit predicate, chooses a wake mechanism, verifies each iteration, and logs progress. Local orchestration separates plan, execution, review, and external authority.
- [Bug fix](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/bug-fix.md#L1) (playbook; partial): Reproduces on the real surface, eliminates hypotheses with runtime evidence, fixes cause, and proves the same repro passes. Local debugging diagnoses and plan execution fixes in separate authorized phases.
- [Feature](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/feature.md#L1) (playbook; partial): Grounds a feature, explores architecture, decomposes work, delegates implementation, and verifies on the matching surface. Local flow requires distinct reviewed design and immutable plan inputs.
- [Refactoring](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/refactoring.md#L1) (playbook; partial): Pins behavior, subtracts complexity, migrates/deletes legacy callers, proves equivalence, and measures reader-load reduction. Local phases prove obligations but lack a dedicated characterization-first equivalence/reader-load route.

**matt:**

- [implement](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/implement/SKILL.md#L7) (skill; partial): Implements a spec or ticket, uses TDD at pre-agreed seams where possible, runs checks, requests code review, and commits on the current branch. Local execution requires one admitted immutable plan and keeps PR state separate from implementation.
- [tdd](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/tdd/SKILL.md#L8) (skill; partial): Defines red-green testing through public interfaces, with pre-agreed seams, vertical slices, and test-quality rules. Local implementation plan and repository testing rules govern red/green proof; no active standalone TDD skill owns this exact source procedure.
- [implement-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) (skill; partial): Runs a nine-step single-branch task graph with per-ticket worktrees, implementer and merger subagents, frontier expansion, review, and cleanup; the pinned file does not explicitly call TDD. Local plan and design stay Lead-authored; local assigns one persistent implementer per planned PR assignment, has no per-ticket merger subagent, and merge requires user authority.

**osmani:**

- [Spec-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/spec-driven-development/SKILL.md#L22) (skill; partial): Gates a capability map when a request contains independently testable modules, then runs human-reviewed specification, plan, task, and implementation phases. The local workflow separates Requirements, observable Specification, structural Program Design, planning, and execution into distinct owners. Addy's single skill spans these artifacts and prescribes per-phase human approval, so its process cannot be copied as one local owner.
- [Constraint-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/constraint-driven-development/SKILL.md#L93) (skill; partial): Elicits a bounded quality-bar choice, persists it as root CONSTRAINTS.md, ties dimensions to concrete tools and lifecycle costs, and guards against weakening the recorded bar. Local design records authorized constraints in Requirements, Specification, and Program Design; implementation preserves plan constraints. No named current local skill creates this separate numeric quality-bar file or diff guard. Source spells the file CONSTRAINTS.md, uppercase.
- [Planning and Task Breakdown](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/planning-and-task-breakdown/SKILL.md#L22) (skill; partial): Builds a dependency graph and decomposes it into vertical, verifiable tasks with acceptance criteria, checks, dependencies, and checkpoints. The local planner consumes reviewed Requirements, Specification, and Program Design and writes one canonical plan with proof gates. Addy's default `tasks/plan.md` and `tasks/todo.md` conventions are not local authority; local plans may point to an external tracker.
- [Context Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/context-engineering/SKILL.md#L20) (skill; partial): Organizes persistent rules, specs, source, errors, and conversation into a context hierarchy, with selective loading, fresh-session boundaries, and context-budget management. Local phase skills require bounded reads and durable decision/plan state, but there is no single local context-curation skill. Do not import the generic 75% threshold or treat Addy's context-management advice as a replacement for current plan and trace authority.
- [Source-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/source-driven-development/SKILL.md#L27) (skill; partial): Detects exact framework versions, fetches specific official documentation, implements documented patterns, and cites sources while surfacing conflicts or unverified behavior. Local research and design phases gather current external evidence, but no active local skill requires every framework-specific implementation decision to carry official-doc citations. Apply only when that evidence is in scope.
- [Incremental Implementation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/incremental-implementation/SKILL.md#L21) (skill; partial): Implements thin slices with test, verification, and a commit before proceeding, preferring vertical and risk-first slices and scope discipline. Local implementation executes an immutable authorized plan and its proof gates, but does not require a commit after each slice. Addy's incomplete-feature flags, rollback approach, and compatibility practices cannot override the owner-supplied no-gradual-compatibility instruction or plan boundary.
- [Test-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/test-driven-development/SKILL.md#L38) (skill; partial): Uses RED–GREEN–REFACTOR, requires a failing reproduction for behavior bugs, and advises a test pyramid of roughly 80% unit, 15% integration, and 5% end-to-end tests. The local implementation plan uses red/green when required and selects fitting proof from the accepted plan; local debugging seeks a durable failing reproduction when it fits. No fixed 80/15/5 ratio appears in these local skills. Keep TDD scoped to behavioral changes; Addy's own NOT-use clause excludes cosmetic/config/docs changes without behavioral effect.
- [Debugging and Error Recovery](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/debugging-and-error-recovery/SKILL.md#L21) (skill; covered): Stops feature work, preserves failure evidence, reproduces/localizes/reduces the issue, fixes root cause, adds a regression guard, and verifies the full scenario. The local debug skill covers the diagnosis-first root-cause loop and adds read-only investigation, ranked hypotheses, bounded agents, deterministic monitoring, and an artifact. Its fix and proof phase is owned separately by the plan executor; the legacy source's sleep/artificial-delay suggestion is not local proof authority.
- [Code Simplification](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/code-simplification/SKILL.md#L105) (skill; partial): Requires understanding callers, tests, edge cases, and possible historical reasons before a behavior-preserving incremental simplification; specifically asks the reader to check git blame for original context. The source does not prescribe proving why a specific guard exists by tracing blame, all history, and tests. Local Program Design checks accepted-requirement coverage after deleting/simplifying mechanisms, but there is no dedicated local simplification workflow or blame-history requirement.
- [Git Workflow and Versioning](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/git-workflow-and-versioning/SKILL.md#L34) (skill; partial): Recommends small atomic commits, short-lived branches, pre-commit checks, history-based debugging, semantic versions, tags, and human-facing changelogs. Local plan execution protects write scope and proof; PR wrap-up manages push, PR state, reviews, and checks. No local general commit/versioning workflow owns Addy's per-slice commits, release tags, or semver. Do not infer commit or push authority from this inspiration.
- [CI/CD and Automation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/ci-cd-and-automation/SKILL.md#L24) (skill; partial): Defines automated lint/type/test/build/security gates, CI feedback loops, deployment environments, previews, rollbacks, and pipeline optimization. Implementation PR wrap-up verifies current checks and PR readiness but does not author CI pipelines or deploy workflows. Local plan proof is scoped to the accepted plan.
- [Deprecation and Migration](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/deprecation-and-migration/SKILL.md#L67) (skill; partial): Plans consumer migration, replacement proof, phased removal, and expand/migrate/contract schema changes with adapters, dual writes, feature flags, and down paths. Local design can state migration contracts, ownership and failure behavior, but the owner-supplied instructions require hard cutover with no compatibility layer or gradual dual path. Addy's adapters, dual writes, and flags conflict with that rule and are not adoptable without an owner decision.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep source; first prove implementer completion of its own required proof. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 14 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 706 core words; 1,068 local reference words; 14 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [execution-and-proof.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implement-plan/references/execution-and-proof.md#L1)
- [canonical-implementation-plan.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/shared-references/canonical-implementation-plan.md#L1)

## orchestrator-implementation-goal

**Stage:** Build. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-implementation-goal/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when starting, resuming, auditing, or completing an implementation delivery goal across planning, implementation, review, and PR readiness. Not for a design-only cycle or one direct phase.

- Keeps whole-goal design, plan, integration, assessment, and terminal ownership with the Lead while delegating bounded execution and independent review.
- Defines a full evidence path from requested terminal through plan, proof, review, and PR readiness.

### Related trio mechanisms

**pstack:**

- [figure-it-out](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/figure-it-out/SKILL.md#L2) (skill; partial): Designs an auditable bespoke run with a falsifiable predicate, verification harness, risk-ordered units, experiment loop, and decision trail. Local planning and implementation use distinct artifact owners and phase boundaries.
- [Poteto Mode](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/SKILL.md#L2) (skill; partial): Routes work to Cursor-specific principles and playbooks and defines autonomy, agent, reporting, and shipping triggers. Local ownership separates Lead, implementation, review, and user merge authority; current upstream also changes its agent defaults.
- [principle-never-block-on-the-human](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-never-block-on-the-human/SKILL.md#L2) (skill; partial): Proceeds with reversible work and reserves pauses for irreversible actions or genuine product-direction calls. Local owner-decision and merge gates retain user authority; broad autonomy conflicts if applied to publication or merge.
- [principle-sequence-verifiable-units](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-sequence-verifiable-units/SKILL.md#L2) (skill; partial): Brackets units with a known-good baseline and check, then orders commits or PRs so the sequence proves the change. Local plans name slice gates and proof maps but not this history-storytelling contract.
- [Autonomous run](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autonomous-run.md#L1) (playbook; partial): Defines an exit predicate, chooses a wake mechanism, verifies each iteration, and logs progress. Local orchestration separates plan, execution, review, and external authority.
- [Autopilot-full](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-full.md#L1) (playbook; partial): Assigns a PR owner and parallel verifiers, fix-forwards findings through fresh rounds, then merges after an authorized clean verdict. Local user merge authority remains explicit; current pstack adds fresh owners, per-unit pushes, and merge-frontier checks.
- [Autopilot-stack](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-stack.md#L1) (playbook; partial): Builds a verified linear PR stack with root-owned topology and leaves review/landing to the operator. Local orchestration supports staged PR delivery but does not share this stack topology contract.
- [Multi-phase or multi-PR plan](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/multi-phase-plan.md#L1) (playbook; partial): Authors a PR-by-PR plan with unit, live, performance, regression, and operator review gates. Local canonical plans map specification obligations to proof-bearing slices with different authority.
- [Orchestrate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L1) (playbook; partial): Coordinates a long-lived program with coordinator, tracks, workers, verifiers, queue/frontier state, and a verification ledger. Local orchestration separates these roles across phases and retains user merge authority.

**matt:**

- [ask-matt](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/ask-matt/SKILL.md#L13) (skill; partial): Routes the user through the main idea-to-ship flow, on-ramps, standalone skills, and vocabulary references. It distinguishes a spec/ticket build from a one-session implementation. Local orchestrators route bounded design and delivery goals; neither is a global router over the full active skill set.
- [implement-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) (skill; partial): Runs a nine-step single-branch task graph with per-ticket worktrees, implementer and merger subagents, frontier expansion, review, and cleanup; the pinned file does not explicitly call TDD. Local plan and design stay Lead-authored; local assigns one persistent implementer per planned PR assignment, has no per-ticket merger subagent, and merge requires user authority.

**osmani:**

- [Using Agent Skills](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/using-agent-skills/SKILL.md#L12) (skill; non-sdlc): Classifies incoming work by phase, routes to named skills, and states operating behaviors that apply across the pack. Its lifecycle order is opinionated and can invoke many skills for a full feature. This is a meta skill-discovery layer. The local repo uses a layered skill index and separate orchestrators/practices; no single active local skill owns this same broad intent router.
- [Incremental Implementation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/incremental-implementation/SKILL.md#L21) (skill; partial): Implements thin slices with test, verification, and a commit before proceeding, preferring vertical and risk-first slices and scope discipline. Local implementation executes an immutable authorized plan and its proof gates, but does not require a commit after each slice. Addy's incomplete-feature flags, rollback approach, and compatibility practices cannot override the owner-supplied no-gradual-compatibility instruction or plan boundary.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep source; first prove actual Lead diff/proof assessment before review. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD plus the goal contract reference. A sibling design report identifies a separate orchestrator-design continuation boundary issue for Lead synthesis; no evals were run and no local behavior/pass claim is made.

Corpus size: 1,578 core words; 1,376 local reference words; 17 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [goal-contract-and-routing.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/orchestrator-implementation-goal/references/goal-contract-and-routing.md#L1)
- [local-design-quality.md](local-design-quality.md:1)

## scaffold-project

**Stage:** Build. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/ai-scaffold/skills/scaffold-project/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when scaffolding or initializing a new project or repo, retrofitting one with standard configs, or adding linting, formatting, type checks, or tests (vitest, playwright, pytest) or agent rules such as oxlint, ruff, cursor rules, or CLAUDE.md.

- The ask-first/execute-once intent and supported project types are easy to identify.
- The plugin-root script owns deterministic file generation, while the template inventory is kept in a separate reference.

### Related trio mechanisms

**pstack:**

- [create-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/create-verification-skill/SKILL.md#L2) (skill; partial): Interviews a target repo and generates a project-local app driver with launch, doctor, drive, evidence, cleanup, and feature-map instructions. Local UI/scaffolding tools provide pieces; no active skill generates and seeds a project verifier.
- [principle-test-behavior-not-implementation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-test-behavior-not-implementation/SKILL.md#L2) (skill; partial): Rejects tests that assert only calls, constants, mocks, or fixtures and requires user-observable outcomes. Local proof design tests real behavior but has no active skill owning this exact tautology test.
- [principle-type-system-discipline](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-type-system-discipline/SKILL.md#L2) (skill; partial): Uses typed variants, semantic newtypes, boundary parsing, and exhaustive matching to make invalid states unrepresentable. The repo's agent instructions carry language-specific type rules; active skills lack this general leaf.
- [tdd](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/tdd/SKILL.md#L2) (skill; partial): For cheap bug tests, writes a failing regression before the fix and uses the closest real check when a new test is impractical. Local behavior changes require scenario-first proof, but no standalone TDD skill owns this route.
- [typescript-best-practices](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/typescript-best-practices/SKILL.md#L2) (skill; partial): Applies type discipline, boundary schemas, real tests, and telemetry rules to TypeScript files. Local TypeScript conventions live in repo instructions and scaffolding, not a dedicated active TS skill.

**matt:**

- [setup-matt-pocock-skills](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/setup-matt-pocock-skills/SKILL.md#L9) (skill; partial): Configures an issue tracker, triage labels, and CONTEXT/ADR layout after repository inspection and a user confirmation step. Local scaffold-project is general setup; Linear tracking is only one tracker operation. Neither owns Matt's per-repo setup output.
- [setup-ts-deep-modules](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/setup-ts-deep-modules/SKILL.md#L9) (skill; partial): Installs dependency-cruiser rules that make package subfolders private and proves the boundary rule with pass/fail/pass checks. Local scaffolding is generic; no active skill owns this dependency-cruiser and deep-module setup recipe.
- [setup-pre-commit](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/misc/setup-pre-commit/SKILL.md#L8) (skill; partial): Configures Husky and lint-staged with formatting, typechecking, and tests at commit time. Local scaffolding covers generic config/tooling setup, not this exact Husky contract.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

- Proven source-wiring contradiction: the upfront retrofit batch offers skip or overwrite-all, Step 3 does not pass the selected overwrite choice to the script, Step 4 instead offers skip or prompt-per-file, and the script only defaults to skip or accepts --overwrite. The default skip behavior is a positive control; data loss is not established.
- Cross-client invocation is unresolved: the skill's only named question tool and plugin-root expression are AskUserQuestion and CLAUDE_PLUGIN_ROOT, while marketplace entries expose this plugin through Codex, Claude, and Cursor; runtime impact is unverified.
- The completion section reports created/skipped paths but does not require post-run readback or validation of the selected configuration.

R02: connect the retrofit choice to the existing command. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete SKILL.md and OpenAI metadata inspection at the assigned HEAD; read template inventory partially (lines 1-220 of 274), and inspected the actual scaffold script plus marketplace entries. Inventory lists zero active pressure scenarios; no script execution, eval, or runtime behavior is claimed.

Corpus size: 1,545 core words; 1,085 local reference words; 0 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [template-inventory.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/ai-scaffold/skills/scaffold-project/references/template-inventory.md#L1)
- [scaffold-project.sh](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/ai-scaffold/scripts/scaffold/scaffold-project.sh#L1)
- [marketplace.json](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/.agents/plugins/marketplace.json#L1)
- [marketplace.json](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/.claude-plugin/marketplace.json#L1)
- [marketplace.json](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/.cursor-plugin/marketplace.json#L1)

## debug-investigation

**Stage:** Verify. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/debug-investigation/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when investigating bugs, failing tests, flaky behavior, crashes, regressions, build failures, unexpected behavior, long-running monitor/watch requests, or requests to debug/root-cause a problem before implementing fixes.

- Requires diagnosis before fixes and separates evidence-backed hypotheses from speculation.
- Defines when to create a debug artifact and requires reproduction or an explicit boundary on what is not proven.

### Related trio mechanisms

**pstack:**

- [blast-radius](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/blast-radius/SKILL.md#L2) (skill; partial): Finds breakage beyond a diff and proves the safety-critical fact by executing real code or the running app. Review checks changed-system reachability and proof but not this one-fact blast-radius contract.
- [principle-attack-the-premise](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-attack-the-premise/SKILL.md#L2) (skill; partial): After repeated failures under one premise, records it, scripts an actor census, and removes the assignment asymmetry. Local debugging ranks root-cause hypotheses but has no required repeated-failure census.
- [principle-fix-root-causes](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-fix-root-causes/SKILL.md#L2) (skill; partial): Reproduces bugs, traces symptoms to causes, and rejects unsupported symptom guards. Debug Investigation overlaps but has its own evidence packet and proof boundaries.
- [tdd](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/tdd/SKILL.md#L2) (skill; partial): For cheap bug tests, writes a failing regression before the fix and uses the closest real check when a new test is impractical. Local behavior changes require scenario-first proof, but no standalone TDD skill owns this route.
- [reproduce-and-fix-issues](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md#L2) (automation-skill; partial): Waits for a trusted Slack marker, reproduces a symptom twice in real UI, verifies existing fixes, and may open a bounded draft PR. Local debugging/UI tools cover pieces but not Slack-triggered credential-isolated reproduction automation.
- [triage-issue-reports](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/triage-issue-reports/SKILL.md#L2) (automation-skill; no-clear-owner): Classifies one Slack report, traces likely ownership, deduplicates a tracker issue, and posts one thread-only verdict. Local Router/Linear/debug skills do not own Slack-thread triage or source-coordinate safety.
- [Bug fix](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/bug-fix.md#L1) (playbook; partial): Reproduces on the real surface, eliminates hypotheses with runtime evidence, fixes cause, and proves the same repro passes. Local debugging diagnoses and plan execution fixes in separate authorized phases.
- [Investigation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/investigation.md#L1) (playbook; partial): Routes read-only architecture questions through how/why and returns a cited explanation or tradeoff recommendation. Local research and debugging have separate ledger and diagnosis contracts.
- [Perf issue](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/perf-issue.md#L1) (playbook; partial): Captures baseline and post-fix traces, ties hypotheses to trace signals, and requires measured PR evidence. Local design has performance proof seams but no dedicated measured perf-fix procedure.
- [Runtime forensics](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/runtime-forensics.md#L1) (playbook; partial): Captures live CPU, heap, or CDP evidence and maps the reduced mechanism back to source without fixing. Local observability targets shared OTel/Victoria, not generic CPU/heap/CDP forensics.
- [Trace forensics](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/trace-forensics.md#L1) (playbook; partial): Reduces captured CPU/trace/spindump/heap artifacts and attributes findings to source. No local active skill owns generic offline profiler parsing and source attribution.

**matt:**

- [diagnosing-bugs](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/diagnosing-bugs/SKILL.md#L18) (skill; partial): Requires a tight red-capable feedback loop before hypothesis generation, then reproduction, minimization, ranked hypotheses, instrumentation, fix, and regression proof. Local diagnosis is the nearest owner, but has distinct proof boundaries and runtime/event rules; do not transfer this source's sleep and polling advice without separate review.
- [prototype](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/prototype/SKILL.md#L8) (skill; no-clear-owner): Builds a disposable logic or UI artifact to answer one design question and captures the validated answer as a primary source. The local debug skill may use a throwaway harness for reproduction, but no active local skill owns this design-prototype workflow.

**osmani:**

- [Context Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/context-engineering/SKILL.md#L20) (skill; partial): Organizes persistent rules, specs, source, errors, and conversation into a context hierarchy, with selective loading, fresh-session boundaries, and context-budget management. Local phase skills require bounded reads and durable decision/plan state, but there is no single local context-curation skill. Do not import the generic 75% threshold or treat Addy's context-management advice as a replacement for current plan and trace authority.
- [Test-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/test-driven-development/SKILL.md#L38) (skill; partial): Uses RED–GREEN–REFACTOR, requires a failing reproduction for behavior bugs, and advises a test pyramid of roughly 80% unit, 15% integration, and 5% end-to-end tests. The local implementation plan uses red/green when required and selects fitting proof from the accepted plan; local debugging seeks a durable failing reproduction when it fits. No fixed 80/15/5 ratio appears in these local skills. Keep TDD scoped to behavioral changes; Addy's own NOT-use clause excludes cosmetic/config/docs changes without behavioral effect.
- [Debugging and Error Recovery](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/debugging-and-error-recovery/SKILL.md#L21) (skill; covered): Stops feature work, preserves failure evidence, reproduces/localizes/reduces the issue, fixes root cause, adds a regression guard, and verifies the full scenario. The local debug skill covers the diagnosis-first root-cause loop and adds read-only investigation, ranked hypotheses, bounded agents, deterministic monitoring, and an artifact. Its fix and proof phase is owned separately by the plan executor; the legacy source's sleep/artificial-delay suggestion is not local proof authority.
- [Observability and Instrumentation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/observability-and-instrumentation/SKILL.md#L25) (skill; partial): Designs telemetry from on-call questions, structured logs and entry-point attribution, RED/USE metrics, OpenTelemetry traces, symptom alerts, runbooks, and live telemetry verification. Local ops-observability-stack owns a shared local OTel/Victoria runtime, producer contract, and query loop. It does not prescribe this general app-level instrumentation and alert-authoring method; local requirements favor deterministic event ownership over inferred timing/idle.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

R07: conditional measured-performance depth when admitted. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 4 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 873 core words; 1,037 local reference words; 4 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## ops-observability-stack

**Stage:** Verify. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-observability-stack/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when starting, checking, using, debugging, or verifying the shared local OpenTelemetry and Victoria stack for AgentStudio, Agent VM, OpenClaw, beta apps, debug apps, or any repo that emits OTLP locally.

- Keeps shared stack lifecycle and producer responsibilities distinct, with strict debug launchers and fail-open ordinary app startup.
- Requires fresh markers, current service/worktree identity, producer-first scrubbing, and inconclusive status on timed-out queries.

### Related trio mechanisms

**pstack:**

- [Hillclimb](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/hillclimb.md#L1) (playbook; partial): Freezes a sensitive workload and metric harness, then keeps or reverts one measured hypothesis per iteration. Local design models performance budgets, but no active local skill owns this optimization loop.
- [Perf issue](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/perf-issue.md#L1) (playbook; partial): Captures baseline and post-fix traces, ties hypotheses to trace signals, and requires measured PR evidence. Local design has performance proof seams but no dedicated measured perf-fix procedure.
- [Runtime forensics](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/runtime-forensics.md#L1) (playbook; partial): Captures live CPU, heap, or CDP evidence and maps the reduced mechanism back to source without fixing. Local observability targets shared OTel/Victoria, not generic CPU/heap/CDP forensics.
- [Trace forensics](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/trace-forensics.md#L1) (playbook; partial): Reduces captured CPU/trace/spindump/heap artifacts and attributes findings to source. No local active skill owns generic offline profiler parsing and source attribution.

**matt:** no mapped counterpart in this census.
**osmani:**

- [Performance Optimization](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/performance-optimization/SKILL.md#L30) (skill; partial): Establishes a baseline, identifies a measured bottleneck, changes one variable, remeasures against variance, reverts neutral/worse changes, and adds a regression guard. Local design can express performance obligations and proof seams, and ops-observability-stack queries shared telemetry; there is no generic local profiling/optimization workflow or equivalent performance budget procedure in the assigned homes.
- [CI/CD and Automation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/ci-cd-and-automation/SKILL.md#L24) (skill; partial): Defines automated lint/type/test/build/security gates, CI feedback loops, deployment environments, previews, rollbacks, and pipeline optimization. Implementation PR wrap-up verifies current checks and PR readiness but does not author CI pipelines or deploy workflows. Local plan proof is scoped to the accepted plan.
- [Observability and Instrumentation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/observability-and-instrumentation/SKILL.md#L25) (skill; partial): Designs telemetry from on-call questions, structured logs and entry-point attribution, RED/USE metrics, OpenTelemetry traces, symptom alerts, runbooks, and live telemetry verification. Local ops-observability-stack owns a shared local OTel/Victoria runtime, producer contract, and query loop. It does not prescribe this general app-level instrumentation and alert-authoring method; local requirements favor deterministic event ownership over inferred timing/idle.
- [Shipping and Launch](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/shipping-and-launch/SKILL.md#L20) (skill; partial): Provides a production pre-launch checklist, staged rollouts, release monitoring, error-budget gates, and rollback plans. Local PR wrap-up proves GitHub PR readiness, not production deployment or release smoke; local observability operates a shared stack. Do not import autonomous deployment or merge authority from a release checklist.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD plus all five named observability references; inventory lists 2 active pressure scenarios; none were run and no runtime/pass claim is made.

Corpus size: 366 core words; 1,255 local reference words; 2 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [agentstudio-loop.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-observability-stack/references/agentstudio-loop.md#L1)
- [agent-vm-loop.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-observability-stack/references/agent-vm-loop.md#L1)
- [producer-contract.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-observability-stack/references/producer-contract.md#L1)
- [resource-naming.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-observability-stack/references/resource-naming.md#L1)
- [victoria-queries.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-observability-stack/references/victoria-queries.md#L1)

## peekaboo

**Stage:** Verify. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/dev-workflow-tools/skills/peekaboo/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when testing, inspecting, or automating native macOS UI with Peekaboo: screen or UI state, apps, windows, menus, text, clipboard, or Screen Recording and Accessibility permissions, including desktop app work a browser tool cannot reach.

- Requires live CLI discovery, explicit app/window targeting, and fresh snapshot IDs before interactions.
- Protects the user's desktop and sensitive UI artifacts, then captures UI again to verify the real change.

### Related trio mechanisms

**pstack:**

- [create-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/create-verification-skill/SKILL.md#L2) (skill; partial): Interviews a target repo and generates a project-local app driver with launch, doctor, drive, evidence, cleanup, and feature-map instructions. Local UI/scaffolding tools provide pieces; no active skill generates and seeds a project verifier.
- [maintain-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/maintain-verification-skill/SKILL.md#L2) (skill; partial): Maintains every feature-map entry through parallel source readers and a coordinator-owned live pass; fixes only verifier docs/maps/harnesses. Local docs maintenance does not own a project app verifier or require every mapped feature live.
- [reproduce-and-fix-issues](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md#L2) (automation-skill; partial): Waits for a trusted Slack marker, reproduces a symptom twice in real UI, verifies existing fixes, and may open a bounded draft PR. Local debugging/UI tools cover pieces but not Slack-triggered credential-isolated reproduction automation.
- [setup-benny](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/setup-benny/SKILL.md#L2) (automation-skill; no-clear-owner): Installs the dormant Benny pack, validates a project feature map/control adapter, and provisions two reviewed Cursor automations. Local skills do not manage Slack automation installation or its project-level configuration.
- [Visual parity](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/visual-parity.md#L1) (playbook; partial): Locks an untouched visual baseline and requires zero image difference after each component migration. Peekaboo has screenshot comparison primitives but no immutable baseline migration gate.

**matt:** no mapped counterpart in this census.
**osmani:**

- [Frontend UI Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/frontend-ui-engineering/SKILL.md#L20) (skill; no-clear-owner): Provides component structure, UI state, design-system adherence, responsive layout, accessibility, and rendered verification guidance. The inspected local workflow homes specify observable UI behavior and structural contracts or test macOS UI, but no current skill owns frontend implementation craft, CSS/component conventions, or accessibility checks end to end.
- [Browser Testing with DevTools](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/browser-testing-with-devtools/SKILL.md#L109) (skill; partial): Exercises browser behavior through Chrome DevTools MCP: reproduce, inspect DOM/console/network, diagnose, fix, then verify with screenshots and runtime signals. Peekaboo covers native macOS UI interaction and implementation review is read-only; neither supplies the same Chrome DevTools browser, console, network, screenshot, and accessibility-tree workflow.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 1 active pressure scenario; none were run and no UI/runtime/pass claim is made.

Corpus size: 726 core words; 2,640 local reference words; 1 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## implementation-review

**Stage:** Review. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-review/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when independently reviewing implemented code, proof, a branch diff, commit, PR head, or one bounded remediation before PR readiness, including when governing inputs are missing or conflicting. Not for design review (spec-program-review).

- Requires independent whole-map and whole-file inspection, with chunk seams that preserve callers and proof chains.
- Reduces findings against quoted governing rails and source-backed evidence, with cause-specific routes and explicit convergence stops.

### Related trio mechanisms

**pstack:**

- [arena](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/arena/SKILL.md#L2) (skill; partial): Creates parallel candidate artifacts, cross-judges them against a rubric, selects/grafts a base, and verifies the result. Local design and review separate candidate creation, judgment, integration, and acceptance.
- [blast-radius](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/blast-radius/SKILL.md#L2) (skill; partial): Finds breakage beyond a diff and proves the safety-critical fact by executing real code or the running app. Review checks changed-system reachability and proof but not this one-fact blast-radius contract.
- [create-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/create-verification-skill/SKILL.md#L2) (skill; partial): Interviews a target repo and generates a project-local app driver with launch, doctor, drive, evidence, cleanup, and feature-map instructions. Local UI/scaffolding tools provide pieces; no active skill generates and seeds a project verifier.
- [interrogate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/interrogate/SKILL.md#L2) (skill; partial): Runs independent multi-model code reviews on one prompt/rubric, then classifies and synthesizes findings without auto-applying them. Local review uses an independent reviewer and sequential obligation checks, not a multi-model reviewer panel.
- [Poteto Mode](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/SKILL.md#L2) (skill; partial): Routes work to Cursor-specific principles and playbooks and defines autonomy, agent, reporting, and shipping triggers. Local ownership separates Lead, implementation, review, and user merge authority; current upstream also changes its agent defaults.
- [principle-boundary-discipline](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-boundary-discipline/SKILL.md#L2) (skill; partial): Validates untrusted data at system boundaries and keeps internal business logic typed and pure. Program Design models trust boundaries but does not provide this general coding-principle leaf.
- [principle-guard-the-context-window](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-guard-the-context-window/SKILL.md#L2) (skill; partial): Routes bulk files and outputs away from the main context, keeps common instructions inline, and caps phase scope. Local delegation and research reduce evidence, but no general context-window principle owns this behavior.
- [principle-laziness-protocol](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-laziness-protocol/SKILL.md#L2) (skill; partial): Prefers deletion, flat calls, minimal diffs, and avoiding speculative abstractions or signal threading. Local design justifies mechanisms against obligations but lacks this universal deletion-first rule.
- [principle-minimize-reader-load](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-minimize-reader-load/SKILL.md#L2) (skill; partial): Reduces layers and hidden state and judges maintainability by how quickly a reader can trace ownership. Local design justifies components by obligations rather than a reader-load score.
- [principle-prove-it-works](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-prove-it-works/SKILL.md#L2) (skill; partial): Checks the real artifact directly and prefers deterministic scripts whose outputs a reviewer can rerun. Local phases require fitting proof through obligation and runtime layers rather than this standalone maxim.
- [principle-subtract-before-you-add](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-subtract-before-you-add/SKILL.md#L2) (skill; partial): Removes dead or redundant complexity before adding structure and rejects speculative validators or references. Local simplification is bounded by accepted obligations rather than a general subtract-first rule.
- [principle-test-behavior-not-implementation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-test-behavior-not-implementation/SKILL.md#L2) (skill; partial): Rejects tests that assert only calls, constants, mocks, or fixtures and requires user-observable outcomes. Local proof design tests real behavior but has no active skill owning this exact tautology test.
- [swarm](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/swarm/SKILL.md#L2) (skill; partial): Fans out parallel workers for slices or races, checks SHA/method receipts, aggregates outcomes, and returns one report. Local agent management owns role/session mechanics and parent verification, not this generic fan-out workflow; current wording says respawn.
- [reproduce-and-fix-issues](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md#L2) (automation-skill; partial): Waits for a trusted Slack marker, reproduces a symptom twice in real UI, verifies existing fixes, and may open a bounded draft PR. Local debugging/UI tools cover pieces but not Slack-triggered credential-isolated reproduction automation.
- [Autopilot-full](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-full.md#L1) (playbook; partial): Assigns a PR owner and parallel verifiers, fix-forwards findings through fresh rounds, then merges after an authorized clean verdict. Local user merge authority remains explicit; current pstack adds fresh owners, per-unit pushes, and merge-frontier checks.
- [Autopilot-stack](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-stack.md#L1) (playbook; partial): Builds a verified linear PR stack with root-owned topology and leaves review/landing to the operator. Local orchestration supports staged PR delivery but does not share this stack topology contract.
- [Babysit](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/babysit.md#L1) (playbook; partial): Drives one merge frontier through conflicts, review threads, CI, and forge-specific readiness, then stops before merge. Local PR wrap-up lacks pstack's watcher modes and queue-frontier policy.
- [Bug fix](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/bug-fix.md#L1) (playbook; partial): Reproduces on the real surface, eliminates hypotheses with runtime evidence, fixes cause, and proves the same repro passes. Local debugging diagnoses and plan execution fixes in separate authorized phases.
- [Eval](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/eval.md#L1) (playbook; partial): Runs blinded multi-model candidates and a judge, then checks transcript evidence and outputs. Local skill evals use pressure scenarios and structured checks rather than this candidate/judge experiment.
- [Refactoring](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/refactoring.md#L1) (playbook; partial): Pins behavior, subtracts complexity, migrates/deletes legacy callers, proves equivalence, and measures reader-load reduction. Local phases prove obligations but lack a dedicated characterization-first equivalence/reader-load route.
- [Shipping](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/shipping.md#L1) (playbook; partial): Verifies each PR independently, lands only the contiguous passing run, and refreshes verdict validity after every merge. Local PR wrap-up has an explicit user authorization gate and does not own this autonomous stack landing procedure.
- [Visual parity](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/visual-parity.md#L1) (playbook; partial): Locks an untouched visual baseline and requires zero image difference after each component migration. Peekaboo has screenshot comparison primitives but no immutable baseline migration gate.

**matt:**

- [code-review](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/code-review/SKILL.md#L6) (skill; partial): Reviews a fixed diff point on parallel Standards and Spec axes, then presents the two reports side by side. A missing spec skips only the Spec subagent. Local implementation review is plan-aware and uses sequential rail-anchored checks; it does not use this parallel two-axis reduction.
- [implement-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) (skill; partial): Runs a nine-step single-branch task graph with per-ticket worktrees, implementer and merger subagents, frontier expansion, review, and cleanup; the pinned file does not explicitly call TDD. Local plan and design stay Lead-authored; local assigns one persistent implementer per planned PR assignment, has no per-ticket merger subagent, and merge requires user authority.

**osmani:**

- [Doubt-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/doubt-driven-development/SKILL.md#L49) (skill; partial): For in-scope non-trivial decisions, isolates artifact and contract, invokes an adversarial fresh-context reviewer, reconciles findings against the artifact, and stops on bounded conditions. Local design and implementation reviews use fresh independent Review Sidekicks with source/plan/rail admission and sequential proof checks; they are separate review workflows, not an automatic per-decision Claim–Extract–Doubt–Reconcile–Stop loop. Addy's skill is not required for every task and excludes trivial/mechanical work.
- [Browser Testing with DevTools](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/browser-testing-with-devtools/SKILL.md#L109) (skill; partial): Exercises browser behavior through Chrome DevTools MCP: reproduce, inspect DOM/console/network, diagnose, fix, then verify with screenshots and runtime signals. Peekaboo covers native macOS UI interaction and implementation review is read-only; neither supplies the same Chrome DevTools browser, console, network, screenshot, and accessibility-tree workflow.
- [Code Review and Quality](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/code-review-and-quality/SKILL.md#L22) (skill; partial): Reviews correctness, readability/simplicity, architecture, security, and performance; orders and categorizes findings and checks the verification story. Local implementation review is anchored to confirmed obligations, an immutable plan, whole-file diff coverage, proof challenge, and findings reduction; design review is a separate phase. It does not substitute a generic five-axis checklist or authorize review findings without a governing rail.
- [Code Simplification](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/code-simplification/SKILL.md#L105) (skill; partial): Requires understanding callers, tests, edge cases, and possible historical reasons before a behavior-preserving incremental simplification; specifically asks the reader to check git blame for original context. The source does not prescribe proving why a specific guard exists by tracing blame, all history, and tests. Local Program Design checks accepted-requirement coverage after deleting/simplifying mechanisms, but there is no dedicated local simplification workflow or blame-history requirement.
- [Security and Hardening](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/security-and-hardening/SKILL.md#L21) (skill; partial): Maps trust boundaries and assets, writes abuse cases, then applies boundary validation, access-control, secrets, dependency, privacy, SSRF, and LLM hardening checks. Local Program Design models trust boundaries and observability/security obligations; ops-security-review routes explicit scans to official Codex Security workflows. The local security skill is an audit handoff, not this general implementation-hardening handbook.
- [Performance Optimization](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/performance-optimization/SKILL.md#L30) (skill; partial): Establishes a baseline, identifies a measured bottleneck, changes one variable, remeasures against variance, reverts neutral/worse changes, and adds a regression guard. Local design can express performance obligations and proof seams, and ops-observability-stack queries shared telemetry; there is no generic local profiling/optimization workflow or equivalent performance budget procedure in the assigned homes.
- [Deprecation and Migration](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/deprecation-and-migration/SKILL.md#L67) (skill; partial): Plans consumer migration, replacement proof, phased removal, and expand/migrate/contract schema changes with adapters, dual writes, feature flags, and down paths. Local design can state migration contracts, ownership and failure behavior, but the owner-supplied instructions require hard cutover with no compatibility layer or gradual dual path. Addy's adapters, dual writes, and flags conflict with that rule and are not adoptable without an owner decision.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD plus the named review references; inventory lists 22 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 1,401 core words; 4,876 local reference words; 22 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [coordination-and-chunking.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-review/references/coordination-and-chunking.md#L1)
- [lane-schema.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-review/references/lanes/lane-schema.md#L1)
- [finding-and-reduction.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-review/references/finding-and-reduction.md#L1)
- [reviewing-implementation.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-review/references/reviewing-implementation.md#L1)

## ops-security-review

**Stage:** Review. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/ops-security-review/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when the user asks for a security scan, security audit, threat model, vulnerability review, security diff scan, or remediation of one security finding.

- Routes security-primary work to the narrowest official scanner rather than inflating ordinary review lanes.
- Makes authorization, read-only scan scope, and reviewed-finding remediation boundaries explicit.

### Related trio mechanisms

**pstack:** no mapped counterpart in this census.
**matt:** no mapped counterpart in this census.
**osmani:**

- [Code Review and Quality](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/code-review-and-quality/SKILL.md#L22) (skill; partial): Reviews correctness, readability/simplicity, architecture, security, and performance; orders and categorizes findings and checks the verification story. Local implementation review is anchored to confirmed obligations, an immutable plan, whole-file diff coverage, proof challenge, and findings reduction; design review is a separate phase. It does not substitute a generic five-axis checklist or authorize review findings without a governing rail.
- [Security and Hardening](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/security-and-hardening/SKILL.md#L21) (skill; partial): Maps trust boundaries and assets, writes abuse cases, then applies boundary validation, access-control, secrets, dependency, privacy, SSRF, and LLM hardening checks. Local Program Design models trust boundaries and observability/security obligations; ops-security-review routes explicit scans to official Codex Security workflows. The local security skill is an audit handoff, not this general implementation-hardening handbook.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 1 active pressure scenario; none were run and no scan/runtime/pass claim is made.

Corpus size: 512 core words; 348 local reference words; 1 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## spec-program-review

**Stage:** Review. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/spec-program-review/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when independently reviewing a Specification, Program Design, or Requirements, Specification, and Program Design set, including reader understanding or readability, or deciding if a spec-only or program-only change needs review. Not for implementation review.

- Separates review admission, review modes, and independent read-only review authority.
- Requires full-target mode coverage, optional seam coverage, evidence-bounded checks, dispel, finding reduction, and semantic-owner routing.

### Related trio mechanisms

**pstack:**

- [arena](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/arena/SKILL.md#L2) (skill; partial): Creates parallel candidate artifacts, cross-judges them against a rubric, selects/grafts a base, and verifies the result. Local design and review separate candidate creation, judgment, integration, and acceptance.
- [interrogate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/interrogate/SKILL.md#L2) (skill; partial): Runs independent multi-model code reviews on one prompt/rubric, then classifies and synthesizes findings without auto-applying them. Local review uses an independent reviewer and sequential obligation checks, not a multi-model reviewer panel.

**matt:** no mapped counterpart in this census.
**osmani:**

- [Doubt-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/doubt-driven-development/SKILL.md#L49) (skill; partial): For in-scope non-trivial decisions, isolates artifact and contract, invokes an adversarial fresh-context reviewer, reconciles findings against the artifact, and stops on bounded conditions. Local design and implementation reviews use fresh independent Review Sidekicks with source/plan/rail admission and sequential proof checks; they are separate review workflows, not an automatic per-decision Claim–Extract–Doubt–Reconcile–Stop loop. Addy's skill is not required for every task and excludes trivial/mechanical work.
- [Code Review and Quality](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/code-review-and-quality/SKILL.md#L22) (skill; partial): Reviews correctness, readability/simplicity, architecture, security, and performance; orders and categorizes findings and checks the verification story. Local implementation review is anchored to confirmed obligations, an immutable plan, whole-file diff coverage, proof challenge, and findings reduction; design review is a separate phase. It does not substitute a generic five-axis checklist or authorize review findings without a governing rail.


### Concern and next disposition

- Efficiency hypothesis: the 3,642-word core plus 10,539 reference words across 22 refs set a substantial context ceiling; conditional checks make the actual loaded subset smaller, and runtime cost is unmeasured.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD; no references needed to settle the stated concerns were opened. Inventory lists 22 active pressure scenarios; no evals were run and no behavior or pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 3,642 core words; 10,539 local reference words; 22 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## implementation-handoff

**Stage:** Ship. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-handoff/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when packaging implementation state for another agent, reviewer, CLI, or future session: a copy-paste blurb, reviewer prompt, Claude/Gemini/Codex handoff, unfinished-work handoff, or post-implementation review packet.

- Requires current implementation state and proof instead of status-only prose.
- Preserves plan authority and routes review without launching it or transferring authorship.

### Related trio mechanisms

**pstack:**

- [recall](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/recall/SKILL.md#L2) (skill; partial): Reconstructs recent workspace context from transcripts/shared records and verifies surfaced branches, PRs, and tickets live. Local research and traces do not mine past chats into this output; current remote version was not fetched.
- [show-me-your-work](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/show-me-your-work/SKILL.md#L2) (skill; partial): Keeps an append-only TSV decision trail, audits it against the transcript, and requests independent cross-model trail review. The local practice uses a shared thread or wip trace, not a TSV transcript-audited log.
- [Pause safely](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/pause-safely.md#L1) (playbook; partial): Stops at an explicit boundary, preserves the working tree, and writes a cold-start resume note. Local traces/handoffs preserve state but do not prescribe an automatic WIP commit.
- [Session pickup](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/session-pickup.md#L1) (playbook; partial): Reads a prior transcript/branch, separates completed from pending work, verifies inherited claims, and routes continuation. Local handoffs package state but no active skill owns transcript-first pickup.

**matt:**

- [claude-handoff](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/claude-handoff/SKILL.md#L8) (skill; partial): Summarizes a session into a prompt and launches a background Claude agent to continue immediately. Local handoff skills package scoped evidence for a successor but do not launch another session.
- [handoff](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/handoff/SKILL.md#L8) (skill; partial): Writes a temporary handoff summary with suggested skills and pointers to existing artifacts. Local handoffs are phase-specific and retain canonical plan/design authority; this source writes a generic temporary summary.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 3 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 773 core words; 885 local reference words; 3 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## implementation-pr-wrapup

**Stage:** Ship. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-pr-wrapup/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when pushing, opening, updating, monitoring, or finishing a GitHub pull request after implementation: its description, checks, comments, review threads, mergeability, or \"merge when ready\". Not for fresh code review (implementation-review).

- Separates fresh review discovery from PR state, body quality, monitoring, and readiness.
- Uses head-tied description receipts and fresh final gates while keeping merge permission explicit.

### Related trio mechanisms

**pstack:**

- [Poteto Mode](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/SKILL.md#L2) (skill; partial): Routes work to Cursor-specific principles and playbooks and defines autonomy, agent, reporting, and shipping triggers. Local ownership separates Lead, implementation, review, and user merge authority; current upstream also changes its agent defaults.
- [principle-never-block-on-the-human](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-never-block-on-the-human/SKILL.md#L2) (skill; partial): Proceeds with reversible work and reserves pauses for irreversible actions or genuine product-direction calls. Local owner-decision and merge gates retain user authority; broad autonomy conflicts if applied to publication or merge.
- [unslop](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/unslop/SKILL.md#L2) (skill; partial): Edits prose to remove AI-style language, filler, formatting tells, hedging, and abstract jargon. Local humanizer covers selected human prose rather than a universal slop skill; current upstream file is unchanged.
- [Authoring or modifying a skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/authoring-a-skill.md#L1) (playbook; partial): Uses Cursor create-skill, validates links/frontmatter, tests structural changes, and opens a PR. Local skills-creation is a broader staged workflow with its own review and proof gates.
- [Autopilot-full](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-full.md#L1) (playbook; partial): Assigns a PR owner and parallel verifiers, fix-forwards findings through fresh rounds, then merges after an authorized clean verdict. Local user merge authority remains explicit; current pstack adds fresh owners, per-unit pushes, and merge-frontier checks.
- [Autopilot-stack](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-stack.md#L1) (playbook; partial): Builds a verified linear PR stack with root-owned topology and leaves review/landing to the operator. Local orchestration supports staged PR delivery but does not share this stack topology contract.
- [Babysit](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/babysit.md#L1) (playbook; partial): Drives one merge frontier through conflicts, review threads, CI, and forge-specific readiness, then stops before merge. Local PR wrap-up lacks pstack's watcher modes and queue-frontier policy.
- [Opening a PR](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/opening-a-pr.md#L1) (playbook; partial): Sets worktree, commit, PR body, forge, stack, readiness, and handoff rules for PR creation. Local PR lifecycle ownership is broader but not identical to pstack's opening conventions.
- [Shipping](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/shipping.md#L1) (playbook; partial): Verifies each PR independently, lands only the contiguous passing run, and refreshes verdict validity after every merge. Local PR wrap-up has an explicit user authorization gate and does not own this autonomous stack landing procedure.

**matt:**

- [implement-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) (skill; partial): Runs a nine-step single-branch task graph with per-ticket worktrees, implementer and merger subagents, frontier expansion, review, and cleanup; the pinned file does not explicitly call TDD. Local plan and design stay Lead-authored; local assigns one persistent implementer per planned PR assignment, has no per-ticket merger subagent, and merge requires user authority.
- [pr](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L12) (skill; partial): Requires a visual summary, before/after evidence, one-way/two-way door classification, and a one-word blast-radius summary. Local PR body uses a HEAD-tied Why/Special things/Change outline contract and does not require these fields. The Matt file credits Dex Horthy and Humanlayer.

**osmani:**

- [Git Workflow and Versioning](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/git-workflow-and-versioning/SKILL.md#L34) (skill; partial): Recommends small atomic commits, short-lived branches, pre-commit checks, history-based debugging, semantic versions, tags, and human-facing changelogs. Local plan execution protects write scope and proof; PR wrap-up manages push, PR state, reviews, and checks. No local general commit/versioning workflow owns Addy's per-slice commits, release tags, or semver. Do not infer commit or push authority from this inspiration.
- [CI/CD and Automation](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/ci-cd-and-automation/SKILL.md#L24) (skill; partial): Defines automated lint/type/test/build/security gates, CI feedback loops, deployment environments, previews, rollbacks, and pipeline optimization. Implementation PR wrap-up verifies current checks and PR readiness but does not author CI pipelines or deploy workflows. Local plan proof is scoped to the accepted plan.
- [Shipping and Launch](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/shipping-and-launch/SKILL.md#L20) (skill; partial): Provides a production pre-launch checklist, staged rollouts, release monitoring, error-budget gates, and rollback plans. Local PR wrap-up proves GitHub PR readiness, not production deployment or release smoke; local observability operates a shared stack. Do not import autonomous deployment or merge authority from a release checklist.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

R08: optional proof/risk visibility within the existing PR template. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD plus merge-gate and monitoring references; inventory lists 23 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 1,478 core words; 2,851 local reference words; 23 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [merge-gates.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-pr-wrapup/references/merge-gates.md#L1)
- [monitor-loop.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/implementation-pr-wrapup/references/monitor-loop.md#L1)

## docs-maintain

**Stage:** Retro & Maintenance. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/docs-maintain/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when updating, cleaning up, reconciling, archiving, or promoting project docs (AGENTS.md, README, changelogs, runbooks, architecture docs, workflow artifacts) from settled code or decisions. Not for authoring unsettled spec or design meaning.

- Owns durable documentation lifecycle while keeping active design, planning, review, debug, and handoff artifacts with their phase owners.
- Requires important doc claims to be verified against current source and classifies the source-of-truth driver before edits.

### Related trio mechanisms

**pstack:**

- [maintain-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/maintain-verification-skill/SKILL.md#L2) (skill; partial): Maintains every feature-map entry through parallel source readers and a coordinator-owned live pass; fixes only verifier docs/maps/harnesses. Local docs maintenance does not own a project app verifier or require every mapped feature live.
- [principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-encode-lessons-in-structure/SKILL.md#L2) (skill; partial): Turns repeated corrections into types, lints, metadata, runtime checks, or scripts and closes the learning loop. Local pressure tests encode workflow behavior but do not prescribe this strongest-mechanism ladder.
- [principle-minimize-reader-load](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-minimize-reader-load/SKILL.md#L2) (skill; partial): Reduces layers and hidden state and judges maintainability by how quickly a reader can trace ownership. Local design justifies components by obligations rather than a reader-load score.
- [technical-writing](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/technical-writing/SKILL.md#L2) (skill; partial): Applies Diataxis, Google developer style, STE, and Global English rules to technical documents. Docs Maintain rewrites existing docs through a humanizer reference, not this complete technical-writing manual.
- [unslop](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/unslop/SKILL.md#L2) (skill; partial): Edits prose to remove AI-style language, filler, formatting tells, hedging, and abstract jargon. Local humanizer covers selected human prose rather than a universal slop skill; current upstream file is unchanged.

**matt:** no mapped counterpart in this census.
**osmani:**

- [Git Workflow and Versioning](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/git-workflow-and-versioning/SKILL.md#L34) (skill; partial): Recommends small atomic commits, short-lived branches, pre-commit checks, history-based debugging, semantic versions, tags, and human-facing changelogs. Local plan execution protects write scope and proof; PR wrap-up manages push, PR state, reviews, and checks. No local general commit/versioning workflow owns Addy's per-slice commits, release tags, or semver. Do not infer commit or push authority from this inspiration.
- [Documentation and ADRs](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/documentation-and-adrs/SKILL.md#L23) (skill; partial): Records significant decisions with context, alternatives, consequences, and matching repository conventions; maintains API docs, README, changelog, and agent context. Local pathfinding records owner-confirmed decisions and docs-maintain reconciles established docs after decisions. Local design artifacts own normative meaning; Addy's generic ADR and README templates are not local authoring authority.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 2 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 728 core words; 1,135 local reference words; 2 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## skill-audit

**Stage:** Retro & Maintenance. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skill-audit/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when auditing existing skills, comparing admired upstream skill repositories, finding stale or duplicated skill behavior, or deciding which skills to create, update, merge, or skip from real session evidence.

- Requires real workflow evidence before create/update recommendations and keeps create/update/merge/skip distinct.
- Every proposed change carries trigger/ownership, core/reference/script shape, and pressure-coverage status.

### Related trio mechanisms

**pstack:**

- [automate-me](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/automate-me/SKILL.md#L2) (skill; partial): Mines recent workspace transcripts for repeated preferences, confirms intent, and drafts or updates one personal mode skill. Local skill creation requires a named behavior and confirmed need; it has no transcript-to-personal-mode wizard.
- [principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-encode-lessons-in-structure/SKILL.md#L2) (skill; partial): Turns repeated corrections into types, lints, metadata, runtime checks, or scripts and closes the learning loop. Local pressure tests encode workflow behavior but do not prescribe this strongest-mechanism ladder.
- [reflect](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/reflect/SKILL.md#L2) (skill; partial): Mines the active transcript with three reviewers, routes learnings to skill edits, and waits for approval before applying them. Local audit classifies portfolio evidence and skill creation edits one target; no current-transcript three-reviewer workflow exists.

**matt:**

- [retro](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/SKILL.md#L7) (skill; no-clear-owner): After a user-requested coding-session retrospective, presents environment-improvement candidates across seven categories; no edit step is present. Local skill-audit is a read-only portfolio decision workflow, not a general session retrospective. The source's seventh category is information access, not compaction loss.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

R06: tighten retrospective evidence and change placement. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD and read the skill-audit criteria themselves. Inventory lists 2 active pressure scenarios; none were run and no recommendation/pass claim is made.

Corpus size: 778 core words; 0 local reference words; 2 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## skills-creation

**Stage:** Retro & Maintenance. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skills-creation/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when creating, updating, or evaluating one named skill or accepted draft, or executing one run of an accepted multi-run skill-change spec, especially when its trigger, main path, references, steering, or proof need judgment.

- Gives one named-skill workflow a coherent trigger/main-path/depth/proof model and distinguishes it from portfolio audit.
- Separates intent, authoring permission, proposal review, implementation proof, Lead assessment, independent review, and ship claims.

### Related trio mechanisms

**pstack:**

- [automate-me](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/automate-me/SKILL.md#L2) (skill; partial): Mines recent workspace transcripts for repeated preferences, confirms intent, and drafts or updates one personal mode skill. Local skill creation requires a named behavior and confirmed need; it has no transcript-to-personal-mode wizard.
- [create-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/create-verification-skill/SKILL.md#L2) (skill; partial): Interviews a target repo and generates a project-local app driver with launch, doctor, drive, evidence, cleanup, and feature-map instructions. Local UI/scaffolding tools provide pieces; no active skill generates and seeds a project verifier.
- [maintain-verification-skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/maintain-verification-skill/SKILL.md#L2) (skill; partial): Maintains every feature-map entry through parallel source readers and a coordinator-owned live pass; fixes only verifier docs/maps/harnesses. Local docs maintenance does not own a project app verifier or require every mapped feature live.
- [principle-build-the-lever](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-build-the-lever/SKILL.md#L2) (skill; partial): Builds a rerunnable codemod, script, generator, or delegate skill for nontrivial work and proof. Plans can require scripts and proof artifacts, but there is no universal local lever principle.
- [principle-encode-lessons-in-structure](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-encode-lessons-in-structure/SKILL.md#L2) (skill; partial): Turns repeated corrections into types, lints, metadata, runtime checks, or scripts and closes the learning loop. Local pressure tests encode workflow behavior but do not prescribe this strongest-mechanism ladder.
- [reflect](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/reflect/SKILL.md#L2) (skill; partial): Mines the active transcript with three reviewers, routes learnings to skill edits, and waits for approval before applying them. Local audit classifies portfolio evidence and skill creation edits one target; no current-transcript three-reviewer workflow exists.
- [unslop](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/unslop/SKILL.md#L2) (skill; partial): Edits prose to remove AI-style language, filler, formatting tells, hedging, and abstract jargon. Local humanizer covers selected human prose rather than a universal slop skill; current upstream file is unchanged.
- [Authoring or modifying a skill](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/authoring-a-skill.md#L1) (playbook; partial): Uses Cursor create-skill, validates links/frontmatter, tests structural changes, and opens a PR. Local skills-creation is a broader staged workflow with its own review and proof gates.
- [Eval](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/eval.md#L1) (playbook; partial): Runs blinded multi-model candidates and a judge, then checks transcript evidence and outputs. Local skill evals use pressure scenarios and structured checks rather than this candidate/judge experiment.

**matt:**

- [retro](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/retro/SKILL.md#L7) (skill; no-clear-owner): After a user-requested coding-session retrospective, presents environment-improvement candidates across seven categories; no edit step is present. Local skill-audit is a read-only portfolio decision workflow, not a general session retrospective. The source's seventh category is information access, not compaction loss.
- [writing-for-agents](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/productivity/writing-for-agents/SKILL.md#L6) (skill; partial): Provides general writing guidance for agent-consumed documents, including pointers, information hierarchy, completion criteria, leading words, and pruning. Local skills-creation adapts authoring to one named skill and adds pressure proof, platform mechanics, and review ownership.

**osmani:**

- [Using Agent Skills](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/using-agent-skills/SKILL.md#L12) (skill; non-sdlc): Classifies incoming work by phase, routes to named skills, and states operating behaviors that apply across the pack. Its lifecycle order is opinionated and can invoke many skills for a full feature. This is a meta skill-discovery layer. The local repo uses a layered skill index and separate orchestrators/practices; no single active local skill owns this same broad intent router.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

R09: preserve the core and calibrate evaluation-driven repairs. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD plus frontmatter, reference-placement, and pressure-testing references. Inventory lists 14 active pressure scenarios; none were run and no authoring/runtime/pass claim is made. Core context cost is high by count, but no harmful-cost defect is established.

Corpus size: 5,110 core words; 11,435 local reference words; 14 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [frontmatter-design.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skills-creation/references/frontmatter-design.md#L1)
- [reference-design.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skills-creation/references/reference-design.md#L1)
- [reference-lanes-design.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skills-creation/references/reference-lanes-design.md#L1)
- [pressure-testing.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/skills-creation/references/testing/pressure-testing.md#L1)

## agent-collaboration

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/agent-router/skills/agent-collaboration/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when operating the agent-collaboration CLI or MCP: identity and sessions, listing or searching projects, boards, topics, and threads, posting or reading messages, inbox, listen and wait, wakes and schedules, or recovering an uncertain mutation. Covers how to call the tool, not when or why to coordinate.

- Keeps tool syntax separate from workflow authority and uses the live MCP schema or narrow CLI help as the contract.
- Preserves exact identity and observed mutation stages, with explicit reconciliation instead of automatic replay.

### Related trio mechanisms

**pstack:**

- [setup-benny](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/setup-benny/SKILL.md#L2) (automation-skill; no-clear-owner): Installs the dormant Benny pack, validates a project feature map/control adapter, and provisions two reviewed Cursor automations. Local skills do not manage Slack automation installation or its project-level configuration.
- [triage-issue-reports](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/automations/benny/skills/triage-issue-reports/SKILL.md#L2) (automation-skill; no-clear-owner): Classifies one Slack report, traces likely ownership, deduplicates a tracker issue, and posts one thread-only verdict. Local Router/Linear/debug skills do not own Slack-thread triage or source-coordinate safety.

**matt:** no mapped counterpart in this census.
**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD plus board-operation and MCP-usage references. Inventory lists 4 active pressure scenarios; none were run and no tool/runtime/pass claim is made.

Corpus size: 1,493 core words; 1,479 local reference words; 4 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [message-board.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/agent-router/skills/agent-collaboration/references/message-board.md#L1)
- [mcp-usage.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/agent-router/skills/agent-collaboration/references/mcp-usage.md#L1)

## manage-agents

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Always use when delegating to subagents, agent teams, or parallel agents: choosing which agent and model take a job, or spawning, assigning, steering, resuming, waiting for, or verifying a Worker, Operator, Sidekick, Review Sidekick, or Advisor, including a fan-out across many units.

- Uses direction, span, and horizon to assign an appropriate role and model rather than delegating by file count.
- Separates mechanical Operator observation from Worker/Sidekick execution and Review Sidekick judgment, with evidence checks on return.

### Related trio mechanisms

**pstack:**

- [interrogate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/interrogate/SKILL.md#L2) (skill; partial): Runs independent multi-model code reviews on one prompt/rubric, then classifies and synthesizes findings without auto-applying them. Local review uses an independent reviewer and sequential obligation checks, not a multi-model reviewer panel.
- [Poteto Mode](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/SKILL.md#L2) (skill; partial): Routes work to Cursor-specific principles and playbooks and defines autonomy, agent, reporting, and shipping triggers. Local ownership separates Lead, implementation, review, and user merge authority; current upstream also changes its agent defaults.
- [principle-guard-the-context-window](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-guard-the-context-window/SKILL.md#L2) (skill; partial): Routes bulk files and outputs away from the main context, keeps common instructions inline, and caps phase scope. Local delegation and research reduce evidence, but no general context-window principle owns this behavior.
- [principle-separate-before-serializing-shared-state](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md#L2) (skill; partial): Gives concurrent actors distinct write targets first and serializes only when one shared target is a real invariant. Local parallel slices use disjoint writes and explicit owners but do not share this standalone rule.
- [setup-pstack](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/setup-pstack/SKILL.md#L2) (skill; no-clear-owner): Detects Cursor model slugs, asks for a reasoning budget, and writes an always-applied per-role model rule. Local agent management selects models per assignment but does not persist Cursor model rules.
- [swarm](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/swarm/SKILL.md#L2) (skill; partial): Fans out parallel workers for slices or races, checks SHA/method receipts, aggregates outcomes, and returns one report. Local agent management owns role/session mechanics and parent verification, not this generic fan-out workflow; current wording says respawn.
- [Autonomous run](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autonomous-run.md#L1) (playbook; partial): Defines an exit predicate, chooses a wake mechanism, verifies each iteration, and logs progress. Local orchestration separates plan, execution, review, and external authority.
- [Autopilot-full](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-full.md#L1) (playbook; partial): Assigns a PR owner and parallel verifiers, fix-forwards findings through fresh rounds, then merges after an authorized clean verdict. Local user merge authority remains explicit; current pstack adds fresh owners, per-unit pushes, and merge-frontier checks.
- [Autopilot-stack](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/autopilot-stack.md#L1) (playbook; partial): Builds a verified linear PR stack with root-owned topology and leaves review/landing to the operator. Local orchestration supports staged PR delivery but does not share this stack topology contract.
- [Feature](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/feature.md#L1) (playbook; partial): Grounds a feature, explores architecture, decomposes work, delegates implementation, and verifies on the matching surface. Local flow requires distinct reviewed design and immutable plan inputs.
- [Orchestrate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L1) (playbook; partial): Coordinates a long-lived program with coordinator, tracks, workers, verifiers, queue/frontier state, and a verification ledger. Local orchestration separates these roles across phases and retains user merge authority.
- [Worktree and simulator cleanup](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/worktree-cleanup.md#L1) (playbook; no-clear-owner): Audits worktree/simulator usage and prunes only state proven safe to remove. Manage-agents uses worktrees for delegation but does not own worktree or simulator reclamation.

**matt:**

- [implement-spec](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/implement-spec/SKILL.md#L7) (skill; partial): Runs a nine-step single-branch task graph with per-ticket worktrees, implementer and merger subagents, frontier expansion, review, and cleanup; the pinned file does not explicitly call TDD. Local plan and design stay Lead-authored; local assigns one persistent implementer per planned PR assignment, has no per-ticket merger subagent, and merge requires user authority.

**osmani:**

- [Using Agent Skills](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/using-agent-skills/SKILL.md#L12) (skill; non-sdlc): Classifies incoming work by phase, routes to named skills, and states operating behaviors that apply across the pack. Its lifecycle order is opinionated and can invoke many skills for a full feature. This is a meta skill-discovery layer. The local repo uses a layered skill index and separate orchestrators/practices; no single active local skill owns this same broad intent router.
- [Git Workflow and Versioning](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/git-workflow-and-versioning/SKILL.md#L34) (skill; partial): Recommends small atomic commits, short-lived branches, pre-commit checks, history-based debugging, semantic versions, tags, and human-facing changelogs. Local plan execution protects write scope and proof; PR wrap-up manages push, PR state, reviews, and checks. No local general commit/versioning workflow owns Addy's per-slice commits, release tags, or semver. Do not infer commit or push authority from this inspiration.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep source; first prove role/executor acceptance through the hierarchy pressure cases. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete current-source inspection at the assigned HEAD; inventory lists 30 active pressure scenarios; none were run and no behavior/pass claim is made.

Corpus size: 1,808 core words; 5,519 local reference words; 30 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.


## practices-collaboration

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-collaboration/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use at the start of a qualifying task to find the repository's board project and work thread, and whenever agents coordinate: messaging or commissioning a session, seats, message or post, waiting on another agent, or no board. Not for tool syntax.

- Makes supplied thread reuse, no-home gaps, roles, posting authority, and deliberate resolution explicit.
- Separates workflow placement from tool syntax and names a real dependency as the only reason to wait.

### Related trio mechanisms

No defensible skill-level counterpart was established. A local tool or operating boundary can be useful without an upstream workflow counterpart.
**pstack:** no mapped counterpart in this census.
**matt:** no mapped counterpart in this census.
**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD and read work-home-discovery and waiting/listening references. Inventory lists 9 active pressure scenarios; no collaboration/eval result is claimed. Trio mechanisms were not assessed from source reports.

Corpus size: 930 core words; 975 local reference words; 9 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [work-home-discovery.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-collaboration/references/work-home-discovery.md#L1)
- [waiting-and-listening.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-collaboration/references/waiting-and-listening.md#L1)

## practices-research

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when a task needs source gathering, prior-art research, current docs or web evidence, or memory, session-log, or saved-reader research before design, planning, review, or discussion can continue. Not for extracting unwritten owner meaning.

- Frames bounded evidence questions, re-anchors on local sources, separates evidence classes, and verifies load-bearing claims.
- Keeps design and downstream authorship with the receiving phase while providing progressive route, lane, and ledger references.

### Related trio mechanisms

**pstack:**

- [automate-me](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/automate-me/SKILL.md#L2) (skill; partial): Mines recent workspace transcripts for repeated preferences, confirms intent, and drafts or updates one personal mode skill. Local skill creation requires a named behavior and confirmed need; it has no transcript-to-personal-mode wizard.
- [how](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/how/SKILL.md#L2) (skill; partial): Explains subsystem behavior from source using bounded explorers and a compact onboarding account. Local system reconstruction is design input or reconvergence, not this read-only explainer.
- [principle-guard-the-context-window](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/principle-guard-the-context-window/SKILL.md#L2) (skill; partial): Routes bulk files and outputs away from the main context, keeps common instructions inline, and caps phase scope. Local delegation and research reduce evidence, but no general context-window principle owns this behavior.
- [recall](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/recall/SKILL.md#L2) (skill; partial): Reconstructs recent workspace context from transcripts/shared records and verifies surfaced branches, PRs, and tickets live. Local research and traces do not mine past chats into this output; current remote version was not fetched.
- [reflect](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/reflect/SKILL.md#L2) (skill; partial): Mines the active transcript with three reviewers, routes learnings to skill edits, and waits for approval before applying them. Local audit classifies portfolio evidence and skill creation edits one target; no current-transcript three-reviewer workflow exists.
- [swarm](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/swarm/SKILL.md#L2) (skill; partial): Fans out parallel workers for slices or races, checks SHA/method receipts, aggregates outcomes, and returns one report. Local agent management owns role/session mechanics and parent verification, not this generic fan-out workflow; current wording says respawn.
- [why](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/why/SKILL.md#L2) (skill; partial): Searches source control and available external evidence categories in parallel to explain code history and motivation. Local research gathers ordered evidence but does not perform this required rationale sweep.
- [Investigation](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/investigation.md#L1) (playbook; partial): Routes read-only architecture questions through how/why and returns a cited explanation or tradeoff recommendation. Local research and debugging have separate ledger and diagnosis contracts.

**matt:**

- [research](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/engineering/research/SKILL.md#L6) (skill; partial): Delegates reading legwork to a background agent that follows claims to primary sources and writes one cited Markdown artifact. Local research assigns the complete evidence walk and ledger to one researcher; it does not dispatch a background writer.

**osmani:**

- [Context Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/context-engineering/SKILL.md#L20) (skill; partial): Organizes persistent rules, specs, source, errors, and conversation into a context hierarchy, with selective loading, fresh-session boundaries, and context-budget management. Local phase skills require bounded reads and durable decision/plan state, but there is no single local context-curation skill. Do not import the generic 75% threshold or treat Addy's context-management advice as a replacement for current plan and trace authority.
- [Source-Driven Development](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/source-driven-development/SKILL.md#L27) (skill; partial): Detects exact framework versions, fetches specific official documentation, implements documented patterns, and cites sources while surfacing conflicts or unverified behavior. Local research and design phases gather current external evidence, but no active local skill requires every framework-specific implementation decision to carry official-doc citations. Apply only when that evidence is in scope.


### Concern and next disposition

- Source inconsistency: the evidence-ledger token template allows `none` and `blocked`, while the skill's required token list and shared token table define neither.

R03/R06: align completion and historical-evidence contracts. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD and read tool routing, lane packets, evidence ledger, countercheck, and shared phase tokens. Read all three current pressure scenarios; no evals were run. Trio mechanisms were not assessed from source reports.

Corpus size: 570 core words; 1,121 local reference words; 3 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [tool-routing.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/references/tool-routing.md#L1)
- [lane-packets.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/references/lane-packets.md#L1)
- [evidence-ledger.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/references/evidence-ledger.md#L1)
- [countercheck.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-research/references/countercheck.md#L1)
- [phase-return-tokens.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/shared-references/phase-return-tokens.md#L1)

## practices-show-me-your-work

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-show-me-your-work/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use at the start of a qualifying task to open or resume the work trace; while one is open, to record a decision, evidence, blocker, or outcome or to hand off; or when the user asks to show your work or for a trail. Not for routine small edits.

- Keeps trace claims subordinate to source and proof and assigns trace ownership by Lead/Sidekick/worker role.
- Defines meaningful checkpoints, exact pre-board transfer, and a bounded readable view with cutoff and gaps.

### Related trio mechanisms

**pstack:**

- [figure-it-out](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/figure-it-out/SKILL.md#L2) (skill; partial): Designs an auditable bespoke run with a falsifiable predicate, verification harness, risk-ordered units, experiment loop, and decision trail. Local planning and implementation use distinct artifact owners and phase boundaries.
- [recall](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/recall/SKILL.md#L2) (skill; partial): Reconstructs recent workspace context from transcripts/shared records and verifies surfaced branches, PRs, and tickets live. Local research and traces do not mine past chats into this output; current remote version was not fetched.
- [show-me-your-work](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/show-me-your-work/SKILL.md#L2) (skill; partial): Keeps an append-only TSV decision trail, audits it against the transcript, and requests independent cross-model trail review. The local practice uses a shared thread or wip trace, not a TSV transcript-audited log.
- [Orchestrate](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/orchestrate.md#L1) (playbook; partial): Coordinates a long-lived program with coordinator, tracks, workers, verifiers, queue/frontier state, and a verification ledger. Local orchestration separates these roles across phases and retains user merge authority.
- [Pause safely](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/pause-safely.md#L1) (playbook; partial): Stops at an explicit boundary, preserves the working tree, and writes a cold-start resume note. Local traces/handoffs preserve state but do not prescribe an automatic WIP commit.
- [Session pickup](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/poteto-mode/playbooks/session-pickup.md#L1) (playbook; partial): Reads a prior transcript/branch, separates completed from pending work, verifies inherited claims, and routes continuation. Local handoffs package state but no active skill owns transcript-first pickup.

**matt:** no mapped counterpart in this census.
**osmani:**

- [Context Engineering](https://github.com/addyosmani/agent-skills/blob/2686b620fc1fed2e8f60c704839c766b8594c6b6/skills/context-engineering/SKILL.md#L20) (skill; partial): Organizes persistent rules, specs, source, errors, and conversation into a context hierarchy, with selective loading, fresh-session boundaries, and context-budget management. Local phase skills require bounded reads and durable decision/plan state, but there is no single local context-curation skill. Do not import the generic 75% threshold or treat Addy's context-management advice as a replacement for current plan and trace authority.


### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD and read the Markdown-view reference. Inventory lists 10 active pressure scenarios; no eval or trace-runtime result is claimed. Trio mechanisms were not assessed from source reports.

Corpus size: 1,107 core words; 331 local reference words; 10 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [markdown-view.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/practices-show-me-your-work/references/markdown-view.md#L1)

## presentation-tui

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/presentation-tui/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when composing a substantial architecture, comparison, tradeoff, flow, or multi-section response, or when putting a design decision in front of the owner, on a monospace terminal or CLI host, or when the host is unknown: \"draw this out\", \"compare these\". Not for rendered chat (presentation-webui).

- Uses a distinct monospace/unknown-host trigger, with an explicit escape for short or exact-format answers.
- Sets progressive shape selection, Markdown atom rules, GFM comparison defaults, bounded local reference loading, and a before-send visual check.

### Related trio mechanisms

**pstack:**

- [bro](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/bro/SKILL.md#L2) (skill; non-sdlc): Restates the previous message in concise, jargon-free language. This conversational paraphrase command is outside the local SDLC skill set.
- [teach](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/teach/SKILL.md#L2) (skill; partial): Combines how and why findings into a plain explanation tailored to the reader's context. Local presentation skills set response medium but do not own this teaching-oriented how/why synthesis.
- [technical-writing](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/technical-writing/SKILL.md#L2) (skill; partial): Applies Diataxis, Google developer style, STE, and Global English rules to technical documents. Docs Maintain rewrites existing docs through a humanizer reference, not this complete technical-writing manual.

**matt:**

- [pr](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L12) (skill; partial): Requires a visual summary, before/after evidence, one-way/two-way door classification, and a one-word blast-radius summary. Local PR body uses a HEAD-tied Why/Special things/Change outline contract and does not require these fields. The Matt file credits Dex Horthy and Humanlayer.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD and read the shared Markdown presentation baseline. Inventory lists 7 active pressure scenarios; no evals were run and no rendering/pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 848 core words; 10,573 local reference words; 7 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [markdown-presentation-baseline.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/shared-references/markdown-presentation-baseline.md#L1)

## presentation-webui

**Stage:** Cross-cutting. **Current contract:** [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/presentation-webui/SKILL.md#L3). **Inspection:** complete.

### Purpose and strengths

Use when composing a substantial architecture, comparison, tradeoff, flow, or multi-section response, or when putting a design decision in front of the owner, on a rendered markdown chat host (Cursor chat, Claude.ai, ChatGPT): \"draw this out\", \"compare these\". Not for a monospace CLI (presentation-tui).

- Selects rendered proportional-font chat surfaces and routes unknown/monospace hosts to TUI.
- Uses Markdown-first structure and an ordered smallest-medium picker with concrete before-send checks.

### Related trio mechanisms

**pstack:**

- [bro](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/bro/SKILL.md#L2) (skill; non-sdlc): Restates the previous message in concise, jargon-free language. This conversational paraphrase command is outside the local SDLC skill set.
- [teach](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/teach/SKILL.md#L2) (skill; partial): Combines how and why findings into a plain explanation tailored to the reader's context. Local presentation skills set response medium but do not own this teaching-oriented how/why synthesis.
- [technical-writing](https://github.com/cursor/plugins/blob/ecc249f1e306fc64ddf83c7bed16cacf7c2239db/pstack/skills/technical-writing/SKILL.md#L2) (skill; partial): Applies Diataxis, Google developer style, STE, and Global English rules to technical documents. Docs Maintain rewrites existing docs through a humanizer reference, not this complete technical-writing manual.

**matt:**

- [pr](https://github.com/mattpocock/skills/blob/c55ee46073ed923f86ce59a5eb3b6d895095d1b7/skills/in-progress/pr/SKILL.md#L12) (skill; partial): Requires a visual summary, before/after evidence, one-way/two-way door classification, and a one-word blast-radius summary. Local PR body uses a HEAD-tied Why/Special things/Change outline contract and does not require these fields. The Matt file credits Dex Horthy and Humanlayer.

**osmani:** no mapped counterpart in this census.

### Concern and next disposition

No source defect was established by the bounded assessment; live compliance remains unverified.

Keep the current owner and boundary. Use fitting proof when behavior is changed. See [the report](report.md) and [hierarchy pressure cases](hierarchy-and-acceptance.md).

### Proof and context cost

Complete source inspection at the assigned HEAD, adjacent TUI trigger comparison, and read the shared Markdown presentation baseline. Inventory lists 4 active pressure scenarios; no evals were run and no rendering/pass claim is made. Trio mechanisms were not assessed from source reports.

Corpus size: 788 core words; 0 local reference words; 4 active scenario files. Shared references are outside this reference-word count. These are not loaded tokens or measured runtime cost.

Decisive references inspected:

- [markdown-presentation-baseline.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/shared-references/markdown-presentation-baseline.md#L1)
- [SKILL.md](https://github.com/ShravanSunder/ai-tools/blob/10ebacfb4ce72893196c87d51bc2271f72fe8922/plugins/shravan-dev-workflow/skills/presentation-tui/SKILL.md#L1)
