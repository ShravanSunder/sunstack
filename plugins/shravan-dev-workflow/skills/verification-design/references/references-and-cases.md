# References and Cases

This reference owns what each check is checked against, how that reference is disclosed, the kinds of case that find real defects, and the kind of evidence that can observe each outcome.

Expected inputs: the Requirements lines, the Specification rules and any reference they name, and known limits of the environment. Return: a declared reference for each check, its case kinds, and its evidence type.

## Declare the Reference

Every check says what "correct" is checked against. The reference is one of:

| Reference | Use it when | Example |
|---|---|---|
| a pinned binary or version, with its entry point | the Specification says correct means matching another implementation | Git 2.50.1, `git check-ignore -v`, global excludes off |
| a real installed program | the outcome depends on a real client or agent's behavior | the installed agent at its recorded version, driven through its real hook |
| a Specification table or example | the Specification lists inputs and outputs | the R3 table of due dates |
| a frozen baseline | only when the rule is "behavior stays the same" | outputs captured from the last release before the change |
| the Specification rule itself | none of the above applies | R7's if/then statement |

Disclose it fully: version, entry point, configuration, and any exclusions. "Matches Git" is not a reference; "matches Git 2.50.1's `check-ignore` for nested patterns, global excludes off" is.

These are not references unless the Specification says so: traces recorded from one version, the code's own output, a version written as "latest", and the implementation the change was ported from. An external checker is still only as good as its inputs: a weak case passes against a perfect reference.

## Aim the Cases at the Risk

```text
targeted       aimed at where this change is most likely wrong
boundary       the edges the rule names: empty, maximum, first, last, exactly-at
negative       inputs the rule must reject or must not act on
differential   the same inputs run through the change and the reference, outputs compared
```

Volume is not targeting. 1,500 random cases passed against a Git port; 400 cases aimed at nested patterns found 10 mismatches. Say which risk each case aims at.

## Pick Evidence That Can See the Outcome

Choose the evidence type that can observe the outcome at its real boundary:

```text
automated behavior
manual interaction or visual evidence
API or CLI transcript
state or data inspection
log, trace, or metric observation
security misuse case
performance measurement
release or runtime evidence
```

Good:

- a layout rule needs visual evidence at the supported viewport;
- an idempotency rule needs evidence of the side effect or state, not only a returned status;
- an authorization rule needs allowed and denied actors at the enforcement point;
- a latency rule names the measured boundary, the workload, and the threshold;
- an alerting rule needs the alert observed, not just a log line.

Bad:

- unit tests offered as proof of cross-process wiring;
- "manual test" with no behavior or observation named;
- schema validation offered for runtime ordering or recovery;
- mocked integration offered as proof of production wiring.

## Complete When

Every check names a reference from the table above with its version, entry point, configuration, and exclusions where they exist; no check is against recorded traces or the code's own output unless the Specification says so; every case names its kind and the risk it aims at; and every check's evidence type can tell pass from fail at the real boundary.
