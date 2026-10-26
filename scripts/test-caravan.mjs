import assert from 'node:assert/strict';
import {caravanLevels,calculateCaravan,parseCaravanPower} from '../src/caravan-math.js';
for(const [text,value] of [['15M',15e6],['15m',15e6],['15,5M',15.5e6],['15.5M',15.5e6],['15,000,000',15e6],['15.000.000',15e6],['1,50,00,000',15e6],['1500만',15e6],['1억 5000만',150e6],['3천만',30e6],['1500백만',1.5e9],['.5M',5e5]])assert.equal(parseCaravanPower(text),value,text);
assert.equal(parseCaravanPower('15','M'),15e6);
assert.equal(parseCaravanPower('15M','억'),15e6,'suffix must not be multiplied twice');
for(const x of ['',0,-1,'NaN','Infinity','-15M','15abc','1만2억','15,,5M','9'.repeat(320)])assert.equal(parseCaravanPower(x),null,String(x));
assert.equal(caravanLevels.length,50);
assert.deepEqual(caravanLevels.at(-1),{level:50,start:136200000,end:165000000});
for (const r of caravanLevels) {
 assert.equal(calculateCaravan({power:String(r.start-1)}).rows[r.level-1].beatable,0);
 assert.equal(calculateCaravan({power:String(r.start)}).rows[r.level-1].beatable,1);
 assert.equal(calculateCaravan({power:String(r.end-1)}).rows[r.level-1].beatable,19);
 assert.equal(calculateCaravan({power:String(r.end)}).rows[r.level-1].beatable,20);
}
for(const faction of ['blood-rose','wings-of-dawn','guard-of-order'])for(const [matching,bonus] of [['3',.05],['4',.07],['5',.1]])for(const weekly of [false,true]){
 const r=calculateCaravan({power:'15M',faction,matching,weekly});
 assert.equal(r.effective,Math.round(15e6*(1+bonus+(weekly?.1:0))));
 assert.equal(r.rows.length,50);
 assert.ok(calculateCaravan({power:String(15e6+r.needed),faction,matching,weekly}).rows[r.next.level-1].beatable===20);
}
assert.equal(calculateCaravan({power:'15M',faction:'',weekly:true}).effective,15e6);
assert.equal(calculateCaravan({power:'10'}).reach,null);
assert.equal(calculateCaravan({power:'165M'}).best.level,50);
assert.equal(calculateCaravan({power:'165M'}).next,null);
console.log('Caravan parser, 200 stage boundaries, all faction/buff combinations, next-target cost and level 50 verified.');
