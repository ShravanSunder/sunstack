---
name: design-verification
description: "Use when planning how a design's requirements will be proven, after Program Design or when that plan is missing or stale. Not for checking a delivered claim (practices-verification), building journeys or regression tests."
---

# Verification Design

Base dependency: locate `sunstack-dev:presentation-html` using the host's listed skill path; from its skill directory go up `../..` to the base plugin root. Resolve every `sunstack-dev:<name>` there as `skills/<name>/SKILL.md`, including hidden principles and domains; append reference suffixes beneath that skill. Resolve `sunstack-dev/shared-references/...` beneath that same root. Never assume the two plugin caches are adjacent.

IF no work reference is in context and the task qualifies, open or resume the trace through `sunstack-dev:practices-show-me-your-work` before phase work.

A Verification Design is the Lead's plan for showing that one design project's requirements hold. It is written after Program Design, as its own document beside it. The Specification already fixes what must be true and the reference it is judged against, and the Program Design exposes the seams where behavior can be seen. This document decides, for each requirement, which observation will tell a correct build from a wrong one, at the boundary where the wrong behavior is real, on which target, and what that leaves unverified. It is a plan. Nothing in it has been observed.

Four readers depend on it. The owner reads each requirement's "proven by" line. Review follows each requirement through its obligations and seam to an observation. The plan gives each slice the checks its rows name. The Verifier challenges the rows before the build and observes them after, so every row must be concrete enough to challenge.

Writing it observes nothing. Running journeys, checking offered tests and the prebuild challenge are the Verifier's work with `sunstack-dev:practices-verification`. Building or repairing a journey belongs to `sunstack-dev:practices-verification-maintenance`, and product tests stay with the plan and the Implementer. Don't launch the app or run a journey to fill in a row; a row records what will be observed.

The Lead writes every row. IF a bounded evidence question, such as which journeys exist or what a test actually drives, is worth delegating, load `practices-manage-agents` and return the bounded commission; open each source a row relies on yourself.

## The row

One row per requirement (`U`), linked to its Specification obligations (`R`):

| Field | Says | Not this |
| --- | --- | --- |
| requirement | the `U` row and every `R` it links | obligations left implicit, so a rule no observation decides hides under a covered requirement |
| proven by | one sentence the owner can read: what will be done, and what will be seen | "covered by e2e tests" |
| reference | what correct is judged against, from the Specification: its worked example, threshold, protocol version or checked known-good output | what the app does today, or a model's opinion of the output |
| target and journey | the app or package with its planned build, platform, configuration and client; the `verify-<app>` journey that will observe it, or `needed:` with the entry it must drive and what it must read | a journey you didn't read; "the app" |
| lifetime | for a row that names a journey: `lasting` when its outcome will be checked again, or `temporary` for a one-time check | a lifetime on a row that a focused test, structural evidence or a reused real-path test decides |
| passes when | what is seen, where, matched against the reference, and the wrong build that fails it | "works"; an exit code, a success toast or any other acknowledgement |
| reuses | the real-path test that already decides the row, with the target and configuration it depends on, or `none` | a test that mocks the interaction the row claims |
| unverified | what stays open: platforms not tried, stand-ins still in place, access nobody has granted, journeys still to build | blank |

Several rows may share one observation. Describe a shared observation once, and have each row name it and say which of its obligations it decides.

## Workflow

### 1. Take in the design being proven

MUST load `sunstack-dev/shared-references/design-documents.md` and return the current Requirements, Specification and Program Design identities, the Verification Design's own identity beside the Program Design, the HTML-source layout, stable section targets and entry/navigation duty this run follows, and the design-item shape, nudge labels and ranking this run uses. When the caller supplies a `new artifact home`, create a new Verification Design beneath it and return its exact path. Read all three upstream documents whole. For each requirement, take its obligations and each obligation's proof obligation (`V`: the expected behavior, threshold, target constraints and reference) from the Specification, and each obligation's proof seam from the Program Design's trace table. When revising a stale design, re-open what changed (an obligation, a seam or a journey) and redo only the rows it touches; for a `verification-design-gap`, start from the requirements its payload names, or from the affected rows a `plan-update` lists. For an accepted review finding or a Verifier challenge, correct only the rows it names and re-check those rows against Not ready while; nothing broader reruns, and a finding whose cause is upstream returns as its token.

A row is stale when, since its review, any of these changed:

- its target, platform or configuration;
- its journey or test matrix, changed or dropped;
- its obligation;
- a required capability it covers, descoped;
- a dependency its observation uses;
- plan scheduling it depends on.

