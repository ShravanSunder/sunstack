---
name: skill-rules
description: "Use when deciding which of a skill's standards become checked rules, designing a rule's questions and thresholds, writing its markers and entries, or reading a rule run. Not for a skill's teaching."
---

# Skill Rules

A checked rule is a nudge to whichever agent runs it: the writer checking its own text, the review lead, the Lead accepting a change, a rule's writer or its reviewer. It names the judgment it helps that agent make, collects the chunk of evidence that judgment needs, and says what it noticed, where, which standard makes it a concern, how the result was reached, and where else to read. The agent reads those places and decides. A decided breach is one kind of nudge; "worth checking, and here is where to read" is another. Each rule stays narrow, about one property: the agent puts several rules' nudges on one line together, so no rule has to raise every concern about its line.

A rule is a decision model for one of a skill's own standards. A marker binds the standard's wording where the skill states it. The rule entry behind the marker names three things:
- **the evidence kind the standard governs:** the chunk each piece holds, such as a skill's description, a step, a load call, or a section's own text with the files it loads, picked from the checked files with their named fields;
- **a decision:** mechanical checks and questions to the decision model, routed to `pass`, `finding`, `not_applicable` or `uncertain` for each piece;
- **the nudge each finding gives:** its message, its severity, the line it points at and the fields whose places the agent reads next.

A filter is the same kind of decision model at a coarser grain. It decides one label per folder, such as which kind of skill the folder holds, and a rule's `only_when` runs the rule only in folders with the labels it names. A filter is written as a tree of small questions that ends in one of its declared labels or `unsure`, never as one big question across all its labels. Rules and filters can both carry a `reference`: worked examples (the text, the right answer and why), definitions and boundaries, written once in the rulebook, which reach the model in the request's state. A question's wording says what its answers mean and names the reference it reads; examples aren't pasted into it.

The judge sees the standard's own words beside every piece, so mark only text whose own wording is the standard. A sentence that would need rewording to be checkable isn't ready for a marker. The rewrite is a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`, made before any marker goes on.

The practice of designing and proving a decision model belongs to the `sunstack-dev` skill `domain-decision-models`. This skill loads it at design and at proof, and doesn't restate it. A good rule asks only of the pieces its standard covers: most kinds hold pieces a standard doesn't govern, such as a list item that is a label, a lookup table, or a local instruction rather than a rule. So every rule's design names its applicability decision: which established fact lets its gate end a piece `not_applicable` before the verdict, or why every piece of its kind falls under the standard.

Most of a skill should never become a rule. Each standard lands in exactly one of six outcomes:

| outcome | when | marked |
| --- | --- | --- |
| deterministic (a mechanical check in the decision) | the property is visible in one field of one piece, and the check passes every piece that keeps the standard and fails every piece that breaks it | yes |
| model-judged (questions in the decision) | deciding needs reading comprehension, one piece's fields hold what the judgment needs, and the marked wording alone states the standard | yes |
| worth checking (questions in the decision; the finding says what to check) | one piece's chunk gives a grounded reason to look, but settling the standard needs what no chunk holds, such as intent or where a workflow should live; the rule's `warn` finding says what to check and where to read, and never claims a breach | yes |
| review-only | no chunk can ground it: it needs session history, a record of who did what, or a fresh agent's run; `skill-review` owns it | no |
| eval | it is about what an agent does under pressure; it belongs in evals or pressure scenarios | no |
| prose | teaching, rationale or stance with no checkable claim | no |

Prefer deterministic when the check fully captures the standard. **A proxy isn't the standard.** A lexical or structural check that only approximates a semantic standard fails the counterexample test: `MUST load reference.md and return.` contains both `MUST load` and `return`, yet names no result. That standard is model-judged. A proxy may still be a mechanical step inside the standard's decision, such as a gate, but never its verdict.

The engine's lint documentation owns every exact shape: the config, the rule entry, the question types, the decision steps and the report. Read it, and the rules files the repository already has, before writing an entry.

Every run that sends model requests needs the key and the grant to send them. That covers a rules run, and an evidence print over a selected kind or a kind that lies `within` one. Without that grant, prepare the exact command and config, hand them to whoever holds the grant, and read the report it keeps.

IF a step runs this plugin's rules on a skill's files instead of writing or proving rules, as a writer's self-check, a review's first rule pass, a release's prove step or an audit does, load `references/running-rules.md` and return the run's status, the account for each nudge (fixed, kept, routed or open, with the places you read), each `uncertain` piece with your decision, the gaps by kind, and the decided exclusions apart from them. That run ends with its return; the workflow below is for writing and proving rules.

## Workflow

A run that starts from a refusal or a broken rule still walks steps 1 to 3 for the standards it touches, because whether a standard should carry a marker at all, and how its decision is built, decide the fix.

### 1. List the candidate standards

Read the skill's `SKILL.md` and every reference whose standards are in scope. List each sentence, list item, paragraph or section that states a requirement that text or agent behavior can keep or break, with its `path:line`, its exact wording and the Markdown unit it sits in. Completion: every candidate is quoted with its `path:line` and unit, and anything left off the list states no requirement; length is never the reason.

### 2. Classify each standard

MUST load `references/decision-matrix.md` and return, for each candidate, its outcome with the property that outcome depends on, and for each marked outcome its evidence kind, its gate or why it needs none, and for a proxy the standard it approximates. Completion: every candidate has exactly one outcome and a reason; each deterministic outcome survived a counterexample search in both directions; each marked outcome names an evidence kind whose pieces hold what the standard judges, or for worth checking, what grounds the reason to look; no review-only, eval or prose standard has a marker planned. A restatement of a standard elsewhere in the same skill, such as a checklist or summary item, is the same standard: mark it once, on the host whose wording states it most completely, and record the others as covered by that rule. A candidate that reads as a standard only after a rewrite goes back unmarked, as a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`.

