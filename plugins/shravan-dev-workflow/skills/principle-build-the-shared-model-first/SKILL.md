---
name: principle-build-the-shared-model-first
description: "Use when about to build on someone else's picture (a request, a spec, a resumed plan, another agent's handback), or when agreement on something complex comes too fast. Restate the picture and what would prove it wrong before building."
disable-model-invocation: true
---

# Build the Shared Model First

**Apply when** you are about to build on someone else's picture: a request, a spec, a resumed plan, another agent's handback. Also when agreement on something complex arrives too fast.

**Rule.** Before building, restate the picture in your own words:

- the parts, how they connect, and what is in and out;
- the one assumption everything leans on, and what would prove it wrong;
- the strongest other reading, if there is one.

Check the restatement against the newest word of intent: a later correction outranks an earlier spec or plan. Align on the question (what problem, for whom, what success looks like) before the answer.

**Why.** Two people can agree on the same words and hold different pictures. A restatement exposes the gap while it is cheap; code exposes it after work is built on the wrong picture. Agreement is not the goal. The gap is the information.

**The test.**

1. Could the other side correct a specific line of your restatement, or is it so general they can only nod?
2. Did you name the load-bearing assumption and what would break it?
3. Is there a later correction, message, or decision that your picture leaves out?

**Distinct from.**

- `principle-write-for-the-reader` asks whether the writing conveys the picture; this card asks whether you both hold the same picture. When a reader is lost, a read-back tells you which one failed.
- `principle-read-ground-truth-first` settles what the code actually does. Shared intent can't answer that; read the source.

**Applied means** you name what the restatement changed: the split you found and how it was settled, or the assumption you confirmed before building.

## Worked case

An agent resumes a long task from a written spec and plan. Since they were written, the owner corrected two decisions in conversation. The agent treats the documents as the authority and builds a day of code and tests against the old contract. Better: before resuming, restate the goal and the governing decisions in a few lines, list the corrections made since the documents were written, and ask the owner to confirm or correct that list. One short read-back catches both corrections.

## Overkill

When the model and the question are already agreed and nothing has been corrected or left ambiguous, another restatement adds nothing. A small, bounded fix with a clear outcome needs none. Restate where a wrong picture would cost real work, not as a ritual before every step.
