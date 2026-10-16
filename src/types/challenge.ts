export type ChallengeMode = 'random' | 'specific';

export interface QuestionsParams {
  mode: ChallengeMode;
  surah?: string;
  juz?: string;
}

/**
 * بيانات السؤال المعروضة للمستخدم.
 * ملاحظة أمنية: `correctAnswer` لا يتم إرسالها هنا؛ التحقق يتم عبر `submitAnswer`.
 */
export interface ChallengeQuestion {
  id: string;
  surah: string;
  juz: string;
  previousAyah: string;
  nextAyah: string;
  options: string[];
}

export interface SubmitAnswerPayload {
  questionId: string;
  answer: string;
}

export interface SubmitAnswerResult {
  isCorrect: boolean;
  correctAnswer: string;
  pointsEarned: number;
}