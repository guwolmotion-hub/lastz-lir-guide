export const UNITS = { '1': 1, K: 1e3, M: 1e6, G: 1e9 };

export function numberInRange(value, min = 0, max = 1e15, integer = false) {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  if (String(value).trim() === '') return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max && (!integer || Number.isInteger(number)) ? number : null;
}

export function compactAmount(value) {
  if (value === '-' || value == null) return 0;
  const match = String(value).trim().match(/^(\d+(?:\.\d+)?)\s*([KMG])?$/i);
  if (!match) throw new Error('Invalid resource amount: ' + value);
  return Number(match[1]) * (UNITS[match[2]?.toUpperCase()] || 1);
}

export function hqPlan(rows, current, target, reduction = 0) {
  if (numberInRange(current, 16, 35, true) === null || numberInRange(target, current, 35, true) === null || numberInRange(reduction, 0, 100) === null) return null;
  const selected = rows.filter(row => {
    const from = Number(row[0].split(' -> ')[0]);
    return from >= current && from < target;
  });
  const costs = selected.map(row => row.slice(1, 5).map(value => Math.ceil(compactAmount(value) * (1 - reduction / 100))));
  return { rows: selected, costs, totals: [0, 1, 2, 3].map(index => costs.reduce((sum, row) => sum + row[index], 0)) };
}

export function experiencePlan(table, current, target, count = 1, owned = 0) {
  if (numberInRange(current, 1, table.length, true) === null || numberInRange(target, current, table.length, true) === null || numberInRange(count, 1, 100, true) === null || numberInRange(owned) === null) return null;
  const perHero = table.slice(current, target).reduce((sum, exp) => sum + exp, 0);
  return { perHero, total: perHero * count, missing: Math.max(0, perHero * count - owned) };
}

export function caravanPlan(levels, power, bonus = 10) {
  if (numberInRange(power) === null || numberInRange(bonus, 0, 100) === null) return null;
  const effective = power * (1 + bonus / 100);
  const known = levels.filter(row => row.end && row.end !== '-').map(row => ({ ...row, threshold: compactAmount(row.end) })).sort((a, b) => Number(a.level) - Number(b.level));
  const eligible = known.filter(row => effective > row.threshold);
  const best = eligible.at(-1) || null;
  const next = known.find(row => !best || Number(row.level) > Number(best.level)) || null;
  return { effective, best, next, needed: next ? Math.max(0, next.threshold / (1 + bonus / 100) - power) : 0, eligible };
}

export function speedupPlan(required, quantities, sizes) {
  if (numberInRange(required) === null || quantities.some(value => numberInRange(value, 0, 1e9, true) === null)) return null;
  const total = quantities.reduce((sum, count, index) => sum + count * sizes[index], 0);
  return { total, missing: Math.max(0, required - total), surplus: Math.max(0, total - required) };
}

export function packPlan(required, owned, size, count) {
  if ([required, owned].some(value => numberInRange(value) === null) || numberInRange(size, 1) === null || numberInRange(count, 0, 1e9, true) === null) return null;
  const missing = Math.max(0, required - owned);
  const needed = Math.ceil(missing / size);
  return { missing, needed, available: size * count, shortPacks: Math.max(0, needed - count), remaining: Math.max(0, owned + size * Math.min(needed, count) - required) };
}

export function discountPlan(price, discount, quantity, budget) {
  if ([price, budget].some(value => numberInRange(value, 0, 1e15, true) === null) || numberInRange(discount, 0, 100) === null || numberInRange(quantity, 1, 1e9, true) === null) return null;
  const unitPrice = Math.ceil(price * (1 - discount / 100));
  const total = unitPrice * quantity;
  return { unitPrice, total, saving: price * quantity - total, remaining: budget - total };
}

export function safeStoredPlan(raw, defaults) {
  try {
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return defaults;
    return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key, typeof saved[key] === typeof value ? saved[key] : value]));
  } catch {
    return defaults;
  }
}
