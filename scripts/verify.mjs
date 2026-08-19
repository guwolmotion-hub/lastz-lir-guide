import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa');
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: 'msedge',
  headless: true,
});

const checks = [];

async function runViewport(name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://127.0.0.1:5177/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, `${name}-ko.png`), fullPage: true });
  const homeMetrics = await page.evaluate(() => {
    const footer = document.querySelector('.lobby-footer')?.getBoundingClientRect();
    const cards = [...document.querySelectorAll('.feature-card')].map((el) => el.getBoundingClientRect());
    const footerOverlap = !!footer && cards.some((card) => !(card.right < footer.left || card.left > footer.right || card.bottom < footer.top || card.top > footer.bottom));
    return { footerOverlap };
  });

  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await page.getByRole('button', { name: /Caravan/ }).click();
  await page.screenshot({ path: path.join(outDir, `${name}-en-caravan.png`), fullPage: true });

  await page.getByRole('button', { name: /Home/ }).click();
  await page.getByRole('button', { name: 'ES', exact: true }).click();
  await page.getByRole('button', { name: /Reglas/ }).click();
  await page.screenshot({ path: path.join(outDir, `${name}-es-rules.png`), fullPage: true });

  const metrics = await page.evaluate(() => {
    const body = document.body;
    const overflows = [...document.querySelectorAll('button, h1, h2, h3, p, li, td, th')]
      .filter((el) => el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).whiteSpace !== 'nowrap')
      .slice(0, 8)
      .map((el) => ({ tag: el.tagName, text: el.textContent.slice(0, 80), sw: el.scrollWidth, cw: el.clientWidth }));
    return {
      title: document.querySelector('h1')?.textContent,
      homeVisible: !!document.querySelector('.lobby'),
      detailVisible: !!document.querySelector('.window-shell'),
      footerOverlap: false,
      bodyWidth: body.scrollWidth,
      viewportWidth: innerWidth,
      horizontalOverflow: body.scrollWidth > innerWidth + 2,
      overflows,
    };
  });
  metrics.footerOverlap = homeMetrics.footerOverlap;
  checks.push({ name, metrics });
  await page.close();
}

await runViewport('desktop', { width: 1440, height: 1000 });
await runViewport('mobile', { width: 390, height: 900 });
await browser.close();

console.log(JSON.stringify(checks, null, 2));
