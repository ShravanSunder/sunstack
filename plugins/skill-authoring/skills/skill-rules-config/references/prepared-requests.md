# Prepared Requests

This reference owns building a run's model requests without sending them, so a case can be read against the questions on the exact state the model would receive, before any paid run. Expected input: the config, and either the paths a run would read or a case file with its set. Return: the prepared report's path, each case's request id and its disposition, the requests listed as waiting on an answer, and any case or request that couldn't be prepared, with why.

**Pending: sunstack 0.9.0.** `--prepare` is written here from the engine's 0.9.0 contract and isn't in a released engine yet. Check `sunstack --version` first. On 0.8.3 or earlier there is no way to see a request's state without sending it: the desk check is blocked with that gap, and no paid run goes ahead in its place. Never stand in a hand-built copy of the state: it reads a different instrument. When 0.9.0 ships, its README is the authority for every detail below.

## What `--prepare` does

`--prepare <path>` on `sunstack lint` and on `sunstack lint cases` does everything an ordinary run does up to model dispatch (target selection, the case-run revision overlay, evidence collection with its cuts, mechanical steps, filter and rule request building, budgets) and then stops. It sends no model request, makes no network call and needs no credential. Its exit code says the run was prepare-only.

It writes a prepared report at `<path>`, in the same shape as `--report`, with every request's exact `state` and `questions`, the evidence, and the content and hash of every config and rulebook file it used. A prepared request's `state` and `questions` are byte-equal to what a keyed run with the same inputs would send and save; the engine's tests hold it to that. So the prepared request is the state the desk check reads, with no gap between it and the sent state.

## The commands

```sh
sunstack lint cases <case file> --set development --prepare <prepared.json>
sunstack lint show <prepared.json> <id>
sunstack lint --config <config> --prepare <prepared.json> [paths]
sunstack lint cases <case file> --set development --prepare <prepared.json> --selections-from <selection-run.json>
```

- **For a desk check,** prepare the case file's development set. Never prepare `--set held_out`: its requests are its cases' contents, which only the held-out holder reads.
- **Read one request** with `lint show`: its state, its questions in the order they'd be sent, and its pointers, read from the file alone.
- **For the collection** over a rule's whole denominator, prepare an ordinary run over its paths.
- **After a selection's run,** add `--selections-from <saved report>` to prepare the downstream rule on the pieces the selection chose (below).

## What the prepared report holds

- top level `"mode": "prepare"`;
- each request entry with `"status": "prepared"`, its exact `state` and `questions`, and no answers;
- a rule request behind a filter gate carries `"gate": {"filter": "<name>", "labels": [...]}`. Every folder the gate could admit gets its request, so each can be read before the filter has answered;
- a top-level `"needs_answer"` list: each request whose existence depends on a selection's answer, as `{"kind", "file", "waits_on": {"selection_kind", "request_id"}}`, the request id being the prepared selection request it waits on. Such a request is never prepared on a guessed answer and never silently skipped;
- under `lint cases`, every case keeps its accounting: `prepared`, or listed with why (stale, no matching piece, more than one matching piece, excluded by a mechanical gate, an unavailable field);
- with `--selections-from`, each selection answer taken from the saved report is marked `from_report` with its source request id.

## Selections and the requests behind them

A selected kind's candidates get their selection requests prepared like any other; those are the requests a selection's desk check reads. A rule over a selected kind, or a kind `within` one, has no piece until the selection answers, so its requests sit under `needs_answer`.

The selection's first run is a paid development step, made only after its own desk check and review. Save its report with `--report`: from 0.9.0 a saved report records each selection request and its answer, with the resolved model and version and the request's input hash.

Then prepare the downstream rule with `--prepare --selections-from <that report>`. For each selection request whose prepared state hash and question match an answered selection in the report, the engine applies the recorded answer, marks it `from_report` with the source request id, and builds the downstream pieces and rule requests on the candidates it chose. Those prepared requests are what the downstream desk check reads, byte-equal to what a keyed run continuing from those answers would send.

A selection with no matching answered request in the report (its candidate changed since, or the run didn't reach it) stays under `needs_answer`; the engine never guesses it. Desk-check the pieces that were prepared and list each one still waiting with its reason. Rerunning the selection on the changed candidates is another paid development step, after the changed selection has its own desk check and review. Never prepare the rule over unselected candidates, or a copy of the config without the selection, to get around a waiting piece.

## Never dispatch a selection before its gate

A command whose config has a `select` anywhere can send selection requests, whatever kind it was asked about: on 0.8.3, `--evidence` runs every selection the run needs before it filters the print to the kind you named, and an ordinary run does the same. So before a selection's desk check and review, the only commands to run against that config are `--check`, `--rules`, `--prepare` and `lint show`.

## Good and bad

- Good: a corrected product-workflow question is desk-checked on its owner-ruled development cases by `lint cases --set development --prepare`, reading each case's prepared request with `lint show`; the report's file hashes show today's rulebook built them.
- Bad: on 0.8.3, a checkout of each case's revision printed with its own config and read as the state. It reads an older instrument, and nothing shows it matches what the case run will send.
- Bad: an `--evidence` print of a mechanical kind in a config that also selects another kind, made before that selection's review. It sends the other kind's selection requests.
- Bad: prepared held-out cases, read by the author "only to check the overlap".

Complete when: the engine is 0.9.0 or later and the development set is prepared, with every case `prepared` or listed with why, every answer taken from a report marked `from_report`, and every `needs_answer` entry accounted for; or, on an earlier engine, the desk check is reported blocked on the missing `--prepare`, with no paid run in its place.
