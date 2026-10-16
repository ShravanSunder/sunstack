# Project Capability Generation

This reference owns the create branch: turning the step 2 source map into a first project verification skill that step 4 can run.

Expected inputs: the named app and its canonical path from the layout reference, the source map from `practices-how`, the adopted sources, the paths you may write and where evidence goes.

Return: the drafted skill files, with each command, handle and expected result anchored to its source; the representative journey for step 4; and the gaps the draft leaves open.

## Interview the repository first

Answer these from the code and docs, and ask your caller only what you can't observe.

- Surface. What does a user touch: a web UI, a CLI or TUI, a desktop app, an API, a library? A repository can have several. Write the skill for the named app and note the others without covering them.
- Run. How does the app start locally? Use the project's own documented command from its package scripts, task runner, README or dev scripts. Note ports, environment variables, seed data and auth.
- Drive. How can an agent act on it? Existing harnesses come first: committed end-to-end specs, expect scripts, PTY helpers, endpoints, a debug port. Only then pick a generic route, such as a browser for a web app, an isolated terminal session for a CLI or TUI, or plain HTTP for a service. Follow the host's standing instructions for which tool drives an on-screen UI, and use the project's existing automation where it has one.
- Observe. What evidence can a run keep: terminal transcripts, screenshots, response bodies, logs, exit codes, stored state?
- Isolate. Can two instances run side by side with separate ports, data directories or profiles? If not, the skill says so and tells the agent to drive only an instance it started, because driving a shared instance can corrupt the user's session.

When the checkout doesn't build or start as it is, report the exact failure as a gap and stop drafting the steps that depend on it. A recipe written against a broken base teaches wrong steps.

## What the skill must teach

Ground each part in what the interview found, with no placeholder left. The layout reference decides where each part lives.

- Launch. The exact command that starts the app for verification, the signal that it is ready to use, and teardown. A log line, a health response carrying the expected build, or a prompt can be that signal. A port that answers isn't one. A short-lived CLI or TUI has no server to keep alive, so build the binary or install dependencies once, then start each drive in its own isolated session.
- Health check. One read-only check that answers whether this instance is worth driving: the process is up, it is the expected build, the port belongs to this run, auth is valid. An agent runs it first and again whenever something looks off.
- Drive. The route with real selectors and commands from this repository. Prefer stable handles such as accessible names, data attributes, prompt strings and route paths over coordinates and tab order.
- Evidence. What to keep and where it goes. Drive the path a real user takes, since internal setters and test-only endpoints prove nothing about it. Keep the action and the state it produced along with the final screen. Check side effects, such as files written, rows inserted and messages sent, beside what is visible. Use a mock only where a production boundary already isolates the external system. When the safe path is a dry run or a test mode, observe what it skips (files, network, git refs) before trusting its name, because some dry runs still touch the network or open a browser.
- Cleanup. Stop what the run started by its recorded process id or session name, never by process name. Remove instances and scratch state, and keep the evidence at a location the skill names.
- Helpers. Each script the skill ships is executable, runs on its own, shows its invocation in the skill body and has been run against its real target. A helper the reader has to reverse-engineer doesn't help.

## Choose the journeys

Start from the journeys the request scopes. When it names none, pick the user-facing behaviors that the routes, commands, menus or docs show and that the request needs. No count is fixed. Each journey says, from the user's side, what the behavior is, every entry point a user has, how to drive it, the observable end state that proves it with that state's adopted source, and the gotchas that waste or invalidate a run. A run that drives one entry point of several names the ones it left undriven.

Pick the representative journey for step 4. It crosses launch, a real user action and an effect a later reader can check, such as a saved record read back from a second view.

## Prove before handing over

Step 4 runs the skill's own instructions once, from launch to cleanup. Run the skill's cleanup after every failed attempt too, so broken attempts don't strand processes or ports. After the last cleanup, open the evidence at its named location; a cleanup that deletes the proof fails the run. A skill that never ran is a draft, and the return says which part didn't run and why.

## Example

The case is fictional. The request is to create a verification skill for `ledger`, a terminal app in a Rust workspace.

Weak draft: "Run `cargo run`, wait five seconds, press `a` to add an entry, take a screenshot. Cleanup: `pkill ledger`." The command came from memory, the sleep is a guess, the screenshot shows only the last screen, the expected result has no source, and `pkill` also kills the user's own session.

Adequate draft: the launch command is the workspace's `verify-ledger` task, read at its line. Each drive runs in its own named terminal session with `LEDGER_DATA_DIR` pointing at a scratch directory. Readiness is the `ledger ready (build <sha>)` banner, checked against the checkout's commit. The add-entry journey types an entry, then reads the list back from the CLI with `ledger list --json` and finds the entry there, and its expected result cites the spec section that defines an entry. Cleanup kills the named session and removes the scratch data directory, and the transcript stays in the evidence directory.

## When to stop

The draft is ready for step 4 when every part above rests on a source you opened or a command you ran, each journey names its adopted source, the representative journey is chosen, and each gap says what it blocks. Creation finishes only after step 4 runs the skill on its real target. Until then, return a draft with its gap.
