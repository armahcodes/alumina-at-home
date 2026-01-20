/**
 * Auth exports for Alumina At Home
 * 
 * Re-exports from Neon Auth for easy access throughout the app.
 */

// Client exports
export { authClient } from './client';

// Server exports
export { authServer } from './server';

// Re-export useful components from Neon Auth
export { 
  UserButton,
  AuthView,
  AccountView
} from '@neondatabase/auth/react';

// Re-export server utilities
export { neonAuth } from '@neondatabase/auth/next/server';
