## Calibrate each mechanical rule

A mechanical rule is proven by what it selects and what it decides on two examples, chosen before anything runs:

- a **good example**, a target document where the standard holds at one unit you can point to;
- a **bad example**, where the standard breaks at one unit, in the way the standard names.

A copy of a real skill file with one edit makes the best example, because it brings real surroundings: frontmatter, nesting and inline code. Put the break where real text puts it, mid-paragraph included, so the example tests the selector as well as the predicate. Keep the examples as fixtures outside the skill being checked.

Run `evaluate_rules` once per example, with the RuleSet's target input bound to that example file. The runtime invocation is the check input plus runtime settings (origin, cursors, execution, backend, attempts and request budget), and the engine's invocation schema owns them. Local-only rules construct no backend and need no credential. A rule that would reach a model needs real backend configuration and a credential; that is a hosted run, with its own cost and authority, and it isn't part of this proof unless the request grants it.

Read `result.outcome.report`:

- **`rule_coverage`**: `full`, `partial` or `none`. Partial coverage still exits 0.
- **`skipped_rules`**: entries or sources that didn't run, with their diagnostics.
- **`rule_evaluations`**: per rule, `expanded` with its occurrences, or `zero_matches`, `not_applicable`, `outside_change_scope`, `selection_failed`, `evaluation_failed` or `cancelled`. Zero matches is complete, and it is never a pass.
- **`occurrences`**: one per selected unit. A mechanical occurrence is `kind: checked`, with `key.rule_id`, its `target` location, `declared_severity`, and an `outcome` that is `completed` with `result` `pass` or `fail` (plus AST match observations), `unresolved` with diagnostics, or `cancelled`.

Find the intended occurrence by matching its `key` and `target` location, which carry the source and the unit's range, against the unit you chose. Then decide:

| observation | closes calibration? |
| --- | --- |
| good example: the intended unit is an occurrence of this rule, `completed`, `pass`; bad example: the intended unit is an occurrence, `completed`, `fail` | yes |
| `zero_matches` for the rule on either example | no: the selector reaches nothing there |
| occurrences exist, but none at the intended unit | no: the selector reaches other text |
| the intended occurrence is `unresolved` or `cancelled` | no |
| the rule is in `skipped_rules`, or coverage is `partial` or `none` | no |
| both examples `pass` | no: the predicate can't see the break |
| both examples `fail` | no: the predicate or its polarity is wrong |
| exit 0 | says nothing either way |

### Worked calibration

Take the load check `K015` from the entry examples: it selects paragraphs whose visible text starts with `MUST`, and its `ast_grep` rule fails one that contains `MUST load` without the word `return`. Its marked wording says exactly that: "A paragraph with a `MUST load` instruction contains the word `return`." The outcomes below are predicted from the engine's selection and matching rules.

- **Good:** "MUST load `reference.md` and return the selected facts." The paragraph is an occurrence, `completed`, `pass`.
- **Bad:** "MUST load `reference.md` before step 2." The paragraph is an occurrence, `completed`, `fail`, with an AST match observation on it. With both rows observed, calibration closes for this selector.
- **Bad, mid-paragraph:** "Read the skill first. MUST load `reference.md` before step 2." With `starts_with: "MUST"` this paragraph is never selected; the report shows `zero_matches` or no occurrence at that unit, and the process exits 0. The rule looks clean and calibration hasn't closed. Fix the selector, for example with `call_site` on the same pattern so every call is reached, and rerun both examples.
- **Proxy surfaced:** "MUST load `reference.md` and return." is selected and passes. Against the rule's own lexical wording that's correct. Against "a mandatory load names its returned result" it shows the check is a proxy, which is why that semantic standard keeps its own model-judged rule.

When calibration doesn't close, fix the cause:

- the selector misses the intended unit: change `select` (unit kinds, the filter, or `call_site`), not the example;
- both examples pass: check whether the predicate reads visible text when the break sits in inline code, or whether the check is a proxy, in which case the standard goes back to step 2;
- both fail: an `ast_grep` rule must describe the violation, and an `expect` predicate must describe the property that holds;
- unresolved: the target doesn't suit the check, as with a missing frontmatter block, or `ast_grep` on a frontmatter field.

The examples were fixed before the run and stand for the standard's meaning. Don't edit one until the rule agrees with it; if an example was wrong, say so, replace it, and rerun both.
