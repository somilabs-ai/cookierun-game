'use client';

import React from 'react';
import { DifficultyLevel } from '@/types/cookie';
import { Shield, Award, Flame, Shuffle } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
}

export const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  {
    title: string;
    badge: string;
    icon: React.ReactNode;
    langBadge: string;
    description: string;
    color: string;
  }
> = {
  normal: {
    title: 'Normal (노멀)',
    badge: '🇰🇷 한국어',
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
    langBadge: '한국어 명칭 & 대사',
    description: '기본 한국어 대사 및 명칭으로 쿠키를 맞춥니다.',
    color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
  },
  master: {
    title: 'Master (마스터)',
    badge: '🇺🇸 English',
    icon: <Award className="w-4 h-4 text-yellow-400" />,
    langBadge: '영어 스펠링 학습',
    description: '영어 대사 힌트를 보고 공식 English 쿠키 스펠링을 입력합니다.',
    color: 'border-yellow-500/50 bg-amber-950/40 text-yellow-300'
  },
  expert: {
    title: 'Expert (익스퍼트)',
    badge: '🇪🇸 Español / 🇯🇵 日本語',
    icon: <Flame className="w-4 h-4 text-red-400" />,
    langBadge: '스페인어/다국어 고급',
    description: '스페인어 등 고급 다국어 대사와 표기법으로 난이도가 상승합니다.',
    color: 'border-red-500/50 bg-red-950/40 text-red-300'
  },
  challenge: {
    title: 'Challenge (챌린지)',
    badge: '🎲 랜덤 언어 미션',
    icon: <Shuffle className="w-4 h-4 text-purple-400 animate-spin" />,
    langBadge: '무작위 요구 언어 미션',
    description: '문제마다 요구하는 언어(영어/스페인어/한국어/일본어)가 무작위로 변경됩니다!',
    color: 'border-purple-500/50 bg-purple-950/40 text-purple-300'
  }
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onSelectDifficulty
}) => {
  return (
    <div className="bg-amber-950/80 backdrop-blur-md rounded-2xl p-4 border border-amber-800/50 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-bold text-amber-300">
        <span className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-yellow-400" />
          <span>난이도 & 언어 환경설정</span>
        </span>
        <span className="text-[11px] text-amber-400/70">
          현재: {DIFFICULTY_CONFIG[difficulty].badge}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['normal', 'master', 'expert', 'challenge'] as DifficultyLevel[]).map((level) => {
          const cfg = DIFFICULTY_CONFIG[level];
          const isSelected = difficulty === level;
          return (
            <button
              key={level}
              onClick={() => onSelectDifficulty(level)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-800/80 to-amber-900/90 border-yellow-400 text-yellow-300 shadow-lg scale-[1.02] ring-1 ring-yellow-400/40'
                  : 'bg-amber-900/30 border-amber-800/40 text-amber-200 hover:bg-amber-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">{cfg.title}</span>
                {cfg.icon}
              </div>
              <span className="text-[10px] font-semibold opacity-80 mt-1 block">
                {cfg.langBadge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
