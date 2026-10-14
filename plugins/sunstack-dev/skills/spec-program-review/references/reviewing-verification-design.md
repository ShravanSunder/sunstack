# Reviewing a Verification Design

This reference owns `verification-only` mode judgment: whether the planned real-system observations would show the adopted outcome on the declared target, judged against an independent reference, and whether the design names what stays unverified.

Return: the reference, surface, observation and feasibility judgment, with the unverified limits named.

MUST load `../../../shared-references/requirements-specification-program-design.md` and return whether all five identities are present, resolvable and distinct.

## Walk a Case Against Its Look-Alike

For each case, name the proxy that looks like the outcome (an acknowledgement, an exit code, a log line, a dev build) and ask whether the passing condition would still pass if only the proxy happened. A case that passes on the proxy observes the wrong thing.

```text
Outcome:     the operator's text reaches pane B in the delivered app.
Case:        drive the CLI send command; pass when the IPC reply is ok.
Look-alike:  the router replies ok before any write; a focus-routing router replies the same.
Finding:     the case observes an acknowledgement. Observe pane B's and pane A's visible
             input on the installed build, recorded with its build identity.
```

## What to Inspect

- the core outcome is stated where the user or calling program meets it;
- the declared reference is independent of the implementation and named exactly (version, data set, worked example); a model's judgment of the output is not a reference;
- the existing route was inspected from its source: launch, health, drive, evidence and cleanup, with what each exercises; offline preparation is not presented as live readiness;
- each new real-system run covers a risk cheaper tests cannot reach, and a case may instead name an existing applicable real-path observation on the declared target that already covers it; the risks in view: the delivered build and configuration, startup wiring, the real transport, layout at a real size, durability across a restart, failures driven through the same entry point;
- each passing condition names what is seen, where, against which reference, on which target identity, and would fail for a wrong implementation;
- feasibility gaps are named with their owner: a missing observation point to `program-design`, a missing grant or route to the Lead;
- reuse of a permanent journey names its actual applicable run on the declared target, configuration and client, what it depends on, and what would require running it again; without such a run the observation stays owed;
- planned observations are listed as owed at delivery, never as observed;
- limits are named: platforms not tried, stand-ins still in place, cases needing access nobody has.

Use the pretend Verifier on the delivered target: could they run these cases and judge each one without choosing the reference, the target, the observation point or the passing condition themselves? A required choice is a readiness failure.

Good: every case observes the outcome on a recorded target against a named reference, and the limits are explicit.

Bad: an IPC reply as arrival; a doctor command as readiness; a dev build standing in for the release; "verified by the model"; a reused journey with no reason it still applies; a planned run described as passed.

Route Verification Design corrections to `verification-design`; a missing obligation or reference meaning to `spec-design`; a missing observation point to `program-design`; a scenario a test should hold to `test-design`.

Complete when: every case was walked against its look-alike, the reference's independence and the route's real target were checked from source, feasibility gaps have owners, and every planned observation is listed as owed.
