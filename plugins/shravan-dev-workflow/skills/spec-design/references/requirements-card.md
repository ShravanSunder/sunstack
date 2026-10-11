# Requirements Card

This reference owns the Requirements card: what goes on it, where each line comes from, and how the owner confirms it.

Expected inputs: the owner's confirmed restatement, the candidate sources (owner messages, existing contracts, earlier documents, code and logs as evidence), and any `discuss-pathfinding` record. Return: the card, ready for the owner to confirm in a reply of its own.

## The Card

The Requirements document opens with a short card the owner can read in a few minutes. Detail, if any, comes after it.

```text
Your lines        one plain line per need, in the owner's words, each with where it came from
Proposed          agent ideas, each with where it came from; not the owner's until adopted
Open              decisions only the owner can make
```

Each "Your lines" row has a stable `U` identifier, the line, and its source. Keep a line to one claim; split a line that bundles several. Priorities are the owner's to set; record them only when the owner gave them.

Good:

```text
U3   A real installed agent's hook events show up in the right pane.      you, Oct 5 message
U4   Existing pane layouts keep working after the change.                  existing contract: pane API v2
Proposed: Check each provider version before accepting its events.    agent-written design #352 — not yours yet
Open:     Which agent versions must be supported?
```

Bad: a 2,900-word table whose rows are detailed rules with the owner's outcome squeezed into one short column. That is the IPC Requirements doc, where an agent's version check (`N3`) sat among real needs and nobody could check which lines were the owner's.

## Where a Line Comes From

Each line names one source the owner can check:

| Source kind | Example | Counts as the owner's? |
|---|---|---|
| the owner said it | a message, a meeting note the owner wrote | yes |
| an existing contract | a published API, a protocol, a compliance rule the product must follow | yes, when it governs the product |
| a hard constraint | a platform limit, a repository or package the owner fenced off | yes, as a limit |
| a proposal the owner adopted | "yes" from the owner to that line | yes, from the date of adoption |
| an agent's idea, analysis, or earlier design | a spec, plan, design doc, or summary an agent wrote | **no: Proposed** |
| current code or logs | what the system does today | no: evidence of today, not of what is wanted |

Adoption means the owner said yes to that line. These do not count: an agent's restatement, silence, "sounds good" to a whole document, a topic change, or a delegation such as "whatever you think". A document titled "requirements" is not a source of owner lines unless the owner wrote or adopted them.

When the source is unclear, the line is Proposed until the owner settles it.

A `discuss-pathfinding` record tags each row with an authority state. Only `authorized` rows become Your lines. `advisory` rows go under Proposed, `unresolved` rows under Open, and `observational` rows are evidence for a line, never a line themselves. Never promote a row past its state.

## The Altitude Test

A Requirements line says what the owner wants and why. A rule a tester could check directly (exact counts, order, field names, timeouts, version checks) is Specification detail.

- If the owner said the detail, keep their line as a Requirements line and put the checkable rules beneath it in the Specification. The line keeps its `U` identity so the rules can trace to it.
- If an agent supplied the detail, it is a proposal. It becomes a Specification rule only when a stranger reading the owner's line would derive the same rule from it; otherwise it stays under Proposed until the owner adopts it.

## The Goal Boundary

Before writing lines, the restatement confirmed by the owner fixes the boundary. Keep these visible on or beside the card when they matter:

- who is affected, and the outcome each needs;
- what already works and must keep working;
- what is actually missing, with the symptom, its cause when known, and any mechanism the request names kept apart;
- which systems or packages may change and which are protected;
- what is out of scope, and the machinery that would reopen scope;
- what evidence the owner will accept.

A line outside the boundary goes to Open as a decision, not onto the card.

## Reuse or Write

Use one Requirements home:

```text
a confirmed Requirements document exists       -> reuse it; add or revise lines there
settled owner meaning exists but is scattered  -> write one card from it, citing each source
owner meaning is not written anywhere          -> return requirements-gap; the caller uses discuss-pathfinding
```

Never write a second Requirements document beside an existing one. Never fill a missing owner line with your own reading.

## Complete When

Every line has a `U` identifier, plain words, and a source from the table above; every agent idea is under Proposed; every undecided choice is under Open; nothing outside the confirmed boundary is on the card; and the owner has confirmed the card in a reply of its own.
