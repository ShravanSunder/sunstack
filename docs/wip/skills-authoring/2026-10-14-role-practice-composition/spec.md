# Role and practice composition — proposal v4

The agent doing a job needs a clear responsibility, a useful method, and judgment at the decisions that method exposes. Roles assemble those pieces. A list of linked skills is only the route to the teaching; the work has to change when that teaching is applied.

This is a design proposal for review, not an implementation grant. All runtime runs below remain proposed. Scope is sunstack-dev roles, phases, practices and principles only. The owner deferred orchestrators; they are excluded from this pass and from the visual inventory. Skill-authoring runtime skills are also excluded.

## The model

```text
Role + assignment                who owns this result and its decisions
  -> assigned phase / procedure  the work to perform, supplied by the caller
  -> practices                   recurring methods this job needs
  -> principles                  judgment at this role's decisions

Practice
  -> principles                  judgment inside that recurring method
  -> references / tool manuals   detail and mechanical execution
```

Roles are a composition view across the skill layers, not L4 and not another mandatory workflow gate. A charter's principle read does not become a direct read by every practice it also uses. Conversely, a practice's missing direct link does not establish that a role using it has no judgment: inspect both paths. The graph must show both distinctly.

The assignment supplies a role's phase or procedure. An Implementer consumes Program Design and Test Design as governing artifacts; it does not invoke their authoring phases to rewrite them. A Researcher runs the research method; an Operator runs the supplied collection or procedure.

## Problem and evidence

The owner asks for all roles to compose practices and principles, and for practices without principle links to be treated as incomplete composition. They also reject skill text dominated by bookkeeping: the useful part teaches how to think, when a judgment applies, its tradeoff, and the concrete failure it prevents.

At runtime candidate `skills/design-family-rebuild`, `ffe309643aa90d48563e8b2026aa1ead29743885`:

- `plugins/sunstack-dev/skills/practices-manage-agents/SKILL.md:11` already distinguishes practices, principles and role methods; `:19-25` names seven charters, and `:42-43` requires the selected charter to be read.
- Six `references/roles/*.md` charters explicitly name practices and principles. The Operator uses a supplied procedure, its tool manual when needed, and a reporting principle; `operator.md:13-17` and `references/agent-job-packet.md:29` allow this valid composition with no mandatory practice list. Researcher methods are at `researcher.md:13-17`; Verifier methods at `verifier.md:15-21`. Their existing composition is real and must be preserved.
- The four practice bodies and named non-role runtime references contain no literal `principle-*` calls. The same holds for the five `ops-*`/`presentation-*` L1 companions. This establishes a source-level gap under the owner's criterion, not a reproduced behavioral failure.
- The visual baseline is `docs/wip/skills-authoring/2026-10-14-five-document-planning-convergence/planning-dag.html` on docs commit `a41cf5d1ec619a0ec0eda80897b4cc143dabf08c`. At that revision, selector order at `:341` places roles last, default selection at `:329` is a practice, and ordinary skill traversal at `:256-275` follows outgoing lower dependencies without adding role callers. Roles are consequently absent from the ordinary main view. This is an inspectable presentation defect, separate from skill behavior. Read the baseline with `git show a41cf5d1:docs/wip/skills-authoring/2026-10-14-five-document-planning-convergence/planning-dag.html`; do not assume the working copy is still that revision.

## Success

1. The owner can select a role and see its declared methods and judgment, with conditional relationships identified and its phase/procedure shown as assignment-supplied. Selecting L1 shows only that practice and its lower L0 leaves; L2 shows the selected phase and lower L1/L0; no automatic upper roles or same-layer network is added. Current and proposed connections remain distinct.
2. Each L1 method declares the principles that improve its actual decisions. Every call explains the decision it changes, names its condition, and consumes a useful result. A name added to satisfy a count is a failed change.
3. Role charters retain purpose, responsibility and boundaries. Shared method teaching lives in its practice; role-specific judgment stays in the charter. No universal load of all principles or all roles is introduced.
4. A Lead accepts an argument it inspected, a Verifier observes the adopted outcome, a Reviewer tests the artifact's claims, a Researcher produces a checked synthesis, and an Operator reports supplied-procedure observations. Composition must preserve these differences.
5. The main path remains readable. Full principle leaves are read at the applicable decision; examples and branch detail are progressive. A required return may be internal working state: no new checklist recitation in user replies.

