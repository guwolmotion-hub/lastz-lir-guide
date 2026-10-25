import { chromium } from 'playwright';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { decodeAstro } from './reference-literals.mjs';
const reference=JSON.parse(await readFile('src/research-reference.json','utf8'));
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
await mkdir('public/research',{recursive:true});
const urls=new Map(), visuals={};
const asset=url=>{if(!url)return null;const normalized=new URL(url,'https://wild-hoggs.com').href;const file='research/'+createHash('sha1').update(normalized).digest('hex').slice(0,14)+'.webp';urls.set(normalized,file);return file;};
try {
  const context=await browser.newContext({javaScriptEnabled:false});
  await context.route('**/*',route=>route.request().resourceType()==='document'?route.continue():route.abort());
  let cursor=0;
  await Promise.all(Array.from({length:3},async()=>{while(cursor<reference.trees.length){const tree=reference.trees[cursor++],page=await context.newPage();await page.goto('https://wild-hoggs.com/ko/tools/research/'+tree.id+'/',{waitUntil:'domcontentloaded'});const raw=JSON.parse(await page.locator('astro-island[component-url*="ResearchCategoryCalculator"]').getAttribute('props'));const p=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,decodeAstro(v)]));visuals[tree.id]={image:asset(p.categoryImageSrc),nodes:Object.fromEntries(p.categoryData.technologies.map(n=>[n.id,{icon:asset(p.iconMap[n.icon]),bonuses:n.bonuses||[]}]))};await page.close();}}));
} finally {await browser.close();}
let downloaded=0;const entries=[...urls],failed=[];let cursor=0;
await Promise.all(Array.from({length:6},async()=>{while(cursor<entries.length){const[url,file]=entries[cursor++];try{const r=await fetch(url);if(!r.ok)throw Error(r.status);await writeFile('public/'+file,Buffer.from(await r.arrayBuffer()));downloaded++;}catch{failed.push(file);}}}));
for(const tree of Object.values(visuals)){if(failed.includes(tree.image))tree.image=null;for(const n of Object.values(tree.nodes))if(failed.includes(n.icon))n.icon=null;}
await writeFile('src/research-visuals.json',JSON.stringify(visuals));
console.log('Research visuals:',Object.keys(visuals).length,'trees,',downloaded,'local assets;',failed.length,'unavailable.');
