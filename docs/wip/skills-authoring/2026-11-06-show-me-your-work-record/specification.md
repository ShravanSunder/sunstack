# Specification: show me your work, what the log holds and what the owner sees

This document says what must be observably true, for each requirement in [requirements.md](requirements.md) (U1–U11), and what decides pass or fail. How the skill and its tools make it true is Program Design's; how each obligation is shown to hold on a real run is Verification Design's.

The system here is one opaque thing: the skill's guidance as agents follow it, the log they write, and the page the Lead builds. The obligations below talk only about what the owner and the agents can see from outside it: rows in the log, commissions, the page and decision pages.

## Capability map

Each capability from the Requirements, with the obligations (R rows) that make it true. The log feeds every view; the top of the page draws from all of them.

```mermaid
flowchart LR
  subgraph log["The log"]
    G["logging: every agent's own rows, as it works<br/>R1 R2 R3 R4 R5"]
  end
  subgraph page["The page"]
    T["attention: what needs you, what to do<br/>R19 R20 R21 R22 R23"]
    D["decisions<br/>R6 R7 R8"]
    A["assumptions<br/>R9 R10 R11"]
    S["shortcuts<br/>R12 R13"]
    V["verification<br/>R14 R15 R16"]
    M["what was missed<br/>R17 R18"]
  end
  G --> D
  G --> A
  G --> S
  G --> V
  G --> M
  D --> T
  A --> T
  S --> T
  V --> T
  M --> T
```

## Who sees what, and where

```mermaid
flowchart LR
  owner(["The owner"])
  lead(["The Lead"])
  helpers(["Helpers: Implementer, Reviewer, Evaluator, Researcher, Operator, Advisor"])
  peer(["A peer Lead, in its own project"])
  sys["Show me your work<br/>(guidance, log and page, as one thing)"]
  helpers -- "commission in; own rows out" --> sys
  lead -- "own rows, stories, acceptances" --> sys
  sys -- "the page and decision pages" --> owner
  owner -- "answers, in his words" --> lead
  peer -. "its own record; nothing copied" .- sys
```

Outside the system, and staying outside: the owner needn't read raw rows, CSV or diffs; no row or page goes in a product repository; the Router engine and Demistify's components are used as they are.

## Words this document defines

Each term below is a noun the obligations are written over, defined by what makes two of it the same. None of these definitions names a tag, file, type or command; Program Design binds those.

**E1 Work.** One piece of work the owner follows.
- Same when: the same Router project and work tag. A peer Lead's work in its own project is a different Work, even on the same subject.
- Relationships: has many Rows, one Page, and one or more Workstreams.
- Always true: every Row of a Work carries its tag.
- States: open → done.
- Replaces: "the record", "the trace". Basis: U8, U11; the shipped skill's record.

**E2 Row.** One fact in the log.
- Same when: the same Router row id. A retry that reuses the original request is the same Row. Two writes with different requests are two Rows, even when the words match; a correction says which to count.
- Relationships: belongs to one Work; written by one Writer; has one kind; names at most one Workstream; may close one earlier Row.
- Always true: never edited. Its writer and time are what Router stamped, not what its text says.
- States: open → closed (a later Row closes it).
- Replaces: "entry", "log line"; excludes the page's text about it. Basis: U8, U10.

**E3 Writer.** Who wrote a Row.
- Same when: the same agent session (endpoint and session id), or the owner.
- Relationships: writes many Rows; acts in one role per Work, named by its commission.
- Always true: never taken from a `who` label. Who *decided* something is a separate fact the Row states.
- States: none.
- Replaces: "author"; excludes "who decided". Basis: U8, U9; the writer count in the Requirements.

**E4 Workstream.** A plain label that groups a Work's Rows for the owner.
- Same when: the same label within one Work, ignoring case and spacing.
- Relationships: a Work has one or more; a Row names at most one; a Story covers one.
- Always true: a label the owner can read, such as "Requirements", "page experiments" or "PR #194".
- States: active → finished.
- Replaces: "part" and "piece", which the owner didn't recognize. Basis: U8; the Requirements' open item on grouping.

