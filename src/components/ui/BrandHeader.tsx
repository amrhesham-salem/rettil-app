import React from 'react';
import logo from '../../assets/images/logo.svg';

/**
 * Shared brand header (logo + "رَتِّل" wordmark) used across all auth pages.
 * Eliminates the repeated logo + span pattern in Login, Signup, and ForgotPassword.
 */
export const BrandHeader: React.FC = () => (
  <div className="flex flex-row-reverse items-center gap-2 mb-5">
    <img src={logo} alt="رَتِّل" className="h-9 object-contain" />
    <span className="text-[26px] font-bold text-brand-dark">رَتِّل</span>
  </div>
);
