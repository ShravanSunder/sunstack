---
name: practices-delegation
description: "Use when preparing a bounded agent handoff, launching a helper, correcting its assignment, or checking its result."
---

# Practices: Delegation

One accountable parent owns each result. Delegating hands a helper a bounded piece of your work, never your judgment about the whole: you choose what to hand off, give the helper what it needs, and check what comes back before you rely on it.

## Take the role, form and model from the host

Use the role, form and model already selected for this assignment. IF the selection is still needed and the host provides an agent-management practice, load it and return its selection or capability gap. It owns the selection. Without a host practice, use a native subagent on the host's default model if it meets the assignment's access and history needs, and report that no catalog applied. Report a capability gap if the host cannot meet those needs.

Resolve an exact model id through the host's model map when the session instructions name one; otherwise use the id the host advertises for the current generation. Never pick an older generation or a `-fast` variant without the owner's say. Report an unavailable model or effort instead of substituting one.

## Bound the job

Hand off a piece that can be checked on its own. Name the highest level the helper closes before it hands back, and the check that ends it; when you can't name that check, cut the job smaller.

| Level | Made of | Ending check |
| --- | --- | --- |
| Project | milestones | the owner's definition of done |
| Milestone, such as one PR | tasks | the plan's proof, then review |
| Task | subtasks | the assigned acceptance check |
| Subtask | edits or prescribed commands | the expected result |

Keep tightly coupled edits with yourself. Independent pieces may run at the same time within host limits. Two jobs that write the same files or reset the same state need separate fixtures and output paths, or an order.

## Brief the helper

When the host's workflow defines a call shape for its roles, send that shape. Otherwise the brief carries:

- the goal and what done means;
- the sources to read, by path or link;
- what it may write or run, and what stays out;
- isolation or ordering against other running jobs;
- when to stop and ask you, and where to report.

A brief points into its sources instead of retelling them. A helper that finds a missing input returns it before doing work that depends on it.

## Launch, continue and wait

MUST load `references/execution-forms.md` and return the route, lifecycle and history boundary for this helper, with the identities you will keep. It owns the two forms (a native subagent, or a separate session through agent-router) and the provider guide for each host. If preflight called this practice to check a route, return the checked route or gap to preflight. IF about to launch dependent work with several helpers and their readiness is unchecked, load `practices-preflight` and return readiness or the exact gaps.

## Check the result

Open the decisive changes and evidence yourself, match them to the job and the target it ran against, and return any unsupported claim as a gap ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). A helper finishing never closes your work: you integrate its result and prove or assess the combined outcome. Proof that goes with your own changes stays yours.

When a helper that could write or publish ends or goes silent without handing back, list what it may already have changed, with the source you checked for each, before you resume, replace or re-run its job ([design for failure](../principle-design-for-failure/SKILL.md)).

## Completion

Each helper had a bounded job with its ending check, a supported route and model or a named gap, and a result you opened and integrated, or a gap carried to its owner.
