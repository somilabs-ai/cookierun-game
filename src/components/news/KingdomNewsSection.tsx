'use client';

import React, { useState } from 'react';
import { COOKIE_NEWS_DATA } from '@/data/news';
import { NewsCategory } from '@/types/cookie';
import { Newspaper, Gift, Bell, Sparkles, ExternalLink, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const KingdomNewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNews = selectedCategory === 'ALL'
    ? COOKIE_NEWS_DATA
    : COOKIE_NEWS_DATA.filter((n) => n.category === selectedCategory);

  const handleCopyCoupon = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryBadge = (cat: NewsCategory) => {
    switch (cat) {
      case 'COUPON':
        return { label: '🎁 쿠폰 & 이벤트', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'NEW_COOKIE':
        return { label: '🍪 신규 쿠키', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' };
      case 'PATCH_NOTE':
        return { label: '🛠️ 패치노트', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'NOTICE':
      default:
        return { label: '📢 공지사항', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-yellow-900/60 rounded-2xl p-6 border border-amber-700/50 shadow-xl text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold mb-2">
          <Newspaper className="w-4 h-4 text-yellow-400" />
          <span>쿠키런: 킹덤 최신 정보 센터</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-100">왕국소식 & 스페셜 쿠폰</h2>
        <p className="text-xs sm:text-sm text-amber-300/80 mt-1 max-w-xl mx-auto">
          최신 쿠키런 킹덤 패치노트, 신규 쿠키 정보 및 지급 쿠폰 코드를 실시간으로 확인하고 등록하세요!
        </p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mt-5">
          {[
            { id: 'ALL', label: '전체' },
            { id: 'COUPON', label: '🎁 쿠폰' },
            { id: 'NEW_COOKIE', label: '🍪 신규 쿠키' },
            { id: 'PATCH_NOTE', label: '🛠️ 패치노트' },
            { id: 'NOTICE', label: '📢 공지' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-yellow-400 text-amber-950 shadow-md scale-105'
                  : 'bg-amber-950/80 text-amber-300 border border-amber-700/50 hover:bg-amber-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNews.map((news) => {
          const badge = getCategoryBadge(news.category);
          return (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-amber-950/80 backdrop-blur-md border rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden ${
                news.isImportant ? 'border-yellow-400/80 ring-1 ring-yellow-400/30' : 'border-amber-800/50'
              }`}
            >
              <div className="space-y-3">
                {/* Top Meta Row */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${badge.color}`}>
                    {badge.label}
                  </span>
                  <span className="text-[11px] text-amber-400/70 font-semibold">{news.date}</span>
                </div>

                {/* Title & Summary */}
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-amber-100 hover:text-yellow-300 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-amber-300/80 leading-relaxed line-clamp-2">
                    {news.summary}
                  </p>
                </div>

                {/* Coupon Code Highlight Box if present */}
                {news.couponCode && (
                  <div className="bg-gradient-to-r from-emerald-950/80 to-amber-950/90 p-3 rounded-xl border border-emerald-500/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-extrabold block">쿠폰 코드</span>
                      <span className="text-sm font-mono font-black text-yellow-300 tracking-wider">
                        {news.couponCode}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCoupon(news.couponCode!, news.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-amber-950 font-black text-xs shadow inline-flex items-center gap-1 transition-all"
                    >
                      {copiedId === news.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>복사됨!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>복사</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs">
                <a
                  href={news.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 font-bold inline-flex items-center gap-1"
                >
                  <span>공식 안내 보기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {news.couponCode && (
                  <a
                    href="https://game.devsisters.com/ko/cookierun-kingdom/coupon/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold underline text-[11px]"
                  >
                    👉 데브시스터즈 공식 쿠폰 등록 페이지
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
