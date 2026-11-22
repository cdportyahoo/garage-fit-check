const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const script=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join('\n');
assert(script.length>1000,'Planner JavaScript missing');

// Catch missing DOM targets before mobile testing. The planner uses a $ helper for ID lookups.
const ids=new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
const refs=[...script.matchAll(/\$\(['"]([A-Za-z][\w-]*)['"]\)/g)].map(m=>m[1]);
const missing=[...new Set(refs)].filter(id=>!ids.has(id));
assert.deepEqual(missing,[],'JavaScript references missing HTML element IDs');
const duplicateIds=[...ids].filter(id=>(html.match(new RegExp('\\bid=["\\x27]'+id+'["\\x27]','g'))||[]).length>1);
assert.deepEqual(duplicateIds,[],'Duplicate HTML element IDs');

new vm.Script(script,{filename:'garage-fit-check.js'});
for(const id of ['add','storageMenu','addCabinet','addShelf','addRack','storageHeightDetails','ceilingHeight','vehicleHeight','mountHeight','storageThickness','heightCheck','drawing','save','load','print']){
 assert(html.includes('id="'+id+'"'),'Missing control: '+id);
}
assert(script.includes("!['cabinet','steps','rack','shelf'].includes(u.kind)"),'Saved layout validator does not accept storage kinds');
assert(script.includes('verticalWarning'),'Missing unsafe height status check');
assert(script.includes('mount+thick>ceiling'),'Ceiling overflow must warn independently of vehicle height');
assert(script.includes('u.mountHeight+thick>ceiling'),'Global ceiling overflow must be checked');
assert(script.includes('storageThickness:6'),'Overhead rack default thickness missing');
assert(script.includes('storageThickness:2'),'Wall shelf default thickness missing');
assert(script.includes('Math.min(10,g.w-size.w)'),'New storage must be positioned within garage width when possible');
assert(script.includes('Math.min(10,g.h-size.h)'),'New storage must be positioned within garage depth when possible');
assert(script.includes('Number.isFinite(ceiling)&&ceiling>0'),'Invalid ceiling height safeguard missing');
assert(script.includes("u.kind!=='rack'||"),'Shelf-specific height handling missing');
assert(script.includes('verticalUnknown'),'Missing incomplete height status check');
assert(script.includes('const overlapsVehicle='),'Rack height check must detect actual vehicle overlap');
assert(script.includes('!overlapsVehicle||'),'Vehicle height should only be mandatory when rack overlaps vehicle');
assert(script.includes('elevatedOutside'),'Missing elevated storage bounds check');
assert(script.includes('floorUnits'),'Missing separate floor collision set');
assert(script.includes("data.verticalMeasurements?.ceilingHeight??''"),'Saved ceiling height not restored');
assert(script.includes("data.verticalMeasurements?.vehicleHeight??''"),'Saved vehicle height not restored');
console.log('PASS: JS syntax, storage controls, saved-layout hooks, and clearance safeguards');
