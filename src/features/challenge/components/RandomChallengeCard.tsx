import React from 'react';
import { ChevronLeft, Dice5 } from 'lucide-react';
import historyBg from '../../../assets/images/HistorywithoutData.png';

interface RandomChallengeCardProps {
  onStart: () => void;
}

export const RandomChallengeCard: React.FC<RandomChallengeCardProps> = ({ onStart }) => (
  <section
    className="relative mb-6 sm:mb-10 w-full overflow-hidden rounded-3xl sm:rounded-[28px] border-2 border-brand-secondary/80 bg-brand-dark bg-cover bg-center px-5 sm:px-7 py-7 sm:py-8 text-center shadow-sm md:px-12"
    style={{ backgroundImage: `url(${historyBg})` }}
  >
    <div className="relative z-10">
      <div className="mb-3 flex items-center justify-center gap-2 text-white">
        <Dice5 size={17} />
        <h2 className="text-[18px] sm:text-[19px] font-bold">تحدي عشوائي</h2>
      </div>
      <p className="mx-auto mb-7 sm:mb-8 max-w-lg text-[13px] font-medium leading-7 text-emerald-50/85">
        اختبار فوري يختبر قوة استحضارك لآيات عشوائية من كامل السور التي تم تثبيتها في سجل
        حفظك، مثالي لتنشيط الذاكرة قبل الورد اليومي.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-secondary px-6 sm:px-8 text-[14px] font-bold text-white shadow-sm transition hover:bg-[#73582E]"
      >
        <span>ابدأ التحدي العشوائي</span>
        <ChevronLeft size={17} />
      </button>
    </div>
  </section>
);
