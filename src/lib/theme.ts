export type ThemeColor = 'royal_slate' | 'parchment_light' | 'moonlight_sapphire';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  desc: string;
  flag: string;
  bgPreview: string;
  accentPreview: string;
}

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: 'royal_slate',
    name: '로얄 슬레이트',
    desc: '차분한 딥 네이비 슬레이트 (야간 추천)',
    flag: '🌌',
    bgPreview: '#0F172A',
    accentPreview: '#F59E0B'
  },
  {
    id: 'parchment_light',
    name: '왕국 양피지',
    desc: '따뜻한 아이보리 & 크림 베이지 (라이트 모드)',
    flag: '📜',
    bgPreview: '#FAF7F2',
    accentPreview: '#8B5E34'
  },
  {
    id: 'moonlight_sapphire',
    name: '달빛 사파이어',
    desc: '신비로운 쿨 인디고 밤하늘 모드',
    flag: '🌙',
    bgPreview: '#0B0F19',
    accentPreview: '#6366F1'
  }
];

const THEME_STORAGE_KEY = 'cookierun_theme_color';

export function getStoredTheme(): ThemeColor {
  if (typeof window === 'undefined') return 'royal_slate';
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeColor;
  return saved || 'royal_slate';
}

export function saveTheme(theme: ThemeColor): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyThemeToDocument(theme);
}

export function applyThemeToDocument(theme: ThemeColor): void {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('theme-royal-slate', 'theme-parchment-light', 'theme-moonlight-sapphire');
  root.classList.add(`theme-${theme.replace('_', '-')}`);
  root.setAttribute('data-theme', theme);
}
