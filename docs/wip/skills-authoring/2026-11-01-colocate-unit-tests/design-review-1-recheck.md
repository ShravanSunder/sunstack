# Design review 1: correction recheck

**Verdict: accepted-to-implement for the commissioned design boundary. F1 and F2 are closed.** The single-reviewer limit remains explicit; this does not claim the usual two-reviewer stage coverage or implementation proof.

review target: the corrected places in the design set at `24eea1b308bb43ecc9108c4fad3a994881b081de` on `skills/colocate-unit-tests`, following revision 3 at `0893ae57`. This is a continuation of [design-review-1.md](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/design-review-1.md), not a fresh broad review.

Requester: 🦁 Lead `claude-local/68844339-00d7-476c-910a-24cba89d8758`. Reviewer: 🔎 Reviewer Sidekick `codex-local/01a196d6-e5db-7713-b95e-51b150b843fa`, independent of the design's authorship. Governing inputs are the recheck commission `01a196e5-0517-7ca3-b579-a4dfd22c067e`, the explicit any-module-change ruling `01a196e6-252c-7ff1-b8b9-9d98bec56a0a`, and the aligned-head notification `01a196e7-e5bf-77b3-8e8a-34dfbce79c50`. The latter two settle the semantic expansion before this closure.

## Finding disposition

| Finding | State | Reopened evidence and result |
| --- | --- | --- |
| F1: proof passes a write before the required owner decision | **Closed under superseding D7a** | [Specification standard 5](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/specification.md:18) now asks only when repository instructions or checks require a different layout. The revised [oracle](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-verification.md:26) establishes that its fixture has no such requirement, passes a new colocated test without asking, fails copying the old folder, records over-asking separately and calls no action unexercised. The [conversion table](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-verification.md:35) keeps missing conversion and overreach visible. This closes consistency with the newly authorized rule; it does not pretend the original ask-before-write requirement was unchanged. |
| F2: helper option contradicts the TypeScript naming prohibition | **Closed** | The proposed [TypeScript helper path](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:33) and [Rust helper path](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:72) now use `tests/support/`. [D6](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:121) records the Lead's naming choice within the owner's open helper-name allowance. Reopening [domain-typescript:119](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/plugins/sunstack-dev/skills/domain-typescript/SKILL.md:119) confirms that production `utils/` stays prohibited without contradicting `tests/support/`. This is an authorized alternative to the original review's suggested exception. |

## Rulings and related corrections

- **One fixed form, one remaining ask:** TypeScript uses `<module>.test.ts`; Rust uses the sibling `<module>_test.rs` and the existing D1 child declaration. Both proposed bodies state the fixed form and ask only for conflicting repository instructions/checks: [TypeScript](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:32), [Rust](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:51), [D7a](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:123). The stale broad ask in [requirements:7](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/requirements.md:7) is corrected.
- **Any module change triggers conversion:** at `0893ae57`, the detailed standard and bodies triggered only on adding/editing unit tests, while the requirements and commission said touching the module. I returned that discrepancy. The Lead explicitly ruled that production edits trigger it too. At `24eea1b3`, [requirements:41](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/requirements.md:41), [standard 4](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/specification.md:17), and both proposed bodies ([TypeScript:35](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:35), [Rust:74](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:74)) agree: editing production code or tests moves only that module's own old-form unit tests. A repository-wide migration remains separate. D1c records the later ruling; D1b remains as history.
- **Page:** the [overview](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/index.source.html:15) carries the any-module-change trigger and narrow ask. A read-only Node comparison at the reviewed head found all four embedded Markdown parts equal to their source files, and the built overview equal to its source after HTML entity decoding. This is source consistency, not rendered UI observation.
- **Single reviewer:** [the review record](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-design.md:148) records the Lead's one-reviewer ruling and explicitly limits coverage to this reviewer's checks. [Verification's remaining gaps](/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests/docs/wip/skills-authoring/2026-11-01-colocate-unit-tests/skill-verification.md:60) also retain it. No second reviewer is claimed.

## Scoped check result

| Check | Status | Coverage |
| --- | --- | --- |
| `rule-agreement` | complete | F1/F2, D7a, conversion-trigger consistency, helper-name consistency, recorded reviewer limit and page/source agreement. No open finding in that boundary. |
| `transfer` | complete | An ordinary different layout still gets the fixed form without asking; explicit repository instructions requiring another layout get a question. A production-only edit now triggers conversion of its own tests; unrelated modules remain outside that conversion. |
| Other stage checks | complete, not selected | Retain review 1's scoped exclusions; no new description, invocation, teaching owner or reference tree change is proposed. This recheck does not claim a second review family. |

I independently reopened the real fixture's `formatAssembledKind` implementation at `74e18127:tests/skills/lib/skill-rules/report.ts:231`. The export formats selection thresholds and shared names. `git grep` found no test reference to that export and no matching threshold/output assertion in `tests/skills/**/*.test.ts`; the existing Vitest `lib/**/*.test.ts` glob includes the colocated destination. The replacement case therefore removes the previously identified duplicate-case problem at the checked source level. No pressure run was executed here.

## Disposition and proof boundary

verdict: `great` for this bounded correction check under the recorded one-reviewer ruling.

blocker overrides: none open in the commissioned recheck. The normal two-reviewer coverage remains a declared exception, not evidence that two reviewers ran.

rubric evidence: the reopened anchors above carry the fixed forms, helper home, conversion scope, narrow conflict question and matching oracle. Page/source equality was independently checked at this head. Review 1's unaffected reasoning remains its prior evidence.

accepted findings: F1 closed under the authorized replacement requirement; F2 closed by the authorized helper-name choice. The conversion-trigger discrepancy and stale summary discovered during this recheck were corrected and reopened before closure. No open accepted finding or unverified finding remains within this recheck's scope.

convergence: original open findings `2 → 0`; neither original finding had been verified closed in an earlier round, so neither is a recurrence. The intermediate conversion mismatch was resolved within this correction check.

highest risk: future proof could overstate a TypeScript placement smoke as evidence of Rust steering or the general reliability of the new rule. Those limits remain explicit in the design.

first required revision: none for the checked boundary.

proof or retest implication: perform the planned fresh baseline/change runs using the revised request and separate placement/conversion readings. The explicit-instruction conflict branch, production-only conversion steering, Rust steering, rendered page behavior and general reliability have not been observed by this source recheck. The reported scratch-crate counts remain attributed, not rerun. `git diff --check 0893ae57..24eea1b3` exited 0; no builds, suites, pressure runs, source edits or commits were performed by this reviewer.

implementation decision: `accepted-to-implement`. This is design closure, not implementation acceptance, PR readiness, release or cache-refresh proof. The original review plus this recheck form the closure record.

Checkpoint: returned to the commissioning Lead through Router, with this uncommitted report as requested. No work-thread reference or posting grant was supplied; the prior no-home/posting gap is unchanged. No stand-ins were used.
