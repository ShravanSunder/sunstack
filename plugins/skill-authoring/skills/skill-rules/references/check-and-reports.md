# Check and Reports

This reference owns step 6: running the engine's check, print and local evaluation, reading what comes back, and deciding whether each rule is proven. Expected input: the wired RuleSet and the invocation that runs it, the intended rule IDs and which of them are mechanical, and for each mechanical rule one good and one bad example. Return: the check outcome and rule count; each intended rule's printed wording and your reading of it; for each mechanical rule, the good and bad occurrences with their completed results; and what stays unproven.

## Engine docs

Replace `<version>` below with the repository's CLI pin, without a leading `v`. Read these public files before authoring definitions; their tag must match the binary. The raw URLs work in a consumer repository with no engine checkout. Follow relative schema references and example dependencies from the same tag.

| contract | version-matched public file |
| --- | --- |
| installation and lint overview | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/README.md` |
| native stdin protocol, operations and exits | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/crates/sunstack/README.md` |
| RuleSet shape | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/schemas/rule-set.schema.json` |
| native runtime input | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/schemas/rule-invocation.schema.json` |
| native check/print input | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/schemas/check-rules-input.schema.json` |
| marker-keyed rules entries | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/schemas/rule-source.schema.json` |
| marked-source RuleSet example | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/examples/marked-standards.ruleset.json` |
| complete check/print request example | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/examples/marked-standards.check.request.json` |
| mechanical runtime input example (wrap in the exec protocol frame) | `https://raw.githubusercontent.com/ShravanSunder/sunstack-tools/v<version>/docs/specs/2026-10-12-rust-rule-engine/examples/mechanical.invocation.json` |
| lint config schema release asset | `https://github.com/ShravanSunder/sunstack-tools/releases/download/v<version>/sunstack.lint.schema.json` |

The tagged `docs/specs/2026-10-12-rust-rule-engine/examples/` directory holds the companion files. Adapt example paths and bindings to the consumer repository; do not assume the example's engine-repository paths exist locally. If a public file cannot be retrieved, report the missing contract instead of guessing its shape. When the working repository ships the matching engine source, its copies of these files and its verification skill may supply the same contracts. Relative links in an installed package README do not establish that the package contains their targets.

## Run the engine

`sunstack exec` reads one JSON request on stdin and writes one JSON response on stdout:

```json
{ "protocol_version": 1, "operation": "check_rules", "input": { "...": "the operation's native input" } }
```

Use the repository's pinned version: `npx --yes @sunstack/cli@<version> exec < request.json`, substituting the pin and your saved request path, or use its Homebrew or shell-installed `sunstack exec` at that version. Run it from the repository root, because relative paths in the input resolve from the working directory. Keep every request and response you rely on; the decision table's proof column points at them. If no binary is available, the proof is blocked: report that, and never infer a pass from a request that looks right.

### Front doors

Use the repository's pinned CLI for every row below. The two lint rows apply only when the RuleSet declares exactly one `document` input and a `sunstack.lint.json` names it; `--config <file>` selects that config explicitly. The native `exec` rows apply to every supported RuleSet; evaluation uses its mechanical-only calibration view.

| command | what it shows |
| --- | --- |
| `sunstack lint --config <file> --check` | validates the config, RuleSets and marker/entry bindings without a credential; prints a success message, not a count |
| `sunstack lint --config <file> --rules` | lists rule IDs, settings and rules-entry file/line; count the array and compare its IDs with the intended inventory |
| `sunstack exec` with `check_rules`, `output: assembled_rules` | prints the count, native definitions, Markdown marker provenance and wording for every intended rule |
| `sunstack exec` with `evaluate_rules` | gives native per-occurrence calibration results on the mechanical-only view described below |

Lint's inventory does not print the question or Markdown marker provenance, so native print is required for every RuleSet. `lint --all --format json` reports failed mechanical findings but drops passing mechanical results; a clean report cannot prove that the intended good occurrence was selected.

