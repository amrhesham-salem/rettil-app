import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
 * جلب قائمة المتصدرين (أفضل 10 مستخدمين) مع التحديث اللحظي عبر WebSockets.
 */
export const useLeaderboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const queryKey = QUERY_KEYS.leaderboard(user?.id, user?.points);

  // 1. جلب البيانات المبدئية عبر REST API لسرعة العرض فور فتح الصفحة
  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => leaderboardService.getLeaderboard(user),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const [realtimeEntries, setRealtimeEntries] = useState<LeaderboardEntry[] | null>(null);

  // 2. الاتصال بـ WebSocket لاستقبال التحديثات اللحظية (Real-time WebSockets)
  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const connectWebSocket = () => {
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
              queryClient.setQueryData(queryKey, updatedList);
            }
          } catch (e) {
            console.warn('Error parsing leaderboard websocket message:', e);
          }
        };

        socket.onerror = () => {
          socket?.close();
        };

        socket.onclose = () => {
          reconnectTimer = setTimeout(connectWebSocket, 10000);
        };
      } catch {
        console.warn('WebSocket connection not initialized, fallback to REST API');
      }
    };

    connectWebSocket();

    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      socket?.close();
    };
  }, [user?.id, queryClient, queryKey]);

  return {
    entries: realtimeEntries ?? data ?? [],
    loading: isLoading,
    error: isError,
  };
};