# Portable HTML readers from source pages

Target: `sunstack-dev:presentation-html`, one follow-up update after PR155. Base: `6aba22698799dd85f53bae4199c5d9aedd91c404`, already integrated with `origin/main` at `f8c1a1b`. Revision 2: bounded F1–F5 corrections to e3e1dd3. Status: implemented; proof and independent implementation review remain to be assessed.

## Promise and basis

The owner asks for instructions for creating portable embedded HTML with a command, plus fixes. For a locally opened reader, the agent identifies its actual dependencies. Local Markdown references are prepared into an embedded copy whose prose no longer fetches sibling Markdown; an already inline page needs no extra copy. An existing embedded copy is refreshed from its known live source, never from the consumed copy. Keep authoring sources for updates and state the remaining library and companion-file dependencies. A delivery-only request preserves the supplied explanation and presentation. This is user-directed intent with manual exercise, not an improvement or pressure-test claim.

Current `references/demistify.md` already documents the source-only `embed` and `check` commands and regeneration. Its main caller asks for delivery/viewing but does not explicitly require producing the local reader. The current regeneration example compares an unindexed embed directly; the matching 1.11.0 guide explains that a collection's generated search index must receive the same transform before byte comparison.

Authoring basis: current PR155 main and delivery reference; published Demistify 1.11.0 guide, `content.md` and `navigation.md`; actual matching-source `embed` and `check` exercises on three local examples, with four source Markdown files preserved and fresh output identical. The browser's file URL policy blocks direct-file observation. The owner separately authorizes loopback HTTP inspection; it is reported as HTTP proof only.

## Decisions

| Decision | Reason |
| --- | --- |
| Explain portability in terms of remaining dependencies: prepared local HTML with HTTPS assets, a multi-file collection with relative companions, and fully offline delivery. | An embedded Markdown payload does not embed the runtime, fonts, pictures or arbitrary JSON. Avoid promising an offline single file. |
| Keep detailed export and refresh instructions in the existing delivery reference. | That reference owns binding, source retrieval, opening method and generated-copy freshness. No new skill, script or output schema is needed. |
| Original timing, superseded by the 2026-10-22 F1 correction below: add an explicit local-reader preparation obligation to main step 3, after the matching guide is read. | The author must produce the intended delivered file, not merely identify why a live-source page needs HTTP. |
| Teach the existing source CLI commands, never a new executable or npm package. | The matching guide says the CLI is source-only, with Node 26 and installed dependencies in a matching sunstack-tools checkout. Readers run no command. |
| Index collections after embedding, and compare like with like when an index exists. | Indexing adds generated data. An unindexed fresh embed is not byte-equal to an indexed delivered reader even when the Markdown is current. |
| Keep all source facts and ordinary relative links unchanged. | Export is a delivery transform, not another explanation or an architecture decision. |
| 2026-10-22 F1 correction: choose source/output identities and opening method during scoping, bind in step 3, and prepare the completed source in step 5 before final checks. This supersedes the original step-3 production timing. | A new page must exist before embedding; preparation must precede checking the delivered file. |
| 2026-10-22 F2/F3 clarification: select embedding from actual local Markdown references or a known-source refresh. A delivery-only request runs inspect/bind/prepare/check/return and skips form selection and composition. | Inline-only pages have no local Markdown preparation input, and exporting a supplied page does not authorize reauthoring it. |
| 2026-10-22 F4/F5 clarification: establish available tooling against the recorded release/source metadata, return its exact gap when absent, and include actual remaining dependencies in final delivery. | The required preparation precondition must be decidable, and the dependency result must reach the reader rather than stay internal. |

## Surface allocation

