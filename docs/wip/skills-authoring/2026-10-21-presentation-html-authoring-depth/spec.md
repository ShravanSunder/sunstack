# HTML explanation authoring workflow refresh

Proposed update to `sunstack-dev:presentation-html` under `plugins/sunstack-dev/skills/presentation-html/`. This skill owns the whole explanation and its delivery; Demistify's library-owned guide owns actual component syntax and controls. This draft specifies the teaching change before implementation.

## Why this needs a change

The existing workflow already preserves sources, retrieves a matching guide, distinguishes navigation from disclosure and checks delivery. It needs a more concrete route from reader task to content form, component references and a finished example. Agents should be able to select the right depth without reading every component manual or treating every paragraph as a card.

The success condition is a new source-backed explanation task: the agent selects a readable structure, loads the matching component depth, preserves canonical facts and stable links, delivers the requested direct-file artifact, and distinguishes static checks, rendering and observed interactions.

Baseline source: `e34ad3f8b1a97458c8ed5e119869432334321e22`, whose main file and three references match installed sunstack-dev 2.92.0. Name, trigger and invocation capability stay unchanged. This is a behavior-changing, user-directed teaching update; no before/after agent-improvement result is claimed.

This skill helps the agent decide how to present supplied information, then deliver a usable HTML artifact. Demistify's matching guide teaches the component API. The workflow must connect those two jobs without copying the API into another manual.

Its name, HTML-artifact trigger and boundary with chat formatting remain unchanged. Keep both direct invocation and the current model-invocable description. This update changes the teaching path and its depth, not invocation policy.

## The main file's route

1. **Understand the explanation.** Name the reader's question, authoritative inputs, output scope and intended opening method. When revising, inspect the existing artifact and preserve unrelated content, IDs, navigation and binding.
2. **Choose a readable structure.** Put the answer before mechanics and the normal path before exceptions. Decide which material is prose, a table, a relationship view, a comparison, optional detail or a separate page.
3. **Load the matching component teaching.** Establish one binding for runtime, theme, guide and checker. Open the component references required by the chosen structure. Return the selected components, their width and their supported composition.
4. **Compose from the real sources.** Keep facts and exact source text in their owning files/islands. Build navigation around them. Use the shared design system, purposeful headings, ordinary prose and selective callouts.
5. **Check and exercise the artifact.** Fix matching-checker findings, refresh embedded sources, follow links and exercise authored controls through the intended opening method. Return the artifact and honest evidence of what worked.

Keep source preservation, matching API, intended delivery and the completion boundary visible in the main file. Detailed recipes should not hide those obligations.

## Reference responsibilities

| Reference                             | Keep or add                                                                                                                                                    | What it returns                                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `references/demistify.md`             | Retain binding, matching-guide retrieval, direct-file/HTTP delivery and regeneration. Update its component-reference pointers to the accepted guide structure. | Matching release, selected guide depth, viewing/checker route and embedded-source comparison method              |
| `references/authoring-patterns.md`    | Add practical document composition and end-to-end examples.                                                                                                    | The structure chosen for the reader, why it fits, and the implemented arrangement of prose, views and navigation |
| `references/options-and-decisions.md` | Retain corresponding-topic comparisons and explicit proposed/recommended/chosen states; strengthen its example and link to the component detail.               | Comparison form, corresponding topics and the actual state of the decision                                       |
| `references/engineering-documents.md` | Retain canonical Markdown chunks, human/agent entries and the distinct questions of the four documents.                                                        | A source-preserving reader path and views that answer each source's question                                     |

`demistify.md` remains mandatory. Load authoring patterns when the source mixes prose with visual material, alternatives, optional detail or multiple pages. Load options/decisions when readers compare alternatives or inspect an unresolved choice. Load engineering documents when the artifact presents a four-document design set. Each call retains the skill-creation load grammar and names its concrete returned result.

## What the authoring-pattern reference teaches

**A plain explanation.** Start with the reader's question and answer. Use short sections with useful headings. Choose a relationship view only when the relationship becomes easier to understand. Keep claims grounded in the supplied sources.

**Reading beside Canvas.** Apply the matching guide's width standards to the selected components. Keep document headings, paragraphs and dividers aligned together. A wide table or diagram can sit between Reading sections. A text-only tab set can keep its bar and panels at Reading width. The reference explains the choice; it links to the component guide for exact markup and dimensions.

