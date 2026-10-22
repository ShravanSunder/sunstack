# Portable HTML readers from source pages

Target: `sunstack-dev:presentation-html`, one update run on PR155. Base: `6aba22698799dd85f53bae4199c5d9aedd91c404`, already integrated with `origin/main` at `f8c1a1b`. Status: proposed; no delivery teaching edited for this proposal yet.

## Promise and basis

The owner asks for instructions for creating portable embedded HTML with a command, plus fixes. Given a page with local Markdown sources, the agent should deliver a generated HTML reader whose prose no longer requires sibling Markdown fetches, keep the authoring sources for updates, and state the remaining library and companion-file dependencies. This is user-directed intent with manual exercise, not an improvement or pressure-test claim.

Current `references/demistify.md` already documents the source-only `embed` and `check` commands and regeneration. Its main caller asks for delivery/viewing but does not explicitly require producing the local reader. The current regeneration example compares an unindexed embed directly; the matching 1.11.0 guide explains that a collection's generated search index must receive the same transform before byte comparison.

Authoring basis: current PR155 main and delivery reference; published Demistify 1.11.0 guide, `content.md` and `navigation.md`; actual matching-source `embed` and `check` exercises on three local examples, with four source Markdown files preserved and fresh output identical. The browser's file URL policy blocks direct-file observation. The owner separately authorizes loopback HTTP inspection; it is reported as HTTP proof only.

## Decisions

| Decision | Reason |
| --- | --- |
| Explain portability in terms of remaining dependencies: prepared local HTML with HTTPS assets, a multi-file collection with relative companions, and fully offline delivery. | An embedded Markdown payload does not embed the runtime, fonts, pictures or arbitrary JSON. Avoid promising an offline single file. |
| Keep detailed export and refresh instructions in the existing delivery reference. | That reference owns binding, source retrieval, opening method and generated-copy freshness. No new skill, script or output schema is needed. |
| Add an explicit local-reader preparation obligation to main step 3, after the matching guide is read. | The author must produce the intended delivered file, not merely identify why a live-source page needs HTTP. |
| Teach the existing source CLI commands, never a new executable or npm package. | The matching guide says the CLI is source-only, with Node 26 and installed dependencies in a matching sunstack-tools checkout. Readers run no command. |
| Index collections after embedding, and compare like with like when an index exists. | Indexing adds generated data. An unindexed fresh embed is not byte-equal to an indexed delivered reader even when the Markdown is current. |
| Keep all source facts and ordinary relative links unchanged. | Export is a delivery transform, not another explanation or an architecture decision. |

## Surface allocation

- Trigger: unchanged; both model and user invocation remain available. HTML artifact requests still load this skill; chat formatting does not.
- Main path: existing six-step route. Step 3 additionally says: **IF the reader will open a prepared local HTML file, produce its generated reader copy using `demistify.md`'s export recipe and return the source page, reader page and remaining dependencies.** Binding and API verification still precede authoring/export. Step 5's existing regeneration and visual check remain mandatory.
- Depth: in `references/demistify.md`, replace the terse delivery-command example with a short ordered export recipe. Preserve source-only CLI prerequisites and binding authority. Expand its existing regeneration section for indexed collections; do not create another freshness owner.
- Proof: manually run the documented commands against the three examples, compare regenerated output and preserved sources, open the exported collection with only reader HTML present over authorized loopback HTTP, exercise navigation/search/tab targets at desktop and 390px, and return screenshots/observations. Direct-file and offline execution stay unverified unless actually observed. Static contract and plugin validation remain separate.

## Intended delivery recipe

1. Keep `guide.source.html` with its live `src` islands and original Markdown. Decide which HTML file is the generated reader.
2. From a dependency-installed matching sunstack-tools checkout with Node 26:

   ```sh
   node packages/demistify/bin/demistify.ts embed /path/guide.source.html /path/guide.html
   node packages/demistify/bin/demistify.ts check /path/guide.html
   ```

3. For a collection needing other pages' headings in command search, embed every page first, then run the matching guide's `index` operation over the delivered collection and check every final HTML file. Preserve relative page/image paths.
4. Deliver the generated reader file(s), plus relative companions the page still references. Markdown no longer needs to travel for rendering once embedded. Inline or prepare JSON through an available documented route; `embed` does not inline arbitrary JSON.
5. Explain that HTTPS library assets need a network. Fully offline delivery needs the complete matching distribution or a documented standalone bundle route. Do not invent a `bundle` CLI operation from the source API `bundleStandaloneHtml`.
6. After source edits, regenerate from the live source page. For indexed collections, regenerate the same collection and apply the same indexing transform before comparing; compare exact source carriers and index destinations separately only when the matching guide documents that route. Return the actual result and limits.

Completion: generated reader exists and passes matching checks; exact source is retained; dependency limits are explicit; any promised browser behavior is observed through its declared opening method or returned as an exact gap.

## Boundaries and coordination

No Demistify product changes, server feature, global config, public deployment, new dependency, npm command, cache refresh, pressure test or model benchmark. The temporary HTTP preview is this manual observation's owner-authorized tool, not a new skill default or proof of direct-file opening. The broader composition-model spec remains open and untouched.

Sensitive surface decision before authoring: allowed for documentation of the existing source CLI and binding, with actual command/source checks; no executable resource or privilege boundary is added. Public prose contains only generic paths and public source/version anchors. Source/guide reads do not grant publication authority.

Release: retain the pending PR155 `sunstack-dev` 2.93.0 version across all six metadata entries; update its existing short changelog/evidence text for the export recipe after review. PR155 remains draft/unmerged until the work's current proof and independent implementation review are assessed. No merge instruction was given in this fork.

Spec review: owed through `skill-review` before editing the teaching. Run status: proposed.
