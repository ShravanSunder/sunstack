---
name: skill-rules-authoring
description: "Use when deciding which of a skill's standards become checked rules, or designing or correcting a rule or filter: its chunk, questions, examples and cases. Not for rulebook syntax or lint runs."
---

# Skill Rules: Authoring

A judged rule is a measurement instrument for one of a skill's standards. Its chunk decides what it looks at; its questions are the operational definition of the line the standard's owner draws; its `reference` teaches the model what the standard means; and its cases, the owner's rulings among them, are the only test that the questions draw that line. So the cases come first, they are read against the questions on the text the model will receive before any run is paid for, and none of them ever leaks into the instrument as an example.

The held kind filter and product-workflow rule show why the order matters. Both had the right shape (small questions, one fact each, policy in code) and both failed their development run. The filter's examples were two of its own scored folders, with their labels. The rule's first question asked whether a section shows commands and files, while the owner's line was whose commands and files they are and how they're used; it warned on five sections the owner had ruled quiet. Reading the owner's rulings against the questions, on the state each request would carry, showed every one of those failures before the run.

A rule's finding is a nudge to whichever agent runs it: the writer checking its own text, a review lead, the Lead accepting a change. It says what it noticed, where, which standard makes it a concern, and where else to read, and the agent decides. A decided breach is one kind of nudge; "worth checking, and here is where to read" is another. Each rule stays about one property, so several rules can nudge about one line without any of them raising every concern.

Most of a skill never becomes a rule. Each standard lands in one of six outcomes: deterministic, model-judged, worth checking, review-only, eval or prose. Only the first three carry a marker.

Who owns what: the design judgment is this skill's. The standards for any decision model are `domain-decision-models`', loaded at design. How the rulebook's files are spelled, and how lint and its case runs are run and read, is `skill-rules-config`'s. Independent review of a rule is `skill-rules-review`'s.

## Workflow

A run that starts from a refusal, a held rule or a bad result still walks steps 1 to 4 for the standards it touches: whether a standard should carry a rule at all, and what its cases say, decide the fix. A mechanical rule skips steps 3 and 6 and is proven by edge tests at step 8.

### 1. List the candidate standards

Read the skill's `SKILL.md` and every reference whose standards are in scope. List each sentence, list item, paragraph or section that states a requirement that text or agent behavior can keep or break, with its `path:line`, its exact wording and the Markdown unit it sits in.

Completion: every candidate is quoted with its `path:line` and unit, and anything left off the list states no requirement; length is never the reason.

### 2. Classify each standard

MUST load `references/decision-matrix.md` and return, for each candidate, its outcome with the property it depends on, and for each marked outcome its evidence kind, its gate or why it needs none, and for a proxy the standard it approximates.

Completion: every candidate has exactly one outcome and a reason; each deterministic outcome survived a counterexample search in both directions; each marked outcome names an evidence kind whose pieces hold what the standard judges; no review-only, eval or prose standard has a marker planned. A restatement of a standard elsewhere in the same skill is the same standard, marked once on its most complete host. A candidate that reads as a standard only after a rewrite goes back unmarked, as a teaching change to the standard's home.

### 3. Gather the cases first

For each judged rule and filter, MUST load `references/cases-and-proof.md` and return its cases: each real piece or folder at a fixed revision with its expected answer and the origin of its label, split into development and held-out sets, with the floors the set meets or what it lacks.

Every ruling the owner has made on a real piece is a case, and goes in the case file with `label_from: owner-ruling`. None goes into the rule's `reference`.

```text
rule:            an owner's ruling is never a reference example.
rationalization: "The rulings are the best examples we have; the model should see them."
why it fails:    a case whose answer rides in the request can only show the model can copy it.
                 The kind filter scored right on both of its leaked folders, and that told
                 nobody whether it could label a folder it hadn't been shown.
```

Completion: every judged rule and filter has its cases in the case file, every owner ruling among them, each with its label's origin; the floors met or lacking are named; and the held-out set was written by someone other than whoever tunes the rule, and you haven't read it.

### 4. Design each marked rule or filter

MUST load `../domain-decision-models/SKILL.md`, then MUST load `references/rule-design.md`, and return per rule or filter the design its outcome calls for: the judgment and who makes it; the chunk, mechanical or a chunk tree, with the reason; the tree, with each question's meaning drawn from step 3's cases; the `reference`, written from the standard; the nudge each finding route gives; the policy; and the proof plan. A field that doesn't apply is marked `not applicable` with its reason, never invented.

Completion: each of these is stated as kept, with the line that shows it, or `not applicable` with its reason. A rule failing any goes back to step 2:
- the chunk is chosen for a stated reason: the shape decides which pieces the standard governs, or the shape finds candidates and choosing among them takes reading;
- each question's criteria state the owner's line in the owner's terms, and name which step-3 cases fall on each side of it;
- one property is one question; no question was split to add nodes;
- every `reference` example is written from the standard, and none is a step-3 case or a near copy of one, or carries a case's answer;
- each mechanical node decides only what its predicate fully captures;
- a route whose evidence can't settle its standard ends in a nudge or `uncertain`, never `pass`;
- each finding route says what the agent receives and where it reads next;
- the proof plan fits the outcome.

