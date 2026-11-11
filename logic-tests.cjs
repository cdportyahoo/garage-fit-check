const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const nodes={};let active=null,printed=false;
function node(){let value='';return {get value(){return value},set value(v){value=String(v)},textContent:'',disabled:false,style:{},children:[],listeners:{},setAttribute(k,v){this[k]=v},appendChild(x){this.children.push(x)},replaceChildren(){this.children=[]},addEventListener(k,f){this.listeners[k]=f}}}
for(const match of html.matchAll(/<([a-z]+)[^>]*\bid="([^"]+)"[^>]*>/g)){nodes[match[2]]=node();nodes[match[2]].value=match[0].match(/value="([^"]*)"/)?.[1]||''}
vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{document:{getElementById:id=>nodes[id],createElementNS:()=>node(),get activeElement(){return active}},window:{print(){printed=true}},alert(){}});
let checks=0;const equal=(a,b)=>{assert.equal(a,b);checks++};const input=(id,value)=>{active=nodes[id];nodes[id].value=String(value);nodes[id].listeners.input();active=null};const status=()=>nodes.status.textContent;
equal(status(),'REVISE');equal(nodes.message.textContent.includes('17 in at cabinet #2'),true);
for(const id of ['gw','gd','vw','vl','gap','sx','sy','sw','sh']){nodes.reset.onclick();input(id,'');equal(status(),'ENTER DATA');equal(nodes.print.disabled,true)}
for(const id of ['sx','sy','sw','sh']){nodes.reset.onclick();input(id,-1);equal(status(),'ENTER DATA')}
nodes.reset.onclick();input('gap',0);equal(status(),'FIT');input('sx',75);input('sy',22);equal(status(),'STOP');
nodes.reset.onclick();input('vx',230);equal(status(),'STOP');
nodes.reset.onclick();nodes.add.onclick();equal(nodes.selectedName.textContent,'#3');nodes.remove.onclick();equal(nodes.selectedName.textContent,'#1');
nodes.reset.onclick();equal(status(),'REVISE');equal(nodes.sw.value,'18');equal(nodes.print.disabled,false);nodes.print.onclick();equal(printed,true);
console.log(`${checks} logic checks passed. Browser/touch/print rendering require separate browser tests.`);
