import { LanguageCode } from '@/types/cookie';

export interface UITranslations {
  gameTitle: string;
  gameSubtitle: string;
  score: string;
  streak: string;
  inventoryTitle: string;
  answerCompass: string;
  hintMagnifier: string;
  perDay: string;
  perHour: string;
  submit: string;
  nextQuestion: string;
  skipQuestion: string;
  correctAnswer: string;
  wrongAnswer: string;
  officialNameNotice: string;
  hint1Title: string;
  hint2Title: string;
  hint3Title: string;
  openHint2: string;
  unlockSpelling: string;
  classType: string;
  position: string;
  element: string;
  releaseYear: string;
  rarity: string;
  useHintItem: string;
  useAnswerItem: string;
  typeAnswerPlaceholder: string;
  cookie: string;
  starEarned: string;
  alreadyCleared: string;
  worldcupTitle: string;
  worldcupSubtitle: string;
  selectThisCookie: string;
  tournamentWinner: string;
  playAgain: string;
  speedQuizTitle: string;
  speedQuizSubtitle: string;
  timeLeft: string;
  comboCount: string;
  silhouetteTitle: string;
  silhouetteSubtitle: string;
  cookidleTitle: string;
  cookidleSubtitle: string;
  newsTitle: string;
  newsSubtitle: string;
  copyCoupon: string;
  copied: string;
  devsistersOfficial: string;
}

