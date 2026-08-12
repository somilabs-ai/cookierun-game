import { CookieData } from '@/types/cookie';
import { extractInitialConsonants } from '@/lib/hangul';

const RAW_COOKIES_DATA = [
  {
    id: 'pure_vanilla',
    name: {
      ko: '퓨어바닐라 쿠키',
      en: 'Pure Vanilla Cookie',
      es: 'Galleta de Vainilla Pura',
      ja: 'ピュアバニラ味クッキー'
    },
    quote: {
      ko: '평화가 모두와 함께하길...',
      en: 'May peace be with us all...',
      es: 'Que la paz esté con todos nosotros...',
      ja: '平和が皆と共にありますように…'
    },
    skillName: {
      ko: '사랑과 평화의 구원',
      en: 'Blessing of Peace',
      es: 'Bendición de Paz',
      ja: '愛と平和の救이'
    },
    skillDescription: {
      ko: '바닐라 지팡이로 거대한 바닐라 봉오리를 불러내어 아군의 체력을 회복시키고 보호막을 생성합니다.',
      en: 'Summons a giant vanilla flower to heal allies and grant shields.',
      es: 'Invoca una gran flor de vainilla para curar a los aliados y otorgar escudos.',
      ja: 'バニラの花を召喚して味方を回復しシールドを付与します。'
    },
    rarity: 'ANCIENT',
    classType: '회복형',
    position: '후방',
    element: '빛',
    releaseYear: 2021,
    imageUrl: '/images/cookies/pure_vanilla.png',
    color: '#FDFD96',
    aliases: ['퓨어바닐라', '퓨어 바닐라', 'pure vanilla', 'pure vanilla cookie', 'galleta de vainilla pura', '구원의 퓨어바닐라', '각성 퓨어바닐라'],
    awakening: {
      name: {
        ko: '구원의 퓨어바닐라 쿠키',
        en: 'Savior Pure Vanilla Cookie',
        es: 'Galleta de Vainilla Pura Salvador',
        ja: '救いのピュアバニラ味クッキー'
      },
      title: {
        ko: '구원의 빛 (각성)',
        en: 'Light of Salvation (Awakened)',
        es: 'Luz de Salvación (Despertado)',
        ja: '救いの光（覚醒）'
      },
      quote: {
        ko: '진실된 마음으로 모두에게 따뜻한 평화를 선물하겠어요.',
        en: 'With a sincere heart, I shall grant warm peace to everyone.',
        es: 'Con un corazón sincero, otorgaré una paz cálida a todos.',
        ja: '真実の心で皆に warm 平和を贈ります。'
      },
      skillName: {
        ko: '구원의 바닐라 축복',
        en: 'Vanilla Blessing of Salvation',
        es: 'Bendición de Vainilla de Salvación',
        ja: '救いのバニラ祝福'
      },
      lore: {
        ko: '✨ [각성 쿠키 데이터] 퓨어바닐라 쿠키의 구원과 희망의 마력이 각성하여 아군에게 진실된 보호막과 회복을 선사합니다.',
        en: '✨ [Awakened Cookie] Pure Vanilla Cookie’s magic of salvation has awakened to grant ultimate shields and healing to allies.',
        es: '✨ [Galleta Despertada] ¡La magia de salvación de Galleta de Vainilla Pura despierta!',
        ja: '✨ [覚醒クッキー] ピュアバニラ味クッキーの救いと希望の魔力が覚醒！'
      }
    }
  },
  {
    id: 'dark_cacao',
    name: {
      ko: '다크카카오 쿠키',
      en: 'Dark Cacao Cookie',
      es: 'Galleta de Cacao Oscuro',
      ja: 'ダークカカオ味クッキー'
    },
    quote: {
      ko: '나의 검은 흔들리지 않는다!',
      en: 'My blade shall not falter!',
      es: '¡Mi espada no vacilará!',
      ja: '我が剣は揺るぎない！'
    },
    skillName: {
      ko: '기사의 결의',
      en: 'Cacao Slash',
      es: 'Corte de Cacao',
      ja: '騎士の決意'
    },
    skillDescription: {
      ko: '흑염 대검을 휘둘러 적의 방어력을 약화시키고 강력한 암흑 베기 공격을 퍼붓습니다.',
      en: 'Swings the Grapejam Chocoblade to reduce enemy DEF and deliver dark strikes.',
      es: 'Empuña su gran espada para reducir la DEF enemiga y lanzar ataques oscuros.',
      ja: '大剣を振り回し敵の防御力を下げ暗黒斬撃を繰り出します。'
    },
    rarity: 'ANCIENT',
    classType: '돌격형',
    position: '전방',
    element: '어둠',
    releaseYear: 2022,
    imageUrl: '/images/cookies/dark_cacao.png',
    color: '#362228',
    aliases: ['다크카카오', '다크 카카오', 'dark cacao', 'dark cacao cookie', '용군주 다크카카오', '각성 다크카카오', '용군주 다크카카오 쿠키'],
    awakening: {
      name: {
        ko: '용군주 다크카카오 쿠키',
        en: 'Dragon Lord Dark Cacao Cookie',
        es: 'Galleta de Cacao Oscuro Señor Dragón',
        ja: '龍君主ダークカカオ味クッキー'
      },
      title: {
        ko: '용군주 (각성 1단계)',
        en: 'Dragon Lord (Awakened Tier 1)',
        es: 'Señor Dragón (Despertado)',
        ja: '龍君主（覚醒）'
      },
      quote: {
        ko: '드래곤의 검과 흑염으로 내 백성을 수호하리라!',
        en: 'With dragon’s blade and dark flame, I shall protect my realm!',
        es: '¡Con la espada del dragón y la llama oscura, protegeré a mi reino!',
        ja: 'ドラゴンの剣と黒炎で我が民を守る！'
      },
      skillName: {
        ko: '용의 분노와 결의',
        en: 'Dragon’s Fury & Resolve',
        es: 'Furia y Resolución del Dragón',
        ja: '竜の怒りと決意'
      },
      lore: {
        ko: '🐉 [각성 쿠키 데이터] 다크카카오 쿠키가 용족의 힘을 받아 각성한 모습인 "용군주 다크카카오 쿠키"! 흑용의 힘으로 한층 더 강렬해진 고대의 수호자입니다.',
        en: '🐉 [Awakened Cookie] Dark Cacao Cookie awakened with dragon lord powers to become Dragon Lord Dark Cacao Cookie!',
        es: '🐉 [Galleta Despertada] ¡Galleta de Cacao Oscuro despierta con el poder de los señores dragón!',
        ja: '🐉 [覚醒クッキー] ダークカカオ味クッキーがドラゴンの力を受けて覚醒した「龍君主ダークカカオ味クッキー」！'
      }
    }
  },
  {
    id: 'hollyberry',
    name: {
      ko: '홀리베리 쿠키',
      en: 'Hollyberry Cookie',
      es: 'Galleta de Acebo',
      ja: 'ホーリーベリー味クッキー'
    },
    quote: {
      ko: '승리의 축배를 들자!',
      en: 'A toast to victory!',
      es: '¡Un brindis por la victoria!',
      ja: '勝利の乾杯をしよう！'
    },
    skillName: {
      ko: '방패 돌격',
      en: 'Oath on the Shield',
      es: 'Juramento sobre el Escudo',
      ja: '盾の突撃'
    },
    skillDescription: {
      ko: '거대한 홀리베리 방패로 아군의 피해를 흡수하고 적진으로 돌진하여 넉백시킵니다.',
      en: 'Absorbs team damage with a massive shield and charges forward to knock back foes.',
      es: 'Absorbe el daño de los aliados con su escudo y embiste hacia adelante.',
      ja: '巨大な盾で味方のダメージを吸収し敵陣へ突撃します。'
    },
    rarity: 'ANCIENT',
    classType: '방어형',
    position: '전방',
    element: '대지',
    releaseYear: 2021,
    imageUrl: '/images/cookies/hollyberry.png',
    color: '#FF6B81',
    aliases: ['홀리베리', 'hollyberry', 'hollyberry cookie']
  },
  {
    id: 'gold_cheese',
    name: {
      ko: '골드치즈 쿠키',
      en: 'Golden Cheese Cookie',
      es: 'Galleta de Queso Dorado',
      ja: 'ゴールデンチーズ味クッキー'
    },
    quote: {
      ko: '풍요로운 황금 왕국을 위하여!',
      en: 'For the glory of the Golden Kingdom!',
      es: '¡Por la gloria del Reino Dorado!',
      ja: '黄金の王国の為に！'
    },
    skillName: {
      ko: '황금 창의 세례',
      en: 'Brilliance of the Absolute',
      es: 'Brillo Absoluto',
      ja: '黄金の槍の洗礼'
    },
    skillDescription: {
      ko: '황금 날개를 펼쳐 적 전체에 황금 창을 연사하고 부활 능력을 보유합니다.',
      en: 'Spreads golden wings to fire radiant spears at enemies and possesses revive abilities.',
      es: 'Despliega alas doradas para disparar lanzas radiantes y resucita al caer.',
      ja: '黄金の羽を広げ敵全体に槍を連射し復活能力を持ちます。'
    },
    rarity: 'ANCIENT',
    classType: '사격형',
    position: '중앙',
    element: '빛',
    releaseYear: 2023,
    imageUrl: '/images/cookies/gold_cheese.png',
    color: '#FFD700',
    aliases: ['골드치즈', 'golden cheese', 'golden cheese cookie']
  },
  {
    id: 'white_lily',
    name: {
      ko: '세인트릴리 쿠키',
      en: 'White Lily Cookie',
      es: 'Galleta de Lirio Blanco',
      ja: 'セイントリリィ味クッキー'
    },
    quote: {
      ko: '진실의 백합 꽃이 피어납니다.',
      en: 'The lilies of truth shall bloom.',
      es: 'Los lirios de la verdad florecerán.',
      ja: '真実のリリィが咲き誇ります。'
    },
    skillName: {
      ko: '백합의 구원',
      en: 'Lily Lily Bloom',
      es: 'Florecer del Lirio',
      ja: '百合の救い'
    },
    skillDescription: {
      ko: '백합 덩굴로 적을 속박하고 피어나는 백합 폭발로 광역 피해와 정화 효과를 부여합니다.',
      en: 'Entangles enemies in lily vines and bursts into a purifying area-of-effect blast.',
      es: 'Enreda a los enemigos en enredaderas de lirio y detona un estallido purificador.',
      ja: '百合のツタで敵を束縛し爆発で広範囲ダメージと浄化を与えます。'
    },
    rarity: 'ANCIENT',
    classType: '폭발형',
    position: '중앙',
    element: '자연',
    releaseYear: 2024,
    imageUrl: '/images/cookies/white_lily.png',
    color: '#E0EEEC',
    aliases: ['세인트릴리', '세인트 릴리', '화이트릴리', '화이트 릴리', '화이트릴리 쿠키', 'white lily', 'white lily cookie'],
    easterEggLore: {
      ko: "🌸 [쿠키런 덕후 이스터에그!] White Lily Cookie의 한국 공식 명칭은 '세인트릴리 쿠키'입니다! (영문: White Lily Cookie | 한글: 세인트릴리 쿠키) 고대 5영웅 중 한 명이자 쿠키 데카메론에 기록된 성스러운 백합의 영웅!",
      en: "🌸 [Otaku Lore Easter Egg!] White Lily Cookie is officially named '세인트릴리 쿠키' (Saint Lily Cookie) in the Korean version of Cookie Run Kingdom!",
      es: "🌸 [¡Huevo de Pascua Otaku!] ¡White Lily Cookie se llama oficialmente '세인트릴리 쿠키' (Galleta de Lirio de San Lily) en la versión coreana!",
      ja: "🌸 [オタクイースターエッグ！] White Lily Cookieの韓国語公式名称は'세인트릴리 쿠키'（セイントリリィ味クッキー）です！"
    }
  },
  {
    id: 'sea_fairy',
    name: {
      ko: '바다요정 쿠키',
      en: 'Sea Fairy Cookie',
      es: 'Galleta Hada del Mar',
      ja: '海の妖精味クッキー'
    },
    quote: {
      ko: '솟구쳐오르는 파도가 느껴집니다!',
      en: 'The surging waves call to me!',
      es: '¡Las olas emergentes me llaman!',
      ja: '波の音が高鳴ります！'
    },
    skillName: {
      ko: '솟구치는 마음',
      en: 'Soaring Waters',
      es: 'Aguas Elevadas',
      ja: '湧き上がる心'
    },
    skillDescription: {
      ko: '푸른 물기둥을 기습적으로 솟구치게 하여 다수의 적을 기절시키고 폭발적인 물 피해를 줍니다.',
      en: 'Summons surging pillars of water to stun multiple enemies and inflict heavy water damage.',
      es: 'Invoca pilares de agua para aturdir a los enemigos y causar gran daño de agua.',
      ja: '水柱を沸き立たせ敵を気絶させ爆発的な水ダメージを与えます。'
    },
    rarity: 'LEGENDARY',
    classType: '폭발형',
    position: '중앙',
    element: '물',
    releaseYear: 2021,
    imageUrl: '/images/cookies/sea_fairy.png',
    color: '#00BFFF',
    aliases: ['바다요정', 'sea fairy', 'sea fairy cookie']
  },
  {
    id: 'moonlight',
    name: {
      ko: '달빛술사 쿠키',
      en: 'Moonlight Cookie',
      es: 'Galleta Luz de Luna',
      ja: 'ムーンライト魔術師味クッキー'
    },
    quote: {
      ko: '밤하늘의 은은한 꿈속으로...',
      en: 'Into the gentle starlit dream...',
      es: 'En el suave sueño estrellado...',
      ja: '夜空の夢の中へ…'
    },
    skillName: {
      ko: '밤하늘의 위로',
      en: 'Dream of the Night Sky',
      es: 'Sueño del Cielo Nocturno',
      ja: '夜空の慰め'
    },
    skillDescription: {
      ko: '초승달을 타고 밤하늘로 올라가 별빛 낙하를 내리고 적들에게 수면 디버프를 겁니다.',
      en: 'Rides a crescent moon into the night sky to rain starlight and put enemies to Sleep.',
      es: 'Viaja en la luna creciente para hacer llover estrellas e inducir el Sueño.',
      ja: '三日月に乗り星くずを降らせ敵に睡眠デバフを与えます。'
    },
    rarity: 'LEGENDARY',
    classType: '마법형',
    position: '중앙',
    element: '빛',
    releaseYear: 2023,
    imageUrl: '/images/cookies/moonlight.png',
    color: '#8A2BE2',
    aliases: ['달빛술사', 'moonlight', 'moonlight cookie']
  },
  {
    id: 'frost_queen',
    name: {
      ko: '서리여왕 쿠키',
      en: 'Frost Queen Cookie',
      es: 'Galleta Reina Escarcha',
      ja: 'フロストクィーン味クッキー'
    },
    quote: {
      ko: '차가운 서리의 성으로 오너라.',
      en: 'Step into my realm of endless frost.',
      es: 'Entra a mi reino de helada eterna.',
      ja: '冷たい霜の城へ来なさい。'
    },
    skillName: {
      ko: '빙화의 폭풍',
      en: 'Freezing Squall',
      es: 'Tormenta Congelante',
      ja: '氷花の嵐'
    },
    skillDescription: {
      ko: '전장에 서리 폭풍을 일으켜 적들을 빙결 상태로 만들고 빙결 해제 시 치명적인 해제 피해를 줍니다.',
      en: 'Creates a freezing blizzard to freeze enemies and deal devastating thaw damage.',
      es: 'Crea una ventisca helada para congelar enemigos y causar gran daño.',
      ja: '吹雪を起こし敵を氷結させ氷結解除時に致命的なダメージを与えます。'
    },
    rarity: 'LEGENDARY',
    classType: '마법형',
    position: '중앙',
    element: '얼음',
    releaseYear: 2021,
    imageUrl: '/images/cookies/frost_queen.png',
    color: '#ADD8E6',
    aliases: ['서리여왕', 'frost queen', 'frost queen cookie']
  },
  {
    id: 'shadow_milk',
    name: {
      ko: '섀도우밀크 쿠키',
      en: 'Shadow Milk Cookie',
      es: 'Galleta Leche Sombra',
      ja: 'シャドウミルク味クッキー'
    },
    quote: {
      ko: '진실은 무대 뒤에 숨어있는 법이지...',
      en: 'The truth always lurks behind the stage...',
      es: 'La verdad siempre se esconde tras el escenario...',
      ja: '真実は舞台の裏に隠れているものさ…'
    },
    skillName: {
      ko: '기만의 연극',
      en: 'Deceptive Play',
      es: 'Obra Engañosa',
      ja: '欺瞞の演劇'
    },
    skillDescription: {
      ko: '무대 조명을 밝히며 적에게 환각 환영을 심고 지속적인 지옥 피해와 혼란을 야기합니다.',
      en: 'Illuminates stage spotlights to induce hallucinations and inflict confusion.',
      es: 'Ilumina focos de escenario para causar alucinaciones y confusión.',
      ja: 'スポットライトを当て敵に幻覚と混乱を引き起こします。'
    },
    rarity: 'BEAST',
    classType: '마법형',
    position: '중앙',
    element: '어둠',
    releaseYear: 2024,
    imageUrl: '/images/cookies/shadow_milk.png',
    color: '#4B0082',
    aliases: ['쉐도우밀크 쿠키', '쉐도우밀크', '섀도우밀크', '섀도우 밀크', 'shadow milk', 'shadow milk cookie'],
    easterEggLore: {
      ko: "🎭 [쿠키런 덕후 이스터에그!] 비스트 쿠키 첫 타자! '진실은 무대 뒤에 숨어있는 법이지...' 명대사 및 오디션 오페라 연기로 쿠키런 킹덤 덕후들의 가슴을 떨리게 만든 락스타급 광기의 군주!",
      en: "🎭 [Otaku Lore Easter Egg!] The Lord of Deceit! Infamous for his dramatic theatrical monologue 'The truth always lurks behind the stage...'!",
      es: "🎭 [¡Huevo de Pascua Otaku!] ¡El Señor del Engaño con su frase icónica del teatro!",
      ja: "🎭 [オタクイースターエッグ！] 欺瞞の君主！「真実は舞台の裏に隠れているものさ…」の名セリフで話題を呼んだ大人気ビーストクッキー！"
    }
  },
  {
    id: 'espresso',
    name: {
      ko: '에스프레소맛 쿠키',
      en: 'Espresso Cookie',
      es: 'Galleta de Café Expreso',
      ja: 'エスプレッソ味クッキー'
    },
    quote: {
      ko: '커피 향 그윽한 정교한 마법을 보여드리죠.',
      en: 'Allow me to demonstrate precise coffee magic.',
      es: 'Permíteme demostrar magia de café precisa.',
      ja: 'コーヒー香る精密な魔法をお見せしましょう。'
    },
    skillName: {
      ko: '마법응축 폭발',
      en: 'Grind',
      es: 'Molienda',
      ja: '魔法凝縮爆発'
    },
    skillDescription: {
      ko: '거대한 커피 마법진을 생성하여 가운데로 적을 끌어당긴 후 폭발적인 다단히트 피해를 줍니다.',
      en: 'Creates a coffee vortex to pull in enemies and detonate multihit magic explosions.',
      es: 'Crea un vórtice de café para atraer a los enemigos y detonar explosiones.',
      ja: '魔法陣を生成し敵を引き寄せ爆발的な多段ヒットダメージを与えます。'
    },
    rarity: 'EPIC',
    classType: '마법형',
    position: '중앙',
    element: '무속성',
    releaseYear: 2021,
    imageUrl: '/images/cookies/espresso.png',
    color: '#6F4E37',
    aliases: ['에스프레소', 'espresso', 'espresso cookie']
  },
  {
    id: 'vampire',
    name: {
      ko: '뱀파이어맛 쿠키',
      en: 'Vampire Cookie',
      es: 'Galleta Vampiro',
      ja: 'ヴァンパイア味クッキー'
    },
    quote: {
      ko: '달콤한 포도주스 한 잔 하고 가실래요?',
      en: 'Fancy a glass of sweet grape juice?',
      es: '¿Te apetece una copa de dulce jugo de uva?',
      ja: '甘いブドウジュースを一杯いかが？'
    },
    skillName: {
      ko: '박쥐 변신',
      en: 'Vampiric Bite',
      es: 'Mordisco Vampírico',
      ja: 'コウモリ変身'
    },
    skillDescription: {
      ko: '가장 뒤에 있는 적에게 박쥐로 변신해 덮쳐 치명적인 단일 흡혈 피해를 입힙니다.',
      en: 'Turns into a bat to swoop down on the rearmost foe, dealing lifesteal damage.',
      es: 'Se transforma en murciélago para atacar al enemigo trasero y robar vida.',
      ja: 'コウモリに変身し最後尾の敵を襲い吸血ダメージを与えます。'
    },
    rarity: 'EPIC',
    classType: '침투형',
    position: '후방',
    element: '무속성',
    releaseYear: 2021,
    imageUrl: '/images/cookies/vampire.png',
    color: '#800020',
    aliases: ['뱀파이어', 'vampire', 'vampire cookie']
  },
  {
    id: 'gingerbrave',
    name: {
      ko: '용감한 쿠키',
      en: 'GingerBrave',
      es: 'Galleta Valiente',
      ja: '勇者味クッキー'
    },
    quote: {
      ko: '나를 따라와! 탈출의 시작이다!',
      en: 'Follow me! The escape begins now!',
      es: '¡Sígueme! ¡El escape comienza ahora!',
      ja: '僕についてきて！脱出の始まりだ！'
    },
    skillName: {
      ko: '용감한 돌격',
      en: 'Brave Dash',
      es: 'Embestida Valiente',
      ja: '勇気ある突撃'
    },
    skillDescription: {
      ko: '사탕목걸이를 쥐고 전방으로 몸을 던져 최전방의 적들을 에어본시키고 밀쳐냅니다.',
      en: 'Dashes forward bravely to knock back frontmost enemies.',
      es: 'Embiste hacia adelante con valentía para empujar a los enemigos delanteros.',
      ja: 'キャンディネックレスを握り前方の敵を叩きつけます。'
    },
    rarity: 'COMMON',
    classType: '돌격형',
    position: '전방',
    element: '무속성',
    releaseYear: 2021,
    imageUrl: '/images/cookies/gingerbrave.png',
    color: '#D2691E',
    aliases: ['용쿠', '용감한쿠키', 'gingerbrave', 'ginger brave']
  },
  {
    id: 'strawberry',
    name: {
      ko: '딸기맛 쿠키',
      en: 'Strawberry Cookie',
      es: 'Galleta de Fresa',
      ja: 'イチゴ味クッキー'
    },
    quote: {
      ko: '수줍지만 아군을 위해 열심히 방어할게요!',
      en: 'I-I will do my best to protect everyone!',
      es: '¡H-haré todo lo posible para proteger a todos!',
      ja: '人見知りだけど皆の為に頑張ります！'
    },
    skillName: {
      ko: '딸기 롤리팝 회전',
      en: 'Lollipop Spin',
      es: 'Giro de Paleta',
      ja: 'ストロベリーポップ回転'
    },
    skillDescription: {
      ko: '큰 딸기 사탕을 빙글빙글 돌려 주변 적에게 피해를 주고 자신의 방어력을 증가시킵니다.',
      en: 'Spins a giant strawberry lollipop to damage foes and boost own DEF.',
      es: 'Gira una gran paleta de fresa para dañar enemigos y aumentar su DEF.',
      ja: '大きな苺キャンディを回転させ周囲の敵を攻撃しDEFを上げます。'
    },
    rarity: 'COMMON',
    classType: '방어형',
    position: '전방',
    element: '무속성',
    releaseYear: 2021,
    imageUrl: '/images/cookies/strawberry.png',
    color: '#FFB6C1',
    aliases: ['딸기맛', 'strawberry', 'strawberry cookie']
  },
  {
    id: 'shadow_milk',
    name: {
      ko: '쉐도우밀크 쿠키',
      en: 'Shadow Milk Cookie',
      es: 'Galleta de Leche Sombría',
      ja: 'シャドーミルク味クッキー'
    },
    quote: {
      ko: '거짓과 환상의 연극에 오신 것을 환영합니다!',
      en: 'Welcome to the theater of lies and illusions!',
      es: '¡Bienvenidos al teatro de mentiras e ilusiones!',
      ja: '嘘と幻の劇へようこそ！'
    },
    skillName: {
      ko: '기만의 희극',
      en: 'Deceitful Comedy',
      es: 'Comedia del Engaño',
      ja: '欺瞞の喜劇'
    },
    skillDescription: {
      ko: '환영 인형극을 펼쳐 적의 정신을 혼란에 빠뜨리고 신비로운 거짓의 파동을 일으킵니다.',
      en: 'Performs a puppet show of illusions to confuse enemies with waves of deceit.',
      es: 'Realiza un espectáculo de marionetas para confundir a los enemigos.',
      ja: '幻影の傀儡劇を繰り広げ、敵の精神を混乱させます。'
    },
    rarity: 'WITCH',
    classType: '마법형',
    position: '중앙',
    element: '어둠',
    releaseYear: 2024,
    imageUrl: '/images/cookies/pure_vanilla.png',
    color: '#4B0082',
    aliases: ['쉐도우밀크', '섀도우밀크', '섀도우 밀크', 'shadow milk', 'shadow milk cookie'],
    easterEggLore: {
      ko: '🔮 [마녀 등급 쿠키] 쿠키런: 킹덤의 최상위 마법 신 등급인 WITCH(마녀) 등급 쿠키입니다! 거짓과 심연을 관장하는 비스트이자 마녀 등급의 강자!',
      en: '🔮 [WITCH Grade Cookie] Belongs to the supreme WITCH rarity class in Cookie Run Kingdom!',
      es: '🔮 [Galleta de Rango Bruja] ¡Pertenece a la clase de rareza suprema WITCH!',
      ja: '🔮 [魔女級クッキー] クッキーラン：キングダムの最高峰WITCH（魔女）等級クッキーです！'
    }
  },
  {
    id: 'supreme_witch',
    name: {
      ko: '태초의 마녀',
      en: 'The Primordial Witch',
      es: 'La Bruja Primordial',
      ja: '太古の魔女'
    },
    quote: {
      ko: '쿠키들에게 생명의 불꽃을 불어넣은 자...',
      en: 'The one who breathed life into all cookies...',
      es: 'Aquella que dio vida a todas las galletas...',
      ja: 'クッキーたちに生命の炎を吹き込んだ者…'
    },
    skillName: {
      ko: '오븐의 마녀 연금술',
      en: 'Witch Alchemy of the Oven',
      es: 'Alquimia de la Bruja del Horno',
      ja: '魔女のオーブン錬金術'
    },
    skillDescription: {
      ko: '태초의 오븐 불꽃을 일으켜 모든 쿠키의 마력을 증폭시키고 신비로운 마녀 마법을 시전합니다.',
      en: 'Ignites the primordial oven flame to amplify power and cast mystic witch magic.',
      es: 'Enciende la llama del horno primordial para amplificar el poder.',
      ja: '太古のオーブンの炎を燃え wild 魔法を唱えます。'
    },
    rarity: 'WITCH',
    classType: '지원형',
    position: '후방',
    element: '어둠',
    releaseYear: 2024,
    imageUrl: '/images/cookies/white_lily.png',
    color: '#8A2BE2',
    aliases: ['마녀', '마녀쿠키', '태초의마녀', 'witch', 'witch cookie', 'primordial witch'],
    easterEggLore: {
      ko: '🧙‍♀️ [마녀 등급 쿠키] 쿠키런 세계관의 기원이자 오븐 속에서 쿠키들을 최초로 창조한 최상위 WITCH(마녀) 등급 신적 존재!',
      en: '🧙‍♀️ [WITCH Grade Cookie] The origin of the Cookie Run universe who baked all cookies in the oven!',
      es: '🧙‍♀️ [Galleta de Rango Bruja] ¡El origen del universo de Cookie Run!',
      ja: '🧙‍♀️ [魔女級クッキー] クッキーラン世界観の起源でありオーブンでクッキーたちを創造した最高峰WITCH等級！'
    }
  }
];

export const COOKIES_DATA: CookieData[] = RAW_COOKIES_DATA.map((c) => ({
  ...c,
  rarity: c.rarity as CookieData['rarity'],
  classType: c.classType as CookieData['classType'],
  position: c.position as CookieData['position'],
  element: c.element as CookieData['element'],
  initialConsonants: extractInitialConsonants(c.name.ko)
}));
