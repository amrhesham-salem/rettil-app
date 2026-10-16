export type ChallengeTypeLabel = 'تحدٍ عشوائي' | 'تحدٍ محدد';
export type AnswerStatus = 'correct' | 'wrong';

export interface HistoryRecord {
  id: string;
  type: ChallengeTypeLabel;
  surah: string;
  juz: string;
  status: AnswerStatus;
  timestamp: string;
}

export type CreateHistoryRecordInput = Omit<HistoryRecord, 'id' | 'timestamp'>;