A stale row is updated and re-reviewed.

Completion: every requirement is listed with its obligations, references and seams, or with the exact piece that is missing.

### 2. Read what already observes the app

For the app each requirement is about, read the project's `verify-<app>` skill under `.agents/skills/`: its journey index, and the journeys these requirements touch with the scripts they run. Read the real-path tests, integration and end-to-end, that enter at the same points. Before you name a journey or test as covering a requirement, read from its source what it drives, against which build and configuration, what it keeps real and what it replaces, and where it looks (a name says what something is for; its source says what it does (`sunstack-dev:principle-read-ground-truth-first`)). A missing `verify-<app>` skill, or one that doesn't reach a requirement's entry, doesn't stop the design: those rows name the journey still needed.

Completion: each requirement's entry has its journeys and real-path tests with what each drives and observes, or `none found` with where you looked.

### 3. Choose each observation

MUST load `references/choosing-the-observation.md` and return, for each obligation, the evidence class, the boundary where its wrong behavior stays real, the target, the journey or test that will observe it (existing, or needed with its entry and observation), each journey's lifetime, and any gap.

When you place each observation, put it where the user or calling program meets the outcome, through the real entry on the planned target (a passing test proves only what it observes (`sunstack-dev:principle-prove-it-works`)). Scale the proof to the claim: a pure rule is proven by a focused test and launches no app, and a structural claim, such as a schema or a skill's text, gets structural evidence that names the behavior it leaves unevaluated.

An existing journey or real-path test that already drives this entry and would fail for the wrong behavior is the proof; name it, and add no manual journey just so the check looks independent. Before you count it, check from its source that it keeps the row's interaction real rather than mocked, and name the target, configuration and client it depends on (evidence supports only the claim, version and target it observed (`sunstack-dev:principle-verify-before-accepting`)). Reuse is planned here; the Verifier checks at delivery whether it still applies. Write each reused piece of evidence you trust without re-observing it, and each stand-in target, as an `assumption` design item in the same edit as its row.

When no Program Design seam lets any observation see an obligation's outcome, record a `program-design-gap` with the obligation and what the observation would need to see. When the Specification gives the obligation no observable outcome, reference or threshold, record a `specification-gap`. Never weaken the obligation to fit the current harness.

Completion: every obligation is decided by a named observation at its boundary, or carries a recorded gap.

### 4. Write each passing condition and its limits

Write the passing condition as an observation: what is seen, where, against which part of the reference, on the planned target. After writing it, name one wrong build and check that the condition fails for it, and one materially different allowed build and check that it passes (a check counts only if the wrong behavior could make it fail (`sunstack-dev:principle-write-tests-that-can-fail`)). If a build that only acknowledges, by returning 201 or showing a toast, would also pass, the condition watches a proxy; move it to the outcome.

List what the row leaves unverified. A named limit is honest, but it waives nothing: a limit that leaves a required observation undone, or weakens it, is the owner's decision. Write each limit you accept as a `decision` design item in the same edit; its authority shows whether that owner decision exists.

Write every row as a plan. Its target properties describe the build that will exist, not one anyone saw, and no row says or implies that a run happened.

Completion: every row has a passing condition with the wrong build that fails it and its unverified list, and every limit that weakens required proof is marked for the owner.

### 5. Write the document and its views

The rows are the document's one home, with the shared observations under them. When you write each "proven by" line, say in the owner's words what will be done and what will be seen, with no test-layer jargon (write so a reader without your context can say it back (`sunstack-dev:principle-write-for-the-reader`)). Link to the Specification's obligations and the Program Design's seams instead of restating them.

Two readers need views over the rows:

| View | Owner's question | Use when | Must expose |
| --- | --- | --- | --- |
| "proven by" explanation, for the owner | How will we know it works, and what stays unverified? | every Verification Design | per requirement: the requirement in the owner's words, its "proven by" line, and what stays unverified |
| coverage rows, for review, the plan and the Verifier | none: agent detail, one action away on the owner's page | every Verification Design | per requirement: `U`, its `R` obligations, seam, observation, target with its journey or reused test, passing condition and unverified; each shared observation visible across the rows it serves |

MUST load `sunstack-dev/shared-references/diagram-rendering-and-fallbacks.md` with both views, their predicates and their fields, and return the document medium and any page proof, and each view's selected medium, semantic-preservation result, visual-check result and exact gap.

