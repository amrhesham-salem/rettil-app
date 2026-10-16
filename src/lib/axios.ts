import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { env } from '../config';
import { STORAGE_KEYS, ROUTES } from '../constants';

export const tokenStorage = {
  getAccess: () =>
    localStorage.getItem(STORAGE_KEYS.accessToken) ??
    sessionStorage.getItem(STORAGE_KEYS.accessToken),

  getRefresh: () =>
    localStorage.getItem(STORAGE_KEYS.refreshToken) ??
    sessionStorage.getItem(STORAGE_KEYS.refreshToken),

  setAccess: (token: string) => {
    const useSession =
      !localStorage.getItem(STORAGE_KEYS.refreshToken) &&
      Boolean(sessionStorage.getItem(STORAGE_KEYS.refreshToken));
    (useSession ? sessionStorage : localStorage).setItem(STORAGE_KEYS.accessToken, token);
  },

  setTokens: (access: string, refresh: string, rememberMe = true) => {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    sessionStorage.removeItem(STORAGE_KEYS.accessToken);
    sessionStorage.removeItem(STORAGE_KEYS.refreshToken);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.accessToken, access);
    storage.setItem(STORAGE_KEYS.refreshToken, refresh);
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
    localStorage.removeItem(STORAGE_KEYS.apiUser);
    sessionStorage.removeItem(STORAGE_KEYS.accessToken);
    sessionStorage.removeItem(STORAGE_KEYS.refreshToken);
    sessionStorage.removeItem(STORAGE_KEYS.apiUser);
  },
};

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) throw new Error('No refresh token');
  const { data } = await axios.post<{ access: string }>(`${env.apiUrl}/auth/refresh`, { refresh });
  tokenStorage.setAccess(data.access);
  return data.access;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const isAuthCall = original?.url?.includes('/auth/');

    if (error.response?.status === 401 && original && !original._retry && !isAuthCall) {
      original._retry = true;
      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const token = await refreshPromise;
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        tokenStorage.clear();
        window.location.assign(ROUTES.login);
      }
    }
    return Promise.reject(error);
  }
);

/** يحوّل أي خطأ لرسالة عربية واضحة تتعرض للمستخدم */
export const getErrorMessage = (error: unknown, fallback = 'حدث خطأ غير متوقع'): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'تعذّر الاتصال بالسيرفر';
    const data = error.response.data as unknown;
    if (typeof data === 'object' && data !== null) {
      const record = data as Record<string, unknown>;
      if (typeof record.detail === 'string') return record.detail;
      if (typeof record.message === 'string') return record.message;
      for (const value of Object.values(record)) {
        if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
        if (typeof value === 'string') return value;
      }
    }
  }
  return error instanceof Error ? error.message : fallback;
};
