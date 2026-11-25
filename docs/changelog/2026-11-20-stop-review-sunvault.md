# 2026-11-20 Stop reviewer can load JEV credentials through SunVault

- A user-only `jev-sunvault.env` beside the installed hook enables SunVault for the JEV subprocess. The file supplies the SunVault credential selector and an OpenRouter item reference. The resolved credential is scoped to that subprocess.
- The installed hook returned a live JEV `stop_ok` decision for a synthetic Stop event with no caller-supplied API key. The reviewer isolation suite passed all 50 checks.
