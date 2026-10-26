const languages = ['ko','en','es','hi'];
const localized = (values, lang) => values[languages.indexOf(lang)];
const p = (title, text) => ({title,text});
const chapters = [
  { title:['1. 영웅 및 장비','1. Heroes & equipment','1. Héroes y equipo','1. नायक और उपकरण'], intro:[
    '가장 먼저 완성할 것은 주력 1부대입니다. 영웅과 장비를 함께 관리해야 경험치·조각·스킬북·장비 재료가 실제 전투에 연결됩니다.',
    'Build one dependable main squad first. Manage heroes and equipment together so XP, fragments, skill books and equipment materials improve the squad you actually fight with.',
    'Completa primero un escuadrón principal fiable. Gestiona héroes y equipo juntos para que experiencia, fragmentos, libros y materiales beneficien al grupo que realmente combate.',
    'पहले एक भरोसेमंद मुख्य दल तैयार करें। नायक और उपकरण साथ सँभालें, ताकि अनुभव, टुकड़े, कौशल पुस्तकें और उपकरण सामग्री आपके वास्तविक लड़ने वाले दल को मजबूत करें।'],parts:[
    p(['왜 1순위인가?','Why first?','¿Por qué primero?','पहली प्राथमिकता क्यों?'],[
      '편성된 영웅의 레벨·별·스킬과 착용 장비는 현재 부대의 능력을 직접 바꿉니다. 모든 영웅을 조금씩 올리기보다 주력 5명을 정하면 한정 재료의 낭비를 줄일 수 있습니다. 이 순서는 NoVa의 투자 권장안이며, 모든 계정에서 같은 수치 효율을 보장하는 공식은 아닙니다.',
      'The levels, stars, skills and equipped items of deployed heroes directly shape your active squad. Choosing five main heroes avoids scattering scarce materials across unused characters. This is NoVa’s investment recommendation, not a formula guaranteeing identical returns for every account.',
      'Los niveles, estrellas, habilidades y objetos equipados de los héroes desplegados afectan al escuadrón activo. Elegir cinco principales evita dispersar materiales escasos. Es una recomendación de inversión de NoVa, no una fórmula de rentabilidad idéntica para todas las cuentas.',
      'तैनात नायकों का स्तर, सितारे, कौशल और पहने उपकरण सक्रिय दल को सीधे प्रभावित करते हैं। पाँच मुख्य नायक चुनने से सीमित सामग्री बेकार पात्रों में नहीं बँटती। यह NoVa की निवेश सलाह है, हर खाते में समान लाभ की गारंटी वाला सूत्र नहीं।']),
    p(['① 주력 5명과 역할부터 확정','① Choose five heroes and their roles','① Elige cinco héroes y sus funciones','① पाँच नायक और उनकी भूमिका चुनें'],[
      '현재 시즌에 확보할 수 있는 영웅 중 공격·방어·지원 역할을 확인하고 주력 편성을 정하세요. 같은 진영 보너스는 실제 편성 화면에서 확인합니다. 등급이 높다는 이유만으로 별과 스킬이 낮은 새 영웅을 즉시 교체하지 말고 기존 주력과 전투 결과를 비교하세요.',
      'Choose a main lineup from heroes you can obtain this season, checking attack, defense and support roles. Verify faction bonuses on the actual formation screen. A new higher-rarity hero with fewer stars or weaker skills is not automatically better than your developed hero; compare battle results.',
      'Elige una formación con héroes disponibles en tu temporada y revisa ataque, defensa y apoyo. Comprueba bonificaciones de facción en la formación real. Un héroe de mayor rareza con pocas estrellas o habilidades bajas no supera automáticamente al que ya has desarrollado: compara resultados.',
      'इस मौसम में उपलब्ध नायकों में आक्रमण, रक्षा और सहायता की भूमिकाएँ देखकर मुख्य गठन चुनें। गुट लाभ वास्तविक गठन स्क्रीन पर जाँचें। कम सितारे या कमजोर कौशल वाला नया ऊँची दुर्लभता का नायक अपने विकसित पुराने नायक से अपने आप बेहतर नहीं; युद्ध परिणाम तुलना करें।']),
    p(['② 레벨 → 별 해금 → 핵심 스킬','② Levels → star unlocks → key skills','② Nivel → estrellas → habilidades clave','② स्तर → सितारा खोलना → मुख्य कौशल'],[
      '경험치는 주력에게 먼저 주고, 승급 조각은 다음 별·스킬 해금 구간까지 얼마나 필요한지 계산해 사용합니다. 스킬북은 스킬 설명의 적용 대상과 상승 수치를 읽고 주력 전투 스킬부터 투자하세요. 전용무기·만능 조각은 획득이 어려우므로 곧 교체할 영웅에게 성급하게 쓰지 않습니다.',
      'Give XP to the main squad first and calculate fragments needed for the next star or skill unlock. Read skill targets and per-level gains before spending books on the skills your squad uses. Exclusive-weapon and universal fragments are scarce; avoid rushing them into a hero you plan to replace.',
      'Da experiencia al grupo principal y calcula fragmentos para la próxima estrella o habilidad. Lee a quién afecta cada habilidad y cuánto mejora antes de gastar libros. Los fragmentos universales y de arma exclusiva son escasos: no los inviertas deprisa en un héroe que cambiarás pronto.',
      'पहले मुख्य दल को अनुभव दें और अगले सितारे या कौशल के लिए जरूरी टुकड़े गिनें। पुस्तक लगाने से पहले कौशल का लक्ष्य और प्रति स्तर लाभ पढ़ें। विशिष्ट हथियार और सार्वभौमिक टुकड़े दुर्लभ हैं; जल्द बदलने वाले नायक पर जल्दी खर्च न करें।']),
    p(['③ 장비는 빈칸 채우기부터','③ Fill equipment slots before over-upgrading','③ Completa las ranuras antes de sobremejorar','③ पहले उपकरण की खाली जगह भरें'],[
      '주력 영웅의 무기·헬멧·장갑·부츠 4칸부터 확인하세요. 공격 역할은 공격 효과, 버티는 역할은 생존 효과처럼 실제 옵션과 역할을 맞추고, 장비 한 개만 과도하게 올려 다른 핵심 부위를 방치하지 마세요. 획득 가능한 주황 장비 상자와 재료를 확보한 뒤 다음 강화 목표를 정합니다.',
      'Check weapon, helmet, gloves and boots on every main hero. Match actual item effects to the role: offense for damage dealers and survival for heroes taking hits. Do not over-invest in one item while leaving key slots empty. Secure obtainable orange-equipment boxes and materials before choosing the next upgrade.',
      'Revisa arma, casco, guantes y botas de cada héroe principal. Ajusta efectos al papel: ataque para daño y supervivencia para quienes reciben golpes. No concentres todo en un objeto dejando ranuras importantes vacías. Reúne cajas naranjas y materiales disponibles y fija la próxima meta.',
      'हर मुख्य नायक का हथियार, हेलमेट, दस्ताने और जूते देखें। वास्तविक प्रभाव भूमिका से मिलाएँ: नुकसान करने वाले को आक्रमण और प्रहार झेलने वाले को जीवित रहने का लाभ। एक वस्तु अत्यधिक बढ़ाकर जरूरी जगह खाली न छोड़ें। उपलब्ध नारंगी उपकरण बक्से और सामग्री लेकर अगला लक्ष्य बनाएँ।']),
    p(['④ 강화·승급·단조를 따로 계산','④ Separate leveling, promotion and forging','④ Distingue nivel, ascenso y forja','④ स्तर, पदोन्नति और गढ़ाई अलग गिनें'],[
      '장비 레벨 강화, 코어를 쓰는 승급, 단조석을 쓰는 단조는 별도 성장입니다. 같은 재료라고 생각해 한 번에 계산하지 마세요. 계산기 카드의 영웅·영웅 EXP·장비에서 현재와 목표를 입력하고 필요한 재료를 확인하세요. 합금·장비 재료·코어·단조석은 해당 강화 화면의 요구량과 대조합니다.',
      'Equipment levels, core-based promotion and forging-stone upgrades are separate tracks. Do not combine their materials into one assumed cost. In the Calculator card, use Heroes, Hero EXP and Equipment with current and target values. Compare alloy, equipment materials, cores and forging stones with the relevant in-game screen.',
      'Nivel de equipo, ascenso con núcleos y forja con piedras son vías distintas. No mezcles sus materiales en un coste supuesto. Usa Héroes, EXP y Equipo de la tarjeta Calculadoras con valores actuales y objetivo; contrasta aleación, materiales, núcleos y piedras con el juego.',
      'उपकरण स्तर, कोर से पदोन्नति और पत्थर से गढ़ाई अलग विकास हैं। सबकी सामग्री एक ही मानकर खर्च न गिनें। गणक कार्ड के नायक, नायक अनुभव और उपकरण में वर्तमान व लक्ष्य भरें। मिश्रधातु, उपकरण सामग्री, कोर और पत्थर की जरूरत संबंधित गेम स्क्रीन से मिलाएँ।']),
  ]},
  {title:['2. 테크','2. Research','2. Tecnología','2. अनुसंधान'],intro:[
    '영웅·장비로 주력 부대를 만들었다면, 연구로 성장 기반과 부대 성능을 보강합니다. 연구 슬롯은 계속 활용하되 경찰휘장과 가속은 목표 경로를 정해 사용하세요.',
    'Once heroes and equipment form a working main squad, research strengthens its foundation and performance. Keep research running, but plan a route before spending badges and speedups.',
    'Con un grupo principal funcional, la investigación refuerza crecimiento y combate. Mantén la investigación activa, pero define una ruta antes de gastar insignias y aceleradores.',
    'नायक और उपकरण से मुख्य दल बन जाने पर अनुसंधान से विकास और युद्ध क्षमता बढ़ाएँ। अनुसंधान चलता रहे, पर पदक और गति-वर्धक खर्च करने से पहले रास्ता तय करें।'],parts:[
    p(['왜 2순위인가?','Why second?','¿Por qué segundo?','दूसरी प्राथमिकता क्यों?'],[
      '연구는 영웅 한 명을 교체해도 남는 성장 기반입니다. 단, 생산·속도·보상 연구와 전투 연구의 목적은 다릅니다. 화면 전투력 상승량만 보고 선택하지 말고, 지금 필요한 것이 재료 수급인지 실제 전투 성능인지 먼저 정하세요.',
      'Research remains useful when individual heroes change. Production, speed and reward research serve different goals from combat nodes. Choose for your current bottleneck—material income or fighting ability—rather than just the displayed power increase.',
      'La investigación sigue siendo útil al cambiar héroes. Producción, velocidad y recompensas tienen objetivos distintos del combate. Elige según tu freno actual: recursos o rendimiento militar, no solo el poder mostrado.',
      'अलग नायक बदलने पर भी अनुसंधान का आधार रहता है। उत्पादन, गति और पुरस्कार वाले शोध का उद्देश्य युद्ध शोध से अलग है। केवल दिखने वाली शक्ति नहीं; अभी संसाधन चाहिए या युद्ध क्षमता, पहले तय करें।']),
    p(['① 초반 경찰휘장은 연맹 표창 경로','① Early badges: Alliance Recognition route','① Insignias iniciales: reconocimiento de alianza','① शुरुआती पदक: गठबंधन सम्मान का रास्ता'],[
      'NoVa의 기존 연구 지침대로 초반 핵심은 연맹 표창입니다. 참고 자료의 동맹 인정·Alliance Recognition과 같은 트리이며 실험실 10 + 새로운 집 50%가 해금 조건입니다. 개인 실험실 연구이므로 연맹원들이 기부하는 연맹 테크와 혼동하지 마세요. 필요한 보상 노드까지 선행 비용을 먼저 계산합니다.',
      'NoVa’s early research priority is Alliance Recognition, also called Alliance Commendation. Its reference unlock is Lab 10 plus New Home 50%. This is personal Lab research, not the alliance donation system. Calculate the prerequisite route to the reward nodes you need.',
      'La prioridad inicial de NoVa es reconocimiento de alianza, también llamado condecoración. El requisito de referencia es laboratorio 10 y Nuevo Hogar 50%. Es investigación personal, no donación de alianza. Calcula los requisitos hasta los nodos de recompensa elegidos.',
      'NoVa की शुरुआती प्राथमिकता गठबंधन सम्मान है। संदर्भ शर्त प्रयोगशाला 10 और नया घर 50% है। यह निजी प्रयोगशाला का शोध है, सदस्यों का दान नहीं। जरूरी पुरस्कार नोड तक पूर्वशर्त की लागत पहले गिनें।']),
    p(['② 주력 병종과 실험실 조건 확인','② Main troop type and Lab requirements','② Tipo principal y requisitos del laboratorio','② मुख्य सैनिक प्रकार और प्रयोगशाला शर्त'],[
      '성장 기반을 잡은 뒤 실제 주력의 공격·방어·생명력과 필요한 부대 규모 효과를 골라 투자합니다. 슈터·라이더·돌격 세 병종을 동시에 최대화하지 마세요. 고급 병종 트리는 앞선 트리 100% 같은 선행률이 필요할 수 있으므로 실험실 레벨만 올리고 해금됐다고 생각하지 않습니다.',
      'After growth foundations, choose attack, defense, health and relevant squad-size effects for the troops you actually use. Avoid maxing Shooter, Rider and Assaulter lines simultaneously. Advanced trees may require a preceding tree at 100%; Lab level alone is not enough.',
      'Tras la base de crecimiento, elige ataque, defensa, vida y tamaño de grupo pertinentes a tus tropas reales. No maximices a la vez tiradores, jinetes y asaltantes. Los árboles avanzados pueden exigir 100% del anterior; el nivel del laboratorio no basta.',
      'विकास आधार के बाद इस्तेमाल किए सैनिकों के आक्रमण, रक्षा, जीवन और संबंधित दल आकार पर निवेश करें। निशानेबाज़, सवार और आक्रमणकारी तीनों शाखाएँ एक साथ अधिकतम न करें। उच्च शाखा में पिछली शाखा 100% जैसी शर्त हो सकती है; केवल प्रयोगशाला स्तर पर्याप्त नहीं।']),
    p(['③ 연구 가이드에서 목표 노드부터','③ Plan the target node in Research Guide','③ Planifica el nodo objetivo en la guía','③ अनुसंधान गाइड में लक्ष्य नोड चुनें'],[
      '연구 가이드 카드에서 트리 → 목표 노드 → 현재·목표 레벨을 지정합니다. 목표 경로의 선행 노드와 경찰휘장·전기·자원·시간을 함께 확인하세요. 연구 속도는 시간을, 비용 절감은 적용 자원을 바꾸므로 효과를 각각 입력해야 합니다. 전체 트리 합계는 다음 1회 연구 비용이 아닙니다.',
      'Open Research Guide → tree → target node and set current/target levels. Review prerequisite nodes plus badges, electricity, resources and time. Research speed changes duration; savings change eligible costs, so enter them separately. The full-tree total is not the cost of the next single research.',
      'Abre Guía de investigación → árbol → nodo objetivo y fija nivel actual y meta. Revisa requisitos, insignias, electricidad, recursos y tiempo. Velocidad y ahorro actúan en magnitudes distintas: introdúcelos por separado. El total del árbol no es el coste de la próxima mejora.',
      'अनुसंधान गाइड → शाखा → लक्ष्य नोड खोलकर वर्तमान और लक्ष्य स्तर भरें। पूर्वशर्त, पदक, बिजली, संसाधन और समय साथ देखें। शोध गति समय बदलती है, बचत पात्र लागत बदलती है; दोनों अलग भरें। पूरी शाखा का योग अगले एक शोध की लागत नहीं।']),
    p(['④ 수요일 연구일에 쓰되 평소에도 진행','④ Time major spending for research day','④ Coordina el gasto con el día de investigación','④ बड़े खर्च को शोध दिवस से मिलाएँ'],[
      '원본 연맹대전 Day 3는 수요일 연구일입니다. 전날 자원과 선행을 준비하고 당일 실제 점수표를 확인한 뒤 가속·경찰휘장을 사용하세요. 점수 날짜를 기다린다고 연구 슬롯을 비워두기보다 평소 가능한 연구를 진행하고 큰 소비를 조절합니다. 연맹 테크 기부도 별도로 매일 챙깁니다.',
      'The alliance’s Day 3 is Wednesday research day. Prepare prerequisites and materials beforehand, then check live scoring before using speedups and badges. Do not leave the Lab idle merely to wait for points; run suitable research and time larger spending. Make daily alliance donations separately.',
      'El día 3 de la alianza es investigación del miércoles. Prepara requisitos y recursos; verifica puntos antes de gastar insignias y aceleradores. No dejes el laboratorio parado solo por esperar: investiga normalmente y coordina los gastos grandes. Dona a la tecnología de alianza por separado.',
      'गठबंधन का दिन 3 बुधवार शोध दिवस है। पहले शर्त और सामग्री तैयार करें, फिर वर्तमान अंक देखकर पदक और गति-वर्धक लगाएँ। अंक के इंतजार में प्रयोगशाला खाली न छोड़ें; संभव शोध चलाएँ और बड़ा खर्च समय से मिलाएँ। दैनिक गठबंधन दान अलग करें।']),
  ]},
  {title:['3. 탱크','3. Tank','3. Tanque','3. टैंक'],intro:[
    '탱크는 레벨업·개조·외장 모듈·플러그인을 구분해서 관리합니다. 앞의 두 우선순위가 끝날 때까지 방치하라는 뜻은 아니며, 탱크 전용 재료는 꾸준히 모아 계획적으로 사용합니다.',
    'Treat tank levels, modifications, external modules and plugins as separate systems. Third priority does not mean leaving the tank untouched until everything else is complete: collect its dedicated materials and use them to a plan.',
    'Separa nivel, modificaciones, módulos externos y complementos del tanque. Tercero no significa abandonarlo hasta terminar lo demás: reúne sus materiales específicos y úsalos con un plan.',
    'टैंक स्तर, संशोधन, बाहरी मॉड्यूल और प्लगइन अलग प्रणालियाँ हैं। तीसरी प्राथमिकता का मतलब बाकी सब पूरा होने तक छोड़ देना नहीं; इसकी खास सामग्री नियमित जुटाएँ और योजना से खर्च करें।'],parts:[
    p(['왜 3순위인가?','Why third?','¿Por qué tercero?','तीसरी प्राथमिकता क्यों?'],[
      '탱크 성장도 전투력과 영웅 관련 보너스를 보강하지만, 주력 영웅·장비와 핵심 테크를 희생해 모든 탱크 항목을 동시에 따라갈 필요는 없습니다. 공용 다이아·선택 상자는 현재 주력의 병목부터 비교하고, 렌치·도면 등 전용 재료는 탱크 목표에 맞춰 사용하세요.',
      'Tank growth adds power and hero-related bonuses, but you do not need to chase every tank track at the expense of your main heroes, equipment and key research. Compare shared diamonds and choice boxes against your squad’s bottleneck; spend dedicated wrenches and blueprints on a defined tank target.',
      'El tanque añade poder y bonificaciones de héroes, pero no necesitas perseguir todas sus vías sacrificando héroes, equipo e investigación. Compara diamantes y cajas de elección según el cuello de botella del grupo; dedica llaves y planos a una meta concreta.',
      'टैंक शक्ति और नायक संबंधी लाभ बढ़ाता है, लेकिन मुख्य नायक, उपकरण और जरूरी शोध छोड़कर हर टैंक रास्ता एक साथ बढ़ाना जरूरी नहीं। साझा हीरे और चयन बक्से मुख्य दल की कमी से तुलना करें; रिंच और नक्शे तय टैंक लक्ष्य पर लगाएँ।']),
    p(['① 레벨업: 현재에서 다음 목표까지','① Levels: current to the next target','① Nivel: de tu estado a la próxima meta','① स्तर: वर्तमान से अगले लक्ष्य तक'],[
      '계산기 카드 → 탱크 → 레벨업에서 현재·목표 레벨과 실제 적용 옵션을 입력하세요. 다음 구간까지 필요한 경험치·도면을 확인하고 재료가 모일 때 진행합니다. 차량 자체 전투력과 영웅 보너스는 별도 표시이므로 두 값을 같은 증가량으로 중복 계산하지 마세요.',
      'Use Calculator → Tank → Level Up, entering current/target levels and your actual options. Check XP and blueprints for the next milestone before spending. Vehicle power and hero bonuses are displayed separately; do not count them twice as the same increase.',
      'Usa Calculadoras → Tanque → Subir nivel con nivel actual, objetivo y opciones reales. Revisa experiencia y planos del siguiente tramo. Poder del vehículo y bonos de héroes se muestran aparte: no los cuentes dos veces como una misma subida.',
      'गणक → टैंक → स्तर वृद्धि में वर्तमान, लक्ष्य और वास्तविक विकल्प भरें। अगले चरण के अनुभव और नक्शे देखकर खर्च करें। वाहन शक्ति और नायक लाभ अलग दिखते हैं; एक ही वृद्धि मानकर दो बार न जोड़ें।']),
    p(['② 개조: 렌치와 세부 도면 같이 준비','② Mods: prepare wrenches and sub-upgrades','② Modificaciones: llaves y mejoras internas','② संशोधन: रिंच और छोटे उन्नयन तैयार करें'],[
      '개조 탭에서 지금 완료한 노드와 세부 강화 단계를 정확히 입력하고 다음 해금 목표를 고릅니다. 렌치만 모으면 끝이라고 생각하지 말고 각 세부 단계의 도면도 확인하세요. 모두 최대 버튼의 비용은 전체 목표이므로, 내 다음 노드 비용과 혼동하지 않습니다.',
      'In Mods, record completed nodes and their sub-upgrade steps, then choose the next unlock. Wrenches alone are not the full cost: inspect blueprint requirements inside each node. Max All represents the whole remaining plan, not just your next node.',
      'En modificaciones registra nodos completados y pasos internos; elige el próximo desbloqueo. Las llaves no son todo el coste: revisa los planos internos. Maximizar todo calcula el plan restante completo, no solo el próximo nodo.',
      'संशोधन में पूरे नोड और उनके छोटे चरण सही भरें, फिर अगला खुलने वाला लक्ष्य चुनें। केवल रिंच पूरा खर्च नहीं; हर नोड के नक्शे भी देखें। सब अधिकतम का खर्च पूरे बचे लक्ष्य का है, केवल अगले नोड का नहीं।']),
    p(['③ 외장 모듈: 6슬롯과 다음 등급 비교','③ Modules: compare six slots and next tiers','③ Módulos: seis ranuras y próximos rangos','③ मॉड्यूल: छह स्थान और अगला दर्जा देखें'],[
      '외장 모듈 6부위의 현재 등급을 확인하고, 부위별 다음 등급 비용과 전투력·경험치 차이를 비교하세요. 한 부위만 무조건 최고로 올리기보다 지금 가능한 단계 중 필요한 효과를 고릅니다. 선택 상자는 필요한 부위를 확정한 뒤 열어 중복과 부족을 줄이세요.',
      'Review the current tier of all six external modules, then compare next-tier costs and power/XP changes. Choose a useful achievable step rather than blindly maxing one slot. Decide which slot needs a choice box before opening it to reduce mismatched materials.',
      'Revisa los seis módulos y compara coste y cambios de poder/experiencia del siguiente rango. Elige una mejora útil y alcanzable, no maximices una ranura a ciegas. Decide la pieza antes de abrir cajas de elección para evitar materiales que no necesitas.',
      'सभी छह बाहरी मॉड्यूल का वर्तमान दर्जा देखें और अगले दर्जे की लागत व शक्ति/अनुभव बदलाव तुलना करें। एक स्थान अंधाधुंध अधिकतम करने के बजाय उपयोगी संभव चरण चुनें। चयन बक्सा खोलने से पहले जरूरी स्थान तय करें।']),
    p(['④ 플러그인: 편성·진영·슬롯 일치','④ Plugins: match formation, faction and slot','④ Complementos: formación, facción y ranura','④ प्लगइन: गठन, गुट और स्थान मिलाएँ'],[
      '플러그인은 실제 사용하는 편성·진영에 맞춰 슬롯별 품질과 레벨을 설정합니다. 보유 수량과 다음 단계 필요 수량을 확인한 뒤 강화하고, 사용하지 않는 편성까지 동시에 채우지 마세요. 장착 여부와 실제 적용 부대를 확인하는 것이 단순 총전투력 상승보다 먼저입니다.',
      'Set plugin quality and level for the formation and faction you actually use. Check owned copies and the next-step requirements before upgrading; avoid filling unused formations at the same time. Confirm that the item is equipped and benefits the intended squad before chasing total account power.',
      'Configura calidad y nivel para la formación y facción que usas. Comprueba copias y requisitos antes de mejorar; evita completar formaciones sin uso a la vez. Verifica que esté equipado y beneficie al escuadrón correcto antes de perseguir poder total.',
      'वास्तविक इस्तेमाल वाले गठन और गुट के लिए प्लगइन गुणवत्ता और स्तर भरें। बढ़ाने से पहले मौजूद प्रतियाँ और अगले चरण की जरूरत देखें; बेकार गठन साथ न भरें। कुल शक्ति से पहले सही दल पर वस्तु लगी है और लाभ दे रही है, यह देखें।']),
  ]},
  {title:['재료 투자 기준','Material priorities','Criterios de inversión','सामग्री निवेश नियम'],intro:[
    '1 → 2 → 3은 공용 자원과 선택 보상의 우선순위입니다. 서로 용도가 다른 전용 재료까지 모두 멈춰두라는 뜻은 아닙니다.',
    'The 1 → 2 → 3 order guides shared resources and choice rewards. It does not mean withholding dedicated materials that cannot be used in another system.',
    'El orden 1 → 2 → 3 guía recursos compartidos y premios de elección. No significa retener materiales específicos que no sirven en otro sistema.',
    '1 → 2 → 3 साझा संसाधन और चयन पुरस्कार का क्रम है। इसका मतलब ऐसी खास सामग्री रोकना नहीं जो दूसरी प्रणाली में लग ही नहीं सकती।'],parts:[
    p(['공용 다이아·선택 상자','Shared diamonds and choice boxes','Diamantes y cajas compartidas','साझा हीरे और चयन बक्से'],[
      '주력 영웅의 다음 별·스킬 해금, 주력 장비의 다음 성장, 핵심 테크 경로, 탱크의 다음 구간 순으로 현재 병목을 비교합니다. 단순히 비싼 상품을 사기보다 목표 달성에 모자라는 재료를 고르세요. 선택 상자를 미리 전부 열면 계획이 바뀔 때 대응하기 어렵습니다.',
      'Compare the next hero star/skill, equipment milestone, key research route and tank milestone against your current bottleneck. Choose what completes a useful goal rather than the most expensive-looking offer. Opening every choice box early reduces flexibility.',
      'Compara próxima estrella/habilidad, mejora de equipo, ruta de investigación y tramo del tanque con tu límite actual. Elige lo que complete una meta útil, no lo que parezca más caro. Abrir todas las cajas antes de tiempo reduce flexibilidad.',
      'अगले नायक सितारे/कौशल, उपकरण चरण, जरूरी शोध और टैंक चरण को वर्तमान कमी से तुलना करें। महँगी दिखने वाली चीज के बजाय उपयोगी लक्ष्य पूरा करने वाली सामग्री चुनें। सारे चयन बक्से पहले खोलना लचीलापन घटाता है।']),
    p(['전용 재료는 각 시스템에','Dedicated materials belong to their system','Materiales específicos en su sistema','खास सामग्री उसी प्रणाली में'],[
      '영웅 EXP·조각·스킬북은 영웅, 합금·코어·단조석은 해당 장비 성장, 경찰휘장·연구 가속은 목표 테크, 렌치·개조 도면은 탱크 개조에 맞춰 관리합니다. 여기의 코어는 시즌2 빙결코어와 다른 아이템일 수 있으니 이름만 보지 말고 아이콘과 사용처를 확인하세요.',
      'Track hero XP/fragments/books for heroes, alloy/cores/forging stones for their equipment tracks, badges/research speedups for planned research, and wrenches/mod blueprints for tank mods. Equipment cores and Season 2 Ice Cores can be different items: verify the icon and use, not just the word core.',
      'Gestiona experiencia/fragmentos/libros para héroes; aleación/núcleos/piedras para equipo; insignias/aceleradores para investigación; llaves/planos para tanque. Los núcleos de equipo y de hielo de temporada 2 pueden ser distintos: verifica icono y uso, no solo el nombre.',
      'नायक अनुभव/टुकड़े/पुस्तकें नायक के लिए, मिश्रधातु/कोर/पत्थर उपकरण के लिए, पदक/शोध गति-वर्धक शोध के लिए और रिंच/नक्शे टैंक संशोधन के लिए रखें। उपकरण कोर और मौसम 2 के हिम कोर अलग वस्तु हो सकते हैं; नाम के साथ चिह्न और उपयोग देखें।']),
    p(['본부·병력은 성장의 기반','HQ and troops support the plan','Cuartel y tropas sostienen el plan','मुख्यालय और सैनिक आधार हैं'],[
      '본부·실험실·병영은 해금에 필요한 수준으로 함께 올리고, 출정 병력의 티어·수량·병원 여유도 관리합니다. 주력 부대가 정원 미달이거나 부상으로 비어 있다면 영웅만 강화해도 체감이 작습니다. 병력 수만 늘려 총전투력을 높이는 것과 주력 한 부대가 강해지는 것은 구분하세요.',
      'Keep HQ, Lab and barracks at the levels needed for unlocks, and manage deployed troop tier/count plus hospital room. Hero upgrades alone may feel weak if the squad is underfilled or injured. Increasing total troop power is different from strengthening one deployable main squad.',
      'Mantén cuartel, laboratorio y barracones al nivel necesario, y revisa rango, cantidad de tropas y hospital. Mejorar héroes se nota poco si faltan tropas o están heridas. Aumentar poder total por cantidad no equivale a fortalecer un escuadrón desplegable.',
      'खुलने की जरूरत के अनुसार मुख्यालय, प्रयोगशाला और बैरक बढ़ाएँ; तैनात सैनिक दर्जा, संख्या और अस्पताल जगह देखें। दल अधूरा या घायल हो तो सिर्फ नायक सुधार का असर कम लगेगा। सैनिक गिनती से कुल शक्ति बढ़ना और एक लड़ने योग्य मुख्य दल मजबूत होना अलग हैं।']),
    p(['상점·이벤트에서 확보할 재료','Gather materials through shops and events','Reúne materiales en tiendas y eventos','दुकान और आयोजन से सामग्री जुटाएँ'],[
      '매일 퀘스트·캐러밴·탐색·연맹 보상을 누적하고, 각 상점에서 다음 목표에 필요한 영웅 조각·장비·경찰휘장·렌치 등을 비교합니다. 모든 상품을 사는 것이 목표는 아닙니다. 아이템 이벤트 카드에서 다이아 예산과 보상을 확인하고, 구매 전 다음 목표까지의 부족량을 계산하세요.',
      'Accumulate daily quest, Caravan, exploration and alliance rewards. Compare hero fragments, equipment, badges and wrenches against your next goal in each shop. Buying everything is not the objective. Use the Item Events card to review diamond budgets and rewards, then calculate the remaining shortfall.',
      'Acumula premios diarios, caravana, exploración y alianza. Compara fragmentos, equipo, insignias y llaves según tu próxima meta. No se trata de comprar todo. Revisa presupuesto de diamantes y premios en Eventos de objetos y calcula lo que te falta antes de comprar.',
      'दैनिक कार्य, कारवाँ, खोज और गठबंधन पुरस्कार नियमित लें। दुकान में अगले लक्ष्य के अनुसार नायक टुकड़े, उपकरण, पदक और रिंच तुलना करें। सब खरीदना लक्ष्य नहीं। वस्तु आयोजन कार्ड में हीरे का बजट और पुरस्कार देखें, फिर खरीद से पहले कमी गिनें।']),
  ]},
  {title:['실행·점검 루틴','Action & review','Rutina y revisión','कार्रवाई और जाँच'],intro:[
    '한 번에 모든 항목을 올리기보다 이번 주에 끝낼 목표를 시스템마다 하나씩 잡으세요. 숫자 상승과 실제 전투 결과를 함께 봅니다.',
    'Choose one achievable target per system for this week rather than upgrading everything at once. Review both the displayed increase and actual battle results.',
    'Elige una meta alcanzable por sistema esta semana en vez de subirlo todo. Revisa tanto las cifras como los resultados de combate.',
    'सब कुछ एक साथ बढ़ाने के बजाय हर प्रणाली में इस सप्ताह का एक संभव लक्ष्य चुनें। दिखने वाले अंक और वास्तविक युद्ध परिणाम दोनों देखें।'],parts:[
    p(['오늘 할 일','Today’s actions','Qué hacer hoy','आज क्या करें'],[
      '① 주력 5명의 편성·레벨·별·스킬·장비 빈칸 확인 → ② 연구 슬롯과 다음 선행 경로 확인 → ③ 탱크 전용 재료·다음 노드 확인 → ④ 매일 퀘스트와 보상 수령. 각 계산기에 현재 수치를 정확히 저장하면 다음 목표 부족량을 보기 쉽습니다.',
      '① Check your five main heroes’ formation, levels, stars, skills and equipment slots → ② check active research and prerequisites → ③ check tank materials and next node → ④ complete daily claims. Accurate current values in the calculators make shortfalls easier to see.',
      '① Revisa formación, niveles, estrellas, habilidades y equipo de los cinco principales → ② investigación y requisitos → ③ materiales y próximo nodo del tanque → ④ tareas y premios diarios. Guarda cifras actuales exactas para ver lo que falta.',
      '① मुख्य पाँच नायक का गठन, स्तर, सितारे, कौशल और खाली उपकरण देखें → ② चल रहा शोध और पूर्वशर्त देखें → ③ टैंक सामग्री और अगला नोड देखें → ④ दैनिक कार्य और पुरस्कार लें। गणक में सही वर्तमान संख्या भरने से कमी साफ दिखती है।']),
    p(['이번 주 목표 예시','Example weekly targets','Ejemplos de metas semanales','साप्ताहिक लक्ष्य उदाहरण'],[
      '영웅·장비: 주력 한 명의 다음 별 또는 필요한 장비 강화 구간 달성. 테크: 연맹 표창 핵심 노드나 주력 병종 목표 하나 완료. 탱크: 다음 개조 노드 또는 필요한 모듈 한 단계 완성. 수치는 계정마다 달라 획일적인 목표 레벨 대신 실제 보유량으로 정하세요.',
      'Heroes/equipment: reach one useful star or equipment milestone. Research: finish a key Alliance Recognition node or one main-troop target. Tank: complete the next mod node or a needed module tier. Set levels from your own stock rather than copying a universal account target.',
      'Héroes/equipo: una estrella o mejora útil. Investigación: un nodo clave de reconocimiento o un objetivo de tropas principales. Tanque: siguiente nodo o rango de módulo necesario. Ajusta niveles a tus reservas, no a una meta universal.',
      'नायक/उपकरण: एक उपयोगी सितारा या उपकरण चरण। शोध: गठबंधन सम्मान का जरूरी नोड या मुख्य सैनिक लक्ष्य। टैंक: अगला संशोधन नोड या जरूरी मॉड्यूल दर्जा। सब पर लागू स्तर की नकल नहीं, अपने भंडार से लक्ष्य तय करें।']),
    p(['전투 후에는 패배 원인 확인','Review why the battle was lost','Revisa por qué perdiste','युद्ध के बाद हार का कारण देखें'],[
      '동일한 편성·병력 조건에서 전투 보고서를 비교하세요. 피해 부족은 영웅 스킬·장비·공격 연구, 빨리 무너지는 문제는 역할 배치·생존 장비·방어/생명력·병력 상태부터 점검합니다. 상대 상성이나 시즌 저항력 차이도 있으므로 총전투력 숫자만으로 원인을 단정하지 마세요.',
      'Compare battle reports with the same lineup and troop conditions. For low damage, review skills, equipment and attack research; for early losses, review roles, survival equipment, defense/health and troop condition. Matchups and seasonal resistance also matter, so total power alone does not explain a defeat.',
      'Compara informes con la misma formación y tropas. Si falta daño, revisa habilidades, equipo e investigación de ataque; si caes pronto, roles, supervivencia, defensa/vida y tropas. Ventajas de tipo y resistencia estacional también influyen: el poder total no explica por sí solo una derrota.',
      'समान गठन और सैनिक स्थिति में रिपोर्ट तुलना करें। नुकसान कम हो तो कौशल, उपकरण और आक्रमण शोध देखें; जल्दी टूटें तो भूमिका, जीवित रहने वाला उपकरण, रक्षा/जीवन और सैनिक स्थिति देखें। मुकाबले का मेल और मौसमी प्रतिरोध भी मायने रखते हैं; केवल कुल शक्ति से हार का कारण न तय करें।']),
    p(['자주 하는 실수','Common mistakes','Errores frecuentes','आम गलतियाँ'],[
      '주력 확정 전 여러 영웅에 만능 조각 분산 / 장비를 4순위로 미루기 / 테크 선행 비용을 빼고 계산 / 탱크 레벨·개조·모듈·플러그인 혼동 / 총전투력만 보고 실제 장착과 출정 병력을 놓치는 행동을 피하세요. 막히면 1순위로 돌아가 현재 부대의 가장 큰 빈칸부터 채웁니다.',
      'Avoid spreading universal fragments before choosing a main squad, delaying equipment to fourth priority, ignoring research prerequisites, confusing the tank’s four systems, and overlooking equipped items or deployed troops while chasing total power. When stuck, return to priority one and fix the squad’s biggest gap.',
      'Evita repartir fragmentos sin grupo principal, dejar equipo para cuarto lugar, olvidar requisitos de investigación, confundir los cuatro sistemas del tanque o ignorar equipo y tropas por perseguir poder total. Si te atascas, vuelve a la primera prioridad y cubre la mayor carencia.',
      'मुख्य दल चुने बिना सार्वभौमिक टुकड़े बाँटना, उपकरण को चौथे क्रम में टालना, शोध पूर्वशर्त की लागत भूलना, टैंक की चार प्रणालियाँ मिलाना और कुल शक्ति के पीछे सही उपकरण या सैनिक भूलना—इनसे बचें। अटकें तो पहली प्राथमिकता पर लौटकर मुख्य दल की सबसे बड़ी कमी भरें।']),
  ]},
];
const copy={
 ko:{file:'전투력 성장 가이드',title:'전투력 올리는 순서',kicker:'성장 가이드',desc:'영웅·장비 → 테크 → 탱크, 주력 부대 집중 성장',summary:[{label:'1순위',value:'영웅 및 장비'},{label:'2순위',value:'테크'},{label:'3순위',value:'탱크'}],sourceNote:'우선순위는 NoVa 운영 지침에 맞춘 권장안입니다. 시스템 구분과 비용은 사이트 내 영웅·장비·연구·탱크 데이터 및 2026-10-26 확인한 Wild Hoggs 공개 화면을 참고했습니다. 고정 투자 비율이나 전 계정 공통 최적값은 제시하지 않습니다. 실제 게임 효과·해금 조건과 최신 연맹 공지를 우선하세요.'},
 en:{file:'Combat growth guide',title:'Combat Power Growth Order',kicker:'Growth guide',desc:'Heroes & equipment → research → tank',summary:[{label:'Priority 1',value:'Heroes & equipment'},{label:'Priority 2',value:'Research'},{label:'Priority 3',value:'Tank'}],sourceNote:'Priorities follow NoVa guidance. System distinctions and costs reference the local hero, equipment, research and tank data and Wild Hoggs screens checked on 2026-10-26. This is not a fixed spending ratio or a universal optimal build. Current game effects, unlocks and alliance notices take priority.'},
 es:{file:'Guía de crecimiento militar',title:'Orden para aumentar el poder',kicker:'Guía de crecimiento',desc:'Héroes y equipo → tecnología → tanque',summary:[{label:'Prioridad 1',value:'Héroes y equipo'},{label:'Prioridad 2',value:'Tecnología'},{label:'Prioridad 3',value:'Tanque'}],sourceNote:'Prioridades según NoVa. Sistemas y costes basados en datos locales de héroes, equipo, investigación y tanque, y pantallas de Wild Hoggs revisadas el 26-10-2026. No es una proporción fija de gasto ni una configuración óptima universal. Prevalecen efectos, requisitos y avisos actuales.'},
 hi:{file:'युद्ध शक्ति विकास गाइड',title:'युद्ध शक्ति बढ़ाने का क्रम',kicker:'विकास गाइड',desc:'नायक और उपकरण → अनुसंधान → टैंक',summary:[{label:'प्राथमिकता 1',value:'नायक और उपकरण'},{label:'प्राथमिकता 2',value:'अनुसंधान'},{label:'प्राथमिकता 3',value:'टैंक'}],sourceNote:'प्राथमिकता NoVa की सलाह है। प्रणाली और लागत स्थानीय नायक, उपकरण, शोध, टैंक डेटा तथा 2026-10-26 को देखे गए Wild Hoggs पृष्ठों पर आधारित हैं। यह तय खर्च अनुपात या सभी खातों का एक सर्वोत्तम विन्यास नहीं। वर्तमान गेम प्रभाव, खुलने की शर्त और गठबंधन सूचना पहले मानें।'},
};
export const powerGrowth=Object.fromEntries(languages.map(lang=>[lang,{...copy[lang],sections:chapters.map(ch=>({title:localized(ch.title,lang),intro:localized(ch.intro,lang),parts:ch.parts.map(item=>({title:localized(item.title,lang),text:localized(item.text,lang)}))}))}]));
