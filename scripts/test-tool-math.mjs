import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { caravanPlan, compactAmount, discountPlan, experiencePlan, hqPlan, numberInRange, packPlan, safeStoredPlan, speedupPlan } from '../src/tool-math.js';

const reference = JSON.parse(readFileSync(new URL('../src/game-reference.json', import.meta.url), 'utf8'));

test('resource notation and invalid inputs', () => {
  assert.equal(compactAmount('1.6G'), 1600000000);
  assert.equal(compactAmount('754.7K'), 754700);
  assert.equal(compactAmount('-'), 0);
  assert.throws(() => compactAmount('unknown'));
  for (const value of ['', null, {}, NaN, Infinity, -1]) assert.equal(numberInRange(value), null);
});

test('HQ cumulative costs, reductions and equal levels', () => {
  const rows = [['16 -> 17', '18.2M', '18.2M', '3.5M', '-'], ['17 -> 18', '31.9M', '31.9M', '6.2M', '-']];
  assert.deepEqual(hqPlan(rows, 16, 18).totals, [50100000, 50100000, 9700000, 0]);
  assert.deepEqual(hqPlan(rows, 16, 18, 10).totals, [45090000, 45090000, 8730000, 0]);
  assert.deepEqual(hqPlan(rows, 17, 17).totals, [0, 0, 0, 0]);
  assert.equal(hqPlan(rows, 17, 16), null);
  assert.equal(hqPlan(rows, 16, 18, 101), null);
});

test('hero EXP matches independently published full and early-level totals', () => {
  assert.equal(experiencePlan(reference.heroExp, 1, 175).total, 21817444500);
  assert.equal(experiencePlan(reference.heroExp, 1, 100).total, 482444500);
  assert.equal(experiencePlan(reference.heroExp, 150, 175).total, 16860000000);
  assert.equal(experiencePlan(reference.heroExp, 1, 100, 2, 100000000).missing, 864889000);
  assert.equal(experiencePlan(reference.heroExp, 175, 175).total, 0);
  assert.equal(experiencePlan(reference.heroExp, 100, 99), null);
  assert.equal(experiencePlan(reference.heroExp, 1, 176), null);
  assert.equal(experiencePlan(reference.heroExp, 1, 100, 1.5), null);
});

test('Caravan uses strict end-threshold comparison and ignores unknown ends', () => {
  const rows = [{ level: '1', end: '31K' }, { level: '2', end: '86K' }, { level: '3', end: null }];
  assert.equal(caravanPlan(rows, 31000, 0).best, null);
  assert.equal(caravanPlan(rows, 31001, 0).best.level, '1');
  assert.equal(caravanPlan(rows, 30000, 10).effective, 33000);
  assert.equal(caravanPlan(rows, 1000000, 10).best.level, '2');
  assert.equal(caravanPlan(rows, -1, 0), null);
});

test('speedups sum compatible inventory and report shortfall or surplus', () => {
  assert.deepEqual(speedupPlan(1440, [10, 5, 1], [1, 60, 1440]), { total: 1750, missing: 0, surplus: 310 });
  assert.equal(speedupPlan(1440, [5], [60]).missing, 1140);
  assert.equal(speedupPlan(10, [-1], [60]), null);
});

test('resource packs round up and open only the quantity needed', () => {
  assert.equal(packPlan(1000, 100, 300, 2).shortPacks, 1);
  assert.equal(packPlan(1000, 100, 400, 10).needed, 3);
  assert.equal(packPlan(1000, 100, 400, 10).remaining, 300);
  assert.equal(packPlan(1000, 2000, 400, 10).remaining, 1000);
  assert.equal(packPlan(1000, 0, 0, 10), null);
});

test('discount budget covers rounding, zero-price and insufficient funds', () => {
  assert.deepEqual(discountPlan(1000, 80, 10, 1000), { unitPrice: 200, total: 2000, saving: 8000, remaining: -1000 });
  assert.equal(discountPlan(999, 90, 1, 200).unitPrice, 100);
  assert.equal(discountPlan(1000, 100, 10, 0).total, 0);
  assert.equal(discountPlan(1000, -1, 1, 0), null);
  assert.equal(discountPlan(0.5, 0, 1, 1), null);
});

test('stored plans reject corrupt data and unknown keys', () => {
  const defaults = { current: '1', target: '100' };
  assert.deepEqual(safeStoredPlan('broken', defaults), defaults);
  assert.deepEqual(safeStoredPlan('[1,2]', defaults), defaults);
  assert.deepEqual(safeStoredPlan('{"current":"20","target":null,"unknown":true}', defaults), { current: '20', target: '100' });
});
