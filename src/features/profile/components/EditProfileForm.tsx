import React from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { User as UserIcon, Mail } from 'lucide-react';
import type { ProfileFormData } from '../../../schemas';

const INPUT_CLASS =
  'w-full rounded-xl border border-brand-sand bg-white text-gray-800 focus:outline-none focus:border-brand-secondary';
const PRIMARY_BTN =
  'w-full h-11 rounded-xl bg-brand-secondary hover:bg-[#73582E] text-white font-bold text-[14px] transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';
const OUTLINE_BTN =
  'w-full h-11 rounded-xl border border-[#1F2937] text-[#1F2937] font-bold text-[14px] hover:bg-gray-100 transition-all cursor-pointer';

interface EditProfileFormProps {
  form: UseFormReturn<ProfileFormData>;
  serverError: string | null;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  onCancel: () => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  form,
  serverError,
  onSubmit,
  onCancel,
}) => (
  <div className="w-full max-w-md bg-brand-light rounded-[28px] p-8 shadow-2xl border border-border-default relative z-10 my-auto">
    <h2 className="text-[26px] font-bold text-brand-dark text-center mb-6">
      تعديل البيانات
    </h2>

    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2 text-right">
        <label className="text-[13px] font-bold text-[#1F2937]">الاسم بالكامل</label>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="الاسم"
            className={`${INPUT_CLASS} h-12 pr-10 pl-4 text-[14px]`}
            {...form.register('name')}
          />
          <UserIcon size={18} className="absolute right-3 text-gray-400" />
        </div>
        {form.formState.errors.name?.message && (
          <span className="text-[12px] font-medium text-red-500">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 text-right">
        <label className="text-[13px] font-bold text-[#1F2937]">البريد الإلكتروني</label>
        <div className="relative flex items-center">
          <input
            type="email"
            placeholder="name@example.com"
            className={`${INPUT_CLASS} h-12 pr-10 pl-4 text-[14px]`}
            {...form.register('email')}
          />
          <Mail size={18} className="absolute right-3 text-gray-400" />
        </div>
        {form.formState.errors.email?.message && (
          <span className="text-[12px] font-medium text-red-500">
            {form.formState.errors.email.message}
          </span>
        )}
      </div>

      {serverError && (
        <p className="text-center text-[13px] font-bold text-red-600">{serverError}</p>
      )}

      <div className="flex flex-col gap-2.5 mt-2">
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={PRIMARY_BTN}
        >
          {form.formState.isSubmitting ? 'جارٍ الحفظ...' : 'حفظ التغيرات'}
        </button>
        <button type="button" onClick={onCancel} className={OUTLINE_BTN}>
          إلغاء
        </button>
      </div>
    </form>
  </div>
);
