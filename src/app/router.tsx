import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { GuestRoute, ProtectedRoute } from '../components/auth';
import { ROUTES } from '../constants';
import {
  LandingPage,
  LoginPage,
  SignUpPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  DashboardPage,
  ChallengePage,
  ChallengeSessionPage,
  HistoryPage,
  ProfilePage,
} from '../pages';

const NotFound = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-4 bg-brand-light"
    dir="rtl"
  >
    <h1 className="text-[48px] font-extrabold text-brand-dark">٤٠٤</h1>
    <p className="text-gray-500">الصفحة غير موجودة</p>
    <Link to={ROUTES.home} className="text-brand-secondary font-bold">
      العودة للرئيسية
    </Link>
  </div>
);

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.home} element={<LandingPage />} />
      <Route path={ROUTES.challengePreview} element={<ChallengeSessionPage />} />
      <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
      <Route path="/reset-forget-password" element={<ResetPasswordPage />} />

      <Route element={<GuestRoute />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signup} element={<SignUpPage />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
        <Route
          path={ROUTES.forgotPasswordLegacy}
          element={<Navigate to={ROUTES.forgotPassword} replace />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.challenge} element={<ChallengePage />} />
        <Route path={ROUTES.challengeSession} element={<ChallengeSessionPage />} />
        <Route path={ROUTES.history} element={<HistoryPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
