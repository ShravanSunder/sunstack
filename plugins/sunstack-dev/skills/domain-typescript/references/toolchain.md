# TypeScript toolchain

This reference owns the default lint, format, type-check and test commands for a TypeScript repo that doesn't define its own, the fix for type errors that come from a stale workspace package, and the command that adds a shadcn component.

Expected inputs: the changed paths, and the type error when one sent you here.

Return: the commands to run for the changed paths, including any workspace package to build before the type check, and for a new component the shadcn command that adds it.

## Default commands

Run each from the repo root against the changed path. A script the repo defines for the same job replaces the command here.

| Job | Command |
| --- | --- |
| Lint | `oxlint <path>` |
| Apply lint fixes | `oxlint --fix <path>` |
| Rules that need type information (`no-floating-promises`, `await-thenable`) | `oxlint --type-aware <path>` |
| Type check and lint together, in place of `tsc --noEmit` | `oxlint --type-check <path>` |
| Format | `oxfmt <path>` |
| Check formatting | `oxfmt --check <path>` |
| Tests | `pnpm vitest run <path>` |

## A type error from another workspace package

When a package depends on a workspace package that uses conditional exports, the checker reads that package's built output. If the build is missing or older than its source, errors appear in code you didn't change. Build the dependency with its own build script (`pnpm run build` in that package, or the repo's filter form), then run the type check again. If the error persists after a fresh build, it is a real error. A repo whose `tsconfig` maps the package to its source through `paths` doesn't need the build step.

## When the repo uses shadcn

A `components.json` at the app root marks a shadcn project. Add components with the latest CLI: `pnpx shadcn@latest add button`.

Complete when: every changed path has a lint, type check, format check and test command, each one the repo's own where it defines one, and a new component has the shadcn command that adds it.