## Decisions and boundaries

| Decision | Default proposed | Why |
|---|---|---|
| Role home | Keep the seven existing charters under practices-manage-agents | They already own the role teaching; new role skill shells would add a second home without a demonstrated need. |
| Role visibility | Promote roles to a primary composition view, with a visible role band alongside the skill layers | The owner needs to see the assembly point; numbering roles as a higher skill layer misstates the model. |
| Method principles | Add calls at the decision they shape | A bulk index leaves the agent to guess applicability and buys links without useful judgment. |
| Role principles | Keep role-specific calls and consume the relevant practice's method | The charter remains a usable responsibility definition without copying the method's whole guidance. |
| Loading | Preserve installed skill discovery and ordinary full-file reads | No new native invocation policy, hook, loader, cache delivery or host-global changes are needed to teach composition. |
| First slice | Role routing plus Researcher → research → principles, then the other methods | This exposes the missing role view and gives one concrete slice before repeating a weak pattern. |
| Proof | Draft from owner-directed intent; behavior remains unevaluated until actual scoped runs | A literal-link check and a reviewed proposal do not establish improved engineering or trust. |

2026-10-14 owner amendments: the latest direction supersedes the earlier role-inclusive practice view. L1 focus omits all upper layers and same-layer neighbours; roles remain primary choices in their own view. The default diagram shows only the selected node's connections, with other paths revealed on hover and an optional all-connections control. It must include concrete proposed repairs, with when and what changes, rather than only flagging missing links. These amendments change the companion view, not role authority or runtime ownership.

2026-10-14 source-backed defaults: nine owner-requested Sol 6.1/high Workers covered four core practices, role integration, the presentation pair, and three ops methods in parallel waves, each with a separate report. The Lead checked decisive source/leaf anchors before selecting their candidates. Narrow decision predicates replace blanket extra audits: collaboration gains reader/closure judgment; trace gains reader/conditional acceptance judgment; management gains an overlap check; Linear gains drift-versus-break judgment. Existing useful teaching stays in place. Worker reports are evidence and candidate guidance, not the governing spec.

No new schema, role/form definitions, authority, execution route, provider, permission, Jev workflow, Markdown AST linter or eval framework is proposed. Worker/Sidekick remain execution forms. Existing Implementer–Verifier pairing and ownership remain unchanged. No tool/manual is made to own engineering judgment.

## Existing role composition to preserve

This table summarizes the current charters, not a new all-run load list. Their conditions still govern.

| Role | Methods | Role-specific judgment already declared |
|---|---|---|
| Lead | collaboration, trace; research and management when needed | shared model before task cutting; evidence before acceptance |
| Advisor | collaboration, trace; research and bounded collection when needed | reconstruct the shared model; explain tradeoffs |
| Implementer | collaboration, trace; unfamiliar-contract research and bounded collection when needed | real-path proof; distinguish drift from a model break; slice-specific reads supplied by the Lead |
| Verifier | collaboration, trace; uncertainty research and exact collection when needed | test sensitivity; real-path proof; evidence adequacy |
| Reviewer | authorized trace/posting; missing-contract research and granted collection | verify each finding; tests that reject forbidden behavior and allow valid behavior |
| Researcher | research; Sidekick trace and granted continuing collection | ground truth; synthesis for the reader |
| Operator | supplied procedure and its tool manual | tie observations to actual output; no independent engineering conclusion or private trace |

## Runtime runs — one skill target per run

Every run is an update owned by `sunstack-dev`. Trigger names, descriptions and invocation controls stay unchanged unless a separately admitted routing defect requires them to change. Main-path call sites carry these changes; existing references hold the depth they already own. No new reference is justified solely to list principle names.

All principle call sites must follow the ordinary call form: `MUST load <skill> and return <decision result>`, or `IF <observable condition>, load <skill> and return <decision result>`. Their short local explanation teaches how the returned judgment affects the next action. The result is work state, not mandatory prose to the owner.

| Run / target | Decision and proposed principle calls | Depth and concrete case | Status |
|---|---|---|---|
| 1 · practices-manage-agents | Before cutting an assignment, load principle-build-the-shared-model-first and return the outcome, governing boundary and unsettled assumption. At role/form/assignment/model classification, load principle-separate-the-concerns and return the distinct responsibility of each. IF parallel jobs can touch shared mutable state or consume unfinished work, load principle-design-for-concurrency and return the invariant, harmful ordering and existing isolation/prerequisite. Before relying on a handback, load principle-verify-before-accepting and return the claim, inspected observation and limit. | Existing role charters remain the teaching owner for each role. Preserve selected loading and boundaries. A green wrong-owner handback fails; adequate evidence at the correct owner passes. Two probes that reset the same fixture cannot safely run together just because their topics differ; isolated fixtures and outputs should stay parallel. Add no scheduler, lock or schema. | proposed |
| 2 · practices-research | IF a material claim depends on indirect material, version, path or decision origin, load principle-read-ground-truth-first and return what the decisive source establishes versus inference. Before adopting a load-bearing conclusion, load principle-verify-before-accepting and return its support and limit. IF synthesizing several sources or competing findings for another reader, load principle-write-for-the-reader and return the answer ordered around the receiving decision. | Use existing source-class/routing and ledger references. A pasted proposal is not adoption; explicit adoption is a clean control. Put source tracing at step 2/4, claim judgment at step 5 and substantial synthesis at step 6. A small anchored transcription needs no extra presentation exercise. Keep thin collection separate from synthesis. | proposed |
| 3 · practices-collaboration | IF assigning work or recording a consequential decision another session must use, load principle-write-for-the-reader and return actionable wording with the governing source and relevant limits. IF the root's authorized orchestrator/successor is about to resolve it, load principle-verify-before-accepting and return the whole-scope claim, inspected evidence and remaining obligation. | Place the reader call after Message or post, and the closure call inside deliberate resolution. Preserve discovery, waiting, seats and authority. A correctly addressed but ambiguous assignment fails; a clear existing request or routine acknowledgement needs no new packet. Green individual slices do not prove integration; adequate integrated evidence closes without another run. | proposed |
| 4 · practices-show-me-your-work | When shaping a material update/checkpoint, load principle-write-for-the-reader and return a concise account a cold successor can act on. IF an old completion claim or newly accepted result will guide continuation and its evidence-to-claim step is unchecked, load principle-verify-before-accepting and return the supported claim or narrower fact/gap. | Put reader judgment at meaningful updates and acceptance judgment at the Lead's resume branch; preserve role authority. A stand-in pass cannot become a real-provider claim. An adequate current checkpoint should be reused without new runs or a second record. Log instructions still own destinations; do not audit ordinary ownership again or turn every command into a report. | proposed |
| 5 · presentation-webui | Before choosing and arranging a substantial explanation, load principle-write-for-the-reader and return the reader's question and the smallest view that lets them answer it. | Existing baseline and diagram references retain rendering mechanics. A complete relationship wall that hides roles fails; one readable role composition slice passes. Keep ordinary terse replies terse. | proposed |
| 6 · presentation-tui | Same reader judgment as run 5, applied to the existing terminal surface and its geometry constraints. | Existing local craft references retain format mechanics. Choose a plain relationship tree when a box adds no meaning; retain a necessary ownership drawing. No new display vocabulary. | proposed |
| 7 · ops-linear-tracking | IF tracking text becomes a competing design authority, load principle-one-owner-per-truth and return the established owner and conflict. IF dependency/source records disagree, load principle-read-ground-truth-first and return the governing graph/current relations comparison. IF implementation contradicts the adopted model, load principle-refine-mental-models and return drift versus break and the owning correction destination. | Preserve independent-delivery and ticket/API teaching. A ticket cannot narrow an approved recovery obligation or rewrite architecture to mark work done. A correct checklist update needs no new ownership audit. Return changed design meaning to its owner; the tracking executor gains no governing authorship. No Linear writes in proof unless separately granted. | proposed |
| 8 · ops-observability-stack | IF lifecycle/producer ownership is disputed, load principle-one-owner-per-truth and return the existing owner from current sources. IF health/telemetry/report observations will close a proof claim, load principle-verify-before-accepting and return the actual target, observation and supported scope. | Existing producer/query loops retain mechanics. Health is not app emission; stale samples are not current-run proof; failed queries remain inconclusive. A narrow health report or already adequate correlated observation needs no app run or repeated proof. No new correlation schema, stack infrastructure or lifecycle authority. | proposed |
| 9 · ops-security-review | IF an inherited packet/route changes scope, exclusions or repair authority, load principle-hold-the-scope and return the consequential choice with its owner/contract anchor. IF adopting coverage or a finding for repair, load principle-verify-before-accepting and return the current anchor, observed coverage and validated failure. | Preserve official routes, narrow grants and read-only default. Missing context alone grants no broader mutation. An out-of-scope scary finding cannot expand repair; a verified scoped finding retains its authorized route. No new scanner, policy or official-workflow claim. | proposed |

