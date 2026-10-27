# Skill Implementation Review

Review one of two targets. For implemented behavior-changing delivery, review after fitting proof and after whoever carries the change has assessed the diff and proof against the accepted design set, and before ship status advances. For an evaluation of existing files, perform the source-only review before any new implementation commission, mark behavior `unverified/deferred`, and authorize no shipping. Mechanical changes and an explicit implementation-review skip do not enter this reference merely to fabricate coverage.

Return a verdict, changed-file coverage, accepted/rejected/unverified findings, smallest edits, targeted retest, and ship decision.

## First Rule Pass

Before any reviewer starts, return `rules: pending` with the per-check statuses: this stage does not yet run the rules on the reviewed files. A pending rule pass is never reported as passed, and a rule is reported as run only when the engine's own report shows that it ran.

## Ordered Checks

The artifact is changed or existing skill files. For a scoped wording change, select the check that owns the targeted failure form and `rule-agreement`, and record all other checks `complete` with `not selected: <reason>`; this holds at implementation review as at design review, and a request for the full review treatment does not widen it to the table row. For an unscoped change, select checks by touched surface:

| Reviewed surface | Check references to load |
| --- | --- |
| `SKILL.md` body | `placement-and-calls`, `steering-strength`, `mental-model-fit`, `no-op-pruning`, `rule-agreement`, `depth-coverage` |
| Reference text | `rule-agreement`, `no-op-pruning`, `placement-and-calls`, `depth-coverage` |
| Frontmatter or description | `trigger-routing` |
| Behavior-proof claim | `claim-vs-evidence` |
| Sensitive surface | `sensitive-surface` |

Whatever the selection above, scoped or by surface, also select `transfer` whenever a reviewed surface states a rule. Each name resolves to `checks/<name>.md`. Deduplicate the selected set. For an evaluation of existing files, use current files as the reviewed surface and read them whole. A `create` run reviews new files. The sensitive-surface term set and its standards are owned by `../../domain-skill-crafting/references/security.md`, and the gate's inspection procedure by `../../skill-design/references/security-gate.md`.

Then split the selected checks across reviewer agents by family, each agent in its own session with no authoring history, each loading `checks/review-schema.md` first and walking its checks in the order listed:

```text
teaching reviewer        mental-model-fit, depth-coverage, steering-strength, no-op-pruning, transfer
structure reviewer       placement-and-calls, rule-agreement, trigger-routing
proof and safety         claim-vs-evidence, sensitive-surface
```

Start only reviewers that have a selected check, and always at least two. Keep the order within each agent so placement and rule agreement see the entire change before the claim comparison.

Each reviewer records `complete | partial | blocked` per check and returns candidate findings with anchors. IF a changed surface adds an output or tool shape, load `../../domain-skill-crafting/references/calls-and-placement.md` and return its shared-shape standards, with the shape's consumers and owner. A reviewer walks its checks itself and starts no further agents. Prescribed proof commands may run under the exact grant; the review lead judges the observations.

## Verdicts

`checks/review-schema.md` owns the verdict labels. Here, `great` means the changed files are sound as they stand. Evaluating a shipped skill, `great` means the skill is sound as it stands, and `reject-or-restart` means the skill has no reusable job and should be retired rather than revised.

## Review Rubric

MUST load `../../domain-skill-crafting/SKILL.md` and return the topics whose conditions hold for the reviewed surfaces, with the standards each returns; the rubric judges the change against them.

Covers what only a whole-change ship decision can judge:

- Every edited, added, or deleted source file is covered. Each file is reviewed semantically, marked source/static-only with its behavior status, or explicitly excluded by the accepted behavior-review boundary; deletions are verified through both absence and pointer inventory.
- The implemented diff matches the accepted design set and user constraints without crossing the accepted source, behavior, or ship boundary.
- For implemented behavior-changing delivery, fitting proof ran against the reviewed current files before this review, and the diff and proof were assessed against the original need, accepted design set, ownership, complexity, and integration before review began. An evaluation of existing files instead preserves the source-only, unverified/deferred behavior boundary above.
- Every added or changed check keeps the root's placement standards on teaching owners, stops and callers.
- IF the change adds or changes an output or tool schema, load `../../domain-skill-crafting/references/calls-and-placement.md` and return its shared-shape standards; each such schema keeps them. Cite the returned standards rather than re-deriving them.
- For a skill that defines review checks, award `great` only when it keeps the root's placement standard on a review schema.
- Check every added or changed term against the reviewed skill's glossary or term definitions, including cases where they stayed unchanged. Award `great` only when each definition in scope keeps the root's placement standards on term meanings.
- Guidance keeps the root's steering standards on positive guidance and prohibitions.
- Each rule keeps the root's placement standards on one home for each meaning and on a change of home.
- Behavior rows in a source-only review are explicitly `unverified/deferred`; source or static review may authorize only the next proof step and cannot authorize ship.
- The four surfaces the root's core names still line up.
- Sensitive surfaces, platform metadata, changelog, and cache decisions are handled when in scope.
- The smallest accepted edit is clear enough to implement without broadening into portfolio audit.

Cover each item with source-backed evidence. When a check result already covers an item, cite it rather than re-deriving it.

## Reduction

The review lead verifies each candidate finding at its anchor against source files, pressure output, and user constraints before accepting it, as `checks/review-schema.md` requires. Reject findings that contradict the current scope, treat length alone as a blocker when the user scoped length out, or ask for broad `skill-audit` work during one-skill authoring. Whoever requested the review retains final disposition.

Accepted findings carry a route to the step that owns them: a design mismatch to the design set and `skill-design`, wording or placement to `skill-creation`, proof honesty to whoever ran the proof, an assessment gap to whoever assessed the change, and a ship surface to shipping.

After accepted edits, rerun the narrowest fitting pressure and static proof that can catch the issue, then require a fresh assessment. The same review lead refreshes affected check coverage while the loop converges under the convergence rule in this skill's `SKILL.md`. End early on `great`. On `not-converging`, the lead stops and brings the user the decision.

At ship, reuse the semantically current review result when its changed-file coverage and proof remain current. Refresh affected coverage only when it is stale.

Complete when: the verdict carries one of the allowed labels, `rules: pending` stands with the per-check statuses, every changed file is accounted for as reviewed, static-only, or out-of-scope, and the ship decision is explicit.
