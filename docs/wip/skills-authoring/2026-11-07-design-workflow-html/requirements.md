# Requirements: the four-document design workflow as an HTML system

Draft, 7 Nov 2026, by the design-documents Lead (claude-local/b6c842e4). Open: the owner's answers on his decision page (the agents' reading and checking of an HTML design, the through-line form, and his confirmation of the success definition below). Quotes are exact owner words from `owner-words.md` (memory-logs `skills/authoring/2026-11-07-design-workflow-html/`), cited by row.

## The change

- **Class:** behavior-changing. It replaces the mental model of where a design set's truth lives and what its pages are composed of (`design-documents.md`, `diagram-rendering-and-fallbacks.md`), changes the main paths of the phases that write the documents (`spec-design`, `program-design`, `verification-design`, `orchestrator-design`), the allocation of the page references (`presentation-html`'s `engineering-documents.md` and `views.md`), the review's navigation checks (`spec-program-review`), and the page upkeep in `docs-maintain` and `plan-update`.
- **Run kind:** update, across several skills, one run per skill.
- **The reusable behavior:** these skills help agents reliably write a design as a set of linked HTML pages, composed in sections with Markdown islands and Demistify's parts, that the owner can understand and agents can read and check, whenever a design cycle writes or revises Requirements, Specification, Program Design or Verification Design.

## The need, in the owner's words

- **The assignment (Q001, 7 Nov, to Sun):** "Tell lead of 198 his next work is to use the other agent ai tools latest creation skills to make a pr to change how we do 4 document design into a full html system that uses the demsitfy new components for user requirements etc. I want a design document for it. But he must use latest skills. Ask me any questions he has"
- **All design is HTML (Q003, 6 Nov):** "hmm, ive told you fully all design is html"
- **Sections with islands, not Markdown (Q049, 28 Oct):** "i thinking pure markdown in spec design and plan shoduk be depcrated we use html with proeprl seciosn with islands"; (Q050, 28 Oct) "i dont want markdown for program design and plan. i want html and markdown islaodns for snppets or secions. not a giant tabs"; (Q046, 29 Oct) "hmtl for plan and deisgn files. we will use ast grep for markdown and skill files and plan islands"
- **Not monoliths of either kind:** (Q042, 30 Oct) "we will only use presetant html with amrdk own siadns isntead fof 4 monolith docs"; (Q037, 31 Oct) "wehre is teh full designed system as html as i asked without jsut embedign monolitic pages"; (Q002, 6 Nov) "wow dude you mad eone giant pioe of html for design no pages nothing to help me?"
- **Overall design, then deliverables (Q004, 4 Nov):** "1. big design 4 -> eadch delviermable is design document plus plan that refrences th othe rone. tehya re all pages yes? links wokrk"; with his 2 Nov acceptance (Q022) of an overall design plus a readable deliverable slice and its plan.
- **Requirements as the visual entry:** (Q053, 24 Oct) "i sadi break up teh fuckign user requriemts to make it udntean dable i dotn need giant fuckign tables"; (Q043, 30 Oct) "grouped is user requriemetns is great"; (Q040, 31 Oct) "each one can be a card and we can have a standardize link forwrad here / and back in teh details for veriaiotn etc"; (Q058, 17 Oct) "requiremtns and ux need images"; (Q018, 3 Nov) "how will user requreimetns link thkough the other swhats teh system?"; (Q019, 3 Nov) "i can teven tell what sgoing on, it just navigating kto difrente page"
- **Two stages (Q008, 4 Nov):** "1. phase one is gettin agents to use presntaiton html as is and demisty to expresss for humans whats good / 2. expand on that form copoennt after. but work with other agent on compoentn experiemtns"
- **Agents (Q007, 4 Nov):** "you mean indexes tell me more wha tthe agen tdx is and how hard is it"

Curated, not owner-typed: the 18 Oct stream S3 wording in the owner-asks backlog ("Markdown files … split into chunks … tied together by the HTML presentation or index for the agents and HTML for humans") survives only in summaries; no original turn was found (owner-words gaps). It led to today's model and is superseded by his later typed words above.

