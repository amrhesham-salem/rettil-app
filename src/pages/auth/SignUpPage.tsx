import React, { useState } from 'react';
import { User, Mail, Lock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import signUpBanner from '../../assets/images/sign-up.png';
import { signupSchema, type SignupFormData } from '../../schemas';
import { AuthLayout } from '../../components/layout';
import { Input, BrandHeader, ServerError, SubmitButton } from '../../components/ui';
import { useAuth } from '../../hooks';
import { getErrorMessage } from '../../lib';
import { ROUTES } from '../../constants';

export const SignUpPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const agreeTerms = watch('agreeTerms');

  const onSubmit = async (data: SignupFormData) => {
    try {
      setServerError(null);
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword, 
      });
      navigate(ROUTES.challenge);
    } catch (err: unknown) {
      setServerError(getErrorMessage(err, 'حدث خطأ أثناء إنشاء الحساب'));
    }
  };

  return (
    <AuthLayout bannerImage={signUpBanner}>
      <div className="mb-8 flex flex-col items-start text-right">
        <BrandHeader />
        <h1 className="text-[28px] font-bold text-brand-dark mb-2">ابدأ رحلتك</h1>
        <p className="text-[#6B7280] text-[13px]">أنشئ حسابك في دقيقة واحدة</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input
          label="الاسم بالكامل"
          type="text"
          placeholder="الاسم"
          icon={<User size={18} />}
          error={errors.name?.message}
          {...register('name')}
        />

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

        <Input
          label="تأكيد كلمة المرور"
          type="password"
          placeholder="8 أحرف على الأقل"
          icon={<Lock size={18} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <div className="flex flex-col gap-1 mt-1">
          <label
            onClick={() => setValue('agreeTerms', !agreeTerms, { shouldValidate: true })}
            className="flex items-center justify-end gap-2 cursor-pointer select-none group"
          >
            <span className="text-[13px] text-[#4B5563] font-medium">
              أوافق على الشروط وسياسة الخصوصية
            </span>
            <div
              className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                agreeTerms
                  ? 'bg-brand-primary border-brand-primary text-white'
                  : 'border-[#D1D5DB] bg-white group-hover:border-brand-primary'
              }`}
            >
              {agreeTerms && <Check size={12} strokeWidth={4} />}
            </div>
          </label>

          {errors.agreeTerms && (
            <p className="text-red-500 text-[12px] text-right mt-0.5">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        <ServerError message={serverError} />

        <SubmitButton
          isSubmitting={isSubmitting}
          label="إنشاء حساب"
          loadingLabel="جاري إنشاء الحساب..."
        />

        <p className="text-center text-[12px] text-[#6B7280] mt-2">
          لديك حساب؟{' '}
          <Link to={ROUTES.login} className="font-bold text-brand-dark hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
