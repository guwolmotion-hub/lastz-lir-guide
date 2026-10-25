import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

function decode(value) {
  if (!Array.isArray(value)) return value;
  const [type, data] = value;
  if (type === 1) return data.map(decode);
  if (type === 0 && data && typeof data === 'object') return Object.fromEntries(Object.entries(data).map(([key, item]) => [key, decode(item)]));
  if (type === 0) return data;
  throw new Error('Unsupported public data encoding: ' + type);
}

const browser = await chromium.launch({ executablePath: process.env.GUIDE_BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  const page = await browser.newPage();
  const getProps = async lang => {
    await page.goto('https://wild-hoggs.com/' + lang + '/heroes/');
    const raw = JSON.parse(await page.locator('astro-island[component-url*="HeroGrid"]').getAttribute('props'));
    return { heroes: decode(raw.heroes), texts: decode(raw.texts) };
  };
  const ko = await getProps('ko');
  const es = await getProps('es');
  const heroLinks = await page.locator('a[href*="/heroes/"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
  const heroes = ko.heroes.map(hero => {
    const path = heroLinks.find(link => link.endsWith('/' + hero.id + '/'));
    assert.ok(path, 'No detail source for ' + hero.id);
    return {
      id: hero.id,
      name: { ko: ko.texts[hero.id]?.name || hero.name, en: hero.name, es: es.texts[hero.id]?.name || hero.name },
      rarity: hero.rarity,
      faction: hero.faction,
      role: hero.role,
      globalPassive: hero.globalPassive,
      image: 'heroes/' + hero.id + '.webp',
      sourcePath: path.replace(/^\/(ko|en|es)\//, '/{lang}/'),
    };
  });
  assert.equal(heroes.length, 36);
  await mkdir('public/heroes', { recursive: true });
  for (const hero of ko.heroes) {
    const response = await page.request.get('https://wild-hoggs.com' + hero.image);
    assert.equal(response.status(), 200, hero.id);
    assert.match(response.headers()['content-type'], /^image\//);
    await writeFile('public/heroes/' + hero.id + '.webp', await response.body());
  }
  await page.goto('https://wild-hoggs.com/ko/tools/hero-exp/');
  const component = await page.locator('astro-island[component-url*="HeroExpCalculator"]').getAttribute('component-url');
  const componentText = await (await page.request.get('https://wild-hoggs.com' + component)).text();
  const asset = componentText.match(/from["'](\.\/hero-exp-table\.[^"']+)["']/)?.[1];
  assert.ok(asset, 'Experience data asset missing');
  const dataUrl = new URL(asset, 'https://wild-hoggs.com' + component).href;
  const rawTable = await (await page.request.get(dataUrl)).text();
  const heroExp = JSON.parse(rawTable.slice(rawTable.indexOf('['), rawTable.indexOf(']') + 1));
  assert.equal(heroExp.length, 175);
  assert.equal(heroExp.reduce((sum, value) => sum + value, 0), 21817444500);
  await writeFile('src/game-reference.json', JSON.stringify({
    checkedAt: '2026-10-26',
    sources: { heroes: 'https://wild-hoggs.com/ko/heroes/', heroExp: 'https://wild-hoggs.com/ko/tools/hero-exp/' },
    heroes,
    heroExp,
  }, null, 2) + '\n');
  console.log('Imported 36 public hero records and 174 exact level costs; portrait assets saved locally.');
} finally {
  await browser.close();
}
