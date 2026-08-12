'use client';

import React from 'react';
import { GAME_MODES } from '@/lib/games/registry';
import { GameModeId, LanguageCode, DifficultyLevel } from '@/types/cookie';
import { UserProfile } from '@/lib/user';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { Flame, Trophy, Sparkles, MessageSquareQuote, Zap, Eye, Newspaper, User, Settings } from 'lucide-react';

interface NavbarProps {
  activeMode: GameModeId;
  onSelectMode: (modeId: GameModeId) => void;
  totalScore: number;
  streak: number;
  activeLang?: LanguageCode;
  difficulty?: DifficultyLevel;
  userProfile?: UserProfile | null;
  onOpenProfileModal?: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageSquareQuote: <MessageSquareQuote className="w-4 h-4" />,
  Trophy: <Trophy className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Newspaper: <Newspaper className="w-4 h-4 text-emerald-400" />
};

const DIFF_FLAGS: Record<DifficultyLevel, string> = {
  normal: '🇰🇷 Normal',
  master: '🇺🇸 Master',
  expert: '🇪🇸 Expert',
  challenge: '🎲 Challenge'
};

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  onSelectMode,
  totalScore,
  streak,
  activeLang = 'ko',
  difficulty = 'normal',
  userProfile,
  onOpenProfileModal
}) => {
  const t = UI_TRANSLATIONS[activeLang] || UI_TRANSLATIONS.ko;

  return (
    <header className="sticky top-0 z-40 bg-amber-950/85 backdrop-blur-md border-b border-amber-800/40 text-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍪</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-400 bg-clip-text text-transparent">
                {t.gameTitle}
              </h1>
              <p className="text-xs text-amber-300/80">{t.gameSubtitle}</p>
            </div>
          </div>

          {/* User Profile & Stats Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            {/* User Nickname & Settings Button */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-1.5 bg-amber-900/80 hover:bg-amber-800 border border-yellow-500/40 px-3 py-1.5 rounded-full text-xs font-bold text-yellow-300 shadow transition-transform active:scale-95"
            >
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span>{userProfile ? userProfile.nickname : '프로필 설정'}</span>
              <span className="text-[10px] text-amber-300/80 bg-amber-950/80 px-1.5 py-0.5 rounded border border-yellow-500/30">
                {DIFF_FLAGS[difficulty]}
              </span>
              <Settings className="w-3.5 h-3.5 text-amber-400 ml-0.5" />
            </button>

            {/* Score & Streak */}
            <div className="flex items-center gap-3 bg-amber-900/60 px-3 py-1.5 rounded-full border border-amber-700/50 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-1.5 text-amber-300">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>{totalScore.toLocaleString()}{t.score}</span>
              </div>
              <div className="w-px h-4 bg-amber-700/60" />
              <div className="flex items-center gap-1 text-orange-400">
                <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
                <span>{streak}{t.streak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Selector Navigation Tabs */}
        <nav className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {GAME_MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold shadow-lg shadow-amber-500/20 scale-[1.02]'
                    : 'bg-amber-900/40 text-amber-200 hover:bg-amber-800/50 hover:text-white border border-amber-800/30'
                }`}
              >
                {ICON_MAP[mode.iconName]}
                <span>{mode.title}</span>
                {mode.isMain && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] font-extrabold bg-amber-950 text-yellow-300 rounded-md border border-yellow-500/50">
                    MAIN
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