**E5 Decision.** A choice made in the Work.
- Same when: one Row that makes a choice. A later choice that changes it is a new Decision that replaces it.
- Relationships: made by one decider (the owner, the Lead or a named helper); may close one Assumption; may replace one Decision.
- Always true: its authority is named from its source: the owner's words with where they were said, an existing contract, or "own call". Silence, "not marked wrong" or a review verdict is never the owner's decision.
- States: current → replaced.
- Replaces: "call", "choice". Basis: U1.

**E6 Assumption.** Something taken as true and not settled.
- Same when: one Row that takes it as true; each later change of state is a new Row that closes it.
- Relationships: may be closed by one Decision or correction.
- Always true: never shown as decided until a Decision closes it.
- States: open and waiting for the owner, or open and being checked by a named agent → closed.
- Replaces: "assumed decision", "open question" (one only the owner can settle). Basis: U2.

**E7 Shortcut.** A departure from the plan, the design or a required step.
- Same when: one departure, by one agent, at one time. Found twice, it's still one.
- Relationships: taken by one agent; may be approved or reversed by one later Row.
- Always true: says what the plan, design or rule said, what was done instead, and why. A change from the design is a Shortcut.
- States: taken → approved, or reversed.
- Replaces: "design break", "design change", "off the plan", "corner cut". Basis: U3.

**E8 Check.** One verification that ran.
- Same when: one run of one check on one revision. A rerun is a new Check.
- Relationships: run by one agent; concerns one claim about one piece of finished work; may be read by an Acceptance.
- Always true: says the claim, what ran and on which revision, the result, and what it didn't cover.
- States: passed, failed or partial.
- Replaces: "proof", "verification". Basis: U4.

**E9 Acceptance.** The Lead's sign-off on finished work.
- Same when: one sign-off on one commit or document revision. Reopening it is a new Row.
- Relationships: names the Checks the Lead read; may be reopened by a later Row.
- Always true: names the commit or revision, each Check read with its result, and what stays unverified.
- States: accepted → reopened.
- Replaces: "locked", "done". Basis: U4.

**E10 Missed item.** Something the log should have held and didn't, or a claim it can't back.
- Same when: one missed thing. Found by two audits, it's still one.
- Relationships: concerns one Row or one event; found by one Audit or review; may be closed by one later Row.
- Always true: says what was missed, how and by whom it was found, and what it affects.
- States: open → closed.
- Replaces: "gap", "what was missed". Basis: U5.

**E11 Audit.** A comparison of one Writer's stretch of work against what actually happened.
- Same when: one Writer, one stretch (from one point to another).
- Relationships: belongs to one Writer and one Work; finds zero or more Missed items.
- Always true: names what it compared against, and what it couldn't see.
- States: done.
- Replaces: pstack's "audit the log against the transcript". Basis: U5; the owner's pointer to pstack's skill (6 Nov). How an audit is done, and by whom, is Program Design's.

**E12 Story.** The Lead's account of one subject, for the owner.
- Same when: one subject in one Workstream. A rewrite is a new version that replaces the old.
- Relationships: written by the Lead; cites the Rows it covers; sits in one section of the Page.
- Always true: every line is said by a Row it cites.
- States: current → replaced.
- Replaces: "summary". Basis: U6, U9.

**E13 Page.** The owner's view of one Work.
- Same when: one per Work, rebuilt at each checkpoint, never edited by hand.
- Relationships: shows one Work through one log position; links the decision pages.
- Always true: shows only what the log holds, and says which position it covers.
- States: rebuilt at each checkpoint; no other states.
- Replaces: "the live page". Basis: U6, U7.

What makes the hardest cases decidable:

