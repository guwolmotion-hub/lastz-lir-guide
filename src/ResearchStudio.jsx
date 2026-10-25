import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, GitBranch, LockKeyhole, Maximize, Minus, Plus, RotateCcw, Settings2, SlidersHorizontal, Table2, Target, X } from 'lucide-react';
import data from './advanced-reference.json';
import visuals from './research-visuals.json';
import { researchName, researchGuide } from './research-guide.js';
import { hindiTechnology } from './advanced-hindi.js';
import { researchCost, sum } from './advanced-math.js';
import { useAdvancedPlan, Field, fmt } from './advanced-ui.jsx';
import { readResearchMap, normalizeLevels, prerequisitePath, changeResearchLevel, researchLayout } from './research-state.js';
import { studioCopy } from './research-studio-copy.js';
import './research-studio.css';

const symbol={badge:'🎖',electricity:'ϟ',coins:'◉',seconds:'◷',power:'◆'};
const nodeName=(n,lang)=>lang==='hi'?hindiTechnology(n.name.en):n.name[lang];
const compact=(v,lang)=>new Intl.NumberFormat(lang,{notation:'compact',maximumFractionDigits:1}).format(v);
const maximum=t=>Object.fromEntries(t.nodes.map(n=>[n.id,n.max]));
const countLevels=m=>Object.values(m).reduce((s,n)=>s+n,0);
const percent=(t,m)=>Math.round(100*countLevels(m)/t.nodes.reduce((s,n)=>s+n.max,0));
const clamp=(v,max)=>Math.max(0,Math.min(max,Number(v)||0));

function Value({value,resource,lang}) {
  const c=studioCopy[lang];
  const duration=fmt(Math.floor(value/86400),lang)+' '+c.days+' '+String(Math.floor(value%86400/3600)).padStart(2,'0')+':'+String(Math.floor(value%3600/60)).padStart(2,'0');
  return <span title={fmt(value,lang)}>{resource==='seconds'?duration:compact(value,lang)}</span>;
}
function Requirements({tree,lang,onTree}) {
  const c=studioCopy[lang];return <ul className="rs-requirements"><li>{c.lab} {tree.lab}</li>{tree.prerequisite&&<li>{onTree?<button onClick={()=>onTree(tree.prerequisite.id)}>{researchName(data.research.find(t=>t.id===tree.prerequisite.id),lang)} {tree.prerequisite.percent}%</button>:researchName(data.research.find(t=>t.id===tree.prerequisite.id),lang)+' '+tree.prerequisite.percent+'%'}</li>}{tree.season&&<li>{c.stage} {tree.season.number} · {c.day} {tree.season.day}</li>}</ul>;
}

