---
name: practices-verification-maintenance
description: "Use when creating or maintaining a project's verification skill, including its owned journeys and drivers. Not for one ordinary verification run, a driver-only task without a project-skill target, product repairs or delivery acceptance."
---

# Practices: Verification Maintenance

A project's verification skill is a recipe another agent will run cold, in the middle of a task, against an app it has never seen. It names the app, starts it, tells a usable instance from one that only answers on a port, drives each journey the way a user would, observes the result that proves it, and cleans up without losing the evidence. It holds only journeys whose outcome will be checked again. Each one runs from a self-describing script in the project's own scripts location; the skill keeps no copy and says which script proves which journey, and when and why to run it. This practice creates that skill when the project has none and keeps it true as the app changes. Until the recipe has driven its real target, it is a draft with a named gap.

Each journey's expected result comes from an adopted source, such as a contract, a spec, project docs or an owner decision. What the app does today can show that the recipe went stale, or that the app regressed. Only the adopted source can say which one happened.

## Boundaries

- Run this in your current request or assignment. Loading it confers no role and changes no one's responsibility or grant. A request that only asks for an observation authorizes no writes here.
- Write only verification apparatus: the project skill, its Claude link and its journeys' scripts, inside the paths your request or assignment covers. A request to create or maintain the project's verification skill covers its canonical directory, its Claude link and the scripts of its journeys in scope. A grant to edit product code or tests covers none of them. When your assignment carries more than one write list, a path must fit every one of them. Before any write, run the write check in `references/project-skill-layout.md` over every path you will write, and stop at any `unsafe` line. Product code, product tests and the expected outcome stay with their owners.
- When an active workstream assigns this project's verification apparatus to someone else, use it and send the changes you would make to that owner, unless the owner reassigns it.
- Reading a project skill grants none of its commands or writes. Installs, privileged actions, network effects, home or cache writes and fault injection each need their own grant. Credential values never enter the skill, a log or your report.
- Do the work yourself. IF you hand part of it to another agent, load `practices-manage-agents` and return the bounded commission. One agent does all the driving of an app instance.
- A later feature change is a reason to ask for upkeep. It doesn't authorize a watcher, a scheduled edit or a PR loop.

## Workflow

1. **Identify the owner, the target and the permitted work.** From the request, the assignment and the project's instructions, establish the project checkout, the app, the adopted sources of correctness, whether creation or upkeep is asked for, the paths you may write, the journeys in scope and where evidence goes. When one of these would change the work and the sources can't settle it, return the exact question to your caller. MUST load `references/project-skill-layout.md` and return the canonical path for the named app, the state of its Claude path, any other recipe for the same app, and the project's scripts location. Then decide from what you found:
   - creation is asked for and the canonical skill is absent: create;
   - upkeep is asked for and the canonical skill exists: maintain;
   - upkeep is asked for and no skill exists: return that gap and stop;
   - creation is asked for and a skill already exists: report it and stop, leaving it as it is.

   When the Claude path holds a real directory, a link to anything other than the canonical skill or a link that leaves the project, or when another recipe covers the same app, report the exact conflict before writing anything and leave it in place. When you choose where to write, keep one authored recipe per app under `.agents/skills/`, with the Claude path only a link to it ([one owner per truth](../principle-one-owner-per-truth/SKILL.md)).
   Completion: the outcome is create, maintain, or a returned gap or conflict with its paths; the canonical path, the scripts location, the link state, the writable paths and the journeys in scope are named.

2. **Reconstruct how the scoped behavior works.** MUST load `practices-how` and return, for the app's launch and each journey in scope, the source-backed path from entry to effect and back, its owners and state, and its gaps. Read the project's real launch, initialization, seed and auth, harness, test and cleanup instructions, and look for an existing harness before planning a new one. Ask only for meaning, permission or target selection that the sources can't settle. A product build that fails or a prerequisite you can't reach is a gap to report, and repairing product code stays outside this work.
   Completion: each journey in scope has its entry, the outcome that proves it with that outcome's adopted source, and the existing command or harness that drives it, each anchored; or the gap is named with where you looked.

