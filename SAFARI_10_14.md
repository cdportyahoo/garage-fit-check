# Safari drag correction — 10.14.1

The user reported that 10.14 jumped toward the upper-left corner when touched. Remove the body position:fixed, root overflow and programmatic scrollTo changes introduced in 10.14. Native touch tracking stays on the stable overlay. Non-passive document capture prevents touchmove scrolling only while an item is being dragged. End/cancel/Reset/blur/visibility cleanup clears drag state without repositioning or restyling the document.

129 minimal-DOM checks pass, including no page-style mutations, no scrollTo calls, active-only default prevention, car movement, cabinet resize, touch identifier isolation and cleanup. These are logic checks, not an actual iPhone Safari verification. Browser touch suite has been updated but was not run locally. Existing 10.14 artwork is unchanged.
