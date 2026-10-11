# Next step: role skills composed from SOPs, and "experiment before asking"

- **Status:** proposal for discussion, not adopted. The owner parked it on 2026-10-11 ("we can work on that separately, we will think") and asked for it to be written down and passed by the 🦁 Lead (codex-local 01a118ee).
- **Author:** 🦉 Advisor a6321a2f.
- **Related work:**
  - the Lead's working design, [`2026-10-11-delivery-topology-and-verification-design.md`](../../2026-10-07-sdlc-portfolio/2026-10-11-delivery-topology-and-verification-design.md) (§4a role instructions; §12 chunk S0);
  - the design-skills Lead's first tranche (`../2026-10-11-design-skills-first-tranche/`);
  - the survey in ai-dev-skills, [`docs/research/2026-10-11-factory-skill-correlation/README.md`](/Users/shravansunder/code/opensource/agent-skills/ai-dev-skills/docs/research/2026-10-11-factory-skill-correlation/README.md), whose §5 row "prototype before asking" is marked missing.

## 1. Why: a near miss on 2026-10-11

Two technical decisions in the board-design session (codex-router, `design/board-orchestration`) nearly went the wrong way. Both had the same pattern.

| Decision | What happened | What settled it |
|---|---|---|
| Turso blocking IO on macOS | The session explained the problem from reading Turso's source and recommended a driver rewrite: one OS thread per connection, later a rewrite of the driver's engine layer. It then asked the owner to choose "the rewrite or measure first". | The owner asked for verification. That meant checking the latest Turso `main` plus releases 0.8.2 and 0.8.3-pre.1, and measuring on the Mac. **Findings:** normal commits had a 44 µs median, about the same as stock SQLite. The lock-wait spin was real (2.9 s of CPU per 2 s wait) and is an open upstream issue. The 10 s sleep was never observed. **Fix chosen:** a few dozen lines in our own driver (`busy_timeout = 0` plus a Tokio-timer retry), with Turso itself untouched. |
| Atomic writes in a Rust Durable Object | An earlier local test proved only a reflection workaround that reached `transactionSync` through `as_raw()`. The design and a workaround-log entry were built on it, along with a claim that it was "the only official way". When challenged, the session admitted the official `Storage::transaction()` existed and was untested, yet still recommended the workaround. | The owner asked for a real integration test, with no mocks. The official API rolled back on error, held across an `.await`, and blocked other events until it finished. The workaround was dropped. |

**The pattern:**
- anchoring on the first path that worked, or on inference from reading code;
- presenting untested options as recommendations;
- asking the owner to choose where a cheap experiment would decide.

**The owner's standing rule since then:** experiment and validate every change before proposing it, and don't make up solutions.

## 2. What pstack does

Checked at source: the checkout `ecc249f` and the snapshot `978ca6e`.

- **The main agent runs an always-on mode.** `/poteto-mode` is "the front door", and a Cursor Custom Mode keeps it in context on every turn. In Lauren Tan's practice, the main agent is the **Cursor Project coordinator**. Asked why she gives `poteto-mode` to Grok Bot, she answered "the project will use it". Our counterpart is the **Lead**, not the Chief of Staff.
- **Ask classification** (`poteto-mode/SKILL.md:20`): "If the answer is a fact you could observe by running something (behavior, timing, layout, output, perf…), it is not the human's to answer. Sketch it via the Prototype playbook and let the result decide… Reserve the question for a genuine product or preference call no experiment can settle."
- **The prototype playbook** (`playbooks/prototype.md`): "You own the design decision, not the code. The prototype is a throwaway instrument." It replies with "the variants explored, the evidence…, tradeoffs, your recommendation".
- **Principles are separate skills, indexed by the mode.**
  - There are 23 `principle-*` skills, about 39 KB in total, and every one is marked `disable-model-invocation: true`.
  - `poteto-mode` lists each one on a single line: its name, its trigger and its rule. For example, "Never Block on the Human… Tempted to ask 'should I do X?' on reversible work. Proceed, present the result…" (`:73`), and "Exhaust the Design Space… Build 2-3 competing prototypes" (`:51`).
