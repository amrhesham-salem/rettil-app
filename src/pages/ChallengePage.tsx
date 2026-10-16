import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout';
import {
  RandomChallengeCard,
  SpecificChallengeCard,
} from '../features/challenge/components';
import { specificChallengeSchema, type SpecificChallengeFormData } from '../schemas';
import { ROUTES } from '../constants';

export const ChallengePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SpecificChallengeFormData>({ surah: '', juz: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof SpecificChallengeFormData, string>>>({});

  const handleFieldChange = (field: keyof SpecificChallengeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const startRandomChallenge = () => navigate(ROUTES.challengeSession);

  const startSpecificChallenge = () => {
    const result = specificChallengeSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ surah: fieldErrors.surah?.[0], juz: fieldErrors.juz?.[0] });
      return;
    }

    const params = new URLSearchParams({
      mode: 'specific',
      surah: result.data.surah,
      juz: result.data.juz,
    });

    navigate(`${ROUTES.challengeSession}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-brand-light text-right font-sans" dir="rtl">
      <Navbar />

      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 sm:px-6 md:px-8 pb-20 pt-10 md:pt-14">
        <section className="mb-8 sm:mb-10 text-center">
          <h1 className="mb-2 text-2xl sm:text-[30px] md:text-[34px] font-bold leading-tight text-brand-dark">
            اختر نوع التحدي
          </h1>
          <p className="text-[14px] font-medium text-[#6B7280]">
            اختبر حفظك بالطريقة التي تناسبك.
          </p>
        </section>

        <RandomChallengeCard onStart={startRandomChallenge} />

        <SpecificChallengeCard
          formData={formData}
          errors={errors}
          onFieldChange={handleFieldChange}
          onStart={startSpecificChallenge}
        />
      </main>
    </div>
  );
};
