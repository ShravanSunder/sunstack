# Experiment Before Proposing: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## Two layouts, side by side

**What happened.** An agent was about to ask the owner whether a panel should open as a sheet or as a sidebar.

**The move.** If you can observe the answer, prototype it instead of asking.

**Better.** Build both quickly with real content and look at them at the target viewport. Bring the owner the comparison, with screenshots, only if it is still a matter of taste.

## The probe that looked in the wrong place

**What happened.** A team probed a runtime's bindings by reflection, found no transaction API, and started building their own transaction layer.

**The move.** Measure the real artifact, not a proxy.

**Better.** A ten-line script calling the documented transaction API showed it existed. The probe had answered "what does reflection show?", not "can I start a transaction?"

## The hook runtime, warm and cold

**What happened.** A team was choosing a runtime for a hook that runs on every agent stop. Under heavy machine load, the current Python stack measured 111.5 ms warm and 1,464 ms cold; a compiled alternative measured 11.5 ms.

**The move.** Measure the real dependency stack, warm and cold, and note the conditions.

**Better.** Record the machine load next to the numbers and compare rows rather than trusting the absolute values. The cold-start gap, not the warm one, decided it, because the hook usually starts cold.

## The oracle stricter than the contract

**What happened.** A harness for 1,699 items expected exactly 5,097 receipts. Telemetry recorded 10,104, and the run was flagged as possible amplification. The pending count and age stayed low the whole time.

**The move.** Derive the pass condition from the contract.

**Better.** The contract required boundedness and ordering, not an exact lifetime count. Re-render receipts were valid repeated work, not a backlog. The oracle was corrected to check what the contract promises.

## The score that fell when the answer was hidden

**What happened.** A classifier's role score was 0.84. When the answer was masked from the input, it fell to 0.48: the label had been leaking into what the classifier saw.

**The move.** Make sure the answer can't leak into the evaluation.

**Better.** Mask the answer before scoring, and keep the masked score as the real one. The unmasked number measured leakage, not classification.

## The principle that seemed to teach

**What happened.** To decide what a principle needed, a study compared no principle, a short rule, and a rule plus a worked example, using blind scorers and a threshold set in advance. The short rule lifted scores; the example didn't cross the threshold.

**The move.** Read the result for what it measured.

**Better.** The rubric rewarded naming the right things, which a rule-and-checklist principle is good at. It didn't measure whether an agent understood the principle on an unseen case. The owner later found the rule-style principles taught little. Judge teaching by transfer to cases the principle doesn't contain, and keep the result's limits next to the result.
