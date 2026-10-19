import { api } from '../lib/axios';
import { API_ENDPOINTS } from '../config/endpoints';
import type {
  ChallengeQuestion,
  QuestionsParams,
  SubmitAnswerPayload,
  SubmitAnswerResult,
} from '../types';

const sessionOptionMap = new Map<string, Map<string, number>>();

function extractSurahName(data: Record<string, unknown>): string {
  const rawSurah = data.surah_name ?? data.surah;
  if (typeof rawSurah === 'string' && rawSurah.trim()) {
    return rawSurah.startsWith('سورة') ? rawSurah : `سورة ${rawSurah}`;
  }
  if (typeof rawSurah === 'object' && rawSurah !== null) {
    const obj = rawSurah as Record<string, unknown>;
    const name =
      obj.name ?? obj.surah_name ?? Object.values(obj).find((v) => typeof v === 'string');
    if (typeof name === 'string' && name.trim()) {
      return name.startsWith('سورة') ? name : `سورة ${name}`;
    }
  }
  return 'تحدي عشوائي';
}

function extractOptions(data: Record<string, unknown>): {
  options: string[];
  optionMap: Map<string, number>;
} {
  const optionMap = new Map<string, number>();
  const options: string[] = [];

  // 1. البحث عن أي مصفوفة اختيارات في الـ Response مهما كان اسم المفتاح
  let rawArray: unknown[] | undefined = undefined;
  const knownKeys = ['options', 'choices', 'answers', 'ayahs', 'question_options', 'choices_list'];
  for (const key of knownKeys) {
    if (Array.isArray(data[key])) {
      rawArray = data[key] as unknown[];
      break;
    }
  }
  if (!rawArray) {
    const found = Object.entries(data).find(([, val]) => Array.isArray(val));
    if (found) rawArray = found[1] as unknown[];
  }

  if (rawArray && rawArray.length > 0) {
    rawArray.forEach((opt, idx) => {
      if (typeof opt === 'string') {
        optionMap.set(opt, idx + 1);
        options.push(opt);
      } else if (typeof opt === 'object' && opt !== null) {
        const obj = opt as Record<string, unknown>;
        const text = String(
          obj.text ??
            obj.ayah_text ??
            obj.ayah ??
            obj.option ??
            obj.choice ??
            obj.content ??
            obj.name ??
            Object.values(obj).find((v) => typeof v === 'string') ??
            ''
        );
        const id = Number(
          obj.id ??
            obj.ayah_id ??
            obj.number ??
            obj.ayah_number ??
            obj.value ??
            Object.values(obj).find((v) => typeof v === 'number') ??
            idx + 1
        );
        if (text) {
          optionMap.set(text, id);
          options.push(text);
        }
      }
    });
    return { options, optionMap };
  }

  // 2. إذا كانت الاختيارات مرسلة كحقول منفصلة (option_1, option_2 أو choice_1...)
  const numberedKeys = Object.keys(data).filter((k) =>
    /^(option|choice|answer|ayah)_?[1-4]$/i.test(k)
  );
  if (numberedKeys.length > 0) {
    numberedKeys.sort().forEach((k, idx) => {
      const val = data[k];
      if (typeof val === 'string' && val.trim()) {
        optionMap.set(val, idx + 1);
        options.push(val);
      }
    });
  }

  return { options, optionMap };
}

export const challengeService = {
  // POST /game/generate/
  async generateQuestion(
    params: QuestionsParams,
    _excludeId?: string
  ): Promise<ChallengeQuestion | null> {
    const payload: Record<string, unknown> = {
      challenge_type: params.mode === 'specific' ? 'specific' : 'random',
    };

    if (params.mode === 'specific') {
      if (params.surah) payload.surah = Number(params.surah);
      if (params.juz) payload.juz = Number(params.juz);
    }

    if (_excludeId) {
      payload.exclude_id = _excludeId;
    }

    const { data } = await api.post<Record<string, unknown>>(
      API_ENDPOINTS.game.generateQuestion,
      payload
    );

    console.log('Generate Question API Response:', data);

    if (!data) return null;

    const sessionId = String(data.session_id ?? data.id ?? Date.now());
    const { options, optionMap } = extractOptions(data);
    sessionOptionMap.set(sessionId, optionMap);

    return {
      id: sessionId,
      surah: extractSurahName(data),
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

    console.log('Submit Answer API Response:', data);

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