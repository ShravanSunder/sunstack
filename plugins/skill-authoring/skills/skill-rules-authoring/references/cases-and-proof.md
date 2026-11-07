# Cases and Proof

This reference owns a judged rule's, filter's or selection's evidence of working: gathering its cases (step 3), the desk check before any request (step 6), and reading its selection, development and held-out runs into a decision, on or held (steps 8 and 9). Expected input: the rule or filter and its standard; the owner's rulings and fixes that touch it; for step 6, its design, entries and evidence print; for step 8, its case-run results. Return: the cases with their sets, label origins and the floors they meet; the desk-check record; per run, every case's outcome, the floors, the bars and the decision.

The case file's fields and the `lint cases` command are `skill-rules-config`'s (its case-runs reference). This reference decides what goes in them and what the results mean.

## Cases are the test, so they come first

A rule's questions are the operational definition of the owner's line; its cases are the only evidence that they draw it there. A case is real skill text at a fixed revision, with the answer the rule must give it, so it is the source itself and never a copy.

**Where cases come from:** this repository's history, especially text from before and after a real fix; then the owner's other repositories and upstream skill collections. Choose them for distinct failure modes and their counter-examples, not for size. Two versions of the same skill's loop are one family.

**Where each label comes from**, recorded on the case:
- `owner-fix`: the owner's own fix shows the answer; the text before the fix must warn, after it must pass;
- `owner-ruling`: the owner decided the label explicitly, and the ruling is kept beside the cases;
- `blind-agents`: agents labelling without the rule's answers, with disagreements sent to the owner.

A label taken from the rule's own answers proves nothing.

**The owner's rulings are cases, every one.** They are where the owner drew the line, so they are what the questions must reproduce. They go in the case file and nowhere else: never in a `reference`, never paraphrased into one, never in a question's criteria.

**Two sets, never mixed:** a development set the rule is tuned on, and a held-out set from other sources that it never sees until it is frozen. The held-out set has a holder: an independent agent who isn't whoever tunes the rule, who writes and keeps the held-out cases, checks them against the rule's examples, and runs them once after the freeze. Whoever tunes the rule never reads them: not to desk-check, not to compare examples, not to borrow one, not to "just see". What crosses from the holder to the tuner is only an attestation or a failure, never a case's text, location or label.

**A selection's cases** come from its rule's cases. Every piece a must-warn case needs is a required inclusion: the selection must keep it, in whatever form the standard governs it (an instruction, a worked example, a table row, a quotation). Pieces the standard doesn't govern, such as a heading-only section or plain rationale, are the exclusions it should drop. Dropping a required inclusion hides a mistake from the rule before the rule is asked.

**Three things keep the cases honest:**
- **Cases come first.** A change to a rule's questions, reference or bars gets its new cases before the change, never after.
- **Never adjusted to pass.** A case is never dropped or relabelled so a run passes; a changed label is a commit with its reason, from the label's own source.
- **Counter-examples count.** The must-pass cases hold the exemptions the standard's home states, such as a product named only as a labelled example, and every wrong warning the rule once gave on a real skill.

### The floors

A judged rule warns anyone only once its cases meet all of these:
- at least three real mistakes that must warn, the text before a real fix among them;
- at least three good texts that must pass, the text after that fix among them;
- at least three near misses;
- every wrong warning it once gave on a real skill, as a case that must pass;
- a held-out set it was never tuned on.

A rule short of any floor stays off, with what it lacks listed.

## Examples and cases stay apart

A `reference` example teaches the model what the standard means; a case tests whether it learned. Written from a case, the example hands the model that case's answer, and the case stops testing anything.

Before the first run, compare every example with every development case:
- **the text:** no example is a case's piece, a near copy of it, or a summary of it;
- **the subject:** no example describes the folder, skill or section a case points at, however reworded;
- **the answer:** no example carries a case's expected label or verdict.

