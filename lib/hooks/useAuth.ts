'use client';

import { useEffect } from 'react';
import { authClient } from '@/lib/auth/client';
import { useStore } from '@/lib/store';

/**
 * Hook to sync Better Auth session with Zustand store.
 * This is the single source of truth for auth state sync.
 */
export function useAuth() {
  const { data, isPending, error } = authClient.useSession();
  const { login, logout, isAuthenticated, user, updateUser } = useStore();

  useEffect(() => {
    if (isPending) return;

    if (data?.session && data?.user) {
      const authUser = data.user;
      // Sync session to Zustand if not yet authenticated or email changed
      if (!isAuthenticated || user?.email !== authUser.email) {
        login(authUser.email || '', authUser.name || '');
      } else if (authUser.name && user?.name !== authUser.name) {
        // Keep name in sync if changed on the auth side
        updateUser({ name: authUser.name });
      }
    } else if (!data?.session && isAuthenticated) {
      logout();
    }
  }, [data, isPending, isAuthenticated, user?.email, user?.name, login, logout, updateUser]);

  return {
    session: data?.session ?? null,
    user: data?.user ?? null,
    isAuthenticated: !!data?.session,
    isLoading: isPending,
    error,
  };
}

/**
 * Hook to get the current user from Better Auth session (session only; not DB profile).
 */
export function useSessionUser() {
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
