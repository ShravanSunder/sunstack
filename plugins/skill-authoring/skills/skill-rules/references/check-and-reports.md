# Check and Reports

This reference owns step 7: checking the rules, printing the evidence they will judge, reading a run's report, and proving each rule and filter on real skills. Expected input: the paired rulebook, the `sunstack lint` command the repository's instructions name with its config, the intended rules and filters with which of them are mechanical, and for each one the pieces or folders you meant it to judge, its denominator, its cases and step 3's proof plan. Return: the check's outcome and printed rules; the proof in three observations kept apart (for each rule's evidence kind, the pieces it picks over its denominator with your intended ones among them and every cut named; for each mechanical rule its edge tests, and for each judged rule or filter its development and held-out case results; and the receiving agent's call, named as owed to a pressure task); and what stays unproven.

## Check

`sunstack lint --config <config> --check` reads the config, the rulebook, every rule and filter entry and the evidence project, and judges nothing: it reads no checked file and needs no key. Run it from the repository root.

- **Clean** (exit 0): it prints every assembled rule with its rule ID, marker, source file and line, evidence kind, `mechanical` or `asking`, severity, and the standard's wording as the judge will see it.
- **Refused** (exit 2): it prints one line per refusal, `file:line:column:`, the path inside an entry when the refusal is there, and the message. IF the check refuses, load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then check again.

Read the print in two passes.

1. **Coverage.** The count is the count you expect, and every intended rule appears with your marker and source line, at the severity and kind you meant.
2. **Wording.** Read each printed standard as a stranger would, with nothing but its words. Good: one standard, with its subject, and nothing from neighbouring text. Bad: it opens mid-thought, needs a lead-in, carries several standards, or reads as teaching rather than a requirement. A bad reading goes back to step 4 for a narrower host, or, when no host reads well, to the standard's home as a teaching change, designed with `skill-design` and written with `skill-creation`.

What the check proves: the definitions assemble, every route and in-between route is declared, every name a question reads exists, and each standard reads as itself. It can't show that a rule picks or decides anything, because it reads no checked file.

## Print the evidence

The engine's evidence print (`--all --evidence`, optionally with one kind) lists the pieces each kind picks from the checked files, with every field. What it costs depends on the config:

- **No selected kind:** it asks nothing, so it needs no key.
- **A selected kind** (one with `select`, whose candidates the decision model chooses): it runs that selection and asks nothing else. It needs the key and a grant to send model requests; without a key it is refused before reading any file. Without the grant, prepare the exact command and hand it to whoever holds it, then read the print it keeps. Its print adds `selections`, each candidate with its outcome, and `file_counts`. A piece of a kind that lies `within` a selected kind exists only when its candidate was selected, so read a missing piece against its candidate's outcome before calling it a gap in the evidence project.

Print the kind each rule judges, over the rule's whole denominator, and look for four things:

- **the intended pieces:** the good and bad pieces you chose for the rule are there, each as one piece with the span you expect (a whole list item, not a fragment of it; a section's own text without its children's);
- **the fields:** every field the rule's questions and checks read is filled on those pieces, and a field that is legitimately empty, such as a step heading for a call that sits in no numbered step, is empty for that reason. A target field holds only the loads in the piece's own text, each with its opening, a skill-name load included;
- **the cuts:** a field the cap shortened for the model is listed under the state's `"cut-fields"` key, and a loaded file whose opening was shortened carries `opening_cut: true`. A cut is named in the proof; the decisive content must survive it, and a pass that rests on a "no" about cut text goes through the `complete` check;
- **the count:** every file in the denominator gives the kind its pieces. A kind with no pieces in files that plainly hold them is a gap in the evidence project, not a quiet rule, unless those pieces wait on a candidate that wasn't selected.

This is the proof's first observation, the collection: it shows what the rule will read, and nothing about how it decides.

## Read a run

A run prints short numbered lines: one per warning, unsure result or gap, each with its file and line, the rule and a one-sentence reason, then the filter summary (how many folders got each label, how many were unsure or incomplete) and one line per unsure or incomplete folder. It doesn't print the judged text. To read one result in full, save the report with `--report run.json` and ask for its number with `sunstack lint show run.json <id>`: that prints its route, answers, bars, requests and pointers, from the file alone. `--format json` prints the whole report instead.

| status | exit | what it means |
| --- | --- | --- |
| `invalid` | 2 | refused before reading, such as a config refusal or no key for a run with asking rules |
| `cancelled` | 4 | the run was stopped |
| `incomplete` | 3 | some work didn't finish: a request limit, a provider failure, a request too large, evidence unavailable, or a selection candidate that couldn't be answered (`selection_incomplete`) |
| `findings` | 1 | an `error` finding, or more warnings than `--max-warnings` allows; with no limit set, `warn` nudges alone never reach this row |
| `uncertain` | 5 | nothing above, and at least one piece, folder or selection candidate ended between its bars |
| `nothing_selected` | 0 | no piece was selected: clean for a run over changed evidence with nothing changed, and a gap for a full run, which usually means a wrong path |
| `clean` | 0 | nothing above happened |

