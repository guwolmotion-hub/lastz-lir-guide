'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowLeft, Building2, Calculator, CalendarDays, ChevronLeft, ChevronRight, ClipboardCheck, Home, Languages, ListChecks, Shield, Sparkles, Swords, Table2, TrendingUp, Users } from 'lucide-react';
import workbook from './workbook-data.json';

const hqUpgradeRows = [
  ['16 -> 17', '18.2M', '18.2M', '3.5M', '-', '16', 'labWall'],
  ['17 -> 18', '31.9M', '31.9M', '6.2M', '-', '17', 'labAlliance'],
  ['18 -> 19', '38.2M', '38.2M', '7.5M', '-', '18', 'labStrikerCamp'],
  ['19 -> 20', '68.9M', '68.9M', '13.5M', '-', '19', 'labShooterCamp'],
  ['20 -> 21', '96.4M', '96.4M', '18.9M', '-', '20', 'labRiderCamp'],
  ['21 -> 22', '119.1M', '119.1M', '23.3M', '-', '21', 'labWall'],
  ['22 -> 23', '156.3M', '156.3M', '30.7M', '-', '22', 'labAlliance'],
  ['23 -> 24', '196M', '196M', '38.4M', '-', '23', 'labStrikerCamp'],
  ['24 -> 25', '277.7M', '277.7M', '55.5M', '-', '24', 'labShooterCamp'],
  ['25 -> 26', '443.1M', '443.1M', '86.8M', '-', '25', 'labRiderCamp'],
  ['26 -> 27', '576.1M', '576.1M', '113M', '-', '26', 'labWall'],
  ['27 -> 28', '721.6M', '721.6M', '141.4M', '-', '27', 'labAlliance'],
  ['28 -> 29', '1G', '1G', '198M', '-', '28', 'labStrikerCamp'],
  ['29 -> 30', '1.6G', '1.6G', '293M', '-', '29', 'labShooterCamp'],
  ['30 -> 31', '1.2G', '1.2G', '241.4M', '2.2M', '30', 'labRiderCamp'],
  ['31 -> 32', '1.4G', '1.4G', '289.8M', '3.1M', '31', 'wall'],
  ['32 -> 33', '1.7G', '1.7G', '347.6M', '4.1M', '32', 'alliance'],
  ['33 -> 34', '2.0G', '2.0G', '399.5M', '5.3M', '33', 'strikerGround'],
  ['34 -> 35', '2.4G', '2.4G', '449M', '6.2M', '34', 'shooterGround'],
];

const prerequisiteRows = [
  ['wall', '30 -> 31', '402.3M', '402.3M', '160.6M', '1.5M'],
  ['alliance', '30 -> 31', '620.3M', '620.3M', '80.4M', '754.7K'],
  ['alliance', '31 -> 32', '744.3M', '744.3M', '96.9M', '1.0M'],
  ['strikerGround', '30 -> 31', '201.1M', '201.1M', '120.7M', '1.1M'],
  ['strikerGround', '31 -> 32', '241.4M', '241.4M', '144.5M', '1.5M'],
  ['strikerGround', '32 -> 33', '289.7M', '289.7M', '173.4M', '2.0M'],
  ['shooterGround', '30 -> 31', '201.1M', '201.1M', '120.7M', '1.1M'],
  ['shooterGround', '31 -> 32', '241.4M', '241.4M', '144.5M', '1.5M'],
  ['shooterGround', '32 -> 33', '289.7M', '289.7M', '173.4M', '2.0M'],
  ['shooterGround', '33 -> 34', '325.3M', '325.3M', '195M', '2.6M'],
];

const buildingNames = {
  ko: {
    labWall: '실험실, 성벽',
    labAlliance: '실험실, 연맹센터',
    labStrikerCamp: '실험실, 돌격 훈련소',
    labShooterCamp: '실험실, 슈터 훈련소',
    labRiderCamp: '실험실, 라이더 훈련소',
    wall: '성벽',
    alliance: '연맹센터',
    strikerGround: '돌격 훈련병영',
    shooterGround: '슈터 훈련병영',
  },
  en: {
    labWall: 'Lab, Wall',
    labAlliance: 'Lab, Alliance Center',
    labStrikerCamp: 'Lab, Striker Training Camp',
    labShooterCamp: 'Lab, Shooter Training Camp',
    labRiderCamp: 'Lab, Rider Training Camp',
    wall: 'Wall',
    alliance: 'Alliance Center',
    strikerGround: 'Striker Training Ground',
    shooterGround: 'Shooter Training Ground',
  },
  es: {
    labWall: 'Laboratorio, Muro',
    labAlliance: 'Laboratorio, Centro de alianza',
    labStrikerCamp: 'Laboratorio, Campo de asalto',
    labShooterCamp: 'Laboratorio, Campo de tiradores',
    labRiderCamp: 'Laboratorio, Campo de jinetes',
    wall: 'Muro',
    alliance: 'Centro de alianza',
    strikerGround: 'Campo de asalto',
    shooterGround: 'Campo de tiradores',
  },
  hi: {
    labWall: 'लैब, दीवार',
    labAlliance: 'लैब, अलायंस सेंटर',
    labStrikerCamp: 'लैब, स्ट्राइकर ट्रेनिंग कैंप',
    labShooterCamp: 'लैब, शूटर ट्रेनिंग कैंप',
    labRiderCamp: 'लैब, राइडर ट्रेनिंग कैंप',
    wall: 'दीवार',
    alliance: 'अलायंस सेंटर',
    strikerGround: 'स्ट्राइकर ट्रेनिंग ग्राउंड',
    shooterGround: 'शूटर ट्रेनिंग ग्राउंड',
  },
};

const hqUpgradeCopy = {
  ko: {
    title: '본부 레벨업',
    kicker: 'HQ',
    file: '본부 업글시 Lv. 별 필요 자원 정리',
    desc: '레벨별 필요 자원과 선행건물',
    summary: [
      { label: '적용 기준', value: '신규 강철 RSS 시즌 3 진입부터 적용' },
      { label: '핵심 구간', value: 'Lv.30부터 강철 필요량이 크게 증가' },
      { label: '주의 사항', value: '영웅, 테크, 통달센터 등은 개인 자원 감소 차이가 있음' },
    ],
    hqTitle: '본부 레벨별 필요 자원',
    prereqTitle: '선행건물 고레벨 필요 자원',
    columns: ['레벨', '음식', '목재', '코인', '강철', '선행건물'],
    prereqColumns: ['선행건물', '레벨', '음식', '목재', '코인', '강철'],
    notes: ['Lv.30 이상부터 강철이 본격적으로 필요하므로 미리 확보하십시오.', '본부 레벨업은 실험실과 병영, 성벽, 연맹센터 조건을 함께 확인해야 합니다.', '표 수치는 2025-11-17 수정본 기준이며 서버나 연구 상태에 따라 체감 필요량은 달라질 수 있습니다.'],
  },
  en: {
    title: 'HQ Level Up',
    kicker: 'HQ',
    file: 'HQ level resource requirements',
    desc: 'Resources and prerequisite buildings by level',
    summary: [
      { label: 'Applies from', value: 'New steel RSS, season 3 entry onward' },
      { label: 'Key range', value: 'Steel demand rises sharply from Lv.30' },
      { label: 'Caution', value: 'Hero, tech, and mastery reductions can differ by player' },
    ],
    hqTitle: 'HQ Resource Requirements by Level',
    prereqTitle: 'High-Level Prerequisite Buildings',
    columns: ['Level', 'Food', 'Wood', 'Coins', 'Steel', 'Prerequisite'],
    prereqColumns: ['Prerequisite', 'Level', 'Food', 'Wood', 'Coins', 'Steel'],
    notes: ['From Lv.30 onward, steel becomes a major bottleneck, so stockpile it early.', 'Check Lab, training grounds, Wall, and Alliance Center requirements together before starting HQ upgrades.', 'Values follow the 2025-11-17 revision and may feel different depending on server and research reductions.'],
  },
  es: {
    title: 'Subida de Base',
    kicker: 'HQ',
    file: 'Recursos necesarios por nivel de base',
    desc: 'Recursos y edificios previos por nivel',
    summary: [
      { label: 'Aplicacion', value: 'Nuevo RSS de acero desde la entrada a temporada 3' },
      { label: 'Tramo clave', value: 'El acero aumenta mucho desde Lv.30' },
      { label: 'Aviso', value: 'Heroes, tecnologia y maestria pueden reducir recursos de forma distinta' },
    ],
    hqTitle: 'Recursos de Base por Nivel',
    prereqTitle: 'Edificios Previos de Nivel Alto',
    columns: ['Nivel', 'Comida', 'Madera', 'Monedas', 'Acero', 'Requisito'],
    prereqColumns: ['Requisito', 'Nivel', 'Comida', 'Madera', 'Monedas', 'Acero'],
    notes: ['Desde Lv.30 el acero se vuelve un cuello de botella importante, asi que conviene guardarlo antes.', 'Antes de mejorar la base, revisa Laboratorio, campos de entrenamiento, Muro y Centro de alianza.', 'Los valores siguen la revision del 2025-11-17 y pueden variar en la practica segun servidor e investigacion.'],
  },
  hi: {
    title: 'HQ लेवल अप',
    kicker: 'HQ',
    file: 'HQ लेवल के लिए जरूरी संसाधन',
    desc: 'हर लेवल के संसाधन और पहले चाहिए भवन',
    summary: [
      { label: 'लागू चरण', value: 'नया स्टील RSS, season 3 से' },
      { label: 'मुख्य चरण', value: 'Lv.30 के बाद स्टील बहुत जरूरी होता है' },
      { label: 'ध्यान दें', value: 'हीरो, टेक और मास्टरी से खर्च अलग हो सकता है' },
    ],
    hqTitle: 'HQ लेवल별 जरूरी संसाधन',
    prereqTitle: 'उच्च लेवल के पहले चाहिए भवन',
    columns: ['लेवल', 'खाना', 'लकड़ी', 'कॉइन', 'स्टील', 'पहले चाहिए'],
    prereqColumns: ['पहले चाहिए', 'लेवल', 'खाना', 'लकड़ी', 'कॉइन', 'स्टील'],
    notes: ['Lv.30 के बाद स्टील बड़ा bottleneck बनता है, इसलिए पहले से जमा रखें.', 'HQ लेवल अप से पहले लैब, ट्रेनिंग ग्राउंड, दीवार और अलायंस सेंटर की शर्तें साथ में देखें.', 'ये आंकड़े 2025-11-17 revision 기준 हैं और server या research status के अनुसार बदल सकते हैं.'],
  },
};

