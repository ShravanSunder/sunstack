# Browser Observation

This reference owns observing a claimed behavior in a browser: which page and build you are looking at, how you drive it and what counts as the outcome.

Expected inputs: the claim, its wrong behavior and allowed alternative from step 1, the route from step 2, the target and reusable evidence from step 3, and the selected project skill's browser journey when one exists.

Return: the checked browser route and its observations on the named target, or the exact outcome you couldn't reach and what blocked it.

## Pin what you are looking at

Before driving anything, establish:

- the build the server is serving, and that it contains the change under observation;
- the backend behind the page, and whether it is the real one the claim depends on (a dev server with a mocked backend is not the real path for a backend change);
- the session and data the claim needs, such as a signed-in user or seeded records, and where they come from;
- the viewport or device size the claim is about;
- the action and the scene you expect afterwards, taken from the expected outcome in step 1.

When the project skill names the launch, the fixture and the readiness signal, use those. A page that loads is not yet ready when the claim depends on data, a socket or a background job; wait for the element, response or state the project names as ready, with a bound, and never for a fixed time.

## Choose how to drive it

A browser suite the project already commits runs through the project's own command, inside your grant. Read its setup before you count it: it may stub the network, sign in through a shortcut or run against a different build. When you drive or inspect the page yourself, use computer use or the Chrome plugin. Never drive the page with Playwright and never add Playwright to the project as a new route; when neither tool can reach the page, return that as the gap.

## What counts as the outcome

Look at the visible result the claim promises at the claimed size. When the claim depends on a request, storage or a cookie, inspect that effect too: the request the action sent, the response it got and the state left behind. Tie each effect to your action, for example by the value you entered or the id the response returned. A toast, a spinner that stops or a 200 status is an acknowledgement. Persistence needs a readback through a fresh load or a second session, and a claim about errors needs the failing input driven through the same page.

## Examples

The pages, fields and flows below are illustrative.

### Failed: the toast that said saved

The claim is "saving a draft keeps its body". The agent types a body, clicks Save, sees "Saved" and captures a screenshot of the toast. Reopening the draft would have shown an empty body, because the request sent only the title. The observation that decides this claim reloads the draft, compares the body with what was typed, and checks that the save request carried the body.

### Failed: the right page at the wrong size

The claim is that the share panel fits on a narrow phone screen. The agent checks it on a wide desktop window, where the panel always fits, and reports it fixed. The observation has to run at the size the claim names, and anything not tried at that size stays unverified.

### Clean: reuse, then one readback

The project commits a browser journey for draft editing that reloads and asserts the body. It ran green on the build under observation, and its setup uses the real backend. The agent reuses it under step 3, then drives one readback through the Chrome plugin in a second session to cover the cross-session part the journey doesn't reach, and reports both with the build they ran against.

## When to stop

Stop when the action, the scene and each effect the claim names were observed on the pinned build, backend, session and size, each tied to your action, with persistence or failure behavior driven where the claim covers it; or when the outcome you couldn't reach is named with what blocked it, such as a login, missing data or an environment you can't open.