Each run keeps its necessary main-path spine and completion boundary. Remove wording made redundant by its precise call only when the same responsibility and failure prevention remain visible. Do not delete useful local teaching merely because a principle exists elsewhere. When a leaf was already read in full in the same session and its revision/context is unchanged, no extra duplicate read or report is required; other agents' reads do not satisfy this session's read.

## Visual companion change

Update `docs/wip/skills-authoring/2026-10-14-five-document-planning-convergence/planning-dag.html` independently of runtime release. Roles are directly discoverable and primary focus choices. A role selection shows that role's methods and principles. L1 selection shows only the selected practice and L0; L2 shows its selected node and lower dependencies. Same-layer neighbours stay optional navigation; automatic inbound role networks are excluded. Keep role-to-principle and practice-to-principle edges distinct, and do not invent a static role-to-phase assignment.

Provide Current and With proposals views. The latter includes draft principle uses from this proposal with a visible not-implemented label and each link's when/decision change. Proposed edges never count as current reads or erase a source gap. Keep the default visible arrows to the selected node; hover reveals the chosen incident paths, and a deliberate Show all connections control exposes the full lower slice. Use simple solid relationships and color/labels for meaning, not a default wall of dashes. Preserve exact names/descriptions and the original style.

The map keeps exact skill frontmatter names and description excerpts. Charters have no frontmatter description: label their short purpose excerpt as charter text. Missing practice links retain a small red incomplete-composition badge; node colors continue to identify their type. Role coverage must also remain visible; no statement that a complete role has no principles follows from one method's gap. Named links, loaded text and useful application are three different claims. L1 same-layer cycles remain available as optional navigation; roles are never labeled L4.

This visual work is a companion document change, not a tenth skill run and not evidence that runtime skill behavior improved.

Companion sensitive surface: existing inline client JavaScript. Decision: allowed for local DOM/data graph, selection and disclosure updates under the owner's visualization request. No new network, shell/process, privileged, secret, third-party-adoption, cache or home behavior is proposed. Existing fonts/style are retained. Required proof is JavaScript syntax, graph/data invariants and actual browser observations of role selection and distinct role/method principle paths. Runtime skill proof remains separate.

## Proof and review

Authoring basis: owner-directed intent plus observed source gaps and the role-visibility defect. The historical lead-verification failures inform cases; this proposal does not claim they were faithfully reproduced. Runtime behavior has not been evaluated.

Structural checks inspect exact targets, principle/reference destinations, predicates, responsibilities, and the graph's edge provenance. A passing structural result establishes that the route is present, never that an agent used it well.

At implementation, scoped fresh-context behavior exercises use the role plus its actual assigned method and loaded revision. Checks are written before the run and kept outside the working directory. Preserve the cases and clean controls above: judge what the agent reads, does, concludes and hands back, not whether it prints principle names. When claiming improvement, compare the prior revision on the same case. If the prior revision already does the right thing, do not invent a delta. This uses the existing skill proof route, not a new eval system. No pressure/inference runs are commissioned in this design task.

Teaching review asks whether each call changes an engineering decision and whether the role-to-method chain works on the cases. Structure review asks whether routing, conditions and ownership agree without universal reads or duplicated authority. Review must inspect the existing charter composition as counterevidence to any claim that roles were absent from runtime. After implementation and its assessed proof, independent implementation review remains required before shipping.

## Coordination and release

