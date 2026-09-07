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
import { saveLocalStats, useLocalStats } from '@/lib/supabase';
import { useInventory } from '@/lib/items';
import { UserProfile, useUserProfile } from '@/lib/user';
import { applyThemeToDocument } from '@/lib/theme';

export default function Home() {
  const [activeMode, setActiveMode] = useState<GameModeId>('mode-3-quote');

  // localStorage 는 외부 스토어로 구독한다 — 종전처럼 useEffect 안에서 setState 로
  // 채우면 연쇄 렌더를 유발한다(somilabs-hub#185).
  const { totalScore, currentStreak: streak, maxStreak } = useLocalStats();
  const inventory = useInventory();
  const { loaded: profileLoaded, value: userProfile } = useUserProfile();

  // 난이도는 프로필을 기본값으로 쓰되 사용자가 그 자리에서 바꿀 수 있다.
  const [difficultyOverride, setDifficultyOverride] = useState<DifficultyLevel | null>(null);
  const difficulty: DifficultyLevel =
    difficultyOverride ?? userProfile?.preferredDifficulty ?? 'normal';

  // 온보딩 모달: 프로필이 없으면 자동으로 열되, 하이드레이션 전(profileLoaded=false)에는
  // "아직 모른다" 이므로 열지 않는다. 그래야 프로필이 있는 사용자에게 모달이 깜빡이지 않는다.
  const [modalRequested, setModalRequested] = useState<boolean>(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState<boolean>(false);
  const isModalOpen =
    modalRequested || (profileLoaded && userProfile === null && !onboardingDismissed);

  // 테마 적용은 setState 가 아니라 DOM 부수효과라 effect 가 맞다.
  useEffect(() => {
    if (userProfile?.preferredTheme) {
      applyThemeToDocument(userProfile.preferredTheme);
    }
  }, [userProfile?.preferredTheme]);

  const handleSuccess = (points: number) => {
    const newScore = totalScore + points;
    const newStreak = streak + 1;
    const newMaxStreak = Math.max(maxStreak, newStreak);

    saveLocalStats({
      totalScore: newScore,
      currentStreak: newStreak,
      maxStreak: newMaxStreak
    });
  };

  const handleFailure = () => {
    saveLocalStats({
      totalScore,
      currentStreak: 0,
      maxStreak
    });
  };

  const handleModalClose = (profile: UserProfile) => {
    // 프로필·테마는 saveUserProfile 이 스토어를 갱신하므로 여기서 setState 하지 않는다.
    setDifficultyOverride(profile.preferredDifficulty);
    setModalRequested(false);
    setOnboardingDismissed(true);
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
        onOpenProfileModal={() => setModalRequested(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-4">
        {/* Difficulty Selector Bar */}
        <DifficultySelector
          difficulty={difficulty}
          onSelectDifficulty={(diff) => setDifficultyOverride(diff)}
        />

        {/* Item Badge Bar */}
        <ItemBadgeBar inventory={inventory} activeLang={activeLang} />

        {/* Game Views */}
        {activeMode === 'mode-3-quote' && (
          <QuoteQuizGame
            difficulty={difficulty}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            onInventoryUpdate={() => { /* saveInventory 가 스토어를 갱신한다 */ }}
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
      {/* 열릴 때만 마운트한다 — 폼 초기값을 마운트 시 읽으므로 매번 새로 채워진다. */}
      {isModalOpen && (
        <OnboardingModal
          isOpen
          onClose={handleModalClose}
          canCloseWithoutSaving={!!userProfile}
          activeLang={activeLang}
        />
      )}

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
