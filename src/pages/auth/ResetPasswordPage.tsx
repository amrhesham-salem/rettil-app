import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';

import { AuthLayout } from '../../components/layout';
import { Input, BrandHeader, ServerError, SubmitButton } from '../../components/ui';
import { authService } from '../../services';
import { getErrorMessage } from '../../lib';
import { resetPasswordSchema, type ResetPasswordFormData } from '../../schemas';
import { ROUTES } from '../../constants';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid') ?? '';
  const token = searchParams.get('token') ?? '';
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setServerError(null);
      await authService.resetPassword({ uid, token, newPassword: data.newPassword });
      navigate(ROUTES.login);
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <AuthLayout>
      <div className="mb-10 flex flex-col items-start text-right">
        <BrandHeader />
        <h1 className="text-[28px] font-bold text-brand-dark mb-2">إعادة تعيين كلمة المرور</h1>
        <p className="text-[#6B7280] text-[13px]">اختر كلمة مرور جديدة لحسابك</p>
      </div>

      {!uid || !token ? (
        <div className="flex flex-col gap-4 text-right">
          <p className="text-[14px] font-bold text-red-600">رابط إعادة التعيين غير صالح أو منتهي</p>
          <Link to={ROUTES.forgotPassword} className="font-bold text-brand-dark hover:underline">
            اطلب رابطاً جديداً
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <Input
            label="كلمة المرور الجديدة"
            type="password"
            placeholder="8 أحرف على الأقل"
            icon={<Lock size={18} />}
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <Input
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="أعد كتابة كلمة المرور"
            icon={<Lock size={18} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <ServerError message={serverError} />

          <SubmitButton
            isSubmitting={isSubmitting}
            label="حفظ كلمة المرور"
            loadingLabel="جاري الحفظ..."
          />
        </form>
      )}
    </AuthLayout>
  );
};