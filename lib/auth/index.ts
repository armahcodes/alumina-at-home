// Server exports (only import in server components/API routes)
export { auth } from './server';
export type { Auth } from './server';

// Client exports
export { authClient, signIn, signUp, signOut, useSession } from './client';
