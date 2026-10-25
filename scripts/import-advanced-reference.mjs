import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { decodeAstro } from './reference-literals.mjs';

const raw = JSON.parse(await readFile('qa/reference-literals.json', 'utf8'));
const researchIndex = JSON.parse(await readFile('src/research-reference.json', 'utf8'));
const heroIndex = JSON.parse(await readFile('src/game-reference.json', 'utf8'));
const pick = (objects, predicate) => Object.values(objects).find(predicate);
const langs = ['ko', 'en', 'es'];
const localized = values => Object.fromEntries(langs.map(lang => [lang, values?.[lang] || values?.en || '']));
const sourcePath = (path, lang) => (lang === 'en' ? '' : '/' + lang) + path;
const browser = await chromium.launch({ executablePath: process.env.GUIDE_BROWSER_EXECUTABLE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const context = await browser.newContext({ javaScriptEnabled: false });
await context.route('**/*', route => route.request().resourceType() === 'document' ? route.continue() : route.abort());

async function documentPage(path) {
  const page = await context.newPage();
  const response = await page.goto('https://wild-hoggs.com' + path, { waitUntil: 'domcontentloaded' });
  assert.equal(response.status(), 200, path);
  return page;
}
async function propsAt(path, component) {
  const page = await documentPage(path);
  try {
    const props = JSON.parse(await page.locator('astro-island[component-url*="' + component + '"]').getAttribute('props'));
    return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, decodeAstro(value)]));
  } finally { await page.close(); }
}
async function pool(values, work) {
  const result = new Array(values.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (cursor < values.length) { const index = cursor++; result[index] = await work(values[index], index); }
  }));
  return result;
}

