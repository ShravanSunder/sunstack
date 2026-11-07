# The Sunstack driver

This reference owns the facts that hold only on Sunstack's typed engine path: the rules engine (`sunstack lint`) and the native `run_judgments` operation. They are driver facts, not standards for decision models in general. Anchors are in the `sunstack-tools` repository at tag `v0.8.3`, whose `crates/sunstack/README.md` is the authoring guide; a fact marked 0.8.0, 0.8.1, 0.8.2 or 0.8.3 arrived in that release.

**Expected input:** the decision model and which path it runs on: a rule, a filter, or a `run_judgments` caller.

**Return:** each driver fact this model depends on, with its anchor.

**Complete when:** the design and the proof plan account for every fact the model depends on, or name it as a gap.

## Filters and rules are both trees (0.8.0)

- **A rule** judges one piece at a time and ends in `pass`, a finding, `uncertain` or `not_applicable`.
- **A filter** judges one folder at a time and decides a label, such as the kind of skill the folder holds. It declares `per`, `reads: {file, kind, fields: [names]}`, its `labels`, `questions` and a `decision`, and may carry a `reference`. From 0.8.1 a declared field may be one text or a list of texts, such as the matches a `same_file` source collects; a list keeps its shape in the request state, the input hash and the saved evidence. Its tree uses the same steps as a rule's and ends in `{ "label": "<declared label>" }` or `"unsure"`. A question's own option names are never filter endings. The old one-question shape (`question`, `reads.field`, a filter-level `min_probability`) is refused when the rulebook loads (`crates/sunstack-rules/src/filters/filter_plan.rs`).
- **A rule gates on a filter** with `only_when: { "<filter>": [labels] }`, naming exactly one filter. A folder is judged once per run, and every gated rule uses that one result. A folder whose filter ended `unsure` or incomplete is skipped for those rules and listed with its route; a folder whose label isn't listed is excluded.

## What the judge receives

- **No model call until a question.** A piece whose walk reaches no question sends nothing to the model.
- **One request per rule and piece, and per filter and folder.** Once the walk reaches its first ask or combine step, every question in the entry goes in one request. The request carries one state (`crates/sunstack-rules/src/rulebook_planning/decision_walking.rs`, `piece_state`; `crates/sunstack-rules/src/filters/filter_run.rs`):
  - `standard`, the marked sentence, for a rule;
  - the evidence fields its kind exposes, or for a filter the fields it declares in `reads`;
  - `reference`, the entry's reference material, unchanged (0.8.0);
  - `where`, the piece's location, only when one of the rule's questions names it (0.8.0). A filter never sends its folder's location;
  - `cut-fields`, the fields the cap shortened, and `unavailable-fields`, the fields that couldn't be collected, with why (0.8.0).
