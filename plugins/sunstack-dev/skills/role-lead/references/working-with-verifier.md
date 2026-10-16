# Working with the Verifier

This is your side of commissioning a Verifier and reading its observations. A Verifier works only as an Implementer's pair, and `practices-manage-agents` owns its form, model, route and packet. Return whether the project's `verify-<app>` skill covers the journeys in scope, or the build or update you commissioned first; the adopted reference, the one kind of work and, for an observation, the pinned target you gave it; then each observation matched to that target, with its test check and its product proof.

## The verification system first

Before the first observation, take the journeys in scope from the plan's proof, open the project's `.agents/skills/verify-<app>/SKILL.md`, and find each journey there with its entry and the observation that proves it. A skill that exists but lacks one of them doesn't cover this slice. When the skill is missing or a journey isn't in it, commission the Verifier first to build or update it: the `verification-skill` kind of work, with `create` or `upkeep`, the journeys in scope, and the skill directory and its Claude link `.claude/skills/verify-<app>` in both its `skillWritePaths` and its `limits.writePaths`. The observations that depend on it go out after its result. A skill handed back as a draft that never ran on its real target leaves those observations without a route, so treat it as a gap. A slice whose proof drives no product journey, such as a pure rule proven by a focused test or a schema change, needs no project skill.

**Case (illustrative):** a slice adds PDF export to a desktop app, and the project's `verify-desktop` covers launch, import and search. The Lead sees that the skill exists and commissions an observation of export. The Verifier finds no export journey and has no grant to write one, spends the run working out how to drive the File menu, and reports a setup gap. **Clean case:** the Lead finds export missing from the journey index and commissions `upkeep` with that journey and both paths while the Implementer builds. The observation at the pinned commit then drives export through the updated skill.

## Commission

Give it the adopted reference from the governing sources, never the Implementer's account of what it built. Give it one kind of work: a feasibility challenge of the proposed proof, building or updating the project's verification skill, an observation of a declared target with its procedure, or the script paths it maintains outside that skill. For an observation, pin the target to a commit, build or installed version. Tell it to confirm that target before its first run and to stop and report if the target changed.

Every observation commission asks, in the packet's `outcome`, for the test check and the product's own proof. The test check says whether each test the Implementer offers as proof would fail if its behavior broke, and whether the offered tests together cover the slice's obligations. The product proof is the delivered product observed through its real entry point on the declared target, with the evidence kept. Without a product journey in scope, the Verifier launches no app: a pure rule's focused test that passes the test check is its proof, and schema-only or structural-only work is proven by structural evidence that names the behavior it leaves unevaluated.

## Held-out evaluation

When the Verifier runs a held-out evaluation of skill or agent behavior, fix the cases, the checks and the deciding rule before any run. Keep the cases and checks out of everything the writers read, the plan included. Name in the commission the proof guidance from the skill-authoring system that governs those runs. Ordinary product proof stays visible. The Implementer sees its tests and the Verifier's procedure, because it builds against them.

**Case:** the plan for the how and why practices kept its pass checks in a separate file. Its Proof section still listed every case's question: the stop-review hook, a retired skill, a small pure function, the removal of pressure scenarios. Both writers read the plan whole and said so, which exposed every target while the checks stayed hidden. **Clean case:** the Verifier proposed a substitute for each case on a target neither writer had seen, keeping the kind of target and the failure it had to catch. The exposed originals ran only as labeled secondary cases, and the changelog says so.

## While it observes

Leave the declared target alone while the Verifier observes it. Until the observation reports back, keep every write of your own out of that worktree, including files outside the target, or make them in another worktree. A subject that reads skill files from the worktree reads whatever is there when it opens them, and a status check the packet relies on sees every file you add. A correction waits for the report, lands as a new commit, and the Verifier reruns against that commit.

**Case:** a near miss in the same delivery. The Verifier's packet told it to stop if `git status` showed anything besides one untracked folder. Right after sending it, the Lead wrote changelog draft files into the same worktree, which would have made the Verifier halt or observe a moving target. The Lead caught it and moved the drafts to scratch before the run started. **Clean case:** the packet names the commit, the Verifier confirms HEAD and a clean status before the first subject, and the Lead writes nothing in that worktree until the report comes back. A correction then gets its own rerun packet at the new commit.

Narrow a check only with a reason you record, and keep both results. In the same delivery the Lead narrowed one check from a sibling method's contrast to the question's own contrast and recorded both results.

## Reading what comes back

The Verifier reports observations and you interpret them. Match each one to the pinned target: the commit, build and client it names. A run that broke before the subject did the work, such as output truncated by a limit or a permission stop, is a harness failure. Rerun it; it counts as neither a pass nor a fail.

Before accepting a slice with a product journey in scope, find in the report the product observed through its real entry point at the pinned target, and don't accept on test results alone ([a passing test proves only what it observes](../../principle-prove-it-works/SKILL.md)). An automated test that drives that entry on the declared target can be the observation; a suite status can't. Without one, the claim stays open as a named gap. Accept a slice with no product journey on its focused test or structural evidence, with the behavior it leaves unevaluated named. A weak test the check finds goes to the Implementer as a finding, because the Verifier doesn't write or fix product tests; read what the Implementer did about it before you accept.

When a second correction fails the same check, write down the one premise every failed correction shared, and change that premise or take the result to the owner as a named gap before another round. **Case:** a Researcher kept skipping per-claim basis labels. The second correction only changed emphasis and failed the same check. **Clean case:** the third correction changed the kind of fix, adding the positive output shape the skill-authoring guidance prescribes for a wrong output shape, and got one rerun. When that rerun still left the summary answer untagged, the Lead recorded a named gap for the owner and sent no fourth correction.

## When to stop

An observation run stops at its stop condition, or as soon as the pinned target changed; then re-pin and rerun. The relationship closes when every outcome in the adopted reference has its proof at the pinned target and its offered tests have their check, or a named gap; for a product journey, that proof is a product observation. Stop correcting when the next correction would assume the same premise as the ones that failed.
