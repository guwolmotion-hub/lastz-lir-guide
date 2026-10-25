import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import reference from './research-reference.json';
import { researchLabels, researchName } from './research-guide.js';
import ResearchPlanner from './ResearchPlanner.jsx';
import { researchLocalCopy } from './research-guide.js';
import { numberInRange } from './tool-math.js';

const treeById = new Map(reference.trees.map(tree => [tree.id, tree]));

function seasonRequirement(season, lang) {
  if (lang === 'ko') return `시즌 ${season.number} · ${season.day}일차부터`;
  if (lang === 'es') return `Temporada ${season.number} · desde el día ${season.day}`;
  if (lang === 'hi') return `सीजन ${season.number} · ${season.day}वें दिन से`;
  return `Season ${season.number} · from day ${season.day}`;
}

export default function ResearchTreeTable({ lang }) {
  const copy = researchLabels[lang];
  const [lab, setLab] = useState('10');
  const [onlyMet, setOnlyMet] = useState(false);
  const [selected, setSelected] = useState(null);
  const local = researchLocalCopy[lang];
  const level = numberInRange(lab, 1, 35, true);
  const rows = reference.trees.filter(tree => !onlyMet || (level !== null && tree.lab <= level));
  return <section className="research-catalog">
    {selected ? <div className="research-local-detail"><button className="research-local-back" onClick={() => setSelected(null)}><ArrowLeft size={16} />{local.back}</button><ResearchPlanner lang={lang} tree={selected} /></div> : <>
    <div className="research-filter">
      <label className="tool-field" htmlFor="research-lab"><span>{copy.lab}</span><input id="research-lab" type="number" inputMode="numeric" min="1" max="35" value={lab} onChange={event => setLab(event.target.value)} /></label>
      <label className="research-toggle"><input type="checkbox" checked={onlyMet} onChange={event => setOnlyMet(event.target.checked)} /><span>{copy.onlyMet}</span></label>
    </div>
    {level === null ? <p className="tool-validation" role="alert">{copy.invalid}</p> : <>
      <p className="research-count" aria-live="polite">{copy.count}: {rows.length} / {reference.trees.length}</p>
      <div className="research-table-wrap" tabIndex="0"><table><thead><tr>{copy.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>
        {rows.map(tree => {
          const requirements = [];
          if (tree.prerequisite) requirements.push(researchName(treeById.get(tree.prerequisite.id), lang) + ' ' + tree.prerequisite.percent + '%');
          if (tree.season) requirements.push(seasonRequirement(tree.season, lang));
          const met = tree.lab <= level;
          return <tr key={tree.id} data-research={tree.id}>
            <td><strong>{researchName(tree, lang)}</strong><small className={met ? 'lab-met' : 'lab-missing'}>{met ? copy.met : copy.missing}</small></td>
            <td>{tree.lab}</td>
            <td>{requirements.length ? requirements.map(text => <span className="research-requirement" key={text}>{text}</span>) : copy.none}</td>
            <td>{new Intl.NumberFormat(lang).format(tree.badges)}</td>
            <td><button className="research-local-open" onClick={() => setSelected(tree.id)} aria-label={researchName(tree, lang) + ' · ' + local.open}>{local.open}<ArrowRight size={14} /></button></td>
          </tr>;
        })}
      </tbody></table></div>
    </>}
    <p className="tool-note">{copy.note}</p>
    </>}
  </section>;
}
