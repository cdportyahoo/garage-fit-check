# Cabinet controls — 10.15

Address the user's report that cabinet 1 feels stuck to the wall and selection between 1 and 2 is difficult on iPhone.

- Numbered buttons directly select every cabinet, update exact fields and return to Move mode.
- Separate Move and Resize controls. Move is the default; the resize handle is shown only in Resize mode. In Resize mode, the selected cabinet can be resized by dragging its body or handle.
- Enlarge narrow cabinet targets to at least 44 CSS pixels using the SVG screen transform. Rank nearby candidates by distance. Direct cabinet hits take precedence, while expanded targets do not steal direct vehicle hits.
- Preserve cabinet size during movement and keep original floor-boundary clamping.
- Retain 10.14.1 native touch prevention without page positioning or scrollTo calls. Artwork and saved-layout schema unchanged.

146 logic checks pass, including direct selection, touch outside a narrow footprint, moving from the former resize corner without changing size, explicit resize and mode cleanup, plus prior native drag and saved-layout checks. Device Safari verification remains required. Browser suite updated for explicit Resize mode; not run locally.
