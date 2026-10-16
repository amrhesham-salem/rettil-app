import { Check } from 'lucide-react';
import { QUIZ_PREVIEW } from '../../../data/landing.data';
import challengeBg from '../../../assets/images/challenge.png';

const OPTION_BASE = 'py-3 px-4 rounded-2xl border text-[16px] shadow-sm';
const OPTION_DEFAULT = 'border-brand-sand-light bg-white text-brand-green';
const OPTION_CORRECT =
  'border-correct-border bg-correct-bg text-correct-text flex items-center justify-center gap-2';

export const QuizPreviewSection = () => (
  <section dir="rtl" className="w-full bg-brand-dark flex justify-center overflow-hidden">
    <div
      className="relative w-full max-w-350 aspect-1223/773 min-h-160 bg-no-repeat bg-center bg-size-[100%_100%] flex items-center justify-center px-4 sm:px-8"
      style={{ backgroundImage: `url(${challengeBg})` }}
    >
      <div className="w-full max-w-180 relative z-10 -mt-4">
        <span className="flex items-center justify-center gap-2 text-brand-secondary text-[13px] font-bold mb-3">
          <span className="w-5 h-px bg-brand-secondary/60" />
          معاينة الاختبار
        </span>

        <h2 className="text-center text-[26px] sm:text-[32px] font-extrabold text-black mb-8 sm:mb-10">
          واجهة اختبار هادئة وواضحة
        </h2>

        <div className="bg-white rounded-[28px] px-6 py-7 sm:px-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] text-center border border-brand-sand-light">
          <p className="text-[12px] font-bold text-brand-secondary mb-5">{QUIZ_PREVIEW.surah}</p>

          <p className="text-[18px] sm:text-[20px] text-brand-green leading-loose mb-2">
            {QUIZ_PREVIEW.previousAyah}
          </p>

          <span className="inline-block border border-dashed border-brand-sand bg-brand-cream text-brand-secondary px-4 py-1.5 rounded-xl text-[12px] font-medium mb-2">
            {QUIZ_PREVIEW.prompt}
          </span>

          <p className="text-[18px] sm:text-[20px] text-brand-green leading-loose mb-6">
            {QUIZ_PREVIEW.nextAyah}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUIZ_PREVIEW.options.map((option) => (
              <div
                key={option.text}
                className={`${OPTION_BASE} ${option.correct ? OPTION_CORRECT : OPTION_DEFAULT}`}
              >
                {option.correct && <Check size={16} />}
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);