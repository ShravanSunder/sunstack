# Typed packet contract

Part of spec v5, 2026-10-13, with the owner's accepted [progressive-disclosure amendment](progressive-schema-disclosure.md). Field meanings below stay; their runtime authority is now shared assignment fields plus role-contract leaves, composed by thin `agent-job-packet.ts` and `role-handback.ts` unions. Role prompts point to their own inferred types and load conditions. This document is not a second runtime schema. Zod v4 field descriptions carry these meanings once.

## Commission

`AgentJobPacket` is a discriminated union on `role`, derived with `z.infer` from one Zod schema. A shared base is extended by the role variants. Build object variants before readonly wrapping. Do not maintain a hand-written interface alongside the schema.

| Shared field | Shape and meaning |
|---|---|
| `outcome` | Nonempty string: the concrete result requested, not an acceptance claim |
| `sources` | Readonly source entries: either a reachable pointer with its relevance, or supplied inline material with its relevance |
| `requiredReads` | Full `charter` pointer; readonly named `practices` and `principles`; role defaults plus the job's additions |
| `limits` | Access union: inspect; inspect + granted execution; or named writes + granted execution. Required payloads differ. Host permissions remain separate |
| `stopCondition` | The assignment's closing check or event, including when an exception must return |
| `returnContract` | Owner/shape reference for the current phase/method result, or the packet-owned helper handback when none exists |

An empty practice list is legal when no practice applies to the prescribed operation. The charter is always required. Principle/default read selection is checked semantically by the commissioner and reader; counting names proves neither appropriate selection nor full reading.

`role` and `executionForm` have these valid pairings:

```ts
// Complete AgentJobPacket union lives in schemas/agent-job-packet.ts.
// Role-specific schema/type definitions live once in schemas/role-contracts/.
// Every exported type is inferred from its Zod v4 schema.
type RoleFormPair =
  | { role: "lead"; executionForm: "main" }
  | { role: "advisor"; executionForm: "sidekick" }
  | { role: "implementer"; executionForm: "sidekick" }
  | { role: "verifier"; executionForm: "sidekick" }
  | { role: "reviewer"; executionForm: "sidekick" }
  | { role: "researcher"; executionForm: "worker" | "sidekick" }
  | { role: "operator"; executionForm: "worker" | "sidekick" };
```

This is a design illustration of the required discriminants, not an additional interface to ship. There is no `role: "worker"` or `role: "sidekick"`. Role/valid form alone does not prove a model is eligible, a user granted a write, or a route is available.

## Required role payloads

These extend the same base; an absent required payload is rejected.

| Role | Required payload |
|---|---|
| Lead | Owner intent and current governing context; entry/continuation only, not helper-appointed leadership |
| Advisor | Question and current model/claim to challenge |
| Implementer | Current plan/slice reference, named write scope, and its paired Verifier reference |
| Verifier | Adopted correctness reference, paired implementation reference, and one work-mode variant below |
| Reviewer | Current review target, procedure reference and explicit no-author-history requirement |
| Researcher | Bounded/continuing question, supplied approach/scope and closing check |
| Operator | Nonempty prescribed procedure or supplied collection/extraction criteria, with expected observations and stop behavior |

Verifier work is a nested union. **Feasibility challenge** requires the proposed proof/contract and may precede a build. **Delivery observation** requires a declared runtime target/build locator and observation procedure; the report records the identity it observed. **Verification apparatus** requires the driver/harness outcome, its declared reference, plan/approach and exact apparatus write paths. It grants no feature-code or product-suite repair authority.

Operator steps may be shell scripts, tool actions, watches or guided extraction. State the exact action/rule and expected observation. Candidate extraction labels are allowed under supplied criteria; unknown relevance, missing content and failures are reported rather than upgraded into an engineering verdict. The limits must permit the procedure; shape alone cannot establish that grant.

## Handbacks

Existing phase/method result schemas keep their own fields and decision labels. The job packet names the contract to return. Do not duplicate them here or replace them with a generic “accepted” result.

When no phase/method contract owns the result, `RoleHandback` covers these three cases:

- Operator: per-step observations/output references, exit codes where applicable, candidate extracted material and exceptions.
- Researcher: checked answer/synthesis, decisive source references, distinction between source/history/inference and unresolved gaps.
- Advisor: checked challenge, credible alternatives/tradeoffs and what remains for the Lead/owner to decide.

Each has a completed-assignment or blocked-assignment variant. Completed requires its result/evidence payload. Blocked requires the missing input/permission/decision and whatever was observed. Neither result means delivery accepted. There is no Worker handback role: use the Worker's role and its declared return contract.

## Ready prompt assembly

For an Implementer and Verifier pair, create or reuse both sessions first without prompting their work; use their addresses to fill the paired references in both packets, then dispatch both commissions. A creation receipt establishes an address, not work started or accepted. No placeholder address or new pairing index is required.

The commissioner selects the charter-owned opening from the selected role file (`references/roles/<role>.md`), fills the single typed job packet, and explicitly directs full reads from `requiredReads`. Additional job-specific principles are added according to the work, not through an unconditional catalog. Role template defaults point to the same shape; they do not redefine its fields.

Host model, effort, history and sandbox settings are applied through the host's own arguments. Separate-session addresses and native subagent identities are recorded through existing management/collaboration procedures. Packet strings, role names and board seats do not authenticate those settings or grant privileges.

## Structural proof to implement

Use fitting permanent tests in the existing skill test harness:

- valid Operator procedure accepted; same packet without the procedure/criteria rejected;
- valid Sidekick Implementer accepted; same role with Worker form rejected;
- valid pre-build Verifier challenge accepted without a target build; observation variant without a target rejected;
- completed helper handback without result/evidence rejected; valid blocked handback with its exact gap accepted;
- named phase/method return contract remains the authority; no generic acceptance field is introduced;
- import/typecheck succeeds against the single Zod version/resolution used by the repo's existing validation setup.

These check the interface failure modes. They do not establish appropriate requirements, that full reads happened, author-history independence, observation adequacy, permitted execution or role retention. Those remain role/host/evidence responsibilities and the explicitly deferred behavior proof.
