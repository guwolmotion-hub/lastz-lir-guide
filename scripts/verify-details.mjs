import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
let checked = 0;
try {
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(process.env.GUIDE_URL || 'http://127.0.0.1:5177/');
    await page.locator('.feature-card').first().click();
    for (const lang of ['KO', 'EN', 'ES', 'HI']) {
      await page.getByRole('button', { name: lang, exact: true }).click();
      for (let index = 0; index < 8; index++) {
        await page.locator('.home-button').click();
        await page.locator('.feature-card').nth(index).click();
        assert.equal(await page.locator('.guide-navigation').count(), 0);
        const localTabs = page.locator('.segmented-tabs button');
        for (let tab = 0; tab < await localTabs.count(); tab++) {
          await localTabs.nth(tab).click();
          assert.ok((await page.locator('.content').innerText()).trim().length > 0);
        }
        if (await localTabs.count()) await localTabs.first().click();
        const problems = await page.evaluate(() => ({
          pageOverflow: document.body.scrollWidth > innerWidth + 2,
          clippedContent: [...document.querySelectorAll('.day-copy, .notice, .guide-section-card, .formula-panel')].some(el => el.getBoundingClientRect().right > innerWidth + 2),
          textOverflow: [...document.querySelectorAll('.detail-document h1, .detail-document h3, .detail-document p, .detail-document li, .summary-item strong')].filter(el => el.getClientRects().length && el.scrollWidth > el.clientWidth + 2).map(el => el.textContent),
        }));
        assert.equal(problems.pageOverflow, false, `${width}/${lang}/${index}: page overflow`);
        assert.equal(problems.clippedContent, false, `${width}/${lang}/${index}: clipped content`);
        assert.deepEqual(problems.textOverflow, [], `${width}/${lang}/${index}: text overflow`);
        if (lang === 'KO' && [390, 1440].includes(width) && [0, 4, 6].includes(index)) {
          await page.screenshot({ path: `qa/reading-${width}-${index}.png`, fullPage: true });
        }
        if (index === 0) {
          for (let day = 0; day < await page.locator('.day-tabs button').count(); day++) {
            await page.locator('.day-tabs button').nth(day).click();
            assert.ok((await page.locator('.day-copy').innerText()).trim().length > 0);
          }
        }
        checked++;
      }
    }
    await page.close();
  }
  console.log(`Verified ${checked} detail views across 4 languages and 4 widths, including all Day tabs.`);
} finally {
  await browser.close();
}
