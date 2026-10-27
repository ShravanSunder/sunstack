# transfer

Mission / stance: Judge each rule the reviewed skill states by the root's transfer test, outside the incident it came from. A rule can bind, sit in one home and agree with every other statement, and still be right only where it was written; the other checks read a rule inside its skill, and this one carries it outside.

Maximum authority: read-only application of the transfer test to the rules in scope. Return candidate findings; the review lead owns rewrites, scope rulings, and the final verdict.

Where to look, when the artifact is a **proposal**: each rule the specification part states, with the cases and verdict the set records for it; the requirements part's evidence, for the incident, product or repository each rule came from and any scope the owner adopted.

Where to look, when the artifact is **changed files**:
- every rule the reviewed text tells the agent to apply: a gate, a prohibition, a default, a required tool or pattern;
- each product, library, API, repository, path or incident named inside those rules, and the label or scope beside it;
- the cases the design set records for the same rules, when the change has one.

MUST load `../../../domain-skill-crafting/references/generalization.md` and return its standards and its transfer test, then each rule in scope with its two cases and its verdict.

How to inspect: Build your own two cases for each rule before reading any the author recorded; a recorded case is evidence to compare against, never the case you run. Run the loaded test on each rule and fill:

```text
rule:        path:line, quoted
judgment:    the rule as the test's first step writes it, or as written when it already is one
case one:    the repository you chose, and holds | fails
case two:    the bad choice you built, and rejected | let through
verdict:     the test's verdict on these two cases
recorded:    the author's cases for this rule, or none; agree | differ
```

Where your verdict and a recorded one differ, the finding names the case that separates them.

Good signals:
- every returned standard is kept for each rule in scope, with the line that shows it;
- the cases the author recorded agree with a pair you built yourself.

Bad signals:
- a returned standard broken, with the rule and the case that breaks it;
- recorded cases built from the incident itself: case one in the incident's own repository, case two the very choice that started it;
- a rule that points the agent at one repository's package, path or command.

Calibration: Report the rule, the case it fails, and the smallest fix: the judgment sentence that would replace it, or the scope and basis that would make its named thing honest. Do not judge whether a rule's wording binds or whether it earns its place; a rule that transfers and is still weak is filed with `route: steering-strength`.

Overlap boundary: This check owns *a rule holds outside the repository it came from*. `steering-strength` owns whether the rule's wording binds; `no-op-pruning` owns whether it earns its place; `rule-agreement` owns two statements of one rule that disagree. `mental-model-fit` owns a lens borrowed from a source whose problem differs; a rule borrowed the same way is this check's.

Stop when: every rule in scope for the artifact (each rule the specification part states for a `proposal`, each rule added or changed by the diff for `changed files`, every rule in the file for `create` and for `existing files`) has its two cases and its verdict, or the artifact states no rule.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding quotes the rule with its `path:line`, gives the case it fails and the verdict, and proposes the judgment sentence or the adopted scope.
