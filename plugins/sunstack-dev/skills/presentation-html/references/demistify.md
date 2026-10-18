# Demistify delivery and component documentation

This reference owns the library binding, retrieval of the guide that matches it, and delivery and viewing. Inputs: the page scope, any existing binding and available authoring tools. Return the binding and its release, the guide and references read, component choices, the viewing/checker method and, for a page with an embedded copy, the regenerate-and-compare method.

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

## Component guide

MUST load the guide for the page’s binding (for v1, `https://demistify.getagentstudio.dev/v1/authoring/SKILL.md`) and return the islands and layouts the page will use; write their syntax straight into the page. The guide’s relative references resolve beside it, under `/v1/authoring/` for v1:

| Page contains | Canonical reference |
| --- | --- |
| Code/diffs with line comments | `references/code.md` |
| Supplied explorer graph | `references/explorers.md` |
| Flow, board, arrows or layers | `references/maps.md` |
| Tree or mind map | `references/trees.md` |
| Pictures, galleries or image comparison | `references/pictures.md` |
| Aligned alternatives on matching topics | `references/comparisons.md` |
| Ordered steps with expandable evidence | `references/traces.md` |
| Source-derived call-path changes | `references/call-paths.md` |
| Walkthroughs across views/pages, including Gallery Journeys | `references/tours.md` |

IF the page contains a feature named in this table, load its reference and return the constructs the page takes from it.

The main guide owns the available elements, attributes, tones, icons and widths. Recipes in `presentation-html` choose how to explain the content; they do not add API. For a topic comparison, use `comparisons.md` as the canonical comparison guide; `pictures.md` describes the image slider and gallery.

The guide at the page’s binding is the only source of available API. A construct you know only from a proposal, a design discussion or another version, including a different presentation model, stays unavailable until that guide documents it. If the guide cannot be fetched, use a verified matching local copy or report the missing reference; never reconstruct its interface.

## Delivery and viewing

Delivery depends on what the page loads. Library assets from the CDN need no app server, package install or build, but they do need the network. Sibling Markdown or JSON fetched by the page needs HTTP serving or embedding, because browsers block `file://` pages from fetching sibling files. Offline viewing needs the library itself local: either a trusted complete copy of the matching distribution beside the page, with both bindings pointed at it and served over HTTP, or a single-file standalone bundle, which exists only as the source API `bundleStandaloneHtml`. Copy the whole distribution, including hashed chunks, worker, fonts and icons; `runtime.js` and `theme.css` alone break lazy dependencies. A remote runtime executes in the page, so sensitive content also calls for the local copy.

For a direct-file artifact, open it with the OS default app when available; a successful launch proves only that the file opened, not that its content or interactions rendered. If supported browser tooling rejects `file://` by security policy, report that exact rendering gap. Do not switch browser surfaces, use Peekaboo, headless Chrome or raw CDP, or start a server to work around the rejection. HTTP serving is available only for a separately authorized HTTP-delivery task and when tool policy permits it.

The authoring guide for the page’s binding owns the available CLI authoring operations. The Demistify CLI exists only in source; nothing is published to npm. Run documented operations from the monorepo root of a matching Sunstack tools checkout with Node 26 and its pnpm dependencies installed. These verified examples embed a page and check recognized markup:

```sh
node packages/demistify/bin/demistify.ts embed /absolute/path/to/input.html /absolute/path/to/output.html
node packages/demistify/bin/demistify.ts check /absolute/path/to/page.html
```

A passing check proves recognized markup and data constraints, not diagram readability, prose truth, links or interaction.

## Regenerate and compare an embedded copy

An embedded copy is `embed` output, and only a fresh regeneration shows whether it still carries its sources. Regenerate from the live source page, the one whose `<ex-markdown>` islands still carry `src`. `embed` reads each `src` and removes it, so running it on an embedded copy returns that copy unchanged and proves nothing. Write the fresh copy to a temporary path outside the repository and compare it byte for byte with the committed copy:

```sh
node packages/demistify/bin/demistify.ts embed /absolute/path/to/index.html /tmp/<task>/index.embedded.html
cmp /tmp/<task>/index.embedded.html /absolute/path/to/index.embedded.html
```

`embed` writes each source’s exact text and nothing time- or path-dependent, so `cmp` exiting 0 means the committed copy carries every source as it stands now. Any difference means the copy is stale: regenerate it in place with the same `embed` command pointed at the committed path, never edit its text, and run `cmp` again. Return `identical`, or `stale` followed by the result of the comparison after replacement.

Complete when the page’s theme, runtime and guide share one binding, its release is recorded, the chosen elements follow their opened references, the viewing/checker route is available or its exact limitation is reported, and any embedded copy has an `identical` or `stale` comparison result.