A RuleSet with another supported input shape, such as separate `skill` and `calibration` document inputs, stays on native `exec check_rules` for validation and print. Keep every declared input and binding. Do not remove context to fit lint, or claim lint passed on that shape.

### Exit codes

Native `exec` exits:

| exit | meaning |
| --- | --- |
| 0 | the operation completed, including a `fail` verdict and partial coverage |
| 2 | invalid input or a refusal |
| 3 | failed or incomplete: an unresolved check, or no valid rule |
| 4 | cancelled by the caller |

Exit 0 says the engine finished, not that a rule passed. Read the response.

Lint exits: 0 for a successful check/list or clean run; 1 for findings that reach the failure policy (including a configured warning limit); 2 for invalid input/config or a definition refusal; 3 for failed or incomplete work; 4 for cancellation. A lint exit does not close native calibration.

## Check and print

`check_rules` assembles every requested RuleSet and validates each rule without reading any reviewed document, constructing a backend or sending a model request. Its input holds `definition_root`, `definitions`, `repositories`, `payload_schemas`, `limits` and `output`: `diagnostics` only validates, and `assembled_rules` also prints every assembled rule after a clean check. That printing run is "print".

A clean check returns `result.outcome.kind: checked` with `checked_rule_count`, and exits 0. A refusal returns `kind: refused` with `refused_rule_count` and `diagnostics.items`, each carrying a `code`, a `location` (`file`, `line`, `column` and `field_path`, which holds the marker ID for a marker-binding refusal and may be empty otherwise) and `guidance`, and exits 2; nothing prints. IF `check_rules` refuses, load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then rerun the check.

Read the print in two passes.

1. **Coverage.** `checked_rule_count` is the count you expect, and every intended rule ID appears as a `printed_rules[].definition.rule_id`, with `source.provenance.marker_id` and `source.provenance.markdown` naming your marker and file.
2. **Wording.** Read each rule's wording as a stranger would, with nothing but its words: `definition.verdict.question.instructions` for a judgment rule, `definition.verdict.explanation` for a mechanical one. Good: one standard, with its subject, and nothing from neighbouring text. Bad: it opens mid-thought, needs a lead-in, carries several standards, or reads as teaching rather than a requirement. A bad reading goes back to step 3 for a narrower host, or to `skill-creation` when no host reads well.

What check and print prove: the definitions assemble and each question reads as its standard. They can't show that a rule selects or detects anything, because they never read a reviewed document.

## Calibrate each mechanical rule

A mechanical rule is proven by what it selects and what it decides on two examples, chosen before anything runs:

- a **good example**, a target document where the standard holds at one unit you can point to;
- a **bad example**, where the standard breaks at one unit, in the way the standard names.

A copy of a real skill file with one edit makes the best example, because it brings real surroundings: frontmatter, nesting and inline code. Put the break where real text puts it, mid-paragraph included, so the example tests the selector as well as the predicate. Keep the examples as fixtures outside the skill being checked.

Build a **mechanical-only calibration view** from the successful native print before running either example:

1. Copy only the mechanical `printed_rules[].definition` objects, unchanged, into a calibration JSONL rules file outside the checked skill. Wire it through a calibration-only RuleSet's `rule_paths`, with the inputs and bindings those definitions require. Keep the full authored RuleSet for check and print.
2. Compare each copied definition field by field against its printed definition: rule ID, evidence declarations (including the target input and selector and any context), target, applicability, questions, verdict explanation, `expect` predicate or `ast_grep` rule, and severity. Preserve every field; selecting the mechanical members is the only definition change. Record that equivalence beside the requests.
3. Confirm the calibration view contains no judged definitions or model-based applicability/routing. A lint config's `off` setting does not disable anything in native input. If model work is still reachable, return that proof gap rather than evaluating it without a hosted grant.

