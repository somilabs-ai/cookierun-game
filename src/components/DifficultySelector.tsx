'use client';

import React from 'react';
import { DifficultyLevel } from '@/types/cookie';
import { Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
}

const DIFFICULTIES: { id: DifficultyLevel; label: string; flag: string; langName: string; note: string; isHot?: boolean }[] = [
  { id: 'normal', label: 'Normal', flag: '🇰🇷', langName: '한국어 기본', note: '한국어 대사 & 정답' },
  { id: 'master', label: 'Master', flag: '🇺🇸', langName: 'English (영어)', note: '영어 대사 & 공식 스펠링' },
  { id: 'expert', label: 'Expert', flag: '🇪🇸', langName: 'Español (스페인어)', note: '스페인어/다국어 모드' },
  { id: 'challenge', label: 'Challenge', flag: '🎲', langName: '랜덤 언어 미션', note: '문제마다 무작위 변경 (+1.5x)', isHot: true }
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onSelectDifficulty
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Globe2 className="w-4 h-4" />
          <span>언어 & 난이도 설정 (Difficulty & Language Mode)</span>
        </div>
        <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">
          학습할 언어 난이도를 클릭하세요!
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DIFFICULTIES.map((item) => {
          const isSelected = difficulty === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectDifficulty(item.id)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-amber-500/80 text-amber-200 shadow-md scale-[1.01]'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <span>{item.flag}</span>
                    <span className={isSelected ? 'text-amber-300 font-extrabold' : 'text-slate-200'}>{item.label}</span>
                  </div>
                  {item.isHot && (
                    <span className="text-[9px] font-black px-1 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                      HOT
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-semibold text-slate-300">{item.langName}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{item.note}</p>
              </div>

              {isSelected && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-amber-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  <span>적용 중</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
