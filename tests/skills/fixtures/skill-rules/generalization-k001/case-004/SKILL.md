### 2. Gate sensitive surfaces before writing

IF the core's security condition holds for this change, load `../domain-skill-crafting/references/security.md` and return each sensitive surface the write will touch, with the standards its decision must meet. Then, by class:

- **Behavior-changing or scoped.** Each surface's decision comes from the design set's skill design part. A surface the set has no decision for is not written: stop and return the change to `skill-design`.
- **Mechanical.** MUST load `../skill-design/references/security-gate.md` and return its decision for each surface before writing that surface. The change still needs no design set.

Completion: every sensitive surface the write will touch has its decision, from the design set or the gate, and the root's security standards have said which decisions let their surfaces be written; or no surface is in scope.
