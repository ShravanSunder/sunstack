# Requirement coverage nudges

Seven rules per format (HTML and Markdown) follow the chain [reviewing-four-document-design.md](../references/reviewing-four-document-design.md#requirement-to-observation) walks from a requirement to its observation. The standards are in [requirement-coverage.md](requirement-coverage.md). Every result is worth checking, not a verdict on the design.

| Rule | Piece | What a model reads | Asks |
| --- | --- | --- | --- |
| C001 Specification | each requirement | its text and every Specification obligation | do the obligations state behavior for every outcome and limit it asks of the system? |
| C002 Program Design | each obligation | its text (and list body) and the Program Design passages that name it | does a passage name an owner and an interface or flow that carry it out? |
| C003 Verification Design (cited chain) | each requirement | the obligations, the V items, and its own Verification and trace rows | is every obligation that cites it accounted for; do those observations keep their V's threshold, reference and target at the declared seam? (in that order). Its pass covers only obligations that cite the requirement |
| C007 Verification Design (uncited) | each requirement | the obligations, its own Verification rows and the page's shared observations | is every obligation that serves it without citing it accounted for? Warns on a clear no and is otherwise `uncertain`; it never passes, because whether an uncited obligation serves a requirement is a line independent labellers drew differently |
| C004–C006 | each Requirements page | whether each sibling page exists | mechanical: one warning per absent page |

Ids are link data in every request, but the model judges meaning: an obligation that serves a requirement without citing its id counts (C001, C007), and a coverage-table row that only lists ids does not. C003 and C007 count only the requirement's own Verification rows; an observation listed under another requirement doesn't account for it. An absent page gets one warning; its requirement checks end `not_applicable`.

**Not checked:** an obligation that serves a requirement without citing its id is checked only for whether its own Verification rows account for it (C007). Whether its observation keeps its V's threshold, reference and target, and sits at the declared seam, is not checked by any rule: C003 checks those only for cited obligations.

## What it reads

A design set is one folder holding `requirements`, `specification`, `program-design` and `verification` (or `verification-design`), all `.html` or all `.md`.

- **Requirement definitions:** an HTML element whose own `id` is `U<n>`; a Markdown table row whose first cell is the id, or a section whose heading starts with it.
- **Obligation definitions:** an HTML element whose own `id` is `R<n>`; in Markdown, a table row whose first cell starts with the id (`| R1 |`, `| R1 · title |`), a list item (`- **R1.** …`), a section heading, or a paragraph that opens with the id (`**R17 — title** (U16).`, `R15 (U15): …`) whose list body follows it. Three things that start with an id are not definitions:
  - a range row or item (`| R19–R20 … |`);
  - a row of a proof table, meaning a table whose second header cell starts with Evidence or Proof, or a table under a heading that starts with Proof (`## Proof obligations`, `## 6. Proof`);
  - an item or paragraph repeating the id inside a section whose heading starts with it (`### R1. title`), where the section is the definition.

  An obligation stated once and elaborated later under a heading that starts with the same id still gives two pieces; telling which one is the definition needs a one-piece-per-id rule the engine doesn't have.
- **V items:** the same shapes with `V<n>`, plus a paragraph that opens with one (`V1 decides R1 …`). A V stated inside the obligation's own passing condition is read there.
- **Passages:** table rows, list items, paragraphs, and Markdown sections whose heading names an obligation id.

Not read: chunked sets (one folder per document), definitions inside Markdown islands or JSON strings, and several requirement definitions on one source line (a minified page) when used as cases. Program Design that names requirements but never obligation ids gives C002 no passages to read until the engine can list the ids an obligation cites.

## Run it

C001–C003 and C007 ask the decision model (`jev-latest`), so a run needs the authorized model credential route; never supply a stand-in key. From this repository root, name the design set's folder:

```sh
pnpm dlx @sunstack/cli@0.22.2 lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json ./docs/specs/2026-11-14-example
```

The config sets `limits.max_input_tokens_per_request` to 64000 (Lead-approved, 14 Nov 2026). The engine estimates about one token per character, and C003's and C007's requests carry the whole obligation list, so the default 32000 refused requests from about 32.9k characters. The largest prepared request on the development cases is 54.4k characters.

To see what each request would carry without sending anything, add `--prepare <file>` and read one request with `lint show <file> <id>`. From another project, use the installed skill's absolute config path and add `--root "$PWD"`. Warnings come with exit 0; `uncertain` results (exit 5) mean the model's answer fell between the bars and are worth reading too.

## Proof

`tests/skills/tests/integration/requirement-coverage.test.ts` proves the collection without a model: the rule list, and on small HTML and Markdown sets that each prepared request carries its requirement's own passages (and not a look-alike id's), every definition shape above, and one warning for an absent page. Whether the questions decide well is measured on independently labelled cases from real design sets and built controls, prepared and desk-checked before any run, then reviewed before any answer is requested.

**Bars (P(yes), inclusive).** C001, C002 and C007 are frozen from the round-8 development answers (instrument `70b18679`, sunstack 0.22.2, `typesafe/jev-1.14-20261014`, 14 Nov 2026; costs false warning 1, miss 2, uncertain 0.5). Where two bars cost the same, the one with no false warning was taken.

| Rule | yes ≥ | no ≤ | Development result | Set by | Named misses |
| --- | --- | --- | --- | --- | --- |
| C001 | .35 | .15 | 13 cases: 11 right, 0 false warnings, 0 misses, 2 uncertain | highest warn below the no-bar .12; lowest pass above the yes-bar .38 | cov-27 (pass, .18) and cov2-05 (warn, .19) are inverted by .01, so both stay uncertain |
| C002 | .45 | .15 | 26 cases: 21 right, 0 false warnings, 1 miss, 4 uncertain | highest warn below the no-bar .14; the warn at .42 sits just under the yes-bar; lowest pass above it .47 | R2 (adjudicated warn) answers .71, a confident miss |
| C007 | unused | .35 | 8 cases: 2 warnings, 6 abstentions, 0 false warnings | warns at .29 and .31; lowest abstention .41 | none |
| C003 | .70 | .30 | provisional, **not frozen** | — | its accounting question absorbs threshold and seam failures, so warns land on the wrong question; it is being redesigned |

C001 and C002 also go to one held-out run, which the label holder scores. **C007 has no held-out labels, so it ships on development evidence only**, and both of its warn cases are built controls. These are selected development cases, not an accuracy rate; how an agent acts on a nudge is unobserved.
