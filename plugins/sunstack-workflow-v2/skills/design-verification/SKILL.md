---
name: design-verification
description: "Use when planning how a design's requirements will be proven, after Program Design or when that plan is missing or stale. Not for checking a delivered claim (practices-verification), building journeys or regression tests."
---

# Verification Design

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

IF no work reference is in context and the task qualifies, open or resume the trace through `sunstack-dev:practices-show-me-your-work` before phase work.

A Verification Design is the Lead's plan for showing that one design's rules hold, written after Program Design as planned-check records on the same project page. The Specification already fixes what must be true and the reference it is judged against, in each rule's cases, and the Program Design exposes the seams where behavior can be seen. Each planned check decides which observation will tell a correct build from a wrong one, at the boundary where the wrong behavior is real, on which target, and what that leaves unverified. It is a plan. Nothing in it has been observed.

Four readers depend on it. The owner reads each check's "proven by" line. Review follows each rule through its seam to a check. The plan gives each slice the checks in its deliverable. The Verifier challenges the checks before the build and observes them after, so every check must be concrete enough to challenge.

Writing it observes nothing. Running journeys, checking offered tests and the prebuild challenge are the Verifier's work with `sunstack-dev:practices-verification`. Building or repairing a journey belongs to `sunstack-dev:practices-verification-maintenance`, and product tests stay with the plan and the Implementer. Don't launch the app or run a journey to fill in a check; a check records what will be observed.

The Lead writes every check. IF a bounded evidence question, such as which journeys exist or what a test actually drives, is worth delegating, load `practices-manage-agents` and return the bounded commission; open each source a check relies on yourself.

## The planned check

One check decides one or more `core` rules, and every `core` rule has a check. A check is a `defineCheck` record; the guide's `typed-design.md` owns its field syntax. The table follows the record:

| Field | Says | Not this |
| --- | --- | --- |
| rules (`checks`) | every rule (`R`) the check decides | a rule left implicit, so a rule no observation decides hides under a covered need |
| statement | the "proven by" sentence the owner can read: what will be done, and what will be seen | "covered by e2e tests" |
| cases | three or more given/expect pairs: the reference from the rule's cases (its worked example, threshold, protocol version or checked known-good output) and what is seen where, plus at least one wrong build and what it must show | "works"; an exit code, a success toast or any other acknowledgement; what the app does today, or a model's opinion of the output |
| journey | the `verify-<app>` journey or the reused real-path test that observes it, or `needed:` with the entry it must drive and what it must read, marked `lasting` or `temporary` | a journey you didn't read; "the app"; a test that mocks the interaction the check claims |
| unverified | what stays open: platforms not tried, stand-ins still in place, access nobody has granted, journeys still to build | blank |

A check does not restate a journey's build, platform, configuration or client; the journey's own description in `verify-<app>` holds them. When one observation decides several rules, write one check that names them all.

## Workflow

### 1. Take in the design being proven

MUST load `sunstack-dev/shared-references/design-documents.md` and return the need, rule and realization records this design consumes, the planned-check records it writes, the page's proof part, and the design-item contents, nudge labels and ranking this run uses. When the caller supplies a `new artifact home`, write the checks beneath it and return their exact path. Read every need, rule and realization record and the page whole. For each `core` rule, take its cases (the expected behavior, threshold, target constraints and reference), and its proof seam from the realization records and the page's how part. When revising a stale design, re-open what changed (a rule, a seam or a journey) and redo only the checks it touches; for a `verification-design-gap`, start from the rules its payload names, or from the affected checks a `plan-update` lists. For an accepted review finding or a Verifier challenge, correct only the checks it names and re-check them against Not ready while; nothing broader reruns, and a finding whose cause is upstream returns as its token.

A check is stale when, since its review, any of these changed:

- its target, platform or configuration;
- its journey or test matrix, changed or dropped;
- a rule it decides;
- a required capability it covers, descoped;
- a dependency its observation uses;
- plan scheduling it depends on.

A stale check is updated and re-reviewed.

Completion: you have each `core` rule's cases, reference and seam in hand, or the exact piece that is missing.

