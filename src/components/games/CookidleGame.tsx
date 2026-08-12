'use client';

import React, { useState, useEffect } from 'react';
import { COOKIES_DATA } from '@/data/cookies';
import { CookieData } from '@/types/cookie';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookidleGameProps {
  onSuccess: (points: number) => void;
  onFailure: () => void;
}

export const CookidleGame: React.FC<CookidleGameProps> = ({ onSuccess }) => {
  const [targetCookie, setTargetCookie] = useState<CookieData | null>(null);
  const [query, setQuery] = useState<string>('');
  const [guesses, setGuesses] = useState<CookieData[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);

  const initNewGame = () => {
    const randomIndex = Math.floor(Math.random() * COOKIES_DATA.length);
    setTargetCookie(COOKIES_DATA[randomIndex]);
    setGuesses([]);
    setQuery('');
    setIsWon(false);
  };

  useEffect(() => {
    initNewGame();
  }, []);

  if (!targetCookie) return null;

  const suggestions = query.trim().length > 0
    ? COOKIES_DATA.filter(
        (c) =>
          c.name.ko.includes(query.trim()) && !guesses.some((g) => g.id === c.id)
      ).slice(0, 5)
    : [];

  const handleGuess = (cookie: CookieData) => {
    if (isWon || guesses.some((g) => g.id === cookie.id)) return;

    const newGuesses = [cookie, ...guesses];
    setGuesses(newGuesses);
    setQuery('');

    if (cookie.id === targetCookie.id) {
      setIsWon(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      const points = Math.max(120 - newGuesses.length * 15, 30);
      onSuccess(points);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-yellow-900/60 rounded-2xl p-5 border border-amber-700/50 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>서브 모드 4</span>
        </div>
        <h2 className="text-2xl font-black text-amber-100">쿠키들 (Cookidle)</h2>
        <p className="text-xs text-amber-300/80 mt-1">
          속성(등급, 유형, 포지션, 원소, 출시년도) 힌트를 조합하여 정답 쿠키를 맞춰보세요!
        </p>
      </div>

      {/* Main Game Area */}
      <div className="bg-amber-950/80 backdrop-blur-md rounded-2xl p-6 border border-amber-800/50 shadow-2xl space-y-6">
        {/* Search Input */}
        {!isWon && (
          <div className="relative space-y-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="추측할 쿠키 이름 검색..."
              className="w-full bg-amber-950 border border-amber-700/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-amber-500/60 focus:outline-none focus:border-amber-400"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-amber-950 border border-amber-700/80 rounded-xl overflow-hidden shadow-2xl divide-y divide-amber-900/60">
                {suggestions.map((cookie) => (
                  <button
                    key={cookie.id}
                    onClick={() => handleGuess(cookie)}
                    className="w-full px-4 py-2.5 text-left text-xs sm:text-sm text-amber-200 hover:bg-amber-900/60 flex items-center justify-between transition-colors"
                  >
                    <span className="font-semibold">{cookie.name.ko}</span>
                    <span className="text-[10px] text-amber-400">{cookie.rarity} · {cookie.classType}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Victory Card */}
        {isWon && (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-b from-amber-900/80 to-amber-950/95 rounded-2xl p-6 border-2 border-yellow-400 text-center space-y-3 shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{guesses.length}회 만에 정답 성공!</span>
              </div>
              <h3 className="text-2xl font-black text-amber-100">{targetCookie.name.ko}</h3>
              <p className="text-xs text-amber-300/80">
                {targetCookie.rarity} · {targetCookie.classType} · {targetCookie.position} · {targetCookie.releaseYear}년
              </p>
              <button
                onClick={initNewGame}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-xs shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>다음 새로운 문제</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Guesses Attribute Comparison Table */}
        {guesses.length > 0 && (
          <div className="space-y-2 overflow-x-auto">
            <div className="grid grid-cols-6 gap-2 min-w-[500px] text-center text-[11px] font-bold text-amber-400 pb-1 border-b border-amber-800/40">
              <span>쿠키</span>
              <span>등급</span>
              <span>유형</span>
              <span>포지션</span>
              <span>원소</span>
              <span>출시년도</span>
            </div>

            <div className="space-y-2 min-w-[500px]">
              {guesses.map((g) => {
                const isRarityMatch = g.rarity === targetCookie.rarity;
                const isClassMatch = g.classType === targetCookie.classType;
                const isPositionMatch = g.position === targetCookie.position;
                const isElementMatch = g.element === targetCookie.element;
                const isYearMatch = g.releaseYear === targetCookie.releaseYear;

                return (
                  <motion.div
                    key={g.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-6 gap-2 text-center text-xs font-semibold"
                  >
                    {/* Name */}
                    <div className="bg-amber-900/60 p-2.5 rounded-lg border border-amber-800/40 text-amber-100 truncate flex items-center justify-center">
                      {g.name.ko}
                    </div>

                    {/* Rarity */}
                    <div
                      className={`p-2.5 rounded-lg border flex items-center justify-center ${
                        isRarityMatch
                          ? 'bg-emerald-600/80 border-emerald-400 text-white'
                          : 'bg-red-900/60 border-red-700/50 text-red-200'
                      }`}
                    >
                      {g.rarity}
                    </div>

                    {/* Class */}
                    <div
                      className={`p-2.5 rounded-lg border flex items-center justify-center ${
                        isClassMatch
                          ? 'bg-emerald-600/80 border-emerald-400 text-white'
                          : 'bg-red-900/60 border-red-700/50 text-red-200'
                      }`}
                    >
                      {g.classType}
                    </div>

                    {/* Position */}
                    <div
                      className={`p-2.5 rounded-lg border flex items-center justify-center ${
                        isPositionMatch
                          ? 'bg-emerald-600/80 border-emerald-400 text-white'
                          : 'bg-red-900/60 border-red-700/50 text-red-200'
                      }`}
                    >
                      {g.position}
                    </div>

                    {/* Element */}
                    <div
                      className={`p-2.5 rounded-lg border flex items-center justify-center ${
                        isElementMatch
                          ? 'bg-emerald-600/80 border-emerald-400 text-white'
                          : 'bg-red-900/60 border-red-700/50 text-red-200'
                      }`}
                    >
                      {g.element}
                    </div>

                    {/* Release Year */}
                    <div
                      className={`p-2.5 rounded-lg border flex items-center justify-center gap-1 ${
                        isYearMatch
                          ? 'bg-emerald-600/80 border-emerald-400 text-white'
                          : 'bg-red-900/60 border-red-700/50 text-red-200'
                      }`}
                    >
                      <span>{g.releaseYear}</span>
                      {!isYearMatch && (
                        g.releaseYear < targetCookie.releaseYear ? (
                          <ArrowUp className="w-3 h-3 text-yellow-300" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-yellow-300" />
                        )
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
