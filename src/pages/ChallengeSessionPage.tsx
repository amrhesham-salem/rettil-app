import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/layout';
import { QuestionSkeleton } from '../components/ui';
import { QuestionCard } from '../features/challenge/components';
import challengeBackground from '../assets/images/challenge.png';
import { useAuth, useGenerateQuestion, useSubmitAnswer } from '../hooks';
import type { QuestionsParams, SubmitAnswerResult } from '../types';

const parseParams = (searchParams: URLSearchParams): QuestionsParams => ({
  mode: searchParams.get('mode') === 'specific' ? 'specific' : 'random',
  surah: searchParams.get('surah') ?? undefined,
  juz: searchParams.get('juz') ?? undefined,
});

export const ChallengeSessionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params = parseParams(searchParams);

  const { user, addHistoryRecord, addPoints } = useAuth();
  const { mutate: submitAnswer, isPending } = useSubmitAnswer();

  const [round, setRound] = useState(0);
  const [lastQuestionId, setLastQuestionId] = useState<string | undefined>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitAnswerResult | null>(null);

  const {
    data: question,
    isLoading,
    isError,
    refetch,
  } = useGenerateQuestion(params, round, lastQuestionId);

  const confirmAnswer = () => {
    if (!selectedAnswer || !question || isPending) return;

    submitAnswer(
      { questionId: question.id, answer: selectedAnswer },
      {
        onSuccess: (data) => {
          setResult(data);
          if (user) {
            addPoints(data.pointsEarned);
            addHistoryRecord({
              type: params.mode === 'specific' ? 'تحدٍ محدد' : 'تحدٍ عشوائي',
              surah: question.surah,
              juz: question.juz,
              status: data.isCorrect ? 'correct' : 'wrong',
            });
          }
        },
      }
    );
  };

  const nextQuestion = () => {
    setLastQuestionId(question?.id);
    setRound((prev) => prev + 1);
    setSelectedAnswer(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-brand-light text-right flex flex-col font-sans" dir="rtl">
      <Navbar />

      <main className="w-full flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        <div
          className="w-full max-w-295 h-[calc(100vh-90px)] max-h-190 min-h-145 relative flex items-center justify-center bg-no-repeat bg-center rounded-3xl"
          style={{ backgroundImage: `url(${challengeBackground})`, backgroundSize: '100% 100%' }}
        >
          <div className="relative z-10 w-[90%] sm:w-[75%] md:w-[60%] max-w-140 rounded-[22px] border border-brand-sand bg-white/98 backdrop-blur-md shadow-2xl px-5 sm:px-8 py-6 sm:py-7 my-auto text-center">
            {isLoading && <QuestionSkeleton />}

            {isError && (
              <div className="flex min-h-65 flex-col items-center justify-center gap-4">
                <p className="text-[14px] font-bold text-red-600">تعذّر تحميل السؤال</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="h-9 rounded-xl border-2 border-[#1F2937] px-7 text-[13px] font-bold text-[#1F2937] cursor-pointer hover:bg-[#F7F3EA]"
                >
                  إعادة المحاولة
                </button>
              </div>
            )}

            {!isLoading && !isError && !question && (
              <div className="flex min-h-65 items-center justify-center">
                <p className="text-[14px] font-bold text-brand-secondary">
                  لا توجد أسئلة متاحة لهذا الاختيار حالياً
                </p>
              </div>
            )}

            {question && (
              <QuestionCard
                question={question}
                selectedAnswer={selectedAnswer}
                result={result}
                isSubmitting={isPending}
                onSelectAnswer={setSelectedAnswer}
                onConfirm={confirmAnswer}
                onNext={nextQuestion}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
