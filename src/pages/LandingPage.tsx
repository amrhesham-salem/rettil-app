import React from 'react';
import {
  LandingHeader,
  HeroSection,
  HowItWorksSection,
  ChallengesSection,
  QuizPreviewSection,
  LeaderboardSection,
  FeaturesSection,
  CtaSection,
  LandingFooter,
} from '../features/landing/components';

export const LandingPage: React.FC = () => (
  <div
    className="min-h-screen bg-brand-light text-right font-sans flex flex-col selection:bg-brand-secondary selection:text-white"
    dir="rtl"
  >
    <LandingHeader />
    <main className="flex-1 w-full flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <ChallengesSection />
      <QuizPreviewSection />
      <section className="relative w-full overflow-hidden">
        <LeaderboardSection />
        <FeaturesSection />
      </section>
      <CtaSection />
    </main>
    <LandingFooter />
  </div>
);