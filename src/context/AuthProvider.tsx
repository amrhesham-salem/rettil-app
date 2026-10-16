import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AuthContext,
  type HistoryRecord,
  type CreateHistoryRecordInput,
  type LoginPayload,
  type SignupPayload,
  type UpdateProfilePayload,
  type ChangePasswordPayload,
  type AuthUser,
} from './auth-context';
import { authService } from '../services';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryRecord[]>(() => authService.getHistory());
  const [baseUser, setBaseUser] = useState(() => authService.getSession());

  useEffect(() => {
    authService.saveHistory(history);
  }, [history]);

  const login = useCallback(async (payload: LoginPayload) => {
    const logged = await authService.login({
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe ?? false,
    });
    setBaseUser(logged);
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    const created = await authService.signup(payload);
    setBaseUser(created);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setBaseUser(null);
    setHistory([]);
  }, []);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    const updated = await authService.updateProfile(payload);
    setBaseUser(updated);
  }, []);

  const changePassword = useCallback(async (payload: ChangePasswordPayload) => {
    await authService.changePassword(payload);
  }, []);

  const addPoints = useCallback(
    (points: number) => {
      if (!baseUser || points <= 0) return;
      const updated = authService.addPoints(baseUser.id, points);
      if (updated) setBaseUser(updated);
    },
    [baseUser]
  );

  const addHistoryRecord = useCallback((record: CreateHistoryRecordInput) => {
    const newRecord = authService.createHistoryRecord(record);
    setHistory((prev) => [newRecord, ...prev]);
  }, []);

  const user: AuthUser | null = useMemo(
    () => (baseUser ? { ...baseUser, history } : null),
    [baseUser, history]
  );

  const contextValue = useMemo(
    () => ({
      user,
      currentUser: user,
      login,
      signup,
      logout,
      updateProfile,
      changePassword,
      addHistoryRecord,
      addPoints,
    }),
    [user, login, signup, logout, updateProfile, changePassword, addHistoryRecord, addPoints]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
