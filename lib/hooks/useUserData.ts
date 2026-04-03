import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, UserProfile, UserStats, DailyMetric, CompletedTask } from '@/lib/db';

/**
 * TanStack Query hooks for data fetching and mutations
 * Provides automatic caching, refetching, and optimistic updates
 */

// Query Keys
export const queryKeys = {
  user: (userId: string) => ['user', userId],
  profile: (userId: string) => ['profile', userId],
  stats: (userId: string) => ['stats', userId],
  tasks: (userId: string) => ['tasks', userId],
  todayTasks: (userId: string) => ['tasks', userId, 'today'],
  metrics: (userId: string, days: number) => ['metrics', userId, days],
};

// ===========================================================================
// USER QUERIES
// ===========================================================================

export function useUser(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.user(userId) : ['user', 'null'],
    queryFn: async () => {
      if (!userId) return null;
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      return data.data as User;
    },
    enabled: !!userId,
  });
}

export function useUserProfile(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.profile(userId) : ['profile', 'null'],
    queryFn: async () => {
      if (!userId) return null;
      const res = await fetch(`/api/user/${userId}/profile`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      return data.data as UserProfile | null;
    },
    enabled: !!userId,
  });
}

export function useUserStats(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.stats(userId) : ['stats', 'null'],
    queryFn: async () => {
      if (!userId) return null;
      const res = await fetch(`/api/user/${userId}/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      return data.data as UserStats;
    },
    enabled: !!userId,
  });
}

// ===========================================================================
// TASK QUERIES
// ===========================================================================

export function useTodayTasks(userId: string | null) {
  return useQuery({
    queryKey: userId ? queryKeys.todayTasks(userId) : ['tasks', 'null'],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`/api/user/${userId}/tasks/today`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      return data.data as CompletedTask[];
    },
    enabled: !!userId,
  });
}

// ===========================================================================
// METRICS QUERIES
// ===========================================================================

export function useDailyMetrics(userId: string | null, days: number = 30) {
  return useQuery({
    queryKey: userId ? queryKeys.metrics(userId, days) : ['metrics', 'null', days],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(`/api/user/${userId}/metrics?days=${days}`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const data = await res.json();
      return data.data as DailyMetric[];
    },
    enabled: !!userId,
  });
}

// ===========================================================================
// MUTATIONS
// ===========================================================================

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      const res = await fetch(`/api/user/${userId}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!res.ok) throw new Error('Failed to update profile');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile(userId) });
    },
  });
}

export function useUpdateStats(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (statsData: Partial<UserStats>) => {
      const res = await fetch(`/api/user/${userId}/stats`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statsData),
      });
      if (!res.ok) throw new Error('Failed to update stats');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stats(userId) });
    },
  });
}

export function useCompleteTask(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: {
      taskId: string;
      taskName: string;
      taskCategory?: string;
      pointsEarned: number;
    }) => {
      const res = await fetch(`/api/user/${userId}/tasks/today`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error('Failed to complete task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todayTasks(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats(userId) });
    },
  });
}

export function useRemoveTodayTask(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const res = await fetch(
        `/api/user/${userId}/tasks/today?taskId=${encodeURIComponent(taskId)}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error('Failed to remove task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todayTasks(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats(userId) });
    },
  });
}

export function useAddDailyMetric(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (metricData: Omit<DailyMetric, 'id' | 'createdAt'>) => {
      const res = await fetch(`/api/user/${userId}/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metricData),
      });
      if (!res.ok) throw new Error('Failed to add metric');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics', userId] });
    },
  });
}

export function useUpdateOnboarding(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (completed: boolean) => {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hasCompletedOnboarding: completed }),
      });
      if (!res.ok) throw new Error('Failed to update onboarding');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user(userId) });
    },
  });
}

// ===========================================================================
// COMBINED HOOKS
// ===========================================================================

/**
 * Hook to load all user data at once
 */
export function useUserData(userId: string | null) {
  const user = useUser(userId);
  const profile = useUserProfile(userId);
  const stats = useUserStats(userId);
  const tasks = useTodayTasks(userId);

  return {
    user: user.data,
    profile: profile.data,
    stats: stats.data,
    tasks: tasks.data || [],
    isLoading: user.isLoading || profile.isLoading || stats.isLoading || tasks.isLoading,
    isError: user.isError || profile.isError || stats.isError || tasks.isError,
    refetch: () => {
      user.refetch();
      profile.refetch();
      stats.refetch();
      tasks.refetch();
    },
  };
}

