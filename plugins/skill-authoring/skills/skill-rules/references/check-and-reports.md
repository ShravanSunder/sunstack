# Check and Reports

This reference owns step 6: checking the rules, printing the evidence they will judge, reading a run's report, and proving each rule with rule tests. Expected input: the paired rulebook, the runner the repository's instructions name, the intended rules with which of them are mechanical, and for each rule the pieces you meant it to judge. Return: the check's outcome and printed rules; for each rule's evidence kind, the pieces it picks with your intended ones among them; for each rule, its rule tests and their per-rule results; and what stays unproven.

## Check

The check reads the config, the rulebook, every rule entry and the evidence project, and judges nothing: it reads no checked file and needs no key. Run it through the repository's runner when the runner offers it, or through the engine's own check, from the repository root.

- **Clean** (exit 0): it prints every assembled rule with its rule ID, marker, source file and line, evidence kind, `mechanical` or `asking`, severity, and the standard's wording as the judge will see it.
- **Refused** (exit 2): it prints one line per refusal, `file:line:column:`, the path inside an entry when the refusal is there, and the message. IF the check refuses, load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then check again.

Read the print in two passes.

1. **Coverage.** The count is the count you expect, and every intended rule appears with your marker and source line, at the severity and kind you meant.
2. **Wording.** Read each printed standard as a stranger would, with nothing but its words. Good: one standard, with its subject, and nothing from neighbouring text. Bad: it opens mid-thought, needs a lead-in, carries several standards, or reads as teaching rather than a requirement. A bad reading goes back to step 3 for a narrower host, or, when no host reads well, to the standard's home as a teaching change, designed with `skill-design` and written with `skill-creation`.

What the check proves: the definitions assemble and each standard reads as itself. It can't show that a rule picks or decides anything, because it reads no checked file.

## Print the evidence

The engine's evidence print (`--evidence`, optionally with one kind) lists the pieces each kind picks from the checked files, with every field, and asks nothing, so it needs no key. Print the kind each rule judges, over the files the rule is meant for, and look for three things:

- **the intended pieces:** the good and bad pieces you chose for the rule are there, each as one piece with the span you expect (a whole list item, not a fragment of it);
- **the fields:** every field the rule's questions and checks read is filled on those pieces, and a field that is legitimately empty, such as a step heading for a call that sits in no numbered step, is empty for that reason;
- **the count:** a kind with no pieces in files that plainly hold them is a gap in the evidence project, not a quiet rule.

## Read a report

A run's report carries a `status`, the `findings`, the `uncertain` pieces, the `incomplete` parts, the `skipped_rules`, the `counts` by severity, the `exclusions` (including how many pieces ended `not_applicable`), the `usage` (requests, tokens, cost) and `evidence_seen`. `evidence_seen` lists only the pieces sent to the decision model, so it is empty on a run whose pieces all settled mechanically; never read emptiness from it.

| status | exit | what it means |
| --- | --- | --- |
| `cancelled` | 4 | the run was stopped |
| `incomplete` | 3 | some work didn't finish: a request limit, a provider failure, evidence too large or unavailable |
| `findings` | 1 | an `error` finding, or more warnings than the run's set maximum |
| `uncertain` | 5 | no failing finding, and at least one piece ended between its thresholds |
| `nothing_selected` | 0 | no piece was selected: clean for a run over changed evidence with nothing changed, and a gap for a full run, which usually means a wrong path |
| `clean` | 0 | nothing above happened |
| `invalid` | 2 | refused before reading, such as a config refusal or no key for a run with asking rules |

A refused run is `invalid` and reads nothing; otherwise the status is the first row, top to bottom, that holds. Warnings don't move it: a `clean` or `uncertain` run can carry warn findings, so read every list, never just the status.

Each finding carries its rule, marker, file and line (the line of the field its route names), severity, message, and for a judged finding its answers and the path its decision took. Each `uncertain` piece carries the step it stopped at, the answers, and the piece's state as the judge saw it. Each incomplete part names its reason, and its rule, file or field when it has one.

## Rule tests

A rule is proven by what it decides on labelled pieces, not by a clean check. Rule tests live in the repository's eval suite, as labelled cases taken from real skills, each run through the same command and judge the rules use, and each checking the outcome the decision reaches: `pass`, `finding` (and its line), `not_applicable` or `uncertain`. They add no store, state or procedure of their own.

**Building the cases.** Each judged rule's cases together hold at least one good case (expects `pass`), one bad case (expects `finding`) and one near miss, a look-alike that expects `not_applicable` when the gate should drop it, or `pass` when it is a conforming piece that only looks wrong. They split into two sets:

- a **development set**, used to write and tune the entry;
- a **held-out set**, drawn from other skills, run once after the entry is frozen.

Each set aims for all three kinds. When a set still lacks a kind after two targeted rounds of collecting real pieces, each labelled blind, record the gap with the search that was made, and claim nothing from that set about the missing kind: a held-out set with no labelled breach says nothing about how well the rule finds breaches.

Each case is an excerpt of a real piece with its source, and each label records who gave it. Labels come from people or agents independent of the rule's writer and of any run of the rule, such as two labelers who don't see each other's labels and a third who settles their disagreements; where the owner of the standards labels a rule's cases, those labels govern. A label the rule's writer took from the rule's own answers proves nothing.

**Reading the results.** Report, per rule: matched, missed (expected a finding, got `pass` or `not_applicable`), wrong (expected `pass` or `not_applicable`, got a finding), uncertain, and gaps, with each case's label source, so every case is counted exactly once. A gap is any other non-match, named with its reason, and never a match: expected `pass` but got `not_applicable` or the reverse (the decision reached a different place than the label, such as a gate dropping a piece the labelers judged), a finding at a line other than the labelled one, or a piece whose evaluation didn't complete. Tune a rule's questions, criteria and thresholds only from its development results, before the freeze. A held-out miss is reported, never tuned away. Results that rest on labels still owed are provisional, and say so.

**Mechanical rules** are tested at their edges with no model: for a 300-character limit, 300 characters pass and 301 fail; for an opener rule, each allowed opener passes and a near opener (`Use for`) fails, at the description's line.

**What tests don't show.** Named cases measure a rule's decisions on the pieces chosen; they don't measure how many real pieces its evidence kind misses. No result here makes a judged rule ready to block: that needs whole sources labelled independently, with a held-out group of files, and a decision by whoever owns the standards.

### Worked reading

A guidance rule over the `sentence` kind asks first whether the piece is guidance, then whether it names a positive target. Its development set:

- **Good:** "Run the tests for each changed module and report each result with its command." Expected `pass`; got `pass`. Matched.
- **Bad:** "Don't skip tests." Expected a finding at the sentence; got `finding`. Matched.
- **Near miss:** the list item `Weak: "Don't skip tests."`, an example inside a section that teaches the positive shape. Expected `not_applicable` (an example, not guidance). Got a finding: the gate read the quoted example as guidance. Wrong.

The wrong case is the gate's, not the verdict's: the fix belongs in the gate's criteria (an example quoted to show a weak form is not guidance), and the case reruns with the rest of the development set. If that held-out set later shows the same miss, it is reported as a miss, and the rule keeps warning, not blocking.

Complete when: the check passed on the real engine and printed every intended rule with the expected count, each standard reading as itself; the evidence print shows each rule's intended pieces with their fields; every mechanical rule has edge tests that pass and fail where its standard does; every judged rule has good, bad and near-miss cases across its sets, development results, and held-out results after its freeze, each case with its label source; any kind a set lacks is recorded with its search; and everything still unproven is named.
