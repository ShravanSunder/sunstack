# Practices worth taking from pstack, Osmani and Matt

- **Status:** proposal for discussion. The owner liked the direction on 2026-10-11. Nothing is adopted, and each change still goes through `skill-creation` with proof once proof is admitted (first-tranche U33 excludes pressure testing for now).
- **Author:** 🦉 Advisor a6321a2f.
- **Inputs:**
  - the survey at ai-dev-skills [`docs/research/2026-10-11-factory-skill-correlation/`](/Users/shravansunder/code/opensource/agent-skills/ai-dev-skills/docs/research/2026-10-11-factory-skill-correlation/README.md);
  - the parked [roles and practices proposal](../2026-10-11-roles-and-sops/proposal.md);
  - the owner's [output-ladder notes](../../2026-10-05-karpathy-ste-explainers.md);
  - the first-tranche draft skill specs in [`../2026-10-11-design-skills-first-tranche/skill-specs/`](../2026-10-11-design-skills-first-tranche/skill-specs/).
- **Source versions:** pstack checkout `ecc249f` (newer snapshot `978ca6e` where marked); Matt `c55ee46`; Osmani `2686b62`.
- **Rule for this list:** every item names the failure we actually saw that it answers. Anything with no evidence of a gap is left out.

## 0. Already absorbed by the first-tranche drafts (no new practice needed)

| Source | Where it landed |
|---|---|
| pstack `principle-prove-it-works` (real artifact, not a proxy) | `verification-design`: real surface, declared reference, core outcome first |
| pstack `principle-test-behavior-not-implementation`; Matt's tautology rule | `test-design` step 4 and `references/false-greens.md`; the Reviewer checks tests against it |
| Matt's red-capable command; pstack Benny's baseline-twice | `verification-design` bug path: "a command already run on the unfixed code that shows the symptom (twice)" |
| pstack orchestrate's standing orders in every spawn | `manage-agents` D3: the charter opens every assignment, correction and resume |
| pstack `poteto-mode:20` ask classification | `orchestrator-design` branches, but **only within the design cycle** (see §1) |

## 1. Experiment before asking: a habit plus a practice

**Naming question:** `discuss-*` or `practices-*`?

**Recommendation:** split it in two.

- **The rule is an always-on habit.** "If running something can answer the question, it isn't the owner's question." It belongs in every role's charter (manage-agents D3) and in the owner's global instructions. pstack puts it in the main agent's always-on mode (`poteto-mode/SKILL.md:20`), not in a separate skill.
- **The procedure belongs in `practices-*`.** That means: scope the one decision; build throwaway variants side by side, official or supported path first; observe the real thing; return one recommendation with its evidence and limits. Extend **`practices-research`** with a "run it" evidence class plus a short prototype reference. Research already owns evidence classes and ledgers, and an experiment is evidence. This lifts the experiment branch out of `orchestrator-design` so every role can use it.
- **Why not `discuss-*`:** the `discuss-*` family is for conversations with the owner (`discuss-pathfinding` requires a live user). Experiment-before-asking does the opposite. It settles the question *without* the owner, and it applies at any time, in any role.

**Evidence:** the board-design session on 2026-10-11.
- The Turso blocking-IO question was put to the owner as "rewrite or measure?". Measuring found a few-dozen-line fix.
- A reflection workaround was recommended over the official workers-rs `Storage::transaction()`, which hadn't been tested. A real integration test showed the official API does everything needed.
- Details are in the [roles proposal §1](../2026-10-11-roles-and-sops/proposal.md); the figures there aren't reproduced.

**Keep pstack's exception:** a read-only investigation whose deliverable is a cited answer stays an investigation. It doesn't need a prototype.

## 2. Never block on the human: audit everything that stops for the owner

The owner reports that agents stop for them constantly. The owner's global instructions already say "decide and record instead of asking", but only in act mode. Many skills and tools carry their own stop-and-ask routes.

**pstack's version** (`principle-never-block-on-the-human`): "Proceed, then present. Don't ask 'should I do X?' Do X, explain why." Only irreversible actions and product direction wait for the human.

**Proposed audit** (an experiment, not a rule change). A Sol Worker would:
1. Inventory every instruction that stops for or asks the owner, across the `shravan-dev-workflow` and `skill-authoring` skills, the shared references, the owner's global instructions, `agent-scripts/` (including the stop-review hook) and the Router tool manuals.
2. Classify each stop as one of:
   - a genuine owner call (product, preference, authority, irreversible);
   - reversible, so it should proceed and present;
   - answerable by running something, so experiment;
   - waiting on another agent, so use a listener or wake.
3. Sample owner turns from the session logs that answered an agent's question, and count how many fall into each class. The 2026-10-05 Lead timelines are already extracted.

