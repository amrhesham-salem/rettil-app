import React from 'react';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { SURAHS, JUZ_NUMBERS } from '../../../constants';
import type { SpecificChallengeFormData } from '../../../schemas';

const SELECT_CLASS =
  'h-11 w-full rounded-lg border border-brand-sand bg-white px-4 text-right text-[14px] font-bold text-brand-dark outline-none transition focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15';

interface SpecificChallengeCardProps {
  formData: SpecificChallengeFormData;
  errors: Partial<Record<keyof SpecificChallengeFormData, string>>;
  onFieldChange: (field: keyof SpecificChallengeFormData, value: string) => void;
  onStart: () => void;
}

export const SpecificChallengeCard: React.FC<SpecificChallengeCardProps> = ({
  formData,
  errors,
  onFieldChange,
  onStart,
}) => (
  <section className="w-full rounded-3xl sm:rounded-[28px] border-2 border-brand-secondary/65 bg-white px-5 sm:px-8 py-7 sm:py-8 text-center shadow-sm md:px-16 lg:px-24">
    <div className="mb-3 flex items-center justify-center gap-2 text-brand-secondary">
      <SlidersHorizontal size={20} />
      <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111827]">تحدي محدد</h2>
    </div>
    <p className="mb-7 sm:mb-8 text-[13px] font-medium text-[#6B7280]">
      صمم جلستك وحدد بدقة النطاق القرآني ومستوى الأسئلة
    </p>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="block text-right">
        <span className="mb-2 block text-[13px] font-bold text-[#111827]">السورة</span>
        <select
          value={formData.surah}
          onChange={(e) => onFieldChange('surah', e.target.value)}
          className={`${SELECT_CLASS} ${errors.surah ? 'border-red-500 focus:border-red-500' : ''}`}
        >
          <option value="">اختر السورة</option>
          {SURAHS.map((surah) => (
            <option key={surah} value={surah}>
              {surah}
            </option>
          ))}
        </select>
        {errors.surah && (
          <span className="mt-2 block text-[12px] font-medium text-red-500">
            {errors.surah}
          </span>
        )}
      </label>

      <label className="block text-right">
        <span className="mb-2 block text-[13px] font-bold text-[#111827]">الجزء</span>
        <select
          value={formData.juz}
          onChange={(e) => onFieldChange('juz', e.target.value)}
          className={`${SELECT_CLASS} ${errors.juz ? 'border-red-500 focus:border-red-500' : ''}`}
        >
          <option value="">اختر الجزء</option>
          {JUZ_NUMBERS.map((juz) => (
            <option key={juz} value={juz}>
              الجزء {juz}
            </option>
          ))}
        </select>
        {errors.juz && (
          <span className="mt-2 block text-[12px] font-medium text-red-500">
            {errors.juz}
          </span>
        )}
      </label>
    </div>

    <button
      type="button"
      onClick={onStart}
      className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-secondary px-6 sm:px-8 text-[14px] font-bold text-white shadow-sm transition hover:bg-[#73582E]"
    >
      <span>ابدأ التحدي المحدد</span>
      <ChevronLeft size={17} />
    </button>
  </section>
);
