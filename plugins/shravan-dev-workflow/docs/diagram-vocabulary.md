# Design View Vocabulary

This maintainer index records current view names, artifact altitude, semantic owner, and runtime rendering consumers. It is not runtime authority. View-selection and required-field rules live in each design skill's `references/views.md`; medium, fallback, semantic-preservation, and visual-check procedure lives in `shared-references/diagram-rendering-and-fallbacks.md`; conditional Image Gen production, durable embedding and pixel/preview inspection live in `shared-references/generated-document-visuals.md`.

## Why/What Views

| View token | Altitude | Runtime semantic owner | Runtime rendering consumer |
| --- | --- | --- | --- |
| screen picture | Why/What requirements | `skills/spec-design/references/views.md` | `skills/spec-design/references/views.md` |
| journey map | Why/What requirements | `skills/spec-design/references/views.md` | `skills/spec-design/references/views.md` |
| context view | Why/What specification | `skills/spec-design/references/views.md` | `skills/spec-design/references/views.md` |
| entity map | Why/What specification | `skills/spec-design/references/views.md` | `skills/spec-design/references/views.md` |
| coverage table | Why/What specification | `skills/spec-design/references/views.md` | `skills/spec-design/references/views.md` |

`system context map` and `context diagram` are accepted names for a context view. `traceability matrix` and `requirement coverage table` are accepted names for a coverage table. The canonical tokens above remain the source and test vocabulary.

`generated-image` is a rendering medium, not another semantic view token. The consuming design skill still owns the reader question, altitude, exact relationships and required fields. The Lead authors and accepts the visual meaning; the generated-visual reference owns only capability, execution, project asset/embed and inspection procedure.

## Structural How Views

| View token | Altitude | Runtime semantic owner | Runtime rendering consumer |
| --- | --- | --- | --- |
| component view | structural How, always drawn | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| entry-to-effect path | structural How, always drawn | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| entity → home map | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| call path | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| state machine or table | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| data or event flow | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| failure and recovery flow | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| trust boundary | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |
| test path | structural How | `skills/program-design/references/views.md` | `skills/program-design/references/views.md` |

The trace table is not a view. `skills/program-design/references/seams-and-trace.md` builds it, and it is always part of a Program Design.

## Altitude Boundary

Journey maps, context views, and coverage tables expose authoritative Why/What. The system remains one opaque node in a context view; drawing its first internal component, owner, dependency edge, state store, or enforcement point crosses into program-design views.

Structural views expose components, owners, interfaces, state, calls, flows, failure/recovery, trust boundaries, and seams. A view never owns normative meaning by itself.

## Maintenance

When a view token, predicate owner, required field, or runtime consumer changes, update this index and `tests/skills/lib/spec-program-design-user-requirements-contract.test.ts` in the same changeset. Keep runtime procedure out of this file and do not duplicate predicate tables here.
