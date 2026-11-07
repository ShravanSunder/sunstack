# Prepared Requests

This reference owns building a run's model requests without sending them, so a case can be read against the questions on the exact state the model would receive, before any paid run. Expected input: the config, and either the paths a run would read or a case file with its set. Return: the prepared report's path, each case's ordinal and disposition, the requests listed as waiting on a selection answer, and any case or request that couldn't be prepared, with why.

`--prepare` arrived in sunstack 0.9.0 (`crates/sunstack/README.md`, "Prepare requests without sending"). Check `sunstack --version` first. On an earlier engine no command shows a request's state without sending it: the desk check is blocked with that gap, and no paid run goes ahead in its place. Never stand in a hand-built copy of the state: it reads a different instrument.

## What `--prepare` does

`--prepare <file>` on `sunstack lint` and on `sunstack lint cases` uses the ordinary run's target selection, evidence, cuts, mechanical checks, request builders and budgets, then saves the requests instead of sending them. It resolves no credential and calls no provider. It can't be combined with `--report`, `--check`, `--rules`, `--evidence` or `--init`.

The prepared report has the ordinary report's shape, with each request's exact `request.state` and `request.questions`, its raw evidence, and the content and hash of every config and rule file used. Nothing is answered and no outcome is judged. The engine's tests hold a prepared request equal to the request an actual keyed run sends and saves, so the prepared request is the state the desk check reads.

## The commands

```sh
sunstack lint cases <case file> --set development --prepare <prepared-cases.json>
sunstack lint show <prepared-cases.json> <N>
sunstack lint --config <config> --all --prepare <prepared.json>
sunstack lint show <prepared.json> <id>
sunstack lint --config <config> --all --prepare <continued.json> --selections-from <run.json>
```

- **For a desk check,** prepare the case file's development set. Never prepare `--set held_out`: its requests carry its cases' contents, which only the held-out holder reads.
- **Read one case** with `lint show` on the prepared case report: `<N>` is the case's **1-based position in the file's `cases` array**, not its id. It returns that case with its linked revision and request evidence; a stale or unmatched case shows only its reason.
- **Read one request** from a prepared lint report with `lint show <file> <id>`, as for an ordinary saved report.
- **For the collection** over a rule's whole denominator, prepare an ordinary run over its paths.
- **After a selection's run,** add `--selections-from` (below).

## What the prepared report holds

- top level `"mode": "prepare"`;
- each unanswered request with `"status": "prepared"`, its exact state and questions, and no answers. A rule's decision tree is one request holding all its questions, so an unanswered route doesn't stop preparation;
- a rule request behind a filter gate is offered for every folder the gate could mechanically admit, each with its `gate` condition, so each can be read before the filter has answered;
- a top-level `"needs_answer"` list, each entry `{"kind", "file", "waits_on": {"selection_kind", "request_id"}}`, the request id being the prepared selection request it waits on;
- under `lint cases`, every case keeps the ordinary exact-range and hash matching and accounting, with `prepared` added as a disposition; stale, unmatched, ambiguous, mechanically excluded and unavailable cases keep their reasons.

## Exit codes

- **6:** a clean prepare-only run, including one whose requests wait for selection answers;
- **1:** a mechanical finding, or a case gap (a stale or unmatched case among them);
- **2:** invalid input; **3:** incomplete processing; **4:** cancelled. These take precedence over case gaps.

Unassessed case bars alone don't fail a prepare-only run. Exit 6 is the expected success, not an error.

## Selections and the requests behind them

A selected kind's candidates get their selection requests prepared like any other; those are the requests a selection's desk check reads. Until a selection answers, the pieces that depend on it can't be built:
- a kind that is selected, or lies `within` one, has no piece yet;
- a composed field (`same_file`, `inside` or `enclosing`, including a `remainder` that subtracts them) that reads a selected kind is selection-pending;
- a request whose model view holds any selection-pending field waits whole, even for questions that read only other fields.

Each of these is listed under `needs_answer`, never built on a guessed answer. Evidence and requests that depend on no selection build normally.

The selection's first run is a paid development step, made only after its own desk check and review. Save its report: from 0.9.0 an ordinary `--report` keeps each selection request with its answer, the requested and resolved models, the input hash and the raw selection evidence. A case report works too.

**A gap in 0.9.0: no run records a selection alone.** `--selections-from` reads only a report with a request ledger: an ordinary `--report` run or a case report. `--evidence` sends only selection requests, but it can't be saved with `--report`, and its listing has no request ledger. Ordinary and case runs also send every asking rule that reads the selected pieces, so recording the answers would send the downstream rule's requests before that rule's desk check and review. Recorded answers also apply only to identical states: answers recorded on today's files don't serve development cases at older revisions whose text differs. Until the engine can record a selection on its own, at the cases' revisions, name this gap: the downstream rule's desk check waits on the engine, and no run sends that rule's requests ahead of its review.

Then prepare the downstream rule with `--prepare --selections-from <that report>`. The engine applies a recorded answer only when all of these hold:
- the selection request's state and questions are identical to the recorded one;
- the recorded answer is valid;
- the config's `decision_model.model` equals the recorded **resolved** model name exactly.

So pin the resolved version (the one the selection run's report shows as resolved) in the config before continuing. An alias such as `jev-latest`, another version, an unanswered entry or a changed input stays under `needs_answer`. Each applied answer has `status: "from_report"` and its `source_request_id`, plus `source_revision` when it came from a case report. Agreeing duplicate answers keep the first source; conflicting ones stay unresolved. Neither preparing nor continuing uses any model requests.

The downstream rule's requests on the chosen pieces are what its desk check reads. Desk-check those, and list each request still waiting with its reason: a changed candidate needs the selection rerun on it, which is another paid development step after that selection's own desk check and review. Never prepare the rule over unselected candidates, or a copy of the config without the selection, to get around a waiting request.

## Never dispatch a selection before its gate

A command whose config has a `select` anywhere can send selection requests, whatever kind it was asked about: `--evidence` runs every selection the run needs before it filters the print to the kind you named, and an ordinary run does the same. So before a selection's desk check and review, the only commands to run against that config are `--check`, `--rules`, `--prepare` and `lint show`.

## Good and bad

- Good: a corrected product-workflow question is desk-checked on its owner-ruled development cases by `lint cases --set development --prepare`, reading each case with `lint show <file> <N>`; the report's file hashes show today's rulebook built them, and the run exits 6.
- Good: after the selection's development run, the config pins the version its report shows as resolved, and `--prepare --selections-from` builds the rule's requests on the chosen sections, each answer marked `from_report`.
- Bad: continuing from a selection run with the config still on `jev-latest`. Every selection stays under `needs_answer`, and the downstream rule is never prepared.
- Bad: `lint show prepared-cases.json k002-case-014`, by id. A prepared case report is read by 1-based position.
- Bad: an `--evidence` print of a mechanical kind in a config that also selects another kind, made before that selection's review. It sends the other kind's selection requests.
- Bad: prepared held-out cases, read by the author "only to check the overlap".

Complete when: the engine is 0.9.0 or later, the development set is prepared and the run exited 6 (or 1 with every case gap listed), every case is `prepared` or listed with why, every answer taken from a report is marked `from_report`, and every `needs_answer` entry is accounted for; or, on an earlier engine, the desk check is reported blocked on the missing `--prepare`, with no paid run in its place.