- **Writer versus decider.** An owner decision the Lead writes down has the owner as decider and the Lead as Writer. Both show; neither replaces the other.
- **A Shortcut nobody logged.** When someone other than the agent that took it finds it, it is one Shortcut (taken by that agent) and one Missed item (it wasn't logged when taken), not two Shortcuts.
- **A Check written second-hand.** A Check the Lead writes about an evaluator's run is still one Check, run by the evaluator; the page shows it as reported by the Lead.

```mermaid
flowchart TB
  W["E1 Work"] -- "has many" --> R["E2 Row"]
  W -- "has one or more" --> WS["E4 Workstream"]
  W -- "has one" --> P["E13 Page"]
  WR["E3 Writer"] -- "writes many" --> R
  R -- "names at most one" --> WS
  R -- "is one of" --> K["E5 Decision · E6 Assumption · E7 Shortcut · E8 Check · E9 Acceptance · E10 Missed item · E11 Audit · E12 Story"]
  R -- "may close one earlier" --> R
  AU["E11 Audit"] -- "finds zero or more" --> MI["E10 Missed item"]
  AC["E9 Acceptance"] -- "names the" --> CH["E8 Check"]
  ST["E12 Story"] -- "cites many" --> R
  P -- "shows current" --> ST
```

## Obligations

Each obligation names the entities it's about, the requirement it serves, what passing looks like, and what would show it failing. "Before work that builds on it continues" means before that agent's next row, commit, message or handback that depends on the fact.

### The log (logging)

**R1 · U8 · E2 E3 E5 E6 E7 E8.** When an agent decides, assumes, takes a shortcut or runs a check, that agent writes the Row itself, before work that builds on it continues.
- Passes when each such Row's Writer is the agent that acted, and its Router time comes before the agent's next dependent action.
- Fails when the Row is written by another Writer, or after work built on it; either is a Missed item when found (R17).

**R2 · U8 · E1 E3 E4.** Every commission to a helper names the Work's log, the Workstream it logs under, and what it must log (decisions, assumptions, shortcuts, checks). The Lead doesn't accept a handback until the helper's own Rows for it are in the log, or each missing one is logged as a Missed item.
- Fails when a helper's handback is accepted while its own Rows are missing and no Missed item names them.

**R3 · U10 · E2 E3.** Writing one Row asks the agent for only its kind, its Workstream, its text and, when it closes or answers an earlier Row, that Row. The project, the work tag, the Writer and every id are filled in for the agent. A retried write never lands twice.
- Passes when an agent's write names none of those ids, and a retry after an unclear result leaves exactly one Row.
- Fails when an agent has to type or look up an id to log, or a retry leaves two Rows.

**R4 · U9 · E12 E2.** The Lead writes the Stories, and every claim a Story makes is said by a Row it cites. Each claim links to its Row, and the Row's Writer shows.
- Fails when a Story says something no cited Row says, or the page shows a claim without the Row behind it.

**R5 · U11 · E1.** A peer Lead working on part of this work from its own project logs in its own Work. This Work's page copies none of its Rows. Where this Work depends on the peer's work, the page says where the peer's record is.

### Decisions

**R6 · U1 · E5 E3.** Every Decision of the Work is in the log and can be reached from the page. Each shows what was chosen, who decided, why, its authority, and who wrote the Row.
- Fails when a Decision in the log can't be reached from the page, or one of those five things is missing.

**R7 · U1 · E5.** Decisions show in two columns. The owner asked for these on 6 Nov ("we need columsn for low value dicions agent make vs once i look at i wnat to be clear"), refining his 3 Nov rule ("I don't want to see every decision that any model made ... I want the lead to see it and I want to see what's important").
- "Yours, or worth your look" is shown in the open. It holds the owner's decisions, decisions that change or fill in the design or plan, and decisions that depart from anything already decided.
- "Agents' own calls" holds the rest: made without asking, inside existing authority, changing nothing decided. The Lead reviews them; the owner sees the column's count and can open it.
- What goes in which column follows the shipped skill's own-call rule (its four conditions, in the live-page reference's "Sorting the record"); keeping the own calls reachable is the Lead's reading of "columns", not the owner's words.
- Fails when a decision that changes the design or plan, or departs from something decided, sits among the own calls.

**R8 · U1 U5 · E5 E10.** If a Decision names no authority, or names an authority inferred from a plan, a review or a page, the page puts it under "worth your look", marked "no authority named", and it is a Missed item.

### Assumptions

**R9 · U2 · E6.** The page shows every open Assumption with what is assumed, what depends on it, and who acts next. A closed one shows beside the Row that closed it.

