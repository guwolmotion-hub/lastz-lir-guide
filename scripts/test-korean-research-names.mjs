import fs from 'node:fs';
import assert from 'node:assert/strict';
import {researchName} from '../src/research-guide.js';
const names=JSON.parse(fs.readFileSync('src/research-korean-names.json','utf8'));
const data=JSON.parse(fs.readFileSync('src/advanced-reference.json','utf8'));
const index=JSON.parse(fs.readFileSync('src/research-reference.json','utf8'));
assert.equal(Object.keys(names).length,21);
let count=0;
for(const tree of data.research) {
 assert.equal(tree.name.ko,names[tree.id].name);
 assert.equal(researchName(tree,'ko'),tree.name.ko);
 assert.equal(index.trees.find(t=>t.id===tree.id).name.ko,tree.name.ko);
 assert.equal(Object.keys(names[tree.id].nodes).length,tree.nodes.length);
 for(const n of tree.nodes){assert.equal(n.name.ko,names[tree.id].nodes[n.id]);assert.match(n.name.ko,/[가-힣]/);count++;}
}
assert.equal(count,430);
assert.equal(names.peace_shield.name,'전쟁 수호');
assert.equal(names.unit_special_training.name,'유닛 특훈');
assert.equal(names.military_strategies.name,'군사 이론');
assert.equal(names.siege_to_seize.name,'도시 함락');
assert.equal(names.tactical_master.name,'전술 마스터');
assert.deepEqual(['stock-management','stock-management-2','stock-management-3','stock-management-4'].map(id=>names.new_home.nodes[id]),['재고 관리I','재고 관리II','재고 관리III','재고 관리IV']);
console.log('21 Korean category names and 430 node labels verified, including per-node Roman numeral distinctions.');
