# Requirement coverage nudge

These twelve mechanical rules (six per format) collect every requirement id defined on a design set's Requirements page and warn once per id for each of the Specification, Program Design and Verification Design pages that never names it, on the requirement's definition. A page that is absent gets one warning for the set, on the Requirements page, and its per-requirement checks are skipped. Each warning is worth checking, not a failure: an id that appears does not prove the need is addressed, and an id that is missing does not prove it isn't. Read [reviewing-four-document-design.md](../references/reviewing-four-document-design.md#requirement-to-observation) before changing a page. The standards each rule approximates are in [requirement-coverage.md](requirement-coverage.md).

## What it reads

A design set is one folder holding the four pages, all HTML or all Markdown. The names come from `sunstack-dev/shared-references/design-documents.md`, plus `verification-design` as the Verification Design name that real sets use; the first name that exists is read:

```text
requirements.html     specification.html     program-design.html     verification.html | verification-design.html
requirements.md       specification.md       program-design.md       verification.md   | verification-design.md
```

A requirement definition is:

- on an HTML page, any element whose own `id` attribute is a requirement id, such as `<tr id="U1">`, `<section id="U3">` or `<aside class="design-item" id="U4">`; `data-id`, `href="#U1"` and text that only mentions an id are not definitions;
- in a Markdown source, a table row whose first cell is the id (`| U1 | ... |`, bold allowed) or a level 2 to 6 heading that starts with it (`## U2 — ...`).

A page names an id when the id occurs anywhere in its source as a whole token: `U1` counts in `(U1)`, `U1, U2` and `requirements.html#U1`, but not in `U10` or `XU1`.

## What it doesn't read

- **An absent page is not a coverage gap.** Its one warning says the page isn't beside the Requirements page; if it isn't written yet, name it once as not yet written. Its per-requirement checks end `not_applicable`. A page that exists but can't be read stays `incomplete` and is not replaced by another name.
- **Other file names.** Only the names above are read; any other name reads as an absent page.
- **Other layouts and markup.** A chunked set (one folder per document), definitions inside a Markdown island of an HTML page, or Markdown carried in a JSON string select no definitions, so nothing is checked and nothing warns. Zero results on a Requirements page means its definitions weren't read, not that coverage is complete.

## Run it

From this repository root, name the design set's folder (no model key needed):

```sh
pnpm dlx @sunstack/cli@0.20.1 lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json ./docs/specs/2026-11-13-example
```

From another project, use that installed skill's absolute `rules/requirement-coverage.config.json` path after `--config`, and add `--root "$PWD"`. Named paths resolve from your current directory. `--report <file>` keeps every result with its line. Read the findings, not the exit code: warnings come with exit 0; exit 3 means a present page couldn't be read. No page is changed.

## Proof

The integration test `tests/skills/tests/integration/requirement-coverage.test.ts` runs the pinned CLI on small HTML and Markdown sets: every page names every id, one page misses an id, look-alike ids (`U20`, `XU2`, `data-id`) don't count, a `verification-design` page in both formats, and an absent page. On 14 Nov 2026 the rules were rerun on the three frozen design sets from the requirement-coverage experiment whose definitions this markup reads (document browsers in HTML; OAuth routing and TUI components in Markdown), under their real file names: all 86 requirement/page pairs matched that experiment's exact-id reference, 74 covered and 12 missing, and OAuth's absent Verification Design gave one warning with its 13 requirement checks skipped. Its fourth set keeps its Requirements as Markdown in a JSON string and was not read.

This pins CLI 0.20.1, which reads candidate page names and routes an absent page; the shared skill-rule test engine remains on 0.9.0.
