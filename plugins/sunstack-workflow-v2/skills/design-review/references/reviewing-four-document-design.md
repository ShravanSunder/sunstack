# Reviewing the Four-Document Design

This reference owns `four-document-design` mode judgment: the whole milestone, its typed records and its page.

Four-document design review independently repeats load-bearing local checks; it does not trust author self-checks or prior local review as the only evidence.

Before integration checks, MUST load `sunstack-dev/shared-references/design-documents.md` and return the milestone's need, rule, realization, planned-check, decision and assumption records and the page sections that explain them. Then MUST load `reviewing-specification.md` and return its complete specification-mode judgment of the needs and rules. Then MUST load `reviewing-program-design.md` and return its complete program-mode judgment of the realizations and the page's how part. Then MUST load `reviewing-verification-design.md` and return its complete judgment of the planned checks against the rules and realizations. Four-document design judgment consumes the three local results; it may not replace them with an author summary or a prior-review summary.

A `core` slice with no need or rule records is a blocker-level finding routed to `design-specification`; a `core` rule with no planned check, which the Demistify check reports, is one routed to `design-verification`. Do not create or edit records during review. Downstream findings may still be reported when the available sources support them, but the review cannot be `ready`.

Inspect:

- every material rule that needs new structure has a realization naming it;
- every realization, binding and design element traces to a rule, constraint, failure policy, or proof need;
- boundary altitude agrees across the four kinds of meaning;
- design does not narrow, broaden, or contradict observable behavior;
- each `core` rule walks cleanly to its planned check (see Rule to Planned Check below);
- non-goals and compatibility survive realization;
- security/reliability and other applicable qualities map to owner, mechanism, failure/degradation, and proof;
- retained needs and rules match the owner-confirmed or last inspectable owner-accepted baseline, including any named variants, defaults, constraints, and cases;
- every applicable material runtime-behavior group has a visible current/proposed call-path delta or explicit no-predecessor case, with added, removed, and changed edges plus preservation-critical or contested unchanged edges;
- each capability's line runs from its needs to their checks (see Capability Through-Lines below);
- each term means the same thing in every record and section (see Term Consistency below);
- all coverage is semantically current for the current records and page, with any post-review non-semantic changes recorded by the parent;
- a planner can choose tasks/order/commands without inventing meaning, How, or the proof route.

Read the page as its reader would. Each capability group has a visible purpose. Each need, rule, realization or planned check the page places is explained by the prose beside it; each decision and assumption sits in its section item, and prose that relies on it links to it; no record is restated. Each view answers a question the page asks. A Map node or Walkthrough stop reaches the record or section it names, and a Walkthrough answers a real ordered question. Check that material decision status agrees between its record and any explanation, diagram or navigation label. Ask what need, invariant, failure/recovery path, undecided point and deciding check the page explains; unsupported or conflicting answers remain findings. When this review requires the rendered view and it is unavailable, keep the existing partial-coverage result rather than substituting source syntax.

## Rule to Planned Check

What to open: each `core` need and the rules that name it, with each rule's cases; the realization records that name each rule and the page's how part; the planned checks that name each rule; and the Demistify check's report.

How to judge: walk every `core` rule; do not sample. Start from what the Demistify check reports, then follow each rule:

```text
need -> rule and its cases (expected behavior, threshold, target constraints, reference)
  -> its realization's proof seam -> the planned check that names it, with its cases
```

The chain holds when:

- the Demistify check reports no `core` rule without a need or without a planned check, and each rule is decided by a check or listed as unverified in one;
- the check uses the rule's cases as they stand now: their reference, threshold and target constraints, not an earlier or paraphrased copy;
- the check observes at a seam the realization exposes for that rule, or the Verification Design returned a `program-design-gap` for it.

Route a broken link to its owner: a check that drifted from its rule's cases or seam to `design-verification`; a rule with no observable case to `design-specification`; a seam that cannot carry any observation to `design-program`. An upstream correction continues to `design-verification` for the checks it changes.

Stop when every `core` rule has been walked to its check or a routed finding.

## Capability Through-Lines

Skip this walk when the needs carry no capability list; the per-rule walk above covers a one-concern set.

What to open: the capability list and each capability's home needs, the page's capability groups, and the rules, realizations and checks those needs reach.

How to judge: walk every capability; do not sample.

```text
capability key and purpose
  -> its home needs
  -> each rule that names one of them, under that rule's own home
  -> the realizations and planned checks that name each rule
```

A rule can serve needs in several capabilities and has one home; one homed elsewhere belongs to this line when it names this capability under "also serves". The line stops at the first link that is missing, a rule shown under a capability that is not its home, or a group named by a component instead of the key. Report one finding for the capability, naming every record it strands, and route it as the walk above does:

- a listed capability with no home need, or whose home needs reach no rule: `design-specification`;
- a reached rule that needs new structure and has no realization: `design-program`;
- a reached rule with no planned check: `design-verification`.

For example, in a job-submission milestone, `billing-export` reaches R7, R8 and R9, but the Demistify check reports R7 and R8 with no planned check: the line stops at Verification Design, and the finding names finance's whole part of the system as unproven. `scheduling` stops earlier, at U3, which no rule names; nothing downstream can realize or prove U3 without a rule, so file no separate findings against the later kinds for the same missing link.

A line that ends at a recorded gap, such as home needs that are all unauthorized, is honest; report it only when it leaves an accepted need unrealized. When a per-rule finding and a capability finding name the same missing link, reduction merges them into the capability finding.

Stop when every capability has been walked to its checks or to a routed finding where its line stops.

## Term Consistency

What to open: the page's entity definitions, each rule, each realization, the binding table and contract names, and each planned check.

How to judge: a design noun that cites an `E` and keeps that entity's identity, relationships, and states is consistent. A code name in a shape or home cell is a binding, not a term. A design-only concept that names the `E` or `R` it serves is legitimate, but naming a served id is not enough by itself: its own identity, lifecycle or states, relationships, or invariants signal a possible missing entity.

- A synonym for an existing `E` in a realization or the how part (a new word where the Specification already has a term) is a finding with `Route: design-program`, or `Route: design-verification` when it appears in a planned check: rename to the entity's term.
- A design noun with no `E` that names nothing it serves, or behaves like an entity, is a finding with `Route: design-specification`: the Specification decides whether it is a new entity or already covered. Review does not define it.

Stop when every design noun resolves to an `E`, a design-only concept with its served `E` or `R`, or a routed finding.

## Readiness

If local results are missing, a `four-document-design` result of `ready` requires independently repeating and recording the missing local checks. Missing prerequisites may still yield bounded findings, never false readiness.

Use the pretend planner:

```text
may decide: tasks, exact files, order, DAG, exact commands, red/green steps,
            evidence capture, checkpoints, rollout
must consume: needs, rules and their cases, entity bindings and boundary shapes,
              components/owners/interfaces,
              state/flows/failure/concurrency/cutover/trust/proof seams,
              each rule's planned check, target, journey,
              reused tests, passing condition, and what stays unverified
```

Complete when: the three local judgments were made, every `core` rule was walked to its check, every capability's line was walked to its checks or its stop, every design noun resolved under Term Consistency, accepted needs and rules remain covered, applicable call-path deltas are visible, contradictions are resolved or blocked, and planning has no semantic design decisions left.
