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

A run that starts from a refusal, a held rule or a bad result still walks steps 1 to 4 for the standards it touches: whether a standard should carry a rule at all, and what its cases say, decide the fix. A mechanical rule skips steps 3, 6 and 8 and is proven by edge tests at step 9. Steps 5 to 7 send no model request.

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

Completion: every judged rule, filter and selection has its cases in the case file, every owner ruling among them, each with its label's origin; the floors met or lacking are named; and the held-out set is kept by a holder who isn't whoever tunes the rule, and you haven't read it.

### 4. Design each marked rule or filter

MUST load `../domain-decision-models/SKILL.md`, then MUST load `references/rule-design.md`, and return per rule or filter the design its outcome calls for: the judgment and who makes it; the chunk, mechanical or a chunk tree, with the reason; the tree, with each question's meaning drawn from step 3's cases; the `reference`, written from the standard; the nudge each finding route gives; the policy; and the proof plan. A field that doesn't apply is marked `not applicable` with its reason, never invented.

Completion: each of these is stated as kept, with the line that shows it, or `not applicable` with its reason. A rule failing any goes back to step 2:
- the chunk is chosen for a stated reason: the shape decides which pieces the standard governs, or the shape finds candidates and choosing among them takes reading; a selection names its required inclusions, every piece a must-warn case needs, in every form the standard governs;
- each question's criteria state the owner's line in the owner's terms, and name which step-3 cases fall on each side of it;
- one property is one question; no question was split to add nodes;
- every `reference` example is written from the standard, and none is a step-3 development case or a near copy of one, or carries a case's answer;
- each mechanical node decides only what its predicate fully captures;
- a route whose evidence can't settle its standard ends in a nudge or `uncertain`, never `pass`;
- each finding route says what the agent receives and where it reads next;
- the proof plan fits the outcome.

### 5. Write it, and prepare its requests

MUST load `../skill-rules-config/SKILL.md` and use it to write each marker, entry, filter and selection from step 4's design, pair the rulebook, and run the check. Then prepare, without sending: the development case file with `lint cases --set development --prepare`, and an ordinary run over each rule's whole denominator with `--prepare`, for the collection. Return the check's printed rules with their count, the prepared reports' paths, each development case's request id or why it wasn't prepared, and every `needs_answer` entry. Mark the narrowest host whose visible words, read with nothing around them, state the standard.

A model request is paid, whatever the command calls it. Never run a print or a run whose config can dispatch any selection before that selection's desk check and review: a `select` anywhere in the config makes even an evidence print of another kind send requests. None is sent in steps 5 to 7. On an engine without `--prepare` (before 0.9.0), the desk check is blocked: say so, and send nothing in its place.

Completion: the check passes with every intended rule printed and the count right; each printed standard reads as itself; every development case is prepared or listed with why, every request waiting on a selection is listed under `needs_answer`, and nothing was sent.

### 6. Desk-check before any request

Using `references/cases-and-proof.md`'s desk check, on development cases only, read each case's prepared request, the exact state and questions the model would receive, against the questions: every owner-ruled development case, and as many others as the floors need. A selection is desk-checked first, on its candidates' prepared selection requests: every piece a must-warn case needs is a required inclusion and must be selected; a piece its standard doesn't govern that it keeps costs a request, while a required inclusion it drops hides a mistake. A rule request behind a filter gate is read with its gate condition. Then compare every `reference` example with every development case, and ask the held-out holder for the held-out separation attestation. Return the desk-check record: per case, its prepared request id, the decisive content the state holds, what each question's meaning gives it, and whether that matches its label; per example, whether it matched any development case; and the holder's attestation, or its absence as a named gap.

A case whose label the meaning doesn't reproduce goes back to step 4: first look for missing decisive content in the state, then change the meaning. The label never changes, and the question is never split to dodge the case.

```text
rule:            no request before the desk check is clean.
rationalization: "The run will tell us. Reading every ruling by hand takes too long."
why it fails:    the run tells you the same thing a thousand requests later, and its answers
                 can't be reused once the meaning changes. Every false warning and wrong
                 label the held trees gave on an owner's ruling was readable on its state first.
```

