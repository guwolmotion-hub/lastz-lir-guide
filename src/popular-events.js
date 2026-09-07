const sources = {
  gacha: ['https://note.com/joyful_fairy8161/n/nd8ea6e27bf4f', 'https://lastzguides.com/gacha-go.html'],
  shooting: ['https://lastzwiki.com/en/events.html', 'https://www.reddit.com/r/LastZShooterRun/comments/1sk4glw/best_way_to_spend_diamonds/', 'https://ztools.co.uk/tools/event-cycle/'],
  discount: ['https://lastzguides.com/lucky-discounter.html', 'https://www.reddit.com/r/LastZShooterRun/comments/1rolzm3/last_z_lucky_discounter_best_18_draw_strategy/'],
  wheel: ['https://www.reddit.com/r/LastZShooterRun/comments/1u8h09m/lucky_wheel_event/', 'https://www.reddit.com/r/LastZShooterRun/comments/1uc9trf/wheel_game/'],
};

export const eventUi = {
  ko: { budget: '다이아 예산', rewards: '얻을 수 있는 보상', strategy: '참여 기준', sources: '확인 자료', source: '자료', checked: '자료 확인: 2026-09-06', note: '공개 플레이 자료를 정리한 참고치입니다. 서버·시즌별 가격과 보상은 현재 게임 화면을 우선하세요.', columns: ['참여 목표', '필요 다이아 / 조건'] },
  en: { budget: 'Diamond budget', rewards: 'Available rewards', strategy: 'Participation plan', sources: 'References', source: 'Source', checked: 'Reviewed: 2026-09-06', note: 'Based on public player references. Current in-game prices and rewards take priority for your server and season.', columns: ['Target', 'Diamonds / condition'] },
  es: { budget: 'Presupuesto de diamantes', rewards: 'Recompensas disponibles', strategy: 'Plan de participación', sources: 'Referencias', source: 'Fuente', checked: 'Revisado: 2026-09-06', note: 'Referencia basada en publicaciones de jugadores. Comprueba los precios y premios actuales de tu servidor y temporada.', columns: ['Objetivo', 'Diamantes / condición'] },
  hi: { budget: 'हीरों का बजट', rewards: 'मिलने वाले पुरस्कार', strategy: 'भागीदारी की योजना', sources: 'संदर्भ सामग्री', source: 'संदर्भ', checked: 'समीक्षा: 2026-09-06', note: 'यह सार्वजनिक खिलाड़ी विवरणों पर आधारित मार्गदर्शन है। अपने सर्वर और सीजन की मौजूदा कीमतों तथा पुरस्कारों को प्राथमिकता दें।', columns: ['लक्ष्य', 'हीरे / शर्त'] },
};

