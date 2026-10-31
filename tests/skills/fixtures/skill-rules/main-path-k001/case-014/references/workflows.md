# Docs Maintain Workflows

## Create

Use when no doc exists for a durable concept.

1. Identify audience and role.
2. Inspect code/config/tests and adjacent docs.
3. Choose the smallest durable artifact.
4. Write current-state facts and decisions, not process history.
5. Add links from `AGENTS.md` or README only if future agents/humans need the pointer.

Good: a runbook that states the current command, what it checks and where its output goes, with one pointer to it from `AGENTS.md`. Bad: a doc that narrates how the feature was built, or restates a fact another doc already owns.

Done when the new doc's facts each trace to the code, config or decision they came from, and any pointer to it exists only where a reader needs it.

## Update

Use when docs exist but are stale or incomplete.

1. Read the existing doc fully enough to understand its contract.
2. Verify important claims against current code/config/tests.
3. Patch only stale sections.
4. Preserve useful historical rationale when it still explains current design.
5. Remove duplicated text if one source should link to another.

Good: the one stale step in a runbook replaced after checking it against the current config, and the rest left as it was. Bad: the whole doc rewritten in a new voice, so nobody can see what was actually stale.

Done when each section you changed agrees with the source you checked it against, and any stale or unverifiable material you left untouched is named as a limitation.

## Cleanup

Use when old specs/plans/docs create confusion.

1. Inventory candidate stale docs.
2. Classify each as current, substrate input, superseded, historical, obsolete, or unknown.
3. Propose purge/archive/rewrite before destructive changes.
4. Preserve useful decisions in the current architecture doc or changelog before removing old context.
5. Leave unknown docs alone and report what evidence is missing.

Good: an old spec marked superseded with a link to what replaced it, after its one still-useful decision moved into the architecture doc. Bad: a folder of old plans deleted because they looked old, losing a decision nothing else records.

Done when each candidate has its class and its proposed action, the decisions worth keeping are moved before anything is removed, and each unknown doc is reported with the evidence it lacks.

## Discrepancy

Use when code, docs, README, AGENTS, tickets, or plans disagree.

1. State the disagreement precisely.
2. Identify which source should drive.
3. If unclear, return the brief from SKILL.md; use `discuss-clarify-mental-models` when the source-of-truth disagreement reflects shared-model drift.
4. Patch the non-driving source.
5. Add a changelog note when the discrepancy taught a durable repo rule.

Good: "The README documents a flag the code removed; the code drives, so the README changes." Bad: both sources edited toward a guess, or code changed to match a stale doc.

Done when the driving source is named with its evidence and the other source now agrees with it, or the unclear driver went to the user as a brief.

## Plans And Specs

Use when maintaining `docs/plans`, `docs/specs`, or `docs/superpowers/*`.

1. Run `wc -l` on the artifact.
2. Read the full artifact before judging status.
3. Compare major claims against current code, package layout, branch state, and architecture docs.
4. Mark whether the artifact is executable, design reference, substrate input, superseded, historical, obsolete, or unknown.
5. Update indexes and links so only current artifacts are presented as current.

Good: a plan read end to end, marked superseded, and moved off the index's current list with a link to its successor. Bad: an index that still lists a plan as current because only its title was read.

Done when each artifact read has its status, and the indexes present as current only the artifacts marked current.

## Agent Instructions

Use for `AGENTS.md` or shared agent prompts.

1. Keep changes short and durable.
2. Link out to runbooks for detailed procedure.
3. Avoid session-specific history.
4. Do not add broad behavioral rules unless repeated evidence supports them.
5. If a rule conflicts with another instruction, place the fix next to the conflicting section.
