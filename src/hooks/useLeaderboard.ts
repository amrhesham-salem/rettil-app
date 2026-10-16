import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { leaderboardService } from '../services';
import { useAuth } from './useAuth';

/**
 * جلب قائمة المتصدرين (أفضل 10 مستخدمين) مع تمييز المستخدم الحالي.
 */
export const useLeaderboard = () => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.leaderboard(user?.id, user?.points),
    queryFn: () => leaderboardService.getLeaderboard(user),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  return {
    entries: data ?? [],
    loading: isLoading,
    error: isError,
  };
};