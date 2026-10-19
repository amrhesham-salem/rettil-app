export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login/',
    register: '/auth/register/',
    refresh: '/auth/refresh/',
    forgotPassword: '/auth/forgot-password/',
    resetPassword: '/auth/reset-password/',
  },
  user: {
    getProfile: '/user/profile/get/',
    updateProfile: '/user/profile/update/',
    changePassword: '/user/change-password/',
    history: '/user/history/',
  },
  game: {
    generateQuestion: '/game/generate/',
    submitAnswer: '/game/submit/',
  },
  quran: {
    surahs: '/quran/surahs/',
  },
  leaderboard: {
    top: '/leaderboard/',
    ws: 'wss://quran-exam-app.enzonic.dev/ws/leaderboard/',
  },
} as const;