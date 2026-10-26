export const researchGuide = {
  ko: {
    title: '연구 가이드', kicker: '연구', file: '연구 가이드', desc: '초보자 우선순위와 연구 해금·배지 관리',
    summary: [{ label: '초반 배지', value: '연맹 표창 우선' }, { label: '해금 확인', value: '실험실 + 선행 연구 진행률' }, { label: '전투 연구', value: '주력 병종에 집중' }],
    sourceNote: '권장 순서는 연맹 원본 Day 3 지침을 반영했습니다. 해금 조건과 기본 배지 합계는 2026-10-26 확인한 Wild Hoggs 공개 자료 기준이며, 실제 게임과 최신 연맹 공지를 우선하세요.',
    sections: [
      { title: '1. 시작 순서', parts: [
        { title: '개인 연구와 연맹 기부부터 구분', text: '이 가이드는 내 실험실에서 진행하는 개인 연구를 다룹니다. 연구 트리 이름에 연맹이 들어가더라도, 연맹원 전체가 기부하는 연맹 테크와는 구분해서 확인하세요.' },
        { title: '먼저 연맹 표창을 여는 길 확보', text: '연맹 표창을 열려면 실험실 10레벨과 새로운 집 트리 50%가 필요합니다. 잠겨 있다면 이 두 조건부터 확인하세요.' },
        { title: '배지와 연구 가속은 연맹 표창 중심', text: '연맹 원본은 장기 성장을 위해 경찰 휘장과 테크 가속을 연맹 표창 연구에 집중하도록 권장합니다. 당장 표시되는 전투력만 보지 말고, 이벤트·보상 관련 핵심 노드까지 이어지는 경로를 먼저 정하세요.' },
        { title: '전투 연구는 주력 한 부대부터', text: '기초 해금과 성장 기반을 마련한 뒤, 실제 주력 병종에 맞는 공격·방어·생명력 연구를 선택하세요. 슈터 특훈·라이더 특훈·돌격 특훈을 동시에 넓게 올리기보다 주력 부대가 바로 쓰는 효과를 우선하는 편이 효율적입니다.' },
      ] },
      { title: '2. 연구 해금표', catalog: true, parts: [
        { title: '실험실 레벨만으로 열리지 않는 연구', text: '트리에 따라 실험실 레벨 외에 앞선 트리의 진행률과 시즌 개방 조건이 필요합니다. 실험실 조건이 충족되었다는 표시가 있어도 나머지 조건을 모두 확인해야 합니다.' },
        { title: '50%·100%는 트리 전체 진행률', text: '예를 들어 새로운 집 50%는 특정 노드의 레벨이 5라는 뜻이 아닙니다. 해당 트리 전체의 진행률을 말하므로 연구 화면의 진행도와 비교하세요.' },
      ] },
      { title: '3. 배지·자원 관리', parts: [
        { title: '이번에 올릴 경로 하나 정하기', text: '다음 핵심 노드와 그 선행 노드에 필요한 비용을 함께 확인하세요. 여러 트리에 배지를 조금씩 나누기보다, 현재 목표에 도달할 만큼 먼저 확보하고 사용합니다.' },
        { title: '배지가 없는 기초 연구도 활용', text: '새로운 집·피난소 건설·엘리트 부대 등은 배지 합계가 0입니다. 배지가 부족할 때는 아직 필요한 기초 연구를 검토하되, 다른 자원과 연구 시간은 별도로 필요합니다.' },
        { title: '연구 속도와 자원 절감은 다른 효과', text: '연구 속도는 소요 시간에, 자원 절감은 요구 자원에 영향을 주는 항목입니다. 각각의 실제 효과와 적용 대상을 게임에서 확인하고, 같은 수치라고 생각해 계산하지 마세요.' },
        { title: '트리 전체 비용과 다음 연구 비용 구분', text: '목록 카드의 합계는 트리를 처음부터 끝까지 올릴 때의 기본 총량입니다. 연구 카드를 열고 트리의 노드를 누르면 현재·목표 레벨과 레벨별 비용을 확인할 수 있습니다. 목표 버튼은 필요한 선행 경로까지 함께 계획에 추가합니다.' },
      ] },
      { title: '4. 연구일 루틴', parts: [
        { title: '전날: 재료와 선행 조건 준비', text: '연구 가속과 경찰 휘장을 모으고, 다음 연구의 실험실 레벨·선행 노드·자원이 준비됐는지 확인하세요. 연구일에 재료가 부족해 목표 경로가 끊기는 일을 줄이는 준비입니다.' },
        { title: '당일: 점수 항목부터 확인', text: '연맹 원본의 Day 3는 수요일 테크 연구입니다. 해당 날의 실제 점수 조건과 연맹 공지를 확인한 뒤 배지·연구 가속을 사용하고, 원본 지침대로 연구 완료 버튼까지 확인하세요.' },
        { title: '원본의 권장 시간은 한국 시간', text: '원본은 한국 시간(UTC+9) 당일 19:00~23:00, 다음 날 07:00~11:00를 권장합니다. 아포칼립스 시간이나 내 휴대전화 현지 시간과 혼동하지 말고, 최신 공지가 바뀌었다면 그 일정을 따르세요.' },
        { title: '마무리: 점수와 다음 목표 점검', text: '점수와 보상 수령 여부, 남은 재료, 다음 연구 경로를 확인하세요. 이미 필요한 보상 목표를 달성했다면 남은 가속을 모두 소모하기 전에 다음 연구일에 쓸 분량도 고려합니다.' },
      ] },
      { title: '5. 막힐 때 확인', parts: [
        { title: '본부를 올렸는데도 잠겨 있다면', text: '본부와 실험실 레벨은 별개입니다. 실험실 레벨, 선행 트리 진행률, 시즌 개방 조건을 차례로 확인하세요. 조건표에 없는 추가 요구 사항은 실제 게임의 잠금 안내를 기준으로 판단합니다.' },
        { title: '가속을 쓸 수 없다면', text: '진행 중인 연구가 있는지, 보유한 가속이 연구용 또는 적용 가능한 범용인지 확인하세요. 건설·훈련 전용 가속을 연구에 사용할 수 있다고 계산하면 준비 시간이 어긋납니다.' },
        { title: '전투력이 크게 오르지 않는다면', text: '생산·개발·속도 관련 연구와 전투 능력치 연구는 목적이 다릅니다. 이번 목표가 성장 효율인지 주력 부대 전투인지 먼저 정하고, 실제 적용 효과를 비교하세요.' },
        { title: '게임 화면과 같은 연구 이름으로 확인', text: '연맹 표창·연맹 무장·군사 이론·도시 함락·전쟁 수호·유닛 특훈 등 게임의 한국어 명칭으로 확인하세요. 병종별 연구는 라이더 특훈·돌격 특훈·슈터 특훈이며, 아이콘과 선행 조건도 함께 비교하면 목표 경로를 찾기 쉽습니다.' },
      ] },
    ],
  },
  en: {
    title: 'Research Guide', kicker: 'Research', file: 'Research Guide', desc: 'Beginner priorities, unlock paths and badge planning',
    summary: [{ label: 'Early badges', value: 'Alliance Recognition first' }, { label: 'Unlocks', value: 'Lab + prerequisite tree progress' }, { label: 'Combat research', value: 'Focus on your main troop type' }],
    sourceNote: 'Priorities follow the alliance’s original Day 3 guide. Unlocks and baseline badge totals use public Wild Hoggs data checked on 2026-10-26. Current in-game requirements and alliance notices take priority.',
    sections: [
      { title: '1. Getting started', parts: [
        { title: 'Separate personal research from alliance donations', text: 'This guide covers personal research in your own Lab. A tree with Alliance in its name is still distinct from alliance technology funded by member donations. Check which system you are investing in.' },
        { title: 'Open the path to Alliance Recognition', text: 'Alliance Recognition is also called Alliance Commendation in some alliance materials. The public unlock list requires Lab level 10 and 50% progress in New Home. If it is locked, check these two conditions first.' },
        { title: 'Prioritize Alliance Recognition for badges and speedups', text: 'The original alliance guide recommends concentrating badges and research speedups on Alliance Recognition for long-term growth. Plan the prerequisite route toward event and reward nodes rather than choosing only by the immediate power number.' },
        { title: 'Focus combat research on one main squad', text: 'After establishing essential unlocks and growth foundations, prioritize attack, defense and health effects for the troop type you actually use. Avoid spreading early investment across Shooter, Rider and Assaulter research at once.' },
      ] },
      { title: '2. Unlock requirements', catalog: true, parts: [
        { title: 'Lab level is only one requirement', text: 'Some trees also require progress in an earlier tree or a season opening condition. Meeting the Lab requirement does not mean every other requirement has been met.' },
        { title: '50% and 100% mean total tree progress', text: 'For example, New Home 50% refers to the progress of the whole tree, not level 5 in one node. Compare it with the progress shown in the research screen.' },
      ] },
      { title: '3. Badges and resources', parts: [
        { title: 'Choose one route for your current goal', text: 'Check the cost of the next key node together with its prerequisites. Reserve enough to reach your current goal before distributing badges among several unrelated trees.' },
        { title: 'Consider essential badge-free research', text: 'The public baseline table lists zero badge totals for New Home, Shelter Building and Elite Troops. When badges are scarce, review useful unfinished foundational research; other resources and research time are still required.' },
        { title: 'Research speed is different from resource reduction', text: 'Research speed affects time, while resource reduction affects costs. Check the actual effect and eligible resource in the game; do not treat the two percentages as interchangeable.' },
        { title: 'A full-tree total is not the next upgrade cost', text: 'Catalog totals cover the full tree from scratch. Open a research card and select a node to edit current and target levels and view per-level costs. The Target button adds the required prerequisite path to your plan.' },
      ] },
      { title: '4. Research-day routine', parts: [
        { title: 'The day before: prepare materials and prerequisites', text: 'Save research speedups and badges, then check the Lab level, prerequisite nodes and resources for your next research. This helps avoid getting stuck midway through your planned route.' },
        { title: 'On the day: check scoring first', text: 'The original alliance guide marks Wednesday, Day 3, as Tech Research. Check the current scoring rules and alliance notice before spending badges and research speedups, and confirm the research completion button as instructed in the source.' },
        { title: 'The source schedule uses Korean time', text: 'The source recommends 19:00–23:00 that day and 07:00–11:00 the following day in Korean time, UTC+9. Do not confuse this with Apocalypse Time or your device’s local time. Follow a newer alliance schedule if it differs.' },
        { title: 'Finish by reviewing points and the next target', text: 'Check your score, claimed rewards, remaining materials and the next research route. If you have already reached your reward target, consider the next research day before spending every remaining speedup.' },
      ] },
      { title: '5. When you get stuck', parts: [
        { title: 'Still locked after upgrading HQ?', text: 'HQ and Lab levels are different. Check Lab level, prerequisite tree progress and season availability in that order. Any additional requirement shown in the actual game takes priority over the reference list.' },
        { title: 'Cannot use a speedup?', text: 'Check that research is active and that the speedup is for research or is an eligible universal item. Including construction-only or training-only items will overestimate your available research time.' },
        { title: 'Power barely increased?', text: 'Production, development and speed research serve a different purpose from combat stats. Decide whether your current goal is growth efficiency or squad combat, then compare the actual effects.' },
        { title: 'Different names in different guides?', text: 'Alliance Recognition can appear as Alliance Commendation in alliance materials. Rider and Shooter research may be translated as Cavalry and Marksman training. Compare the icon, effects and original name to identify the same tree.' },
      ] },
    ],
  },
  es: {
    title: 'Guía de investigación', kicker: 'Investigación', file: 'Guía de investigación', desc: 'Prioridades iniciales, desbloqueos e insignias',
    summary: [{ label: 'Insignias iniciales', value: 'Reconocimiento de alianza primero' }, { label: 'Desbloqueos', value: 'Laboratorio + progreso previo' }, { label: 'Combate', value: 'Prioriza tu tipo de tropa principal' }],
    sourceNote: 'Las prioridades siguen la guía original del día 3 de la alianza. Requisitos e insignias base proceden de datos públicos de Wild Hoggs comprobados el 2026-10-26. Prevalecen el juego actual y los avisos de la alianza.',
    sections: [
      { title: '1. Por dónde empezar', parts: [
        { title: 'Separa investigación personal y donaciones', text: 'Esta guía trata la investigación personal de tu Laboratorio. Un árbol con Alianza en el nombre no es lo mismo que la tecnología financiada con donaciones de todos los miembros. Comprueba en qué sistema inviertes.' },
        { title: 'Abre el camino al Reconocimiento de alianza', text: 'Algunos materiales de la alianza también lo llaman Condecoración de alianza. La lista pública exige Laboratorio 10 y un 50% de progreso en Nuevo hogar. Si está bloqueado, revisa primero ambos requisitos.' },
        { title: 'Prioriza ese árbol para insignias y aceleradores', text: 'La guía original recomienda concentrar insignias y aceleradores de investigación en Reconocimiento de alianza para el crecimiento a largo plazo. Planifica el camino a los nodos de eventos y recompensas, en vez de elegir solo por el aumento inmediato de poder.' },
        { title: 'Concentra el combate en un escuadrón', text: 'Tras preparar desbloqueos y desarrollo básico, prioriza ataque, defensa y vida para las tropas que realmente usas. Evita repartir la inversión inicial entre tiradores, jinetes y asaltantes a la vez.' },
      ] },
      { title: '2. Desbloqueos', catalog: true, parts: [
        { title: 'El nivel del Laboratorio no basta siempre', text: 'Algunos árboles exigen progreso en otro árbol o la apertura de una fase de temporada. Cumplir el nivel del Laboratorio no significa cumplir todos los requisitos.' },
        { title: '50% y 100% son progreso de todo el árbol', text: 'Por ejemplo, Nuevo hogar al 50% se refiere al progreso del árbol completo, no al nivel 5 de un nodo. Compáralo con el porcentaje de la pantalla de investigación.' },
      ] },
      { title: '3. Insignias y recursos', parts: [
        { title: 'Elige una ruta para el objetivo actual', text: 'Consulta el coste del próximo nodo clave y de sus requisitos previos. Reserva lo necesario para llegar al objetivo antes de repartir insignias entre árboles distintos.' },
        { title: 'Revisa las bases sin coste de insignias', text: 'La tabla pública base muestra cero insignias para Nuevo hogar, Construcción del refugio y Tropas de élite. Si faltan insignias, revisa la investigación básica útil pendiente; los demás recursos y el tiempo siguen siendo necesarios.' },
        { title: 'Velocidad y reducción de recursos son distintas', text: 'La velocidad afecta al tiempo y la reducción de recursos al coste. Comprueba el efecto y los recursos afectados en el juego; los porcentajes no son intercambiables.' },
        { title: 'El total del árbol no es el próximo coste', text: 'Los totales del catálogo cubren el árbol completo desde cero. Abre una tarjeta y elige un nodo para editar niveles actuales y objetivo y consultar costes por nivel. Objetivo añade la ruta previa necesaria a tu plan.' },
      ] },
      { title: '4. Día de investigación', parts: [
        { title: 'La víspera: prepara materiales y requisitos', text: 'Guarda aceleradores e insignias y comprueba nivel de Laboratorio, nodos previos y recursos. Así evitas quedarte bloqueado a mitad de la ruta prevista.' },
        { title: 'Ese día: revisa primero los puntos', text: 'La guía original sitúa Investigación tecnológica el miércoles, día 3. Revisa las reglas de puntos y el aviso actual antes de gastar insignias y aceleradores. Confirma también el botón de finalización indicado por la fuente.' },
        { title: 'El horario original es de Corea', text: 'La fuente recomienda 19:00–23:00 del mismo día y 07:00–11:00 del siguiente, en horario coreano UTC+9. No lo confundas con la hora de Apocalipsis ni con la de tu móvil. Sigue cualquier horario nuevo de la alianza.' },
        { title: 'Al terminar: puntos y siguiente objetivo', text: 'Revisa puntos, recompensas recogidas, materiales restantes y la próxima ruta. Si ya lograste el objetivo de recompensas, piensa en el siguiente día de investigación antes de gastar todos los aceleradores.' },
      ] },
      { title: '5. Si te bloqueas', parts: [
        { title: '¿Sigue bloqueado tras mejorar la base?', text: 'La base y el Laboratorio tienen niveles diferentes. Comprueba Laboratorio, progreso previo y disponibilidad de temporada. Cualquier requisito adicional mostrado en el juego tiene prioridad.' },
        { title: '¿No puedes usar un acelerador?', text: 'Comprueba que haya investigación activa y que el objeto sea de investigación o universal válido. Contar objetos exclusivos de construcción o entrenamiento exagera el tiempo disponible.' },
        { title: '¿Apenas sube el poder?', text: 'Producción, desarrollo y velocidad tienen un objetivo distinto a las estadísticas de combate. Decide si buscas eficiencia de crecimiento o fuerza del escuadrón y compara los efectos reales.' },
        { title: '¿Los nombres cambian entre guías?', text: 'Reconocimiento de alianza puede aparecer como Condecoración de alianza. Jinetes y tiradores también pueden traducirse como Caballería y Tiradores especializados. Compara icono, efectos y nombre original para reconocer el mismo árbol.' },
      ] },
    ],
  },
  hi: {
    title: 'शोध मार्गदर्शिका', kicker: 'शोध', file: 'शोध मार्गदर्शिका', desc: 'शुरुआती प्राथमिकताएं, शोध अनलॉक और बैज की योजना',
    summary: [{ label: 'शुरुआती बैज', value: 'पहले गठबंधन मान्यता' }, { label: 'अनलॉक', value: 'प्रयोगशाला और पिछले वृक्ष की प्रगति' }, { label: 'लड़ाई का शोध', value: 'मुख्य सैनिक प्रकार पर ध्यान' }],
    sourceNote: 'प्राथमिकताएं गठबंधन की मूल तीसरे दिन की मार्गदर्शिका पर आधारित हैं। अनलॉक शर्तें और मूल बैज योग Wild Hoggs के सार्वजनिक आंकड़ों से 2026-10-26 को जांचे गए हैं। वर्तमान खेल और गठबंधन की नई सूचना को प्राथमिकता दें।',
    sections: [
      { title: '1. शुरुआत का क्रम', parts: [
        { title: 'व्यक्तिगत शोध और दान अलग हैं', text: 'यह मार्गदर्शिका अपनी प्रयोगशाला में होने वाले व्यक्तिगत शोध के लिए है। नाम में गठबंधन होने वाला वृक्ष सभी सदस्यों के दान से बढ़ने वाली गठबंधन तकनीक से अलग है। पहले समझें कि आप किसमें निवेश कर रहे हैं।' },
        { title: 'गठबंधन मान्यता का रास्ता खोलें', text: 'कुछ गठबंधन सामग्री में इसे गठबंधन प्रशंसा भी कहा जाता है। सार्वजनिक सूची के अनुसार प्रयोगशाला स्तर 10 और नया घर वृक्ष में 50% प्रगति चाहिए। बंद होने पर पहले दोनों शर्तें जांचें।' },
        { title: 'बैज और शोध समय कटौती की प्राथमिकता', text: 'मूल गठबंधन मार्गदर्शिका लंबे विकास के लिए बैज और शोध समय कटौती गठबंधन मान्यता पर केंद्रित करने को कहती है। केवल तुरंत बढ़ने वाली शक्ति के बजाय आयोजन और पुरस्कार वाले प्रमुख नोड तक का रास्ता तय करें।' },
        { title: 'लड़ाई का शोध एक मुख्य दस्ते के लिए', text: 'जरूरी अनलॉक और विकास की नींव के बाद अपने वास्तविक मुख्य सैनिक प्रकार के आक्रमण, रक्षा और स्वास्थ्य को प्राथमिकता दें। शुरुआत में निशानेबाज, सवार और आक्रमणकारी तीनों में सामग्री एक साथ न बांटें।' },
      ] },
      { title: '2. अनलॉक शर्तें', catalog: true, parts: [
        { title: 'केवल प्रयोगशाला स्तर पर्याप्त नहीं', text: 'कुछ वृक्षों के लिए पिछले वृक्ष की प्रगति या सीजन की खुलने वाली शर्त भी चाहिए। प्रयोगशाला की शर्त पूरी दिखने पर बाकी शर्तें भी जांचें।' },
        { title: '50% और 100% पूरे वृक्ष की प्रगति हैं', text: 'उदाहरण के लिए नया घर में 50% का अर्थ पूरे वृक्ष की प्रगति है, किसी एक नोड का स्तर 5 नहीं। शोध स्क्रीन के प्रतिशत से तुलना करें।' },
      ] },
      { title: '3. बैज और संसाधन', parts: [
        { title: 'वर्तमान लक्ष्य के लिए एक रास्ता चुनें', text: 'अगले मुख्य नोड और उसके जरूरी पिछले नोड की लागत साथ में देखें। अलग-अलग वृक्षों में बैज बांटने से पहले वर्तमान लक्ष्य तक पहुंचने की मात्रा बचाएं।' },
        { title: 'बिना बैज वाले बुनियादी शोध भी देखें', text: 'सार्वजनिक मूल तालिका में नया घर, आश्रय निर्माण और श्रेष्ठ सैनिक के कुल बैज शून्य हैं। बैज कम हों तो जरूरी अधूरे बुनियादी शोध देखें; दूसरे संसाधन और शोध समय फिर भी लगते हैं।' },
        { title: 'शोध गति और संसाधन बचत अलग हैं', text: 'शोध गति समय पर और संसाधन बचत लागत पर असर डालती है। खेल में वास्तविक प्रभाव और लागू संसाधन देखें। दोनों प्रतिशतों को एक समान न मानें।' },
        { title: 'पूरे वृक्ष का योग अगली लागत नहीं', text: 'सूची का योग पूरे वृक्ष को शून्य से बढ़ाने की लागत है। शोध कार्ड खोलें और बिंदु चुनकर वर्तमान तथा लक्ष्य स्तर और हर स्तर की लागत देखें। लक्ष्य बटन जरूरी पूर्व शोध का मार्ग भी योजना में जोड़ता है।' },
      ] },
      { title: '4. शोध वाले दिन का क्रम', parts: [
        { title: 'एक दिन पहले तैयारी', text: 'शोध समय कटौती और बैज बचाएं। अगले शोध के लिए प्रयोगशाला स्तर, पिछले नोड और संसाधन जांचें ताकि तय रास्ते में बीच में रुकना न पड़े।' },
        { title: 'उस दिन पहले अंक की शर्तें देखें', text: 'मूल गठबंधन मार्गदर्शिका में बुधवार, तीसरा दिन, तकनीकी शोध का दिन है। बैज और समय कटौती खर्च करने से पहले वर्तमान अंक नियम और सूचना देखें। मूल निर्देश के अनुसार शोध पूरा करने वाला बटन भी जांचें।' },
        { title: 'मूल समय कोरिया का है', text: 'मूल सुझाव कोरियाई समय, यूटीसी+9, में उसी दिन 19:00–23:00 और अगले दिन 07:00–11:00 है। इसे अपोकैलिप्स समय या मोबाइल के स्थानीय समय से न मिलाएं। गठबंधन की नई समय-सारिणी अलग हो तो वही मानें।' },
        { title: 'अंत में अंक और अगला लक्ष्य', text: 'अंक, लिए गए पुरस्कार, बचे संसाधन और अगला शोध रास्ता देखें। पुरस्कार लक्ष्य पूरा हो गया हो तो सारी बची समय कटौती खर्च करने से पहले अगले शोध दिन की जरूरत सोचें।' },
      ] },
      { title: '5. रुकावट आने पर', parts: [
        { title: 'मुख्यालय बढ़ाने पर भी बंद है?', text: 'मुख्यालय और प्रयोगशाला के स्तर अलग हैं। प्रयोगशाला, पिछले वृक्ष की प्रगति और सीजन उपलब्धता क्रम से जांचें। खेल में दिख रही अतिरिक्त शर्त को सूची से ऊपर मानें।' },
        { title: 'समय कटौती इस्तेमाल नहीं हो रही?', text: 'देखें कि शोध चल रहा है और वस्तु शोध की या लागू होने वाली सार्वभौमिक है। केवल निर्माण या प्रशिक्षण की वस्तु गिनने से उपलब्ध शोध समय का अनुमान गलत होगा।' },
        { title: 'शक्ति कम बढ़ी?', text: 'उत्पादन, विकास और गति का शोध लड़ाई की विशेषताओं से अलग उद्देश्य रखता है। पहले तय करें कि लक्ष्य विकास की दक्षता है या मुख्य दस्ते की लड़ाई, फिर वास्तविक प्रभाव तुलना करें।' },
        { title: 'सामग्री में नाम अलग हैं?', text: 'गठबंधन मान्यता को गठबंधन प्रशंसा भी कहा जा सकता है। सवार और निशानेबाज प्रशिक्षण के अनुवाद भी बदल सकते हैं। उसी वृक्ष को पहचानने के लिए चिह्न, प्रभाव और मूल नाम देखें।' },
      ] },
    ],
  },
};

