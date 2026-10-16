import type { QuestionsParams } from '../types';

/**
 * مفاتيح الكاش الخاصة بـ TanStack React Query.
 * توحيد المفاتيح هنا يمنع تضارب الكاش ويسهّل عمل Invalidation بعد العمليات.
 */
export const QUERY_KEYS = {
  challengeQuestion: (params: QuestionsParams, round: number) =>
    ['challenge-question', params.mode, params.surah ?? '', params.juz ?? '', round] as const,

  leaderboard: (userId?: string, points?: number) =>
    ['leaderboard', userId ?? 'guest', points ?? 0] as const,

  history: (userId?: string) => ['user-history', userId ?? 'guest'] as const,
} as const;
