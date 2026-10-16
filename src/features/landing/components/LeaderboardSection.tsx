import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'lucide-react';
import { useLeaderboard } from '../../../hooks/useLeaderboard';
import { ROUTES } from '../../../constants/routes';
import { toArabicDigits } from '../../../utils/arabic';
import photoroom from '../../../assets/images/photoroom.png';

const TOP_COUNT = 3;

export const LeaderboardSection = () => {
  const navigate = useNavigate();
  const { entries, loading } = useLeaderboard();
  const topEntries = entries.slice(0, TOP_COUNT);

  return (
    <div className="relative bg-brand-light py-16 md:py-24 px-4 sm:px-8 overflow-hidden" dir="rtl">
      <img
        src={photoroom}
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute -left-35 top-1/2 -translate-y-1/2 w-95.75 pointer-events-none select-none"
      />
      <img
        src={photoroom}
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute -right-35 top-1/2 -translate-y-1/2 w-95.75 -scale-x-100 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="flex items-center justify-center gap-2 text-brand-secondary text-[13px] font-bold mb-4">
          <span className="w-5 h-px bg-brand-secondary/60" />
          المتصدرون
        </span>

        <h2 className="text-center text-[30px] sm:text-[36px] font-extrabold text-black mb-14">
          قائمة أفضل ١٠ مستخدمين
        </h2>

        <div className="max-w-135 mx-auto bg-white rounded-2xl border border-[#D9C7A3] overflow-hidden mb-12 min-h-30">
          {loading ? (
            <p className="p-6 text-center text-[13px] text-gray-500">جاري التحميل...</p>
          ) : (
            topEntries.map((entry, i) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i < topEntries.length - 1 ? 'border-b border-[#D9C7A3]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full text-[12px] font-bold flex items-center justify-center ${
                      i === 0 ? 'bg-brand-secondary text-white' : 'bg-[#E5DDD0] text-brand-green'
                    }`}
                  >
                    {toArabicDigits(entry.rank)}
                  </span>
                  <span className="text-[13px] text-[#1F2937]">{entry.name}</span>
                </div>
                <span className="text-[12px] font-bold text-black">
                  {toArabicDigits(entry.points)} نقطة
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate(ROUTES.login)}
            className="border border-black hover:bg-black/5 text-black font-bold text-[14px] px-10 py-3 rounded-lg transition-all cursor-pointer inline-flex items-center gap-3"
          >
            <span>عرض لوحة المتصدرين كاملة</span>
            <ChevronsLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};