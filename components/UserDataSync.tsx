'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';
import { useUser, useUserProfile, useUserStats, useTodayTasks } from '@/lib/hooks/useUserData';

/**
 * Hydrates Zustand from authenticated `/api/user/*` responses (React Query).
 * Server snapshot wins on load and after refetch.
 */
export default function UserDataSync({ userId }: { userId: string | null }) {
  const userQ = useUser(userId);
  const profileQ = useUserProfile(userId);
  const statsQ = useUserStats(userId);
  const tasksQ = useTodayTasks(userId);
  const applyServerSnapshot = useStore((s) => s.applyServerSnapshot);
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (!userId || !userQ.isSuccess || !userQ.data) return;
    if (!profileQ.isSuccess || !statsQ.isSuccess || !tasksQ.isSuccess) return;

    const key = [
      userId,
      userQ.data.updatedAt?.toString(),
      profileQ.data?.updatedAt?.toString() ?? 'noprofile',
      statsQ.data?.updatedAt?.toString(),
      tasksQ.data?.map((t) => t.taskId).join(',') ?? '',
    ].join('|');

    if (lastKey.current === key) return;
    lastKey.current = key;

    applyServerSnapshot({
      user: userQ.data,
      profile: profileQ.data ?? null,
      stats: statsQ.data ?? null,
      todayTasks: tasksQ.data ?? [],
    });
  }, [
    userId,
    userQ.isSuccess,
    userQ.data,
    profileQ.isSuccess,
    profileQ.data,
    statsQ.isSuccess,
    statsQ.data,
    tasksQ.isSuccess,
    tasksQ.data,
    applyServerSnapshot,
  ]);

  return null;
}