A match is rewritten from the standard (its home's examples and exemptions, or a short one made up to illustrate them); the case keeps its label.

The held-out side is the holder's. Give the holder the examples as they will be frozen; the holder makes the same three comparisons against the held-out set and returns only one of: separate (no overlap), contaminated (how many examples overlap, without saying which cases), or a coverage failure (the held-out set can't meet its floors). An overlap is fixed by rewriting the example, never by showing the tuner the case. With no attestation, the held-out set's separation is a named gap, and a held-out result can't be called unseen. The held kind filter failed this: two of its examples were the real descriptions of `domain-decision-models` and Agent Studio's skill, labelled domain and tool manual, and both folders were scored cases. Both came back right, and those two results showed nothing.

## The desk check

Before any request, read the development cases on the state their requests will carry, against the questions. It costs minutes; the run it replaces costs a thousand requests, and its answers can't be reused once a meaning changes. A selection is desk-checked before its rule: on its candidates, for its required inclusions and its exclusions; the downstream rule then on the pieces the selection keeps.

1. **Get each case's state.** MUST load `../../skill-rules-config/references/desk-check-state.md` and return each case's state as that recipe rebuilds it, on the case-run overlay with nothing sent, every cut named and the equivalence gap recorded; or the case's gap. On the shipped engine this is always a reconstruction, never the sent bytes; a plain checkout of the case's revision, or a saved request whose inputs have changed since, reads another instrument.
2. **Answer each question by its criteria,** as written, for that state. Write the answer down, then walk the tree to its outcome.
3. **Compare with the label.** Every owner-ruled development case first; then enough other development cases to cover each floor; for a selection, every required inclusion. Never a held-out case.
4. **Diagnose each mismatch** before changing anything: is the decisive content missing from the state (fix the evidence, with the questions unchanged), or does the meaning put the case on the wrong side of the line (fix the meaning)? Never the label, and never a split into more questions that carry the same line.
5. **Compare the examples with the development cases,** as above, and ask the holder for the held-out attestation.

```text
case:      <id>  <file>:<first>-<last> @ <revision>   label <warn | pass | label>  from <origin>
state:     <the decisive content it holds; cut or unavailable fields>
answers:   <question>: <yes | no | label> because <the words of the criteria it meets>  ...
outcome:   <route> -> <pass | finding | label | uncertain | selected | rejected>    matches label: yes | no
if no:     evidence gap | meaning: <the line the criteria draw vs the owner's line>
gap:       reconstructed on <overlay revision and rulebook commit>; equivalence to the sent state not shown
```

**Worked: the held product-workflow rule.** A quiet ruling: `presentation-html`'s Demistify reference, lines 45–73, which tells the reader to run the public Demistify CLI's documented `embed` commands. Its state holds those commands in full. The first question, "Does this section show concrete material that belongs to one product?", by its criteria: yes, it shows a product's commands and files. The second, "Is all of that material shown only as labelled examples?": no, they are instructions. Outcome: a warning, against a quiet ruling. The diagnosis is the meaning, not the evidence: the state holds everything, and the criteria draw the line at "shows commands", while the owner's is "one application's own procedure, as opposed to a public tool used as documented". The run later gave exactly that warning, at .93, and four more like it.

What the desk check is, and isn't: it's the author reading the instrument's definition against the owner's line, and it catches a meaning that is wrong even when the model reads it exactly as written. It can't show what the model will answer, and it reads a reconstruction, never the bytes the engine sends, so a clean desk check earns the next request, never a claim that the rule works.

## The runs

When the rule has a selection, run it first, on the development cases' files, and read each candidate's outcome against its required inclusions and exclusions; then desk-check and review the rule on the pieces it keeps. Run the rule's development set; then, with the questions, reference, evidence, selection and bars frozen, the holder runs the held-out set once and returns its results (`skill-rules-config` has the commands; each asks, so each needs the key).

