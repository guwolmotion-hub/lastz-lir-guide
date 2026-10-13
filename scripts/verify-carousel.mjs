import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
let checked = 0;
try {
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.GUIDE_URL || 'http://127.0.0.1:5180/');
    await page.waitForFunction(() => [...document.querySelectorAll('.lobby-logo,.lobby-bg,.feature-card img')].every(img => img.complete && img.naturalWidth > 0));
    assert.match(await page.locator('.lobby-bg').getAttribute('src'), /background-v2/);
    assert.match(await page.locator('.lobby-logo').getAttribute('src'), /logo-gold/);
    let cardHeight;
    for (const lang of ['KO', 'EN', 'ES', 'HI']) {
      await page.getByRole('button', { name: lang, exact: true }).click();
      const layout = await page.evaluate(() => {
        const problems = [];
        const cards = [...document.querySelectorAll('.feature-card')];
        cards.forEach((card, index) => {
          const content = card.querySelector('.feature-copy');
          const bounds = card.getBoundingClientRect();
          const box = content.getBoundingClientRect();
          const badge = card.querySelector('.feature-number').getBoundingClientRect();
          if (box.top < badge.bottom + 6 || box.bottom > bounds.bottom - 6) problems.push(index + ': copy outside safe area');
          const parts = [...content.children];
          parts.forEach((part, partIndex) => {
            if (part.scrollWidth > part.clientWidth + 2) problems.push(index + ': clipped text');
            if (partIndex && part.getBoundingClientRect().top < parts[partIndex - 1].getBoundingClientRect().bottom + 3) problems.push(index + ': overlapping text');
          });
        });
        return { problems, height: cards[0].clientHeight, count: cards.length, overflow: document.body.scrollWidth > innerWidth + 2 };
      });
      assert.deepEqual(layout.problems, [], width + '/' + lang);
      assert.equal(layout.count, 9);
      assert.equal(layout.overflow, false, width + '/' + lang + ': page overflow');
      cardHeight ??= layout.height;
      assert.equal(layout.height, cardHeight, 'Translation resized cards');
      await page.locator('.feature-card').last().scrollIntoViewIfNeeded();
      if (lang === 'KO' && [390, 1440].includes(width)) await page.screenshot({ path: 'qa/power-card-' + width + '.png', fullPage: true });
      await page.locator('.feature-card').last().click();
      const tabs = page.locator('.segmented-tabs button');
      assert.equal(await tabs.count(), 5);
      for (let tab = 0; tab < await tabs.count(); tab++) {
        await tabs.nth(tab).click();
        assert.ok((await page.locator('.guide-section-card').innerText()).trim().length > 100);
        assert.equal(await page.evaluate(() => [...document.querySelectorAll('.detail-document h1,.guide-section-card h3,.guide-section-card li')].some(el => el.scrollWidth > el.clientWidth + 2)), false, width + '/' + lang + ': clipped guide');
      }
      await page.locator('.home-button').click();
      checked += layout.count;
    }
    await page.getByRole('button', { name: 'KO', exact: true }).click();
    if ([390, 1440].includes(width)) await page.screenshot({ path: 'qa/gold-home-' + width + '.png', fullPage: true });
    const previousScroll = await page.locator('.feature-tabs').evaluate(el => el.scrollLeft);
    await page.locator('.carousel-button.next').click();
    await page.waitForFunction(previous => document.querySelector('.feature-tabs').scrollLeft > previous + 10, previousScroll);
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('Verified ' + checked + ' card layouts across 4 languages and 4 widths, including all power tabs, new artwork and slide arrows.');
} finally {
  await browser.close();
}
