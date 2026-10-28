# Demistify delivery and component documentation

This reference owns the library binding, retrieval of the guide that matches it, and delivery and viewing. Inputs: the page scope, any existing binding and available authoring tools. At the binding pass (main step 3), return the binding/release, guide and references read, source-kind decision, intended source/reader files and dependencies, available authoring/viewing/checker route, and selected preparation/comparison methods. Select those methods now; run them after composition at main step 5, whose preparation pass returns the actual delivered files, final check results, dependencies and embedded-copy comparison when applicable.

## Library binding

A new page binds Demistify v1:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Engineering explanation</title>
<link rel="stylesheet" href="https://demistify.getagentstudio.dev/v1/theme.css">
<script type="module" src="https://demistify.getagentstudio.dev/v1/runtime.js"></script>
</head>
<body><ex-document>
<!-- Compose the explanation here. -->
</ex-document></body>
</html>
```

`/v1/` is a moving experimental major path: breaking changes can land within v1 until a stable major is declared. Past majors are retained, but v1 keeps no public history of its minor releases, so the page’s proof records `version` and `sourceCommit` from `https://demistify.getagentstudio.dev/v1/release.json`. Keep theme and runtime on one binding; the browser fetches renderer chunks, fonts and worker assets relative to it.

A page that keeps an older binding uses that release’s own guide and checker, and its proof records that binding; never attach current v1 metadata to it or migrate it only to get a release record. A hosted release keeps its guide at `authoring/SKILL.md` beside `runtime.js`; never apply the v1 API to an older runtime.

An unreleased source preview uses the complete matching built library, verified local component guide and matching source tools. Record its source commit and any permitted dirty-state exceptions; name absent release metadata instead of presenting the preview as published. Read the candidate guide's relative references from that same source tree. A source PR, a package version or an installed workflow skill does not establish that the public runtime supports the candidate API.

## Component guide

MUST load the guide for the page’s binding (for v1, `https://demistify.getagentstudio.dev/v1/authoring/SKILL.md`) and return the islands and layouts the page will use; write their syntax straight into the page. The guide’s relative references resolve beside it, under `/v1/authoring/` for v1. Follow the guide's own MUST/IF calls, including its content/source-carrier reference and the conditional references for the components and navigation this page uses; return the constructs and delivery decisions taken from each.

The main guide owns the available elements, attributes, tones, icons and widths. Recipes in `presentation-html` choose how to explain the content; they do not add API. For a topic comparison, use `comparisons.md` as the canonical comparison guide; `pictures.md` describes the image slider and gallery.

The guide at the page’s binding is the only source of available API. A construct you know only from a proposal, a design discussion or another version, including a different presentation model, stays unavailable until that guide documents it. If the guide cannot be fetched, use a verified matching local copy or report the missing reference; never reconstruct its interface.

## Delivery and viewing

Delivery depends on what the page loads. Library assets from the CDN need no app server, package install or build, but they do need the network. Sibling Markdown or JSON fetched by the page needs HTTP serving or embedding, because browsers block `file://` pages from fetching sibling files. Offline viewing needs the library itself local: either a trusted complete copy of the matching distribution beside the page, with both bindings pointed at it and served over HTTP, or a single-file standalone bundle, which exists only as the source API `bundleStandaloneHtml`. Copy the whole distribution, including hashed chunks, worker, fonts and icons; `runtime.js` and `theme.css` alone break lazy dependencies. A remote runtime executes in the page, so sensitive content also calls for the local copy.

`presentation-html` step 5 owns how the page is opened and checked. A successful launch with the OS default app proves only that the file opened, not that its content or interactions rendered.

## Prepare the reader

