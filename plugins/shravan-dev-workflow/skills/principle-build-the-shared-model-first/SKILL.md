---
name: principle-build-the-shared-model-first
description: "Use when about to build on someone else's picture (a request, a spec, a resumed plan, another agent's handback), or when agreement on something complex comes too fast. Form your own picture, restate it specifically enough to be corrected, and settle the gaps before building."
disable-model-invocation: true
---

# Build the Shared Model First

Before there is a plan, before there is code, there is a mental model: a shared picture of how the thing works and why. Two people can agree on the same words and hold different pictures. You see a data pipeline; they see a state machine. That difference surfaces later as rework, at the most expensive moment. Building the shared model means each side forms its own understanding and then compares notes. The value isn't in agreement; it's in the gap between the two pictures, because the gap is exactly what neither side has thought through yet. If you are always in sync, one of you isn't thinking hard enough.

## How to think it through

**Form your own picture first,** from the request and the code, before echoing anyone's: the parts, how they connect, what is in and out, and the one assumption everything leans on.

**Restate it in your own words, specific enough to be wrong.** "The importer runs nightly and owns deduplication" can be corrected; "we'll handle imports robustly" can only be nodded at. Echoing the other person's words hides the difference, because the same words can carry both pictures. Say where to correct you: which line, if wrong, changes the design.

**Put the strongest other reading next to yours.** When a term or a requirement could mean two things, show both and what each would lead to. "You see a pipeline, I see a state machine" tells you something: maybe the design needs entities with a lifecycle that move through stages.

**Separate what you can find out from what only the owner can decide.** Settle discoverable questions yourself from the code, the docs, and the history. Bring the owner only the decisions the evidence can't settle, with your current read attached: "I'll check how the sidebar stores sessions myself; whether picking a workspace should filter that shared sidebar is your call."

**Say your assumptions about what nobody discussed.** The gaps that hurt most are the ones neither side mentioned. Name the assumption you are making to fill one and ask: "We haven't discussed what happens when this fails. I'm assuming it retries with backoff; same assumption?"

**Test the pictures on one concrete case.** Pick a specific situation where the two pictures might disagree (what happens when someone edits on two devices at once? when the import has a row with no email?) and walk it through both. A concrete case exposes a split that agreeing on general statements hides.

**Check it against the newest word of intent.** A later correction outranks an earlier spec or plan. When resuming work from documents, list what has been corrected since they were written: "The saved plan has the client pull state, but you later decided changes are pushed, so I'm planning from push."

**Confirmation has to be explicit.** Silence, "sounds good", or your own restatement repeated back don't confirm a picture; a specific answer to a specific question does. When several gaps are open, settle first the one whose answer changes the most.

**Know the signals to stop and restate:** agreement that arrives instantly on something complex; the same correction twice; "that would be confusing" or "that's not what I meant"; your surprise at someone's reaction; a spec that keeps growing; research chasing a question nobody asked. Drift goes the other way too: don't quietly narrow the problem to fit an answer you already have.

**The hard call is when to stop.** Restate where a wrong picture would cost real work: before a design, before a long build, when resuming. Once the picture is confirmed and nothing has changed, build.

## Example: the stale plan

An agent resumes a long task from a written spec and plan. Since they were written, the owner corrected two decisions in conversation. The agent treats the documents as the authority and builds a day of code and tests against the old contract. Better: before resuming, restate the goal and the governing decisions in a few lines, list the corrections made since the documents were written, and ask the owner to confirm or correct that list. One short read-back catches both corrections.

IF the case in front of you doesn't match the stale-plan example, or you are checking whether two parties share a picture, load `references/example_scenarios.md` (scenarios, simplest first: "Sounds good"; two meanings of "sync"; the confusing sidebar; pipeline or state machine; research that wandered) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When the model and the question are already agreed and nothing has been corrected or left ambiguous, another restatement adds nothing. A small, bounded fix with a clear outcome needs none.

## Signs you skipped it

- A restatement that repeats the brief's nouns but never says who owns the state or what happens at the disputed step.
- A complex design marked agreed on generic assent ("sounds good"), with no specific decision confirmed.
- Agreement on a complex design while the two pictures still give the same piece of state to different owners.
- A resumed plan that still carries a decision the owner has since changed.
- The same correction arriving twice.
- The owner calling a model confusing after you reported it as agreed and ready to build.

Whether the writing conveys the picture is `principle-write-for-the-reader`. What the code does is `principle-read-ground-truth-first`, which shared intent can't answer. When reality, not another person, contradicts the picture, use `principle-refine-mental-models`.