function NodeDialog({node,tree,current,targets,cost,lang,onCurrent,onTarget,onUnlock,onClose}) {
  const dialog=useRef(null),c=studioCopy[lang],value=current[node.id],target=targets[node.id]??value;
  useEffect(()=>{const el=dialog.current;el.showModal();return()=>el.close();},[]);
  const available=node.requires.every(r=>current[r.id]>=r.requiredLevel);
  const used=cost(tree,{}, {[node.id]:value}),remaining=cost(tree,{[node.id]:value},{[node.id]:node.max});
  const primary=node.badges.some(v=>v>0)?'badges':'electricity',primaryLabel=c[primary==='badges'?'badge':'electricity'];
  return <dialog className="rs-node-dialog" ref={dialog} onCancel={onClose} onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}} aria-labelledby="rs-node-title">
    <button className="rs-close" aria-label={c.close} onClick={onClose}><X size={20}/></button>
    <header>{visuals[tree.id]?.nodes[node.id]?.icon&&<img src={visuals[tree.id].nodes[node.id].icon} alt=""/>}<div><span>{researchName(tree,lang)}</span><h3 id="rs-node-title">{nodeName(node,lang)}</h3><p>{c.level} {value} / {node.max}</p></div></header>
    <div className="rs-modal-requirements"><strong>{c.requirements}</strong><p>{c.lab} {node.lab}</p>{node.requires.map(r=><p key={r.id}>{current[r.id]>=r.requiredLevel?<Check size={14}/>:<LockKeyhole size={14}/>} {nodeName(tree.nodes.find(n=>n.id===r.id),lang)} {r.requiredLevel}</p>)}{!available&&<button className="rs-action primary" onClick={onUnlock}>{c.unlock}</button>}</div>
    <div className="rs-level-controls"><Field id="research-node-current" label={c.current} value={value} max={node.max} onChange={v=>{if(available||Number(v)<=value)onCurrent(clamp(v,node.max));}}/><Field id="research-node-target" label={c.targetLevel} value={target} min={value} max={node.max} onChange={v=>onTarget(Math.max(value,clamp(v,node.max)))}/></div>
    <div className="rs-level-picks" aria-label={c.current}>{Array.from({length:node.max+1},(_,i)=><button key={i} aria-pressed={value===i} disabled={!available&&i>value} onClick={()=>onCurrent(i)}>{i}</button>)}</div>
    <div className="rs-modal-summary"><div><span>{c.used}</span><strong>{fmt(used[primary],lang)} {primaryLabel}</strong></div><div><span>{c.remaining}</span><strong>{fmt(remaining[primary],lang)} {primaryLabel}</strong></div></div>
    <div className="rs-data-scroll"><table data-table="research-node-levels"><thead><tr><th>{c.level}</th>{['badge','electricity','coins','seconds','power'].map(k=><th key={k}>{c[k]}</th>)}</tr></thead><tbody>{Array.from({length:node.max},(_,i)=>{const r=cost(tree,{[node.id]:i},{[node.id]:i+1});return <tr key={i} className={i<value?'complete':''}><th>{i+1}{i<value?' ✓':''}</th><td>{fmt(r.badges,lang)}</td><td>{fmt(r.electricity,lang)}</td><td>{fmt(r.coins,lang)}</td><td>{fmt(r.seconds/3600,lang)} {c.hours}</td><td>{fmt((node.power[i]||0)-(node.power[i-1]||0),lang)}</td></tr>;})}</tbody></table></div>
  </dialog>;
}