- Source baseline: runtime candidate `skills/design-family-rebuild @ ffe30964`, plugin version 2.77.0. The docs proposal lives on `docs/sdlc-learning-coverage @ a41cf5d1` before this file is added. The main checkout is read-only. Existing owner WIP and source-worktree untracked files remain untouched.
- At implementation admission, recheck the live stack, pending writers and consumed semantics. Use one dependent stack layer after the accepted current source; do not create a new worktree or change the existing delivery order from this proposal.
- No schema, scripts, commands, tool routes, manifests, global instructions or cache installation change is designed here. A need to touch them returns evidence to the Lead before scope expands.
- Runtime landing requires the normal version metadata and one short dated changelog entry, validated for the then-current owning version. Cache refresh is an explicit post-push/release step, not part of this design or proof of PR readiness. The owner retains merge authority.
- Review record: v1 teaching checks complete; structure trigger check complete, rule-agreement awaited the visual identity. V2 clarifies that identity and the Operator exception. V3 incorporates the owner's focused/proposed visual direction and the selected source-backed Worker candidates. These are semantic proposal changes, so the same independent check relationships inspect the changed calls, conditions and companion contract before a current acceptance. Runtime implementation and shipping are not authorized by a review verdict alone.


## 2026-10-14 v4 owner scope and disclosure decisions

The owner deferred the orchestrator level. The current inventory is 43 sunstack-dev skills and seven existing role charters; no orchestrator appears as a selector, node, reverse consumer or candidate consumer in this pass. Runtime files remain unchanged.

Relationship color describes its destination: purple for role responsibility, teal for a practice/method, blue for a principle, gray for a phase. Proposal status is separate: a yellow dot marks a proposed arrow or new use; the sidebar's yellow border, title and PROPOSED chip mark its detailed proposal. An existing principle remains an existing blue principle when a use is proposed. Each connection is separately routed without crossing cards. Direct clear routes are preferred; only an obstructed route takes a gutter. A proposal dot sits near its destination, not in a bundle beside unrelated arrows.

Clicking a connection opens its explanation in the right panel: caller and target, why the dependency helps this decision, when it applies, what changes, and pinned sources. Current links show their actual source clause and distinguish responsibility mentions from charter loading. Their explanation is an interpretation of declared text, not proof of runtime loading. Proposed links state proposed application and unevaluated behavior. Reverse links can open that same explanation. The panel owns per-connection detail; do not duplicate those cards beneath the graph.

The bottom section is a compact table for candidate building blocks: what is considered, why, existing coverage, actual role/phase consumers and the next proposed use. It does not invent graph nodes for unapproved skills.

### Source-backed additional phase candidates

| Target | Proposed dependency | Why and use | Boundary |
| --- | --- | --- | --- |
| program-design | principle-experiment-before-proposing | At the structural crux, an uncertain API or measured cost can overturn the choice. State the hypothesis, deciding observation and representative path before selection. | Existing phase and principle; run only a granted probe or return the evidence gap. |
| debug-investigation | principle-experiment-before-proposing | At ranked hypotheses, choose an observation that distinguishes causes rather than a rerun that confirms none. | Existing diagnosis procedure retains execution scope; no new experiment runner. |
| test-design | principle-design-for-concurrency | When forbidden behavior depends on overlap, preserve and force the harmful ordering at an honest seam. | Keep tests that allow all contract-permitted outcomes; no additional fixture/scheduler authority. |

These are additional research candidates, not new admitted runtime runs. A commissioned update still has one named skill target, fitting proof and independent review.

### New principles and practices considered

No new skill is justified by this bounded source pass yet. That is a finding about inspected coverage, not a claim that the portfolio is complete. Source-only review does not establish teaching effectiveness.

| Considered block | Gap being tested | Current disposition |
| --- | --- | --- |
| Experiment method (possible practice) | Program Design and Debug both create evidence. Is there a repeated preparation/execution/interpretation method their existing homes cannot supply? | Investigate actual common mechanics; reuse experiment judgment now. No generic practice shell. |
| Resource budgets and overload (possible principle) | Is there a budget decision left unserved by concurrency bounds, representative experiments and Program Design's structural policy? | Strengthen the existing worked workload/budget/owner/overload example first. A distinct new judgment needs concrete uncovered cases. |
| Assertions accepting valid outcomes | Tests can reject both a defect and a correct implementation by inventing an undefined ordering. | Strengthen principle-write-tests-that-can-fail with the two-sided example already taught by Test Design. No new testing practice. |
| Evidence applicability across changes | Unrelated edits need not invalidate an observation; source equality alone does not establish the observed delivered target. | Strengthen principle-verify-before-accepting using Verification Design's existing applicability example. No receipt registry or new principle. |

