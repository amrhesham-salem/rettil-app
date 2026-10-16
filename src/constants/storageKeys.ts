/**
 * مفاتيح التخزين المحلي (localStorage / sessionStorage Keys).
 */
export const STORAGE_KEYS = {
  /** قائمة المستخدمين المسجلين محلياً (خاص بوضع الـ Mock) */
  users: 'rattil_users',
  /** معرّف جلسة المستخدم الحالية (خاص بوضع الـ Mock) */
  session: 'rattil_session',
  /** سجل الاختبارات المحلي */
  history: 'rattil_history_data',
  /** JWT Access Token (خاص بوضع الـ API الحقيقي) */
  accessToken: 'rattil_access_token',
  /** JWT Refresh Token (خاص بوضع الـ API الحقيقي) */
  refreshToken: 'rattil_refresh_token',
  /** نسخة مخبأة من بيانات المستخدم الحالي (خاص بوضع الـ API الحقيقي) */
  apiUser: 'rattil_api_user',
} as const;