// Client exports only — safe to import in client components
// For server-side auth, import directly from '@/lib/auth/server' or '@/lib/auth/session'
export { authClient, signIn, signUp, signOut, useSession, requestPasswordReset, resetPassword } from './client';
