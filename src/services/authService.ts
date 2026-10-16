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

interface StoredUser extends User {
  password: string;
}

const USERS_KEY = STORAGE_KEYS.users;
const SESSION_KEY = STORAGE_KEYS.session;
const HISTORY_KEY = STORAGE_KEYS.history;

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const readUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const toPublicUser = (stored: StoredUser): User => ({
  id: stored.id,
  name: stored.name,
  email: stored.email,
  points: stored.points,
});

const getCurrentSessionId = (): string | null =>
  localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);

const saveSession = (id: string, remember: boolean): void => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, id);
};

export const authService = {
  async signup(data: SignupPayload): Promise<User> {
    await delay();
    const users = readUsers();
    const email = data.email.trim().toLowerCase();

    if (users.some((u) => u.email === email)) {
      throw new Error('هذا البريد الإلكتروني مسجّل بالفعل');
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email,
      password: data.password,
      points: 0,
    };

    writeUsers([...users, newUser]);
    saveSession(newUser.id, true);
    return toPublicUser(newUser);
  },

  async login(data: Required<LoginPayload>): Promise<User> {
    await delay();
    const email = data.email.trim().toLowerCase();
    const found = readUsers().find((u) => u.email === email && u.password === data.password);

    if (!found) {
      throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    saveSession(found.id, data.rememberMe);
    return toPublicUser(found);
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(HISTORY_KEY);
  },

  getSession(): User | null {
    const id = getCurrentSessionId();
    if (!id) return null;
    const found = readUsers().find((u) => u.id === id);
    return found ? toPublicUser(found) : null;
  },

  async updateProfile(data: UpdateProfilePayload): Promise<User> {
    await delay();
    const id = getCurrentSessionId();
    const users = readUsers();
    const email = data.email.trim().toLowerCase();

    if (users.some((u) => u.email === email && u.id !== id)) {
      throw new Error('هذا البريد الإلكتروني مستخدم بالفعل');
    }

    const updated = users.map((u) =>
      u.id === id ? { ...u, name: data.name.trim(), email } : u
    );
    writeUsers(updated);

    const found = updated.find((u) => u.id === id);
    if (!found) throw new Error('المستخدم غير موجود');
    return toPublicUser(found);
  },

  async changePassword(data: ChangePasswordPayload): Promise<void> {
    await delay();
    const id = getCurrentSessionId();
    const users = readUsers();
    const found = users.find((u) => u.id === id);

    if (!found || found.password !== data.currentPassword) {
      throw new Error('كلمة المرور الحالية غير صحيحة');
    }

    writeUsers(users.map((u) => (u.id === id ? { ...u, password: data.newPassword } : u)));
  },

  async forgotPassword(_email: string): Promise<void> {
    await delay();
  },

  async resetPassword(_data: ResetPasswordPayload): Promise<void> {
    await delay();
  },

  addPoints(userId: string, points: number): User | null {
    if (points <= 0) return null;
    const updated = readUsers().map((u) =>
      u.id === userId ? { ...u, points: u.points + points } : u
    );
    writeUsers(updated);
    const found = updated.find((u) => u.id === userId);
    return found ? toPublicUser(found) : null;
  },

  getAllUsers(): User[] {
    return readUsers().map(toPublicUser);
  },

  getHistory(): HistoryRecord[] {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveHistory(records: HistoryRecord[]): void {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
  },

  createHistoryRecord(input: CreateHistoryRecordInput): HistoryRecord {
    return {
      ...input,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
  },
};
