---
name: principle-read-ground-truth-first
description: "Use when about to claim what current code, a system, a document, or a source does, or to explain an unexpected behavior. Read the current source and the whole artifact, trace the real path, and keep what you saw apart from what you infer."
disable-model-invocation: true
---

# Read Ground Truth First

**Apply when** you are about to say what current code, a system, a document, or a source does, or to explain an unexpected behavior.

**Rule.** Read the current source before you say what it does: the code the change touches, the whole artifact rather than a fragment or a summary, and the real call path from entry to effect. Keep what you saw apart from what you infer, and say which is which. For an unexpected behavior while the design still holds, reproduce it and trace it to the root cause before fixing. Read in proportion to the claim: what the change touches and its callers, not the whole repository.

**Why.** Memory, names, summaries, and a helper's report are claims about the source, not the source. A design built on "I assume it works like X" carries a hidden guess that surfaces later as rework or an outage. Reading first is cheap; un-building is not.

**The test.**

1. Did you read this source in this session, at its current version?
2. Did you follow the real path, or stop at a function name that suggests what it does?
3. Which parts of your claim are observed, and which inferred?

**Distinct from.**

- `principle-verify-before-accepting` judges whether gathered evidence supports a conclusion; this card gathers the evidence.
- `principle-experiment-before-proposing` creates new evidence by running something; this card reads what exists.
- `principle-fix-the-understanding-first` takes over when what you read contradicts the design's premise, not just a detail.

**Applied means** you name the source you read and the claim it changed or confirmed.

## Worked case

An agent tells the owner the storage library can't read byte ranges, and designs a workaround that downloads whole objects and slices them in memory. The library has a range-read call; one look at its API before making the claim would have removed a whole component and its memory cost. Better: read the library's interface first, then claim, and say "I checked the API" or "I'm assuming, unchecked".

## Overkill

If no claim depends on current behavior, such as formatting text you were given, don't re-read unrelated code. Don't read the whole repository to change one function.
