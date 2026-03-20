import { auth } from './server';
import { headers } from 'next/headers';

/**
 * Get the authenticated session in a server context (API routes, server components).
 * Returns the session or null if not authenticated.
 */
export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Verify the session and that the userId param matches the authenticated user.
 * Returns { session, error } where error is a Response if auth failed.
 */
export async function verifyUserAccess(userId: string) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return {
      session: null,
      error: { message: 'Unauthorized', status: 401 as const },
    };
  }

  if (session.user.id !== userId) {
    return {
      session: null,
      error: { message: 'Forbidden', status: 403 as const },
    };
  }

  return { session, error: null };
}
