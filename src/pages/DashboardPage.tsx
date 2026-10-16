import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useLeaderboard } from '../hooks';
import { Navbar } from '../components/layout';
import {
  DashboardHero,
  LeaderboardTable,
  LeaderboardPodium,
} from '../features/dashboard/components';
import { ROUTES } from '../constants';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { entries, loading, error } = useLeaderboard();
  const navigate = useNavigate();

  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const totalPoints = user?.points ?? 0;

  return (
    <div className="min-h-screen bg-brand-light text-right font-sans" dir="rtl">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-20">
        <DashboardHero
          firstName={firstName}
          totalPoints={totalPoints}
          onStartChallenge={() => navigate(ROUTES.challenge)}
        />

        <h2 className="text-2xl sm:text-[28px] font-bold text-brand-dark mb-6 sm:mb-8">
          قائمة المتصدرين
        </h2>

        {loading && (
          <div className="flex min-h-60 items-center justify-center rounded-2xl border border-gray-200/90 bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-sand border-t-brand-primary" />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-[14px] font-bold text-red-600">
            تعذّر تحميل قائمة المتصدرين
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="rounded-2xl border border-gray-200/90 bg-white p-8 text-center text-[14px] font-medium text-gray-500">
            لا توجد نتائج في قائمة المتصدرين بعد
          </div>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <LeaderboardTable entries={entries} />
            <LeaderboardPodium entries={entries} />
          </div>
        )}
      </main>
    </div>
  );
};
