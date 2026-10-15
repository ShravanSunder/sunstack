# Rationale Reconstruction

You arrive with the named target and question, the lineage anchors from step 2 and the checked evidence research returned. Turn them into a chronology of how the target got its shape and what each recorded reason amounts to. Return the supported chronology, selected and rejected alternatives, recorded reasons, adoption evidence, counterevidence and exact unknowns for the question.

## Chronology

For each event, record the date, the author, the anchor, and what it changed or said. Start at the earliest event the question needs and walk forward to the current code. The present shape is often several decisions stacked on one another, so the most recent change is rarely the whole story. A retry count introduced as 3 and later raised to 5 has two reasons, and the question may be about either.

Good: "`a1b2c3` (2024-03) adds the retry loop with 3 attempts, message 'retry on 503 from billing'. `d4e5f6` (2025-01) raises it to 5 and links OPS-88, which reports timeouts during the billing provider's maintenance windows."

Bad: "The retries were added in `d4e5f6` to handle maintenance windows." That reads the latest change as the origin and loses the first reason.

## Introduction versus last touch

Reformatting, renames, moves, lint fixes, dependency bumps and broad refactors often sit between the commit blame names and the commit that matters. Open the last-touch diff. If it only moved or reformatted the line, keep going back. `git blame <commit>^ -- <path>` continues from the parent, `git log -S '<literal>'` finds when a string or number appeared or vanished, `git log -L :<function>:<path>` follows one function, `--follow` crosses a file rename, and `git blame -C` finds lines moved from another file. The introduction is the commit where the behavior first exists in the form the question asks about.

An initial import, a squash merge that folded many commits into one, a vendored or generated file, or history copied from another repository ends the trail early, because the earlier record lives elsewhere or nowhere. Name the limit and where the earlier history might be, such as the source repository, the squashed PR's own commits on the host, or the generator's input.

## Proposed, decided, looked back on

Classify each source by what it does. A proposal suggests a change (an issue, a draft design doc, a review comment, an open RFC). A decision adopts one (a decision record marked accepted, a merged change whose own context expressly adopts the option, or the deciding person agreeing in context). A later account looks back (a retrospective, a wiki page written afterwards, or an answer someone gives you today). A contemporaneous source shows the reasoning at the time. A later account shows how someone remembers or reframes it, and a rewritten rationale doesn't replace the original.

Adoption needs its own evidence, and a proposal's author, its persuasiveness or code that happens to resemble it supplies none. A merge or a diff shows which implementation landed. A particular reason counts as adopted when the decision context you opened supports that reason, such as a PR or discussion that expressly adopts the proposal, an accepted decision record, or the committing change's own explanation written at the time. A link is a pointer to open and is never enough by itself, and a proposal linked as background or turned down stays background or rejected. Without such support, the proposed reason stays proposed and the motive behind the merge stays unknown. Whether a stated reason was true, or the only forcing cause, is the separate question step 5 weighs. Two proposals can describe the same cache, one for speed and one for outage isolation. When the merged PR states that it adds the cache for isolation, isolation is the adopted reason and speed stays a proposed one, whichever proposals the PR links. A message can carry text pasted from another person or from an agent, and that text is its writer's, whoever sent the message. A PR description can also promise more than its diff does. When the two disagree, the diff shows what was done and the description shows what was said.

Report an alternative as considered only when the record shows it was weighed, and as rejected only when the record shows it was turned down, with the stated reason when there is one. When the record shows no alternatives, say none are recorded. Leave out options the record doesn't mention, even ones you would have weighed.

## Conflicts

When two records disagree, keep both with their anchors. First check whether both can be true. A commit that calls a check a temporary workaround and a later doc that calls the same check permanent can both hold if the workaround was later kept on purpose. Then check dates and links. A later decision can supersede an earlier one, and a PR that links a ticket ties them together where a ticket that is merely close in time doesn't. When the record can't settle which holds, report the conflict as open, with what would settle it.

## Absent context

Research's coverage already holds what was searched and found nothing. For a gap in the history, add the people who might know, such as the introducing author, the reviewer or the ticket's reporter. Silence in the record doesn't show a concern was absent. Nobody mentioning security leaves security as a possible reason, unconfirmed either way.

## Whether an old constraint still applies

A recorded constraint (a library bug, an upstream limit, a customer contract, the load at the time) describes the world when it was written. Before you say it still applies, check the current state. Look at the dependency version the lockfile pins, whether the upstream limit is still documented, whether the contract or customer still exists, and what the load is now. Report each constraint the question depends on as still holding, no longer holding, or not established. Give the anchor for the first two and the check that would settle the third. Age alone doesn't retire a constraint, and its continued presence in the code doesn't confirm it.

Good: "The workaround cites a parser bug fixed in 2.4 (upstream issue linked in `d4e5f6`). The lockfile pins 2.6, so the original reason no longer holds. Whether anything else now depends on the workaround is not established."

Bad: "This workaround is from 2021 and is probably obsolete."

## When to stop

The pass is complete when every event in the chronology has an anchor or a named gap, the introducing change is found or the limit that hides it is named, each recorded reason is marked proposed, adopted or later account with the anchor that shows which, each conflict appears with both sides, and each constraint the question depends on has a current status. Leave out events the question doesn't need.
