# Version 10.18 — direct finger dragging of garage walls

Replaces the 10.17 mode-gated interaction. No Resize garage button or mode is needed. Drag along the right wall to change width or along the garage-door edge to change depth. Arrow handles remain visible as additional grab points. Numeric measurements remain available.

Wall-edge touch targets extend 24 CSS pixels around the edge. Cars and enlarged cabinet targets retain priority nearby, except directly on the visible arrow handle. Existing stable touch capture and frozen gesture scale remain; the plan refits on release. Cars and cabinets keep coordinates and dimensions. Shrinking too far raises STOP. Save/load and print measurements use the updated garage size.

230 Node logic checks passed, including default-on wall handles, direct edge touches away from handles, unchanged objects, one/two/three-car resizing, no coordinate drift, cabinet edge-target regressions, saved dimensions, cancellation and page-style stability. iPhone Safari confirmation from the user remains pending.
