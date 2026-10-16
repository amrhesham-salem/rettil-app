import React, { useState } from 'react';
import { Mail, Lock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginFormData } from '../../schemas';
import { AuthLayout } from '../../components/layout';
import { Input, BrandHeader, ServerError, SubmitButton } from '../../components/ui';
import { useAuth } from '../../hooks';
import { getErrorMessage } from '../../lib';
import { ROUTES } from '../../constants';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      navigate(ROUTES.dashboard);
    } catch (err: unknown) {
      setServerError(getErrorMessage(err, 'حدث خطأ أثناء تسجيل الدخول'));
    }
  };

  return (
    <AuthLayout>
      <div className="mb-10 flex flex-col items-start text-right">
        <BrandHeader />
        <h1 className="text-[28px] font-bold text-brand-dark mb-2">مرحباً بعودتك</h1>
        <p className="text-[#6B7280] text-[13px]">سجل دخولك لمتابعة مراجعة حفظك</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <Input
          label="البريد الإلكتروني"
          type="email"
          placeholder="name@example.com"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="كلمة المرور"
          type="password"
          placeholder="8 أحرف على الأقل"
          icon={<Lock size={18} />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between mt-1">
          <Link
            to={ROUTES.forgotPassword}
            className="font-semibold text-[12px] text-[#4B5563] hover:text-brand-primary transition-colors"
          >
            نسيت كلمة المرور؟
          </Link>

          <label
            onClick={() => setValue('rememberMe', !rememberMe)}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <span className="text-[12px] text-[#4B5563] font-medium mt-0.5">تذكرني</span>
            <div
              className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                rememberMe
                  ? 'bg-brand-primary border-brand-primary text-white'
                  : 'border-[#D1D5DB] bg-white group-hover:border-brand-primary'
              }`}
            >
              {rememberMe && <Check size={10} strokeWidth={4} />}
            </div>
          </label>
        </div>

        <ServerError message={serverError} />

        <SubmitButton
          isSubmitting={isSubmitting}
          label="تسجيل الدخول"
          loadingLabel="جاري التحقق..."
        />

        <p className="text-center text-[12px] text-[#6B7280] mt-2">
          ليس لديك حساب؟{' '}
          <Link to={ROUTES.signup} className="font-bold text-brand-dark hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
