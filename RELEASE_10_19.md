# Version 10.19

- Up to 20 named browser-local saved plans. Saving a new plan never replaces another; explicit update/delete controls require confirmation. Duplicate names gain a suffix.
- Legacy v1 and v2 single-layout saves migrate once to a named plan. The original storage entry remains untouched. Corrupt collection data disables new saving to prevent overwriting unreadable data; storage quota failures retain existing saves.
- A/B comparison shows two selected saved plans side by side, including dimensions, status, car/cabinet/steps counts. Each illustration scales to its own panel. Comparing restores the working layout. On narrow screens, swipe the comparison horizontally. Visible comparisons are included in print output.
- Movable/resizable steps footprints share the existing drag handlers and collision/gap checks. A house-door marker aligns on a chosen wall; width and step direction are editable. Steps and door settings persist in named saves and appear in print reports. Markers do not simulate door swings, stair construction or code compliance.

Validation: JavaScript syntax; executable storage/model tests covering save isolation, reload migration, reset/load, update/delete, malformed data, storage failure, 3-car restoration and step resize; browser checks for independent saves, comparison content, state restoration, step overlap warnings and door-wall settings. Physical iPhone Safari touch and actual printer behavior require device confirmation.
