import React from 'react';
import { ChevronLeft, Dice5 } from 'lucide-react';

interface RandomChallengeCardProps {
  onStart: () => void;
}

export const RandomChallengeCard: React.FC<RandomChallengeCardProps> = ({ onStart }) => (
  <section className="relative mb-6 sm:mb-10 w-full overflow-hidden rounded-3xl sm:rounded-[28px] border-2 border-brand-secondary/80 bg-brand-dark px-5 sm:px-7 py-7 sm:py-8 text-center shadow-sm md:px-12">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,111,68,0.75),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(9,64,38,0.85),transparent_32%),linear-gradient(135deg,#064323,#00572F_48%,#003D22)]" />
    <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-size-[30px_30px]" />

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
