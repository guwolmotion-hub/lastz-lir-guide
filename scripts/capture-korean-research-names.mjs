import {chromium} from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
try {
 const page=await browser.newPage();
 await page.goto('https://lastz.invnrd.com/#tech');
 await page.waitForFunction(()=>typeof TREE!=='undefined'&&TREE?.order?.length,{timeout:60000});
 const result=await page.evaluate(async()=>{
  const english=await loadLang('en');
  return {
   original:{order:TREE.order,orderEn:TREE.orderEn,cats:TREE.cats},
   bilingual:Object.fromEntries(Object.entries(TREE.cats).map(([cat,nodes])=>[cat,nodes.map(n=>({branch:n.branch,name:n.name,en:english['tn.'+n.branch],max:n.maxlv,prereq:n.prereq,levels:n.levels}))])),
  };
 });
 fs.writeFileSync('qa/research-korean-game-names.json',JSON.stringify(result.original,null,2));
 fs.writeFileSync('qa/research-korean-bilingual.json',JSON.stringify(result.bilingual,null,2));
 console.log('Captured public Korean research labels and bilingual identity/cost metadata.');
} finally {await browser.close();}
