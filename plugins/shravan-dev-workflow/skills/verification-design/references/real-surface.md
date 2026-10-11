# The Real Surface

This reference owns how each check is run on the real thing: the surface it drives, the core outcome first, the project's verification controls, reuse of tests that already prove the real path, and what to record when nothing can drive the surface.

Expected inputs: each `U` with its core outcome, each `R`, the declared references and case kinds, Program Design's observation points, Test Design's scenarios, and the project's verification controls. Return: the scenarios, each with its surface, the risk it targets, its `R` and `U`, and any reused test.

## Core Outcome First

For each `U`, the first check is the outcome the owner asked for, on the surface they would see it: the hook event reaching the right pane in a real installed agent, not the version check that was meant to make that happen. Checks of mechanisms come after, and never stand in for the outcome.

## The Real Surface

The surface is where a user, caller, or operator meets the behavior: the app window, the CLI, the API endpoint, the file on disk, the installed agent, the deployed service. A check that drives a replacement of that surface (a mocked client, a recorded trace, an in-process stub) is not a check on the real surface; say so on the row.

## Use the Project's Verification Controls

When the project has controls for its real surface, use them and name them on the row:

```text
launch        start the real thing, isolated from the owner's own data
health        know it is ready before driving it
drive         act on it the way a user or caller does
evidence      capture what was observed: transcript, screenshot, log, state
cleanup       leave nothing behind
```

When a control is missing for a surface a check needs, keep the check and record `unverified: no way to drive <surface>`, with what would close the gap. Writing a project's controls is later work, not part of this design.

## Reuse What Already Proves the Real Path

An automated test that already exercises the real path for a check counts as proof: name it in the "reuses test" cell (an existing test, or a `T` from Test Design that drives the real surface) and check its scope covers the case. Do not repeat it by hand. A test that replaces the surface does not count for the real-surface check, though it may still protect a mechanism.

## Complete When

Every `U` starts with a core-outcome check on its real surface or a named limit; every check names its surface, the risk it targets, its `R` and `U`, and the controls it uses or the missing control written as unverified; and every reused test is named with the scope it covers.
