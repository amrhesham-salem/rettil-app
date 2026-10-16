import React from 'react';
import type { LeaderboardEntry } from '../../../types';
import { toArabicDigits } from '../../../utils';

type MedalType = 'gold' | 'silver' | 'bronze';

interface PodiumEntry {
  name: string;
  points: number;
  rank: number;
}

const RibbonMedal: React.FC<{ type: MedalType }> = ({ type }) => {
  const medalColor = type === 'gold' ? '#E5A93C' : type === 'silver' ? '#BCC5CF' : '#B87343';
  const innerColor = type === 'gold' ? '#FCE082' : type === 'silver' ? '#E8EEF5' : '#D69466';
  const label = type === 'gold' ? '1' : type === 'silver' ? '2' : '3';

  return (
    <div className="relative flex flex-col items-center mt-3">
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
        <path d="M5 0L13 14L9 20L0 0H5Z" fill="#3B82F6" />
        <path d="M21 0L13 14L17 20L26 0H21Z" fill="#EF4444" />
        <path d="M9 0L13 10L17 0H9Z" fill="#FFFFFF" opacity="0.8" />
      </svg>
      <div
        className="w-6 h-6 rounded-full shadow-md flex items-center justify-center font-bold text-[10px] text-gray-900 -mt-2 border-2 border-white/70"
        style={{ background: `radial-gradient(circle at 35% 35%, ${innerColor}, ${medalColor})` }}
      >
        {label}
      </div>
    </div>
  );
};

const PodiumColumn: React.FC<{
  entry: PodiumEntry;
  medal: MedalType;
  avatarBg: string;
  avatarSize: string;
  barHeight: string;
  barGradient: string;
  barWidth: string;
}> = ({ entry, medal, avatarBg, avatarSize, barHeight, barGradient, barWidth }) => (
  <div className="flex flex-col items-center">
    <div
      className={`${avatarSize} rounded-full ${avatarBg} text-white font-bold flex items-center justify-center text-[15px] mb-1.5 shadow-sm`}
    >
      {entry.name.charAt(0)}
    </div>
    <span className="text-[13px] font-bold text-gray-800">{entry.name}</span>
    <span className="text-[12px] font-bold text-gray-500 mb-2">
      {toArabicDigits(entry.points)}
    </span>
    <div
      className={`${barWidth} ${barHeight} ${barGradient} rounded-t-2xl flex flex-col items-center shadow-md`}
    >
      <RibbonMedal type={medal} />
    </div>
  </div>
);

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ entries }) => {
  const first = entries.find((e) => e.rank === 1);
  const second = entries.find((e) => e.rank === 2);
  const third = entries.find((e) => e.rank === 3);

  if (!first || !second || !third) return null;

  return (
    <div className="lg:col-span-5 flex items-end justify-center gap-3 sm:gap-4 pb-2">
      <PodiumColumn
        entry={second}
        medal="silver"
        avatarBg="bg-[#1B4D5A]"
        avatarSize="w-11 h-11"
        barHeight="h-28"
        barWidth="w-[72px] sm:w-[88px]"
        barGradient="bg-linear-to-t from-[#648374] to-[#8FA4B0]"
      />
      <PodiumColumn
        entry={first}
        medal="gold"
        avatarBg="bg-brand-primary"
        avatarSize="w-12 h-12"
        barHeight="h-38"
        barWidth="w-20 sm:w-24"
        barGradient="bg-linear-to-t from-brand-primary to-[#D4B574]"
      />
      <PodiumColumn
        entry={third}
        medal="bronze"
        avatarBg="bg-brand-dark"
        avatarSize="w-11 h-11"
        barHeight="h-24"
        barWidth="w-[72px] sm:w-[88px]"
        barGradient="bg-linear-to-t from-brand-dark to-[#255840]"
      />
    </div>
  );
};
