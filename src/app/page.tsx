'use client';

import React, { useState, useEffect } from 'react';
import { GameModeId, DifficultyLevel } from '@/types/cookie';
import { Navbar } from '@/components/Navbar';
import { DifficultySelector } from '@/components/DifficultySelector';
import { ItemBadgeBar } from '@/components/ItemBadgeBar';
import { OnboardingModal } from '@/components/OnboardingModal';
import { QuoteQuizGame } from '@/components/games/QuoteQuizGame';
import { IdealWorldcupGame } from '@/components/games/IdealWorldcupGame';
import { InitialSpeedQuizGame } from '@/components/games/InitialSpeedQuizGame';
import { SilhouetteQuizGame } from '@/components/games/SilhouetteQuizGame';
import { CookidleGame } from '@/components/games/CookidleGame';
import { KingdomNewsSection } from '@/components/news/KingdomNewsSection';
import { getLocalStats, saveLocalStats } from '@/lib/supabase';
import { getInventory, ItemInventory } from '@/lib/items';
import { getUserProfile, UserProfile } from '@/lib/user';

export default function Home() {
  const [activeMode, setActiveMode] = useState<GameModeId>('mode-3-quote');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('normal');
  const [totalScore, setTotalScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);

  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [inventory, setInventory] = useState<ItemInventory>({
    answerItems: 1,
    hintItems: 1,
    lastAnswerRecharge: Date.now(),
    lastHintRecharge: Date.now()
  });

  useEffect(() => {
    const stats = getLocalStats();
    setTotalScore(stats.totalScore || 0);
    setStreak(stats.currentStreak || 0);
    setMaxStreak(stats.maxStreak || 0);
    setInventory(getInventory());

    const profile = getUserProfile();
    if (profile) {
      setUserProfileState(profile);
      setDifficulty(profile.preferredDifficulty);
    } else {
      setIsModalOpen(true); // Open modal on first launch to request nickname!
    }
  }, []);

  const handleSuccess = (points: number) => {
    const newScore = totalScore + points;
    const newStreak = streak + 1;
    const newMaxStreak = Math.max(maxStreak, newStreak);

    setTotalScore(newScore);
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);

    saveLocalStats({
      totalScore: newScore,
      currentStreak: newStreak,
      maxStreak: newMaxStreak
    });
  };

  const handleFailure = () => {
    setStreak(0);
    saveLocalStats({
      totalScore,
      currentStreak: 0,
      maxStreak
    });
  };

  const handleModalClose = (profile: UserProfile) => {
    setUserProfileState(profile);
    setDifficulty(profile.preferredDifficulty);
    setIsModalOpen(false);
  };

  const activeLang = difficulty === 'normal' ? 'ko' : difficulty === 'master' ? 'en' : difficulty === 'expert' ? 'es' : 'en';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0F172A] to-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500/30">
      {/* Header Navigation */}
      <Navbar
        activeMode={activeMode}
        onSelectMode={(modeId) => setActiveMode(modeId)}
        totalScore={totalScore}
        streak={streak}
        activeLang={activeLang}
        difficulty={difficulty}
        userProfile={userProfile}
        onOpenProfileModal={() => setIsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-4">
        {/* Difficulty Selector Bar */}
        <DifficultySelector
          difficulty={difficulty}
          onSelectDifficulty={(diff) => setDifficulty(diff)}
        />

        {/* Item Badge Bar */}
        <ItemBadgeBar inventory={inventory} activeLang={activeLang} />

        {/* Game Views */}
        {activeMode === 'mode-3-quote' && (
          <QuoteQuizGame
            difficulty={difficulty}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            onInventoryUpdate={(inv) => setInventory(inv)}
          />
        )}
        {activeMode === 'mode-5-worldcup' && <IdealWorldcupGame />}
        {activeMode === 'mode-4-speed' && (
          <InitialSpeedQuizGame onSuccess={handleSuccess} onFailure={handleFailure} />
        )}
        {activeMode === 'mode-2-silhouette' && (
          <SilhouetteQuizGame onSuccess={handleSuccess} onFailure={handleFailure} />
        )}
        {activeMode === 'mode-1-cookidle' && (
          <CookidleGame onSuccess={handleSuccess} onFailure={handleFailure} />
        )}
        {activeMode === 'news-section' && <KingdomNewsSection />}
      </main>

      {/* Onboarding & Profile Modal */}
      <OnboardingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        canCloseWithoutSaving={!!userProfile}
        activeLang={activeLang}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-400 space-y-1">
        <p>© 2026 쿠키런: 킹덤 맞추기 웹 게임 & 소식지 (Cookie Run Kingdom Multi-lang Quiz Web)</p>
        <p className="text-[10px] text-slate-500">
          모든 쿠키 이미지 및 상표권은 데브시스터즈(Devsisters)에 있습니다.
        </p>
      </footer>
    </div>
  );
}
