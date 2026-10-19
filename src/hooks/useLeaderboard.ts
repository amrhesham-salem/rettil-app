import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { API_ENDPOINTS } from '../config/endpoints';
import { leaderboardService } from '../services';
import { useAuth } from './useAuth';
import type { LeaderboardEntry } from '../types';

interface WsLeaderboardItem {
  id: string | number;
  name?: string;
  username?: string;
  full_name?: string;
  points?: number;
  total_points?: number;
}

/**
 * جلب قائمة المتصدرين (أفضل 10 مستخدمين) مع التحديث اللحظي عبر WebSockets بدون تكرار أخطاء.
 */
export const useLeaderboard = () => {
  const { user } = useAuth();
  const queryKey = QUERY_KEYS.leaderboard(user?.id, user?.points);

  // 1. جلب المتصدرين الأساسيين عبر REST API
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => leaderboardService.getLeaderboard(user),
    staleTime: 1000 * 60, // دقيقة كاش
    refetchOnMount: 'always',
  });

  const [realtimeEntries, setRealtimeEntries] = useState<LeaderboardEntry[] | null>(null);

  // 2. محاولة فتح اتصال WebSocket مرة واحدة فقط دون تكرار عند الفشل
  useEffect(() => {
    let socket: WebSocket | null = null;

    try {
      const wsUrl =
        API_ENDPOINTS.leaderboard.ws || 'wss://quran-exam-app.enzonic.dev/ws/leaderboard/';
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const rawData = JSON.parse(event.data);
          const list = Array.isArray(rawData) ? rawData : rawData.results || rawData.top_users;

          if (Array.isArray(list)) {
            const updatedList: LeaderboardEntry[] = (list as WsLeaderboardItem[])
              .slice(0, 10)
              .map((item, index: number) => ({
                id: String(item.id),
                name: item.name || item.username || item.full_name || 'مستخدم',
                points: item.total_points ?? item.points ?? 0,
                rank: index + 1,
                isCurrentUser: String(item.id) === String(user?.id),
              }));

            setRealtimeEntries(updatedList);
          }
        } catch {
          // تجاهل أي خطأ في قراءة الرسالة
        }
      };

      socket.onerror = () => {
        // إغلاق فوري بدون إعادة محاولة حتى لا يزعجك في الكونسول
        socket?.close();
      };
    } catch {
      // السيرفر غير متاح حالياً
    }

    return () => {
      socket?.close();
    };
  }, [user?.id]);

  return {
    entries: realtimeEntries ?? data ?? [],
    loading: isLoading,
    error: isError,
  };
};