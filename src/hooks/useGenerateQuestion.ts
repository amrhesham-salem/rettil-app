import { useQuery } from '@tanstack/react-query';
import { challengeService } from '../services/challengeService';
import type { QuestionsParams } from '../types';

export const useGenerateQuestion = (
  params: QuestionsParams,
  round: number,
  excludeId?: string
) =>
  useQuery({
    queryKey: ['challenge-question', params.mode, params.surah ?? '', params.juz ?? '', round],
    queryFn: () => challengeService.generateQuestion(params, excludeId),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });