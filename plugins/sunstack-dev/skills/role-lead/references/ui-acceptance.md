# UI Acceptance

This reference owns accepting a result that includes a UI or visual claim, whoever collected its proof: you, an Implementer or a Verifier.

Expected inputs: the claim with the surfaces, states and widths it covers, and the proof handed back with its frames.

Return: how each deciding frame was judged, every missing cell, and the working and quality verdicts separately.

## Judge the deciding frames

The claim's surfaces, states and widths make a grid, and each cell is one frame: one surface, in one state, at one width, with any secondary surface it opens, such as a popover, open. Open each frame that decides a cell and record what you judged in it: labels and bodies readable, nothing clipped or overlapping, grouping that reads as the design intends. An accessibility tree, a data dump or a passing test can support the working verdict, and settles nothing about how the frame looks. A cell with no frame anyone judged is a missing cell; name it.

## Report two verdicts

The working verdict says whether the behavior happens: the popover opens, the message sends, the label updates. The quality verdict says whether what the user sees is readable and right in every cell. Report them separately, with the missing cells beside the quality verdict.

A quality verdict of UNKNOWN, or a FAIL in any scoped cell, keeps the UI from being ready. Write "working PASS, quality UNKNOWN" and the cells that are missing, never "UI ready". A cell the owner accepts as a limit stays FAIL or UNKNOWN, recorded as the owner's decision. A complete quality result for the scoped surfaces closes the claim without a second observation.

## Examples

The surfaces and widths below are illustrative.

### Failed: the Lead's own check

The Lead launches the build, sees the pane open and the line update, and captures the toolbar at one width. It never opens the Messages popover. Working PASS, quality UNKNOWN for the popover and for every other width. Reporting "pane UI ready" turned the missing cells into a pass.

### Failed: the Verifier's card-only matrix

A paired Verifier judges the card at five widths and reports one FAIL at the narrowest and quality UNKNOWN elsewhere, with the popover outside its commission. The Lead accepts "with limits", and a later summary calls the pane ready. Quality was never established, so the pane was never ready.

### Clean: a complete scoped result

The commission named the toolbar and the Messages popover, closed and open, at the three supported widths. The Verifier returns a frame for each cell and a quality PASS for each. The Lead opens the narrowest frames of both surfaces, agrees, and accepts without asking for another run.

## When to stop

Stop when every scoped cell has a frame you judged or is named missing, and both verdicts are written. Call the UI ready only when every scoped cell passes.
