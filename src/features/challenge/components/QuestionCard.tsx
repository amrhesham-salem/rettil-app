import React from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import type { ChallengeQuestion, SubmitAnswerResult } from '../../../types';

const ANSWER_BASE =
  'flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl border px-4 ' +
  'font-quran text-[16px] sm:text-[18px] leading-snug transition-all duration-150 cursor-pointer select-none';

const getAnswerClass = (
  answer: string,
  selectedAnswer: string | null,
  result: SubmitAnswerResult | null
): string => {
  if (!result) {
    return selectedAnswer === answer
      ? `${ANSWER_BASE} border-brand-primary bg-[#ECF7ED] text-brand-primary shadow-sm`
      : `${ANSWER_BASE} border-brand-sand bg-white text-brand-green hover:border-brand-secondary hover:bg-[#FAFAF7]`;
  }
  if (answer === result.correctAnswer) {
    return `${ANSWER_BASE} border-green-500 bg-green-100 text-correct-border`;
  }
  if (answer === selectedAnswer && !result.isCorrect) {
    return `${ANSWER_BASE} border-red-400 bg-red-50 text-red-600`;
  }
  return `${ANSWER_BASE} border-brand-sand bg-white text-brand-green opacity-60`;
};

export interface QuestionCardProps {
  question: ChallengeQuestion;
  selectedAnswer: string | null;
  result: SubmitAnswerResult | null;
  isSubmitting: boolean;
  onSelectAnswer: (answer: string) => void;
  onConfirm: () => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  result,
  isSubmitting,
  onSelectAnswer,
  onConfirm,
  onNext,
}) => (
  <>
    <p className="mb-3 text-[12px] sm:text-[13px] font-bold tracking-wide text-brand-secondary">
      {question.surah}
    </p>

    <p className="mb-2 font-quran text-[20px] sm:text-[23px] leading-loose text-brand-green">
      {question.previousAyah}
    </p>

    <div className="mb-2">
      <span className="inline-flex items-center rounded-xl border border-dashed border-brand-sand px-4 py-1 text-[11px] sm:text-[12px] font-bold text-brand-secondary bg-brand-cream">
        ... ما هي الآية التالية؟ ...
      </span>
    </div>

    <p className="mb-5 font-quran text-[20px] sm:text-[23px] leading-loose text-brand-green">
      {question.nextAyah}
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
      {question.options.map((option) => (
        <button
          key={option}
          type="button"
          disabled={result !== null || isSubmitting}
          onClick={() => onSelectAnswer(option)}
          className={getAnswerClass(option, selectedAnswer, result)}
        >
          <span className="font-quran">{option}</span>
          {result && option === result.correctAnswer && <Check size={16} className="shrink-0" />}
          {result && !result.isCorrect && option === selectedAnswer && (
            <X size={16} className="shrink-0" />
          )}
        </button>
      ))}
    </div>

    {result && (
      <div
        role="status"
        aria-live="polite"
        className={`mb-4 flex h-10 items-center justify-center gap-2 rounded-xl border px-5 text-[13px] font-bold ${
          result.isCorrect
            ? 'border-green-500 bg-green-100 text-[#2D7A3F]'
            : 'border-red-400 bg-red-50 text-red-600'
        }`}
      >
        {result.isCorrect ? <Check size={15} /> : <X size={15} />}
        <span>{result.isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة'}</span>
      </div>
    )}

    {!result ? (
      <button
        type="button"
        onClick={onConfirm}
        disabled={!selectedAnswer || isSubmitting}
        className="h-9 min-w-27.5 rounded-xl border-2 border-[#1F2937] bg-white px-7 text-[13px] font-bold text-[#1F2937] transition hover:bg-[#F7F3EA] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95 cursor-pointer"
      >
        {isSubmitting ? 'جارٍ التأكيد...' : 'تأكيد'}
      </button>
    ) : (
      <button
        type="button"
        onClick={onNext}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border-2 border-[#1F2937] bg-white px-7 text-[13px] font-bold text-[#1F2937] transition hover:bg-[#F7F3EA] active:scale-95 cursor-pointer"
      >
        <RotateCcw size={14} />
        <span>السؤال التالي</span>
      </button>
    )}
  </>
);
