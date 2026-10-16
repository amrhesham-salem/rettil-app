import { createContext } from 'react';
import type {
  User,
  AuthUser,
  HistoryRecord,
  CreateHistoryRecordInput,
  LoginPayload,
  SignupPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from '../types';

export type {
  User,
  AuthUser,
  HistoryRecord,
  CreateHistoryRecordInput,
  LoginPayload,
  SignupPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
};

export interface AuthContextType {
  user: AuthUser | null;
  currentUser: AuthUser | null;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  addHistoryRecord: (record: CreateHistoryRecordInput) => void;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  changePassword: (payload: ChangePasswordPayload) => Promise<void>;
  addPoints: (points: number) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);