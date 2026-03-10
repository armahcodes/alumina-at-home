'use client';

import { useEffect } from 'react';
import { authClient } from '@/lib/auth/client';
import { useStore } from '@/lib/store';

/**
 * Hook to sync Better Auth session with Zustand store
 */
export function useAuth() {
  const { data, isPending, error } = authClient.useSession();
  const { login, logout, user, isAuthenticated } = useStore();

  useEffect(() => {
    if (data?.session && data?.user) {
      if (!isAuthenticated || user?.email !== data.user.email) {
        login(data.user.email || '', '');
      }
    } else if (!isPending && !data?.session && isAuthenticated) {
      logout();
    }
  }, [data, isPending, isAuthenticated, user?.email, login, logout]);

  return {
    session: data?.session ?? null,
    user: data?.user ?? null,
    isAuthenticated: !!data?.session,
    isLoading: isPending,
    error,
  };
}

/**
 * Hook to get the current user
 */
export function useUser() {
  const { data, isPending } = authClient.useSession();
  return {
    user: data?.user ?? null,
    isLoading: isPending,
  };
}

/**
 * Hook for sign out functionality
 */
export function useSignOut() {
  const zustandLogout = useStore((state) => state.logout);

  const signOut = async () => {
    await authClient.signOut();
    zustandLogout();
    window.location.href = '/auth/sign-in';
  };

  return { signOut };
}
