# Real Surface and Feasibility

This reference owns inspecting the route a project already has for exercising its real system, and judging whether a proposed proof can reach the outcome on it.

Expected inputs: the cases and their outcomes, the declared target, and the repository's existing launch, health, drive, evidence and cleanup code, scripts and documentation.

Return: the inspected route (target, configuration, readiness, drive and observation) and its feasibility gaps.

## Inspect Before Designing

Most projects already have pieces of a verification route. Find each owner and open its source:

```text
launch     how the app or service starts, with which build and configuration
health     how the project decides it is ready
drive      how input reaches the real entry point: CLI, UI automation, API client
evidence   how results are captured: screenshots, logs, traces, files, response bodies
cleanup    what the route creates and removes
```

For each owner, record what its source shows it exercises. A driver that runs against the dev server with a mocked backend does not reach a backend outcome. A launch script that sets a test configuration does not exercise the user's configuration. An evidence step that captures the router's log does not capture the pane.

A document saying a route exists, or a script that imports without error, is a claim. The route reaches the outcome only when its source shows it drives the real entry point and observes the outcome on the declared target.

## Offline Preparation Is Not Live Readiness

```text
Claim:     the app is ready to receive sends.
Weak:      the doctor command passes: config files parse and paths exist.
Missed:    the doctor never starts the app; a crashed daemon or a port conflict still passes.
Live:      the running app answers a real request on its real socket, with its build identity.
```

Readiness belongs to the running system. Preparation checks are useful to diagnose a failed start; they never stand in for the app answering.

## Feasibility Before the Build

Before anything is built, ask whether the proposed proof can reach the outcome at all:

- **Observation point.** Can anything outside the code read the outcome? If no seam exposes pane B's input, no driver can observe arrival. Return a `program-design-gap` for the missing observation point.
- **Target.** Can the route run against the build that will ship, with its configuration? If only a dev build is reachable, name what that leaves unverified.
- **Access.** Does reaching the target need a device, an account, a secret or production access nobody has granted? Name the grant; do not route around it.
- **Reference.** Is the reference available where the observation happens, such as the protocol version the client must speak?

A prebuild challenge reports, for the proposed proof, which of these hold, which block, and the smallest change that would unblock each. It does not build the route.

Complete when: every route owner is inspected from source, with what it exercises; live readiness is distinguished from preparation; and every feasibility gap names the observation point, target, access or reference it lacks, and its owner.