- **Questions name what they read** (0.8.0). Each question names the fields or reference paths it reads with `check`, `against` or `context`, such as `"context": ["body", "reference.examples"]`. A name the request won't have is refused at load. `standard`, `where`, `cut-fields`, `unavailable-fields` and `reference` are reserved, so an evidence field or reference entry with one of those names is refused.
- **Reference counts toward the request size.** A request that won't fit isn't cut and sent: it ends incomplete as too large.
- **A request's size is counted in bytes.** The body is compact JSON of the model, the state and the questions (`crates/sunstack-decisions/src/backend_transport/decision_backends.rs`, `encode_judgment_body`), and its byte count stands in for input tokens (`account_request`), so `limits.max_input_tokens_per_request` caps the body's bytes and `limits.request_max_chars` its characters. Measure the encoded body over the largest pieces before choosing either; raising a cap fixes feasibility, not calibration.
- **Cuts are named.** When the cap cut a field, `cut-fields` names it. A loaded file whose opening was shortened carries `opening_cut: true` (`crates/sunstack-evidence/src/evidence_piece_building/target_loading.rs`). From 0.8.0 a load that names a skill also resolves to its opening, as a path load does.
- **A locator rides in the same request.** For each finding route that has a `locate`, the request adds an ordinary Choice under the locator's name: one option per line of the route's `at` field inside the piece, labelled `L<line>`, with that line's text. It's left out when the field has no such line, more than `limits.max_locate_lines` (80 by default), or would take the request past its limits; the rule's own questions are never dropped for it (`crates/sunstack-rules/src/rulebook_planning/locator_questions.rs`). A reply that omits a sent locator or picks a label it wasn't offered is an invalid response, and the piece is incomplete. From 0.8.2 several finding routes can share one locator: an identical definition (the same name, field, task and `min_probability`) is offered once in the request, and a different definition under the same name is refused at load.
- **Code walks only the routes the answers lead to.** A question gate therefore saves no request. What it buys is the outcome: a piece the gate rejects never reaches the verdict, whatever the verdict's answer says.
- **A field that couldn't be collected** ends the piece incomplete, naming it: a mechanical step that reads it, or a question that requires it, stops there before any model call.
- **The `complete` check** (0.8.0): `mechanical_check: {tool: "complete", field: "<field>"}` is yes only when the field wasn't cut, isn't unavailable, and every file or skill it loads resolved with an opening that wasn't cut. It sends nothing to the model. Put it before any pass that rests on a "no" about that text.
- **Lint reads JSON checked files** through JSON evidence rules, as it reads Markdown, with every field source but `yaml` (`crates/sunstack-evidence/src/evidence_planning/evidence_project_loading.rs`).
- **The match limit is shared.** `limits.max_matches` (10,000 by default) counts the evidence project's matches across the run; a file past it gives no pieces and is reported incomplete, with `limited: true` in its file counts, never as a quiet zero.

## Routing

- **A Noul or a Score** routes on its normalized answer against `yes_at_or_above` and `no_at_or_below`; an answer between them is in between.
- **A Choice** routes on its top label's probability against `min_probability`, one route per label. It gates on p_max, not on the confidence the provider returns, and no native step can branch on a returned confidence field. A policy on confidence is caller code.
- **A Combine** takes weighted Noul probabilities and normalized Score positions (positive weights summing to one) against the same two bars.
- **Every in-between answer has a declared route** (0.8.0). Each ask or combine step names its `uncertain` route: the ending `"uncertain"` in a rule or `"unsure"` in a filter, or another step that reads an answer already in the request. A step without one is refused when the rulebook loads. An answer that couldn't be parsed is incomplete.
- **A locator never routes.** Its answer only places the finding's line; no step can ask it.
- **The graph is acyclic and static.** It has no sort, top-K or numeric-max step, and can't build a new request from an answer.

## What a result carries to the agent

- **The default output** (0.8.0) prints short numbered lines, one per warning, unsure result or gap, with file and line, the rule and a one-sentence reason, then a filter summary and one line per unsure or incomplete folder. It doesn't print the judged text.
- **Severity** is the finding route's authored `severity` when it has one, else the rule's, `warn` by default. Exits: 0 for clean or nothing selected, 1 for an `error` finding or warnings over `--max-warnings`, 2 for invalid input, 3 for incomplete work, 4 for cancellation, 5 for uncertain. Warnings alone never fail a run unless the caller sets `--max-warnings`.
- **Basis:** `judged` exactly when some step on the walked path read a model's answer, a gate included; otherwise `mechanical`.
- **Anchor:** a finding's `line` is the locator's selected line when its probability reaches `min_probability`, with `anchor: "resolved"`; otherwise the first line of the route's `at` field or the piece's first line, with `anchor: "default"`.
- **Related places:** the rule's standard first, then each span of each field the entry's `related` list names, and each loaded file whose non-empty opening the run read, from line 1 to that opening's last line.
- **Answers and path on every row:** each result row carries `path`, the steps it walked, and `answers`, exactly the answers its walk read.
- **Cut,** on a row whose piece the cap cut: `cut`, the fields cut.

## Choice order on the wire

A Choice's criteria are a `BTreeMap` keyed by label (`crates/sunstack-decisions/src/decision_protocol/decision_contracts.rs`), so options reach the model in label-sorted order, whatever order the rules file uses. Reordering a rules file's keys changes nothing the model sees, and renaming a label to move it in the sort changes what the model sees. Whether option order affects this model version is a hypothesis for a direct transport probe, not a known fact. A locator's labels sort the same way, so `L100` reaches the model before `L17`.

