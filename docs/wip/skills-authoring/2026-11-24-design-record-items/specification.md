# Specification

Revision 2, 24 November 2026 (corrections from design review 1). What the
changed skills must do, and the standards they state. Fields, helper names
and markup belong to the Demistify guide at the page's binding; these
sentences name kinds, states and meanings only. **[O1]** and **[O2]** mark
text that waits for an owner decision.

## What the skills must do

1. `design-documents.md` names three kinds of design item and when each is
   written: a choice when the decider weighed credible alternatives, a ruling
   when there were none to weigh, and an assumption for something the design
   treats as true that nobody checked or authorized.
2. It states that an open owner question becomes a record only as a choice
   with at least two credible options, and stays in page prose, naming what is
   missing and who can settle it, until it has them.
3. It names the authority states: open (a choice only), the owner's decision
   (from the owner's words or from wording the owner accepted), and an agent's
   decision (from the agent's own call or from a contract).
4. **[O2]** It states who records an agent's decision: an agent inside its own
   authority, and the Lead for a helper's decision it adopts, naming the
   helper.
5. **[O1]** It defines the three weights of an agent's decision, how an
   assumption is weighted, and which decisions the owner is shown as not
   reviewed.
6. It states where each record is placed: a need, rule, realization or planned
   check by id beside the prose that explains it, or not at all; every
   decision and assumption in a section item, which the library moves to the
   section its state implies; and that the page declares its sections once, as
   the guide shows.
7. It states what the author writes (each record's fields, the item's text,
   the page's explanation) and what the library shows from them (the section,
   every chip, state and date on the page), so nothing the library shows is
   also written by hand.
8. It states what changes when the owner answers a choice, approves an agent's
   decision or overturns a decision.
9. It states that a choice keeps every option it offered, and why; how options
   and their Details are written is taught by the guide.
10. It states that an agent's rationale is a short plain answer to "why", and
    an open assumption's "what settles it" names the observation that would
    settle it.
11. It ranks agent decisions and open assumptions with the existing three
    questions, states how weight relates to rank, and applies the
    `author's call on owned meaning` label to an agent's decision from its own
    call.
12. `design-specification`, `design-program` and `design-verification` name
    agent decisions where they now name `lead-decided` decisions, and point at
    `design-documents.md` for what to write when authority cannot be shown.
13. `presentation-html` and `design-review` apply the placement rule of
    obligation 6 in their chooser, examples, completion line and link triage.

## Standards the skills state

S1. A decision is a choice when the decider weighed credible alternatives,
kept as its options, and a ruling when there were none to weigh.

S2. An open question becomes a record only when it has at least two credible
options; before that it is page prose naming what is missing and who can
settle it.

S3. A decision's record names who made it: the owner, through quoted or
accepted words, or an agent, by its alias and role.

S4. **[O1]** An agent's decision has weight `design` when it changes what the
system does, stores or exposes, or its structure (owners, boundaries,
contracts, dependencies); `process` when it changes only how the work is
carried out; and `minor` when it changes neither. An assumption takes the
weight of what rests on it.

S5. The author writes the record and the page's explanation; the library
derives where the item appears and every label, chip, state and date shown
with it.

S6. A sentence that names a decision or assumption links to its record and
says why it matters here, never what the record says.

S7. A choice keeps every option, with its summary, after it is decided.
(Taught by the guide; run 1 states only its reason.)

S8. An option carries Details only when they add to its summary. (Taught by
the guide.)

S9. A rationale answers "why" in one or two plain sentences.

## Rules, with transfer cases

**S1, choice or ruling.**
- Holds elsewhere: a payments design where the Lead weighs two retry policies
  and picks one. A choice, decided by an agent; the owner opens Details and
  sees the one not taken.
- Rejects an unnamed bad choice: an agent weighs three storage engines,
  records "Use engine B" as a ruling with only a rationale. The rule rejects
  it: alternatives were weighed, so they are the choice's options. A straw-man
  option ("build our own", never considered) is not credible and is not
  added.
- Verdict: passes.

**S2, open questions need credible options.**
- Holds elsewhere: a mobile app whose owner must decide the offline policy, but
  nobody has measured sync conflicts yet. The rule keeps it in prose naming
  the missing measurement and who can take it.
- Rejects an unnamed bad choice: "should we support SSO?" as "Yes / No" with no
  consequences for either. Not credible options; rejected.
- Verdict: passes.

**S3, who decided.**
- Holds elsewhere: a CLI tool's design where the Lead decides the config file
  format; the record names the Lead's alias and role `lead`, so the owner sees
  whose call it was.
- Rejects an unnamed bad choice: a decision recorded as by "the team" or by
  "we". No alias, no role: rejected, because the owner cannot tell an agent's
  call from their own.
- Verdict: passes.

**S4, weight. [O1]**
- Holds elsewhere: a data pipeline where an implementer adds a column to a
  stored table (`design`: changes what is stored), moves session state from
  one component to another in a refactor that changes no behavior (`design`:
  changes who owns what), runs the backfill before the schema check
  (`process`), and names a helper `parseRow` (`minor`).
- Rejects an unnamed bad choice: "drop the retry on webhook delivery" marked
  `minor` because the diff is one line. It changes what the system does:
  `design`, whatever the size.
- Verdict: passes.

**S5, the author never writes derived labels.**
- Holds elsewhere: a verification design where a check is blocked by an open
  assumption; the author writes the assumption and its link, and the
  "blocked" state comes from the record.
- Rejects an unnamed bad choice: a hand-typed "decided 24 Nov" or "(approved
  by owner)" next to a ruling in prose. The label comes from the record; the
  hand-written one can contradict it. When the owner approves, the record's
  authority changes instead (obligation 8).
- Verdict: passes.

**S6, prose links to the record.**
- Holds elsewhere: a migration plan that says "the old endpoint stays for one
  release so clients can move ([D12](#D12)); the rollout plan below depends on
  that window." The sentence says why D12 matters here and links it; D12's
  words stay in D12.
- Rejects an unnamed bad choice: a status paragraph listing "D24, D25" with a
  paraphrase of each. A paraphrase is a second copy that drifts.
- Verdict: passes.

**S9, short rationale.**
- Holds elsewhere: a Rust service where an agent chooses a bounded channel;
  its rationale "Backpressure must reach the producer; an unbounded channel
  hides overload." answers why in two sentences.
- Rejects an unnamed bad choice: a rationale that retells the investigation
  over three paragraphs. The why is buried; the investigation belongs on the
  page or in the work log.
- Verdict: passes. Basis: the Lead's reading of what the owner reads on the
  item face ("title, chips and text properly", 23 November); not the owner's
  words about rationale length.

**S7, S8** are format rules of the record item, scoped to pages using
Demistify design records by the owner's decisions of 23 November ("I mean
details only for options in a choice"; "to show what the choices were I press
Details"). The guide teaches them; run 1 states only S7's reason.
