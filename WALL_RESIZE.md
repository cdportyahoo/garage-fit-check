# Version 10.17 — drag garage walls

Tap Resize garage, then pull the purple horizontal handle at the right wall for width or vertical handle below the door end for depth. Tap Done resizing garage to hide the handles. Numeric fields remain available for exact measurements. Handles use 44 CSS-pixel diameter touch targets and the existing stable touch surface.

Coordinates and scale are frozen for a wall gesture; the plan refits only after release/cancel. Objects retain their dimensions and coordinates, so shrinking around them produces the existing outside-garage warning. SVG overflow is clipped to prevent a growing room from widening the page. Handles and hints are excluded from print. Dimensions continue to save through the existing multi-vehicle schema and print report.

228 Node logic checks passed, including all prior cabinet/car tests and new wall-width/depth touch tests for one, two and three cars, repeated-coordinate stability, unchanged vehicles, saved dimensions, report updates, shrink warnings, cancellation and page-style stability. Actual iPhone Safari touch confirmation remains required.
