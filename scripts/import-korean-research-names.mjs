import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=JSON.parse(fs.readFileSync('qa/research-korean-bilingual.json','utf8'));
const order=JSON.parse(fs.readFileSync('qa/research-korean-game-names.json','utf8'));
const data=JSON.parse(fs.readFileSync('src/advanced-reference.json','utf8'));
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g,'');
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const output={},audit=[],unresolved=[];
for(const tree of data.research) {
 const index=order.orderEn.findIndex(n=>norm(n)===norm(tree.name.en));
 assert.ok(index>=0,tree.id);
 const title=order.order[index],nodes=source[title],used=new Set(),names={};
 for(const node of tree.nodes) {
  const costMatch=g=>g.max===node.max&&same(g.levels.map(l=>l.power),node.power)&&same(g.levels.map(l=>l.elec),node.electricity)&&same(g.levels.map(l=>l.coin),node.coins);
  let candidates=nodes.filter(g=>norm(g.en)===norm(node.name.en)&&costMatch(g));
  if(candidates.length!==1)candidates=nodes.filter(costMatch);
  if(candidates.length!==1) {
   candidates=nodes.filter(g=>norm(g.en)===norm(node.name.en)&&g.max===node.max);
  }
  // Identical labels across repeated branches are sufficient for a name-only
  // overlay; do not pretend their numeric costs or branch IDs were matched.
  if(candidates.length>1&&new Set(candidates.map(g=>g.name)).size===1) {
   names[node.id]=candidates[0].name;
   audit.push({tree:tree.id,id:node.id,branch:null,candidates:candidates.map(g=>g.branch),before:node.name.ko,after:names[node.id],costMatch:false});continue;
  }
  if(candidates.length!==1||used.has(candidates[0].branch)) {unresolved.push({tree:tree.id,id:node.id,en:node.name.en,ko:node.name.ko,candidates:candidates.map(g=>({branch:g.branch,name:g.name,en:g.en}))});continue;}
  const g=candidates[0];used.add(g.branch);names[node.id]=g.name;
  audit.push({tree:tree.id,id:node.id,branch:g.branch,before:node.name.ko,after:g.name,costMatch:costMatch(g)});
 }
 output[tree.id]={name:title,nodes:names};
}
fs.writeFileSync('qa/korean-research-name-audit.json',JSON.stringify({audit,unresolved},null,2));
console.log('Matched',audit.length,'nodes; changed',audit.filter(x=>x.before!==x.after).length,'; unresolved',unresolved.length);
if(unresolved.length){console.log(JSON.stringify(unresolved,null,2));process.exitCode=1;}
else {
 fs.writeFileSync('src/research-korean-names.json',JSON.stringify(output,null,2)+'\n');
 const index=JSON.parse(fs.readFileSync('src/research-reference.json','utf8'));
 const withoutNames=value=>JSON.stringify(value,(key,value)=>key==='name'?undefined:value);
 const beforeData=withoutNames(data),beforeIndex=withoutNames(index);
 for(const tree of data.research) {
  tree.name.ko=output[tree.id].name;
  for(const node of tree.nodes)node.name.ko=output[tree.id].nodes[node.id];
 }
 for(const tree of index.trees)tree.name.ko=output[tree.id].name;
 assert.equal(withoutNames(data),beforeData,'non-name data must remain identical');
 assert.equal(withoutNames(index),beforeIndex,'unlock and cost data must remain identical');
 fs.writeFileSync('src/advanced-reference.json',JSON.stringify(data));
 fs.writeFileSync('src/research-reference.json',JSON.stringify(index,null,2)+'\n');
}
