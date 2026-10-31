# Proof and records

This reference owns how a decision model is shown to work: the sets and labels, the comparison, the measures, the probe contract, model versions, the records a run keeps, and what replay can show.

**Expected input:** the model, its current version as the baseline, and the labelled cases or the result to read.

**Return:** the proof plan, or the result's reading:
- the sets and their label source;
- the comparison and its version group;
- the measures, reported apart;
- the records kept;
- whether replay is valid.

**Complete when:** every claim names its version group, its one changed variable and its measures, and every proof the records can't support is named unavailable.

## Sets and labels

- **Labels come first.** Labels come from people or agents independent of the model's author and of any run, collected before the run. A label taken from the model's own answers proves nothing.
- **Each set holds all three kinds:** good, bad and near miss, each case with its source. A set that still lacks a kind after a real search names that gap, and claims nothing about the missing kind.
- **Development cases** are used to refine evidence, questions and policy.
- **Freeze, then held-out.** Freeze the evidence, questions, policy and model record. Then score held-out cases end to end, once, against the current model as the baseline. Held-out cases come from other sources than the development cases; any overlap is named.
- **A held-out miss is reported, never tuned away.** After a correction, cases already scored as held-out become regression cases. A fresh held-out claim needs cases not yet seen.

## The comparison, one variable at a time

On a rebuild, change one thing per comparison, in this order: evidence, then the question, then the policy. For the state, the order is fixed:
1. Repair the attached content, with the questions unchanged.
2. Remove only the irrelevant span, hash and byte metadata.
3. Move the same definitions into named fields (criteria, or a shared reference in the state), adding no exception and removing none. Check the encoded inputs to confirm relocation was the only change.
4. Only then, atomic wording and thresholds.

## Measures, over the full denominator

Count every case: passes, `not_applicable`, uncertain, incomplete and misses, not only issued findings. Report these apart:
- labelled errors and misses;
- coverage (the share decided automatically);
- review and abstention load;
- invalid or unavailable replies (never a semantic no, and never a successful abstention);
- instability across identical repeats.

All-uncertain output can be perfectly stable and still do no automatic work. A small clean screen means "not reproduced here", never "fixed" or "safe".

## The probe contract

A probe is a deliberate experiment on one variable:
1. **Freeze** the state, the instructions, the criteria and their order, the policy, and the independent expected labels.
2. **Inspect the exact encoded request** before any paid run. An evidence listing isn't the request.
3. **Record, for every result,** the requested and returned model version, the raw assessments, and the route and outcome.
4. **Compare identical-byte repeats first,** to measure baseline variation. Never add changing ids or timestamps to a "repeat"; that confounds field sensitivity with sampling variation.
5. **Then change one variable:** a meaning-preserving paraphrase, or the real on-wire option order.
6. **An order claim is admissible only when the bytes sent actually differed.** A source-key shuffle a driver re-sorts proves nothing, and a renamed label is a different experiment. If the provider canonicalizes order, a null result can't prove invariance.
7. **A deliberately inverted instruction-and-criteria pair is a control, rejected locally** before any paid test.
8. **Expected labels come from the standard and independent labelers,** never from whichever wording scores more confidently. A meaning-preserving route flip is a counterexample on that case; a passing pair doesn't establish general stability.

## Model versions

- **On a moving alias** (such as `jev-latest`), every result records the alias requested and the version that answered.
- **A pinned version** is an explicit, recorded override for a run that must hold the version fixed. A requested pin is not proof of the version that answered; the returned version is.
- **Every comparison runs within one resolved version group,** or names the missing comparator. Never average across versions.
- **When the version behind the alias changes,** the policies tuned on the old one are rechecked before anyone relies on them.
- **An edge reported for one model version is a hypothesis for the next,** not a measured result.

## The record a run keeps

Keep full typed assessments and outcomes; raw HTTP bytes aren't required.
- the exact state sent;
- each question's definition (instructions, criteria and their on-wire order), its id, and its assessment with the distribution;
- an invalid or unavailable outcome, as itself;
- the correlation of rule or decision, piece and question;
- the path, route and outcome;
- the policy and config identity applied;
- the requested and resolved model;
- the mechanical inputs, and the selected and eligible piece coverage.

Ids and locations alone can't rebuild a changed input. Name whichever part the record path doesn't keep.

This architecture is our justified synthesis, supported by the cookbooks' caching and rerouting examples, not a delivered persistence API: sufficient state → typed assessments → a retained execution record → pure code policy → a separately observed outcome or effect. A caller that keeps its own records can replay over them without making the engine a dependency.

## What replay can and can't show

- A new threshold or precedence replays over stored assessments only when the questions are the same and the evidence and coverage are frozen.
- New wording, a changed evidence cut, or a piece never asked (because an old gate or selection dropped it) needs fresh assessments.
- Replay over findings alone can't establish full-population rates, because passes and gated pieces are missing.
- Asking the model again resamples; it isn't replay.
- Scores and paths don't establish a downstream effect, which is observed separately.
