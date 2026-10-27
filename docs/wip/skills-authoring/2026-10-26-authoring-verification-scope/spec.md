# presentation-html: authoring verification scope

Revision: 1. Target: `plugins/sunstack-dev/skills/presentation-html`. Revision 1 run: update; reviewed.

## Problem and success

Owner Oct26: “remove the phone verification”; component-development checks belong in this repository's AGENTS.md, not repeated in Demistify/presentation authoring skills; “make new prs”; “pointless verifications burn tokens.” User-directed intent, not a reproduced model defect.

Ordinary authoring must not require a phone/narrow viewport, desktop/phone screenshot pair or light/dark regression matrix, including through references. Retain binding/source/markup, authored content and link checks, task-specific interactions and truthful proof limits. Retain responsive component behavior documentation. Component developers own responsive UI checks in repository instructions.

## Decisions

| Decision | Rationale |
| --- | --- |
| Remove viewport/theme matrix obligations from existing homes, no new authoring flag/helper | Less recurring work; one verification owner |
| Keep author-content checks and explicit task requirements | Removing library regressions must not excuse broken authored content |
| Keep responsive API descriptions | They explain what the library provides, without assigning a test matrix |
| No browser/product suite rerun for instruction-only deletion | It cannot establish instruction uptake; no rendering code changes |

## Surfaces and proof

Trigger unchanged. Main removes mandatory viewport/theme observations and calls returning them. Depth removes matching obligations from existing references. No new reference/schema/tool. Proof: inspect complete changed files and references for remaining mandates; validate Markdown/frontmatter/local links and packaging/version consistency with existing tools where available; independent source review. Strongest claim is source agreement with owner intent; fresh-agent application unobserved/deferred, no improvement/reliability claim.

## Coordination

Base origin/main `e427d8c93f92b704562157c911efea3e460f48fd`; branch already isolated, no prior skill edits. Separate new PR, ready/unmerged, no release/cache/merge. Bump six sunstack-dev version homes 2.99.0→2.99.1; dated <=20-line changelog/index update.

Non-goals: runtime/CSS/test implementation, storage/identity/API changes, deleting responsive behavior documentation, broad verification-policy rewrite.

Run status: reviewed. Revision1 SPEC accepted-to-implement; combined independent implementation review returned great/source-only with no accepted findings. Reports remain in the owning work record; fresh-agent application is unobserved.

## Revision 2 — additional owner-directed variation teaching

Owner Oct26 supplies an agent transcript that treated related screenshot sizes as a filterable list rather than variations, then asks to fix the skills “in a generalized way ... with an example for screen sizes.” This is user-directed teaching, not a faithful reproduced agent failure. Revision1 remains accepted/implemented for the phone-matrix removal; its decisions remain in force.

Success: teach the distinction between a logical item and alternate captures, variations versus filter facets versus separate items/steps, using only the bound component API. Include a worked screen-size example, meaningful capture-backed categories and missing/ambiguous capture behavior. A guided comparison uses one stop per logical screen/state with variations enabled; exact-capture evidence may intentionally omit it. No invented generic variant attribute, runtime change, automatic image inference, manufactured captures or author phone/theme regression matrix.

| Added decision | Rationale |
| --- | --- |
| Teach subject/variation/filter distinction before syntax | Prevent the flat-list interpretation reported by the owner |
| Screen size is a worked example, not a fixed enum | Apply the judgment to supplied evidence without inventing metadata |
| Preserve actual screen+state / viewport contract | General teaching must not claim arbitrary runtime axes |

A second run, same named skill. Main screenshot chooser and patterns call cover variant comparisons. Existing patterns.md teaches the general logical-item/variation/filter choice and screen-size example, retrieving actual pictures/tours syntax from the matching guide. No copied product schema or second API owner.

Proof for added teaching: manual source/API walk against current galleryScreenKey (screen+state) and viewport navigation; static check the literal product example against unchanged matching checker when available; current frontmatter/link/version checks and independent review. Fresh author transfer remains unobserved/deferred. No browser/product-suite or paid evaluation rerun for prose-only changes. Same base/newPR/version allocation as above; patch Changeset/changelog now describes both changes.

