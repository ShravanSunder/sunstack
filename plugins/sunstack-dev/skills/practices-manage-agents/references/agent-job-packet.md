# Agent job packet

This reference owns how to write a commission. Inputs: the chosen role, form, catalog row, route, and the role's charter with its ready opening. Return the opening, the filled typed packet and the full reads it directs. Complete when every required field holds something a fresh agent can use without your history, or the missing input is reported instead of sent.

The packet's shape lives once, in `../schemas/agent-job-packet.ts`: a Zod v4 schema with a description on every field, and the `AgentJobPacket` type inferred from it. This file teaches what to put in the fields. The schema checks shape only: a valid packet can still name the wrong reads, claim a grant nobody gave, or ask for the wrong outcome.

## Fill each field

- **`outcome`**: what done looks like, in one or two sentences the agent can check itself against. It names a result, never an acceptance.
- **`sources`**: exact paths, or inlined text, that a fresh agent can use without your history, each with why it matters. A pointer the agent can't reach is no source; inline what it needs instead.
- **`requiredReads`**: the role's charter, always, plus the practices and principles to read in full. Start from the charter's defaults and add what this job touches: the testing principle when tests are in scope, the types principle when a boundary's data changes. Don't list every practice or all the principles for a simple collection job, and don't leave an essential read out because you already loaded it; the recipient hasn't. An empty practice list is fine for a prescribed operation.
- **`limits`**: one of three access grants. `inspect` reads only; scratch goes to `tmp/` or the system temp folder, and you check afterwards that the worktree is unchanged. `inspect-and-execute` adds the listed commands only; you check that every reported command was listed. `write-and-execute` names the paths that may change; an edit outside them is a stop condition, and you check that the diff stays inside them. The host's own permission settings enforce what they can; a missing sandbox flag is no reason to leave the native route.
- **`stopCondition`**: where the job ends, and when an exception must come back early. An Operator that meets a judgment call or a missing permission stops, returns what it observed and the decision it needs, and waits.
- **`returnContract`**: the owning phase's or method's result shape when there is one, named by its owner. When none exists, an Operator, Researcher or Advisor returns the packet's own helper handback.

Each role adds its own payload, and the schema rejects a packet without it. An Operator carries its procedure, or its collection criteria, with expected observations. A Researcher carries its question and the approach it may take. An Implementer carries its plan slice, a write grant and its paired Verifier's address. A Verifier carries the adopted reference, its paired Implementer's address and one kind of work: a feasibility challenge before the build, an observation of a declared target, or upkeep of the verification scripts at named paths. A Reviewer carries its target, its procedure and the requirement of no author history. An Advisor carries its question and the picture it challenges. The Lead's own packet carries the owner's intent and the governing context, and only for the Lead's entry or continuation.

## Assemble the prompt

Open with the ready opening from the role's charter, then the filled packet, then the full reads it directs, named explicitly and resolved through the active install. The opening teaches; the packet carries the assignment and the grant.

For an Implementer and Verifier pair, create or reuse both sessions first without sending work, so you have both real addresses. Fill each packet with the other's address, then dispatch both. A creation receipt shows an address, not work started or accepted.

Model, effort, history and sandbox settings go in the host's tool arguments or session settings. Packet text, role names and board seats don't establish those settings or grant privileges.

An Operator example: outcome "From the attached CI output, report each failed command with its exit code, its first error and the source lines it points at." Sources: the CI log path. Limits: `inspect`. Stop condition: every failure accounted for, or a log that can't be read. Return: the Operator handback.

## Handbacks

The phase or method that owns a result keeps its fields and labels; the packet only names it. When nothing owns it, the helper handback has three kinds. An Operator returns per-step observations with output references, exit codes where they apply, candidate material and exceptions. A Researcher returns its answer, the decisive sources, each claim marked as source, history or inference, and the gaps. An Advisor returns its challenge, the credible alternatives with their tradeoffs, and what is left for the Lead or the owner to decide.

Each kind is either completed, carrying its result and evidence, or blocked, carrying the missing input, permission or decision and whatever was observed before stopping. Neither means delivery is accepted.

Count as evidence only output that matches this assignment and the current source. A live session proves only that it's alive, and output produced before the assignment, scope or source head changed is stale.
