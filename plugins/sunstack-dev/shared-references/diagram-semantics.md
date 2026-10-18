# Diagram Semantics

This shared runtime reference owns renderer-neutral visual judgment: choosing the visual family for a relationship, and the progressive-disclosure sequence for hard explanations. Consumers: `presentation-tui`, `presentation-webui` and `presentation-html`. Rendering medium (box-drawing, Mermaid, tables, fences) belongs to the consuming skill and `mermaid-usage.md`; this file decides *what to show and in what order*, not *what syntax draws it*.

Expected inputs: the concept to explain, the reader's current question, and the consuming skill's surface stance.

Return: the selected primary family with its reason, the disclosure sequence chosen, and the stop/simplify result.

## From the question to the view

Select a focal target or path: the changed boundary, failed journey or disputed ownership. Never drop an edge, risk or unknown to make a drawing tidier.

For “what changed?”, a small before/after table may answer better than the entire network. For “who owns retries?”, keep the relevant owners and labeled retry edges in a topology view. For “what happens after approval is refused?”, follow that branch as a flow unless the source defines lifecycle states.

If a reader can't find the answer in the view, change the focus or disclosure before adding drawing detail.

## Visual Family Selection

Pick one primary family from the concept being explained. Compose a second family only when it clarifies a local subproblem.

Zoom is not a visual family. Zoom is a disclosure move: start broad, select one slice, then show detail.

| The concept is… | Family | Inspection question |
|---|---|---|
| ordered work, branching decisions, a pipeline | flow | what happens next, and where does it branch? |
| who talks to whom, in what order | sequence | who sends, who receives, what returns or fails? |
| lifecycle states and transitions | state | what states exist, which transitions are labeled, where is recovery? |
| two independent axes explaining a tradeoff | quadrant / 2D | are both axes real tradeoff dimensions? |
| boundaries, ownership, dependencies, communication paths | topology | who owns what, and which edges carry the meaning? |
| which records are the same thing, and how many relate to how many | entity map | what makes two instances the same, and what cardinality does each edge carry? |

One worked example per family (renderer-neutral sketches; the consuming skill picks the medium):

Flow, for ordered work with a branch:

```text
input ──► parse ──► validate ──► output
                    │
                    ▼
                  error
```

Sequence, for participants and messages. Time flows down, and a retry that changes ownership is a real message, not a footnote:

```text
client          api           auth
  │── request ──►│             │
  │              │── verify ──►│
  │              │◄── token ───│
  │◄── result ───│             │
```

State, with the entry state, labeled transitions, terminal states, and the recovery path:

```text
idle ──start──► loading ──ok──► done
  ▲                │
  └──── retry ◄────┘ failed
```

Quadrant / 2D, only when both axes are real tradeoff dimensions:

```text
                 high clarity
                      ▲
low effort ◄──────────┼──────────► high effort
                      ▼
                 low clarity
```

Topology, where ownership labels ride the edges. Do not imply data flow when the point is responsibility:

```text
┌────────────┐   owns layout   ┌──────────────┐
│ skill      │────────────────►│ chat surface │
└────────────┘                 └──────────────┘
```

Entity map, with each entity's identity rule and the cardinality on every edge:

```text
┌───────────────────┐ 1      * ┌────────────────────┐ *      1 ┌────────────────────────┐
│ Workspace         │──────────│ Membership         │──────────│ User                   │
│ same workspace    │          │ same membership    │          │ same user when their   │
│ when its URL slug │          │ when the user and  │          │ verified emails match  │
│ matches           │          │ workspace match    │          └────────────────────────┘
└───────────────────┘          └────────────────────┘
```

Wrong-family red flags:

- flow chosen when ownership boundaries are the point (use topology);
- flow chosen when identity or cardinality is the point (use an entity map);
- state chosen when only message order matters (use sequence);
- sequence chosen when there are no participants;
- quadrant chosen for tidiness rather than two real axes;
- a table chosen where the relationship, not comparison, is the point.

### Ask What Relationship the Reader Must Understand

