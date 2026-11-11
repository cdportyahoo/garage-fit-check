const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
 const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
 let checks=0;
 for (const width of [390,1280]) {
  const page=await browser.newPage({viewport:{width,height:900},hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file://'+path.join(__dirname,'index.html'));
  const status=()=>page.locator('#status').textContent();
  const fill=async(id,value)=>page.locator('#'+id).fill(String(value));
  assert.equal(await status(),'REVISE');checks++;
  assert.match(await page.locator('#message').textContent(),/13 in at cabinet #2/);checks++;
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);checks++;
  await fill('sw','');assert.equal(await status(),'ENTER DATA');assert.equal(await page.locator('#print').isDisabled(),true);checks++;
  await fill('sw',18);await fill('sx',-1);assert.equal(await status(),'ENTER DATA');checks++;
  await page.locator('#reset').click();await fill('gap',0);assert.equal(await status(),'FIT');checks++;
  await fill('sx',75);await fill('sy',22);assert.equal(await status(),'STOP');
  assert.equal(await page.locator('.vehicle-footprint').getAttribute('stroke'),'#b32245');checks++;
  await page.locator('#reset').click();await fill('vx',230);assert.equal(await status(),'STOP');checks++;
  await page.locator('#reset').click();await fill('gw','');assert.equal(await status(),'ENTER DATA');checks++;
  await page.locator('#reset').click();await page.locator('#add').click();assert.equal(await page.locator('#selectedName').textContent(),'#3');await page.locator('#remove').click();assert.equal(await page.locator('#scene .unit').count(),2);checks++;
  // Browser mouse pointer exercises the same SVG capture and coordinate conversion as touch.
  await page.locator('#drawing').scrollIntoViewIfNeeded();const cabinet=page.locator('#scene .unit').first();let box=await cabinet.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+15);await page.mouse.down();await page.mouse.move(box.x+box.width/2-25,box.y+35,{steps:5});await page.mouse.up();assert.ok(Number(await page.locator('#sx').inputValue())<218);checks++;
  const oldWidth=Number(await page.locator('#sw').inputValue());box=await page.locator('.handle').boundingBox();await page.mouse.move(box.x+9,box.y+9);await page.mouse.down();await page.mouse.move(box.x+19,box.y+19,{steps:5});await page.mouse.up();assert.ok(Number(await page.locator('#sw').inputValue())>oldWidth);checks++;
  // Real touch events through Chromium's input pipeline.
  await page.locator('#reset').click();await page.locator('#drawing').scrollIntoViewIfNeeded();box=await cabinet.boundingBox();const client=await page.context().newCDPSession(page);const touch=async(type,x,y)=>client.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y}]});
  const viewportBefore=await page.evaluate(()=>({scrollY,top:document.getElementById('drawing').getBoundingClientRect().top}));
  await touch('touchStart',box.x+box.width/2,box.y+15);assert.equal(await page.evaluate(()=>document.body.style.position),'fixed');checks++;
  await touch('touchMove',box.x+box.width/2-20,box.y+35);assert.ok(Math.abs(await page.evaluate(()=>document.getElementById('drawing').getBoundingClientRect().top)-viewportBefore.top)<1);checks++;
  await touch('touchEnd');assert.notEqual(await page.evaluate(()=>document.body.style.position),'fixed');assert.equal(await page.evaluate(()=>scrollY),viewportBefore.scrollY);checks++;assert.ok(Number(await page.locator('#sx').inputValue())<218);checks++;
  await page.evaluate(()=>{window.print=()=>{window.printCalled=true}});await page.locator('#print').click();assert.equal(await page.evaluate(()=>window.printCalled),true);checks++;
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('.controls').isVisible(),false);await page.pdf({path:path.join(__dirname,`print-${width}.pdf`),format:'A4'});checks++;
  assert.deepEqual(errors,[]);checks++;await page.close();
 }
 await browser.close();console.log(`${checks} browser checks passed (390px mobile and 1280px desktop).`);
})().catch(e=>{console.error(e);process.exitCode=1});
