'use client';

import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { dashClient } from "@better-auth/infra/client";

/**
 * Resolve the Better Auth API origin without baking a wrong host into the client bundle.
 * Top-level `window` checks can be evaluated in Node during the Next.js build and pick
 * `NEXT_PUBLIC_BETTER_AUTH_URL` (often apex), while users hit `www` → cross-origin CORS.
 */
function resolveAuthBaseURL(): string | undefined {
  if (typeof globalThis !== "undefined" && globalThis.location?.origin) {
    return globalThis.location.origin;
  }
  const fromEnv = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      /* ignore */
    }
  }
  const vercel = process.env.VERCEL_URL?.replace(/^https?:\/\//, "");
  if (vercel) return `https://${vercel}`;
  return undefined;
}

function instantiateAuthClient() {
  const baseURL = resolveAuthBaseURL();
  return createAuthClient({
    ...(baseURL ? { baseURL } : {}),
    basePath: "/api/auth",
    plugins: [dashClient(), emailOTPClient()],
  });
}

type AuthClient = ReturnType<typeof instantiateAuthClient>;

let _authClient: AuthClient | undefined;

function getAuthClient(): AuthClient {
  if (!_authClient) {
    _authClient = instantiateAuthClient();
  }
  return _authClient;
}

/**
 * Lazy proxy so `createAuthClient` runs at runtime in the browser (or SSR with env),
 * not at module load during the build.
 *
 * Do not `.bind()` or cache function properties: Better Auth exposes `signIn` / `signUp` as
 * callable Proxy objects (`typeof signIn === "function"`). Binding them breaks nested
 * access like `signIn.email` and leads to broken fetch paths and React hydration noise.
 */
export const authClient = new Proxy({} as AuthClient, {
  get(_target, prop) {
    const client = getAuthClient();
    return Reflect.get(client, prop, client);
  },
});
