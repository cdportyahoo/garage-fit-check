# Storage planning upgrade — development brief

Status: draft, not published. Branch: feature/storage-planning-preview.

## Phase 1: Generic storage objects
- Add draggable, resizable overhead rack footprints with user-entered width, depth, mounting height, and rack thickness.
- Add wall-mounted shelves with width, depth, elevation and wall attachment.
- Extend cabinet sizing while preserving current dragging, saved layouts, and PDF export.
- Clearly distinguish 2D floor footprints from elevated storage. A top-down footprint alone cannot prove vertical clearance.
- Clearance check requires user-entered garage ceiling height, vehicle height, garage door track/obstruction heights, and mounting dimensions. Label unknowns as unverified; do not claim guaranteed fit.
- On mobile, preserve touch-drag without page scrolling conflicts.
- Test save/load, reset, PDF, wall placement, car movement, and iPhone Safari.

## Phase 2: Affiliate-ready catalog (only after partner approval)
- Product records: brand, model/SKU, verified manufacturer dimensions, weight capacity, mounting requirements, source date, product URL, and approved affiliate URL.
- Separate generic planning objects from specific purchasable items.
- Do not insert product images or logos without permission. Do not advertise functionality until tested.

## Release gate
- Work only on this feature branch.
- Capture a real screenshot from the working planner for ads.
- User reviews and explicitly approves changes before merging/publishing.
