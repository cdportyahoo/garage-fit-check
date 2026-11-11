# Garage Fit Check 10.9 release review

Status: release candidate on Version-10-development; not published. main/Version 9 unchanged.

## Accepted on user's iPhone in Safari (10.8.3)

- Car drag without page scrolling, cabinet dragging, and centering.
- Manual car positioning to the bottom of the garage.
- Save, Reset, and Load restore vehicle and cabinet positions.
- Earlier mobile checks confirmed cabinet addition, save persistence after closing Safari, and PDF generation. No physical printer available.
- Touch dragging failed in the ChatGPT in-app browser; direct Safari succeeded. Instructions now recommend direct Safari on iPhone.

## 10.9 review changes

- Clarified cabinet-only resizing, measurement entry, Reset, saved-layout replacement and browser-local storage.
- Explained FIT / REVISE / STOP without promising door swing, walking access or installation suitability.
- Added print-only exact measurements for the garage, desired vehicle gap, car and every cabinet, including position, width and depth/length.
- Removed editing controls from the printed report; retained status, diagram and planning limitations.
- Pointer/touch handling unchanged from accepted 10.8.3.

## Validation

69 logic checks pass with `node logic-tests.cjs`, including complete report rows, decimals, add/remove, save/load and invalid-data suppression. Minimal DOM harness; not rendering verification. Local Chromium execution remains blocked by host socket permissions. Existing browser tests remain a separate unexecuted suite.

## Remaining before release

Open 10.9 directly in Safari, save a PDF containing at least three cabinets and confirm all rows are readable, the diagram is visible, and no text is clipped across pages. Recheck a quick drag to guard against accidental regression. Do not publish until the revised PDF is reviewed. Physical printing remains untested.
