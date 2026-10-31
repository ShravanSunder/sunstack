# Check and Reports

This reference owns step 7: checking the rules, printing the evidence they will judge, reading a run's report, and proving each rule with rule tests. Expected input: the paired rulebook, the runner the repository's instructions name, the intended rules with which of them are mechanical, and for each rule the pieces you meant it to judge, its denominator and step 3's proof plan. Return: the check's outcome and printed rules; the proof in three observations kept apart (for each rule's evidence kind, the pieces it picks over its denominator with your intended ones among them and every cut named; for each rule, its rule tests and their per-rule results; and the receiving agent's call, named as owed to evals); and what stays unproven.

## Check

The check reads the config, the rulebook, every rule entry and the evidence project, and judges nothing: it reads no checked file and needs no key. Run it through the repository's runner when the runner offers it, or through the engine's own check, from the repository root.

- **Clean** (exit 0): it prints every assembled rule with its rule ID, marker, source file and line, evidence kind, `mechanical` or `asking`, severity, and the standard's wording as the judge will see it.
- **Refused** (exit 2): it prints one line per refusal, `file:line:column:`, the path inside an entry when the refusal is there, and the message. IF the check refuses, load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then check again.

Read the print in two passes.

1. **Coverage.** The count is the count you expect, and every intended rule appears with your marker and source line, at the severity and kind you meant.
2. **Wording.** Read each printed standard as a stranger would, with nothing but its words. Good: one standard, with its subject, and nothing from neighbouring text. Bad: it opens mid-thought, needs a lead-in, carries several standards, or reads as teaching rather than a requirement. A bad reading goes back to step 4 for a narrower host, or, when no host reads well, to the standard's home as a teaching change, designed with `skill-design` and written with `skill-creation`.

What the check proves: the definitions assemble and each standard reads as itself. It can't show that a rule picks or decides anything, because it reads no checked file.

## Print the evidence

The engine's evidence print (`--evidence`, optionally with one kind) lists the pieces each kind picks from the checked files, with every field. What it costs depends on the config:

- **No selected kind:** it asks nothing, so it needs no key.
- **A selected kind** (one with `select`, whose candidates the decision model chooses): it runs that selection and asks nothing else. It needs the key and a grant to send model requests; without a key it is refused before reading any file. Without the grant, prepare the exact command and hand it to whoever holds it, then read the print it keeps. Its print adds `selections`, each candidate with its outcome, and `file_counts`. A piece of a kind that lies `within` a selected kind exists only when its candidate was selected, so read a missing piece against its candidate's outcome before calling it a gap in the evidence project.

Print the kind each rule judges, over the rule's whole denominator, and look for four things:

- **the intended pieces:** the good and bad pieces you chose for the rule are there, each as one piece with the span you expect (a whole list item, not a fragment of it; a section's own text without its children's);
- **the fields:** every field the rule's questions and checks read is filled on those pieces, and a field that is legitimately empty, such as a step heading for a call that sits in no numbered step, is empty for that reason. A target field holds only the loads in the piece's own text when it declares the ranges it excludes, so a child section's load isn't attached to its parents;
- **the cuts:** a field the cap shortened for the model is listed in the piece's state under the engine's `"cut-fields"` key, and a loaded file whose opening was shortened carries `opening_cut: true`. A cut is named in the proof; the decisive content must survive it;
- **the count:** every file in the denominator gives the kind its pieces. A kind with no pieces in files that plainly hold them is a gap in the evidence project, not a quiet rule, unless those pieces wait on a candidate that wasn't selected.

This is the proof's first observation, the collection: it shows what the rule will read, and nothing about how it decides.

## Read a report

A run's report carries a `status`, the `findings`, the `results` (one row per rule and piece), the `uncertain` pieces, the `incomplete` parts, the `skipped_rules`, the `counts` by severity, the `exclusions` (including how many pieces ended `not_applicable`), the `usage` (requests, tokens, cost), `evidence_seen` (the exact state each request sent, its `"cut-fields"` included), and, for a config with a selected kind, the `selections` (each candidate with its outcome: `selected`, `not_selected`, `uncertain` with its yes probability, or `incomplete` with its reason) and the `file_counts` (per file and kind, with the selection counts). `evidence_seen` lists only the pieces sent to the decision model, so it is empty on a run whose pieces all settled mechanically; never read emptiness from it. Selection's outcomes sit apart from the rules' results: an `uncertain` or `incomplete` candidate can set the status while every rule result is decided. A piece that exists only through that candidate, such as a step within it, is absent, so its rules never ran there; a plain-kind piece in its range, or one kept through another container, still exists and keeps its result. Read coverage from the results, and a zero-selected file from its separate counts: only an all-`not_selected` file is a negative judgment.