export const UI_TRANSLATIONS: Record<LanguageCode, UITranslations> = {
  ko: {
    gameTitle: '쿠키런: 킹덤 퀴즈',
    gameSubtitle: 'Cookie Run Kingdom Quiz Web',
    score: '점',
    streak: '연승',
    inventoryTitle: '보유 인벤토리 아이템',
    answerCompass: '정답 나침반',
    hintMagnifier: '힌트 돋보기',
    perDay: '하루 1개',
    perHour: '1시간 1개',
    submit: '제출',
    nextQuestion: '다음 문제 풀기',
    skipQuestion: '이 문제 건너뛰기',
    correctAnswer: '정답입니다!',
    wrongAnswer: '오답입니다!',
    officialNameNotice: '공식 명칭',
    hint1Title: '1단계 힌트: 대표 대사',
    hint2Title: '2단계 힌트: 유형 / 포지션 / 원소',
    hint3Title: '3단계 힌트: 초성 / 스펠링 힌트',
    openHint2: '2단계 힌트 열기 (70점 적용)',
    unlockSpelling: '3단계 스펠링/초성 힌트 열기 (40점 적용)',
    classType: '유형',
    position: '포지션',
    element: '원소 속성',
    releaseYear: '출시년도',
    rarity: '등급',
    useHintItem: '💡 힌트 돋보기 사용',
    useAnswerItem: '🔮 정답 나침반 사용',
    typeAnswerPlaceholder: '쿠키 이름을 입력하세요...',
    cookie: '쿠키',
    starEarned: '⭐ 난이도 별(★) 신규 획득!',
    alreadyCleared: '⭐ 이미 클리어한 난이도입니다 (별★ 획득 완료 - 중복 점수 0pt)',
    worldcupTitle: '쿠키 이상형 월드컵',
    worldcupSubtitle: '내 마음속 최애 쿠키 토너먼트',
    selectThisCookie: '이 쿠키 선택하기',
    tournamentWinner: '최종 우승 쿠키!',
    playAgain: '다시 도전하기',
    speedQuizTitle: '초성 타임어택 퀴즈',
    speedQuizSubtitle: '10초 스피드 초성 퀴즈',
    timeLeft: '남은 시간',
    comboCount: '연속 콤보',
    silhouetteTitle: '실루엣 그림자 퀴즈',
    silhouetteSubtitle: '외곽선 그림자로 맞추기',
    cookidleTitle: '쿠키들 (Cookidle)',
    cookidleSubtitle: 'Wordle 스타일 속성 추리',
    newsTitle: '왕국 소식 & 스페셜 쿠폰',
    newsSubtitle: '쿠키런 킹덤 최신 패치노트 및 쿠폰',
    copyCoupon: '복사',
    copied: '복사됨!',
    devsistersOfficial: '데브시스터즈 공식 쿠폰 등록'
  },
  en: {
    gameTitle: 'Cookie Run: Kingdom Quiz',
    gameSubtitle: 'Cookie Run Kingdom Quiz Web',
    score: 'pts',
    streak: 'Streak',
    inventoryTitle: 'Inventory Items',
    answerCompass: 'Answer Compass',
    hintMagnifier: 'Hint Glass',
    perDay: '1 per day',
    perHour: '1 per hour',
    submit: 'Submit',
    nextQuestion: 'Next Question',
    skipQuestion: 'Skip This Question',
    correctAnswer: 'Correct!',
    wrongAnswer: 'Wrong Answer!',
    officialNameNotice: 'Official Name',
    hint1Title: 'Hint 1: Official Quote',
    hint2Title: 'Hint 2: Class / Position / Element',
    hint3Title: 'Hint 3: Spelling Overview',
    openHint2: 'Unlock Hint 2 (70 pts)',
    unlockSpelling: 'Unlock Spelling Hint (40 pts)',
    classType: 'Class',
    position: 'Position',
    element: 'Element',
    releaseYear: 'Release Year',
    rarity: 'Rarity',
    useHintItem: '💡 Use Hint Glass',
    useAnswerItem: '🔮 Use Answer Compass',
    typeAnswerPlaceholder: 'Type Cookie Name (English)...',
    cookie: 'Cookie',
    starEarned: '⭐ New Difficulty Star(★) Earned!',
    alreadyCleared: '⭐ Difficulty Already Cleared (★ Earned - 0pt awarded)',
    worldcupTitle: 'Cookie Ideal World Cup',
    worldcupSubtitle: 'Favorite Cookie Tournament',
    selectThisCookie: 'Select This Cookie',
    tournamentWinner: 'Tournament Champion!',
    playAgain: 'Play Again',
    speedQuizTitle: 'Speed Spelling Quiz',
    speedQuizSubtitle: '10-Second Rapid Fire Quiz',
    timeLeft: 'Time Left',
    comboCount: 'Combo Streak',
    silhouetteTitle: 'Silhouette Quiz',
    silhouetteSubtitle: 'Guess by Shadow & Outline',
    cookidleTitle: 'Cookidle',
    cookidleSubtitle: 'Wordle-Style Attribute Deduction',
    newsTitle: 'Kingdom News & Special Coupons',
    newsSubtitle: 'Latest Patch Notes & Promo Codes',
    copyCoupon: 'Copy',
    copied: 'Copied!',
    devsistersOfficial: 'Devsisters Official Coupon Site'
  },
  es: {
    gameTitle: 'Cookie Run: Kingdom Cuestionario',
    gameSubtitle: 'Web de Cuestionario Cookie Run',
    score: 'pts',
    streak: 'Racha',
    inventoryTitle: 'Artículos de Inventario',
    answerCompass: 'Brújula de Respuesta',
    hintMagnifier: 'Lupa de Pista',
    perDay: '1 por día',
    perHour: '1 por hora',
    submit: 'Enviar',
    nextQuestion: 'Siguiente Pregunta',
    skipQuestion: 'Omitir Pregunta',
    correctAnswer: '¡Correcto!',
    wrongAnswer: '¡Respuesta Incorrecta!',
    officialNameNotice: 'Nombre Oficial',
    hint1Title: 'Pista 1: Cita Oficial',
    hint2Title: 'Pista 2: Clase / Posición / Elemento',
    hint3Title: 'Pista 3: Vista Previa de Ortografía',
    openHint2: 'Desbloquear Pista 2 (70 pts)',
    unlockSpelling: 'Desbloquear Ortografía (40 pts)',
    classType: 'Clase',
    position: 'Posición',
    element: 'Elemento',
    releaseYear: 'Año de Lanzamiento',
    rarity: 'Rareza',
    useHintItem: '💡 Usar Lupa de Pista',
    useAnswerItem: '🔮 Usar Brújula de Respuesta',
    typeAnswerPlaceholder: 'Escribe el nombre de la Galleta...',
    cookie: 'Galleta',
    starEarned: '⭐ ¡Nueva Estrella(★) de Dificultad Ganada!',
    alreadyCleared: '⭐ Dificultad Ya Completada (★ Ganada - 0pt otorgados)',
    worldcupTitle: 'Copa Mundial de Galletas',
    worldcupSubtitle: 'Torneo de Galletas Favoritas',
    selectThisCookie: 'Elegir esta Galleta',
    tournamentWinner: '¡Campeón del Torneo!',
    playAgain: 'Jugar de Nuevo',
    speedQuizTitle: 'Cuestionario de Velocidad',
    speedQuizSubtitle: 'Prueba Rápida de 10 Segundos',
    timeLeft: 'Tiempo Restante',
    comboCount: 'Racha Combo',
    silhouetteTitle: 'Cuestionario de Silueta',
    silhouetteSubtitle: 'Adivina por la Sombra',
    cookidleTitle: 'Cookidle',
    cookidleSubtitle: 'Deducción de Atributos Tipo Wordle',
    newsTitle: 'Noticias del Reino y Cupones',
    newsSubtitle: 'Últimas Notas de Parche y Códigos',
    copyCoupon: 'Copiar',
    copied: '¡Copiado!',
    devsistersOfficial: 'Sitio Oficial de Cupones Devsisters'
  },
  ja: {
    gameTitle: 'クッキーラン：キングダム クイズ',
    gameSubtitle: 'クッキーランキングダム クイズ Web',
    score: '点',
    streak: '連勝',
    inventoryTitle: '保有インベントリアイテム',
    answerCompass: '正解のコンパス',
    hintMagnifier: 'ヒントの虫眼鏡',
    perDay: '1日1個',
    perHour: '1時間1個',
    submit: '送信',
    nextQuestion: '次の問題へ',
    skipQuestion: 'この問題をスキップ',
    correctAnswer: '正解です！',
    wrongAnswer: '不正解です！',
    officialNameNotice: '公式名称',
    hint1Title: 'ヒント1：代表セリフ',
    hint2Title: 'ヒント2：タイプ / ポジション / 属性',
    hint3Title: 'ヒント3：スペル / イニシャルヒント',
    openHint2: 'ヒント2を開く (70点)',
    unlockSpelling: 'ヒント3を開く (40点)',
    classType: 'タイプ',
    position: 'ポジション',
    element: '属性',
    releaseYear: '登場年',
    rarity: 'レア度',
    useHintItem: '💡 ヒント虫眼鏡を使用',
    useAnswerItem: '🔮 正解コンパスを使用',
    typeAnswerPlaceholder: 'クッキーの名前を入力...',
    cookie: 'クッキー',
    starEarned: '⭐ 難易度スター(★)を新規獲得！',
    alreadyCleared: '⭐ 既にクリア済みの難易度です (★獲得済み - 重複点数 0点)',
    worldcupTitle: 'クッキー理想形ワールドカップ',
    worldcupSubtitle: '推しクッキー トーナメント',
    selectThisCookie: 'このクッキーを選択',
    tournamentWinner: '最終優勝クッキー！',
    playAgain: 'もう一度挑戦',
    speedQuizTitle: 'スピードクイズ',
    speedQuizSubtitle: '10秒 スピードクイズ',
    timeLeft: '残り時間',
    comboCount: '連続コンボ',
    silhouetteTitle: 'シルエットクイズ',
    silhouetteSubtitle: '影と輪郭で当てる',
    cookidleTitle: 'クックドル (Cookidle)',
    cookidleSubtitle: 'Wordle風 属性推測クイズ',
    newsTitle: '王国ニュース ＆ クーポン',
    newsSubtitle: '最新アプデ情報 ＆ 特典コード',
    copyCoupon: 'コピー',
    copied: 'コピー完了！',
    devsistersOfficial: 'Devsisters 公式クーポン登録'
  }
};