### 3. Design each marked rule

MUST load the `sunstack-dev` skill `domain-decision-models`. When it isn't installed, return `skill unavailable: domain-decision-models` and stop: a rule designed without the practice is the failure this step exists to prevent.

Then MUST load `references/rule-design.md`, and return per marked rule the design its outcome and its nodes call for. A field that doesn't apply is marked `not applicable` with its reason, never invented. The design walks five things, in this order, because each one decides what the next can ask:
1. **the judgment** the nudge helps, and which agent makes it;
2. **the chunk:** its subject (what one piece is), its denominator (which files and pieces the rule scans, so "unread" means something), its context and edges (one hop, declared), the fields its nodes read and its budget (the size cap, and what a cut means for the answer), shown on real sources with an evidence print;
3. **the tree:**
   - its gate with the established fact that lets it drop a piece, or why it needs none;
   - each mechanical node's predicate, field, routes and step 2's counterexample search;
   - each question's type, proposition, evaluated field and criteria, with the encoded state for sampled good, bad and near-miss pieces or the named evidence gap;
   - the `reference` its questions share, and the parts each question names;
   - the `complete` check before any pass that rests on a "no" about text the piece read, including the files it loads;
   - each threshold's statistic, inequalities and in-between route, precedence and first-failure order, and the labelled costs its policy rests on;
4. **the nudge** each finding route gives: what was observed, the standard, the severity, the line it points at, the fields whose places become "read next", and any direction to a place the run never reads;
5. **the proof plan,** with three observations kept apart: the collection, the tree on real skill text at a fixed revision (development and held-out cases run through `sunstack lint cases`), and the receiving agent's call, which is a pressure task.

A filter's design walks the same five, with a label in place of the nudge: which folders it labels, what it reads from each, its tree of small questions, the label each ending gives, and its cases.

