---
name: principle-justify-the-complexity
description: "Use when adding or keeping a layer, abstraction, option, mechanism, or second path, or when sequencing a refactor or rewrite. Double-check that each piece of complexity is justified by an outcome that needs it now; remove the rest and cut over completely."
disable-model-invocation: true
---

# Justify the Complexity

Read this principle in full before applying it; your own full read earlier this session counts.

Every abstraction justifies the complexity it introduces. Each layer, option, mechanism, and second path costs reading, testing, and maintenance for as long as it exists, and a speculative one usually guesses the future wrong. Complexity is right when an outcome needs it now; "we might need it" is not an outcome. The discipline is a double-check before you add something and before you keep it: what breaks without it, and does something simpler, or something that already exists, do the job? Subtract first. The simplest base that works is the easiest one to change when the real need arrives.

## How to think it through

**Map every piece to the outcome that needs it.** For each component, layer, option, dependency, and mechanism in the design or the diff, name the requirement or obligation that asks for it. If there is none, the honest label is "absent": cut it, or raise it with the owner as a question. A piece that is well built but unasked for is still unasked for.

**Look for the existing path before building a new one.** The product's existing integration pattern, the common code path, an established library or parser, what the platform already provides. A one-off path built for one case drifts from the supported one and doubles what has to be maintained.

**Subtract before you add.** Remove dead code, redundant paths, and decisions repeated in several places, then build on the simpler base. Put a repeated decision in one place and pass its result along.

**Know what an abstraction has to give.** It earns its place when it removes something (branches, duplicated rules, states that shouldn't exist, lifecycle risk) or provides a real seam (an external dependency to replace in a test, a process or trust boundary). An abstraction that adds indirection and gives none of those is the one to cut.

**Prefer the boring shape.** Three similar statements beat a premature abstraction. A plain function beats a framework, and a constructor argument beats a home-grown dependency-injection container. Keep the call hierarchy flat: if answering "what does this do?" means tracing more than about three layers, flatten it. Before threading a new signal through every type and layer, look for a more direct path.

**Cut over completely.** When you replace an interface, a data format, or a behavioral contract, migrate every caller and delete the old path in the same change: no compatibility shims, no deprecation layers, no feature flags for a gradual migration. Two paths double the bugs, and every later change becomes a choice between them. The way a cutover fails is a consumer nobody counted ("the old matcher is still called by highlighting and history ranking"), so inventory every caller and implementation first, and prove the result compiles and runs, not just that it lints. When a consumer is outside what you can change in one step (stored data, another system, a deployed client), the cutover plan is the owner's decision: don't add a shim or break the consumer on your own.

**Subtraction has its own failure.** Before deleting something, find out what still uses it. A test, helper, or doc that looks like it belongs to the removed feature may also serve something that stays: "This product's tests also exercise the shared backup and gateway code, so remove its own cases and keep the proof that covers what stays."

**The hard call is the layer that looks like overhead but hides something real:** an external protocol, a lifecycle, a policy, a trust boundary. Deleting it moves that complexity into every caller. Ask what a layer hides before you cut it. And sequence the work: prove the core behavior first, then do the discretionary restructuring.

**Explain the choice in plain terms:** what changes, why the smaller design is enough, what it costs, and what evidence would justify something bigger.

## Example: the gateway in its own VM

A plan runs a gateway inside its own virtual machine "for isolation". Asking what outcome the VM provides that a container doesn't, at the current trust boundary, finds none: the gateway runs no untrusted code. The container ships, and the VM is written down as the move to make if the trust boundary changes. That leaves one runtime, one deployment path, and a stated condition for revisiting.

IF the case in front of you doesn't match the gateway example, or you are reviewing someone else's design or diff for over-building, load `references/example_scenarios.md` (scenarios, simplest first: the lease nobody asked for; the flag kept "in case"; the home-grown container; the cutover that missed a consumer; the removal that took shared tests with it; the engine rewrite that wasn't needed) and return the closest scenario and how its move applies to your case.

## When it doesn't apply

When a layer owns a policy or a lifecycle, hides substantial behavior, or provides a real seam, deleting it only moves its complexity into every caller. Simplicity never means dropping error handling, validation the boundary needs, or tests.

## Signs you skipped it

- A mechanism no current requirement needs, added or kept "in case", like steering and spooling machinery a protocol no longer uses.
- An old path still running next to the new one, a compatibility shim, or a flag for a gradual migration.
- An option nobody sets, or an abstraction with one implementation that removes nothing and serves no seam.
- A rewrite proposed before anyone measured where the cost is, like a storage-engine rewrite for CPU a driver's lock wait was burning.
- A home-grown container or service locator where passing dependencies as arguments would do.
- The same decision repeated across several files.
- A wrapper with one caller that forwards data unchanged and adds no rule, lifecycle, or check, yet has to be traced to understand the call.
- A cleanup that also deletes tests or helpers a remaining feature still needs.

When the question is where a boundary belongs, use `principle-separate-the-concerns`. When several options each meet the need and the question is which cost to accept, use `principle-name-the-tradeoffs`. To check the requirements themselves rather than the mechanisms, use `principle-hold-the-scope`.
