# Delivery topology and verification design: October 11 discussion

The 🦁 Lead (01a118ee) owns this working design. It incorporates the owner's October 11 discussion with the 🦉 Advisor (a6321a2f), the Advisor's subsequent corrections, and the owner's Test Design clarification in the Lead conversation. It builds on the [October 10 topology mental model](2026-10-10-topology-mental-model.md). It is not an accepted implementation plan; no skill or runtime behavior has changed.

Tracking home: [ai-tools/update-skills-for-factory, P-LUNA-39](https://linear.app/askluna/project/ai-toolsupdate-skills-for-factory-dabb58716229/overview). Linear tracks delivery; this document carries the working understanding. The Chief of Staff's own repository and SOPs remain its instruction home.

Each point carries one of three labels:

- **Confirmed:** the owner said or chose it.
- **Proposed:** the Lead or Advisor suggested it, and the owner hasn't chosen it.
- **Open:** undecided.

**Change from October 10:** the Verifier produces a **report, not a verdict**, and the Lead decides. This replaces the "behavioral verdict" wording in the October 10 note. *(Confirmed.)*

**Latest owner direction:** the Implementer consumes Program Design and Test Design; Verification Design is a separate concern. Every agent type needs role instructions. Chief of Staff instructions are maintained in its own repo and SOPs. *(Confirmed.)* The detailed Test Design procedure, design authorship and delivery of role instructions are still proposals below.

## Owner reading entry

```text
You + Lead settle intent and design
             |
Lead sequences Implementer / Verifier pairs
             |
Pair returns implementation and verification reports
             |
Lead inspects evidence; fresh Reviewer checks code and tests
             |
Lead accepts; Chief of Staff brings it to your merge queue
             |
You decide and merge
```

The first pending decision is authorship of Test Design and Verification Design, in section 9. Role-instruction contents are made concrete in section 4a without installing them.

**Delivery direction, October 11:** redesign the design skills together with agent-role instructions first. A separate skills Lead is intended to take the changes step by step. Watchdog/Jev tooling is a separate workstream; board changes stay with the existing Codex Router Lead. A new eval system follows the skill/tooling work, uses Jev, and starts from fresh requirements and design. These are owner directions. The chunks and dependency edges in section 12 are the Lead's proposed decomposition, awaiting source-backed survey reduction and discussion.

**Survey delivered, October 11:** the [Advisor's category inventory and verification correlation](/Users/shravansunder/code/opensource/agent-skills/ai-dev-skills/docs/research/2026-10-11-factory-skill-correlation/README.md) is available with five appendix files. Parent-thread return: message `01a12ba9-f153-78d0-8cf7-501639c79cb0`, activity 5938. It is evidence for the next skills Lead to inspect, not accepted recommendations or runtime proof. Its local source cutoff is main `a34f297c`; upstream snapshots and partial newer captures are disclosed in the packet. Decisive source checks and reduction remain open.

## 1. The problem: two gaps (Confirmed)

Work goes wrong in two places, before orchestration and after it.

| Gap | What goes wrong | Examples from recent deliveries |
|---|---|---|
| **Before:** requirements and design validation | Meaning isn't settled and checked before work starts, so an agent's idea can become a requirement. | <ul><li>An agent-written design rule, an exact provider-version check, was written in as a requirement, then carried into the spec and the code. It silently dropped events from real installed agents.</li><li>A fallback design was reopened in the middle of the build.</li></ul> |
| **After:** no proper verifier | The owner ends up as the verifier: finding bugs by hand, asking whether the tests are good, merging on the Lead's word. | <ul><li>A Git matcher port was checked against an undeclared Git version, using random cases. Targeted cases later found mismatches.</li><li>A Lead relayed green logs as acceptance.</li></ul> |

More agents did not prevent these. When the version check went through, that Lead already had two Sidekicks, two reviewers and an Advisor. What was missing were specific jobs that nobody owned: tracing each requirement to the owner, and checking against a declared reference.

The largest group of owner corrections in the October 5 sample is "against the design" (35 of 157 correction rows). Their cause isn't established. It is **not** shown to be compaction.

## 2. Principles

1. **Design documents are shared understanding.** They are the truth a Lead starts from, including after compaction, so they should start from truth, not assumptions. *(Confirmed.)* An agent's inference stays visibly marked as a proposal until the owner adopts it. *(Proposed: the mechanism.)*
2. **Requirements must read well to the owner.** An unreadable requirement goes unchecked, and that's how an invented one survives. *(Confirmed.)*
3. **Everything traces up:** Program Design → Specification → Requirements. Requirements end at the owner. *(Confirmed.)* A trace protects only if that last link holds. In the version-check case, the spec rule traced cleanly to an invented requirement.
4. **The Specification governs both delivery tracks.** The Implementer uses Program Design and Test Design. The Verifier uses Verification Design, mapped to Requirements and Specification. Program Design supplies the testable seams and observation points both need; expected results come from the Specification. *(Confirmed: consumer split. Proposed: detailed allocation.)*
5. **The plan is the Lead's delegation and sequencing of Sidekick pairs.** It is mechanical, provided it follows the coding standards, the Verification Design and the watchdog. *(Confirmed.)*
6. **The Verifier reports and the Lead decides.** The Lead is not a router, and both the role instructions and the script must enforce that. *(Confirmed.)*
7. **Answer open questions by prototype instead of deferring to the owner.** This is borrowed from Lauren Tan. *(Confirmed as liked; where it sits in the design skills is open.)*
8. **Budget is a constraint.** The owner wants warm-session continuity considered when selecting agent lifetimes. Swarms and competing designs incur additional work. Provider-specific cache eligibility, TTL, hit rates and comparative cost have not been measured here. Spending freshness where independence matters is a proposal, not a measured cost result. *(Confirmed: constraint. Proposed: spending rule.)*

## 3. Topology

```text
OUTER LOOP
  Slack / Linear / X / CI ─► intake bots ─► Chief of Staff (owner's side)
                              (a request + evidence, never a requirement)
──────────────────────────────────────────────────────────────────────────
INNER LOOP     one Lead per workstream, plus a bugs Lead per project
               Leads may talk to each other (requests only)

 DESIGN    Ambitious: owner ◄──► Lead   (+ Advisor, optional)
           Bug:       Chief of Staff ◄──► Lead
           Requirements ─► Specification ─┬─► Program Design + Test Design
                                          └─► Verification Design

 PLAN      Lead: which pairs, what each gets, in what order

 BUILD     a separate pair per piece of work, sequenced by the Lead
           PR 1: Implementer A ◄─► Verifier A ── report ─┐
           PR 2: Implementer B ◄─► Verifier B ── report ─┤  (parallel if independent)
           PR 3: Implementer C ◄─► Verifier C ── report ─┤  (after PR 1 if dependent)
                                                         ▼
 DECIDE    Lead: each report against the Verification Design ─► accept / send back
           fresh Reviewer: code and test quality, including tautological tests

 WATCH     watchdog: mechanical and/or reasoning process monitoring
           It does not own behavioral correctness or acceptance.

 MERGE     Chief of Staff brings accepted work ─► owner merges
           Its exact acceptance/merge check is still proposed.
```

*(Confirmed:*
- *the two loops; a Lead per workstream; a bugs Lead per project for now;*
- *Lead-to-Lead talk;*
- *the owner designs with the Lead, with the Advisor optional;*
- *separate pairs that talk directly, sequenced by the Lead;*
- *only the Lead spawns Sidekicks;*
- *report, then the Lead decides;*
- *merge through the Chief of Staff.*

*Carried over from October 10: the fresh Reviewer and the watchdog.)*

## 4. Roles

| Role | Owns | Never | Status |
|---|---|---|---|
| **Owner** | the meaning of Requirements, design approval on ambitious work, merge | — | Confirmed |
| **Chief of Staff** | the owner's side: status across Leads, the owner's decision queue, bringing merges to the owner. On the bug path it stands in for the owner as the Lead's counterpart | design, engineering acceptance, turning a request into a requirement | Confirmed. What it checks before merge is *Proposed* (below) |
| **🦁 Lead** | design with the owner; governing documents and plan; sequencing pairs; decisive source/evidence inspection; integration and acceptance | substituting its own checks for the independent Verifier; forwarding a report as acceptance | Confirmed: reports do not replace Lead judgment. No inspection ban. Test/Verification Design authorship is *Open* |
| **Implementer 🐒 Sidekick** | building from Program Design and Test Design, with self-proof; talking to its Verifier | changing what counts as correct | Confirmed (role and inputs); *Proposed* ("never") |
| **🔬 Verifier Sidekick** | proving from the Verification Design with the project's verification skill; reproducing first on bugs; reporting the reference used, scenarios run, results and what's still unverified | making the acceptance decision; accepting a weaker reference without the Lead | Confirmed (report, not verdict). *Proposed* ("never") |
| **🛠️ Workers** | exact jobs for the Lead or Sidekicks (Luna or Haiku for exact jobs, Sol for judgment and research) | spawning Sidekicks | Confirmed |
| **🦉 Advisor** | an optional challenger of framing, assumptions, references and interpretation during design and delivery | authoring governed documents; deciding acceptance | Confirmed optional design participation; delivery challenge retained from the existing role contract |
| **Fresh 🔎 Reviewer** | code and test quality, including tautological tests | acceptance | Carried over. Cadence is *Open* |
| **Watchdog** | process adherence: required steps happened, evidence is current, nothing stalled; mechanical checks and/or reasoning | deciding behavioral correctness or engineering acceptance | Carried over. Placement and execution mechanism are *Proposed* |

**What the Chief of Staff checks before bringing a merge** *(Proposed)*: only that the acceptance is real. The Verifier's report exists, the Lead's check against the Verification Design exists, and the reference used matches the declared one. It makes no engineering judgment.

**The pair** *(Proposed)*:
- They share facts: how to run it, where to observe, what changed, a failing case with its evidence.
- Any change to what something is checked against goes to the Lead, not settled inside the pair.
- The unit is one PR, with a fresh pair per PR that stays warm within it.

## 4a. Role instructions and their delivery (Proposed)

Each agent role needs an instruction that states its purpose, owned result, authority, governing inputs, handback and escalation boundary. That does not require one complete workflow skill per role. Role instructions define who acts; phase skills define the procedure; the assignment defines this piece of work. The existing `manage-agents` job packet already separates role opening from outcome, sources, limits, stop and return.

| Role instruction | Essential input and owned output | Boundary that prevents a known failure |
|---|---|---|
| Lead | Current authorized design, plan, actual artifacts and reports → source-backed assessment and final acceptance | Must interpret decisive evidence and preserve owner intent; a helper's green summary cannot supply acceptance |
| Implementer | Specification, Program Design, Test Design and bounded plan → implementation, regression tests and associated self-proof | Does not choose a new requirement, reference or weaker proof to make its work pass |
| Verifier | Requirements, Specification, Verification Design, real artifact and project controls → findings, observations, evidence and named gaps | Makes judgment about evidence adequacy and behavior; does not grant final acceptance or silently change the reference |
| Reviewer | Governing artifacts, current diff, Test Design and evidence → independent code/test-quality findings | Challenges tautology, mocked-away interactions and flakiness; findings that invalidate evidence require affected re-proof |
| Advisor | Current design, assumptions, reference decisions and disputed evidence → challenges and alternatives | Gives advice rather than governed authorship or acceptance; independent review remains separate |
| Worker | One bounded task, governing sources, write limits and check → result plus proof | Returns an unmade design choice to its commissioner rather than inventing it |
| Operator | Exact prescribed procedure and expected observations → command results and exits | Does not decide which check to run or what a failure means |
| Watchdog process | Current workflow obligations, assignments and source-bound records → process exceptions or allowed transition checks | May reason about adherence; does not infer feature correctness from receipt presence |

The Verifier may read Program Design and Test Design to locate observations, test gaps and relevant code. Its expected outcomes remain independently derived from the authorized contract. Independence requires separate judgment, not blindness to useful factual context.

**Delivery proposal:** `manage-agents` owns concise role openings and assignment binding for the roles it commissions. Phase-specific teaching stays in the owning skill. Role obligations accompany each assignment and correction/resume that needs them. A script can reject missing, contradictory or stale required records at a handoff; it cannot prove comprehension or the adequacy of a scenario merely because a record exists. The exact script and its authority are not selected.

**Chief of Staff boundary:** its own [entrypoint](/Users/shravansunder/code/chief-of-staff/AGENTS.md), [liaison SOP](/Users/shravansunder/code/chief-of-staff/docs/wip/2026-10-04-agent-liaison-operating-sop.md), and [monitoring procedure](/Users/shravansunder/code/chief-of-staff/skills/lead-delivery-monitor/references/operating-procedure.md) own Chief conduct. This project defines the delivery handoff it receives from a Lead; it does not copy Chief policy into `manage-agents` or claim the draft/timer arrangement is deployed. The proposed merge check must be reconciled with that repo's current source-inspection and routing duties.

## 5. Design artifacts and verification layers

```text
Requirements        why, for whom, limits: the owner's words, readable to the owner
     ▲
Specification       what must be observably true: rules a tester can check,
     ▲              each traced to a requirement; defines the nouns
     ├──────────────────────────┐
Program Design               Verification Design
how it's built                how it's proven, mapped to Requirements + Spec
(may provide observation  ──► (may use those observation points; expected
 points)                       results always come from the Spec)
     ▲                          ▲
     └──── Plan: the Lead delegates and sequences pairs ────┘
```

**Verification Design contents** *(Proposed)*, per requirement and per spec rule:
- **the reference it's checked against:** a binary, version and entry point; a real installed agent, not recorded traces;
- **scenarios:** the core outcome first, on the real surface;
- **the kinds of case aimed at the risk;**
- **observation points needed from Program Design;**
- **what counts as passing;**
- **what stays unverified.**

If it needs an observation point Program Design doesn't have, it asks Program Design to add one rather than verifying something weaker.

### Test Design beside Verification Design

**Test Design is the Implementer's regression-test strategy.** *(Confirmed: intended consumer. Proposed: separate reusable capability and procedure.)* It starts from the Specification and uses Program Design's real boundaries. For each meaningful scenario it records the expected outcome, unit/integration/E2E placement, real versus replaced dependencies, assertion, failure signal, and isolation or scheduling controls. Detailed cases go at the cheapest layer that can observe the behavior; an interaction receives real integration coverage, and a small set of E2E journeys establishes full wiring. The pyramid is not a fixed percentage quota or a requirement that every edit add all three layers.

For concurrency, design causal holds, controlled time and observable completion rather than sleeps, polling or inflated timeouts. Assert consumer-visible outcomes. A mock is a named assumption; it cannot remove the interaction the test claims to prove. Expected results must not repeat the implementation under test.

**Verification Design is the independent delivery-proof strategy.** It declares the authorized outcome, applicable reference, targeted scenarios, observation boundary, evidence needed and unverified limits. Automated tests may contribute real-path proof when their scope is adequate; equivalent manual runs need not be duplicated. Tests covering the wrong requirement cannot establish delivery correctness.

| Question | Primary owner |
|---|---|
| Which scenarios and test layers protect the contract? | Test Design |
| Are the designed tests written and passing? | Implementer |
| Does this test or runtime observation support the required behavioral claim? | Verifier, guided by Verification Design |
| Are assertions, mocking, scheduling and test structure sound? | Reviewer, auditing test implementation |
| Is the complete delivery acceptable against the agreed design? | Lead |

The overlap is intentional: a Verifier rejects an inadequate test as evidence immediately; a Reviewer audits its lasting regression value. A later finding that invalidates evidence sends the affected behavior through correction, verification and review again before final acceptance.

**Three verification layers** *(Confirmed)*:

| Layer | Holds | Practitioner analog |
|---|---|---|
| Generic verification skills (plugin) | how to design verification, prove on the real surface, check against a reference, aim test cases, write the report | pstack principle and verification skills |
| Per-project verification skill | how to launch, drive and observe this app, plus a feature map | pstack `create-verification-skill` → `verify-<app>`, kept current by `/maintain-verification-skill` |
| Per-change Verification Design | how this change is proven, using the project skill | none; pstack keeps this in briefs and playbooks |

*Open:* whether each merged change updates the project skill's feature map, and who maintains it. The October 9 role agreement gave harness upkeep to the Lead.

## 6. Two paths (Confirmed)

| | Ambitious work | Bugs and feedback |
|---|---|---|
| Lead's counterpart | the owner, at design | the Chief of Staff, standing in for the owner |
| Which Lead | the workstream Lead | a bugs Lead per project (for now) |
| Design | Requirements, Specification, Program Design, Test Design and Verification Design, scaled to the change | checked against the existing documents; "expected per the spec, observed X" |
| Inner loop | pairs, reports, the Lead decides | the same, with the Verifier reproducing first |
| Merge | through the Chief of Staff to the owner | the same; a veto-window merge may come later, on the trust ladder |

The bug path will be tuned later. For now it simply puts the Chief of Staff where the owner sits.

*Proposed:* a bug leaves the bug path when the fix needs something the documents don't say: a new requirement, a spec change, or a new mechanism. It then becomes ambitious work and goes to the owner.

## 7. How this addresses each failure

| Failure | What addresses it | Status |
|---|---|---|
| An agent's idea becomes a requirement | owner-readable requirements with sources; documents hold only confirmed or observed truth | Confirmed in principle; the mechanism is *Proposed* |
| Checked against the wrong thing (recorded traces, an undeclared Git version, random cases) | the reference and kinds of case are declared in the Verification Design, at design time | Confirmed in shape |
| A Lead relaying green logs | the Verifier reports, and the Lead decides against its own Verification Design | Confirmed; needs instructions plus script |
| The owner as verifier | the Verifier drives the real app with the project verification skill | Confirmed |
| Design changed mid-build without review | a design change goes back to design, and the watchdog flags document changes that skipped review | *Proposed* |
| Mechanisms tested while the core requirement goes unproven | Verification Design maps to Requirements and Spec, core outcome first | Confirmed |
| Commissions that never start | the watchdog | Carried over |
| Lead overload from chained design cycles | one design cycle per Lead? | *Open* |

## 8. Compared with Lauren Tan's setup, under our constraints

Sources are public: her X posts, interviews and pstack (snapshot `978ca6e`). See section 10.

| | Lauren | Ours | Why different |
|---|---|---|---|
| Her side | Grok Bot sees all her Projects, pings her on Slack, and auto-merges bug fixes after an hour unless she objects | Chief of Staff; the owner merges | trust isn't earned yet |
| Unit of work | a Cursor Project per stream or per idea; "0 normal chats, everything is a Project" | a Lead per workstream, plus a bugs Lead | *Open* whether ours should be smaller |
| Design | intent → "restate in your own words" → competing designs and prototypes in subagents → she reacts to artifacts → approves the plan → picks the playbook. "the best spec is code" | design documents as shared understanding | the owner's choice: the documents carry shared truth |
| Building | Full Autopilot prescribes one lifecycle owner per PR and a fresh owner for the next item, with costly-state reuse exceptions in Poteto Mode | paired Implementer and Verifier; exact unit/lifetime *Open* | budget and continuity are constraints; comparative cache cost is unmeasured |
| Verification | Full Autopilot starts independent swarm rounds at code-ready and later patch-changing pushes; Shipping defines bounded patch-id/build-evidence reuse; regular Orchestrate uses dedicated verifiers conditionally | one paired Verifier reporting; Lead interprets evidence | budget and explicit acceptance ownership; pair drift remains a risk to test |
| Reusable verification | a verification skill per app, plus a feature map | three layers (section 5) | adopted |
| Merge for ambitious work | the sources suggest autopilot often merges on a clean verdict ("if its fuzzed it ships"); a human review step isn't found | the owner, through the Chief of Staff | trust |
| The codebase | an architecture built for agents, strict CI, lints, `/correct` | partial | worth its own discussion |

Her bug loop is not her ambitious-work loop. For ambitious work her involvement moves up front: intent, the restate check, prototypes, plan approval. That matches the owner's short-term goal of being involved through design and then not again until merge.

## 9. Open questions

1. Who writes Test Design and Verification Design? Lead recommendation: Lead-owned governing designs, independently challenged by the Verifier before implementation. Alternative: the Verifier drafts Verification Design from the Specification and the Lead adopts it. That alternative changes the existing Lead-authorship convention. A challenge to authorized expected behavior/reference returns to the owner; missing scenario coverage within an unchanged contract can be repaired without inventing new authority.
2. How are role instructions delivered? Options:
   - a short charter per role, re-injected on every spawn and resume (pstack: "directives decay across resumes");
   - a fuller skill per role;
   - script-enforced handoffs.

   The Advisor's read is a mix: charters plus phase skills, with the script used only at the handoffs that failed (report → Lead, the Lead's acceptance, design changes made mid-build).
3. What the Chief of Staff checks before a merge (proposed above).
4. The pair: what they may share, who settles their disputes, the unit (PR), and fresh vs reused.
5. Does each merged change update the project's verification skill, and who maintains it?
6. The Lead's scope: one design cycle per Lead, or chained cycles? A context kit kept in files?
7. Where "answer open questions by prototype" sits in the design skills, and how it fits with independent design review. pstack's position: "Don't spend reviewers on an abstract plan".
8. In what form does the owner read requirements, and what does the owner read in the Verification Design (for example, one "proven by…" line per requirement)?
9. Reviewer cadence: per milestone or per delivery.
10. The trust ladder: when, if ever, bug fixes move to a veto-window merge.
11. The budget envelope: what is actually scarce (Claude tokens, Codex/Sol credits, money, owner time).
12. Scheduled Lead ticks versus event-driven continuation. The Advisor is discussing a charter reread and state-script fact report on a scheduled tick with the owner. This is a pending proposal, not an armed timer; the current waiting practice rejects periodic wake substitution when a supported listener exists. No cadence or policy override is selected here.

## 10. Skill impact (Proposed, for the Lead to verify and sequence)

These are proposed integration surfaces, not an implementation task list. The original handoff used workflow 2.70.0 in this docs worktree (`052f2042`); current main `a34f297c` and installed workflow 2.72.0 were inspected for the owning contracts. They differ, so implementation must first bind to its actual current source. The current `skill-authoring` plugin owns named skill-change specs and review. No runtime edit is admitted by this document.

**Our skills**

| Skill | Change |
|---|---|
| `spec-design` | <ul><li>A Requirements view the owner can read: one line per requirement, with its source.</li><li>Agent inferences marked as proposals until the owner adopts them.</li><li>A restate check before Requirements.</li><li>Keep Requirements and Spec visibly separate. The IPC "requirements" file was mostly spec-level rules.</li><li>Proof obligations feed the Verification Design.</li></ul> |
| `program-design` | Retain structural proof seams, testability, real/replaced boundaries and enforcement decisions. Offer those seams to Test Design and Verification Design; avoid choosing their complete test or delivery-proof strategies here. |
| **new:** `test-design` | Scenario-to-layer strategy for the Implementer: expected results, meaningful assertions, real/replaced boundaries, deterministic scheduling and regression cases. A separate capability is proposed; another mandatory approval or large artifact for every small change is not. |
| **new:** `verification-design` (phase) | A per-change Verification Design mapped to Requirements and Spec: references, scenarios, kinds of case, observation points, what counts as passing, what stays unverified. It uses the project verification skill. |
| **new:** generic verification skills | <ul><li>The Verifier's conduct and report: real surface, declared reference, reproduce first, what stays unverified.</li><li>Creating and maintaining a per-project verification skill with a feature map.</li></ul> |
| `orchestrator-design` | Integrate Test Design and Verification Design at their selected authoring points; preserve owner-readable meaning, appropriate prototypes and independent design challenge. Extra gates and authoring order remain design choices. |
| `spec-program-review` | <ul><li>Review the Verification Design too.</li><li>Check that every spec rule traces to an owner-confirmed requirement, and that every requirement's core outcome has a proof.</li><li>Prefer prototypes over reviewing abstract plans.</li></ul> |
| `plan-implementation` | Reference settled designs while delegating and sequencing pairs. Test-layer strategy moves to Test Design; reference and delivery-evidence strategy move to Verification Design. Planning still names concrete execution and integration checks within those contracts. |
| `implement-plan` | <ul><li>The Implementer Sidekick role inside a pair.</li><li>Share facts with the Verifier; send any change to the reference to the Lead.</li></ul> |
| `orchestrator-implementation-goal` | <ul><li>The Lead spawns a pair per PR and sequences them.</li><li>It decides from reports against the Verification Design and never relays.</li><li>A script check at report → Lead, at acceptance, and at design changes made mid-build.</li><li>Merge goes through the Chief of Staff.</li></ul> |
| `manage-agents` | Own Lead/Implementer/Verifier/Reviewer/Advisor/Worker/Operator instruction boundaries and the assignment binding. Chief of Staff policy stays in its own repo; only its interface is consumed here. Define paired commissioning and the Verifier's model/lifetime policy after the open choices settle. |
| `implementation-review` | The fresh Reviewer covers code and test quality, including tautological tests. Keep the boundary with the Verifier's report. |
| `discuss-pathfinding` | Classify before asking: anything a prototype can answer isn't the owner's question. |
| `practices-collaboration` | <ul><li>Lead-to-Lead talk carries requests only.</li><li>The Chief of Staff's seat; the bugs Lead's counterpart.</li></ul> |
| `implementation-pr-wrapup` | The merge handoff and the Chief of Staff's check. |
| watchdog (not a skill yet) | A script or service that checks process with each Lead's work, like pstack's hourly audit tick. |
| Chief of Staff instructions | These live with the devfiles Chief of Staff, outside this plugin. Add the merge check and the bug-path counterpart role. |

**pstack skills to borrow from** (snapshot `978ca6e`; borrow the idea, don't copy the text)

| pstack | What to take | Lands in |
|---|---|---|
| `create-verification-skill`, `maintain-verification-skill` | a per-app verification skill (launch, health check, drive, evidence) plus a feature map, kept current | layer 2, and the generic verification skills |
| `principle-prove-it-works` | verify the real artifact, not a proxy; script the check | generic verification skills |
| `principle-test-behavior-not-implementation` | tests assert behavior, not implementation | Reviewer and Verifier |
| `poteto-mode` (ask classification), the prototype playbook | if running something can answer it, prototype it instead of asking | `discuss-pathfinding`, `spec-design`, `orchestrator-design` |
| Pt. 2 "indirect prompt" | "restate in your own words" before work | `spec-design`, the bug path |
| `architect`, `arena` | competing designs plus a judge, kept for hard-to-reverse decisions within budget | `program-design` and `verification-design`, as an option |
| `interrogate` | multi-model review of diffs, not abstract plans | `implementation-review` |
| `autopilot-full` | verification rounds on each head commit; the coordinator owns the decision and audits receipts; an hourly audit tick | the Lead's acceptance; the watchdog |
| `orchestrate` | a brief template with scope and forbidden lists; standing orders pasted into every spawn ("directives decay across resumes"); `gates.md` as the owner's decision queue; "mid-run discoveries fix only what blocks the frontier" | `manage-agents` charters; the Chief of Staff queue; scope rules |
| `correct`, `principle-encode-lessons-in-structure` | turn repeated corrections into structure (lints, types, checks) | a follow-up on the codebase itself |

### Progressive skill shape and proof still needed

These proposals address the owner's October 11 workflow direction and the historical wrong-reference/relay/test-quality failure shapes. Those incidents are calibration inputs; neither the old label percentages nor this source audit establishes current failure prevalence or causal improvement.

| Proposed target | Trigger and compact core | Reference depth | Deterministic mechanics | Pressure coverage |
|---|---|---|---|---|
| `test-design` | A behavior change needs regression strategy: map contract scenarios to layer, boundary, independent expected outcome, assertion and deterministic controls | Pyramid placement, mock assumptions, race tests and anti-tautology counterexamples | No script substitutes for layer/assertion judgment; existing repo test runners remain the execution mechanism | Needed: mocked-away interaction, implementation-derived expected value, uncontrolled race and valid small-change control |
| `verification-design` | A delivery needs explicit requirement-level proof: declare reference, scenario, observation, evidence and gap | Differential/reference checks, real user paths, artifact freshness and blocked/unreachable cases | Actual project controls run observations; any handoff validator is still to be designed | Needed: wrong reference with green tests, happy path missing core outcome, stale artifact and adequate existing E2E control |
| `manage-agents` update | Commission or continue an agent: bind its role, assignment, governing sources and authority | Role-specific charter detail and provider mechanics stay with this practice | Validate missing/stale fields only where the selected handoff tool actually consumes them; no comprehension claim from receipts | Needed: a report-forwarding Lead, pair changing the reference, properly delegated verifier run, and Chief policy duplication control |
| `spec-design` update | Materialize settled requirements and observable obligations in an owner-readable form | Existing provenance/authority and traceability references; examples of outcomes versus mechanism-level rules | Any readability or provenance checker is an aid, not owner confirmation | Needed: invented requirement with tidy trace links, legitimate adopted proposal, and binding existing-contract control |

Proof must distinguish correct process, adequate evidence and correct acceptance. No pressure run or project-runtime verification has been performed for these proposals. Each named skill change needs its own scoped skill spec and fitting proof before rollout.

## 11. Sources

**Public (Lauren Tan and pstack):**
- Research packet: ai-dev-skills `docs/research/2026-10-10-practitioner-process/lauren-tan/`, including `2026-10-11-design-vs-coordination.md` and the `raw/` captures.
- X posts:
  - [restate prompt](https://x.com/poteto/status/2104744961904394699)
  - ["0 normal chats"](https://x.com/poteto/status/2098180318612300142)
  - [new project per idea](https://x.com/poteto/status/2109030035315364212)
  - [Grok Bot manages Projects](https://x.com/poteto/status/2107251521553637426)
  - [rearchitect prompt](https://x.com/poteto/status/2106542593656111276)
  - [bug loop](https://x.com/poteto/status/2107510472601985336)
  - ["full autopilot most things"](https://x.com/poteto/status/2109027957658595612)
  - [risk triage](https://x.com/poteto/status/2108283057581195413)
- "The Complete Guide to pstack Pt. 2": [x.com/poteto/status/2097732320606507506](https://x.com/poteto/status/2097732320606507506).
- pstack snapshot [`978ca6e`](https://github.com/cursor/plugins/tree/978ca6e9c0e012047cd5058b8e829240336e704e/pstack): `docs/guide/04-design.md`, `skills/poteto-mode/playbooks/autopilot-full.md`, `skills/poteto-mode/playbooks/orchestrate.md`, `skills/create-verification-skill/SKILL.md`.

**Private evidence (owner-only):**
- The Advisor's thought pad: `~/dev/memory-logs/work-trails/ai-tools/2026-10-09-failure-point-assessment/thought-pad.md`, items 1, 3, 13–18.
- Due-diligence findings: `~/dev/memory-logs/skills/investigation/2026-10-05-lead-integration-due-diligence/findings.md`.
- Lead session timelines: `~/dev/session-logs/projects/2026/2026-10-lead-integration-research/workbooks/`.

## 12. Delivery chunks and cross-workstream dependencies (Proposed)

The ordering question is which settled contract the next change consumes. A chunk is a reviewable behavioral change, not every file belonging to one theme. The skills Lead carries the skill changes sequentially; it does not inherit Router implementation or an eval rewrite merely because those systems consume the same concepts.

### First: design skills and role instructions

| Chunk | Reviewable result | Depends on | Does not wait for |
|---|---|---|---|
| S0: role boundaries and governing inputs | Concise role instructions, input/output ownership and escalation boundaries; Chief SOP home preserved | Current agreed topology and resolution of material authorship choices | Finished watchdog, new Router board or new eval runner |
| S1: Requirements and Specification | Owner-readable authorized needs kept separate from observable obligations; source/inference handling and proof obligations made usable | S0 authority boundaries | Jev runtime classification |
| S2: Program Design | Structural How, testable seams, observation points and real/replaced boundaries; no silent invention of expected behavior | S1 observable contracts | New evaluator architecture |
| S3: Test Design | Scenario-to-layer regression strategy with independent expected outcomes, meaningful assertions and deterministic controls | S1 scenarios and S2 relevant seams | Live watchdog deployment |
| S4: Verification Design | Requirement/reference/scenario/evidence coverage independent of the implementation; report and blocked-proof semantics | S1 obligations, S2 observation feasibility and the selected project-control boundary | Full multi-project verification tooling for unrelated surfaces |
| S5: design-cycle integration and handoffs | Updated phase calls/review scope and portable inputs for planning and paired execution | Accepted S0–S4 meanings | Whole factory automation |

S0 and S1 are one first tranche of understanding, not an invitation to change every role and phase in one diff. Each actual create/update still has one named skill spec, independent review and fitting proof. S2–S4 may need small joint design iterations; they do not require three agents writing contradictory standards concurrently.

The exact grouping of commits and PRs follows the accepted skill specs. Dependencies here express semantic prerequisites; they are not implementation admission. The Advisor's inventory determines whether a row is an update of an existing owner, a new capability, a wiring change or no change.

### Then: operational tooling and paired-delivery integration

| Workstream | Owns | Consumes | Hard boundary |
|---|---|---|---|
| Skills Lead | Role instructions, phase skills and their caller/handoff integration | Agreed design and verified inventory | Does not implement shared Router state or rewrite the eval product |
| Watchdog/Jev tooling work | Gathering usable facts, deterministic process checks, selected semantic checks and runtime instruction/handoff enforcement | Settled role/report/acceptance contracts from the first tranche | Does not treat a Jev classification or record-presence check as feature acceptance |
| Existing Codex Router Lead | Board records, process-state relationships and write-side guards within its commissioned board scope | Agreed consumer requirements from skills/tooling | Router owns its records/interfaces; skills do not create a competing authoritative journal |
| Chief of Staff repo/SOP owner | Chief intake, oversight and owner merge queue | Lead delivery handoff and selected merge-check contract | Chief policies stay in its own repo; a copied role paragraph is not SOP deployment |
| Later eval-system work | A fresh evaluation product using Jev, including its evidence and judge-validation design | Stabilized skill/tool contracts and representative evidence | Does not inherit old judge, dataset, transport or grading assumptions by default |

The separate tooling owner/session has not been chosen. No new Lead or worktree is launched by this decomposition. The existing Router Lead remains the board owner; no broad board change is commissioned here.

**Hard dependencies to preserve:**

- Writing and reviewing the design/role meanings does not require operational Jev or board changes.
- A skill that promises script-enforced rejection cannot be called enforced until its actual validator exists and its failure paths have been exercised. The wording and tool contract can be designed together; deployment waits for that proof.
- A Verifier workflow cannot demonstrate a real feature until that project's launch/drive/observe/cleanup controls are usable. An adequate existing harness can satisfy this dependency; generating all three product harnesses first is unnecessary.
- A tooling change that requires a new Router record or atomic state guard waits for the Router owner's actual interface and integration proof. A proposed `legalMoves` or typed-fact interface in a design document is not an available runtime capability.
- Paired implementation/review/acceptance integration consumes the selected role instructions and the Test/Verification Design contracts. Its full automated operation may depend on the watchdog/Router portion it actually uses.
- The new eval product follows the selected skill and tooling work under the owner's stated order. It must validate semantic measurements against independent references and clean controls, even when the production workflow also uses Jev.

### Current evidence relevant to the dependencies

- The current [`spec-design` proof reference](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/spec-design/references/proof-obligations.md) already separates requirement-level modality from exact test files/commands. The [`program-design` proof reference](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/program-design/references/proof-architecture-and-traceability.md) owns seams and real/replaced boundaries. These existing owners are the starting point, not blank surfaces.
- [`manage-agents`' job packet](/Users/shravansunder/dev/ai-tools/plugins/shravan-dev-workflow/skills/manage-agents/references/agent-job-packet.md) already binds role, outcome, sources, limits, stop and return. It lacks the proposed distinct Verifier instruction. Delivery enforcement is a further claim requiring tooling proof.
- The existing [`Jev stop classifier`](/Users/shravansunder/dev/ai-tools/agent-scripts/stop-review/jev_classifier.py) classifies a conversational window and composes a continuation decision. Its presence does not establish a task-level watchdog, independent behavioral verifier or board-guard engine.
- The current [`tests/skills` README](/Users/shravansunder/dev/ai-tools/tests/skills/README.md) says pressure testing is being redesigned; the surviving runner and fixture/unit tests are separate from an active complete scenario suite. The [`semantic evaluator`](/Users/shravansunder/dev/ai-tools/tests/skills/lib/skill-pressure-evaluation/evaluators/semantic/semantic-criteria-evaluator.ts) projects/bounds evidence and handles fail/inconclusive aggregation. These are legacy implementation facts and redesign inputs, not the selected architecture of the future system.
- Router's [board contracts](/Users/shravansunder/code/projects/codex-router.collab-improvements/docs/specs/2026-10-04-board-orchestration-design/spec-1-board-and-contracts.md) and [older board-state draft](/Users/shravansunder/code/projects/codex-router.collab-improvements/docs/specs/2026-10-04-board-orchestration-design/board-state-spec.md) describe proposed records and guards with explicit source cutoffs. The existing collaboration APIs prove messages/seats/subscriptions at their own stage; this document does not upgrade planned process APIs to shipped features.

The dependency inventory is source-only. No workflow, Jev benchmark, current product harness or new eval run was executed for this decomposition.

### New eval system, from scratch

The owner's order is preserved: this is later work, after the relevant skills and watchdog/Jev contracts settle. It starts from the outcomes to measure, useful scenario/reference pairs, evidence retention and completeness, independence, the allowed role of Jev, unavailable/undecidable behavior, cost capture and isolation. Existing experiments can inform pitfalls or provide revalidated calibration cases; they do not silently select the new runner or become a gold dataset.

The later eval rebuild does not erase proof owed by an earlier skill change. A change still needs fitting, inspectable proof before rollout. We must explicitly select a trustworthy bounded pressure-run method at that stage rather than claim either that the old runner is sound or that a future rewrite has already supplied evidence.

### Separate skills Lead handoff

After the chunk boundaries are agreed, the skills Lead receives the current design, verified Advisor inventory, source versions, first named target and success definition, permitted worktree/write scope, required skill-authoring workflow, proof posture and return channel. It owns each skill change through its requested delivery boundary, step by step. It does not receive authority to build the tooling workstream, edit Router, modify Chief SOPs or begin the future eval system through an ambiguous factory-wide assignment.