The family follows from one question: what relationship must the reader understand? Answer it in the reader's words first, then test the answer against the most tempting wrong view. Each case below gives a request, the relationship it asks about, the view that shows it, and the tempting wrong view with the reason it fails. In four of the five the tempting view is a flowchart: boxes and arrows can draw any relationship, so a flowchart looks finished while showing none of these precisely.

**Entity identity and cardinality.** A reviewer asks whether one person can belong to two workspaces, and whether an invited person is the same user once they sign up. The relationship is which records are the same thing and how many of each relate to how many. Draw an entity map: each entity with its identity rule, each edge with its cardinality (a user has many memberships, and an accepted invitation becomes one membership). A flowchart of invite, sign up, and join shows the order of events and drops both answers, because nothing in it says the invited address and the new account are one user or that membership is many-to-many.

**An entry-to-effect path.** An operator asks what happens between an upload request and its thumbnail appearing, and where the upload can stop. The relationship is ordered steps with conditional branches. Draw a flow from the request to the thumbnail, each branch labeled with its condition (file too large, scan failed). A sequence across the five services the upload touches answers who calls whom, which nobody asked, and buries the two stopping points inside message arrows.

**Ownership and dependency.** An on-call engineer asks who retries a failed webhook, the sender or the queue. The relationship is responsibility. Draw a topology with each owner as a region and each edge labeled with what it carries ("retries up to five times", "owns the dead-letter queue"). A flowchart of the webhook's hops reads as data movement, so the reader learns the order of hops and still cannot say who owns the retry.

**A lifecycle.** A support lead asks what states an invoice can be in, and whether a paid invoice can be reopened. The relationship is states and the events that move between them. Draw a state view with every state named, every transition labeled with its event, terminal states marked, and the reopen transition either drawn or plainly absent. A flowchart from draft to paid reads as one pass through steps, so it has no place for a transition back from disputed to open and cannot show that paid is terminal.

**A failure and recovery exchange.** A reviewer asks what happens when the payment provider times out: who retries, and how checkout avoids charging twice. The relationship is messages between participants over time. Draw a sequence with checkout and the provider as participants, the timeout, the retry carrying its idempotency key, and the provider answering the retry as a duplicate. A flowchart with a "timed out? retry" diamond loses who sends the retry, who holds the key, and that the second answer is the provider recognizing the duplicate.

These cases choose a family, never a syntax. The consuming skill chooses what draws it, under `diagram-rendering-and-fallbacks.md` for a durable document; on a page, the matching Demistify guide lists the forms its renderer supports.

Stop when one primary family is named with its inspection question answered. If no family fits after two attempts, the concept is probably a comparison or a list; simplify to a table or prose instead of forcing a diagram.

## Progressive Disclosure

Default sequence for a difficult system, investigation, implementation, or design:

1. **One map**: the user's named target and current question, their nouns preserved, placed in one small relationship view. It answers: what are the moving parts, and why are they in tension? It does not show every subsystem or every test, and it is not a table that hides the relationship.
2. **One selected slice**: one path through the system, narrower than the map and deeper than a label. Name why this slice: it is the user-visible failure, it crosses the disputed boundary, it proves the tradeoff, or it explains the confusing transition.
3. **One small ledger**: compact status, not a second giant diagram. It shows what is known, new, open, and the next proof. For research synthesis, render the handed-over lanes and parent status; presentation renders research state, it does not run agents or decide acceptance.
4. **Technical detail**: only now name concrete files, commands, code, and data, each per the technical-content bright line in `markdown-presentation-baseline.md`.

Variants (same discipline, different spine):

- Debug narrative: symptom → suspected boundary → proof gathered → decision → next validation.
- Design tradeoff: goal → the credible options, doing nothing among them → what each costs and who pays → recommended slice → proof gate.
- Review synthesis: finding → evidence → failure mode → accepted/rejected/deferred → smallest edit.

Stop and simplify when any of these red flags appear:

- the first diagram tries to show everything;
- three unrelated visuals appear before one clear map;
- zoom is treated as a diagram family;
- helper lanes are presented as truth without parent synthesis;
- code, paths, URLs, or tokens are redrawn as decorative layout text.

Complete when the reader can follow map → slice → ledger → detail without rereading, and every visual earns its place in that sequence.
