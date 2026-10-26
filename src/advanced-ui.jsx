import React, { useEffect, useState } from 'react';
import { RotateCcw, ExternalLink } from 'lucide-react';
import { advancedCopy } from './advanced-copy.js';
import { safeStoredPlan } from './tool-math.js';
import { wildHoggsUrl } from './reference-links.js';
export function useAdvancedPlan(key, initial) {
  const [p, set] = useState(() => { try { return safeStoredPlan(localStorage.getItem('nova-advanced-' + key), initial); } catch { return initial; } });
  useEffect(() => { try { localStorage.setItem('nova-advanced-' + key, JSON.stringify(p)); } catch {} }, [p, key]);
  return [p, (k,v) => set(s => ({...s,[k]:v})), () => set(initial), set];
}
export const fmt = (value, lang) => value == null || !Number.isFinite(Number(value)) ? '—' : new Intl.NumberFormat(lang, {maximumFractionDigits:2}).format(value);
export function Field({id,label,value,onChange,max=1e12,min=0,options,step=1}) {
  return <label className="tool-field"><span>{label}</span>{options ? <select id={id} value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}</select> : <input id={id} type="number" inputMode={step===1?'numeric':'decimal'} value={value} min={min} max={max} step={step} onChange={e=>onChange(e.target.value)}/>}</label>;
}
export function Subtabs({items,active,onChange,label}) {
  return <div className="advanced-subtabs" role="group" aria-label={label}>{items.map(([id,name])=><button key={id} aria-pressed={active===id} onClick={()=>onChange(id)}>{name}</button>)}</div>;
}
export function Heading({title,reset,lang}) { return <div className="tool-section-title"><h2>{title}</h2>{reset&&<button className="tool-icon-button" aria-label={advancedCopy[lang].reset} onClick={reset}><RotateCcw size={17}/></button>}</div>; }
export function Totals({values,lang,title}) {
  const c=advancedCopy[lang];
  return <aside className="tool-results" aria-live="polite"><h3>{title||c.total}</h3><dl>{Object.entries(values).map(([key,value])=><div className={'tool-metric'+(key==='power'?' accent':'')} key={key}><dt>{key==='seconds'?c.time:c[key]||key}</dt><dd data-result={'advanced-'+key}>{key==='seconds'?fmt(value==null?null:value/3600,lang)+' '+c.hours:typeof value==='string'?value:typeof value==='number'&&value>=1e4?new Intl.NumberFormat(lang,{notation:'compact',maximumFractionDigits:2}).format(value):fmt(value,lang)}</dd>{key!=='seconds'&&typeof value==='number'&&value>=1e4&&<small data-exact={'advanced-'+key}>{fmt(value,lang)}</small>}</div>)}</dl></aside>;
}
export function Invalid({lang}) {return <p role="alert" className="tool-validation">{advancedCopy[lang].invalid}</p>;}
export function Source({lang}) { const c=advancedCopy[lang]; return <footer className="tool-source"><span>{c.source}: Wild Hoggs ? {c.snapshot}: 2026-10-26</span><span>{c.saved}</span></footer>; }
export function Table({headers,children,id}) {return <div className="tool-table-wrap" tabIndex="0"><table data-table={id}><thead><tr>{headers.map((h,i)=><th scope="col" key={i}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;}
