import { DifficultyLevel } from '@/types/cookie';

export type CookieStarsRecord = Record<string, Record<DifficultyLevel, boolean>>;

const STORAGE_KEY = 'cookierun_cookie_stars';

export function getCookieStars(): CookieStarsRecord {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : {};
}

export function saveCookieStars(stars: CookieStarsRecord): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stars));
}

export function hasClearedDifficulty(cookieId: string, difficulty: DifficultyLevel): boolean {
  const stars = getCookieStars();
  return !!(stars[cookieId] && stars[cookieId][difficulty]);
}

export function markDifficultyCleared(cookieId: string, difficulty: DifficultyLevel): { isFirstClear: boolean; updatedStars: CookieStarsRecord } {
  const stars = getCookieStars();
  if (!stars[cookieId]) {
    stars[cookieId] = {
      normal: false,
      master: false,
      expert: false,
      challenge: false
    };
  }

  const isFirstClear = !stars[cookieId][difficulty];
  stars[cookieId][difficulty] = true;
  saveCookieStars(stars);

  return { isFirstClear, updatedStars: stars };
}

export function getCookieStarCount(cookieId: string): number {
  const stars = getCookieStars();
  const cookieStars = stars[cookieId];
  if (!cookieStars) return 0;
  return Object.values(cookieStars).filter(Boolean).length;
}
