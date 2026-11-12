# Garage Fit Check 10.22

- Replace schematic stairs with generated concrete stair artwork in three rail variants.
- Connect steps and illustrative house door to the chosen wall; move either along that wall.
- Add wall selection controls beside the drawing.
- Hide the left rail on the left wall and the right rail on the right wall.
- Preserve wall attachment during resizing and garage dimension changes; retain free-step positioning.

Validation: node tests/layout-storage.cjs passes, including wall placement, constrained/free dragging, resizing and save/load. Browser preview verified left/right artwork and pointer dragging. Physical iPhone touch verification remains a user check.

Artwork: AI-generated concrete stair images embedded as WebP in self-contained SVG assets. Door swing, stair height and access routes remain illustrative rather than clearance checks.
