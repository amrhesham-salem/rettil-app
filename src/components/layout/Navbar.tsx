import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

const NAV_LINKS = [
  { to: ROUTES.dashboard, label: 'الرئيسية' },
  { to: ROUTES.challenge, label: 'التحدي' },
  { to: ROUTES.history, label: 'سجل الاختبارات' },
  { to: ROUTES.profile, label: 'الملف الشخصي' },
] as const;

/** Active / inactive NavLink class resolver */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[15px] font-bold transition-colors ${
    isActive ? 'text-brand-secondary' : 'text-brand-dark hover:text-brand-secondary'
  }`;

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Desktop user dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Mobile nav drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(() => {
    logout();
    navigate(ROUTES.home);
  }, [logout, navigate]);

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /** Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeDropdown]);

  /** Lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  if (!user) return null;

  const rawName = user.name || user.email || 'مستخدم';
  const firstName = rawName.trim().split(' ')[0] || 'مستخدم';
  const initial = firstName.charAt(0) || 'أ';

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#EDE6D3] bg-brand-light" dir="rtl">
      <div className="mx-auto flex h-17.5 max-w-6xl items-center justify-between px-4 md:px-8">

        {/* ── Brand logo ── */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="رَتِّل" className="h-8 object-contain" />
          <span className="text-2xl font-bold text-brand-dark">رَتِّل</span>
        </div>

        {/* ── Desktop nav links (md+) ── */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="التنقل الرئيسي">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right-side actions ── */}
        <div className="flex items-center gap-3">
          {/* Desktop user dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2.5 rounded-full border border-[#E5E0D0] bg-white px-3.5 py-1.5 shadow-xs transition-all hover:border-[#D5CEBC]"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-dark text-[13px] font-bold text-white">
                {initial}
              </div>
              <span className="text-[14px] font-bold text-brand-dark">{firstName}</span>
              <ChevronDown
                size={14}
                className={`text-brand-dark opacity-70 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute inset-s-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-[#EDE6D3] bg-white py-2 shadow-xl">
                <div className="border-b border-gray-100 px-4 py-2">
                  <p className="text-[13px] font-bold text-brand-dark">{user.name}</p>
                  <p className="truncate text-[11px] text-gray-500">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut size={16} />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg border border-[#E5E0D0] bg-white text-brand-dark transition hover:border-[#D5CEBC]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down drawer (< md) ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#EDE6D3] bg-brand-light px-4 pb-6 pt-4">
          {/* User identity card */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#EDE6D3]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark text-[14px] font-bold text-white">
              {initial}
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-brand-dark">{user.name}</span>
              <span className="text-[12px] text-gray-500 truncate max-w-55">{user.email}</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1" aria-label="القائمة المتنقلة">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-[15px] font-bold transition-colors ${
                    isActive
                      ? 'bg-brand-dark/5 text-brand-secondary'
                      : 'text-brand-dark hover:bg-brand-dark/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-600 transition hover:bg-red-100"
          >
            <LogOut size={17} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      )}
    </header>
  );
};
