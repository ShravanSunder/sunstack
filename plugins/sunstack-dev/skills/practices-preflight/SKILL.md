---
name: practices-preflight
description: "Use when about to start an orchestration, implement a plan, or commission another agent, to check that everything the work needs to succeed is in place: inputs, access, credentials, services, tools, the agents the plan assigns, and disk. Not for checking a finished result or for choosing who takes a job."
---

# Practices: Preflight

A gap you know about and call "later" comes back as a block in the middle of the work, after the agents and builds are spent. So before dependent work starts, list what every required gate needs, proof gates included; check each need by running something; close each gap; and pass the checked list on so the next agent doesn't rediscover it.

## Main path

1. List the needs. From the plan, spec or commission at hand, name every gate the work must pass, such as slice acceptance, milestone proof, hosted tests, review and merge. For each gate, list its inputs, access, credentials by name, services, tools, the agents the plan assigns with model and effort, and the disk its builds take. Completion: every required gate has its needs listed, or `none` against it.

2. Check each need for real. Before counting a need as met, have a check you ran that says so; "the key is set" is a claim, a plan line or your memory of an earlier session only says where to look, and a read that failed from a sandbox or without a grant is an access gap, not proof the thing is missing ([read ground truth first](../principle-read-ground-truth-first/SKILL.md)).

   | Need | Check |
   |---|---|
   | input | open it at the revision the work uses |
   | access | a read, or a dry run of the write |
   | credential | read it into memory and test its shape without printing it |
   | service | a call or health check that exercises what the gate uses, with a timeout |
   | tool | run it and read its version |
   | agent | its route on the plan's model and effort, checked without sending the job |
   | disk | `df -h` on the volume, against the work's build and test output |

   ```sh
   value="$(op read "$item_reference")" || echo "op read failed: access gap"
   [ -n "$value" ] && [[ "$value" == "$expected_prefix"* ]] && echo "resolves; shape ok"
   unset value
   ```

   When you check a service, exercise the operation the gate depends on under a deadline and count a timeout or an unclear answer as a gap, because a service that answers a ping can still fail the call your gate makes ([design for failure](../principle-design-for-failure/SKILL.md)). IF the plan or commission assigns agents, load `practices-manage-agents` and return, for each, its checked route or the route gap. For a Sidekick, the route is its address, with the model and effort read back from a session found or created without starting work. A native Worker has no address until its spawn carries the job, so its route is the host's spawn encoding for its model and effort, with that model selectable by the host's spawn tool. The lookup stops before the commission and never sends the job.

   Completion: each need has the check you ran and its result: met, or a gap.

3. Close each gap before the work that depends on it. Fix what is yours to fix, such as a missing tool or a stopped local service. Ask the owner once for credentials and access, naming the need, the gate and what you checked. For a dependency that isn't built yet, plan a stand-in at a named boundary and record it in the trace. A stand-in never satisfies a required gate, so work that depends on that gate waits for the real thing.

   A credential that a required gate needs is a start prerequisite: raise it now, and hold the workstream whose gate needs it until it resolves. Don't accept "This only matters at the proof step, so the work can start without it."

   Completion: each gap is resolved, asked, or covered by a stand-in with the gates that wait on it.

4. Clear your merged worktrees and make room. IF the trace names a worktree of this work whose PR GitHub shows as merged, load `practices-cleanup` with its path and PR number and return it removed or held with its reason, whatever the free disk. IF free disk is below what the work needs, load `practices-cleanup` and return the space reclaimed and what was held.

## Return

`ready`, or the gap list, with the checked list either way: each need, its check, its result, and each gap's disposition and waiting gates. Pass that list in the commission. A credential appears by name, with how the next agent loads it (an environment variable, `op run` or a repository wrapper); its value and item reference stay out.

## Worked example: the key that was "later"

On 2026-10-15, a Lead about to start the sunstack-tools rule engine found 1Password failing and the API key's item unknown, although the spec had required a real hosted call since 2026-10-12. It decided: "This only matters at the hosted-proof step, so the work can start without it." The plan it wrote next put hosted tests in the milestone 1 gate. The same message said it couldn't create the four Sol 6.1 sessions the work needed, and that is what held the start.

Preflight lists what the hosted-proof gate needs, so the key goes on the list by name beside the four sessions. The credential check fails; the Lead checks its own 1Password access, then asks the owner once for the item before anything starts. The agent check finds no route to a Sol 6.1 address from this host, so the same message asks for a creation route. Preflight returns two gaps, and nothing is commissioned. When the owner supplied the reference, a read and a shape check that never printed the value closed the first gap; the second held the commissions.

## Completion

Not ready while a required gate has an unlisted need, a need counts as met from memory or another agent's word, a credential a required gate needs is deferred to later, a timed-out check counts as met, or a stand-in counts toward a gate.