| status | exit | what it means |
| --- | --- | --- |
| `cancelled` | 4 | the run was stopped |
| `incomplete` | 3 | some work didn't finish: a request limit, a provider failure, evidence too large or unavailable, including a selection candidate that couldn't be answered (`selection_incomplete`) |
| `findings` | 1 | an `error` finding, or more warnings than the run's set maximum; this repository's runner sets none, so `warn` nudges alone never reach this row |
| `uncertain` | 5 | no failing finding, and at least one piece, or one selection candidate, ended between its thresholds |
| `nothing_selected` | 0 | no piece was selected: clean for a run over changed evidence with nothing changed, and a gap for a full run, which usually means a wrong path |
| `clean` | 0 | nothing above happened |
| `invalid` | 2 | refused before reading, such as a config refusal or no key for a run with asking rules |

A refused run is `invalid` and reads nothing; otherwise the status is the first row, top to bottom, that holds. Warnings don't move it: a `clean` or `uncertain` run can carry warn findings, so read every list, never just the status.

### What a finding and a result carry

Each finding carries its rule, marker, file, field, severity and message, and these, which together make it a nudge:

- **`line` and `anchor`.** `resolved` means the route's locator chose the line, inside both the judged field and the piece. `default` means the first line of the route's `at` field, or else the piece's first line: the locator wasn't sent (the walk settled without a request, the field had no line inside the piece or too many, or the request had no room), or its answer fell below its `min_probability`. With an `enclosing` `at` field, a default line can lie outside the piece. On a section-sized piece, a default anchor says "somewhere in this piece". The finding's `span` stays the span of the route's field either way.
- **`basis`.** `judged` exactly when some step on the walked path read a model's answer, a gate included; otherwise `mechanical`.
- **`related`,** the places to read next, each `{label, file, first_line, last_line}`. The first is always the rule's standard: label `standard`, the rulebook file and the line its marker's host starts on. Then, for each field the entry names in `related`, one place per span of that field the piece collected, labelled with the field's name; a target field gives one place per loaded file whose opening the run read and found non-empty, from line 1 to the last line of that opening. A target resolved by its fields instead of an opening, an unresolved one, an empty opening and a field with no span add nothing: only places the run read appear. SARIF carries the same places as `relatedLocations`, and the default output prints each as `label: file:line` under its finding.
- **`judgment`,** for a judged finding: the answers, the value and the path its decision took. A locator's answer appears under the locator's name.

Each result row, one per rule and piece in report order, carries its rule's name and marker, file, line range, outcome and last step, and:

- **`path`,** the steps walked, in order: `[]` when no walk ran, and for an incomplete row, what it walked before it stopped;
- **`answers`,** present only when the walk read a model's answer: exactly the answers it read, keyed by question, whatever the outcome, passes and `not_applicable` included. An answer the request returned but the walk never read isn't shown;
- **`basis`,** as on a finding, absent on an `incomplete` row;
- **`cut`,** present when the cap cut any field of the piece for the model: the fields cut.

Each `uncertain` piece carries the step it stopped at, the answers, and the piece's state as the judge saw it. Each incomplete part names its reason, and its rule, file or field when it has one.

### Unread, derived

The report has no coverage field: the runner derives "unread" per rule. A rule's denominator is the checked files its evidence kind can pick pieces from, as its design declares; the runner joins it with `file_counts` and `results`, and a file inside the denominator where the rule has no result is unread. A file outside it is out of scope: a rule over `SKILL.md` descriptions has nothing to read in a reference, and calling that a gap would bury the real ones. A piece that exists only through an unselected or unresolved candidate isn't unread; it's the candidate's gap.

What a report keeps for replay and for the answering model's version is a fact of the Sunstack driver, which `domain-decision-models` owns in its driver reference. Read it before using a report to compare thresholds or versions.

## Rule tests

A rule's proof is three observations, kept apart: the collection (the evidence print, above), the tree on labelled cases (these tests), and the receiving agent's call. None stands in for another. A clean evidence print says nothing about decisions, labelled cases say nothing about what an agent does with a nudge, and the agent's call is an eval that waits for the owner's evals: name it as unproven.

A rule is proven by what it decides on labelled pieces, not by a clean check. Rule tests live in the repository's eval suite, as labelled cases taken from real skills, each run through the same command and judge the rules use, and each checking the outcome the decision reaches: `pass`, `finding` (and its line), `not_applicable` or `uncertain`. They add no store, state or procedure of their own.

