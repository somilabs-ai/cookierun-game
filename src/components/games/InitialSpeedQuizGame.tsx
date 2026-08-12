'use client';

import React, { useState, useEffect } from 'react';
import { COOKIES_DATA } from '@/data/cookies';
import { CookieData } from '@/types/cookie';
import { isCorrectAnswer } from '@/lib/hangul';
import confetti from 'canvas-confetti';
import { Zap, Timer, Flame, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InitialSpeedQuizGameProps {
  onSuccess: (points: number) => void;
  onFailure: () => void;
}

export const InitialSpeedQuizGame: React.FC<InitialSpeedQuizGameProps> = ({
  onSuccess,
  onFailure
}) => {
  const [targetCookie, setTargetCookie] = useState<CookieData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [inputVal, setInputVal] = useState<string>('');
  const [matchedTypedName, setMatchedTypedName] = useState<string>('');
  const [combo, setCombo] = useState<number>(0);
  const [status, setStatus] = useState<'playing' | 'correct' | 'timeout'>('playing');

  const loadNextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * COOKIES_DATA.length);
    setTargetCookie(COOKIES_DATA[randomIndex]);
    setTimeLeft(10);
    setInputVal('');
    setMatchedTypedName('');
    setStatus('playing');
  };

  useEffect(() => {
    loadNextQuestion();
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (status !== 'playing') return;
    if (timeLeft <= 0) {
      setStatus('timeout');
      setCombo(0);
      onFailure();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, status]);

  if (!targetCookie) return null;

  const handleSubmit = () => {
    if (status !== 'playing' || !inputVal.trim()) return;

    if (isCorrectAnswer(inputVal.trim(), targetCookie)) {
      // Correct!
      setMatchedTypedName(inputVal.trim());
      setStatus('correct');
      const newCombo = combo + 1;
      setCombo(newCombo);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

      const points = 50 + newCombo * 10;
      onSuccess(points);
    } else {
      // Wrong
      setInputVal('');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-yellow-900/60 rounded-2xl p-5 border border-amber-700/50 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>서브 모드 2</span>
        </div>
        <h2 className="text-2xl font-black text-amber-100">초성 타임어택 퀴즈</h2>
        <p className="text-xs text-amber-300/80 mt-1">
          초성을 보고 10초 이내에 정확한 쿠키 이름을 빠르게 입력해 보세요!
        </p>
      </div>

      {/* Main Speed Quiz Card */}
      <div className="bg-amber-950/80 backdrop-blur-md rounded-2xl p-6 border border-amber-800/50 shadow-2xl space-y-6">
        {/* Timer & Combo Bar */}
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Timer className={`w-4 h-4 ${timeLeft <= 3 ? 'text-red-400 animate-ping' : 'text-yellow-400'}`} />
            <span>남은 시간: <strong className="text-sm text-yellow-300">{timeLeft}초</strong></span>
          </div>
          <div className="flex items-center gap-1 text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800/50">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>{combo} 연속 콤보</span>
          </div>
        </div>

        {/* Progress Timer Bar */}
        <div className="w-full bg-amber-900/40 rounded-full h-2 overflow-hidden border border-amber-800/40">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 3 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          />
        </div>

        {/* Consonant Hint Box */}
        <div className="bg-amber-900/60 p-6 rounded-2xl border border-amber-700/50 text-center space-y-2">
          <span className="text-xs text-amber-400/80 font-bold block">초성 힌트</span>
          <span className="text-3xl font-black tracking-widest text-yellow-300 block">
            {targetCookie.initialConsonants}
          </span>
        </div>

        {/* Answer Input */}
        {status === 'playing' ? (
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              placeholder="쿠키 이름 입력..."
              className="flex-1 bg-amber-950 border border-amber-700/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-amber-500/60 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={handleSubmit}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-sm shadow-md"
            >
              제출
            </button>
          </div>
        ) : (
          /* Result Card */
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-5 rounded-2xl border-2 text-center space-y-3 ${
                status === 'correct'
                  ? 'bg-emerald-950/80 border-emerald-500/80'
                  : 'bg-red-950/80 border-red-500/80'
              }`}
            >
              <div className="inline-flex flex-col items-center gap-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 border">
                  {status === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">정답! +{50 + combo * 10}점</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-300">시간 초과!</span>
                    </>
                  )}
                </div>
                {status === 'correct' && matchedTypedName && matchedTypedName.trim() !== targetCookie.name.ko && (
                  <span className="text-[11px] font-semibold text-yellow-300 bg-amber-950/90 px-2 py-0.5 rounded border border-yellow-500/30">
                    💡 입력: &quot;{matchedTypedName}&quot; → 공식 명칭: <strong className="text-amber-100">{targetCookie.name.ko}</strong>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <img
                  src={targetCookie.imageUrl}
                  alt={targetCookie.name.ko}
                  className="w-16 h-16 object-cover rounded-xl border border-amber-600/50"
                />
                <div className="text-left">
                  <h4 className="text-lg font-bold text-amber-100">{targetCookie.name.ko}</h4>
                  <p className="text-xs text-amber-300/80">
                    {targetCookie.rarity} · {targetCookie.classType}
                  </p>
                </div>
              </div>

              <button
                onClick={loadNextQuestion}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-xs shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>다음 문제</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
