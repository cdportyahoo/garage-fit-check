# Storage prototype test checklist (not yet executed in Safari)

Branch: feature/storage-planning-preview. Never merge without owner approval.

## Critical iPhone tests
- Open preview on iPhone Safari; tap Add Storage. Menu reveals Cabinet, Wall shelf, Overhead rack without moving the drawing off-screen.
- Add each object, drag with one finger, resize with the corner handle, switch selection, and remove.
- Scroll outside drawing without accidental dragging; drag inside drawing without page jumps.
- Add rack over vehicle: it remains a distinct dashed elevated footprint, not a floor collision. Enter ceiling, vehicle, bottom height, and thickness; verify warning when vehicle height exceeds rack bottom.
- Move rack away from car; warning should no longer claim overlap.
- Move shelf/rack outside garage; status must flag the object as outside.
- Save layout, refresh, load; rack/shelf type, size, location, and heights survive.
- Load a saved layout created before storage upgrades.
- Reset; no stale height inputs.
- Print/save PDF: rack/shelf labels and footprints are present and readable.
- Test 1/2/3 vehicles, stairs and house door, wall resizing, and the old cabinet interactions.

## Known limits
- No browser or real-device verification has been completed.
- Vertical measurements are only a preliminary check; tracks, fixtures, structural loads, and manufacturer mounting requirements are not modeled.
- Garage-wide vehicle height is a user-entered value, not yet per-car.
- Product-specific affiliate SKUs and images are intentionally absent.
- Never claim a guaranteed physical fit.

## Release gate
A real-device pass, screenshot review, and explicit owner authorization are required before merge/publish.
