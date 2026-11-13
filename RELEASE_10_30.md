# Garage Fit Check 10.30

Fix page jumps when selecting stairs, cabinets and standalone doors.

- Move entry wall controls below the drawing, so showing/hiding them does not displace the drawing.
- Use a short, consistently sized selection hint and reserve space for fit messages.
- Disable browser scroll anchoring for the planner workspace/page to prevent changing detail-panel heights from shifting the viewport.

Validation: existing layout-storage suite passes. Browser QA reproduced a 127 px anchoring jump before the final CSS correction. After correction, five selection/drag position measurements remained identical (drawing top 97.921875 px; scrollY 1560 px), including selecting Cabinet 1, selecting stairs, dragging the cabinet and dragging the stairs. Physical iPhone testing remains a device check.
