import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertTriangle, CalendarDays, ChevronRight, Languages, Search, Shield, Swords, Table2, Users } from 'lucide-react';
import workbook from './workbook-data.json';
import './styles.css';

const ui = {
  ko: {
    eyebrow: 'Last Z 737 Server',
    title: 'Lir 신규 연맹원 가이드',
    subtitle: '연맹 대결, 킬데이, 약탈, 공성 이벤트, 협곡, 캐러밴 기준을 한곳에서 확인하세요.',
    source: '원본 자료',
    search: '가이드 검색',
    quick: '핵심 체크',
    tabs: '자료 탭',
    excelTabs: '엑셀 시트',
    all: '전체',
    note: '운영진 공지 기준으로 업데이트된 웹 가이드입니다.',
    empty: '검색 결과가 없습니다.',
    memberNote: '명단성 시트는 원본 엑셀 내용을 웹 표로 옮긴 것입니다.',
    columns: ['상태', '현재', '조정', '닉네임', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', '합계', '비고'],
  },
  en: {
    eyebrow: 'Last Z 737 Server',
    title: 'Lir New Alliance Member Guide',
    subtitle: 'Check Alliance Duel, Kill Day, plunder, zombie events, Canyon Clash, and Caravan power ranges in one place.',
    source: 'Source files',
    search: 'Search guide',
    quick: 'Key checks',
    tabs: 'Guide tabs',
    excelTabs: 'Workbook sheets',
    all: 'All',
    note: 'Web guide rebuilt from the management notice files.',
    empty: 'No matching results.',
    memberNote: 'Roster-like sheet content is shown as a web table from the original workbook.',
    columns: ['Status', 'Current', 'Adjusted', 'Name', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Total', 'Note'],
  },
  es: {
    eyebrow: 'Servidor 737 de Last Z',
    title: 'Guía para nuevos miembros de Lir',
    subtitle: 'Consulta en un solo lugar el Duelo de alianza, Día de bajas, saqueo, eventos zombi, Cañón y rangos de Caravana.',
    source: 'Archivos fuente',
    search: 'Buscar en la guía',
    quick: 'Puntos clave',
    tabs: 'Pestañas',
    excelTabs: 'Hojas del Excel',
    all: 'Todo',
    note: 'Guía web reconstruida a partir de los avisos de la administración.',
    empty: 'No hay resultados.',
    memberNote: 'La hoja tipo lista se muestra como tabla web desde el libro original.',
    columns: ['Estado', 'Actual', 'Ajuste', 'Nombre', 'Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Total', 'Nota'],
  },
};

const notices = {
  ko: [
    { file: '[토요일 킬데이 규칙].txt', title: '토요일 킬데이 규칙', tone: 'danger', icon: Shield, body: ['우리 연맹은 강한 상대의 표적이 되기 쉬우므로 실드 사용이 필수입니다.', '리셋 후 빠르게 상대 서버를 약탈하고 실드를 사용해 복귀하세요.', '약탈하지 않는 인원은 리셋 후 바로 실드를 사용하세요.', '토요일 리셋 이후 실드가 없으면 사전 통보 없이 강퇴 처리되며, 추후 복귀는 가능합니다.', '같은 일이 3번 반복되면 영구 제명됩니다.'] },
    { file: '[약탈 규칙].txt', title: '약탈 규칙', tone: 'warning', icon: Swords, body: ['트럭 퀘스트나 현상 퀘스트는 서버전 중이면 상대 서버를 약탈하세요.', '서버전이 아닐 때는 같은 서버를 제외한 모든 서버에서 약탈하면 됩니다.', '자원 약탈은 NAP를 제외한 연맹을 대상으로 진행하세요.', '현재 NAP 8 기준이며, 연맹 랭킹에서 확인이 어렵다면 R4에게 문의하세요.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: '좀비 공성 및 좀비 폭군 이벤트', tone: 'info', icon: CalendarDays, body: ['Lir은 한국인 멤버 비율이 높은 연맹입니다.', '대부분 이벤트 시작 시간은 아포칼립스 기준 10:00입니다.'] },
    { file: '[협곡 쟁탈전].txt', title: '협곡 쟁탈전', tone: 'info', icon: Users, body: ['협곡 쟁탈전은 아포칼립스 시간 기준 23:00에 진행됩니다.', '참여 인원은 연맹전 개인 점수와 전투력 기준의 참여 희망자 중 랜덤으로 선정됩니다.'] },
  ],
  en: [
    { file: '[Saturday Kill Day Rules].txt', title: 'Saturday Kill Day Rules', tone: 'danger', icon: Shield, body: ['Our alliance is often targeted by stronger enemies, so using a shield is mandatory.', 'After reset, plunder the enemy server quickly, activate your shield, and return.', 'Members who do not plunder should activate a shield immediately after reset.', 'If you have no shield after Saturday reset, you may be removed without prior notice. Rejoining later is possible.', 'Repeating the same issue three times results in permanent expulsion.'] },
    { file: '[Plunder Rules].txt', title: 'Plunder Rules', tone: 'warning', icon: Swords, body: ['For truck or bounty quests during server war, plunder the enemy server.', 'When server war is not active, plunder any server except our own.', 'For resource plunder, target alliances except NAP alliances.', 'Current standard is NAP 8. If you cannot check it in alliance rankings, ask R4.'] },
    { file: '[Zombie Siege and Zombie Tyrant Event].txt', title: 'Zombie Siege and Zombie Tyrant Event', tone: 'info', icon: CalendarDays, body: ['Lir has a high ratio of Korean members.', 'Most events start at 10:00 Apocalypse Time.'] },
    { file: '[Canyon Clash].txt', title: 'Canyon Clash', tone: 'info', icon: Users, body: ['Canyon Clash is held at 23:00 Apocalypse Time.', 'Participants are randomly selected from applicants based on Alliance Duel personal score and combat power.'] },
  ],
  es: [
    { file: '[Reglas del Día de bajas del sábado].txt', title: 'Reglas del Día de bajas del sábado', tone: 'danger', icon: Shield, body: ['Nuestra alianza suele ser objetivo de rivales fuertes, por eso el escudo es obligatorio.', 'Después del reinicio, saquea rápidamente el servidor enemigo, activa el escudo y vuelve.', 'Quienes no saqueen deben activar el escudo inmediatamente después del reinicio.', 'Si no tienes escudo después del reinicio del sábado, puedes ser expulsado sin aviso previo. Es posible volver más adelante.', 'Si el mismo problema se repite tres veces, la expulsión será permanente.'] },
    { file: '[Reglas de saqueo].txt', title: 'Reglas de saqueo', tone: 'warning', icon: Swords, body: ['Para misiones de camión o recompensa durante la guerra de servidores, saquea el servidor enemigo.', 'Si no hay guerra de servidores, saquea cualquier servidor excepto el nuestro.', 'Para recursos, ataca alianzas que no estén incluidas en NAP.', 'El estándar actual es NAP 8. Si no sabes revisarlo en el ranking de alianzas, pregunta a R4.'] },
    { file: '[Evento Asedio zombi y Tirano zombi].txt', title: 'Asedio zombi y Tirano zombi', tone: 'info', icon: CalendarDays, body: ['Lir tiene una alta proporción de miembros coreanos.', 'La mayoría de los eventos empieza a las 10:00, hora de Apocalipsis.'] },
    { file: '[Disputa del Cañón].txt', title: 'Disputa del Cañón', tone: 'info', icon: Users, body: ['La Disputa del Cañón se realiza a las 23:00, hora de Apocalipsis.', 'Los participantes se eligen al azar entre quienes desean participar, considerando puntuación personal del Duelo de alianza y poder de combate.'] },
  ],
};

const spanishDuel = {
  '※ 공지\nAnnouncement': 'Aviso',
  'Day 0': 'Día 0',
  'Day 1': 'Día 1',
  'Day 2': 'Día 2',
  'Day 3': 'Día 3',
  'Day 4': 'Día 4',
  'Day 5': 'Día 5',
  'Day 6': 'Día 6',
};

function spanishSummary(entry) {
  const map = {
    '※ 공지\nAnnouncement': ['Objetivo semanal: 3,000,000 puntos.', 'Prepara con anticipación los objetos de cada día.', 'Usa insignias, contratos, órdenes y aceleradores en el día recomendado para maximizar puntos.'],
    'Day 0': ['Completa los radares el domingo, pero no reclames las recompensas.', 'Deja 8 espacios libres como preparación.'],
    'Day 1': ['Reclama recompensas de radar.', 'Usa llave inglesa dorada, planos y cajas de módulo exterior.', 'Retira tropas de minas antes de la hora límite.'],
    'Day 2': ['Haz misiones S de recompensa usando órdenes de despacho si es necesario.', 'Recluta refugiados con tandas de 500 tickets.', 'Completa mejoras de edificios en la ventana recomendada.'],
    'Day 3': ['Haz camiones S con contratos comerciales.', 'Usa aceleradores de investigación e insignias.', 'Se recomienda invertir en Reconocimiento de alianza.'],
    'Day 4': ['Recluta héroes y sube estrellas con fragmentos.', 'Usa libros de habilidad naranja y materiales de equipo.', 'Prepara los radares sin reclamar recompensas.'],
    'Day 5': ['Reclama recompensas de radar.', 'Completa edificios, investigación y entrenamiento en sus ventanas.', 'Usa aceleradores de construcción, investigación y entrenamiento.'],
    'Day 6': ['Haz recompensas y comercio urbano con grado S.', 'Prioriza derrotar unidades de la alianza rival.', 'Como segunda prioridad, derrota unidades fuera de la alianza rival.'],
  };
  return map[entry.date] || [entry.ko || entry.en];
}

const fileTabs = [
  { id: 'overview', label: { ko: '핵심 안내', en: 'Overview', es: 'Resumen' }, icon: AlertTriangle },
  { id: 'excel', label: { ko: '엑셀 가이드', en: 'Workbook', es: 'Excel' }, icon: Table2 },
  { id: 'rules', label: { ko: '메모장 규칙', en: 'Text Rules', es: 'Reglas TXT' }, icon: Shield },
];

function useFiltered(query, lang) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const haystack = JSON.stringify({ notices: notices[lang], workbook }).toLowerCase();
    return haystack.includes(q);
  }, [query, lang]);
}

function TextBlock({ text }) {
  return String(text || '').split('\n').filter(Boolean).map((line, idx) => {
    const isBullet = line.trim().startsWith('-') || line.trim().startsWith('*');
    return <p key={idx} className={isBullet ? 'bullet-line' : 'text-line'}>{line.replace(/^[-*]\s*/, '')}</p>;
  });
}

function NoticeCard({ item }) {
  const Icon = item.icon;
  return (
    <article className={`notice ${item.tone}`}>
      <div className="notice-icon"><Icon size={20} /></div>
      <div>
        <p className="file-name">{item.file}</p>
        <h3>{item.title}</h3>
        <ul>
          {item.body.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>
    </article>
  );
}

function DuelGuide({ lang }) {
  const entries = workbook.sheets['연맹 대결 가이드'].entries;
  return (
    <div className="duel-grid">
      {entries.map((entry) => (
        <article className="day-panel" key={entry.date}>
          <div className="day-label">{lang === 'es' ? spanishDuel[entry.date] || entry.date : entry.date.replace('※ 공지\nAnnouncement', lang === 'ko' ? '공지' : 'Announcement')}</div>
          {lang === 'ko' && <TextBlock text={entry.ko} />}
          {lang === 'en' && <TextBlock text={entry.en || entry.ko} />}
          {lang === 'es' && <ul className="spanish-list">{spanishSummary(entry).map((line) => <li key={line}>{line}</li>)}</ul>}
        </article>
      ))}
    </div>
  );
}

function Caravan({ lang }) {
  const data = workbook.sheets['캐러밴 표'];
  const introTitle = lang === 'ko' ? '캐러밴 투력표 이용법' : lang === 'en' ? 'How to Use the Caravan Power Table' : 'Cómo usar la tabla de poder de Caravana';
  return (
    <div className="sheet-layout">
      <section className="guide-copy">
        <h3>{introTitle}</h3>
        {(lang === 'ko' ? data.intro : [
          lang === 'en' ? 'Equip your best heroes and gear by faction, then measure power in Arena defense before choosing a Caravan stage.' : 'Equipa tus mejores héroes y equipo por formación, y mide el poder en defensa de Arena antes de elegir etapa.',
          lang === 'en' ? 'If faction buff and advantage apply, consider about a 10% bonus. Select a stage when your power x 1.1 is above the End value.' : 'Si aplican bonificación y ventaja de formación, considera cerca de 10% extra. Elige una etapa cuando tu poder x 1.1 supere el valor final.',
          lang === 'en' ? 'If you cannot clear the highest stage, drop to the previous clearable stage and secure honor badges.' : 'Si no puedes superar la etapa más alta, baja a una etapa que puedas completar y asegura insignias de honor.',
          lang === 'en' ? 'Quick battle unlocks at VIP 8 or after clearing Bloody Battlefield stage 20.' : 'La batalla rápida se desbloquea con VIP 8 o tras completar Campo de batalla sangriento etapa 20.',
        ]).map((line, i) => <p key={i}>{line}</p>)}
      </section>
      <div className="table-wrap compact">
        <table>
          <thead><tr><th>Level</th><th>Start</th><th>End</th></tr></thead>
          <tbody>
            {data.levels.map((row) => <tr key={row.level}><td>{row.level}</td><td>{row.start}</td><td>{row.end || '-'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Members({ lang }) {
  const rows = workbook.sheets['시트14'].rows;
  return (
    <div>
      <p className="muted">{ui[lang].memberNote}</p>
      <div className="table-wrap wide">
        <table>
          <thead><tr>{ui[lang].columns.map((col) => <th key={col}>{col}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`${row.name}-${idx}`}>
                <td>{row.status}</td><td>{row.current}</td><td>{row.next}</td><td>{row.name}</td>
                <td>{row.day1}</td><td>{row.day2}</td><td>{row.day3}</td><td>{row.day4}</td><td>{row.day5}</td><td>{row.day6}</td>
                <td className="strong">{row.total}</td><td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RawSheet({ lang }) {
  const rows = workbook.sheets['연맹 가이드'].rows;
  return (
    <div className="table-wrap">
      <table>
        <tbody>
          {rows.map((row, idx) => <tr key={idx}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function WorkbookView({ lang }) {
  const [sheet, setSheet] = useState('연맹 대결 가이드');
  const sheetNames = Object.keys(workbook.sheets);
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{ui[lang].source}: {workbook.source}</p>
          <h2>{ui[lang].excelTabs}</h2>
        </div>
      </div>
      <div className="subtabs">
        {sheetNames.map((name) => <button className={sheet === name ? 'active' : ''} onClick={() => setSheet(name)} key={name}>{name}</button>)}
      </div>
      {sheet === '연맹 대결 가이드' && <DuelGuide lang={lang} />}
      {sheet === '캐러밴 표' && <Caravan lang={lang} />}
      {sheet === '시트14' && <Members lang={lang} />}
      {sheet === '연맹 가이드' && <RawSheet lang={lang} />}
    </section>
  );
}

function Overview({ lang }) {
  const top = notices[lang].slice(0, 4);
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{ui[lang].quick}</p>
          <h2>{lang === 'ko' ? '처음 가입하면 반드시 볼 것' : lang === 'en' ? 'Read This First' : 'Lee esto primero'}</h2>
        </div>
      </div>
      <div className="quick-grid">
        <div><strong>3,000,000</strong><span>{lang === 'ko' ? '연맹 대결 주간 목표 점수' : lang === 'en' ? 'Weekly Alliance Duel target' : 'Meta semanal del Duelo de alianza'}</span></div>
        <div><strong>10:00</strong><span>{lang === 'ko' ? '대부분 이벤트 시작, 아포칼립스 기준' : lang === 'en' ? 'Most event starts, Apocalypse Time' : 'Inicio de la mayoría de eventos, hora Apocalipsis'}</span></div>
        <div><strong>23:00</strong><span>{lang === 'ko' ? '협곡 쟁탈전, 아포칼립스 기준' : lang === 'en' ? 'Canyon Clash, Apocalypse Time' : 'Disputa del Cañón, hora Apocalipsis'}</span></div>
        <div><strong>NAP 8</strong><span>{lang === 'ko' ? '자원 약탈 제외 기준' : lang === 'en' ? 'Resource plunder exclusion' : 'Exclusión de saqueo de recursos'}</span></div>
      </div>
      <div className="notice-grid">
        {top.map((item) => <NoticeCard key={item.title} item={item} />)}
      </div>
    </section>
  );
}

function Rules({ lang }) {
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{ui[lang].source}</p>
          <h2>{ui[lang].tabs}</h2>
        </div>
      </div>
      <div className="notice-grid single">
        {notices[lang].map((item) => <NoticeCard key={item.title} item={item} />)}
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = useState('ko');
  const [tab, setTab] = useState('overview');
  const [query, setQuery] = useState('');
  const hasResult = useFiltered(query, lang);
  const copy = ui[lang];
  return (
    <main>
      <header className="hero">
        <nav>
          <div className="brand"><span>Lir</span><small>Guide Hub</small></div>
          <div className="lang-switch" aria-label="Language">
            <Languages size={16} />
            {['ko', 'en', 'es'].map((code) => <button className={lang === code ? 'active' : ''} onClick={() => setLang(code)} key={code}>{code.toUpperCase()}</button>)}
          </div>
        </nav>
        <div className="hero-inner">
          <p>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <span>{copy.subtitle}</span>
        </div>
      </header>

      <div className="workspace">
        <aside>
          <label className="search">
            <Search size={18} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.search} />
          </label>
          {query && <p className={`search-result ${hasResult ? 'ok' : 'bad'}`}>{hasResult ? copy.all : copy.empty}</p>}
          <p className="aside-title">{copy.tabs}</p>
          <div className="main-tabs">
            {fileTabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} className={tab === id ? 'active' : ''}>
                <Icon size={18} />
                <span>{label[lang]}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <p className="aside-note">{copy.note}</p>
        </aside>
        <div className="content">
          {tab === 'overview' && <Overview lang={lang} />}
          {tab === 'excel' && <WorkbookView lang={lang} />}
          {tab === 'rules' && <Rules lang={lang} />}
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
