# Skill standards and the linter

A skill teaches an agent how to work. A checked rule evaluates selected text against one standard. A pressure experiment observes what an agent does. These use different evidence and support different claims. [domain-skill-crafting](../../plugins/skill-authoring/skills/domain-skill-crafting/SKILL.md) owns the skill text standards; [skill-rules-authoring](../../plugins/skill-authoring/skills/skill-rules-authoring/SKILL.md) owns choosing which become checks and designing and proving each one; [skill-rules-review](../../plugins/skill-authoring/skills/skill-rules-review/SKILL.md) reviews one independently; [skill-rules-config](../../plugins/skill-authoring/skills/skill-rules-config/SKILL.md) is the manual for the shipped engine's rulebook files, commands and reports.

The reusable Rust engine, `sunstack` executable and npm distribution live in [Sunstack Tools](https://github.com/ShravanSunder/sunstack-tools). This repository owns the skill standards, evidence project, rule entries and labelled real cases. An engine defect belongs in Sunstack Tools; a bad evidence selector, question or severity belongs to its consumer.

## Active rulebook

An end-of-line marker such as `<!-- K002 -->` binds a Markdown standard to its
JSON entry. The [config](../../plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json)
pairs the description standards with three mechanical checks and the call
standard with R02 `load-call.names-when-where-and-result`. R02 reads the full
matched paragraph and explicit enclosing caller contract, using separate
operative-call, moment, destination, work and result questions with uncertain
routes. Its frozen entry moved byte-for-byte into the active rules directory
after the Lead accepted its held-out result; the model remains pinned to
`typesafe/jev-1.14-20261014`.

The kind filter and product-workflow rule remain unchanged under `rules/held/`
after their development run 2 failed the switch-on conditions. The
[held note](../../plugins/skill-authoring/skills/domain-skill-crafting/rules/held/README.md)
names their evaluated source, model, counts and limitations. They are outside
active selection; R02's activation does not adopt either rejected candidate.

The held kind filter reads the description and the body through the end of the
first H2 section, with its authored reference and no folder name in state. Two
independent three-option questions feed its tree. The held product-workflow
rule reads section text and loaded openings; its three Noul questions and
complete-input guards are preserved for a corrected attempt. Keeping these
artifacts is not activation: ordinary lint loads only configured pairs.

## Run and inspect

From the repository root:

```sh
sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json --check
sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json --rules
sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json --report run.json plugins/skill-authoring/skills/skill-creation
sunstack lint show run.json 3
```

The native command owns results and status. No repository wrapper changes which
results an agent sees. A model run uses the authorized credential route.
`--check` and `--rules` need no key and prove rulebook admission rather than
judgment quality. Add `--all` for configured files or `--since REV` for changes.
On 0.9.0, `--all --prepare <file>` builds exact requests without a key or dispatch;
prepared requests and completeness abstentions are not semantic passes.

Human output is a short file:line line for each warning, unsure result or gap,
with an ID for detail. The saved report retains requests as sent, all answers,
requested and resolved models, raw evidence, and rulebook contents. `lint show`
needs only that file, including after source files are gone.

Warnings without a caller-set limit do not fail a run. Status follows invalid,
cancelled, incomplete, failed, unsure, clean in that priority order. A filter
exclusion is a recorded decision; an unsure or incomplete filter is a gap.

## Real cases and proof limits

`sunstack lint cases` runs the ordinary lint path on whole Git snapshots with
today's rulebook overlaid. Case labels, hashes and locations stay outside model
state. Each case is counted or listed with its reason. Rule cases use the exact
piece range, keeping nested sections distinct; filter cases hash the raw declared
field values in lexical key order. A selected historical symlink is listed as
unjudged and does not select its target.

Development cases set each tree's bars. Frozen held-out cases are run once,
compared with the previous rulebook under the same pinned model version. U17's
floors, known wrong-warning regressions and unassessed bars are authoring proof
obligations. No adoption receipt, stored score or case file gates ordinary lint.
The Lead decides activation from the observed evidence; a short or failed set
keeps the rule off and names what is missing.

Local tests keep the real native CLI and script only the external judge.
Mechanical description checks use real Git-pinned skills. Independent driver
observations cover authored filter state, active/held rules and baseline case
comparison. Scripted answers establish the mechanics; real model quality needs
the development and held-out observations. Receiving-agent behavior remains a
separate pressure task.

The runtime procedure belongs to
[running-rules.md](../../plugins/skill-authoring/skills/skill-rules-config/references/running-rules.md).
Release proof and installed-cache refresh status belong in the
[changelog](../changelog/README.md).