3. **Write or correct the project teaching.** IF the outcome is create, load `references/project-capability-generation.md` and return the drafted skill files, with each command, handle and expected result anchored to its source, and the representative journey for step 4. IF the outcome is maintain, load `references/project-capability-maintenance.md` and return the drift in each journey in scope with its anchors, the corrections made, and the journeys the live pass must drive. Write the real app identity, its readiness signal, a read-only health check, the driving route, the observations that prove each journey and owned cleanup. Use commands, selectors and paths you read at their source or ran. Keep undecided behavior and unverified surfaces visible in the skill as open items. Create or confirm the Claude link, and put each journey's script in the project's scripts location, as the layout reference describes. When you write a journey's expected result, take it from the adopted source and never from what the app shows today, so a drive fails when the behavior is wrong ([write tests that can fail](../principle-write-tests-that-can-fail/SKILL.md)). Before you finish a file, read it as an agent who has never seen this app: the app identity, the working entry, the journey and its observation come first, and exceptional setup moves into the skill's own references without hiding a prerequisite or an unverified surface ([write for the reader](../principle-write-for-the-reader/SKILL.md)).
   Completion: every command, handle and path in the changed files was read at its source or run; each journey names its adopted source; each unverified surface is listed in the skill or in your return.

4. **Exercise the capability.** MUST load `practices-verification` and return the scoped observations or applicable reused evidence from the project skill you just wrote or corrected, with its unobserved outcomes and gaps. For creation, run the skill's own launch, readiness, health check, drive, evidence and cleanup for at least one representative journey before you call it operable. That run shows the route works for that journey and shows nothing about the journeys you didn't drive. For upkeep, account for every journey in the assigned coverage. Drive it fresh where it changed, where doubt remains or where the request requires a run, and reuse an observation only where it still applies. A clean source pass leaves a journey's live coverage open.
   Completion: each journey in scope has an observation, a reused observation with why it still applies, or a named gap with the prerequisite and the route you tried. A recipe that never ran on its real target is reported as a draft with that gap.

5. **Triage, then correct only the apparatus.** Give each failure the one cause its evidence supports. An instruction is stale when the app and the adopted source agree and the skill doesn't; correct it in the skill. A driver that can't reach working behavior gets repaired within its named paths and driven again. When the app breaks an adopted outcome, keep the journey as written and report the product regression with its evidence; a journey rewritten to match today's behavior turns the regression into a passing check for every later run. An expected outcome that is disputed or unsettled goes back to whoever owns it. A failure whose cause you can't show goes back to your caller with the observation and the missing evidence that would decide it. Run each substantive helper alone and see it work before you compose it into the route, and drive every correction again before you keep it.
   Completion: each failure has one cause with its evidence, or is returned as unknown; each correction kept was driven again after the change.

6. **Clean up and keep the evidence.** Clean what this run started, within your cleanup grant. Stop processes by the id or session you recorded, never by name, and leave other sessions' state alone. After cleanup, open the evidence at its named location and confirm it survived. Reread every file you changed. When nothing useful changed, make no commit or PR. Publishing a change belongs to your caller's delivery procedure, and merging it belongs to the user.
   Completion: the evidence is confirmed at its location after cleanup, nothing this run started is still running, and every changed file was reread.

## Return

Return to your caller:

- the outcome: for creation, an operable skill with the journey that proved it, or a draft with its gap; for upkeep, `clean` (coverage done and nothing to change), `changed` (corrections made and driven again) or `blocked` (with what stopped coverage or a correction);
- the files created or changed, and the Claude link's state;
- coverage for each journey in scope: observed, reused with why it applies, unreachable with the prerequisite and route tried, or not covered;
- product regressions, disputed expectations and unknown failures, each with its evidence;
- conflicts left in place, and the evidence paths.

## Completion

Not done while a skill is called operable without a run on its real target, a write landed outside the permitted paths or over a conflicting path, a journey was changed to match behavior that breaks its adopted source, a journey in scope has neither an observation nor a named gap, or the evidence went unchecked after cleanup.
