# Rich explanation from the source

Update presentation-html in sunstack-dev, scoped behavior change. Basis: user-directed intent plus an observed example, not a proved causal delta. Owner explicitly says HTML should not favor prose, asks why the rule exists, requests a few more fresh Terra experiments including direct Demistify guidance, and asks for a separate PR. PR211 is already merged and remains outside this change.

Success: choose the representation that makes the reader's actual task and source relationships understandable, using rich Demistify parts where they carry meaning. Avoid both prose-first early exit and decorative/component-count requirements. Preserve simple explanations, source truth, unknowns, carried content, component API ownership, delivery and validation boundaries. Do not encode the D2 project's names, diagrams or fixes into the generic skill.

Evidence: git blame and pickaxe trace the prose-default/first-match chooser to commit6c4809f6 (PR155, October22), originally introduced on its branch at7442f320. A fresh Terra medium read full merged work-log and HTML instructions for804 real Router log rows and produced a text-heavy page, one Trace and one table, no diagram attempt or diagram-guide read. This establishes the observed choice, not the agent's private cause. Source and original page remain preserved.

Non-goals: changing logging or explicit-page authorization; modifying presentation-work-log, frozen v1/v2, shared renderer implementation, installed caches, or old first-pass output. No automatic status/design HTML. Two additional explicitly requested example pages are in scope; no merge authority for the separate PR is inferred from PR211's authorization.
