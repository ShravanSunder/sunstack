# Build the Shared Model First: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## Two meanings of "sync"

**What happened.** One person meant "push my changes up". The other meant "two-way, with the other side's changes shown within a minute". Both said "sync", and a push-only design was half built before the difference showed.

**The move.** Restate the picture specifically enough to be wrong.

**Better.** "When the server changes, your screen shows it within a minute" puts the split on the table before anyone designs. The owner either confirms it or says "no, only uploads".

## The confusing sidebar

**What happened.** A proposal put a workspace list to the left of the repositories, while sessions were filtered by workspace in one place and not in another. The owner: "that would be confusing… let's go over it."

**The move.** When the proposed behavior confuses, revisit the shared model before adjusting the layout.

**Better.** Restate what a workspace is (a composition of repositories) and what the sidebar is for (focusing on one workspace or none). Agree that model first, and the layout follows from it.

## Pipeline or state machine

**What happened.** In a design discussion, one side described the system as stages data flows through. The other described it as entities that move between states.

**The move.** The gap is the information.

**Better.** Put both pictures side by side and ask what each would get wrong. Here the answer was both: entities with an explicit lifecycle, moved by stages that each own one transition.

## "Sounds good"

**What happened.** An agent presented a complex migration plan and the owner replied "sounds good". The agent took that as confirmation of every decision in it.

**The move.** Confirmation has to be explicit.

**Better.** Name the one or two decisions the plan leans on, for example "this assumes we can take the old API offline for an hour; is that true?", and get a specific answer before building.

## Research that wandered

**What happened.** Research meant to answer "which queue library fits" turned into a survey of every messaging architecture, and the spec grew to match.

**The move.** Design drifts too. Say it out loud and reopen the question.

**Better.** "We're answering a bigger question than we were asked. Is the question still which library fits our one producer and two consumers?" The owner narrows it back, or deliberately widens it.