try {
  const buildingRows = pick(raw.buildings, value => Array.isArray(value) && value.length === 32 && value[0]?.costs);
  const buildingNames = pick(raw.buildings, value => value.headquarters?.en);
  const buildings = buildingRows.map(building => ({
    id: building.id, name: localized(buildingNames[building.id]), maxLevel: building.maxLevel,
    costs: building.costs.map(row => ({ level: row.level, food: row.food, wood: row.wood, coins: row.zent, steel: row.steel, seconds: row.time, power: row.power || 0, heroCap: row.heroLevelCap || 0, requires: row.requires || [] })),
  }));
  console.log('Buildings:', buildings.length);

  const research = await pool(researchIndex.trees, async tree => {
    const ko = await propsAt('/ko/tools/research/' + tree.id + '/', 'ResearchCategoryCalculator');
    const es = await propsAt('/es/tools/research/' + tree.id + '/', 'ResearchCategoryCalculator');
    const source = ko.categoryData;
    const nodes = source.technologies.map(node => ({
      id: node.id, name: { ko: ko.translationData[node.nameKey] || node.name, en: node.name, es: es.translationData[node.nameKey] || node.name },
      max: node.maxLevel, lab: Math.max(tree.lab, node.labLevel || 0), requires: node.prerequisites,
      badges: node.badgeCosts, electricity: node.stromCosts, coins: node.zentCosts, seconds: node.times, power: node.combatPower,
    }));
    assert.equal(nodes.reduce((total, node) => total + node.badges.reduce((sum, value) => sum + value, 0), 0), tree.badges, tree.id);
    return { ...tree, nodes };
  });
  console.log('Research:', research.length, 'trees,', research.reduce((sum, tree) => sum + tree.nodes.length, 0), 'nodes');

  const tankLabels = {};
  const gearLabels = {};
  for (const lang of langs) {
    const tankProps = await propsAt(sourcePath('/tools/tank/', lang), 'ModFahrzeug.D2');
    tankLabels[lang] = tankProps.translationData;
    gearLabels[lang] = (await propsAt(sourcePath('/equipment/', lang), 'EquipmentPlanner')).texte;
  }
  const modData = pick(raw.heroAccount, value => value.modifications && value.totalWrenches);
  const levelData = pick(raw.tank, value => value.epKlick && value.plan);
  const moduleData = pick(raw.tank, value => value['1']?.stufen);
  const pluginData = pick(raw.heroAccount, value => value.attr && value.kosten && value.resonanz);
  const tank = {
    levels: { experience: levelData.ep, experiencePerAction: levelData.epKlick, blueprintsPerAction: levelData.plan, power: levelData.power, heroBonus: levelData.bonus, ranks: levelData.raenge.map((rank, index) => ({ id: index, blueprintReduction: rank.kosten, expBonus: rank.ep, threshold: rank.bis })) },
    mods: modData.modifications.map((mod, index) => ({ ...mod, name: Object.fromEntries(langs.map(lang => [lang, tankLabels[lang][mod.nameKey] || mod.nameKey])), power: raw.tank.Ie[index], heroBonus: raw.tank.Ke[index] })),
    modules: Object.entries(moduleData).map(([slot, data]) => ({ slot, stages: data.stufen, effects: data.effekte })),
    plugins: { attributes: pluginData.attr, costs: pluginData.kosten, resonance: pluginData.resonanz },
  };
  assert.equal(tank.mods.length, 49);
  assert.equal(tank.mods.reduce((sum, mod) => sum + mod.wrenchesPerSub * mod.subLevels, 0), 70700);
  console.log('Tank:', tank.levels.power.length - 1, 'levels,', tank.mods.length, 'mods,', tank.modules.length, 'module slots');

  const gear = pick(raw.equipment, value => value.teile && value.verstaerken);
  const equipment = {
    types: gear.teile.map(type => ({ ...type, name: Object.fromEntries(langs.map(lang => [lang, gearLabels[lang].teile[type.id]])) })),
    upgrades: Object.fromEntries(Object.entries(gear.verstaerken).map(([grade, data]) => [grade, { baseMax: data.max, costs: data.kosten }])),
    stats: gear.werte,
    promotion: { unlockLevel: gear.befoerderung.ab, steps: gear.befoerderung.schritte, levelBonus: gear.befoerderung.levelUp, stats: gear.befoerderung.werte },
    forge: { steps: gear.mythisch.schritte, bonus: gear.mythisch.zuschlag, maxLevelBonus: gear.mythisch.maxPlus },
    craft: gear.herstellen,
  };
  assert.equal(equipment.types.length, 16);
  console.log('Equipment:', equipment.types.length, 'types,', equipment.promotion.steps.length, 'promotion steps');

  const heroMetadata = await pool(heroIndex.heroes, async hero => {
    const ko = await propsAt('/ko/heroes/' + hero.id + '/', 'HeroDetail');
    const en = await propsAt('/heroes/' + hero.id + '/', 'HeroDetail');
    const es = await propsAt('/es/heroes/' + hero.id + '/', 'HeroDetail');
    return [hero.id, {
      weapon: !!ko.text.weapon, awakening: !!ko.text.awaken,
      skills: ko.text.skills.map((skill, index) => ({
        type: skill.type, name: { ko: skill.name, en: en.text.skills[index]?.name || skill.name, es: es.text.skills[index]?.name || skill.name },
        level: skill.unlockLevel, stars: skill.unlockStars, max: skill.maxLevel,
        values: skill.lv.map(values => values.map(value => Number(value))),
      })),
    }];
  });
  const heroStats = pick(raw.heroPlanner, value => value.stufen && value.sterne && value.helden);
  const heroPower = pick(raw.heroAccount, value => value.k1 && value.skillMuster && value.helden);
  const repeat5 = values => values.flatMap(value => Array(5).fill(value));
  const heroes = {
    stats: heroStats, power: heroPower, metadata: Object.fromEntries(heroMetadata),
    shards: repeat5([5, 10, 20, 60, 100]), awakening: [10, ...repeat5([3, 5, 10, 30, 50])],
    books: [100, 100, 100, 100, ...repeat5([200, 300, 400]), ...repeat5([500, 500]), ...repeat5([600, 800, 1000, 1500, 2000])],
    weaponPieces: [20, 5, 5, 5, 5, ...repeat5([10, 20, 30, 50])],
  };
  console.log('Heroes:', heroMetadata.length, 'profiles');

  const stagesByLanguage = {};
  const bountiesByLanguage = {};
  for (const lang of langs) {
    const page = await documentPage(sourcePath('/tools/exploration/', lang));
    const parsed = await page.evaluate(() => ({
      stages: [...document.querySelectorAll('.ex-liste > .ex-s')].map(stage => ({
        stage: Number(stage.id.slice(1)), power: stage.querySelector('.ex-power')?.textContent.trim() || '',
        estimated: !!stage.querySelector('.ex-power[title]'), boss: !!stage.querySelector('.ex-tag'),
        mode: stage.querySelector('.ex-art')?.textContent.trim(),
        afk: Object.fromEntries(['z', 'x', 'f', 'w'].map(key => [key, stage.querySelector('.ex-afk .ic-' + key)?.textContent.trim() || '0'])),
        gifts: (stage.querySelector('.ex-geschenke')?.textContent.replace(/^[^:]+:\s*/, '') || '').split(', ').filter(Boolean).map(text => { const [name, amount] = text.split('×'); return { name: name.trim(), amount: Number(amount.replaceAll(',', '').trim()) }; }),
      })),
      bounties: [...document.querySelectorAll('.ex-karte[data-stage]')].map(card => ({ stage: Number(card.dataset.stage), rewards: [...card.querySelectorAll('.ex-karte-liste > li')].map(item => ({ name: [...item.children].find(child => child.tagName === 'SPAN' && !child.classList.contains('ex-karte-bild'))?.textContent.trim(), amount: Number(item.querySelector('b').textContent.replace(/[×,\s]/g, '')), icon: item.querySelector('img').getAttribute('src'), minutes: Number(item.querySelector('small')?.textContent.match(/\d+/)?.[0] || 0) })) })),
    }));
    stagesByLanguage[lang] = parsed.stages;
    bountiesByLanguage[lang] = parsed.bounties;
    assert.equal(parsed.stages.length, 906, lang);
    assert.equal(parsed.bounties.length, 23, lang);
    await page.close();
  }
  const giftNames = {};
  function giftId(gift, names) {
    const key = gift.name;
    if (!giftNames[key]) giftNames[key] = { id: 'g' + Object.keys(giftNames).length, name: names };
    return giftNames[key].id;
  }
  const exploration = {
    stages: stagesByLanguage.ko.map((stage, index) => ({
      ...stage, mode: Object.fromEntries(langs.map(lang => [lang, stagesByLanguage[lang][index].mode])),
      gifts: stage.gifts.map((gift, item) => ({ id: giftId(gift, Object.fromEntries(langs.map(lang => [lang, stagesByLanguage[lang][index].gifts[item]?.name || gift.name]))), amount: gift.amount })),
    })),
    bounties: bountiesByLanguage.ko.map((bounty, index) => ({ stage: bounty.stage, rewards: bounty.rewards.map((gift, item) => ({ id: giftId(gift, Object.fromEntries(langs.map(lang => [lang, bountiesByLanguage[lang][index].rewards[item]?.name || gift.name]))), amount: gift.amount, minutes: gift.minutes })) })),
    giftNames,
  };
  console.log('Exploration:', exploration.stages.length, 'stages,', exploration.bounties.length, 'bounties');

  const luckySource = pick(raw.lucky, value => value.gruppen && value.items && value.pity);
  const lucky = {
    guarantees: luckySource.sicher90, pity: luckySource.pity, slotsPerRow: luckySource.kartenJeReihe, pointsPerCoupon: 5000,
    milestoneRewards: raw.lucky.D.map(reward => ({ points: reward.punkte, item: reward.item, amount: reward.menge })),
    groups: luckySource.gruppen.map(group => ({ discount: group.rabatt, weight: group.gewicht, rows: group.reihen.map(row => ({ totalWeight: row.summe, offers: row.angebote.map(offer => ({ item: String(offer.item), quantity: offer.menge, price: offer.preis, weight: offer.gewicht })) })) })),
    items: Object.fromEntries(Object.entries(luckySource.items).map(([id, data]) => [id, { name: localized(data.namen), icon: data.bild }])),
  };
  assert.equal(lucky.groups.reduce((sum, group) => sum + group.weight, 0), 100);
  await writeFile('src/advanced-reference.json', JSON.stringify({ checkedAt: '2026-10-26', buildings, research, tank, equipment, heroes, exploration, lucky }));
  console.log('Advanced numeric reference snapshot saved.');
} finally { await browser.close(); }
