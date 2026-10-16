import React, { useState } from 'react';
import { Mail, ChevronsLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../schemas';
import { AuthLayout } from '../../components/layout';
import { Input, BrandHeader, ServerError, SubmitButton } from '../../components/ui';
import { authService } from '../../services';
import { getErrorMessage } from '../../lib';
import { ROUTES } from '../../constants';

export const ForgotPasswordPage: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setServerError(null);
      await authService.forgotPassword(data.email);
      setSent(true);
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <AuthLayout>
      <div className="mb-10 flex flex-col items-start text-right">
        <BrandHeader />
        <h1 className="text-[28px] font-bold text-brand-dark mb-2">نسيت كلمة المرور؟</h1>
        <p className="text-[#6B7280] text-[13px]">
          أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين
        </p>
      </div>

      {sent ? (
        <div className="flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-[#D1EBE1] px-4 py-3 text-[14px] font-bold text-brand-primary">
          <CheckCircle size={18} />
          <span>إذا كان البريد مسجلاً، سيصلك رابط إعادة التعيين قريباً</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="name@example.com"
            icon={<Mail size={18} />}
            error={errors.email?.message}
            {...register('email')}
          />

          <ServerError message={serverError} />

          <SubmitButton
            isSubmitting={isSubmitting}
            label="إرسال رابط إعادة التعيين"
            loadingLabel="جاري الإرسال..."
          />
        </form>
      )}

      <Link
        to={ROUTES.login}
        className="flex flex-row-reverse items-center justify-center gap-2 text-[13px] font-bold text-brand-dark mt-6 hover:opacity-80 transition-all"
      >
        <ChevronsLeft size={16} />
        العودة لتسجيل الدخول
      </Link>
    </AuthLayout>
  );
};