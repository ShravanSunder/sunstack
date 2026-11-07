# Specification: the four-document design workflow as an HTML system

Draft, 7 Nov 2026. What the changed skills must do, and the standards they state. Each obligation carries the success-definition item it serves (S1–S6, in [requirements.md](requirements.md)). Two obligations wait in part on the owner's answers on his decision page: O8 (how agents read and check a design) and what goes with O6's settled links; each states the default this draft takes and what changes with each answer. Revised after design review (DR-H2: O7a–O7c; DR-H3: O6a; DR-H4: O8).

## What the skills must do

### Where the design lives (S1)

- **O1.** Each of the four documents is written as an HTML page, and its normative text lives on that page, in sections and in Markdown islands inside them.
- **O2.** Each section carries a stable ID that other pages, walkthroughs and agents use to reach it.
- **O3.** Each fact has one home, its section on its document's page; every other mention links to that section by ID instead of restating it.
- **O4.** No design document is a Markdown file, and no page drops a whole document in as one island.

### How a page is composed (S3)

- **O5.** A page is composed in sections, one per reader question or design fact group, and each section shows its fact in the view its owning phase requires: the phases' view tables keep owning what each view must show, and `presentation-html` keeps owning the form.

### How a need links to the rest (S4)

- **O6.** Each need in Requirements carries the same forward links to its obligations in the Specification, its rows in the Program Design and its rows in the Verification Design, each link saying what is there; each of those rows links back to the need. Settled by the owner (31 Oct: "a standardize link forwrad here / and back in teh details"). *What goes with it waits on the owner (Q2):* a view of one need with its answers side by side (B), the Map showing each need's path once released (C), both, or neither. Default taken until he answers: neither, with B tried only as an experiment once Demistify can show a section from its home without copying it.
- **O6a.** The links grow with the documents: while a downstream document isn't written yet, the need shows that document's link as not yet written, in words and with no target, never an invented one; each phase adds the links its own rows earn when it writes them (the Specification its need-to-obligation links both ways, the Program Design its obligation-to-trace-row links, the Verification Design its need-to-proof links), and the design is complete only when every need links forward and every row back, which the design review checks.

### Pages, not one page (S2)

- **O7.** A design set is one collection: a home page that opens on what needs the owner, one page per document, and a plan page.
- **O7a.** When the work has deliverables, the overall design (its four documents) stays the home of every fact, and its home page carries the delivery cut: each deliverable with the needs it delivers and what it waits on, written by the Lead after the design review as the Lead's own call, and shown to the owner with the first deliverable's plan under `orchestrator-design`'s existing plan gate, where he can correct it; it adds no stop of its own.
- **O7b.** Each deliverable's design page is a view composed from the overall design: its needs and, through their links, its obligations, owners, paths and proof rows, shown by linking to or embedding those sections; it states no fact of its own, and a fact only this deliverable needs is written into the overall document that owns its kind and reviewed there.
- **O7c.** Each deliverable's plan page is written by the planner from the four reviewed documents, scoped to that deliverable's needs, and it and the deliverable's design page link to each other; the next deliverable's page and plan are written when its turn comes.

### Agents read and check it (S5)

- **O8.** An agent finds any section by its ID from the set's home page, reads its text on its page, and works from that page, with no second copy of the design. *Waits on the owner (Q1).* Default taken: agents read the HTML pages directly. The other answer on his page is a read-out command that prints a page's text for agents, rebuilt from the page each time and never edited, so the pages stay the only design; if he chooses it, O8 adds that command and a run to build it. A kept Markdown copy is not among the answers: it would reverse his decision that design is HTML.
- **O9.** Every page passes Demistify's checker at its binding; checks of the Markdown inside islands wait for sunstack's rule engine to read islands in HTML, a dependency named here and owned in sunstack-tools.

### The owner confirms on the page (S1, S4)

- **O10.** Where the owner must confirm or decide while a design is written (the capability list, the goal boundary, an open design choice), the page asks it as a choice he answers on the page, and his answer comes back through Comments' Copy, as the merged show-me skill already does for decisions (D18).

### Parts that aren't released (S6)

- **O11.** The skills teach only the Demistify parts the released guide at the page's binding documents; a part that exists only on a branch or a preview build stays out of the skills and out of shipped pages until it is released, and enters through experiments with the Demistify Lead.

### What stays

- **O12.** The four documents keep their questions, what each owns, their order and the identity chain `U → E → P → O → R → C → V`; the gap tokens between them are unchanged.

## Standards the skills state

Each is one self-contained sentence, with its two transfer cases and verdict (`domain-skill-crafting`'s generalization topic). HTML and Demistify are named as the owner's adopted scope: his decisions of 28 Oct – 6 Nov for design documents, and Demistify as the page library this repository already uses.

1. **A design's text lives on its pages, by the owner's decision for design documents.**
   - Holds: a Rust service's design in another repository, written by the same workflow: its Program Design is an HTML page whose sections hold the component tree and call paths; the rule tells the agent to write it there, which is right.
   - Rejects an unnamed bad choice: an agent keeps the Specification's obligations in a YAML file the page renders. The rule names no YAML, and still rejects it, because the obligations' text no longer lives on the page.
   - Verdict: passes, with its scope (design documents, the owner's decision).
2. **Each fact has one home, and every other mention links to it.**
   - Holds: a design whose threshold appears in the Specification and in a Verification row; the Verification row links to the obligation's section instead of restating the number, which is right.
   - Rejects an unnamed bad choice: a plan page that pastes the obligation's sentence into its slice description. The rule never names plans, and still rejects it.
   - Verdict: passes.
3. **A page shows each design fact in the view that suits it, never a whole document as one block.**
   - Holds: a small one-concern design with six obligations; its Specification page is one section per obligation group with its entity map, which is right; nothing forces extra structure on a small set.
   - Rejects an unnamed bad choice: a design pasted into a single tab of a tabbed page. The rule never names tabs, and still rejects it (the owner's "not a giant tabs", 28 Oct).
   - Verdict: passes.
4. **Teach only the parts the released guide documents.**
   - Holds: a design page in a repository bound to an older Demistify release; the rule says to use that release's guide, which is right.
   - Rejects an unnamed bad choice: an agent copies markup from a screenshot of a colleague's local page. The rule never names screenshots, and still rejects it.
   - Verdict: passes.
5. **The owner answers on the page.**
   - Holds: a design in another product repository where the owner must confirm three capabilities; the page asks it as a choice, which is right.
   - Rejects an unnamed bad choice: an agent asks for the confirmation in a chat message and treats silence as yes. The rule never names chat, and still rejects it.
   - Verdict: passes.

## What this draft leaves for the skill design

Which skill, reference and section each obligation changes, the runs in sequence, and how each is checked belong to [skill-design.md](skill-design.md) and [skill-verification.md](skill-verification.md), written after the owner's answers.
