import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS, STORAGE_KEYS } from '../constants';
import { API_ENDPOINTS } from '../config/endpoints';
import { leaderboardService } from '../services';
import { useAuth } from './useAuth';
import type { LeaderboardEntry } from '../types';

interface WsLeaderboardItem {
  id?: string | number;
  user_id?: string | number;
  name?: string;
  username?: string;
  full_name?: string;
  points?: number;
  total_points?: number;
  score?: number;
}

export const useLeaderboard = () => {
  const { user } = useAuth();
  const queryKey = QUERY_KEYS.leaderboard(user?.id, user?.points);

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => leaderboardService.getLeaderboard(user),
    staleTime: 1000 * 60,
    refetchOnMount: 'always',
  });

  const [realtimeEntries, setRealtimeEntries] = useState<LeaderboardEntry[] | null>(null);
  const [wsLoading, setWsLoading] = useState<boolean>(true);

  useEffect(() => {
    let socket: WebSocket | null = null;

    try {
      const wsUrl =
        API_ENDPOINTS.leaderboard.ws || 'wss://quran-exam-app.enzonic.dev/ws/leaderboard/';
      socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        try {
          const rawData = JSON.parse(event.data) as Record<string, unknown> | WsLeaderboardItem[];
          let list: WsLeaderboardItem[] | undefined = undefined;

          if (Array.isArray(rawData)) {
            list = rawData;
          } else if (rawData && typeof rawData === 'object') {
            const found = Object.values(rawData).find((val) => Array.isArray(val));
            if (found) list = found as WsLeaderboardItem[];
          }

          if (Array.isArray(list)) {
            const updatedList: LeaderboardEntry[] = list.slice(0, 10).map((item, index) => {
              const itemId = String(item.id ?? item.user_id ?? index + 1);
              const itemName = item.full_name || item.name || item.username || 'مستخدم';
              const isMe =
                itemId === String(user?.id) ||
                Boolean(user?.name && itemName.includes(user.name));

              const itemPoints = Number(item.total_points ?? item.points ?? item.score ?? 0);

              // تحديث الكاش المحلي بالنقاط الحقيقية من السيرفر لمنع ظهور أي رقم قديم
              if (isMe) {
                try {
                  const rawUser = localStorage.getItem(STORAGE_KEYS.apiUser);
                  if (rawUser) {
                    const parsed = JSON.parse(rawUser);
                    parsed.points = itemPoints;
                    localStorage.setItem(STORAGE_KEYS.apiUser, JSON.stringify(parsed));
                  }
                } catch {
                  // ignore
                }
              }

              return {
                id: itemId,
                name: itemName,
                points: itemPoints,
                rank: index + 1,
                isCurrentUser: isMe,
              };
            });

            setRealtimeEntries(updatedList);
          }
        } catch {
          // تجاهل الرسائل غير الصالحة
        } finally {
          setWsLoading(false);
        }
      };

      socket.onerror = () => {
        setWsLoading(false);
        socket?.close();
      };

      socket.onclose = () => {
        setWsLoading(false);
      };
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWsLoading(false);
    }

    return () => {
      if (socket) {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        } else if (socket.readyState === WebSocket.CONNECTING) {
          socket.onopen = () => socket?.close();
        }
      }
    };
  }, [user?.id, user?.name]);

  return {
    entries: realtimeEntries ?? data ?? [],
    loading: isLoading && wsLoading,
    error: isError && !realtimeEntries,
  };
};