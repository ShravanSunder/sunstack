# Progressive disclosure for role contracts

2026-10-13. Bounded update to `practices-manage-agents` in draft PR #127. Starting source: `e454068c6da90b68ccda8a60dd2c92a537ce722e`, existing worktree `/Users/shravansunder/dev/ai-tools.skills-practices-manage-agents`. This amendment supersedes the earlier choice of one physical schema file; the approved role semantics, assignment shapes, permissions and proof limits remain.

Owner need: the 452-line job-packet schema requires agents to read unrelated roles. Success: a commissioner can construct one role's typed assignment from shared fields and that role's contract; a recipient understands its populated assignment and opens only its own schema when needed. Whole-family validation still composes all roles from the same definitions. One logical authority does not require one file.

Authoring basis: user-directed intent. Classification: behavior-changing reference/schema allocation, with unchanged accepted payloads. Trigger and role/model decisions remain. Source and structural proof establish module ownership, direct importability and parser equivalence; fewer context tokens or better live retrieval are not measured claims. Trigger/pressure/E1/model/eval/app/property/mutation experiments remain deferred.

## Owners and tree

```text
schemas/
├── assignment-fields.ts          # shared source/read/access/base and blocked-assignment fields
├── role-contracts/
│   ├── lead-contract.ts          # Lead packet
│   ├── advisor-contract.ts       # Advisor packet and helper handback
│   ├── implementer-contract.ts   # Implementer packet
│   ├── verifier-contract.ts      # Verifier packet and its three work variants
│   ├── reviewer-contract.ts      # Reviewer packet
│   ├── researcher-contract.ts    # both forms and Researcher helper handback
│   └── operator-contract.ts      # procedure/collection packet and Operator helper handback
├── agent-job-packet.ts           # thin complete packet union for mixed-role validation
└── role-handback.ts              # thin complete helper-handback union
```

Each field/variant is defined once. Role literals, permitted form variants and charter pointers live with the role. Shared fields have real consumers across roles. Role contracts import shared fields; they never import either whole-family union or a sibling role. Aggregators import role definitions and own the complete union; they contain no parallel field definitions, old-export forwarding stubs or catch-all barrel. No generic `common`, `utils`, index or new registry module. Keep the small shared blocked-assignment shape with shared assignment fields, avoiding a separate hop for six lines.

Keep Zod `4.6.5`, `.describe()` meanings, strict object checks, required/optional payloads, existing discriminants, readonly/freeze behavior and `z.infer` authority. Preserve existing variant/schema names when they still describe the same job; each role exports its inferred packet type, and relevant helper roles their inferred handback types, from that leaf. No casts, `any`, parallel handwritten interfaces, new dependency/version, dispatch framework or semantic refinements. Existing unwrapped variant construction needed for the complete discriminated union remains valid; do not introduce circular imports or relax constraints to make composition work.

Readonly clarification: preserve the current distinction. Named role schemas are unwrapped composition objects/unions, as their existing exports already are; their inferred types describe those schemas. The complete `AgentJobPacket` and `RoleHandback` validators keep their current top-level `.readonly()` wrapping and frozen outputs. Nested readonly fields remain unchanged in both paths. Role-versus-family equivalence means payload acceptance/rejection and values, not pretending the raw composition schema freezes the top-level object. Do not add a second wrapped validator name per role, unwrap a frozen schema through casts, or make a role import the whole-family union for its type. Schema code imported by a validator is different from an agent reading every role's source into context.

## Who reads what

- The commissioner reads `agent-job-packet.md`, shared assignment fields and the selected role contract when constructing or inspecting a typed packet. That reference supplies a short seven-role path/type map, not repeated fields.
- Each full role charter points to its own exact role contract/type. A populated assignment and charter remain sufficient for ordinary execution; schema code is not an unconditional extra read for a recipient.
- When a recipient must construct or validate typed data, it reads its selected contract and the shared definitions it actually needs. Only Advisor, Researcher and Operator have packet-owned helper handbacks, used when no phase/method owns the result. Other roles retain their supplied phase result authority.
- A consumer validating an unknown or mixed-role packet reads/imports `AgentJobPacket`; a consumer validating an unknown packet-owned handback reads/imports `RoleHandback`. These family entrypoints are not default role reading paths. Add short navigation comments identifying the leaves without requiring them all to be loaded.

Concrete path: commissioning an Implementer needs the shared fields and `role-contracts/implementer-contract.ts`; it does not need Operator procedure or Researcher handback definitions. Returning a Researcher helper handback uses `role-contracts/researcher-contract.ts`; returning a phase-owned result follows that phase's supplied contract.

The current skill's main path still calls the packet reference and selected charter. Update those call sites only where needed to make the above route explicit. Seven comment-only import examples alone would not meet this success definition: the prose must select the actual role file and its load condition. No new role/framework or mandatory extra bookkeeping.

## Consumers and proof

Cut over the packet reference, all seven charter schema pointers, permanent aggregate test imports, source comments and governing schema-placement paragraphs/tree together. The tests use `AgentJobPacket` from its real packet-union file and `RoleHandback` from its real handback-union file. The existing recursive TypeScript include and pinned Zod alias already cover subfolders; change neither without an observed need. Temporary proof tooling may be updated to cover every module and nested relative import, with its limited scope stated honestly.

Use permanent fitting schema tests to preserve existing valid/invalid controls. Add direct role-contract consumer/import coverage where it proves the new independent entrypoints, including representative valid and invalid inputs and equivalence with the complete union. Do not add tests mirroring file text or an arbitrary line-count gate. Run the existing offline lib suite and typecheck once after the change, scoped lint/format on every changed TS file, direct Bun import of the real modules through the pinned shared-cache route, diff whitespace, and actual pointer/import reachability. No installs or temporary test files. Record real logs and which current source was exercised; reported deleted feasibility probes are not final proof.

The planned permanent valid packet and helper-handback controls must also assert that parsed `AgentJobPacket` and `RoleHandback` family outputs are top-level frozen, while preserving the existing nested readonly behavior and the explicitly raw role-leaf distinction. This observes the promised output contract; it needs no separate harness, source-break probe, mutation/property strategy or new wrapped role API.

Static source walks check the Implementer, Verifier, Researcher handback and mixed-role validation paths. They establish the progressive source route; live model loading and token savings remain unverified. The old missing tests-first chronology and unauthorized post-GREEN probes stay disclosed.

## Delivery and admission

Lead owns this amendment and assessment; the same independent Review Lead reviews the changed allocation before runtime files change. Existing Claude Main Implementer then executes the accepted bounded amendment in PR #127's current worktree and branch; same paired Verifier examines actual source/proof. After fitting proof and Lead assessment, the retained independent reviewers refresh affected source checks. No new review fleet, paid experiment or unrelated audit.

Update original governing schema-placement wording to one modular authority, retaining historical decisions as superseded where needed. Update the existing changelog's description and draft PR's actual shape/head through the established description procedure; the unpublished 2.76.0 candidate version may stay, since no installed cache or release occurred. No alias/shim, merge, cache refresh or global/devfiles edits are granted.

The owner separately closed #122 and requested a fresh design-family rewrite stacked above #127 via `gh stack`. That next layer consumes this current role/schema authority; it does not restore #122's competing roles or require #127 to merge first. Its governing replan is a separate Lead-authored artifact, not additional work hidden inside this amendment.
