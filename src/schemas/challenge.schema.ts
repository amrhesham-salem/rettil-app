import { z } from 'zod';

export const specificChallengeSchema = z.object({
  surah: z.string().min(1, 'اختر السورة أولًا'),
  juz: z.string().min(1, 'اختر الجزء أولًا'),
});

export type SpecificChallengeFormData = z.infer<typeof specificChallengeSchema>;
