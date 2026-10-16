import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import historyBg from '../../../assets/images/HistorywithoutData.png';

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-brand-light py-12 px-4 sm:px-8">
      <div
        className="max-w-4xl mx-auto rounded-4xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${historyBg})` }}
      >
        <h2 className="text-[32px] sm:text-[40px] font-bold mb-3">ابدأ مراجعة حفظك اليوم</h2>
        <p className="text-gray-200 text-[15px] mb-8">
          اختبر نفسك وتابع نتائجك من خلال تجربة بسيطة ومريحة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate(ROUTES.signup)}
            className="bg-brand-secondary hover:bg-[#73582E] text-white font-bold text-[15px] px-8 py-3 rounded-xl transition-all shadow-lg cursor-pointer"
          >
            إنشاء حساب
          </button>
          <button
            onClick={() => navigate(ROUTES.login)}
            className="border-2 border-white/40 hover:bg-white/10 text-white font-bold text-[15px] px-8 py-3 rounded-xl transition-all cursor-pointer"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </section>
  );
};