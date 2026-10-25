# presentation-html default-comments teaching — revision 1

Target: only `plugins/sunstack-dev/skills/presentation-html/` in sunstack. Classification: update, behavior-changing, user-directed intent. Run status: implemented. This is separate from the Demistify API-guide run.

## Promise and success

An agent creating/revising an explainer follows the matching library guide: at a binding documenting default Comments, ordinary pages need no manual feedback tag, document metadata or paragraph labels. Choice controls remain task-driven; feedback availability does not make prose into questions or produce another Copy bar. At older bindings the agent preserves the matching older contract rather than assuming a newer feature exists.

## Basis and decisions

Owner explicitly requested presentation-html update in the October 25 default-comments relay. Current main/ref text says feedback must be requested before adding Comments, and options-and-decisions.md says a choice needs no Comments surface unless requested; patterns.md says omit feedback without request. Those opt-in instructions must align with new runtime default, while preserving version/binding authority. This is changed product intent, not a faithful reproduced agent failure.

| Default | Rationale |
| --- | --- |
| Trigger and invocation unchanged | Same task and neighbor boundaries |
| Main path states normal default after binding pass, conditioned on matching guide | Every author needs the default; avoids making source-preview behavior a claim about deployed1.13 |
| Keep conditional feedback/detail reference loading | Exact API belongs to product guide; no duplicated schema or new metadata recipe |
| Adjust existing options and patterns references | Remove contradicting opt-in advice at their owning homes |
| Preserve explicit opt-out/custom metadata only as guide-driven choices | No invented attributes for older releases |

## Surfaces and route

Main path: one short default-Comments instruction near Bind/Compose; chooser row refers to existing Comments controls rather than mandatory manual surface authoring. Completion observes the normal Comments control/targets when matching guide promises them. Depth: replace opt-in wording in options-and-decisions.md and patterns.md with automatic default and one native feedback handoff; defaults do not request new choices/extras. demistify.md binding route stays authoritative. Trigger unchanged; no new load call, reference, schema or script.

## Proof

User-directed intent: draft after accepted spec review. Reference/pattern proof: permanent skill static checks, link/structure validation and one fresh bounded author application to an ordinary explainer plus an opt-out/override request using a matching local source guide. Write checks first and judge actual source/artifacts; loaded-copy/action-record gaps stay explicit. If host cannot expose actual action records, strongest claim is reviewed source and validated examples; no causal, trigger or installed-plugin behavior claim. Runtime fixture tests belong to product proof and do not establish agent transfer.

## Coordination

Base feat/presentation-html-default-comments, origin/main9c2b9fa46b6e6be7e3b90783bbd55f6c608c9b34, sunstack-dev2.98.0. Source branch is isolated; inherited unrelated untracked copies preserved under ignored tmp. Old walkthroughPR167 carries2.98.1 and is separate, so take the next minor2.99.0 in all six matching plugin/index/marketplace version homes and changelog. No release/deploy or merge. New product default is not yet published; guidance must remain binding-gated. Implementation only after independent one-skill spec review; independent implementation review after proof assessment.

Review record: not reviewed. Non-goals: walkthrough/builder API, new menu/rail, installed-cache mutation, new response/feedback storage or redundant API instructions.
