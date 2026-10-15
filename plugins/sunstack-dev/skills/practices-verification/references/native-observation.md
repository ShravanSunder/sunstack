# Native Observation

This reference owns observing a claimed behavior in a native app: binding the exact executable you meant to observe, finding the routes the project allows for inspecting and driving it, and reading the effect from the app's current state.

Expected inputs: the claim, its wrong behavior and allowed alternative from step 1, the route from step 2, the target and reusable evidence from step 3, and the selected project skill's launch and journey detail when one exists.

Return: the native target you observed, named by path, build and configuration, with the behavior evidence; and what building or launching alone didn't establish.

## Bind the executable

A native app can exist in several builds on one machine: an installed copy, a debug build, a release build and an older build still running. Before you drive anything, name the bundle or executable path, its build configuration and the source or version it came from, and confirm the running process is that one, by its path, version or build identity. When the project runs the app on a simulator or a device, use the one the project skill or instructions name, and record which it was. Quit or isolate an earlier instance only when you started it.

## Find the allowed routes

Read the project skill and instructions for the inspection and control routes they support: accessibility identifiers, a debug menu, launch arguments, a test hook, a log or state file the app writes. Use those before inventing your own. When you drive or inspect the on-screen UI yourself, use computer use first and the `peekaboo` skill second. Playwright is never a route for this. Screen recording and accessibility permissions are the user's to grant; when they are missing, return that as the gap and change no system setting yourself.

## Read the current state

After every action, read the UI again from the app. A screenshot or accessibility tree taken before the action describes the old state. Observe the effect the claim names in the place it lands: the pane the message reaches, the file the export writes, the window that opens. For a routing claim, also check the place the effect must not reach. When the claim crosses a restart, quit the app, relaunch the same build and compare what comes back.

## Examples

The apps, panes and paths below are illustrative.

### Failed: the IPC call that succeeded

The claim is that a message sent to pane B appears in pane B. A UI test asserts that the send call returned success through a mocked IPC channel, and the agent reports the claim proven. The mock answered for the interaction the claim is about, so arrival was never observed. The observation that decides it launches the built app, sends to pane B, sees the message arrive there and sees pane A unchanged. Without an arrival observation, the outcome stays open.

### Failed: the app that was already installed

The agent builds the change, then opens the app by name. The system launches the copy installed weeks ago, which behaves the old way, and the agent reports a regression. Binding the path and build identity of the running process before observing would have shown the wrong executable.

### Clean: bound, driven, read back

The agent builds the debug configuration the project skill names, launches that bundle path and confirms the running process's path and build identity match. It drives the send through computer use, reads pane B and pane A again after the action, then quits, relaunches the same bundle and sees the message still in pane B. It reports the bundle path, the configuration, the actions and what each read showed.

## When to stop

Stop when the running executable is bound to the intended path, build and configuration, the claimed effect and any must-not-happen effect were read from current app state through an allowed route, and a restart claim was checked across a relaunch of the same build; or when the gap is named, such as a missing permission, an unreachable device or a build that wouldn't launch, together with what the build or launch alone did and didn't show.
