# Source-verified concept trees

The pond view contains the original pinned census: **pstack 73, Matt 38 and Osmani 25**, totaling **136 entries**. Each tree is rooted as pond → concept → semantic grouping → entry. The unified view repeats those same 136 identities; it is not another 136 skills. Placement is an editorial navigation choice, and a skill can serve more than its primary grouping. The [catalog](trio-correlation.md) and [CSV](correlation-matrix.csv) retain exact source URLs, kinds, local counterparts and gaps.

Pstack's 73 are 47 standard skills (23 of them principles), 3 dormant automation skills and 23 routed playbooks. Matt's 38 include the beta bucket at the older pin. Osmani's 25 are skill entrypoints. Agent definitions, command aliases and supporting references are distinct artifacts, not extra SKILL.md entrypoints.

Newer additions and the six-skill web-quality companion stay outside the pinned count. See [the coverage check](learning-coverage-check.md#name-kind-and-version-reconciliation) for all corrections and [supplemental artifacts](#supplemental-artifacts-outside-the-pinned-census) below for their placement.

## Pond-rooted trees

### pstack: 73 pinned entries

Pin: `ecc249f1e306fc64ddf83c7bed16cacf7c2239db`.

```text
pstack
├── Governance, routing and continuity
│   ├── Session continuity and human understanding
│   │   ├── bro
│   │   ├── pause-safely [playbook]
│   │   ├── session-pickup [playbook]
│   │   └── teach
│   ├── Workflow routing and onboarding
│   │   ├── poteto-mode
│   │   ├── setup-benny [dormant automation skill]
│   │   └── setup-pstack
│   └── Autonomy, context and decision traces
│       ├── principle-guard-the-context-window
│       ├── principle-never-block-on-the-human
│       └── show-me-your-work
├── Discovery, domain and architecture
│   ├── Types, boundaries and deep modules
│   │   ├── architect
│   │   ├── principle-boundary-discipline
│   │   ├── principle-foundational-thinking
│   │   ├── principle-model-the-domain
│   │   ├── principle-redesign-from-first-principles
│   │   └── principle-type-system-discipline
│   ├── Prototypes and competing designs
│   │   ├── arena
│   │   ├── principle-exhaust-the-design-space
│   │   └── prototype [playbook]
│   ├── Requirements, intent and domain vocabulary
│   │   ├── how
│   │   ├── investigation [playbook]
│   │   ├── principle-attack-the-premise
│   │   ├── principle-experience-first
│   │   └── why
│   └── Codebase mapping and source grounding
│       └── triage-issue-reports [dormant automation skill]
├── Planning and decomposition
│   ├── Specs to tickets and multi-phase plans
│   │   ├── figure-it-out
│   │   └── multi-phase-plan [playbook]
│   └── Proof-bearing units and execution direction
│       ├── principle-outcome-oriented-execution
│       └── principle-sequence-verifiable-units
├── Implementation and parallel execution
│   ├── Specialized implementation and non-SDLC utilities
│   │   ├── make-bot-ui
│   │   └── typescript-best-practices
│   ├── Reliable state and deterministic tools
│   │   ├── principle-build-the-lever
│   │   └── principle-make-operations-idempotent
│   ├── Autonomous loops and parallel fleets
│   │   ├── autonomous-run [playbook]
│   │   ├── autopilot-full [playbook]
│   │   ├── autopilot-stack [playbook]
│   │   ├── orchestrate [playbook]
│   │   ├── principle-separate-before-serializing-shared-state
│   │   └── swarm
│   └── Vertical slices, defects and refactors
│       ├── bug-fix [playbook]
│       ├── feature [playbook]
│       ├── refactoring [playbook]
│       └── reproduce-and-fix-issues [dormant automation skill]
├── Testing, runtime proof and measurement
│   ├── Runtime control and verification lifecycle
│   │   ├── create-verification-skill
│   │   ├── maintain-verification-skill
│   │   ├── principle-prove-it-works
│   │   └── visual-parity [playbook]
│   ├── Diagnosis and runtime forensics
│   │   ├── principle-fix-root-causes
│   │   ├── runtime-forensics [playbook]
│   │   └── trace-forensics [playbook]
│   ├── TDD and behavioral assertions
│   │   ├── principle-test-behavior-not-implementation
│   │   └── tdd
│   └── Performance and measured improvement
│       ├── hillclimb [playbook]
│       └── perf-issue [playbook]
├── Review, simplification and hardening
│   ├── Independent and adversarial review
│   │   ├── blast-radius
│   │   └── interrogate
│   └── Simplification and code hygiene
│       ├── no-comments
│       ├── principle-laziness-protocol
│       ├── principle-migrate-callers-then-delete-legacy-apis
│       ├── principle-minimize-reader-load
│       └── principle-subtract-before-you-add
├── Pull requests, release and operations
│   ├── Evidence-backed PRs and landing
│   │   ├── babysit [playbook]
│   │   ├── opening-a-pr [playbook]
│   │   └── shipping [playbook]
│   └── Migration and resource reclamation
│       └── worktree-cleanup [playbook]
└── Learning, documentation and maintenance
    ├── Transcript recall and retrospectives
    │   ├── automate-me
    │   ├── recall
    │   └── reflect
    ├── Skill authoring, evaluation and structural lessons
    │   ├── authoring-a-skill [playbook]
    │   ├── eval [playbook]
    │   └── principle-encode-lessons-in-structure
    └── Writing, documentation and knowledge artifacts
        ├── technical-writing
        └── unslop
```

### matt: 38 pinned entries

Pin: `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`.

```text
matt
├── Governance, routing and continuity
│   ├── Workflow routing and onboarding
│   │   ├── ask-matt
│   │   ├── setup-matt-pocock-skills
│   │   └── wizard
│   └── Session continuity and human understanding
│       ├── claude-handoff [beta at pin]
│       ├── handoff
│       ├── teach
│       ├── to-questionnaire
│       └── wait-what
├── Discovery, domain and architecture
│   ├── Types, boundaries and deep modules
│   │   ├── codebase-design
│   │   ├── improve-codebase-architecture
│   │   └── setup-ts-deep-modules [beta at pin]
│   ├── Requirements, intent and domain vocabulary
│   │   ├── domain-modeling
│   │   ├── grill-me
│   │   ├── grill-with-docs
│   │   ├── grilling
│   │   └── to-spec
│   ├── Prototypes and competing designs
│   │   └── prototype
│   └── Codebase mapping and source grounding
│       ├── research
│       ├── triage
│       └── wayfinder
├── Planning and decomposition
│   └── Specs to tickets and multi-phase plans
│       └── to-tickets
├── Implementation and parallel execution
│   ├── Vertical slices, defects and refactors
│   │   └── implement
│   ├── Autonomous loops and parallel fleets
│   │   ├── implement-spec [beta at pin]
│   │   └── loop-me [beta at pin]
│   └── Specialized implementation and non-SDLC utilities
│       ├── migrate-to-shoehorn
│       └── scaffold-exercises
├── Testing, runtime proof and measurement
│   ├── Diagnosis and runtime forensics
│   │   └── diagnosing-bugs
│   └── TDD and behavioral assertions
│       └── tdd
├── Review, simplification and hardening
│   └── Independent and adversarial review
│       └── code-review
├── Pull requests, release and operations
│   ├── Evidence-backed PRs and landing
│   │   ├── pr [beta at pin]
│   │   └── resolving-merge-conflicts
│   └── Checks, automation and telemetry
│       ├── git-guardrails-claude-code
│       └── setup-pre-commit
└── Learning, documentation and maintenance
    ├── Transcript recall and retrospectives
    │   └── retro [beta at pin]
    └── Writing, documentation and knowledge artifacts
        ├── writing-beats [beta at pin]
        ├── writing-for-agents
        ├── writing-fragments [beta at pin]
        └── writing-shape [beta at pin]
```

### osmani: 25 pinned entries

Pin: `2686b620fc1fed2e8f60c704839c766b8594c6b6`.

```text
osmani
├── Governance, routing and continuity
│   ├── Workflow routing and onboarding
│   │   └── using-agent-skills
│   └── Autonomy, context and decision traces
│       └── context-engineering
├── Discovery, domain and architecture
│   ├── Requirements, intent and domain vocabulary
│   │   ├── constraint-driven-development
│   │   ├── idea-refine
│   │   ├── interview-me
│   │   └── spec-driven-development
│   ├── Types, boundaries and deep modules
│   │   ├── api-and-interface-design
│   │   └── frontend-ui-engineering
│   └── Codebase mapping and source grounding
│       └── source-driven-development
├── Planning and decomposition
│   └── Specs to tickets and multi-phase plans
│       └── planning-and-task-breakdown
├── Implementation and parallel execution
│   └── Vertical slices, defects and refactors
│       └── incremental-implementation
├── Testing, runtime proof and measurement
│   ├── TDD and behavioral assertions
│   │   └── test-driven-development
│   ├── Runtime control and verification lifecycle
│   │   └── browser-testing-with-devtools
│   ├── Diagnosis and runtime forensics
│   │   └── debugging-and-error-recovery
│   └── Performance and measured improvement
│       └── performance-optimization
├── Review, simplification and hardening
│   ├── Independent and adversarial review
│   │   ├── code-review-and-quality
│   │   ├── doubt-driven-development
│   │   └── security-and-hardening
│   └── Simplification and code hygiene
│       └── code-simplification
├── Pull requests, release and operations
│   ├── Evidence-backed PRs and landing
│   │   ├── git-workflow-and-versioning
│   │   └── shipping-and-launch
│   ├── Checks, automation and telemetry
│   │   ├── ci-cd-and-automation
│   │   └── observability-and-instrumentation
│   └── Migration and resource reclamation
│       └── deprecation-and-migration
└── Learning, documentation and maintenance
    └── Writing, documentation and knowledge artifacts
        └── documentation-and-adrs
```

## Unified concept tree

```text
Trio: 136 pinned identities
├── Governance, routing and continuity
│   ├── Session continuity and human understanding
│   │   ├── [matt] claude-handoff [beta at pin]
│   │   ├── [matt] handoff
│   │   ├── [matt] teach
│   │   ├── [matt] to-questionnaire
│   │   ├── [matt] wait-what
│   │   ├── [pstack] bro
│   │   ├── [pstack] pause-safely [playbook]
│   │   ├── [pstack] session-pickup [playbook]
│   │   └── [pstack] teach
│   ├── Workflow routing and onboarding
│   │   ├── [matt] ask-matt
│   │   ├── [matt] setup-matt-pocock-skills
│   │   ├── [matt] wizard
│   │   ├── [osmani] using-agent-skills
│   │   ├── [pstack] poteto-mode
│   │   ├── [pstack] setup-benny [dormant automation skill]
│   │   └── [pstack] setup-pstack
│   └── Autonomy, context and decision traces
│       ├── [osmani] context-engineering
│       ├── [pstack] principle-guard-the-context-window
│       ├── [pstack] principle-never-block-on-the-human
│       └── [pstack] show-me-your-work
├── Discovery, domain and architecture
│   ├── Types, boundaries and deep modules
│   │   ├── [matt] codebase-design
│   │   ├── [matt] improve-codebase-architecture
│   │   ├── [matt] setup-ts-deep-modules [beta at pin]
│   │   ├── [osmani] api-and-interface-design
│   │   ├── [osmani] frontend-ui-engineering
│   │   ├── [pstack] architect
│   │   ├── [pstack] principle-boundary-discipline
│   │   ├── [pstack] principle-foundational-thinking
│   │   ├── [pstack] principle-model-the-domain
│   │   ├── [pstack] principle-redesign-from-first-principles
│   │   └── [pstack] principle-type-system-discipline
│   ├── Prototypes and competing designs
│   │   ├── [matt] prototype
│   │   ├── [pstack] arena
│   │   ├── [pstack] principle-exhaust-the-design-space
│   │   └── [pstack] prototype [playbook]
│   ├── Requirements, intent and domain vocabulary
│   │   ├── [matt] domain-modeling
│   │   ├── [matt] grill-me
│   │   ├── [matt] grill-with-docs
│   │   ├── [matt] grilling
│   │   ├── [matt] to-spec
│   │   ├── [osmani] constraint-driven-development
│   │   ├── [osmani] idea-refine
│   │   ├── [osmani] interview-me
│   │   ├── [osmani] spec-driven-development
│   │   ├── [pstack] how
│   │   ├── [pstack] investigation [playbook]
│   │   ├── [pstack] principle-attack-the-premise
│   │   ├── [pstack] principle-experience-first
│   │   └── [pstack] why
│   └── Codebase mapping and source grounding
│       ├── [matt] research
│       ├── [matt] triage
│       ├── [matt] wayfinder
│       ├── [osmani] source-driven-development
│       └── [pstack] triage-issue-reports [dormant automation skill]
├── Planning and decomposition
│   ├── Specs to tickets and multi-phase plans
│   │   ├── [matt] to-tickets
│   │   ├── [osmani] planning-and-task-breakdown
│   │   ├── [pstack] figure-it-out
│   │   └── [pstack] multi-phase-plan [playbook]
│   └── Proof-bearing units and execution direction
│       ├── [pstack] principle-outcome-oriented-execution
│       └── [pstack] principle-sequence-verifiable-units
├── Implementation and parallel execution
│   ├── Specialized implementation and non-SDLC utilities
│   │   ├── [matt] migrate-to-shoehorn
│   │   ├── [matt] scaffold-exercises
│   │   ├── [pstack] make-bot-ui
│   │   └── [pstack] typescript-best-practices
│   ├── Reliable state and deterministic tools
│   │   ├── [pstack] principle-build-the-lever
│   │   └── [pstack] principle-make-operations-idempotent
│   ├── Autonomous loops and parallel fleets
│   │   ├── [matt] implement-spec [beta at pin]
│   │   ├── [matt] loop-me [beta at pin]
│   │   ├── [pstack] autonomous-run [playbook]
│   │   ├── [pstack] autopilot-full [playbook]
│   │   ├── [pstack] autopilot-stack [playbook]
│   │   ├── [pstack] orchestrate [playbook]
│   │   ├── [pstack] principle-separate-before-serializing-shared-state
│   │   └── [pstack] swarm
│   └── Vertical slices, defects and refactors
│       ├── [matt] implement
│       ├── [osmani] incremental-implementation
│       ├── [pstack] bug-fix [playbook]
│       ├── [pstack] feature [playbook]
│       ├── [pstack] refactoring [playbook]
│       └── [pstack] reproduce-and-fix-issues [dormant automation skill]
├── Testing, runtime proof and measurement
│   ├── Runtime control and verification lifecycle
│   │   ├── [osmani] browser-testing-with-devtools
│   │   ├── [pstack] create-verification-skill
│   │   ├── [pstack] maintain-verification-skill
│   │   ├── [pstack] principle-prove-it-works
│   │   └── [pstack] visual-parity [playbook]
│   ├── Diagnosis and runtime forensics
│   │   ├── [matt] diagnosing-bugs
│   │   ├── [osmani] debugging-and-error-recovery
│   │   ├── [pstack] principle-fix-root-causes
│   │   ├── [pstack] runtime-forensics [playbook]
│   │   └── [pstack] trace-forensics [playbook]
│   ├── TDD and behavioral assertions
│   │   ├── [matt] tdd
│   │   ├── [osmani] test-driven-development
│   │   ├── [pstack] principle-test-behavior-not-implementation
│   │   └── [pstack] tdd
│   └── Performance and measured improvement
│       ├── [osmani] performance-optimization
│       ├── [pstack] hillclimb [playbook]
│       └── [pstack] perf-issue [playbook]
├── Review, simplification and hardening
│   ├── Independent and adversarial review
│   │   ├── [matt] code-review
│   │   ├── [osmani] code-review-and-quality
│   │   ├── [osmani] doubt-driven-development
│   │   ├── [osmani] security-and-hardening
│   │   ├── [pstack] blast-radius
│   │   └── [pstack] interrogate
│   └── Simplification and code hygiene
│       ├── [osmani] code-simplification
│       ├── [pstack] no-comments
│       ├── [pstack] principle-laziness-protocol
│       ├── [pstack] principle-migrate-callers-then-delete-legacy-apis
│       ├── [pstack] principle-minimize-reader-load
│       └── [pstack] principle-subtract-before-you-add
├── Pull requests, release and operations
│   ├── Evidence-backed PRs and landing
│   │   ├── [matt] pr [beta at pin]
│   │   ├── [matt] resolving-merge-conflicts
│   │   ├── [osmani] git-workflow-and-versioning
│   │   ├── [osmani] shipping-and-launch
│   │   ├── [pstack] babysit [playbook]
│   │   ├── [pstack] opening-a-pr [playbook]
│   │   └── [pstack] shipping [playbook]
│   ├── Migration and resource reclamation
│   │   ├── [osmani] deprecation-and-migration
│   │   └── [pstack] worktree-cleanup [playbook]
│   └── Checks, automation and telemetry
│       ├── [matt] git-guardrails-claude-code
│       ├── [matt] setup-pre-commit
│       ├── [osmani] ci-cd-and-automation
│       └── [osmani] observability-and-instrumentation
└── Learning, documentation and maintenance
    ├── Transcript recall and retrospectives
    │   ├── [matt] retro [beta at pin]
    │   ├── [pstack] automate-me
    │   ├── [pstack] recall
    │   └── [pstack] reflect
    ├── Skill authoring, evaluation and structural lessons
    │   ├── [pstack] authoring-a-skill [playbook]
    │   ├── [pstack] eval [playbook]
    │   └── [pstack] principle-encode-lessons-in-structure
    └── Writing, documentation and knowledge artifacts
        ├── [matt] writing-beats [beta at pin]
        ├── [matt] writing-for-agents
        ├── [matt] writing-fragments [beta at pin]
        ├── [matt] writing-shape [beta at pin]
        ├── [osmani] documentation-and-adrs
        ├── [pstack] technical-writing
        └── [pstack] unslop
```

## Supplemental artifacts outside the pinned census

This view locates the additional named artifacts without counting aliases or references as skills. Exact primary links and limits are in the [coverage check](learning-coverage-check.md).

```text
Supplemental artifacts
├── pstack
│   ├── Routing and role wrappers
│   │   ├── poteto-help [newer skill]
│   │   ├── poteto-agent [agent definition]
│   │   └── comment-sicko [agent definition]
│   ├── Measurement
│   │   ├── benchmark-checklist [newer skill]
│   │   └── principle-explain-the-number [newer principle skill]
│   └── Structural prevention
│       └── correct [newer skill, absent from pasted tree]
├── Matt
│   ├── Testing depth
│   │   ├── tdd/tests.md [reference, labeled writing-good-tests]
│   │   └── tdd/mocking.md [reference, labeled mocking-at-system-boundaries]
│   └── Alias reconciliation
│       ├── prototyping → prototype [same pinned skill]
│       ├── writing-skills-and-docs → writing-for-agents [same pinned skill]
│       └── grill-me-with-docs → grill-with-docs [prose name correction]
└── Osmani
    ├── Command reconciliation
    │   └── /constraints → constraint-driven-development [same pinned skill]
    ├── Specialist personas [agent definitions]
    │   ├── code-reviewer
    │   ├── test-engineer
    │   ├── security-auditor
    │   └── web-performance-auditor
    └── web-quality-skills [separate companion repository]
        ├── web-quality-audit
        ├── performance
        ├── core-web-vitals
        ├── accessibility
        ├── seo
        └── best-practices
```

The first three Osmani personas participate in the pinned `/ship` command; `/review` invokes a five-axis skill and web performance has a separate route. Newer pstack names do not belong to the older 47-skill census. Matt's testing references do not increase his 38-skill census. The original CSV is unchanged.
