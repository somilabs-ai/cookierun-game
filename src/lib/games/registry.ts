import { GameModeConfig, GameModeId } from '@/types/cookie';

export const GAME_MODES: GameModeConfig[] = [
  {
    id: 'mode-3-quote',
    title: '대사 & 스킬 퀴즈',
    subtitle: '명대사과 스킬 설명으로 맞추기',
    badge: '🌟 메인 게임',
    iconName: 'MessageSquareQuote',
    isMain: true,
    description: '쿠키의 명대사, 스킬 설명, 초성 힌트를 단계별로 오픈하며 정답 쿠키를 맞춰보세요!'
  },
  {
    id: 'mode-5-worldcup',
    title: '쿠키 이상형 월드컵',
    subtitle: '최애 쿠키 토너먼트 대결',
    badge: '🔥 인기 서브 1',
    iconName: 'Trophy',
    isMain: false,
    description: '토너먼트 대결로 나의 최애 쿠키를 뽑아보고 실시간 유저 인기 랭킹 차트를 확인하세요.'
  },
  {
    id: 'mode-4-speed',
    title: '초성 타임어택',
    subtitle: '10초 스피드 초성 퀴즈',
    badge: '⚡ 서브 2',
    iconName: 'Zap',
    isMain: false,
    description: '초성 힌트를 보고 제한시간 내에 빠르게 입력하여 콤보 점수를 쌓으세요!'
  },
  {
    id: 'mode-2-silhouette',
    title: '실루엣 그림자 퀴즈',
    subtitle: '외곽선 그림자로 맞추기',
    badge: '👤 서브 3',
    iconName: 'Eye',
    isMain: false,
    description: '쿠키의 흑백 그림자와 윤곽만 보고 외형의 주인공이 누구인지 맞춰보세요.'
  },
  {
    id: 'mode-1-cookidle',
    title: '쿠키들 (Cookidle)',
    subtitle: 'Wordle 스타일 속성 추리',
    badge: '🧩 서브 4',
    iconName: 'Sparkles',
    isMain: false,
    description: '등급, 유형, 포지션, 원소, 출시년도 힌트를 조합하여 정답 쿠키를 추리하세요.'
  },
  {
    id: 'news-section',
    title: '왕국 소식 & 쿠폰',
    subtitle: '최신 뉴스 및 쿠폰 번호',
    badge: '📰 뉴스 & 쿠폰',
    iconName: 'Newspaper',
    isMain: false,
    description: '쿠키런 킹덤 최신 패치노트, 신규 쿠키 정보 및 스페셜 지급 쿠폰 코드를 확인하세요!'
  }
];

export function registerNewGameMode(newMode: GameModeConfig): GameModeConfig[] {
  const exists = GAME_MODES.some((mode) => mode.id === newMode.id);
  if (!exists) {
    GAME_MODES.push(newMode);
  }
  return GAME_MODES;
}

export function getGameModeById(id: GameModeId): GameModeConfig | undefined {
  return GAME_MODES.find((mode) => mode.id === id);
}
