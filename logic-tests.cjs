const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const testBody={style:{position:'relative',top:'',left:'',width:'',overflow:'',touchAction:'',overscrollBehavior:''}},testRoot={style:{overflow:'visible',overscrollBehavior:'auto',scrollBehavior:''}},testEvents={};let restoredScroll=null;const testWindow={scrollX:0,scrollY:560,scrollTo(x,y){restoredScroll=[x,y]},addEventListener(k,f){testEvents[k]=f},print(){printed=true}};const nodes={};let active=null,printed=false;let saved=null,storageBlocked=false;const localStorage={setItem(k,v){if(storageBlocked)throw Error('blocked');saved=v},getItem(){if(storageBlocked)throw Error('blocked');return saved}};
function node(){let value='';return {get value(){return value},set value(v){value=String(v)},textContent:'',disabled:false,style:{},children:[],listeners:{},setAttribute(k,v){this[k]=v},appendChild(x){this.children.push(x)},replaceChildren(){this.children=[]},addEventListener(k,f){this.listeners[k]=f}}}
for(const match of html.matchAll(/<([a-z]+)[^>]*\bid="([^"]+)"[^>]*>/g)){nodes[match[2]]=node();nodes[match[2]].value=match[0].match(/value="([^"]*)"/)?.[1]||''}
vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{localStorage,document:{body:testBody,documentElement:testRoot,addEventListener(k,f){testEvents[k]=f},getElementById:id=>nodes[id],createElementNS:()=>node(),get activeElement(){return active}},window:testWindow,alert(){}});
let checks=0;const equal=(a,b)=>{assert.equal(a,b);checks++};const input=(id,value)=>{active=nodes[id];nodes[id].value=String(value);nodes[id].listeners.input();active=null};const status=()=>nodes.status.textContent;
equal(status(),'REVISE');equal(nodes.message.textContent.includes('13 in at cabinet #2'),true);
for(const id of ['gw','gd','vw','vl','gap','sx','sy','sw','sh']){nodes.reset.onclick();input(id,'');equal(status(),'ENTER DATA');equal(nodes.print.disabled,true)}
for(const id of ['sx','sy','sw','sh']){nodes.reset.onclick();input(id,-1);equal(status(),'ENTER DATA')}
nodes.reset.onclick();input('gap',0);equal(status(),'FIT');input('sx',75);input('sy',22);equal(status(),'STOP');
nodes.reset.onclick();input('vx',230);equal(status(),'STOP');
nodes.reset.onclick();nodes.add.onclick();equal(nodes.selectedName.textContent,'#3');nodes.remove.onclick();equal(nodes.selectedName.textContent,'#1');
nodes.reset.onclick();equal(status(),'REVISE');equal(nodes.sw.value,'18');equal(nodes.print.disabled,false);nodes.print.onclick();equal(printed,true);
nodes.load.onclick();equal(nodes.saveMessage.textContent,'No saved layout in this browser yet.');
input('gw',300);input('sx',100);nodes.save.onclick();equal(JSON.parse(saved).measurements.gw,300);
nodes.reset.onclick();nodes.load.onclick();equal(nodes.gw.value,'300');equal(nodes.sx.value,'100');
nodes.add.onclick();equal(nodes.selectedName.textContent,'#3');
input('sw','');equal(nodes.save.disabled,true);nodes.reset.onclick();
saved='broken';nodes.load.onclick();equal(nodes.gw.value,'240');equal(nodes.saveMessage.textContent.includes('kept'),true);
saved=JSON.stringify({version:1,measurements:{},units:[]});nodes.load.onclick();equal(nodes.gw.value,'240');
storageBlocked=true;nodes.save.onclick();equal(nodes.saveMessage.textContent.includes('could not save'),true);nodes.load.onclick();equal(nodes.gw.value,'240');
storageBlocked=false;
nodes.reset.onclick();equal(nodes.vx.value,'80.5');equal(nodes.vy.value,'34.5');
input('gw',300);nodes.centerCar.onclick();equal(nodes.vx.value,'110.5');
const drawing=nodes.drawing;drawing.setPointerCapture=()=>{};nodes.interaction.setPointerCapture=()=>{};drawing.getScreenCTM=()=>({inverse(){return {}}});drawing.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return {x:this.x,y:this.y}}});
const fire=(kind,x,y,id=7)=>drawing.listeners[kind]({clientX:x,clientY:y,pointerId:id,target:{closest(selector){return selector==='.vehicle'?{}:null}},preventDefault(){}});
fire('pointerdown',200,200);fire('pointermove',170,220,8);equal(nodes.vx.value,'110.5');
fire('pointermove',170,220);equal(Number(nodes.vx.value)<110.5,true);equal(Number(nodes.vy.value)>34.5,true);
fire('pointermove',-10000,-10000);equal(nodes.vx.value,'0');equal(nodes.vy.value,'0');
fire('pointermove',10000,10000);equal(nodes.vx.value,'221');equal(nodes.vy.value,'69');
fire('pointerup',10000,10000);fire('pointermove',100,100);equal(nodes.vx.value,'221');
nodes.save.onclick();nodes.reset.onclick();nodes.load.onclick();equal(nodes.vx.value,'221');equal(nodes.vy.value,'69');
nodes.reset.onclick();const interaction=nodes.interaction;
// The gesture target stays outside the redrawn scene throughout every move.
fire('pointerdown',200,200);fire('pointermove',200,10000);equal(nodes.vy.value,'69');equal(nodes.interaction,interaction);fire('pointerup',200,10000);
nodes.reset.onclick();equal(nodes.reportRows.children.length,3);
equal(nodes.reportRows.children[0].children.map(c=>c.textContent).join('|'),'Car A — SUV|80.5|34.5|79|195');
equal(nodes.reportRows.children[2].children.map(c=>c.textContent).join('|'),'Cabinet #2|8|232|60|18');
nodes.add.onclick();equal(nodes.reportRows.children.length,4);input('sw',53.5);equal(nodes.reportRows.children[3].children[3].textContent,'53.5');
nodes.save.onclick();nodes.reset.onclick();nodes.load.onclick();equal(nodes.reportRows.children.length,4);equal(nodes.reportRows.children[3].children[3].textContent,'53.5');
nodes.remove.onclick();equal(nodes.reportRows.children.length,3);input('gd','');equal(nodes.reportRows.children.length,0);equal(nodes.print.disabled,true);
nodes.reset.onclick();
const findAll=(root,predicate)=>[...(predicate(root)?[root]:[]),...(root.children||[]).flatMap(n=>findAll(n,predicate))];
const texts=()=>findAll(nodes.scene,n=>!!n.textContent).map(n=>n.textContent);
equal(texts().includes('79″ wide'),true);equal(texts().includes('195″ long'),true);equal(nodes.clearLeft.textContent,'80.5″');equal(nodes.clearRear.textContent,'34.5″');
for(const [type,w,h] of [['sedan',73,190],['suv',79,195],['pickup',81,232],['van',81,237]]){nodes['preset-'+type].onclick();equal(nodes.vw.value,String(w));equal(nodes.vl.value,String(h));equal(nodes['preset-'+type]['aria-pressed'],'true');equal(findAll(nodes.scene,n=>n['data-vehicle-type']===type).length,1);equal(texts().includes(w+'″ wide'),true);equal(texts().includes(h+'″ long'),true)}
nodes.save.onclick();nodes.reset.onclick();nodes.load.onclick();equal(nodes['preset-van']['aria-pressed'],'true');equal(nodes.vl.value,'237');
input('vw',83.5);equal(nodes.vehicleNote.textContent.includes('custom measurements'),true);equal(texts().includes('83.5″ wide'),true);
nodes.dimensions.onclick();equal(findAll(nodes.scene,n=>n.class==='dimension-layer').length,0);nodes.save.onclick();nodes.reset.onclick();nodes.load.onclick();equal(nodes.dimensions['aria-pressed'],'false');
// Older saved layouts without vehicle metadata remain readable.
const legacy=JSON.parse(saved);legacy.version=1;delete legacy.vehicles;delete legacy.vehicleCount;delete legacy.activeVehicle;delete legacy.vehicleType;delete legacy.showDimensions;saved=JSON.stringify(legacy);nodes.load.onclick();equal(nodes.dimensions['aria-pressed'],'true');equal(nodes.vw.value,'83.5');
const bad=JSON.parse(saved);bad.vehicleType='constructor';saved=JSON.stringify(bad);nodes.load.onclick();equal(nodes.saveMessage.textContent.includes('kept'),true);
nodes.reset.onclick();equal(nodes['preset-suv']['aria-pressed'],'true');equal(nodes.vw.value,'79');equal(nodes.vy.value,'34.5');
nodes.reset.onclick();
const touchEvent=(type,x,y,id=91)=>({type,changedTouches:[{identifier:id,clientX:x,clientY:y}],cancelable:true,preventDefault(){this.prevented=true}});
const surface=nodes.interaction;surface.setPointerCapture=id=>assert.ok(id>=0);
const bodyBefore=JSON.stringify(testBody.style),rootBefore=JSON.stringify(testRoot.style);
const outside=touchEvent('touchmove',10,10);testEvents.touchmove(outside);equal(outside.prevented,undefined);
const ts=touchEvent('touchstart',200,200);surface.listeners.touchstart(ts);equal(ts.prevented,true);equal(JSON.stringify(testBody.style),bodyBefore);equal(JSON.stringify(testRoot.style),rootBefore);
const documentMove=touchEvent('touchmove',200,240);testEvents.touchmove(documentMove);equal(documentMove.prevented,true);
const tm=touchEvent('touchmove',200,10000);surface.listeners.touchmove(tm);equal(nodes.vy.value,'69');equal(tm.prevented,true);equal(JSON.stringify(testBody.style),bodyBefore);
testEvents.touchend(touchEvent('touchend',200,10000,99));const stillDragging=touchEvent('touchmove',200,9999);testEvents.touchmove(stillDragging);equal(stillDragging.prevented,true);
testEvents.touchend(touchEvent('touchend',200,10000));const after=touchEvent('touchmove',200,10000);testEvents.touchmove(after);equal(after.prevented,undefined);equal(restoredScroll,null);equal(JSON.stringify(testBody.style),bodyBefore);equal(JSON.stringify(testRoot.style),rootBefore);
nodes.reset.onclick();nodes.resizeMode.onclick();surface.listeners.touchstart(touchEvent('touchstart',364,233));surface.listeners.touchmove(touchEvent('touchmove',350,219));equal(Number(nodes.sw.value)<18,true);equal(Number(nodes.sh.value)<96,true);testEvents.touchcancel({type:'touchcancel',changedTouches:[],cancelable:true,preventDefault(){}});const canceled=touchEvent('touchmove',350,219);testEvents.touchmove(canceled);equal(canceled.prevented,undefined);
nodes.reset.onclick();surface.listeners.touchstart(touchEvent('touchstart',200,200));testEvents.blur();const blurred=touchEvent('touchmove',200,240);testEvents.touchmove(blurred);equal(blurred.prevented,undefined);
nodes.reset.onclick();surface.listeners.touchstart(touchEvent('touchstart',200,200));nodes.reset.onclick();equal(nodes.vy.value,'34.5');equal(restoredScroll,null);equal(JSON.stringify(testBody.style),bodyBefore);
nodes.reset.onclick();
const choose=id=>nodes.cabinetChoices.children.find(b=>b['data-cabinet']===String(id)).onclick();
choose(2);equal(nodes.selectedName.textContent,'#2');choose(1);equal(nodes.selectedName.textContent,'#1');equal(nodes.moveMode['aria-pressed'],'true');
// Phone-like narrow cabinet: a touch outside its footprint still grabs it.
const oldCtm=drawing.getScreenCTM;drawing.getScreenCTM=()=>({a:.75,b:0,inverse(){return {}}});
surface.listeners.touchstart(touchEvent('touchstart',370,160));surface.listeners.touchmove(touchEvent('touchmove',338,160));surface.listeners.touchend(touchEvent('touchend',338,160));equal(Number(nodes.sx.value)<218,true);equal(nodes.sw.value,'18');equal(nodes.sh.value,'96');
drawing.getScreenCTM=oldCtm;
// The former resize corner moves the selected cabinet while Move is active.
nodes.reset.onclick();surface.listeners.touchstart(touchEvent('touchstart',364,233));surface.listeners.touchmove(touchEvent('touchmove',340,220));surface.listeners.touchend(touchEvent('touchend',340,220));equal(Number(nodes.sx.value)<218,true);equal(nodes.sw.value,'18');equal(nodes.sh.value,'96');
nodes.resizeMode.onclick();equal(nodes.resizeMode['aria-pressed'],'true');equal(findAll(nodes.scene,n=>n.class==='handle').length,1);choose(2);equal(nodes.moveMode['aria-pressed'],'true');equal(findAll(nodes.scene,n=>n.class==='handle').length,0);
choose(1);nodes.resizeMode.onclick();const beforeW=Number(nodes.sw.value);surface.listeners.touchstart(touchEvent('touchstart',345,160));surface.listeners.touchmove(touchEvent('touchmove',330,150));surface.listeners.touchend(touchEvent('touchend',330,150));equal(Number(nodes.sw.value)<beforeW,true);
nodes.reset.onclick();nodes.add.onclick();equal(nodes.cabinetChoices.children.length,3);equal(nodes.selectedName.textContent,'#3');nodes.remove.onclick();equal(nodes.cabinetChoices.children.length,2);
// Multi-car regression: independent types, positions, collisions, saves and touch movement.
nodes.reset.onclick();nodes.garage2.onclick();equal(nodes.gw.value,'288');equal(nodes.vehicleChoices.children.length,2);equal(findAll(nodes.scene,n=>n.class==='vehicle').length,2);
const carChoice=i=>nodes.vehicleChoices.children.find(b=>b['data-car']===String(i)).onclick();
carChoice(1);equal(nodes.vehicleHeading.textContent,'Car B');nodes['preset-pickup'].onclick();input('vy',12);input('vw',85);nodes.save.onclick();let multi=JSON.parse(saved);equal(multi.version,2);equal(multi.vehicles[1].type,'pickup');equal(multi.vehicles[1].w,85);equal(multi.vehicles[0].type,'suv');
carChoice(0);equal(nodes.vw.value,'79');equal(nodes.vy.value,'34.5');nodes.reset.onclick();equal(nodes.vehicleChoices.children.length,2);nodes.load.onclick();equal(nodes.vehicleHeading.textContent,'Car B');equal(nodes.vw.value,'85');equal(nodes.vy.value,'12');equal(nodes.reportRows.children[1].children[0].textContent,'Car B — Pickup truck');
// Vehicle-to-vehicle collisions and gaps must affect overall status.
carChoice(0);input('vx',100);input('vy',20);carChoice(1);input('vx',100);input('vy',20);equal(status(),'STOP');
input('vx',180);input('gap',10);equal(status(),'REVISE');equal(nodes.message.textContent.includes('Car A / Car B'),true);
// Three cars survive reset/load and report every vehicle.
nodes.garage3.onclick();equal(nodes.gw.value,'432');equal(nodes.vehicleChoices.children.length,3);carChoice(2);nodes['preset-van'].onclick();input('vy',10);nodes.save.onclick();multi=JSON.parse(saved);equal(multi.vehicles.length,3);equal(multi.vehicles[2].type,'van');equal(nodes.reportRows.children.length,5);nodes.reset.onclick();nodes.load.onclick();equal(nodes.vehicleHeading.textContent,'Car C');equal(nodes.vl.value,'237');equal(nodes.vy.value,'10');
// A malformed extra vehicle is rejected without changing the layout.
const corrupt=JSON.parse(saved);corrupt.vehicles[0].w=0;saved=JSON.stringify(corrupt);nodes.load.onclick();equal(nodes.saveMessage.textContent.includes('kept'),true);equal(nodes.vl.value,'237');
// Touch a nonselected car and drag downward without changing the page styles.
nodes.reset.onclick();carChoice(0);const beforeTouchStyle=JSON.stringify(testBody.style);const cWidth=432,cDepth=264,scale=Math.min(340/cWidth,350/cDepth),bx=(420-cWidth*scale)/2,by=48+(360-cDepth*scale)/2;const bX=bx+216*scale,bY=by+132*scale;surface.listeners.touchstart(touchEvent('touchstart',bX,bY));surface.listeners.touchmove(touchEvent('touchmove',bX,bY+15));surface.listeners.touchend(touchEvent('touchend',bX,bY+15));equal(nodes.vehicleHeading.textContent,'Car B');equal(Number(nodes.vy.value)>37,true);equal(JSON.stringify(testBody.style),beforeTouchStyle);equal(restoredScroll,null);
nodes.save.onclick();multi=JSON.parse(saved);equal(multi.activeVehicle,1);equal(multi.vehicles[0].y,34.5);equal(multi.vehicles[1].y,Number(nodes.vy.value));
// Changing count keeps the saved three-car layout available for restoration.
nodes.garage1.onclick();equal(nodes.vehicleChoices.children.length,1);nodes.load.onclick();equal(nodes.vehicleChoices.children.length,3);equal(nodes.vehicleHeading.textContent,'Car B');
console.log(`${checks} logic checks passed, including cabinet selection, enlarged targets, separate Move/Resize, native drag and saved layouts. iPhone confirmation remains required.`);

