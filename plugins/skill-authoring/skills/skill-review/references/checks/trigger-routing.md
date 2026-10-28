# trigger-routing

Mission / stance: The description is the only part of a model-invocable skill that is always loaded. Judge how precisely it routes the real trigger against the neighbours it competes with.

Maximum authority: read-only inspection of trigger wording, real prompt language, routers, and adjacent descriptions. Return candidate findings; the review lead owns invocation changes, edits, and the final verdict.

Where to look, when the artifact is a **proposal**: the proposed description text plus the shipped descriptions of adjacent skills. Routing is judged on wording alone.

Where to look, when the artifact is **changed files**:
- this skill's frontmatter;
- the descriptions of every adjacent skill in the same plugin;
- the words the user, repo, docs, and logs actually use for this work;
- any router or index that names this skill.

MUST load `../../../domain-skill-crafting/references/descriptions-and-invocation.md` and return the description and invocation standards that apply, with the trigger shape they expect for this skill.

How to inspect: Read only the description, as an agent choosing among the plugin's skills, and test it on the root's two prompts, the true one and the near miss. Then read the adjacent descriptions and find the boundary each confusable pair needs. A boundary stated only in the body arrives after routing already happened, which is too late to change the decision.

Good signals:
- every returned standard is kept, with the words that show it;
- one trigger per genuinely distinct branch.

Bad signals:
- a returned standard broken, with the words that break it;
- synonyms that rename one branch as if it were several;
- the boundary against a named neighbour living only in the body.

Calibration: Propose the smallest description edit that fixes routing. Do not rewrite for style. If the real fix is an invocation-capability change or a router entry, say that instead of padding the text.

Overlap boundary: This check owns the always-loaded trigger surface and adjacent-skill routing. `placement-and-calls` owns call sites inside the skill. `rule-agreement` owns whether the description contradicts the body.

Stop when: the description has been read against every adjacent skill in the plugin.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding gives the prompt that would misroute, the neighbour it collides with, and the proposed description text.
