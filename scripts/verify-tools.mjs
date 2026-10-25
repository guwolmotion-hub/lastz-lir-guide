import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ executablePath: process.env.GUIDE_BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const url = process.env.GUIDE_URL || 'http://127.0.0.1:5180/';
let views = 0;
async function layout(page, context) {
  const issues = await page.evaluate(() => ({
    overflow: document.body.scrollWidth > innerWidth + 2,
    clipped: [...document.querySelectorAll('.tools-workspace h2,.tools-workspace h3,.tools-workspace p,.tool-field>span,.tool-field>label,.tool-metric dd,.hero-record-copy strong,.hero-record-copy small,.tool-tabs button span')].filter(el => el.getClientRects().length && !el.closest('dialog:not([open])') && el.scrollWidth > el.clientWidth + 2).map(el => el.textContent),
    invalid: /NaN|Infinity|undefined/.test(document.querySelector('.tools-workspace')?.innerText || ''),
  }));
  assert.equal(issues.overflow, false, context + ': page overflow');
  assert.deepEqual(issues.clipped, [], context + ': clipped text');
  assert.equal(issues.invalid, false, context + ': invalid result');
  views++;
}

try {
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    assert.equal(await page.locator('.feature-card').count(), 9);
    await page.locator('.open-calculators').click();
    for (const lang of ['KO', 'EN', 'ES', 'HI']) {
      await page.getByRole('button', { name: lang, exact: true }).click();
      await page.locator('.tools-modes button').first().click();
      for (const tab of ['hq', 'exp', 'caravan', 'speedups', 'packs', 'discount']) {
        await page.locator('#tool-tab-' + tab).click();
        await layout(page, width + '/' + lang + '/' + tab);
        if (lang !== 'KO') assert.ok(!/[가-힣]/u.test(await page.locator('.tools-workspace').innerText()));
      }
      await page.locator('.tools-modes button').nth(1).click();
      for (const tab of ['heroes', 'hq', 'caravan', 'exp']) {
        await page.locator('#tool-tab-' + tab).click();
        await layout(page, width + '/' + lang + '/database/' + tab);
        if (lang === 'HI') {
          const words = (await page.locator('.tools-workspace').innerText()).match(/[A-Za-z]+/g) || [];
          assert.deepEqual([...new Set(words.filter(word => !['NoVa', 'Wild', 'Hoggs', 'K', 'M', 'G', 'B', 'A', 'S'].includes(word)))], [], 'Untranslated Hindi database text');
        }
      }
    }
    await page.getByRole('button', { name: 'KO', exact: true }).click();
    await page.locator('.tools-modes button').first().click();
    await page.locator('#tool-tab-hq').click();
    await page.locator('.tool-section-title button').click();
    await page.locator('#hq-target').selectOption('18');
    await page.locator('#hq-reduction').fill('10');
    await page.locator('#hq-owned-0').fill('10');
    assert.equal(await page.locator('[data-result="hq-missing-0"]').innerText(), '35.09M');
    assert.equal(await page.locator('[data-table="hq-plan"] tbody tr').count(), 3);
    await page.locator('#tool-tab-exp').click();
    await page.locator('#exp-current').fill('1');
    await page.locator('#exp-target').fill('100');
    await page.locator('#exp-count').fill('2');
    await page.locator('#exp-owned').fill('100');
    assert.equal(await page.locator('[data-result="exp-missing"]').innerText(), '864.89M');
    await page.locator('#exp-target').fill('176');
    assert.equal(await page.getByRole('alert').count(), 1);
    await page.locator('#exp-target').fill('100');
    await page.reload();
    await page.locator('.open-calculators').click();
    await page.locator('#tool-tab-exp').click();
    assert.equal(await page.locator('#exp-count').inputValue(), '2');
    assert.equal(await page.locator('#exp-owned').inputValue(), '100');
    await page.locator('#tool-tab-caravan').click();
    assert.match(await page.locator('[data-result="caravan-effective"]').innerText(), /^11M$/);
    await page.locator('#tool-tab-speedups').click();
    await page.locator('#speed-q1440').fill('1');
    assert.match(await page.locator('[data-result="speed-missing"]').innerText(), /^0/);
    await page.locator('#tool-tab-packs').click();
    assert.equal(await page.locator('[data-result="packs-needed"]').innerText(), '10');
    assert.equal(await page.locator('[data-result="packs-short"]').innerText(), '5');
    await page.locator('#tool-tab-discount').click();
    await page.locator('#discount-discount').fill('90');
    assert.equal(await page.locator('[data-result="discount-total"]').innerText(), '1K');
    if ([390, 1440].includes(width)) await page.screenshot({ path: 'qa/tools-calc-' + width + '.png', fullPage: true });
    await page.locator('.tools-modes button').nth(1).click();
    await page.locator('#tool-tab-heroes').click();
    assert.equal(await page.locator('.hero-record').count(), 36);
    await page.locator('#hero-query').fill('Sophia');
    assert.equal(await page.locator('.hero-record').count(), 1);
    await page.locator('.hero-record').click();
    await page.locator('dialog[open]').waitFor();
    await page.waitForFunction(() => { const image = document.querySelector('dialog img'); return image?.complete && image.naturalWidth > 0; });
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').count(), 0);
    await page.locator('.hero-record').click();
    await page.locator('dialog .tool-primary').click();
    assert.equal(await page.locator('.selected-hero').count(), 1);
    assert.equal(await page.locator('#exp-count').inputValue(), '2');
    await page.locator('.tools-modes button').nth(1).click();
    await page.locator('#hero-rarity').selectOption('S2');
    await page.locator('#hero-role').selectOption('defense');
    await page.locator('#hero-faction').selectOption('wings-of-dawn');
    assert.equal(await page.locator('.hero-record').count(), 1);
    await page.locator('#hero-query').fill('zzzzzz');
    assert.equal(await page.locator('.hero-record').count(), 0);
    assert.equal(await page.getByRole('status').count(), 1);
    await page.locator('.database-count button').click();
    assert.equal(await page.locator('.hero-record').count(), 36);
    if ([390, 1440].includes(width)) await page.screenshot({ path: 'qa/tools-db-' + width + '.png', fullPage: true });
    await page.locator('#tool-tab-exp').click();
    await page.locator('#db-exp-from').fill('150');
    assert.equal(await page.locator('[data-table="exp-database"] tbody tr').count(), 25);
    assert.match(await page.locator('.database-count').innerText(), /16,860,000,000/);
    await page.locator('.home-button').click();
    assert.equal(await page.locator('.feature-card').count(), 9);
    await layout(page, width + '/home');
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('Verified ' + views + ' tool layouts plus calculations, invalid input, persistence, hero filters, modal keyboard dismissal and calculator handoff.');
} finally {
  await browser.close();
}
