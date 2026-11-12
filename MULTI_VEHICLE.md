# Version 10.16 — multiple vehicles

Adds one-, two- and three-car example layouts with independently editable Car A/B/C. Each vehicle has a type, footprint and position. Touching any car selects it and uses the existing stable touch surface. Selected-car wall dimensions and inter-car arrows appear on the drawing; all vehicles are included in collision, clearance and printable measurement checks.

Garage-count buttons apply editable example widths (240/288/432 inches) and redistribute vehicles. Right-wall cabinets follow that wall; other cabinets retain their coordinates. Reset restores the example for the current count. Center selected car centers it within its equal-width bay. These are planning examples, not standard garage sizes.

Save format 2 stores all active vehicles and selected vehicle. Existing format-1 single-car saves remain readable under the existing storage key. Saving still replaces one local layout. Print report includes each vehicle's label, example type and actual dimensions. Only the selected vehicle's detailed dimensions are overlaid to avoid clutter.

Validation: 184 Node logic checks passed, including existing touch/cabinet regressions, independent types and positions, collision and gap checks, multi-car save/reset/load, malformed data rejection, legacy migration and touch-dragging a nonselected car without page-style changes. iPhone Safari multi-car touch behavior still needs user confirmation.

Live browser validation: version 10.16 visible; three vehicles rendered; changed Car B to pickup and front position 12, then saved/reset/loaded and confirmed its type, dimensions and position with separate A/B/C report rows. No desktop horizontal overflow. Directly dragging nonselected Car A selected and moved A, preserved all three cars and raised STOP when moved into cabinet #2. The mobile-specific touch path passed the Node event regression; actual iPhone Safari confirmation is pending. PDF table contents were checked; a new physical print was not tested.
