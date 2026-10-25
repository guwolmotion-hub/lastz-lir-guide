import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const reference=JSON.parse(await readFile('src/research-reference.json','utf8'));
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
let count=0;
async function layout(page,label) {
  const state=await page.evaluate(()=>({overflow:document.body.scrollWidth>innerWidth+2,external:[...document.querySelectorAll('main a[href]')].filter(a=>/^https?:/.test(a.getAttribute('href'))).length,clipped:[...document.querySelectorAll('.detail-document h1,.tool-section-title h2,.tool-metric dd,.segmented-tabs button span')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent)}));
  assert.equal(state.overflow,false,label);assert.equal(state.external,0,label);assert.deepEqual(state.clipped,[],label);
}
try {
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.GUIDE_URL||'http://127.0.0.1:5180/');
    await page.locator('[data-guide="research"]').click();
    for(const lang of ['KO','EN','ES','HI']) {
      await page.getByRole('button',{name:lang,exact:true}).click();
      const tabs=page.locator('.segmented-tabs button');assert.equal(await tabs.count(),6);
      for(const button of (await tabs.all()).slice(0,5)){await button.click();assert.ok((await page.locator('.season-guide').innerText()).length>100);await layout(page,width+'/'+lang+'/guide');}
      await tabs.nth(1).click();assert.equal(await page.locator('[data-research]').count(),21);
      await page.locator('.research-toggle input').check();assert.equal(await page.locator('[data-research]').count(),6);
      await page.locator('#research-lab').fill('35');assert.equal(await page.locator('[data-research]').count(),21);
      await page.locator('#research-lab').fill('1');assert.equal(await page.locator('[data-research]').count(),1);
      await page.locator('.research-toggle input').uncheck();await page.locator('#research-lab').fill('10');
      for(const tree of reference.trees) {
        await page.locator('[data-research="'+tree.id+'"] .research-local-open').click();
        await page.waitForFunction(id=>document.querySelector('#research-tree')?.value===id,tree.id);
        assert.ok(await page.locator('[data-table="research-nodes"] tbody tr').count()>0);
        await page.locator('.advanced-actions button').first().click();
        const exact=page.locator('[data-exact="advanced-badge"]');
        assert.equal((await (await exact.count()?exact:page.locator('[data-result="advanced-badge"]')).innerText()).replace(/[^0-9]/g,''),String(tree.badges));
        await layout(page,width+'/'+lang+'/'+tree.id);count++;
        await page.locator('.research-local-back').click();
        assert.equal(await page.locator('[data-research]').count(),21);
      }
      await tabs.nth(5).click();await page.locator('#research-tree').waitFor();
      await page.locator('#research-tree').selectOption('new_home');await layout(page,width+'/'+lang+'/planner');
      await tabs.first().click();
    }
    assert.deepEqual(errors,[]);await page.close();
  }
  console.log('Research guide: '+count+' local tree views, all costs, six tabs, four languages, lab filters and no external links passed.');
} finally {await browser.close();}
