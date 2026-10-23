import React, { useEffect, useState } from 'react';
import { ClipboardList, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { api } from '../lib/axios';
import { API_ENDPOINTS } from '../config/endpoints';
import { UNANSWERED_SESSION_KEY } from '../services/challengeService';
import historyBg from '../assets/images/HistorywithoutData.png';
import { ROUTES } from '../constants/routes';
import { formatDateTime } from '../utils/arabic';
import type { HistoryRecord } from '../types';

interface ApiHistoryRow {
  id?: number | string;
  challenge_type?: string;
  surah?: string | { name?: string };
  juz?: number | string | null;
  is_correct?: boolean | string;
  created_at?: string;
}

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<ApiHistoryRow[] | { results?: ApiHistoryRow[] }>(
          API_ENDPOINTS.user.history
        );
        const rawList = Array.isArray(data) ? data : (data?.results ?? []);

        const mapped: HistoryRecord[] = rawList.map((row, idx) => {
          const surahName =
            typeof row.surah === 'object' && row.surah !== null
              ? (row.surah.name ?? 'غير محدد')
              : String(row.surah ?? 'غير محدد');

          const isCorrect =
            row.is_correct === true ||
            row.is_correct === 'True' ||
            row.is_correct === 'true';

          return {
            id: String(row.id ?? idx),
            type: row.challenge_type === 'specific' ? 'تحدٍ محدد' : 'تحدٍ عشوائي',
            surah: surahName,
            juz: row.juz ? String(row.juz) : '-',
            status: isCorrect ? 'correct' : 'wrong',
            timestamp: row.created_at ?? new Date().toISOString(),
          };
        });

        // 1. إذا كان هناك سؤال مفتوح لم يضغط المستخدم "تأكيد" عليه بعد، نستبعده من أعلى السجل
        const unansweredRaw = sessionStorage.getItem(UNANSWERED_SESSION_KEY);
        let startIndex = 0;
        if (unansweredRaw && mapped.length > 0 && mapped[0].status === 'wrong') {
          try {
            const unanswered = JSON.parse(unansweredRaw) as { surah?: string; timestamp?: number };
            if (unanswered.timestamp && Date.now() - unanswered.timestamp < 1000 * 60 * 15) {
              startIndex = 1;
            }
          } catch {
            // ignore
          }
        }

        // 2. تصفية السجلات المزدوجة القديمة (التي نتجت عن إرسال generate مرتين في نفس الدقيقة)
        const cleaned: HistoryRecord[] = [];
        const sliced = mapped.slice(startIndex);

        for (let i = 0; i < sliced.length; i++) {
          const current = sliced[i];
          const next = sliced[i + 1];

          // إذا كان السطر الحالي "خطأ" والسطر الذي يليه مباشرة لنفس السورة ونفس الدقيقة هو "صح"، نتخطى السطر الوهمي
          if (
            next &&
            current.status === 'wrong' &&
            next.status === 'correct' &&
            current.surah === next.surah &&
            current.type === next.type &&
            Math.abs(new Date(current.timestamp).getTime() - new Date(next.timestamp).getTime()) <
              65000
          ) {
            continue;
          }

          cleaned.push(current);
        }

        setHistoryData(cleaned);
      } catch {
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light font-sans flex flex-col" dir="rtl">
      <Navbar />

      <main
        className="w-full flex-1 relative overflow-hidden flex flex-col items-center pt-12 pb-16 px-4 sm:px-8 bg-no-repeat bg-cover bg-center min-h-[calc(100vh-70px)]"
        style={{ backgroundImage: `url(${historyBg})` }}
      >
        <h1 className="relative z-10 text-[30px] md:text-[34px] font-bold text-white mb-8 text-center">
          سجل الاختبارات
        </h1>

        {loading ? (
          <div className="relative z-10 my-auto flex flex-col items-center gap-3 text-white">
            <Loader2 size={36} className="animate-spin" />
            <span className="text-[14px] font-bold">جارٍ تحميل السجل...</span>
          </div>
        ) : historyData.length > 0 ? (
          <div className="relative z-10 w-full max-w-4xl bg-brand-light rounded-[28px] p-4 sm:p-6 shadow-2xl overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-150">
              <thead>
                <tr className="border-b border-border-default text-[15px] font-bold text-[#1F2937]">
                  <th className="py-4 px-4 text-right">الاختبار</th>
                  <th className="py-4 px-4 text-center">السورة</th>
                  <th className="py-4 px-4 text-center">الجزء</th>
                  <th className="py-4 px-4 text-center">الحالة</th>
                  <th className="py-4 px-4 text-left">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border-default/60 last:border-none text-[13px] sm:text-[14px] text-gray-700 hover:bg-black/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-[#1F2937]">{item.type}</td>
                    <td className="py-4 px-4 text-center font-medium text-gray-800">{item.surah}</td>
                    <td className="py-4 px-4 text-center font-medium text-gray-600">{item.juz}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-[12px] font-bold ${
                          item.status === 'correct'
                            ? 'bg-[#D1EBE1] text-brand-primary'
                            : 'bg-[#F9DEDC] text-[#B3261E]'
                        }`}
                      >
                        {item.status === 'correct' ? 'صح' : 'خطأ'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-left text-gray-500 font-medium text-[12px] sm:text-[13px]">
                      {formatDateTime(item.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="relative z-10 w-full max-w-lg bg-brand-light rounded-[28px] p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center mb-6 text-brand-dark">
              <ClipboardList size={32} />
            </div>
            <h2 className="text-[26px] font-bold text-brand-dark mb-3">لم تخض أي اختبار بعد</h2>
            <p className="text-gray-500 text-[14px] mb-8">ابدأ أول تحدٍ لك وشاهد نتائجك هنا.</p>
            <button
              onClick={() => navigate(ROUTES.challenge)}
              className="bg-brand-secondary hover:bg-[#73582E] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md cursor-pointer text-[14px]"
            >
              ابدأ أول اختبار
            </button>
          </div>
        )}
      </main>
    </div>
  );
};