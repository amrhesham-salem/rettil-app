import { api, tokenStorage } from '../lib';
import { STORAGE_KEYS } from '../constants';
import type {
  User,
  SignupPayload,
  LoginPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
  ResetPasswordPayload,
  HistoryRecord,
  CreateHistoryRecordInput,
} from '../types';

// مفتاح كاش بيانات المستخدم في المتصفح للحفاظ على بقاء الجلسة مفتوحة عند الـ Refresh
const USER_CACHE_KEY = STORAGE_KEYS.apiUser;

// دالة مساعدة لتخزين بيانات المستخدم محلياً بعد جلبها من السيرفر
const cacheUser = (user: User): void => {
  localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
};

// دالة مساعدة لقراءة بيانات المستخدم المخبأة عند فتح الموقع
const getCachedUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const authService = {
  // ── 1. إنشاء حساب جديد (POST /auth/register/) ──
  async signup(data: SignupPayload): Promise<User> {
    await api.post('/auth/register/', {
      full_name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword || data.password,
    });

    // بعد إنشاء الحساب في السيرفر بنجاح، نقوم بتسجيل الدخول تلقائياً
    return authService.login({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });
  },

  // ── 2. تسجيل الدخول (POST /auth/login/ + GET /user/profile/get/) ──
  async login(data: Required<LoginPayload>): Promise<User> {
    // إرسال الإيميل والباسورد لجلب الـ Tokens
    const res = await api.post<{ access: string; refresh: string }>('/auth/login/', {
      email: data.email,
      password: data.password,
    });

    // تخزين الـ Tokens في المتصفح (localStorage أو sessionStorage حسب تذكرني)
    tokenStorage.setTokens(res.data.access, res.data.refresh, data.rememberMe);

    // جلب بيانات الحساب (الاسم والنقاط والإيميل)
    const profileRes = await api.get('/user/profile/get/');
    const user: User = {
      id: String(profileRes.data.id),
      name: profileRes.data.name || profileRes.data.username || '',
      email: profileRes.data.email,
      points: profileRes.data.points ?? profileRes.data.total_points ?? 0,
    };

    cacheUser(user);
    return user;
  },

  // ── 3. تسجيل الخروج ──
  logout(): void {
    tokenStorage.clear();
    localStorage.removeItem(USER_CACHE_KEY);
  },

  // ── 4. استرجاع الجلسة عند عمل Refresh للموقع ──
  getSession(): User | null {
    if (!tokenStorage.getAccess()) return null;
    return getCachedUser();
  },
  
// ── 5. تعديل الملف الشخصي (PUT /user/profile/update/) ──
  async updateProfile(data: UpdateProfilePayload): Promise<User> {
    const res = await api.put('/user/profile/update/', {
      full_name: data.name,
      email: data.email,
    });

    const current = getCachedUser();
    const updated: User = {
      id: String(res.data?.id || current?.id || ''),
      name: data.name || res.data?.full_name || res.data?.name || current?.name || '',
      email: data.email || res.data?.email || current?.email || '',
      points: res.data?.points ?? current?.points ?? 0,
    };

    cacheUser(updated);
    return updated;
  },

  // ── 6. تغيير كلمة المرور (PUT /user/change-password/) ──
  async changePassword(data: ChangePasswordPayload): Promise<void> {
    await api.put('/user/change-password/', {
      old_password: data.currentPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword || data.newPassword,
    });
  },

  // ── 7. نسيت كلمة المرور (POST /auth/forget-password/) ──
  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forget-password/', { email });
  },

  // ── 8. إعادة تعيين كلمة المرور (POST /auth/reset-password/) ──
  async resetPassword(data: ResetPasswordPayload & { confirmPassword?: string }): Promise<void> {
    await api.post('/auth/reset-password/', {
      uid: data.uid,
      token: data.token,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword || data.newPassword,
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPoints(_userId: string, _points: number): User | null {
    return null;
  },

  getAllUsers(): User[] {
    return [];
  },

  getHistory(): HistoryRecord[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.history);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveHistory(records: HistoryRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(records));
  },

  createHistoryRecord(input: CreateHistoryRecordInput): HistoryRecord {
    return {
      ...input,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
  },
};