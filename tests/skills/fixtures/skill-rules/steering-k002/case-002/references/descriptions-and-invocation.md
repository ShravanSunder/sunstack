## Standards

- A description's job is to help the agent decide whether to load the skill.
- A description starts with `Use when`, unless the platform requires another shape.<!-- K001 -->
- A description names the situation, symptom, user request, repository event or failure that should load the skill.
- A description uses the searchable words the user, codebase, docs or logs actually use.
- A description gives a short why only when it sharpens routing.
- A description names an adjacent skill's boundary only when that skill is easy to confuse with this one.
- A description stays compact, because it is in the context every turn.
- A description carries no workflow steps, tool lists, implementation detail or generic virtue.
- A description loads on its true prompt and stays quiet on the near miss; one that loads for everything is not a trigger.
- A description routes on a positive loading condition; a boundary alone is not a trigger.
- A description never carries a rule marker or any other token.
- A description matches the skill's invocation capabilities.
- A skill is model-invocable when the agent must find it unprompted, or when another skill must reach it.
- A principle, which other skills only cite, and a domain skill, which they load, stay hidden from model invocation.
- When user-invocable skills outgrow what a person can remember, a router skill indexes them.
