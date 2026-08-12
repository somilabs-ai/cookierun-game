'use client';

import React from 'react';
import { ItemInventory } from '@/lib/items';
import { LanguageCode } from '@/types/cookie';
import { UI_TRANSLATIONS } from '@/lib/i18n';
import { Sparkles, Compass, Search } from 'lucide-react';

interface ItemBadgeBarProps {
  inventory: ItemInventory;
  activeLang?: LanguageCode;
}

export const ItemBadgeBar: React.FC<ItemBadgeBarProps> = ({
  inventory,
  activeLang = 'ko'
}) => {
  const t = UI_TRANSLATIONS[activeLang] || UI_TRANSLATIONS.ko;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-bold text-slate-200 shadow-md">
      <div className="flex items-center gap-1.5 text-amber-400">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        <span>{t.inventoryTitle}</span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Answer Item */}
        <div className="flex items-center gap-1.5 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30 text-purple-200">
          <Compass className="w-3.5 h-3.5 text-purple-300 animate-spin-slow" />
          <span>{t.answerCompass}:</span>
          <span className="text-yellow-300 font-extrabold">{inventory.answerItems} / 5</span>
          <span className="text-[10px] text-purple-400 font-normal ml-0.5 hidden sm:inline">({t.perDay})</span>
        </div>

        {/* Hint Item */}
        <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-amber-200">
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.hintMagnifier}:</span>
          <span className="text-yellow-300 font-extrabold">{inventory.hintItems} / 3</span>
          <span className="text-[10px] text-slate-400 font-normal ml-0.5 hidden sm:inline">({t.perHour})</span>
        </div>
      </div>
    </div>
  );
};
