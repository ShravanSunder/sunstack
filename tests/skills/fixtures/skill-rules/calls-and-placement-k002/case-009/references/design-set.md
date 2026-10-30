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