The audit is done when every stop has a class, and a predeclared expectation (most stops are reversible or runnable) has been checked against the sample. Fixes come only after that.

## 3. Generic verification practices, outside any one project

The owner wants this; we don't have it. Today's split:
- `verification-design` is per change;
- the planned per-project verification skill is an app driver plus a feature map.

What's missing is the **project-independent rulebook** both of them lean on. Proposed: **`practices-verification`**.

| Rule | Source | Failure it answers |
|---|---|---|
| Check the real artifact, not a proxy. When verification fails, suspect the observation method before the system | pstack `principle-prove-it-works` | IPC tested against recorded traces of one version, not installed agents |
| Script the check and keep its output as an artifact a reviewer can rerun | pstack `principle-prove-it-works`, `principle-build-the-lever` | evidence that existed only in a chat summary ("Lead-verified: 84 runs") |
| Class each checker by independence: **External** (a tool the agent can't argue with), **Project** (a rule a human owns) or **Suite** (the agent's own tests, the only circular class). "Can the agent make this pass by writing code that doesn't work?" Require at least one outside check | Osmani `constraint-driven-development` (`SKILL.md:218–224`) | green suites written by the same agent that wrote the code |
| Declare the reference: binary, version, entry point, the kinds of case. A baseline is the spec only for preserving behavior | pstack `visual-parity` ("The baseline is the spec"), plus our own Git-matcher case (no pack requires a versioned reference) | Git 2.52 port checked against an undeclared 2.50.1 with random cases |
| The false-green shapes: weak or no assertion, mock or absence only, self-referential, constant pin, fixture asserts fixture | pstack `principle-test-behavior-not-implementation`; Matt `tdd` | tautological tests |
| Reproduce first with a command already run on the user's exact symptom; on bugs, the symptom twice on the baseline or no claim | Matt `diagnosing-bugs`; pstack Benny `verify-existing-fix` | fixes claimed without a baseline reproduction |
| Vet a number before trusting it: the limiter, tuning, plausibility, correct output, alternating runs, end-to-end relevance, whether the work happened in the timed region | pstack `/benchmark-checklist` [`978ca6e`] | measurements taken at face value |
| Verify the observation channel itself, by injecting a known failure and seeing it arrive | Osmani `observability-and-instrumentation` | trusting logs or monitors that were never shown to fire |
| Guard the bar: compare thresholds, suppressions and exceptions against the branch point | Osmani `floor-guard` | a weakened gate passing as green |
| Optional: mutation testing scoped to the diff, to prove assertions can fail | Osmani [`1be8e34`] | assertions that can't fail |
| The report says pass / fail / **not verified, and why**, per obligation. Never a bare "green" | our report-not-verdict decision; Osmani doubt-driven ("findings are data") | a relay of green logs |

**Relationship:**
- `verification-design` (per change) and the per-project driver skill **apply** these rules.
- `practices-verification` owns them once, so neither copies them.

## 4. Guard the context window

**What it is** (pstack `principle-guard-the-context-window`): "The context window is finite and non-renewable within a session." Three moves:
- **Isolate large payloads.** Send verbose outputs, screenshots and large documents to subagents. The main thread gets summaries.
- **Keep frequently used content inline.** Templates used on every call belong in the skill file, not in a reference that costs a read each time.
- **Size phases and cap scope:** files per phase, turn budgets, the cost of each mechanism.

**Why it matters here:**
- Leads live 10–14 days and get compacted, so every raw dump they read is paid for again, and degrades later reasoning.
- It matches the owner's cache constraint: big contexts cost cache writes.
- **Evidence from this session:** the Workers' 273 KB, 159 KB and 127 KB reports were consumed through their top-7 and conflict sections, plus spot-checks. Transcript windows were extracted by an Operator rather than read raw.

**Home:** a short rule in `manage-agents` (helpers return pointers and summaries, never dumps) and in `practices-research` (ledgers hold pointers). It needs no new skill.

## 5. Explanation: a `discuss-*` skill that uses the presentation skills

**What the owner wants:** explanations as clear as an engineering drawing sheet, like the ASD-STE100 overview infographic with its titled sections, one claim per panel, and the rules shown with examples. The owner's [2026-10-05 notes](../../2026-10-05-karpathy-ste-explainers.md) already set out the method:
- **The output ladder:** STE-constrained prose, then diagrams, then a throwaway HTML explainer, then video.
- **Judge the HTML rung on abstraction, not looks:** one primary claim per view; the plot argues that claim; the caption says what changed and what it means.
- **A candidate STE subset:** sentence-length caps, approved verb forms, one word for one meaning, and the swap list.

