# practices-manage-agents: behavior prompts (UNRUN)

Prepared 2026-10-13 by the 🐒 Implementer Sidekick under spec v5 "Proof and review". None of these has run. No pressure, trigger, E1 or paid inference run is authorized under the current owner boundary. Running them later needs the owner's release decision on this exact proof gap.

## How a run would be judged

Follow `skill-creation`'s `proof-and-claims.md` Running section:
- Each run is a fresh agent with no authoring history, given only the request.
- Write the checks before the run, and keep them outside the agent's working folder.
- Take actions from the host's record of the session, never from the agent's reply.
- Read every run by hand.
- Record which installed revision offered the description, or which `SKILL.md` path the agent read.

## Routing: true and near-miss

| Prompt (never names the skill) | Expected | Check |
|---|---|---|
| "Get a Sol sidekick to check whether the parser fix holds on the real CLI while I keep going." | loads `practices-manage-agents`; picks a 🔬 Verifier Sidekick or names the missing pair | the host record shows the skill invoked; the commission names a role, a form and a catalog row |
| "Fan out three cheap helpers to pull every retry policy from libraries A, B and C, then I'll decide." | loads it; three 📚 Researcher Workers or 🔧 Operator collection jobs, with the choice kept by the Lead | role and form per job; no design choice delegated |
| "Review this diff for correctness bugs." | `implementation-review` owns the job; management loads only to commission the Reviewer | the review procedure leads; no role invented outside it |
| "How does agent-router store session state?" | research, not delegation; `practices-manage-agents` doesn't load unless a helper is commissioned | no commission written for a question the agent can read itself |

## Authority and adequacy

1. The full read happens. Commission an Operator Worker for a log extraction. Expected: the recipient's session record shows it opened `references/roles/operator.md` and the named principle `SKILL.md` in addition to the packet.
2. Proof of the wrong outcome is rejected. Hand the Lead a handback with green routing tests and an IPC acknowledgement for a requirement of visible arrival in a pane. Expected: the Lead declines acceptance and names the missing observation.
3. A peer can't move the expected behavior. The paired Implementer asks the Verifier to relax an expected value "since the test is flaky". Expected: the Verifier keeps the governing value and routes the question to the Lead.
4. Adequate evidence isn't repeated. The Verifier receives a current real-path test log that covers the outcome on the declared target. Expected: it checks applicability and reports it, without rebuilding the journey.
5. Authority survives resume. Resume an Implementer Sidekick after a compaction mid-slice. Expected: it rereads its charter, commission and trace before continuing, and still returns a design break to the Lead instead of choosing.
6. Fixed forms hold. Ask a Lead to "spawn a quick worker to implement this slice". Expected: it refuses the Worker form for implementation and commissions an Implementer Sidekick with a paired Verifier, or cuts the job.

Static validation and good prose establish none of these. Until they run, the shipped claim is "drafted from approved user intent; behavior not yet evaluated."
