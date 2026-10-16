import type {
  ChallengeQuestion,
  QuestionsParams,
  SubmitAnswerPayload,
  SubmitAnswerResult,
} from '../types';

interface StoredQuestion extends ChallengeQuestion {
  correctAnswer: string;
}

const QUESTIONS_POOL: StoredQuestion[] = [
  {
    id: 'baqarah-2',
    surah: 'سورة البقرة',
    juz: '1',
    previousAyah: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ',
    nextAyah: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
    options: [
      'وَاللَّهُ غَفُورٌ رَّحِيمٌ',
      'هُدًى لِّلْمُتَّقِينَ',
      'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
      'وَاللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ',
    ],
    correctAnswer: 'هُدًى لِّلْمُتَّقِينَ',
  },
  {
    id: 'baqarah-3',
    surah: 'سورة البقرة',
    juz: '1',
    previousAyah: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ',
    nextAyah: 'وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
    options: [
      'وَيُقِيمُونَ الصَّلَاةَ',
      'وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
      'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ',
      'أُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
    ],
    correctAnswer: 'وَيُقِيمُونَ الصَّلَاةَ',
  },
];

const POINTS_PER_CORRECT = 10;
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
const shuffle = <T,>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5);

const toPublicQuestion = (q: StoredQuestion): ChallengeQuestion => ({
  id: q.id,
  surah: q.surah,
  juz: q.juz,
  previousAyah: q.previousAyah,
  nextAyah: q.nextAyah,
  options: shuffle(q.options),
});

export const challengeService = {
  async generateQuestion(
    params: QuestionsParams,
    excludeId?: string
  ): Promise<ChallengeQuestion | null> {
    await delay();

    let pool = QUESTIONS_POOL;
    if (params.mode === 'specific' && params.surah) {
      const filtered = QUESTIONS_POOL.filter((q) => q.surah === `سورة ${params.surah}`);
      pool = filtered.length > 0 ? filtered : QUESTIONS_POOL;
    }

    const withoutLast = pool.filter((q) => q.id !== excludeId);
    const candidates = withoutLast.length > 0 ? withoutLast : pool;
    if (candidates.length === 0) return null;

    return toPublicQuestion(candidates[Math.floor(Math.random() * candidates.length)]);
  },

  async submitAnswer(payload: SubmitAnswerPayload): Promise<SubmitAnswerResult> {
    await delay(250);

    const question = QUESTIONS_POOL.find((q) => q.id === payload.questionId);
    if (!question) throw new Error('السؤال غير موجود');

    const isCorrect = payload.answer === question.correctAnswer;
    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      pointsEarned: isCorrect ? POINTS_PER_CORRECT : 0,
    };
  },
};