function TreeGraph({tree,current,targets,onNode,onTarget,lang,cost,horizontal,setHorizontal}) {
  const c=studioCopy[lang],view=useRef(null),drag=useRef(null),[scale,setScale]=useState(.9);
  const layout=useMemo(()=>researchLayout(tree,horizontal),[tree,horizontal]);
  useEffect(()=>{const el=view.current,next=Math.min(1.5,Math.max(.95,(el.clientWidth-24)/layout.width*1.25));setScale(next);requestAnimationFrame(()=>{el.scrollTop=0;const first=layout.positions[tree.nodes[0].id];el.scrollLeft=el.clientWidth<500&&!horizontal?Math.max(0,first.x*next-16):Math.max(0,(layout.width*next-el.clientWidth)/2);});},[tree.id,horizontal]);
  const edges=tree.nodes.flatMap(n=>n.requires.map(r=>({from:r.id,to:n.id,required:r.requiredLevel})));
  const panStart=e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('button'))return;drag.current={x:e.clientX,y:e.clientY,left:view.current.scrollLeft,top:view.current.scrollTop};view.current.setPointerCapture(e.pointerId);view.current.classList.add('dragging');};
  const panMove=e=>{if(drag.current){view.current.scrollLeft=drag.current.left+drag.current.x-e.clientX;view.current.scrollTop=drag.current.top+drag.current.y-e.clientY;}};
  const panEnd=()=>{drag.current=null;view.current?.classList.remove('dragging');};
  return <div className="rs-graph-shell"><div className="rs-graph-toolbar"><button aria-label={c.zoomOut} onClick={()=>setScale(v=>Math.max(.35,Math.round((v-.1)*100)/100))}><Minus size={17}/></button><span>{Math.round(scale*100)}%</span><button aria-label={c.zoomIn} onClick={()=>setScale(v=>Math.min(1.6,Math.round((v+.1)*100)/100))}><Plus size={17}/></button><button onClick={()=>{setScale(Math.min(1.2,(view.current.clientWidth-24)/layout.width));view.current.scrollLeft=0;}} aria-label={c.fit}><Maximize size={16}/></button><button className="rs-layout-toggle" onClick={()=>setHorizontal(v=>!v)}><GitBranch size={15}/>{c.layout}</button></div>
    <div className="rs-graph-viewport" ref={view} data-research-graph onPointerDown={panStart} onPointerMove={panMove} onPointerUp={panEnd} onPointerCancel={panEnd}>
      <div className="rs-scaled-board" style={{width:layout.width*scale,height:layout.height*scale}}><div className="rs-board" style={{width:layout.width,height:layout.height,transform:'scale('+scale+')'}}>
        <svg className="rs-connections" width={layout.width} height={layout.height} aria-hidden="true">{edges.map(edge=>{const a=layout.positions[edge.from],b=layout.positions[edge.to],x1=a.x+(horizontal?layout.nodeWidth:layout.nodeWidth/2),y1=a.y+(horizontal?layout.nodeHeight/2:layout.nodeHeight),x2=b.x+(horizontal?0:layout.nodeWidth/2),y2=b.y+(horizontal?layout.nodeHeight/2:0);const mid=horizontal?(x1+x2)/2:(y1+y2)/2;const path=horizontal?`M${x1},${y1}H${mid}V${y2}H${x2}`:`M${x1},${y1}V${mid}H${x2}V${y2}`;return <path key={edge.from+'-'+edge.to} d={path} className={current[edge.from]>=edge.required?'active':(targets[edge.from]||0)>=edge.required?'planned':''}/>;})}</svg>
        {tree.nodes.map(n=>{const p=layout.positions[n.id],value=current[n.id],goal=targets[n.id]??value,available=n.requires.every(r=>current[r.id]>=r.requiredLevel),primary=tree.badges>0?'badges':'electricity',resourceLabel=c[primary==='badges'?'badge':'electricity'],spent=sum(n[primary],0,value),full=sum(n[primary]);return <div className={'rs-node'+(!available?' locked':'')+(value===n.max?' maxed':'')+(goal>value?' planned':'')} data-node={n.id} key={n.id} style={{left:p.x,top:p.y,width:layout.nodeWidth,height:layout.nodeHeight}}>
          <button className="rs-node-face" onClick={()=>onNode(n)} aria-label={nodeName(n,lang)+' · '+c.level+' '+value+'/'+n.max}>
            {visuals[tree.id]?.nodes[n.id]?.icon?<img src={visuals[tree.id].nodes[n.id].icon} alt="" loading="lazy" draggable="false"/>:<GitBranch size={38}/>}
            <strong>{nodeName(n,lang)}</strong><span>{c.level}: {value} / {n.max}{goal>value&&<b> → {goal}</b>}</span><div className="rs-level-bar" style={{'--steps':n.max}}><i style={{width:(100*value/n.max)+'%'}}/></div><small>{fmt(spent,lang)} / {compact(full,lang)} {resourceLabel}</small><em>{value<n.max?c.next+': '+fmt(Math.ceil(n[primary][value]*(1-(primary==='badges'?cost.reduction:cost.resourceReduction)/100)),lang):'✓ '+c.allMax}</em>{!available&&<LockKeyhole className="rs-lock-mark" size={14}/>}</button>
          <button className="rs-node-goal" aria-label={nodeName(n,lang)+' · '+c.target} onClick={()=>onTarget(n)} title={c.targetHint}><Target size={14}/><span>{c.target}</span></button>
        </div>;})}
      </div></div>
    </div><p className="rs-pan-hint">{c.hint}</p>
  </div>;
}

