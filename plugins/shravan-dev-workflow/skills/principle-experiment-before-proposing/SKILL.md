---
name: principle-experiment-before-proposing
description: "Use when running something would settle a question faster than arguing about it: an unknown API behavior, a performance claim, whether an approach works, how a prompt or classifier performs. Fit the rigor to the question and measure the real artifact."
disable-model-invocation: true
---

# Experiment Before Proposing

**Apply when** running something would settle a question faster than arguing about it: an unknown API behavior, a performance claim, whether an approach works at all, how a prompt or classifier performs.

**Rule.** Write the hypothesis, and the result that would change your mind, before running. Then fit the rigor to the question:

- a spike answers one concrete unknown, timeboxed and thrown away;
- a measurement names its workload and its comparator (before vs after, A vs B), and measures the real artifact;
- an evaluation of a prompt or classifier needs labeled cases and a baseline.

Make the smallest change that tests the hypothesis.

**Why.** Arguments about how something behaves are cheap to start and expensive to finish; a ten-minute run ends them. An unmeasured speed claim, or an evaluation with no baseline, decides by impression and is often wrong.

**The test.**

1. What result would change the decision, written down before running?
2. For a measurement: what workload, compared with what?
3. Are you measuring the real artifact, or a proxy such as a micro-benchmark or a mock?

**Distinct from.**

- `principle-read-ground-truth-first` reads evidence that already exists; this card creates new evidence.
- `principle-name-the-tradeoffs` takes over when both options already satisfy the evidence and the question is which cost to accept; a run won't settle that.

**Applied means** you name the hypothesis, the run and its result, and the decision the result changed or confirmed, with the reason.

## Worked case

A change claims to make startup faster by loading modules lazily, and is about to merge on that claim. Measured on the real app (cold start, ten runs, main against the branch), startup is 40 ms slower: the first request now loads modules one after another. Naming the workload and comparator took a minute, the run took five, and the result reversed the decision.

## Overkill

When no uncertain claim or measurable outcome is being decided, a spike, benchmark, or evaluation adds nothing. Don't measure a cost that could not change the decision.