Completion: every owner-ruled development case has a row, every row matches its label, every required inclusion of a selection is selected by its meaning, no example matches any development case, and the held-out attestation is in or named as a gap.

### 7. Review before any request

Start a reviewer with no authoring history on `skill-rules-review`, the way the host starts a reviewer, and give it step 4's design, the entries and config, the prepared reports, the desk-check record and the development case file; never the held-out set. A selection is reviewed on its candidates' state before any selection request; a rule on a plain kind is reviewed on its pieces; a rule on a selected kind is reviewed again at step 8, on the pieces the selection keeps. Return its verdict and findings. Each accepted finding goes back to the step that owns it, and the review runs again on the correction. If the host can't start a separate agent, stop and say so: a rule reviewed by its author hasn't been reviewed.

Completion: the verdict is `ready` for the next request (a selection's first run, or a rule's development cases), or every accepted finding is back with its owning step.

### 8. Run the selection first, when there is one

A selection's first requests are a paid development step, sent only after step 7's `ready` for it. Run it over the development cases' files and read each candidate's outcome against the selection's cases: every required inclusion must be selected, an uncertain or incomplete one counting as unmet; the pieces it kept that its standard doesn't govern are counted as their cost. A required inclusion that wasn't selected goes back to step 4; the rule waits. Then prepare the downstream rule on the selected pieces, from the selection run's saved report (`--selections-from`, as `skill-rules-config`'s prepared-requests reference says), desk-check it as step 6 does and have it reviewed as step 7 does, before any rule case runs. A piece still under `needs_answer` is listed with its reason, never prepared on a guess. On an engine that can't record the selection's answers without also sending the downstream rule's requests (0.9.0 can't; that reference names the gap), the downstream desk check waits on the engine, and the selection's run waits with it. A rule on a kind with no selection skips this step.

Completion: every required inclusion was selected and every outcome is counted, and the downstream rule's desk check and review on the selected pieces are in; or the selection is back with step 4, with what it dropped.

### 9. Prove, and decide on or held

Using `references/cases-and-proof.md`, with the commands from `skill-rules-config`'s case runs: run the development set; set each bar from the development results and record it with the cases that set it; freeze the questions, reference, evidence, selection and bars; then have the held-out holder run the held-out set once. Return per judged rule, filter and selection: the outcome of every case, scored or listed with why; the floors met or lacking; each bar with its development cases; the model requested and the version that answered; the baseline comparison or its gap; and the decision, on or held, with what a held rule lacks. Return per mechanical rule its edge tests.

Keep three observations apart: the collection (the prepared report, or an evidence print where printing sends nothing), the tree (the case results), and the receiving agent's call, which only a pressure task observes and which stays named as unproven until one has run.

Completion: every judged rule has its development run and, frozen, its one held-out run, or the missing run named as unproven; every case is counted or listed; every rule short of a floor or a switch-on condition is held, with what it lacks; every mechanical rule has edge tests that pass and fail where its standard does.

### 10. Return

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
- a selection drops a required inclusion, or its coverage is claimed before its run on the development cases;
- a model request (any print or run whose config can dispatch a selection, a selection run, a lint or case run with an asking rule) was sent before that instrument's desk check was clean and its independent review returned `ready`;
- a rule case ran before the downstream rule was desk-checked and reviewed on the selected pieces;
- a desk check read anything but a prepared or saved request, or went ahead on an engine without `--prepare`;
- a route whose evidence can't settle its standard ends `pass`, or a path that reads a model's answer can reach an `error` finding;
- a held-out case was read, desk-checked, compared or tuned on by whoever tunes the rule, or the holder's separation attestation is missing and not named as a gap;
- a judged rule warns before its cases meet the floors, or a held rule was switched on;
- a passing check or a collection is claimed as proof that a rule decides well, or a rule's case results as proof of what an agent does with its nudge.
