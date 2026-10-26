import React,{useState} from 'react';
import {advancedCopy} from './advanced-copy.js';
import {nativeCopy} from './native-copy.js';
import {toolCopy} from './tools-copy.js';
import {useAdvancedPlan,fmt,Table} from './advanced-ui.jsx';
import {NativeTabs,Factions} from './NativeKit.jsx';
import {calculateCaravan,caravanUnits} from './caravan-math.js';
import {caravanUi} from './caravan-copy.js';

export default function CaravanStudio({lang}) {
 const c=advancedCopy[lang],n=nativeCopy[lang],tc=toolCopy[lang],copy=caravanUi[lang];
 const [plan,set]=useAdvancedPlan('caravan',{power:'',unit:'1',faction:'',matching:'5',weekly:false});
 const [shown,show]=useState(false);
 const result=calculateCaravan(plan);
 const submit=e=>{e.preventDefault();show(true);};
 return <section className="native-tools nt-caravan" data-native-tool="caravan">
  <h2>{tc.caravan}</h2>
  <div className={'nt-caravan-layout'+(shown?' results':'')}>
   <form onSubmit={submit} noValidate>
    <div className="nt-panel">
     <div className="nt-caravan-power-input">
      <label className="tool-field" htmlFor="caravan-power"><span>{copy.power}</span><input id="caravan-power" type="text" autoComplete="off" value={plan.power} onChange={e=>set('power',e.target.value)} placeholder={n.powerInput} aria-describedby="caravan-input-help" aria-invalid={shown&&!result}/></label>
      <label className="tool-field" htmlFor="caravan-unit"><span>{copy.units}</span><select id="caravan-unit" value={plan.unit} onChange={e=>set('unit',e.target.value)}>{Object.keys(caravanUnits).map(unit=><option key={unit} value={unit}>{unit==='1'?copy.raw:unit}</option>)}</select></label>
     </div>
     <p className="nt-note" id="caravan-input-help">{copy.hint}</p>
    </div>
    <div className="nt-panel"><h3>{n.faction}</h3><Factions lang={lang} value={plan.faction} onChange={v=>set('faction',plan.faction===v?'':v)} labels={tc.factions}/>
     {plan.faction&&<div className="nt-caravan-bonuses"><p>{copy.matching}</p><NativeTabs active={plan.matching} onChange={v=>set('matching',v)} items={['3','4','5'].map(v=>[v,v])}/><label className="nt-check"><input type="checkbox" checked={plan.weekly} onChange={e=>set('weekly',e.target.checked)}/>{copy.extra}</label></div>}
     <p className="nt-note">{copy.bonusHint}</p>
    </div>
    <button type="submit" className="nt-button primary nt-full">{n.calculate}</button>
    <p className="nt-note">{copy.help}</p>
    {result&&<p className="nt-statline"><span>{tc.effective}</span><strong data-result="caravan-effective">{fmt(result.effective,lang)}</strong></p>}
   </form>
   {shown&&<div aria-live="polite">
    {!result?<p role="alert" className="tool-validation">{copy.invalid}</p>:<>
     <div className="nt-resource-summary"><div><span>{copy.full}</span><strong data-result="caravan-level">{result.best?.level||'—'}</strong>{!result.best&&<small>{copy.none}</small>}</div><div><span>{copy.reach}</span><strong data-result="caravan-reach">{result.reach?`${result.reach.level} · ${result.reach.beatable}/20`:'—'}</strong>{!result.reach&&<small>{copy.below}</small>}</div></div>
     <p className="nt-panel nt-caravan-next">{result.next?<><span>{copy.next}: <b>{result.next.level}</b></span><span>{tc.needMore}: <b data-result="caravan-needed">{fmt(result.needed,lang)}</b></span></>:copy.top}</p>
     <Table id="native-caravan-levels" headers={[c.level,tc.startPower+' — '+tc.endPower,copy.sub]}>{result.rows.map(r=><tr key={r.level} className={r.beatable===20?'nt-clear':r.beatable>0?'nt-partial':'nt-locked'}><th>{r.level}</th><td>{fmt(r.start,lang)} — {fmt(r.end,lang)}</td><td>{r.beatable}/20</td></tr>)}</Table>
    </>}
   </div>}
  </div>
  <p className="nt-note">{copy.note}</p>
 </section>;
}
