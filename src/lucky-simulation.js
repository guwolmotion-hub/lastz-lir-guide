import seedrandom from 'seedrandom';
function pick(rows, random) {
  let n=random()*rows.reduce((s,r)=>s+r.weight,0);
  for(const row of rows) {n-=row.weight;if(n<0)return row;}
  return rows.at(-1);
}
export function simulateLucky(data, plan, trials=300, seed='nova-lucky-v1') {
  const random=seedrandom(seed), outputs=[];
  const target=Number(plan.goal), initial=Number(plan.owned), maxCoupons=plan.mode==='couponMode'?Number(plan.coupons):20000;
  for(let trial=0;trial<trials;trial++) {
    let draw=Number(plan.draw), streak=Number(plan.streak), points=Number(plan.points), coupons=0, diamonds=0, amount=initial, milestone=0, events=1;
    while(milestone<data.milestoneRewards.length&&data.milestoneRewards[milestone].points<=points)milestone++;
    const rewards=()=>{while(milestone<data.milestoneRewards.length&&points>=data.milestoneRewards[milestone].points){const r=data.milestoneRewards[milestone++];if(r.item===plan.item)amount+=r.amount;}};
    while(coupons<maxCoupons&&(plan.mode==='couponMode'||amount<target)) {
      if(Number(plan.batch)>0&&draw>=Number(plan.batch)){draw=0;streak=0;points=0;milestone=0;events++;}
      coupons++;draw++;points+=data.pointsPerCoupon;rewards();
      const group=data.guarantees.includes(draw)||streak+1>=data.pity?data.groups.find(g=>g.discount===90):pick(data.groups,random);
      streak=group.discount===90?0:streak+1;
      for(const row of group.rows)for(let slot=0;slot<data.slotsPerRow;slot++){
        const offer=pick(row.offers,random);
        if(group.discount>=Number(plan.threshold)&&offer.item===plan.item&&(plan.mode==='couponMode'||amount<target)){amount+=offer.quantity;diamonds+=offer.price;points+=offer.price;rewards();}
      }
    }
    outputs.push({coupons,diamonds,amount,events,capped:plan.mode!=='couponMode'&&amount<target});
  }
  const stats=key=>{const a=outputs.map(o=>o[key]).sort((a,b)=>a-b);return{low:a[Math.floor((a.length-1)*.1)],median:a[Math.floor((a.length-1)*.5)],high:a[Math.floor((a.length-1)*.9)]};};
  return {coupons:stats('coupons'),diamonds:stats('diamonds'),amount:stats('amount'),capped:outputs.filter(o=>o.capped).length};
}
