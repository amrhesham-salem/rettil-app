import React from 'react';
import { ChevronsLeft } from 'lucide-react';
import { toArabicDigits } from '../../../utils';
import historyBg from '../../../assets/images/HistorywithoutData.png';

interface DashboardHeroProps {
  firstName: string;
  totalPoints: number;
  onStartChallenge: () => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  firstName,
  totalPoints,
  onStartChallenge,
}) => (
  <div
    className="w-full bg-brand-dark rounded-3xl relative overflow-hidden p-6 sm:p-8 md:p-10 shadow-xl mb-10 md:mb-12 bg-cover bg-center"
    style={{ backgroundImage: `url(${historyBg})` }}
  >
    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="text-center sm:text-right">
        <span className="text-emerald-100/90 text-[14px] font-medium block mb-1">
          السلام عليكم
        </span>
        <h1 className="text-white text-[28px] sm:text-[34px] md:text-[40px] font-bold mb-2">
          {firstName ? `يا ${firstName}` : 'يا ضيفنا الكريم'}
        </h1>
        <p className="text-emerald-100/75 text-[14px] mb-6">
          هل أنت مستعد لتحدٍ جديد؟
        </p>

        <button
          type="button"
          onClick={onStartChallenge}
          className="bg-brand-secondary hover:bg-[#73582E] text-white font-bold py-3 px-7 rounded-xl inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer text-[14px]"
        >
          <span>ابدأ التحدي</span>
          <ChevronsLeft size={18} />
        </button>
      </div>

      <div className="bg-[#072818]/70 border border-white/10 rounded-2xl py-4 px-6 sm:px-8 text-center backdrop-blur-xs w-full sm:w-auto min-w-38.75">
        <span className="text-emerald-100/80 text-[13px] font-bold block mb-1">
          إجمالي النقاط
        </span>
        <span className="text-white text-[32px] sm:text-[34px] md:text-[36px] font-bold tracking-wide">
          {toArabicDigits(totalPoints)}
        </span>
      </div>
    </div>
  </div>
);