- **Design:** "Never take the first design." `architect` runs `arena` and requires "at least two structurally distinct candidates" (`architect/SKILL.md:35`).
- **What reaches the human** (`playbooks/orchestrate.md`): only "genuine product or preference calls no experiment settles". Each is parked in `gates.md` with a default, and other work routes around it.

## 3. The proposal (owner's idea)

```
PSTACK                                  PROPOSED FOR US
poteto-mode (always on, main agent)  ►  role-lead · role-verifier · role-implementer ·
  index: principles + triggers            role-chief-of-staff · … (each composes SOPs)
  routing rules (ask classification)
principle-* (small skills)           ►  sop-* (principles and procedures)
playbooks (prototype, orchestrate…)  ►  phases / orchestrators (spec-design, …)
(Cursor spawns subagents)            ►  manage-agents = only how to call things:
                                          launch, models, job packets
```

## 4. Design points to settle

1. **A role indexes its SOPs; it doesn't paste them in.** Use one line per SOP with its trigger, and load the body when the trigger fires, as pstack does. Only a few rules stay inline all the time, for example "sort the question before asking" for the Lead.
2. **Principle versus procedure.** pstack separates judgment rules (principles) from step-by-step procedures (playbooks). Our `practices-*` skills are already procedures. The options are one `sop-*` prefix for both, or `principle-*` alongside `sop-*`.
3. **Layering.** Roles sit on top and call orchestrators and phases. SOPs sit at the bottom, usable by any role or phase. `manage-agents` stops owning roles, which changes the owner's global instruction "`manage-agents` owns every other role".
4. **How a role stays loaded is unknown and must be tested before design (E1).** pstack relies on a Cursor Custom Mode. We don't know what keeps `role-lead` in effect across compaction and resume in Claude Code or Codex.
5. **Copy or adapt.** The repo rule is to adapt upstream ideas, not copy prose. pstack is MIT-licensed. Her text names her own playbooks, so adaptation fits better.
6. **Avoid duplicates.** Many of her principles already exist in the owner's global instructions (see §6).

## 5. Experiments to run before designing

These are proposals only; none has been run.

| ID | Question | Setup | Expected result that would support the design |
|---|---|---|---|
| E1 | Does a role skill stay in effect after compaction and resume? | Start a Claude Code Lead and a Codex Lead with `role-lead` loaded. Run each past one compaction, or resume it. Then present a fork that running something can answer. | The Lead still sorts the question and runs or commissions the experiment instead of asking. Record which loading method held on each host. |
| E2 | Does the ask-classification rule change behaviour? | Replay the workers-rs fork ("reflection workaround or official `transaction()`?") with the rule and without it. Use fresh sessions, same model and same sources. | With the rule: both are tested side by side and one recommendation comes back with evidence. Without it: the owner is asked, or the first path is recommended. |
| E3 | Index or inline? | The same role run two ways: an index of SOPs that load on trigger, versus all SOPs inlined. | Compare tokens per spawn and whether the rules are followed on 3–5 pressure scenarios. |

## 6. Her principles against the owner's current instructions

This is a first pass, based on the principle names and the owner's global instructions. It needs checking.

| Already covered by the owner's instructions | Partial | Real gap |
|---|---|---|
| prove-it-works · test-behavior-not-implementation · never-block-on-the-human (in act mode) · type-system-discipline · model-the-domain · fix-root-causes · migrate-callers-then-delete-legacy-apis (hard cutover) · minimize-reader-load · boundary-discipline · sequence-verifiable-units (planner) · outcome-oriented-execution | laziness-protocol · subtract-before-you-add · foundational-thinking · redesign-from-first-principles · attack-the-premise · guard-the-context-window | **ask classification plus a prototype procedure** (not a principle in pstack: a routing rule plus a playbook) · exhaust-the-design-space · encode-lessons-in-structure (plus `/correct` at `978ca6e`) · build-the-lever · explain-the-number (`978ca6e`) · make-operations-idempotent · separate-before-serializing-shared-state · experience-first |

## 7. Asked of the Lead

- Review for mistakes and for conflicts with your working design (§4a, §12).
- Say whether this belongs in chunk S0 or in a later, separate chunk. The owner has parked it, so no change is admitted.
- Propose which experiment, if any, should run first under the owner's experiment-first rule.