Run `sunstack exec` with `evaluate_rules` once per example, with the calibration view's target input bound to that example file. Use the shared definition/binding/repository/limit fields and the runtime settings (origin, cursors, execution, backend, attempts and request budget) that the invocation schema requires; `evaluate_rules` takes no `output` field. Even a local-only request carries backend metadata, but constructs no backend and needs no credential when no model work is reachable. A hosted run has its own cost and authority and is outside this proof unless explicitly granted.

Read `result.outcome.report`:

- **`rule_coverage`**: `full`, `partial` or `none`. Partial coverage still exits 0.
- **`skipped_rules`**: entries or sources that didn't run, with their diagnostics.
- **`rule_evaluations`**: per rule, `expanded` with its occurrences, or `zero_matches`, `not_applicable`, `outside_change_scope`, `selection_failed`, `evaluation_failed` or `cancelled`. Zero matches is complete, and it is never a pass.
- **`occurrences`**: one per selected unit. A mechanical occurrence is `kind: checked`, with `key.rule_id`, its `target` location, `declared_severity`, and an `outcome` that is `completed` with `result` `pass` or `fail` (plus AST match observations), `unresolved` with diagnostics, or `cancelled`.
- **`measurements.model_requests` and `measurements.inference_attempts`**: both must be zero for this local calibration. A planning record in `requests` with `status.kind: not_sent` and reason `no_questions` is not a dispatched request.

Find the intended occurrence by matching its `key` and `target` location, which carry the source and the unit's range, against the unit you chose. Then decide:

| observation | closes calibration? |
| --- | --- |
| good example: the intended unit is an occurrence of this rule, `completed`, `pass`; bad example: the intended unit is an occurrence, `completed`, `fail` | yes |
| `zero_matches` for the rule on either example | no: the selector reaches nothing there |
| occurrences exist, but none at the intended unit | no: the selector reaches other text |
| the intended occurrence is `unresolved` or `cancelled` | no |
| the rule is in `skipped_rules`, or coverage is `partial` or `none` | no |
| the copied mechanical definitions differ from the print, or either model-request counter is nonzero | no |
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

## Model-judged rules

For a model-judged rule, this proof is check plus print: the rule assembles, and its question reads as its standard. How well a hosted judge answers that question, with or without calibration `context`, is a separate hosted observation. Report it as unproven.

## Local run

Take the lint config and the declared CLI pin from the repository's package metadata or local-use documentation. A `$schema` URL is not a CLI pin. If the config or declared pin is missing, report which is missing and skip the run; create neither and guess no version.

For a RuleSet with exactly one `document` input and a lint config, use that pin through `npx --yes @sunstack/cli@<version>`. Run `sunstack lint --config <file> --check`, then `sunstack lint --config <file> --format json <changed file>` once for each changed `SKILL.md` or reference file. Named files use full scope. Keep the JSON report with each command and exit code, and report every finding. Inspect `status.kind`: `nothing_selected` means that file was not linted, even with exit 0. Report each changed file the config didn't select as `not linted`; for example, a config binding only `SKILL.md` doesn't lint its references. A clean report on a selected file and an unselected file are different results.

Fix errors before handing back. Fix warnings in files you changed; list warnings elsewhere. A fix that would change another skill's trigger or meaning stays out of scope and is listed for its owner. Warnings alone exit 0 under the engine's policy; don't change their severity to make the run fail.

For another supported RuleSet input shape, run `sunstack exec` with a saved `check_rules` request per RuleSet. A check covers only the sources its config/request names; compare the printed IDs and count with the intended inventory. Return each command, its exit code and findings, every changed file not linted, or the missing-config or missing-pin skip.
Complete when: `check_rules` passed on the real `sunstack` binary; print listed every intended rule ID, with the expected count, and each question read as its standard; the mechanical-only calibration definitions match the print; every mechanical rule has a selected good `pass` and a selected bad `fail` in native reports with zero model requests and inference attempts kept as evidence; and everything still unproven is named.
