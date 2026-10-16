# placement-and-calls

Mission / stance: Decide whether each obligation lives where the agent will meet it, and whether every call site says enough to act on. Material in the wrong home is silently skipped; a call site missing its return shape sends the agent away with nothing to bring back.

Maximum authority: read-only inspection of placement, call sites, and reference reachability. Return candidate findings; the review lead owns reduction and the final review result. Edits route to the author.

Where to look:
- every call site and its form (load, dispatch, or citation) in `SKILL.md` and in any reference under review; references hold call sites too, and are the callee half of every caller/callee contract;
- for each step that holds a citation, the skills this one names or loads at that step, for a citation of the same principle;
- the all-run spine against what sits in references;
- every `references/*.md` path mentioned anywhere in the skill;
- the Completion Blockers list against the steps it mirrors.

MUST load `../../../skill-creation/references/reference-design.md` to apply the canonical placement test and caller/callee contract and return the correct home and complete call shape for each finding.

How to inspect: Walk every call site and fill this row. A blank cell is the finding:

```text
load site:      load mode | destination | requested work | needed result
dispatched procedure: prescribed steps | exact authority | observed result
citation:       moment (observable) | action | relative link to a principle
```

A dispatch site is complete only for a prescribed procedure with steps, authority, and observed result. Review checks and research source classes are loaded by the current agent. A citation is complete when its moment is observable, its action names what to produce or check in words other than the link text, and its link, followed from the file that holds it, opens a principle in the same plugin: a skill hidden from model invocation that teaches one engineering judgment, opens with its own read rule, and is cited by other skills at the decision it informs. Open every cited principle. Its first body line after the title is the read rule, "Read this principle in full before applying it; your own full read earlier this session counts.", as quoted in the Call Grammar of `../../../skill-creation/SKILL.md`. A missing rule is a finding, fixed in the principle's own file. Confirm the principle's judgment bears on the named action; a principle that does not is a decorative link and a finding. When the same principle is cited twice at one decision, either twice in this skill or once here and once in a skill this one names or loads at that step, the finding is against this skill's extra copy. Then walk the reverse direction: for each reference, name the caller that opens it, and check that caller's return shape. A caller with no return shape is a dead end. Finally, confirm that no all-run obligation, order, decision, required return, invariant, or completion boundary is visible only inside a reference.

Good signals:
- every call site uses exactly one form of the grammar and fills its slots;
- every reference has at least one caller;
- every path mentioned resolves to a file that exists;
- branch depth sits behind an observable predicate rather than a topic;
- the body still states the obligation when detail moved behind `MUST load`.

Bad signals:
- "see X for details", "load X when useful", or "should load" in place of a form of the grammar;
- a principle reached through `MUST load` or `IF ..., load`, or a citation standing in for a reference that holds this skill's own procedure;
- a citation that names its principle but no action, such as "apply X" or "(see X)", or an action that restates its link text;
- a required gate whose only statement lives in a reference;
- several `IF` predicates routing to the same destination, which means topics rather than branches;
- a call to a path that does not exist;
- branch-only depth inlined in the body with no stated reason.

Calibration: Report placement and call-completeness defects with the exact site. Do not judge whether the rule itself is well worded; that is `steering-strength`. Do not count lines; length alone is not a finding here.

Overlap boundary: This check owns *where material lives and whether calls are complete*, including progressive-disclosure judgment. `rule-agreement` owns whether duplicate copies agree. It also owns unreachability, so report a reference nothing calls, or a form declared and never used, under `rule-agreement`. `no-op-pruning` owns whether a line earns its place at all. `depth-coverage` owns whether depth teaches; a reference can sit in the right home with a complete caller and still make nothing about its stage predictable. If a skill cites the same principle twice for one decision, report it here as a placement problem. If a citation doesn't change what the agent does, report it under `no-op-pruning`.

Stop when: every call site has been walked, every reference traced back to a caller, every cited principle opened, and every skill named or loaded at a citing step checked for the same citation.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding names the call site or reference path, the missing slot or wrong home, and the smallest edit that fixes it.