### 2. Read what already observes the app

For the app each rule is about, read the project's `verify-<app>` skill under `.agents/skills/`: its journey index, and the journeys these rules touch with the scripts they run. Read the real-path tests, integration and end-to-end, that enter at the same points. Before you name a journey or test as covering a rule, read from its source what it drives, against which build and configuration, what it keeps real and what it replaces, and where it looks (a name says what something is for; its source says what it does (`sunstack-dev:principle-read-ground-truth-first`)). A missing `verify-<app>` skill, or one that doesn't reach a rule's entry, doesn't stop the design: those checks name the journey still needed.

Completion: each rule's entry has its journeys and real-path tests with what each drives and observes, or `none found` with where you looked.

### 3. Choose each observation

MUST load `references/choosing-the-observation.md` and return, for each rule, the evidence class, the boundary where its wrong behavior stays real, the target, the journey or test that will observe it (existing, or needed with its entry and observation), each needed journey's lifetime, and any gap.

When you place each observation, put it where the user or calling program meets the outcome, through the real entry on the planned target (a passing test proves only what it observes (`sunstack-dev:principle-prove-it-works`)). Scale the proof to the claim: a pure rule is proven by a focused test and launches no app, and a structural claim, such as a schema or a skill's text, gets structural evidence that names the behavior it leaves unevaluated.

An existing journey or real-path test that already drives this entry and would fail for the wrong behavior is the proof; name it, and add no manual journey just so the check looks independent. Before you count it, check from its source that it keeps the check's interaction real rather than mocked, and name the target, configuration and client it depends on (evidence supports only the claim, version and target it observed (`sunstack-dev:principle-verify-before-accepting`)). Reuse is planned here; the Verifier checks at delivery whether it still applies. Write each reused piece of evidence you trust without re-observing it, and each stand-in target, as an assumption record in the same edit as its check.

When no Program Design seam lets any observation see a rule's outcome, record a `program-design-gap` with the rule and what the observation would need to see. When the rule's cases give no observable outcome, reference or threshold, record a `specification-gap`. Never weaken the rule to fit the current harness.

Completion: every `core` rule is decided by a named observation at its boundary, or carries a recorded gap.

### 4. Write each passing condition and its limits

Write the passing condition in the check's cases as an observation: what is seen, where, against which part of the reference. After writing it, name one wrong build and check that the condition fails for it, and one materially different allowed build and check that it passes (a check counts only if the wrong behavior could make it fail (`sunstack-dev:principle-write-tests-that-can-fail`)). If a build that only acknowledges, by returning 201 or showing a toast, would also pass, the condition watches a proxy; move it to the outcome.

List what the check leaves unverified. A named limit is honest, but it waives nothing: a limit that leaves a required observation undone, or weakens it, is the owner's decision. Write each such limit as a decision record in the same edit, never as an agent's decision: the owner's ruling when the owner has accepted the limit, otherwise an open choice for the owner between accepting the limit and keeping the observation.

Write every check as a plan: it describes what will be seen on the build that will exist, and no check says or implies that a run happened.

Completion: every check has a passing condition with the wrong build that fails it and its unverified list, and every limit that weakens required proof is marked for the owner.

### 5. Write the checks and the proof part

The planned-check records are the Verification Design's one home, each in the file that already holds its rules (`design-documents.md`). When you write each "proven by" line, say in the owner's words what will be done and what will be seen, with no test-layer jargon (write so a reader without your context can say it back (`sunstack-dev:principle-write-for-the-reader`)). Name the rules and seams instead of restating them. The owner's view of need, rules and checks, and the coverage review reads, are built from the records; nobody writes them by hand.

In a file-backed set, use `sunstack-dev:presentation-html`, passing the reader's question and the check ids, to write the page's proof part: only what a check record cannot say, such as an observation path whose route is not obvious, explained beside its diagram. The page shows each check by id and never restates it. IF an observation path is drawn, load `sunstack-dev/shared-references/diagram-rendering-and-fallbacks.md` with that view and return its selected medium, semantic-preservation result, visual-check result and exact gap. Run the design check and the matching static check through `presentation-html`. A planned view or observation is not a result.

