import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { NAV_LINKS } from '../../../data/landing.data';
import logo from '../../../assets/images/logo.svg';

export const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-brand-light border-b border-border-default sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between">
      <button
        type="button"
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(ROUTES.home)}
      >
        <img src={logo} alt="" aria-hidden="true" className="h-10 object-contain" />
        <span className="font-bold text-[26px] text-brand-dark tracking-tight">رَتِّل</span>
      </button>

      <nav className="hidden md:flex items-center gap-8 text-[15px] font-bold text-brand-dark">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-brand-secondary transition-colors">
            {link.label}
          </a>
        ))}
        <button
          onClick={() => navigate(ROUTES.login)}
          className="hover:text-brand-secondary transition-colors cursor-pointer font-bold"
        >
          تسجيل الدخول
        </button>
      </nav>

      <button
        onClick={() => navigate(ROUTES.challengePreview)}
        className="bg-brand-secondary hover:bg-[#73582E] text-white font-bold text-[14px] px-6 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
      >
        ابدأ الاختبار
      </button>
    </header>
  );
};