**Tables versus prose.** Use a table when the reader compares the same questions across items. Repeated one-row tables with repeated headers usually make that comparison harder; combine the corresponding material. When each item needs its own explanation or different questions, use Reading sections instead. Do not invent a global layout rule from one private study.

**Optional detail and peer alternatives.** Use local disclosure for depth under the current point. Use Tabs for peer views in one place. Give the control a concise label and keep the complete explanation within the selected content. A disclosure label should say what its hidden material contains.

**Pages and guided paths.** Pages are separate HTML documents with ordinary navigation. A Walkthrough is an optional sequence through existing targets, including targets on other pages. A Gallery Journey is picture-only. A Gallery supplies browsing controls on its own page. A download is an ordinary link. Keep ordinary navigation available without starting a guided path.

**Proposals, decisions and evidence.** Emphasize a consequential proposal, risk, open question or unverified result with the supported card/callout when it helps. Use explicit short status wording and a supported subject icon. Explain what was supplied, what was observed and what remains unknown in the source's own terms.

**Reader-facing examples.** Use meaningful content. A test input that exists to exercise state retention is labelled as an instrument in a test fixture; it is not left unexplained in an ordinary reader artifact.

## The complete examples

Provide a small source-backed collection that an agent can inspect independently:

- An explanation with Reading text, a Canvas table or diagram and local optional detail.
- A linked screenshots page with a real Gallery, normal Pages navigation and an optional Gallery Journey.
- A comparison of long alternatives with corresponding topics and rich evidence.

The examples may reuse one coherent supplied scenario. Keep their prose and facts in Markdown, compose through the supported islands, and show the live-source entry alongside its regenerated direct-file output. A separate agent entry links to the same files.

Add a short explanation of the choices to the authoring-pattern reference: what the reader needed, why these views fit and which alternatives would serve a different task. Do not add a new framework or per-page copy of the library.

## Checks that answer useful questions

| Task                                    | What should be observed                                                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read an explanation with wider material | Headings and prose stay aligned; the visual has room; narrow layout remains usable                                                                |
| Move around a collection                | Pages links work; heading links reach the intended target; command-search context identifies the destination                                      |
| Start a guided path                     | The launcher is visible; the named stops resolve; local hidden containers reveal the intended content; cross-page continuation reaches its target |
| Browse supplied screenshots             | Actual captures and metadata match; ordinary and journey keys have their documented meaning; fullscreen can close back to the expected state      |
| Compare alternatives                    | Corresponding topics align, long content remains reachable and the selected pair is not presented as an owner decision                            |
| Reopen the direct-file output           | Embedded text matches current sources and required images/page links still resolve                                                                |

Keep these checks tied to the artifact's requested behavior. Use the established checker/harness and supported browser surface; do not add temporary tests that only search for the wording used by the implementation.

For a claimed improvement, compare fresh tasks using the prior and changed teaching under the same request and observations. A source-size reduction is separate from model input, cached input, output and reported reasoning usage. The existing three-format study is evidence for its named runs, not proof of this new teaching.

The workflow is complete for an artifact only when the requested content and authored interactions have been checked through its intended delivery path, or the exact unavailable proof is named. Static validation, visual quality, source truth and measured agent behavior remain different claims.

## Scope and source boundaries

Use the existing public component vocabulary and shared theme at the artifact's binding. Examples must use capabilities that release actually supports. Keep static structure checks, rendered behavior, source truth and measured agent usage as separate claims.

Do not introduce a navigation engine, server requirement, renderer or new component API in this teaching change. The proposed general inline status badge remains a separate product question; existing chips and header tags are the current forms. The canceled curved-sidebar experiment is excluded.

Runtime fixes and the neutral rounded table treatment belong to Demistify's product release. The authoring guide may explain them once they are part of the bound release; authored examples should not recreate them with page-specific paint. Preserve the current radius scale and purposeful exceptions rather than assigning a new radius per page.

The implementation keeps each rule in one owner and updates its active callers together. Preserve existing complete material where the inventory identifies it as working. Keep ordinary reader examples meaningful; state-retention instruments belong in explicit fixtures.
