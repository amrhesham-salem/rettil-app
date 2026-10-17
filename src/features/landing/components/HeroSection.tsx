import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';
import cover from '../../../assets/images/cover.webp';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="w-full relative overflow-hidden bg-no-repeat bg-cover bg-center min-h-130 md:min-h-145 lg:min-h-160 py-16 lg:py-24 px-6 sm:px-10 lg:px-16 flex items-center justify-center"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-white text-center lg:text-right flex flex-col items-center lg:items-start">
          <span className="text-[#C9A978] text-[14px] font-bold mb-3 tracking-wide">
            — رِحْلَةٌ مَعَ القُرْآن
          </span>
          <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold leading-tight mb-4">
            <span className="text-white">اختبر حفظك </span>
            <span className="text-[#E2C285]">للقرآن الكريم</span>
            <span className="block text-white">بطريقة تفاعلية</span>
          </h1>
          <p className="text-gray-200 text-[15px] sm:text-[17px] mb-8 max-w-lg leading-relaxed">
            راجع حفظك، اختبر معلوماتك، وطوّر مستواك من خلال تحديات بسيطة وتفاعلية.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate(ROUTES.challengePreview)}
              className="bg-linear-to-r from-[#A37B47] to-[#8C6430] hover:from-[#B58B55] hover:to-[#9C7138] text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>ابدأ الاختبار الآن</span>
              <ChevronsLeft size={18} />
            </button>

            <button
              onClick={() => navigate(ROUTES.login)}
              className="border border-white/30 bg-[#07361D]/40 hover:bg-[#07361D]/70 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};