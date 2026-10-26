import React from 'react';
import {fmt} from './advanced-ui.jsx';
import './research-badges.css';

const messages={
 total:['총 필요 휘장','Total badges','Insignias totales','कुल आवश्यक पदक'],
 completed:['완료 연구분','Completed research','Investigación completada','पूरे शोध का भाग'],
 remaining:['앞으로 필요한 휘장','Badges still needed','Insignias pendientes','आगे आवश्यक पदक'],
 owned:['현재 보유 휘장','Badges you own','Insignias que tienes','आपके पास पदक'],
 short:['보유량 제외 부족분','Shortfall after inventory','Faltan tras descontar inventario','भंडार के बाद कमी'],
 all:['전체 21개 연구 합계','All 21 research trees','Total de los 21 árboles','सभी 21 शोध शाखाओं का योग'],
 ratio:['휘장 비용 기준 완료율','Badge-cost completion','Avance según coste en insignias','पदक लागत के अनुसार प्रगति'],
 note:['저장된 현재 레벨과 절감률을 반영합니다. 완료 연구분은 현재 설정으로 환산한 값이며 실제 지출 기록은 아닙니다.','Uses saved levels and current savings. Completed cost is recalculated at these settings, not a spending history.','Usa niveles guardados y ahorro actual. El coste completado se recalcula con estos ajustes; no es un historial de gasto.','सहेजे स्तर और मौजूदा बचत लागू हैं। पूरा शोध मौजूदा दर से गिना गया है; यह वास्तविक खर्च का इतिहास नहीं है।'],
 inventory:['보유량은 모든 연구에서 공유하는 현재 잔액입니다. 진행도를 바꿔도 보유량을 자동 차감하지 않습니다.','Inventory is one shared balance for all trees. Editing progress does not automatically subtract badges.','El inventario es un saldo común para todos los árboles. Cambiar progreso no descuenta insignias automáticamente.','भंडार सभी शाखाओं की एक साझा शेष राशि है। प्रगति बदलने से पदक अपने आप नहीं घटते।'],
 free:['휘장이 필요 없는 연구입니다.','This research needs no badges.','Esta investigación no necesita insignias.','इस शोध में पदक नहीं लगते।'],
 cardRemaining:['남은 휘장','Badges remaining','Insignias restantes','बाकी पदक'],
 invalid:['보유량은 0 이상의 정수로 입력하세요.','Enter a non-negative whole inventory count.','Introduce un inventario entero de cero o más.','भंडार में शून्य या अधिक पूर्ण संख्या लिखें।'],
};
export const badgeCopy=Object.fromEntries(['ko','en','es','hi'].map((lang,i)=>[lang,Object.fromEntries(Object.entries(messages).map(([key,value])=>[key,value[i]]))]));

export function badgeBudget(full,used,remaining,rawOwned) {
 const n=String(rawOwned).trim();
 const owned=n!==''&&/^\d+$/.test(n)&&Number.isSafeInteger(Number(n))?Number(n):null;
 return {full,used,remaining,owned,shortfall:owned==null?null:Math.max(0,remaining-owned),percent:full>0?Math.round(used/full*1000)/10:100};
}

export default function ResearchBadges({lang,full,used,remaining,owned,onOwned,scope,small=false}) {
 const c=badgeCopy[lang],budget=badgeBudget(full,used,remaining,owned);
 const prefix=small?'tree':'all';
 return <section className={'rs-badges'+(small?' compact':'')} data-badge-summary={prefix} aria-label={scope||c.all}>
  <header><span>{scope||c.all}</span><strong>🎖</strong></header>
  <dl className="rs-badge-metrics">
   <div className="rs-badge-remaining"><dt>{c.remaining}</dt><dd data-badge-value="remaining">{fmt(remaining,lang)}</dd></div>
   <div><dt>{c.total}</dt><dd data-badge-value="total">{fmt(full,lang)}</dd></div>
   <div><dt>{c.completed}</dt><dd data-badge-value="used">{fmt(used,lang)}</dd></div>
  </dl>
  {full>0?<div className="rs-badge-progress"><span>{c.ratio}<b>{budget.percent}%</b></span><div role="progressbar" aria-label={c.ratio} aria-valuemin={0} aria-valuemax={100} aria-valuenow={budget.percent}><i style={{width:`${budget.percent}%`}}/></div></div>:<p className="rs-badge-free">{c.free}</p>}
  <div className="rs-badge-inventory">
   <label htmlFor={`research-owned-badges-${prefix}`}><span>{c.owned}</span><input id={`research-owned-badges-${prefix}`} type="number" min="0" step="1" inputMode="numeric" value={owned} onChange={e=>onOwned(e.target.value)} aria-invalid={budget.owned==null}/></label>
   <div><span>{c.short}</span><strong data-badge-value="shortfall">{budget.shortfall==null?'—':fmt(budget.shortfall,lang)}</strong></div>
  </div>
  {budget.owned==null&&<p role="alert" className="tool-validation">{c.invalid}</p>}
  <details className="rs-badge-explanation"><summary>{c.note.split('.')[0]}</summary><p>{c.note}</p><p>{c.inventory}</p></details>
 </section>;
}

export function CategoryBadges({lang,full,used,remaining}) {
 const c=badgeCopy[lang];
 return <div className="rs-category-badges">
  <span>{c.cardRemaining}</span><strong data-badge-card="remaining">{fmt(remaining,lang)}</strong>
  <dl><div><dt>{c.total}</dt><dd>{fmt(full,lang)}</dd></div><div><dt>{c.completed}</dt><dd>{fmt(used,lang)}</dd></div></dl>
 </div>;
}
