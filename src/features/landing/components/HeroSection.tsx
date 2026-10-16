import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';
import cover from '../../../assets/images/cover.png';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="w-full relative overflow-hidden bg-no-repeat bg-cover bg-center py-20 md:py-28 px-4 sm:px-8 flex items-center justify-center min-h-155"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-white text-center lg:text-right flex flex-col items-center lg:items-start">
          <span className="text-brand-sand text-[14px] font-bold mb-3 tracking-wide">
            — رحلةٌ مع القرآن
          </span>
          <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-tight mb-4">
            اختبر حفظك <span className="text-[#E2C285]">للقرآن الكريم</span> بطريقة تفاعلية
          </h1>
          <p className="text-gray-200 text-[15px] sm:text-[17px] mb-8 max-w-lg leading-relaxed">
            راجع حفظك، اختبر معلوماتك، وطوّر مستواك من خلال تحديات بسيطة وتفاعلية.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate(ROUTES.challengePreview)}
              className="bg-brand-secondary hover:bg-[#73582E] text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>ابدأ الاختبار الآن</span>
              <ChevronsLeft size={18} />
            </button>

            <button
              onClick={() => navigate(ROUTES.login)}
              className="border-2 border-white/40 hover:bg-white/10 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};