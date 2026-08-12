'use client';

import React, { useState, useEffect } from 'react';
import { COOKIES_DATA } from '@/data/cookies';
import { CookieData, DifficultyLevel, LanguageCode } from '@/types/cookie';
import { isCorrectAnswer } from '@/lib/hangul';
import { useAnswerItem, useHintItem, getInventory, ItemInventory } from '@/lib/items';
import { markDifficultyCleared, hasClearedDifficulty, getCookieStars } from '@/lib/stars';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import confetti from 'canvas-confetti';
import { MessageSquareQuote, Sparkles, HelpCircle, ArrowRight, RotateCcw, CheckCircle2, XCircle, Shuffle, Compass, Search, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteQuizGameProps {
  difficulty: DifficultyLevel;
  onSuccess: (points: number) => void;
  onFailure: () => void;
  onInventoryUpdate?: (inv: ItemInventory) => void;
}

const LANG_NAMES: Record<LanguageCode, { label: string; flag: string }> = {
  ko: { label: '한국어', flag: '🇰🇷' },
  en: { label: 'English (영어)', flag: '🇺🇸' },
  es: { label: 'Español (스페인어)', flag: '🇪🇸' },
  ja: { label: '日本語 (일본어)', flag: '🇯🇵' }
};

export const QuoteQuizGame: React.FC<QuoteQuizGameProps> = ({
  difficulty,
  onSuccess,
  onFailure,
  onInventoryUpdate
}) => {
  const [targetCookie, setTargetCookie] = useState<CookieData | null>(null);
  const [challengeLang, setChallengeLang] = useState<LanguageCode>('ko');
  const [hintLevel, setHintLevel] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [shakeInput, setShakeInput] = useState<boolean>(false);
  const [matchedTypedName, setMatchedTypedName] = useState<string>('');
  const [itemMessage, setItemMessage] = useState<string | null>(null);
  const [isFirstClearAwarded, setIsFirstClearAwarded] = useState<boolean | null>(null);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);

  const [inventory, setInventory] = useState<ItemInventory>({
    answerItems: 1,
    hintItems: 1,
    lastAnswerRecharge: Date.now(),
    lastHintRecharge: Date.now()
  });

  const refreshInventory = () => {
    const inv = getInventory();
    setInventory(inv);
    if (onInventoryUpdate) onInventoryUpdate(inv);
  };

  const getActiveLang = (): LanguageCode => {
    if (difficulty === 'normal') return 'ko';
    if (difficulty === 'master') return 'en';
    if (difficulty === 'expert') return 'es';
    return challengeLang;
  };

  const activeLang = getActiveLang();
  const t = UI_TRANSLATIONS[activeLang] || UI_TRANSLATIONS.ko;

  const loadNextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * COOKIES_DATA.length);
    const selected = COOKIES_DATA[randomIndex];
    setTargetCookie(selected);

    if (difficulty === 'challenge') {
      const langs: LanguageCode[] = ['en', 'es', 'ja', 'ko'];
      const randLang = langs[Math.floor(Math.random() * langs.length)];
      setChallengeLang(randLang);
    }

    setHintLevel(1);
    setQuery('');
    setMatchedTypedName('');
    setIsAnswered(false);
    setIsAnsweredCorrectly(false);
    setIsFirstClearAwarded(null);
    setEarnedPoints(0);
    setAttempts([]);
    setItemMessage(null);
    refreshInventory();
  };

  useEffect(() => {
    loadNextQuestion();
  }, [difficulty]);

  if (!targetCookie) return null;

  const targetOfficialName = targetCookie.name[activeLang] || targetCookie.name.ko;
  const targetQuote = targetCookie.quote[activeLang] || targetCookie.quote.ko;

  const isAlreadyClearedOnThisDiff = hasClearedDifficulty(targetCookie.id, difficulty);

  const suggestions = query.trim().length > 0
    ? COOKIES_DATA.filter((c) => {
        const nameInLang = c.name[activeLang] || c.name.ko;
        return nameInLang.toLowerCase().includes(query.trim().toLowerCase()) || c.initialConsonants.includes(query.trim());
      }).slice(0, 5)
    : [];

  const handleGuess = (guessName: string) => {
    if (isAnswered || !guessName.trim()) return;

    if (attempts.includes(guessName)) return;

    setAttempts((prev) => [...prev, guessName]);

    if (isCorrectAnswer(guessName, targetCookie, activeLang)) {
      setMatchedTypedName(guessName);
      setIsAnswered(true);
      setIsAnsweredCorrectly(true);

      const { isFirstClear } = markDifficultyCleared(targetCookie.id, difficulty);
      setIsFirstClearAwarded(isFirstClear);

      if (isFirstClear) {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        const pts = Math.round((hintLevel === 1 ? 100 : hintLevel === 2 ? 70 : 40) * (difficulty === 'challenge' ? 1.5 : 1));
        setEarnedPoints(pts);
        onSuccess(pts);
      } else {
        setEarnedPoints(0);
        onSuccess(0); // 0 points for already cleared difficulty!
      }
    } else {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    }
  };

  // 💡 힌트 아이템 사용
  const handleUseHintItem = () => {
    if (hintLevel >= 3 || isAnswered) return;
    const res = useHintItem();
    if (res.success) {
      setHintLevel((prev) => prev + 1);
      setInventory(res.updated);
      if (onInventoryUpdate) onInventoryUpdate(res.updated);
      setItemMessage('💡 힌트 돋보기 아이템을 사용했습니다!');
      setTimeout(() => setItemMessage(null), 2500);
    } else {
      setItemMessage('❌ 힌트 돋보기 아이템 수량이 부족합니다 (1시간마다 1개 충전)');
      setTimeout(() => setItemMessage(null), 2500);
    }
  };

  // 🔮 정답 표시 아이템 사용
  const handleUseAnswerItem = () => {
    if (isAnswered) return;
    const res = useAnswerItem();
    if (res.success) {
      setInventory(res.updated);
      if (onInventoryUpdate) onInventoryUpdate(res.updated);
      setMatchedTypedName(targetOfficialName);
      setIsAnswered(true);
      setIsAnsweredCorrectly(true);

      const { isFirstClear } = markDifficultyCleared(targetCookie.id, difficulty);
      setIsFirstClearAwarded(isFirstClear);

      if (isFirstClear) {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        const pts = Math.round(50 * (difficulty === 'challenge' ? 1.5 : 1));
        setEarnedPoints(pts);
        onSuccess(pts);
      } else {
        setEarnedPoints(0);
        onSuccess(0);
      }

      setItemMessage('🔮 정답 나침반 마법 아이템 사용! 정답이 마법처럼 공개되었습니다!');
      setTimeout(() => setItemMessage(null), 3500);
    } else {
      setItemMessage('❌ 정답 나침반 아이템 수량이 부족합니다 (하루에 1개 충전)');
      setTimeout(() => setItemMessage(null), 2500);
    }
  };

  const unlockNextHint = () => {
    if (hintLevel < 3) {
      setHintLevel((prev) => prev + 1);
    }
  };

  const allStars = getCookieStars()[targetCookie.id] || { normal: false, master: false, expert: false, challenge: false };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Flagship Header Banner */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 border border-slate-800 shadow-xl text-center relative overflow-hidden">
        <div className="absolute -right-6 -top-6 text-slate-700/20 pointer-events-none">
          <MessageSquareQuote className="w-36 h-36" />
        </div>

        {/* Challenge Random Language Mission Badge */}
        {difficulty === 'challenge' ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-black mb-2 animate-bounce">
            <Shuffle className="w-4 h-4 text-purple-400" />
            <span>🎲 챌린지 미션 언어: {LANG_NAMES[challengeLang].flag} {LANG_NAMES[challengeLang].label}로 답하세요!</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{LANG_NAMES[activeLang].flag} {LANG_NAMES[activeLang].label} 모드</span>
          </div>
        )}

        <h2 className="text-2xl font-black text-slate-100">쿠키 명대사 & 스킬 퀴즈</h2>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          쿠키의 대사와 스킬 힌트를 보고 주인공 쿠키의 이름을 맞춰보세요!
        </p>

        {/* Star Progress Indicator for Current Cookie */}
        <div className="mt-3 inline-flex items-center gap-2 bg-slate-950/80 px-3.5 py-1 rounded-full border border-slate-800 text-xs font-bold text-slate-300">
          <span className="text-[11px] text-slate-400">현재 쿠키 별 획득:</span>
          <div className="flex items-center gap-1">
            <span className={allStars.normal ? 'text-amber-400 font-extrabold' : 'text-slate-700'}>🇰🇷★</span>
            <span className={allStars.master ? 'text-amber-400 font-extrabold' : 'text-slate-700'}>🇺🇸★</span>
            <span className={allStars.expert ? 'text-amber-400 font-extrabold' : 'text-slate-700'}>🇪🇸★</span>
            <span className={allStars.challenge ? 'text-amber-400 font-extrabold' : 'text-slate-700'}>🎲★</span>
          </div>
          {isAlreadyClearedOnThisDiff && (
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30 ml-1">
              (현재 난이도 ★ 완료)
            </span>
          )}
        </div>

        {/* Item Use Buttons Row */}
        {!isAnswered && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={handleUseHintItem}
              disabled={inventory.hintItems <= 0 || hintLevel >= 3}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.useHintItem} ({inventory.hintItems}/3)</span>
            </button>

            <button
              onClick={handleUseAnswerItem}
              disabled={inventory.answerItems <= 0}
              className="px-3.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1.5 shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-purple-300" />
              <span>{t.useAnswerItem} ({inventory.answerItems}/5)</span>
            </button>
          </div>
        )}

        {/* Item Notification Toast Message */}
        {itemMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 px-3 py-1.5 bg-slate-800 text-amber-300 border border-slate-700 rounded-lg text-xs font-bold text-center inline-block"
          >
            {itemMessage}
          </motion.div>
        )}
      </div>

      {/* Main Quiz Card */}
      <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
        {/* Hint Box 1: Quote */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4 text-amber-400" />
              {t.hint1Title} ({LANG_NAMES[activeLang].flag} {LANG_NAMES[activeLang].label})
            </span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 border border-slate-700">100pt</span>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 text-center relative">
            <p className="text-lg font-serif italic text-slate-100 font-semibold leading-relaxed">
              &quot;{targetQuote}&quot;
            </p>
            {activeLang !== 'ko' && (
              <p className="text-xs text-slate-400 mt-2 font-mono">
                (한국어: &quot;{targetCookie.quote.ko}&quot;)
              </p>
            )}
          </div>
        </div>

        {/* Hint Box 2: Class, Position, Element */}
        {hintLevel >= 2 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>{t.hint2Title}</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 border border-slate-700">70pt</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] mb-0.5">{t.classType}</span>
                <span className="font-bold text-slate-100">{targetCookie.classType}</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] mb-0.5">{t.position}</span>
                <span className="font-bold text-slate-100">{targetCookie.position}</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px] mb-0.5">{t.element}</span>
                <span className="font-bold text-slate-100">{targetCookie.element}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          !isAnswered && (
            <button onClick={unlockNextHint} className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{t.openHint2}</span>
            </button>
          )
        )}

        {/* Hint Box 3: Consonant or Spelling Hint */}
        {hintLevel >= 3 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span>{t.hint3Title}</span>
              <span className="bg-amber-900/60 px-2 py-0.5 rounded text-amber-300">40pt</span>
            </div>
            <div className="bg-amber-900/50 p-3 rounded-xl border border-amber-700/30 text-center">
              <span className="text-lg font-black tracking-widest text-yellow-300">
                {activeLang === 'ko'
                  ? targetCookie.initialConsonants
                  : targetOfficialName.replace(/[a-zA-Z]/g, '_ ')}
              </span>
            </div>
          </motion.div>
        ) : (
          hintLevel === 2 && !isAnswered && (
            <button onClick={unlockNextHint} className="w-full py-2.5 rounded-xl bg-amber-900/40 hover:bg-amber-800/50 border border-amber-700/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{t.unlockSpelling}</span>
            </button>
          )
        )}

        {/* Incorrect Attempts List */}
        {attempts.length > 0 && !isAnswered && (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-amber-400/80">오답 기록:</span>
            {attempts.map((att, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-950/60 text-red-300 border border-red-800/40">
                <XCircle className="w-3 h-3 text-red-400" />
                {att}
              </span>
            ))}
          </div>
        )}

        {/* Answer Input */}
        {!isAnswered ? (
          <div className="relative space-y-2">
            <div className={`flex gap-2 ${shakeInput ? 'animate-shake' : ''}`}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleGuess(query.trim()); }}
                placeholder={t.typeAnswerPlaceholder}
                className="flex-1 bg-amber-950 border border-amber-700/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-amber-500/60 focus:outline-none focus:border-amber-400"
              />
              <button onClick={() => handleGuess(query.trim())} className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-sm shadow-md">
                {t.submit}
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-amber-950 border border-amber-700/80 rounded-xl overflow-hidden shadow-2xl divide-y divide-amber-900/60">
                {suggestions.map((cookie) => (
                  <button
                    key={cookie.id}
                    onClick={() => {
                      const selName = cookie.name[activeLang] || cookie.name.ko;
                      setQuery(selName);
                      handleGuess(selName);
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs sm:text-sm text-amber-200 hover:bg-amber-900/60 flex items-center justify-between transition-colors"
                  >
                    <span className="font-semibold">{cookie.name[activeLang] || cookie.name.ko}</span>
                    <span className="text-[10px] text-amber-400/70">{cookie.rarity} · {cookie.classType}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Result Card Reveal */
          <AnimatePresence>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-b from-amber-900/60 to-amber-950/90 rounded-2xl p-6 border-2 border-yellow-400/80 text-center space-y-4 shadow-2xl">
              {isCorrect ? (
                <div className="flex flex-col items-center gap-1.5">
                  {isFirstClearAwarded ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-spin-slow" />
                      <span>{t.correctAnswer} {t.starEarned} +{earnedPoints}{t.score}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-yellow-300 border border-yellow-500/40 text-xs font-bold">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{t.alreadyCleared}</span>
                    </div>
                  )}

                  {matchedTypedName && matchedTypedName.trim() !== targetOfficialName && (
                    <span className="text-xs font-semibold text-yellow-300 bg-amber-950/90 px-3 py-1 rounded-lg border border-yellow-500/40 shadow-md">
                      💡 {t.officialNameNotice}: <strong className="text-amber-100 font-extrabold">{targetOfficialName}</strong>
                    </span>
                  )}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 text-xs font-bold">
                  <RotateCcw className="w-4 h-4 text-orange-400" />
                  <span>{t.skipQuestion}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
                <img src={targetCookie.imageUrl} alt={targetOfficialName} className="w-28 h-28 object-cover rounded-2xl border-2 border-yellow-400 shadow-xl" />
                <div className="text-left space-y-1">
                  <span className="text-xs font-bold text-yellow-400 px-2 py-0.5 rounded bg-amber-950/80 border border-yellow-500/40 inline-block">
                    {targetCookie.rarity}
                  </span>
                  <h3 className="text-2xl font-black text-amber-100">{targetOfficialName}</h3>
                  <p className="text-xs text-amber-300/80">
                    🇰🇷 {targetCookie.name.ko} | 🇺🇸 {targetCookie.name.en} | 🇪🇸 {targetCookie.name.es}
                  </p>
                  <p className="text-xs text-amber-200/90 font-medium italic mt-1">
                    {targetCookie.skillName[activeLang] || targetCookie.skillName.ko}
                  </p>
                </div>
              </div>

              {/* Otaku Lore Easter Egg Banner */}
              {targetCookie.easterEggLore && (
                <div className="bg-purple-950/90 border-2 border-purple-500/60 rounded-xl p-3.5 text-left space-y-1 shadow-2xl">
                  <div className="flex items-center gap-1.5 text-yellow-300 font-extrabold text-xs">
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    <span>쿠키런 덕후 이스터에그 (Otaku Lore Easter Egg)</span>
                  </div>
                  <p className="text-xs text-purple-100 leading-relaxed font-semibold">
                    {targetCookie.easterEggLore[activeLang] || targetCookie.easterEggLore.ko}
                  </p>
                </div>
              )}

              <button onClick={loadNextQuestion} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-black text-sm shadow-xl flex items-center justify-center gap-2">
                <span>{t.nextQuestion}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        {!isAnswered && (
          <div className="pt-2 text-center">
            <button
              onClick={() => {
                onFailure();
                loadNextQuestion();
              }}
              className="text-xs text-amber-400/60 hover:text-amber-300 underline inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.skipQuestion}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