Run status: revision1 phone scope reviewed; revision2 variation teaching separately SPEC-accepted and reviewed. Combined independent implementation review returned great/source-only at 22a105e3083ff3470626a7f9de32e79676b44aa2; no accepted findings. Fresh-agent application, rendering and installed/released uptake remain unobserved.

## Revision 3 — reader-oriented feature discovery

Run: update presentation-html only; behavior-changing/user-directed intent. Status: proposed. Owner Oct27 asks for the full inventory of both skills, generalized improvements and PRs: presentation HTML teaches when to use components to help the reader understand; Demistify explains component use. Owner also asks to teach multiline labels rather than paragraph-wide diagram nodes, and says “dont over fit.” Revision1/2 decisions remain effective; this run adds no runtime obligation.

Success: for a new HTML explanation, the agent chooses views from the reader's task, discovers compact scan-fact components and the supplied-graph Explorer when useful, distinguishes independent layers from exclusive peer views, and keeps diagrams readable through concise meaningful labels, line breaks supported by the matching guide, direction and progressive detail. It still uses prose for a simple answer and does not add components merely to cover the catalog. All current component families remain reachable through the bound guide. Trigger/invocation unchanged: both human and model may invoke; standalone HTML is the boundary, chat/terminal explanation is the near miss.

### Decisions and allocation

| Decision | Reason |
| --- | --- |
| Retain existing compact chooser and conditional pattern references | Reader tasks select representations; a full API list obscures the explanation |
| Add one compact scan-facts condition and one supplied graph/evidence condition | These distinct tasks were absent from the main chooser; detailed markup remains in the bound guide |
| Clarify independent layers beside disclosure/tabs | Optional overlays and exactly-one peer views answer different questions |
| Teach concise node identity/responsibility and meaningful multiline labels, with adjacent full detail | Prevent prose paragraphs becoming wide node labels without losing facts |
| Pick layout from the relationship and resulting readability | Top-down or smaller linked views may help; horizontal diagrams remain valid and no arbitrary word cap is added |
| Keep all supported syntax in Demistify; preserve categorical versus semantic colors | Workflow teaches judgment without copying API or assigning domain meaning to visual colors |
| Reuse PR169 and merge current main | Avoid overlapping proposals; retain latest unrelated work |

Surfaces: trigger and agents metadata unchanged. Main chooser/taste receive the two conditions and concise diagram judgment; existing patterns.md owns layers and one good/bad readable-label example. Existing compact-row recipe loses its experiment-only “C” name while preserving supplied records, comparison/scales and explicit requested visuals. No new reference, schema, script, exhaustive feature checklist or mandatory example set. Revision1/2 variation and authored-check scope stay in the same existing homes.

Authoring basis: the owner's settled split and generalized teaching request, current seven files at f4853565, component guide1.15.3 and runtime vocabulary (31 current +5 legacy entries). Source inventory separately records covered/partial/missing/stale teaching; no faithful historical failure reproduction or causal improvement claim. Existing main has no Explorer condition, compact facts are only in patterns, and Mermaid readability has no concrete multiline composition example.

Proof plan: current-file/link/frontmatter/version/packaging checks; inspect current branch diff against this allocation; one fresh-context realistic HTML task that discovers/apply relevant views plus a near-miss routing judgment, with the loaded-copy/actions record where the host exposes it. Keep checks outside the subject's work directory. Report this as candidate application/characterization, not a RED→GREEN delta or reliability claim. Runtime/phone/theme regression matrix is not rerun for instruction-only edits; actual authored content and interactions remain their own obligations. Any unavailable loaded-copy/action observation is a named proof gap, not success.

Coordination: branch fix/presentation-authoring-verification-scope, merged main f4853565 into clean944a60447d9a168b43ed9fa37137ba866d507c6e. Existing PR169; no parallel writer. Six manifests/marketplace entries now2.100.1 after resolving main's2.100.0 versus old proposal2.99.1. Existing dated changelog will describe final combined teaching, validation and unobserved install/cache state. New release/cache changes are outside this PR-ready grant. Non-goals: runtime behavior/API, shared diagram references, legacy feature promotion, source-set ownership changes, new tool/install/server policy.

Review record: revision3 spec pending; no revision3 skill-file changes. Independent skill-review spec stage must accept this meaning before implementation. Fresh proof, Root assessment and skill-review implementation stage follow. Prior run statuses stay reviewed at their recorded heads; they do not imply revision3 reviewed or shipped.

