'use client';

import React, { useState, useEffect } from 'react';
import { COOKIES_DATA } from '@/data/cookies';
import { CookieData } from '@/types/cookie';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Heart, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const IdealWorldcupGame: React.FC = () => {
  const [bracketSize, setBracketSize] = useState<number>(8);
  const [contestants, setContestants] = useState<CookieData[]>([]);
  const [currentRound, setCurrentRound] = useState<CookieData[]>([]);
  const [nextRoundWinners, setNextRoundWinners] = useState<CookieData[]>([]);
  const [matchIndex, setMatchIndex] = useState<number>(0);
  const [winner, setWinner] = useState<CookieData | null>(null);
  const [rankings, setRankingStats] = useState<Record<string, number>>({});

  // Initialize tournament
  const startWorldcup = (size: number) => {
    setBracketSize(size);
    // Shuffle and pick size cookies
    const shuffled = [...COOKIES_DATA].sort(() => Math.random() - 0.5).slice(0, size);
    setContestants(shuffled);
    setCurrentRound(shuffled);
    setNextRoundWinners([]);
    setMatchIndex(0);
    setWinner(null);
  };

  useEffect(() => {
    startWorldcup(8);
  }, []);

  const handleSelectWinner = (selectedCookie: CookieData) => {
    const updatedWinners = [...nextRoundWinners, selectedCookie];

    // Track ranking stats locally
    setRankingStats((prev) => ({
      ...prev,
      [selectedCookie.id]: (prev[selectedCookie.id] || 0) + 1
    }));

    if (matchIndex + 2 < currentRound.length) {
      // Move to next match in current round
      setNextRoundWinners(updatedWinners);
      setMatchIndex((prev) => prev + 2);
    } else {
      // Current round finished!
      if (updatedWinners.length === 1) {
        // Tournament Winner!
        setWinner(updatedWinners[0]);
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
      } else {
        // Advance to next round (e.g. 8강 -> 4강 -> 결승)
        setCurrentRound(updatedWinners);
        setNextRoundWinners([]);
        setMatchIndex(0);
      }
    }
  };

  const getRoundLabel = (remainingCount: number) => {
    if (remainingCount === 2) return '🏆 결승전 (FINAL)';
    if (remainingCount === 4) return '🔥 준결승 (4강)';
    return `⚔️ ${remainingCount}강 대결`;
  };

  const cookieA = currentRound[matchIndex];
  const cookieB = currentRound[matchIndex + 1];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-yellow-900/60 rounded-2xl p-5 border border-amber-700/50 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold mb-2">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          <span>서브 모드 1</span>
        </div>
        <h2 className="text-2xl font-black text-amber-100">쿠키 이상형 월드컵</h2>
        <p className="text-xs text-amber-300/80 mt-1">
          2명의 쿠키 중 내 마음속에 저장하고 싶은 최애 쿠키를 선택해 주세요!
        </p>

        {/* Bracket Size Buttons */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[8, 16].map((size) => (
            <button
              key={size}
              onClick={() => startWorldcup(size)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                bracketSize === size
                  ? 'bg-yellow-400 text-amber-950 shadow-md'
                  : 'bg-amber-950/80 text-amber-300 border border-amber-700/50 hover:bg-amber-900'
              }`}
            >
              {size}강 시작하기
            </button>
          ))}
        </div>
      </div>

      {/* Main Tournament Match / Winner View */}
      {!winner && cookieA && cookieB ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300 px-2">
            <span>{getRoundLabel(currentRound.length)}</span>
            <span>
              {matchIndex / 2 + 1} / {currentRound.length / 2} 매치
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[cookieA, cookieB].map((cookie) => (
              <motion.div
                key={cookie.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectWinner(cookie)}
                className="bg-amber-950/80 hover:bg-amber-900/90 border-2 border-amber-700/60 hover:border-yellow-400 rounded-2xl p-5 shadow-2xl cursor-pointer transition-all text-center space-y-3 group"
              >
                <div className="relative mx-auto w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-600/50 group-hover:border-yellow-400 shadow-md">
                  <img
                    src={cookie.imageUrl}
                    alt={cookie.name.ko}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-950/90 text-yellow-300 border border-amber-600/50">
                      {cookie.rarity}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-amber-100 group-hover:text-yellow-300 transition-colors">
                    {cookie.name.ko}
                  </h3>
                  <p className="text-xs text-amber-300/80">
                    {cookie.classType} · {cookie.position}
                  </p>
                  <p className="text-xs text-amber-200/90 italic font-serif mt-2 line-clamp-2">
                    &quot;{cookie.quote.ko}&quot;
                  </p>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 group-hover:from-amber-400 group-hover:to-yellow-400">
                  <Heart className="w-4 h-4 fill-amber-950" />
                  <span>이 쿠키 선택하기</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Winner Display */
        winner && (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-b from-amber-900/80 to-amber-950/95 rounded-2xl p-8 border-2 border-yellow-400 text-center space-y-5 shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/50 text-sm font-black">
                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-bounce" />
                <span>최종 우승 쿠키!</span>
              </div>

              <div className="mx-auto w-44 h-44 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl relative">
                <img src={winner.imageUrl} alt={winner.name.ko} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-extrabold text-yellow-300 px-3 py-1 rounded bg-amber-950 border border-yellow-500/40 inline-block">
                  {winner.rarity}
                </span>
                <h3 className="text-3xl font-black text-amber-100">{winner.name.ko}</h3>
                <p className="text-sm text-amber-300">
                  {winner.classType} · {winner.position} · {winner.element} 속성
                </p>
                <p className="text-sm text-amber-200 italic font-serif mt-2">&quot;{winner.quote.ko}&quot;</p>
              </div>

              <button
                onClick={() => startWorldcup(bracketSize)}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-amber-950 font-black text-sm shadow-xl inline-flex items-center gap-2 transition-transform active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>다시 도전하기</span>
              </button>
            </motion.div>
          </AnimatePresence>
        )
      )}

      {/* Popularity Leaderboard Preview */}
      <div className="bg-amber-950/60 rounded-2xl p-5 border border-amber-800/40 space-y-3">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
          <BarChart2 className="w-4 h-4 text-yellow-400" />
          <span>내 토너먼트 인기 차트</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COOKIES_DATA.slice(0, 4).map((c) => (
            <div key={c.id} className="bg-amber-900/40 p-2.5 rounded-xl border border-amber-800/30 text-center">
              <span className="text-xs font-bold text-amber-100 block truncate">{c.name.ko}</span>
              <span className="text-[10px] text-amber-400 font-semibold">
                {rankings[c.id] || 0}승 득표
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
