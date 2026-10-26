import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
let views=0;
try {
 for(const width of [360,390,768,1440])for(const lang of ['KO','EN','ES','HI']) {
  const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.GUIDE_URL||'http://127.0.0.1:5180/');
  // A legacy saved plan must still load after adding the unit field.
  await page.evaluate(()=>localStorage.setItem('nova-advanced-caravan',JSON.stringify({power:'15M',faction:'',matching:'5',weekly:false})));
  await page.getByRole('button',{name:lang,exact:true}).click();
  await page.locator('[data-guide=caravan]').click();
  await page.locator('.segmented-tabs button').nth(1).click();
  const rows=page.locator('.table-section:visible tbody tr');
  assert.equal(await rows.count(),50);
  assert.deepEqual(await rows.last().locator('td').allTextContents(),['50','136.2M','165M']);
  await page.locator('.segmented-tabs button').nth(2).click();
  await page.locator('#caravan-power').waitFor();
  assert.equal(await page.locator('#caravan-unit').inputValue(),'1');
  await page.locator('.nt-factions button').first().click();
  assert.equal(await page.locator('[data-table=native-caravan-levels]').count(),0,'faction button must not submit form');
  await page.locator('.nt-factions button').first().click();
  await page.locator('#caravan-power').fill('15,5M');
  await page.locator('#caravan-power').press('Enter');
  assert.equal((await page.locator('[data-result=caravan-effective]').innerText()).replace(/\D/g,''),'15500000');
  assert.equal(await page.locator('[data-table=native-caravan-levels] tbody tr').count(),50);
  assert.equal(await page.locator('[data-result=caravan-level]').innerText(),'21');
  await page.locator('#caravan-power').fill('15');await page.locator('#caravan-unit').selectOption('M');
  assert.equal((await page.locator('[data-result=caravan-effective]').innerText()).replace(/\D/g,''),'15000000');
  await page.locator('.nt-factions button').first().click();
  assert.equal((await page.locator('[data-result=caravan-effective]').innerText()).replace(/\D/g,''),'16500000');
  await page.locator('.nt-caravan-bonuses .nt-tabs button').first().click();
  await page.locator('.nt-caravan-bonuses input[type=checkbox]').check();
  assert.equal((await page.locator('[data-result=caravan-effective]').innerText()).replace(/\D/g,''),'17250000');
  const checkbox=await page.locator('.nt-caravan-bonuses input[type=checkbox]').boundingBox();
  assert.ok(checkbox.width<=22,'checkbox width');
  await page.locator('.nt-factions button').first().click();
  await page.locator('#caravan-power').fill('1억 5000만');
  assert.equal((await page.locator('[data-result=caravan-effective]').innerText()).replace(/\D/g,''),'150000000');
  await page.locator('#caravan-power').fill('0');assert.ok(await page.getByRole('alert').isVisible());
  assert.equal(await page.locator('[data-table=native-caravan-levels]').count(),0);
  await page.locator('#caravan-power').fill('165M');
  assert.equal(await page.locator('[data-result=caravan-level]').innerText(),'50');
  assert.equal(await page.evaluate(()=>document.body.scrollWidth>innerWidth+2),false,`${width}/${lang} overflow`);
  assert.equal(await page.locator('.season-source,.event-sources,.tool-source').count(),0);
  if(lang==='KO'&&[390,1440].includes(width))await page.screenshot({path:`qa/caravan-fixed-${width}.png`,fullPage:true});
  await page.locator('.home-button').click();await page.locator('[data-guide=season2]').click();
  for(const tab of await page.locator('.segmented-tabs button').all()){
   await tab.click();assert.equal(await page.locator('.season-source,.event-sources,.tool-source').count(),0);
   assert.doesNotMatch(await page.locator('.season-guide').innerText(),/sgthhjjytt|네이버 카페|Naver Cafe|PDF ·|Wild Hoggs/);
  }
  assert.deepEqual(errors,[]);views++;await page.close();
 }
 console.log(`${views} responsive/multilingual Caravan flows passed; 50 levels, units, decimal comma, Korean input, Enter, live bonus changes, invalid input and source-footer removal.`);
} finally {await browser.close();}
