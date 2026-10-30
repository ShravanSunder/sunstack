### 4. Design the skill

IF the core's security condition holds for this change, load `references/security-gate.md` before outlining any sensitive surface, and return its decision for each sensitive surface in scope, or none, for the skill design part.

Then design each surface with the topic that governs it:

- **The trigger.** MUST load `../domain-skill-crafting/references/descriptions-and-invocation.md` and return the invocation decision and the description written for it. IF client-specific invocation controls are requested, load `../domain-skill-crafting/references/platform.md` and return the platform encoding.
- **The main path.** MUST load `../domain-skill-crafting/references/main-path.md` and return the standards that apply to the lens, the route, and each branch. IF the classification is `create` or the main path's shape is contested, load `../domain-skill-crafting/references/worked-examples.md` and return the shape choice for this skill. MUST load `../domain-skill-crafting/references/steering.md` and return each wording choice with the observed failure, representative hypothesis, or user-approved success gap it answers, and the repair that topic matches to it.
- **The calls and the depth.** MUST load `../domain-skill-crafting/references/calls-and-placement.md` and return each call site in its form, the placement decision for the skill's depth, the caller and callee contract for each reference with the step-2 record or named source it is taught from, and, when several consumers need one stable output shape or a tool validates the structure, that shape's owner and its consumers.

Name the runs in sequence, each targeting one named skill, with each run's surface allocation: which of the trigger, main path, depth and proof carries each part of the change.

Completion: each part of the design names the root topic that governs it, every standard those topics returned is kept with the line of the design that shows it, and, when the security gate ran, its return covers every sensitive surface in scope.
