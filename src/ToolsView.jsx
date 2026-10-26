import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Building2, Calculator, Clock3, Database, ExternalLink, Package, Percent, RotateCcw, Search, Shield, TrendingUp, Users, X } from 'lucide-react';
import reference from './game-reference.json';
import workbook from './workbook-data.json';
import { toolCopy, hindiHeroNames } from './tools-copy.js';
import { wildHoggsUrl } from './reference-links.js';
import { advancedCopy } from './advanced-copy.js';
import { UNITS, caravanPlan, discountPlan, experiencePlan, hqPlan, numberInRange, packPlan, safeStoredPlan, speedupPlan } from './tool-math.js';
import './tools.css';

const NativeHeroes = lazy(() => import('./NativeCollections.jsx').then(m => ({default:m.HeroCatalog})));
const NativeExperience = lazy(() => import('./NativeSimpleTools.jsx').then(m => ({default:m.ExperienceStudio})));
const NativeCaravan = lazy(() => import('./NativeSimpleTools.jsx').then(m => ({default:m.CaravanStudio})));
function LocalHeroCatalog(props) { return <Suspense fallback={<p>?</p>}><NativeHeroes {...props}/></Suspense>; }
const AdvancedTools = lazy(() => import('./AdvancedTools.jsx'));
const CALCULATORS = [['heroes', Users], ['tank', Shield], ['equipment', Package], ['exploration', Search], ['exp', Users], ['lucky', Percent], ['other', Clock3]];
const DATABASES = [['heroes', Users], ['exp', TrendingUp]];
const SPEEDS = [1, 5, 15, 30, 60, 180, 480, 1440];
const LEVELS = workbook.sheets['캐러밴 표'].levels;
const range = (min, max) => Number.isInteger(min) && Number.isInteger(max) && max >= min && max - min < 500 ? Array.from({ length: max - min + 1 }, (_, index) => min + index) : [];
const heroName = (hero, lang) => lang === 'hi' ? hindiHeroNames[hero.id] : hero.name[lang] || hero.name.en;
const format = (value, lang) => new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }).format(value);
const compact = (value, lang) => {
  const unit = value >= 1e9 ? 'G' : value >= 1e6 ? 'M' : value >= 1e3 ? 'K' : '';
  return format(unit ? value / UNITS[unit] : value, lang) + unit;
};
const scaled = (value, unit) => {
  const number = numberInRange(value, 0, 1e12);
  return number !== null && UNITS[unit] && number * UNITS[unit] <= 1e15 ? number * UNITS[unit] : NaN;
};

function usePlan(name, initial) {
  const [plan, setPlan] = useState(() => {
    try { return safeStoredPlan(localStorage.getItem('nova-tool-' + name), initial); } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem('nova-tool-' + name, JSON.stringify(plan)); } catch { /* Storage may be unavailable in private browsing. */ }
  }, [name, plan]);
  const update = (key, value) => setPlan(previous => ({ ...previous, [key]: value }));
  return [plan, update, () => setPlan(initial), setPlan];
}

function NumberField({ id, label, value, onChange, min = 0, max = 1e12, step = 1 }) {
  return <label className="tool-field" htmlFor={id}><span>{label}</span><input id={id} data-field={id} type="number" inputMode={step === 1 ? 'numeric' : 'decimal'} min={min} max={max} step={step} value={value} onChange={event => onChange(event.target.value)} /></label>;
}

function SelectField({ id, label, value, onChange, options }) {
  return <label className="tool-field" htmlFor={id}><span>{label}</span><select id={id} data-field={id} value={value} onChange={event => onChange(event.target.value)}>{options.map(option => <option value={option.value ?? option} key={option.value ?? option}>{option.label ?? option}</option>)}</select></label>;
}

function AmountField({ id, label, value, unit, onChange, onUnit, copy }) {
  return <div className="tool-field"><label htmlFor={id}>{label}</label><div className="amount-control"><input id={id} data-field={id} type="number" inputMode="decimal" min="0" max="1000000000000" step="any" value={value} onChange={event => onChange(event.target.value)} /><select aria-label={label + ' · ' + copy.unit} value={unit} onChange={event => onUnit(event.target.value)}>{Object.keys(UNITS).map(value => <option value={value} key={value}>{value}</option>)}</select></div></div>;
}

