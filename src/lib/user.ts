import { DifficultyLevel } from '@/types/cookie';

export interface UserProfile {
  id: string;
  nickname: string;
  preferredDifficulty: DifficultyLevel;
  createdAt: string;
}

const USER_STORAGE_KEY = 'cookierun_user_profile';

export function getUserProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(USER_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function saveUserProfile(nickname: string, difficulty: DifficultyLevel): UserProfile {
  const existing = getUserProfile();
  const profile: UserProfile = {
    id: existing ? existing.id : 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    nickname: nickname.trim(),
    preferredDifficulty: difficulty,
    createdAt: existing ? existing.createdAt : new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  }
  return profile;
}

export function hasUserProfile(): boolean {
  return getUserProfile() !== null;
}
