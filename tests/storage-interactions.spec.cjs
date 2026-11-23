// Run with: npx playwright test tests/storage-interactions.spec.cjs
// Requires Playwright and a local static server: python3 -m http.server 8000
const { test, expect } = require('@playwright/test');
const base = process.env.GARAGE_TEST_URL || 'http://127.0.0.1:8000/';
for (const kind of ['Cabinet','Shelf','Rack']) {
  test(kind + ' can be added, moved and resized on an iPhone viewport', async ({ browser }) => {
    const context = await browser.newContext({ viewport: {width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:3 });
    const page = await context.newPage();
    await page.goto(base);
    await page.locator('#add').click();
    await page.locator('#add'+kind).click();
    const read = () => page.evaluate(() => {
      const u=units.find(x=>x.id===selected);
      return {id:u.id,x:u.x,y:u.y,w:u.w,h:u.h};
    });
    const before=await read();
    const point=await page.evaluate(() => {
      const u=units.find(x=>x.id===selected), b=bounds(), svg=document.querySelector('#drawing');
      const p=svg.createSVGPoint();p.x=b.x+(u.x+u.w/2)*b.s;p.y=b.y+(u.y+u.h/2)*b.s;
      const q=p.matrixTransform(svg.getScreenCTM());return {x:q.x,y:q.y};
    });
    await page.evaluate(({x,y}) => {
      const surface=document.querySelector('#interaction');
      const touch=(identifier,clientX,clientY)=>({identifier,clientX,clientY});
      const fire=(type,touches,changedTouches)=>{const ev=new Event(type,{bubbles:true,cancelable:true});
        Object.defineProperties(ev,{touches:{value:touches},changedTouches:{value:changedTouches}});surface.dispatchEvent(ev)};
      const a=touch(41,x,y),b=touch(41,x+35,y+30);
      fire('touchstart',[a],[a]);fire('touchmove',[b],[b]);fire('touchend',[],[b]);
    },point);
    const moved=await read();
    expect(moved.x!==before.x || moved.y!==before.y).toBeTruthy();
    await page.locator('#resizeMode').click();
    const center=await page.evaluate(() => {const u=units.find(x=>x.id===selected),b=bounds(),svg=document.querySelector('#drawing'),p=svg.createSVGPoint();p.x=b.x+(u.x+u.w/2)*b.s;p.y=b.y+(u.y+u.h/2)*b.s;const q=p.matrixTransform(svg.getScreenCTM());return {x:q.x,y:q.y}});
    await page.evaluate(({x,y})=>{const surface=document.querySelector('#interaction');const t=(clientX,clientY)=>({identifier:42,clientX,clientY});const fire=(type,touches,changedTouches)=>{const ev=new Event(type,{bubbles:true,cancelable:true});Object.defineProperties(ev,{touches:{value:touches},changedTouches:{value:changedTouches}});surface.dispatchEvent(ev)};const a=t(x,y),b=t(x+35,y+30);fire('touchstart',[a],[a]);fire('touchmove',[b],[b]);fire('touchend',[],[b])},center);
    const resized=await read();
    expect(resized.w!==moved.w || resized.h!==moved.h).toBeTruthy();
    await context.close();
  });
}