The status is the first row, top to bottom, that holds. Warnings don't move it: a `clean` or `uncertain` run can carry warn nudges, so read every line, never just the status.

### What a finding, a result and a filter answer carry

Each finding carries its rule, marker, file, field, severity and message, and these, which together make it a nudge:

- **`line` and `anchor`.** `resolved` means the route's locator chose the line, inside both the judged field and the piece. `default` means the first line of the route's `at` field, or else the piece's first line: the locator wasn't sent, or its answer fell below its `min_probability`. On a section-sized piece, a default anchor says "somewhere in this piece".
- **`basis`.** `judged` exactly when some step on the walked path read a model's answer, a gate included; otherwise `mechanical`.
- **`related`,** the places to read next, each `{label, file, first_line, last_line}`. The first is always the rule's standard. Then, for each field the entry names in `related`, one place per span of that field, and one per loaded file whose non-empty opening the run read. Only places the run read appear.

Each result row, one per rule and piece, carries its rule's name and marker, file, line range, outcome and last step, its `path` (the steps walked), the `answers` its walk read, its `basis`, and `cut` when the cap cut a field. A saved report adds, for each result, the ids of its requests; each request keeps its exact state, questions, every answer returned and the model asked for and the one that answered.

Each filter answer names its folder and how its tree ended: a label with its path and answers, `unsure` with the step it stopped at, or incomplete with its reason. A folder that ended `unsure` or incomplete is skipped for every rule gated on that filter, and listed; a folder whose label a rule's `only_when` doesn't name is excluded for that rule, a decision with its label kept.

### Unread

A rule's denominator is the checked files and pieces its design says it scans, inside the folders its filter admits. Join it with the report's `file_counts`, `results` and filter answers: a file inside the denominator where the rule has no result is unread. A folder the filter skipped as unsure is a listed gap; one it excluded by label is a decision, not a gap. A file outside the denominator is out of scope: a rule over `SKILL.md` descriptions has nothing to read in a reference.

What a report keeps for re-walking a result under a changed bar is a fact of the Sunstack driver, which `domain-decision-models` owns in its driver reference. Read it before using a report to compare bars or versions.

## Rule proof on real skills

A rule's proof is three observations, kept apart:
- **the collection:** the evidence print, above;
- **the tree:** what the rule or filter decides on real skill text, from its case runs below;
- **the receiving agent's call:** a pressure task, in which a fresh agent works on the same real source with the rule's nudge in hand.

None stands in for another. A clean evidence print says nothing about decisions. A case run says nothing about what an agent does with a nudge. Until a pressure task has run, name the receiving agent's call as unproven.

A rule is proven by what it decides on real skills, not by a clean check, and not on text made up to be judged. This repository commits no copy of a skill as a test input and never uses an invented skill as proof. The engine's own mechanics are proven in the engine's repository.

### The case file

Cases live in a case file the repository keeps beside its rulebook. Each case names real text at a fixed Git revision, so the case is the source itself, never a copy:

- **A rule case:** `id`, `kind: "rule"`, `rule`, `file`, `revision`, `lines: [first, last]`, `text_sha256` of those lines at that revision, and `expected: "warn"` or `"pass"`. Its lines are the judged piece's exact first and last lines: a range that covers part of a piece, or spans several, matches nothing, so a nested section is its own case.
- **A filter case:** `id`, `kind: "filter"`, `filter`, `folder`, `revision`, `reads_sha256` of the fields the filter read, and `expected_label`.
- **On every case:** `set`, `development` or `held_out`, never both; and `label_from`: `owner-fix` (the owner's own fix shows the answer: the text before the fix must warn, after it must pass), `owner-ruling` (the owner decided the label explicitly, and the ruling is kept beside the cases) or `blind-agents` (agents labelling without the rule's answers, with disagreements sent to the owner). A label taken from the rule's own answers proves nothing.
- **`bars`:** each bar the rule's tree compares, recorded as `{for, step, bound, value, set_from: [case ids]}`, beside the development cases that set it.

Where cases come from: this repository's history, especially text from before and after a real fix, then the owner's other repositories and upstream skill collections. Choose them for distinct failure modes and their counter-examples, not for size. Two versions of the same skill's loop are one family.

Three things keep the cases honest:
- **Cases come first.** A change to a rule's questions, reference or bars gets its new cases before the change, never after.
- **Never adjusted to pass.** A case is never dropped or relabelled so a run passes; a changed label is a commit with its reason.
- **Counter-examples count.** The must-pass cases hold the exemptions the standard's home states, such as a product named only as a labelled example, and every wrong warning the rule once gave on a real skill.