const copy = {
  ko: [
    {
      title: '행운의 흔들기',
      intro: '캡슐 뽑기로 열쇠를 모아 골드 렌치 등 차량 성장 재료를 얻는 이벤트입니다.',
      budget: [['무료 참여', '0 / 화면의 무료 횟수 사용'], ['추가 50회 예시', '5,000 / 5회 500 단가 기준'], ['추가 100회 예시', '10,000 / 같은 단가 기준']],
      rewards: ['주요 목표는 골드 렌치이며, 개조 도면과 상자 보상도 얻을 수 있습니다.', '공개 교환표에는 열쇠 300개로 렌치 70개를 받는 사례가 있습니다. 현재 교환표의 수량부터 대조하세요.'],
      strategy: ['위 금액은 뽑기 비용 계산이며 렌치 수량을 보장하는 금액이 아닙니다. 상자를 여는 데 추가 비용이 표시되면 별도로 계산하세요.', '무료 횟수를 먼저 쓰고 부족한 열쇠는 다음 회차로 모으는 방향을 권합니다. 1회 500으로 적힌 웹 글도 있으나 확인한 게임 캡처는 5회 500입니다.'],
    },
    {
      title: '사격장 보물찾기',
      intro: '탄환으로 과녁을 맞혀 라운드를 진행합니다. 장비가 부족한 신규 연맹원은 12라운드 보상을 먼저 확인하세요.',
      budget: [['이벤트 임무만 진행', '0 / 무료 탄환 획득'], ['탄환 100발 구매', '10,000 / 1발 100 기준'], ['12라운드 도달', '10,000으로 보장되지 않음']],
      rewards: ['12라운드의 S급 장비 상자가 대표 목표입니다. 라운드 선택 보상으로 에너지 코어·가속 등을 확인할 수 있습니다.'],
      strategy: ['무료 임무 탄환과 보유 탄환을 합쳐 판단하세요. 같은 10,000을 써도 당첨 순서에 따라 도달 라운드가 달라집니다.', '목표 보상을 받았다면 추가 소비를 멈추고 남은 탄환은 다음 회차에 활용하세요. 100발 구매 한도도 현재 상점에서 확인하세요.'],
    },
    {
      title: '행운할인 상점',
      intro: '쿠폰으로 할인율을 뽑고, 열린 상점에서 다이아로 물품을 구매합니다. 아래 금액은 쿠폰 가격이 아닌 물품 구매 예산입니다.',
      budget: [['9회 상점 방문 참고', '평균 약 20,000 / 여유분 포함 26,000–28,000'], ['18회 상점 방문 참고', '평균 약 41,000 / 여유분 포함 49,000–52,000'], ['적용 조건', '매 회차 경찰휘장+연료를 구매한 플레이어 추산']],
      rewards: ['경찰휘장, 연료, 건축·연구 가속 등을 구매할 수 있습니다. 휘장은 연구 진행에 필요한 만큼 우선 확보하세요.'],
      strategy: ['5·9·18·32번째의 90% 할인 보장 조건을 게임 규칙에서 확인하세요. 쿠폰과 구매용 다이아를 함께 준비해야 합니다.', 'Lir 기존 기준인 80% 이상 할인 우선 원칙을 적용하면 구매액이 달라집니다. 90% 할인에서 필요한 물품만 구매하는 예산과 위 추산을 혼동하지 마세요.', '전기 제외, 연료·휘장 예외 등 기존 연맹 구매 기준은 다른 상점 탭에 유지했습니다.'],
    },
    {
      title: '행운룰렛',
      intro: '원형 룰렛의 선택 보상과 누적 횟수 상자를 노리는 이벤트입니다. 캡슐 뽑기와 구분하세요.',
      budget: [['무료 참여', '0 / 지급된 무료 코인 사용'], ['20회 목표 계산', 'max(0, 20 − 무료·보유 횟수) × 게임 내 1회 단가'], ['조건부 계산 예시', '무료 7회·단가 500이면 13회 추가 = 6,500']],
      rewards: ['시즌에 따라 영웅 조각, 전용 무기 조각, 외장 모듈 등이 선택 보상으로 등장한 사례가 있습니다. 원하는 재료를 먼저 선택하세요.'],
      strategy: ['현재 회차의 다이아 단가는 공개 자료만으로 확정하지 못했습니다. 6,500은 단가 500을 가정한 계산 예시이지 확정 필요 금액이 아닙니다.', '20회 누적 상자를 목표로 삼는 플레이 사례가 있습니다. 누적 상자와 룰렛 최고 보상 당첨은 별개입니다.', '120회 내 최고 보상 보장이라는 후기 역시 같은 이벤트 기간의 규칙을 전제로 합니다. 게임 정보창 확인 없이 120회를 확정 목표로 잡지 마세요.'],
    },
  ],
  en: [
    {
      title: 'Gacha Go', intro: 'Collect keys from capsule draws to work toward Golden Wrenches and vehicle materials.',
      budget: [['Free attempts', '0 / use the displayed free allowance'], ['50 extra draws: example', '5,000 / at 500 per five draws'], ['100 extra draws: example', '10,000 / at the same rate']],
      rewards: ['Golden Wrenches are the main target; blueprints and chest rewards are also available.', 'One published exchange lists 70 wrenches for 300 keys. Compare it with your current exchange menu.'],
      strategy: ['These are draw costs, not guaranteed wrench yields. Budget separately for any chest-opening charge shown.', 'Use free attempts first and carry keys forward. Some articles say 500 per single draw; the inspected game screenshot shows 500 for five.'],
    },
    {
      title: 'Bullseye Booty', intro: 'Spend bullets to advance through targets. Check the round-12 reward when building your first equipment set.',
      budget: [['Event missions only', '0 / earn free bullets'], ['Buy 100 bullets', '10,000 / at 100 per bullet'], ['Reach round 12', 'Not guaranteed for 10,000']],
      rewards: ['The round-12 S-grade equipment box is a key target. Selectable round rewards can include Power Cores and speedups.'],
      strategy: ['Include mission bullets and saved ammunition. Random prize order means equal spending can produce different progress.', 'Stop at your target and retain unused bullets for another event. Check the current purchase limit.'],
    },
    {
      title: 'Lucky Discounter', intro: 'Coupons reveal a discount; diamonds buy stock in the resulting shop. These budgets cover purchases, not coupon costs.',
      budget: [['9 shop visits: reference', 'About 20,000 average / 26,000–28,000 with buffer'], ['18 shop visits: reference', 'About 41,000 average / 49,000–52,000 with buffer'], ['Assumption', 'Player estimate: buy badges and fuel at every visit']],
      rewards: ['Buy badges, fuel and construction/research speedups. Prioritize badges needed for your research.'],
      strategy: ['Check the guaranteed 90% discounts at draws 5, 9, 18 and 32. Prepare both coupons and purchase funds.', 'Lir prioritizes discounts of at least 80%. Buying only selected 90%-off items will cost differently from the estimates above.', 'Existing alliance exceptions for fuel and badges, and the electricity exclusion, remain in the shop tabs.'],
    },
    {
      title: 'Lucky Wheel', intro: 'A circular wheel with selectable rewards and cumulative-draw chests, distinct from the capsule event.',
      budget: [['Free participation', '0 / use awarded coins'], ['20-draw target', 'max(0, 20 − free/saved draws) × live unit price'], ['Conditional example', '7 free draws and a 500 rate: 13 extra = 6,500']],
      rewards: ['Player reports show hero fragments, exclusive weapon fragments and exterior modules as seasonal choices. Select the material you need first.'],
      strategy: ['The current diamond rate could not be verified publicly. The 6,500 example assumes a 500 rate; it is not a confirmed event price.', 'Some players target the 20-draw chest. This chest does not guarantee the wheel jackpot.', 'Reports of a jackpot within 120 draws refer to one event period. Verify your information panel before planning that target.'],
    },
  ],
  es: [
    {
      title: 'Sorteo de cápsulas', intro: 'Consigue llaves para obtener llaves doradas de mejora y materiales del vehículo.',
      budget: [['Intentos gratuitos', '0 / usa los que indique el juego'], ['Ejemplo: 50 intentos extra', '5,000 / a 500 por cinco intentos'], ['Ejemplo: 100 intentos extra', '10,000 / con la misma tarifa']],
      rewards: ['El objetivo principal son las llaves doradas de mejora; también hay planos y cofres.', 'Una tabla publicada ofrece 70 llaves de mejora por 300 llaves del evento. Comprueba el canje actual.'],
      strategy: ['El gasto calcula intentos, no una cantidad garantizada de materiales. Suma aparte cualquier coste para abrir cofres.', 'Usa primero los intentos gratis y conserva las llaves. Algunos artículos indican 500 por intento, pero la captura revisada muestra 500 por cinco.'],
    },
    {
      title: 'Tesoro del campo de tiro', intro: 'Usa balas para avanzar de ronda. Revisa el premio de la ronda 12 si todavía necesitas equipo.',
      budget: [['Solo misiones', '0 / consigue balas gratuitas'], ['Comprar 100 balas', '10,000 / a 100 por bala'], ['Llegar a la ronda 12', 'No está garantizado con 10,000']],
      rewards: ['La caja de equipo S de la ronda 12 es un objetivo importante. Los premios seleccionables incluyen núcleos de energía y aceleradores.'],
      strategy: ['Cuenta las balas de misiones y las guardadas. El azar cambia el avance conseguido con el mismo gasto.', 'Detente al obtener el premio deseado y guarda balas para otro evento. Comprueba el límite de compra actual.'],
    },
    {
      title: 'Tienda de descuentos', intro: 'Los cupones revelan descuentos; los diamantes pagan los productos. El presupuesto no incluye comprar cupones.',
      budget: [['Referencia: 9 visitas', 'Media de 20,000 / margen de 26,000–28,000'], ['Referencia: 18 visitas', 'Media de 41,000 / margen de 49,000–52,000'], ['Supuesto', 'Estimación de jugadores: insignias y combustible en cada visita']],
      rewards: ['Insignias, combustible y aceleradores de construcción o investigación. Prioriza las insignias que necesitas.'],
      strategy: ['Comprueba las garantías del 90% en los intentos 5, 9, 18 y 32. Reserva cupones y diamantes.', 'Lir prioriza descuentos del 80% o más. Comprar solo lo necesario al 90% no cuesta lo mismo que el plan estimado.', 'Las excepciones de combustible e insignias y la exclusión de electricidad siguen en las otras pestañas de tiendas.'],
    },
    {
      title: 'Ruleta de la suerte', intro: 'Ruleta circular con premios seleccionables y cofres por intentos acumulados. No es el sorteo de cápsulas.',
      budget: [['Participación gratuita', '0 / usa las monedas recibidas'], ['Objetivo: 20 intentos', 'max(0, 20 − intentos gratis/guardados) × tarifa actual'], ['Ejemplo condicional', '7 gratis y tarifa 500: 13 extra = 6,500']],
      rewards: ['Según la temporada, jugadores muestran fragmentos de héroes, armas exclusivas y módulos exteriores. Elige el material necesario.'],
      strategy: ['No se pudo verificar públicamente la tarifa actual. El ejemplo de 6,500 supone 500 por intento; no es un precio confirmado.', 'Algunos jugadores buscan el cofre de 20 intentos, que no garantiza el premio mayor.', 'Los testimonios de premio mayor antes de 120 intentos se refieren a un solo evento. Confirma esa regla en el juego antes de planificarlo.'],
    },
  ],
  hi: [
    {
      title: 'भाग्यशाली कैप्सूल', intro: 'कैप्सूल से चाबियां जमा करके सुनहरे रिंच और वाहन सामग्री प्राप्त करें।',
      budget: [['मुफ्त प्रयास', '0 / खेल में दिखाई गई मुफ्त संख्या'], ['50 अतिरिक्त प्रयास का उदाहरण', '5,000 / पांच प्रयास की कीमत 500 होने पर'], ['100 अतिरिक्त प्रयास का उदाहरण', '10,000 / उसी दर पर']],
      rewards: ['मुख्य लक्ष्य सुनहरे रिंच हैं। नक्शे और बक्सों के पुरस्कार भी मिलते हैं।', 'एक प्रकाशित विनिमय सूची में 300 चाबियों पर 70 रिंच हैं। अपनी मौजूदा सूची से मिलान करें।'],
      strategy: ['यह प्रयासों का खर्च है, निश्चित रिंच संख्या की गारंटी नहीं। बक्सा खोलने का अलग शुल्क हो तो उसे भी जोड़ें।', 'पहले मुफ्त प्रयास करें और चाबियां अगली बार के लिए बचाएं। कुछ लेखों में एक प्रयास की कीमत 500 है, लेकिन जांचे गए खेल चित्र में पांच प्रयास 500 के हैं।'],
    },
    {
      title: 'निशानेबाजी खजाना', intro: 'गोलियों से निशाना लगाकर अगले दौर तक पहुंचें। उपकरण चाहिए तो पहले दौर 12 का पुरस्कार देखें।',
      budget: [['केवल आयोजन के कार्य', '0 / मुफ्त गोलियां पाएं'], ['100 गोलियां खरीदें', '10,000 / प्रति गोली 100 की दर पर'], ['दौर 12 तक पहुंचना', '10,000 में निश्चित नहीं']],
      rewards: ['दौर 12 का S-श्रेणी उपकरण बक्सा मुख्य लक्ष्य है। चयन योग्य पुरस्कारों में ऊर्जा कोर और गति-वृद्धि भी हो सकती हैं।'],
      strategy: ['कार्य से मिली और पहले से बची गोलियां भी गिनें। पुरस्कार मिलने के यादृच्छिक क्रम से समान खर्च में प्रगति अलग हो सकती है।', 'लक्ष्य मिलने पर रुकें और बची गोलियां अगले आयोजन के लिए रखें। मौजूदा खरीद सीमा जांचें।'],
    },
    {
      title: 'भाग्यशाली छूट की दुकान', intro: 'कूपन से छूट निकलती है और हीरों से सामान खरीदा जाता है। नीचे सामान का बजट है, कूपन की कीमत नहीं।',
      budget: [['9 बार खरीदारी का संदर्भ', 'औसत लगभग 20,000 / अतिरिक्त गुंजाइश सहित 26,000–28,000'], ['18 बार खरीदारी का संदर्भ', 'औसत लगभग 41,000 / अतिरिक्त गुंजाइश सहित 49,000–52,000'], ['गणना की शर्त', 'खिलाड़ी अनुमान: हर बार पुलिस बैज और ईंधन खरीदना']],
      rewards: ['पुलिस बैज, ईंधन तथा निर्माण और शोध की गति-वृद्धि खरीद सकते हैं। आवश्यक शोध के बैज पहले लें।'],
      strategy: ['5वें, 9वें, 18वें और 32वें प्रयास की 90% छूट की गारंटी खेल में जांचें। कूपन और खरीद के हीरे दोनों बचाएं।', 'Lir में कम से कम 80% छूट को प्राथमिकता है। केवल जरूरी 90% छूट का सामान खरीदने का खर्च ऊपर के अनुमान से अलग होगा।', 'ईंधन व बैज के अपवाद और बिजली न खरीदने के पुराने नियम बाकी दुकान विषयों में मौजूद हैं।'],
    },
    {
      title: 'भाग्यशाली रूलेट', intro: 'गोल पहिए में चुने हुए पुरस्कार और कुल प्रयासों के बक्से मिलते हैं। इसे कैप्सूल आयोजन से अलग समझें।',
      budget: [['मुफ्त भागीदारी', '0 / मिले हुए सिक्के उपयोग करें'], ['20 प्रयास का लक्ष्य', '20 में से मुफ्त और बचे प्रयास घटाएं; शेष धनात्मक संख्या को मौजूदा दर से गुणा करें'], ['शर्त वाला उदाहरण', '7 मुफ्त और दर 500 हो तो 13 अतिरिक्त = 6,500']],
      rewards: ['सीजन के अनुसार नायक टुकड़े, विशेष हथियार टुकड़े और बाहरी मॉड्यूल देखे गए हैं। पहले जरूरी सामग्री चुनें।'],
      strategy: ['मौजूदा हीरा दर सार्वजनिक सामग्री से सत्यापित नहीं हुई। 6,500 का उदाहरण प्रति प्रयास 500 मानता है; यह निश्चित कीमत नहीं है।', 'कुछ खिलाड़ी 20 प्रयास का बक्सा लक्ष्य रखते हैं। इस बक्से से पहिए का सर्वोच्च पुरस्कार निश्चित नहीं होता।', '120 प्रयास में सर्वोच्च पुरस्कार की खिलाड़ी रिपोर्ट एक ही आयोजन अवधि की है। यह लक्ष्य रखने से पहले खेल के सूचना भाग में नियम जांचें।'],
    },
  ],
};

export const popularEvents = Object.fromEntries(Object.entries(copy).map(([lang, events]) => [lang, events.map((event, index) => ({ ...event, sources: sources[['gacha', 'shooting', 'discount', 'wheel'][index]] }))]));
