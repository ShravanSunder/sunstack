# Restore the design baseline; compose v2 in HTML

Behavior-changing update, based on user-directed intent on 2026-11-10. The owner asks to copy only the four original design skills from before PR #205 into v1 and v2, then change v2 to use presentation-html with normal Demistify components, excluding the purpose-built requirements/specification/verification viewers and retaining call stacks. The owner explicitly authorizes this narrow exception to the frozen v1 archive.

The reusable behavior is to author complete engineering designs whose presentation explains the subject rather than requiring a specialized document viewer.

Success: v1 contains the historical four-phase baseline, necessary install-path repairs, the design-caller artifact updates required to consume its Markdown contract, and the narrow maintained-base legacy-source renderer condition; v2 preserves that engineering guidance while producing freely composed HTML through presentation-html and selecting documented components for real reader questions. HTML owns v2 design text; separate Markdown design sources are not restored in v2.

Sources: PR #205, commit 9d2fafb1cb230f527ce43d085a047f527ebbea11; its parent b37419ca08dcde11bb8c72b810a4e91afec345f9 (sunstack-dev 2.107.1); current base 8dc437602af130173ebf2d7350f9228b72a4388d (merged PR #208). Current Demistify RequirementsIsland, CallStackIsland, mount-reader, collection-model, design-markup and design-collection were inspected: call stacks still require their documented prepared collection and a need record; retaining that component cannot truthfully promise a record-free or independently scoped replacement API.

Consumers: a Lead authoring settled Requirements/Specification, structural design or planned verification, and independent design review. Their existing triggers and engineering meanings remain.

Non-goals: management/roles, wholesale PR revert, changing the v1/v2 split, library component removal or new APIs, new Map implementation, another presentation experiment, activation/install, deployment, merge. The authorized v1 design-caller changes repair artifact expectations only; management, roles and topology are preserved. No claim of improved token use or reliability is made.

Owner clarification, 2026-11-10: v1 is the old Markdown design baseline, before the new requirement components. The owner approved necessary v1 design-caller artifact-contract updates. V2 retains HTML choices and open discussions, with worked examples grounded in existing Router pages; the specialized requirement viewers are excluded, while call stacks remain. Deliver two independent PRs, with the v1 restoration reviewable/releasable first.

The independently releasable v1 PR includes only the narrow shared-renderer caller compatibility correction required to preserve Markdown authority; the v2 presentation redesign remains in the second PR.
