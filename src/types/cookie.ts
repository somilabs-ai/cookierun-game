export type CookieRarity =
  | 'COMMON'
  | 'RARE'
  | 'EPIC'
  | 'SUPER_EPIC'
  | 'LEGENDARY'
  | 'ANCIENT'
  | 'BEAST'
  | 'SPECIAL';

export type CookieClass =
  | '돌격형'
  | '방어형'
  | '침투형'
  | '마법형'
  | '사격형'
  | '폭발형'
  | '지원형'
  | '회복형';

export type CookiePosition = '전방' | '중앙' | '후방';

export type CookieElement =
  | '무속성'
  | '빛'
  | '어둠'
  | '불'
  | '물'
  | '얼음'
  | '바람'
  | '대지'
  | '번개'
  | '자연';

export type LanguageCode = 'ko' | 'en' | 'es' | 'ja';

export interface MultiLangText {
  ko: string;
  en: string;
  es: string;
  ja: string;
}

export type DifficultyLevel = 'normal' | 'master' | 'expert' | 'challenge';

export interface CookieData {
  id: string;
  name: MultiLangText;
  quote: MultiLangText;
  skillName: MultiLangText;
  skillDescription: MultiLangText;
  rarity: CookieRarity;
  classType: CookieClass;
  position: CookiePosition;
  element: CookieElement;
  releaseYear: number;
  initialConsonants: string;
  imageUrl: string;
  color: string;
  aliases?: string[];
  easterEggLore?: MultiLangText;
}

export type GameModeId =
  | 'mode-3-quote'
  | 'mode-5-worldcup'
  | 'mode-4-speed'
  | 'mode-2-silhouette'
  | 'mode-1-cookidle'
  | 'news-section';

export interface GameModeConfig {
  id: GameModeId;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  isMain?: boolean;
  description: string;
}

export type NewsCategory = 'NOTICE' | 'NEW_COOKIE' | 'COUPON' | 'PATCH_NOTE';

export interface CookieNews {
  id: string;
  title: string;
  category: NewsCategory;
  date: string;
  summary: string;
  couponCode?: string;
  imageUrl?: string;
  linkUrl: string;
  isImportant?: boolean;
}