The matching guide owns the CLI operations. The CLI is source-only, with no published npm package; readers run no command. Use the canonical Sunstack tools checkout (`~/dev/sunstack-tools` on the owner's machines) at the binding's release commit, with Node 26 and its installed pnpm dependencies, built once there; never make a per-task copy. Verify its source commit and relevant source state against the binding's recorded `release.json` source commit, or a separately verified matching snapshot; a package version alone does not establish that match. If the tool route is unavailable, return that exact gap. Do not silently install tools, substitute another release or invent an npm or `bundle` command from a source API.

1. Inspect the page's source history and dependencies before treating missing `src` as inline authorship. A generated embedded copy or known-source refresh uses its retained live source page and original Markdown, even though the output has consumed `src`. Missing required originals are a gap; the generated copy cannot prove freshness. Other pages with local Markdown references retain those files and a live source page such as `guide.source.html`. An independently authored inline page with neither local Markdown references nor a known-source refresh remains the reader and skips embedding.
2. After composition is complete, run from the matching checkout's monorepo root:

   ```sh
   node packages/demistify/bin/demistify.ts embed /path/guide.source.html /path/guide.html
   ```

   Keep output beside input or preserve its relative page/image layout. Deliver `guide.html`; retain `guide.source.html` and its Markdown for updates. The transform embeds exact Markdown, including literal script terminators. It does not inline arbitrary JSON, pictures, the library or fonts. Prepare other local data only through a route documented by the matching guide, or name the unresolved dependency.
3. For a collection whose command search needs other pages' headings, embed each live-source page first, then index the explicit delivered collection in place:

   ```sh
   node packages/demistify/bin/demistify.ts index /path/guide.html /path/details.html
   ```

   Keep stable island IDs, relative paths and the input list. An authored inline peer participates in the index without an extra embed. The matching navigation guide owns indexing order and freshness.
4. Check every final HTML file after all transforms:

   ```sh
   node packages/demistify/bin/demistify.ts check /path/guide.html /path/details.html
   ```

   For a single reader, list only that file. Require a nonzero file count, zero errors and zero warnings. A passing check proves recognized markup/data constraints, not readability, source truth, links or interaction. Apply permitted repairs to the live HTML/Markdown source, never directly to generated output (including with `check --fix`); prepare and index again as applicable, then recheck every final file. If a repair exceeds the delivery-only grant or needs a product change, return the exact failed check/gap instead. Perform main step 5's observations on those delivered files.
5. Return the reader files, the retained authoring-source paths and the actual companions that must travel with them: linked pages, relative pictures and any unresolved local data. Embedded Markdown need not travel for rendering. State whether the shared library or data still needs the network. Fully offline delivery needs a complete matching distribution or a documented standalone route; it is a distinct target, not a consequence of embedding prose.

## Regenerate and compare an embedded copy

Regenerate from the live source page whose `<ex-markdown>` islands still carry `src`. Running `embed` on its consumed output leaves it unchanged and proves nothing. For an unindexed reader, write fresh output to a separate task directory and compare it byte for byte:

```sh
node packages/demistify/bin/demistify.ts embed /path/guide.source.html /tmp/task/guide.html
cmp /tmp/task/guide.html /path/guide.html
```

For an indexed collection, regenerate every source-backed reader into a separate collection with the delivered file names and relative layout. Copy authored inline peers unchanged, preserve required companions, then apply the same `index` transform with the same input list before comparing every delivered HTML file. An unindexed fresh embed and an indexed reader are different outputs. Compare exact source carriers and index destinations separately only when the matching guide documents that route.

`embed` carries exact source without time- or output-path-dependent data; `cmp` exit 0 means the equivalently transformed copy is identical. A difference marks the delivered copy stale. Replace it from its live source, reapply collection indexing when present, compare again and recheck every final delivered file. A check before replacement does not certify the replacement. Keep all permitted repairs in the authoring source; never repair generated text or index data directly, by hand or through an autofix. Return `identical`, or `stale` followed by the post-replacement result. Missing required source/tooling or an unapplied transform prevents a freshness claim.

Binding pass complete: theme, runtime and guide share a recorded binding; source kinds, intended files/dependencies, available routes and preparation/comparison methods are selected, or their exact prerequisite gaps are named. A new page need not exist yet.

Preparation pass complete: after composition, the final reader is prepared, compared and checked or its exact failure/gap is returned. Return actual source/reader paths, companion/network dependencies and any embedded-copy comparison with its limits; an earlier binding pass never substitutes for these results.
