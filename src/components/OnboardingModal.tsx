'use client';

import React, { useState, useEffect } from 'react';
import { DifficultyLevel, LanguageCode } from '@/types/cookie';
import { UserProfile, getUserProfile, saveUserProfile } from '@/lib/user';
import { ThemeColor, THEME_CONFIGS, getStoredTheme } from '@/lib/theme';
import { User, Sparkles, Globe2, CheckCircle2, ShieldCheck, X, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: (profile: UserProfile) => void;
  canCloseWithoutSaving?: boolean;
  activeLang?: LanguageCode;
}

const DIFFICULTIES: { id: DifficultyLevel; name: string; flag: string; desc: string; isHot?: boolean }[] = [
  { id: 'normal', name: 'Normal (노멀)', flag: '🇰🇷', desc: '한국어 대사 & 한국어 정답' },
  { id: 'master', name: 'Master (마스터)', flag: '🇺🇸', desc: '영어 대사 & 공식 English 스펠링' },
  { id: 'expert', name: 'Expert (익스퍼트)', flag: '🇪🇸', desc: '스페인어 대사 & 스페인어/영어 정답' },
  { id: 'challenge', name: 'Challenge (챌린지)', flag: '🎲', desc: '문제마다 요구 언어가 무작위 변경! (+1.5배 보너스)', isHot: true }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  canCloseWithoutSaving = false,
  activeLang = 'ko'
}) => {
  const [nickname, setNickname] = useState<string>('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');
  const [theme, setThemeState] = useState<ThemeColor>('royal_slate');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const existing = getUserProfile();
      if (existing) {
        setNickname(existing.nickname);
        setDifficulty(existing.preferredDifficulty);
        setThemeState(existing.preferredTheme || getStoredTheme());
      } else {
        // Random default nickname suggestion
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        setNickname(`용감한쿠키_${randomNum}`);
        setDifficulty('normal');
        setThemeState(getStoredTheme());
      }
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();
    if (!trimmed || trimmed.length < 2) {
      setErrorMsg('닉네임을 2자 이상 입력해주세요!');
      return;
    }
    if (trimmed.length > 12) {
      setErrorMsg('닉네임은 최대 12자까지 가능합니다.');
      return;
    }

    const updatedProfile = saveUserProfile(trimmed, difficulty, theme);
    onClose(updatedProfile);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-slate-100 space-y-6 relative overflow-hidden my-8"
        >
          {canCloseWithoutSaving && (
            <button
              onClick={() => {
                const p = getUserProfile() || saveUserProfile(nickname || '쿠키기사단', difficulty, theme);
                onClose(p);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-full bg-slate-950 border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Header Banner */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-black">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>킹덤 기사단원 프로필 & 환경설정</span>
            </div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              {getUserProfile() ? '프로필 & 난이도 & 테마 수정' : '🍪 쿠키 기사단 등록'}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              닉네임, 언어 난이도 및 마음에 드는 색상 테마를 선택해주세요!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nickname Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" />
                <span>기사단원 닉네임 (필수)</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setErrorMsg(null);
                }}
                maxLength={12}
                placeholder="예: 용감한쿠키_1234"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 font-bold placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
              />
              {errorMsg && (
                <p className="text-xs text-red-400 font-bold">{errorMsg}</p>
              )}
            </div>

            {/* Theme Color Selector Section */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>게임 UI 색상 테마 선택 (Color Theme)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {THEME_CONFIGS.map((tConfig) => {
                  const isSelected = theme === tConfig.id;
                  return (
                    <button
                      key={tConfig.id}
                      type="button"
                      onClick={() => setThemeState(tConfig.id)}
                      className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 text-amber-200 shadow-lg scale-[1.02]'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <span>{tConfig.flag}</span>
                          <span className={isSelected ? 'text-amber-300 font-extrabold' : 'text-slate-200'}>{tConfig.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-2">{tConfig.desc}</p>
                      </div>

                      {/* Color Preview Swatch Bar */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: tConfig.bgPreview }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: tConfig.accentPreview }} />
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 fill-amber-400/20 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <span>선호 난이도 및 요구 언어 설정</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {DIFFICULTIES.map((diff) => {
                  const isSelected = difficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setDifficulty(diff.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 text-amber-200 shadow-lg scale-[1.01]'
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-extrabold text-xs">
                          <span>{diff.flag}</span>
                          <span className={isSelected ? 'text-amber-300' : 'text-slate-200'}>{diff.name}</span>
                          {diff.isHot && (
                            <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/50">
                              +1.5x
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{diff.desc}</p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{getUserProfile() ? '설정 저장하고 게임하기' : '👑 킹덤 기사단 등록 & 게임 시작'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
