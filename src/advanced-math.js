import { numberInRange } from './tool-math.js';
export const sum = (xs = [], from = 0, to = xs.length) => xs.slice(from, to).reduce((a, b) => a + b, 0);
const valid = (v, a, b) => numberInRange(v, a, b, true) !== null;
export function buildingCost(building, current, target, reduction = 0, speed = 0) {
  if (!valid(current, 0, building.maxLevel) || !valid(target, current, building.maxLevel) || numberInRange(reduction, 0, 100) === null || numberInRange(speed, 0, 10000) === null) return null;
  const rows = building.costs.filter(r => r.level > current && r.level <= target);
  const result = Object.fromEntries(['food', 'wood', 'coins', 'steel', 'seconds'].map(key => [key, rows.some(r => r[key] == null) ? null : rows.reduce((s, r) => s + (key === 'seconds' ? Math.ceil(r[key] / (1 + speed / 100)) : Math.ceil(r[key] * (1 - reduction / 100))), 0)]));
  return { ...result, rows };
}
export function researchCost(tree, progress, targets, reduction = 0, speed = 0) {
  if (numberInRange(reduction, 0, 100) === null || numberInRange(speed, 0, 10000) === null) return null;
  const totals = { badges: 0, electricity: 0, coins: 0, seconds: 0, power: 0, missing: [] };
  for (const node of tree.nodes) {
    const from = Number(progress[node.id] ?? 0), to = Number(targets[node.id] ?? from);
    if (!valid(from, 0, node.max) || !valid(to, from, node.max)) return null;
    for (const key of ['badges', 'electricity', 'coins', 'seconds']) totals[key] += node[key].slice(from, to).reduce((a, b) => a + Math.ceil(key === 'seconds' ? b / (1 + speed / 100) : key === 'badges' ? b * (1 - reduction / 100) : b), 0);
    totals.power += (node.power[to - 1] || 0) - (node.power[from - 1] || 0);
    if (to > from) for (const req of node.requires) if (Number(targets[req.id] ?? progress[req.id] ?? 0) < req.requiredLevel) totals.missing.push({ node: node.id, ...req });
  }
  return totals;
}
export function tankLevelCost(data, current, target, rank = 0, bonus = 0, carried = 0) {
  if (!valid(current, 0, 350) || !valid(target, current, 350) || !data.ranks[rank] || numberInRange(bonus, 0, 1000) === null || numberInRange(carried, 0, Math.max(0, data.experience[current] - 1)) === null) return null;
  let blueprints = 0, actions = 0, excess = carried;
  const r = data.ranks[rank];
  for (let level = current; level < target; level++) {
    const exp = data.experiencePerAction[level] * (1 + r.expBonus / 100) * (1 + bonus / 100);
    const n = Math.max(0, Math.ceil((data.experience[level] - excess) / exp));
    excess += n * exp - data.experience[level];
    actions += n;
    blueprints += n * Math.max(1, Math.floor(data.blueprintsPerAction[level] * (1 - r.blueprintReduction / 100)));
  }
  return { blueprints, actions, excess, power: (data.power[target] || 0) - (data.power[current] || 0), heroBonus: (data.heroBonus[target] || 0) - (data.heroBonus[current] || 0) };
}
export function tankModCost(mods, current, target) {
  const costs = mods.flatMap(m => Array(m.subLevels).fill(m.wrenchesPerSub));
  if (!valid(current, 0, costs.length) || !valid(target, current, costs.length)) return null;
  const powerAt = step => { let total=0;for(const m of mods){const n=Math.min(step,m.subLevels);total+=m.power[n-1]||0;step-=n;if(step<=0)break;}return total; };
  return { wrenches: sum(costs, current, target), power: powerAt(target) - powerAt(current) };
}
export function pluginCost(data, slot, quality, current, target) {
  const attr = data.attributes[slot + '-' + quality], costs = data.costs[quality];
  if (!attr || !valid(current, 0, attr.power.length - 1) || !valid(target, current, attr.power.length - 1)) return null;
  const totals = { experience: 0, copies: 0, materials: {}, power: attr.power[target] - attr.power[current] };
  // Cost row n upgrades step n to n+1; each full star has eight steps.
  for (const [exp, copies, material, quantity] of costs.slice(current, target)) { totals.experience += exp; totals.copies += copies; if (quantity) totals.materials[material] = (totals.materials[material] || 0) + quantity; }
  return totals;
}
export function equipmentCost(data, item, mode, current, target, promotion = 0, forge = 0, quantity = 1) {
  if (!valid(quantity, 1, 100) || !valid(promotion, 0, 30) || !valid(forge, 0, 6)) return null;
  const orange = item.q === 5;
  const max = (data.upgrades[item.q]?.baseMax || 0) + (orange ? data.promotion.levelBonus[promotion] + (forge === 6 ? data.forge.maxLevelBonus : 0) : 0);
  if (mode === 'enhance') {
    if (!valid(current, 0, max) || !valid(target, current, max)) return null;
    return { electricity: sum(data.upgrades[item.q]?.costs, current, target) * quantity, max };
  }
  if (!orange) return null;
  if (mode === 'craft') return { cores: data.craft[5].kern * quantity, coins: data.craft[5].zent * quantity, seconds: data.craft[5].zeit * quantity };
  const rows = mode === 'promotion' ? data.promotion.steps : data.forge.steps;
  if (!valid(current, 0, rows.length) || !valid(target, current, rows.length)) return null;
  const mapping = mode === 'promotion' ? { kern: 'cores', zent: 'coins', teile: 'parts' } : { stein: 'stones', puls: 'pulse', strom: 'electricity' };
  return { ...Object.fromEntries(Object.entries(mapping).map(([key, name]) => [name, rows.slice(current, target).reduce((s, r) => s + r[key], 0) * quantity])), rows: rows.slice(current, target), max };
}
export function heroPower(data, id, level, star, skills, weapon) {
  const hero = data.stats.helden[id], p = data.power.helden[id];
  if (!hero || !p || !valid(level, 1, 175) || !valid(star, 0, data.metadata[id].awakening ? 51 : 25) || !valid(weapon, 0, data.metadata[id].weapon ? 25 : 0)) return null;
  const g = hero.r - 1, li = level - 1, si = star + 1;
  let power = (data.stats.stufen.atk[g][li] + data.stats.stufen.def[g][li]) * data.power.k1 + data.stats.stufen.army[g][li] * data.power.k6;
  power += (data.stats.sterne.atk[g][star] + data.stats.sterne.def[g][star]) * data.power.k1 + data.stats.sterne.troop[g][star] * data.power.k6;
  for (let i = 0; i < p.sk.length; i++) if (level >= p.skFrei[i]) {
    const curve = data.power.skillMuster[p.sk[i]].filter(row => row[0] <= si).at(-1)?.[1];
    if (curve) power += curve[Math.min(Math.max(1, skills[i]), curve.length) - 1];
  }
  if (level >= p.passivAb[0] && si >= p.passivAb[1]) power += p.passiv.filter(row => row[0] <= si).at(-1)?.[1] || 0;
  return Math.round(power + (p.waffe?.[weapon] || 0));
}
export function parsePower(raw) {
  const match = String(raw).replace(/[≈,\s]/g, '').match(/^(\d+(?:\.\d+)?)([KMBG천만억조])?$/i);
  return match ? Number(match[1]) * ({ K: 1e3, M: 1e6, B: 1e9, G: 1e9, '천':1e3, '만':1e4, '억':1e8, '조':1e12 }[match[2]?.toUpperCase()] || 1) : null;
}
