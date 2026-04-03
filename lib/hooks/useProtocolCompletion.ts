'use client';

import { useCallback } from 'react';
import { useStore } from '@/lib/store';
import { useCompleteTask, useRemoveTodayTask } from '@/lib/hooks/useUserData';

export interface ProtocolTaskMeta {
  taskName: string;
  taskCategory?: string;
  pointsEarned?: number;
}

/**
 * Persists protocol completion to Postgres when `userId` is set; otherwise falls back to local Zustand.
 */
export function useProtocolCompletion(userId: string | null) {
  const completeMutation = useCompleteTask(userId || '');
  const removeMutation = useRemoveTodayTask(userId || '');
  const toggleLocal = useStore((s) => s.toggleTask);

  const toggleProtocolTask = useCallback(
    async (
      taskId: string,
      meta: ProtocolTaskMeta,
      currentlyCompleted: boolean
    ) => {
      if (userId) {
        if (currentlyCompleted) {
          await removeMutation.mutateAsync(taskId);
        } else {
          await completeMutation.mutateAsync({
            taskId,
            taskName: meta.taskName,
            taskCategory: meta.taskCategory,
            pointsEarned: meta.pointsEarned ?? 10,
          });
        }
        return;
      }
      toggleLocal(taskId);
    },
    [userId, completeMutation, removeMutation, toggleLocal]
  );

  const isPending = userId
    ? completeMutation.isPending || removeMutation.isPending
    : false;

  return { toggleProtocolTask, isPending };
}