Revision3.1 clarification before acceptance (2026-10-27): the existing peer-view chooser row will distinguish exactly-one peers from independently visible overlays, and the patterns call predicate will include independently switchable content so that its Layers judgment is reachable. This adds no third feature-catalog row or new reference. The two new rows precede the general same-columns table row so first-match routing can reach them. Rationale: depth cannot teach a choice if its relevant task never retrieves it. All other revision3 decisions and bounds remain unchanged. Review target is revision3.1 including this clarification.

## Revision 4 — consolidated inventory corrections (supersedes unaccepted 3/3.1)

Status: proposed. R3/R3.1 were never accepted or implemented. Their owner-directed success and decisions remain; R4 includes the following additional bounded corrections from the completed independent whole-source inventory. Root opened each decisive source before admitting it. Target remains presentation-html only; main and patterns are the only skill homes edited.

| Finding / decision | Evidence and rationale |
| --- | --- |
| A-T1/T2 and pending A-P1/P2 remain the R3/3.1 work | Compact scan facts, supplied graph, independent overlays and readable labels; retain existing capture-variation teaching and component-development verification ownership |
| A-RA1: make the HTML caller apply the shared load-bearing relationship test to supported entity/type/numeric relationships too | Existing ER selection conflicts with shared Mermaid's illustrative topology/flow/sequence/state admission list. Clarify the selected-family test locally; no shared-reference change or invented renderer support |
| A-RA2: permit documented component-local layout, keep shared visual styling/prose widths | A's width prohibition conflicts with the matching Board guide's explicitly sized/positioned canvas. Allow only layout the matching component guide documents, including that Board; keep table/prose width hacks and page paint prohibited |
| A-T3: replace the stale chart ban with conditional truthful chart selection | Pinned chart-source.ts captures quoted bar/line series names and diagram.ts uses it. Root's actual themed render shows Accepted/Rejected names with no generic labels. Use a chart only when its shape answers the question and the bound guide documents the needed semantics, names and units; use a table for exact values or misleading/unsupported chart behavior |
| Keep concrete semantic examples and indirect literal/type-family discovery | Review rejected removal of valid composition examples merely because they include markup; every use still retrieves the canonical guide. Do not add one row per renderer family |

Main changes: the two R3 task rows plus a numeric-comparison shape condition precede the broad native-table row; the existing peer row distinguishes additive layers; the diagrams caller explicitly preserves entity/type/numeric relationship admission while applying readability/support checks. Compose/readback consistently permit guide-documented component-local layout and retain shared style/Reading/Canvas ownership. Replace the chart-until sentence with meaningful series/units/categories and a table fallback. Existing patterns teaches the positive labels/direction/detail transformation, a legitimate short horizontal countercase and independent layers. No API grammar copied into A, no new reference/script/schema, no shared-reference edit. Trigger and platform metadata remain unchanged except already required version bump.

Additional proof criteria: inspect source routes for entity cardinality versus ownership, legitimate documented Board dimensions versus arbitrary document/table-width overrides, named-series chart versus a source whose series/units cannot be represented truthfully, long labels versus a readable short horizontal drawing, and plain prose as a valid outcome. Candidate application remains bounded and no RED/delta claim is made. B's matching guide owns exact named-series syntax; until that guide documents the required behavior, A's binding rule requires a simpler supported view, not guessed syntax. PR82/169 may therefore be reviewed independently without promising a new runtime or installed guide before release.

Coordination/version/base/non-goals and earlier review history remain as recorded. Review target now R4 as a whole, including retained R1/R2 scope and effective R3/3.1 decisions. Independent skill-review SPEC decision pending. No R3/R4 skill source has changed.

R4 execution record (2026-10-27): independent skill-review SPEC accepted-to-implement, all four selected checks complete, zero candidates (retained a-spec-r4-review.md; direct result01a17d33-38bf-7840-bcb1-4925991ae31c). Root read the whole report and current anchors. R4 status: implemented, not yet reviewed/shipped. Diff stays in main/patterns plus the allocated changelog; no trigger/metadata/API/shared-source additions. Proof, Root assessment and independent implementation review remain owed.