function Metric({ label, value, lang, accent = false, text = false, id }) {
  return <div className={'tool-metric' + (accent ? ' accent' : '')}><dt>{label}</dt><dd data-result={id}>{text ? value : compact(value, lang)}</dd>{!text && value >= 1000 && <small>{format(value, lang)}</small>}</div>;
}

function Results({ title, children }) {
  return <aside className="tool-results" aria-live="polite"><h3>{title}</h3><dl>{children}</dl></aside>;
}

function ToolHeader({ title, onReset, copy }) {
  return <div className="tool-section-title"><h2>{title}</h2><button className="tool-icon-button" onClick={onReset} title={copy.reset} aria-label={copy.reset}><RotateCcw size={17} /></button></div>;
}

function Invalid({ copy }) { return <p className="tool-validation" role="alert">{copy.invalid}</p>; }

function Source({ lang, type = 'original' }) {
  return null;
}

function DataTable({ columns, rows, id }) {
  return <div className="tool-table-wrap" tabIndex="0"><table data-table={id}><thead><tr>{columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function HqCalculator({ lang, rows }) {
  const copy = toolCopy[lang];
  const defaults = { current: '16', target: '17', reduction: '0', r0: '0', r1: '0', r2: '0', r3: '0', u0: 'M', u1: 'M', u2: 'M', u3: 'M' };
  const [plan, set, reset, setPlan] = usePlan('hq', defaults);
  const result = hqPlan(rows, Number(plan.current), Number(plan.target), numberInRange(plan.reduction, 0, 100) ?? NaN);
  const owned = [0, 1, 2, 3].map(index => scaled(plan['r' + index], plan['u' + index]));
  const valid = result && owned.every(Number.isFinite);
  return <><ToolHeader title={copy.hq} onReset={reset} copy={copy} /><div className="calculator-layout"><section className="tool-inputs"><div className="tool-form-grid">
    <SelectField id="hq-current" label={copy.current} value={plan.current} options={range(16, 35)} onChange={value => setPlan(previous => ({ ...previous, current: value, target: String(Math.max(Number(value), Number(previous.target))) }))} />
    <SelectField id="hq-target" label={copy.target} value={plan.target} options={range(Number(plan.current) || 16, 35)} onChange={value => set('target', value)} />
    <NumberField id="hq-reduction" label={copy.reduction + ' (%)'} value={plan.reduction} onChange={value => set('reduction', value)} max={100} step={0.1} />
  </div><h3>{copy.owned}</h3><div className="tool-form-grid">{copy.resources.map((resource, index) => <AmountField key={resource} id={'hq-owned-' + index} label={resource} value={plan['r' + index]} unit={plan['u' + index]} onChange={value => set('r' + index, value)} onUnit={value => set('u' + index, value)} copy={copy} />)}</div><p className="tool-note">{copy.hqNote}</p></section>
    {valid ? <Results title={copy.missing}>{result.totals.map((total, index) => <Metric key={index} label={copy.resources[index]} value={Math.max(0, total - owned[index])} lang={lang} id={'hq-missing-' + index} accent />)}</Results> : <Invalid copy={copy} />}
  </div>{valid && <><h3 className="tool-subheading">{copy.breakdown}</h3><DataTable id="hq-plan" columns={[copy.level, ...copy.resources]} rows={[...result.rows.map((row, index) => [row[0].replace(' -> ', ' → '), ...result.costs[index].map(value => format(value, lang))]), [copy.total, ...result.totals.map(value => format(value, lang))]]} /></>}<Source lang={lang} /></>;
}

function HeroCalculator({lang,selected}) { return <Suspense fallback={<p>?</p>}><NativeExperience lang={lang} selected={selected}/></Suspense>; }
export function CaravanCalculator({lang}) { return <Suspense fallback={<p>?</p>}><NativeCaravan lang={lang}/></Suspense>; }

function duration(value, copy, lang) {
  return [[Math.floor(value / 1440), copy.days], [Math.floor(value % 1440 / 60), copy.hours], [value % 60, copy.minutes]].filter(([number], index) => number || index === 2).map(([number, unit]) => format(number, lang) + ' ' + unit).join(' · ');
}

function SpeedupCalculator({ lang }) {
  const copy = toolCopy[lang];
  const defaults = { days: '1', hours: '0', minutes: '0', ...Object.fromEntries(SPEEDS.map(size => ['q' + size, '0'])) };
  const [plan, set, reset] = usePlan('speedups', defaults);
  const times = [numberInRange(plan.days, 0, 1e6, true), numberInRange(plan.hours, 0, 23, true), numberInRange(plan.minutes, 0, 59, true)];
  const required = times.includes(null) ? NaN : times[0] * 1440 + times[1] * 60 + times[2];
  const result = speedupPlan(required, SPEEDS.map(size => numberInRange(plan['q' + size], 0, 1e9, true) ?? NaN), SPEEDS);
  return <><ToolHeader title={copy.speedups} onReset={reset} copy={copy} /><div className="calculator-layout"><section className="tool-inputs"><h3>{copy.requiredTime}</h3><div className="tool-form-grid time-fields">{['days', 'hours', 'minutes'].map((key, index) => <NumberField key={key} id={'speed-' + key} label={copy[key]} value={plan[key]} onChange={value => set(key, value)} max={[1e6, 23, 59][index]} />)}</div><h3>{copy.speedOwned}</h3><div className="tool-form-grid">{SPEEDS.map(size => <NumberField key={size} id={'speed-q' + size} label={duration(size, copy, lang)} value={plan['q' + size]} onChange={value => set('q' + size, value)} />)}</div><p className="tool-note">{copy.speedNote}</p></section>{result ? <Results title={copy.speedups}><Metric label={copy.speedTotal} value={duration(result.total, copy, lang)} text id="speed-total" /><Metric label={copy.speedMissing} value={duration(result.missing, copy, lang)} text accent id="speed-missing" /><Metric label={copy.speedSurplus} value={duration(result.surplus, copy, lang)} text /></Results> : <Invalid copy={copy} />}</div></>;
}

function PackCalculator({ lang }) {
  const copy = toolCopy[lang];
  const [plan, set, reset] = usePlan('packs', { resource: '0', required: '1', requiredUnit: 'M', owned: '0', ownedUnit: 'M', size: '100', sizeUnit: 'K', count: '5' });
  const result = packPlan(scaled(plan.required, plan.requiredUnit), scaled(plan.owned, plan.ownedUnit), scaled(plan.size, plan.sizeUnit), numberInRange(plan.count, 0, 1e9, true) ?? NaN);
  return <><ToolHeader title={copy.packs} onReset={reset} copy={copy} /><div className="calculator-layout"><section className="tool-inputs"><div className="tool-form-grid"><SelectField id="pack-resource" label={copy.resource} value={plan.resource} onChange={value => set('resource', value)} options={copy.resources.map((label, index) => ({ value: index, label }))} /><AmountField id="pack-required" label={copy.total} value={plan.required} unit={plan.requiredUnit} onChange={value => set('required', value)} onUnit={value => set('requiredUnit', value)} copy={copy} /><AmountField id="pack-owned" label={copy.owned} value={plan.owned} unit={plan.ownedUnit} onChange={value => set('owned', value)} onUnit={value => set('ownedUnit', value)} copy={copy} /><AmountField id="pack-size" label={copy.packSize} value={plan.size} unit={plan.sizeUnit} onChange={value => set('size', value)} onUnit={value => set('sizeUnit', value)} copy={copy} /><NumberField id="pack-count" label={copy.packCount} value={plan.count} onChange={value => set('count', value)} /></div><p className="tool-note">{copy.packsNote}</p></section>{result ? <Results title={copy.resources[Number(plan.resource)] || copy.resource}><Metric label={copy.packsNeeded} value={result.needed} lang={lang} id="packs-needed" /><Metric label={copy.packsShort} value={result.shortPacks} lang={lang} id="packs-short" accent /><Metric label={copy.missing} value={result.missing} lang={lang} /><Metric label={copy.remaining} value={result.remaining} lang={lang} /></Results> : <Invalid copy={copy} />}</div></>;
}

function DiscountCalculator({ lang }) {
  const copy = toolCopy[lang];
  const [plan, set, reset] = usePlan('discount', { price: '1000', discount: '80', count: '10', budget: '2000' });
  const result = discountPlan(numberInRange(plan.price) ?? NaN, numberInRange(plan.discount, 0, 100) ?? NaN, numberInRange(plan.count, 1, 1e9, true) ?? NaN, numberInRange(plan.budget) ?? NaN);
  return <><ToolHeader title={copy.discount} onReset={reset} copy={copy} /><div className="calculator-layout"><section className="tool-inputs"><div className="tool-form-grid">{[['price', 'fullPrice', 1e12], ['discount', 'discountRate', 100], ['count', 'buyCount', 1e9], ['budget', 'budget', 1e12]].map(([key, label, max]) => <NumberField key={key} id={'discount-' + key} label={copy[label] + (key === 'discount' ? ' (%)' : '')} value={plan[key]} onChange={value => set(key, value)} min={key === 'count' ? 1 : 0} max={max} />)}</div><p className="tool-note">{copy.discountNote}</p></section>{result ? <Results title={copy.total}><Metric label={copy.unitPrice} value={result.unitPrice} lang={lang} id="discount-unit" /><Metric label={copy.total} value={result.total} lang={lang} accent id="discount-total" /><Metric label={copy.saved} value={result.saving} lang={lang} /><Metric label={result.remaining >= 0 ? copy.budgetLeft : copy.budgetShort} value={Math.abs(result.remaining)} lang={lang} /></Results> : <Invalid copy={copy} />}</div></>;
}

function HeroDialog({ hero, lang, onClose, onExperience }) {
  const dialog = useRef(null);
  const copy = toolCopy[lang];
  useEffect(() => { const element = dialog.current; element.showModal(); return () => element.close(); }, []);
  const onBackdrop = event => {
    const box = dialog.current.getBoundingClientRect();
    if (event.target === dialog.current && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) onClose();
  };
  return <dialog className="hero-dialog" ref={dialog} onCancel={onClose} onClick={onBackdrop} aria-labelledby="hero-name"><button className="tool-icon-button dialog-close" onClick={onClose} aria-label={copy.close} title={copy.close}><X size={20} /></button><div className="hero-dialog-heading"><img src={hero.image} alt="" /><div><span className="hero-grade">{hero.rarity}</span><h2 id="hero-name">{heroName(hero, lang)}</h2><p>{copy.factions[hero.faction]}</p></div></div><dl className="hero-facts"><div><dt>{copy.role}</dt><dd>{copy.roles[hero.role]}</dd></div><div><dt>{copy.rarity}</dt><dd>{hero.rarity}</dd></div></dl>{hero.globalPassive && <p className="hero-passive"><Shield size={15} />{copy.passive}</p>}<div className="hero-dialog-actions"><button className="tool-primary" onClick={() => onExperience(hero)}><Calculator size={17} />{copy.expAction}</button></div></dialog>;
}

function HeroDatabase({ lang, onExperience }) {
  const copy = toolCopy[lang];
  const [query, setQuery] = useState('');
  const [faction, setFaction] = useState('all');
  const [role, setRole] = useState('all');
  const [rarity, setRarity] = useState('all');
  const [selected, setSelected] = useState(null);
  const allOption = { value: 'all', label: copy.all };
  const filtered = reference.heroes.filter(hero => (faction === 'all' || hero.faction === faction) && (role === 'all' || hero.role === role) && (rarity === 'all' || hero.rarity === rarity) && Object.values({ ...hero.name, hi: hindiHeroNames[hero.id] }).some(name => name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))).sort((a, b) => heroName(a, lang).localeCompare(heroName(b, lang), lang));
  return <><div className="hero-filters"><label className="tool-field hero-search" htmlFor="hero-query"><span>{copy.search}</span><div className="search-control"><Search size={17} /><input id="hero-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} /></div></label><SelectField id="hero-faction" label={copy.faction} value={faction} onChange={setFaction} options={[allOption, ...Object.entries(copy.factions).map(([value, label]) => ({ value, label }))]} /><SelectField id="hero-role" label={copy.role} value={role} onChange={setRole} options={[allOption, ...Object.entries(copy.roles).map(([value, label]) => ({ value, label }))]} /><SelectField id="hero-rarity" label={copy.rarity} value={rarity} onChange={setRarity} options={[allOption, ...['B', 'A', 'S', 'S1', 'S2', 'S3', 'S4']]} /></div><div className="database-count"><span>{copy.results}: {filtered.length} / {reference.heroes.length}</span><button className="tool-icon-button" aria-label={copy.reset} title={copy.reset} onClick={() => { setQuery(''); setFaction('all'); setRole('all'); setRarity('all'); }}><RotateCcw size={16} /></button></div>{filtered.length ? <div className="hero-grid">{filtered.map(hero => <button className="hero-record" key={hero.id} onClick={() => setSelected(hero)} aria-label={heroName(hero, lang) + ' · ' + copy.openHero}><img src={hero.image} alt="" loading="lazy" /><span className="hero-record-copy"><span className="hero-grade">{hero.rarity}</span><strong>{heroName(hero, lang)}</strong><span>{copy.roles[hero.role]}</span><small>{copy.factions[hero.faction]}</small></span></button>)}</div> : <p className="tool-empty" role="status">{copy.empty}</p>}<p className="tool-note">{copy.heroNote}</p><Source lang={lang} type="heroes" />{selected && <HeroDialog hero={selected} lang={lang} onClose={() => setSelected(null)} onExperience={hero => { setSelected(null); onExperience(hero); }} />}</>;
}

export function BuildingDatabase({ lang, rows, prerequisites, buildings }) {
  const copy = toolCopy[lang];
  const [type, setType] = useState('hq');
  const [from, setFrom] = useState('16');
  const [to, setTo] = useState('35');
  const valid = numberInRange(from, 16, 35, true) !== null && numberInRange(to, Number(from), 35, true) !== null;
  const filtered = valid ? rows.filter(row => { const level = Number(row[0].split(' -> ')[1]); return level > Number(from) && level <= Number(to); }) : [];
  return <><div className="tool-form-grid database-range"><SelectField id="db-building" label={copy.building} value={type} onChange={setType} options={[{ value: 'hq', label: copy.hqTable }, { value: 'prerequisite', label: copy.prereqTable }]} />{type === 'hq' && <><NumberField id="db-hq-from" label={copy.from} value={from} onChange={setFrom} min={16} max={35} /><NumberField id="db-hq-to" label={copy.to} value={to} onChange={setTo} min={16} max={35} /></>}</div>{type === 'hq' ? valid ? <DataTable id="hq-database" columns={[copy.level, ...copy.resources, copy.prerequisites]} rows={filtered.map(row => [row[0].replace(' -> ', ' → '), ...row.slice(1, 5), buildings[row[6]] + ' · ' + copy.level + ' ' + row[5]])} /> : <Invalid copy={copy} /> : <DataTable id="prerequisites" columns={[copy.building, copy.level, ...copy.resources]} rows={prerequisites} />}<p className="tool-note">{copy.hqNote}</p><Source lang={lang} /></>;
}

function ExperienceDatabase({ lang }) {
  const copy = toolCopy[lang];
  const [from, setFrom] = useState('1');
  const [to, setTo] = useState('175');
  const result = experiencePlan(reference.heroExp, numberInRange(from, 1, 175, true) ?? NaN, numberInRange(to, 1, 175, true) ?? NaN);
  return <><div className="tool-form-grid database-range"><NumberField id="db-exp-from" label={copy.from} value={from} onChange={setFrom} min={1} max={175} /><NumberField id="db-exp-to" label={copy.to} value={to} onChange={setTo} min={1} max={175} /></div>{result ? <><div className="database-count"><span>{copy.total}: {format(result.total, lang)}</span></div><DataTable id="exp-database" columns={[copy.level, copy.expCost]} rows={range(Number(from), Number(to) - 1).map(level => [level + ' → ' + (level + 1), format(reference.heroExp[level], lang)])} /></> : <Invalid copy={copy} />}<Source lang={lang} type="heroExp" /></>;
}

function ToolTabs({ tabs, active, onChange, copy, label }) {
  const onKeyDown = (event, index) => {
    const next = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onChange(tabs[next][0]);
    event.currentTarget.parentElement.querySelectorAll('button')[next].focus();
  };
  return <div className="tool-tabs" role="tablist" aria-label={label}>{tabs.map(([id, Icon], index) => <button key={id} role="tab" tabIndex={active === id ? 0 : -1} aria-selected={active === id} aria-controls="tool-panel" id={'tool-tab-' + id} onClick={() => onChange(id)} onKeyDown={event => onKeyDown(event, index)}><Icon size={16} /><span>{copy[id]}</span></button>)}</div>;
}

export default function ToolsView({ lang, mode, onNavigate, hqRows, prerequisites, buildings }) {
  const copy = toolCopy[lang];
  const [calcTab, setCalcTab] = useState('heroes');
  const [otherTab, setOtherTab] = useState('speedups');
  const [databaseTab, setDatabaseTab] = useState('heroes');
  const [selectedHero, setSelectedHero] = useState(null);
  const calculator = mode === 'calculators';
  const tab = calculator ? calcTab : databaseTab;
  const changeTab = calculator ? setCalcTab : setDatabaseTab;
  const tabs = calculator ? CALCULATORS : DATABASES;
  const onExperience = hero => { setSelectedHero(hero); setCalcTab('exp'); onNavigate('calculators'); };
  return <section className="tools-workspace"><nav className="tools-modes" aria-label="NoVa"><button onClick={() => onNavigate('calculators')} className={calculator ? 'active' : ''}><Calculator size={18} />{copy.calculators}</button><button onClick={() => onNavigate('database')} className={!calculator ? 'active' : ''}><Database size={18} />{copy.database}</button></nav><ToolTabs tabs={tabs} active={tab} onChange={changeTab} copy={{...copy,...advancedCopy[lang],exp:copy.exp,caravan:copy.caravan}} label={copy[mode]} /><div className="tool-panel" role="tabpanel" id="tool-panel" aria-labelledby={'tool-tab-' + tab}>
    {calculator && ['heroes','tank','equipment','exploration','lucky'].includes(tab) && <Suspense fallback={<p className="tool-note">…</p>}><AdvancedTools tab={tab} lang={lang} heroDatabase={<LocalHeroCatalog lang={lang} onExperience={onExperience}/>} discountCalculator={<DiscountCalculator lang={lang}/>}/></Suspense>}
    {calculator && tab === 'other' && <><div className="advanced-subtabs">{['speedups','packs'].map(k=><button key={k} aria-pressed={otherTab===k} onClick={()=>setOtherTab(k)}>{copy[k]}</button>)}</div>{otherTab==='speedups'?<SpeedupCalculator lang={lang}/>:<PackCalculator lang={lang}/>}</>}
    {calculator && tab === 'exp' && <HeroCalculator lang={lang} selected={selectedHero} />}
    {calculator && tab === 'speedups' && <SpeedupCalculator lang={lang} />}
    {calculator && tab === 'packs' && <PackCalculator lang={lang} />}
    {calculator && tab === 'discount' && <DiscountCalculator lang={lang} />}
    {!calculator && tab === 'heroes' && <LocalHeroCatalog lang={lang} onExperience={onExperience} />}
    {!calculator && tab === 'exp' && <ExperienceDatabase lang={lang} />}
  </div></section>;
}