export const researchLabels = {
  ko: { lab: '내 실험실 레벨', onlyMet: '실험실 조건을 충족한 연구만', columns: ['연구 트리', '필요 실험실', '추가 선행 조건', '전체 기본 배지', '비용표'], none: '추가 조건 없음', met: '실험실 충족', missing: '실험실 부족', invalid: '실험실 레벨은 1~35로 입력하세요.', count: '연구 트리', season: '시즌', day: '일차부터', cost: '원문', note: '배지는 트리 전체를 처음부터 최대치까지 연구하는 기본 합계입니다. 개인 진행도·절감률은 미반영이며, 실험실 조건 외 선행 연구와 시즌 조건도 충족해야 합니다.' },
  en: { lab: 'Your Lab level', onlyMet: 'Only trees meeting the Lab requirement', columns: ['Research tree', 'Lab required', 'Additional prerequisites', 'Full baseline badges', 'Costs'], none: 'No additional requirement', met: 'Lab met', missing: 'Lab too low', invalid: 'Enter a Lab level from 1 to 35.', count: 'Research trees', season: 'Season', day: 'from day', cost: 'Source', note: 'Badge totals cover each complete tree from zero to maximum. Your progress and reductions are not deducted. Prerequisite research and season conditions must also be met.' },
  es: { lab: 'Nivel de tu Laboratorio', onlyMet: 'Solo árboles con el nivel de Laboratorio cumplido', columns: ['Árbol', 'Laboratorio', 'Requisitos adicionales', 'Insignias base completas', 'Costes'], none: 'Sin requisito adicional', met: 'Laboratorio cumplido', missing: 'Laboratorio insuficiente', invalid: 'Introduce un nivel de Laboratorio entre 1 y 35.', count: 'Árboles', season: 'Temporada', day: 'desde el día', cost: 'Fuente', note: 'Las insignias son el total base de cada árbol desde cero hasta el máximo. No se restan progreso ni reducciones. También deben cumplirse los requisitos previos y de temporada.' },
  hi: { lab: 'आपकी प्रयोगशाला का स्तर', onlyMet: 'केवल प्रयोगशाला की शर्त पूरी वाले वृक्ष', columns: ['शोध वृक्ष', 'जरूरी प्रयोगशाला', 'अतिरिक्त पूर्व शर्तें', 'पूरे वृक्ष के मूल बैज', 'लागत'], none: 'अतिरिक्त शर्त नहीं', met: 'प्रयोगशाला पर्याप्त', missing: 'प्रयोगशाला कम', invalid: 'प्रयोगशाला का स्तर 1 से 35 दर्ज करें।', count: 'शोध वृक्ष', season: 'सीजन', day: 'दिन से', cost: 'मूल स्रोत', note: 'बैज हर वृक्ष को शून्य से अधिकतम तक बढ़ाने का मूल योग हैं। आपकी प्रगति और छूट नहीं घटाई गई हैं। पिछले शोध और सीजन की शर्तें भी पूरी होनी चाहिए।' },
};

