# Focus 2 description cleanup: specification

Draft 1, by the 🦁 Lead, 2026-10-30. Part two: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

- **C1** None of the fourteen descriptions is over 225 characters; each starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`; each names situations, not the skill's workflow; each keeps every loading moment in the skill design's table and its adjacent-skill boundary (`Not for ...`, with the neighbour named where it is named today). A moment that can't fit goes back to the Lead before commit. One Lead-accepted exception: `verification-design` names `practices-verification-maintenance` by its activity ("building journeys") rather than its name, because both names with every moment need 246 characters; the confusable neighbour `practices-verification` stays named.
- **C2** Only the `description` line of each of the fourteen `SKILL.md` files changes. No body, reference, frontmatter key, name, route token or call changes.
- **C3** Shipped text stays general: no repository command, machine path, run, session or pull request number added.
- **C4** After the change, a run of the twelve rules over the fourteen skills, complete with no skipped rule, gives 0 errors and no description warning. Every remaining description-rule outcome has its disposition. The run is recorded with its usage and identities and attributed by its own scope. The body findings stay as the baseline recorded them.
