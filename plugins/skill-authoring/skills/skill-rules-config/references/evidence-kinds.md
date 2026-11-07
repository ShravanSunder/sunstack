# Evidence Kinds

This reference owns the evidence side of a rulebook: how a kind picks pieces from the checked files, how each field is collected, the size caps and what a cut leaves, `select` and `within`, and how to read an evidence print. Expected input: the chunk a rule or filter must judge (its subject, which files and pieces it scans, the context and edges around the subject, the fields its nodes read) and the config with its evidence project. Return: the kind as written, and the print's reading: the intended pieces with their fields, every cut, and the file counts.

Everything here is the engine's contract at 0.8.3 (`crates/sunstack/README.md` and `crates/sunstack-evidence` at tag `v0.8.3`). Where the installed engine's README differs, it wins.

## A kind

A kind sits under the config's `evidence.kinds`, keyed by its name:

```json
"section": {
  "rule": "skill-section",
  "max_chars": 50000,
  "fields": {
    "heading":  { "from": "first_line" },
    "headings": { "from": "enclosing", "rule": "section-heading" },
    "body":     { "from": "remainder", "exclude": { "rule": "section-heading" } },
    "targets":  { "from": "target", "regex": "(?:load|dispatch)\\s+`([^`]+)`", "resolve": "path_or_skill",
                  "opening_chars": 3000, "exclude": { "rule": "section-heading" } }
  }
}
```

- `rule` names an ast-grep rule in the evidence project (`evidence.ast_grep`, a path relative to the config). Each match is a candidate; without `select` or `within`, every candidate is a piece.
- `fields` names what each piece carries. A rule's questions, checks, `at` routes and `related` list may name only these fields.
- `max_chars` caps the piece's model view; `limits.evidence_max_chars` is the config-wide default.

## Field sources

| `from` | collects | options |
| --- | --- | --- |
| `first_line` | the piece's first line | none |
| `capture` | a regex capture from the piece's text | `regex` |
| `remainder` | the piece's text after its first line | `exclude: {rule}` or `{kind}` removes strictly contained ranges, such as child sections; an equal range never erases the piece |
| `enclosing` | the matches of a rule, or pieces of a kind, that contain the piece | exactly one of `rule` or `kind`; `text`: `first_line` (default) or `full` |
| `inside` | the full text of each match of a rule, or piece of a kind, inside the piece | exactly one of `rule` or `kind` |
| `same_file` | every match of a rule, or piece of a kind, in the same file | exactly one of `rule` or `kind`; `text`: `first_line` or `full`; a list keeps its shape in the request |
| `next`, `previous` | up to `count` (1 to 5, default 1) matching siblings, within the match's direct parent, stopping at the first that doesn't match | `rule` only; values stay in source order |
| `yaml` | one frontmatter key's decoded value | `key`; Markdown only |
| `target` | each file or skill the piece's own text names through the regex, resolved, with its opening | `regex`, `resolve` (`path`, `skill` or `path_or_skill`), `opening_chars` (default 3000), `as_kind` (read the target as a kind, which must be target-free and unselected), `exclude: {rule}` |

A rule source reads raw matches; a kind source reads final pieces, after selection and containment. Lint reads JSON checked files through JSON evidence rules with every source but `yaml`; a JSON kind's field may name only JSON rules and kinds, except a target's `as_kind`.

## Caps and cuts

- A field the cap shortened for the model is listed under the request state's `cut-fields`. A loaded file whose opening was shortened carries `opening_cut: true`.
- A field that couldn't be collected is listed under `unavailable-fields`, with why; a step or question that needs it ends the piece incomplete before any model call.
- `mechanical_check: {tool: "complete", field: "<field>"}` is yes only when the field wasn't cut, isn't unavailable, and every file or skill it loads resolved with an opening that wasn't cut.
- `limits.max_matches` (10,000 by default) counts the evidence project's matches across the whole run; a file past it gives no pieces and is reported incomplete, with `limited: true` in its file counts, never as a quiet zero.

A cap keeps a request bounded. It never shows that a field holds everything the judgment needs.

## `select`: one Noul per candidate

```json
"workflow_section": {
  "rule": "workflow-candidate",
  "fields": { "heading": {"from": "first_line"}, "body": {"from": "remainder"}, "outline": {"from": "same_file", "rule": "section"} },
  "select": {
    "question": { "type": "noul", "instructions": { "check": "body", "against": "heading", "context": ["outline"], "task": "Is this section an ordered workflow?" } },
    "yes_at_or_above": 0.7, "no_at_or_below": 0.3, "shared": ["outline"]
  }
}
```

- The question is one Noul. A yes at or above the upper bar selects the candidate; at or below the lower bar rejects it; between is uncertain. A failed selection stays incomplete and never falls back to selecting.
- `select` has no `reference`, and its question may not read a target field. Fields in `shared` come from `same_file`; they are bounded and sent once per request, and each candidate gets its own bounded view.
- The model receives consecutive candidates of one file and kind, one question each; requests split to fit the size, question-count and token limits, and share the run's request count and concurrency with rule requests.
- Under a change scope, selection considers every candidate in a file with a changed hunk or a changed load target.
- A config with any `select` sends model requests even for `--evidence` of another kind, so it needs the key.

Tree-shaped selection, a selection decided by several questions with a reference, isn't shipped in 0.8.3.

## `within`: containment

`"within": ["workflow_section"]` keeps a kind's matches only inside, or equal to, a final piece of a listed kind in the same file. It is a nonempty list without repeats; a match inside several listed kinds is one piece. A piece of a kind `within` a selected kind exists only when its container was selected. Kinds build in dependency order before any rule runs; cycles and undefined kinds are refused by `--check`.

## The evidence print

`sunstack lint --config <config> --all --evidence [KIND]` lists the pieces each kind picks, with every field, plus `selections` (each asked candidate with its outcome and yes probability) and `file_counts` (matches, pieces, picked and scan-limited per file and kind, and candidate, asked and outcome counts for selected kinds). It sends no rule question. A `select` anywhere in the config makes it run every selection the run needs, which sends requests, whatever kind you print: before a selection's desk check and review, read its candidates through `prepared-requests.md`, never by printing.

Print the kind a rule judges over the rule's whole denominator, and read four things:

- **the intended pieces:** each good, bad and near-miss piece the rule was designed for is there as one piece, with the span you expect: a whole list item, not a fragment; a section's own text without its children's;
- **the fields:** every field the rule reads is filled on those pieces, and an empty one is empty for a reason (a load outside any numbered step has no step heading); a target field holds only the loads in the piece's own text, each with its opening;
- **the cuts:** every cut field and cut opening, by name;
- **the counts:** every file in the denominator gives the kind its pieces. A kind with no pieces in files that plainly hold them is a gap in the evidence project, unless those pieces wait on a container that wasn't selected.

The print shows what a rule will read. It shows nothing about how the rule decides.

Complete when: the kind is written with only the fields its rules read, `--check` accepts it, and its print over the denominator shows every intended piece with its fields, every cut named and every file counted.