Completion: the design check reports no `core` rule without a check, every drawn observation path has a passing rendering result, and in a file-backed set the design check and static check pass. Return an exact required-rendering gap as `evidence-blocked`.

### 6. Re-read it as the Verifier would

Re-read every check as the Verifier who must challenge it before the build, against every item in Not ready while. Fix each failing check. What can't be fixed here leaves the design as one of the gap or decision results below. This self-check never replaces the integrated review.

The design check reports missing need and check links, and prints design notes for a need no rule serves and a rule no realization names. In a file-backed set, then run the design rules over the page with the command in `../design-review/SKILL.md` step 5, and fix or answer each warning before returning; a warning on a link to a record placed on that page, by id or in a section item, is the engine gap step 5 names, so leave it and never add an `id`.

Then run the design-item pass:

1. **Sentence support, first.** Read every sentence that settles a target, a reused piece of evidence or a limit. Ask of each: does its source support all of what it claims? Return an `unsupported claim` nudge for each one that it does not, with where to read.
2. **Items.** Return, for each design item, every applicable label from `design-documents.md`'s nudge labels, or `ok` alone. IF an owner-message export is supplied, look each quoted span up by its authority (`owner-words`: the owner's own text in the cited row; `owner-accepted`: the agent's wording and the owner's acceptance in the cited selection record itself or a later acceptance event); otherwise return `quote not checked` with each quoted item's source.
3. **Rank and promote** the agents' decisions and open assumptions, and bring the high-ranked ones that need the owner as decisions.

Every result of this pass is a nudge; it adds nothing to Not ready while.

Completion: every item in Not ready while is cleared, or its check is returned as a gap or a decision.

## Return

Return exactly one:

```text
locally-ready
specification-gap
program-design-gap
decision-needed
evidence-blocked
```

- `locally-ready`: no item in Not ready while holds. Return the project page, handed over as `design-documents.md` says, and its planned-check record ids, each rule's deciding check or named limit, the journeys still needed with their lifetimes, the tests reused, the design check and rendering results, and the statement that nothing has been observed or reviewed. Lead with the "proven by" lines.
- `specification-gap`: a rule lacks the observable outcome, reference, threshold or target constraint its check needs. Return each rule, what it lacks and the evidence. Carry any Program Design gaps in the same payload, because a changed rule can change its seam.
- `program-design-gap`: no seam lets an observation see a rule's outcome. Return each rule, the seam its realization names, what the observation would need to see and the evidence.
- `decision-needed`: a limit would leave a required observation undone or weaken it, or the planned target needs access, a device or an account only the owner can grant. IF returning `decision-needed`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief.
- `evidence-blocked`: a load-bearing document, journey or test can't be read, or required rendering evidence can't be obtained. Return the exact source or rendering gap and the access or capability it needs.

Then return one route:

```text
locally-ready       -> recommend design-review in four-document-design mode
specification-gap   -> return the token and its payload
program-design-gap  -> return the token and its payload
decision-needed     -> stop with the brief
evidence-blocked    -> stop with the exact source or rendering gap and the access or capability it needs
```

A review handoff carries the page and record ids, this return and the review question; it copies no record.

## Not ready while

- a `core` rule has no planned check, as the design check reports;
- a check does not name every rule (`R`) its observation decides;
- a rule is decided by no observation and isn't listed as unverified;
- a check's reference is the app's current behavior, a model's judgment, or missing;
- a passing condition names no wrong build that fails it, or an acknowledgement alone would pass it;
- a journey is named as existing without its source read, or a needed journey is missing from the return;
- a `needed:` journey has no `lasting` or `temporary`, or an existing journey or reused test carries one;
- a reused test mocks the interaction its check claims;
- a pure rule or structural claim is given an app launch, or an outcome the user meets in the app is given only a unit test;
- a check says or implies that something was observed;
- a limit leaves a required observation undone or weaker without the owner's decision;
- a drawn observation path lacks a passing rendering result, including when its exact gap is recorded;
- a seam or Specification gap was worked around inside a check instead of returned.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `sunstack-dev:practices-show-me-your-work`.
