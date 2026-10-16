import React from 'react';
import { ClipboardList } from 'lucide-react';

interface HistoryEmptyStateProps {
  onStartChallenge: () => void;
}

export const HistoryEmptyState: React.FC<HistoryEmptyStateProps> = ({ onStartChallenge }) => (
  <div className="relative z-10 w-full max-w-lg bg-brand-light rounded-[28px] p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center my-auto">
    <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center mb-6 text-brand-dark">
      <ClipboardList size={32} />
    </div>

    <h2 className="text-[26px] font-bold text-brand-dark mb-3">
      لم تخض أي اختبار بعد
    </h2>

    <p className="text-gray-500 text-[14px] mb-8">
      ابدأ أول تحدٍ لك وشاهد نتائجك هنا.
    </p>

    <button
      onClick={onStartChallenge}
      className="bg-brand-secondary hover:bg-[#73582E] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md cursor-pointer text-[14px]"
    >
      ابدأ أول اختبار
    </button>
  </div>
);