Evidence candidates are in the private source-only Worker reports design-building-blocks.md, discussion-building-blocks.md, delivery-building-blocks.md, role-building-blocks.md and principle-building-blocks.md under /private/tmp/2026-10-role-practice-composition-review/. The Lead inspected decisive current principle and consumer anchors. Orchestrator-only findings are parked, and F6 planning admission changes remain a separate accepted lane. Earlier independent v3 review remains held; it does not accept these v4 changes.


## 2026-10-14 superseding owner decision: tree first

The routed DAG companion is superseded by an expandable composition tree. The source dependency data remains a graph, but the reader sees one branch per use: role → declared methods → each method's own principles; phase → named responsible roles and direct methods → principles; practice focus → only that practice's own principles. Direct role/phase principle uses have a separate branch. A reused skill can appear under more than one parent; those entries share one source identity and do not invent separate skills. Same-layer method calls remain optional separate navigation rather than recursive branch noise. Source role mentions remain responsibility context, not an assignment or charter-load claim.

No routed SVG arrows, zoom controls, hover dimming or all-connections graph remain. Simple nested branches use purple for roles, teal for methods and GREEN for principles (owner correction from blue); yellow dots mark proposed uses. Click a name to focus its subtree; expand/collapse with its disclosure; Why this connection opens the existing sidebar explanation. Keep the yellow proposal cards, reverse links, sources and candidate table. Orchestrators and skill-authoring runtime remain out of scope. This supersedes every earlier routed-arrow/color instruction in this document without changing runtime authority or the proposed skill changes.


## 2026-10-14 correction: concept tree was chat-only; restore the graph

The owner clarified that the tree request was a chat outline of concepts and proposed changes, not an HTML layout instruction. The previous tree-first visualization amendment is superseded. Restore the routed composition graph. Use one column per visible layer to keep cards out of connector gaps. Practice focus contains only that practice and its own principles. Role/phase views show declared responsibility/method composition; direct principle uses retain actual source identity and are distinct from uses through a practice. Same-layer method links stay separate optional navigation.

The exact destination colors are BLUE to practices/methods, GREEN to principles and VIOLET to roles, for both paths and arrowheads. Yellow dots identify proposed connections and never replace destination color. Default shows the selected source's routes; hovering a node traces its incoming path and its own outgoing uses; the explicit all-connections control reveals the whole lower slice. Clicking a card focuses that skill. Clicking an arrow opens its explanation.

Per-connection detail is also a table below the graph: caller/dependency and current/proposed status, why needed, when/how used, and pinned sources. Keep yellow proposal sidebar cards and reverse links. The separate candidate-building-block table explains real gaps, current coverage and proposed consumers/uses. Do not repeat these tables as large prose-card lists. The task list for this correction is /private/tmp/2026-10-five-document-planning-convergence/TASKS.md. All runtime changes remain proposed; this restores and corrects only the requested visual companion.


## 2026-10-14 final visual simplification

Owner confirmed the restored graph is clearer. Remove the yellow dots from arrows and graph metadata; preserve PROPOSED status labels. Remove the right-side proposal-card panel and integrate its fields into the existing connection table. Replace the two collapsible table sections with Connections and Building blocks tabs. Connections contains outgoing dependencies plus reverse consumers, why, condition/use, status, proof limits and pinned sources. Clicking an arrow activates Connections, highlights its row and exposes the source clause; no detail is stranded in a removed sidebar. Keep the separate candidate table under Building blocks. Use freed main-column space for cards up to 360px wide. Remove All connections control, retaining selected-source visibility and hover tracing. These owner decisions supersede the prior sidebar and arrow-dot instructions; graph palette and runtime scope remain unchanged.


## 2026-10-14 reverse-link clarity

The owner requested reverse consumers as a separate Used by tab. The final detail tabs are Connections, Used by, and Building blocks. Used by names each caller once, shows its role/phase/method/principle kind, gives a caller-specific use explanation or an actual source-clause excerpt, and links the source. Do not repeat the selected target and generic principle summary in every row. Role rows come first for scanning. The testing example distinguishes Test Design choosing forbidden scenarios, Reviewer inspecting the assertion path, Verifier assessing intended red evidence, and Prove It Works connecting a sensitive test to real-path proof. Their current source clauses were checked. Proposal status stays visible; a single source declaration never establishes runtime loading.
