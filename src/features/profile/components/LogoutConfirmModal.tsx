import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface LogoutConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div className="w-full max-w-sm bg-brand-light rounded-[28px] p-6 shadow-2xl flex flex-col items-center text-center animate-scaleIn">
      <div className="w-16 h-16 rounded-full bg-[#FDF3E7] text-brand-secondary flex items-center justify-center mb-4">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-[20px] font-bold text-brand-dark mb-6">
        هل أنت متأكد أنك تريد تسجيل الخروج؟
      </h3>
      <div className="flex items-center justify-center gap-3 w-full">
        <button
          onClick={onConfirm}
          className="flex-1 h-11 rounded-xl bg-[#B3261E] hover:bg-[#921F18] text-white font-bold text-[14px] transition-all shadow-md cursor-pointer"
        >
          تسجيل الخروج
        </button>
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl border border-[#1F2937] text-[#1F2937] font-bold text-[14px] hover:bg-gray-100 transition-all cursor-pointer"
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
);
