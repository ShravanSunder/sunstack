# Requirement coverage nudges

Six rules per format (HTML and Markdown) follow the chain [reviewing-four-document-design.md](../references/reviewing-four-document-design.md#requirement-to-observation) walks from a requirement to its observation. The standards are in [requirement-coverage.md](requirement-coverage.md). Every result is worth checking, not a verdict on the design.

| Rule | Piece | What a model reads | Asks |
| --- | --- | --- | --- |
| C001 Specification | each requirement | its text and every Specification obligation | do the obligations state behavior for every outcome and limit it asks of the system? |
| C002 Program Design | each obligation | its text (and list body) and the Program Design passages that name it | does a passage name an owner and an interface or flow that carry it out? |
| C003 Verification Design | each requirement | the obligations that name it, the V items, and its own Verification and trace rows | is every linked obligation accounted for; do observations keep their V's threshold, reference and target at the declared seam? (in that order) |
| C004–C006 | each Requirements page | whether each sibling page exists | mechanical: one warning per absent page |

Ids are link data in every request, but the model judges meaning: an obligation that serves a requirement without citing its id counts, and a coverage-table row that only lists ids does not. C003 counts only the requirement's own Verification rows; an observation listed under another requirement doesn't account for it. An absent page gets one warning; its requirement checks end `not_applicable`.

## What it reads

A design set is one folder holding `requirements`, `specification`, `program-design` and `verification` (or `verification-design`), all `.html` or all `.md`.

- **Requirement definitions:** an HTML element whose own `id` is `U<n>`; a Markdown table row whose first cell is the id, or a section whose heading starts with it.
- **Obligation definitions:** an HTML element whose own `id` is `R<n>`; in Markdown, a table row whose first cell starts with the id (`| R1 |`, `| R1 · title |`), a list item (`- **R1.** …`), a section heading, or a paragraph that opens with the id (`**R17 — title** (U16).`, `R15 (U15): …`) whose list body follows it.
- **V items:** the same shapes with `V<n>`, plus a paragraph that opens with one (`V1 decides R1 …`). A V stated inside the obligation's own passing condition is read there.
- **Passages:** table rows, list items, paragraphs, and Markdown sections whose heading names an obligation id.

Not read: chunked sets (one folder per document), definitions inside Markdown islands or JSON strings, and several requirement definitions on one source line (a minified page) when used as cases. Program Design that names requirements but never obligation ids gives C002 no passages to read until the engine can list the ids an obligation cites.

## Run it

C001–C003 ask the decision model (`jev-latest`), so a run needs the authorized model credential route; never supply a stand-in key. From this repository root, name the design set's folder:

```sh
pnpm dlx @sunstack/cli@0.22.0 lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json ./docs/specs/2026-11-14-example
```

The config sets `limits.max_input_tokens_per_request` to 64000 (Lead-approved, 14 Nov 2026). The engine estimates about one token per character, and C003's request carries the whole obligation list for its linked-complete question, so the default 32000 refused requests from about 32.9k characters. The largest prepared request on the development cases is 49.9k characters.

To see what each request would carry without sending anything, add `--prepare <file>` and read one request with `lint show <file> <id>`. From another project, use the installed skill's absolute config path and add `--root "$PWD"`. Warnings come with exit 0; `uncertain` results (exit 5) mean the model's answer fell between the bars and are worth reading too.

## Proof

`tests/skills/tests/integration/requirement-coverage.test.ts` proves the collection without a model: the rule list, and on small HTML and Markdown sets that each prepared request carries its requirement's own passages (and not a look-alike id's), every definition shape above, and one warning for an absent page. Whether the questions decide well is measured on independently labelled cases from real design sets, prepared and desk-checked before any run; the bars stay provisional (0.7 / 0.3) until the development run sets them.
