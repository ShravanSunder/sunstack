# Demistify delivery and component documentation

Use one library base for the guide, runtime, theme and CLI. Read the matching guide once, then prepare the reader for its intended opening method. The main workflow owns the single lint pass and any explicitly requested verification.

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

`/v1/` is a moving experimental major path: breaking changes can land within v1 until a stable major is declared. Past majors are retained, but v1 keeps no public history of its minor releases, and the current release metadata is available in `release.json` when a version-specific diagnosis needs it. Routine authors do not audit release hashes or source commits. Keep theme and runtime on one binding; the browser fetches renderer chunks, fonts and worker assets relative to it.

A page that keeps an older binding uses that release’s own guide and checker, ; never attach current v1 metadata to it or migrate it only to get a release record. A hosted release keeps its guide at `authoring/SKILL.md` beside `runtime.js`; never apply the v1 API to an older runtime.

An unreleased source preview uses the complete matching built library, verified local component guide and matching source tools. Name it as a local preview rather than a published release. Read the candidate guide's relative references from that same source tree. A source PR, a package version or an installed workflow skill does not establish that the public runtime supports the candidate API.

## Component guide

MUST load the guide for the page’s binding (for v1, `https://demistify.getagentstudio.dev/v1/authoring/SKILL.md`) and return the islands and layouts the page will use; write their syntax straight into the page. The guide’s relative references resolve beside it, under `/v1/authoring/` for v1. Follow the guide's own MUST/IF calls, including its content/source-carrier reference and the conditional references for the components and navigation this page uses; return the constructs and delivery decisions taken from each.

The main guide owns the available elements, attributes, tones, icons and widths. Recipes in `presentation-html` choose how to explain the content; they do not add API. For a topic comparison, use `comparisons.md` as the canonical comparison guide; `pictures.md` describes the image slider and gallery.

The guide at the page’s binding is the only source of available API. A construct you know only from a proposal, a design discussion or another version, including a different presentation model, stays unavailable until that guide documents it. If the guide cannot be fetched, use a verified matching local copy or report the missing reference; never reconstruct its interface.

## Delivery and viewing

Delivery depends on what the page loads. Library assets from the CDN need no app server, package install or build, but they do need the network. Sibling Markdown or JSON fetched by the page needs HTTP serving or embedding, because browsers block `file://` pages from fetching sibling files. Offline viewing needs the library itself local: either a trusted complete copy of the matching distribution beside the page, with both bindings pointed at it and served over HTTP, or a single-file standalone bundle, which exists only as the source API `bundleStandaloneHtml`. Copy the whole distribution, including hashed chunks, worker, fonts and icons; `runtime.js` and `theme.css` alone break lazy dependencies. A remote runtime executes in the page, so sensitive content also calls for the local copy.

`presentation-html` step 5 owns the static authoring check. Opening or driving a browser is not a routine delivery requirement.

## Prepare the reader

The matching guide owns the CLI operations and tool route. When it ships `demistify-cli.tgz`, run it with Node 26+ through `pnpm dlx` or `npx --yes`; it includes its dependencies and needs no browser or checkout. Use the same base as the page. For an older binding without that tarball, use its documented source CLI if already available; do not clone a repository or install browser tooling just to lint a document. Readers run no command.

1. Inspect the page's source history and dependencies before treating missing `src` as inline authorship. A generated embedded copy or known-source refresh uses its retained live source page and original Markdown, even though the output has consumed `src`. Missing required originals are a gap; the generated copy cannot prove freshness. Other pages with local Markdown references retain those files and a live source page such as `guide.source.html`. An independently authored inline page with neither local Markdown references nor a known-source refresh remains the reader and skips embedding.
   For generation or a local edit, keep model context on retained source wrappers and affected Markdown; let the tools read the complete explicit collection. Keep each walkthrough definition on its owning source page. Return concise file/count/issue results instead of generated readers or index payloads.
2. After composition is complete, use the CLI at the page's binding:

   ```sh
   pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz embed /path/guide.source.html /path/guide.html
   ```

   Keep output beside input or preserve its relative page/image layout. Deliver `guide.html`; retain `guide.source.html` and its Markdown for updates. The transform embeds exact Markdown, including literal script terminators. It does not inline arbitrary JSON, pictures, the library or fonts. Prepare other local data only through a route documented by the matching guide, or name the unresolved dependency.
3. For shared collection search or Walkthrough discovery, embed each live-source page first, then index every explicit delivered page, including peers without local walkthroughs:

   ```sh
   pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz index /path/guide.html /path/details.html
   ```

   Keep stable island IDs, relative paths and the input list. An authored inline peer participates without an extra embed. Keep `ex-nav` and the same Pages links on each peer. Give each peer an ordinary link to each shared path's owning reader and stable ID: a path `review` declared in `guide.source.html` is linked as `<a href="guide.html#review">Review path</a>`. The matching guide owns any dedicated path launcher; index data does not replace authored navigation. After a local source edit, regenerate affected readers and refresh the complete collection index. The matching guide owns navigation syntax, indexing order and freshness.
4. Lint the changed final HTML files once after all transforms:

   ```sh
   pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check /path/guide.html /path/details.html
   ```

   For a single reader, list only that file. Fix errors; treat warnings as advice. A passing check proves recognized markup/data constraints, not readability, source truth, links or interaction. Apply permitted repairs to the live HTML/Markdown source, never directly to generated output (including with `check --fix`); prepare and index again as applicable, then recheck every final file. If a repair exceeds the delivery-only grant or needs a product change, return the exact failed check/gap instead. Main step 5 owns the single lint pass; no browser observation is required for routine authoring.
5. Return the reader files, the retained authoring-source paths and the actual companions that must travel with them: linked pages, relative pictures and any unresolved local data. Embedded Markdown need not travel for rendering. State whether the shared library or data still needs the network. Fully offline delivery needs a complete matching distribution or a documented standalone route; it is a distinct target, not a consequence of embedding prose.

## Updating prepared readers

After changing a known live source, rerun its embed and collection-index transforms. Keep edits in the authoring source, not generated HTML. A fresh generation from that source is sufficient for routine delivery; do not generate a second temporary collection solely for byte-comparison proof. Use a comparison only when investigating a stale-output defect or explicitly asked to prove freshness.
