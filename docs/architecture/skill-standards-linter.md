# Skill standards and the linter

A skill teaches an agent how to work. A checked rule evaluates selected text against one standard. A pressure experiment observes what an agent does. These use different evidence and support different claims. [domain-skill-crafting](../../plugins/skill-authoring/skills/domain-skill-crafting/SKILL.md) owns the skill text standards; [skill-rules](../../plugins/skill-authoring/skills/skill-rules/SKILL.md) owns choosing which become checks and how to read their results.

The reusable Rust engine, `sunstack` executable and npm distribution live in [Sunstack Tools](https://github.com/ShravanSunder/sunstack-tools). This repository owns the skill standards, evidence project, rule entries, runner and labelled rule tests. An engine defect belongs in Sunstack Tools; a bad evidence selector, question or severity belongs to its consumer.

## From a standard to a decision

A standard routes to a mechanical check when text or structure fully decides it, a judged rule when reading comprehension is needed, review when cross-file intent or history matters, an eval when the claim concerns agent behavior, or prose when it carries no checkable claim. A word match cannot establish semantic call completeness.

An end-of-line marker such as `<!-- K001 -->` connects a Markdown standard to its entry in the paired JSON rules file. The entry names one evidence kind, its authored questions and an explicit decision graph. The [config](../../plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json) pairs five rulebook files with their entries, sets marker prefix `K`, selects checked files and names the ast-grep project and decision model. The marked set has thirteen standards; a platform maximum stated in teaching need not become a marked rule. The check's listing is the current inventory of rules and kinds.

The evidence project defines ten kinds. `workflow_section` is selected: its candidates are SKILL.md sections that directly hold a top-level numbered list or carry a numbered or `Step N:` heading, and the decision model chooses which of them are the workflow, one yes/no question per candidate, before any rule runs. `step` lies within a selected `workflow_section`, so a numbered item in a rule list the model rejected is never a step. `skill` is the frontmatter, with the description and the file's selected steps; `skill_target` is the frontmatter alone, for a load target's fields; `skill_body` is the whole SKILL.md, for the spine rule. `load`, `branch`, `sentence` and `reference_section` come from SKILL.md and references (reference sections from references only), and `standards_section` is a `## Standards` section. A sentence is a whole list item or a paragraph outside one, lying within a selected step or a Standards section. Load and branch context names the enclosing selected step's heading; references select no workflow, so their loads and branches carry none. Checked-file globs anchor selection to `plugins/*/skills/*/SKILL.md` and `plugins/*/skills/*/references/**/*.md`; fixtures and retired trees are outside that scope.

A decision may check a field mechanically, ask Jev questions, combine answers and follow thresholds. It ends at `pass`, `finding`, `not_applicable` or `uncertain`. A mechanical gate that rejects a piece sends no request. At the first reachable question, the engine sends all that entry's questions together for that piece; a rejected question gate still prevents a failing verdict answer from becoming a finding. A missing required completion is itself a finding at the step heading, with no question sent.

## Repository entry point

Run from the repository root:

```sh
pnpm --dir tests/skills rules --check
pnpm --dir tests/skills rules plugins/skill-authoring/skills/skill-creation
pnpm --dir tests/skills rules --since main
```

The TypeScript runner invokes `sunstack lint --config <kit config> --format json`. It checks every plugin's skills by default, narrows to named paths, or selects changes with `--since REV`. `--engine PATH` chooses a local build; otherwise it uses the installed `tests/skills/node_modules/.bin/sunstack`. The runner prints its report directory; `--out DIR` selects an empty directory. `report.json` retains the engine output.

Jev is enabled for asking rules and for workflow selection. Because the kit has a selected kind, every run needs the credential, including one whose rules are all mechanical and whose files hold no candidate (it then sends nothing). The engine resolves its credential from its environment or OS credential store. The runner inherits that environment unchanged, supplies no key and sets no endpoint. Its config names `jev-latest` with the engine's default endpoint. Evidence and request character limits are 6,000 and 20,000 respectively; `workflow_section` and `skill_body` allow 12,000 each.

| Engine front door | Evidence it provides | Limit |
| --- | --- | --- |
| `sunstack lint --check` | Config, rulebook, entries and evidence project validate; assembled rules print, then each selected or contained kind | Reads no checked files, needs no key and proves no detection |
| `sunstack lint --all --evidence [KIND]` | Picked pieces, exact spans and named fields. On a config with no selected kind it asks nothing and needs no key; on this kit's config it runs workflow selection only, so it needs the key and a grant to send model requests, and adds `selections` and `file_counts` | Does not judge rules |
| `sunstack lint --all --format json` | Findings, uncertain pieces, incomplete parts, exclusions, usage, and each selection candidate's outcome with per-file counts | Named pieces do not establish evidence recall |

| Status | Engine exit | Runner handling |
| --- | --- | --- |
| `clean` | 0 | Preserve |
| `nothing_selected` | 0 | Refuse full runs with exit 2; preserve a change-scoped empty run |
| `findings` | 1 | Preserve; warning-only findings can leave the run clean |
| `invalid` | 2 | Preserve refusal and diagnostics |
| `incomplete` | 3 | Preserve each incomplete reason, a selection candidate's included |
| `cancelled` | 4 | Preserve |
| `uncertain` | 5 | Preserve evidence, decision step and answers; selection alone can set it |

The runner prints status, rule outcome counts, selection counts per selected kind and usage; findings by severity with file and line; uncertain pieces with their step and answers; each uncertain or incomplete selection candidate with its file, line, heading and probability or reason, whose contents stay unjudged; each file whose candidates were all answered and none selected, as information; incomplete reasons and skipped rules. Empty `evidence_seen` does not imply an empty selection: mechanical work may send nothing to Jev.

## Proof and delivery boundaries

Runner tests keep the real CLI, config and evidence extraction in the path and script only the external HTTP judge. Separating fixtures check exact list-item spans, selected and rejected workflow candidates, the step context that follows selection, and the runner's selection reading, with the scripted judge's answers driving selection. Mechanical edges send no model request, though the run still needs a key (a synthetic one against the scripted judge). Judged rule tests belong in `tests/skills/evals`, use labelled excerpts from real skills and check decision outcomes and finding locations through the same CLI on Jev. Development and held-out sets stay distinct; misses remain reported. Label sources and provisional results are explicit.

A mechanical `error` finding is fixed before the calling skill step completes. A judged finding is a candidate to confirm at its anchor. An uncertain piece is decided by the calling agent against its standard and reported; refused, incomplete and empty full runs remain gaps. The runtime procedure is [running-rules.md](../../plugins/skill-authoring/skills/skill-rules/references/running-rules.md).

These checks establish text properties and decisions on named pieces. Agent behavior needs an eligible fresh agent, the loaded revision, an independently specified task and observed actions. Neither assembled rules nor a green wrapper test establishes that behavior. Release proof and cache refresh status belong in the [changelog](../changelog/README.md); the local engine build remains necessary until its matching CLI release is available.
