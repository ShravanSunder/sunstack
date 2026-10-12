---
name: principle-types-are-communication
description: "Use when designing or reviewing types, signatures, or data that crosses a boundary (network, file, environment, database, model output), especially status fields, ids, and optional fields that only make sense together. Model states as sum types, build valid shapes, parse once at the boundary, and handle every variant."
disable-model-invocation: true
---

# Types Are Communication

Types tell the reader what is possible, and the compiler enforces the promise. Hiding type information removes load-bearing documentation. When a status is a string, an id is a bare string, or a result is a bag of booleans and optional fields, the code still runs, but the knowledge of which combinations are real lives only in people's heads, and the next change breaks it quietly. Model the domain's states as named types that constrain what can exist, check untrusted data once where it enters, and let the compiler carry the rest. Whole classes of bugs then never compile, and a reader learns the design from the signatures.

## How to think it through

**Name the states the domain actually has, and what each one carries.** A job that failed has an error; one that succeeded has a result; one that is running has a start time. Make that a sum type: a discriminated union in TypeScript, a tagged union of models in Python, an enum with payloads in Rust. The payload is required per variant, so a "failed" without an error or a "succeeded" without a result can't be written, and the type documents exactly what is present in each state. Every optional field whose validity depends on another field is a state the type failed to name; don't let unknowns and optionals proliferate.

**Narrow by the tag, never by casting.** Checking `kind` (or `state`, or matching the enum) tells the compiler which variant you hold, and that variant's fields become available. No `as`, no `isinstance` ladders, no "I know it's there" assertions.

**Make every consumer handle every state.** A union protects you only if each `switch` or `match` over it is exhaustive: `assertNever` in the default branch in TypeScript, a `match` without a catch-all in Rust. Adding a variant next month then breaks the build exactly where it isn't handled yet.

**Build valid shapes instead of checking loose ones.** An id is a newtype whose constructor rejects the empty string; a non-empty list is a first item plus the rest; a time range is a start plus a duration. Validity checked in the constructor is checked once, and every value of the type is valid after that. Give semantic ids their own types: `UserId` and `OrderId` may both be strings underneath, but passing one where the other belongs becomes a compile error.

**Parse untrusted data once, at the boundary.** Network payloads, files, environment variables, database rows, CLI arguments, and model output are unknown until parsed. Parse them into domain types where they enter, then trust the types inside; don't re-validate deep in business logic. Deserializing checks shape, not meaning, so constructors still reject invalid combinations. A stored value that doesn't parse fails closed with an error naming the field; it never defaults to an enabled or finished state. Keep a separate wire or storage shape only when its job really differs from the domain type.

**Don't lie to the compiler.** `any`, `as`, a non-null `!`, `.unwrap()`, a bare `# type: ignore`: each moves a check from compile time to a runtime crash. If the compiler can't prove something, prove it (parse, narrow) or treat the escape as a known hazard.

**Derive types from one authority.** When a schema already defines the shape (a Zod schema, an OpenAPI spec, a migration), derive the type from it instead of writing a parallel one by hand. Two hand-written shapes drift apart quietly.

**The hard call is when to stop strengthening.** Strengthen a type where an operation would otherwise be partial: a runtime assertion, a null check, or a "should never happen" throw marks the spot. If nothing would crash or misroute, keep the plain type. The goal is to track the cases each caller must handle, not to describe the data as precisely as possible.

A perfectly typed request can still be one the caller shouldn't be allowed to make. Whether a caller may cause an effect is a permission decision, separate from whether the value is well formed.

## In your languages

- **TypeScript.** Discriminated unions with a `switch` on the tag and `assertNever` in the default. `satisfies` to check a value against a type without losing its inferred shape, instead of `as`. Explicit parameter and return types, so an implementation change can't silently change a contract. `readonly` for data that shouldn't change. No `any`: use a generic with a descriptive name (`TRecord`). For validated data, the Zod schema is the authority: `z.infer<typeof schema>` for the type, and `.pick()` / `.omit()` to derive related shapes instead of hand-written `Omit<>`.
- **Python.** Pydantic v2 models for anything with a shape, configured with `model_config = ConfigDict(...)`; no `TypedDict`, `dataclass`, or `NamedTuple`. Variants as a tagged union: each model has a `Literal` tag and the union uses `Field(discriminator=...)`, so narrowing by the tag needs no `isinstance` or cast. 3.12 native generics (`def find_record[TRecord](...)`), `X | None`, type references through `import typing as t`, timezone-aware datetimes, and only rule-specific `# pyright: ignore[...]`.
- **Rust.** Enums with payload variants and a `match` without a catch-all; `Result` for expected failures and `Option` for absence. Newtypes for ids and validated strings, with fallible constructors (empty is not an id). Serde-tagged enums whose tags match the wire contract; parse the shape, then construct the domain value, because deserialization is not validation.

## Example: the green check next to an error

A job record has `done: boolean`, `failed: boolean`, and `error?: string`. A crash leaves `done: true, failed: true`, and the screen shows a green check beside an error. Better:

```ts
type JobStatus =
  | { state: "queued" }
  | { state: "running"; startedAt: Date }
  | { state: "succeeded"; result: JobResult }
  | { state: "failed"; error: JobError };
```

The contradiction can't be written, a `failed` job always carries its error, and the screen's exhaustive `switch` has to decide what `failed` looks like.

IF the case in front of you doesn't match the job status, or you are reviewing someone else's types against this principle, load `references/example_scenarios.md` and return the closest scenario and how its move applies to your case.

## When it doesn't apply

If a value has one valid representation, comes from inside the system, and no operation on it can fail for a bad combination, a plain string, number, or boolean is right. Don't wrap every string in its own type.

## Signs you skipped it

- Optional fields that are only valid when another field has a certain value, or `status: string`.
- Checks like `isDone && !isFailed`, or `isinstance` chains to work out which variant you have.
- `any`, `as`, `!`, `.unwrap()`, or bare `type: ignore` in production code.
- Validation repeated deep inside business logic, or a stored value that silently defaults when it doesn't parse.
- A `switch` over a union with no exhaustive check.
- Two hand-written types for the same shape.

Decide what the states mean first with `principle-define-the-domain-first`. For the endings of an operation that reaches another system, including "unknown", see `principle-design-for-failure`.
