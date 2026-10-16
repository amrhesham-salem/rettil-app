import type { LeaderboardEntry, User } from '../types';
import { authService } from './authService';

const TOP_COUNT = 10;
const SEED_COMPETITORS: { id: string; name: string; points: number }[] = [];

export const leaderboardService = {
  async getLeaderboard(currentUser?: User | null): Promise<LeaderboardEntry[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const registeredUsers = authService
      .getAllUsers()
      .map(({ id, name, points }) => ({ id, name, points }));

    return [...SEED_COMPETITORS, ...registeredUsers]
      .sort((a, b) => b.points - a.points)
      .slice(0, TOP_COUNT)
      .map((item, index) => ({
        id: item.id,
        name: item.name,
        points: item.points,
        rank: index + 1,
        isCurrentUser: item.id === currentUser?.id,
      }));
  },
};
