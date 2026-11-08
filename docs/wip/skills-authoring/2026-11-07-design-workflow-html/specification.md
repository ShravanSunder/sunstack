# Specification: the four-document design workflow as an HTML system

Draft, 7 Nov 2026; revised that night around the owner's lab components. What the changed skills must do, and the standards they state. Each obligation carries the success-definition item it serves (S1–S6, in [requirements.md](requirements.md)). O8 waits in part on the owner's question 1 (how agents read and check a design); each states the default this draft takes. O13 names what the workflow needs from the Demistify Lead's release; that Lead has taken its asks into its draft public contract, not yet shipped.

## What the skills must do

### Where the design lives (S1)

- **O1.** Each of the four documents' text lives on its own page: in sections, and in the bodies of its records, each at a stable ID; Markdown islands carry a section or body where Markdown carries the text best (in a body, per O13d).
- **O2.** Each section and record carries a stable ID that pages, browsers and agents use to reach it; record IDs follow `design-documents.md`'s identities (a need is its `U`, an obligation its `R`).
- **O3.** Each fact has one home, its section or record body on its document's page; every other mention links to it by ID instead of restating it, and the prepared collection is output, never edited.
- **O4.** No design document is a Markdown file, and no page drops a whole document in as one block.

### How the owner reads it (S2)

- **O5.** A design set uses the owner's page set: one page per document and a call-path page, each document page carrying the requirement browser and the call-path page the call-stack browser, in the released form of the layout he decided (Q072, Q073); the skills add no layout of their own.
- **O5a.** Each phase writes the records its document owns: Requirements one need per `U` (its title, capability, body and summary); the Specification one specification per `R`, naming its needs; the Program Design one design part per part, naming the obligations it serves, and the call paths as call stacks and frames, each stack naming its need and its frames, and a frame naming a need only when it directly serves one (a supporting or shared frame names none, and no attribution is invented); the Verification Design one check per verification row, naming the obligations it proves. A fact with no record kind (entities, a capability's purpose, the trace and binding tables, the Specification's other identifiers) is a section at a stable ID on its document's page. Each body marks the parts its record kind shows (such as a specification's rule), as the released guide's per-kind parts table names them, because a part left unmarked shows no compact view. Before the first need exists, the Requirements page is ordinary HTML (the capability list and the owner's confirmation choice) with no browser and no record block; both come with the first need.
- **O5b.** A check written at design time carries no result; the browser shows it as not run, and no result is written until an observation exists.

### How a need links to the rest (S3)

- **O6.** Each record names the records it serves, once, in its own record; every reverse view (a need's obligations, design parts and checks, "also serves") is derived by preparation and the browsers and never written by hand. Settled by the owner: his 31 Oct words ("a standardize link forwrad here" … "and back in teh details") and his decided browser, which derives them this way.
- **O6a.** The links grow with the documents: each phase writes only its own records' links; a need whose downstream document isn't written yet shows that document as not yet written, with no invented record; the design is complete only when every need is served in each document and every record's links resolve, which the design review checks (per O13b).

### Pages, not one page (S4)

- **O7.** A design set is one collection in one folder: a home page that opens on what needs the owner, its document pages, its call-path page and its plan pages.
- **O7a.** When the work has deliverables, the overall design stays the home of every fact, and its home page carries the delivery cut: each deliverable with the needs it delivers and what it waits on, written by the Lead after the design review as the Lead's own call, and shown to the owner with the first deliverable's plan under `orchestrator-design`'s existing plan gate, where he can correct it; it adds no stop of its own.
- **O7b.** Each deliverable's page links to its needs in the browser, each at the need and document view that answers it (the browser's need and view addresses, which the release preserves), each link saying what is there; it states no fact of its own, and a fact only this deliverable needs is written into the overall document that owns its kind and reviewed there.
- **O7c.** Each deliverable's plan page is written by the planner from the four reviewed documents, scoped to that deliverable's needs, and it and the deliverable's page link to each other; the next deliverable's page and plan are written when its turn comes.

### Agents read and check it (S5)

- **O8.** An agent reads a page's records for what exists and what each serves, and the body at each ID for its text, finding pages from the set's home page; there is no second copy of the design. *Waits on the owner (Q1).* Default taken: agents read the pages directly. The other answer is a read-out command that prints a need with everything linked to it, rebuilt from the pages each time and never edited; if he chooses it, O8 adds that command, which the Demistify Lead would own.
- **O9.** Every set passes the released preparation (owner page, IDs, bodies, link kinds) and Demistify's checker at its binding; checks of the Markdown inside islands wait for sunstack's rule engine to read islands in HTML, a dependency owned in sunstack-tools.

