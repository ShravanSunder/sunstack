# Demistify delivery and component documentation

This reference owns the library binding, retrieval of the guide that matches it, and delivery and viewing. Inputs: the page scope, any existing binding and available authoring tools. Return the binding and its release, the guide and references read, component choices and the viewing/checker method.

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

A page that keeps an older binding uses that release’s own guide and checker. A hosted release keeps its guide at `authoring/SKILL.md` beside `runtime.js`; never apply the v1 API to an older runtime.

## Component guide

MUST load the guide for the page’s binding (for v1, `https://demistify.getagentstudio.dev/v1/authoring/SKILL.md`) and return the islands and layouts the page will use; write their syntax straight into the page. The guide’s relative references resolve beside it, under `/v1/authoring/` for v1:

| Page contains | Canonical reference |
| --- | --- |
| Code/diffs with line comments | `references/code.md` |
| Supplied explorer graph | `references/explorers.md` |
| Flow, board, arrows or layers | `references/maps.md` |
| Tree or mind map | `references/trees.md` |
| Pictures, galleries or image comparison | `references/pictures.md` |
| Guided routes across views/pages | `references/tours.md` |

IF the page contains a feature named in this table, load its reference and return the constructs the page takes from it.

The guide at the page’s binding is the only source of available API. A construct you know only from a proposal, a design discussion or another version, including a different presentation model, stays unavailable until that guide documents it. If the guide cannot be fetched, use a verified matching local copy or report the missing reference; never reconstruct its interface.

## Delivery and viewing

Delivery depends on what the page loads. Library assets from the CDN need no app server, package install or build, but they do need the network. Sibling Markdown or JSON fetched by the page needs HTTP serving or embedding, because browsers block `file://` pages from fetching sibling files. Offline viewing needs the library itself local: either a trusted complete copy of the matching distribution beside the page, with both bindings pointed at it and served over HTTP, or a single-file standalone bundle, which exists only as the source API `bundleStandaloneHtml`. Copy the whole distribution, including hashed chunks, worker, fonts and icons; `runtime.js` and `theme.css` alone break lazy dependencies. A remote runtime executes in the page, so sensitive content also calls for the local copy.

For sibling files, or when the browser tool blocks `file://` URLs, Python provides a static server when installed. Choose an unused port and open `http://127.0.0.1:4174/page.html` in the supported browser:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory /path/to/explainer-directory
```

The Demistify CLI exists only in source and provides `embed` and `check`; nothing is published to npm. Run it from the monorepo root of a matching Sunstack tools checkout with Node 26 and its pnpm dependencies installed:

```sh
node packages/demistify/bin/demistify.ts embed /absolute/path/to/input.html /absolute/path/to/output.html
node packages/demistify/bin/demistify.ts check /absolute/path/to/page.html
```

A passing check proves recognized markup and data constraints, not diagram readability, prose truth, links or interaction.

Complete when the page’s theme, runtime and guide share one binding, its release is recorded, the chosen elements follow their opened references, and the viewing/checker route is available or its exact limitation is reported.
