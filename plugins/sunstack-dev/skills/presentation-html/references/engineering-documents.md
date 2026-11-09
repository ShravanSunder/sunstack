# Compose engineering design pages

Use this recipe to write a page of an engineering design set: a document page, its home page, a deliverable page or a plan page. The page is the design: each fact's text lives once, in a section or a record body on its document's page, and the released browsers show it by need. This recipe decides what each page holds and how it reads; it does not change what the design phases mean.

MUST load `../../../shared-references/design-documents.md` and return the four document questions and their owners, the page path of each document in the set's folder, and the records and sections this page's document owns, with what each record names. Keep each document's distinct meaning and current state. Do not combine Requirements with Specification, and do not present a planned Verification Design as an observed result.

IF the page holds a record block, a marked part or a browser, load the guide's prepared-browsers reference at the page's binding (`references/design-documents.md` beside the guide, the row step 3's guide routes a prepared browser to) and return the owner pages, the record-to-body and part mapping, the public reader markup, and the preparation and check commands it documents. That reference owns every record's fields, the per-kind parts table and the reader markup; write them as it shows and never restate them in the design.

## The set's pages

A set is one folder, as `design-documents.md` lays it out. Each page carries the guide's native Pages links to the pages that exist, and no link to a page not yet written.

| Page | Holds | States |
| --- | --- | --- |
| home (`index.html`) | what needs the owner first (an open confirmation or decision), then a link to each document page, the delivery cut when the work has deliverables, a link to each deliverable and plan page, and a line for each idea several capabilities share, linking its owning section and its picture | no design fact; no record block |
| a document page (`requirements.html`, `specification.html`, `program-design.html`, `verification.html`) | its title and at most one framing line that states no rule, the requirement browser, its one record block with each record's body in a same-page container, and the sections for its facts with no record kind | its document's records and sections, nothing else |
| the call-path page (`execution.html`) | its framing line, the call-stack browser and its record block of stacks and frames | Program Design's call paths |
| a deliverable page | its needs, each linked on its owning document page with the need's ID in the link text, such as "U3 on the Requirements page", and a link to its plan page | no fact of its own; a fact only it needs goes into the owning overall document |
| a plan page (in `plans/`) | the plan `canonical-implementation-plan.md` defines, with its delivery map and plan change view from `views.md`, and links to its deliverable page and the home page | the plan, never a design fact |

No released address reaches one need's view inside the browser, so a link to a need names the page and the need's ID; a deep link waits for an address the guide documents.

## Write a document page

- **Records.** One record per row the document owns, its ID the row's identity (`U1`, `R9`), naming only what it serves, as `design-documents.md`'s Records and Sections table says. The summary is the compact line the browser lists; the body carries the whole of the row: definitions, conditions, alternatives, error cases, exact interfaces and thresholds. Mark only the parts the guide's table allows for the kind, and only around content that is truly that part: a part with nothing true to put in it is omitted, never filled.
- **Sections.** A fact with no record kind (the capability list with each purpose, the entities, the binding and trace tables, a shared observation route) is ordinary HTML at a stable ID beside the browser. A section links to the records it concerns by page and ID and restates none of them.
- **Views.** A view lives in the section or record body that owns its facts, in the form `views.md` gives it: the entity map in the entities section, a design part's sketch in its body, a need's pictures in its body where the user's experience matters. The browser already shows each need with its specification, program design and verification, grouped by capability, so no page composes a second view of a need.
- **Islands.** A section or body uses an inline Markdown island where Markdown carries its text best, in the inline form the guide's content reference documents. An island holds one section's or body's text, never a whole document.
- **Checks.** A Verification Design check carries no result. Write no `observation` record at design time; the browser shows the check as not run until an observed result exists.

Before the first need exists, the Requirements page is ordinary HTML: the capability list section and the owner's confirmation choice, with no browser and no record block. It passes the static check alone; preparation starts with the first need.

## Ask the owner on the page

Where the owner must confirm or decide while a design is written (the capability list, the goal boundary, an open design choice), the page asks it as a native choice the owner answers on the page, in the form `options-and-decisions.md` gives, and the answer reaches the Lead through Comments' Copy, as `practices-show-me-your-work`'s owner page already does for decisions. Put the Lead's recommendation in that option's summary, never as a preselected answer. On the Requirements page the confirmation sits beside the capability list; elsewhere it sits on the home page, under what needs the owner, linking the section it concerns.

## Read in the owner's order

Each document page shows its sections in the order the owner asks about them, top to bottom, keeping only the views whose predicates fired in the owning document:

| The owner asks | View | Lives in |
| --- | --- | --- |
| What are we building, and for whom? | the capability list, then the needs grouped by capability in the browser | the Requirements page |
| What will a person see and do? | journey map, with pictures or a Gallery Journey when supplied | a Specification section |
| What must always hold, and what can go wrong? | context diagram, with the failure cases named in the section title | a Specification section |
| What are the things the system keeps track of? | entity map | the Specification's entities section |
| Who does what, and where are the boundaries? | component tree, trust-boundary view | Program Design sections or design-part bodies |
| How does each thing move through its states, and what is never allowed? | state machine or table, with its guards and illegal paths | the owning design part's body |
| What happens when a request comes in? | the call-stack browser over the source-derived stacks | the call-path page |
| How will we know it works, and what stays unverified? | each check's body in the browser's Verification view | the Verification page |
| How will it be built, in what order, in which PRs? | delivery map | the plan page |
| What changed since I last looked? | plan change view | the plan page |
| What do you need from me? | the decision brief, with today's model drawn before the options | the home page, or the work thread |

In what the page composes, failure cases and their thresholds stay in view; a disclosure holds only the rationale or evidence about them, and its title names what it holds and the cases it explains ("Evidence for the 250 ms budget", never "More"). Never stack whole documents in one scroll.

## Walkthroughs

Before you add a Walkthrough, name the question it answers and check that the answer crosses documents or needs an order the pages don't give ([a walkthrough earns its place where the page order doesn't answer the question](../../principle-write-for-the-reader/SKILL.md)). Its stops are pages and sections at stable IDs; a need is reached on its owning page. A plan gets one per PR, whose stops are the reads the plan lists for that PR's slices, in plan order, and, for a plan across repositories, one per point where one repository waits on another. A stop carries at most one line of narration that frames it and states no rule. Good: "Routing, end to end" stopping at the Requirements page, the routing section of the Specification, the call-path page and the Verification page. Bad: narration that restates a threshold a record owns.

## When the set is incomplete

- **A document not yet written.** Leave its page out, with no link to it; the browser shows it as not yet written, and no record or page is invented to fill it.
- **Extra documents** beyond the four, such as an alternatives study. Give each its own sibling page with no record block, linked from the home page, and do not fold it into one of the four.
- **A design set written before pages.** It stays readable where it is, in Markdown; this recipe does not migrate it. A page over it is an ordinary page that includes its files, under the rendering reference's external-include branch.

Load the matching component references through `demistify.md`. The public guide owns all markup and visual tokens.

Completion: each page holds only what its row above names; every record names only what it serves, with its body complete and only true parts marked; every fact with no record kind is a section at a stable ID; each view sits in its owning section or body, in the owner's order; each owner confirmation is a choice on the page; no page restates a record, links a page not yet written or writes a result; and the set's preparation and static check pass after the last edit.
