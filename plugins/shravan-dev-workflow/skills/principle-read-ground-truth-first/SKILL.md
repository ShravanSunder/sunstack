---
name: principle-read-ground-truth-first
description: "Use when about to claim what current code, a system, a document, or a library does, or to explain an unexpected behavior. Read the decisive source and the whole artifact, trace the real path, and label every claim as seen, inferred, or guessed."
disable-model-invocation: true
---

# Read Ground Truth First

Don't start from assumptions; read ground truth first, in proportion to the task. A claim about what code or a system does is only as good as the reading behind it. Memory, function names, summaries, and other agents' reports are claims about the source, not the source, and a stale assumption is just a hidden guess. A design built on "I assume it works like X" carries that guess into the code, where it surfaces later as rework or an outage. Reading first is cheap; un-building is not. So every claim should carry its evidence, or say plainly that it is inferred or a guess.

## How to think it through

**Find the decisive source for the claim.** That means the code the change touches, the whole spec, the library's actual interface, the reference implementation, the logs and traces of the real run. For an open-source library, use its docs or an index to learn where to look, then read the code there. Don't guess a library's API from its name.

**Follow the real path, from entry to effect.** Trace a request or a click from where it enters (the handler, the command, the event) to where the effect happens (the write, the response, the message), through the logs and spans if it's running. Which server handles this? Where is that connection actually made? Don't stop at a function whose name suggests the answer; names describe intent, not behavior.

**Read the whole artifact, not the search hit.** The condition three lines up, the early return, the flag read at startup: these change what the line you found means.

**Keep what you saw apart from what you infer.** Seen means a file and line, a log entry, an output you ran. Everything else is inferred or guessed, and you say which when you report. A cause you haven't observed is a guess, however likely it seems.

**For a surprising behavior, reproduce it before you fix it.** Then ask why until you reach the root cause, and add logging rather than guessing when you're stuck. When you find the cause, look for the same pattern elsewhere. Don't add a guard that only silences the symptom. When something "fails after a restart", suspect stale persistent state (a cache, a lock file, saved state) before the code. And "works after a restart" hides a cause too; find out what changed.

**Check that "it's there" means "it's wired", and that it's what's running.** A dependency in the manifest, a plugin in the config, or a flag in the docs doesn't prove the code path uses it; look for the call. For a claim about running behavior, check what is actually deployed and loaded (the installed version, the pinned package, the config the process read), because a fix on the main branch is not evidence about production.

**A failed read is about your access until you've checked the instrument.** A request that fails from inside a sandbox, without credentials, or from the wrong network tells you that you couldn't reach the thing, not that the thing is down. Check your access and permissions before reporting an outage or rerunning work.

**Read in proportion.** Read what the claim depends on: the touched code, its callers, the contract it relies on. Not the whole repository.

**The hard call is when a summary is good enough.** For a claim that matters, it isn't: the agent making the claim inspects the decisive source itself, at its current version. A doc, a helper's report, or your own memory is a lead that tells you where to read, not evidence. When you couldn't verify something, say so and say where you looked.

## Example: the missing range read

An agent told the owner the storage library can't read byte ranges, and designed a workaround that downloads whole objects and slices them in memory. The library has a range-read call. One look at its interface before making the claim would have removed a whole component and its memory cost. Better: read the library's interface first, then claim, and say "I checked the API" or "I'm assuming this, unchecked".

IF the case in front of you doesn't match the range-read example, or you are checking the evidence behind someone else's claim about the system, load `references/example_scenarios.md` and return the closest scenario and how its move applies to your case.

## When it doesn't apply

If no claim depends on current behavior, such as formatting text you were given, don't go re-reading unrelated code. Don't read the whole repository to change one function.

## Signs you skipped it

- "It should", "I believe", "presumably" about current behavior.
- A claim with no file, line, log, or output behind it.
- A doc cited that is older than the code it describes.
- A fix applied before the bug was reproduced, or a guard that silences a crash.
- "It's integrated" with no look at where it's called.

Judging whether gathered evidence supports a conclusion is `principle-verify-before-accepting`. Creating new evidence by running something is `principle-experiment-before-proposing`. When what you read contradicts the design's premise, not just a detail, use `principle-refine-mental-models`.
