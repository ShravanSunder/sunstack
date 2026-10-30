## Stop conditions

| Found | Return |
| --- | --- |
| an existing or newly created work thread | the exact reference |
| no project associated with the repository | `no-home: no project for <repository>` |
| access denied or service unavailable | `no-home: access <observed error>` |
| several candidate projects or boards with no way to choose | `no-home: ambiguous <candidates>` |

An empty search does not authorize creating a project or board. An access denial is not evidence that no project exists; report it as observed and do not switch identity, transport, or service to get past it.

Complete when the return is an exact reference that was read, or a `no-home` gap that names what was checked.
