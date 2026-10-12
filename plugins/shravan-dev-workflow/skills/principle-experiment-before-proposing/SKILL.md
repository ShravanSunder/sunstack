---
name: principle-experiment-before-proposing
description: "Use when running something would settle a question faster than arguing about it: an unknown API behavior, a performance claim, which of two designs works better, how a prompt or classifier performs. Capture a baseline, fit the rigor to the stakes, and measure the real artifact."
disable-model-invocation: true
---

# Experiment Before Proposing

Many design arguments are really questions about behavior: is this faster, does the API do what we think, does the model handle this case, which of two layouts reads better? When the answer is a fact you could observe by running something, it isn't a question to argue about, and it isn't the owner's to answer. Run it and let the result decide. The skill is fitting the rigor to the question and the stakes, and writing down what result would change your mind before you look. Otherwise you will read the result to fit the plan you already had.

## How to think it through

**Classify the question first.** "Is it faster? Does it work? Which reads better?" are observable, so run them. "Which matters more to our users? What should we promise?" are value calls, so bring those to the owner with whatever evidence you have.

**Write the hypothesis and the deciding result before you run.** For example: "lazy loading makes cold start faster; if it's not at least 10% faster across ten runs, we don't merge it." A result you interpret after seeing it isn't a test.

**Capture the baseline before changing anything.** Measure the current behavior first, so the check reads as old value against new value. Don't optimize something you haven't measured: "why does this take nine minutes?" has an answer, and it comes before the fix.

**Fit the form to the question:**
- **A spike** answers one concrete unknown. Timebox it and throw the code away.
- **Competing prototypes** settle a design that isn't obvious. Build two or three that are genuinely different and compare them side by side; a second flavor of the first shape doesn't count.
- **A measurement** names its workload (real data at a representative size), its comparator (before against after, A against B), enough repetitions to see past noise, and the conditions it ran under (warm and cold where startup matters, machine load), so rows are compared rather than absolute numbers trusted.
- **An evaluation** of a prompt, classifier, or skill needs labeled cases including the hard ones, a baseline to beat, a threshold set before running, blind scoring wherever judgment is involved, and inputs that can't leak the answer.

**Measure the real artifact through the real path:** the actual data, the actual entry point, the actual surface. A micro-benchmark, a mock, or a probe can answer a different question from the one you have. Include a negative control where you can: something the instrument should show as unchanged (a static background, an untouched path). If the control moves too, the instrument is measuring noise.

**An experiment is an action, so run it safely.** Use a place where it can't hurt anything: a branch, a sandbox, a test account. If you rely on a dry-run mode, confirm by observation that it really skips the effect. Before a costly or paid run, check that it selects exactly the cases you meant.

**Change one thing per run, and keep a loop.** Make the smallest change that tests the hypothesis, check it, keep it if it advanced and revert it if it didn't, then go again. A result you can't attribute to one change settles nothing.

**Read the result honestly.** Variance across runs is a gap, not a pass. A control that comes out the same means no difference was shown, not that the idea is wrong. Check the result against what the contract actually requires; a test oracle stricter than the contract will flag valid behavior as a failure.

**The hard call is how much rigor.** Scale it to the stakes. A one-way door or a big blast radius gets a pinned benchmark, more runs, and blind scoring. A reversible, low-stakes choice gets a quick spike.

## Example: the lazy-loading claim

A change claimed to make startup faster by loading modules lazily, and was about to merge on that claim. Measured on the real app (cold start, ten runs, main against the branch), startup was 40 ms slower: the first request now loaded modules one after another. Naming the workload and comparator took a minute, the run took five, and the result reversed the decision.

IF the case in front of you doesn't match the lazy-loading example, or you are judging someone else's experiment or measurement, load `references/example_scenarios.md` (scenarios, simplest first: two layouts, side by side; the probe that looked in the wrong place; the hook runtime, warm and cold; the oracle stricter than the contract; the score that fell when the answer was hidden; the card that seemed to teach) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When no uncertain claim or measurable outcome is being decided, a spike, benchmark, or evaluation adds nothing. Don't measure a cost that could not change the decision. And a question about what the owner values isn't settled by running anything.

## Signs you skipped it

- "This should be faster", merged unmeasured.
- A benchmark of a different workload than users run, or a single run reported as a result.
- An evaluation with no baseline, or a threshold chosen after seeing the numbers.
- Asking the owner a question a ten-minute run could answer.
- A result reinterpreted after it came back.

Reading evidence that already exists is `principle-read-ground-truth-first`. When both options already satisfy the evidence and the question is which cost to accept, use `principle-name-the-tradeoffs`.
