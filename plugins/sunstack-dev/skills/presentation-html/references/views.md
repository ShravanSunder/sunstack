# Named views on a page

This reference owns one decision: the page form for a view or record that another skill names. It does not say what the view must contain. Those fields come from the caller's view request, or from the source document's own view, and every one of them must stay visible in the form you choose.

Expected inputs: the view's name, its required fields, and the source content.

Return, for each view: its form, and the good and bad signals you will check in the screenshot.

## Design views

The names below are the canonical tokens from `docs/diagram-vocabulary.md`.

For a design set, apply `engineering-documents.md`'s source rules before choosing a form below. Reuse a view already in its owning chunk through that chunk's island. A native projection reaches its facts through source anchors or islands; it keeps no second copy of normative prose and preserves every caller-required field. If the requested form cannot expose those fields through the supported composition, return the exact view/composition gap. Do not improvise a renderer or duplicate part of a chunk to fill it.

| View | Form on the page | Good signal | Bad signal |
| --- | --- | --- | --- |
| capability map | `ex-tree`. Each capability shows the fields its view request names, with its home rows as children: U rows in Requirements, R obligations in Specification. Each row links to its heading. Add an area level only above about seven capabilities. Put "also serves" in the row label as a link, never as a second child. Use tones only when the source states a status. | The owner confirms or corrects each capability and its rows in one scan. | One flat table of every row; status the source does not state. |
| journey map — specification | One `ex-trace` per user class. Each step is in the user's words, with pain and evidence in its body. Add a supplied picture per step when one exists, or a Gallery Journey over supplied pictures. | Pain and evidence sit on the step they explain. | Classes chained into one path; invented pain. |
| context diagram | Mermaid `flowchart` or an `ex-board`, with the system as one opaque node and labeled edges to each consumer and surface. | One opaque system node, every consumer on a labeled edge. | Internals drawn inside the system. |
| entity map | Mermaid `erDiagram`. | Cardinality readable on every edge. | Packages, schemas or stores. |
| requirement coverage table | Native table with link cells; group by capability when the source's capability map fires, otherwise keep it ungrouped. | Gaps written as words. | One ungrouped table when the capability map exists. |
| entity -> home map | Native table. | Each home is marked new, modified or existing. | An entity without a home row. |
| component tree | `ex-tree`, with each label carrying its responsibility. | Ownership readable without opening anything. | Folders presented as components. |
| call graph/sequence | A **source-derived call path** (see the section below). Fan-in, async or event edges, or several participants exchanging messages: Mermaid `sequenceDiagram` or a flow, with the path for detail when it helps. | The reader follows the entry to its effect and sees where it can stop. | A branch drawn as a frame; a claimed runtime capture. |
| proof call graph | The same call-path form, with the seam and the real/fake boundary as frame tags. | The fake boundary is visible. | A fake shown as the production path. |
| state machine/table | Mermaid `stateDiagram-v2`; a native table when guards need columns. | Every transition labeled; terminal states marked. | Unlabeled arrows. |
| data/event flow | `ex-flow` or a Mermaid `flowchart`, with the shape named on each boundary edge. | Each boundary edge names what crosses it. | Colliding edge labels; an edge with no shape. |
| failure/recovery flow | `ex-flow` or a Mermaid `flowchart`, with detection, retry and the recovery owner on the edges; or `ex-trace` when each step carries evidence. | The recovery owner is named at each failure. | A happy path with failure as a footnote. |
| trust-boundary view | `ex-board` regions for boundaries, with `ex-arrow` arrows for entry points. | Every entry point crosses a drawn boundary. | A network map with no enforcement point. |
| requirement/design/proof trace | Native table, one row per R; group by the source's capability keys when present. | Every R has a row, and gaps are written as words. | Rows merged across obligations. |
| "proven by" cards | One `ex-card` per requirement. | What stays unverified is on every card. | A card that reads as already proven. |
| coverage rows | Native table; group by the source's capability keys when present. Link a shared observation from each row it serves. | A shared observation appears once and is linked. | The same observation copied into several rows. |