**Evidence:** in this collaboration the owner repeatedly could not read the explanations given:
- "too much text… explain it better with diagrams";
- "I don't understand your ever-changing slop";
- the Lead's rendered topology had to be redrawn as text views.

**Proposed:** a `discuss-*` skill (working name `discuss-explain`). It is owner-facing, so `discuss-*` fits. The owner (or "that didn't land") triggers it. It chooses a rung, writes at one altitude, and composes the existing `presentation-tui` / `presentation-webui` skills and the Artifact page for the HTML rung, instead of duplicating them.

**Borrow:**
- pstack `teach`: runs `how` and `why`, then weaves "one clear explanation";
- pstack `technical-writing`: Diátaxis structure, Google developer style, STE rules;
- pstack `unslop`: cut AI tells;
- Matt `wait-what`: "Stop. That last message did not land: re-pitch it.";
- Matt `teach`.

**Experiment first,** per the notes' own do-next list:
1. 80% STE versus the current voice on one live design explanation, judged by the owner;
2. one throwaway HTML sheet for a hard topic, failed if it's a metric dump.

Build the skill only if both help.

## 6. Attack the premise

**What it is** (pstack `principle-attack-the-premise`): "When two or more fixes that share one premise have failed the same gate, suspect the premise, not the fixes."
- Write the premise down: the one sentence every failed fix assumed.
- Take a census, as a script you can rerun, before the next fix.
- Remove the asymmetry rather than compensating for it.
- Stop before the next fix until the premise is written and the census exists.

**Evidence:**
- IPC Program Design revisions 31–35 and Spec revision 16 kept patching around the version gate.
- The worktrees re-reviews narrowed scope while defects recurred.
- 35 of 157 owner corrections in the 2026-10-05 sample were "against the design" (cause unestablished).

**Home:** a small `practices-*` skill loaded in correction loops (implementation corrections, `debug-investigation`, repeated review rounds). It could also be a trigger line in the Lead charter.

## 7. Other practices worth taking

| Practice | Source | Evidence or need here | Home |
|---|---|---|---|
| **Encode lessons in structure:** when the same instruction is written twice, encode it as a lint, flag, runtime check or script | pstack `principle-encode-lessons-in-structure`, `/correct` [`978ca6e`] | lessons pile up as prose in the memory-logs skill log; 157 owner corrections | maintain-factory practice |
| **Build the lever:** build the tool that does or proves the work; the tool is the artifact a reviewer reruns | pstack `principle-build-the-lever` | the throwaway traceability script answered a design question in 11 minutes | `practices-verification` and the habit |
| **Blast radius:** find what a change could break beyond the diff, and prove the one safety fact by running real code | pstack `blast-radius` | reviews that narrowed to the last fix | Verifier and Reviewer |
| **Recall:** rebuild working context from history and the shared record into a current-state brief | pstack `recall` | long-lived Leads resuming after compaction | Lead resume; the context kit |
| **Reflect:** three reviewers over a transcript route each learning to a concrete skill edit | pstack `reflect` | the skill log records failures but doesn't route them to edits | `skill-audit` / maintain-factory |
| **Doubt-driven:** fresh-context adversarial review of non-trivial decisions; findings are data | Osmani `doubt-driven-development` | the Lead's acceptance and the Advisor's challenge | Lead decision step |
| **Source-driven:** ground decisions in official, current docs and source; supported path first | Osmani `source-driven-development` | the stale Turso claims; the unofficial workers-rs path | `practices-research` |
| **Context engineering:** restart and refresh checks when output quality degrades | Osmani `context-engineering` | quality drift in long sessions | Lead resume |
| **Exhaust the design space:** two or three competing prototypes for a novel decision | pstack `principle-exhaust-the-design-space`, `architect` | anchoring on the first path that worked | in the experiment practice, within budget |

**Left out:** principles the owner's global instructions already cover, and code-design principles that don't bear on these process failures:
- type discipline, model the domain, fix root causes, hard cutover / migrate callers, minimize reader load, boundary discipline;
- the code-design ones: idempotent operations, separating before serializing shared state.

## 8. Suggested order

1. **The never-block audit (§2)** and **experiment-before-asking (§1).** These have the freshest evidence, and the audit is research only.
2. **`practices-verification` (§3).** It feeds the first-tranche `verification-design` and `test-design` without duplicating them.
3. **Attack the premise (§6)** and **encode lessons in structure (§7).**
4. **The explanation skill (§5),** after its two experiments.
5. **Guard the context (§4),** as rule lines folded into skills already being rewritten.

Placement relative to current work:
- Step 1 (the design-skill rewrite with role instructions in `manage-agents`) is in progress with its own Lead.
- Role skills are step 2, parked.
- These `practices-*` additions are separate from both. Their sequencing is the owner's call.
