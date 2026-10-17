import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import { Navbar } from '../components/layout';
import {
  ProfileSummaryCard,
  ProfileActionsCard,
  EditProfileForm,
  ChangePasswordForm,
  LogoutConfirmModal,
} from '../features/profile/components';
import { useAuth } from '../hooks';
import { getErrorMessage } from '../lib';
import {
  profileSchema,
  changePasswordSchema,
  type ProfileFormData,
  type ChangePasswordFormData,
} from '../schemas';
import profileBg from '../assets/images/HistorywithoutData.png';
import { ROUTES } from '../constants';

type ActiveView = 'main' | 'edit-profile' | 'change-password';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout, updateProfile, changePassword } = useAuth();

  const [activeView, setActiveView] = useState<ActiveView>('main');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: currentUser?.name ?? '', email: currentUser?.email ?? '' },
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openView = (view: ActiveView) => {
    setServerError(null);
    if (view === 'edit-profile') {
      profileForm.reset({ name: currentUser?.name ?? '', email: currentUser?.email ?? '' });
    }
    if (view === 'change-password') passwordForm.reset();
    setActiveView(view);
  };

  const onSaveProfile = async (data: ProfileFormData) => {
    try {
      setServerError(null);
      await updateProfile(data);
      setActiveView('main');
      showToast('تم تعديل البيانات بنجاح');
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  const onSavePassword = async (data: ChangePasswordFormData) => {
    try {
      setServerError(null);
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      passwordForm.reset();
      setActiveView('main');
      showToast('تم تغيير كلمة المرور بنجاح');
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate(ROUTES.login);
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans flex flex-col relative" dir="rtl">
      <Navbar />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#D1EBE1] border border-brand-primary/20 text-brand-primary px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 font-bold text-[14px] animate-bounce">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <main
        className="w-full flex-1 relative overflow-hidden flex flex-col items-center justify-center pt-6 pb-12 px-4 sm:px-8 bg-no-repeat bg-cover bg-center min-h-[calc(100vh-70px)]"
        style={{ backgroundImage: `url(${profileBg})` }}
      >
        {activeView === 'main' && (
          <div className="w-full max-w-lg flex flex-col gap-5 relative z-10 my-auto">
            <ProfileSummaryCard
              name={currentUser?.name ?? ''}
              email={currentUser?.email ?? ''}
              points={currentUser?.points ?? 0}
            />
            <ProfileActionsCard
              onEditProfile={() => openView('edit-profile')}
              onChangePassword={() => openView('change-password')}
              onRequestLogout={() => setShowLogoutModal(true)}
            />
          </div>
        )}

        {activeView === 'edit-profile' && (
          <EditProfileForm
            form={profileForm}
            serverError={serverError}
            onSubmit={onSaveProfile}
            onCancel={() => openView('main')}
          />
        )}

        {activeView === 'change-password' && (
          <ChangePasswordForm
            form={passwordForm}
            serverError={serverError}
            onSubmit={onSavePassword}
            onCancel={() => openView('main')}
          />
        )}

        {showLogoutModal && (
          <LogoutConfirmModal
            onConfirm={handleConfirmLogout}
            onCancel={() => setShowLogoutModal(false)}
          />
        )}
      </main>
    </div>
  );
};
