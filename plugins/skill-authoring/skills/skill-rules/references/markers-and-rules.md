# Markers and Rules

This reference owns steps 3 to 5: where each marker goes, the rules entry behind it, wiring the pair into the RuleSet that runs it, and repairing what `check_rules` refuses. Expected input: the deterministic and model-judged standards from step 2, each with its `path:line`. Return, per standard: its host and marker, its rules entry, and the RuleSet change; for each refusal, its cause and the fix.

Everything below matches the engine's CLI README and its native refusal causes. When the working repository's engine docs say something different, they win.

## Two ends of a rule

The marker binds the standard's wording where the skill states it. The entry's `target` selects the text that wording judges, which is usually another file, bound when the rule runs. In the engine's mechanical example, `mechanical-standards.md` holds the standards and `mechanical-skill.md` is the skill they check. Keep the two ends apart: choose the host for how the question reads, and the target for what it must judge.

## Choose the host

The question is the host's visible words, inline code included. Choose the narrowest host that carries the whole standard and nothing else:

- **list item:** a marker at the end of the item's first paragraph binds the whole item, nested items included;
- **paragraph:** a marker at the end of its last line binds the paragraph;
- **section:** a level 2 to 6 heading with the marker touching its text binds the section, which runs to the next heading of the same or higher level and includes code blocks and tables.

Mark a section only when the whole section is one standard and its visible words stay under `max_question_words` (400 unless the RuleSet sets another number). Count what the engine counts: headings, prose, list items, fenced code and table text.

Before marking, read the host as if it were the only text a judge will see. Good: it states one standard, with its subject. Bad: it starts mid-thought, leans on a lead-in outside the host, or carries several standards.

- `skill-creation`'s `### Call Grammar` is over the cap and holds three standards. Mark the paragraph at `SKILL.md:62` for call completeness; the dispatch paragraph (`:77`) and the citation paragraph (`:88`) are separate candidates.
- In `frontmatter-design.md`, the item "starts with `Use when` unless the platform requires another shape;" reads as a fragment, because its subject sits in the lead-in line "A good `description`:". For a mechanical rule the wording is only the explanation shown with a result, so a fragment that still names its property can stand. For a model-judged item it can't, because the judge never sees the subject. Return it to `skill-creation` to carry its subject, or mark the list's section if the whole list is one standard.
- A paragraph that carries five standards, like `skill-creation/SKILL.md:224`, is no narrow host for any of them. Split it in the teaching first.

The engine forbids some hosts outright: a level 1 heading, a block quote, a table, HTML, a link reference definition and frontmatter. A marker inside fenced or indented code or an inline code span isn't a marker at all; it's ignored, and its entry turns up orphaned.

## Write the marker

```text
The skill's `description` starts with `Use when`.<!-- K014 -->

- A paragraph with a `MUST load` instruction contains the word `return`.<!-- K015 -->

## Clear result<!-- K016 -->

The selected paragraph states a clear result.
```

The heading comes last on purpose: its section runs to the next heading of the same or higher level, so a section marked above the other two standards would swallow them into its question.

- The shape is exact: `<!-- `, one uppercase letter and three digits, then ` -->`, with nothing after it on the line except whitespace.
- The letter is the RuleSet's `marker_prefix`. A marker with another letter is invisible to that RuleSet.
- On a heading the marker touches the text: `## Clear result<!-- K016 -->`, never with a space before it.
- Each ID appears at most once per Markdown file, and one file carries as many distinct IDs as it has marked standards. The same ID in a different Markdown file is a different marker, because markers are qualified by their source, but entry names must stay unique across the whole RuleSet.
- Take the next unused number in that file, and never renumber a marker that exists: its ID is the key of its entry.
- A backslash before `<!--` escapes the comment, so it binds nothing.

## Write the entry

The rules file is one strict JSON object keyed by marker ID, paired with exactly one Markdown file. Each entry has a `name`, which becomes the rule ID (lowercase letters, digits, `.`, `_` and `-`), a `target` with an explicit `input` and a `select`, and exactly one verdict. These entries for the three markers above follow the engine's examples, with the load check's wording narrowed to what the check tests:

```json
{
  "K014": { "name": "skill.description", "target": { "input": "skill", "select": { "kind": "frontmatter_field", "field": "description" } }, "expect": { "starts_with": "Use when" }, "severity": "block" },
  "K015": { "name": "skill.load-return-word", "target": { "input": "skill", "select": { "kind": "markdown_units", "mode": "unit", "units": ["paragraph"], "starts_with": "MUST" } }, "ast_grep": { "kind": "paragraph", "regex": "\\bMUST\\s+load\\b", "not": { "regex": "\\breturn\\b" } } },
  "K016": { "name": "paragraph.clear-result", "target": { "input": "skill", "select": { "kind": "markdown_units", "mode": "unit", "units": ["paragraph"] } }, "threshold": 0.8 }
}
```

Choose the verdict from the standard's outcome:

- **Judgment `threshold`** for a model-judged standard. The marked wording becomes the question, and the threshold, above 0 and at most 1, is the confidence a yes needs. Take thresholds from the repository's existing rules, or the engine examples' 0.8, and say which. A judgment runs once per selected unit, so select only the units the standard is about.
- **`expect`** when one unit's visible text, or one field's decoded value, either has the property or doesn't: exactly one of `starts_with`, `matches`, `not_matches` or `present: true`. Text predicates read visible text with inline code removed, so a pattern looking for a path written in backticks finds nothing. An absent field fails every predicate, `null` counts as present, and a missing or malformed frontmatter block is unresolved.
- **`ast_grep`** when the property is structural, or needs the raw source (inline code included) or the unit's ancestors. The rule describes the *violation*: a match fully inside the target unit fails it, and no match passes. Write it the other way round and it fails good text and passes bad. It sees the whole original syntax tree, so ancestors outside the unit count and siblings outside it don't. The engine validates it as an ast-grep rule and refuses unknown keys, even nested ones such as a misspelt `stop_by`.

`severity` defaults to `nudge`; use `block` for a standard that must hold. `block_at_or_below` belongs only on a `block` judgment rule, below its threshold.

## Choose the target

- **`frontmatter_field`** with a literal top-level `field`. It is mechanical-only: it takes `expect`. A judgment threshold on it is refused, and `ast_grep` needs a Markdown unit target, which never selects the metadata block.
- **`markdown_units`.** `mode: unit` yields one occurrence per requested `section`, `paragraph` or `list_item`, optionally filtered by `starts_with` or `pattern`. `mode: call_site` needs exactly one nonempty filter and yields one occurrence per match, owned by the innermost requested unit; a list item owns its paragraphs. Filters read visible text with inline code removed, and a regex that can match empty text is refused.
- The engine selects other things too, such as whole documents, change sets and conversations; its schema owns them.

The selector decides what gets judged, and a wrong one fails silently. `K015`'s `starts_with: "MUST"` reaches only paragraphs that open with `MUST`, so a load instruction mid-paragraph, like `skill-creation/SKILL.md:180`, is never judged. When a standard applies to every occurrence of a form, select the form itself, with `call_site` on its pattern, rather than the paragraphs that happen to start with it. Step 6 proves the selector reaches the intended text.

## Context

`context` is optional: native evidence declarations the engine gathers beside the target. Calibration examples for a model-judged rule go here, never into the marked wording, because the marked words are the standard and anything added to them becomes part of the question. Each declaration has an `id` other than the reserved `target`, an `input` the RuleSet declares, and a `select`:

```json
"context": [{ "id": "calibration", "input": "calibration", "select": { "kind": "whole_document" } }]
```

Name the cost: an input used only for context, like `calibration` here, has to be declared in the RuleSet and bound by every invocation. Whether calibration context improves a hosted judge's verdicts stays unproven until a hosted run shows it.

## Wire the RuleSet

A correct Markdown and rules pair proves nothing until the RuleSet the repository's invocation runs includes it. Inspect, in order:

1. **The invocation.** Find the check request or runtime invocation the repository passes to `sunstack-rule`, in its scripts, CI or docs. Note `definition_root`, each `definitions.rule_sets[].path`, its `binding_groups`, and the `repositories` with their `input_paths`. Open the RuleSet it names, not a similarly named file.
2. **The pair.** Add `{"markdown": "<path>", "rules": "<path>"}` to `rule_sources`, both paths relative to the RuleSet file. A path relative to the repository root resolves to a different place.
3. **The prefix.** A RuleSet with sources needs `marker_prefix`, and it must be the letter your markers use.
4. **The inputs.** Each entry's `target.input` and every `context` input is a key in the RuleSet's `inputs`, with the kind its selector needs (`document` for Markdown units and frontmatter). The invocation binds every declared input exactly once with that kind, and each bound file matches an `exact` or `glob` entry in its repository's `input_paths`.
5. **The cap.** If the RuleSet sets `max_question_words`, your hosts were sized against that number, not the default.

If the repository runs no RuleSet for these standards yet, write one in the shape of the engine's `marked-standards.ruleset.json` (`schema_version`, `name`, `description`, `inputs`, `applicability`, `common_ruleset_instructions`, `marker_prefix`, `rule_sources`), with a check request that binds its inputs, and report both as new. Where it runs, in a script or CI, is the repository's decision.

Then MUST load `check-and-reports.md` and return the `check_rules` outcome with `output: assembled_rules`: its count and the printed rule IDs with their provenance, to judge against these signals.

- **Good signals:** `printed_rules` lists each intended rule ID with `source.kind: markdown`, and its `source.provenance.marker_id` and `source.provenance.markdown` point at your marker and file; `checked_rule_count` equals the count before your change plus the entries you added.
- **Bad signals:** a clean check whose count didn't move, which means the invocation runs a different RuleSet or your pair isn't in it; an input-binding refusal, such as an unbound, duplicate or mismatched binding; an entry whose `target.input` names an input the RuleSet doesn't declare.

Stop when the assembled output lists every intended rule ID and the count is right. A clean check that omits them is not wired.

## Repair a refusal

A refusal carries a `code`, a location (`file`, `line`, `column`, and a `field_path` that holds the marker ID) and guidance. Fix the cause the code names, in the host or the entry:

| code | cause | fix at the cause |
| --- | --- | --- |
| `forbidden_marker_host` | marker on a level 1 heading, or in a block quote, table, HTML, link reference definition or frontmatter | move it to the paragraph, list item or level 2 to 6 heading that states the standard; if the standard lives only in a table or quote, return it for `skill-creation` to restate in prose |
| `spaced_heading_marker` | whitespace between the heading text and the marker | remove the whitespace |
| `duplicate_marker` | one ID twice in one Markdown file | keep the ID on the host its entry was written for; give the other standard a new ID and entry, or remove the stray copy; leave every other distinct ID alone |
| `question_too_large` | the host's visible words exceed `max_question_words` | mark a narrower host, such as a subsection, paragraph or list item, that carries the one standard |
| `missing_rule_entry` | a marker with no entry | write the entry, or remove the marker if step 2 didn't mark that standard |
| `orphaned_rule_entry` | an entry whose marker didn't bind | find out why: the marker was deleted or misspelt (`K0014`), uses another prefix letter, has text after it on the line, sits inside code, is escaped, or lives in a different Markdown file from the one the pair names; restore it at the standard's host, or remove the entry if the standard is gone |
| `invalid_rule_source_key` | a key that isn't a marker ID with this prefix | rename the key to the marker's ID |
| entry-shape codes such as `unknown_field`, `invalid_threshold`, `invalid_band`, `invalid_mechanical_check`, `undeclared_input` | the entry's fields | fix the field at the reported `field_path` against the engine's rules-object schema |

Each of these repairs makes a refusal disappear by losing the standard; never use them:

- raising `max_question_words` so an oversized section binds: it merges several standards into one verdict and raises the cost of every question in the RuleSet;
- deleting the standard, or its entry, to clear the refusal;
- moving the marker onto a neighbouring paragraph that binds but doesn't state the standard;
- renumbering valid IDs while fixing a duplicate.

Complete when: every marked standard has a bound marker on its narrowest host and exactly one entry, the RuleSet's assembled output lists every intended rule ID with the right count, and each refusal was fixed at the cause its code names.
