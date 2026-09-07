import { createLocalStore, useLocalStore } from './localStore';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * LocalStorage Fallback Helper for Scores and Streaks
 */
export function getLocalStats() {
  if (typeof window === 'undefined') return { totalScore: 0, currentStreak: 0, maxStreak: 0 };
  const saved = localStorage.getItem('cookierun_game_stats');
  if (!saved) return { totalScore: 0, currentStreak: 0, maxStreak: 0 };
  try {
    return JSON.parse(saved);
  } catch {
    return { totalScore: 0, currentStreak: 0, maxStreak: 0 };
  }
}

export function saveLocalStats(stats: { totalScore: number; currentStreak: number; maxStreak: number }) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cookierun_game_stats', JSON.stringify(stats));
  statsStore.invalidate();
}

export interface LocalStats {
  totalScore: number;
  currentStreak: number;
  maxStreak: number;
}

const DEFAULT_STATS: LocalStats = { totalScore: 0, currentStreak: 0, maxStreak: 0 };

export const statsStore = createLocalStore<LocalStats>(getLocalStats, DEFAULT_STATS);

/** 로컬 통계를 외부 스토어로 구독한다. saveLocalStats 가 불리면 자동 갱신된다. */
export function useLocalStats(): LocalStats {
  return useLocalStore(statsStore).value;
}
