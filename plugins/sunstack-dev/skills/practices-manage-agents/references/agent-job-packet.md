# Agent job packet

This reference owns how to write a commission. Inputs: the chosen role, form, catalog row, route, and the selected role skill's ready opening, reads and Commissioning section. Return the opening, the filled typed packet and the full reads it directs. Complete when every required field holds something a fresh agent can use without your history, or the missing input is reported instead of sent.

The packet's shape is Zod v4 schema code under `../schemas/`, with a description on every field. This file teaches what to put in the fields. The schema checks shape only: a valid packet can still name the wrong reads, claim a grant nobody gave, or ask for the wrong outcome.

## Read only the schema you need

The fields every role shares (sources, required reads, access, the return contract, the blocked handback) live in `../schemas/assignment-fields.ts`. Each role's own fields, its form and its exact role-skill literal live in that role's contract. When you construct or inspect a typed packet for one role, read `assignment-fields.ts` and that role's contract, and none of the others.

| Role | Contract | Packet type | Helper handback type |
|---|---|---|---|
| 🦁 Lead | `../schemas/role-contracts/lead-contract.ts` | `LeadPacket` | none |
| 🦉 Advisor | `../schemas/role-contracts/advisor-contract.ts` | `AdvisorPacket` | `AdvisorHandback` |
| 🐒 Implementer | `../schemas/role-contracts/implementer-contract.ts` | `ImplementerPacket` | none |
| 🔬 Verifier | `../schemas/role-contracts/verifier-contract.ts` | `VerifierPacket` | none |
| 🔎 Reviewer | `../schemas/role-contracts/reviewer-contract.ts` | `ReviewerPacket` | none |
| 📚 Researcher | `../schemas/role-contracts/researcher-contract.ts` | `ResearcherPacket` | `ResearcherHandback` |
| 🔧 Operator | `../schemas/role-contracts/operator-contract.ts` | `OperatorPacket` | `OperatorHandback` |

To validate a packet whose role you don't know, or packets of several roles, use `AgentJobPacket` in `../schemas/agent-job-packet.ts`. For a helper handback whose role you don't know, use `RoleHandback` in `../schemas/role-handback.ts`. Those two only compose the role contracts. They freeze the parsed object at the top level; a role contract returns the same values unfrozen. Neither is a default read.

A recipient doesn't need schema code to do its job: its populated packet and selected role skill are enough. It opens its own contract only when it must construct or validate typed data.

## Fill each field

- **`outcome`**: what done looks like, in one or two sentences the agent can check itself against. It names a result, never an acceptance.
- **`sources`**: exact paths, or inlined text, that a fresh agent can use without your history, each with why it matters. A pointer the agent can't reach is no source; inline what it needs instead.
- **`requiredReads`**: the selected role skill's name in `charter` (for example `role-implementer`), plus the practices and principles to read in full. Start from the reads the role names and add what this job touches: the testing principle when tests are in scope, the types principle when a boundary's data changes. Don't list every practice or all the principles for a simple collection job, and don't leave an essential read out because you already loaded it; the recipient hasn't. An empty practice list is fine for a prescribed operation.
- **`limits`**: one of three access grants. `inspect` reads only; scratch goes to `tmp/` or the system temp folder, and you check afterwards that the worktree is unchanged. `inspect-and-execute` adds the listed commands only; you check that every reported command was listed. `write-and-execute` names the paths that may change; an edit outside them is a stop condition, and you check that the diff stays inside them. The host's own permission settings enforce what they can; a missing sandbox flag is no reason to leave the native route.
- **`stopCondition`**: where the job ends, and when an exception must come back early. An Operator that meets a judgment call or a missing permission stops, returns what it observed and the decision it needs, and waits.
- **`returnContract`**: the owning phase's or method's result shape when there is one, named by its owner. When none exists, an Operator, Researcher or Advisor returns the packet's own helper handback.

Each role adds its own payload, and the schema rejects a packet without it; the role skill's Commissioning section names that payload.

## Assemble the prompt

Open with the ready opening returned at management step 3, then the filled packet, then the full reads it directs, named explicitly. The opening teaches; the packet carries the assignment and the grant.

A creation receipt shows an address, not work started or accepted.

Model, effort, history and sandbox settings go in the host's tool arguments or session settings. Packet text, role names and board seats don't establish those settings or grant privileges.

An Operator example: outcome "From the attached CI output, report each failed command with its exit code, its first error and the source lines it points at." Sources: the CI log path. Limits: `inspect`. Stop condition: every failure accounted for, or a log that can't be read. Return: the Operator handback.

## Handbacks

The phase or method that owns a result keeps its fields and labels; the packet only names it. When nothing owns it, the helper returns its role's handback, defined in its own contract; only three roles have one. An Operator returns per-step observations with output references, exit codes where they apply, candidate material and exceptions. A Researcher returns its answer, the decisive sources, each claim marked as source, history or inference, and the gaps. An Advisor returns its challenge, the credible alternatives with their tradeoffs, and what is left for the Lead or the owner to decide.

Each kind is either completed, carrying its result and evidence, or blocked, carrying the missing input, permission or decision and whatever was observed before stopping. Neither means delivery is accepted.

Count as evidence only output whose coverage applies to this assignment, its scope, its target and the source the claim depends on. A live session proves only that it's alive. When any of those change, reassess earlier evidence: keep it only where you can show it still covers the claim, such as an executable check whose source is unchanged, and treat changed behavior, a changed target or an obligation the earlier run never covered as unverified until a fitting observation covers it. A newer head alone doesn't make evidence stale.

To continue a helper commissioned before role skills existed, resend the same commission with `requiredReads.charter` set to its `role-*` name; the old charter-path values fail validation.