Completion: each of these is stated as kept, with the line that shows it, or `not applicable` with the reason. A rule failing any goes back to step 2:
- the decisive content is in the field or state its nodes read, and the evidence print shows it there;
- each mechanical node decides only what its predicate fully captures;
- each node that reads a model's answer asks one proposition that passes the standard's own bad examples, and has its policy with inequalities and routes;
- a route whose evidence can't settle its standard ends in a nudge or `uncertain`, never `pass`;
- each finding route says what the agent receives, and where to read next;
- the proof plan fits the outcome.

### 4. Mark the standards

MUST load `references/markers-and-rules.md` and return, for each marked standard, its host and marker, its rule entry with its nudge fields, and any change to the config's rulebook pairs or evidence kinds, to apply in steps 4 to 6.

Mark the narrowest host that carries the whole standard: a list item or paragraph before a section, and a section only when the whole section is one standard and stays under the config's `max_question_words`. The marker is the last thing on its line in the host, touches heading text with no space, uses the config's prefix letter, and appears at most once per Markdown file; one file may carry many distinct IDs. Completion: every marker sits on an allowed host, and the host's visible words, read with nothing around them, state the standard.

### 5. Write the rule entries

Write one entry per marker from step 3's design, in the rules file paired with that Markdown file, keyed by the marker ID:
- a `name` that becomes the rule ID;
- the `evidence` kind;
- the `questions` the decision may ask, each naming the fields and `reference` parts it reads;
- the `reference`, when its questions share examples or definitions;
- the `decision` graph, whose finding routes carry the nudge: the message, the field it points at, and for a section-sized subject a locator that points it at the observed line;
- the `related` fields, whose places every finding lists after the standard's own line;
- the `severity`: `warn`, the nudge, for any path that reads a model's answer, gate included; `error` only where every path to the finding is mechanical.

A filter's entry sits in the config's `filters`, with its `reads`, `labels`, `questions`, `decision` and optional `reference`, and the rules it gates name it in `only_when`.

Completion:
- every marker has one entry, and every entry one marker;
- each entry's gate, checks, questions and thresholds are the ones step 3 designed;
- every route ends in a named step, `pass`, `not_applicable`, `uncertain` or a `finding` at the field the standard governs, and every ask declares where its in-between answer goes;
- each finding route carries the message, severity and locator step 3 designed, and the entry's `related` names the fields its nudges send the agent to read.

### 6. Pair the rulebook in the config

Open the config the repository's instructions name for `sunstack lint`. When the Markdown file is new to it, add its pair to `rulebook`, both paths relative to the config. When an entry names an evidence kind or field the config doesn't define, the kind and its evidence rule are a change to the config and its evidence project, made and proved there. Completion: the check (step 7) lists every intended rule with the expected count. A clean check that omits one is not paired.

### 7. Prove each rule

MUST load `references/check-and-reports.md`. Return the check's outcome and printed rules, and the proof in three observations kept apart:
- **the collection:** the evidence print for each rule's kind over its full denominator, with the pieces you meant it to judge, their fields, and every cut named;
- **the tree:** each mechanical rule's edge results, and for a judged rule or filter its case runs through `sunstack lint cases`: the development set, then, with the questions, reference and bars frozen, the held-out set once, each reporting right, false warning, missed, unsure and incomplete apart, with every case accounted for;
- **the receiving agent's call:** whether an agent given the nudge makes a justified call. That is a pressure task on the same real source: name it as unproven until one has run, and never infer it from the other two.

A judged rule warns anyone only once its cases meet these floors: at least three real mistakes that must warn, the text before a real fix among them; at least three good texts that must pass, the text after the fix among them; at least three near misses; every wrong warning it once gave on a real skill, as a case that must pass; and a held-out set it was never tuned on. A rule short of any floor stays off, with what it lacks listed.

IF a judged rule's or filter's case results are planned or read, apply `domain-decision-models`' proof standards and the reference its proof section calls. When it isn't installed, return `skill unavailable: domain-decision-models` and stop that proof. Return, per judged rule or filter:
- its result on every case, scored or listed with why (stale, no matching piece, more than one, filter-excluded, not judged);
- the floors it meets, or what it lacks;
- each bar with the development cases that set it, or "unassessed";
- the requested model and the version that answered;
- the comparison against the current rule as the baseline, or the gap that blocks it.

