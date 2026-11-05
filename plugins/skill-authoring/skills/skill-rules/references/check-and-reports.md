# Check and Reports

This reference owns step 7: checking the rules, printing the evidence they will judge, reading a run's report, and proving each rule on real skills. Expected input: the paired rulebook, the runner the repository's instructions name, the intended rules with which of them are mechanical, and for each rule the pieces you meant it to judge, its denominator, its expectation entries and step 3's proof plan. Return: the check's outcome and printed rules; the proof in three observations kept apart (for each rule's evidence kind, the pieces it picks over its denominator with your intended ones among them and every cut named; for each mechanical rule its edge tests, and for each judged rule its expectation and current-skills results with outcome, locator and gaps apart; and the receiving agent's call, named as owed to a pressure task); and what stays unproven.

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

## Rule proof on real skills

A rule's proof is three observations, kept apart:
- **the collection:** the evidence print, above;
- **the tree:** what the rule decides on real skill text, from its expectation run and its current-skills run below;
- **the receiving agent's call:** a pressure task, in which a fresh agent works on the same real source with the rule's nudge in hand.

None stands in for another. A clean evidence print says nothing about decisions. An expectation run says nothing about what an agent does with a nudge. Pressure tasks are the next proof, owed to their own change: until one has run, name the receiving agent's call as unproven.

A rule is proven by what it decides on real skills, not by a clean check, and not on text made up to be judged. The engine's own mechanics are proven with fixtures in the engine's repository. This repository proves only that an authored rule asks a useful question of real skill text, so it commits no copy of a skill as a test input and never uses an invented skill as proof.

**Sources, pinned by Git.** A source names a repository, a full commit and the paths it needs: the file judged and the files and folders it loads. The runner unpacks all of them from that one commit into a temporary folder outside the repository, judges them there, and deletes the folder.
- **Where sources come from:** this repository's own history, especially versions from before a real fix, then the owner's other repositories and upstream skill collections.
- **A commit the runner can't unpack** is a setup gap to fix, by fetching it or naming the repository. It's never a reason to copy text in.
- **Choosing sources:** choose them for distinct failure modes and their counter-examples, not for size. One source family counts once: two versions of the same skill's loop are one family.

**Expectations, beside the rule.** Each rules file has a sibling `<name>.expect.json`: `{ "expectations": [ … ] }`, one entry per rule and source place. An entry is a claim about one rule at one place, never a copy of text:
- `id`: stable, never reused;
- `rule`: the rule ID, which names an entry in the sibling rules file;
- `source`:
  - `repository`: `"self"` for this repository;
  - `commit`;
  - `path`, the file judged;
  - `context`, the files and folders it loads;
- `piece_first_line`: the first line of the piece the engine judges, which picks the piece the way the engine does; omitted for a kind judged once per file, such as a description;
- `expect`: `must_fire`, `must_pass`, `not_applicable` or `unknown`, and for `must_fire` the `lines` a finding may point at;
- `kind`:
  - `breach`, an established mistake;
  - `worth_reading`, a place an agent should look;
  - `regression_example`, a historical mistake, which is never a fresh holdout;
- `basis`: why, and which context supports the call;
- `decided_by`: `owner`, `independent` (two or more blind judges, named) or `author`. A `must_fire` that acceptance rests on needs `owner` or `independent`. Agreement between two judges isn't truth by itself, so the basis stays recorded.

Three rules keep the entries honest:
- **Entries come first.** A semantic change to a rule's questions, criteria or bars gets its new entries before the change, never after.
- **Never adjusted to pass.** An entry is never dropped or rewritten so a run passes. Changing `expect`, `lines` or `kind` is a commit with a new `basis`.
- **Counter-examples count.** The entries hold the counter-examples the standard's home states, such as a product named only as a labelled example: the exemptions come from where the standard is taught, never from notes kept beside the rule.

A `must_pass` holds for one rule at one commit. A skill is never clean across the board: an earlier `practices-cleanup` had two real placement findings.

