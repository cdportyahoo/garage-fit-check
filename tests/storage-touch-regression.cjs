// Storage planner drag/resize regression checks. Run: node tests/storage-touch-regression.cjs
const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname, '..', 'index.html'), 'utf8');
const checks = [
  ['mouse drag starts', /addEventListener\('pointerdown',[\s\S]*?beginDrag\(e\)/],
  ['mouse drag moves', /addEventListener\('pointermove',[\s\S]*?moveDrag\(e\)/],
  ['mouse drag ends', /pointerup','pointercancel','lostpointercapture/],
  ['touch drag starts', /addEventListener\('touchstart',[\s\S]*?beginDrag\(/],
  ['touch drag moves', /addEventListener\('touchmove',[\s\S]*?moveDrag\(/],
  ['touch drag ends', /addEventListener\('touchend',finishTouch/],
  ['touch cancellation handled', /addEventListener\('touchcancel',finishTouch/],
  ['resizing handled', /drag\.mode==='resize'|'resize':\s*'move'|cabinetMode==='resize'/],
  ['movement clamped to garage', /drag\.mode==='move'[\s\S]*?clamp\(/],
  ['resize clamped to garage', /u\.w=Math\.round\(clamp\([\s\S]*?u\.h=Math\.round\(clamp\(/],
  ['pinch gesture handled', /function startPinch\(/],
  ['blur cancels drag', /addEventListener\('blur',[\s\S]*?endDrag\(/]
];
for (const [name, pattern] of checks) { assert.match(html, pattern, name); console.log('PASS:', name); }
console.log('All', checks.length, 'static interaction checks passed. Browser/device tests still required.');
