import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout';
import { HistoryTable, HistoryEmptyState } from '../features/history/components';
import { useAuth } from '../hooks';
import historyBg from '../assets/images/HistorywithoutData.png';
import { ROUTES } from '../constants';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const historyData = user?.history ?? [];

  return (
    <div className="min-h-screen bg-brand-light font-sans flex flex-col" dir="rtl">
      <Navbar />

      <main
        className="w-full flex-1 relative overflow-hidden flex flex-col items-center pt-8 pb-16 px-4 sm:px-8 bg-no-repeat bg-cover bg-center min-h-[calc(100vh-70px)]"
        style={{ backgroundImage: `url(${historyBg})` }}
      >
        <h1 className="relative z-10 text-[30px] md:text-[34px] font-bold text-white mb-8 text-center">
          سجل الاختبارات
        </h1>

        {historyData.length > 0 ? (
          <HistoryTable records={historyData} />
        ) : (
          <HistoryEmptyState onStartChallenge={() => navigate(ROUTES.challenge)} />
        )}
      </main>
    </div>
  );
};