export default function ResearchStudio({lang,initialTree,showGuide=false}) {
  const [infoExpanded,setInfoExpanded]=useState(false);
  const c=studioCopy[lang],[p,set,reset,setPlan]=useAdvancedPlan('research',{tree:'alliance_recognition',progress:'{}',targets:'{}',reduction:'0',speed:'0',resourceReduction:'0'});
  const [selected,setSelected]=useState(initialTree||null),[node,setNode]=useState(null),[mode,setMode]=useState('graph'),[horizontal,setHorizontal]=useState(false),[settings,setSettings]=useState(false),[compare,setCompare]=useState(false),[comparison,setComparison]=useState(['alliance_recognition','fully_armed_alliance']),[lab,setLab]=useState('35'),[onlyMet,setOnlyMet]=useState(false),[guide,setGuide]=useState(false),[guideTab,setGuideTab]=useState(0);
  useEffect(()=>{if(initialTree)setSelected(initialTree);},[initialTree]);
  useEffect(()=>{setNode(null);setMode('graph');},[selected]);
  const progress=readResearchMap(p.progress),targetMaps=readResearchMap(p.targets);
  const currentFor=t=>normalizeLevels(t,progress[t.id]);
  const targetsFor=t=>{const curr=currentFor(t),stored=targetMaps[t.id]||{};return Object.fromEntries(t.nodes.map(n=>[n.id,Math.max(curr[n.id],clamp(stored[n.id],n.max))]));};
  const cost=(t,from,to)=>{const r=researchCost(t,from,to,clamp(p.reduction,100),clamp(p.speed,10000));const saving=1-clamp(p.resourceReduction,100)/100;for(const key of ['coins','electricity'])r[key]=t.nodes.reduce((total,n)=>total+n[key].slice(from[n.id]||0,to[n.id]||0).reduce((s,v)=>s+Math.ceil(v*saving),0),0);return r;};
  cost.reduction=clamp(p.reduction,100);
  cost.resourceReduction=clamp(p.resourceReduction,100);
  const stats=t=>{const current=currentFor(t),max=maximum(t);return {current,max,used:cost(t,{},current),remaining:cost(t,current,max),full:cost(t,{},max),progress:percent(t,current)};};
  const tree=data.research.find(t=>t.id===selected),s=tree?stats(tree):null,current=s?.current,targets=tree?targetsFor(tree):{},planned=tree&&tree.nodes.some(n=>targets[n.id]>current[n.id]);
  const writeMap=(key,id,map)=>setPlan(prev=>({...prev,[key]:JSON.stringify({...readResearchMap(prev[key]),[id]:map})}));
  const changeCurrent=(id,level)=>{const updated=changeResearchLevel(tree,current,id,level);writeMap('progress',tree.id,updated);};
  const changeTarget=(id,level)=>{const updated=level<targets[id]?changeResearchLevel(tree,targets,id,level):prerequisitePath(tree,targets,id,level);for(const n of tree.nodes)updated[n.id]=Math.max(current[n.id],updated[n.id]);writeMap('targets',tree.id,updated);};
  const maxAll=()=>writeMap('progress',tree.id,maximum(tree));
  const resetTree=()=>setPlan(prev=>({...prev,progress:JSON.stringify({...readResearchMap(prev.progress),[tree.id]:{}}),targets:JSON.stringify({...readResearchMap(prev.targets),[tree.id]:{}})}));
  const navigate=id=>{setSelected(id);set('tree',id);};
  const totals=data.research.reduce((all,t)=>{const r=stats(t).remaining;for(const key of Object.keys(all))all[key]+=r[key==='badge'?'badges':key];return all;},{badge:0,electricity:0,coins:0,seconds:0});
  const costRows=(used,remain)=><table className="rs-cost-table"><thead><tr><th/><th>{c.used}</th><th>{c.remaining}</th></tr></thead><tbody>{['badge','electricity','coins','seconds'].map(key=><tr key={key}><th><span className="rs-resource-symbol">{symbol[key]}</span>{c[key]}</th><td><Value value={used[key==='badge'?'badges':key]} resource={key} lang={lang}/></td><td><Value value={remain[key==='badge'?'badges':key]} resource={key} lang={lang}/></td></tr>)}</tbody></table>;
  return <section className="research-studio" data-research-studio>
    <div className="rs-topline">{selected?<button className="rs-back" onClick={()=>setSelected(null)}><ArrowLeft size={16}/>{c.back}</button>:<h2>{c.title} <span>21</span></h2>}<div className="rs-top-actions"><button className="rs-action" aria-pressed={compare} onClick={()=>{setCompare(v=>!v);setSelected(null);}}><SlidersHorizontal size={15}/>{c.compare}</button><button className="rs-action" aria-expanded={settings} onClick={()=>setSettings(v=>!v)}><Settings2 size={15}/>{c.settings}</button>{showGuide&&<button className="rs-action" aria-pressed={guide} onClick={()=>setGuide(v=>!v)}>{c.guide}<ChevronDown size={14}/></button>}</div></div>
    {settings&&<div className="rs-settings"><Field id="research-speed" label={c.speed+' (%)'} value={p.speed} onChange={v=>set('speed',v)} max={10000} step={.1}/><Field id="research-savings" label={c.reduction+' (%)'} value={p.reduction} onChange={v=>set('reduction',v)} max={100} step={.1}/><Field id="research-resource-savings" label={c.resourceReduction+' (%)'} value={p.resourceReduction} onChange={v=>set('resourceReduction',v)} max={100} step={.1}/></div>}
    {guide&&showGuide&&<div className="rs-beginner"><div className="rs-guide-tabs">{researchGuide[lang].sections.filter(s=>s.parts).map((s,i)=><button aria-pressed={i===guideTab} key={i} onClick={()=>setGuideTab(i)}>{s.title}</button>)}</div>{researchGuide[lang].sections.filter(s=>s.parts)[guideTab].parts.map(part=><section key={part.title}><h3>{part.title}</h3><p>{part.text}</p></section>)}</div>}
    {!tree?<>
      <div className="rs-overview-summary"><span>{c.remaining}</span>{Object.entries(totals).map(([key,v])=><div key={key} title={c[key]+' '+fmt(v,lang)}><b>{symbol[key]}</b><strong><Value value={v} resource={key} lang={lang}/></strong><small>{c[key]}</small></div>)}</div>
      <div className="rs-overview-filter"><Field id="research-lab" label={c.filter} value={lab} onChange={setLab} min={1} max={35}/><label><input type="checkbox" checked={onlyMet} onChange={e=>setOnlyMet(e.target.checked)}/>{c.onlyMet}</label></div>
      {compare&&<div className="rs-comparison"><h3>{c.compare} · {comparison.length}</h3>{comparison.length<2?<p>{c.empty}</p>:<div className="rs-data-scroll"><table><thead><tr><th>{c.title}</th><th>{c.progress}</th>{['badge','electricity','coins','seconds'].map(k=><th key={k}>{c.remaining} · {c[k]}</th>)}</tr></thead><tbody>{data.research.filter(t=>comparison.includes(t.id)).map(t=>{const r=stats(t);return <tr key={t.id}><th>{researchName(t,lang)}</th><td>{r.progress}%</td>{['badge','electricity','coins','seconds'].map(k=><td key={k}><Value value={r.remaining[k==='badge'?'badges':k]} resource={k} lang={lang}/></td>)}</tr>;})}</tbody></table></div>}</div>}
      <div className="rs-category-grid">{data.research.filter(t=>!onlyMet||t.lab<=Number(lab)).map(t=>{const r=stats(t);return <article className="rs-category" data-research={t.id} key={t.id}>
        {compare&&<label className="rs-compare-check"><input type="checkbox" aria-label={researchName(t,lang)+' · '+c.select} checked={comparison.includes(t.id)} onChange={e=>setComparison(prev=>e.target.checked?[...prev,t.id]:prev.filter(id=>id!==t.id))}/>{c.select}</label>}
        <button className="rs-category-open" onClick={()=>navigate(t.id)} aria-label={researchName(t,lang)}><div className="rs-category-art">{visuals[t.id]?.image&&<img src={visuals[t.id].image} alt="" loading="lazy"/>}<span className="rs-category-unlock"><LockKeyhole size={11}/>{c.lab} {t.lab}</span><div className="rs-category-title"><h3>{researchName(t,lang)}</h3><strong>{r.progress}%</strong></div></div><div className="rs-category-progress"><i style={{width:r.progress+'%'}}/></div><div className="rs-category-costs">{['electricity','coins','badge','seconds'].filter(k=>k!=='badge'||t.badges>0).map(k=><div key={k}><span aria-hidden="true">{symbol[k]}</span><span>{c[k]}</span><strong><Value value={r.used[k==='badge'?'badges':k]} resource={k} lang={lang}/> / <Value value={r.full[k==='badge'?'badges':k]} resource={k} lang={lang}/></strong></div>)}</div><span className="rs-category-enter">{c.graph}<ArrowRight size={14}/></span></button>
        <div className="rs-category-conditions"><Requirements tree={t} lang={lang}/></div>
      </article>;})}</div>
    </>:<>
      <div className="rs-tree-layout"><aside className={'rs-sidebar'+(infoExpanded?' expanded':'')}><header>{visuals[tree.id]?.image&&<img src={visuals[tree.id].image} alt=""/>}<div><h2>{researchName(tree,lang)}</h2><p>{tree.nodes.length} {c.nodes} · {fmt(tree.badges,lang)} {c.badge}</p></div></header><div className="rs-overall-progress"><span>{c.progress} <strong>{s.progress}%</strong></span><div><i style={{width:s.progress+'%'}}/></div></div><button className="rs-info-toggle" aria-expanded={infoExpanded} onClick={()=>setInfoExpanded(v=>!v)}>{infoExpanded?c.collapse:c.details}<ChevronDown size={16}/></button><div className="rs-sidebar-details"><h3>{c.requirements}</h3><Requirements tree={tree} lang={lang} onTree={navigate}/><button className="rs-speed-settings" onClick={()=>setSettings(v=>!v)}><Settings2 size={14}/>{c.speed}: {p.speed}%<span>{c.reduction}: {p.reduction}%</span></button>{costRows(s.used,s.remaining)}
        {planned&&<div className="rs-target-summary"><h3><Target size={15}/>{c.targetCost}</h3>{['badge','electricity','coins','seconds'].map(k=>{const r=cost(tree,current,targets);return <p key={k}><span>{c[k]}</span><strong data-result={'research-target-'+k}><Value value={r[k==='badge'?'badges':k]} resource={k} lang={lang}/></strong></p>;})}<button onClick={()=>writeMap('targets',tree.id,current)}>{c.clearTarget}</button></div>}
        <div className="rs-sidebar-actions"><button onClick={()=>setHorizontal(v=>!v)}><GitBranch size={15}/>{c.layout}</button><button onClick={maxAll} data-action="research-max"><Check size={15}/>{c.allMax}</button><button onClick={resetTree} data-action="research-reset" title={c.resetNote}><RotateCcw size={15}/>{c.reset}</button></div><p className="rs-note">{c.saved}</p><p className="rs-note">{c.costNote}</p></div></aside>
        <div className="rs-tree-main"><div className="rs-view-modes"><button aria-pressed={mode==='graph'} onClick={()=>setMode('graph')}><GitBranch size={16}/>{c.graph}</button><button aria-pressed={mode==='table'} onClick={()=>setMode('table')}><Table2 size={16}/>{c.table}</button></div>
          {mode==='graph'?<TreeGraph tree={tree} current={current} targets={targets} onNode={setNode} onTarget={n=>changeTarget(n.id,n.max)} lang={lang} cost={cost} horizontal={horizontal} setHorizontal={setHorizontal}/>:<div className="rs-data-scroll rs-all-values"><table data-table="research-values"><thead><tr><th>{c.nodes}</th><th>{c.level}</th><th>{c.badge}</th><th>{c.electricity}</th><th>{c.coins}</th><th>{c.seconds}</th></tr></thead><tbody>{tree.nodes.map(n=><tr key={n.id}><th><button onClick={()=>setNode(n)}>{nodeName(n,lang)}</button></th><td>{current[n.id]} / {n.max}</td>{['badges','electricity','coins','seconds'].map(k=><td key={k}><Value value={cost(tree,{[n.id]:current[n.id]},{[n.id]:n.max})[k]} resource={k==='badges'?'badge':k} lang={lang}/></td>)}</tr>)}</tbody></table></div>}
        </div>
      </div>
      {node&&<NodeDialog key={tree.id+node.id} node={node} tree={tree} current={current} targets={targets} cost={cost} lang={lang} onCurrent={v=>changeCurrent(node.id,v)} onTarget={v=>changeTarget(node.id,v)} onUnlock={()=>{const next=prerequisitePath(tree,current,node.id,Math.max(1,current[node.id]));next[node.id]=current[node.id];writeMap('progress',tree.id,next);}} onClose={()=>setNode(null)}/>}
    </>}
  </section>;
}
