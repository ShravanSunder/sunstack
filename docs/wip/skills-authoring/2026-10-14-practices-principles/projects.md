# Practices, principles and later extraction — project scopes

Owner decisions recorded 2026-10-14. These scopes supersede the earlier proposal to build on PR #128.

## Project 1: implement useful practice/principle composition

Improve the existing recurring methods and strengthen existing testing and evidence-acceptance principles. A useful call names the decision, its condition, the full teaching to read and the result the method consumes. Link counts, status tables and packaging checks are not teaching effectiveness.

Base: PR #127, `skills/practices-manage-agents`, commit `0bad422c38e4a047e10ae9d7107f182534d5a0af`, plugin `sunstack-dev` 2.76.0. Worktree branch: `skills/practices-principles`. The owner handles merging #127; project 1 does not merge it. Once #127 lands, verify the landed content and make the eventual project 1 PR target main without importing #128.

Deliverable: a reviewed specification, then bounded implementation, fitting proof and an implementation PR. The current request is to save these scopes and design the detailed spec; runtime authoring begins only after spec review. [spec.md](spec.md) owns the 11 named runs and their implementation boundary.

In scope: four `practices-*` skills, the two presentation methods, three existing `ops-*` methods, `principle-write-tests-that-can-fail`, and `principle-verify-before-accepting`. References belonging to those methods may change where this spec names them. Preserve existing role contracts and selected-read semantics from #127. Security keeps its current name in this project.

No new principles, practices, domain leaves or audit names. No role/phase rewrite, Verification Design introduction, orchestrator change, Markdown schema, new schema or global instruction change. Preserve approved user outcomes and useful local teaching; reduce only the precise duplicated instruction replaced by a useful call.

## Project 2: analyze roles and phases and propose the next decomposition

This is the precursor to the earlier branches “new or reclassified methods” and “improve roles and L2 phases.” Its output is an analysis and extraction proposal, not blanket implementation authority.

Read the current roles and active phases; identify what each teaches and consumes. Classify repeated material as general judgment, recurring method, domain knowledge, audit method, tool mechanics or local responsibility. Inspect actual consumers and counterexamples before proposing a move. Repeated names do not establish duplicated teaching; a short role-specific application may be necessary.

For each proposal, show current source, proposed owner, why the move helps, when/how consumers use it, what remains local, gain/cost and a failure with a valid control. Prefer the right existing home; a genuinely distinct method or judgment can warrant a new skill without a universal consumer-count quota. Never extract a phase's governing authorship, admission, result or proof obligations merely because several phases use related words.

Consider `ops-security-review` → `audit-security-review`, preserving explicit scan authority and official tool ownership. Consider caller-selected `domain-<subject>-*` knowledge leaves, with security trust-boundary knowledge as the first candidate. Their mental models and examples must teach, rather than copy packet headings. Project-specific facts, threat models and accepted risks remain project-owned.

Retain role responsibility and boundaries while composing selected practices/audits and principles. Worker/Sidekick remain execution forms; Operator remains a responsibility for prescribed observation/collection. No all-role/all-principle preload, new control plane, authority registry or generic operations umbrella.

Output: source-backed proposals in the existing explainer and a reviewed future scope. Implementation, renames and migrations are separately admitted after that design. [The analysis brief](../2026-10-14-role-phase-extraction/brief.md) preserves this boundary and the initial questions.

## Closed reference and precedence

PR #128 was closed on the owner's instruction. Its `skills/design-family-rebuild` branch at `ffe309643aa90d48563e8b2026aa1ead29743885` remains reference only. Its schema, five-document phase and orchestration changes are not a project 1 base or adopted design. In particular, Verification Design needs fresh judgment under project 2; previous source review is not owner acceptance.

The earlier composition HTML contains proposals from an #128 source snapshot. Its teaching examples are discovery material; reread any selected target at the #127 baseline before authoring. The ten extraction candidates are not all project 1 requirements.

Scope precedence: latest owner correction → these project scopes → project 1's reviewed spec. Preserve a dated superseding decision if the owner changes either scope; do not silently rewrite the old instruction into a new one.

## 2026-10-14 owner decision: promote roles to model-invocable skills

The owner chose seven standalone role skills and stated that `practices-manage-agents` is the mapping/setup owner, including models and how to set up/use helpers. This supersedes the earlier recommendation to keep role references for the long term. A [separate role-promotion spec](../2026-10-14-role-skills/spec.md) defines the named cutover; it needs its own spec review and does not alter project 1's accepted practice/principle design. Deliver project 1 first, then the role promotion dependent on it, because both update management. Broader role/phase extraction and domain/audit proposals remain analysis until separately admitted. The role-promotion spec carries discovery, single teaching owner, models/setup separation, typed literal/pointer cutover and no-Markdown-schema boundaries.
