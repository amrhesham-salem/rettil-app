import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { challengeService } from '../services';
import type { QuestionsParams } from '../types';

/**
 * جلب سؤال جديد للتحدي (عشوائي أو محدد).
 * - `round`: رقم الجولة؛ عند زيادته يتم توليد سؤال جديد.
 * - `excludeId`: معرّف آخر سؤال ظهر لمنع تكراره مباشرة.
 */
export const useGenerateQuestion = (
  params: QuestionsParams,
  round: number,
  excludeId?: string
) =>
  useQuery({
    queryKey: QUERY_KEYS.challengeQuestion(params, round),
    queryFn: () => challengeService.generateQuestion(params, excludeId),
    staleTime: Infinity,
    gcTime: 0,
  });