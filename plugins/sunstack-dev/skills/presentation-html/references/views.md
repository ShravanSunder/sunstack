# Named views on a page

This reference owns one decision: the page form for a view or record that another skill names. It does not say what the view must contain. Those fields come from the caller's view request, or from the source document's own view, and every one of them must stay visible in the form you choose.

Expected inputs: the view's name, its required fields, and the source content.

Return, for each view: its form, and the good signal you will confirm in the screenshot.

## Design views

The names below are the canonical tokens from `docs/diagram-vocabulary.md`.

| View | Form on the page | Good signal | Bad signal |
| --- | --- | --- | --- |
| capability map | `ex-tree`. Each capability shows its key and the owner's purpose, with its home rows as children: U rows in Requirements, R obligations in Specification. Each row links to its heading. Add an area level only above about seven capabilities. Put "also serves" in the row label as a link, never as a second child. Use tones only when the source states a status. | The owner confirms or corrects each capability and its rows in one scan. | One flat table of every row; status the source does not state. |
| journey map — specification | One `ex-trace` per user class. Each step is in the user's words, with pain and evidence in its body. Add a supplied picture per step when one exists, or a Gallery Journey over supplied pictures. | Pain and evidence sit on the step they explain. | Classes chained into one path. |
| context diagram | Mermaid `flowchart` or an `ex-board`, with the system as one opaque node and labeled edges to each consumer and surface. | One opaque system node. | Internals drawn inside the system. |
| entity map | Mermaid `erDiagram`. | Cardinality readable on every edge. | Packages, schemas or stores. |
| requirement coverage table | Native table grouped by capability, with link cells. | Gaps written as words. | One ungrouped table when the capability map exists. |
| entity -> home map | Native table. | Each home is marked new, modified or existing. | |
| component tree | `ex-tree`, with each label carrying its responsibility. | Ownership readable without opening anything. | Folders presented as components. |
| call graph/sequence | A **source-derived call path** (see the section below). Fan-in, async or event edges, or several participants exchanging messages: Mermaid `sequenceDiagram` or a flow, with the path for detail when it helps. | The reader follows the entry to its effect and sees where it can stop. | A branch drawn as a frame; a claimed runtime capture. |
| proof call graph | The same call-path form, with the seam and the real/fake boundary as frame tags. | The fake boundary is visible. | |
| state machine/table | Mermaid `stateDiagram-v2`; a native table when guards need columns. | Every transition labeled; terminal states marked. | Unlabeled arrows. |
| data/event flow | `ex-flow` or a Mermaid `flowchart`, with the shape named on each boundary edge. | | Colliding edge labels. |
| failure/recovery flow | `ex-flow` or a Mermaid `flowchart`, with detection, retry and the recovery owner on the edges; or `ex-trace` when each step carries evidence. | | |
| trust-boundary view | `ex-board` regions for boundaries, with arrows for entry points. | Every entry point crosses a drawn boundary. | |
| requirement/design/proof trace | Native table, one row per R, grouped by capability. | | |
| "proven by" cards | One `ex-card` per requirement. | What stays unverified is on every card. | |
| coverage rows | Native table grouped by capability. Link a shared observation from each row it serves. | | |

## Workflow records

| Record | Form | Good signal |
| --- | --- | --- |
| research ledger (lanes and the parent's synthesis) | The parent's verdict first, then an `ex-tree` of lane → claim, with tones from the parent's status. | No lane reads as accepted truth. |
| review findings | `ex-note` on the code line for code findings; otherwise an `ex-card` or `ex-callout` per blocking finding, with nits grouped in one list. | Each finding sits next to its evidence. |
| owner decision brief | `options-and-decisions.md` | The current model is drawn before the options. |
| debug narrative | `ex-trace`: symptom → suspected boundary → proof → decision → next validation. | Observed results are distinct from inferred ones. |
| plan slices and order | `ex-tree` checklist; `ex-flow` when dependencies cross slices. | |

## Page lenses on a design set

| Lens | Form | Good signal |
| --- | --- | --- |
| reading path (a through-line or task path in `index.md`) | a Walkthrough over the islands, in the path's order (see `engineering-documents.md`) | each stop is an existing island or heading; narration states no rule |
| concept section (an idea that two or more capabilities' obligations name) | a section: meaning link, picture link (or "picture missing"), then links grouped by document (see `engineering-documents.md`) | a reader learns what the idea is, not only where it appears |

## The source-derived call path

Build the path from nested `ex-trace` frames. Each frame is one real call: its summary names the call in inline code, and its tag names the owner or file. A branch, a return or a refusal belongs in the body of the frame where it happens. It is never a frame of its own. Mark a caller or ordering the source does not establish as unknown, in words. Start the frames that hold a stop open, so the reader sees where the path can end. A text-only path uses `data-width="reading"`. Use Canvas only when frames hold code or diagrams.

Label the view as source-derived. A trace does not capture a runtime stack. When there is runtime evidence, show it as its own evidence.

To compare a current path with a proposed one, put the two paths in `ex-compare` topic rows. Give observable consequences and refusal checks their own corresponding row. Follow the guide's `call-paths.md`.

```html
<ex-trace title="sunstack lint: command to exit code (source-derived)" data-width="reading">
  <details icon="terminal" tone="planned" tag="binary" open>
    <summary><code>sunstack lint</code> dispatches to lint</summary>
    <ex-trace>
      <details icon="gear" tone="planned" tag="lint config" open>
        <summary><code>load_config</code></summary>
        <p>Stops here: an invalid config returns <code>LintInvalid</code>, exit 2.</p>
      </details>
    </ex-trace>
  </details>
</ex-trace>
```

Complete when every named view has a form, every field from its view request is visible in that form, and its good signal is confirmed in the screenshot.
