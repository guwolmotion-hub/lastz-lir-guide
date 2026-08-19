'use client';

import React, { useMemo, useState } from 'react';
import { AlertTriangle, Calculator, CalendarDays, ChevronRight, Languages, ListChecks, Search, Shield, Swords, Table2, Users } from 'lucide-react';
import workbook from './workbook-data.json';

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
    { file: '[약탈 규칙].txt', title: '약탈 규칙', tone: 'warning', icon: Swords, body: ['트럭 퀘스트나 현상 퀘스트는 서버전 중이면 상대 서버를 약탈하세요.', '서버전이 아닐 때는 같은 서버를 제외한 모든 서버에서 약탈하면 됩니다.', '자원 약탈은 NAP를 제외한 연맹을 대상으로 진행하세요.', '현재 NAP 8 기준이며, 연맹 랭킹에서 확인이 어렵다면 R4에게 문의하세요.', '약탈 인원 제한은 현재 4명 + 실드 지원 2명입니다. 반드시 인원 수를 확인한 뒤 텔레포트하세요.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: '좀비 공성 및 좀비 폭군 이벤트', tone: 'info', icon: CalendarDays, body: ['Lir은 한국인 멤버 비율이 높은 연맹입니다.', '대부분 이벤트 시작 시간은 아포칼립스 기준 10:00입니다.'] },
    { file: '[협곡 쟁탈전].txt', title: '협곡 쟁탈전', tone: 'info', icon: Users, body: ['협곡 쟁탈전은 아포칼립스 시간 기준 23:00에 진행됩니다.', '참여 인원은 연맹전 개인 점수와 전투력 기준의 참여 희망자 중 랜덤으로 선정됩니다.'] },
  ],
  en: [
    { file: '[토요일 킬데이 규칙].txt', title: 'Saturday Kill Day Rules', tone: 'danger', icon: Shield, body: ['Our alliance is often targeted by stronger enemies, so using a shield is mandatory.', 'After reset, plunder the enemy server quickly, activate your shield, and return.', 'Members who do not plunder should activate a shield immediately after reset.', 'If you have no shield after Saturday reset, you may be removed without prior notice. Rejoining later is possible.', 'Repeating the same issue three times results in permanent expulsion.'] },
    { file: '[약탈 규칙].txt', title: 'Plunder Rules', tone: 'warning', icon: Swords, body: ['For truck or bounty quests during server war, plunder the enemy server.', 'When server war is not active, plunder any server except our own.', 'For resource plunder, target alliances except NAP alliances.', 'Current standard is NAP 8. If you cannot check it in alliance rankings, ask R4.', 'Plunder participation is currently limited to 4 plunder members + 2 shield support members. Check the count before teleporting.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: 'Zombie Siege and Zombie Tyrant Event', tone: 'info', icon: CalendarDays, body: ['Lir has a high ratio of Korean members.', 'Most events start at 10:00 Apocalypse Time.'] },
    { file: '[협곡 쟁탈전].txt', title: 'Canyon Clash', tone: 'info', icon: Users, body: ['Canyon Clash is held at 23:00 Apocalypse Time.', 'Participants are randomly selected from applicants based on Alliance Duel personal score and combat power.'] },
  ],
  es: [
    { file: '[토요일 킬데이 규칙].txt', title: 'Reglas del Día de bajas del sábado', tone: 'danger', icon: Shield, body: ['Nuestra alianza suele ser objetivo de rivales fuertes, por eso el escudo es obligatorio.', 'Después del reinicio, saquea rápidamente el servidor enemigo, activa el escudo y vuelve.', 'Quienes no saqueen deben activar el escudo inmediatamente después del reinicio.', 'Si no tienes escudo después del reinicio del sábado, puedes ser expulsado sin aviso previo. Es posible volver más adelante.', 'Si el mismo problema se repite tres veces, la expulsión será permanente.'] },
    { file: '[약탈 규칙].txt', title: 'Reglas de saqueo', tone: 'warning', icon: Swords, body: ['Para misiones de camión o recompensa durante la guerra de servidores, saquea el servidor enemigo.', 'Si no hay guerra de servidores, saquea cualquier servidor excepto el nuestro.', 'Para recursos, ataca alianzas que no estén incluidas en NAP.', 'El estándar actual es NAP 8. Si no sabes revisarlo en el ranking de alianzas, pregunta a R4.', 'El saqueo está limitado actualmente a 4 miembros de saqueo + 2 miembros de apoyo con escudo. Revisa el número antes de teletransportarte.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: 'Asedio zombi y Tirano zombi', tone: 'info', icon: CalendarDays, body: ['Lir tiene una alta proporción de miembros coreanos.', 'La mayoría de los eventos empieza a las 10:00, hora de Apocalipsis.'] },
    { file: '[협곡 쟁탈전].txt', title: 'Disputa del Cañón', tone: 'info', icon: Users, body: ['La Disputa del Cañón se realiza a las 23:00, hora de Apocalipsis.', 'Los participantes se eligen al azar entre quienes desean participar, considerando puntuación personal del Duelo de alianza y poder de combate.'] },
  ],
};

const noticeSummaries = {
  ko: {
    '[약탈 규칙].txt': [
      { label: '서버전 중', value: '상대 서버 약탈' },
      { label: '평상시', value: '같은 서버 제외' },
      { label: '인원 제한', value: '약탈 4명 + 실드 2명' },
    ],
    '[토요일 킬데이 규칙].txt': [
      { label: '필수 행동', value: '실드 사용' },
      { label: '리셋 직후', value: '약탈 후 실드 또는 즉시 실드' },
      { label: '반복 위반', value: '3회 시 영구 제명' },
    ],
    '[좀비 공성 및 좀비 폭군 이벤트].txt': [
      { label: '연맹 특성', value: '한국인 멤버 비율 높음' },
      { label: '기준 시간', value: '아포칼립스 시간' },
      { label: '주요 시작', value: '대부분 10:00' },
    ],
    '[협곡 쟁탈전].txt': [
      { label: '진행 시간', value: '아포칼립스 23:00' },
      { label: '선정 기준', value: '연맹전 개인 점수' },
      { label: '선정 방식', value: '희망자 중 랜덤' },
    ],
  },
  en: {
    '[약탈 규칙].txt': [
      { label: 'Server war', value: 'Plunder enemy server' },
      { label: 'Normal days', value: 'Avoid our own server' },
      { label: 'Limit', value: '4 plunder + 2 shield support' },
    ],
    '[토요일 킬데이 규칙].txt': [
      { label: 'Required', value: 'Use a shield' },
      { label: 'After reset', value: 'Plunder then shield, or shield now' },
      { label: 'Repeat issue', value: 'Permanent removal after 3 times' },
    ],
    '[좀비 공성 및 좀비 폭군 이벤트].txt': [
      { label: 'Alliance', value: 'Many Korean members' },
      { label: 'Time basis', value: 'Apocalypse Time' },
      { label: 'Main start', value: 'Mostly 10:00' },
    ],
    '[협곡 쟁탈전].txt': [
      { label: 'Event time', value: '23:00 Apocalypse' },
      { label: 'Selection', value: 'Alliance Duel personal score' },
      { label: 'Method', value: 'Random among applicants' },
    ],
  },
  es: {
    '[약탈 규칙].txt': [
      { label: 'Guerra', value: 'Saquear servidor enemigo' },
      { label: 'Días normales', value: 'Evitar nuestro servidor' },
      { label: 'Límite', value: '4 saqueo + 2 apoyo escudo' },
    ],
    '[토요일 킬데이 규칙].txt': [
      { label: 'Obligatorio', value: 'Usar escudo' },
      { label: 'Tras reinicio', value: 'Saquear y escudo, o escudo directo' },
      { label: 'Repetición', value: 'Expulsión permanente tras 3 veces' },
    ],
    '[좀비 공성 및 좀비 폭군 이벤트].txt': [
      { label: 'Alianza', value: 'Muchos miembros coreanos' },
      { label: 'Hora base', value: 'Hora de Apocalipsis' },
      { label: 'Inicio', value: 'Casi siempre 10:00' },
    ],
    '[협곡 쟁탈전].txt': [
      { label: 'Horario', value: '23:00 Apocalipsis' },
      { label: 'Criterio', value: 'Puntos personales del Duelo' },
      { label: 'Método', value: 'Aleatorio entre solicitantes' },
    ],
  },
};

const workbookSummaries = {
  ko: [
    { label: '주간 목표', value: '3,000,000점' },
    { label: '핵심 방식', value: 'Day별 아이템을 모아 지정일에 사용' },
    { label: '탭 구성', value: '공지부터 Day 6까지 분리 확인' },
  ],
  en: [
    { label: 'Weekly target', value: '3,000,000 points' },
    { label: 'Core flow', value: 'Save items and use them on the right day' },
    { label: 'Layout', value: 'Notice through Day 6 as separate tabs' },
  ],
  es: [
    { label: 'Meta semanal', value: '3,000,000 puntos' },
    { label: 'Flujo clave', value: 'Guarda objetos y úsalos el día correcto' },
    { label: 'Formato', value: 'Aviso a Día 6 en pestañas separadas' },
  ],
};

const caravanCopy = {
  ko: {
    title: '캐러밴 단계 선택 기준',
    formulaLabel: '단계 선택 공식',
    formula: '내 투력 x 1.1 > 표의 End',
    formulaHint: '진영 버프와 상성이 앞설 때 약 10% 보너스를 보고 계산합니다.',
    stepsTitle: '진행 순서',
    steps: [
      { title: '진영별 편성', text: '출전할 영웅을 진영별로 구성하고 가장 좋은 장비를 착용합니다.' },
      { title: '투력 측정', text: '캐러밴 선택 전에 아레나 방어 섹션에서 현재 투력을 확인합니다.' },
      { title: '단계 결정', text: '내 투력에 1.1을 곱한 값이 End보다 높으면 해당 스테이지를 선택합니다.' },
      { title: '부족할 때', text: '대통령관저 공격/방어 장관을 활용하고, 그래도 어렵다면 이전 단계로 내려갑니다.' },
    ],
    alerts: [
      '캐러밴은 실제 보유 병력으로 계산되므로, 병력이 많이 죽은 뒤에는 아레나 투력과 차이가 납니다.',
      '각 속성 최고 부대의 최대 인원수를 채운 뒤 도전하세요.',
      '빠른 전투는 VIP 8이거나 블러디전장 20스테이지 클리어 후 사용할 수 있습니다.',
    ],
    tableTitle: '스테이지별 필요 투력',
    tableHint: '단위는 원본 표 기준 K/M 표기입니다.',
    columns: ['단계', '시작', '끝'],
  },
  en: {
    title: 'Caravan Stage Selection',
    formulaLabel: 'Selection Formula',
    formula: 'Your power x 1.1 > table End',
    formulaHint: 'Use the 10% estimate only when faction buff and advantage apply.',
    stepsTitle: 'Flow',
    steps: [
      { title: 'Build by faction', text: 'Set the heroes for each faction and equip your best gear.' },
      { title: 'Measure power', text: 'Before selecting Caravan, check power in Arena defense.' },
      { title: 'Pick a stage', text: 'Choose the stage when your power multiplied by 1.1 is above the End value.' },
      { title: 'If short', text: 'Use President attack/defense ministers, then drop one stage if it still fails.' },
    ],
    alerts: [
      'Caravan uses actual troops, so power can differ from Arena after heavy troop losses.',
      'Fill the maximum count of your best troop type before attempting Caravan.',
      'Quick battle is available at VIP 8 or after clearing Bloody Battlefield stage 20.',
    ],
    tableTitle: 'Power Needed by Stage',
    tableHint: 'Values keep the K/M notation from the source table.',
    columns: ['Stage', 'Start', 'End'],
  },
  es: {
    title: 'Selección de etapa de Caravana',
    formulaLabel: 'Fórmula de selección',
    formula: 'Tu poder x 1.1 > final de la tabla',
    formulaHint: 'Usa el 10% solo si tienes bonificación y ventaja de formación.',
    stepsTitle: 'Flujo',
    steps: [
      { title: 'Formación', text: 'Configura héroes por formación y equipa el mejor equipo.' },
      { title: 'Medir poder', text: 'Antes de elegir Caravana, revisa el poder en defensa de Arena.' },
      { title: 'Elegir etapa', text: 'Elige una etapa si tu poder x 1.1 supera el valor final.' },
      { title: 'Si falta poder', text: 'Usa ministros de ataque/defensa y baja una etapa si todavía no alcanza.' },
    ],
    alerts: [
      'Caravana calcula con tropas reales, así que puede diferir de Arena tras perder muchas tropas.',
      'Llena el máximo de tus mejores tropas por atributo antes de intentarlo.',
      'La batalla rápida requiere VIP 8 o completar Campo de batalla sangriento etapa 20.',
    ],
    tableTitle: 'Poder necesario por etapa',
    tableHint: 'Los valores mantienen la notación K/M de la tabla original.',
    columns: ['Etapa', 'Inicio', 'Final'],
  },
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

const displayNames = {
  '[연맹 대전 준비사항].xlsx': '연맹 대전 준비사항',
  '2026 737서버.xlsx의 사본.xlsx': '연맹 대전 준비사항',
  '캐러밴 표': '캐러밴 표',
  '[약탈 규칙].txt': '약탈 규칙',
  '[토요일 킬데이 규칙].txt': '토요일 킬데이 규칙',
  '[좀비 공성 및 좀비 폭군 이벤트].txt': '좀비 공성 및 좀비 폭군 이벤트',
  '[협곡 쟁탈전].txt': '협곡 쟁탈전',
};

function displayName(name) {
  return displayNames[name] || String(name).replace(/\.(xlsx|txt)$/i, '').replace(/^\[|\]$/g, '');
}

function dayLabel(date, lang) {
  if (date === '※ 공지\nAnnouncement') {
    return lang === 'ko' ? '공지' : lang === 'en' ? 'Notice' : 'Aviso';
  }
  if (lang === 'es') return spanishDuel[date] || date;
  return date;
}

function dayTitle(entry, lang) {
  const text = lang === 'ko' ? entry.ko : lang === 'en' ? entry.en || entry.ko : spanishSummary(entry).join('\n');
  const first = String(text).split('\n').find(Boolean) || dayLabel(entry.date, lang);
  return first.replace(/[🔳■]/g, '').trim();
}

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
  { id: workbook.source, type: 'workbook', label: displayName(workbook.source), icon: Table2 },
  { id: '캐러밴 표', type: 'caravan', label: '캐러밴 표', icon: Table2 },
  { id: '[약탈 규칙].txt', type: 'notice', label: '약탈 규칙', icon: Swords },
  { id: '[토요일 킬데이 규칙].txt', type: 'notice', label: '토요일 킬데이 규칙', icon: Shield },
  { id: '[좀비 공성 및 좀비 폭군 이벤트].txt', type: 'notice', label: '좀비 공성 및 좀비 폭군 이벤트', icon: CalendarDays },
  { id: '[협곡 쟁탈전].txt', type: 'notice', label: '협곡 쟁탈전', icon: Users },
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
        <p className="file-name">{displayName(item.file)}</p>
        <h3>{item.title}</h3>
        <ul>
          {item.body.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>
    </article>
  );
}

function SummaryStrip({ items }) {
  return (
    <div className="summary-strip">
      {items.map((item) => (
        <div className="summary-item" key={`${item.label}-${item.value}`}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function DuelGuide({ lang }) {
  const entries = workbook.sheets['연맹 대결 가이드'].entries;
  const [activeDay, setActiveDay] = useState(entries[0]?.date);
  const activeEntry = entries.find((entry) => entry.date === activeDay) || entries[0];
  return (
    <div className="organized-stack">
      <SummaryStrip items={workbookSummaries[lang]} />
      <div className="duel-shell">
        <div className="day-tabs" aria-label="Alliance duel days">
          {entries.map((entry) => (
            <button className={activeEntry.date === entry.date ? 'active' : ''} onClick={() => setActiveDay(entry.date)} key={entry.date}>
              <strong>{dayLabel(entry.date, lang)}</strong>
              <span>{dayTitle(entry, lang)}</span>
            </button>
          ))}
        </div>
        <article className="day-detail">
          <div className="day-detail-head">
            <span>{dayLabel(activeEntry.date, lang)}</span>
            <h3>{dayTitle(activeEntry, lang)}</h3>
          </div>
          <div className="day-copy">
            {lang === 'ko' && <TextBlock text={activeEntry.ko} />}
            {lang === 'en' && <TextBlock text={activeEntry.en || activeEntry.ko} />}
            {lang === 'es' && <ul className="spanish-list">{spanishSummary(activeEntry).map((line) => <li key={line}>{line}</li>)}</ul>}
          </div>
        </article>
      </div>
    </div>
  );
}

function Caravan({ lang }) {
  const data = workbook.sheets['캐러밴 표'];
  const copy = caravanCopy[lang];
  return (
    <div className="caravan-layout">
      <section className="formula-panel">
        <div className="formula-icon"><Calculator size={24} /></div>
        <div>
          <p>{copy.formulaLabel}</p>
          <strong>{copy.formula}</strong>
          <span>{copy.formulaHint}</span>
        </div>
      </section>
      <section className="step-panel">
        <div className="panel-title">
          <ListChecks size={19} />
          <h3>{copy.stepsTitle}</h3>
        </div>
        <div className="step-list">
          {copy.steps.map((step, index) => (
            <article className="step-item" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="alert-panel">
        <div className="panel-title">
          <AlertTriangle size={19} />
          <h3>{lang === 'ko' ? '주의사항' : lang === 'en' ? 'Warnings' : 'Avisos'}</h3>
        </div>
        <ul>
          {copy.alerts.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </section>
      <section className="table-section">
        <div className="table-heading">
          <div>
            <p className="section-kicker">{copy.tableHint}</p>
            <h3>{copy.tableTitle}</h3>
          </div>
          <span>{data.levels.length} Levels</span>
        </div>
        <div className="table-wrap compact">
        <table>
          <thead><tr>{copy.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {data.levels.map((row) => <tr key={row.level}><td>{row.level}</td><td>{row.start}</td><td>{row.end || '-'}</td></tr>)}
          </tbody>
        </table>
        </div>
      </section>
    </div>
  );
}

function WorkbookView({ lang }) {
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{displayName(workbook.source)}</p>
          <h2>{lang === 'ko' ? '가이드 항목' : lang === 'en' ? 'Guide Sections' : 'Secciones de guía'}</h2>
        </div>
      </div>
      <DuelGuide lang={lang} />
    </section>
  );
}

function CaravanView({ lang }) {
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{displayName(workbook.source)}</p>
          <h2>{caravanCopy[lang].title}</h2>
        </div>
      </div>
      <Caravan lang={lang} />
    </section>
  );
}

function FileNotice({ lang, file }) {
  const item = notices[lang].find((notice) => notice.file === file);
  if (!item) return null;
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{ui[lang].source}</p>
          <h2>{displayName(item.file)}</h2>
        </div>
      </div>
      <SummaryStrip items={noticeSummaries[lang][file]} />
      <div className="notice-grid single">
        <NoticeCard item={item} />
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState('ko');
  const [tab, setTab] = useState(workbook.source);
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
                <span>{label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <p className="aside-note">{copy.note}</p>
        </aside>
        <div className="content">
          {tab === workbook.source && <WorkbookView lang={lang} />}
          {tab === '캐러밴 표' && <CaravanView lang={lang} />}
          {tab !== workbook.source && tab !== '캐러밴 표' && <FileNotice lang={lang} file={tab} />}
        </div>
      </div>
    </main>
  );
}