const ui = {
  ko: {
    eyebrow: 'Last Z 737 Server',
    title: 'Lir 신규 연맹원 가이드',
    lobbyTitle: 'Lir',
    lobbySubtitle: '신규 연맹원 가이드',
    subtitle: '연맹 대결, 킬데이, 약탈, 공성 이벤트, 협곡, 캐러밴 기준을 한곳에서 확인하세요.',
    source: '원본 자료',
    quick: '핵심 체크',
    tabs: '자료 탭',
    excelTabs: '엑셀 시트',
    all: '전체',
    note: '운영진 공지 기준으로 업데이트된 웹 가이드입니다.',
    home: '홈으로',
    lobbyNav: ['연맹 대전', '캐러밴', '가이드 선택', '전투 규칙', '이벤트'],
    memberNote: '명단성 시트는 원본 엑셀 내용을 웹 표로 옮긴 것입니다.',
    columns: ['상태', '현재', '조정', '닉네임', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', '합계', '비고'],
  },
  en: {
    eyebrow: 'Last Z 737 Server',
    title: 'Lir New Alliance Member Guide',
    lobbyTitle: 'Lir',
    lobbySubtitle: 'New Alliance Member Guide',
    subtitle: 'Check Alliance Duel, Kill Day, plunder, zombie events, Canyon Clash, and Caravan power ranges in one place.',
    source: 'Source files',
    quick: 'Key checks',
    tabs: 'Guide tabs',
    excelTabs: 'Workbook sheets',
    all: 'All',
    note: 'Web guide rebuilt from the management notice files.',
    home: 'Home',
    lobbyNav: ['Alliance Duel', 'Caravan', 'Select Guide', 'Battle Rules', 'Events'],
    memberNote: 'Roster-like sheet content is shown as a web table from the original workbook.',
    columns: ['Status', 'Current', 'Adjusted', 'Name', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Total', 'Note'],
  },
  es: {
    eyebrow: 'Servidor 737 de Last Z',
    title: 'Guía para nuevos miembros de Lir',
    lobbyTitle: 'Lir',
    lobbySubtitle: 'Guía para nuevos miembros',
    subtitle: 'Consulta en un solo lugar el Duelo de alianza, Día de bajas, saqueo, eventos zombi, Cañón y rangos de Caravana.',
    source: 'Archivos fuente',
    quick: 'Puntos clave',
    tabs: 'Pestañas',
    excelTabs: 'Hojas del Excel',
    all: 'Todo',
    note: 'Guía web reconstruida a partir de los avisos de la administración.',
    home: 'Inicio',
    lobbyNav: ['Duelo', 'Caravana', 'Elegir guía', 'Reglas', 'Eventos'],
    memberNote: 'La hoja tipo lista se muestra como tabla web desde el libro original.',
    columns: ['Estado', 'Actual', 'Ajuste', 'Nombre', 'Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Total', 'Nota'],
  },
  hi: {
    eyebrow: 'Last Z 737 Server',
    title: 'Lir नए अलायंस सदस्य गाइड',
    lobbyTitle: 'Lir',
    lobbySubtitle: 'नए अलायंस सदस्य गाइड',
    subtitle: 'Alliance Duel, Kill Day, plunder, events, Canyon, Caravan और power guide एक जगह देखें.',
    source: 'Source files',
    quick: 'मुख्य check',
    tabs: 'गाइड टैब',
    excelTabs: 'वर्कबुक शीट',
    all: 'सब',
    note: 'Management notice 기준으로 updated web guide है.',
    home: 'होम',
    lobbyNav: ['Alliance Duel', 'Caravan', 'Guide', 'Rules', 'Events'],
    memberNote: 'Original Excel content को web table में बदला गया है.',
    columns: ['स्थिति', 'Current', 'Adjusted', 'Nickname', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'कुल', 'नोट'],
  },
};

const notices = {
  ko: [
    { file: '[토요일 킬데이 규칙].txt', title: '토요일 킬데이 규칙', tone: 'danger', icon: Shield, body: ['우리 연맹은 강한 상대의 표적이 되기 쉬우므로 실드 사용이 필수입니다.', '리셋 후 빠르게 상대 서버를 약탈하고 실드를 사용해 복귀하세요.', '약탈하지 않는 인원은 리셋 후 바로 실드를 사용하세요.', '토요일 리셋 이후 실드가 없으면 사전 통보 없이 강퇴 처리되며, 추후 복귀는 가능합니다.', '같은 일이 3번 반복되면 영구 제명됩니다.'] },
    { file: '[약탈 규칙].txt', title: '약탈 규칙', tone: 'warning', icon: Swords, body: ['참여 인원: 약탈에 참여할 수 있는 인원은 제한이 없습니다.', '제로잉 절대 금지: 상대 도시의 병력이 거의 남지 않을 때까지 반복 공격하지 마세요.', 'NAP 공격 금지: NAP 연맹은 서로 공격할 수 없습니다.', '아카데미 공격 기준: 아카데미 연맹은 공격할 수 있습니다. 단, 닉네임에 Farm이 포함된 아카데미 계정은 공격 금지입니다.', '위반 시 조치: 적발되면 경고 없이 강퇴 처리됩니다.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: '좀비 공성 및 좀비 폭군 이벤트', tone: 'info', icon: CalendarDays, body: ['Lir은 한국인 멤버 비율이 높은 연맹입니다.', '대부분 이벤트 시작 시간은 아포칼립스 기준 10:00입니다.'] },
    { file: '[협곡 쟁탈전].txt', title: '협곡 쟁탈전', tone: 'info', icon: Users, body: ['협곡 쟁탈전은 아포칼립스 시간 기준 23:00에 진행됩니다.', '참여 인원은 연맹전 개인 점수와 전투력 기준의 참여 희망자 중 랜덤으로 선정됩니다.'] },
  ],
  en: [
    { file: '[토요일 킬데이 규칙].txt', title: 'Saturday Kill Day Rules', tone: 'danger', icon: Shield, body: ['Our alliance is often targeted by stronger enemies, so using a shield is mandatory.', 'After reset, plunder the enemy server quickly, activate your shield, and return.', 'Members who do not plunder should activate a shield immediately after reset.', 'If you have no shield after Saturday reset, you may be removed without prior notice. Rejoining later is possible.', 'Repeating the same issue three times results in permanent expulsion.'] },
    { file: '[약탈 규칙].txt', title: 'Plunder Rules', tone: 'warning', icon: Swords, body: ['There is no limit on the number of plunder participants.', 'Zeroing is strictly forbidden. Do not repeatedly attack a city until its troops are nearly wiped out.', 'NAP alliances cannot attack each other.', 'Academy alliances may be attacked, but academy accounts with Farm in the nickname must not be attacked.', 'If a violation is confirmed, the member will be removed without warning.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: 'Zombie Siege and Zombie Tyrant Event', tone: 'info', icon: CalendarDays, body: ['Lir has a high ratio of Korean members.', 'Most events start at 10:00 Apocalypse Time.'] },
    { file: '[협곡 쟁탈전].txt', title: 'Canyon Clash', tone: 'info', icon: Users, body: ['Canyon Clash is held at 23:00 Apocalypse Time.', 'Participants are randomly selected from applicants based on Alliance Duel personal score and combat power.'] },
  ],
  es: [
    { file: '[토요일 킬데이 규칙].txt', title: 'Reglas del Día de bajas del sábado', tone: 'danger', icon: Shield, body: ['Nuestra alianza suele ser objetivo de rivales fuertes, por eso el escudo es obligatorio.', 'Después del reinicio, saquea rápidamente el servidor enemigo, activa el escudo y vuelve.', 'Quienes no saqueen deben activar el escudo inmediatamente después del reinicio.', 'Si no tienes escudo después del reinicio del sábado, puedes ser expulsado sin aviso previo. Es posible volver más adelante.', 'Si el mismo problema se repite tres veces, la expulsión será permanente.'] },
    { file: '[약탈 규칙].txt', title: 'Reglas de saqueo', tone: 'warning', icon: Swords, body: ['No hay límite de participantes para el saqueo.', 'El zeroing está estrictamente prohibido. No ataques repetidamente una ciudad hasta dejar sus tropas casi en cero.', 'Las alianzas NAP no pueden atacarse entre sí.', 'Las alianzas academia pueden ser atacadas, pero las cuentas de academia con Farm en el nombre no deben ser atacadas.', 'Si se confirma una infracción, el miembro será expulsado sin advertencia.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: 'Asedio zombi y Tirano zombi', tone: 'info', icon: CalendarDays, body: ['Lir tiene una alta proporción de miembros coreanos.', 'La mayoría de los eventos empieza a las 10:00, hora de Apocalipsis.'] },
    { file: '[협곡 쟁탈전].txt', title: 'Disputa del Cañón', tone: 'info', icon: Users, body: ['La Disputa del Cañón se realiza a las 23:00, hora de Apocalipsis.', 'Los participantes se eligen al azar entre quienes desean participar, considerando puntuación personal del Duelo de alianza y poder de combate.'] },
  ],
  hi: [
    { file: '[토요일 킬데이 규칙].txt', title: 'Saturday Kill Day नियम', tone: 'danger', icon: Shield, body: ['हमारा alliance अक्सर मजबूत दुश्मनों का target बनता है, इसलिए shield जरूरी है.', 'Reset के बाद enemy server को जल्दी plunder करें, shield लगाएं और वापस आएं.', 'जो सदस्य plunder नहीं करते, वे reset के तुरंत बाद shield लगाएं.', 'Saturday reset के बाद shield नहीं होने पर बिना notice remove किया जा सकता है.', 'एक ही समस्या 3 बार दोहराने पर permanent removal होगा.'] },
    { file: '[약탈 규칙].txt', title: 'Plunder नियम', tone: 'warning', icon: Swords, body: ['Plunder participants की कोई limit नहीं है.', 'Zeroing सख्त मना है. किसी city पर बार-बार हमला करके troops को लगभग zero न करें.', 'NAP alliances एक-दूसरे पर attack नहीं कर सकते.', 'Academy alliances पर attack कर सकते हैं, लेकिन nickname में Farm लिखे academy account पर attack मना है.', 'Violation confirm होने पर बिना warning member remove किया जाएगा.'] },
    { file: '[좀비 공성 및 좀비 폭군 이벤트].txt', title: 'Zombie Siege और Zombie Tyrant', tone: 'info', icon: CalendarDays, body: ['Lir में Korean members का अनुपात ज्यादा है.', 'अधिकांश events Apocalypse Time 기준 10:00 पर शुरू होते हैं.'] },
    { file: '[협곡 쟁탈전].txt', title: 'Canyon Clash', tone: 'info', icon: Users, body: ['Canyon Clash Apocalypse Time 기준 23:00 पर होता है.', 'Participants alliance duel personal score और power 기준으로 신청자 중 random चुने जाते हैं.'] },
  ],
};

const noticeSummaries = {
  ko: {
    '[약탈 규칙].txt': [
      { label: '인원 제한', value: '없음' },
      { label: '절대 금지', value: '제로잉' },
      { label: '공격 제한', value: 'NAP 및 Farm 닉네임 금지' },
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
      { label: 'Participant limit', value: 'None' },
      { label: 'Strictly forbidden', value: 'Zeroing' },
      { label: 'Do not attack', value: 'NAP and Farm nicknames' },
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
      { label: 'Límite', value: 'Sin límite' },
      { label: 'Prohibido', value: 'Zeroing' },
      { label: 'No atacar', value: 'NAP y nombres con Farm' },
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
  hi: {
    '[약탈 규칙].txt': [
      { label: 'Limit', value: 'कोई limit नहीं' },
      { label: 'Strict ban', value: 'Zeroing' },
      { label: 'Do not attack', value: 'NAP और Farm nicknames' },
    ],
    '[토요일 킬데이 규칙].txt': [
      { label: 'जरूरी', value: 'Shield लगाएं' },
      { label: 'Reset के बाद', value: 'Plunder फिर shield' },
      { label: 'Repeat', value: '3 बार पर permanent removal' },
    ],
    '[좀비 공성 및 좀비 폭군 이벤트].txt': [
      { label: 'Alliance', value: 'Korean members ज्यादा' },
      { label: 'Time 기준', value: 'Apocalypse Time' },
      { label: 'Start', value: 'ज्यादातर 10:00' },
    ],
    '[협곡 쟁탈전].txt': [
      { label: 'Time', value: '23:00 Apocalypse' },
      { label: 'Selection', value: 'Alliance Duel personal score' },
      { label: 'Method', value: 'Applicants में random' },
    ],
  },
};

const extraGuides = {
  ko: {
    daily: {
      file: '[매일 진행해야하는 퀘스트].txt',
      title: '매일 진행해야하는 퀘스트',
      kicker: 'Daily',
      summary: [
        { label: '왼쪽', value: '프로필 무료수령, 트럭, 현상 퀘스트' },
        { label: '오른쪽', value: '이벤트센터와 VS 항목 확인' },
        { label: '가운데', value: '본부 선물과 무료기름 수령' },
      ],
      sections: [
        { title: '화면 왼쪽', lines: ['프로필 사진 아래 숫자를 클릭해 무료 수령 보상 2개를 받으세요.', '트럭 보상에 만능 주황 조각이 2개 이상이면 약탈을 진행하세요.', '나의 화물차도 매일 보내고, 수요일과 토요일은 주황 S급 화물차를 우선하세요.', '현상 퀘스트는 개인 파견, 연맹원 퀘스트 도움, 타 서버 물자받기 약탈을 확인하세요.', '화요일과 토요일 현상 퀘스트는 주황 S급을 우선하세요.'] },
        { title: '화면 오른쪽', lines: ['이벤트센터에서 전면전비 퀘스트를 확인하세요.', '협곡쟁탈전(CC)은 신청 여부와 배정 상태를 확인하세요.', '혼돈의 땅, 난폭두목, 시련좀비 기간 퀘스트를 놓치지 마세요.', 'VS 연맹대결에서는 연맹 지원, 연맹원 전투 자동 단결, 연맹테크 기부, 연맹선물 수령을 매일 처리하세요.'] },
        { title: '화면 가운데', lines: ['본부 아래 선물 상자를 수령하세요.', '무료기름은 오전 7시와 오후 7시에 받으세요.', '오전 11시 리셋 후 S급 영웅 카트리나 조각 100개 추가 수령을 확인하세요.'] },
      ],
    },
    popular: {
      file: '[필수 인기 이벤트].txt',
      title: '필수 인기 이벤트',
      kicker: 'Popular',
      summary: [
        { label: '로테이션', value: '4개 이벤트가 주간 순환' },
        { label: '핵심 재화', value: '다이아를 꾸준히 모으기' },
        { label: '구매 기준', value: '80% 이상 할인 우선' },
      ],
      sections: [
        { title: '로테이션 이벤트', lines: ['행운의 흔들기, 사격장 보물찾기, 행운할인 상점, 행운룰렛은 일주일씩 순환합니다.', '해당 이벤트를 위해 다이아를 꾸준히 모아두세요.'] },
        { title: '시간제한 이벤트', lines: ['Z코인 판매 상품과 80% 이상 할인 상품은 전기 제외 모두 구매합니다.', '연료와 경찰휘장은 할인하지 않아도 구매합니다.', '기름과 휘장은 장기적으로 계속 필요한 재화이므로 우선순위를 유지하세요.'] },
        { title: '특권 상점', lines: ['VIP 등급에 따라 목재, 음식, 50연료통, 고급 텔레포트, 렌치, 경찰휘장을 구매하세요.', '에너지코어, 8시간 만능가속, 만능 주황 조각도 핵심 구매 후보입니다.', 'Z코인과 전기는 부족할 때만 구매하세요.', '다이아가 3만 개 이하라면 아이템 구매는 패스하세요.'] },
        { title: '공훈상점', lines: ['경기장, 협곡쟁탈전, 수도쟁탈전 등에서 얻는 용사훈장으로 주황 장비 선택 상자를 먼저 구매하세요.', '용사훈장이 충분히 많아지면 할인 에너지코어까지만 구매하고 그 외는 구매하지 않습니다.'] },
        { title: '영예휘장', lines: ['캐러밴, 탐색, 영웅전장에서 얻는 영예휘장으로 피난민 모집권, 만능 주황 조각, 에너지코어, 렌치를 구매하세요.', '시즌 영웅과 영웅 장비를 준비한다면 만능 장비 조각도 구매하세요.', '피난민 모집권은 화요일 주황 외교관 모집에 매우 중요합니다.'] },
      ],
    },
    powerOrder: {
      file: '임시 전투력 성장 순서',
      title: '전투력 올리는 순서',
      kicker: 'Power Up',
      desc: '영웅, 테크, 자동차를 분리한 성장 루틴',
      summary: [
        { label: '1순위', value: '주력 1부대 영웅' },
        { label: '2순위', value: '테크와 병종 연구' },
        { label: '3순위', value: '자동차, 장비, 병력' },
      ],
      sections: [
        { title: '1. 영웅', lines: ['전투는 편성된 영웅의 레벨, 별, 스킬, 장비가 부대 능력치를 크게 끌어올리는 구조입니다.', '재료를 여러 영웅에게 나누기보다 주력 1부대 영웅 5명을 먼저 집중하세요.', '영웅 경험치, 조각, 스킬북, 전용 장비 재료는 주력 영웅에게 먼저 사용합니다.', '같은 타입 또는 같은 진영 조합을 맞추면 편성 보너스를 받기 쉬워 실제 전투 효율도 좋아집니다.'] },
        { title: '2. 테크', lines: ['테크는 한 번 올리면 모든 전투에 계속 적용되므로 장기 효율이 좋습니다.', '주력 병종에 맞는 공격, 방어, HP 연구를 먼저 올리고, 이후 행군 규모와 훈련 속도를 보강하세요.', '연맹 테크 기부는 매일 처리하고, VS 연맹 대전 연구 점수 날에 가속과 배지를 몰아서 쓰는 편이 좋습니다.', '초반에는 모든 병종을 고르게 올리기보다 현재 쓰는 주력 병종 연구에 집중하는 편이 효율적입니다.'] },
        { title: '3. 자동차', lines: ['자동차는 편성 부대에 붙는 추가 능력치라 주력 부대 기준으로 먼저 맞추는 것이 좋습니다.', '자동차 레벨, 부품, 스킬성 옵션은 주력 1부대가 쓰는 차량부터 올리세요.', '분산 강화보다 한 대를 먼저 전투용으로 완성하고, 남는 재료로 2부대 차량을 따라가게 하세요.', '자동차 재료는 이벤트와 상점에서 꾸준히 모으되, 영웅 조각과 핵심 성장 재료를 밀어낼 정도로 과투자하지 않습니다.'] },
        { title: '4. 장비와 병력', lines: ['영웅 장비는 주력 영웅에게 먼저 몰아주고, 장비 등급과 강화 수치를 천천히 맞춥니다.', '본부 레벨업은 새 병력 티어와 콘텐츠 해금에 연결되므로 자원 여유가 생길 때 계속 따라가세요.', '병력은 가장 높은 티어 위주로 훈련하고, 전투 후 병원이 넘치지 않도록 치료 여유를 남겨야 합니다.', '드론, 부품, 장비류는 주력 1부대 기준으로 맞추고 나서 2부대와 3부대로 확장하세요.'] },
        { title: '추천 성장 순서', lines: ['1. 주력 1부대 영웅 레벨, 별, 스킬을 먼저 올립니다.', '2. 주력 병종 테크와 연맹 테크를 매일 누적합니다.', '3. 주력 부대 자동차를 먼저 강화하고 부품을 맞춥니다.', '4. 영웅 장비, 드론, 부품류를 주력 부대 기준으로 정리합니다.', '5. 본부 레벨업과 병력 훈련은 자원 부담을 보며 꾸준히 따라갑니다.'] },
      ],
    },
  },
  en: {
    daily: {
      file: '[매일 진행해야하는 퀘스트].txt',
      title: 'Daily Quest Checklist',
      kicker: 'Daily',
      summary: [
        { label: 'Left side', value: 'Profile claims, trucks, bounty quests' },
        { label: 'Right side', value: 'Event Center and Alliance Duel' },
        { label: 'Center', value: 'HQ gifts and free fuel' },
      ],
      sections: [
        { title: 'Left Side', lines: ['Tap the number under your profile picture and claim the two free rewards.', 'For trucks, plunder when the reward has at least two universal orange fragments.', 'Send your own truck every day, and prioritize orange S-grade trucks on Wednesday and Saturday.', 'For bounty quests, check personal dispatches, alliance member help, and cross-server supply plunder.', 'On Tuesday and Saturday, prioritize orange S-grade bounty quests.'] },
        { title: 'Right Side', lines: ['In Event Center, check Full Preparedness quests.', 'For Canyon Clash (CC), check application and assignment status.', 'Do not miss Land of Chaos, Raider Boss, and Trial Zombie event quests.', 'In Alliance Duel, handle alliance help, auto rally, tech donation, and alliance gifts every day.'] },
        { title: 'Center', lines: ['Claim the gift chest below HQ.', 'Claim free fuel at 07:00 and 19:00.', 'After the 11:00 reset, check the extra 100 Katrina S-grade hero shards.'] },
      ],
    },
    popular: {
      file: '[필수 인기 이벤트].txt',
      title: 'Essential Popular Events',
      kicker: 'Popular',
      summary: [
        { label: 'Rotation', value: '4 events rotate weekly' },
        { label: 'Core currency', value: 'Save diamonds steadily' },
        { label: 'Buy rule', value: 'Prioritize 80%+ discounts' },
      ],
      sections: [
        { title: 'Rotating Events', lines: ['Lucky Shake, Shooting Range Treasure Hunt, Lucky Discount Shop, and Lucky Roulette rotate weekly.', 'Keep saving diamonds for these events.'] },
        { title: 'Timed Events', lines: ['Buy Z-coin items and all items discounted 80% or more, except electricity.', 'Buy fuel and police badges even without discounts.', 'Fuel and badges stay high priority because they are useful long term.'] },
        { title: 'Privilege Shop', lines: ['Depending on VIP level, buy wood, food, 50 fuel barrels, advanced teleports, wrenches, and police badges.', 'Energy cores, 8-hour universal speedups, and universal orange fragments are also key purchase candidates.', 'Buy Z-coins and electricity only when short.', 'Skip item purchases if you have 30,000 diamonds or less.'] },
        { title: 'Merit Shop', lines: ['Use warrior medals from Arena, Canyon Clash, and Capital Clash to buy orange equipment selection boxes first.', 'When you have enough warrior medals, buy discounted energy cores only and skip the rest.'] },
        { title: 'Honor Badges', lines: ['Use honor badges from Caravan, Exploration, and Hero Battlefield to buy refugee tickets, universal orange fragments, energy cores, and wrenches.', 'If preparing season heroes and hero equipment, also buy universal equipment fragments.', 'Refugee tickets are very important for Tuesday orange diplomat recruitment.'] },
      ],
    },
    powerOrder: {
      file: 'Temporary combat power growth order',
      title: 'Power Growth Order',
      kicker: 'Power Up',
      desc: 'Separated route for heroes, tech, and vehicle',
      summary: [
        { label: 'Priority 1', value: 'Main squad heroes' },
        { label: 'Priority 2', value: 'Tech and troop branch research' },
        { label: 'Priority 3', value: 'Vehicle, gear, and troops' },
      ],
      sections: [
        { title: '1. Heroes', lines: ['Combat is heavily driven by the heroes in your squad: level, stars, skills, and gear all raise troop stats.', 'Do not spread materials across too many heroes early. Build the five heroes in your main squad first.', 'Use hero EXP, shards, skill books, and exclusive gear materials on those main heroes first.', 'Matching type or faction synergy makes the squad more efficient in real fights, not just on the power number.'] },
        { title: '2. Tech', lines: ['Tech stays active permanently, so it has strong long-term value.', 'Raise attack, defense, and HP for your main troop branch first, then add march size and training speed.', 'Donate alliance tech every day, and save speedups and badges for the Alliance Duel research day when possible.', 'Early on, focusing one main troop branch is usually better than spreading research evenly across every branch.'] },
        { title: '3. Vehicle', lines: ['Vehicle stats are attached to the squad, so build around the main squad first.', 'Upgrade the vehicle level, parts, and skill-like options for the vehicle used by your first squad.', 'Finish one combat vehicle before spreading materials across multiple vehicles.', 'Collect vehicle materials from events and shops steadily, but do not overbuy them at the cost of hero shards and core growth materials.'] },
        { title: '4. Gear and Troops', lines: ['Put hero gear on the main heroes first, then raise grade and enhancement step by step.', 'HQ level-ups matter because they unlock stronger troop tiers and more content, so keep them moving when resources allow.', 'Train the highest tier troops you can, and keep hospital capacity in mind after fights.', 'Drone, components, and general gear should follow the main squad first, then expand to second and third squads.'] },
        { title: 'Recommended Growth Order', lines: ['1. Raise main squad hero level, stars, and skills first.', '2. Stack main troop branch tech and alliance tech every day.', '3. Upgrade the main squad vehicle and parts.', '4. Organize hero gear, drone, and components around the main squad.', '5. Keep HQ level-ups and troop training moving as resources allow.'] },
      ],
    },
  },
  es: {
    daily: {
      file: '[매일 진행해야하는 퀘스트].txt',
      title: 'Lista diaria de misiones',
      kicker: 'Daily',
      summary: [
        { label: 'Izquierda', value: 'Perfil, camiones, recompensas' },
        { label: 'Derecha', value: 'Centro de eventos y Duelo' },
        { label: 'Centro', value: 'Regalos de base y combustible' },
      ],
      sections: [
        { title: 'Lado Izquierdo', lines: ['Toca el número bajo la foto de perfil y reclama las dos recompensas gratis.', 'En camiones, saquea cuando haya al menos dos fragmentos naranjas universales.', 'Envía tu camión cada día y prioriza camiones S naranjas los miércoles y sábados.', 'En recompensas, revisa despachos personales, ayuda de alianza y saqueo de suministros en otros servidores.', 'Los martes y sábados prioriza misiones S naranjas.'] },
        { title: 'Lado Derecho', lines: ['En el Centro de eventos revisa las misiones de preparación total.', 'En Cañón (CC), revisa solicitud y estado de asignación.', 'No pierdas Tierra del Caos, jefe violento y zombis de prueba.', 'En Duelo de alianza revisa ayuda, reunión automática, donaciones de tecnología y regalos cada día.'] },
        { title: 'Centro', lines: ['Reclama el cofre de regalo bajo la base.', 'Reclama combustible gratis a las 07:00 y 19:00.', 'Tras el reinicio de las 11:00, revisa los 100 fragmentos extra de Katrina S.'] },
      ],
    },
    popular: {
      file: '[필수 인기 이벤트].txt',
      title: 'Eventos populares esenciales',
      kicker: 'Popular',
      summary: [
        { label: 'Rotación', value: '4 eventos semanales' },
        { label: 'Recurso clave', value: 'Ahorrar diamantes' },
        { label: 'Compra', value: 'Priorizar 80%+ descuento' },
      ],
      sections: [
        { title: 'Eventos en Rotación', lines: ['Lucky Shake, Tesoro del campo de tiro, Tienda de descuento de suerte y Ruleta de suerte rotan cada semana.', 'Guarda diamantes de forma constante para estos eventos.'] },
        { title: 'Eventos Temporales', lines: ['Compra artículos de Z-coin y todos los artículos con 80% o más de descuento, excepto electricidad.', 'Compra combustible e insignias de policía aunque no tengan descuento.', 'Combustible e insignias siguen siendo prioridad porque sirven a largo plazo.'] },
        { title: 'Tienda de Privilegios', lines: ['Según tu VIP, compra madera, comida, barriles de 50 combustible, teletransportes avanzados, llaves e insignias de policía.', 'Núcleos de energía, aceleradores universales de 8 horas y fragmentos naranjas universales también son compras clave.', 'Compra Z-coins y electricidad solo si faltan.', 'Omite compras de ítems si tienes 30,000 diamantes o menos.'] },
        { title: 'Tienda de Mérito', lines: ['Usa medallas de guerrero de Arena, Cañón y Capital para comprar primero cajas de equipo naranja.', 'Cuando tengas suficientes medallas, compra solo núcleos de energía con descuento y omite lo demás.'] },
        { title: 'Insignias de Honor', lines: ['Usa insignias de honor de Caravana, Exploración y Campo de héroes para comprar tickets de refugiados, fragmentos naranjas universales, núcleos de energía y llaves.', 'Si preparas héroes de temporada y equipo de héroe, compra también fragmentos universales de equipo.', 'Los tickets de refugiados son muy importantes para reclutar diplomáticos naranjas los martes.'] },
      ],
    },
    powerOrder: {
      file: 'Orden temporal para subir poder',
      title: 'Orden para Subir Poder',
      kicker: 'Power Up',
      desc: 'Ruta separada para heroes, tecnologia y vehiculo',
      summary: [
        { label: 'Prioridad 1', value: 'Heroes de escuadra principal' },
        { label: 'Prioridad 2', value: 'Tecnologia e investigacion de tropas' },
        { label: 'Prioridad 3', value: 'Vehiculo, equipo y tropas' },
      ],
      sections: [
        { title: '1. Heroes', lines: ['El combate depende mucho de los heroes en la escuadra: nivel, estrellas, habilidades y equipo suben las estadisticas de tropas.', 'No repartas materiales entre demasiados heroes al inicio. Primero fortalece los cinco heroes de la escuadra principal.', 'Usa EXP, fragmentos, libros de habilidad y materiales de equipo exclusivo en esos heroes primero.', 'La sinergia por tipo o faccion mejora el rendimiento real en combate, no solo el numero de poder.'] },
        { title: '2. Tecnologia', lines: ['La tecnologia queda activa de forma permanente, por eso tiene buen valor a largo plazo.', 'Sube primero ataque, defensa y HP de tu rama principal de tropas, luego tamano de marcha y velocidad de entrenamiento.', 'Dona tecnologia de alianza cada dia y, si puedes, guarda aceleradores e insignias para el dia de investigacion del Duelo.', 'Al inicio suele ser mejor concentrar una rama principal que repartir investigacion entre todas.'] },
        { title: '3. Vehiculo', lines: ['El vehiculo aporta estadisticas a la escuadra, asi que conviene armarlo primero para la escuadra principal.', 'Sube nivel, piezas y opciones del vehiculo usado por la primera escuadra.', 'Completa primero un vehiculo de combate antes de repartir materiales entre varios.', 'Junta materiales de vehiculo en eventos y tiendas, pero no sacrifiques fragmentos de heroes ni materiales clave por comprar demasiado.'] },
        { title: '4. Equipo y Tropas', lines: ['Pon el equipo de heroe primero en los heroes principales y luego sube grado y mejora paso a paso.', 'La base importa porque desbloquea tropas mas fuertes y contenido, asi que subela cuando los recursos lo permitan.', 'Entrena tropas del tier mas alto posible y cuida la capacidad del hospital despues de pelear.', 'Dron, componentes y equipo general deben seguir primero a la escuadra principal, luego a segunda y tercera.'] },
        { title: 'Orden Recomendado', lines: ['1. Sube primero nivel, estrellas y habilidades de heroes principales.', '2. Acumula tecnologia de rama principal y tecnologia de alianza cada dia.', '3. Mejora el vehiculo y piezas de la escuadra principal.', '4. Ordena equipo de heroe, dron y componentes alrededor de la escuadra principal.', '5. Mantén base y entrenamiento de tropas al ritmo que permitan los recursos.'] },
      ],
    },
  },
  hi: {
    daily: {
      file: '[매일 진행해야하는 퀘스트].txt',
      title: 'Daily Quest Checklist',
      kicker: 'Daily',
      summary: [
        { label: 'Left', value: 'Profile rewards, trucks, bounty quests' },
        { label: 'Right', value: 'Event Center और Alliance Duel' },
        { label: 'Center', value: 'HQ gifts और free fuel' },
      ],
      sections: [
        { title: 'Screen Left', lines: ['Profile photo के नीचे number पर tap करके दो free rewards लें.', 'Truck reward में universal orange fragments 2 या ज्यादा हों तो plunder करें.', 'अपना truck हर दिन भेजें, और Wednesday/Saturday को orange S-grade truck prioritize करें.', 'Bounty quests में personal dispatch, alliance help, और cross-server supply plunder देखें.', 'Tuesday और Saturday को orange S-grade bounty quests पहले करें.'] },
        { title: 'Screen Right', lines: ['Event Center में Full Preparedness quests देखें.', 'Canyon Clash (CC) में application और assignment status 확인 करें.', 'Land of Chaos, Raider Boss, और Trial Zombie event quests न छोड़ें.', 'Alliance Duel में alliance help, auto rally, tech donation, और alliance gifts daily करें.'] },
        { title: 'Screen Center', lines: ['HQ के नीचे gift chest लें.', 'Free fuel 07:00 और 19:00 पर लें.', '11:00 reset के बाद extra 100 Katrina S-grade hero shards 확인 करें.'] },
      ],
    },
    popular: {
      file: '[필수 인기 이벤트].txt',
      title: 'Essential Popular Events',
      kicker: 'Popular',
      summary: [
        { label: 'Rotation', value: '4 events weekly rotate' },
        { label: 'Core currency', value: 'Diamonds जमा करें' },
        { label: 'Buy rule', value: '80%+ discount prioritize' },
      ],
      sections: [
        { title: 'Rotating Events', lines: ['Lucky Shake, Shooting Range Treasure Hunt, Lucky Discount Shop, और Lucky Roulette weekly rotate होते हैं.', 'इन events के लिए diamonds steadily जमा करें.'] },
        { title: 'Timed Events', lines: ['Z-coin items और 80%+ discount items खरीदें, electricity 제외.', 'Fuel और police badges discount न हो तब भी खरीदें.', 'Fuel और badges long-term में जरूरी रहते हैं.'] },
        { title: 'Privilege Shop', lines: ['VIP level के अनुसार wood, food, fuel barrels, advanced teleports, wrenches, और police badges खरीदें.', 'Energy cores, 8-hour universal speedups, और universal orange fragments भी key buys हैं.', 'Z-coins और electricity सिर्फ shortage में खरीदें.', 'Diamonds 30,000 이하 हों तो item purchases skip करें.'] },
        { title: 'Merit Shop', lines: ['Arena, Canyon Clash, और Capital Clash medals से orange gear selection boxes पहले खरीदें.', 'Medals काफी हों तो discounted energy cores तक खरीदें और बाकी skip करें.'] },
        { title: 'Honor Badges', lines: ['Caravan, Exploration, और Hero Battlefield honor badges से refugee tickets, orange fragments, energy cores, और wrenches खरीदें.', 'Season heroes और hero gear तैयार कर रहे हों तो universal equipment fragments भी खरीदें.', 'Refugee tickets Tuesday orange diplomat recruitment के लिए बहुत जरूरी हैं.'] },
      ],
    },
    powerOrder: {
      file: 'Combat power growth order',
      title: 'Combat Power बढ़ाने का क्रम',
      kicker: 'Power Up',
      desc: 'Heroes, tech और vehicle को अलग करके growth route',
      summary: [
        { label: 'Priority 1', value: 'Main squad heroes' },
        { label: 'Priority 2', value: 'Tech और troop research' },
        { label: 'Priority 3', value: 'Vehicle, gear और troops' },
      ],
      sections: [
        { title: '1. Heroes', lines: ['Combat में squad heroes का level, stars, skills और gear troop stats को बहुत बढ़ाते हैं.', 'शुरुआत में resources बहुत heroes में न बांटें. पहले main squad के 5 heroes मजबूत करें.', 'Hero EXP, shards, skill books, और exclusive gear materials पहले main heroes पर लगाएं.', 'Type या faction synergy मिलाने से real fight efficiency भी बढ़ती है.'] },
        { title: '2. Tech', lines: ['Tech permanent bonus देता है, इसलिए long-term value अच्छी है.', 'Main troop branch के attack, defense, HP को पहले बढ़ाएं, फिर march size और training speed लें.', 'Alliance tech donation daily करें, और संभव हो तो speedups/badges research day पर use करें.', 'Early game में हर branch बराबर करने से बेहतर है कि main branch पर focus करें.'] },
        { title: '3. Vehicle', lines: ['Vehicle squad को extra stats देता है, इसलिए first squad vehicle पहले build करें.', 'Vehicle level, parts, और skill-like options main squad vehicle पर पहले लगाएं.', 'कई vehicles में बांटने से पहले एक combat vehicle पूरा करें.', 'Vehicle materials events और shops से जमा करें, लेकिन hero shards और core materials की कीमत पर overbuy न करें.'] },
        { title: '4. Gear and Troops', lines: ['Hero gear main heroes पर पहले लगाएं, फिर grade और enhancement धीरे-धीरे बढ़ाएं.', 'HQ level-up stronger troop tiers और content unlock करता है, इसलिए resources हों तो 꾸준히 बढ़ाएं.', 'सबसे high tier troops train करें और fights के बाद hospital capacity का ध्यान रखें.', 'Drone, components, और general gear main squad के बाद second और third squad पर जाएं.'] },
        { title: 'Recommended Order', lines: ['1. Main squad hero level, stars, skills पहले बढ़ाएं.', '2. Main troop branch tech और alliance tech daily stack करें.', '3. Main squad vehicle और parts upgrade करें.', '4. Hero gear, drone और components main squad के हिसाब से align करें.', '5. HQ level-up और troop training resources के अनुसार steadily करें.'] },
      ],
    },
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
  hi: [
    { label: 'Weekly target', value: '3,000,000 points' },
    { label: 'Core flow', value: 'Day별 items बचाकर सही दिन use करें' },
    { label: 'Layout', value: 'Notice से Day 6 तक tabs में देखें' },
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
  hi: {
    title: 'Caravan Stage Selection',
    formulaLabel: 'Stage चुनने का formula',
    formula: 'आपकी power x 1.1 > table End',
    formulaHint: 'Faction buff और advantage हो तभी लगभग 10% bonus मानकर 계산 करें.',
    stepsTitle: 'Flow',
    steps: [
      { title: 'Faction build', text: 'हर faction के heroes set करें और best gear लगाएं.' },
      { title: 'Power check', text: 'Caravan चुनने से पहले Arena defense में current power देखें.' },
      { title: 'Stage pick', text: 'आपकी power x 1.1 End value से ऊपर हो तो वही stage चुनें.' },
      { title: 'Power कम हो', text: 'President attack/defense ministers use करें, फिर भी मुश्किल हो तो एक stage नीचे जाएं.' },
    ],
    alerts: [
      'Caravan actual troops से calculate करता है, इसलिए troops मरने के बाद Arena power से फर्क हो सकता है.',
      'Attempt से पहले best troop type की max count भरें.',
      'Quick battle VIP 8 या Bloody Battlefield stage 20 clear के बाद मिलता है.',
    ],
    tableTitle: 'Stage별 जरूरी power',
    tableHint: 'Values source table की K/M notation 그대로 रखते हैं.',
    columns: ['Stage', 'Start', 'End'],
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

const hindiDuel = {
  '※ 공지\nAnnouncement': 'Notice',
  'Day 0': 'Day 0',
  'Day 1': 'Day 1',
  'Day 2': 'Day 2',
  'Day 3': 'Day 3',
  'Day 4': 'Day 4',
  'Day 5': 'Day 5',
  'Day 6': 'Day 6',
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
    return lang === 'ko' ? '공지' : lang === 'es' ? 'Aviso' : 'Notice';
  }
  if (lang === 'es') return spanishDuel[date] || date;
  if (lang === 'hi') return hindiDuel[date] || date;
  return date;
}

function dayTitle(entry, lang) {
  if (entry.date === '※ 공지\nAnnouncement') return { ko: '주간 목표와 사전 준비', en: 'Weekly target and preparation', es: 'Objetivo semanal y preparación', hi: 'साप्ताहिक लक्ष्य और तैयारी' }[lang];
  const text = lang === 'ko' ? entry.ko : lang === 'es' ? spanishSummary(entry).join('\n') : lang === 'hi' ? hindiSummary(entry).join('\n') : entry.en || entry.ko;
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

function hindiSummary(entry) {
  const map = {
    '※ 공지\nAnnouncement': ['Weekly target: 3,000,000 points.', 'हर day के items पहले से save करें.', 'Badges, contracts, orders और speedups को recommended day पर use करें.'],
    'Day 0': ['Sunday को radar complete करें, reward claim न करें.', 'Preparation के लिए 8 empty slots छोड़ें.'],
    'Day 1': ['Radar rewards claim करें.', 'Golden wrench, blueprints और outer module boxes use करें.', 'Deadline से पहले troops mines से निकालें.'],
    'Day 2': ['जरूरत हो तो dispatch orders से S bounty quests करें.', 'Refugee tickets को 500씩 use करें.', 'Buildings को recommended time window में complete करें.'],
    'Day 3': ['Trade contracts से S trucks करें.', 'Research speedups और badges use करें.', 'Alliance Recon research में invest करना अच्छा है.'],
    'Day 4': ['Heroes recruit करें और shards से stars बढ़ाएं.', 'Orange skill books और gear materials use करें.', 'Radar rewards claim किए बिना prepare करें.'],
    'Day 5': ['Radar rewards claim करें.', 'Buildings, research और training को time window में complete करें.', 'Construction, research और training speedups use करें.'],
    'Day 6': ['Bounty और city trade S grade से करें.', 'Rival alliance units को defeat करना first priority है.', 'Second priority rival alliance के बाहर units defeat करना है.'],
  };
  return map[entry.date] || [entry.en || entry.ko];
}

const fileTabs = [
  { id: workbook.source, type: 'workbook', label: displayName(workbook.source), icon: Table2 },
  { id: '캐러밴 표', type: 'caravan', label: '캐러밴 표', icon: Table2 },
  { id: '[약탈 규칙].txt', type: 'notice', label: '약탈 규칙', icon: Swords },
  { id: '[토요일 킬데이 규칙].txt', type: 'notice', label: '토요일 킬데이 규칙', icon: Shield },
  { id: '[좀비 공성 및 좀비 폭군 이벤트].txt', type: 'notice', label: '좀비 공성 및 좀비 폭군 이벤트', icon: CalendarDays },
  { id: '[협곡 쟁탈전].txt', type: 'notice', label: '협곡 쟁탈전', icon: Users },
];

const sectionLabels = {
  ko: {
    duel: { kicker: 'Weekly', title: '연맹 대전', desc: 'Day별 준비와 점수 루틴' },
    caravan: { kicker: 'Power', title: '캐러밴', desc: '단계 선택 공식과 투력표' },
    rules: { kicker: 'Battle', title: '전투 규칙', desc: '약탈과 킬데이 필수 규칙' },
    events: { kicker: 'Event', title: '이벤트', desc: '좀비 공성, 폭군, 협곡 일정' },
    daily: { kicker: 'Daily', title: '매일 퀘스트', desc: '매일 확인할 필수 체크리스트' },
    popular: { kicker: 'Popular', title: '인기 이벤트', desc: '다이아와 상점 구매 기준' },
    open: '열기',
    selectRule: '규칙 선택',
    selectEvent: '이벤트 선택',
  },
  en: {
    duel: { kicker: 'Weekly', title: 'Alliance Duel', desc: 'Daily prep and score routine' },
    caravan: { kicker: 'Power', title: 'Caravan', desc: 'Stage formula and power table' },
    rules: { kicker: 'Battle', title: 'Battle Rules', desc: 'Plunder and Kill Day essentials' },
    events: { kicker: 'Event', title: 'Events', desc: 'Zombie, Tyrant, and Canyon timing' },
    daily: { kicker: 'Daily', title: 'Daily Quests', desc: 'Essential checklist to review every day' },
    popular: { kicker: 'Popular', title: 'Popular Events', desc: 'Diamond and shop purchase standards' },
    open: 'Open',
    selectRule: 'Select Rule',
    selectEvent: 'Select Event',
  },
  es: {
    duel: { kicker: 'Weekly', title: 'Duelo', desc: 'Preparación diaria y puntos' },
    caravan: { kicker: 'Power', title: 'Caravana', desc: 'Fórmula y tabla de poder' },
    rules: { kicker: 'Battle', title: 'Reglas', desc: 'Saqueo y Día de bajas' },
    events: { kicker: 'Event', title: 'Eventos', desc: 'Zombis, Tirano y Cañón' },
    daily: { kicker: 'Daily', title: 'Misiones diarias', desc: 'Lista esencial para revisar a diario' },
    popular: { kicker: 'Popular', title: 'Eventos populares', desc: 'Diamantes y reglas de compra' },
    open: 'Abrir',
    selectRule: 'Elegir regla',
    selectEvent: 'Elegir evento',
  },
  hi: {
    duel: { kicker: 'Weekly', title: 'Alliance Duel', desc: 'Daily preparation और score routine' },
    caravan: { kicker: 'Power', title: 'Caravan', desc: 'Stage formula और power table' },
    rules: { kicker: 'Battle', title: 'Battle Rules', desc: 'Plunder और Kill Day essentials' },
    events: { kicker: 'Event', title: 'Events', desc: 'Zombie, Tyrant और Canyon timing' },
    daily: { kicker: 'Daily', title: 'Daily Quests', desc: 'हर दिन देखने वाला checklist' },
    popular: { kicker: 'Popular', title: 'Popular Events', desc: 'Diamond और shop purchase standards' },
    open: 'खोलें',
    selectRule: 'Rule चुनें',
    selectEvent: 'Event चुनें',
  },
};

const featuredSections = [
  { id: 'duel', icon: Table2, image: 'cards/1.png' },
  { id: 'daily', icon: ClipboardCheck, image: 'cards/5.png' },
  { id: 'hq', icon: Building2, image: 'cards/7.png' },
  { id: 'caravan', icon: Calculator, image: 'cards/2.png' },
  { id: 'rules', icon: Swords, image: 'cards/3.png' },
  { id: 'events', icon: CalendarDays, image: 'cards/4.png' },
  { id: 'popular', icon: Sparkles, image: 'cards/6.png' },
  { id: 'powerOrder', icon: TrendingUp, image: 'cards/power.png' },
];

function getSectionMeta(lang, id) {
  if (id === 'hq') return { kicker: hqUpgradeCopy[lang].kicker, title: hqUpgradeCopy[lang].title, desc: hqUpgradeCopy[lang].desc };
  if (id === 'powerOrder') {
    const guide = extraGuides[lang][id];
    return { kicker: guide.kicker, title: guide.title, desc: guide.desc };
  }
  return sectionLabels[lang][id];
}

function TextBlock({ text }) {
  return String(text || '').split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => {
    const lines = paragraph.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines[0]?.startsWith('🔳')) return null;
    const heading = /^\d+(?:-\d+)?\)/.test(lines[0]) ? lines.shift() : null;
    return <section className="reading-section" key={index}>
      {heading && <h4>{heading.replace(/^\d+(?:-\d+)?\)\s*/, '')}</h4>}
      {lines.map((line, idx) => <p key={idx} className={/^[-*]/.test(line) ? 'bullet-line' : 'text-line'}>{line.replace(/^[-*]\s*/, '')}</p>)}
    </section>;
  });
}

function NoticeCard({ item }) {
  const Icon = item.icon;
  return (
    <article className={`notice ${item.tone}`}>
      <div className="notice-icon"><Icon size={20} /></div>
      <div>
        <ul>
          {item.body.map((line) => {
            const separator = line.indexOf(': ');
            return <li key={line}>{separator > 0 && separator < 30 ? <><strong className="rule-heading">{line.slice(0, separator)}</strong><span>{line.slice(separator + 2)}</span></> : line}</li>;
          })}
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

function GuideTable({ columns, rows }) {
  return (
    <div className="table-wrap guide-table-wrap">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function hqRowsForLang(lang) {
  return hqUpgradeRows.map(([level, food, wood, coin, steel, buildingLevel, buildingKey]) => [
    level,
    food,
    wood,
    coin,
    steel,
    `Lv.${buildingLevel} ${buildingNames[lang][buildingKey]}`,
  ]);
}

function prerequisiteRowsForLang(lang) {
  return prerequisiteRows.map(([buildingKey, ...rest]) => [
    buildingNames[lang][buildingKey],
    ...rest,
  ]);
}

function HqUpgradeView({ lang }) {
  const copy = hqUpgradeCopy[lang];
  const [tab, setTab] = useState('hq');
  return (
    <section className="content-block">
      <SegmentedTabs label={copy.title} value={tab} onChange={setTab} items={[{ id: 'hq', label: copy.hqTitle, icon: Building2 }, { id: 'prerequisite', label: copy.prereqTitle, icon: ListChecks }]} />
      <div className="section-head">
        <div>
          <p className="section-kicker">{copy.file}</p>
          <h2>{copy.title}</h2>
        </div>
      </div>
      <SummaryStrip items={copy.summary} />
      <div className="hq-guide-layout">
        <article className="guide-section-card hq-note-card">
          <h3>{lang === 'ko' ? '확인 포인트' : lang === 'es' ? 'Puntos clave' : lang === 'hi' ? 'Checkpoints' : 'Checkpoints'}</h3>
          <ul>
            {copy.notes.map((line) => <li key={line}>{line}</li>)}
          </ul>
        </article>
        <section className="table-section" hidden={tab !== 'hq'}>
          <div className="table-heading">
            <div>
              <p className="section-kicker">{copy.kicker}</p>
              <h3>{copy.hqTitle}</h3>
            </div>
            <span>Lv.16 - Lv.35</span>
          </div>
          <GuideTable columns={copy.columns} rows={hqRowsForLang(lang)} />
        </section>
        <section className="table-section" hidden={tab !== 'prerequisite'}>
          <div className="table-heading">
            <div>
              <p className="section-kicker">{copy.kicker}</p>
              <h3>{copy.prereqTitle}</h3>
            </div>
            <span>5 Star</span>
          </div>
          <GuideTable columns={copy.prereqColumns} rows={prerequisiteRowsForLang(lang)} />
        </section>
      </div>
    </section>
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
            {lang === 'hi' && <ul className="spanish-list">{hindiSummary(activeEntry).map((line) => <li key={line}>{line}</li>)}</ul>}
          </div>
        </article>
      </div>
    </div>
  );
}

function Caravan({ lang }) {
  const data = workbook.sheets['캐러밴 표'];
  const copy = caravanCopy[lang];
  const [tab, setTab] = useState('steps');
  return (
    <div className="caravan-layout">
      <SegmentedTabs label={copy.title} value={tab} onChange={setTab} items={[{ id: 'steps', label: copy.stepsTitle, icon: ListChecks }, { id: 'table', label: copy.tableTitle, icon: Table2 }]} />
      <section className="formula-panel">
        <div className="formula-icon"><Calculator size={24} /></div>
        <div>
          <p>{copy.formulaLabel}</p>
          <strong>{copy.formula}</strong>
          <span>{copy.formulaHint}</span>
        </div>
      </section>
      <section className="step-panel" hidden={tab !== 'steps'}>
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
      <section className="alert-panel" hidden={tab !== 'steps'}>
        <div className="panel-title">
          <AlertTriangle size={19} />
          <h3>{lang === 'ko' ? '주의사항' : lang === 'es' ? 'Avisos' : lang === 'hi' ? 'Warnings' : 'Warnings'}</h3>
        </div>
        <ul>
          {copy.alerts.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </section>
      <section className="table-section" hidden={tab !== 'table'}>
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
          <h2>{lang === 'ko' ? '가이드 항목' : lang === 'es' ? 'Secciones de guía' : lang === 'hi' ? 'Guide Sections' : 'Guide Sections'}</h2>
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

function ExtraGuideView({ lang, id }) {
  const guide = extraGuides[lang][id];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="content-block">
      <div className="section-head">
        <div>
          <p className="section-kicker">{guide.file}</p>
          <h2>{guide.title}</h2>
        </div>
      </div>
      <SummaryStrip items={guide.summary} />
      <SegmentedTabs label={guide.title} value={activeIndex} onChange={setActiveIndex} items={guide.sections.map((section, index) => ({ id: index, label: section.title, icon: ListChecks }))} />
      <div className="guide-section-grid">
        {guide.sections.filter((_, index) => index === activeIndex).map((section) => (
          <article className="guide-section-card" key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.lines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </article>
        ))}
      </div>
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
          <h2>{item.title}</h2>
        </div>
      </div>
      <SummaryStrip items={noticeSummaries[lang][file]} />
      <div className="notice-grid single">
        <NoticeCard item={item} />
      </div>
    </section>
  );
}

function SegmentedTabs({ label, items, value, onChange }) {
  return (
    <div className="segmented-wrap">
      <p>{label}</p>
      <div className="segmented-tabs">
        {items.map((item) => (
          <button key={item.id} className={value === item.id ? 'active' : ''} onClick={() => onChange(item.id)}>
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('ko');
  const [page, setPage] = useState('home');
  const [section, setSection] = useState(null);
  const [ruleTab, setRuleTab] = useState('[약탈 규칙].txt');
  const [eventTab, setEventTab] = useState('[좀비 공성 및 좀비 폭군 이벤트].txt');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef(null);
  const dragStateRef = useRef({ active: false, startX: 0, startY: 0, scrollLeft: 0, dragged: false, distance: 0, raf: null });
  const copy = ui[lang];
  const sectionCopy = sectionLabels[lang];
  const activeSection = section ? getSectionMeta(lang, section) : null;
  const translatedTabs = fileTabs.map((item) => ({ ...item, label: notices[lang].find((notice) => notice.file === item.id)?.title || item.label }));
  const ruleTabs = translatedTabs.filter((item) => item.id === '[약탈 규칙].txt' || item.id === '[토요일 킬데이 규칙].txt');
  const eventTabs = translatedTabs.filter((item) => item.id === '[좀비 공성 및 좀비 폭군 이벤트].txt' || item.id === '[협곡 쟁탈전].txt');
  const updateActiveCard = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = [...carousel.querySelectorAll('.feature-card')];
    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let nextIndex = 0;
    let nextDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < nextDistance) {
        nextDistance = distance;
        nextIndex = index;
      }
    });
    setActiveCardIndex(nextIndex);
  };
  const handleSectionChange = (id) => {
    if (dragStateRef.current.dragged && dragStateRef.current.distance > 18) {
      dragStateRef.current.dragged = false;
      dragStateRef.current.distance = 0;
      return;
    }
    setSection(id);
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goHome = () => {
    setPage('home');
    setSection(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const slideCards = (direction) => {
    carouselRef.current?.scrollBy({ left: direction * 330, behavior: 'smooth' });
  };
  const scheduleActiveCardUpdate = () => {
    if (dragStateRef.current.raf) return;
    dragStateRef.current.raf = requestAnimationFrame(() => {
      dragStateRef.current.raf = null;
      updateActiveCard();
    });
  };
  const snapActiveCardToCenter = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cards = [...carousel.querySelectorAll('.feature-card')];
    const carouselRect = carousel.getBoundingClientRect();
    const center = carouselRect.left + carousel.clientWidth / 2;
    let activeIndex = 0;
    let activeDistance = Number.POSITIVE_INFINITY;
    cards.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < activeDistance) {
        activeDistance = distance;
        activeIndex = index;
      }
    });
    const card = cards[activeIndex];
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left + cardRect.width / 2 - (carouselRect.left + carousel.clientWidth / 2);
    setActiveCardIndex(activeIndex);
    carousel.scrollBy({ left: offset, behavior: 'smooth' });
  };
  const handleCarouselPointerDown = (event) => {
    if (event.pointerType === 'touch') return;
    const carousel = carouselRef.current;
    if (!carousel) return;
    dragStateRef.current = { active: true, startX: event.clientX, startY: event.clientY, scrollLeft: carousel.scrollLeft, dragged: false, distance: 0, raf: null };
  };
  const handleCarouselPointerMove = (event) => {
    const carousel = carouselRef.current;
    const drag = dragStateRef.current;
    if (!carousel || !drag.active) return;
    const delta = event.clientX - drag.startX;
    drag.distance = Math.max(drag.distance || 0, Math.abs(delta));
    if (drag.distance > 18) drag.dragged = true;
    carousel.scrollLeft = drag.scrollLeft - delta;
    scheduleActiveCardUpdate();
  };
  const handleCarouselPointerUp = (event) => {
    const carousel = carouselRef.current;
    const drag = dragStateRef.current;
    if (!carousel || !drag.active) return;
    drag.active = false;
    updateActiveCard();
    window.setTimeout(snapActiveCardToCenter, 30);
    if (drag.dragged) window.setTimeout(() => {
      dragStateRef.current.dragged = false;
      dragStateRef.current.distance = 0;
    }, 160);
  };
  const handleCarouselTouchStart = (event) => {
    const carousel = carouselRef.current;
    const touch = event.touches[0];
    if (!carousel || !touch) return;
    dragStateRef.current = { active: true, startX: touch.clientX, startY: touch.clientY, scrollLeft: carousel.scrollLeft, dragged: false, distance: 0, raf: null };
  };
  const handleCarouselTouchMove = (event) => {
    const carousel = carouselRef.current;
    const touch = event.touches[0];
    const drag = dragStateRef.current;
    if (!carousel || !touch || !drag.active) return;
    const deltaX = touch.clientX - drag.startX;
    const deltaY = touch.clientY - drag.startY;
    drag.distance = Math.max(drag.distance || 0, Math.abs(deltaX));
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
      if (drag.distance > 10) drag.dragged = true;
      carousel.scrollLeft = drag.scrollLeft - deltaX;
      scheduleActiveCardUpdate();
    }
  };
  const handleCarouselTouchEnd = () => {
    const drag = dragStateRef.current;
    if (!drag.active) return;
    drag.active = false;
    updateActiveCard();
    window.setTimeout(snapActiveCardToCenter, 30);
    if (drag.dragged) window.setTimeout(() => {
      dragStateRef.current.dragged = false;
      dragStateRef.current.distance = 0;
    }, 160);
  };
  useEffect(() => {
    if (page !== 'home') return undefined;
    updateActiveCard();
    window.addEventListener('resize', updateActiveCard);
    return () => window.removeEventListener('resize', updateActiveCard);
  }, [page, lang]);
  const renderContent = () => {
    if (section === 'duel') return <WorkbookView lang={lang} />;
    if (section === 'hq') return <HqUpgradeView lang={lang} />;
    if (section === 'caravan') return <CaravanView lang={lang} />;
    if (section === 'daily' || section === 'popular' || section === 'powerOrder') return <ExtraGuideView lang={lang} id={section} />;
    if (section === 'rules') {
      return (
        <>
          <SegmentedTabs label={sectionCopy.selectRule} items={ruleTabs} value={ruleTab} onChange={setRuleTab} />
          <FileNotice lang={lang} file={ruleTab} />
        </>
      );
    }
    return (
      <>
        <SegmentedTabs label={sectionCopy.selectEvent} items={eventTabs} value={eventTab} onChange={setEventTab} />
        <FileNotice lang={lang} file={eventTab} />
      </>
    );
  };

  if (page === 'detail' && section) {
    return (
      <main className="detail-page" lang={lang}>
        <nav className="topbar detail-topbar">
          <button className="home-button" onClick={goHome}>
            <ArrowLeft size={18} />
            <span>{copy.home}</span>
          </button>
          <div className="brand"><img src="brand/logo-transparent.png" alt="Lir" /><small>Guide Hub</small></div>
          <div className="lang-switch" aria-label="Language">
            <Languages size={16} />
            {['ko', 'en', 'es', 'hi'].map((code) => <button className={lang === code ? 'active' : ''} onClick={() => setLang(code)} key={code}>{code.toUpperCase()}</button>)}
          </div>
        </nav>
        <div className="detail-layout">
        <div className="detail-document">
        <section className="detail-hero">
          <p>{activeSection.kicker}</p>
          <h1>{activeSection.title}</h1>
          <span>{activeSection.desc}</span>
        </section>
        <div className="window-shell">
          <div className="content">
            {renderContent()}
          </div>
        </div>
        </div>
        </div>
      </main>
    );
  }

  return (
    <main className="home-page" style={{ '--page-bg': 'url("brand/background.png")' }}>
      <nav className="topbar">
        <div className="brand"><img src="brand/logo-transparent.png" alt="Lir" /><small>Guide Hub</small></div>
        <div className="lang-switch" aria-label="Language">
          <Languages size={16} />
          {['ko', 'en', 'es', 'hi'].map((code) => <button className={lang === code ? 'active' : ''} onClick={() => setLang(code)} key={code}>{code.toUpperCase()}</button>)}
        </div>
      </nav>
      <section className="lobby">
        <div className="lobby-frame" style={{ '--hero-bg': 'url("brand/background.png")' }}>
          <img className="lobby-bg" src="brand/background.png" alt="" aria-hidden="true" />
          <div className="lobby-head">
            <div className="lobby-title-mark">
              <p>{copy.eyebrow}</p>
              <img className="lobby-logo" src="brand/logo-transparent.png" alt={copy.lobbyTitle} />
            </div>
            <div className="lobby-copy">
              <strong>{copy.lobbySubtitle}</strong>
              <span>{copy.subtitle}</span>
            </div>
          </div>
          <div className="feature-carousel">
            <button className="carousel-button prev" onClick={() => slideCards(-1)} aria-label="Previous guide">
              <ChevronLeft size={22} />
            </button>
            <div
              className="feature-tabs"
              aria-label={copy.tabs}
              ref={carouselRef}
              onScroll={scheduleActiveCardUpdate}
              onPointerDown={handleCarouselPointerDown}
              onPointerMove={handleCarouselPointerMove}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerUp}
              onPointerLeave={handleCarouselPointerUp}
              onTouchStart={handleCarouselTouchStart}
              onTouchMove={handleCarouselTouchMove}
              onTouchEnd={handleCarouselTouchEnd}
              onTouchCancel={handleCarouselTouchEnd}
            >
              {featuredSections.map(({ id, icon: Icon, image }, index) => {
                const item = getSectionMeta(lang, id);
                return (
                  <button className={`feature-card ${activeCardIndex === index ? 'active' : ''}`} onClick={() => handleSectionChange(id)} key={id}>
                    <img src={image} alt="" />
                    <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="feature-kicker">{item.kicker}</span>
                    <strong>{item.title}</strong>
                    <em>{item.desc}</em>
                    <span className="feature-action"><Icon size={17} /> {sectionCopy.open}</span>
                  </button>
                );
              })}
            </div>
            <button className="carousel-button next" onClick={() => slideCards(1)} aria-label="Next guide">
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="lobby-footer">
            <span>{copy.lobbyNav[0]}</span>
            <span>{copy.lobbyNav[1]}</span>
            <strong><Home size={16} /> {copy.lobbyNav[2]}</strong>
            <span>{copy.lobbyNav[3]}</span>
            <span>{copy.lobbyNav[4]}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