**The two runs.** Run both on every rule change. They count real text only, and report three things apart:
- **the outcome against the entry:** `caught`, `missed`, `false_nudge` or `unsure`;
- **the locator:** `hit` (a finding inside the entry's `lines`), `miss`, `not_applicable` or `unavailable`;
- **the gaps:** `setup` (the source couldn't be unpacked), `cut`, `unread`, `incomplete` or `error`. A gap is never a pass.

The two runs:
1. **The scenario run,** `pnpm --dir tests/skills evals:scenarios [rule…]`, is keyed: it unpacks the pinned sources and evaluates all active scenarios or the named rules' scenarios. `--check` validates without running. Results go only to Git-ignored `tests/skills/tmp/scenario-runs/<UTC>/report.json` and `raw/`; there is no `--out`. It prints each outcome and the run-wide gaps. On the owner's instruction, `evals:adopt <rule> --report <path>` is the separate adoption step and refuses incomplete, failing or unsure reports.
2. **The current-skills run,** `pnpm --dir tests/skills rules`, runs the rules over this repository's skills as they stand. After its report it lists every item that needs a person's written account: each nudge no entry covers, a sample of the places each rule passed or dropped (so a rule that never looked is caught), each cut and gap, and the decided exclusions. Give every item its account, as `running-rules.md` teaches. Clear outcomes join the expectations as new entries. This run is supporting evidence, not a holdout and not an accuracy rate.

**Reading the results.** Report per rule: each entry with its outcome, its locator and its gaps, and each current-skills item with its account. Every entry is counted exactly once.
- **The outcomes:** `caught` covers a `must_fire` that fired, a `must_pass` that passed and a `not_applicable` the gate dropped. A pass where `not_applicable` was expected, or the reverse, reads `unsure`, and the row's answers show where the decision went.
- **What isn't a catch at the right place:** a finding outside the entry's `lines` is a locator miss, and that includes one left at its field's first line by default. `unavailable` means no single finding sat in the piece to read a line from.
- **Tuning:** tune a rule's questions, criteria and bars only before its expectations freeze. A miss after the freeze is reported, never tuned away.
- **No real positive:** when a rule has no real `must_fire` entry after a search of history, the other repositories and upstream, say "no real positive found". Its claim narrows to exactly what its runs showed, with their gaps. A rule with no positive hasn't shown that it catches anything, and an absence of false nudges holds only where the runs show it. Whoever owns the standards decides whether that rule ships.

**Measures and versions.** `domain-decision-models` owns these standards; here is how they apply to these runs:
- **Count every entry,** passes and `not_applicable` included.
- **Report apart:** misses and false nudges, coverage, review load (`unsure`), gaps, and instability across identical repeats.
- **Record the model.** Each result records the model requested and, where the record keeps it, the version that answered. A comparison runs within one version group, or names the missing comparator.
- **Compare thresholds honestly.** A threshold change is compared by replaying stored answers only where the record keeps them for every entry. Otherwise it's a fresh run, named as one.

**Mechanical rules** are tested at their edges with no model: for a 300-character limit, 300 characters pass and 301 fail; for an opener rule, each allowed opener passes and a near opener (`Use for`) fails, at the description's line. Those tests test the local predicate, and are unit tests beside the code they test.

**What the runs don't show.** Entries measure a rule's decisions at the places they name. They don't measure how many real pieces its evidence kind misses, and they don't show what an agent does with the nudge. No result here makes a judged rule ready to block: that needs whole sources judged independently, and a decision by whoever owns the standards. Our rules keep every judged path at `warn` regardless.

### Worked readings

**Invented text passed for proof.** A rule set's first proof used excerpt cases copied into the repository, split into development and held-out sets.
- **The headline:** the held-out set read 25 matched, 8 uncertain, 1 missed, 0 wrong.
- **Split by source:** 13 of the 25 matches came from invented mini-skills and invented rule files. On real held-out text it was 12 matched, 4 uncertain and 1 missed, of 17.
- **Coverage:** the description loading-scope rule never met a real positive, and the decision-model rules met only invented rule files.
- **After migration to pinned sources:** real `must_fire` coverage ran from none to five entries per rule.

So the headline measured how well the rules judged text written to be judged. Read it as the coverage it really was, rule by rule, and name each rule with no real positive.

**A locator that measured the wrong piece.** Migrating those cases to pinned entries first took each entry's `piece_first_line` from where its excerpt started.
- **The mistake:** the excerpt's start isn't the judged piece's. `calls-and-placement-k001-case-001`'s excerpt opened at `skill-creation/SKILL.md:22`, while the load the rule judges begins at `:24`.
- **What it caused:** 72 entries would have picked a neighbouring piece or none, and scored as unread or as a locator miss for a reason that had nothing to do with the rule.
- **The fix:** derive each line from the case's own piece coordinates. Then check, on the evidence print, that the engine's piece starts there before an entry counts.

Complete when:
- the check passed on the real engine and printed every intended rule with the expected count, each standard reading as itself;
- the evidence print covers each rule's denominator and shows its intended pieces with their fields, every cut named;
- every mechanical rule has edge tests that pass and fail where its standard does;
- every judged rule has entries on real sources pinned by Git, its counter-examples among them, each with its basis and who decided it;
- its expectation run and current-skills run are in, with outcome, locator and gaps apart, and every listed item accounted for;
- a rule with no real positive says so, with its claim narrowed;
- the receiving agent's call is named as owed to a pressure task;
- everything still unproven is named.
