# Steering

## Standards

- A leading word is a concept the model already holds from pretraining, and it is preferred over a coined term.
- A leading word is strong enough to beat the model's default behavior; one that isn't changes nothing.
- Each completion criterion lets the agent tell done from not done, and demands the legwork the step needs.<!-- K001 -->
- Every sentence changes what the agent would do; a sentence whose deletion would change nothing is padding, however true.
- The deletion test is applied sentence by sentence, in context, never to whole sections at once.
- Guidance says what to do and what good looks like, not only what to avoid.<!-- K002 -->
- A prohibition appears only where a known failure needs a bright line.
- A wording change names the failure or success gap it addresses, without overstating its evidence.
- A skill is created or changed only where its wording teaches behavior a capable model would otherwise shortcut.

Wording repairs, each matched to the failure a run shows:

- A rule's strength matches how the agent fails: a rule it already follows needs no wording, and a rule it skips under pressure gets a bright line with one unambiguous condition.
- A bright-line rule names, beside it, the rationalization it blocks, in the agent's own words.
- A wrong output shape gets a positive shape or template.
- An omitted element gets a required slot beside the output.
- A conditional mistake gets an observable condition and the action it causes.
- Shallow legwork gets a stronger completion criterion.
- Wrong invocation gets a sharper description or a user-invocable route.
- A reference that isn't reached gets a stronger pointer or inline material.
