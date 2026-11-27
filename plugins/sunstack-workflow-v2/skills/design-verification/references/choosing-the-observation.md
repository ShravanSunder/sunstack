# Choosing the Observation

This reference owns choosing, for each obligation, the evidence that can tell a correct build from a wrong one at the obligation's real boundary, and whether a journey already makes that observation. It doesn't choose test files, commands or run order; the plan does.

Expected inputs: each `core` rule with its cases, references and target constraints; each rule's seam from the realization records and the page's how part; and the journeys and real-path tests step 2 read.

Return: for each obligation, the evidence class, the boundary where its wrong behavior stays real, the target, the journey or test that will observe it (existing, needed with its entry and observation, or none), each needed journey's lifetime, and any `specification-gap` or `program-design-gap`.

## Evidence classes

```text
automated behavior
manual interaction or visual evidence
API or CLI transcript
state or data inspection
log, trace, or metric observation
security analysis or misuse case
performance measurement
release or runtime evidence
structural check: schema, type, lint, manifest or document
```

## Find the boundary, then the class

Start from the wrong build, not from a test layer. MUST load `sunstack-dev:principle-write-tests-that-can-fail` and return the wrong behavior the obligation must rule out, and the smallest part of the system that has to run for that wrong behavior to show. That boundary picks the class.

| Obligation | Wrong build it must catch | Where the wrong behavior stays real | Class |
| --- | --- | --- | --- |
| the layout holds at the supported viewport | the side panel overflows at 1280 px | the rendered screen at that size | visual evidence at that viewport |
| a retried submit is idempotent | the retry creates a second order | the stored orders after a duplicate submit | state inspection, not the returned status |
| a viewer can't delete a project | only the UI hides the button | the API's enforcement point, called by an allowed and a denied actor | API transcript for both actors |
| search answers within 300 ms at p95 | the large index is slow | the named endpoint under the named workload | performance measurement against that threshold |
| an outage pages on-call | the alert rule never fires | the page reaching its channel | metric and alert observation, not a log line |
| line totals round half-up to the cent | 0.125 rounds to 0.12 | the pricing rule alone | focused automated test, no app launch |
| the plugin manifest declares the new skill | the entry is missing | the manifest file | structural check, naming "the skill loads in a session" as unevaluated |

Bad choices:

- "unit tests" for cross-process wiring;
- "manual test" without the behavior and the observation;
- static schema validation for runtime ordering or recovery;
- mocked integration evidence presented as proof of production wiring;
- a success status or a row count for a durability claim;
- a new test file or command prescribed in the check, when the plan chooses those and a check names only an existing test it reuses.

## The ordinary entry

A check that proves an end-to-end behavior names the ordinary entry: the process started the way a user or the release starts it, from its real producer's output, such as the enrollment a real install writes. A composition that a fixture or test helper builds counts only for the component it isolates.

In one router project, a debug loader composed the board session, and every observation through that loader passed. The ordinary startup passed no board session at all. Only a journey that started the process from a real install's enrollment could have failed for that wrong build.

## Journey: existing, needed or none

- **Existing:** a `verify-<app>` journey whose source drives this entry and reads this outcome on the planned target. When it observes the outcome but misses a case the obligation covers, such as the failure path or the denied actor, the check names the case to add.
- **Needed:** no journey reaches the entry or reads the outcome. Write `needed:` with the entry it must drive and what it must read.
- **None:** a pure rule or structural claim needs no journey.

## Lifetime: lasting or temporary

A `needed:` journey says whether it is lasting or temporary. An existing journey is already lasting, and `verify-<app>` describes its build, platform, configuration and client; the check names it and does not restate them.

- **Lasting:** the outcome will be checked again, such as a user-facing behavior that can regress, a release check, or something other projects touch. The journey runs from a self-describing script in the project's own scripts location, and `verify-<app>` says which script proves it and when and why to run it. A lasting `needed:` journey is built before any observation that depends on it.
- **Temporary:** a one-time check. The Verifier runs it as a probe in the task's scratch beside its evidence, and deletes the probe once the evidence is kept.

