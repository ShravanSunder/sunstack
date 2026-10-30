---
name: skill-rules
description: "Use when deciding which of a skill's standards become checked rules, writing or fixing their markers and rule entries, or reading a rule run's results. Not for a skill's teaching."
---

# Skill Rules

A checked rule is a decision model for one of a skill's own standards. A marker binds the standard's wording where the skill states it, and the rule entry behind the marker names the evidence kind the standard governs (pieces such as a skill's description, a step, a load call or a list item, picked from the checked files with their named fields) and a decision: mechanical checks and questions to the decision model, routed to `pass`, `finding`, `not_applicable` or `uncertain` for each piece. The judge sees the standard's own words beside every piece, so mark only text whose own wording is the standard. A sentence that would need rewording to be checkable isn't ready for a marker: the rewrite is a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`, made before any marker goes on.

A good decision model asks only of the pieces its standard covers. Most kinds hold pieces a standard doesn't govern: a list item that is a label, a section that is a lookup table, a paragraph that is a local instruction rather than a rule. A gate sends those to `not_applicable` before the verdict is asked, and a piece whose answers fall between the thresholds comes back as `uncertain` for the agent running the check to decide.

Most of a skill should never become a rule. Each standard lands in exactly one of five outcomes:

| outcome | when | marked |
| --- | --- | --- |
| deterministic (a mechanical check in the decision) | the property is visible in one field of one piece, and the check passes every piece that keeps the standard and fails every piece that breaks it | yes |
| model-judged (questions in the decision) | deciding needs reading comprehension, one piece's fields hold what the judgment needs, and the marked wording alone states the standard | yes |
| review-only | it needs cross-file, history or intent judgment, or a piece no evidence kind picks; `skill-review` owns it | no |
| eval | it is about what an agent does under pressure; it belongs in evals or pressure scenarios | no |
| prose | teaching, rationale or stance with no checkable claim | no |

Prefer deterministic when the check fully captures the standard. **A proxy isn't the standard.** A lexical or structural check that only approximates a semantic standard fails the counterexample test: `MUST load reference.md and return.` contains both `MUST load` and `return`, yet names no result. That standard is model-judged. A proxy may still be a mechanical step inside the standard's decision, such as a gate, but never its verdict.

The engine's lint documentation owns every exact shape: the config, the rule entry, the question types, the decision steps and the report. Read it, and the rules files the repository already has, before writing an entry.

IF a step runs this plugin's rules on a skill's files instead of writing or proving rules, as a writer's self-check, a review's first rule pass, a release's prove step or an audit does, load `references/running-rules.md` and return the run's status, each finding with its file, line and your call, each `uncertain` piece with your decision, and each gap. That run ends with its return; the workflow below is for writing and proving rules.

## Workflow

A run that starts from a refusal or a broken rule still walks steps 1 and 2 for the standards it touches, because whether a standard should carry a marker at all decides the fix.

### 1. List the candidate standards

Read the skill's `SKILL.md` and every reference whose standards are in scope. List each sentence, list item, paragraph or section that states a requirement that text or agent behavior can keep or break, with its `path:line`, its exact wording and the Markdown unit it sits in. Completion: every candidate is quoted with its `path:line` and unit, and anything left off the list states no requirement; length is never the reason.

### 2. Classify each standard

MUST load `references/decision-matrix.md` and return, for each candidate, its outcome with the property that outcome depends on, and for each marked outcome its evidence kind, its gate or why it needs none, and for a proxy the standard it approximates. Completion: every candidate has exactly one outcome and a reason; each deterministic outcome survived a counterexample search in both directions; each marked outcome names an evidence kind whose pieces hold what the standard judges; no review-only, eval or prose standard has a marker planned. A restatement of a standard elsewhere in the same skill, such as a checklist or summary item, is the same standard: mark it once, on the host whose wording states it most completely, and record the others as covered by that rule. A candidate that reads as a standard only after a rewrite goes back unmarked, as a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`.

### 3. Mark the standards

MUST load `references/markers-and-rules.md` and return, for each marked standard, its host and marker, its rule entry, and any change to the config's rulebook pairs or evidence kinds, to apply in steps 3 to 5.

Mark the narrowest host that carries the whole standard: a list item or paragraph before a section, and a section only when the whole section is one standard and stays under the config's `max_question_words`. The marker is the last thing on its line in the host, touches heading text with no space, uses the config's prefix letter, and appears at most once per Markdown file; one file may carry many distinct IDs. Completion: every marker sits on an allowed host, and the host's visible words, read with nothing around them, state the standard.

### 4. Write the rule entries

Write one entry per marker in the rules file paired with that Markdown file, keyed by the marker ID: a `name` that becomes the rule ID, the `evidence` kind, the `questions` the decision may ask, the `decision` graph, and the `severity`. A judged entry has a gate whenever its kind holds pieces the standard doesn't cover, and states its thresholds; a mechanical check whose failure is itself a breach of the standard ends in a `finding` with no question asked. Completion: every marker has one entry and every entry one marker; each entry's checks and questions match its standard's outcome from step 2; every route ends in a named step, `pass`, `not_applicable`, `uncertain` or a `finding` at the field the standard governs.

### 5. Pair the rulebook in the config

Open the config the repository's rule runner uses. When the Markdown file is new to it, add its pair to `rulebook`, both paths relative to the config; when an entry names an evidence kind or field the config doesn't define, the kind and its evidence rule are a change to the config and its evidence project, made and proved there. Completion: the check (step 6) lists every intended rule with the expected count. A clean check that omits one is not paired.

### 6. Prove each rule

MUST load `references/check-and-reports.md` and return the check's outcome and printed rules, the evidence print for each rule's kind with the pieces you meant it to judge, and the rule tests for each rule with their per-rule results.

Completion: the check passes on the real engine and prints every intended rule with the expected count, each standard reading as its question; the evidence print shows each rule's intended good and bad pieces with their fields filled; every mechanical rule has edge tests with no model that pass and fail where the standard does; every judged rule has labelled development cases run on the decision model, and its held-out results once its entry is frozen, or the missing ones named as unproven. Rules run locally, by the skills that use them, not in CI.

### 7. Return

Return the decision table, the diff, and the check, evidence and rule-test results its proof column cites:

```text
| standard (path:line, quoted) | outcome | reason | host | marker | rule ID | evidence | gate | verdict | proxy for | proof |
```

One row per candidate from step 1. Unmarked outcomes leave host through proof empty. `proof` names the edge results for a mechanical rule and the development and held-out results for a judged one. Name what stays unproven: named cases test a rule's decisions on chosen pieces, not how many real pieces its evidence kind misses, and no result here makes a judged rule ready to block.

## Completion Blockers

The run is not done while any of these hold:

- a candidate has no outcome, or its reason doesn't name the property;
- a deterministic outcome rests on a check nobody searched for counterexamples, or a proxy is recorded as the standard's verdict;
- a review-only, eval or prose standard carries a marker;
- a marker sits on wording that needed rewording to read as its standard;
- a judged entry asks of every piece of a kind that holds pieces its standard doesn't cover, with no gate;
- a refusal was cleared by raising the cap, deleting the standard, or moving the marker to text that doesn't state it;
- the check's print lacks an intended rule, or the count is off;
- a mechanical rule lacks edge tests that pass and fail where the standard does, or a judged rule is called accurate without labelled cases;
- the check wasn't run on the real engine, or a passing check or evidence print is claimed as proof that a rule decides well.
