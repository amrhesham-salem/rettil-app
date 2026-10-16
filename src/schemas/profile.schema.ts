import { z } from 'zod';

const password = z.string().min(8, 'كلمة المرور يجب ألا تقل عن 8 أحرف');

export const profileSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب ألا يقل عن حرفين'),
  email: z.string().trim().email('البريد الإلكتروني غير صالح'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ['confirmPassword'],
    message: 'كلمتا المرور غير متطابقتين',
  });

export { resetPasswordSchema, type ResetPasswordFormData } from './auth.schema';
export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;