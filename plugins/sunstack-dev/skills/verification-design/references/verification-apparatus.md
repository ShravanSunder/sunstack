# Verification Apparatus

This reference owns building or repairing an explicitly assigned verification driver when the project's route is missing, broken or cannot reach the required outcome. It applies only to an admitted job whose assignment names the script paths and grants the tools and execution it needs; it grants nothing by itself.

Expected inputs: the assignment with its script paths and tool and execution grants, the declared reference, the outcome and its observation point, and the existing route owners from `real-surface-and-feasibility.md`.

Return: the built or repaired driver's demonstrated capability from reference to observation, the evidence it retained, and its unresolved limits.

## Before Writing Anything

Open the existing launch, health, drive, evidence and cleanup owners. Extending an owner that already starts the app, waits for readiness or captures screenshots is cheaper and keeps one route; a second driver beside it splits the route.

Stop the branch, and report the gap, when any of these is missing: a grant for the paths or commands the driver needs, a declared reference, or an observation point the outcome can be read from. A driver built around a missing observation point observes a proxy.

## Drive the Surface the Way It Expects

Drive through stable handles the surface already exposes: accessibility identifiers, CLI flags, API routes, documented protocol messages. Avoid screen coordinates and log text the product does not promise.

Finish on the surface's real completion signal: the pane's input shows the text, the API returns the resource, the file appears with its expected content. A sleep finishes on machine speed, and a log line finishes on the product's own claim.

Keep the evidence the observation produced (the screenshot, the response body, the file) with the target identity it came from. Clean up only what this run created; leave the user's state and other runs' resources alone.

## Prove the Driver Before Trusting It

A driver is delivered when it has observed the outcome end to end against its declared reference, not when it exists. Run it twice:

- on a known-good case, where it must pass by observing the outcome;
- on a known-bad case, such as a send addressed to a pane the router will not reach, where it must fail and show what it saw.

A driver that passes both cases has not shown it can tell them apart.

```text
Assigned:  extend the UI driver to verify routing.
Found:     the driver can send through IPC and read the IPC reply; it has no handle to read
           a pane's visible input.
Wrong:     report "routing verified" from the IPC reply.
Right:     report that the driver cannot reach the outcome. Return the missing handle as a
           program-design-gap for a pane-input observation point, and keep the IPC check
           as diagnosis only.
```

A script that exists, imports cleanly or passes against a mock has not reached the outcome.

## Where This Method Lives

This method stays here until a separately admitted verification-route practice owns it. When one does, it moves there in one cutover and leaves no copy behind.

Complete when: the driver extends the existing route where it can; it drives stable handles and finishes on the surface's real completion signal; it passed a known-good case and failed a known-bad one against its declared reference; its evidence is kept with the target identity; only run-created resources were cleaned; and every missing grant, reference or observation point is reported as a gap instead of worked around.