export const hindiResearchNames = {
  new_home: 'नया घर', shelter_building: 'आश्रय निर्माण', elite_troops: 'श्रेष्ठ सैनिक', hero_training: 'नायक प्रशिक्षण', alliance_recognition: 'गठबंधन मान्यता', fully_armed_alliance: 'पूर्ण सशस्त्र गठबंधन', hq_management: 'मुख्यालय प्रबंधन', military_strategies: 'सैन्य रणनीति', siege_to_seize: 'घेराबंदी विजय', peace_shield: 'शांति कवच', rapid_growth: 'तीव्र विकास', field: 'मैदानी युद्ध', army_building: 'सेना निर्माण', rider_training: 'सवार प्रशिक्षण', assaulter_training: 'आक्रमणकारी प्रशिक्षण', shooter_training: 'निशानेबाज प्रशिक्षण', unit_special_training: 'विशेष इकाई प्रशिक्षण', age_of_steel: 'इस्पात युग', tactical_master: 'रणनीति विशेषज्ञ', army_expansion: 'सेना विस्तार', leaders_will: 'नेता की इच्छा',
};

export const researchLocalCopy = {
  ko: { open: '상세·계산', back: '연구 해금표로', tab: '6. 연구 상세·계산' },
  en: { open: 'Details & costs', back: 'Back to unlock table', tab: '6. Research details & costs' },
  es: { open: 'Detalles y costes', back: 'Volver a desbloqueos', tab: '6. Detalles y costes' },
  hi: { open: 'विवरण और लागत', back: 'अनलॉक तालिका पर लौटें', tab: '6. शोध विवरण और लागत' },
};
for (const lang of Object.keys(researchGuide)) {
  researchGuide[lang].sections.push({ title: researchLocalCopy[lang].tab, planner: true });
}
export function researchName(tree, lang) {
  return lang === 'hi' ? hindiResearchNames[tree.id] : tree.name[lang];
}
