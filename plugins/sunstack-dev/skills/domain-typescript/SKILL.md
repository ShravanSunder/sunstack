---
name: domain-typescript
description: "Use when writing, changing or reviewing TypeScript code, especially function signatures and generics, unions over states or outcomes, Zod schemas and the types derived from them, escapes such as `any`, `as` or `!`, file and folder names, and which lint, format and test commands to run."
disable-model-invocation: true
---

# TypeScript

Read this skill in full before the TypeScript work it governs; your own full read earlier this session counts.

The compiler keeps only the promises you write down. Annotate every edge a caller can see (parameters, return types, exported shapes), let inference work inside a function body, and never silence the checker with `any`, `as` or `!`. Data from outside the program has one authority, its Zod schema, and every type for that data is derived from the schema.

## Types at the edges

Every function declares its parameter and return types, so a change inside the body can't silently change what callers receive. Generic parameters get names that say what they hold:

```ts
// before: inferred return, anonymous generic
function getValue<T>(obj: Record<string, T>, key: string) {
  return obj[key];
}

// after
function findRecordByKey<TRecord>(
  records: Readonly<Record<string, TRecord>>,
  key: string,
): TRecord | undefined {
  return records[key];
}
```

Check a literal against a type with `satisfies`, which keeps its inferred shape; `as` overrides the check instead of running it:

```ts
const retryPolicy = { maxAttempts: 3, backoff: "exponential" } satisfies RetryPolicy;
```

Mark data that shouldn't change `readonly` (`columns: readonly string[]`). Use `const` unless the binding is reassigned, and template literals over string concatenation.

When the checker rejects a value you believe is right, narrow it by its tag, write a type guard, or parse it, and keep `any`, `as` and `!` out of the fix ([an escape trades a compile error for a runtime crash](../principle-types-are-communication/SKILL.md)).

## States and outcomes as unions

When a value can be in one of several states, write one object type per state with a literal `kind` tag, `switch` on `kind`, and end the switch with `assertNever` ([model the states as a sum and make every consumer handle each one](../principle-types-are-communication/SKILL.md)).

```ts
// before: which combinations are real lives in people's heads
interface SyncState {
  isSyncing: boolean;
  syncedAt?: Date;
  lastError?: string;
}

// after
type SyncState =
  | { kind: "idle" }
  | { kind: "syncing"; startedAt: Date }
  | { kind: "synced"; syncedAt: Date }
  | { kind: "failed"; error: SyncError };

function describeSyncState(state: SyncState): string {
  switch (state.kind) {
    case "idle":
      return "Not synced yet";
    case "syncing":
      return `Syncing since ${state.startedAt.toISOString()}`;
    case "synced":
      return `Synced at ${state.syncedAt.toISOString()}`;
    case "failed":
      return `Sync failed: ${state.error.message}`;
    default:
      return assertNever(state);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(value)}`);
}
```

Adding a fifth state now breaks the build at every `switch` that hasn't decided what it means.

When a function that calls another system can end more than one way, return a union with one variant per ending, including one for a reply you couldn't confirm, instead of throwing or returning `null` ([an unknown ending is its own outcome, never a guessed success](../principle-design-for-failure/SKILL.md)).

## Zod at the boundary

Where JSON, `process.env`, a file or a message enters, parse it with its Zod schema on that line and pass the parsed type inward; never `as` raw data into a domain type ([parse untrusted data once, where it enters](../principle-types-are-communication/SKILL.md)).

When a Zod schema already defines a shape, take its type from `z.infer` and each related shape from `.pick()`, `.omit()`, `.partial()` or `.extend()` on that schema ([one shape has one authority, and copies drift](../principle-one-owner-per-truth/SKILL.md)).

```ts
// before: a hand-written type beside the schema, and a cast on raw input
type SectorConfigInput = Omit<SectorConfig, "version" | "updatedAt">;
const input = (await request.json()) as SectorConfigInput;

// after
export const sectorConfigSchema = z.object({
  sectorId: z.string().min(1),
  weights: z.record(z.string(), z.number()),
  version: z.number().int(),
  updatedAt: z.iso.datetime(),
});
export type SectorConfig = z.infer<typeof sectorConfigSchema>;

export const sectorConfigInputSchema = sectorConfigSchema.omit({ version: true, updatedAt: true });
export type SectorConfigInput = z.infer<typeof sectorConfigInputSchema>;

const input = sectorConfigInputSchema.parse(await request.json());
```

Zod v4 deprecates `a.merge(b)`; write `a.extend(b.shape)`.

## Shapes and names

- A function with more than three parameters takes one props object: `function executeQuery<TRow>(props: ExecuteQueryProps): Promise<QueryResult<TRow>>`.
- `interface` for object contracts, `type` for unions and aliases. Keep a type next to the code that uses it.
- Files and folders are kebab-case.

Before creating a file or folder, name the one responsibility it holds (`database-connection.ts`, `query-builders/`, never `db.ts`, `utils/` or `helpers.ts`); when no single responsibility fits, split the content first ([give each part one job](../principle-separate-the-concerns/SKILL.md)).

## Gates

The repository's own scripts, oxlint config and formatter config win over anything listed here, and the formatter owns indentation and layout. Follow the oxlint rules without exceptions: fix the code instead of adding a disable comment.

IF the repo defines no lint, format, type-check or test script for the changed path, a type error points into another workspace package, or you're adding a component in a shadcn project (`components.json` present), load `references/toolchain.md` and return the commands to run for the changed paths, including any workspace package to build first, and for a new component the shadcn command that adds it.

## Signs you skipped it

- `as` on parsed JSON or `process.env`, or `!` on a value that can be missing.
- An exported function with no declared return type, or a public generic named `T`.
- A hand-written `Omit<>` or interface beside a Zod schema for the same shape, or `.merge()`.
- A state spread across booleans and optional fields, or a `switch` over a union with no `assertNever`.
- A file named `utils.ts`, `helpers.ts` or `db.ts`.
