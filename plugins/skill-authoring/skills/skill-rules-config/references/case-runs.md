# Case Runs

This reference owns the case file's shape and what `sunstack lint cases` does with it. Expected input: the cases to write (each real piece or folder at a fixed revision with its expected answer, its set and its label's origin) or a case file to run. Return: the cases as written, or the run's outcome for every case with the counts per rule and per filter.

Everything here is the engine's contract at 0.8.0 to 0.9.0 (`crates/sunstack/README.md`; `crates/sunstack-lint/src/case_runs/`). Which cases to choose, how they're labelled, and what a result proves are design questions this manual doesn't answer.

## The file

A case file holds `cases` and `bars`, and optionally a local `repository` path, relative to the case file.

Every case has a unique `id`, a `revision`, a `set` (`development` or `held_out`) and `label_from`:
- `owner-fix`: a real text fix shows the answer, so the text before the fix must warn and after it must pass;
- `owner-ruling` (0.8.2): an explicit owner decision on the label, kept beside the cases;
- `blind-agents`: agents labelling without the rule's answers.

| case kind | adds |
| --- | --- |
| `kind: "rule"` | `rule`, `file`, `lines: [first, last]`, `text_sha256` of those lines at that revision (line endings kept), `expected: "warn"` or `"pass"` |
| `kind: "filter"` | `filter`, `folder`, `reads_sha256` (compact JSON of the declared, unprojected field values in lexical key order, without reference, cut metadata or location; a normal filter result exposes it), `expected_label` |

Each bar is `{for, step, bound, value, set_from: [case ids]}`, where `bound` is `yes_at_or_above`, `no_at_or_below` or `min_probability`. A bar that differs from the rule's current tree, or has no development case in `set_from`, is reported unassessed (`crates/sunstack-lint/src/case_runs/bars.rs`).

A rule case's `lines` are the judged piece's exact first and last lines, confirmed on an evidence print: a range that covers part of a piece, or spans several, matches nothing, so a nested section is its own case (0.8.2).

## The run

```sh
sunstack lint cases <file> --set development
sunstack lint cases <file> --set held_out
```

- For each revision, the run archives the whole repository, initializes Git inside the copy, puts today's config and rule files on top, and runs ordinary lint on the case paths, so a case sees its own folder and every file it loads as they were, judged by today's rules (`crates/sunstack-lint/src/case_runs/mod.rs`).
- From 0.8.3 the evidence-rule directories today's ast-grep project declares are replaced whole with today's contents, so an obsolete historical rule never loads. A rule directory that covers the repository root or checked text refuses the case with a revision error, rather than deleting history or using a partial directory.
- A selected path that is, or passes through, a historical symlink is listed `not_judged` and never followed.
- It asks questions, so it needs the model key. With `--prepare <path>` (0.9.0) it builds every case's requests and sends none; `prepared-requests.md` owns that mode, its exit codes and how its cases are read.
- It writes nothing ordinary lint reads, and changes no lint input: it is a tool for the rule's author, never a gate on a lint run.

## Outcomes

Every case gets one outcome, counted per rule and per filter, apart (`crates/sunstack-lint/src/case_runs/contracts.rs`):

- **scored:** `right`, `false_warning`, `missed`, `unsure` or `incomplete` for a rule case; `right`, `wrong_label`, `unsure` or `incomplete` for a filter case;
- **listed with why, not scored:** `stale` (its text changed since its revision: the hash didn't match), `no_matching_piece`, `more_than_one_matching_piece`, `filter_excluded`, `not_judged`.

The output links each case to its result and lists the bars it crossed.

Complete when: every case in the file has every field its kind requires and its lines confirmed on a print, or the run's output has been read for every selected case, scored or listed with its reason, with the bars marked assessed or unassessed.
