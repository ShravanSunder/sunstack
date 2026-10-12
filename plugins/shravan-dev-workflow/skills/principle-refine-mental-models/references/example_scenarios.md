# Refine Mental Models: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. They run from the simplest to the hardest. Find the one closest to your case and apply its move.

## The same review comment, again

**What happened.** Reviewers asked for the shared parser instead of a hand-rolled one on three pull requests in a row.

**The move.** When a correction keeps coming back, turn it into structure.

**Better.** A lint that bans the hand-rolled pattern and points to the shared parser. The fourth pull request fails the build instead of waiting for a reviewer to notice.

## The backend that wasn't broken

**What happened.** A backend looked like it was failing at startup, and work began on a backend fix.

**The move.** Before attributing a cause, check that the observation is current.

**Better.** A fresh, isolated launch showed the backend healthy. The "failure" was an old browser tab still waiting on stale metadata. The model ("the backend is broken") came from a stale observation, so reproduce in a fresh loop before blaming a component.

## The two sleeps

**What happened.** An intermittent ordering failure in CI got one sleep, then a second, longer one. It still failed now and then.

**The move.** The fixes share a premise. Name it and challenge it.

**Better.** The premise was "the events arrive in order". Inventorying the failures showed they came only when two producers ran together. The fix ordered by a causal signal (an event the second step waits for) and removed both sleeps.

## The fourth refresh

**What happened.** Three fixes for a stale-catalog bug each added a refresh call in a different place, and each failed in a new way.

**The move.** When fixes keep failing, write down the premise they share and attack it.

**Better.** Written down, the three fixes shared one premise: that something in production refreshes the catalog. Reading the call graph showed that nothing does; the catalog was designed to live for one request. The fix was to change the catalog's lifetime, not to add a fourth refresh.

## The cards that taught nothing

**What happened.** A set of skill cards was written to a template that scored well on a rubric: a rule, test questions, neighbour lists, completion lines. The owner read them and said they were mostly bookkeeping that taught nothing.

**The move.** Tell drift from a break.

**Better.** It was a break: the template's assumption, that short rule-plus-checklist cards teach, had failed, and the template was the agent's own inference, not an owner decision. The right move was to stop producing cards from it, say what had been assumed, gather the real sources, and rebuild one card at a time for the owner to read. Patching the template's headings would only have shipped the same failure in a new layout.
