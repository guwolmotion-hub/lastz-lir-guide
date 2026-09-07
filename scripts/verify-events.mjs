import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [360, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://127.0.0.1:5177/');
    await page.locator('.feature-card').nth(6).click();
    assert.equal(await page.locator('.segmented-tabs button').count(), 8);
    for (const lang of ['KO', 'EN', 'ES', 'HI']) {
      await page.getByRole('button', { name: lang, exact: true }).click();
      for (let i = 0; i < 4; i++) {
        await page.locator('.segmented-tabs button').nth(i).click();
        assert.equal(await page.locator('.event-guide').count(), 1);
        assert.equal(await page.locator('.event-guide tbody tr').count(), 3);
        assert.ok(await page.locator('.event-sources a').count() >= 2);
        assert.equal(await page.evaluate(() => [...document.querySelectorAll('.event-guide td, .event-guide th, .event-guide p')].some(el => el.scrollWidth > el.clientWidth + 2 || el.getBoundingClientRect().right > innerWidth + 2)), false);
        if (lang === 'KO') await page.screenshot({ path: `qa/event-${width}-${i}.png`, fullPage: true });
      }
    }
    await page.close();
  }
  console.log('Four event tabs: budgets, sources and text layout passed in four languages on desktop/mobile.');
} finally { await browser.close(); }
