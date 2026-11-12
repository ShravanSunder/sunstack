# Sunstack Engineering Base

Install from the Sunstack marketplace: `/plugin install sunstack-dev@sunstack`.

`sunstack-dev` 3.2.0 contains 43 maintained engineering skills. The 23 legacy roles and workflow phases live in [sunstack-workflow-v1](../sunstack-workflow-v1/README.md), an independently versioned frozen archive.

## Boundary

The base owns engineering practices, principles, language standards, discussion, presentation, debugging, documentation, audits and operations. It does not own the archived role or phase files. This is a packaging split, not a new topology.

Some retained helper-delegation branches still call `sunstack-workflow-v1:practices-manage-agents`; those branches require the archive to be installed too. The retained design-documents and phase-return-tokens references preserve the owner-approved migration scope. Removing those dependencies is separate future work.

## v1 compatibility anchor

Frozen v1 resolves base files by locating the advertised `sunstack-dev:presentation-html` skill and taking its plugin root. Keep that advertised entry and the `skills/<name>/` and `shared-references/` layouts available while v1 depends on them. Renaming or removing them is a v1 compatibility change requiring explicit owner direction. Hidden principles and domains are read beneath that root, without assuming they appear in the host catalog.

## Design source modes

V1 retains authoritative Markdown, including newly authored v1 records and optional HTML reading views. The [v2 design sources](../sunstack-workflow-v2/README.md) use four distinct free-form HTML documents, visible capability groups, explained diagrams and shared JSON navigation through [presentation-html](skills/presentation-html/SKILL.md). Its matching Demistify guide owns the API; source-preview support is distinct from published integration. Call-stack data preparation remains conditional on selecting that component. V2 is available through its existing marketplace registration; installing it does not switch the default workflow or select a management topology.

## Namespace map

- [`audit-security-review`](skills/audit-security-review/SKILL.md)
- [`debug-investigation`](skills/debug-investigation/SKILL.md)
- [`discuss-clarify-mental-models`](skills/discuss-clarify-mental-models/SKILL.md)
- [`discuss-pathfinding`](skills/discuss-pathfinding/SKILL.md)
- [`docs-maintain`](skills/docs-maintain/SKILL.md)
- [`domain-code-standards`](skills/domain-code-standards/SKILL.md)
- [`domain-python`](skills/domain-python/SKILL.md)
- [`domain-rust`](skills/domain-rust/SKILL.md)
- [`domain-swift`](skills/domain-swift/SKILL.md)
- [`domain-typescript`](skills/domain-typescript/SKILL.md)
- [`ops-linear-tracking`](skills/ops-linear-tracking/SKILL.md)
- [`ops-observability-stack`](skills/ops-observability-stack/SKILL.md)
- [`practices-cleanup`](skills/practices-cleanup/SKILL.md)
- [`practices-collaboration`](skills/practices-collaboration/SKILL.md)
- [`practices-how`](skills/practices-how/SKILL.md)
- [`practices-preflight`](skills/practices-preflight/SKILL.md)
- [`practices-research`](skills/practices-research/SKILL.md)
- [`practices-retrospective`](skills/practices-retrospective/SKILL.md)
- [`practices-show-me-your-work`](skills/practices-show-me-your-work/SKILL.md)
- [`practices-verification`](skills/practices-verification/SKILL.md)
- [`practices-verification-maintenance`](skills/practices-verification-maintenance/SKILL.md)
- [`practices-why`](skills/practices-why/SKILL.md)
- [`presentation-html`](skills/presentation-html/SKILL.md)
- [`presentation-show-worklog`](skills/presentation-show-worklog/SKILL.md)
- [`presentation-tui`](skills/presentation-tui/SKILL.md)
- [`presentation-webui`](skills/presentation-webui/SKILL.md)
- [`principle-build-the-shared-model-first`](skills/principle-build-the-shared-model-first/SKILL.md)
- [`principle-define-the-domain-first`](skills/principle-define-the-domain-first/SKILL.md)
- [`principle-design-for-concurrency`](skills/principle-design-for-concurrency/SKILL.md)
- [`principle-design-for-failure`](skills/principle-design-for-failure/SKILL.md)
- [`principle-experiment-before-proposing`](skills/principle-experiment-before-proposing/SKILL.md)
- [`principle-hold-the-scope`](skills/principle-hold-the-scope/SKILL.md)
- [`principle-justify-the-complexity`](skills/principle-justify-the-complexity/SKILL.md)
- [`principle-name-the-tradeoffs`](skills/principle-name-the-tradeoffs/SKILL.md)
- [`principle-one-owner-per-truth`](skills/principle-one-owner-per-truth/SKILL.md)
- [`principle-prove-it-works`](skills/principle-prove-it-works/SKILL.md)
- [`principle-read-ground-truth-first`](skills/principle-read-ground-truth-first/SKILL.md)
- [`principle-refine-mental-models`](skills/principle-refine-mental-models/SKILL.md)
- [`principle-separate-the-concerns`](skills/principle-separate-the-concerns/SKILL.md)
- [`principle-types-are-communication`](skills/principle-types-are-communication/SKILL.md)
- [`principle-verify-before-accepting`](skills/principle-verify-before-accepting/SKILL.md)
- [`principle-write-for-the-reader`](skills/principle-write-for-the-reader/SKILL.md)
- [`principle-write-tests-that-can-fail`](skills/principle-write-tests-that-can-fail/SKILL.md)

## Tracking and requested pages

`practices-show-me-your-work` tracks and resumes the log without creating HTML. Only an explicit owner request invokes `presentation-show-worklog` to create or refresh a page; subsequent checkpoints do not refresh it. The requested page uses four headings, free-form explanation and useful diagrams through `presentation-html`.

## Shared references

Four presentation references belong only to base. Six references remain here and have frozen v1 copies: diagram-rendering-and-fallbacks, humanizer, owner-decision-brief, design-documents, canonical-implementation-plan and phase-return-tokens. Editing a base original does not synchronize the archive.

The [combined phase composition map](docs/phase-composition.md) is a maintained source view of both packages, not a runtime instruction.
