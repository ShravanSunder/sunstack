# Phase composition: what builds up each phase

Status: **proposed**. Lead: 🦁 claude-local `68844339`. Focus 2, part C.

The owner gets one generated map of what each orchestrator and phase is made of: the phases an orchestrator runs, and for each phase the practices it loads, the principles it cites, its references (always or only when a condition holds) and the tokens it returns. A script builds the map from the skill files themselves, so it cannot drift from them, and a page draws it.

## Requirements

- **Know what each phase is built from**
  - "I need to be clear on what all the composite practices are that build up to that phase." (2026-10-24)
- **Break the admired skills down, with proper diagrams**
  - "I think Dauphas's skills can be broken down and proper diagrams can be done." (2026-10-24)
  - "pstack, matt or admired skills is what i ment, rest is transcrition erro" (2026-10-24, clarifying)

What the admired skills do (Researcher report `matt-pstack-2026-10-24/matt-pstack-comparison.md`, gap 8): Matt's wrapper skills name their primitives plainly. `grill-with-docs` is grilling plus domain-modeling. pstack's playbooks each carry a reading list. Ours compose through load calls inside each skill, but nothing shows the owner the whole picture.

## Today, measured

Measured on 2026-10-24 from the skill files at `e7f3e936`, the batched-delivery head after its correction pass. The measurement used a throwaway script in the Lead's job folder. It counts only load calls in each `SKILL.md`: a `MUST load` with a path, or an `IF …` sentence with a `load` and a path. It also counts principle citations. A pointer to a file without a load call is not counted. A load call inside an IF sentence counts as conditional even when it says MUST. At the earlier `b2aef990`, `implement-plan` only pointed at the pairing rule; the correction pass made it a conditional load, which this table counts.

| Phase | Lines | Always loads | Loads when a condition holds | Cites principles |
| --- | --- | --- | --- | --- |
| orchestrator-design | 87 | design-documents, show-me-your-work, preflight, phase-return-tokens | manage-agents, owner-decision-brief, orchestrator-implementation-goal | none |
| orchestrator-implementation-goal | 52 | manage-agents, show-me-your-work, preflight, goal-contract-and-routing, phase-return-tokens | implementation-pr-wrapup, plan-implementation, owner-decision-brief | none |
| plan-implementation | 45 | slice-and-proof-design, canonical-implementation-plan | manage-agents | none (its reference cites write-tests-that-can-fail) |
| implement-plan | 45 | canonical-implementation-plan, execution-and-proof, preflight, verification | manage-agents, implementer-verifier-pairing, cleanup | none in `SKILL.md` |
| spec-design | 325 | rendering-and-fallbacks, design-documents and five of its own references | owner-decision-brief | none in `SKILL.md` |
| program-design | 357 | design-documents, practices-how and eight of its own references | lane-schema (when a predicate holds and delegation is useful), domain-language skill, rendering-and-fallbacks | justify-the-complexity |
| verification-design | 138 | design-documents, choosing-the-observation, rendering-and-fallbacks | manage-agents, owner-decision-brief | five |
| implementation-review | 82 | canonical-implementation-plan and six review references | proof-challenge, focused-reviewer | none in `SKILL.md` |

What the table already says, before any judgment: the two design phases carry most of the weight; the first-plan phase composes almost nothing beyond its own references; neither orchestrator cites a principle. Whether any of that is wrong is a later `skill-audit` question; the map makes it visible.

## Situations

1. **The owner opens the map.** One diagram per orchestrator shows its phases in order. Each phase opens to its practices, principles and references, with "always" and "when …" kept apart.
2. **A skill gains a load call.** The maintainer regenerates the map in the same change. A contract test fails if the committed map no longer matches the skill files.
3. **A focus-2 change lands.** The map shows `plan-update` under `orchestrator-implementation-goal` and the plan step under `orchestrator-design`, from the skill files, with nothing hand-written.
4. **An audit asks what to break down.** `skill-audit` reads the map's sizes and load counts as candidates, then judges them against the skills themselves.
5. **Not a home for meaning.** The map never says what a phase should do. Each skill's own text stays the only authority.

## Ancillary work

No skill's teaching changes in this part, so it has no skill runs. Its four items are ancillary delivery work W1–W4 in [coordination.md](coordination.md). The Implementer owns them in the focus 2 PR, under the security decision recorded there.

### W1 composition generator

A TypeScript script, run with Node, beside the skill tests (`tests/skills/`). TypeScript is the language of that harness, so this adds no new runtime. It reads every active skill under `plugins/sunstack-dev/skills/` and writes `plugins/sunstack-dev/docs/phase-composition.md` with:

- per orchestrator, its phases in route order;
- per phase, its always and conditional load calls, split by kind (practice, phase, shared reference, its own reference), with pointers that are not load calls listed separately; a load call inside an IF sentence counts as conditional even when it says MUST;
- the principles it cites, in `SKILL.md` and in its references;
- the tokens it returns, and its line count.

### W2 composition page

`plugins/sunstack-dev/docs/phase-composition.html` composes the generated Markdown as an island. It has one Mermaid flowchart per orchestrator (phases → practices) inside that Markdown, and a walkthrough per orchestrator.

### W3 freshness test

A contract test regenerates the map in memory and compares it with the committed file. It fails on a stale map, and it is proven by adding a load call to a scratch copy and watching it fail.

### W4 maintainer index

`docs/architecture/skill-system.md` links the map, and `plugins/sunstack-dev/README.md` names it.

## How it will be proven

- The generator's output for today's tree matches the measured table above, which is checked by hand once.
- The freshness test fails on a scratch copy with one added load call and passes on the real tree.
- `demistify check` passes on the page, and a browser check shows each flowchart rendered.

## Decisions

| # | Decision | Reason |
| --- | --- | --- |
| C-D1 | The map is generated from the skill files, never hand-written | One home per truth: the load calls are the composition |
| C-D2 | A contract test keeps it fresh | A map that silently drifts is worse than none. This is a test agents run, not an automatic hook, so it respects the owner's "we cant ahve auto checks" for now |
| C-D3 | No skill gets a hand-written "composes" list | It would duplicate the load calls and drift |
| C-D4 | Breaking heavy skills down is a later `skill-audit` pass that reads the map | The owner asked to see the composition first. Splitting skills is its own decision |
| C-D5 | The script is TypeScript | It joins the existing TypeScript harness in `tests/skills/`, so no new runtime enters the repository (part D's D-D2) |
