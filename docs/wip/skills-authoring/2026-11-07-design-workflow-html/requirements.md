# Requirements: the four-document design workflow as an HTML system

Draft, 7 Nov 2026, by the design-documents Lead (claude-local/b6c842e4); revised the same night around the owner's lab components (Q069–Q074). Open: two of the owner's answers on his decision page (how agents read and check a design; whether the skills wait for the components' release) and his confirmation of the success definition below. Quotes are exact owner words from `owner-words.md` (memory-logs `skills/authoring/2026-11-07-design-workflow-html/`), cited by row; the two 5 Nov quotes are from the Demistify Lead's `owner-request.md` (sunstack-tools `fix-demistify-document-drawers` worktree, `tmp/review-handoffs/2026-11-05-document-system-formalization/`).

## The change

- **Class:** behavior-changing. It replaces the mental model of where a design set's truth lives and how its documents link (`design-documents.md`, `diagram-rendering-and-fallbacks.md`), changes the artifact step of every phase that writes a document (`spec-design`, `program-design`, `verification-design`, `orchestrator-design`, `discuss-pathfinding`'s capability list), the page references (`presentation-html`'s `engineering-documents.md` and `views.md`), the review's navigation checks (`spec-program-review`), page upkeep (`docs-maintain`) and the plan record (`plan-implementation`).
- **Run kind:** update, across several skills, one run per skill.
- **The reusable behavior:** these skills help agents reliably write a design as the owner's set of linked document pages, each document's text at stable IDs on its own page and one record for each need, obligation, design part, check and call path naming what it serves, so that his requirement browser and call-stack browser show any need with its specification, program design and verification, whenever a design cycle writes or revises Requirements, Specification, Program Design or Verification Design.

## The need, in the owner's words

- **The assignment (Q001, 7 Nov, to Sun):** "Tell lead of 198 his next work is to use the other agent ai tools latest creation skills to make a pr to change how we do 4 document design into a full html system that uses the demsitfy new components for user requirements etc. I want a design document for it. But he must use latest skills. Ask me any questions he has"
- **His components, decided (7 Nov, this design's own conversation):** (Q069) "im confused where a re teh compoentns i designed in your docs?"; (Q070) "i creasted user rekuqiremtns comoentsn arleady?"; (Q071) "ok this is what i want i want thiscompoetnsn id esigne din labs"; (Q072) "it snot pendign i ahd decided", pointing at (Q073) `requirements.html?need=U2&stage=program-design#program-design-U2` in the lab; (Q074) "it looks good yo uwork with him nad tlak tkot hikim".
- **The lab, before that:** (Q028, 2 Nov) "1. requrimetns is good . execpt card colors / 2. stack track view is good"; (Q010, 4 Nov) "only requries and call path are done."; (5 Nov, `owner-request.md`) "over ali liek it want to itnegrate it after a full review by indepent agent for proper styelsysten and itnegration with our compoentn ssytem … we can start formaizliign it without loozign ifnoramtion or fuckign kup the design of the xperiemtn and do it carefully" and "i aslo want to see the dtas trucutre and enxepriemtn after on how easy it is for luan agent sot make it".
- **All design is HTML (Q003, 6 Nov):** "hmm, ive told you fully all design is html"
- **Sections with islands, not Markdown (Q049, 28 Oct):** "i thinking pure markdown in spec design and plan shoduk be depcrated we use html with proeprl seciosn with islands"; (Q050, 28 Oct) "i dont want markdown for program design and plan. i want html and markdown islaodns for snppets or secions. not a giant tabs"; (Q046, 29 Oct) "hmtl for plan and deisgn files. we will use ast grep for markdown and skill files and plan islands"
- **Not monoliths of either kind:** (Q042, 30 Oct) "we will only use presetant html with amrdk own siadns isntead fof 4 monolith docs"; (Q002, 6 Nov) "wow dude you mad eone giant pioe of html for design no pages nothing to help me?"
- **Overall design, then deliverables (Q004, 4 Nov):** "1. big design 4 -> eadch delviermable is design document plus plan that refrences th othe rone. tehya re all pages yes? links wokrk"; with his 2 Nov acceptance (Q022) of an overall design plus a readable deliverable slice and its plan.
- **Requirements as the entry, linked through:** (Q043, 30 Oct) "grouped is user requriemetns is great"; (Q040, 31 Oct) "each one can be a card and we can have a standardize link forwrad here / and back in teh details for veriaiotn etc"; (Q018, 3 Nov) "how will user requreimetns link thkough the other swhats teh system?"; (Q058, 17 Oct) "requiremtns and ux need images"
- **Two stages (Q008, 4 Nov):** "1. phase one is gettin agents to use presntaiton html as is and demisty to expresss for humans whats good / 2. expand on that form copoennt after. but work with other agent on compoentn experiemtns"

## Success definition

Drafted from the words above; the owner confirms or corrects it on his decision page.

1. A design is HTML: each of the four documents' text lives on its own page at stable IDs, in sections and in the bodies of its records, with Markdown islands where Markdown carries the text best; no Markdown file holds the design.
2. The owner reads a design through his lab components, in the form he decided: on every document page the requirement browser (needs grouped by capability; one need's Overview, Specification, Program Design and Verification views; the related-documents workspace), and the call-stack browser from a call to the need it serves.
3. Each need links to its specification, program design and verification, and back, the same way everywhere: each record names what it serves, the reverse view is derived and never written twice, and a document not yet written shows as not yet written.
4. A design is pages, not one page: an overall design and, for each deliverable, a page and a plan that link into it.
5. Agents can read and check the design: they read each page's records and the body at each ID without a second copy, and preparation refuses a broken ID, reference or kind.
6. Only released Demistify parts enter the skills: the browsers, their record contract and preparation enter when the Demistify Lead releases them.

## Who reaches these skills, and when

- The Lead, through `orchestrator-design`, when it runs a design cycle, and directly when it loads one phase.
- `spec-program-review`'s reviewers, when they judge a design set's navigation and views.
- `docs-maintain`, when it keeps a design page current after an edit.
- `plan-implementation`, when it writes a deliverable's plan page beside its design.
- `presentation-html`, when any agent builds a design page.
- The owner, as the reader of every page.

## Evidence

| Date | Source | What it shows |
| --- | --- | --- |
| 18 Oct | PRs #151 and #153, merged | Today's model shipped: Markdown is the truth; an HTML page per document composes it; an `index.md` for agents. |
| 28 Oct – 6 Nov | owner-words Q049, Q050, Q046, Q042, Q003, Q002 | The owner decides, after that model shipped, that design is HTML with sections and islands, and rejects giant pages of either kind. |
| 2–5 Nov | the lab, sunstack-tools `apps/demistify-poc/experiments/understanding-lab/` and `src/understanding-lab/` at `5d8d113` (Q028, Q010, the 5 Nov request) | His components: five owning pages (Requirements, Specification, Program Design, Verification, call paths), each holding its records in one inline block and each body in HTML at a stable ID; the requirement browser on the four document pages, the call-stack browser on the call-path page; 42 example records of seven kinds. |
| 5 Nov | the lab's preparer (`scripts/collect-understanding-records.ts`) and schema (`collection-data.ts`) | Each record names only what it serves (an obligation its needs, a design part or check its obligations, a result its check, a call frame the need it serves, a call stack its need and frames); call frames and stacks carry their text in the record, the other kinds point at a body; preparation validates owner page, IDs, bodies and link kinds, refuses the set otherwise, and embeds one prepared collection; the views derive every reverse link. It refuses a set with no call stack. |
| 5 Nov | independent review of PR #130 (`tmp/review-handoffs/2026-11-05-current-documents-review/reviewer/`) | Three drawer defects fixed before merge; four gaps before formalization: entry defaults (fixed at `5d8d113`), implicit authoring hooks (the rule shown is a body's last paragraph), styles split by load order, and an unexported element type. |
| 5–6 Nov | the Luna authoring probe (`tmp/2026-11-05-collection-entry/checkpoint-5d8d113.md`) | From supplied facts and a guide, a fresh Luna wrote a 20-record set; its first attempt failed on 8 duplicate IDs; after one guided correction it passed the real preparer and checker with 0 errors, keeping every fact and link (18,645 authored bytes). A guided result, not unaided ease. |
| 6 Nov | PR #130, merged at `5d8d113` | The bottom workspace (`ex-drawer`) and shared styles entered the library; the browsers, record contract and preparer stayed in the demo app. |
| 7 Nov | Demistify 1.20.0 (`release.json`, source `9b4d85a`) | Public Demistify has stories, sections, the Map and the drawer; the document browsers are not in it. |
| 7 Nov | the Demistify Lead's integration contract (sunstack-tools `feat-demistify-design-documents` worktree, `docs/wip/demystify/2026-11-07-document-components-integration-contract.md`) | It will release the browsers, the record contract and preparation, keeping his layout and the one-owner model, after settling the authoring hooks, style ownership and typing; it names no public syntax yet, and the workflow names that release as its dependency. |
| 7 Nov | headless renders of the 6 Nov show-me design pages; `html-overhead.ts` | The old model renders each document as one long scroll; markup is 24–29% of real HTML design pages and 39–41% of component-heavy ones. |

## Authoring basis

User-directed intent: the owner's assignment of 7 Nov, his decisions of 28 Oct – 6 Nov, and his decision of 7 Nov to build on his lab components. The real sets and the lab are supporting signals.

## Non-goals

- Implementing the change: this is a design; no skill file changes without the owner's further direction.
- Changing the components or their layout: the Demistify Lead owns their release, and the owner decided their form; this design states what the workflow needs from that release.
- Changing what each of the four documents means or owns, or the `U → E → P → O → R → C → V` identity chain.
- Recording the Verifier's results on a design's pages: a design's checks carry no result; writing observed results into the Verification page is a later change.
- Teaching sunstack lint to read islands: an engine change in sunstack-tools, named as a dependency.
- The show-me-your-work page and skill-authoring's own design-set format.
