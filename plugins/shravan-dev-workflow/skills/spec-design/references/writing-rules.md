# Writing the Specification

This reference owns how the Specification is written: the entities its rules talk about, the rules themselves, the reference when one defines what is correct, failure behavior, and what stays out.

Expected inputs: the confirmed Requirements card, the goal boundary, and the sources behind each line. Return: the entity table, the rules with their trace, any stated references, and the gaps.

## 1. Define the Nouns First

A rule is a sentence about nouns, so the Specification defines each noun its rules use before writing them.

```text
E<n>  canonical term
      identity rule:      what makes two instances the same, decided for the hardest case the sources raise
      relationships:      belongs to / references, with cardinality
      invariants:         what is always true
      observable states:  named states and what moves between them
      canonicalizes:      the source words this term replaces, and the reading it excludes
      basis:              the U lines, or the decision, that settle the meaning
```

Read owner statements for identity and state, not only for future rules. "A fresh reminder, not the old one" says identity includes the occurrence that created it. "Nothing comes back after close" names a terminal state. Deriving these from settled owner statements is Specification work; inventing meaning the statements do not settle is not.

Good:

```text
E2  Reminder
    identity rule:     one Ticket plus the Hold-with-due-date occurrence that created it; a later re-hold creates a new Reminder
    relationships:     belongs to exactly one Ticket; a Ticket has at most one pending Reminder
    invariants:        never spans Accounts
    observable states: pending -> moved | cancelled | completed
    canonicalizes:     "reminder", "nudge"; excludes the notification text
    basis:             U1, U2
```

Bad: a one-line description with no identity rule; a type, table, schema, or payload field standing in for a definition; a glossary of every noun, including ones no rule uses.

Define a noun when two careful readers of the settled sources would answer its same-instance question the same way. When they would not, return `requirements-gap` with the exact question ("is a reminder recreated after re-hold the same reminder?"), not "please define reminder". "The words are obvious" and "the data model is design's problem" are the two excuses that leave nouns undefined; a stranger reading only the Specification must be able to decide every same-instance and state question the rules depend on.

## 2. Write Checkable Rules

Each rule has a stable `R` identifier, names the `U` lines it serves and the `E` entities it talks about, and says what passes and what fails.

Use a form that makes the trigger and response unambiguous. These are tools, not a required syntax:

```text
always       The <system> <response>.
state        While <state>, the <system> <response>.
event        When <trigger>, the <system> <response>.
optional     Where <feature exists>, the <system> <response>.
failure      If <fault>, then the <system> <response>.
```

Write faults as if/then. Split a rule when its parts can pass or fail independently.

Repair vague words with the behavior that tells pass from fail:

```text
weak:    The system must support retries.
repair:  If the provider times out before confirming acceptance, the system retries
         without creating more than one externally visible operation.
```

The technology-name test: if a different implementation could satisfy the same observable rule, the technology name is structure, not a requirement, unless a governing contract makes it one. "Use Redis for idempotency" becomes "repeated requests with the same key return the original outcome without repeating the side effect."

## 3. State the Reference When One Defines Correct

When what counts as correct is defined by something outside the system (a Git version's behavior, a protocol version, a real installed agent), the rule names it: "matches Git 2.50.1's ignore-rule behavior for nested patterns", not "matches Git". The exact binary, entry point, and how it is run belong to Verification Design. A rule that leaves the reference implicit invites checking against the wrong thing.

## 4. Say What Happens at the Edges

For each surface someone outside the system relies on (UI, API, CLI, file, event, configuration), state what the consumer can predict:

- normal, boundary, and invalid input;
- failure, partial success, cancellation, and timeout;
- duplicate, out-of-order, or stale input, when it matters;
- what stays compatible, and what nearby behavior is deliberately left undefined.

Name the nearest thing a capable builder might assume but must not build ("no cross-account aggregation", "no ordering across independent streams"). Undefined behavior is not permission to break an invariant.

For security, privacy, reliability, performance, and accessibility, state the guarantee the outside world sees, or "not applicable" with the reason. Leave how it is enforced to `program-design`.

## 5. Check the Trace Both Ways

```text
U line  ->  E entities  ->  R rule  ->  (later) Program Design row, T scenario, V check
```

- Every confirmed U line has at least one R, or a stated reason why not.
- Every R names the U lines it serves; an R with nothing above it is an invented rule. Remove it, or bring it to the owner as a proposal.
- Every noun a rule uses is an `E`; every `E` is used by some rule.

The stranger test: someone with no session history can read a rule and say what passes, what fails, and which owner line it serves.

## Complete When

Every rule is checkable, traces to a confirmed U line, and uses only defined entities; every reference that defines correctness is named; every outside surface states its edge behavior; and the Specification names no component, store, package, schema, or call path.
