'use client';

import React, { useState, useEffect } from 'react';
import { COOKIES_DATA } from '@/data/cookies';
import { CookieData } from '@/types/cookie';
import { isCorrectAnswer } from '@/lib/hangul';
import confetti from 'canvas-confetti';
import { Eye, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SilhouetteQuizGameProps {
  onSuccess: (points: number) => void;
  onFailure: () => void;
}

export const SilhouetteQuizGame: React.FC<SilhouetteQuizGameProps> = ({
  onSuccess,
  onFailure
}) => {
  const [targetCookie, setTargetCookie] = useState<CookieData | null>(null);
  const [brightnessLevel, setBrightnessLevel] = useState<number>(0); // 0: Pure silhouette, 0.4: Semi-visible, 1: Full
  const [query, setQuery] = useState<string>('');
  const [matchedTypedName, setMatchedTypedName] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const lastCookieIdRef = React.useRef<string | null>(null);

  const loadNextQuestion = () => {
    const availableCookies = COOKIES_DATA.filter((c) => c.id !== lastCookieIdRef.current);
    const pool = availableCookies.length > 0 ? availableCookies : COOKIES_DATA;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    lastCookieIdRef.current = selected.id;
    setTargetCookie(selected);
    setBrightnessLevel(0);
    setQuery('');
    setMatchedTypedName('');
    setIsAnswered(false);
  };

  useEffect(() => {
    loadNextQuestion();
  }, []);

  if (!targetCookie) return null;

  const suggestions = query.trim().length > 0
    ? COOKIES_DATA.filter((c) => c.name.ko.includes(query.trim())).slice(0, 5)
    : [];

  const handleGuess = (guessName: string) => {
    if (isAnswered || !guessName.trim()) return;

    if (isCorrectAnswer(guessName, targetCookie)) {
      setMatchedTypedName(guessName);
      setIsAnswered(true);
      setBrightnessLevel(1); // Reveal full image
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      const points = brightnessLevel === 0 ? 80 : 50;
      onSuccess(points);
    } else {
      setQuery('');
    }
  };

  const unlockClue = () => {
    if (brightnessLevel === 0) {
      setBrightnessLevel(0.4);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-yellow-900/60 rounded-2xl p-5 border border-amber-700/50 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold mb-2">
          <Eye className="w-3.5 h-3.5 text-yellow-400" />
          <span>서브 모드 3</span>
        </div>
        <h2 className="text-2xl font-black text-amber-100">실루엣 그림자 퀴즈</h2>
        <p className="text-xs text-amber-300/80 mt-1">
          실루엣 외곽선과 그림자만 보고 과연 어떤 쿠키인지 맞춰보세요!
        </p>
      </div>

      {/* Main Silhouette Card */}
      <div className="bg-amber-950/80 backdrop-blur-md rounded-2xl p-6 border border-amber-800/50 shadow-2xl space-y-6">
        {/* Silhouette Viewport */}
        <div className="relative mx-auto w-48 h-48 rounded-2xl bg-amber-900/40 border-2 border-amber-700/50 flex items-center justify-center p-4 overflow-hidden shadow-inner">
          <img
            src={targetCookie.imageUrl}
            alt="실루엣 힌트"
            style={{ filter: `brightness(${brightnessLevel}) contrast(1.2)` }}
            className="w-full h-full object-contain transition-all duration-500 select-none"
          />
        </div>

        {/* Clue Hint Button */}
        {brightnessLevel === 0 && !isAnswered && (
          <button
            onClick={unlockClue}
            className="w-full py-2.5 rounded-xl bg-amber-900/40 hover:bg-amber-800/50 border border-amber-700/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>조명 살짝 밝히기 힌트 (50점 적용)</span>
          </button>
        )}

        {/* Input Form */}
        {!isAnswered ? (
          <div className="relative space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGuess(query.trim());
                }}
                placeholder="쿠키 이름 입력..."
                className="flex-1 bg-amber-950 border border-amber-700/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-amber-500/60 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => handleGuess(query.trim())}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-sm shadow-md"
              >
                제출
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-amber-950 border border-amber-700/80 rounded-xl overflow-hidden shadow-2xl divide-y divide-amber-900/60">
                {suggestions.map((cookie) => (
                  <button
                    key={cookie.id}
                    onClick={() => {
                      setQuery(cookie.name.ko);
                      handleGuess(cookie.name.ko);
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-amber-200 hover:bg-amber-900/60 transition-colors"
                  >
                    {cookie.name.ko}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Result Card */
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-b from-amber-900/60 to-amber-950/90 rounded-2xl p-5 border-2 border-yellow-400 text-center space-y-3 shadow-xl"
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>정답입니다!</span>
                </div>
                {matchedTypedName && matchedTypedName.trim() !== targetCookie.name.ko && (
                  <span className="text-xs font-semibold text-yellow-300 bg-amber-950/90 px-2.5 py-1 rounded-md border border-yellow-500/40 shadow">
                    💡 입력값 &quot;{matchedTypedName}&quot; → 공식 명칭: <strong className="text-amber-100">{targetCookie.name.ko}</strong>
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-amber-100">{targetCookie.name.ko}</h3>
              <p className="text-xs text-amber-300/80">
                {targetCookie.rarity} · {targetCookie.classType} · {targetCookie.position}
              </p>
              <button
                onClick={loadNextQuestion}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-xs shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>다음 그림자 문제</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