- Trigger: unchanged; both model and user invocation remain available. HTML artifact requests still load this skill; chat formatting does not.
- Main path: retain the six-step route. Step 1 records source/output identities and distinguishes delivery-only from creation or content revision. For delivery-only, retain content, form choices, binding, IDs and links; go through steps 1, 3, 5 and 6 without requiring steps 2 or 4. Step 3 binds and selects an available matching authoring-tool route; it does not produce an unfinished page. Step 5 first prepares local Markdown references or refreshes a known-source embedded copy, then checks every final file and observes it. An inline-only page stays the reader and needs no artificial export/freshness loop. Step 6 returns the reader/source identities and actual companion/network dependencies alongside existing evidence/limits.
- Depth: in `references/demistify.md`, expand the existing delivery-command example into a short ordered recipe and keep the matching guide as API/command authority. Establish the tool source against the binding's recorded source commit or an independently verified matching snapshot, retain Node 26/dependency requirements, and return an exact unavailable-tool gap without silently installing or substituting a different version. Follow the guide's actual MUST/IF calls rather than the obsolete "Load depth when needed" heading. Expand the existing indexed freshness/replacement procedure; do not create another freshness owner.
- Proof: manually run the documented commands against the three examples, compare regenerated output and preserved sources, open the exported collection with only reader HTML present over authorized loopback HTTP, exercise navigation/search/tab targets at desktop and 390px, and return screenshots/observations. Direct-file and offline execution stay unverified unless actually observed. Static contract and plugin validation remain separate.

## Intended delivery recipe

1. Inspect the supplied page and its dependencies. First identify an existing generated embedded copy or a known-source refresh: locate its live source page and original Markdown, and refresh from those sources even when the generated copy has no remaining `src` attributes. If required originals are missing, return that exact gap. For other pages with live local Markdown references, retain `guide.source.html` and the original Markdown. Only an independently authored inline page with neither local Markdown references nor a known-source refresh uses the inline path: deliver it after ordinary checks/observation and state its remaining dependencies. Decide which HTML file will be the reader. Delivery-only work preserves the supplied forms/content/IDs/links.
2. Bind and verify an already available authoring route: the checkout's source commit and relevant source state match the binding's recorded `release.json` source commit, or an independently verified snapshot establishes that exact match. Check Node 26 and the required installed dependencies. A package version alone does not establish source identity on moving v1. If the route or a required original source is missing, return the exact gap and the unresolved local-file dependency; do not claim a prepared/current reader, silently install tools, substitute another version or invent an npm command. Once the source page is complete, from that matching checkout:

   ```sh
   node packages/demistify/bin/demistify.ts embed /path/guide.source.html /path/guide.html
   node packages/demistify/bin/demistify.ts check /path/guide.html
   ```

3. For a collection needing other pages' headings in command search, embed every page first, then run the matching guide's `index` operation over the delivered collection and check every final HTML file. Preserve relative page/image paths.
4. Deliver the generated reader file(s), plus relative companions the page still references. Markdown no longer needs to travel for rendering once embedded. Inline or prepare JSON through an available documented route; `embed` does not inline arbitrary JSON.
5. Explain that HTTPS library assets need a network. Fully offline delivery needs the complete matching distribution or a documented standalone bundle route. Do not invent a `bundle` CLI operation from the source API `bundleStandaloneHtml`.
6. After source edits, regenerate from the known live source page. For an indexed collection, use a separate temporary collection with the delivered file names and relative layout, apply the same indexing transform and input list, then compare every delivered file. Replacing stale output preserves those same transforms: embed the delivered pages, re-index the collection, and compare again. Compare exact source carriers and index destinations separately only when the matching guide documents that route. Return the actual result, delivered/source paths, required companions, network/offline dependencies and remaining limits.

Completion: the appropriate existing inline reader or generated embedded copy exists and passes matching checks; required exact source is retained; source/tooling gaps block unsupported preparation/currentness claims; dependencies reach the final user return; any promised browser behavior is observed through its declared opening method or returned as an exact gap.

## Boundaries and coordination

No Demistify product changes, server feature, global config, public deployment, new dependency, npm command, cache refresh, pressure test or model benchmark. The temporary HTTP preview is this manual observation's owner-authorized tool, not a new skill default or proof of direct-file opening. The broader composition-model spec remains open and untouched.

Sensitive surface decision before authoring: allowed for documentation of the existing source CLI and binding, with actual command/source checks; no executable resource or privilege boundary is added. Public prose contains only generic paths and public source/version anchors. Source/guide reads do not grant publication authority.

Release: this implementation follows the merged PR155 from `origin/main` at `6c4809f60d63f0a98bf738cbe15fdd1ae24d55c9`, with `sunstack-dev` 2.94.0 across all six metadata entries. It changes teaching only; it adds no Demistify runtime or exporter command.

Run status: implemented. Proof and independent implementation review remain separate from this design document.