A needed journey checking that a one-time backfill set each old note's created date is temporary: once the release has run the backfill, nothing runs it again.

A check decided by a focused test, structural evidence or a reused real-path test carries no lifetime and adds no script or probe.

## Worked checks

The names, paths and requirements below are illustrative.

### Durability across a restart

```text
rules       R4 a saved draft survives an app restart; R5 a reopened draft keeps its title
            (both serve U2 "my drafts are never lost")
statement   Save a draft in the installed app, quit it, reopen it, and see the same title and body.
cases       given R4's worked example (title "Q3 plan", a 2,000-character body ending in an emoji),
              expect the same title and body after relaunch
            given a build that keeps drafts only in memory, expect the draft gone after relaunch: fails
            given a build that cuts the body at 1,024 characters, expect a shortened body: fails
journey     verify-notes `drafts`: drives save, quit and relaunch; reads the editor's title and body.
            Not `drafts-store.test.ts`: it swaps the disk for an in-memory store, so it never crosses a restart
unverified  Windows, which this cycle doesn't ship
```

The weak version of the same check:

```text
statement   e2e coverage of drafts
cases       given a save, expect the request to return 201 and the draft count to go up
journey     drafts-store.test.ts
```

A build that never writes to disk passes it. The status and the count are acknowledgements, and the reused test replaces the very boundary R4 is about.

### Routing, with honest reuse

```text
rules       R11 text sent to pane B appears in pane B's input and nowhere else
            (serves U5 "text I send reaches the pane I chose")
statement   Send text to pane B from the CLI and see it in pane B, not in the focused pane A.
cases       given R11's example, "echo hi" sent to pane B while pane A has focus,
              expect pane B to show "echo hi" and pane A nothing new
            given a router that writes to the focused pane, expect "echo hi" in pane A: fails
            given a router that replies ok before any pane write, expect pane B unchanged: fails
journey     reused `pane-routing.e2e.ts`: drives the real CLI, router and panes and asserts both panes' contents
unverified  remote panes over SSH
```

The check adds no manual journey, because the reused test already keeps the router real and fails for wrong routing. The router's `ok` reply is not the outcome. If the test had asserted only that reply, it would decide nothing here and the check would need a `needed:` `pane-send` journey.

### A pure rule

```text
rules       R15 line totals round half-up to the cent (serves U7 "totals match the invoice")
statement   A focused test checks R15's rounding table against the pricing rule.
cases       given 0.125, expect 0.13
            given 0.124, expect 0.12
            given a rule that rounds half to even, expect 0.125 -> 0.12: fails
journey     none: the plan adds the focused test; no entry point, screen or configuration changes the rule
unverified  none: the totals screen only shows the rule's output, and U8's check observes that screen
```

### One check, several rules

R8 (pressing Enter submits once) and R9 (results come from the real index) serve U3 "search finds my file"; R10 (the panel shows the match count) serves U4 "I can see how many matched". All three are decided by the `search` journey: type a query, press Enter once, read the results and the count. Write one check that names R8, R9 and R10, with cases saying what each reads in that observation. If the journey runs against a fixture index, R9 is undecided, and the check lists R9 as unverified rather than look covered because its journey exists.

## When a check can't be written

- **No seam to observe through.** R20 says a reminder fires at its due time, but the design leaves nothing a user or caller can see showing when it fired: no notification with its time, no readable record. No observation can tell on-time from late. Record a `program-design-gap`: the rule, the seam its realization names, and the observable effect it needs. Waiting for a near due time on the planned target is a valid observation, not a gap.
- **No reference to judge against.** R21 says search "feels fast", with no threshold or workload, so no passing condition can fail a slow build. Record a `specification-gap` for the missing threshold and workload.
- **A harness that can't reach the boundary.** When the existing journey can't restart the app, "survives a restart" doesn't become "save returns 201". Keep the obligation, and write the journey as `needed:`.

Complete when every obligation has a class whose observation sits where its wrong behavior is real, an existing, needed or no journey, with a lifetime for each needed journey; every end-to-end check names its ordinary entry; every pure rule and structural claim has proportional proof; and every check that can't be written carries its gap.
