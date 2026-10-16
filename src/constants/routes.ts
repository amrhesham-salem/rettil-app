/**
 * مسارات صفحات التطبيق الداخلي (Frontend Client Routes).
 */
export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  forgotPasswordLegacy: '/forgetpassword',
  resetPassword: '/reset-password',
  dashboard: '/dashboard',
  challenge: '/challenge',
  challengeSession: '/challenge/session',
  challengePreview: '/challenge-preview',
  history: '/history',
  profile: '/profile',
} as const;