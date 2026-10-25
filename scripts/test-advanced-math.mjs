import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildingCost,researchCost,tankLevelCost,tankModCost,pluginCost,equipmentCost,heroPower,parsePower } from '../src/advanced-math.js';
import { simulateLucky } from '../src/lucky-simulation.js';
import { hindiTechnology } from '../src/advanced-hindi.js';
const d=JSON.parse(await readFile(new URL('../src/advanced-reference.json',import.meta.url),'utf8'));
assert.equal(d.buildings.length,32);assert.equal(d.research.length,21);assert.equal(Object.keys(d.heroes.metadata).length,36);assert.equal(d.exploration.stages.length,906);assert.equal(d.exploration.bounties.length,23);
const hq=d.buildings[0];assert.equal(buildingCost(hq,16,17).food,18234520);assert.equal(buildingCost(hq,16,16).food,0);assert.equal(buildingCost(hq,17,16),null);assert.equal(buildingCost(hq,16,17,50,100).seconds,71336);
for(const tree of d.research){const targets=Object.fromEntries(tree.nodes.map(n=>[n.id,n.max]));const all=researchCost(tree,{},targets);assert.equal(all.badges,tree.badges);assert.equal(all.missing.length,0);const reduced=researchCost(tree,{},targets,50,100);assert.equal(reduced.coins,all.coins);assert.ok(reduced.badges<=all.badges);assert.ok(reduced.seconds<=all.seconds);for(const n of tree.nodes)assert.ok(hindiTechnology(n.name.en));}
assert.equal(tankLevelCost(d.tank.levels,0,1).blueprints,45);assert.equal(tankLevelCost(d.tank.levels,0,1).actions,3);assert.equal(tankLevelCost(d.tank.levels,0,1,6).blueprints,14);assert.equal(tankLevelCost(d.tank.levels,10,0),null);
const steps=d.tank.mods.reduce((s,m)=>s+m.subLevels,0);assert.equal(tankModCost(d.tank.mods,0,steps).wrenches,70700);assert.equal(tankModCost(d.tank.mods,0,steps).power,7750133);assert.equal(tankModCost(d.tank.mods,5,6).power,8230);
assert.equal(pluginCost(d.tank.plugins,1,5,0,1).experience,10000);assert.equal(pluginCost(d.tank.plugins,1,3,0,41),null);
const orange=d.equipment.types.find(t=>t.q===5);assert.equal(equipmentCost(d.equipment,orange,'enhance',0,1).electricity,5000);assert.equal(equipmentCost(d.equipment,orange,'enhance',0,51),null);assert.equal(equipmentCost(d.equipment,orange,'enhance',0,100,30,6).max,100);assert.equal(equipmentCost(d.equipment,orange,'promotion',0,1).cores,100);assert.equal(equipmentCost(d.equipment,orange,'forge',0,6).stones,980);assert.equal(equipmentCost(d.equipment,orange,'craft',0,0,0,0,2).cores,1500);
for(const id of Object.keys(d.heroes.metadata)){assert.ok(Number.isFinite(heroPower(d.heroes,id,1,0,[1,1,1],0)));assert.ok(heroPower(d.heroes,id,175,25,[30,30,30],0)>heroPower(d.heroes,id,1,0,[1,1,1],0));}
assert.equal(parsePower('≈ 1.2M'),1200000);
const p={mode:'couponMode',goal:'200000',owned:'0',coupons:'9',threshold:'90',draw:'0',streak:'0',points:'0',batch:'0',item:'200034'};
const simulation=simulateLucky(d.lucky,p,10,'test');assert.deepEqual(simulation,simulateLucky(d.lucky,p,10,'test'));assert.equal(simulation.coupons.median,9);assert.ok(simulation.amount.low>=1200);assert.equal(simulateLucky(d.lucky,{...p,coupons:'0'},1).diamonds.median,0);
console.log('Advanced data, all research totals, hero power, tank boundaries, equipment and seeded simulation checks passed.');
