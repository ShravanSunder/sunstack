# Program Design Views

This reference owns the pictures that help the owner confirm a structure, when each is worth drawing, and what each must show.

Expected inputs: the binding table, the parts, interfaces, state, flows, failure decisions, and the trace table. Return: each selected view, its reader question, and its check result.

## Which Views

Two views are always drawn for the owner's confirmation:

| View | It shows |
|---|---|
| component view | each part with its responsibility, owner, consumers, and reason to change; dependency direction |
| one entry-to-effect path | the most representative path today and as proposed (or proposed only, marked new): entrypoint, callers and callees, owning component, sync, async, and event edges, state reads and writes or external effects, result and error returning to the consumer, evidence anchors, and added, removed, and changed edges |

Draw another view only when it makes a relationship easier for the owner to confirm or correct:

| View | Draw it when | It shows |
|---|---|---|
| entity → home map | the design adds or changes a contract | each `E`, its owning component, its package or module home marked `new`, `modified`, or `existing`, and its schema home |
| call path | another material path is added, removed, or changed, or control crosses owners or async boundaries | the same fields as the entry-to-effect path above, plus any unchanged edge whose preservation is critical or contested |
| state machine or table | timing or order changes correctness | the owner, states, transitions, guards, and illegal paths |
| data or event flow | data crosses a storage, process, or service boundary | authority, transformations, persistence and privacy, and the shape on each boundary-crossing edge (name, discriminant, fields with nullability, schema home) |
| failure and recovery flow | partial failure, retry, or compensation exists | detection, containment, retry, cleanup, and the recovery owner |
| trust boundary | untrusted actors, input, secrets, or processes cross an enforcement point | assets, entry points, the policy owner, enforcement, and containment |
| test path | the test harness follows different owners or boundaries than production | the seam, what is real and what is replaced, and the observation point |

Keep separate reader questions in separate views when combining them would hide an owner, a call edge, a state transition, a failure path, or a seam. A request for "one diagram" does not override that: draw the separate views.

Lead with the picture, then the table, then the code shape. A path is a current-source anchor, never a task list or a file to edit.

## Rendering

MUST load `../../../shared-references/diagram-rendering-and-fallbacks.md` with the selected views and return each one's medium, fallback, semantic check, and visual check.

- Components, calls, state, flows, failure, and trust render as Mermaid when the destination renders Mermaid. A text fence is not a pass for those views when Mermaid can render.
- A screen someone will see also gets an Image Gen picture grounded in the current app, beside the Mermaid views, not instead of them; or the exact words `no current UI`.
- An exact format the owner asked for takes precedence, except a text fence for a picture-type view when Mermaid can render.
- A generated image with an invented owner, edge, state, boundary, or control fails. A cache path, a prompt, a chat-only image, or a broken embed is not a finished view.

## Complete When

Each selected view answers its reader question, shows every field in its row above, passes the rendering check, and agrees with the tables and prose it pictures.
