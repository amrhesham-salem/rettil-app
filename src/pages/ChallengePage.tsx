import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Dice5, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Navbar } from '../components/layout';
import { ROUTES, JUZ_NUMBERS } from '../constants';
import { quranService, type SurahItem } from '../services/quranService';

export const ChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedJuz, setSelectedJuz] = useState<string>('');
  const [selectedSurah, setSelectedSurah] = useState<string>('');
  const [surahsList, setSurahsList] = useState<SurahItem[]>([]);
  const [loadingSurahs, setLoadingSurahs] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // عند اختيار الجزء، يتم جلب سور هذا الجزء من الباك إند
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

  const startRandomChallenge = () => {
    navigate(`${ROUTES.challengeSession}?mode=random`);
  };

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
        <section className="mb-8 sm:mb-10 text-center">
          <h1 className="mb-2 text-2xl sm:text-[30px] md:text-[34px] font-bold text-brand-dark">
            اختر نوع التحدي
          </h1>
          <p className="text-[14px] font-medium text-[#6B7280]">
            اختبر حفظك بالطريقة التي تناسبك.
          </p>
        </section>

        {/* ── التحدي العشوائي ── */}
        <section className="relative mb-6 sm:mb-10 w-full overflow-hidden rounded-3xl border-2 border-brand-secondary/80 bg-brand-dark px-5 sm:px-7 py-7 text-center shadow-sm">
          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-center gap-2 text-white">
              <Dice5 size={18} />
              <h2 className="text-[19px] font-bold">تحدي عشوائي</h2>
            </div>
            <p className="mx-auto mb-7 max-w-lg text-[13px] leading-7 text-emerald-50/85">
              اختبار فوري يختبر قوة استحضارك لآيات عشوائية من مختلف السور.
            </p>
            <button
              type="button"
              onClick={startRandomChallenge}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-secondary px-8 text-[14px] font-bold text-white hover:bg-[#73582E] transition active:scale-95 cursor-pointer"
            >
              <span>ابدأ التحدي العشوائي</span>
              <ChevronLeft size={17} />
            </button>
          </div>
        </section>

        {/* ── التحدي المحدد ── */}
        <section className="w-full rounded-3xl border-2 border-brand-secondary/65 bg-white px-5 sm:px-8 py-7 text-center shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-2 text-brand-secondary">
            <SlidersHorizontal size={20} />
            <h2 className="text-[20px] font-bold text-[#111827]">تحدي محدد</h2>
          </div>
          <p className="mb-7 text-[13px] text-[#6B7280]">
            اختر الجزء ثم حدد السورة التي تود اختبار حفظك فيها
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-right">
            {/* 1. اختيار الجزء */}
            <label className="block">
              <span className="mb-2 block text-[13px] font-bold text-[#111827]">الجزء</span>
              <select
                value={selectedJuz}
                onChange={(e) => setSelectedJuz(e.target.value)}
                className="h-11 w-full rounded-lg border border-brand-sand bg-white px-4 text-[14px] font-bold text-brand-dark outline-none focus:border-brand-secondary"
              >
                <option value="">اختر الجزء (1 - 30)</option>
                {JUZ_NUMBERS.map((j) => (
                  <option key={j} value={j}>الجزء {j}</option>
                ))}
              </select>
            </label>

            {/* 2. اختيار السورة المفلترة */}
            <label className="block">
              <span className="mb-2 block text-[13px] font-bold text-[#111827] items-center justify-between">
                <span>السورة</span>
                {loadingSurahs && <Loader2 size={14} className="animate-spin text-brand-secondary" />}
              </span>
              <select
                value={selectedSurah}
                disabled={!selectedJuz || loadingSurahs}
                onChange={(e) => setSelectedSurah(e.target.value)}
                className="h-11 w-full rounded-lg border border-brand-sand bg-white px-4 text-[14px] font-bold text-brand-dark outline-none focus:border-brand-secondary disabled:bg-gray-100 disabled:opacity-60"
              >
                <option value="">
                  {!selectedJuz ? 'اختر الجزء أولاً' : loadingSurahs ? 'جارٍ تحميل السور...' : 'اختر السورة'}
                </option>
                {surahsList.map((s) => (
                  <option key={s.id} value={s.surah_number}>
                    سورة {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && <p className="mt-3 text-[13px] font-bold text-red-500">{error}</p>}

          <button
            type="button"
            onClick={startSpecificChallenge}
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-secondary px-8 text-[14px] font-bold text-white hover:bg-[#73582E] transition active:scale-95 cursor-pointer"
          >
            <span>ابدأ التحدي المحدد</span>
            <ChevronLeft size={17} />
          </button>
        </section>
      </main>
    </div>
  );
};