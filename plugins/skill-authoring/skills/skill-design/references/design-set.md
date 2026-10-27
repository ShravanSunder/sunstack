# Design Set

This reference owns the design set: the proposal for one skill change that steps 1 to 5 of `skill-design` produce before any skill file changes, in four parts (requirements, specification, skill design and skill verification) and one page built from them. Return the set in the conversation or as a document, as the predicates below decide, with every slot filled or its exact unknown.

Expected inputs: the step 1 to 5 returns (class and claim, owner, reusable behavior, success definition and who reaches the skill, evidence, authoring basis and proof posture, obligations and standards with their transfer cases, the design with its topics and security decisions, the verification routes).

Its consumers: `skill-design` writes it; `skill-creation` reads the accepted boundary and the runs; `skill-review` judges it at its design stage; `skill-orchestrator` reads its decisions and run status.

## Conversation or Document

Every design set has its four parts, written in Markdown, and its page; `design-page.md` owns how the page is made and inspected.

A set that meets none of the document predicates below stays in the conversation: its parts are Markdown in the run's messages, its page is built from them, and the review packet carries both.

If the set spans more than one run, carries user decisions a later run must honor, or must survive a session boundary, write it as a document before commissioning review: one Markdown file per part (`requirements.md`, `specification.md`, `skill-design.md`, `skill-verification.md`) with the page beside them, and the folder is the reviewed artifact; the review packet's `review target` carries the folder's path and revision. Home: the repository's skill-work location, or `docs/wip/skills-authoring/<yyyy-mm-dd-name>/` when the repository has none. The reviewer reviews the provided artifact and reports a missing required document as blocked; it does not author the target. The document is working memory that outlives the conversation, not durable truth: after its last run lands, the repository's own rules for working documents decide its disposition. The set is one draft, and acceptance covers it as a whole; each run in its sequence names exactly one skill target, and a run naming more is split before acceptance.

## Slots

```text
requirements
  the change: its class with its claim, create or update, the reusable behavior in one sentence
  the need, and the success definition in the user's own words
  who reaches the skill (an agent unprompted, another skill, a person) and when
  evidence: each signal with its date and source (a session, a retrospective, an audit, a reproduced failure), or the user's direction named as the basis
  authoring basis: observed failure, with its reproduction result, or user-directed intent
  non-goals

specification
  what the skill must do, one sentence each
  each standard the skill states, one self-contained sentence each
  each rule it teaches, with its two transfer cases and verdict

skill design
  targets and owner plugin, with the runs in sequence
  per-run surface allocation: trigger / main path / depth / proof
  trigger: the invocation decision and the description
  main path: the lens, the route, each branch and the completion boundary
  every call site, in its form
  references: each one's job, its caller and callee contract and the source it is taught from; any shared shape with its owner and consumers
  the root's topics that apply, each with what it governs
  sensitive surfaces: each with its allowed / disallowed / blocked / deferred decision and where it was recorded before the surface was outlined, or none
  decisions table: defaults taken with rationale; the user may strike any row
  coordination: base branch and commit, pending edits, version and changelog landing
  run status: per run, proposed | implemented | reviewed | shipped
  review record: accepted revision label, checks, statuses, verdict, semantic coverage, acceptance

skill verification
  per requirement and per standard: its route (mechanical rule, judged rule, eval, review check, no proof needed, or unverified with its reason) and the properties it was decided on
  proof plan: each run's proof posture, from the authoring basis
  what stays unverified
```

Each decisions row records the default taken and its rationale so the user can strike it cheaply — after acceptance, striking a row is an edit like any other, and a row without a rationale gives the user nothing to strike against. A recorded decision is never rewritten: when the user strikes or changes one, keep the original row and add a dated row that names the row it supersedes, so the effective decision and its history both stay readable. Every problem or evidence claim names its source or is labeled a hypothesis. The coordination slot is read at implement and ship time: a slice run checks its base, pending edits, and version/changelog landing against it before editing.

## Run Status

Each run moves through one state at a time, and the set shows the state it has actually reached:

```text
proposed     the set names the run; no skill file changed yet
implemented  files changed inside the accepted boundary
reviewed     the implementation review for the run returned great
shipped      the change was released or merged as the user scoped
```

A run not shown as `shipped` is never reported as shipped, and `implemented` is never reported as reviewed. A mechanical change, or one whose implementation review the user explicitly skipped, moves from `implemented` to `shipped` with that boundary written beside it; it is never shown as `reviewed`. Whoever moves a run forward records the evidence beside the new state: the diff for `implemented`, the review result for `reviewed`, the release or merge for `shipped`.

Complete when: the form (conversation or document) follows the predicates, the four parts and the page exist, and every slot carries what its consuming run can execute from without guessing, or its exact unknown; a slot holding TBD is neither.