**R10 · U2 · E6 E5 E13.** When an agent makes an assumption only the owner can settle (by the skill's stop treatments), it logs it as waiting for the owner before work that builds on it continues. At the next page build it shows under "For you to decide" with its decision page. The owner's answer, quoted in his words, closes it.
- Fails when such an assumption first reaches the log after dependent work went ahead, or the page shows it anywhere but "For you to decide" while it's open.

**R11 · U2 · E6.** If the owner is silent, doesn't mark an assumption wrong, or a review passes, then the assumption stays open on the page; only a Decision that closes it makes it decided.

### Shortcuts

**R12 · U3 · E7 E3.** The agent that takes a shortcut logs it when it takes it: what the plan, design or rule said; what it did instead; why; and the authority, if any, that allowed it.

**R13 · U3 · E7 E10.** The page shows every Shortcut under "What changed and why". One that no owner decision or existing authority covers is marked for the owner's look and counts at the top of the page. A Shortcut first logged by someone other than the agent that took it also shows as a Missed item.

### Verification

**R14 · U4 · E8 E3.** The agent that runs a check logs it: the claim, what ran and on which revision, the result, and what it didn't cover. A Check written by any other Writer shows as reported second-hand, naming both the agent that ran it and the Writer.

**R15 · U4 · E8 E9.** The page shows, under "What was verified", each piece of finished work with its Checks, their results, what wasn't covered, and whether an Acceptance is in the log. Finished work with none shows "no acceptance recorded"; the page doesn't claim a sign-off didn't happen elsewhere.

**R16 · U4 · E9.** The page shows work as accepted only when an Acceptance in the log names its commit or revision, each Check the Lead read with its result, and what stays unverified. A helper's success report, a green check or a review verdict alone doesn't make work accepted.

### What was missed

**R17 · U5 · E10 E11.** The page shows "What was missed" inside "What was verified": each Missed item with what was missed, how and by whom it was found, what it affects, and whether it's closed. Missed items include:
- an event that happened with no Row, or a Row written after work built on it;
- a Decision with no authority (R8);
- a claim that work is done with no Check behind it;
- a required check, from the plan or the repository's rules, that didn't run;
- a Row an agent wrote about another agent's act when the acting agent could have written it.

**R18 · U5 · E11 E3.** The page shows, for each Writer, which stretches of its work were audited and which weren't. A stretch with no Audit, or one whose Audit couldn't see the work (for example, an unreadable transcript), shows "not audited", never "nothing missed". How and when audits happen is Program Design's.
- Fails when the page says nothing was missed for a stretch with no Audit, or doesn't mark that stretch "not audited".

### What needs the owner (attention)

**R19 · U6 · E13 E6 E7 E10 E9.** The page opens on what needs the owner: how many items wait for him, how many decisions and shortcuts are marked for his look, how many Missed items are open, and how much finished work isn't accepted. Each number opens its items.

**R20 · U6 · E13 E12.** Below that, the page keeps the four sections the owner kept, in this order:
1. For you to decide;
2. What's done / what's next;
3. What changed and why, ending with the two decision groups;
4. What was verified, including what was missed.

Each section shows current Stories, and a routine Story folds at the end of its section, as the owner asked ("yeah routine stuff is hidding within each secion?", 6 Nov).

**R21 · U7 · E13.** Each item appears in full in one place on the page; anywhere else it's named, it's a link to that place. No section restates another's content.
- Fails when the same Story, Decision, Shortcut or Check text appears in full twice.

**R22 · U7 · E13 E3 E2.** The page is visual and clickable, not a list of links: every count and diagram node opens the items it stands for, and a chart's exact values sit beside it, each opening the items it counts. It shows, as a picture, who wrote the log and when: each Writer's Rows over the Work's time. From that picture the owner sees whose work is in the log and how much each agent logged. Whether rows came as the work happened is not in that picture; it comes from the audits (R18), and shows "not audited" where none ran.
- Fails when a navigation list stands in for content, the page can't show who wrote what, or the picture is presented as proof of timely logging.

**R23 · U7 · E13.** The skill's show-me reference teaches an agent how to build this page with Demistify: which display shows each part of R19–R22, with a worked example built from a real log.
- Passes when the Lead's next real page, built by following the reference and nothing else, meets R6–R22. A build by a fresh agent waits for the evals, outside this change.

## Across the whole

- **Privacy.** Rows, Stories and pages carry no secrets, credential paths or account data. Pages are local files the owner opens on his own machine; nothing is published.
- **Where things live.** The log lives in Router; pages live in the work's memory-logs folder; neither goes in a product repository.
- **Freshness.** The page says which log position it covers and when it was built, and is rebuilt from the log at every checkpoint. If the log can't be read, the page isn't rebuilt from memory; the gap is reported.
- **Readability.** The page reads in dark and light themes, at desktop and phone widths. Color is never the only signal; every state also has a word or an icon.
- **Cost to agents.** Logging a Row costs an agent one short command (R3); writing what happened at the moment, rather than later, is the cheap path.

## What decides pass and fail

Each obligation's reference is where the right answer comes from. Verification Design chooses how each is checked on a real run.

| Proof | For | Reference | A wrong result that fails it |
| --- | --- | --- | --- |
| V1 | R1, R12, R14 | each agent's own transcript, and Router's writer stamp and time on each Row | the Lead writes a helper's decision; a Row arrives after the commit that used it |
| V2 | R2 | the commissions sent, and the log at each handback | a handback accepted with none of the helper's Rows and no Missed item |
| V3 | R3 | the command an agent runs to log, and the log after a forced retry | an agent passes a project id; one retry leaves two Rows |
| V4 | R4 | each Story's cited Rows | a Story line that no cited Row says |
| V5 | R5 | the peer's project and this Work's log | a peer's Row copied into this Work |
| V6 | R6, R7, R8 | the log's Decisions and the own-call rule (four conditions, from the live-page reference) | a design change sitting among the own calls; a Decision missing from the page |
| V7 | R9, R10, R11 | the stop treatments, the log's Assumptions with their times, and the owner's words | an owner-only assumption logged after dependent work; one shown as decided after silence |
| V8 | R13 | the log's Shortcuts and the owner's decisions | an unapproved shortcut not marked for his look |
| V9 | R15, R16 | the log's Checks and Acceptances, and the repository at the named revision | work shown as accepted with no Acceptance in the log; work shown as never signed off when the log only lacks a record |
| V10 | R17, R18 | the log's Audits and Missed items, and what each Audit says it compared against | an unaudited stretch shown as "nothing missed"; an audited stretch where the #194 kind of skipped test suite is in the plan's required checks but never appears |
| V11 | R19, R20, R21, R22 | the log through the page's stated position, and the owner's page O sections | a top count that doesn't open its items; one item in full twice; no picture of who wrote what; that picture offered as proof of timely logging |
| V12 | R23 | the Lead's next real page, built by following the reference alone | that page fails V6–V11, or needed something the reference doesn't say |
| V13 | U6–U8 together | the owner's own reading of the page on the next real piece of work | he can't say from the page, without transcripts, what was decided, assumed, cut short, verified and missed |

## Coverage

| Requirement | Entities | Obligations | Proof |
| --- | --- | --- | --- |
| U1 decisions | E5 E3 | R6 R7 R8 | V6 |
| U2 assumptions | E6 E5 E13 | R9 R10 R11 | V7 |
| U3 shortcuts | E7 E3 E10 | R12 R13 | V1 V8 |
| U4 verification | E8 E9 E3 | R14 R15 R16 | V1 V9 |
| U5 missed | E10 E11 E5 | R8 R17 R18 | V10 |
| U6 attention | E13 E12 | R19 R20 | V11 V13 |
| U7 attention | E13 E2 E3 | R21 R22 R23 | V11 V12 |
| U8 logging | E2 E3 E4 | R1 R2 | V1 V2 V13 |
| U9 logging | E12 E2 | R4 | V4 |
| U10 logging | E2 E3 | R3 | V3 |
| U11 logging | E1 | R5 | V5 |

Every entity is used: E1 (R2, R5), E2–E3 (R1, R3, R4, R22), E4 (R2), E5–E13 as listed.

## Open

- **Workstream labels** (E4): the Lead names them when work starts and when new work arises, in plain words; the owner corrects any he can't read. This replaces "pieces", which he didn't recognize.
- **How audits happen** (R18): Program Design decides who audits, when, and against what. pstack's choices are the starting point: the agent audits its own log against its transcript at the end of a run, and a reviewer on another model flags what it sees. Neither is required by the owner's words; both are means to U5.
- **The short command** (R3): Program Design decides where it lives. It must not change the Router engine or its storage, and the skill itself stays guides only.
- **Counts that open their items** (R19, R22): Demistify v1's number tile and chart bars can't hold a link. A Mermaid diagram node whose id matches a page element does open it. Program Design picks the display.
