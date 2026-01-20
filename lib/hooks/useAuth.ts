'use client';

import { useEffect } from 'react';
import { authClient } from '@/lib/auth/client';
import { useStore } from '@/lib/store';

/**
 * Hook to sync Neon Auth session with Zustand store
 * This provides a bridge between Neon Auth and the app's state management
 */
export function useAuth() {
  const { data, isPending, error } = authClient.useSession();
  const { login, logout, user, isAuthenticated } = useStore();

  // Sync Neon Auth session with Zustand store
  useEffect(() => {
    if (data?.session && data?.user) {
      // User is authenticated via Neon Auth
      if (!isAuthenticated || user?.email !== data.user.email) {
        // Sync the auth state
        login(data.user.email || '', '');
      }
    } else if (!isPending && !data?.session && isAuthenticated) {
      // User logged out from Neon Auth
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
 * Hook to get the current user from Neon Auth
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
  const logout = useStore((state) => state.logout);

  const signOut = () => {
    logout();
    // Use window.location for a full page redirect to the Neon Auth sign-out page
    // This ensures the session is properly cleared server-side
    window.location.href = '/auth/sign-out';
  };

  return { signOut };
}
