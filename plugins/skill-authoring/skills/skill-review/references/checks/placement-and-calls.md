# placement-and-calls

Mission / stance: Decide whether each obligation lives where the agent will meet it, and whether every call site says enough to act on. Material in the wrong home is silently skipped; a call site missing its return shape sends the agent away with nothing to bring back.

Maximum authority: read-only inspection of placement, call sites, and reference reachability. Return candidate findings; the review lead owns reduction and the final review result. Edits route to the author.

Where to look:
- every call site and its form (load, dispatch, or citation) in `SKILL.md` and in any reference under review; references hold call sites too, and are the callee half of every caller/callee contract;
- for each step that holds a citation, the skills this one names or loads at that step, for a citation of the same principle;
- the all-run spine against what sits in references;
- every `references/*.md` path mentioned anywhere in the skill;
- the Completion Blockers list against the steps it mirrors.

MUST load `../../../domain-skill-crafting/references/calls-and-placement.md` and return its placement, call, citation and shared-shape standards that apply, with the correct home and complete call shape for each finding.

How to inspect: Walk every call site and fill this row. A blank cell is the finding:

```text
load site:      load mode | destination | requested work | needed result
dispatched procedure: prescribed steps | exact authority | observed result
citation:       moment (observable) | action | relative link to a principle
```

Judge each filled row by the returned call and citation standards. Open every cited principle. Its first body line after the title is the read rule, "Read this principle in full before applying it; your own full read earlier this session counts." A missing rule is a finding, fixed in the principle's own file. Confirm the principle's judgment bears on the named action. When the same principle is cited twice at one decision, either twice in this skill or once here and once in a skill this one names or loads at that step, the finding is against this skill's extra copy. Then walk the reverse direction: for each reference, name the caller that opens it, and check that caller's return shape. Finally, check the all-run spine against what sits in references by the returned placement standards.

Good signals:
- every returned standard is kept at each call site and home, with the line that shows it;
- every path mentioned resolves to a file that exists.

Bad signals:
- a returned standard broken, at the site that breaks it;
- "see X for details", "load X when useful", or "should load" in place of a call form;
- several `IF` predicates routing to the same destination, which means topics rather than branches;
- a call to a path that does not exist.

Calibration: Report placement and call-completeness defects with the exact site. Do not judge whether the rule itself is well worded; that is `steering-strength`. Do not count lines; length alone is not a finding here.

Overlap boundary: This check owns *where material lives and whether calls are complete*, including progressive-disclosure judgment. `rule-agreement` owns whether duplicate copies agree. It also owns unreachability, so report a reference nothing calls, or a form declared and never used, under `rule-agreement`. `no-op-pruning` owns whether a line earns its place at all. `depth-coverage` owns whether depth teaches; a reference can sit in the right home with a complete caller and still make nothing about its stage predictable. If a skill cites the same principle twice for one decision, report it here as a placement problem. If a citation doesn't change what the agent does, report it under `no-op-pruning`.

Stop when: every call site has been walked, every reference traced back to a caller, every cited principle opened, and every skill named or loaded at a citing step checked for the same citation.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding names the call site or reference path, the missing slot or wrong home, and the smallest edit that fixes it.
