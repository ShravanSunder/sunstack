# Project Skill Layout

This reference owns where a project's verification skill lives, how the Claude path reaches it, and where its content goes.

Expected inputs: the project root, the named app and the paths you may write.

Return: the canonical path, the Claude path's state, any other recipe for the same app, and the home for each part step 3 writes.

## The canonical home

```text
<project>/.agents/skills/verify-<app>/
  SKILL.md        app identity, launch and readiness, health check, journey index, evidence, cleanup
  references/     one file per journey or small group, and setup only some runs need
  scripts/        only helpers this project needs
<project>/.claude/skills/verify-<app>
  -> ../../.agents/skills/verify-<app>
```

`<app>` is the project's own name for the app, in lowercase with hyphens. A project with several apps has one skill per app. The `.agents` directory holds the only authored copy, and the Claude path is a relative link to it. Global links, cache syncing, installs and home-level writes play no part here.

## Find what exists

Work from the project root and read what you find.

- List `.agents/skills/verify-*/SKILL.md` and read each one's frontmatter and app scope. Match the named app and the behavior in scope; the first filename that looks close isn't a match.
- List `.claude/skills/verify-*` and any other skill home the project uses, such as `.cursor/skills/verify-*`.
- Read the project's instructions (`AGENTS.md`, `CLAUDE.md`, the README) for an explicit pointer to a verification skill or runbook. A pointer tells you where to look and grants nothing.

A second recipe for the same app anywhere in the project is a competing owner. Report it with its path. Which one survives is the owner's decision.

## Check the Claude path

Classify `.claude/skills/verify-<app>` in this order, because `test -e` follows a link and reports a broken one as missing:

- `test -L` succeeds, `readlink` prints exactly `../../.agents/skills/verify-<app>`, and the resolved path is the canonical directory inside the project: the intended link. Keep it. Check the resolution with `[ "$(realpath .claude/skills/verify-<app>)" = "$(realpath .)/.agents/skills/verify-<app>" ]`. It fails when the link is broken or when any directory on the canonical path is itself a link that leads elsewhere.
- `test -L` succeeds, `readlink` prints exactly `../../.agents/skills/verify-<app>`, and nothing exists at `.agents/skills/verify-<app>` yet (both `test -e` and `test -L` fail there): a pending link. On a create whose writable paths cover both paths, keep it and follow the create steps below. On upkeep the missing skill is the step 1 gap. In any other case it is a conflict.
- `test -L` succeeds with any other target, including an absolute path or one that `realpath` resolves outside the project, or the resolution check fails on a link that isn't pending: a conflict.
- `test -L` fails and `test -e` succeeds: a real file or directory sits there, a conflict.
- Both fail: absent.

### Write check

On a create or an upkeep, run this from the project root once for each path you will write, before the first write: every file and new directory under `.agents/skills/verify-<app>/`, a helper's test file, and `.claude/skills` before you create the Claude link in it. Run it again for any path you add later. It walks the path from the project root down. Every component that exists must resolve to its own location inside the project, so a symlinked directory anywhere on the way fails even when you never listed it. A path that doesn't exist yet passes only when its deepest existing ancestor passes.

```bash
check_write_path() {
  root="$(realpath .)"
  rest="$1/"
  walked=""
  while [ -n "$rest" ]; do
    part="${rest%%/*}"
    rest="${rest#*/}"
    [ -n "$part" ] || continue
    walked="${walked:+$walked/}$part"
    if [ -e "$walked" ] || [ -L "$walked" ]; then
      [ "$(realpath "$walked" 2>/dev/null)" = "$root/$walked" ] || { printf 'unsafe: %s\n' "$walked"; return 1; }
    else
      return 0
    fi
  done
}
check_write_path .agents/skills/verify-<app>/SKILL.md
check_write_path .claude/skills
```

The Claude link itself is meant to be a link, so check its parent here and let the classification above judge the link. Any `unsafe` line stops the work as a conflict before anything is written. Report each line with what sits at that path.

### Create the skill and its link

With the write check clean, create the canonical directory with `mkdir -p .agents/skills/verify-<app>` and write the skill there. Then handle the Claude path by its state. Leave a pending link untouched. When the Claude path is absent and your writable paths include it, create it from the project root. Finish with the resolution check in either case:

```bash
mkdir -p .claude/skills
ln -s ../../.agents/skills/verify-<app> .claude/skills/verify-<app>
[ "$(realpath .claude/skills/verify-<app>)" = "$(realpath .)/.agents/skills/verify-<app>" ] && echo intended-link
```

For a pending link, run only the last line. It prints `intended-link` only when the link resolves to the canonical directory inside the project, and the link counts as intended only then.

Report a conflict with its path, what sits there and what resolving it would need, and leave it in place. Replacing or deleting it takes an owner's decision.

## Frontmatter

Give the skill valid portable frontmatter: `name: verify-<app>`, matching the folder, and a `description` that names the app, its surface and when to reach for it. A skill without frontmatter never registers. Add client-specific metadata only when the target client supports it and you validated it.

## What goes where

`SKILL.md` carries what every run needs: which app this is and its surfaces, how to start it and the signal that it is ready to use, the read-only health check, the journey index with how to pick and drive a journey, what evidence to keep and where, and owned cleanup. An agent will read it mid-task, so keep it short enough to scan.

`references/` holds one file per journey or small group of journeys, plus setup that only some runs need, such as seeding an account or a platform quirk. A journey file says, from the user's side, what the behavior is, its prerequisites, every entry point, the driving steps with the observable result of each, the expected result with its adopted source, the failures that matter and the gotchas. Pick headings that fit the journey.

`scripts/` holds only the helpers this project needs. Each one runs on its own, has its invocation shown in `SKILL.md`, and has been run against its real target. A helper with logic worth testing gets tests where the project keeps its tests.

Keep these out of the skill:

- tools, flags or selectors nobody ran or read at their source, and placeholders written as working steps;
- credential values, and machine-specific paths such as an installed plugin cache;
- calls back to the generic verification or verification-maintenance practices, so that loading the project skill never loops back here;
- a log of past runs or results, since evidence and run notes stay in the task, project or log homes that already hold them;
- copied principle text, and any inventory kept beside the journey index.

## Example

The case is fictional. A project has two apps, `api` and `console`. `.agents/skills/verify-api/` and `.agents/skills/verify-console/` each hold a skill, and `.claude/skills/verify-console` links to `../../.agents/skills/verify-console`.

A request to create the console skill finds it already exists, so you report the existing skill and stop.

A request to maintain the API skill finds that `.claude/skills/verify-api` is a real directory holding an older copied recipe. Report the conflict with both paths and write nothing. Two recipes for one app drift apart, and agents on different clients would follow different steps.

## When to stop

Stop when the canonical path is named; the Claude path is classified as the intended link, a pending link, absent, or a conflict with what sits there; every other recipe for the same app is listed, or the search that found none is named; and each part step 3 writes has its home.
