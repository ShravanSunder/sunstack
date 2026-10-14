# Reference and Outcome Cases

This reference owns what a verification is judged against and which cases it must contain: the declared reference, the core outcome as observed, and the cases that tell that outcome apart from its look-alikes.

Expected inputs: the Specification's obligations and worked examples, the Program Design's observation points, the Test Design's scenarios, and the delivery target as far as it is known.

Return: the case coverage tied to the declared reference and the observable outcome, including the wrong-target and acknowledgement-without-outcome cases, and any reference that cannot be declared.

## The Declared Reference

The reference is what a correct result must match, and it comes from somewhere the implementation did not produce:

- the Specification's obligation and its worked example;
- a published protocol or format at a named version;
- a reference implementation the owner adopted;
- a known-good output that someone checked against the contract, kept with that check.

Name it exactly enough to judge against. "The protocol" is not a reference when two versions ship; "protocol v3, message framing section" is. A model asked whether an output "looks right" is not a reference: it shares the implementation's blind spots and gives no fixed answer to judge against.

When no reference can be declared, the verification cannot be designed. Return a `verification-design-gap` naming the missing reference, or a `specification-gap` when the obligation itself is missing.

## The Outcome, Not Its Proxy

State each core outcome where the user or the calling program meets it: the text in the pane, the response body, the row read back after a restart, the file on disk, the rendered screen at the supported size. Then list the proxies that look like it and are not:

| Outcome | Proxy that can pass without it |
| --- | --- |
| text appears in pane B | IPC reply `ok`; CLI exit code 0; a log line "delivered" |
| the draft survives a restart | the save call returned 201; the row count went up |
| the export opens in the customer's spreadsheet tool | the file was written; its size is non-zero |
| the alert reaches the on-call channel | the alert rule exists; the metric crossed the threshold |

Each case observes the left column. A proxy may help diagnose a failure; it never passes a case.

## Cases That Must Be There

**Acknowledgement without outcome.** For every outcome with an acknowledgement on the path, one case shows the acknowledgement arriving while the outcome is checked separately. The pane-routing case: the router replies `ok` before any pane write, so the case reads pane B and pane A on the delivered app.

**Wrong target.** Every observation records the identity of what it observed: the build or commit, the installed version, the configuration, the client. A run against a dev build, a stale binary, a different configuration or an older protocol version observes something else. Write the passing condition so a run on the wrong target cannot pass it: "pane B shows the text on the installed build whose version matches the release candidate" rather than "pane B shows the text".

**Failures the claim covers.** When the claim includes how a failure is handled or shown, drive that failure through the same entry point (a send to a closed pane, an unreachable dependency) and observe what the user sees. Detailed variations stay in tests.

**Clean case.** A pure formatting rule with no entry point, configuration or screen needs no real-system case; the Test Design's focused tests carry it. Say so instead of inventing a journey.

## Passing Condition and Limits

For each case, write:

```text
case:          what risk it covers that tests do not
drive:         the entry point and input, on the declared target
observe:       where the outcome is seen
passes when:   the observation matches the reference
target:        build or version, configuration, client
unverified:    what this case leaves open
```

Then test the passing condition against a wrong implementation: if the router wrote to the focused pane, would this case still pass? If yes, the condition watches a proxy.

Complete when: the reference is declared exactly or returned as a gap; every core outcome has a case that observes the outcome rather than a proxy; the acknowledgement and wrong-target cases exist wherever they apply; and every case has a passing condition a wrong implementation would fail, with its target identity and limits.
