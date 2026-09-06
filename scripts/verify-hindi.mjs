import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const allowed = new Set(['Lir', 'Last', 'LAST', 'Z', 'NAP', 'Farm', 'VIP', 'S', 'A', 'K', 'M', 'G', 'KO', 'EN', 'ES', 'HI']);
let checks = 0;
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(process.env.GUIDE_URL || 'http://127.0.0.1:5177/');
    await page.getByRole('button', { name: 'HI', exact: true }).click();
    async function audit() {
      const text = await page.locator('main').innerText();
      assert.ok(!/[가-힣]/u.test(text), 'Korean text in Hindi view');
      assert.deepEqual([...new Set((text.match(/[A-Za-z]+/g) || []).filter(word => !allowed.has(word)))], [], 'Untranslated English in Hindi view');
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('h1,h3,h4,p,li,.summary-item strong')].some(el => el.getClientRects().length && (el.scrollWidth > el.clientWidth + 2 || (el.closest('.detail-document') && el.getBoundingClientRect().right > innerWidth + 2)))), false, 'Clipped Hindi text');
      checks++;
    }
    await audit();
    for (let index = 0; index < 8; index++) {
      await page.locator('.feature-card').nth(index).click();
      await audit();
      const tabs = page.locator('.segmented-tabs button, .day-tabs button');
      for (let tab = 0; tab < await tabs.count(); tab++) {
        await tabs.nth(tab).click();
        await audit();
      }
      if ([0, 7].includes(index)) await page.screenshot({ path: `qa/hindi-${width}-${index}.png`, fullPage: true });
      await page.locator('.home-button').click();
    }
    await page.close();
  }
  console.log(`Hindi: ${checks} views passed language and text-layout checks.`);
} finally { await browser.close(); }
