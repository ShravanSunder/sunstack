# Requirement coverage nudge

These six mechanical rules collect every requirement id defined on a design set's Requirements page and warn once per id for each of the Specification, Program Design and Verification Design pages that never names it. Each warning sits on the requirement's definition and is worth checking, not a failure: an id that appears does not prove the need is addressed, and an id that is missing does not prove it isn't. Read [reviewing-four-document-design.md](../references/reviewing-four-document-design.md#requirement-to-observation) before changing a page. The standards each rule approximates are in [requirement-coverage.md](requirement-coverage.md).

## What it reads

A design set is one folder holding the four pages under the names in `sunstack-dev/shared-references/design-documents.md`, all HTML or all Markdown:

```text
requirements.html     specification.html     program-design.html     verification.html
requirements.md       specification.md       program-design.md       verification.md
```

A requirement definition is:

- on an HTML page, any element whose own `id` attribute is a requirement id, such as `<tr id="U1">`, `<section id="U3">` or `<aside class="design-item" id="U4">`; `data-id`, `href="#U1"` and text that only mentions an id are not definitions;
- in a Markdown source, a table row whose first cell is the id (`| U1 | ... |`, bold allowed) or a level 2 to 6 heading that starts with it (`## U2 — ...`).

A page names an id when the id occurs anywhere in its source as a whole token: `U1` counts in `(U1)`, `U1, U2` and `requirements.html#U1`, but not in `U10` or `XU1`.

## What it doesn't read

- **An absent page.** The engine cannot route on a missing page, so each rule whose page is absent ends `incomplete` ("evidence unavailable") for every requirement and the run exits 3. That is one condition, the page is not written yet, not one problem per requirement; report it once. The other pages are still checked.
- **Other file names.** Only the names above are read. A set whose Verification Design is `verification-design.html` reads as one with no Verification Design.
- **Other layouts and markup.** A chunked set (one folder per document), definitions inside a Markdown island of an HTML page, or Markdown carried in a JSON string select no definitions, so nothing is checked and nothing warns. Zero results on a Requirements page means its definitions weren't read, not that coverage is complete.

## Run it

From this repository root, name the design set's folder (no model key needed):

```sh
pnpm dlx @sunstack/cli@0.19.0 lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json ./docs/specs/2026-11-13-example
```

From another project, use that installed skill's absolute `rules/requirement-coverage.config.json` path after `--config`, and add `--root "$PWD"`. Named paths resolve from your current directory. `--report <file>` keeps every result with its line. Read the findings and the incomplete lines, not the exit code: warnings come with exit 0; exit 3 means a page is absent and can also carry warnings. No page is changed.

## Proof

The integration test `tests/skills/tests/integration/requirement-coverage.test.ts` runs the pinned CLI on small HTML and Markdown sets: every page names every id, one page misses an id, look-alike ids (`U20`, `XU2`, `data-id`) don't count, and an absent page. On 13 Nov 2026 the rules were rerun on the three frozen design sets from the requirement-coverage experiment whose definitions this markup reads (document browsers in HTML; OAuth routing and TUI components in Markdown, renamed to the names above): all 86 requirement/page pairs matched that experiment's exact-id reference, 74 covered and 12 missing, with OAuth's absent Verification Design incomplete for its 13 requirements. Its fourth set keeps its Requirements as Markdown in a JSON string and was not read.

This pins CLI 0.19.0, like the picture nudge; the shared skill-rule test engine remains on 0.9.0.
