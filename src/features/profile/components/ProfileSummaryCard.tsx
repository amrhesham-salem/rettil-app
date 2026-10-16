import React from 'react';
import { toArabicDigits } from '../../../utils';

interface ProfileSummaryCardProps {
  name: string;
  email: string;
  points: number;
}

export const ProfileSummaryCard: React.FC<ProfileSummaryCardProps> = ({
  name,
  email,
  points,
}) => (
  <div className="bg-brand-light rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-5 sm:justify-between border border-border-default">
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto text-center sm:text-right">
      <div className="w-20 h-20 sm:w-16 sm:h-16 shrink-0 rounded-full bg-brand-secondary text-white flex items-center justify-center text-[30px] sm:text-[26px] font-bold shadow-md">
        {name ? name.charAt(0) : 'أ'}
      </div>
      <div className="min-w-0 max-w-full">
        <h2 className="text-[20px] font-bold text-brand-dark truncate">{name}</h2>
        <p dir="ltr" className="text-gray-500 text-[13px] truncate">
          {email}
        </p>
      </div>
    </div>

    <div className="bg-brand-dark text-white w-full sm:w-auto px-5 py-3 rounded-2xl flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:min-w-25 shadow-sm">
      <span className="text-[12px] font-medium opacity-90">إجمالي النقاط</span>
      <span className="text-[24px] sm:text-[22px] font-bold tracking-wide">
        {toArabicDigits(points)}
      </span>
    </div>
  </div>
);
