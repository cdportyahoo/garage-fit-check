# Version 10.6.1 testing

Run `node logic-tests.cjs`: 33 checks passed on 2026-11-11 using a minimal DOM harness. Covers default clearance, invalid measurements, print disabling, collisions, boundaries, add/remove and Reset. This is not browser verification.

Default closest clearance is sqrt(7² + 15²) = 16.55 inches to cabinet #2 (displayed as 17 inches); front-wall clearance is 22 inches.

Browser checks: install Playwright (`npm install --no-save playwright`), then run `node browser-tests.cjs`. Defaults to /usr/bin/chromium; override CHROMIUM_PATH if needed. Generates print-390.pdf and print-1280.pdf. Browser suite is UNVERIFIED: local Chromium launch was blocked by environment socket permissions. Check pointer drag/resize, Chromium touch events, mobile overflow, warnings, Reset and print output. Real iPhone Safari and actual print-preview visual review remain required.

Changes: invalid cabinet measurements now show ENTER DATA rather than silently using old measurements; invalid layouts disable printing; print stylesheet hides controls; viewport permits zoom; visible version is 10.6.1.

Next: run browser suite in a browser-enabled environment, inspect generated PDFs, verify touch dragging/resizing on Safari, then address any failures before publication. Version 9/main is unchanged.
