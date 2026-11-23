# A v1 Markdown-source human view

This reference owns the route for a human HTML view over a `sunstack-workflow-v1` Markdown-source design, including a newly authored v1 set. Expected inputs: the v1 set's Markdown files and the views its documents name. Return: the authoritative Markdown identities, the reading view with each named view's form, and the delivery route with its check.

Keep its Markdown files authoritative and use the ordinary external-include delivery branch in `demistify.md`. This includes newly authored v1 sets: skip the engineering-design recipe and the design check for that view. Carry this source mode through later view and pattern loads: use their generic forms, while their engineering-page exceptions do not apply. Source mode does not depend on when the documents were written.

## Views a v1 Markdown-source design names

A `sunstack-workflow-v1` design keeps its Markdown sources authoritative and names these hand-written views; an engineering design builds its coverage from the records instead and never draws them.

| View | Form on the page | Good signal | Bad signal |
| --- | --- | --- | --- |
| requirement coverage table | Native table with link cells; group by capability when the source's capability map fires, otherwise keep it ungrouped. | Gaps written as words. | One ungrouped table when the capability map exists. |
| entity -> home map | Native table. | Each home is marked new, modified or existing. | An entity without a home row. |
| requirement/design/proof trace | Native table, one row per R; group by the source's capability keys when present. | Every R has a row, and gaps are written as words. | Rows merged across obligations. |
| "proven by" cards | One `ex-card` per requirement. | What stays unverified is on every card. | A card that reads as already proven. |
| coverage rows | Native table; group by the source's capability keys when present. Link a shared observation from each row it serves. | A shared observation appears once and is linked. | The same observation copied into several rows. |

Complete when every island resolves to its authoritative Markdown source and every view the v1 documents name has its form from the table above.
