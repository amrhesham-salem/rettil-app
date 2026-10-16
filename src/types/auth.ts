import type { HistoryRecord } from './history';

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
}

export interface AuthUser extends User {
  history: HistoryRecord[];
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordPayload {
  uid: string;
  token: string;
  newPassword: string;
}
