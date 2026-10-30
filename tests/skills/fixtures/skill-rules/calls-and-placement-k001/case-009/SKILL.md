## Example: the missing range read

An agent told the owner the storage library can't read byte ranges, and designed a workaround that downloads whole objects and slices them in memory. The library has a range-read call. One look at its interface before making the claim would have removed a whole component and its memory cost. Better: read the library's interface first, then claim, and say "I checked the API" or "I'm assuming this, unchecked".

IF the case in front of you doesn't match the range-read example, or you are checking the evidence behind someone else's claim about the system, load `references/example_scenarios.md` (scenarios, simplest first: the cache that wasn't invalidated; the plugin that was never wired; it failed after restart; the fix that wasn't deployed; "Who decided this?"; the wrapper that dropped the filter; the outage that was a sandbox; counts passed, meaning wrong) and return the closest scenario and how its move applies to your case.
