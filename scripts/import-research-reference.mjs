import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const dependencies = {
  alliance_recognition: ['new_home', 50], fully_armed_alliance: ['new_home', 50],
  hq_management: ['shelter_building', 100], military_strategies: ['elite_troops', 100],
  siege_to_seize: ['military_strategies', 15], peace_shield: ['military_strategies', 45],
  rapid_growth: ['hq_management', 100], field: ['siege_to_seize', 100],
  army_building: ['peace_shield', 100], rider_training: ['field', 100],
  assaulter_training: ['field', 100], shooter_training: ['field', 100],
  tactical_master: ['army_building', 100], army_expansion: ['rapid_growth', 50],
  leaders_will: ['tactical_master', 80],
};
const seasons = { age_of_steel: { number: 1, day: 49 }, army_expansion: { number: 2, day: 50 } };
const browser = await chromium.launch({ executablePath: process.env.GUIDE_BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  const page = await browser.newPage();
  const localized = {};
  for (const lang of ['ko', 'en', 'es']) {
    await page.goto('https://wild-hoggs.com' + (lang === 'en' ? '' : '/' + lang) + '/tools/research/');
    await page.locator('.category-card[data-category-id]').first().waitFor();
    localized[lang] = await page.locator('.category-card[data-category-id]').evaluateAll(cards => cards.map(card => ({
      id: card.dataset.categoryId,
      name: card.querySelector('h2').textContent.trim(),
      lab: Number(card.innerText.split('\n')[0].match(/\d+/)?.[0]),
      badges: Number(card.dataset.totalBadges),
    })));
    assert.equal(localized[lang].length, 21, lang);
  }
  const trees = localized.ko.map(tree => ({
    id: tree.id,
    name: Object.fromEntries(['ko', 'en', 'es'].map(lang => [lang, localized[lang].find(record => record.id === tree.id).name])),
    lab: tree.lab, badges: tree.badges,
    prerequisite: dependencies[tree.id] ? { id: dependencies[tree.id][0], percent: dependencies[tree.id][1] } : null,
    season: seasons[tree.id] || null,
  }));
  assert.ok(trees.every(tree => Number.isInteger(tree.lab) && tree.lab >= 1 && tree.lab <= 35 && Number.isSafeInteger(tree.badges)));
  assert.equal(trees.reduce((sum, tree) => sum + tree.badges, 0), 21861224);
  await writeFile('src/research-reference.json', JSON.stringify({ checkedAt: '2026-10-26', source: 'https://wild-hoggs.com/ko/tools/research/', trees }, null, 2) + '\n');
  console.log('Imported 21 research trees, lab requirements, prerequisite paths and baseline badge totals.');
} finally {
  await browser.close();
}
