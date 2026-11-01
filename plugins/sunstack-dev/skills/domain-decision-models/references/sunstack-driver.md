# The Sunstack driver

This reference owns the facts that hold only on Sunstack's typed engine path: the rules engine (`sunstack lint`) and the native `run_judgments` operation. They are driver facts, not standards for decision models in general. Anchors are in the `sunstack-tools` repository at tag `v0.6.0`; the facts marked 0.6.0 arrived in that release.

**Expected input:** the decision model and which path it runs on: a rule, or a `run_judgments` caller.

**Return:** each driver fact this model depends on, with its anchor.

**Complete when:** the design and the proof plan account for every fact the model depends on, or name it as a gap.

## What the judge receives

- **No model call until a question.** A piece whose walk reaches no question sends nothing to the model.
- **One request per rule and piece.** Once the walk reaches its first ask or combine step, every question in the rule's entry goes to the model in one request. The request carries one state: the standard's wording, the piece's location (`where`), and the fields its evidence kind exposes to the model, with the longest text cut first when it's over the evidence limit (`crates/sunstack-rules/src/rulebook_planning/decision_walking.rs`, `piece_state`).
- **A request's size is counted in bytes.** The body is compact JSON of the model, the state and the questions (`crates/sunstack-decisions/src/backend_transport/decision_backends.rs`, `encode_judgment_body`), and its byte count stands in for input tokens (`account_request`), so `limits.max_input_tokens_per_request` caps the body's bytes and `limits.request_max_chars` its characters. Measure the encoded body over the largest pieces before choosing either; raising a cap fixes feasibility, not calibration.
- **0.6.0: cuts are named in the state.** When the cap cut any field, the state carries the engine key `"cut-fields"` with the fields cut (`decision_walking.rs`); its hyphen keeps it apart from every authored field name, so an authored field named `cut` keeps its own value. A loaded file whose opening was shortened to its `opening_chars` carries `opening_cut: true` (`crates/sunstack-evidence/src/evidence_piece_building/target_loading.rs`).
- **0.6.0: a locator rides in the same request.** For each finding route of the rule that has a `locate`, the request adds an ordinary Choice under the locator's name: one option per line of the route's `at` field that lies inside the piece, labelled `L<line>`, with that line's text. It's left out when the field has no such line, more than `limits.max_locate_lines` (80 by default, `crates/sunstack-lint/src/configuration_loading/limit_settings.rs`), or would take the request past its question or size limits; the rule's own questions are never dropped for it (`crates/sunstack-rules/src/rulebook_planning/locator_questions.rs`). A reply that omits a sent locator or picks a label it wasn't offered is an invalid response, and the piece is incomplete.
- **Code walks only the routes the answers lead to.** A question gate therefore saves no request. What it buys is the outcome: a piece the gate rejects never reaches the verdict, whatever the verdict's answer says.
- **A field a mechanical step reads that is unavailable makes the piece incomplete,** never uncertain.
- **0.6.0: lint reads JSON checked files** through JSON evidence rules, as it reads Markdown, with every field source but `yaml`; a field that names a rule or kind of the other language is refused, except a target's `as_kind` (`crates/sunstack-evidence/src/evidence_planning/evidence_project_loading.rs`, `EvidenceLanguage`).
- **The match limit is shared.** `limits.max_matches` (10,000 by default) counts the evidence project's matches across the run; a file past it gives no pieces and is reported incomplete, with a `max_matches` diagnostic and `limited: true` in its file counts, never as a quiet zero.

## Routing

- **A Noul or a Score** routes on its normalized answer against `yes_at_or_above` and `no_at_or_below`; an answer between them is in between.
- **A Choice** routes on its top label's probability against `min_probability`, one route per label. It gates on p_max, not on the confidence the provider returns, and no native step can branch on a returned confidence field. A policy on confidence is caller code.
- **A Combine** takes weighted Noul probabilities and normalized Score positions (positive weights summing to one) against the same two bars.
- **An in-between answer ends `uncertain` by default.** From engine 0.5, an ask or combine step can add an `"uncertain"` route to a named step instead (`crates/sunstack/README.md`). An answer that couldn't be parsed is incomplete.
- **A locator never routes.** Its answer only places the finding's line; no step can ask it, because its name differs from every question's.
- **The graph is acyclic and static.** It has no sort, top-K or numeric-max step, and can't build a new request from an answer.

