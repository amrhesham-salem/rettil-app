import { useMutation } from '@tanstack/react-query';
import { challengeService } from '../services';

/**
 * إرسال إجابة المستخدم للتحقق منها وحساب النقاط المكتسبة.
 */
export const useSubmitAnswer = () =>
  useMutation({
    mutationFn: challengeService.submitAnswer,
  });