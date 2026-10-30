# Security

## Standards

- Every sensitive surface in a change carries an allowed, disallowed, blocked or deferred decision, recorded before that surface is outlined or written.
- A disallowed or blocked decision stops the write of that surface.
- Third-party source or assets carry their source, their license or permission state, and a copy-or-adapt decision before anything is copied.
- Executable resources carry deterministic behavior tests.
- Shipped skill docs carry no home-cache path or local cache identifier.

## The sensitive surfaces

This list is the one owner of the term set. A change's sensitive surfaces are any of these it touches:

- `scripts/`
- hooks
- `assets/`
- package scripts
- shell commands or subprocess behavior
- network access
- third-party source or skill adoption
- private auth material, tokens or sensitive-value paths
- privileged actions
- an installed Codex or Claude cache refresh
- home-level writes

Plugin manifests and versioning are not sensitive surfaces; they are platform surfaces.

## Recognizing a surface

- A reference teaches the agent to fetch an API with `curl`: shell commands and network access, though the change is prose.
- A typo fixed in a comment of an existing `scripts/` file: `scripts/` is in scope, though the change is mechanical.
- A reference teaches when to refresh the installed plugin cache: an installed cache refresh, though nothing runs during the edit.
- A skill adapts a prompt template from an upstream collection: third-party source.
- A version moves in a plugin manifest: no sensitive surface.

## When the decision counts

A decision shows its order only when it is written down before the surface's outline or text exists, such as in the design or in a record made before the first write. A decision first written in a handback after the files exist may be right, and still shows nothing about which came first.

How a surface is inspected and decided (its entry points, untrusted inputs and privileged actions, and the labels its decision returns) is a procedure, kept by the skill that runs the gate.

## When to stop

Complete when every sensitive surface in scope is named with its decision and where that decision was recorded before the surface was outlined or written, or the change is shown to touch none. Return each surface and its decision, or none.
