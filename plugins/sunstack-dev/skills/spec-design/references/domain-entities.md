# Domain Entities

This reference owns deriving the Specification's domain entities, the nouns every obligation is written over, from settled sources. Each entity gets an identity rule, relationships, invariants, and observable states.

Expected inputs: the authority/problem model, the admitted Requirements rows and their U identifiers or the settling decision records, pathfinding records when present, and existing code or documentation vocabulary as observational evidence of terms already in use.

Return: the entity table, undefined-noun gaps, and any term routed to `discuss-pathfinding` with the exact same-instance question the sources cannot settle.

## Choose the Nouns and Sources

Start from every noun the problem and desired outcomes name, and every noun that appears in more than one U row or outcome.

Take meaning from the authorized U rows, the decision records that settle meaning, and pathfinding records. Code, contracts, and prior specifications show which terms are already in use. When an authoritative contract, decision, or Specification already gives a term the same meaning, reuse the term and its meaning without renaming or reopening it. Code alone shows current behavior and does not settle desired meaning.

When you fill an entity's slots, derive each one from what the owner's statements already decide, and word the identity rule so it decides the hardest same-instance case those statements raise ([define the domain first](../../principle-define-the-domain-first/SKILL.md)).

## Entity Table

```text
E<n>  canonical term
      identity rule:   what makes two instances the same, stated so the hardest case in the source is decidable
      relationships:   owns / belongs to / references, with cardinality
      invariants:      what is always true, from the owner's statements
      observable states: named states and the owner statement that implies each transition
      canonicalizes:   the source words this term replaces, and the reading it excludes
      basis:           U rows when present, otherwise the decision record or governing source that settles the meaning
```

Fill every slot from the sources or mark it as an exact gap; a blank slot is neither.

Give every entity a stable `E` identifier. It travels with the identity chain (`U -> E -> P -> O -> R -> C -> V`), appears in the coverage table and the accepted requirements set, and is the anchor a downstream binding or a review finding cites. Deleting an entity later is a coverage loss, not pruning.

## Settled or Unmade

Define the entity when two capable readers of the settled sources would answer the same-instance question the same way. Route it to `discuss-pathfinding` only when they would not, and carry the exact question the sources leave open. If nothing the owner said settles re-hold, that question is "Is a reminder re-created after re-hold the same reminder or a new one?"; "please define reminder" gives the owner nothing to decide. A term whose readings differ only in implementation detail is settled at this altitude, and the difference belongs to `program-design`.

Reading "a fresh reminder, not the old one" as an identity rule is Specification authoring over settled statements. The rule in `authority-and-problem-framing.md` stops an author from filling in missing owner meaning while normalizing Requirements. This stage writes down what the owner's statements already decide.

## Good and Bad

Good:

```text
E2  Reminder
    identity rule:     one Ticket plus the Hold-with-due-date occurrence that created it; a later re-hold creates a new Reminder
    relationships:     belongs to exactly one Ticket; a Ticket has at most one pending Reminder
    invariants:        never spans Accounts; exists only while its Ticket is on Hold with a future due date
    observable states: pending -> moved (due date changed) | cancelled (leaves Hold, closed, date cleared) | completed (due reached, Ticket moved to Open)
    canonicalizes:     "reminder", "nudge"; excludes the notification text an agent later sees
    basis:             U1, U2
```

Bad:

- a one-line description with no identity rule ("the pending wait for a ticket");
- a type, table, schema, package, or event payload field standing in for a definition;
- a glossary of every noun in the source, including ones no obligation uses;
- states copied from a workflow engine instead of from owner statements;
- a term renamed or redefined when a governing source already fixes its meaning.

## Complete When

At this pass, every noun the problem and desired outcomes name is a defined entity with an `E` identifier and every slot filled or marked as an exact gap; every identity rule decides the hardest case the source raises; no definition names an implementation home; and each unsettled term has been routed with its exact same-instance question. Whether every entity is used by an obligation is checked when obligations exist, by `requirements-and-traceability.md` and the author self-check.
