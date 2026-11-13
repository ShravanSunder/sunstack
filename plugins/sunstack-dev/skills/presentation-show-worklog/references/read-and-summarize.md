# Read the record for a requested page

This reference owns source reading, freshness, backing and coverage for one explicitly requested page. Inputs: project/tag or permitted entries files, requested scope, any inspected capture/cutoff/open state and historical summaries. Return: the source snapshot and provenance, current questions and outcomes, the material decisions and relied-on assumptions in their current state, selected evidence and its scope, checked backing, material gaps and permitted reader destination. The source is read-only during rendering.

## Establish the snapshot

Reuse a complete inspected capture when its source identity, project/tag/epoch and requested scope match and its underlying records remain available. For an explicitly fixed historical snapshot, keep its requested cutoff. To call a retained account current, first read every new row in this scope after the retained cutoff through the newly declared cutoff, then judge what changes; a correction can matter outside the subjects previously summarized.

When capture, provenance, relevant history or open state is missing, reconstruct the requested scope. Read Router with `agent-collaboration work-trail show --project-id <id> --tag <work tag> --after '{"epoch":1,"position":0}' --limit 100 --json`, continuing from each `coveredThrough` to the declared cutoff. For entries files, retain the file and inspected last-line position; reuse that prefix and read new lines when refreshing. A changed source or wider unread scope requires reconstruction. Keep inspected records, not only a summary asserting they were read.

Read in bounded outputs and recover unread, truncated or wrong-path portions before claiming their coverage. Reuse successful reads still present in context. Preserve original IDs, authors, times, tags, links and text; a missing interval is an explicit gap, never guessed content.

MUST load `../../practices-show-me-your-work/references/record-entries.md` and return the meanings of the recorded kinds, authority and closure links present in this source. This read is for interpretation, not permission to use its write procedure while rendering. Historical thread logs may lack structured metadata; keep that provenance without inventing newer fields.

## Reconcile the work

- An open assumption remains open until actual later evidence or an answer resolves it. Owner silence is no resolution and creates no replacement.
- Interpret recorded `resolves`/`supersedes` first links; a mention or a confident summary alone does not close anything.
- Identify who made a decision separately from the authority recorded for it. An agent-made decision stays agent-made whether it is core or routine. Show its authority as recorded, with the meanings `record-entries.md` gives: the owner's words, an existing contract or design, or the agent's `own call`, which for a `door:two-way` choice means a reversible choice inside existing authority. Under the recording skill's rule, a commitment about stored data, ownership, a public contract, new technology or scope needs covering authority from the owner's words, the design or a contract; when none covers it, it is an open assumption waiting for the owner whatever its tag, and the page shows that gap. A departure keeps its actual consequence. Tags do not replace that judgment, and the page attributes the choice without approving it after the fact.
- Missing authority, workstreams, source records or raw receipts are account gaps. Do not write a Missed row or invent a decision in order to render the page.
- Keep historical reports, live observations, source inspections and actual acceptance distinct. A copied passing check is not a new run; retain target and proof limits beside each displayed claim.

IF existing Story rows contribute to the account, load `story-records.md` and return their keys, cited backing and later changes that qualify them. Treat them as historical summaries to inspect, not a requirement to create or refresh stored summaries. Compose from original evidence when a Story is absent, stale or incomplete, carrying the backing limit into the account.

## Explain and check the account

Group related records into meaningful subjects: what changed, why, the decision or correction, supported outcome and remaining work. Write in ordinary language, with enough context to understand the point. Several records may support one explanation; display it once and link to it elsewhere. A source record's fields are not a required repeated page layout.

For each material displayed claim, inspect the original backing and newer relevant corrections or closure rows. Check the whole supplied interval for material facts that change the conclusion, including decisions agents made and assumptions the work relies on that no summary mentions. When the inspected source cannot establish which material decisions or assumptions exist, say so as a coverage gap rather than presenting an empty list as complete. Grouped internal coverage is sufficient; no new stored Story, coverage ledger or record for every read is required. Report partial scope and unavailable evidence honestly.

Keep the complete declared source snapshot available through an existing stable source or a permitted companion, including its provenance and links. An archive preserves detail; it does not substitute for explaining the work. The page does not add source events about its own capture, summary preparation, checker, audit or completion.

## Select evidence for an explanatory episode

These illustrative source notes teach composition, not facts or commands to copy into another project's page:

- An implementer reports that `pytest tests/test_retries.py` exited `1`: the fixture reached three attempts at `assert attempts == 2`.
- A decision report says, "Keep the existing two-attempt contract; correct the fixture configuration." Its authority is the existing contract, not a new owner choice.
- The implementer then reports changing the fixture configuration from three attempts to the contract's two attempts.
- A later implementer report says the same command passed five fixture cases, exit `0`, and explicitly leaves the real service untested.
- The implementer also records its own choice to shorten the fixture's wait between attempts to 10 ms so the suite stays fast, noting that slow-response timing is no longer exercised. No owner direction or contract mentions the wait.
- The handover note says the next release relies on the real service also stopping after two attempts; no record observes that.

One episode can explain the first four notes in three meaningful steps:

1. **The fixture exposed an extra attempt.** Explain the expected two versus observed three, and attach the reported assertion as a Python excerpt. The failed result belongs beside it, attributed to the implementer; the record link opens the complete report.
2. **The correction kept the existing contract.** Explain why this is a configuration correction rather than a changed retry policy, and attach the decision's quoted sentence with its authority. This step needs no invented diff.
3. **The local fixture passed; the real service remains untested.** Display the exact supplied command in a shell view and put its reported five-pass result and local-fixture scope beside it. Link the later report for depth without claiming a fresh run or broader acceptance.

The last two notes belong in the main account too. The shortened wait is the implementer's own call: give its reason (a fast suite), its cost (slow-response timing unexercised) and that the supplied notes provide no covering authority for it, rather than presenting it as part of the retry contract. The real service's two-attempt behavior is an open assumption: name the release that depends on it and that only a real-service observation would settle it. The passing fixture does not settle it.

An opening such as "The implementer reported the retry fixture passing after its configuration correction; the real service remains untested" keeps the outcome and its limit together. "Retries are fixed" followed by a later disclaimer would overstate these notes. A step titled "Correction complete" with only a link would omit the evidence the reader needs to judge it. Retrieve actual Trace and code markup from the matching guide; these steps select meaning and support, not an API or a stored record shape.

For a narrative-only source, attach its decisive observation as text instead: if an owner records "Defer publication until the rehearsal is reviewed," explain the hold and quote that direction with its attribution. No code or command is supplied, so none is manufactured. A source without a supporting observation remains a named evidence gap.

## Destination and completion

The reader lives in the work's memory-logs project folder, normally `projects/<yyyy>/<yyyy-mm-project>/owner-pages/live-<work tag>.html`, or the commission's exact permitted destination. Before writing, load that repository's `AGENTS.md` and `use-memory-logs` skill and return its allowed folder, writer and files; shared indexes are not assigned by a page request.

Complete when the declared source is inspected or its gaps are explicit, material claims and remaining questions have checked backing, history is unchanged and the reader destination is permitted. Return that inspected snapshot/cutoff for composition; do not reread it merely to report that it was read. The caller uses presentation-html for the existing page presentation and static check.
