# Terminal Observation

This reference owns observing a claimed behavior in a CLI or TUI: which binary runs under which terminal conditions, and how to tie the output you read to the action you just took.

Expected inputs: the claim, its wrong behavior and allowed alternative from step 1, the route from step 2, the target and reusable evidence from step 3, and the selected project skill's run detail when one exists.

Return: the action and its result, correlated on the named binary, terminal and session, and the cleanup you did for resources you created.

## Name the run

Before the action, name:

- the binary you are running, by path, since the one on `PATH` may be an older install;
- its arguments, environment and working directory;
- whether it needs a real terminal, because many programs change behavior when output is piped or no terminal is attached;
- the session, window or pane it runs in when the project uses a terminal multiplexer or a long-lived shell.

Use the session the project skill or your grant names, or create one of your own for this run and record its name. Leave other sessions alone.

## Tie output to the action

Scrollback holds everything that ran before. A prompt, a "done" line or a completion message from an earlier operation looks the same as the one you are waiting for. Before you act, mark where new output starts: clear the pane you own, record the current line count, or include a value unique to this run in the input. After you act, read only what came after the mark. Wait for a signal the operation owns, such as its own completion line, its exit status or the file it writes, with a bound; a returned prompt only means the shell is idle, and a fixed sleep proves nothing.

For a CLI, exit status 0 is the program's own report. Read the effect the claim names as well: the file's contents, the state it changed, the message on standard error when the claim is about failure.

## Clean up what you started

Stop the processes and sessions you created by their own id or name. Killing by a broad process name can end someone else's work. Keep the captured output, and any file the claim is about, before you remove the temporary directory or session that held them.

## Examples

The commands, files and screens below are illustrative.

### Failed: the old prompt

The claim is that a TUI's export command finishes and shows "Export complete". The agent sends the command and captures the pane, finds "Export complete" in it and reports a pass. That line came from an export run ten minutes earlier; the new one had hung. Marking the output before sending, or putting a unique file name in the command and waiting for a completion line that names it, would have separated the runs. When the harness can't tell old content from new, report that gap instead of a result.

### Failed: exit 0, empty file

A CLI is supposed to write a CSV with a header row. It exits 0 and the agent reports it working. The file exists but is empty, because the writer was never flushed. Reading the file against the header the spec names is the observation the claim needs.

### Clean: own directory, correlated result

The agent runs the freshly built binary by path, in a temporary directory it created, with arguments from the project skill. It waits for the process to exit with a bound, records the exit status and standard error, opens the CSV and compares its header with the spec's column list. It copies the output and file into the evidence location the assignment names, then removes its temporary directory.

## When to stop

Stop when the result you read is tied to this run's action on the named binary and session, the claimed effect is read beyond the exit status, and every process and session you created is stopped with the evidence kept; or when the gap is named, such as a harness that can't separate old output from new, or a binary you couldn't run under the terminal conditions the claim needs.
