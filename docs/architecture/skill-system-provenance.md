# Source inspiration and evolution

Our skills adapt selected judgments and methods to this repository's ownership and delivery model. The [source-inspiration catalog](../../plugins/sunstack-dev/docs/source-inspiration-catalog.md) is the lightweight preserve/avoid map. Detailed path mappings, upstream pins and checkout indexes belong in the separate `ai-dev-skills` meta-repository, under `docs/my-ai-tools/`, `docs/repo-index/` and `docs/repo-index-changelog/`.

This page records design lineage. The [current architecture](skill-system.md) and runtime skills describe what an agent should do now. An upstream recommendation, a local correlation or an accepted spec alone does not prove local behavior.

## Source inspiration

| Source | Ideas we studied and adapted | Boundary retained locally |
| --- | --- | --- |
| Lauren Tan's pstack | Small engineering-principle leaves; work traces; explaining how and why; project verification recipes and their upkeep; evidence-backed iterations and lesson capture | Lead-authored governing design, inspected handbacks and local role authority. Cursor-specific commands, blanket autonomy and an anti-planning stance were not adopted wholesale |
| Matt Pocock's skills | Trigger/main-path/reference organization; invocation and cognitive/context costs; domain modeling; grilling settled sources; testing through meaningful interfaces; pruning and handoff patterns | Repository facts stay with their existing executable/configuration owners. Discussion does not substitute for a source-backed specification |
| Addy Osmani's agent skills | Lifecycle taxonomy; source-, constraint- and specification-driven workflows; failure shields; ADR/docs and observability ideas | Select useful mechanisms instead of installing a second complete SDLC workflow |
| Other selected sources | Obra's pressure-proof/rationalization methods, Codex platform anatomy, HumanLayer/review/security examples and the owner's own repeated corrections | Use each only for the named local need; preserve exact provenance and license requirements where content is adapted |

The October 7 audit compared 31 then-active local packages with 136 pinned trio entries: 73 pstack entries (50 skills and 23 playbooks), 38 Matt files and 25 Osmani files. Its pins were pstack `ecc249f1e306fc64ddf83c7bed16cacf7c2239db`, Matt `c55ee46073ed923f86ce59a5eb3b6d895095d1b7`, and Osmani `2686b620fc1fed2e8f60c704839c766b8594c6b6`. These are historical corpus counts, not today's plugin inventory. Saved eval exports and source reads were separately labeled; the study was not a new portfolio-wide behavior benchmark.

The audit's useful result was a map of existing coverage and bounded gaps. It did not authorize importing all upstream skills or copying their hierarchy. A fresh audit reopens current local files and selected upstream evidence; it does not inherit an October pass label as present-day proof.

## What became the current structure

| Delivery | Result | Durable record |
| --- | --- | --- |
| Principles and composition | Seventeen callable `principle-*` judgments; practices and phases cite them at concrete decisions; role responsibility separated from management mechanics | [Principles index](../../plugins/sunstack-dev/docs/principles-index.md), [composition](../changelog/2026-10-14-practice-principle-composition.md), [roles and verification](../changelog/2026-10-16-verification-roles-phases.md) |
| Project verification | One practice observes an adopted target; another creates and maintains the project's reusable verification skill and journeys | [PR #135](https://github.com/ShravanSunder/sunstack/pull/135), [roles and verification](../changelog/2026-10-16-verification-roles-phases.md) |
| Domain and management boundaries | Language knowledge became caller-loaded domain leaves; management returned to mechanical role/form/model/packet operations | [Domain layer](../changelog/2026-10-16-preflight-cleanup-domain.md), [mechanical management](../changelog/2026-10-16-manage-agents-mechanical.md) |
| Four-document design | Verification Design became the explicit proof-strategy document after Program Design; lasting and temporary journeys gained separate treatment | [PR #143](https://github.com/ShravanSunder/sunstack/pull/143), [PR #144](https://github.com/ShravanSunder/sunstack/pull/144), [PR #146](https://github.com/ShravanSunder/sunstack/pull/146), [release record](../changelog/2026-10-17-verification-design.md) |
| Real decisions and scoped shipping | Structural confirmation rituals were removed; PR wrap-up establishes merge authority rather than assuming it from readiness | [Decision stops](../changelog/2026-10-17-real-decision-stops.md), [merge authority](../changelog/2026-10-18-merge-authority-up-front.md) |
| Improvement loop | Blameless retrospective reconstructs outcomes and routes the smallest supported correction to its owner | [Retrospective](../changelog/2026-10-18-practices-retrospective.md) |
| Executable skill standards | `skill-rules` separates mechanical, judged, review, eval and prose standards; only suitable source wording becomes a checked rule | [skill-rules](../changelog/2026-10-18-skill-rules.md) |
| One source, two entries | Cohesive Markdown chunks, agent reading paths, human HTML composition, embedded-source freshness and capability through-lines | [Composition](../changelog/2026-10-18-design-set-composition.md), [capabilities](../changelog/2026-10-18-capability-through-lines.md) |
| HTML authoring | `presentation-html` uses the matching shared Demistify components and task-appropriate navigation | [HTML components](../changelog/2026-10-18-presentation-html-adopted-components.md) |

Early design-family PRs #122, #127 and #128 were closed without merging. Their five-document model and earlier role/schema drafts are historical source material. Later changes selected and rewrote useful parts; the current system has no separate Test Design phase. Restoring an old branch wholesale would reintroduce obsolete names, ownership and contracts.

## Evidence and the next audit

Some release records explicitly carry structural-only proof. Others describe fresh named examples and their known control limits. Preserve those distinctions when evaluating a regression or choosing a new audit. Neither the number of reviewers nor a catalogued scenario is an observed behavior result.

Start a new portfolio audit with `skill-audit`: inventory the current skill surface, inspect dated usage evidence, select the relevant upstream sources, and classify update/create/merge/skip. Every update/create recommendation names the trigger fit, main path, reference depth, script need and pressure-proof status. A defect in the engine or a deterministic checker stays with that executable owner. A named skill change then follows `skill-orchestrator`; this history is not an open-ended implementation commission.
