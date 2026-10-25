import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({
  ...(process.env.GUIDE_BROWSER_EXECUTABLE ? { executablePath: process.env.GUIDE_BROWSER_EXECUTABLE } : { channel: 'msedge' }),
  headless: true,
});
let checked = 0;
try {
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.GUIDE_URL || 'http://127.0.0.1:5177/');
    await page.locator('.feature-card').first().waitFor();
    assert.equal(await page.locator('.feature-card').count(), 11);
    assert.match(await page.locator('.feature-card').nth(0).innerText(), /시즌2/);
    assert.match(await page.locator('.feature-card').nth(1).innerText(), /연맹/);
    assert.match(await page.locator('.feature-card').nth(2).innerText(), /매일/);
    assert.match(await page.locator('.feature-card').nth(3).innerText(), /본부 레벨업/);
    assert.match(await page.locator('.feature-card').nth(4).innerText(), /캐러밴/);
    await page.waitForFunction(() => [...document.querySelectorAll('.feature-card img')].every(img => img.complete && img.naturalWidth > 0));
    assert.equal(await page.locator('.season-guide').count(), 0);
    await page.locator('.feature-card').first().click();
    for (const lang of ['KO', 'EN', 'ES', 'HI']) {
      await page.getByRole('button', { name: lang, exact: true }).click();
      assert.equal(await page.locator('.segmented-tabs button').count(), 6);
      for (let index = 0; index < 6; index++) {
        await page.locator('.segmented-tabs button').nth(index).click();
        assert.equal(await page.locator('.season-guide').count(), 1);
        assert.ok(await page.locator('.season-guide .reading-section').count() >= 5);
        const content = await page.locator('.season-guide').innerText();
        assert.ok(content.length > 400);
        if (lang !== 'KO') assert.ok(!/[가-힣]/u.test(content), lang + ': untranslated Korean');
        if (lang === 'HI') assert.ok(!/[A-Za-z]/.test(content), 'Hindi: untranslated English');
        const layout = await page.evaluate(() => ({
          overflow: document.body.scrollWidth > innerWidth + 2,
          clipped: [...document.querySelectorAll('.detail-document h1, .season-guide h3, .season-guide h4, .season-guide p, .season-source, .summary-item strong')].filter(el => el.getClientRects().length && (el.scrollWidth > el.clientWidth + 2 || el.getBoundingClientRect().right > innerWidth + 2)).map(el => el.textContent),
        }));
        assert.equal(layout.overflow, false, width + '/' + lang + '/' + index);
        assert.deepEqual(layout.clipped, [], width + '/' + lang + '/' + index);
        if ([390, 1440].includes(width) && lang === 'KO' && [0, 2, 3].includes(index)) await page.screenshot({ path: 'qa/season2-' + width + '-' + index + '.png', fullPage: true });
        checked++;
      }
    }
    await page.locator('.home-button').click();
    assert.equal(await page.locator('.feature-card').count(), 11);
    assert.equal(await page.locator('.season-guide').count(), 0);
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('Season 2: ' + checked + ' tab views passed across 4 languages and 4 widths; 9 card images and order verified.');
} finally {
  await browser.close();
}