Completion:
- the check passes on the real engine and prints every intended rule with the expected count, each standard reading as its question;
- the evidence print covers each rule's denominator and shows its intended good and bad pieces with their fields filled, and every cut is named;
- every mechanical rule has edge tests, with no model, that pass and fail where the standard does;
- every judged rule and filter has its development run and its frozen held-out run on real skill text, with every case counted or listed, or the missing ones named as unproven;
- every judged rule that misses a floor stays off, with what it lacks;
- the receiving agent's call is named as unproven, owed to a pressure task.

Rules run locally, by the skills that use them, not in CI.

### 8. Return

Return the decision table, the diff, and the check, evidence and rule-test results its proof column cites:

```text
| standard (path:line, quoted) | outcome | reason | host | marker | rule ID | judgment | chunk | evidence | gate | questions | tree | policy | severity | read next | verdict | proxy for | proof | version | baseline |
```

One row per candidate from step 1. Unmarked outcomes leave host through baseline empty.
- `judgment` names the call the nudge helps and who makes it; `chunk` names the subject, denominator and edges.
- `questions`, `tree` and `policy` summarize step 3's design, with `not applicable` where it applies.
- `severity` and `read next` are the nudge's: `warn` or `error` with the basis that allows it, and the `related` fields, plus any direction the message gives.
- `proof` names the edge results for a mechanical rule, and the development and held-out case results for a judged one.
- `version` is the model version that answered, or the gap.
- `baseline` is the comparison against the current rule, or its gap.

Name what stays unproven: cases test a rule's decisions at the lines they name, not how many real pieces its evidence kind misses; a lint run over today's skills is supporting evidence, not a held-out set or an accuracy rate; the receiving agent's call waits for a pressure task; and no result here makes a judged rule ready to block.

Completion:
- the table has one row for every candidate step 1 listed;
- each marked row's proof points at a check, evidence print or rule-test result you kept;
- every rule still owed a result is named as unproven, with what would close it.

## Completion Blockers

The run is not done while any of these hold:

- a candidate has no outcome, or its reason doesn't name the property;
- a deterministic outcome rests on a check nobody searched for counterexamples, or a proxy is recorded as the standard's verdict;
- a review-only, eval or prose standard carries a marker;
- a marker sits on wording that needed rewording to read as its standard;
- a marked rule was written without step 3's design, or step 3 ran without `domain-decision-models`;
- a judged entry asks of every piece of a kind that holds pieces its standard doesn't cover, with no gate;
- a route whose evidence can't settle its standard ends `pass`;
- a finding route's design names nothing for the agent to read next beyond the standard's line, without saying why that line is enough;
- a chunk was relied on without an evidence print over real sources;
- a path that reads a model's answer can reach an `error` finding;
- a lexical or label check decides a verdict its standard asks to be read;
- a filter is written as one question with no tree, or examples are pasted into a question's wording instead of the `reference`;
- a pass rests on a "no" about text that wasn't fully read;
- a threshold has no statistic, inequality or costs;
- a refusal was cleared by raising the cap, deleting the standard, or moving the marker to text that doesn't state it;
- the check's print lacks an intended rule, or the count is off;
- a mechanical rule lacks edge tests that pass and fail where the standard does, or a judged rule is called accurate without labelled cases on real skill text, every case counted, or one version group;
- a committed copy of skill text, or an invented skill, stands as a judged rule's proof; a case was dropped or relabelled to make a run pass; or a held-out case was tuned on;
- a judged rule warns before its cases meet the floors;
- proof ran through a separate test tool instead of `sunstack lint cases`;
- a run that sends model requests was made without the grant;
- the check wasn't run on the real engine, a passing check or evidence print is claimed as proof that a rule decides well, a rule's case results are claimed as proof of what an agent does with its nudge, or proof is reported as passed where the record can't support it.
