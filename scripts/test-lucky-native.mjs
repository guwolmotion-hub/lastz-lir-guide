import assert from'node:assert/strict';import{readFile}from'node:fs/promises';import{drawLucky,buyLucky,claimLucky,simulateNativeLucky}from'../src/lucky-native-engine.js';
const data=JSON.parse(await readFile('src/advanced-reference.json','utf8')).lucky;
const start={draw:0,streak:0,points:0,diamonds:0,coupons:0,milestone:0,inventory:{},discounts:{},offers:[]};
for(const draw of [5,9,18,32])assert.equal(drawLucky(data,{...start,draw:draw-1},()=>0).discount,90);
assert.equal(drawLucky(data,{...start,draw:40,streak:24},()=>0).discount,90);
assert.equal(drawLucky(data,start,()=>0).discount,10);
const milestone=claimLucky(data,{...start,points:30000});assert.equal(milestone.inventory['200034'],200);assert.equal(milestone.milestone,1);
const purchase=buyLucky(data,{...start,points:29900},{item:'250000',price:100,quantity:20});assert.equal(purchase.diamonds,100);assert.equal(purchase.inventory['250000'],20);assert.equal(purchase.inventory['200034'],200);
const plan={goals:JSON.stringify([{item:'200034',quantity:100}]),selection:'{}',mode:'goalMode',draw:'0',streak:'0',points:'0',batch:'0',coupons:'5'};
const result=simulateNativeLucky(data,plan,10);assert.equal(result.capped,0);for(const s of result.columns){assert.equal(s.coupons,6);assert.equal(s.diamonds,0);assert.equal(s.inventory['200034'],200);}
const fixed=simulateNativeLucky(data,{...plan,mode:'couponMode'},5);for(const s of fixed.columns)assert.equal(s.coupons,5);
assert.deepEqual(result,simulateNativeLucky(data,plan,10));console.log('Native Lucky guarantees, pity, milestones, purchase points, goal/coupon modes and deterministic trials passed.');
