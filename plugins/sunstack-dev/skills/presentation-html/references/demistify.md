# Demistify delivery and component documentation

This reference owns the shared-library binding, version-matched API retrieval and local viewing. Inputs: the page scope, any existing asset binding and available authoring tools. Return the exact runtime/theme and documentation sources, component choices and viewing/checker method.

## Public assets

For a new page use this verified experimental pin:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Engineering explanation</title>
<link rel="stylesheet" href="https://demistify-assets-cli-experiment.askluna.workers.dev/demistify/experimental/c96a72e/theme.css">
<script type="module" src="https://demistify-assets-cli-experiment.askluna.workers.dev/demistify/experimental/c96a72e/runtime.js"></script>
</head>
<body><ex-document>
<!-- Compose the explanation here. -->
</ex-document></body>
</html>
```

No React, Vite, package install or app server is needed by this HTML consumer. The browser fetches optional renderer chunks, fonts and worker assets relative to that same library version. Keep theme and runtime on one exact pin. This is an experimental URL, with no promised stable alias or retention service; do not invent `/latest/`.

The canonical component guide for that pin is:

`https://demistify-assets-cli-experiment.askluna.workers.dev/demistify/experimental/c96a72e/authoring/SKILL.md`

MUST load that URL and return the component syntax and composition rules needed by the page. Treat it as the library API reference even though its file retains embedded-skill frontmatter; this Sunstack skill owns the authoring workflow. The library guide’s relative references resolve beside it:

| Page contains | Canonical reference |
| --- | --- |
| Code/diffs with line comments | `references/code.md` |
| Supplied explorer graph | `references/explorers.md` |
| Flow, board, arrows or layers | `references/maps.md` |
| Tree or mind map | `references/trees.md` |
| Pictures, galleries or image comparison | `references/pictures.md` |
| Guided routes across views/pages | `references/tours.md` |

IF the page contains a feature named in this table, load its corresponding reference relative to the canonical guide URL and return the attributes, composition and data-reference rules applied to the page. Use supplied explorer data and stable graph IDs rather than duplicate the graph or generate another application. Markdown may contain Mermaid fences; explicit Mermaid islands are also supported. D2 diagrams are outside this library.

For a revision retaining another pin, obtain documentation and the checker from that release’s supplied distribution or matching source revision. Do not silently use the default pin’s API against an older runtime. If the public guide cannot be fetched, use a verified matching local copy; report an unavailable required reference and avoid fabricating its interface.

## View and validate

An ordinary HTML page can load the public library in a browser. For relative JSON/data, or when the host blocks local-file URLs, serve the artifact directory through an available static HTTP server. Python, when installed, provides one:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory /path/to/explainer-directory
```

Open `http://127.0.0.1:4174/page.html` in the supported browser. Choose an unused port. This serves the page and its data; it does not rebuild the library. Relative links provide multiple pages, ordinary `nav aria-label="Breadcrumb"` provides breadcrumbs, and page headings generate the left outline.

The static checker currently comes from a matching Sunstack tools source checkout, with Node 26 and that checkout’s pnpm dependencies already installed. Run from its monorepo root:

```sh
node packages/demistify/bin/demistify.ts check /absolute/path/to/page.html
```

There is no published standalone checker/npm installation promised here. When it is unavailable, state that limitation and still inspect the real browser result. A successful checker proves recognized markup/data constraints, not diagram readability, prose truth, links or interaction. Check the actual supplied document, including relative data, sidebar/fullscreen controls and navigation.

## Local or offline library

A remote runtime executes in the page. For sensitive content or offline use, use a trusted complete build of the matching library beside the page, change both bindings to that local directory, and serve it locally. Copy the whole distribution, including hashed chunks, worker, fonts and icon files; copying only runtime.js/theme.css breaks lazy dependencies. Match the guide/checker to that same source revision. A CDN-bound file is not a self-contained offline export; a single-file bundle requires the library’s separate packaging support.

Complete when the asset and guide versions match, the chosen elements follow their opened references, and the viewing/checker route is available or its exact limitation is reported.
