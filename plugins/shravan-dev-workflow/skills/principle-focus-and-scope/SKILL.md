---
name: principle-focus-and-scope
description: "Use when a new request arrives, a design or plan comes back from someone else, or work is about to be called done. State who it is for, the outcome, and what stays out; then check that every owner line is carried, nothing is invented, and nothing is weakened."
disable-model-invocation: true
---

# Focus and Scope

**Apply when** a new request arrives, a design or plan comes back from someone else, or work is about to be called done.

**Rule.** Before shaping a solution, state who it is for, the outcome they should observe, and what stays out. Trace every requirement to something the owner asked for or a constraint that forces it. Then hold the frame: on every handback, check three things.

- Every owner line is carried.
- Nothing was invented: no requirement, gate, or feature that traces to no owner line.
- Nothing was weakened: no "must" turned into "best effort", no exclusion quietly dropped.

**Why.** Scope rarely fails by one big change. It drifts through small additions that each look helpful, and quiet softenings that each look reasonable. Each one costs review, maintenance, and the owner's trust.

**The test.**

1. Can you name who it is for, and the observable outcome, in one sentence each?
2. Does every requirement trace to an owner line or a forcing constraint?
3. Was any owner line dropped, softened, or reinterpreted on the way?

**Distinct from.**

- `principle-shared-mental-model-first` asks whether we mean the same thing; this card asks whether we are building the asked thing.
- `principle-dont-over-engineer` removes mechanisms no outcome needs; this card guards the outcomes and requirements themselves.

**Applied means** you name the line you restored, cut, or raised as a question, and the owner line it traces to (or doesn't); or that every line traces to an owner line, and which handback you checked.

## Worked case

A spec for "show sync status in the toolbar" gains a requirement that the client refuse servers older than version 3, "for safety". Nobody asked for it. The gate is designed into the protocol layer, built, tested, and then blocks a user on an older server. Tracing each requirement to an owner line would have caught it: the version gate traces to nothing, so it becomes a question for the owner ("should old servers be refused?"), not a requirement.

## Overkill

A small, bounded repair with a clear consumer, outcome, and exclusion needs no restated frame. Don't trace every sentence of a two-line fix; trace the lines that would cost real work if they were wrong.
