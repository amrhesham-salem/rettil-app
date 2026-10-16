import { z } from 'zod';

const passwordRule = z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('أدخل بريدًا إلكترونيًا صحيحًا'),
  password: passwordRule,
  rememberMe: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'كلمة المرور يجب ألا تقل عن 8 أحرف'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'الاسم مطلوب')
      .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .email('البريد الإلكتروني غير صحيح'),
    password: passwordRule,
    confirmPassword: z
      .string()
      .min(1, 'تأكيد كلمة المرور مطلوب'),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'يجب الموافقة على الشروط وسياسة الخصوصية',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;