## What a result carries to the agent (0.6.0)

These are the fields a lint rule's nudge rests on.

- **Severity** is the finding route's authored `severity` when it has one, else the rule's, `warn` by default (`decision_walking.rs`). The engine never changes it by basis. Exits are as before: `warn` findings alone exit 0 unless the caller sets `--max-warnings`; `uncertain` keeps exit 5.
- **Basis,** on every result but `incomplete`: `judged` exactly when some step on the walked path read a model's answer, a gate included; otherwise `mechanical` (`decision_walking.rs`, `RulebookResult::basis`). A finding whose anchor resolved is always `judged`: a locator is sent only with a request the walk needed, so an all-mechanical path to a located route keeps the default line.
- **Anchor:** a finding's `line` is the locator's selected line when its probability reaches `min_probability`, with `anchor: "resolved"`; otherwise today's line, the first line of the route's `at` field or else the piece's first line, with `anchor: "default"` (`decision_walking.rs`, `Anchor`). A resolved line always lies in both the field and the piece. The finding's `span` stays the span of the route's field.
- **Related places,** on every finding: the rule's standard first (its rulebook file and the line its marker's host starts on), then, for each field the entry's `related` list names, one place per span of that field, and one per loaded file whose non-empty opening the run read, from line 1 to that opening's last line. Nothing the run didn't read, or read without a line range, appears; a file the piece loads twice is listed twice. SARIF carries them as `relatedLocations` (`crates/sunstack-lint/src/lint_reporting/outcome.rs`, `related_places`; `report_contracts.rs`, `RelatedPlace`).
- **Answers and path on every row:** each result row carries `path`, the steps it walked (`[]` when no walk ran; an incomplete row keeps what it walked before it stopped), and `answers`, exactly the answers its walk read, passes and `not_applicable` included. Answers the request returned but the walk never read aren't shown. A reached locator's answer appears under its name.
- **Cut,** on a row whose piece the cap cut: `cut`, the fields cut.

## Choice order on the wire

A Choice's criteria are a `BTreeMap` keyed by label (`crates/sunstack-decisions/src/decision_protocol/decision_contracts.rs`), so options reach the model in label-sorted order, whatever order the rules file uses. Reordering a rules file's keys changes nothing the model sees, and renaming a label to move it in the sort changes what the model sees. Whether option order affects this model version is a hypothesis for a direct transport probe, not a known fact. A locator's labels sort the same way, so `L100` reaches the model before `L17`.

## Primitives

The driver sends Noul, Choice and Score text questions over one state. It has no Box, image or asset request contract, whatever the provider documents.

## What each layer records

| layer | keeps | doesn't keep |
| --- | --- | --- |
| the engine's run (`RulebookRun.requests`) | every request with its outcome; a completed outcome carries the answers and a receipt naming the resolved model | it's internal; the lint report projects part of it |
| lint report `evidence_seen` | the exact state of every dispatched request, passes included, keyed by the rule-and-piece pair index; from 0.6.0 its `"cut-fields"` | answers, path, model |
| lint report `results` | each rule and piece's outcome and last step; from 0.6.0 its `path`, the answers its walk read, its `basis` and its `cut` fields | answers the request returned but the walk didn't read; the resolved model |
| lint report `findings[]` and `uncertain[]` | a finding's answers, value and path, and from 0.6.0 its `anchor`, `basis` and `related` places; an uncertain piece's state, answers and step | the resolved model |
| lint report `usage` | request and token totals | the resolved model of each request |
| `run_judgments` | returns answers and a receipt with the resolved model to its caller | anything the caller doesn't store; calling it again resamples |

So on the rules path, the resolved version per result is unavailable until a capture route exists, and full-population policy replay is partial even from 0.6.0: a changed threshold replays only where every row that reaches the changed node, under the old setting and the new, read every answer its new path needs. A row whose new path reads an answer its walk never read needs a fresh run. Name that gap in any proof that needs either. A `run_judgments` caller can keep its own records and replay over them.

## Credentials

A rules run sends model requests and needs the key. So does an evidence print over a kind with a model `select`, or a kind that lies `within` one. A print with no selected kind sends nothing and needs no key (`crates/sunstack/README.md`). Whoever lacks the grant to send model requests prepares the exact command and hands it to whoever holds it.