## Success definition

Drafted from the words above; the owner confirms or corrects it on his decision page.

1. A design is HTML: each of the four documents is an HTML page whose text lives in its sections and Markdown islands, with stable IDs; no Markdown file holds the design, and no page is one Markdown document dropped in whole.
2. A design is pages, not one page: an overall design (its four documents) and, for each deliverable, a design document and a plan that link to each other, joined as one collection with reader help (Pages, links, walkthroughs, the Map).
3. A page is composed in sections, each design fact in the view that suits it: Requirements grouped as cards with images where UX matters, choices side by side, components and paths drawn, proof as cards and rows.
4. Each need links forward to its specification, program design and verification, and back, the same way everywhere, and the link explains what the related part means.
5. Agents can read and check the design: they find any section by its ID and read its text without a second copy, and checks run on the pages.
6. Only released Demistify parts enter the skills; the newest (stories, sections, the Map, released in 1.20.0 on 7 Nov) enter through experiments with the Demistify Lead.

## Who reaches these skills, and when

- The Lead, through `orchestrator-design`, when it runs a design cycle, and directly when it loads one phase.
- `spec-program-review`'s reviewers, when they judge a design set's navigation and views.
- `docs-maintain` and `plan-update`, when they keep a design or plan page current after an edit.
- `plan-implementation`, when it writes a deliverable's plan page beside its design.
- `presentation-html`, when any agent builds a design page.
- The owner, as the reader of every page.

## Evidence

| Date | Source | What it shows |
| --- | --- | --- |
| 18 Oct | PRs #151 and #153, merged | Today's model shipped: Markdown is the truth; an HTML page per document composes it; an `index.md` for agents. |
| 28 Oct – 6 Nov | owner-words Q049, Q050, Q046, Q042, Q037, Q003, Q002; the 3 Nov `q1-html` and `q2-site` selections | The owner decides, after that model shipped, that design is HTML with sections and islands, and rejects giant pages of either kind. |
| 4 Nov | sunstack-tools `docs/specs/2026-11-04-owner-assessment/` | A real set in the old model: one unchunked Markdown file per document, each page wrapping it as one island. |
| 6 Nov | sunstack-tools `docs/specs/2026-11-06-decision-trees-everywhere/` | A real set written as HTML pages with prose in HTML and few islands; the skills don't teach it, so Leads improvise. |
| 7 Nov | headless renders of `docs/wip/skills-authoring/2026-11-06-show-me-your-work-record/requirements.html` and `program-design.html` | The old model at its best still renders each document as one long scroll. |
| 7 Nov | `html-overhead.ts` on those HTML sets and on two prototypes | Markup is 24–29% of the bytes in real HTML design documents and 39–41% in component-heavy pages. |
| 7 Nov | sunstack-tools crates; the Demistify CLI | sunstack lint doesn't read Markdown islands inside HTML; the Demistify CLI has index, embed and check, no read-out of islands. |
| 7 Nov | Demistify `release.json`; `feat/demistify-show-me-page`; the released guide's `references/stories.md` | Stories, sections, the page Map with M and bulk fold were unreleased during the day (hosted 1.19.0) and released that evening in 1.20.0 (PR #141, release PR #132). Sections count only stories, so a section on a design page reads "· 0" (prototype on the preview build; the released guide: "A section with no stories is valid and counts zero"). |

## Authoring basis

User-directed intent: the owner's assignment of 7 Nov and his decisions of 28 Oct – 6 Nov. The real sets above are supporting signals.

## Non-goals

- Implementing the change: this is a design; no skill file changes without the owner's further direction.
- Changing Demistify's parts: the Demistify Lead owns them; this design states what it needs from them.
- Changing what each of the four documents means or owns, or the `U → E → P → O → R → C → V` identity chain.
- Teaching sunstack lint to read islands: an engine change in sunstack-tools, which this design names as a dependency.
- The show-me-your-work page and skill-authoring's own design-set format.