## Primitives

The driver sends Noul, Choice and Score text questions over one state. It has no Box, image or asset request contract, whatever the provider documents.

## What each layer records

| layer | keeps | doesn't keep |
| --- | --- | --- |
| a saved report, `sunstack lint --report run.json` (0.8.0) | every request with its id, rule or filter, piece or folder, exact state, questions in the order sent, every answer returned, and the requested and resolved model, or why it wasn't sent; the content and hash of every config and rule file used; on each result its route and the ids of its requests | a rule the filter excluded, which was never asked: it's marked, and can't be re-walked |
| `sunstack lint show run.json <id>` (0.8.0) | one entry from a saved report: its route, answers, bars, requests and pointers, read from the file alone | anything the report doesn't hold; an unknown id is an error naming the valid range |
| the JSON report's `results` | each rule and piece's outcome, last step, `path`, the answers its walk read, `basis` and `cut` | answers the walk didn't read, unless the report was saved |
| `run_judgments` | returns answers and a receipt with the resolved model to its caller | anything the caller doesn't store; calling it again resamples |

Because every question about a piece goes in one request, a saved report can re-walk a result under a changed bar without asking the model again, as long as the questions and the evidence are unchanged. Changed wording or a changed evidence cut needs a fresh run.

## Case runs (0.8.0)

`sunstack lint cases <file> --set development` (or `--set held_out`) runs labelled cases through lint's own path. It's a tool for the author before a rule is switched on, never a gate inside lint, and writes nothing lint reads.

- **A case file** holds `cases` and `bars`, plus an optional local `repository` path. Each case has a unique `id`, a `revision`, a `set` (`development` or `held_out`) and `label_from`: `owner-fix` for a real text fix, `owner-ruling` (0.8.2) for an explicit owner label decision whose ruling is kept beside the cases, or `blind-agents`. A rule case adds `kind: "rule"`, `rule`, `file`, `lines: [first, last]`, `text_sha256` and `expected: "warn" | "pass"`. A filter case adds `kind: "filter"`, `filter`, `folder`, `reads_sha256` and `expected_label`.
- **Each recorded bar** names `{for, step, bound, value, set_from: [case ids]}`, where `bound` is `yes_at_or_above`, `no_at_or_below` or `min_probability`. A bar that differs from the rule's current tree, or has no development cases behind it, is reported unassessed (`crates/sunstack-lint/src/case_runs/bars.rs`).
- **The surrounding text is real.** For each revision the run archives the whole repository, puts today's config and rule files on top, and runs ordinary lint on the case paths, so a case sees its own folder and every file it loads as they were (`crates/sunstack-lint/src/case_runs/mod.rs`). From 0.8.3 the evidence-rule directories today's ast-grep project declares are replaced whole with today's contents, so an obsolete historical rule is never loaded; every other rulebook input keeps its own file overlay, and historical text outside those directories stays as it was. A rule directory that covers the repository root or the checked text refuses the case with a revision error, rather than deleting that history or using a partial directory.
- **A rule case matches exactly** (0.8.2): the piece whose first and last lines are the case's own, after the case's line hash is checked at its revision. A partial or spanning range matches nothing, so nested sections stay distinct; a filter skip matches the same way.
- **Every case gets one outcome:** `right`, `false_warning`, `missed`, `wrong_label`, `unsure` or `incomplete` when scored; otherwise it's listed with why: `stale` (its text changed since its revision), `no_matching_piece`, `more_than_one_matching_piece`, `filter_excluded` or `not_judged`. Counts are kept per rule and per filter, apart (`crates/sunstack-lint/src/case_runs/contracts.rs`).

## Credentials

A run that asks a question sends model requests and needs the key, and so does an evidence print over a kind with a model `select`, or a kind that lies `within` one. A case run asks, so it needs the key too. `--check`, `lint show` and a print with no selected kind send nothing and need no key (`crates/sunstack/README.md`). Whoever lacks the grant to send model requests prepares the exact command and hands it to whoever holds it.
