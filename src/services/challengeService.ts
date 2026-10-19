import { api } from '../lib/axios';
import { API_ENDPOINTS } from '../config/endpoints';
import type {
  ChallengeQuestion,
  QuestionsParams,
  SubmitAnswerPayload,
  SubmitAnswerResult,
} from '../types';

// حفظ خريطة الخيارات لكل جلسة لإرسال رقم الإجابة كما يطلبه الباك إند
const sessionOptionMap = new Map<string, Map<string, number>>();

interface RawOption {
  id?: number;
  number?: number;
  value?: number;
  text?: string;
  ayah_text?: string;
  option?: string;
}

export const challengeService = {
  // POST /game/generate/
  async generateQuestion(params: QuestionsParams): Promise<ChallengeQuestion | null> {
    const payload: Record<string, unknown> = {
      challenge_type: params.mode === 'specific' ? 'specific' : 'random',
    };

    if (params.mode === 'specific') {
      if (params.surah) payload.surah = Number(params.surah);
      if (params.juz) payload.juz = Number(params.juz);
    }

    const { data } = await api.post<Record<string, unknown>>(
      API_ENDPOINTS.game.generateQuestion,
      payload
    );

    if (!data) return null;

    const sessionId = String(data.session_id ?? data.id ?? Date.now());
    const rawOptions = (data.options ?? data.choices ?? data.answers ?? []) as (
      | string
      | RawOption
    )[];

    const optionMap = new Map<string, number>();
    const options: string[] = rawOptions.map((opt, idx) => {
      if (typeof opt === 'string') {
        optionMap.set(opt, idx + 1);
        return opt;
      }
      const text = opt.text ?? opt.ayah_text ?? opt.option ?? String(opt);
      const id = opt.id ?? opt.number ?? opt.value ?? idx + 1;
      optionMap.set(text, id);
      return text;
    });

    sessionOptionMap.set(sessionId, optionMap);

    const surahName = String(data.surah_name ?? data.surah ?? '');

    return {
      id: sessionId,
      surah: surahName.startsWith('سورة') ? surahName : `سورة ${surahName}`,
      juz: String(data.juz ?? params.juz ?? ''),
      previousAyah: String(
        data.previous_ayah ?? data.previousAyah ?? data.question ?? data.first_ayah ?? ''
      ),
      nextAyah: String(data.next_ayah ?? data.nextAyah ?? data.second_ayah ?? ''),
      options,
    };
  },

  // POST /game/submit/
  async submitAnswer(payload: SubmitAnswerPayload): Promise<SubmitAnswerResult> {
    const optionMap = sessionOptionMap.get(payload.questionId);
    const userAnswerId = optionMap?.get(payload.answer) ?? 1;

    const { data } = await api.post<Record<string, unknown>>(
      API_ENDPOINTS.game.submitAnswer,
      {
        session_id: Number(payload.questionId),
        user_answer: userAnswerId,
      }
    );

    const isCorrect = Boolean(data.is_correct ?? data.isCorrect ?? data.correct ?? false);
    const correctAnswer = String(
      data.correct_answer ?? data.correctAnswer ?? (isCorrect ? payload.answer : '')
    );
    const pointsEarned = Number(data.points_earned ?? data.pointsEarned ?? (isCorrect ? 10 : 0));

    return {
      isCorrect,
      correctAnswer,
      pointsEarned,
    };
  },
};