### 5. Write it

MUST load `../skill-rules-config/SKILL.md` and use it to write each marker, entry and filter from step 4's design, pair the rulebook, run the check, and print the evidence for each rule's kind over its whole denominator. Return the check's printed rules with their count, and the print's reading for each rule. Mark the narrowest host whose visible words, read with nothing around them, state the standard.

Completion: the check passes with every intended rule printed and the count right; each printed standard reads as itself; and the print shows every intended piece with its fields, every cut named.

### 6. Desk-check before any paid run

Using `references/cases-and-proof.md`'s desk check, read every owner-ruled development case, and as many other development cases as the floors need, on the state its request will carry, against the questions; then compare every `reference` example with every case. Return the desk-check record: per case, the decisive content the state holds, what each question's meaning gives it, and whether that matches its label; per example, whether it matched any case.

A case whose label the meaning doesn't reproduce goes back to step 4: first look for missing decisive content in the state, then change the meaning. The label never changes, and the question is never split to dodge the case.

```text
rule:            no paid run before the desk check is clean.
rationalization: "The run will tell us. Reading every ruling by hand takes too long."
why it fails:    the run tells you the same thing a thousand requests later, and its answers
                 can't be reused once the meaning changes. Every false warning and wrong
                 label the held trees gave on an owner's ruling was readable on its state first.
```

Completion: every owner-ruled development case has a row, every row matches its label, and no example matches any case.

### 7. Review before the first paid run

Start a reviewer with no authoring history on `skill-rules-review`, the way the host starts a reviewer, and give it step 4's design, the entries and config, the evidence print, the desk-check record and the development case file; never the held-out set. Return its verdict and findings. Each accepted finding goes back to the step that owns it, and the review runs again on the correction. If the host can't start a separate agent, stop and say so: a rule reviewed by its author hasn't been reviewed.

Completion: the verdict is `ready` for the development run, or every accepted finding is back with its owning step.

### 8. Prove, and decide on or held

Using `references/cases-and-proof.md`, with the commands from `skill-rules-config`'s case runs: run the development set; set each bar from the development results and record it with the cases that set it; freeze the questions, reference, evidence and bars; then run the held-out set once. Return per judged rule and filter: the outcome of every case, scored or listed with why; the floors met or lacking; each bar with its development cases; the model requested and the version that answered; the baseline comparison or its gap; and the decision, on or held, with what a held rule lacks. Return per mechanical rule its edge tests.

Keep three observations apart: the collection (the evidence print), the tree (the case results), and the receiving agent's call, which only a pressure task observes and which stays named as unproven until one has run.

Completion: every judged rule has its development run and, frozen, its one held-out run, or the missing run named as unproven; every case is counted or listed; every rule short of a floor or a switch-on condition is held, with what it lacks; every mechanical rule has edge tests that pass and fail where its standard does.

### 9. Return

Return the decision table, the desk-check record, the review verdict, the diff, and the check, evidence and case results its proof column cites:

```text
| standard (path:line, quoted) | outcome | reason | host | marker | rule ID | judgment | chunk | evidence | gate | questions | reference | cases | desk check | tree | policy | severity | read next | review | proof | version | baseline | on or held |
```

One row per candidate from step 1; unmarked outcomes leave host through the last column empty. Name what stays unproven: cases test a rule's decisions at the lines they name, not how many real pieces its kind misses; a lint run over today's skills is supporting evidence, not a held-out set or an accuracy rate; the receiving agent's call waits for a pressure task.

Completion: the table has one row for every candidate step 1 listed, each marked row's proof points at a result you kept, and every rule still owed a result is named with what would close it.

## Completion Blockers

The run is not done while any of these hold:

- a candidate has no outcome, or its reason doesn't name the property;
- a deterministic outcome rests on a check nobody searched for counterexamples, or a proxy is recorded as the standard's verdict;
- a review-only, eval or prose standard carries a marker, or a marker sits on wording that needed rewording to read as its standard;
- an owner's ruling, or any case, sits in a `reference`, or an example carries a case's answer;
- a question's meaning was repaired by splitting it into more questions, or a label was changed to fit a question;
- a chunk was judged by a tree where its shape decides, or a judged rule asks of every piece of a kind its standard mostly doesn't cover, with no gate;
- a paid run was made before the desk check was clean, or before the independent review returned `ready` for it;
- a route whose evidence can't settle its standard ends `pass`, or a path that reads a model's answer can reach an `error` finding;
- a held-out case was read, desk-checked or tuned on by whoever tunes the rule;
- a judged rule warns before its cases meet the floors, or a held rule was switched on;
- a passing check or evidence print is claimed as proof that a rule decides well, or a rule's case results as proof of what an agent does with its nudge.