### The runs

`sunstack lint cases <file> --set development`, then, once the questions, reference and bars are frozen, `sunstack lint cases <file> --set held_out`, once. Both ask questions, so they need the key: without the grant, prepare the commands and hand them over.

Each run copies the repository at each case's revision, puts today's config, rule files and evidence-rule directories on top, and runs ordinary lint on the case's paths, so a case sees its own folder and every file it loads as they were, judged by today's rules. Keep the evidence project's rule directories apart from the skills they check: a rule directory that covers the repository root or checked text makes the case run refuse. It writes nothing lint reads: a case run is the author's tool before a rule is switched on, never a gate.

**Reading the results.** Every case gets one outcome, counted per rule and per filter, apart:
- **scored:** `right`, `false_warning`, `missed`, `unsure` or `incomplete` for a rule; `right`, `wrong_label`, `unsure` or `incomplete` for a filter;
- **listed with why, not scored:** `stale` (the text changed since its revision), `no_matching_piece`, `more_than_one_matching_piece`, `filter_excluded`, or `not_judged`.

A must-warn or must-pass case that ends unsure, incomplete, stale, unmatched or excluded hasn't met its obligation; an invalid or missing reply counts the same. A bar the tree no longer matches, or one with no development cases behind it, is reported unassessed.

- **Tuning:** tune a rule's questions, reference and bars only on development results, and diagnose each miss at its question (two facts in one, missing evidence) before any bar moves. A held-out miss is reported, never tuned away; after a correction, the scored held-out cases become regression cases, and a fresh held-out claim needs cases not yet seen.
- **The floors:** a judged rule warns anyone only once its cases meet the floors `SKILL.md` step 7 names. A rule short of one stays off, with what it lacks listed.
- **The baseline:** the current rule for the standard, run on the same cases, when one exists. Both runs request the same pinned model version, as `domain-decision-models` allows for a comparison; otherwise name the missing comparator.

**A lint run over today's skills** (`sunstack lint --config <config> --all --report run.json`) is supporting evidence: every nudge it gives gets an account, as `running-rules.md` teaches, and each clear one can become a case. It is not a held-out set or an accuracy rate.

**Measures and versions.** `domain-decision-models` owns these standards; here is how they apply:
- **Count every case,** passes, exclusions and listed cases included.
- **Report apart:** false warnings and misses, coverage, unsure (review load), incomplete, and instability across identical repeats.
- **Record the model.** A saved report keeps the model requested and the one that answered each request. A comparison runs within one version group.

**Mechanical rules** are tested at their edges with no model: for a 300-character limit, 300 characters pass and 301 fail; for an opener rule, each allowed opener passes and a near opener (`Use for`) fails, at the description's line.

**What the runs don't show.** Cases measure a rule's decisions at the lines they name. They don't measure how many real pieces its evidence kind misses, and they don't show what an agent does with the nudge. No result here makes a judged rule ready to block: our rules keep every judged path at `warn`.

### Worked readings

**Invented text passed for proof.** A rule set's first proof used excerpt cases copied into the repository, split into development and held-out sets.
- **The headline:** the held-out set read 25 matched, 8 uncertain, 1 missed, 0 wrong.
- **Split by source:** 13 of the 25 matches came from invented mini-skills and invented rule files. On real held-out text it was 12 matched, 4 uncertain and 1 missed, of 17.
- **Coverage:** the description loading-scope rule never met a real positive, and the decision-model rules met only invented rule files.

So the headline measured how well the rules judged text written to be judged. Read it as the coverage it really was, rule by rule, and name each rule with no real positive.

**A case that pointed at the wrong piece.** Migrating those excerpts to real-text cases first took each case's lines from where its excerpt started.
- **The mistake:** the excerpt's start isn't the judged piece's. One excerpt opened at `skill-creation/SKILL.md:22`, while the load the rule judges begins at `:24`.
- **What it caused:** dozens of cases would have matched a neighbouring piece or none, and scored as unmatched for a reason that had nothing to do with the rule.
- **The fix:** take each case's lines from the piece the engine judges, confirmed on the evidence print. A case run lists one that matches no piece, or several, instead of scoring it.

Complete when:
- the check passed on the real engine and printed every intended rule with the expected count, each standard reading as itself;
- the evidence print covers each rule's denominator and shows its intended pieces with their fields, every cut named;
- every mechanical rule has edge tests that pass and fail where its standard does;
- every judged rule and filter has a case file on real text at fixed revisions, its counter-examples among the must-pass cases, each case with its label source;
- its development run and, frozen, its held-out run are in, every case scored or listed with why, and the floors it meets or lacks named;
- the receiving agent's call is named as owed to a pressure task;
- everything still unproven is named.
