import { createLocalStore, useLocalStore, Snapshot } from './localStore';
import { DifficultyLevel } from '@/types/cookie';
import { ThemeColor, getStoredTheme, saveTheme } from '@/lib/theme';

export interface UserProfile {
  id: string;
  nickname: string;
  preferredDifficulty: DifficultyLevel;
  preferredTheme: ThemeColor;
  createdAt: string;
}

const USER_STORAGE_KEY = 'cookierun_user_profile';

export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(USER_STORAGE_KEY);
  if (!saved) return null;

  const parsed = JSON.parse(saved);
  if (!parsed.preferredTheme) {
    parsed.preferredTheme = getStoredTheme();
  }
  return parsed;
}

export function saveUserProfile(
  nickname: string,
  difficulty: DifficultyLevel,
  theme: ThemeColor = 'royal_slate'
): UserProfile {
  const existing = getUserProfile();
  const profile: UserProfile = {
    id: existing ? existing.id : 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    nickname: nickname.trim(),
    preferredDifficulty: difficulty,
    preferredTheme: theme,
    createdAt: existing ? existing.createdAt : new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    saveTheme(theme);
    profileStore.invalidate();
  }
  return profile;
}

export const profileStore = createLocalStore<UserProfile | null>(getUserProfile, null);

/**
 * 프로필을 외부 스토어로 구독한다.
 * `loaded` 는 하이드레이션 완료 여부다 — 아직 false 면 "프로필이 없다" 가 아니라
 * "아직 모른다" 이므로, 온보딩 모달을 여는 판단에 그대로 쓰면 안 된다.
 */
export function useUserProfile(): Snapshot<UserProfile | null> {
  return useLocalStore(profileStore);
}

export function hasUserProfile(): boolean {
  return getUserProfile() !== null;
}
