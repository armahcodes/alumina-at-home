'use client';

import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

/**
 * Client config per https://www.better-auth.com/docs/installation#create-client-instance
 * Must match origins in `buildTrustedOrigins` (server). Same host can omit baseURL; set
 * `NEXT_PUBLIC_BETTER_AUTH_URL` if the browser origin differs from the API.
 */
const publicAuthUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();

export const authClient = createAuthClient({
  ...(publicAuthUrl ? { baseURL: publicAuthUrl } : {}),
  basePath: "/api/auth",
  plugins: [emailOTPClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  resetPassword,
} = authClient;
