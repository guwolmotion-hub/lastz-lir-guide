import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(fs.readFileSync('src/advanced-reference.json','utf8'));
const total=data.research.reduce((s,t)=>s+t.nodes.reduce((x,n)=>x+n.badges.reduce((a,b)=>a+b,0),0),0);
const tree=data.research.find(t=>t.id==='alliance_recognition');
const spent=tree.nodes.find(n=>n.id==='collect-wood').badges.slice(0,5).reduce((a,b)=>a+b,0);
const b=await chromium.launch({channel:'msedge',headless:true});
let views=0;
const value=async(p,scope,key)=>Number((await p.locator(`[data-badge-summary=${scope}] [data-badge-value=${key}]`).innerText()).replace(/\D/g,''));
async function checkLayout(p,label){
 const errors=await p.evaluate(()=>[...document.querySelectorAll('.rs-badge-metrics dd,.rs-badge-inventory strong,.rs-category-badges>strong')].filter(e=>e.getClientRects().length&&(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2)).map(e=>e.textContent));
 assert.deepEqual(errors,[],label);assert.equal(await p.evaluate(()=>document.body.scrollWidth>innerWidth+2),false,label);views++;
}
try {
 for(const width of [360,390,768,1440])for(const lang of ['KO','EN','ES','HI']){
  const p=await b.newPage({viewport:{width,height:1000}}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(process.env.GUIDE_URL||'http://127.0.0.1:5180/');
  await p.getByRole('button',{name:lang,exact:true}).click();await p.locator('[data-guide=research]').click();
  await p.locator('[data-badge-summary=all]').waitFor();
  assert.equal(await value(p,'all','total'),total);assert.equal(await value(p,'all','remaining'),total);assert.equal(await value(p,'all','used'),0);
  assert.equal(await p.locator('.rs-category-badges').count(),21);
  await p.locator('#research-owned-badges-all').fill('10000');
  assert.equal(await value(p,'all','shortfall'),total-10000);
  await checkLayout(p,`${width}/${lang}/overview`);
  if(lang==='KO'&&[390,1440].includes(width))await p.screenshot({path:`qa/badges-overview-${width}.png`,fullPage:true});
  await p.locator('[data-research=alliance_recognition] .rs-category-open').click();
  assert.ok(await p.locator('[data-badge-summary=tree]').isVisible());
  assert.equal(await p.locator('#research-owned-badges-tree').inputValue(),'10000');
  assert.equal(await value(p,'tree','total'),tree.badges);
  await p.locator('[data-node=collect-wood] .rs-node-face').click();await p.locator('#research-node-current').fill('5');await p.keyboard.press('Escape');
  assert.equal(await value(p,'tree','used'),spent);assert.equal(await value(p,'tree','remaining'),tree.badges-spent);
  assert.equal(await value(p,'tree','shortfall'),tree.badges-spent-10000);
  await p.locator('#research-owned-badges-tree').fill(String(tree.badges));assert.equal(await value(p,'tree','shortfall'),0);
  await p.locator('#research-owned-badges-tree').fill('-1');assert.ok(await p.getByRole('alert').isVisible());
  await p.locator('#research-owned-badges-tree').fill('10000');
  await checkLayout(p,`${width}/${lang}/tree`);
  if(lang==='KO'&&[390,1440].includes(width))await p.screenshot({path:`qa/badges-tree-${width}.png`,fullPage:true});
  await p.locator('.rs-back').click();assert.equal(await value(p,'all','used'),spent);assert.equal(await value(p,'all','remaining'),total-spent);
  assert.equal(await value(p,'all','total'),await value(p,'all','used')+await value(p,'all','remaining'));
  assert.equal(Number((await p.locator('[data-research=alliance_recognition] [data-badge-card=remaining]').innerText()).replace(/\D/g,'')),tree.badges-spent);
  await p.locator('[data-research=new_home] .rs-category-open').click();assert.equal(await value(p,'tree','total'),0);assert.equal(await value(p,'tree','shortfall'),0);await p.locator('.rs-back').click();
  await p.reload();await p.locator('[data-guide=research]').click();assert.equal(await p.locator('#research-owned-badges-all').inputValue(),'10000');assert.equal(await value(p,'all','remaining'),total-spent);
  await p.locator('.rs-top-actions button').nth(1).click();await p.locator('#research-savings').fill('10');
  assert.equal(await value(p,'all','total'),await value(p,'all','used')+await value(p,'all','remaining'));
  await checkLayout(p,`${width}/${lang}/savings`);assert.deepEqual(errors,[]);await p.close();
 }
 console.log(`${views} badge summary views verified: exact totals, saved progress, inventory/shortfall, cards, free trees, savings and persistence.`);
} finally {await b.close();}
