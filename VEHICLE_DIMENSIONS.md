# Garage Fit Check 10.11

Restores the 5.2 visual feature set requested by Chris: vehicle examples for sedan (73×190 in), SUV (79×195), pickup (81×232) and full-size van (81×237); distinct overhead illustrations; dimensions alongside the car; and live left/right/front/door-end wall-gap values.

Example dimensions are not manufacturer specifications. Users can edit actual measurements including mirrors. Cabinet clearance remains independently checked; wall-gap arrows do not represent unobstructed walking routes. Print includes the drawn dimensions and wall-gap summary.

A stable interaction overlay and existing pointer handling are unchanged. Existing v1 saved layouts remain readable. New saves retain vehicle type and the dimensions toggle. Switching presets preserves the current position where it fits, clamps it into the garage where possible, and still flags an oversized vehicle as STOP.

109 minimal-DOM logic checks pass. Automated browser suite updated for new vehicle rendering but not executed locally. Device Safari and PDF rendering still need verification for this version.