## Workflow records

| Record | Form | Good signal | Bad signal |
| --- | --- | --- | --- |
| research ledger (lanes and the parent's synthesis) | The parent's verdict first, then an `ex-tree` of lane → claim, with tones from the parent's status. | No lane reads as accepted truth. | A lane's claim shown as the verdict. |
| review findings | `ex-note` on the code line for code findings; otherwise an `ex-card` or `ex-callout` per blocking finding, with nits grouped in one list. | Each finding sits next to its evidence. | A card per nit. |
| owner decision brief | the form in `options-and-decisions.md` | The current model is drawn before the options. | Options with no picture of today. |
| debug narrative | `ex-trace`: symptom → suspected boundary → proof → decision → next validation. | Observed results are distinct from inferred ones. | An inference labeled as observed. |

## Plan views

Both read the plan file and add no fact to it.

| View | Form on the page | Good signal | Bad signal |
| --- | --- | --- | --- |
| delivery map | `ex-flow` from PRs to their slices, each slice with its reads and the Verification Design rows it earns, each proof's layer (focused, integration or journey, and whether a journey drives the normal entry), the dependency edges and the integration gates. When the plan spans repositories, a repository level sits above the PRs, with an edge at each point where one repository waits on another. An `ex-tree` when no edges cross. | The owner sees which PR earns which proof, at which layer, and where one PR or repository waits on another. | Slices with hidden dependencies; a journey whose entry the map doesn't state. |
| plan change view | `ex-compare` over corresponding topics, or a list: each change from the superseding plan's "Changed from" section, with what it invalidated (slices, rows, PRs). | Each change shows what it invalidated. | A text diff of the two plans; a change without its invalidations. |

## Page lenses on a design set

| Lens | Form | Good signal | Bad signal |
| --- | --- | --- | --- |
| walkthrough (the feature end to end, a through-line or task path in `index.md`, a PR's slice reads, or a point where one repository waits on another) | a Walkthrough over the islands, in the path's order, as `engineering-documents.md` teaches | It answers a question that crosses documents, or that needs a new order through one file; each stop is an existing island or heading; narration states no rule. | One file's headings in their own order, which is its outline; a path the set does not define. |
| concept section (an idea that two or more capabilities' obligations name) | a section of links: meaning, picture (or a gap returned to the caller), then links by document, as `engineering-documents.md` teaches | A reader learns what the idea is, not only where it appears. | A column or tag of ticks. |

## The source-derived call path

Build the path from nested `ex-trace` frames. Each frame is one real call: its summary names the call in inline code, and its tag names the owner or file. A branch, a return or a refusal belongs in the body of the frame where it happens. It is never a frame of its own. Mark a caller or ordering the source does not establish as unknown, in words. Start the frames that hold a stop open, so the reader sees where the path can end. A text-only path uses `data-width="reading"`. Use Canvas only when frames hold code or diagrams.

Label the view as source-derived. A trace does not capture a runtime stack. When there is runtime evidence, show it as its own evidence.

To compare a current path with a proposed one, put the two paths in `ex-compare` topic rows. Give observable consequences and refusal checks their own corresponding row. Follow the guide's `call-paths.md`.

```html
<ex-trace title="sunstack lint: command to exit code (source-derived)" data-width="reading">
  <details icon="terminal" tag="binary" open>
    <summary><code>sunstack lint</code> dispatches to lint</summary>
    <ex-trace>
      <details icon="gear" tag="lint config" open>
        <summary><code>load_config</code></summary>
        <p>Stops here: an invalid config returns <code>LintInvalid</code>, exit 2.</p>
      </details>
    </ex-trace>
  </details>
</ex-trace>
```

Give a frame a tone only when the source states that call's status, such as Planned for a call that is designed but not built.

Complete when every named view has a form, every field from its view request is visible in that form, its good signal is confirmed in the screenshot, and its bad signal is absent.