In a file-backed set, use `sunstack-dev:presentation-html` to author the complete Verification Design as HTML. Explain each requirement's planned proof in prose, a meaningful card or a table as the reader question warrants; keep reference, target, observation, passing condition and unverified limits inspectable. Describe a shared observation once and link the rows it serves. Use the recipe's proof and open-question examples. An actual component's preparation is conditional on selecting it. Update `index.html` and actual requirement/design links. For a new v2 HTML set, follow the shared navigation preflight in the composition recipe and return actual descriptor/page/target identities and check/delivery result; the guide owns its schema. Then run the matching static check.

For each substantive proof explanation, lead with what will be done, what will be seen, and which outcome decides the obligation, and pair that answer with a supported relational diagram of the observation path. Explain how the source/target reaches the deciding observation and interpret the relationship beside the diagram. A table may support exact fields but does not replace the substantive path view. One section or diagram may explain a shared observation for several obligations; each requirement keeps its own complete row and link to that observation, with reference, target/journey, passing condition and unverified limit. A planned view or observation is not a result, and a tiny fact does not need its own diagram section.

Completion: the document has one row per requirement, both views have a passing rendering result or an exact gap, and in a file-backed set its HTML source, stable section links and `index.html` entry are current.

### 6. Re-read it as the Verifier would

Re-read the whole document as the Verifier who must challenge it before the build, against every item in Not ready while. Fix each failing row. What can't be fixed here leaves the design as one of the gap or decision results below. This self-check never replaces the integrated review.

Then run the design-item pass:

1. **Sentence support, first.** Read every sentence that settles a target, a reused piece of evidence or a limit. Ask of each: does its source support all of what it claims? Return an `unsupported claim` nudge for each one that it does not, with where to read.
2. **Items.** Return, for each design item, every applicable label from `design-documents.md`'s nudge labels, or `ok` alone. IF an owner-message export is supplied, look each quoted span up by its authority (`owner-words`: the owner's own text in the cited row; `owner-accepted`: the agent's wording and the owner's acceptance in the cited selection record itself or a later acceptance event); otherwise return `quote not checked` with each quoted item's source.
3. **Rank and promote** the `author` and `unknown` items, bring the high-ranked ones that need the owner as decisions, and keep the entry page's item list exact and in rank order.

Every result of this pass is a nudge; it adds nothing to Not ready while.

Completion: every item in Not ready while is cleared, or its row is returned as a gap or a decision.

## Return

Return exactly one:

```text
locally-ready
specification-gap
program-design-gap
decision-needed
evidence-blocked
```

- `locally-ready`: no item in Not ready while holds. Return the four identities (Requirements, Specification, Program Design, Verification Design), each obligation's deciding observation or named limit, the journeys still needed with their lifetimes, the tests reused, the rendering results, and the statement that nothing has been observed or reviewed. Lead with the owner's "proven by" view.
- `specification-gap`: an obligation lacks the observable outcome, reference, threshold or target constraint its row needs. Return each obligation, what it lacks and the evidence. Carry any Program Design gaps in the same payload, because a changed obligation can change its seam.
- `program-design-gap`: no seam lets an observation see an obligation's outcome. Return each obligation, the seam its trace row names, what the observation would need to see and the evidence.
- `decision-needed`: a limit would leave a required observation undone or weaken it, or the planned target needs access, a device or an account only the owner can grant. IF returning `decision-needed`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief.
- `evidence-blocked`: a load-bearing document, journey or test can't be read. Return the source and the access it needs.

Then return one route:

```text
locally-ready       -> recommend design-review in four-document-design mode
specification-gap   -> return the token and its payload
program-design-gap  -> return the token and its payload
decision-needed     -> stop with the brief
evidence-blocked    -> stop with the exact source and access
```

A review handoff carries pointers to the four documents, this return and the review question; it copies no document.

## Not ready while

- a requirement has no row, or a row leaves its obligations implicit;
- an obligation is decided by no observation and isn't listed as unverified;
- a row's reference is the app's current behavior, a model's judgment, or missing;
- a passing condition names no wrong build that fails it, or an acknowledgement alone would pass it;
- a journey is named as existing without its source read, or a needed journey is missing from the return;
- a row that names a journey has no lifetime, or a row with no journey carries one;
- a reused test mocks the interaction its row claims;
- a pure rule or structural claim is given an app launch, or an outcome the user meets in the app is given only a unit test;
- a row says or implies that something was observed;
- a limit leaves a required observation undone or weaker without the owner's decision;
- a view lacks a passing rendering result or an exact gap;
- a seam or Specification gap was worked around inside a row instead of returned.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `sunstack-dev:practices-show-me-your-work`.