### The owner confirms on the page (S1, S2)

- **O10.** Where the owner must confirm or decide while a design is written (the capability list, the goal boundary, an open design choice), the page asks it as a choice he answers on the page, and his answer comes back through Comments' Copy, as the merged show-me skill already does for decisions.

### Parts that aren't released (S6)

- **O11.** The skills teach only what the released guide at the page's binding documents: the browsers, the record contract and preparation enter the skills from that guide when the Demistify Lead releases them; until then the skills name the release as a dependency and teach none of the demo app's private names.

### What the workflow needs from the release (S2, S3, S6)

- **O13.** The Demistify Lead's integration contract is the seam. The workflow needs from that release: (a) the browsers, the record contract and preparation as public, documented parts, as the contract plans; (b) a set with needs only, or needs and obligations only, prepares and shows each unwritten document as not yet written, and a complete set with no call path prepares too, because Program Design writes call paths only where a runtime path exists (today preparation refuses a set with no call stack); (c) a home for facts with no record kind beside the browser on a document page; (d) a record body that may hold a Markdown island; (e) the need and view addresses kept stable, as the contract already keeps them. Items b, c and d are in the Demistify Lead's draft public contract (its draft four-document design, 7 Nov), with the minimum a Requirements page and one need; not shipped. The admission check confirms each in the release; one missing there is a named gap the runs teach around.

### What stays

- **O12.** The four documents keep their questions, what each owns, their order and the identity chain `U → E → P → O → R → C → V`; the gap tokens between them are unchanged.

## Standards the skills state

Each is one self-contained sentence, with its two transfer cases and verdict (`domain-skill-crafting`'s generalization topic). HTML, Demistify and the owner's browsers are named as the owner's adopted scope: his decisions of 28 Oct – 7 Nov for design documents.

1. **A design's text lives on its pages, by the owner's decision for design documents.**
   - Holds: a Rust service's design in another repository, written by the same workflow: its Program Design page holds the component tree as a section and each part's text in its record body; the rule tells the agent to write it there, which is right.
   - Rejects an unnamed bad choice: an agent keeps the Specification's obligations in a YAML file the page renders. The rule names no YAML, and still rejects it, because the obligations' text no longer lives on the page.
   - Verdict: passes, with its scope (design documents, the owner's decision).
2. **Each fact has one home, and every other mention links to it.**
   - Holds: a design whose threshold appears in an obligation's body and in a check; the check's body links to the obligation instead of restating the number, which is right.
   - Rejects an unnamed bad choice: a plan page that pastes the obligation's sentence into its slice description. The rule never names plans, and still rejects it.
   - Verdict: passes.
3. **A page shows each design fact in the view that suits it, never a whole document as one block.**
   - Holds: a small one-concern design with six obligations; each obligation is a record the browser shows by need, and the entity map is one section, which is right; nothing forces extra structure on a small set.
   - Rejects an unnamed bad choice: a design pasted into a single tab of a tabbed page. The rule never names tabs, and still rejects it (the owner's "not a giant tabs", 28 Oct).
   - Verdict: passes.
4. **Teach only the parts the released guide documents.**
   - Holds: a design page in a repository bound to an older Demistify release; the rule says to use that release's guide, which is right.
   - Rejects an unnamed bad choice: an agent copies a component's markup from the lab's demo pages before its release. The rule never names the lab, and still rejects it.
   - Verdict: passes.
5. **The owner answers on the page.**
   - Holds: a design in another product repository where the owner must confirm three capabilities; the page asks it as a choice, which is right.
   - Rejects an unnamed bad choice: an agent asks for the confirmation in a chat message and treats silence as yes. The rule never names chat, and still rejects it.
   - Verdict: passes.
6. **Each link is written once, in the record that serves, and every other direction is derived.**
   - Holds: a payments design whose obligation R4 serves two needs, U2 and U5; R4's record names both, and each need's view shows R4 with "also serves", which is right; nothing is written on U2 or U5.
   - Rejects an unnamed bad choice: an agent adds a "related obligations" list to U2's body to help readers. The rule never names body lists, and still rejects it, because that link is now written twice and drifts when R4 changes.
   - Verdict: passes.

## What this draft leaves for the skill design

Which skill, reference and section each obligation changes, the runs in sequence, and how each is checked belong to [skill-design.md](skill-design.md) and [skill-verification.md](skill-verification.md).
