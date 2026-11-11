const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const nodes={};let active=null,printed=false;let saved=null,storageBlocked=false;const localStorage={setItem(k,v){if(storageBlocked)throw Error('blocked');saved=v},getItem(){if(storageBlocked)throw Error('blocked');return saved}};
function node(){let value='';return {get value(){return value},set value(v){value=String(v)},textContent:'',disabled:false,style:{},children:[],listeners:{},setAttribute(k,v){this[k]=v},appendChild(x){this.children.push(x)},replaceChildren(){this.children=[]},addEventListener(k,f){this.listeners[k]=f}}}
for(const match of html.matchAll(/<([a-z]+)[^>]*\bid="([^"]+)"[^>]*>/g)){nodes[match[2]]=node();nodes[match[2]].value=match[0].match(/value="([^"]*)"/)?.[1]||''}
vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{localStorage,document:{getElementById:id=>nodes[id],createElementNS:()=>node(),get activeElement(){return active}},window:{print(){printed=true}},alert(){}});
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
const drawing=nodes.drawing;drawing.setPointerCapture=()=>{};drawing.getScreenCTM=()=>({inverse(){return {}}});drawing.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return {x:this.x,y:this.y}}});
const fire=(kind,x,y,id=7)=>drawing.listeners[kind]({clientX:x,clientY:y,pointerId:id,target:{closest(selector){return selector==='.vehicle'?{}:null}},preventDefault(){}});
fire('pointerdown',200,200);fire('pointermove',170,220,8);equal(nodes.vx.value,'110.5');
fire('pointermove',170,220);equal(Number(nodes.vx.value)<110.5,true);equal(Number(nodes.vy.value)>34.5,true);
fire('pointermove',-10000,-10000);equal(nodes.vx.value,'0');equal(nodes.vy.value,'0');
fire('pointermove',10000,10000);equal(nodes.vx.value,'221');equal(nodes.vy.value,'69');
fire('pointerup',10000,10000);fire('pointermove',100,100);equal(nodes.vx.value,'221');
nodes.save.onclick();nodes.reset.onclick();nodes.load.onclick();equal(nodes.vx.value,'221');equal(nodes.vy.value,'69');
nodes.reset.onclick();let prevented=0;const target=node();target.closest=selector=>selector.includes('vehicle')?{}:null;target.removeEventListener=(k,f)=>{if(target.listeners[k]===f)delete target.listeners[k]};
const touch=(x,y,id=42)=>({changedTouches:[{identifier:id,clientX:x,clientY:y}],target,cancelable:true,preventDefault(){prevented++}});
drawing.listeners.pointerdown({pointerType:'touch'});
drawing.listeners.touchstart(touch(200,200));equal(prevented,1);
// Native move continues on original target after render replaces SVG content.
target.listeners.touchmove(touch(200,240));equal(Number(nodes.vy.value)>34.5,true);equal(prevented,2);
target.listeners.touchmove(touch(200,10000));equal(nodes.vy.value,'69');
target.listeners.touchend(touch(200,10000));equal(target.listeners.touchmove,undefined);equal(target.listeners.touchcancel,undefined);
drawing.listeners.touchstart(touch(200,200));target.listeners.touchmove(touch(200,-10000));equal(nodes.vy.value,'0');target.listeners.touchcancel(touch(200,-10000));equal(target.listeners.touchmove,undefined);
console.log(`${checks} logic checks passed. Safari touch scrolling still requires device verification.`);
