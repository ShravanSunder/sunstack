# Requests and Reports

This reference owns what the engine does between a piece and a result, and what its output means: what the judge receives, how answers route, what a finding and a result row carry, the run statuses, what a saved report keeps, and how "unread" is derived. Expected input: the output in hand (a check's print, a run's short lines, a saved report, a `lint show` entry, a request's state) and the rule or filter it came from. Return: what each status and field means for that output, and what it can and can't show.

Anchors are in the `sunstack-tools` repository at tag `v0.8.3` unless marked 0.9.0, and its `crates/sunstack/README.md` is the engine's authoring guide; a fact marked with a version arrived in that release. Where the installed engine's README differs, it wins.

## The check's print

`sunstack lint --config <config> --check` reads the config, the rulebook, every rule and filter entry and the evidence project, and judges nothing.

- **Clean** (exit 0): every assembled rule with its rule ID, marker, source file and line, evidence kind, `mechanical` or `asking`, severity, and the standard's wording as the judge will see it, plus the selected and contained kinds.
- **Refused** (exit 2): one line per refusal, `file:line:column:`, the path inside an entry when the refusal is there, and the message; `rule-entries.md` has the repair for each.

Read the print twice: once for coverage (the expected count, each rule with its marker, line, kind and severity), once for wording (each printed standard, read with nothing around it, states one standard with its subject). The check shows that the definitions assemble, every route and in-between route is declared, every name a question reads exists, and each standard prints as itself. It reads no checked file, so it can't show that a rule picks or decides anything.

## Filters and rules are both trees (0.8.0)

- **A rule** judges one piece at a time and ends in `pass`, a finding, `uncertain` or `not_applicable`.
- **A filter** judges one folder at a time. It declares `per`, `reads: {file, kind, fields: [names]}`, its `labels`, `questions` and a `decision`, and may carry a `reference`. From 0.8.1 a declared field may be one text or a list of texts; a list keeps its shape in the request state, the input hash and the saved evidence. Its tree uses a rule's steps and ends in `{ "label": "<declared label>" }` or `"unsure"`; a question's own option names are never filter endings (`crates/sunstack-rules/src/filters/filter_plan.rs`).
- **A rule gates on a filter** with `only_when: { "<filter>": [labels] }`, naming exactly one filter. A folder is judged once per run, and every gated rule uses that result. A folder whose filter ended `unsure` or incomplete is skipped for those rules and listed with its route; a folder whose label isn't listed is excluded.

## What the judge receives

- **No model call until a question.** A piece whose walk reaches no question sends nothing.
- **One request per rule and piece, and per filter and folder.** Once the walk reaches its first ask or combine step, every question in the entry goes in one request, with one state (`crates/sunstack-rules/src/rulebook_planning/decision_walking.rs`, `piece_state`; `crates/sunstack-rules/src/filters/filter_run.rs`):
  - `standard`, the marked sentence, for a rule, whether or not a question names it;
  - the evidence fields the kind exposes, or for a filter the fields it declares in `reads`;
  - `reference`, the entry's reference, unchanged (0.8.0);
  - `where`, the piece's location, only when a question names it (0.8.0); a filter never sends its folder's location;
  - `cut-fields` and `unavailable-fields`, with why (0.8.0).
- **Questions name what they read** with `check`, `against` or `context`, such as `"context": ["body", "reference.examples"]`; a name the request won't have is refused at load. `standard`, `where`, `cut-fields`, `unavailable-fields` and `reference` are reserved names.
- **Reference counts toward the request's size.** A request that won't fit isn't cut and sent; it ends incomplete as too large.
- **Size is counted in bytes.** The body is compact JSON of the model, the state and the questions (`crates/sunstack-decisions/src/backend_transport/decision_backends.rs`, `encode_judgment_body`); its byte count stands in for input tokens, so `limits.max_input_tokens_per_request` caps bytes and `limits.request_max_chars` characters. Measure the encoded body over the largest pieces before choosing either; raising a cap fixes feasibility, not calibration.
- **A locator rides in the same request.** For each finding route with a `locate`, the request adds a Choice under the locator's name, one option per line of the route's `at` field inside the piece, labelled `L<line>` with that line's text. It's left out when the field has no such line, more than `limits.max_locate_lines` (80 by default), or would push the request past its limits; the rule's own questions are never dropped for it (`crates/sunstack-rules/src/rulebook_planning/locator_questions.rs`). From 0.8.2 an identical locator on several routes is offered once. A reply that omits a sent locator or picks a label it wasn't offered is invalid, and the piece is incomplete.
- **Code walks only the routes the answers lead to,** so a question gate saves no request; what it buys is that a piece the gate rejects never reaches the verdict.
- **Choice order on the wire.** A Choice's criteria are a `BTreeMap` keyed by label (`crates/sunstack-decisions/src/decision_protocol/decision_contracts.rs`), so options reach the model in label-sorted order whatever order the rules file uses. Renaming a label to move it in the sort changes what the model sees; reordering keys doesn't. A locator's labels sort the same way, so `L100` comes before `L17`.
- **Primitives.** The engine sends Noul, Choice and Score text questions over one state. It has no image or asset request, whatever a provider documents.

## Routing

- **A Noul or a Score** routes on its normalized answer against `yes_at_or_above` and `no_at_or_below`; an answer between them is in between.
- **A Choice** routes on its top label's probability against `min_probability`, one route per label; it gates on that probability, not on a provider's returned confidence, and no native step can branch on confidence.
- **A Combine** takes weighted Noul probabilities and normalized Score positions (positive weights summing to one) against the same two bars.
- **Every in-between answer has a declared route** (0.8.0): `"uncertain"` in a rule, `"unsure"` in a filter, or another step that reads an answer already in the request. An answer that couldn't be parsed is incomplete.
- **A locator never routes;** its answer only places the finding's line.
- **The graph is acyclic and static:** no sort, top-K or numeric maximum, and no new request built from an answer.

## A run's output

A run prints short numbered lines, one per warning, unsure result or gap, each with its file and line, the rule and a one-sentence reason; then the filter summary (how many folders got each label, how many were unsure or incomplete) and one line per unsure or incomplete folder. It doesn't print the judged text. Save the full report with `--report run.json`, and read one numbered result with `sunstack lint show run.json <id>`: its route, answers, bars, requests and pointers, from the file alone. `--format json` prints the whole report; `github` and `sarif` also exist.

| status | exit | what it means |
| --- | --- | --- |
| `invalid` | 2 | refused before reading, such as a config refusal or no key for a run with asking rules |
| `cancelled` | 4 | the run was stopped |
| `incomplete` | 3 | some work didn't finish: a request limit, a provider failure (with its class and HTTP status when one arrived), a request too large, evidence unavailable, or a selection candidate that couldn't be answered (`selection_incomplete`) |
| `findings` | 1 | an `error` finding, or more warnings than `--max-warnings` allows; with no limit set, `warn` alone never reaches this row |
| `uncertain` | 5 | nothing above, and at least one piece, folder or selection candidate ended between its bars |
| `nothing_selected` | 0 | no piece was selected: clean for a changed-evidence run with nothing changed, a gap for a full run (usually a wrong path) |
| `clean` | 0 | nothing above happened |

The status is the first row, top to bottom, that holds. Warnings don't move it: a `clean` or `uncertain` run can carry many. A prepare-only run has its own exits, 6 when clean: `prepared-requests.md` has them.

### A finding, a result row and a filter answer

Each finding carries its rule, marker, file, field, severity and message, and:

- **`line` and `anchor`.** `resolved`: the route's locator chose the line, inside the judged field and the piece. `default`: the first line of the route's `at` field, or else the piece's first line, because the locator wasn't sent or fell below its bar. On a section-sized piece, a default anchor means "somewhere in this piece".
- **`basis`.** `judged` exactly when some step on the walked path read a model's answer, a gate included; otherwise `mechanical`.
- **`related`,** the places to read next, each `{label, file, first_line, last_line}`: the rule's standard first, then one place per span of each field the entry's `related` names, and one per loaded file whose non-empty opening the run read, from line 1 to the opening's last line. Only places the run read appear.

Each result row, one per rule and piece, carries the rule's name and marker, file, line range, outcome (`pass`, `finding`, `not_applicable`, `uncertain` or `incomplete`), last step, `path` (the steps walked), the `answers` its walk read, its `basis`, and `cut` when the cap cut a field. A saved report adds each result's request ids; each request keeps its exact state, the questions in the order sent, every answer returned, and the model asked for and the one that answered.

Each filter answer names its folder and how its tree ended: a label with its path and answers, `unsure` with the step it stopped at, or incomplete with its reason.

### Unread

A rule's denominator is the checked files and pieces its design scans, inside the folders its filter admits. Join it with the report's `file_counts`, `results` and filter answers: a file inside the denominator where the rule has no result is unread. A folder the filter skipped as unsure is a listed gap; one it excluded by label is a decision, not a gap. A file outside the denominator is out of scope.

## What each layer keeps

| layer | keeps | doesn't keep |
| --- | --- | --- |
| a saved report, `--report run.json` (0.8.0) | every request with its id, rule or filter, piece or folder, exact state, questions in the order sent, every answer, and the requested and resolved model, or why it wasn't sent; the content and hash of every config and rule file used; on each result its route and request ids; raw piece evidence for mechanical steps; from 0.9.0, each selection request with its answer, requested and resolved models, input hash and raw selection evidence | a rule the filter excluded, which was never asked: it's marked, and can't be re-walked |
| `lint show run.json <id>` (0.8.0) | one entry from a saved report: route, answers, bars, requests and pointers, from the file alone; from 0.9.0 also a prepared request, a saved selection, or a prepared case by its 1-based position | anything the report doesn't hold; an unknown id is an error naming the valid range |
| the JSON report's `results` | each rule and piece's outcome, last step, `path`, the answers its walk read, `basis` and `cut` | answers the walk didn't read, unless the report was saved |
| a prepared report, `--prepare` (0.9.0) | every request a run would send, with its exact state and questions, plus `needs_answer` and gate conditions; a continued report (`--selections-from`) also keeps each selection answer it applied, marked `from_report` with its source; `prepared-requests.md` owns it | any fresh answer: nothing was sent |
| the native `run_judgments` operation | answers and a receipt with the resolved model, returned to its caller | anything the caller doesn't store; calling it again resamples |

Because every question about a piece goes in one request, a saved report can re-walk a result under a changed bar without asking again, as long as the questions and the evidence are unchanged. Changed wording or a changed evidence cut needs a fresh run.

Complete when: each status, field and record in the output in hand is read with its meaning here, and anything the output can't show (how the rule decides elsewhere, what an agent does with it, a result never asked) is named as not shown.