**Every case gets one outcome,** counted per rule and per filter, apart:
- **scored:** `right`, `false_warning`, `missed`, `unsure` or `incomplete` for a rule; `right`, `wrong_label`, `unsure` or `incomplete` for a filter;
- **listed with why, not scored:** `stale`, `no_matching_piece`, `more_than_one_matching_piece`, `filter_excluded`, `not_judged`.

A must-warn or must-pass case that ends unsure, incomplete, stale, unmatched or excluded hasn't met its obligation, and an invalid or missing reply counts the same. A case a filter skipped as unsure hasn't met its obligation either: nine of the held product-workflow rule's twelve unsure cases were folders its kind filter couldn't label.

**Tuning:** only on development results. Diagnose each miss at its question (two facts in one, a meaning that draws the wrong line, missing evidence) before any bar moves. When two cases with opposite labels get nearly the same answers, no bar separates them: the held rule's quiet Demistify case and a real mistake both read .93 on its first question, so the defect was the meaning. A held-out miss is reported, never tuned away; after a correction, scored held-out cases become regression cases, and a fresh held-out claim needs cases not yet seen.

**Bars:** each set on the development cases and recorded in the case file with the cases that set it. A bar with no development case behind it is unassessed, and a rule with an unassessed bar isn't ready to switch on.

**The baseline:** the current rule for the standard, run on the same cases within one model version group, when one exists; otherwise name the missing comparator.

**Measures:** count every case, passes, exclusions and listed ones included; report false warnings, misses, unsure (review load), incomplete and instability across identical repeats apart; record the model requested and the version that answered.

## On or held

A judged rule or filter switches on only when all of these hold:
1. its cases meet the floors;
2. every bar is set on development cases, with the cases recorded;
3. on the frozen development set, every must-warn case warns and every must-pass case passes (a filter: every case gets its label), with unsure and excluded counted as unmet;
4. the held-out set, run once after the freeze, gives no false warning and no miss (a filter: no wrong label);
5. no result in either run is incomplete.

Otherwise it is held, unchanged, with what it lacks, outside the active config; reproducing it means checking out the commit it was evaluated at. A held rule is corrected by one diagnosed change at a time, with its new cases first, its own desk check, review and development run. A correction that fails again stays held; nobody rewords it until it passes.

## Worked readings

**Invented text passed for proof.** A rule set's first proof used excerpt cases copied into the repository. Its held-out headline read 25 matched, 8 uncertain, 1 missed, 0 wrong; 13 of the 25 matches came from invented mini-skills and invented rule files, and on real held-out text it was 12 matched, 4 uncertain and 1 missed, of 17. The headline measured how well the rules judged text written to be judged. Read it as the coverage it was, rule by rule, and name each rule with no real positive.

**A case that pointed at the wrong piece.** Migrating those excerpts to real-text cases first took each case's lines from where its excerpt started; one opened at `skill-creation/SKILL.md:22`, while the load the rule judges begins at `:24`. Dozens of cases would have matched a neighbouring piece or none. Take each case's lines from the piece the engine judges, confirmed on an evidence print.

**A clean tree that wasn't a valid instrument.** Both held trees had one fact per question, batched requests, explicit in-between routes and guarded passes, and an independent review passed both from their source. Their development runs failed on the owner's rulings. Shape is necessary; what the rulings say on the sent state is what shows the meanings are right.

Complete when:
- every judged rule and filter has a case file on real text at fixed revisions, each case with its set and label origin, every owner ruling among them, and none in a `reference`;
- every example was compared with every development case and none matches, and the holder's held-out attestation is in or named as a gap;
- the desk-check record has a matching row for every owner-ruled development case and every required inclusion of a selection, each with its equivalence gap, or the mismatches went back to step 4;
- its development run and, frozen, its held-out run are in, every case scored or listed with why, the floors and switch-on conditions named as met or lacking;
- the decision is on, with every condition met, or held, with what it lacks;
- the receiving agent's call is named as owed to a pressure task, and everything still unproven is named.
