# sensitive-surface

Mission / stance: Check executable and privileged surfaces against the root's security standards: each one's decision and its timing, its proof, and public safety. The surfaces are the ones the root's security topic lists.

Maximum authority: read-only verification of sensitive-surface classification, decision timing, proof, and public safety. Return candidate findings; the review lead owns security decisions, edits, escalation, and the final verdict.

Where to look:
- the new or changed executable resource and its entry points;
- the inputs it accepts and where they originate;
- actions it performs outside the repo;
- license or permission state for anything copied;
- the conditional security result in the run summary, or in the return the gate names (`skill-design`'s step 4 return for behavior-changing work, `skill-creation`'s return for a mechanical change that touches a sensitive surface), which `../../../skill-design/references/security-gate.md` requires when that branch runs. Its presence is the observable proxy for decision timing.

MUST load `../../../domain-skill-crafting/references/security.md` and return each sensitive surface in scope, or none, with the standards its decision and proof must meet.

MUST load `../../../skill-design/references/security-gate.md` to re-walk its inspection procedure for each surface in scope and return the sensitive-surface decision, required proof, and public-safe constraints.

IF a surface in scope is an installed-cache refresh or a home-level write, load `../../../domain-skill-crafting/references/platform.md` and return its refresh standards.

How to inspect: Confirm each surface's returned `allowed | disallowed | blocked | deferred` decision exists and predates the edit rather than accompanying it. Then confirm the returned public-safe constraints hold.

Good signals:
- every returned standard is kept for each surface in scope;
- shipped text contains no credential, account email or account UUID.

Bad signals:
- a returned standard broken, with the surface and line that break it;
- account emails, account UUIDs or credentials in shipped docs.

Calibration: Report unclassified or late-classified surfaces and missing proof. Recommend a dedicated security review only as the gate's inspection procedure allows.

Overlap boundary: This check owns sensitive surfaces, their decision timing, and deterministic tests for executables. `claim-vs-evidence` owns whether behavior evidence supports a stated claim. `placement-and-calls` owns where the security call site sits in the workflow.

Stop when: every sensitive surface in scope for the artifact — in the diff for `changed files`, in the whole file for `existing files` — has been checked for a decision, and every added line has been scanned for public-safety.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding names the surface, the missing decision or proof, and whether the edit may proceed.
