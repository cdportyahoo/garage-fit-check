# Layout backup and restore — 10.45 preview

Status: draft, not published. Live baseline remains 10.44.

## Accepted baseline
On 2026-11-13, Chris confirmed all stairs look great and authorized moving to the next development step. Preserve the approved stair, door and rail geometry. Automated checks compare both side doors with the approved preview.

## Change
Download all saved layouts in a JSON backup and restore that file on the same or another device. Save current changes before downloading. Restore merges plans without replacing existing saves, skips duplicate layouts, and rejects invalid or oversized files. The 20-plan limit is enforced atomically.

## Validation
- Existing layout, vehicle, entry, drag, storage and dimension tests pass.
- Backup tests pass for complex three-car/stair round trips, preservation of existing saves, duplicate prevention, invalid-file rejection, storage failures and capacity limits.
- Browser download and file-picker restore passed: a downloaded three-car layout with stairs was restored alongside a separate existing plan.
- Approved drawing and drag source is unchanged.
- Real iPhone download/Files picker behavior has not yet been tested by Chris.

## Release
Review the preview with Chris before merging or publishing.
