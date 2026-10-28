# Skill standards and the linter

A skill teaches an agent how to work. A checked rule asks whether selected text satisfies one of that skill's standards. A pressure experiment observes what an agent actually does. These use different evidence and should produce separate claims. [domain-skill-crafting](../../plugins/skill-authoring/skills/domain-skill-crafting/SKILL.md) holds every standard a skill's text must meet.

The teaching and rule-authoring instructions live in this repository. The reusable Rust engine, `sunstack` executable, npm distribution and lint command live in [Sunstack Tools](https://github.com/ShravanSunder/sunstack-tools). The engine executes supplied definitions; this repository owns which skill standards to check and the meaning of their expected results.

## From a standard to a check

[skill-rules](../../plugins/skill-authoring/skills/skill-rules/SKILL.md) starts from the actual skill and its references. Each candidate standard gets exactly one outcome:

| Outcome | Deciding property | Executable marker? |
| --- | --- | --- |
| Deterministic | A selected unit's text or structure fully decides the property | Yes, with `expect` or `ast_grep` |
| Model-judged | Reading comprehension is needed and the marked text alone states a usable question | Yes, with a judgment threshold |
| Review-only | Cross-file, history or intent judgment is required, or the target cannot be selected | No |
| Eval | The property is about an agent's behavior under pressure | No |
| Prose | Teaching, rationale or stance has no checkable claim | No |

A regex that sees `load` and `return` cannot prove that a call names a meaningful returned result. A check on those words is a lexical proxy and must say so. The semantic standard still needs its appropriate judge. A deterministic rule must survive counterexamples in both directions: a valid text it wrongly rejects and an invalid one it wrongly accepts.

The marked Markdown owns the question wording. An end-of-line marker such as `<!-- K014 -->` selects its host: a permitted heading section, paragraph or list item. A paired JSON object keyed by `K014` supplies the rule's name, target selector, check kind, severity and optional calibration context. A RuleSet's `rule_sources` wires the Markdown/rules pair and its prefix. The rule's target selects the text being judged, which can be in a different skill. Marker identity and rule name are distinct.

The [markers reference](../../plugins/skill-authoring/skills/skill-rules/references/markers-and-rules.md) and the engine's version-matched contracts own exact syntax, host restrictions and refusal behavior. The question is assembled at runtime from the source. A generated checked-in copy of the question is not the authoring source.

## Engine and lint ownership

The reusable engine accepts RuleSets and explicit input bindings. It resolves source definitions, selects occurrences, prepares evidence, and either runs a local mechanical check or sends reachable model questions through the decision backend. The report identifies the occurrence, selected source, verdict, skipped rules, coverage and request measurements. `check_rules` validates definitions; `evaluate_rules` evaluates bound evidence. The general engine supports more input kinds than the lint front door.

The `sunstack lint` path adds repository-oriented configuration and reporting:

1. The CLI chooses inspection (`--check` or `--rules`) or evaluation and forwards the requested config, paths and scope.
2. Configuration resolves each RuleSet. Lint requires exactly one document input; a general engine invocation with multiple inputs must use the general interface.
3. Target selection walks files using configured globs, named paths and ignore policy. Each selected file is bound to that RuleSet's document input.
4. Effective rule settings apply by entry/rule/file. Disabled rules are excluded before model work is admitted.
5. The shared rules engine evaluates the prepared invocation. A lazy backend factory is used when model work is reachable.
6. Projection turns native results into findings, incomplete parts, exclusions, usage and a lint status. Mechanical passes do not become findings. Warnings alone are allowed unless a warning limit is exceeded.

The primary code owners are [CLI dispatch](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack/src/lint_command.rs), [configuration admission](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack-lint/src/config_validation.rs), [target selection](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack-lint/src/targets.rs), [binding and policy](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack-lint/src/invocation.rs), [execution](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack-lint/src/lint_run.rs), and [result projection](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack-lint/src/outcome.rs). These links are release-qualified; inspect matching contracts when changing a consumer.

## Front doors and what they prove

| Front door | What it returns | What it does not establish |
| --- | --- | --- |
| `sunstack lint --check` | Configuration and RuleSet validity | Intended target coverage, useful question wording or rule effectiveness |
| `sunstack lint --rules <file>` | Rules and their effective settings for that path | That the path belongs to the resolved target set |
| `sunstack exec`, operation `check_rules`, output `assembled_rules` | Validated native definitions and assembled question wording | Selection or detection on reviewed text |
| `sunstack exec`, operation `evaluate_rules` | Native occurrence outcomes and coverage over explicit bindings | That an agent follows the skill in practice |
| `sunstack lint --all --format json` | Repository findings, exclusions, incomplete results and usage | Individual passing mechanical results omitted from lint's finding projection |

The release also has a normal default scope and explicit change selection. Use its current command help rather than assuming every invocation is a full repository run. Native requests use the versioned `sunstack exec` envelope; schema fields belong to the engine's matching release, not a copied schema in this repository.

| Lint status | Exit | Meaning |
| --- | --- | --- |
| `clean`, `nothing_selected` | 0 | No blocking findings, or no selected work; inspect which one |
| `findings` | 1 | Error findings or an exceeded warning limit |
| `invalid` | 2 | Bad configuration or definitions |
| `incomplete` | 3 | Required evaluation did not finish successfully |
| `cancelled` | 4 | A reported cancelled run |

These are [lint statuses](https://github.com/ShravanSunder/sunstack-tools/blob/v0.1.0/crates/sunstack-lint/src/report_contracts.rs), not a translation of every native evaluation outcome. In particular, native partial coverage or a completed failing occurrence can coexist with native process exit 0. A wrapper interrupted before emitting a report can end by a signal instead of reporting `cancelled`.

## Proof boundaries

For a mechanical rule, keep an unchanged copy of its assembled definition and evaluate a good and a bad example with the native interface. Both must select the intended occurrence and complete with `pass` and `fail` respectively. Check coverage, skipped rules and selected locations. Credential-free mechanical proof also records zero model requests and inference attempts. A zero match or an unresolved frontmatter block is not a passing calibration.

For a mixed RuleSet, disabling judged rules in lint is not by itself the calibration proof. The [proof procedure](../../plugins/skill-authoring/skills/skill-rules/references/check-and-reports.md) and executable command examples are version-sensitive: read the exact skill branch selected for the task and its matching engine contracts. The released-CLI migration uses a mechanical calibration view that copies only printed mechanical definitions, unchanged, and compares them with the original assembled output. Hosted semantic accuracy needs separately authorized, independently labeled examples.

To prove repository coverage, compare the independent tracked skill inventory with lint's actual resolved targets. A list of effective rules for a named path does not prove membership. The pilot's planned canary fails on every selected file, making omission observable; a second control deliberately excludes a subtree and must fail the comparison. This is a consumer proof strategy, not a new engine rule.

Rule-authoring evidence establishes a check on text. Skill behavior proof additionally needs an eligible fresh agent, a known loaded revision, a task that does not disclose its grading criteria, and observed actions against checks written independently. Historical scenario collections and catalogues are inputs to that work, not completed evals.

For a concrete case, the pilot's description-prefix standard selects the skill's `description` frontmatter field and uses `expect.starts_with: "Use when"`. A present field beginning `Use when` should complete pass; the same field beginning `This skill` should complete fail. A missing or malformed frontmatter block can leave selection unresolved, so a green process exit or absent finding cannot substitute for reading the occurrence. The Markdown marker supplies the standard, the rules entry supplies that field selector/predicate, and the RuleSet connects them. These are predicted outcomes from the authored contract, not a new run claimed by this document.

## Shipped source and the unfinished consumer

`skill-authoring` 0.4.0 ships `skill-rules`' five-outcome classification, markers, native check/print and good/bad proof model. Its runtime wording still names the earlier `sunstack-rule` front door. The released-CLI migration and repository standards pilot are separate work on `feat/skill-rules-sunstack-lint`; they must not be described as shipped merely because the reusable tool is released.

The pilot's R1 updates `skill-rules` to the released `@sunstack/cli@0.1.0` front doors. Its record reports a reviewed named-example proof. R2's uncommitted consumer files add markers to `skill-creation`, six frontmatter checks, two disabled judged checks, a repository config, RuleSet and Actions workflow. At this documentation snapshot, the required R2 calibration, all-skill coverage control, PR CI, version/changelog and release remain separate obligations. The private handoff carries exact revisions and evidence locations; this architecture page describes ownership rather than claiming those gates passed.

The engine's demo rules, this pilot, the standalone skill-audit integration and a future mixed pressure-eval consumer are distinct deliveries. An engine defect belongs in Sunstack Tools. A bad target, rubric or severity belongs in its consuming RuleSet. An agent-behavior failure belongs in the skill or verification path that evidence identifies. Adding prose to a skill does not repair a tool defect.
