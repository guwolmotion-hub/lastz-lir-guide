import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { season2 } from '../src/season2-expanded.js';
import { powerGrowth } from '../src/power-growth.js';

const imageFiles = new Set();
for (const lang of ['ko','en','es','hi']) {
  assert.equal(season2[lang].sections.length,15);
  assert.equal(season2[lang].sections.reduce((n,ch)=>n+ch.parts.length,0),36);
  assert.doesNotMatch(JSON.stringify(season2[lang]),/PDF|원문|출처|작성자|저자|기존 자료|the source|the author|a separate article|la fuente|el autor|otro artículo|मूल विवरण|मूल लेख|लेखक/i,lang+': reader-facing document references');
  assert.equal(season2[lang].sourceNote,undefined);
  assert.ok(season2[lang].sections.every(ch=>ch.sourcePages===undefined));
  assert.equal(powerGrowth[lang].sections.length,5);
  for (const guide of [season2[lang],powerGrowth[lang]]) {
    for (const ch of guide.sections) {
      assert.ok(ch.parts.length >= 2);
      for (const part of ch.parts) {
        assert.ok(part.text.length > 100, `${lang}: ${part.title}`);
        if (lang !== 'ko') assert.doesNotMatch(part.title + part.text, /[가-힣]/);
      }
      for (const image of ch.images || []) {
        assert.ok(existsSync(`public/season2/${image.src}.webp`));
        imageFiles.add(image.src);
      }
    }
  }
}
assert.equal(imageFiles.size,38);
const browser = await chromium.launch({channel:'msedge',headless:true});
let checked=0;
try {
  for (const width of [360,390,768,1440]) {
    const page=await browser.newPage({viewport:{width,height:900}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(process.env.GUIDE_URL || 'http://127.0.0.1:5180/');
    for (const [lang,button] of [['ko','KO'],['en','EN'],['es','ES'],['hi','HI']]) {
      await page.getByRole('button',{name:button,exact:true}).click();
      for (const [id,guide] of [['season2',season2[lang]],['powerOrder',powerGrowth[lang]]]) {
        const card=page.locator(`[data-guide="${id}"]`);
        await card.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'nearest',inline:'center'}));
        await card.click();
        const tabs=page.locator('.segmented-tabs button');
        assert.equal(await tabs.count(),guide.sections.length);
        for(let i=0;i<guide.sections.length;i++) {
          await tabs.nth(i).click();
          assert.equal(await page.locator('.season-guide > h3').innerText(),guide.sections[i].title);
          assert.equal(await page.locator('.season-guide .reading-section').count(),guide.sections[i].parts.length);
          const photos=page.locator('.season-photos img');
          assert.equal(await photos.count(),guide.sections[i].images?.length || 0);
          for (const img of await photos.all()) {
            await img.scrollIntoViewIfNeeded();
            await img.evaluate(el=>el.decode());
            assert.ok(await img.evaluate(el=>el.naturalWidth>0));
          }
          const problems=await page.evaluate(()=>[...document.querySelectorAll('.season-guide h3,.season-guide h4,.season-guide .text-line,.segmented-tabs button')].filter(el=>el.scrollWidth>el.clientWidth+2).map(el=>el.textContent));
          assert.deepEqual(problems,[],`${width}/${lang}/${id}/${i}: clipped text`);
          assert.equal(await page.evaluate(()=>document.body.scrollWidth>innerWidth+2),false,`${width}/${lang}/${id}: overflow`);
          if (id==='season2' && i===4) {
            await page.locator('.season-photos button').first().click();
            assert.ok(await page.locator('dialog[open]').isVisible());
            await page.locator('dialog[open] > img').evaluate(el=>el.decode());
            if (lang==='ko' && [390,1440].includes(width)) await page.screenshot({path:`qa/season-zoom-${width}.png`});
            await page.keyboard.press('Escape');
            assert.equal(await page.locator('dialog[open]').count(),0);
            await page.locator('.season-photos button').first().click();
            await page.locator('.season-photo-toolbar button').click();
            assert.equal(await page.locator('dialog[open]').count(),0);
          }
          if(lang==='ko' && [390,1440].includes(width) && i===0) {
            await page.evaluate(()=>scrollTo(0,0));
            await page.screenshot({path:`qa/${id}-guide-${width}.png`,fullPage:true});
          }
          checked++;
        }
        await page.locator('.home-button').click();
      }
    }
    assert.deepEqual(errors,[]);
    await page.close();
  }
  console.log(`Verified ${checked} multilingual/responsive chapter views and ${imageFiles.size} original screenshots, zoom and close controls.`);
} finally { await browser.close(); }
