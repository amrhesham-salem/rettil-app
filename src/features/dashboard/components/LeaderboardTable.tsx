import React from 'react';
import type { LeaderboardEntry } from '../../../types';
import { toArabicDigits } from '../../../utils';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => (
  <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs divide-y divide-gray-100">
    {entries.map((item) => (
      <div
        key={item.id}
        className={`flex items-center justify-between py-3 px-4 sm:px-5 transition-colors ${
          item.isCurrentUser
            ? 'bg-[#EDF5EE] border-y border-emerald-200 font-semibold'
            : 'hover:bg-gray-50/60'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${
              item.rank === 1
                ? 'bg-brand-primary text-white'
                : 'bg-border-default text-gray-700'
            }`}
          >
            {toArabicDigits(item.rank)}
          </div>
          <span className="text-[14px] font-bold text-gray-800">{item.name}</span>
        </div>

        <span className="text-[13px] font-bold text-gray-700 shrink-0">
          {toArabicDigits(item.points)} نقطة
        </span>
      </div>
    ))}
  </div>
);
