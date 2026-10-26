import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {decodeAstro} from './reference-literals.mjs';
await mkdir('qa/tool-reference',{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const paths={tank:'/tools/tank/',buildings:'/tools/building/',equipment:'/equipment/',heroes:'/heroes/',caravan:'/tools/caravan/',exp:'/tools/hero-exp/',lucky:'/tools/lucky-discounter/',exploration:'/tools/exploration/'};
const result={};
try{for(const[id,path]of Object.entries(paths)){
 const p=await browser.newPage({viewport:{width:1440,height:1100}});
 await p.goto('https://wild-hoggs.com/ko'+path,{waitUntil:'networkidle'});
 const islands=await p.locator('astro-island[props]').evaluateAll(els=>els.map(e=>({component:e.getAttribute('component-url'),props:e.getAttribute('props')})));
 const props={};for(const island of islands)try{props[island.component]=Object.fromEntries(Object.entries(JSON.parse(island.props)).map(([k,v])=>[k,decodeAstro(v)]));}catch{}
 const images=()=>p.locator('img,svg image').evaluateAll(els=>els.map(e=>({src:e.getAttribute('src')||e.getAttribute('href')||e.getAttribute('xlink:href'),alt:e.getAttribute('alt')||''})).filter(x=>x.src));
 result[id]={path,props,images:await images(),buttons:await p.getByRole('button').allTextContents(),text:(await p.locator('body').innerText()).slice(0,26000)};
 await p.screenshot({path:'qa/tool-reference/'+id+'.png'});
 if(id==='tank'){for(const[label,key]of [['레벨업','level'],['개조','mods'],['외장 모듈','modules'],['플러그인','plugins']]){const button=p.getByRole('button',{name:label,exact:true});if(await button.count()){await button.first().click();await p.waitForTimeout(150);await p.screenshot({path:'qa/tool-reference/tank-'+key+'.png'});result[id][key]={images:await images(),buttons:await p.getByRole('button').allTextContents(),text:(await p.locator('body').innerText()).slice(-18000)};}}}
 console.log(id,'components:',Object.keys(props).filter(k=>!/Nav|Auth|Clock|Toast/.test(k)),'buttons:',result[id].buttons.slice(0,16));
 await p.close();
}await writeFile('qa/tool-reference/snapshots.json',JSON.stringify(result));}finally{await browser.close();}
