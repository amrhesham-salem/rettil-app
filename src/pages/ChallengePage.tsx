import React, { useState, useEffect } from 'react';
import { ChevronLeft, Dice5, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { ROUTES } from '../constants/routes';
import { JUZ_NUMBERS } from '../constants/quran';
import { quranService, type SurahItem } from '../services/quranService';

const SELECT_CLASS =
  'h-11 w-full rounded-lg border border-brand-sand bg-white px-4 text-right text-[14px] font-bold text-brand-dark outline-none transition focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/15 disabled:bg-gray-100 disabled:opacity-60';

export const ChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedJuz, setSelectedJuz] = useState<string>('');
  const [selectedSurah, setSelectedSurah] = useState<string>('');
  const [surahsList, setSurahsList] = useState<SurahItem[]>([]);
  const [loadingSurahs, setLoadingSurahs] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedJuz) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSurahsList([]);
      setSelectedSurah('');
      return;
    }

    const fetchSurahs = async () => {
      try {
        setLoadingSurahs(true);
        const data = await quranService.getSurahsByJuz(Number(selectedJuz));
        setSurahsList(data);
        setSelectedSurah('');
      } catch (err) {
        console.error('Failed to load surahs for juz', err);
      } finally {
        setLoadingSurahs(false);
      }
    };

    fetchSurahs();
  }, [selectedJuz]);

  const startRandomChallenge = () => navigate(`${ROUTES.challengeSession}?mode=random`);

  const startSpecificChallenge = () => {
    if (!selectedJuz || !selectedSurah) {
      setError('يرجى اختيار الجزء والسورة أولاً');
      return;
    }
    setError(null);
    const params = new URLSearchParams({
      mode: 'specific',
      surah: selectedSurah,
      juz: selectedJuz,
    });
    navigate(`${ROUTES.challengeSession}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-brand-light text-right font-sans" dir="rtl">
      <Navbar />

      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 sm:px-6 md:px-8 pb-20 pt-10 md:pt-14">
        {/* ── Page heading ── */}
        <section className="mb-8 sm:mb-10 text-center">
          <h1 className="mb-2 text-2xl sm:text-[30px] md:text-[34px] font-bold leading-tight text-brand-dark">
            اختر نوع التحدي
          </h1>
          <p className="text-[14px] font-medium text-[#6B7280]">
            اختبر حفظك بالطريقة التي تناسبك.
          </p>
        </section>

        {/* ── Random challenge card (بالخلفية والنقشة الأصلية كاملة) ── */}
        <section className="relative mb-6 sm:mb-10 w-full overflow-hidden rounded-3xl sm:rounded-[28px] border-2 border-brand-secondary/80 bg-brand-dark px-5 sm:px-7 py-7 sm:py-8 text-center shadow-sm md:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(24,111,68,0.75),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(9,64,38,0.85),transparent_32%),linear-gradient(135deg,#064323,#00572F_48%,#003D22)]" />
          <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] bg-size-[30px_30px]" />

          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-center gap-2 text-white">
              <Dice5 size={17} />
              <h2 className="text-[18px] sm:text-[19px] font-bold">تحدي عشوائي</h2>
            </div>
            <p className="mx-auto mb-7 sm:mb-8 max-w-lg text-[13px] font-medium leading-7 text-emerald-50/85">
              اختبار فوري يختبر قوة استحضارك لآيات عشوائية من كامل السور التي تم تثبيتها في سجل
              حفظك، مثالي لتنشيط الذاكرة قبل الورد اليومي.
            </p>
            <button
              type="button"
              onClick={startRandomChallenge}
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-secondary px-6 sm:px-8 text-[14px] font-bold text-white shadow-sm transition hover:bg-[#73582E]"
            >
              <span>ابدأ التحدي العشوائي</span>
              <ChevronLeft size={17} />
            </button>
          </div>
        </section>

        {/* ── Specific challenge card ── */}
        <section className="w-full rounded-3xl sm:rounded-[28px] border-2 border-brand-secondary/65 bg-white px-5 sm:px-8 py-7 sm:py-8 text-center shadow-sm md:px-16 lg:px-24">
          <div className="mb-3 flex items-center justify-center gap-2 text-brand-secondary">
            <SlidersHorizontal size={20} />
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111827]">تحدي محدد</h2>
          </div>
          <p className="mb-7 sm:mb-8 text-[13px] font-medium text-[#6B7280]">
            صمم جلستك وحدد بدقة النطاق القرآني ومستوى الأسئلة
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Juz selector */}
            <label className="block text-right">
              <span className="mb-2 block text-[13px] font-bold text-[#111827]">الجزء</span>
              <select
                value={selectedJuz}
                onChange={(e) => {
                  setSelectedJuz(e.target.value);
                  setError(null);
                }}
                className={SELECT_CLASS}
              >
                <option value="">اختر الجزء</option>
                {JUZ_NUMBERS.map((juz) => (
                  <option key={juz} value={juz}>
                    الجزء {juz}
                  </option>
                ))}
              </select>
            </label>

            {/* Surah selector */}
            <label className="block text-right">
              <span className="mb-2 flex items-center justify-between text-[13px] font-bold text-[#111827]">
                <span>السورة</span>
                {loadingSurahs && <Loader2 size={14} className="animate-spin text-brand-secondary" />}
              </span>
              <select
                value={selectedSurah}
                disabled={!selectedJuz || loadingSurahs}
                onChange={(e) => {
                  setSelectedSurah(e.target.value);
                  setError(null);
                }}
                className={SELECT_CLASS}
              >
                <option value="">
                  {!selectedJuz
                    ? 'اختر الجزء أولاً'
                    : loadingSurahs
                      ? 'جارٍ تحميل السور...'
                      : 'اختر السورة'}
                </option>
                {surahsList.map((s) => (
                  <option key={s.id} value={s.surah_number}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <span className="mt-3 block text-[12px] font-medium text-red-500">{error}</span>
          )}

          <button
            type="button"
            onClick={startSpecificChallenge}
            className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-secondary px-6 sm:px-8 text-[14px] font-bold text-white shadow-sm transition hover:bg-[#73582E]"
          >
            <span>ابدأ التحدي المحدد</span>
            <ChevronLeft size={17} />
          </button>
        </section>
      </main>
    </div>
  );
};