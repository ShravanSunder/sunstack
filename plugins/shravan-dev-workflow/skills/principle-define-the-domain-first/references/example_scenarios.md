# Define the Domain First: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## Comments or annotations?

**What happened.** One view called them comments and another called them annotations, and the two had drifted into slightly different behavior.

**The move.** One word, one meaning, everywhere.

**Better.** Call it annotation in the code, the specification, and the interface, and give both views the same annotation model. That turns two half-similar features into one.

## One "account", two meanings

**What happened.** "Account" meant both the billing entity and a person's login. When a family shared one billing plan, permissions leaked between members.

**The move.** Split a word that covers two meanings.

**Better.** A user (who logs in) and a billing account (who pays), with a relationship between them. Permissions attach to users, so the code follows the corrected model.

## Done or just waiting?

**What happened.** A terminal status showed "done" both when a process the system started had finished and when the terminal was simply waiting at a prompt.

**The move.** Two meanings get two states.

**Better.** Separate "the task we started has finished" from "idle at a prompt", each with what moves it there. The interface stops telling users that work is complete when it isn't.

## Reused run ids

**What happened.** An experiment log reused the ids X8 and X9 for different runs on different days. A later comparison joined results from two runs under one id and drew a conclusion from mixed data.

**The move.** Identity: decide what makes two of them the same.

**Better.** A run is a configuration, a date, and an attempt. The id carries that identity, so an id never names a different run, and a re-run gets its own id.

## Cache keys that never hit

**What happened.** A render cache keyed its entries on content plus the generation and revision numbers. Every edit anywhere bumped the revision, so the cache never had a hit.

**The move.** The key must be the real identity of the thing cached.

**Better.** Key on the content itself, a content-addressed identity. The same content hits the cache whatever the revision, and the cache started working.

## Two paths to the same folder

**What happened.** A folder scanner found 91 project families but zero checkouts. The package side built URLs without directory hints, the grouping side rebuilt them with hints, and the comparison threw away every valid match.

**The move.** Compare identities in one canonical form at the boundary where producers and consumers meet.

**Better.** Compare exact canonical path strings. After a restart and rescan: 91 families, 92 checkouts, no duplicates, and the original family ids kept.
