# Related captures: items, variations and filters

This reference owns how a page groups related captures or screenshots. Expected inputs: the supplied captures with their subjects, states and variation categories. Return: the logical items, each item's variations, any filter, and the guide references the gallery needs.

Choose what the reader advances between and what they compare without leaving that item. Use separate items for different logical subjects or meaningful states, variations for alternate captures of the same subject/state, and filters to narrow the collection. A filterable list alone does not express a variation relationship. One capture needs only a figure; an ordered explanation over a collection can use a Gallery Journey.

For example, suppose the supplied evidence has these screen sizes:

| Logical item | Captured variations | Ordered explanation |
| --- | --- | --- |
| Cart, ready | Phone, Tablet, Desktop | One Cart stop |
| Payment, ready | Phone, Tablet, Desktop | One Payment stop |

This is two items with three variations each, not six unrelated screens or six journey stops. A reader can stay on Cart while comparing sizes, then advance to Payment. For a size-switching journey, use the matching guide's variation-enabled path; for an exact evidence sequence, address the specific captures instead. In a size-switching journey, a missing or ambiguous variation stays a disclosed gap, not invented evidence.

Screen size is an example of the judgment, not a fixed list of device names. Use categories the supplied evidence supports and keep them consistent. Different states are separate items in this gallery's screen/state model. A useful size facet may also filter the collection; it does not replace grouped navigation. Bad: naming the logical items “Cart — Phone” and “Cart — Desktop”, or showing only a Phone filter when the reader needs to compare sizes of Cart.

IF the page compares related captures, load the matching guide's `pictures.md` before writing the declarations and return its grouping fields, supported variation categories and the flag's owner. IF the gallery has a guided journey, load the guide's `tours.md` and return its one-step-per-item syntax and how guided missing or ambiguous variations differ from ordinary browsing. Keep a Gallery on its own page with normal document navigation; this pattern adds no component attribute or page-owned navigation.

Complete when each capture is one logical item or a variation of one, each missing or ambiguous variation is a disclosed gap, and the guide's grouping fields have been read.
