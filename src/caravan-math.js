import levels from './caravan-reference.json' with { type: 'json' };
export { levels as caravanLevels };
export const caravanUnits = { '1':1, K:1e3, M:1e6, '만':1e4, '억':1e8 };

function decimal(raw) {
  let s=raw;
  // Accept standard/Indian digit grouping and decimal commas without silently
  // turning 15,5M into 155M. Mixed separators use the last as the decimal mark.
  if(s.includes(',') && s.includes('.')) {
    s=s.lastIndexOf(',')>s.lastIndexOf('.') ? s.replace(/\./g,'').replace(',','.') : s.replace(/,/g,'');
  } else if(s.includes(',')) {
    if(/^\d{1,3}(?:,\d{3})+$/.test(s)||/^\d{1,2}(?:,\d{2})*,\d{3}$/.test(s)) s=s.replace(/,/g,'');
    else if(/^(?:\d+)?[,]\d+$/.test(s)) s=s.replace(',','.');
    else return null;
  } else if(/^\d{1,3}(?:\.\d{3}){2,}$/.test(s)) s=s.replace(/\./g,'');
  if(!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s))return null;
  return Number(s);
}
export function parseCaravanPower(raw, unit='1') {
  const s=String(raw).normalize('NFKC').replace(/[≈\s]/g,'');
  if(!s||!(unit in caravanUnits))return null;
  let value;
  const short=s.match(/^([\d.,]+)([KMBG])?$/i);
  if(short) {
    const n=decimal(short[1]);
    if(n==null)return null;
    value=n*(short[2]?{K:1e3,M:1e6,B:1e9,G:1e9}[short[2].toUpperCase()]:caravanUnits[unit]);
  } else {
    const units={'조':1e12,'억':1e8,'천만':1e7,'백만':1e6,'십만':1e5,'만':1e4,'천':1e3,'백':100,'십':10};
    const pattern=/([\d.,]+)(천만|백만|십만|조|억|만|천|백|십)/gy;
    let pos=0,previous=Infinity,total=0,match;
    while((match=pattern.exec(s))) {
      const n=decimal(match[1]),scale=units[match[2]];
      if(n==null||scale>=previous)return null;
      total+=n*scale;previous=scale;pos=pattern.lastIndex;
    }
    if(!pos)return null;
    if(pos<s.length) {
      const tail=decimal(s.slice(pos));
      if(tail==null||tail>=previous)return null;
      total+=tail;
    }
    value=total;
  }
  return Number.isFinite(value)&&value>0&&value<=Number.MAX_SAFE_INTEGER?value:null;
}

export function calculateCaravan({power,unit='1',faction='',matching='5',weekly=false}) {
  const base=parseCaravanPower(power,unit);
  if(base==null)return null;
  const hasFaction=['blood-rose','wings-of-dawn','guard-of-order'].includes(faction);
  const matchingBonus=hasFaction?({'3':.05,'4':.07,'5':.1}[matching]||0):0;
  const extraBonus=hasFaction&&weekly===true?.1:0;
  const multiplier=1+matchingBonus+extraBonus;
  const effective=Math.round(base*multiplier);
  if(!Number.isSafeInteger(effective))return null;
  const rows=levels.map(r=>({...r,beatable:effective<r.start?0:effective>=r.end?20:Math.floor(1+19*(effective-r.start)/(r.end-r.start))}));
  const best=rows.filter(r=>r.beatable===20).at(-1)||null;
  const reach=rows.filter(r=>r.beatable>0).at(-1)||null;
  const next=rows.find(r=>r.beatable<20)||null;
  return {base,matchingBonus,extraBonus,multiplier,effective,rows,best,reach,next,needed:next?Math.max(0,Math.ceil(next.end/multiplier)-base):0};
}
