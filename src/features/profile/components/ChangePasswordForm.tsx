import React, { useState } from 'react';
import { type UseFormRegisterReturn, type UseFormReturn } from 'react-hook-form';
import { Lock, Eye, EyeOff } from 'lucide-react';
import type { ChangePasswordFormData } from '../../../schemas';

const INPUT_CLASS =
  'w-full rounded-xl border border-brand-sand bg-white text-gray-800 focus:outline-none focus:border-brand-secondary';
const PRIMARY_BTN =
  'w-full h-11 rounded-xl bg-brand-secondary hover:bg-[#73582E] text-white font-bold text-[14px] transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';
const OUTLINE_BTN =
  'w-full h-11 rounded-xl border border-[#1F2937] text-[#1F2937] font-bold text-[14px] hover:bg-gray-100 transition-all cursor-pointer';

const PasswordField: React.FC<{
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
}> = ({ label, error, registration }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5 text-right">
      <label className="text-[13px] font-bold text-[#1F2937]">{label}</label>
      <div className="relative flex items-center">
        <input
          type={show ? 'text' : 'password'}
          placeholder="8 أحرف على الأقل"
          className={`${INPUT_CLASS} h-11 pr-10 pl-10 text-[13px]`}
          {...registration}
        />
        <Lock size={16} className="absolute right-3 text-gray-400" />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute left-3 text-gray-400 hover:text-gray-600"
          aria-label={show ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <span className="text-[12px] font-medium text-red-500">{error}</span>}
    </div>
  );
};

interface ChangePasswordFormProps {
  form: UseFormReturn<ChangePasswordFormData>;
  serverError: string | null;
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
  onCancel: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  form,
  serverError,
  onSubmit,
  onCancel,
}) => (
  <div className="w-full max-w-md bg-brand-light rounded-[28px] p-8 shadow-2xl border border-border-default relative z-10 my-auto">
    <h2 className="text-[26px] font-bold text-brand-dark text-center mb-6">
      تغيير كلمة المرور
    </h2>

    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <PasswordField
        label="كلمة المرور الحالية"
        error={form.formState.errors.currentPassword?.message}
        registration={form.register('currentPassword')}
      />
      <PasswordField
        label="كلمة المرور الجديدة"
        error={form.formState.errors.newPassword?.message}
        registration={form.register('newPassword')}
      />
      <PasswordField
        label="تأكيد كلمة المرور الجديدة"
        error={form.formState.errors.confirmPassword?.message}
        registration={form.register('confirmPassword')}
      />

      {serverError && (
        <p className="text-center text-[13px] font-bold text-red-600">{serverError}</p>
      )}

      <div className="flex flex-col gap-2.5 mt-3">
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={PRIMARY_BTN}
        >
          {form.formState.isSubmitting ? 'جارٍ الحفظ...' : 'حفظ كلمة المرور'}
        </button>
        <button type="button" onClick={onCancel} className={OUTLINE_BTN}>
          إلغاء
        </button>
      </div>
    </form>
  </div>
);
