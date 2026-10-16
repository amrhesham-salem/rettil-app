import React from 'react';
import { LogOut } from 'lucide-react';

interface ProfileActionsCardProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onRequestLogout: () => void;
}

export const ProfileActionsCard: React.FC<ProfileActionsCardProps> = ({
  onEditProfile,
  onChangePassword,
  onRequestLogout,
}) => (
  <div className="bg-brand-light rounded-3xl p-6 shadow-2xl flex flex-col gap-3 border border-border-default">
    <button
      onClick={onEditProfile}
      className="w-full py-3 px-4 rounded-xl border border-brand-sand bg-white text-[#1F2937] font-bold text-[14px] hover:bg-gray-50 transition-all cursor-pointer shadow-sm text-center"
    >
      تعديل البيانات
    </button>
    <button
      onClick={onChangePassword}
      className="w-full py-3 px-4 rounded-xl border border-brand-sand bg-white text-[#1F2937] font-bold text-[14px] hover:bg-gray-50 transition-all cursor-pointer shadow-sm text-center"
    >
      تغيير كلمة المرور
    </button>
    <button
      onClick={onRequestLogout}
      className="w-full py-3 px-4 rounded-xl border border-[#B3261E]/40 bg-white text-[#B3261E] font-bold text-[14px] hover:bg-red-50 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
    >
      <LogOut size={16} />
      <span>تسجيل الخروج</span>
    </button>
  </div>
);
