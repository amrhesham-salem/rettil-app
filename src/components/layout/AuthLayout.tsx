import React from 'react';
import defaultBanner from '../../assets/images/quran-banner.png';

interface AuthLayoutProps {
  children: React.ReactNode;
  bannerImage?: string;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  bannerImage = defaultBanner,
  title = 'راجع حفظك بهدوء وثقة',
  subtitle = 'اختبر نفسك في الآية المفقودة وتابع نتائجك',
}) => {
  return (
<div className="min-h-screen w-full flex flex-col md:flex-row-reverse bg-brand-light">      {/* ── Decorative banner panel ── */}
      <div className="w-full md:w-1/2 bg-brand-dark relative flex flex-col items-center justify-center py-10 md:min-h-screen overflow-hidden">
        {/* Background glow layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(19,93,56,0.5),#0B3B24_70%)] pointer-events-none" />
        <div className="absolute w-80 h-80 md:w-112.5 md:h-112.5 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Circular banner image */}
          <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-67.5 md:h-67.5 rounded-full border-[3px] border-brand-secondary p-1 mb-6 md:mb-8 flex items-center justify-center bg-brand-dark shadow-2xl overflow-hidden">
            <img
              src={bannerImage}
              alt="المصحف الشريف"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h2 className="text-2xl md:text-[32px] font-bold text-white mb-3">{title}</h2>
          <p className="text-border-default text-sm md:text-[15px] opacity-90 leading-relaxed max-w-xs">
            {subtitle}
          </p>
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};