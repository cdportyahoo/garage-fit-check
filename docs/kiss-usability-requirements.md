# KISS usability contract — Garage Fit Check storage upgrade

The owner-approved design principle is **Keep It Simple, Sexy (KISS)**. This is a release requirement, not a decorative preference.

## Default experience (mobile first)
1. Show the garage drawing immediately, as large as practical.
2. One **Add Storage** button opens three plain-language choices: **Cabinet**, **Wall Shelf**, **Overhead Rack**.
3. Selecting a choice creates a visible, selected object in a sensible open area; user can drag it with one finger.
4. Dragging must not scroll or jump the page. Touch targets should be comfortably finger-sized.
5. A single obvious corner handle resizes the selected object. Existing move/resize behavior must remain intact.
6. The only always-visible object actions are **Move**, **Resize**, and **Remove**. Avoid showing a form full of dimensions by default.
7. A small **Details** disclosure exposes exact width/depth/height, mounting elevation, and other advanced options.
8. Keep labels understandable: **Width**, **Depth**, **Height from floor**, **Ceiling height**, **Vehicle height**. No technical jargon.
9. New objects must have visually distinct footprints and clear labels. Overhead rack footprints should be translucent/dashed so users do not confuse them with floor cabinets.
10. Never claim an overhead rack fits unless vertical clearance inputs are complete; show **Height not checked** otherwise.

## Non-regression checks
- One-finger car/cabinet/stairs dragging on iPhone Safari.
- Resize, reset, save/load, print-to-PDF and existing dimensions.
- Garage wall resize and door placement must not regress.
- Keyboard/touch focus and selection remain predictable.
- Loading older saved layouts continues to work.

## Acceptance tests
- New visitor can add and move a cabinet in under 30 seconds without reading instructions.
- New visitor can add an overhead rack and understand it is mounted above the floor.
- A novice can find precise sizing only when needed, without facing an intimidating control panel.
- No change goes to the live main branch without owner review and explicit approval.