**Building the cases.** Each judged rule's cases together hold at least one good case (expects `pass`), one bad case (expects `finding`) and one near miss, a look-alike that expects `not_applicable` when the gate should drop it, or `pass` when it is a conforming piece that only looks wrong. They also hold a countercase for each exemption the standard's own wording states, such as a product named only as a labelled example, expecting no finding: the exemptions come from the standard, never from notes kept beside the rule. A bad case on a located route expects its finding at the observed line with `anchor: "resolved"`. They split into two sets:

- a **development set**, used to write and tune the entry;
- a **held-out set**, drawn from other skills, run once after the entry is frozen.

Each set aims for all three kinds. When a set still lacks a kind after two targeted rounds of collecting real pieces, each labelled blind, record the gap with the search that was made, and claim nothing from that set about the missing kind: a held-out set with no labelled breach says nothing about how well the rule finds breaches.

Each case is an excerpt of a real piece with its source, and each label records who gave it. Labels come from people or agents independent of the rule's writer and of any run of the rule, such as two labelers who don't see each other's labels and a third who settles their disagreements; where the owner of the standards labels a rule's cases, those labels govern. A label the rule's writer took from the rule's own answers proves nothing.

**Reading the results.** Report, per rule: matched, missed (expected a finding, got `pass` or `not_applicable`), wrong (expected `pass` or `not_applicable`, got a finding), uncertain, and gaps, with each case's label source, so every case is counted exactly once. A gap is any other non-match, named with its reason, and never a match: expected `pass` but got `not_applicable` or the reverse (the decision reached a different place than the label, such as a gate dropping a piece the labelers judged; the row's `answers` show the gate's answer), a finding at a line other than the labelled one, a `default` anchor where the label expected the locator to resolve, a result reached on a cut view, or a piece whose evaluation didn't complete. Tune a rule's questions, criteria and thresholds only from its development results, before the freeze. A held-out miss is reported, never tuned away. After a correction, held-out cases already scored become regression cases; a fresh held-out claim needs cases not yet seen. Results that rest on labels still owed are provisional, and say so.

**Measures and versions.** `domain-decision-models` owns these standards; here is how they apply to rule tests.
- **Count every case,** passes and `not_applicable` included.
- **Report apart:** labelled errors and misses, coverage, review load (`uncertain`), incomplete parts, and instability across identical repeats.
- **Record the model.** Each result records the model requested and, where the record keeps it, the version that answered. A comparison runs within one version group, or names the missing comparator.
- **Compare thresholds honestly.** A threshold change is compared by replaying stored answers only where the record keeps them for every case. Otherwise it's a fresh run, named as one.

**Mechanical rules** are tested at their edges with no model: for a 300-character limit, 300 characters pass and 301 fail; for an opener rule, each allowed opener passes and a near opener (`Use for`) fails, at the description's line.

**What tests don't show.** Named cases measure a rule's decisions on the pieces chosen; they don't measure how many real pieces its evidence kind misses, and they don't show what an agent does with the nudge. No result here makes a judged rule ready to block: that needs whole sources labelled independently, with a held-out group of files, and a decision by whoever owns the standards. Our rules keep every judged path at `warn` regardless.

### Worked reading

A guidance rule over the `sentence` kind asks first whether the piece is guidance, then whether it names a positive target. Its development set:

- **Good:** "Run the tests for each changed module and report each result with its command." Expected `pass`; got `pass`. Matched.
- **Bad:** "Don't skip tests." Expected a finding at the sentence; got `finding`. Matched.
- **Near miss:** the list item `Weak: "Don't skip tests."`, an example inside a section that teaches the positive shape. Expected `not_applicable` (an example, not guidance). Got a finding: the gate read the quoted example as guidance. Wrong.

The wrong case is the gate's, not the verdict's: the fix belongs in the gate's criteria (an example quoted to show a weak form is not guidance), and the case reruns with the rest of the development set. If that held-out set later shows the same miss, it is reported as a miss, and the rule keeps warning, not blocking.

Complete when: the check passed on the real engine and printed every intended rule with the expected count, each standard reading as itself; the evidence print covers each rule's denominator and shows its intended pieces with their fields, every cut named; every mechanical rule has edge tests that pass and fail where its standard does; every judged rule has good, bad, near-miss and countercases across its sets, development results, and held-out results after its freeze, each case with its label source; any kind a set lacks is recorded with its search; the receiving agent's call is named as owed to evals; and everything still unproven is named.
