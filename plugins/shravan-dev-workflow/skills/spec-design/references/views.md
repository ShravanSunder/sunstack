# Requirements and Specification Views

This reference owns the pictures that help the owner confirm Requirements and a Specification, and when each one is worth drawing.

Expected inputs: the card, the rules, and the entity table. Return: each selected view, its reader question, and its check result.

## When a View Earns Its Place

Draw a view only when it makes a relationship easier for the owner to confirm or correct. The card and the rules stay the normative home; a view never holds a requirement that is not also written down.

| View | Draw it when | It shows |
|---|---|---|
| screen picture | a requirement changes a screen, page, or other UI someone sees | that moment, in the Requirements document, grounded in the current app, or the exact words `no current UI` |
| journey map | an affected group's job has an order or pain worth confirming | that group's steps in their words, the pain and its evidence (or "unknown"), and the U lines it re-draws; one map per group, never chained |
| context view | two or more outside consumers or surfaces exist | the consumers, the surfaces they rely on, nearby things that are out of scope, and the system as one closed box |
| entity map | the Specification defines entities | each `E` with its identity rule, relationships with cardinality, and states; no package, schema, type, or store |
| coverage table | several rules interact, or the U → R trace is not obvious | U, E, R, and the gaps |

A people-and-pain picture does not cover a changed screen; each changed screen gets its own picture. The first internal component, owner, store, or enforcement point inside the system belongs to `program-design`.

## Rendering

MUST load `../../../shared-references/diagram-rendering-and-fallbacks.md` with the selected views and return each one's medium, fallback, semantic check, and visual check.

- A screen picture uses Image Gen grounded in the current app, or records `no current UI`.
- Context, entity, and flow views render as Mermaid when the destination renders Mermaid. A text fence is not a pass for those views when Mermaid can render.
- An exact format the owner asked for takes precedence, except a text fence for a picture-type view when Mermaid can render.
- A cache path, a prompt, a chat-only image, or a broken embed is not a finished view.

## Complete When

Each selected view answers its reader question, shows every field in its row above, passes the rendering check, and has a written home for everything it shows.
